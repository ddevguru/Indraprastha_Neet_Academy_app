const express = require('express');
const { pool } = require('../db');
const { authMiddleware } = require('./auth');
const {
  RAZORPAY_KEY_ID,
  createRazorpayOrder,
  fetchRazorpayOrder,
  fetchRazorpayPayment,
  verifyPaymentSignature,
  verifyWebhookSignature,
} = require('../services/razorpay');

const router = express.Router();

function parseAmountInr(priceLabel, amountInrDb) {
  if (amountInrDb != null && Number(amountInrDb) > 0) {
    return Number(amountInrDb);
  }
  const digits = String(priceLabel || '').replace(/[^\d.]/g, '');
  const parsed = Number(digits);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function validityToDays(validity) {
  const v = String(validity || '').toLowerCase();
  const monthMatch = v.match(/(\d+)\s*month/);
  if (monthMatch) return Number(monthMatch[1]) * 30;
  const dayMatch = v.match(/(\d+)\s*day/);
  if (dayMatch) return Number(dayMatch[1]);
  if (v.includes('year') || v.includes('annual')) return 365;
  return 30;
}

async function activateSubscription(userId, orderRow, planName, validity) {
  const days = validityToDays(validity);
  await pool.query(
    `INSERT INTO user_subscriptions (
      user_id, package_id, payment_order_id, plan_name, starts_at, expires_at, status
    ) VALUES ($1,$2,$3,$4,CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + ($5 || ' days')::interval, 'active')
    ON CONFLICT (user_id)
    DO UPDATE SET
      package_id = EXCLUDED.package_id,
      payment_order_id = EXCLUDED.payment_order_id,
      plan_name = EXCLUDED.plan_name,
      starts_at = CURRENT_TIMESTAMP,
      expires_at = CURRENT_TIMESTAMP + ($5 || ' days')::interval,
      status = 'active',
      updated_at = CURRENT_TIMESTAMP`,
    [userId, orderRow.package_id, orderRow.id, planName, String(days)]
  );
  await pool.query('UPDATE users SET preferred_plan = $2 WHERE id = $1', [userId, planName]);
}

router.get('/config', authMiddleware, (_req, res) => {
  res.json({
    success: true,
    provider: 'razorpay',
    keyId: RAZORPAY_KEY_ID,
  });
});

router.post('/create-order', authMiddleware, async (req, res) => {
  try {
    const packageId = Number(req.body.packageId);
    if (!packageId) {
      return res.status(400).json({ error: 'packageId is required' });
    }

    const pkgResult = await pool.query(
      `SELECT id, name, price_label, validity, amount_inr
       FROM packages
       WHERE id = $1 AND is_active = TRUE
       LIMIT 1`,
      [packageId]
    );
    if (pkgResult.rows.length === 0) {
      return res.status(404).json({ error: 'Package not found' });
    }
    const pkg = pkgResult.rows[0];
    const amountInr = parseAmountInr(pkg.price_label, pkg.amount_inr);
    if (amountInr <= 0) {
      return res.status(400).json({ error: 'Package amount is not configured' });
    }

    const userResult = await pool.query(
      'SELECT id, phone, full_name FROM users WHERE id = $1 LIMIT 1',
      [req.user.id]
    );
    const user = userResult.rows[0];
    const receipt = `ipa_${req.user.id}_${packageId}_${Date.now()}`;

    const rzOrder = await createRazorpayOrder({
      receipt,
      amountInr,
      notes: {
        user_id: String(req.user.id),
        package_id: String(packageId),
        package_name: pkg.name,
      },
    });

    await pool.query(
      `INSERT INTO payment_orders (
        user_id, package_id, order_id, cf_order_id, payment_session_id,
        amount_inr, currency, status, gateway_response
      ) VALUES ($1,$2,$3,$4,$5,$6,'INR','created',$7)`,
      [
        req.user.id,
        packageId,
        receipt,
        rzOrder.id,
        '',
        amountInr,
        JSON.stringify(rzOrder),
      ]
    );

    return res.json({
      success: true,
      orderId: receipt,
      razorpayOrderId: rzOrder.id,
      amountInr,
      amountPaise: Math.round(amountInr * 100),
      keyId: RAZORPAY_KEY_ID,
      packageName: pkg.name,
      customerPhone: user?.phone || '',
      customerName: user?.full_name || 'Student',
    });
  } catch (e) {
    console.error('[PAYMENTS_CREATE_ORDER]', e);
    return res.status(500).json({ error: e.message || 'Failed to create payment order' });
  }
});

function isSuccessfulPaymentStatus(status) {
  const value = String(status || '').toLowerCase();
  return ['captured', 'authorized', 'paid'].includes(value);
}

async function markOrderPaid(orderId, { razorpayPaymentId, gatewayPayload, isPaid, status }) {
  await pool.query(
    `UPDATE payment_orders
     SET status = $2,
         payment_session_id = COALESCE($3, payment_session_id),
         gateway_response = $4,
         paid_at = CASE WHEN $5 THEN CURRENT_TIMESTAMP ELSE paid_at END,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $1`,
    [
      orderId,
      status,
      razorpayPaymentId || null,
      JSON.stringify(gatewayPayload || {}),
      isPaid,
    ]
  );
}

router.post('/verify', authMiddleware, async (req, res) => {
  try {
    const orderId = String(req.body.orderId || '').trim();
    const razorpayPaymentId = String(req.body.razorpayPaymentId || '').trim();
    const razorpayOrderId = String(req.body.razorpayOrderId || '').trim();
    const razorpaySignature = String(req.body.razorpaySignature || '').trim();

    if (!orderId) {
      return res.status(400).json({ error: 'orderId is required' });
    }

    const local = await pool.query(
      `SELECT po.*, p.name AS package_name, p.validity
       FROM payment_orders po
       JOIN packages p ON p.id = po.package_id
       WHERE po.order_id = $1 AND po.user_id = $2
       LIMIT 1`,
      [orderId, req.user.id]
    );
    if (local.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    const order = local.rows[0];

    if (String(order.status || '').toLowerCase() === 'paid') {
      const sub = await pool.query(
        `SELECT plan_name, status, starts_at, expires_at
         FROM user_subscriptions WHERE user_id = $1 LIMIT 1`,
        [req.user.id]
      );
      return res.json({
        success: true,
        paid: true,
        orderStatus: 'paid',
        subscription: sub.rows[0] || null,
      });
    }

    let isPaid = false;
    let status = 'failed';
    let gatewayPayload = {};

    if (razorpayPaymentId && razorpayOrderId && razorpaySignature) {
      const signatureOk = verifyPaymentSignature({
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      });
      if (!signatureOk) {
        return res.status(400).json({ error: 'Invalid payment signature' });
      }
      if (
        order.cf_order_id &&
        String(order.cf_order_id) !== String(razorpayOrderId)
      ) {
        return res.status(400).json({ error: 'Order mismatch' });
      }

      // Valid Razorpay signature means payment succeeded on gateway side.
      isPaid = true;
      status = 'paid';
      gatewayPayload = {
        razorpayPaymentId,
        razorpayOrderId,
        verifiedBySignature: true,
      };

      try {
        const payment = await fetchRazorpayPayment(razorpayPaymentId);
        gatewayPayload = payment;
        // Signature already proves success — only reject explicit failures.
        if (String(payment.status || '').toLowerCase() === 'failed') {
          isPaid = false;
          status = 'failed';
        }
      } catch (fetchErr) {
        console.warn('[PAYMENTS_VERIFY] payment fetch failed, trusting signature', {
          orderId,
          razorpayPaymentId,
          message: fetchErr?.message,
        });
      }

      await markOrderPaid(order.id, {
        razorpayPaymentId,
        gatewayPayload,
        isPaid,
        status,
      });
    } else {
      const rzOrderId = order.cf_order_id || razorpayOrderId || orderId;
      try {
        const rzOrder = await fetchRazorpayOrder(rzOrderId);
        isPaid = isSuccessfulPaymentStatus(rzOrder.status);
        status = isPaid ? 'paid' : rzOrder.status || 'failed';
        gatewayPayload = rzOrder;

        await markOrderPaid(order.id, {
          razorpayPaymentId: razorpayPaymentId || null,
          gatewayPayload,
          isPaid,
          status,
        });
      } catch (fetchErr) {
        console.error('[PAYMENTS_VERIFY] order fetch failed', {
          orderId,
          rzOrderId,
          message: fetchErr?.message,
        });
        return res.status(400).json({
          error: 'Payment status could not be confirmed yet. Try again in a few seconds.',
        });
      }
    }

    let subscription = null;
    if (isPaid) {
      try {
        await activateSubscription(
          req.user.id,
          order,
          order.package_name,
          order.validity
        );
      } catch (activationErr) {
        console.error('[PAYMENTS_VERIFY] subscription activation failed', {
          orderId,
          userId: req.user.id,
          message: activationErr?.message,
        });
        // Payment is already captured — do not fail the client verify call.
      }
      const sub = await pool.query(
        `SELECT plan_name, status, starts_at, expires_at
         FROM user_subscriptions WHERE user_id = $1 LIMIT 1`,
        [req.user.id]
      );
      subscription = sub.rows[0] || null;
    }

    return res.json({
      success: true,
      paid: isPaid,
      orderStatus: status,
      subscription,
    });
  } catch (e) {
    console.error('[PAYMENTS_VERIFY]', e);
    return res.status(500).json({ error: e.message || 'Payment verification failed' });
  }
});

router.post('/webhook', async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const rawBody = JSON.stringify(req.body || {});
    if (process.env.RAZORPAY_WEBHOOK_SECRET && !verifyWebhookSignature(rawBody, signature)) {
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }

    const event = req.body?.event;
    const payment = req.body?.payload?.payment?.entity;
    if (event !== 'payment.captured' || !payment) {
      return res.json({ success: true, ignored: true });
    }

    const razorpayOrderId = payment.order_id;
    const local = await pool.query(
      'SELECT * FROM payment_orders WHERE cf_order_id = $1 LIMIT 1',
      [razorpayOrderId]
    );
    if (local.rows.length === 0) {
      return res.json({ success: true, ignored: true });
    }
    const order = local.rows[0];

    await pool.query(
      `UPDATE payment_orders
       SET status = 'paid',
           payment_session_id = $2,
           gateway_response = $3,
           paid_at = CURRENT_TIMESTAMP,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [order.id, payment.id, JSON.stringify(req.body)]
    );

    const pkg = await pool.query('SELECT name, validity FROM packages WHERE id = $1', [order.package_id]);
    await activateSubscription(
      order.user_id,
      order,
      pkg.rows[0]?.name || 'Plan',
      pkg.rows[0]?.validity || '30 days'
    );

    return res.json({ success: true });
  } catch (e) {
    console.error('[PAYMENTS_WEBHOOK]', e);
    return res.status(500).json({ error: 'Webhook failed' });
  }
});

module.exports = router;

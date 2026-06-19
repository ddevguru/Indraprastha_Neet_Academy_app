const crypto = require('crypto');

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || '';

const API_BASE = 'https://api.razorpay.com/v1';

function assertConfigured() {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    throw new Error('RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be configured on the server');
  }
}

function authHeader() {
  assertConfigured();
  const token = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');
  return {
    Authorization: `Basic ${token}`,
    'Content-Type': 'application/json',
  };
}

async function createRazorpayOrder({ receipt, amountInr, notes }) {
  const amountPaise = Math.round(Number(amountInr) * 100);
  if (amountPaise < 100) {
    throw new Error('Order amount must be at least ₹1');
  }

  const response = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      amount: amountPaise,
      currency: 'INR',
      receipt,
      notes: notes || {},
    }),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body?.error?.description || body?.message || 'Razorpay order creation failed');
  }
  return body;
}

async function fetchRazorpayOrder(razorpayOrderId) {
  const response = await fetch(`${API_BASE}/orders/${encodeURIComponent(razorpayOrderId)}`, {
    method: 'GET',
    headers: authHeader(),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body?.error?.description || body?.message || 'Razorpay order fetch failed');
  }
  return body;
}

async function fetchRazorpayPayment(paymentId) {
  const response = await fetch(`${API_BASE}/payments/${encodeURIComponent(paymentId)}`, {
    method: 'GET',
    headers: authHeader(),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body?.error?.description || body?.message || 'Razorpay payment fetch failed');
  }
  return body;
}

function verifyPaymentSignature({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) {
  assertConfigured();
  const payload = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expected = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(payload)
    .digest('hex');
  return expected === razorpaySignature;
}

function verifyWebhookSignature(rawBody, signature) {
  if (!RAZORPAY_WEBHOOK_SECRET) return false;
  const expected = crypto
    .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('hex');
  return expected === signature;
}

module.exports = {
  RAZORPAY_KEY_ID,
  createRazorpayOrder,
  fetchRazorpayOrder,
  fetchRazorpayPayment,
  verifyPaymentSignature,
  verifyWebhookSignature,
};

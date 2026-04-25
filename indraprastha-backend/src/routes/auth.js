const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const TEMP_OTP = "111111";
const OTP_EXPIRY_MINUTES = 10;
const DEFAULT_EXAM = 'NEET';
const DEFAULT_PLAN = 'Starter';
const COURSE_NAME = 'Neet Dropper Batch';

function normalizePhone(phone) {
  return String(phone || '').replace(/\D/g, '').slice(-10);
}

async function issueUserSession(user) {
  const sessionId = crypto.randomUUID();
  await pool.query(
    `UPDATE users
     SET active_session_id = $2
     WHERE id = $1`,
    [user.id, sessionId]
  );

  const token = jwt.sign(
    { id: user.id, phone: user.phone, sessionId },
    process.env.JWT_SECRET,
    { expiresIn: '90d' }
  );
  return { token, sessionId };
}

async function saveOtp(phone, otp) {
  await pool.query(
    `INSERT INTO otp_sessions (phone, otp_code, expires_at)
     VALUES ($1, $2, NOW() + ($3 || ' minutes')::interval)
     ON CONFLICT (phone)
     DO UPDATE SET otp_code = EXCLUDED.otp_code, expires_at = EXCLUDED.expires_at, verified_at = NULL`,
    [phone, otp, OTP_EXPIRY_MINUTES]
  );
}

async function verifyOtp(phone, otp) {
  const result = await pool.query(
    `SELECT otp_code, expires_at
     FROM otp_sessions
     WHERE phone = $1`,
    [phone]
  );
  if (result.rows.length === 0) return false;
  const row = result.rows[0];
  const now = new Date();
  if (row.otp_code !== otp) return false;
  if (new Date(row.expires_at) < now) return false;

  await pool.query(
    `UPDATE otp_sessions SET verified_at = NOW() WHERE phone = $1`,
    [phone]
  );
  return true;
}

async function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const token = header.replace('Bearer ', '').trim();
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const result = await pool.query(
      `SELECT active_session_id
       FROM users
       WHERE id = $1`,
      [payload.id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid session' });
    }

    const activeSessionId = result.rows[0].active_session_id;
    if (!activeSessionId || payload.sessionId !== activeSessionId) {
      return res.status(401).json({
        error: 'Session expired. Logged in on another device.',
      });
    }

    req.user = payload;
    next();
  } catch (_) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Send OTP (Temporary)
router.post('/send-otp', async (req, res) => {
  const phone = normalizePhone(req.body.phone);
  if (!phone || phone.length < 10) {
    return res.status(400).json({ error: "Valid phone number required" });
  }

  try {
    await saveOtp(phone, TEMP_OTP);
    console.log(`\n📱 OTP for ${phone} → ${TEMP_OTP} (Temporary)\n`);
    res.json({
      success: true,
      message: "OTP sent",
      phone,
      otpForTesting: TEMP_OTP,
      expiresInSeconds: OTP_EXPIRY_MINUTES * 60,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const phone = normalizePhone(req.body.phone);
  const otp = String(req.body.otp || '');
  if (!phone || phone.length < 10 || otp.length != 6) {
    return res.status(400).json({ error: "Phone and 6-digit OTP are required" });
  }

  try {
    const otpOk = await verifyOtp(phone, otp);
    if (!otpOk) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const userResult = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);

    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      const { token } = await issueUserSession(user);
      return res.json({
        success: true,
        token,
        user,
        isNewUser: false,
        onboardingComplete: Boolean(user.is_profile_complete),
      });
    }

    return res.json({
      success: true,
      isNewUser: true,
      phone,
      message: "OTP verified. Complete signup.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Complete Signup
router.post('/complete-signup', async (req, res) => {
  const {
    phone: rawPhone,
    fullName,
    preferredLanguage = 'English',
    targetExamYear = DEFAULT_EXAM,
    preferredPlan = DEFAULT_PLAN,
    batchId,
    courseCategory,
    collegeState,
    mbbsYear,
    medicalCollege
  } = req.body;
  const phone = normalizePhone(rawPhone);

  if (!phone || phone.length < 10) {
    return res.status(400).json({ error: 'Valid phone number required' });
  }
  if (!fullName || String(fullName).trim().length < 2) {
    return res.status(400).json({ error: 'Full name is required' });
  }
  if (!batchId || !collegeState || !mbbsYear || !medicalCollege) {
    return res.status(400).json({ error: 'Please fill all onboarding fields' });
  }

  try {
    const batchCheck = await pool.query(
      `SELECT b.id
       FROM batches b
       JOIN courses c ON c.id = b.course_id
       WHERE b.id = $1 AND c.name = $2`,
      [batchId, COURSE_NAME]
    );
    if (batchCheck.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid batch selected' });
    }

    const existing = await pool.query('SELECT id FROM users WHERE phone = $1', [phone]);
    let result;

    if (existing.rows.length > 0) {
      result = await pool.query(
        `UPDATE users
         SET full_name = $2,
             preferred_language = $3,
             target_exam_year = $4,
             preferred_plan = $5,
             course_category = $6,
             college_state = $7,
             mbbs_admission_year = $8,
             medical_college = $9,
             batch_id = $10,
             is_profile_complete = TRUE
         WHERE phone = $1
         RETURNING *`,
        [
          phone,
          fullName,
          preferredLanguage,
          targetExamYear,
          preferredPlan,
          courseCategory || COURSE_NAME,
          collegeState,
          mbbsYear,
          medicalCollege,
          batchId
        ]
      );
    } else {
      result = await pool.query(
        `INSERT INTO users (
          phone, full_name, preferred_language, target_exam_year, preferred_plan,
          course_category, college_state, mbbs_admission_year, medical_college, batch_id, is_profile_complete
         )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, TRUE)
         RETURNING *`,
        [
          phone,
          fullName,
          preferredLanguage,
          targetExamYear,
          preferredPlan,
          courseCategory || COURSE_NAME,
          collegeState,
          mbbsYear,
          medicalCollege,
          batchId
        ]
      );
    }

    const user = result.rows[0];
    const { token } = await issueUserSession(user);

    res.json({ success: true, token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.*, b.name AS batch_name
       FROM users u
       LEFT JOIN batches b ON b.id = u.batch_id
       WHERE u.id = $1`,
      [req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/states', async (_req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT state FROM colleges ORDER BY state ASC');
    res.json({ success: true, states: result.rows.map((row) => row.state) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/batches', async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT b.id, b.name, b.target_year, b.class_label
       FROM batches b
       JOIN courses c ON c.id = b.course_id
       WHERE c.name = $1
       ORDER BY b.id ASC`,
      [COURSE_NAME]
    );
    res.json({
      success: true,
      course: COURSE_NAME,
      batches: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/colleges', async (req, res) => {
  const state = String(req.query.state || '').trim();
  if (!state) return res.status(400).json({ error: 'State is required' });

  try {
    const result = await pool.query(
      'SELECT name FROM colleges WHERE state = $1 ORDER BY name ASC',
      [state]
    );
    res.json({ success: true, colleges: result.rows.map((row) => row.name) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
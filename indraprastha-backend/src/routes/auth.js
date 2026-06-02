const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const admin = require('../services/firebase');

const COURSE_NAME = 'Neet Dropper Batch';

function normalizePhone(phone) {
  return String(phone || '').replace(/\D/g, '').slice(-10);
}

async function issueUserSession(user) {
  const sessionId = crypto.randomUUID();
  await pool.query(
    `UPDATE users SET active_session_id = $2 WHERE id = $1`,
    [user.id, sessionId]
  );
  const token = jwt.sign(
    { id: user.id, phone: user.phone, sessionId },
    process.env.JWT_SECRET,
    { expiresIn: '90d' }
  );
  return { token, sessionId };
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
      `SELECT active_session_id FROM users WHERE id = $1`,
      [payload.id]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid session' });
    }
    const activeSessionId = result.rows[0].active_session_id;
    if (!activeSessionId || payload.sessionId !== activeSessionId) {
      return res.status(401).json({ error: 'Session expired. Logged in on another device.' });
    }
    req.user = payload;
    next();
  } catch (_) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Verify Firebase ID token → check if user is new or existing (for signup flow)
router.post('/verify-firebase-token', async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) {
    return res.status(400).json({ error: 'Firebase ID token is required' });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const phone = normalizePhone(decoded.phone_number);
    if (!phone || phone.length < 10) {
      return res.status(400).json({ error: 'Invalid phone number in token' });
    }

    const userResult = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
    const isNewUser = userResult.rows.length === 0;

    return res.json({ success: true, isNewUser, phone });
  } catch (err) {
    console.error('verify-firebase-token error:', err);
    return res.status(401).json({ error: 'Invalid or expired Firebase token' });
  }
});

// Complete Signup — called after Firebase OTP verification
// Creates user with password hash
router.post('/complete-signup', async (req, res) => {
  const {
    idToken,
    fullName,
    password,
    batchId,
    courseCategory,
    preferredLanguage = 'English',
  } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: 'Firebase ID token is required' });
  }
  if (!fullName || String(fullName).trim().length < 2) {
    return res.status(400).json({ error: 'Full name is required' });
  }
  if (!password || String(password).length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  if (!batchId) {
    return res.status(400).json({ error: 'Please select a batch' });
  }

  try {
    // Verify Firebase token to get phone
    const decoded = await admin.auth().verifyIdToken(idToken);
    const phone = normalizePhone(decoded.phone_number);
    if (!phone || phone.length < 10) {
      return res.status(400).json({ error: 'Invalid phone number in token' });
    }

    const batchCheck = await pool.query(
      `SELECT b.id FROM batches b
       JOIN courses c ON c.id = b.course_id
       WHERE b.id = $1 AND c.name = $2`,
      [batchId, COURSE_NAME]
    );
    if (batchCheck.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid batch selected' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const existing = await pool.query('SELECT id FROM users WHERE phone = $1', [phone]);
    let result;

    if (existing.rows.length > 0) {
      result = await pool.query(
        `UPDATE users
         SET full_name = $2,
             password_hash = $3,
             preferred_language = $4,
             course_category = $5,
             batch_id = $6,
             is_profile_complete = TRUE
         WHERE phone = $1
         RETURNING *`,
        [phone, fullName, passwordHash, preferredLanguage, courseCategory || COURSE_NAME, batchId]
      );
    } else {
      result = await pool.query(
        `INSERT INTO users (phone, full_name, password_hash, preferred_language, course_category, batch_id, is_profile_complete)
         VALUES ($1, $2, $3, $4, $5, $6, TRUE)
         RETURNING *`,
        [phone, fullName, passwordHash, preferredLanguage, courseCategory || COURSE_NAME, batchId]
      );
    }

    const user = result.rows[0];
    const { token } = await issueUserSession(user);
    res.json({ success: true, token, user });
  } catch (err) {
    console.error('complete-signup error:', err);
    if (err.code === 'auth/id-token-expired' || err.code === 'auth/argument-error') {
      return res.status(401).json({ error: 'Firebase token expired. Please verify OTP again.' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Login with phone + password (no OTP needed)
router.post('/login', async (req, res) => {
  const phone = normalizePhone(req.body.phone);
  const { password } = req.body;

  if (!phone || phone.length < 10) {
    return res.status(400).json({ error: 'Valid phone number required' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'No account found. Please sign up first.' });
    }

    const user = result.rows[0];
    if (!user.password_hash) {
      return res.status(401).json({ error: 'Account not set up with password. Please sign up again.' });
    }

    const passwordOk = await bcrypt.compare(password, user.password_hash);
    if (!passwordOk) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const { token } = await issueUserSession(user);
    res.json({ success: true, token, user });
  } catch (err) {
    console.error('login error:', err);
    res.status(500).json({ error: 'Server error' });
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
    res.json({ success: true, course: COURSE_NAME, batches: result.rows });
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

router.delete('/delete-account', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [req.user.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
module.exports.authMiddleware = authMiddleware;

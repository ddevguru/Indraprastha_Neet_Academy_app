const { pool } = require('../db');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'xqf2l0Wj9DGJoaGmiXcw+3+V6s6MQyvqZ23rNpnczas=';

// Helper: Normalize 10-digit phone
function normalizePhone(phone) {
  return String(phone || '').replace(/\D/g, '').slice(-10);
}

// Helper: Issue JWT Token with active session tracking in PostgreSQL
async function issueUserSession(user) {
  const sessionId = crypto.randomUUID();
  await pool.query(
    'UPDATE users SET active_session_id = $2 WHERE id = $1',
    [user.id, sessionId]
  );
  const token = jwt.sign(
    { id: user.id, phone: user.phone, sessionId, role: 'student' },
    JWT_SECRET,
    { expiresIn: '90d' }
  );
  return { token, sessionId };
}

// Find user by normalized 10-digit phone (joins batches & subscriptions)
async function findUserByPhone(phone) {
  const cleanPhone = normalizePhone(phone);
  if (!cleanPhone || cleanPhone.length < 10) return null;

  const result = await pool.query(
    `SELECT u.*, b.name AS batch_name, b.target_year, b.class_label,
       us.plan_name AS subscription_plan,
       us.status AS subscription_status,
       us.starts_at AS subscription_starts_at,
       us.expires_at AS subscription_expires_at,
       (us.status = 'active' AND us.expires_at > CURRENT_TIMESTAMP) AS has_active_subscription
     FROM users u
     LEFT JOIN batches b ON b.id = u.batch_id
     LEFT JOIN user_subscriptions us ON us.user_id = u.id
     WHERE u.phone = $1
     LIMIT 1`,
    [cleanPhone]
  );

  return result.rows[0] || null;
}

// Find user by email
async function findUserByEmail(email) {
  const cleanEmail = String(email || '').trim().toLowerCase();
  if (!cleanEmail) return null;

  const result = await pool.query(
    `SELECT u.*, b.name AS batch_name, b.target_year, b.class_label,
       us.plan_name AS subscription_plan,
       us.status AS subscription_status,
       us.starts_at AS subscription_starts_at,
       us.expires_at AS subscription_expires_at,
       (us.status = 'active' AND us.expires_at > CURRENT_TIMESTAMP) AS has_active_subscription
     FROM users u
     LEFT JOIN batches b ON b.id = u.batch_id
     LEFT JOIN user_subscriptions us ON us.user_id = u.id
     WHERE LOWER(u.email) = $1
     LIMIT 1`,
    [cleanEmail]
  );

  return result.rows[0] || null;
}

// Find user by ID
async function findUserById(id) {
  const result = await pool.query(
    `SELECT u.*, b.name AS batch_name, b.target_year, b.class_label,
       us.plan_name AS subscription_plan,
       us.status AS subscription_status,
       us.starts_at AS subscription_starts_at,
       us.expires_at AS subscription_expires_at,
       (us.status = 'active' AND us.expires_at > CURRENT_TIMESTAMP) AS has_active_subscription
     FROM users u
     LEFT JOIN batches b ON b.id = u.batch_id
     LEFT JOIN user_subscriptions us ON us.user_id = u.id
     WHERE u.id = $1
     LIMIT 1`,
    [id]
  );

  return result.rows[0] || null;
}

// Resolve batch ID based on academic year string
async function resolveBatchId(studyYear) {
  const batches = await pool.query('SELECT id, name, class_label, target_year FROM batches ORDER BY id ASC');
  if (batches.rows.length === 0) return null;

  const text = String(studyYear || '').toLowerCase();
  if (text.includes('11') || text.includes('2028') || text.includes('2027')) {
    const match = batches.rows.find((b) => b.name.includes('11') || b.class_label?.includes('11'));
    if (match) return match.id;
  }
  if (text.includes('dropper')) {
    const match = batches.rows.find((b) => b.name.toLowerCase().includes('dropper'));
    if (match) return match.id;
  }
  if (text.includes('12') || text.includes('2026')) {
    const match = batches.rows.find((b) => b.name.includes('12') || b.class_label?.includes('12'));
    if (match) return match.id;
  }
  return batches.rows[0].id;
}

// Create or update Student User in PostgreSQL
async function createStudentUser({
  fullName,
  email,
  phone,
  password,
  studyYear,
  batchId,
  isGoogleUser = false,
  googleId = null,
  firebaseUid = null,
  isPhoneVerified = true,
}) {
  const cleanPhone = normalizePhone(phone);
  const cleanEmail = email ? String(email).trim().toLowerCase() : null;

  let passwordHash = null;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    passwordHash = await bcrypt.hash(password, salt);
  }

  const assignedBatchId = batchId || (await resolveBatchId(studyYear));
  const fUid = firebaseUid || googleId || null;

  const yearMatch = String(studyYear || '').match(/\d{4}/);
  const targetYear = yearMatch ? `NEET ${yearMatch[0]}` : 'NEET 2026';
  const courseCategory = String(studyYear || 'Class 12th (NEET 2026)').slice(0, 100);

  // Check if user already exists
  const existing = await pool.query('SELECT id, is_blocked FROM users WHERE phone = $1', [cleanPhone]);

  let result;
  if (existing.rows.length > 0) {
    if (existing.rows[0].is_blocked) {
      throw new Error('Your account has been blocked by the admin.');
    }

    result = await pool.query(
      `UPDATE users
       SET full_name = COALESCE($2, full_name),
           email = COALESCE($3, email),
           password_hash = COALESCE($4, password_hash),
           batch_id = COALESCE($5, batch_id),
           firebase_uid = COALESCE($6, firebase_uid),
           target_exam_year = COALESCE($7, target_exam_year),
           course_category = COALESCE($8, course_category),
           is_profile_complete = TRUE
       WHERE phone = $1
       RETURNING *`,
      [
        cleanPhone,
        fullName ? fullName.trim() : null,
        cleanEmail,
        passwordHash,
        assignedBatchId,
        fUid,
        targetYear,
        courseCategory,
      ]
    );
  } else {
    result = await pool.query(
      `INSERT INTO users (
        phone, full_name, email, password_hash, batch_id, firebase_uid,
        target_exam_year, course_category, preferred_language, preferred_plan, is_profile_complete
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'English', 'Starter', TRUE)
      RETURNING *`,
      [
        cleanPhone,
        fullName ? fullName.trim() : 'Indraprastha Student',
        cleanEmail,
        passwordHash,
        assignedBatchId,
        fUid,
        targetYear,
        courseCategory,
      ]
    );
  }

  const user = result.rows[0];
  const fullProfile = await findUserById(user.id);
  const { password_hash: _, ...sanitized } = fullProfile;
  return sanitized;
}

// ════════ IN-MEMORY / DB OTP HELPERS ════════
const activeOtps = new Map();

function storeOtp(phone, otp) {
  const cleanPhone = normalizePhone(phone);
  activeOtps.set(cleanPhone, {
    otp: String(otp).trim(),
    expiresAt: Date.now() + 10 * 60 * 1000,
  });
}

function verifyOtp(phone, inputOtp) {
  const cleanPhone = normalizePhone(phone);
  const cleanOtp = String(inputOtp || '').trim();

  // Support dev test code
  if (process.env.DEMO_OTP_ENABLED !== 'false' && (cleanOtp === '123456' || cleanOtp === '112233')) {
    return { valid: true };
  }

  const record = activeOtps.get(cleanPhone);
  if (!record) {
    return { valid: false, error: 'No active OTP request found. Please request a new OTP.' };
  }
  if (Date.now() > record.expiresAt) {
    activeOtps.delete(cleanPhone);
    return { valid: false, error: 'OTP has expired. Please click Resend OTP.' };
  }
  if (record.otp !== cleanOtp) {
    return { valid: false, error: 'Incorrect OTP code. Please check and try again.' };
  }

  activeOtps.delete(cleanPhone);
  return { valid: true };
}

module.exports = {
  findUserByPhone,
  findUserByEmail,
  findUserById,
  createStudentUser,
  issueUserSession,
  storeOtp,
  verifyOtp,
  normalizePhone,
};

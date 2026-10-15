const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { pool } = require('../db');
const {
  findUserByPhone,
  findUserByEmail,
  findUserById,
  createStudentUser,
  issueUserSession,
  storeOtp,
  verifyOtp,
  normalizePhone,
} = require('../models/userStore');
const { requireAuth } = require('../middleware/auth');
const { verifyFirebaseIdToken } = require('../services/firebase');

// ══════════════════════════════════════════════
// 1. STUDENT LOGIN (PHONE + PASSWORD) - POSTGRESQL
// ══════════════════════════════════════════════
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const cleanPhone = normalizePhone(phone);

    if (!cleanPhone || cleanPhone.length !== 10) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid 10-digit registered mobile number.',
      });
    }

    if (!password || password.length < 4) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your account password.',
      });
    }

    // 1. Direct Live GCP Production Auth
    try {
      const prodRes = await fetch('https://api.indraprasthaneetacademy.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone, password }),
      });
      const prodData = await prodRes.json();
      if (prodRes.ok && (prodData.success || prodData.token)) {
        console.log(`[Live GCP Auth] Student ${cleanPhone} authenticated directly on production.`);
        return res.json({
          success: true,
          message: 'Student login successful!',
          token: prodData.token,
          user: prodData.user || { phone: cleanPhone, full_name: 'Deepak Mishra' },
        });
      }
      if (prodData.error) {
        return res.status(prodRes.status || 400).json({ success: false, error: prodData.error });
      }
    } catch (prodErr) {
      console.warn('[Live GCP Auth] Live server request failed, attempting local fallback:', prodErr.message);
    }

    // Lookup student in Local PostgreSQL fallback
    let user = await findUserByPhone(cleanPhone);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'No student account found with this mobile number. Please sign up first.',
      });
    }

    if (user.is_blocked) {
      return res.status(403).json({
        success: false,
        error: 'Your account has been blocked by the admin.',
      });
    }

    if (!user.password_hash) {
      return res.status(400).json({
        success: false,
        noPassword: true,
        error: 'Account not set up with password. Please log in via OTP or Google.',
      });
    }

    // Compare Bcrypt Password Hash
    let passwordMatch = await bcrypt.compare(password, user.password_hash);

    // If local password does not match, double-check live production server
    if (!passwordMatch && !process.env.DATABASE_URL) {
      try {
        const prodRes = await fetch('https://api.indraprasthaneetacademy.com/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: cleanPhone, password }),
        });
        const prodData = await prodRes.json();
        if (prodRes.ok && prodData.success) {
          console.log(`[Production Auth Bridge] Student ${cleanPhone} authenticated via live production server.`);
          return res.json(prodData);
        }
      } catch (prodErr) {
        console.warn('[Production Auth Bridge] Fallback check failed:', prodErr.message);
      }
    }

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: 'Incorrect password. Please verify and try again.',
      });
    }

    // Issue unified session token (shared with Mobile App)
    const { token } = await issueUserSession(user);
    const { password_hash: _, ...sanitizedUser } = user;

    return res.json({
      success: true,
      message: 'Student login successful!',
      token,
      user: sanitizedUser,
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected database error occurred during login. Please try again.',
    });
  }
});

// ══════════════════════════════════════════════
// 1B. PHONE OTP LOGIN - SEND OTP (for mobile app users with no password)
// ══════════════════════════════════════════════
router.post('/login/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;
    const cleanPhone = normalizePhone(phone);
    if (!cleanPhone || cleanPhone.length !== 10) {
      return res.status(400).json({ success: false, error: 'Valid 10-digit mobile number required.' });
    }

    // Ensure user exists in PostgreSQL
    const user = await findUserByPhone(cleanPhone);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'No student account found with this mobile number. Please sign up first.',
      });
    }
    if (user.is_blocked) {
      return res.status(403).json({ success: false, error: 'Your account has been blocked by the admin.' });
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    storeOtp(cleanPhone, generatedOtp);
    console.log(`[Login OTP] Generated OTP for +91 ${cleanPhone}: ${generatedOtp}`);

    return res.json({
      success: true,
      message: `OTP sent to +91 ${cleanPhone}. Valid for 10 minutes.`,
      phone: cleanPhone,
      demoOtp: process.env.DEMO_OTP_ENABLED !== 'false' ? generatedOtp : undefined,
    });
  } catch (err) {
    console.error('Login OTP send error:', err);
    return res.status(500).json({ success: false, error: 'Failed to send login OTP.' });
  }
});

// ══════════════════════════════════════════════
// 1C. PHONE OTP LOGIN - VERIFY OTP AND LOGIN
// ══════════════════════════════════════════════
router.post('/login/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const cleanPhone = normalizePhone(phone);
    if (!cleanPhone || cleanPhone.length !== 10) {
      return res.status(400).json({ success: false, error: 'Valid 10-digit mobile number required.' });
    }
    if (!otp || String(otp).length !== 6) {
      return res.status(400).json({ success: false, error: 'Please enter the 6-digit OTP.' });
    }

    const otpResult = verifyOtp(cleanPhone, otp);
    if (!otpResult.valid) {
      return res.status(401).json({ success: false, error: otpResult.error || 'Invalid or expired OTP.' });
    }

    const user = await findUserByPhone(cleanPhone);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }
    if (user.is_blocked) {
      return res.status(403).json({ success: false, error: 'Your account has been blocked by the admin.' });
    }

    const { token } = await issueUserSession(user);
    const { password_hash: _, ...sanitizedUser } = user;

    return res.json({
      success: true,
      message: 'OTP verified! Student login successful.',
      token,
      user: sanitizedUser,
    });
  } catch (err) {
    console.error('Login OTP verify error:', err);
    return res.status(500).json({ success: false, error: 'Database error during OTP login.' });
  }
});

// ══════════════════════════════════════════════
// 2. FIREBASE GOOGLE AUTH - POSTGRESQL
// ══════════════════════════════════════════════
router.post('/firebase/google-auth', async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ success: false, error: 'Firebase ID token is required' });
    }

    const decoded = await verifyFirebaseIdToken(idToken);
    const email = String(decoded.email || '').trim().toLowerCase();
    const name = decoded.name || 'Google Student';
    const googleId = decoded.uid;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Valid email address missing from Google account.' });
    }

    // Check if user exists in PostgreSQL by email or firebase_uid
    let existingUser = await findUserByEmail(email);
    if (!existingUser && googleId) {
      const byUid = await pool.query(
        `SELECT u.*, b.name AS batch_name,
           us.plan_name AS subscription_plan,
           (us.status = 'active' AND us.expires_at > CURRENT_TIMESTAMP) AS has_active_subscription
         FROM users u
         LEFT JOIN batches b ON b.id = u.batch_id
         LEFT JOIN user_subscriptions us ON us.user_id = u.id
         WHERE u.firebase_uid = $1
         LIMIT 1`,
        [googleId]
      );
      if (byUid.rows.length > 0) existingUser = byUid.rows[0];
    }

    if (existingUser) {
      if (existingUser.is_blocked) {
        return res.status(403).json({ success: false, error: 'Your account has been blocked by the admin.' });
      }

      // Link firebase_uid if not yet set
      if (!existingUser.firebase_uid) {
        await pool.query('UPDATE users SET firebase_uid = $2 WHERE id = $1', [existingUser.id, googleId]);
      }

      const { token } = await issueUserSession(existingUser);
      const { password_hash: _, ...sanitizedUser } = existingUser;

      return res.json({
        success: true,
        isNewUser: false,
        message: 'Google login verified via PostgreSQL successfully!',
        token,
        user: sanitizedUser,
      });
    }

    // New student -> Prompt for Mobile OTP verification to link phone number
    return res.json({
      success: true,
      isNewUser: true,
      message: 'Google account verified. Please verify mobile number with OTP to complete registration.',
      googleUser: {
        email,
        name,
        googleId,
      },
    });
  } catch (err) {
    console.error('Firebase Google Auth error:', err);
    return res.status(401).json({
      success: false,
      error: 'Google authentication failed: ' + (err.message || 'Token verification error'),
    });
  }
});

// ══════════════════════════════════════════════
// 3. FIREBASE PHONE OTP VERIFICATION - POSTGRESQL
// ══════════════════════════════════════════════
router.post('/firebase/verify-phone-token', async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) {
    return res.status(400).json({ success: false, error: 'Firebase phone ID token is required' });
  }

  try {
    const decoded = await verifyFirebaseIdToken(idToken);
    const phone = normalizePhone(decoded.phone_number);
    if (!phone || phone.length < 10) {
      return res.status(400).json({ success: false, error: 'Invalid or missing phone number in Firebase token' });
    }

    const existingUser = await findUserByPhone(phone);
    const isNewUser = !existingUser;

    if (existingUser) {
      if (existingUser.is_blocked) {
        return res.status(403).json({ success: false, error: 'Your account has been blocked by the admin.' });
      }
      const { token } = await issueUserSession(existingUser);
      const { password_hash: _, ...sanitizedUser } = existingUser;
      return res.json({
        success: true,
        isNewUser: false,
        phone,
        token,
        user: sanitizedUser,
        message: 'Phone OTP verified, student logged in successfully!',
      });
    }

    return res.json({
      success: true,
      isNewUser: true,
      phone,
      message: 'Firebase Phone OTP successfully verified!',
    });
  } catch (err) {
    console.error('Firebase verify phone error:', err);
    return res.status(401).json({
      success: false,
      error: 'Firebase phone token verification failed: ' + err.message,
    });
  }
});

// ══════════════════════════════════════════════
// 4. FIREBASE COMPLETE SIGNUP - POSTGRESQL
// ══════════════════════════════════════════════
router.post('/firebase/complete-signup', async (req, res) => {
  const {
    idToken,
    fullName,
    email,
    password,
    studyYear,
    isGoogleSignup,
    googleId,
  } = req.body;

  if (!idToken) {
    return res.status(400).json({ success: false, error: 'Firebase verification token is required' });
  }
  if (!fullName || String(fullName).trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Full student name is required' });
  }

  try {
    const decoded = await verifyFirebaseIdToken(idToken);
    const phone = normalizePhone(decoded.phone_number || req.body.phone);
    if (!phone || phone.length < 10) {
      return res.status(400).json({ success: false, error: 'Verified phone number missing from Firebase token' });
    }

    // Check duplicate in PostgreSQL
    const existing = await findUserByPhone(phone);
    if (existing && existing.password_hash) {
      return res.status(409).json({
        success: false,
        error: 'An account with this phone number is already registered. Please log in.',
      });
    }

    const newUser = await createStudentUser({
      fullName: fullName.trim(),
      email: email ? String(email).trim().toLowerCase() : '',
      phone,
      password: isGoogleSignup ? null : password,
      studyYear: studyYear || 'Class 12th (NEET 2026)',
      isGoogleUser: Boolean(isGoogleSignup),
      googleId: googleId || decoded.uid || null,
      firebaseUid: decoded.uid || null,
      isPhoneVerified: true,
    });

    const { token } = await issueUserSession(newUser);
    return res.status(201).json({
      success: true,
      message: 'Student account registered in PostgreSQL database successfully!',
      token,
      user: newUser,
    });
  } catch (err) {
    console.error('Firebase complete signup error:', err);
    return res.status(400).json({
      success: false,
      error: 'Failed to complete signup in database: ' + err.message,
    });
  }
});

// ══════════════════════════════════════════════
// 5. SIGNUP STEP 1: CHECK IDENTITY / EMAIL DUPLICATE
// ══════════════════════════════════════════════
router.post('/signup/check-identity', async (req, res) => {
  try {
    const { fullName, email, password, isGoogleSignup } = req.body;

    if (!fullName || fullName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your full student name.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.',
      });
    }

    if (!isGoogleSignup && (!password || password.length < 6)) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long.',
      });
    }

    // Check PostgreSQL
    const existingEmail = await findUserByEmail(email);
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        error: 'An account with this email address already exists. Please log in.',
      });
    }

    return res.json({
      success: true,
      message: 'Step 1 identity validated successfully.',
    });
  } catch (err) {
    console.error('Check identity error:', err);
    return res.status(500).json({
      success: false,
      error: 'Database error while checking identity.',
    });
  }
});

// ══════════════════════════════════════════════
// 6. SIGNUP STEP 2: SEND MOBILE OTP (CHECK POSTGRESQL DUPLICATE)
// ══════════════════════════════════════════════
router.post('/signup/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;
    const cleanPhone = normalizePhone(phone);

    if (!cleanPhone || cleanPhone.length !== 10) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid 10-digit mobile number.',
      });
    }

    // Check if phone number is already registered in PostgreSQL
    const existingUser = await findUserByPhone(cleanPhone);
    if (existingUser && existingUser.password_hash) {
      return res.status(409).json({
        success: false,
        error: 'This mobile number is already registered. Please go to Login.',
      });
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    storeOtp(cleanPhone, generatedOtp);

    console.log(`[Indraprastha OTP Service] Generated OTP for +91 ${cleanPhone}: ${generatedOtp}`);

    return res.json({
      success: true,
      message: `OTP sent to +91 ${cleanPhone} successfully. Valid for 10 minutes.`,
      phone: cleanPhone,
      demoOtp: process.env.DEMO_OTP_ENABLED !== 'false' ? generatedOtp : undefined,
    });
  } catch (err) {
    console.error('Send OTP error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to dispatch verification OTP.',
    });
  }
});

// ══════════════════════════════════════════════
// 7. SIGNUP STEP 3: RESEND OTP
// ══════════════════════════════════════════════
router.post('/signup/resend-otp', (req, res) => {
  try {
    const { phone } = req.body;
    const cleanPhone = normalizePhone(phone);

    if (!cleanPhone || cleanPhone.length !== 10) {
      return res.status(400).json({
        success: false,
        error: 'Valid 10-digit mobile number required to resend OTP.',
      });
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    storeOtp(cleanPhone, generatedOtp);

    return res.json({
      success: true,
      message: `New OTP has been sent to +91 ${cleanPhone}.`,
      demoOtp: process.env.DEMO_OTP_ENABLED !== 'false' ? generatedOtp : undefined,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to resend OTP.' });
  }
});

// ══════════════════════════════════════════════
// 8. SIGNUP STEP 4: VERIFY OTP AND SAVE IN POSTGRESQL
// ══════════════════════════════════════════════
router.post('/signup/verify-and-complete', async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      studyYear,
      phone,
      otp,
      isGoogleSignup,
      googleId,
    } = req.body;

    const cleanPhone = normalizePhone(phone);
    if (!cleanPhone || cleanPhone.length !== 10) {
      return res.status(400).json({
        success: false,
        error: 'Invalid 10-digit mobile number.',
      });
    }

    if (!otp || String(otp).trim().length < 4) {
      return res.status(400).json({
        success: false,
        error: 'Please enter the verification OTP code.',
      });
    }

    // Verify OTP
    const otpVerification = verifyOtp(cleanPhone, String(otp).trim());
    if (!otpVerification.valid) {
      return res.status(400).json({
        success: false,
        error: otpVerification.error || 'Invalid or expired OTP. Please check and try again.',
      });
    }

    // Check duplicate in PostgreSQL
    const existing = await findUserByPhone(cleanPhone);
    if (existing && existing.password_hash) {
      return res.status(409).json({
        success: false,
        error: 'An account with this phone number is already registered. Please log in.',
      });
    }

    // Create student in PostgreSQL
    const newUser = await createStudentUser({
      fullName: fullName || 'Indraprastha Student',
      email: email || '',
      phone: cleanPhone,
      password: isGoogleSignup ? null : password,
      studyYear: studyYear || 'Class 12th (NEET 2026)',
      isGoogleUser: Boolean(isGoogleSignup),
      googleId: googleId || null,
      isPhoneVerified: true,
    });

    const { token } = await issueUserSession(newUser);

    return res.status(201).json({
      success: true,
      message: 'Student account registered and saved to PostgreSQL successfully!',
      token,
      user: newUser,
    });
  } catch (err) {
    console.error('Verify and complete signup error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to complete registration in database: ' + err.message,
    });
  }
});

// ══════════════════════════════════════════════
// 9. CURRENT STUDENT PROFILE WITH SUBSCRIPTIONS (POSTGRESQL)
// ══════════════════════════════════════════════
router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found in PostgreSQL' });
    }
    const { password_hash: _, ...sanitized } = user;
    return res.json({
      success: true,
      user: sanitized,
    });
  } catch (err) {
    console.error('Fetch /me error:', err);
    return res.status(500).json({ success: false, error: 'Database error fetching profile' });
  }
});

// ══════════════════════════════════════════════
// 10. LIST BATCHES (FROM POSTGRESQL)
// ══════════════════════════════════════════════
router.get('/batches', async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT b.id, b.name, b.target_year, b.class_label
       FROM batches b
       ORDER BY b.id ASC`
    );
    return res.json({ success: true, batches: result.rows });
  } catch (err) {
    console.error('Get batches error:', err);
    return res.status(500).json({ success: false, error: 'Database error fetching batches' });
  }
});

// ══════════════════════════════════════════════
// 11. LOGOUT
// ══════════════════════════════════════════════
router.post('/logout', requireAuth, async (req, res) => {
  try {
    if (req.user?.id) {
      await pool.query('UPDATE users SET active_session_id = NULL WHERE id = $1', [req.user.id]);
    }
    return res.json({
      success: true,
      message: 'Logged out successfully from session.',
    });
  } catch (err) {
    return res.json({ success: true, message: 'Logged out.' });
  }
});

module.exports = router;

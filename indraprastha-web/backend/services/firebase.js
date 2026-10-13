const admin = require('firebase-admin');

let isFirebaseConfigured = false;

try {
  if (!admin.apps.length) {
    let rawJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (rawJson) {
      // Strip outer single/double quotes if present from .env parsing
      rawJson = rawJson.trim();
      if ((rawJson.startsWith("'") && rawJson.endsWith("'")) || (rawJson.startsWith('"') && rawJson.endsWith('"'))) {
        rawJson = rawJson.slice(1, -1);
      }
      const serviceAccount = JSON.parse(rawJson);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      isFirebaseConfigured = true;
      console.log('✅ [Firebase Admin] Initialized successfully with Service Account for:', serviceAccount.project_id);
    } else {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
      isFirebaseConfigured = true;
      console.log('✅ [Firebase Admin] Initialized via Application Default Credentials');
    }
  } else {
    isFirebaseConfigured = true;
  }
} catch (err) {
  console.warn('⚠️ [Firebase Admin] Initialization notice:', err.message);
  console.warn('⚠️ [Firebase Admin] Fallback simulation active for local dev testing.');
  isFirebaseConfigured = false;
}

/**
 * Verify Firebase ID Token for Google Auth or Phone Auth
 * Returns decoded token or throws error
 */
async function verifyFirebaseIdToken(idToken) {
  if (!idToken) {
    throw new Error('Firebase ID token is required');
  }

  // If live Firebase Admin is active and token is not a dev mock
  if (isFirebaseConfigured && !idToken.startsWith('mock_') && !idToken.startsWith('dev_')) {
    try {
      const decoded = await admin.auth().verifyIdToken(idToken);
      return decoded;
    } catch (err) {
      console.error('[Firebase Admin] verifyIdToken failed:', err.message);
      throw err;
    }
  }

  // Development / Mock token fallback for local browser testing without full SMS billing
  if (idToken.startsWith('mock_') || idToken.startsWith('dev_') || !isFirebaseConfigured) {
    console.log('[Firebase Admin] Dev token mode active for token prefix:', idToken.slice(0, 15));
    try {
      const base64Data = idToken.split('.')[1] || idToken.replace(/^(mock_|dev_)/, '');
      const parsed = JSON.parse(Buffer.from(base64Data, 'base64').toString('utf8'));
      return parsed;
    } catch {
      // Generic mock payload
      return {
        uid: 'firebase_dev_' + Date.now(),
        phone_number: '+919876543210',
        email: 'student.dev@gmail.com',
        name: 'Dev Student',
        firebase: { sign_in_provider: 'google.com' },
      };
    }
  }

  throw new Error('Firebase authentication service unavailable');
}

module.exports = {
  admin,
  isFirebaseConfigured,
  verifyFirebaseIdToken,
};

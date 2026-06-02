const admin = require('firebase-admin');

if (!admin.apps.length) {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const credential = json
    ? admin.credential.cert(JSON.parse(json))
    : admin.credential.applicationDefault();

  admin.initializeApp({ credential });
  console.log('[Firebase] Admin SDK initialized');
}

module.exports = admin;

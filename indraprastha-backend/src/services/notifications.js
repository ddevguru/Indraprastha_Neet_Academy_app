const admin = require('firebase-admin');

let _initialized = false;

function _getMessaging() {
  if (_initialized) return admin.messaging();

  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!json) {
    return null; // Firebase not configured — skip silently
  }

  try {
    const serviceAccount = JSON.parse(json);
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    _initialized = true;
    console.log('[FCM] Firebase Admin initialized');
    return admin.messaging();
  } catch (e) {
    console.error('[FCM] Failed to init Firebase Admin:', e.message);
    return null;
  }
}

/**
 * Send a push notification to all registered FCM tokens.
 * Silently no-ops if Firebase is not configured or no tokens exist.
 */
async function sendNotificationToAll(pool, { title, body, data = {} }) {
  const messaging = _getMessaging();
  if (!messaging) return;

  try {
    const result = await pool.query('SELECT token FROM fcm_tokens');
    const tokens = result.rows.map((r) => r.token).filter(Boolean);
    if (tokens.length === 0) return;

    const BATCH = 500; // FCM multicast limit
    for (let i = 0; i < tokens.length; i += BATCH) {
      const batch = tokens.slice(i, i + BATCH);
      const response = await messaging.sendEachForMulticast({
        tokens: batch,
        notification: { title, body },
        data: Object.fromEntries(
          Object.entries(data).map(([k, v]) => [k, String(v)])
        ),
        android: {
          notification: {
            channelId: 'indraprastha_updates',
            priority: 'high',
            sound: 'default',
          },
        },
      });

      // Remove invalid/unregistered tokens to keep the table clean
      const dead = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          const code = resp.error?.code ?? '';
          if (
            code === 'messaging/invalid-registration-token' ||
            code === 'messaging/registration-token-not-registered'
          ) {
            dead.push(batch[idx]);
          }
        }
      });

      if (dead.length > 0) {
        await pool.query('DELETE FROM fcm_tokens WHERE token = ANY($1)', [dead]);
      }
    }
  } catch (e) {
    console.error('[FCM] sendNotificationToAll error:', e.message);
  }
}

module.exports = { sendNotificationToAll };

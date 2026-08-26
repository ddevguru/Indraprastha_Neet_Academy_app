const fs = require('fs');
const admin = require('firebase-admin');

let _initialized = false;

function _getMessaging() {
  if (_initialized) return admin.messaging();

  const rawJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  // Option A: Service account JSON string or file path
  if (rawJson && rawJson.trim().length > 0) {
    try {
      let serviceAccount;
      let str = rawJson.trim();
      if ((str.startsWith("'") && str.endsWith("'")) || (str.startsWith('"') && str.endsWith('"'))) {
        str = str.slice(1, -1);
      }
      if (str.startsWith('{')) {
        try {
          serviceAccount = JSON.parse(str);
        } catch (parseError) {
          console.error('[FCM] JSON parse error in FIREBASE_SERVICE_ACCOUNT_JSON:', parseError.message);
        }
      } else if (fs.existsSync(str)) {
        try {
          const fileContent = fs.readFileSync(str, 'utf8');
          serviceAccount = JSON.parse(fileContent);
        } catch (parseError) {
          console.error('[FCM] JSON parse error from file:', parseError.message);
        }
      }

      if (serviceAccount) {
        if (typeof serviceAccount.private_key === 'string') {
          serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
        }
        if (admin.apps.length === 0) {
          admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
        }
        _initialized = true;
        console.log('[FCM] Firebase Admin initialized via service account credentials');
        return admin.messaging();
      }
    } catch (e) {
      console.error('[FCM] Failed to init via FIREBASE_SERVICE_ACCOUNT_JSON:', e.message);
    }
  }

  // Option B: Fallback to Google Cloud Application Default Credentials (ADC)
  try {
    admin.initializeApp({ credential: admin.credential.applicationDefault() });
    _initialized = true;
    console.log('[FCM] Firebase Admin initialized via Google Application Default Credentials');
    return admin.messaging();
  } catch (e) {
    console.error('[FCM] Application Default Credentials failed:', e.message);
  }

  return null;
}

/**
 * Send a push notification to all registered FCM tokens.
 * Silently no-ops if Firebase is not configured or no tokens exist.
 */
async function sendNotificationToAll(pool, { title, body, data = {} }) {
  const messaging = _getMessaging();
  if (!messaging) {
    throw new Error(
      'Firebase Admin SDK is not initialized on server. Please verify FIREBASE_SERVICE_ACCOUNT_JSON environment variable is set.'
    );
  }

  let sentCount = 0;
  try {
    const result = await pool.query('SELECT token FROM fcm_tokens');
    const tokens = result.rows.map((r) => r.token).filter(Boolean);
    console.log(`[FCM] Found ${tokens.length} tokens in fcm_tokens table`);
    if (tokens.length === 0) return 0;

    const imageUrl = data.imageUrl || data.image_url;
    const payloadData = Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, String(v)])
    );

    const BATCH = 500; // FCM multicast limit
    for (let i = 0; i < tokens.length; i += BATCH) {
      const batch = tokens.slice(i, i + BATCH);
      const response = await messaging.sendEachForMulticast({
        tokens: batch,
        notification: {
          title,
          body,
          ...(imageUrl ? { imageUrl } : {}),
        },
        data: payloadData,
        android: {
          priority: 'high',
          notification: {
            channelId: 'indraprastha_alerts',
            notificationPriority: 'PRIORITY_MAX',
            defaultSound: true,
            defaultVibrateTimings: true,
            clickAction: 'FLUTTER_NOTIFICATION_CLICK',
            ...(imageUrl ? { image: imageUrl } : {}),
          },
        },
        apns: {
          payload: {
            aps: {
              alert: { title, body },
              sound: 'default',
              badge: 1,
              'content-available': 1,
            },
          },
          ...(imageUrl ? { fcmOptions: { image: imageUrl } } : {}),
        },
      });

      // Remove invalid/unregistered tokens to keep the table clean
      const dead = [];
      response.responses.forEach((resp, idx) => {
        if (resp.success) {
          sentCount++;
        } else {
          console.error(
            `[FCM] Token delivery failed (${batch[idx].slice(0, 15)}...):`,
            resp.error?.message || resp.error?.code
          );
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
    throw e;
  }
  return sentCount;
}

/**
 * Send a push notification to specific users by their user IDs.
 * Silently no-ops if Firebase is not configured or tokens not found.
 */
async function sendNotificationToUsers(pool, userIds, { title, body, data = {} }) {
  if (!userIds || userIds.length === 0) return 0;
  const messaging = _getMessaging();
  if (!messaging) {
    throw new Error(
      'Firebase Admin SDK is not initialized on server. Please verify FIREBASE_SERVICE_ACCOUNT_JSON environment variable is set.'
    );
  }

  let sentCount = 0;
  try {
    const result = await pool.query(
      'SELECT token FROM fcm_tokens WHERE user_id = ANY($1)',
      [userIds]
    );
    const tokens = result.rows.map((r) => r.token).filter(Boolean);
    if (tokens.length === 0) return 0;

    const imageUrl = data.imageUrl || data.image_url;
    const payloadData = Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, String(v)])
    );

    const BATCH = 500;
    for (let i = 0; i < tokens.length; i += BATCH) {
      const batch = tokens.slice(i, i + BATCH);
      const response = await messaging.sendEachForMulticast({
        tokens: batch,
        notification: {
          title,
          body,
          ...(imageUrl ? { imageUrl } : {}),
        },
        data: payloadData,
        android: {
          priority: 'high',
          notification: {
            channelId: 'indraprastha_alerts',
            notificationPriority: 'PRIORITY_MAX',
            defaultSound: true,
            defaultVibrateTimings: true,
            clickAction: 'FLUTTER_NOTIFICATION_CLICK',
            ...(imageUrl ? { image: imageUrl } : {}),
          },
        },
        apns: {
          payload: {
            aps: {
              alert: { title, body },
              sound: 'default',
              badge: 1,
              'content-available': 1,
            },
          },
          ...(imageUrl ? { fcmOptions: { image: imageUrl } } : {}),
        },
      });

      const dead = [];
      response.responses.forEach((resp, idx) => {
        if (resp.success) {
          sentCount++;
        } else {
          console.error(
            `[FCM] User token delivery failed (${batch[idx].slice(0, 15)}...):`,
            resp.error?.message || resp.error?.code
          );
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
    console.error('[FCM] sendNotificationToUsers error:', e.message);
    throw e;
  }
  return sentCount;
}

module.exports = { sendNotificationToAll, sendNotificationToUsers };

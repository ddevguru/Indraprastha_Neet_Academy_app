const fs = require('fs');
const admin = require('firebase-admin');
const { logError, logWarning, logInfo } = require('./gcp_log');
const errorLogger = require('./logger');

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
          logError('JSON parse error in FIREBASE_SERVICE_ACCOUNT_JSON', {
            errorType: 'FCM_INIT_PARSE_ERROR',
            details: parseError.message,
          });
          errorLogger.logError({
            errorType: 'FCM_INIT_PARSE_ERROR',
            message: parseError.message,
            stack: parseError.stack,
            operation: 'FCM_INIT',
          });
        }
      } else if (fs.existsSync(str)) {
        try {
          const fileContent = fs.readFileSync(str, 'utf8');
          serviceAccount = JSON.parse(fileContent);
        } catch (parseError) {
          logError('JSON parse error from service account file', {
            errorType: 'FCM_INIT_FILE_PARSE_ERROR',
            details: parseError.message,
          });
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
        logInfo('Firebase Admin initialized via service account credentials', {
          projectId: serviceAccount.project_id,
          clientEmail: serviceAccount.client_email,
        });
        return admin.messaging();
      }
    } catch (e) {
      logError('Failed to init Firebase Admin via FIREBASE_SERVICE_ACCOUNT_JSON', {
        errorType: 'FCM_INIT_ERROR',
        details: e.message,
      });
      errorLogger.logError({
        errorType: 'FCM_INIT_ERROR',
        message: e.message,
        stack: e.stack,
        operation: 'FCM_INIT',
      });
    }
  }

  // Option B: Fallback to Google Cloud Application Default Credentials (ADC)
  try {
    if (admin.apps.length === 0) {
      admin.initializeApp({ credential: admin.credential.applicationDefault() });
    }
    _initialized = true;
    logInfo('Firebase Admin initialized via Google Application Default Credentials');
    return admin.messaging();
  } catch (e) {
    logError('Application Default Credentials for Firebase failed', {
      errorType: 'FCM_ADC_INIT_ERROR',
      details: e.message,
    });
    errorLogger.logError({
      errorType: 'FCM_ADC_INIT_ERROR',
      message: e.message,
      stack: e.stack,
      operation: 'FCM_INIT',
    });
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
    const errMsg = 'Firebase Admin SDK is not initialized on server. Check FIREBASE_SERVICE_ACCOUNT_JSON variable.';
    logError(errMsg, { errorType: 'FCM_NOT_INITIALIZED', operation: 'sendNotificationToAll' });
    errorLogger.logError({
      errorType: 'FCM_NOT_INITIALIZED',
      message: errMsg,
      operation: 'sendNotificationToAll',
    });
    throw new Error(errMsg);
  }

  let sentCount = 0;
  let failCount = 0;
  try {
    const result = await pool.query('SELECT token FROM fcm_tokens');
    const tokens = result.rows.map((r) => r.token).filter(Boolean);
    logInfo(`[FCM] Found ${tokens.length} tokens for broadcast notification`, {
      tokenCount: tokens.length,
      title,
    });

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
            sound: 'default',
            clickAction: 'FLUTTER_NOTIFICATION_CLICK',
            ...(imageUrl ? { imageUrl } : {}),
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
          ...(imageUrl ? { fcmOptions: { imageUrl } } : {}),
        },
      });

      // Track errors and clean dead tokens
      const dead = [];
      response.responses.forEach((resp, idx) => {
        if (resp.success) {
          sentCount++;
        } else {
          failCount++;
          const code = resp.error?.code ?? 'UNKNOWN';
          const msg = resp.error?.message ?? 'Unknown delivery failure';
          logWarning(`[FCM] Broadcast token delivery failed (${batch[idx].slice(0, 15)}...)`, {
            errorCode: code,
            errorMessage: msg,
            tokenSnippet: `${batch[idx].slice(0, 15)}...`,
          });
          if (
            code === 'messaging/invalid-registration-token' ||
            code === 'messaging/registration-token-not-registered' ||
            code === 'messaging/mismatched-credential'
          ) {
            dead.push(batch[idx]);
          }
        }
      });

      if (dead.length > 0) {
        await pool.query('DELETE FROM fcm_tokens WHERE token = ANY($1)', [dead]);
        logInfo(`[FCM] Cleaned ${dead.length} dead/unregistered FCM tokens from database`);
      }
    }

    logInfo('[FCM] sendNotificationToAll completed', {
      sentCount,
      failCount,
      totalTokens: tokens.length,
      title,
    });
  } catch (e) {
    logError('[FCM] sendNotificationToAll exception', {
      errorType: 'FCM_BROADCAST_EXCEPTION',
      message: e.message,
      stack: e.stack,
    });
    errorLogger.logError({
      errorType: 'FCM_BROADCAST_EXCEPTION',
      message: e.message,
      stack: e.stack,
      operation: 'sendNotificationToAll',
    });
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
    const errMsg = 'Firebase Admin SDK is not initialized on server. Check FIREBASE_SERVICE_ACCOUNT_JSON variable.';
    logError(errMsg, { errorType: 'FCM_NOT_INITIALIZED', operation: 'sendNotificationToUsers' });
    errorLogger.logError({
      errorType: 'FCM_NOT_INITIALIZED',
      message: errMsg,
      operation: 'sendNotificationToUsers',
    });
    throw new Error(errMsg);
  }

  let sentCount = 0;
  let failCount = 0;
  try {
    const result = await pool.query(
      'SELECT token FROM fcm_tokens WHERE user_id = ANY($1)',
      [userIds]
    );
    const tokens = result.rows.map((r) => r.token).filter(Boolean);
    logInfo(`[FCM] Found ${tokens.length} tokens for targeted notification (${userIds.length} users)`, {
      tokenCount: tokens.length,
      userIdCount: userIds.length,
      title,
    });

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
            sound: 'default',
            clickAction: 'FLUTTER_NOTIFICATION_CLICK',
            ...(imageUrl ? { imageUrl } : {}),
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
          ...(imageUrl ? { fcmOptions: { imageUrl } } : {}),
        },
      });

      const dead = [];
      response.responses.forEach((resp, idx) => {
        if (resp.success) {
          sentCount++;
        } else {
          failCount++;
          const code = resp.error?.code ?? 'UNKNOWN';
          const msg = resp.error?.message ?? 'Unknown delivery failure';
          logWarning(`[FCM] User token delivery failed (${batch[idx].slice(0, 15)}...)`, {
            errorCode: code,
            errorMessage: msg,
            tokenSnippet: `${batch[idx].slice(0, 15)}...`,
          });
          if (
            code === 'messaging/invalid-registration-token' ||
            code === 'messaging/registration-token-not-registered' ||
            code === 'messaging/mismatched-credential'
          ) {
            dead.push(batch[idx]);
          }
        }
      });

      if (dead.length > 0) {
        await pool.query('DELETE FROM fcm_tokens WHERE token = ANY($1)', [dead]);
        logInfo(`[FCM] Cleaned ${dead.length} dead FCM tokens from targeted query`);
      }
    }

    logInfo('[FCM] sendNotificationToUsers completed', {
      sentCount,
      failCount,
      targetUsers: userIds.length,
      title,
    });
  } catch (e) {
    logError('[FCM] sendNotificationToUsers exception', {
      errorType: 'FCM_TARGETED_EXCEPTION',
      message: e.message,
      stack: e.stack,
    });
    errorLogger.logError({
      errorType: 'FCM_TARGETED_EXCEPTION',
      message: e.message,
      stack: e.stack,
      operation: 'sendNotificationToUsers',
    });
    throw e;
  }
  return sentCount;
}

module.exports = { sendNotificationToAll, sendNotificationToUsers };

const { google } = require('googleapis');
const fs = require('fs');
const { Readable } = require('stream');
const os = require('os');
const path = require('path');

function createServiceAccountDriveClient() {
  const clientEmail = process.env.GDRIVE_CLIENT_EMAIL;
  const privateKeyRaw = process.env.GDRIVE_PRIVATE_KEY;

  if (!clientEmail || !privateKeyRaw) {
    throw new Error('Google Drive service-account credentials missing');
  }

  const privateKey = privateKeyRaw.replace(/\\n/g, '\n');
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  return google.drive({ version: 'v3', auth });
}

function createOAuthClient() {
  const clientId = process.env.GDRIVE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GDRIVE_OAUTH_CLIENT_SECRET;
  const redirectUri = process.env.GDRIVE_OAUTH_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Google OAuth credentials missing');
  }
  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

function createOAuthDriveClient() {
  const refreshToken = process.env.GDRIVE_OAUTH_REFRESH_TOKEN;
  if (!refreshToken) {
    throw new Error('Google OAuth refresh token missing');
  }
  const oauth = createOAuthClient();
  oauth.setCredentials({ refresh_token: refreshToken });
  return google.drive({ version: 'v3', auth: oauth });
}

function createDriveClient() {
  const hasOAuth =
    !!process.env.GDRIVE_OAUTH_CLIENT_ID &&
    !!process.env.GDRIVE_OAUTH_CLIENT_SECRET &&
    !!process.env.GDRIVE_OAUTH_REDIRECT_URI &&
    !!process.env.GDRIVE_OAUTH_REFRESH_TOKEN;
  if (hasOAuth) return createOAuthDriveClient();
  return createServiceAccountDriveClient();
}

async function uploadBufferToDrive({
  fileBuffer,
  fileName,
  mimeType,
  folderId,
}) {
  const drive = createDriveClient();
  const normalizedBuffer = normalizeToBuffer(fileBuffer);
  let response;
  try {
    response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: folderId ? [folderId] : undefined,
      },
      media: {
        mimeType,
        // googleapis multipart upload expects a stream with .pipe()
        body: Readable.from(normalizedBuffer),
      },
      fields: 'id,webViewLink,webContentLink',
      supportsAllDrives: true,
    });
  } catch (error) {
    // Safety fallback for environments where multipart stream handling is quirky.
    const message = (error && error.message) || '';
    if (!message.includes('.pipe is not a function')) {
      throw error;
    }
    const tmpPath = path.join(
      os.tmpdir(),
      `indra_drive_${Date.now()}_${Math.random().toString(36).slice(2)}`
    );
    fs.writeFileSync(tmpPath, normalizedBuffer);
    try {
      return await uploadFilePathToDrive({
        filePath: tmpPath,
        fileName,
        mimeType,
        folderId,
      });
    } finally {
      try {
        fs.unlinkSync(tmpPath);
      } catch (_) {}
    }
  }

  const fileId = response.data.id;
  await drive.permissions.create({
    fileId,
    requestBody: { role: 'reader', type: 'anyone' },
    supportsAllDrives: true,
  });

  const meta = await drive.files.get({
    fileId,
    fields: 'id,webViewLink,webContentLink',
    supportsAllDrives: true,
  });

  return {
    fileId: meta.data.id,
    webViewLink: meta.data.webViewLink,
    webContentLink: meta.data.webContentLink,
  };
}

function normalizeToBuffer(fileBuffer) {
  if (Buffer.isBuffer(fileBuffer)) return fileBuffer;
  if (fileBuffer instanceof Uint8Array) return Buffer.from(fileBuffer);
  if (fileBuffer && fileBuffer.type === 'Buffer' && Array.isArray(fileBuffer.data)) {
    return Buffer.from(fileBuffer.data);
  }
  if (typeof fileBuffer === 'string') return Buffer.from(fileBuffer, 'base64');
  return Buffer.from(fileBuffer || '');
}

async function uploadFilePathToDrive({
  filePath,
  fileName,
  mimeType,
  folderId,
}) {
  const drive = createDriveClient();
  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: folderId ? [folderId] : undefined,
    },
    media: {
      mimeType,
      body: fs.createReadStream(filePath),
    },
    fields: 'id,webViewLink,webContentLink',
    supportsAllDrives: true,
  });

  const fileId = response.data.id;
  await drive.permissions.create({
    fileId,
    requestBody: { role: 'reader', type: 'anyone' },
    supportsAllDrives: true,
  });

  const meta = await drive.files.get({
    fileId,
    fields: 'id,webViewLink,webContentLink',
    supportsAllDrives: true,
  });

  return {
    fileId: meta.data.id,
    webViewLink: meta.data.webViewLink,
    webContentLink: meta.data.webContentLink,
  };
}

function safeFolderName(value) {
  return (value || 'Unknown')
    .toString()
    .trim()
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/\s+/g, ' ');
}

async function ensureChildFolder(drive, parentId, folderName) {
  const name = safeFolderName(folderName);
  const escapedName = name.replace(/'/g, "\\'");
  const qParts = [
    "mimeType = 'application/vnd.google-apps.folder'",
    `name = '${escapedName}'`,
    'trashed = false',
  ];
  if (parentId) {
    qParts.push(`'${parentId}' in parents`);
  } else {
    qParts.push("'root' in parents");
  }

  const existing = await drive.files.list({
    q: qParts.join(' and '),
    fields: 'files(id,name)',
    pageSize: 1,
    includeItemsFromAllDrives: true,
    supportsAllDrives: true,
  });

  if (existing.data.files && existing.data.files.length > 0) {
    return existing.data.files[0].id;
  }

  const created = await drive.files.create({
    requestBody: {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: parentId ? [parentId] : undefined,
    },
    fields: 'id',
    supportsAllDrives: true,
  });

  return created.data.id;
}

async function ensureDriveFolderPath({
  rootFolderId,
  segments,
}) {
  const drive = createDriveClient();
  let current = rootFolderId || null;
  if (current) {
    try {
      await drive.files.get({
        fileId: current,
        fields: 'id',
        supportsAllDrives: true,
      });
    } catch (_) {
      // If configured root folder is missing/inaccessible, gracefully fall back to drive root.
      current = null;
    }
  }
  for (const segment of segments) {
    current = await ensureChildFolder(drive, current, segment);
  }
  return current;
}

function getDriveOAuthConsentUrl() {
  const oauth = createOAuthClient();
  return oauth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/drive'],
  });
}

async function exchangeDriveOAuthCode({ code }) {
  const oauth = createOAuthClient();
  const { tokens } = await oauth.getToken(code);
  return {
    accessToken: tokens.access_token || '',
    refreshToken: tokens.refresh_token || '',
    expiryDate: tokens.expiry_date || null,
    tokenType: tokens.token_type || '',
    scope: tokens.scope || '',
  };
}

module.exports = {
  uploadBufferToDrive,
  uploadFilePathToDrive,
  ensureDriveFolderPath,
  getDriveOAuthConsentUrl,
  exchangeDriveOAuthCode,
};

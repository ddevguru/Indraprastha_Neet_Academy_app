const { google } = require('googleapis');

function createDriveClient() {
  const clientEmail = process.env.GDRIVE_CLIENT_EMAIL;
  const privateKeyRaw = process.env.GDRIVE_PRIVATE_KEY;

  if (!clientEmail || !privateKeyRaw) {
    throw new Error('Google Drive credentials missing in environment');
  }

  const privateKey = privateKeyRaw.replace(/\\n/g, '\n');
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  return google.drive({ version: 'v3', auth });
}

async function uploadBufferToDrive({
  fileBuffer,
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
      body: Buffer.from(fileBuffer),
    },
    fields: 'id,webViewLink,webContentLink',
  });

  const fileId = response.data.id;
  await drive.permissions.create({
    fileId,
    requestBody: { role: 'reader', type: 'anyone' },
  });

  const meta = await drive.files.get({
    fileId,
    fields: 'id,webViewLink,webContentLink',
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

module.exports = {
  uploadBufferToDrive,
  ensureDriveFolderPath,
};

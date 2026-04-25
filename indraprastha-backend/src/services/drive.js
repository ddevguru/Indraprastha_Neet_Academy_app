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

module.exports = {
  uploadBufferToDrive,
};

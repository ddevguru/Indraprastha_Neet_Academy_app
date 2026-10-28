const path = require('path');
const fs = require('fs');
const os = require('os');
const {
  uploadBufferToDrive,
  ensureDriveFolderPath,
  buildDrivePublicLinks,
} = require('./drive');

const LOCAL_FALLBACK_DIR = path.join(__dirname, '../../uploads/community');
if (!fs.existsSync(LOCAL_FALLBACK_DIR)) {
  try {
    fs.mkdirSync(LOCAL_FALLBACK_DIR, { recursive: true });
  } catch (_) {}
}

/**
 * Uploads media (images, videos, audio, PDFs, whiteboard snapshots)
 * directly to the Admin's Google Drive.
 * 
 * @param {Object} params
 * @param {Buffer} params.fileBuffer - Raw buffer of the file
 * @param {string} params.fileName - Original or generated file name
 * @param {string} params.mimeType - MIME type (image/jpeg, video/mp4, audio/m4a, application/pdf, etc.)
 * @param {string} [params.subfolder='General'] - Subfolder name (e.g., 'Class 11 - Physics', 'Doubt-42')
 * @returns {Promise<{
 *   driveFileId: string,
 *   viewLink: string,
 *   downloadLink: string,
 *   imageLink: string,
 *   storageKey: string,
 *   fileSize: number
 * }>}
 */
async function uploadMediaToAdminDrive({
  fileBuffer,
  fileName,
  mimeType,
  subfolder = 'General',
}) {
  const cleanFileName = (fileName || `media_${Date.now()}`)
    .replace(/[^a-zA-Z0-9._-]/g, '_');
  const buffer = Buffer.isBuffer(fileBuffer)
    ? fileBuffer
    : Buffer.from(fileBuffer || '');
  const fileSize = buffer.length;

  try {
    // 1. Ensure target folder in Admin's Google Drive
    const rootFolderId = process.env.GDRIVE_FOLDER_ID || undefined;
    const folderId = await ensureDriveFolderPath({
      rootFolderId,
      segments: ['Indraprastha Community & Doubts', subfolder],
    });

    // 2. Upload directly to Admin Google Drive
    const result = await uploadBufferToDrive({
      fileBuffer: buffer,
      fileName: `${Date.now()}_${cleanFileName}`,
      mimeType: mimeType || 'application/octet-stream',
      folderId: folderId || undefined,
    });

    return {
      driveFileId: result.fileId || '',
      viewLink: result.webViewLink || result.previewLink || '',
      downloadLink: result.downloadLink || result.webContentLink || '',
      imageLink: result.imageLink || '',
      storageKey: `gdrive://${result.fileId || cleanFileName}`,
      fileSize,
      isGoogleDrive: true,
    };
  } catch (driveErr) {
    console.warn('[COMMUNITY_DRIVE_UPLOAD_WARNING] Google Drive direct upload error, falling back locally:', driveErr.message);

    // Local fallback for resilience
    const localFileName = `${Date.now()}_${cleanFileName}`;
    const localFilePath = path.join(LOCAL_FALLBACK_DIR, localFileName);
    fs.writeFileSync(localFilePath, buffer);

    const fallbackUrl = `/api/community/files/local/${encodeURIComponent(localFileName)}`;
    return {
      driveFileId: '',
      viewLink: fallbackUrl,
      downloadLink: fallbackUrl,
      imageLink: fallbackUrl,
      storageKey: `local://${localFileName}`,
      fileSize,
      isGoogleDrive: false,
    };
  }
}

module.exports = {
  uploadMediaToAdminDrive,
  LOCAL_FALLBACK_DIR,
};

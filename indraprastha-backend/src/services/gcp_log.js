/**
 * Structured logs for Google Cloud Logging (Cloud Run / GCE / GKE).
 * Writes JSON to stdout/stderr — Cloud Console picks these up automatically.
 */
function writeGcpLog(severity, message, metadata = {}) {
  const entry = {
    severity,
    message,
    service: 'indraprastha-backend',
    ...metadata,
    timestamp: new Date().toISOString(),
  };
  const line = JSON.stringify(entry);
  if (severity === 'ERROR' || severity === 'CRITICAL' || severity === 'ALERT') {
    console.error(line);
  } else if (severity === 'WARNING') {
    console.warn(line);
  } else {
    console.log(line);
  }
}

function logError(message, metadata = {}) {
  writeGcpLog('ERROR', message, metadata);
}

function logWarning(message, metadata = {}) {
  writeGcpLog('WARNING', message, metadata);
}

function logInfo(message, metadata = {}) {
  writeGcpLog('INFO', message, metadata);
}

module.exports = {
  writeGcpLog,
  logError,
  logWarning,
  logInfo,
};

// ============================================================
// Error Logging Service - Logs to GCP Cloud Logging
// ============================================================

const fs = require('fs');
const path = require('path');

// Initialize GCP Cloud Logging if credentials available
let cloudLogging = null;
let cloudLoggingError = null;

function _initCloudLogging() {
  if (cloudLogging) return cloudLogging;

  try {
    const rawJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    let credentials = null;
    let projectId = process.env.GCP_PROJECT_ID;

    if (rawJson && rawJson.trim().length > 0) {
      try {
        let str = rawJson.trim();
        if ((str.startsWith("'") && str.endsWith("'")) || (str.startsWith('"') && str.endsWith('"'))) {
          str = str.slice(1, -1);
        }
        if (str.startsWith('{')) {
          const parsed = JSON.parse(str);
          projectId = projectId || parsed.project_id;
          if (parsed.client_email && parsed.private_key) {
            credentials = {
              client_email: parsed.client_email,
              private_key: parsed.private_key.replace(/\\n/g, '\n'),
            };
          }
        }
      } catch (pErr) {
        console.warn('[LOGGER] Service account JSON parse warning:', pErr.message);
      }
    }

    if (process.env.GOOGLE_APPLICATION_CREDENTIALS || projectId || credentials) {
      const { Logging } = require('@google-cloud/logging');
      const loggingOptions = {};
      if (projectId) loggingOptions.projectId = projectId;
      if (credentials) loggingOptions.credentials = credentials;

      cloudLogging = new Logging(loggingOptions);
      console.log(`[LOGGER] GCP Cloud Logging initialized successfully (Project ID: ${projectId || 'default'})`);
    }
  } catch (err) {
    cloudLoggingError = err.message;
    console.warn('[LOGGER] GCP Cloud Logging initialization warning:', err.message);
  }
  return cloudLogging;
}

_initCloudLogging();

// Local file logging directory
const LOG_DIR = path.join(__dirname, '../../logs');
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

/**
 * Error Logger - Logs to GCP and local file
 */
class ErrorLogger {
  constructor() {
    this.logName = 'indraprastha-errors';
  }

  /**
   * Log error to both GCP and local file
   */
  async logError(errorData) {
    const {
      errorType = 'UNKNOWN_ERROR',
      message = '',
      stack = '',
      userId = null,
      adminId = null,
      operation = '',
      endpoint = '',
      requestBody = null,
      statusCode = 500,
      details = {}
    } = errorData;

    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      errorType,
      message,
      stack,
      userId,
      adminId,
      operation,
      endpoint,
      requestBody: requestBody ? JSON.stringify(requestBody) : null,
      statusCode,
      details: JSON.stringify(details),
      nodeEnv: process.env.NODE_ENV,
      logLevel: 'ERROR'
    };

    // Log to local file
    this._logToFile(logEntry);

    // Log to GCP Cloud Logging
    if (cloudLogging) {
      this._logToGCP(logEntry);
    }

    // Also log structured JSON for Google Cloud Console
    const { logError: gcpLogError } = require('./gcp_log');
    gcpLogError(message || errorType, {
      errorType,
      operation,
      endpoint,
      statusCode,
      userId,
      adminId,
      details,
    });

    return logEntry;
  }

  /**
   * Log success/info to file (optional)
   */
  async logSuccess(data) {
    const {
      operationType = 'UNKNOWN',
      message = '',
      userId = null,
      adminId = null,
      operation = '',
      endpoint = '',
      statusCode = 200,
      details = {}
    } = data;

    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      operationType,
      message,
      userId,
      adminId,
      operation,
      endpoint,
      statusCode,
      details: JSON.stringify(details),
      nodeEnv: process.env.NODE_ENV,
      logLevel: 'INFO'
    };

    this._logToFile(logEntry);

    if (cloudLogging) {
      this._logToGCP(logEntry).catch((err) => {
        console.error('[LOGGER] Failed to write success to GCP:', err.message);
      });
    }
  }

  /**
   * Write to local log file
   */
  _logToFile(logEntry) {
    try {
      const dateStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const logFile = path.join(LOG_DIR, `${this.logName}-${dateStr}.json`);

      const logContent = JSON.stringify(logEntry) + '\n';
      fs.appendFileSync(logFile, logContent, 'utf8');
    } catch (err) {
      console.error('[LOGGER] Failed to write to local log file:', err.message);
    }
  }

  /**
   * Send to GCP Cloud Logging
   */
  async _logToGCP(logEntry) {
    try {
      if (!cloudLogging) return;

      const log = cloudLogging.log(this.logName);
      const entry = log.entry({ severity: logEntry.logLevel }, logEntry);

      await log.write(entry);
    } catch (err) {
      console.error('[LOGGER] Failed to write to GCP:', err.message);
    }
  }

  /**
   * Get recent logs from local file
   */
  getRecentLogs(days = 7) {
    try {
      const logs = [];
      const now = new Date();

      for (let i = 0; i < days; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const logFile = path.join(LOG_DIR, `${this.logName}-${dateStr}.json`);

        if (fs.existsSync(logFile)) {
          const content = fs.readFileSync(logFile, 'utf8');
          const lines = content.trim().split('\n');
          lines.forEach(line => {
            if (line.trim()) {
              logs.push(JSON.parse(line));
            }
          });
        }
      }

      return logs;
    } catch (err) {
      console.error('[LOGGER] Failed to read local logs:', err.message);
      return [];
    }
  }

  /**
   * Get log files list
   */
  getLogFiles() {
    try {
      if (!fs.existsSync(LOG_DIR)) return [];
      const files = fs.readdirSync(LOG_DIR);
      return files.map(f => ({
        name: f,
        path: path.join(LOG_DIR, f),
        size: fs.statSync(path.join(LOG_DIR, f)).size
      }));
    } catch (err) {
      console.error('[LOGGER] Failed to list log files:', err.message);
      return [];
    }
  }

  /**
   * Get GCP Cloud Logging status
   */
  getStatus() {
    return {
      gcpCloudLoggingActive: !!cloudLogging,
      gcpInitializationError: cloudLoggingError,
      logDir: LOG_DIR,
      nodeEnv: process.env.NODE_ENV,
    };
  }
}

module.exports = new ErrorLogger();

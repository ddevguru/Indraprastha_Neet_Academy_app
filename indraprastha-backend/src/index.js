const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const { ensureDatabaseSchema, loadRuntimeConfigFromDb } = require('./db');

const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const adminRoutes = require('./routes/admin');
const { logError: gcpLogError, logInfo: gcpLogInfo } = require('./services/gcp_log');

const app = express();
const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return cb(null, true);
      }
      return cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false,
  })
);

// Loader.io domain verification — set LOADER_IO_TOKEN=loaderio-xxxxxxxx
// Registered before rate limit so verification always succeeds.
const loaderIoToken = (process.env.LOADER_IO_TOKEN || '').trim();
if (loaderIoToken) {
  const sendLoaderToken = (_req, res) => {
    res.type('text/plain').send(loaderIoToken);
  };
  app.get(`/${loaderIoToken}`, sendLoaderToken);
  app.get(`/${loaderIoToken}.txt`, sendLoaderToken);
}

const rateLimitWindowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000;
const rateLimitMax = Number(process.env.RATE_LIMIT_MAX) || 300;
app.use(
  rateLimit({
    windowMs: rateLimitWindowMs,
    max: rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.get('/health', (_req, res) => res.json({ ok: true }));

app.use((req, res, next) => {
  req.reqStart = Date.now();
  next();
});

app.use((req, res, next) => {
  res.on('finish', () => {
    if (res.statusCode >= 400) {
      gcpLogError('HTTP request failed', {
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        durationMs: req.reqStart ? Date.now() - req.reqStart : null,
      });
    }
  });
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', require('./routes/payments'));

app.use((err, req, res, _next) => {
  const elapsed = req.reqStart ? `${Date.now() - req.reqStart}ms` : 'n/a';
  gcpLogError('Unhandled API error', {
    method: req.method,
    path: req.originalUrl,
    elapsed,
    message: err?.message || 'Unknown error',
    stack: err?.stack,
  });
  if (res.headersSent) return;
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    gcpLogInfo('Initializing database schema');
    await ensureDatabaseSchema();
    gcpLogInfo('Database schema ready');
    await loadRuntimeConfigFromDb();
    app.listen(PORT, () => {
      gcpLogInfo('Backend server started', { port: PORT });
    });
  } catch (error) {
    gcpLogError('Failed to initialize database schema', {
      message: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
}

startServer();
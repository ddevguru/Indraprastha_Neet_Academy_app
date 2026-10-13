require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// ════════ CORS CONFIGURATION ════════
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.CORS_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev mode for smooth pair programming
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ════════ BODY PARSERS ════════
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ════════ REQUEST LOGGER ════════
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// ════════ HEALTH CHECK ════════
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Indraprastha NEET Academy Student Auth Service',
    time: new Date().toISOString(),
    port: PORT,
  });
});

// ════════ API ROUTES ════════
app.use('/api/auth', authRoutes);

// ════════ 404 HANDLER ════════
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.originalUrl} not found on Indraprastha Backend Server.`,
  });
});

// ════════ GLOBAL ERROR HANDLER ════════
app.use((err, req, res, _next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
});

// ════════ START SERVER ════════
const { testDbConnection } = require('./db');

app.listen(PORT, async () => {
  await testDbConnection();
  console.log(`
╔═════════════════════════════════════════════════════════════════╗
║   🩺 INDRAPRASTHA NEET ACADEMY — STUDENT AUTH BACKEND (NODE)    ║
╠═════════════════════════════════════════════════════════════════╣
║   🚀 Server running on: http://localhost:${PORT}                 ║
║   🔗 Health check:      http://localhost:${PORT}/api/health          ║
║   🔑 Auth endpoints:    http://localhost:${PORT}/api/auth            ║
║   🐘 Database:          PostgreSQL (Shared with Mobile App)     ║
║   📦 Database Name:     ${process.env.DB_NAME || 'indraprastha_db'}                        ║
║   🔥 Firebase Auth:     Google Sign-In & Phone SMS OTP Active   ║
║   📱 Test OTP Code:     123456 (or generated in response)       ║
╚═════════════════════════════════════════════════════════════════╝
  `);
});

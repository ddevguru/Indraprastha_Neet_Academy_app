const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { ensureDatabaseSchema } = require('./db');

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await ensureDatabaseSchema();
    app.listen(PORT, () => {
      console.log(`🚀 Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize database schema:', error);
    process.exit(1);
  }
}

startServer();
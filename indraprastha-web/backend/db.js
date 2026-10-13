const { Pool } = require('pg');
require('dotenv').config();

const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);

const pool = new Pool(
  hasDatabaseUrl
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl:
          process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 3000,
      }
    : {
        host: process.env.DB_HOST || '127.0.0.1',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        database: process.env.DB_NAME || 'indraprastha_db',
        user: process.env.DB_USER || 'neetadmin',
        password: process.env.DB_PASSWORD || 'Indraprastha@123',
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 3000,
      }
);

// Health test query helper
async function testDbConnection() {
  try {
    const res = await pool.query('SELECT NOW() AS now, current_database() AS db');
    console.log(`✅ [PostgreSQL] Connected to '${res.rows[0].db}' at ${res.rows[0].now}`);
    return true;
  } catch (err) {
    console.error('❌ [PostgreSQL] Connection error:', err.message);
    return false;
  }
}

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
  testDbConnection,
};

#!/usr/bin/env node
/**
 * Create / update all database tables using env vars (DATABASE_URL or DB_*).
 *
 * Usage (from indraprastha-backend folder):
 *   npm run db:setup
 *
 * Requires .env with DATABASE_URL or DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
 */
require('dotenv').config();

const { ensureDatabaseSchema } = require('../src/db');

async function main() {
  const hasUrl = Boolean(process.env.DATABASE_URL);
  const hasParts =
    process.env.DB_HOST && process.env.DB_NAME && process.env.DB_USER;

  if (!hasUrl && !hasParts) {
    console.error(
      '[DB_SETUP] Missing database config. Set DATABASE_URL or DB_HOST/DB_NAME/DB_USER/DB_PASSWORD in .env'
    );
    process.exit(1);
  }

  console.error(
    JSON.stringify({
      severity: 'INFO',
      message: 'Starting database schema setup',
      database: hasUrl ? 'DATABASE_URL' : process.env.DB_NAME,
      timestamp: new Date().toISOString(),
    })
  );

  try {
    await ensureDatabaseSchema();
    console.error(
      JSON.stringify({
        severity: 'INFO',
        message: 'Database schema setup completed successfully',
        timestamp: new Date().toISOString(),
      })
    );
    process.exit(0);
  } catch (error) {
    console.error(
      JSON.stringify({
        severity: 'ERROR',
        message: 'Database schema setup failed',
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      })
    );
    process.exit(1);
  }
}

main();

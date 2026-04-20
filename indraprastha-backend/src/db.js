const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function ensureDatabaseSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      phone VARCHAR(15) UNIQUE NOT NULL,
      full_name VARCHAR(100),
      preferred_language VARCHAR(40) DEFAULT 'English',
      target_exam_year VARCHAR(20) DEFAULT 'NEET',
      preferred_plan VARCHAR(50) DEFAULT 'Starter',
      course_category VARCHAR(100),
      college_state VARCHAR(100),
      mbbs_admission_year VARCHAR(20),
      medical_college VARCHAR(200),
      is_profile_complete BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS otp_sessions (
      id SERIAL PRIMARY KEY,
      phone VARCHAR(15) UNIQUE NOT NULL,
      otp_code VARCHAR(6) NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      verified_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS colleges (
      id SERIAL PRIMARY KEY,
      state VARCHAR(100) NOT NULL,
      name VARCHAR(200) NOT NULL
    );
  `);

  const collegeCount = await pool.query('SELECT COUNT(*)::int AS count FROM colleges');
  if (collegeCount.rows[0].count === 0) {
    await pool.query(`
      INSERT INTO colleges (state, name) VALUES
      ('Delhi', 'AIIMS Delhi'),
      ('Delhi', 'Maulana Azad Medical College'),
      ('Delhi', 'Lady Hardinge Medical College'),
      ('Maharashtra', 'Grant Medical College'),
      ('Maharashtra', 'Seth GS Medical College'),
      ('Karnataka', 'Bangalore Medical College'),
      ('Karnataka', 'Mysore Medical College'),
      ('Andhra Pradesh', 'Guntur Medical College'),
      ('Uttar Pradesh', 'King George''s Medical University'),
      ('Tamil Nadu', 'Madras Medical College'),
      ('Rajasthan', 'SMS Medical College'),
      ('Foreign Medical Graduates', 'Foreign University');
    `);
  }
}

module.exports = {
  pool,
  ensureDatabaseSchema,
};
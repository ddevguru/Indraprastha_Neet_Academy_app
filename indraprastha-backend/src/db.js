const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
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
      }
    : {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      }
);

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
      active_session_id TEXT,
      is_profile_complete BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS active_session_id TEXT;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS courses (
      id SERIAL PRIMARY KEY,
      name VARCHAR(120) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS batches (
      id SERIAL PRIMARY KEY,
      course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      name VARCHAR(180) NOT NULL UNIQUE,
      target_year VARCHAR(20),
      class_label VARCHAR(40),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS batch_id INTEGER REFERENCES batches(id);
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

  await pool.query(`
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      batch_id INTEGER NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
      class_label VARCHAR(40),
      title VARCHAR(200) NOT NULL,
      subject VARCHAR(80) NOT NULL,
      topic VARCHAR(140) DEFAULT '',
      level VARCHAR(80) DEFAULT 'Core',
      category VARCHAR(100) DEFAULT 'NCERT books',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    ALTER TABLE books
    ADD COLUMN IF NOT EXISTS class_label VARCHAR(40);
  `);

  await pool.query(`
    ALTER TABLE books
    ADD COLUMN IF NOT EXISTS topic VARCHAR(140) DEFAULT '';
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS book_chapters (
      id SERIAL PRIMARY KEY,
      book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
      title VARCHAR(200) NOT NULL,
      overview TEXT DEFAULT '',
      note_summary TEXT DEFAULT '',
      highlight TEXT DEFAULT '',
      material_type VARCHAR(20) DEFAULT 'text',
      material_drive_link TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    ALTER TABLE book_chapters
    ADD COLUMN IF NOT EXISTS material_type VARCHAR(20) DEFAULT 'text';
  `);

  await pool.query(`
    ALTER TABLE book_chapters
    ADD COLUMN IF NOT EXISTS material_drive_link TEXT;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS pyqs (
      id SERIAL PRIMARY KEY,
      chapter_id INTEGER NOT NULL REFERENCES book_chapters(id) ON DELETE CASCADE,
      question TEXT NOT NULL,
      option_a TEXT NOT NULL,
      option_b TEXT NOT NULL,
      option_c TEXT NOT NULL,
      option_d TEXT NOT NULL,
      correct_option CHAR(1) NOT NULL,
      explanation TEXT DEFAULT '',
      year_label VARCHAR(20) DEFAULT 'NEET',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS practice_sets (
      id SERIAL PRIMARY KEY,
      batch_id INTEGER NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
      class_label VARCHAR(40),
      subject VARCHAR(80) DEFAULT '',
      title VARCHAR(200) NOT NULL,
      topic VARCHAR(140) NOT NULL,
      difficulty VARCHAR(30) DEFAULT 'Moderate',
      estimated_minutes INTEGER DEFAULT 20,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    ALTER TABLE practice_sets
    ADD COLUMN IF NOT EXISTS class_label VARCHAR(40);
  `);

  await pool.query(`
    ALTER TABLE practice_sets
    ADD COLUMN IF NOT EXISTS subject VARCHAR(80) DEFAULT '';
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS practice_questions (
      id SERIAL PRIMARY KEY,
      practice_set_id INTEGER NOT NULL REFERENCES practice_sets(id) ON DELETE CASCADE,
      question TEXT NOT NULL,
      option_a TEXT NOT NULL,
      option_b TEXT NOT NULL,
      option_c TEXT NOT NULL,
      option_d TEXT NOT NULL,
      correct_option CHAR(1) NOT NULL,
      explanation TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS tests (
      id SERIAL PRIMARY KEY,
      batch_id INTEGER NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
      class_label VARCHAR(40),
      subject VARCHAR(80) DEFAULT '',
      topic VARCHAR(140) DEFAULT '',
      title VARCHAR(220) NOT NULL,
      category VARCHAR(60) DEFAULT 'Grand test',
      duration_minutes INTEGER DEFAULT 180,
      marks INTEGER DEFAULT 720,
      question_count INTEGER DEFAULT 180,
      syllabus_coverage TEXT DEFAULT '',
      schedule_label VARCHAR(80) DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    ALTER TABLE tests
    ADD COLUMN IF NOT EXISTS class_label VARCHAR(40);
  `);

  await pool.query(`
    ALTER TABLE tests
    ADD COLUMN IF NOT EXISTS subject VARCHAR(80) DEFAULT '';
  `);

  await pool.query(`
    ALTER TABLE tests
    ADD COLUMN IF NOT EXISTS topic VARCHAR(140) DEFAULT '';
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS test_questions (
      id SERIAL PRIMARY KEY,
      test_id INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
      subject VARCHAR(80) DEFAULT 'Biology',
      question TEXT NOT NULL,
      option_a TEXT NOT NULL,
      option_b TEXT NOT NULL,
      option_c TEXT NOT NULL,
      option_d TEXT NOT NULL,
      correct_option CHAR(1) NOT NULL,
      explanation TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS test_attempts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      test_id INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
      score INTEGER NOT NULL,
      accuracy NUMERIC(5,2) NOT NULL DEFAULT 0,
      attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS videos (
      id SERIAL PRIMARY KEY,
      batch_id INTEGER NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
      class_label VARCHAR(40),
      title VARCHAR(220) NOT NULL,
      subject VARCHAR(80) NOT NULL,
      topic VARCHAR(140) DEFAULT '',
      chapter_hint VARCHAR(200) DEFAULT '',
      section_label VARCHAR(120) DEFAULT 'Concept explainers',
      duration_label VARCHAR(40) DEFAULT '15 min',
      drive_link TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    ALTER TABLE videos
    ADD COLUMN IF NOT EXISTS class_label VARCHAR(40);
  `);

  await pool.query(`
    ALTER TABLE videos
    ADD COLUMN IF NOT EXISTS topic VARCHAR(140) DEFAULT '';
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(80) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS exam_analytics (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      test_id INTEGER REFERENCES tests(id) ON DELETE SET NULL,
      overall_accuracy NUMERIC(5,2) DEFAULT 0,
      correct_count INTEGER DEFAULT 0,
      wrong_count INTEGER DEFAULT 0,
      unattempted_count INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS ai_insights (
      id SERIAL PRIMARY KEY,
      analytics_id INTEGER NOT NULL REFERENCES exam_analytics(id) ON DELETE CASCADE,
      insight_title VARCHAR(200) NOT NULL,
      insight_body TEXT NOT NULL,
      priority VARCHAR(20) DEFAULT 'medium',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

  const courseResult = await pool.query(
    `INSERT INTO courses (name)
     VALUES ('Neet Dropper Batch')
     ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
     RETURNING id`
  );
  const courseId = courseResult.rows[0].id;

  await pool.query(
    `INSERT INTO batches (course_id, name, target_year, class_label)
     VALUES
      ($1, 'Target Neet 2028 - Class 11th Going', '2028', 'Class 11'),
      ($1, 'Target Neet 2027 - Class 12th Going', '2027', 'Class 12'),
      ($1, 'Target Neet 2027 - Dropper Batch', '2027', 'Dropper')
     ON CONFLICT (name) DO NOTHING`,
    [courseId]
  );

  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin@123';
  const adminPasswordHash = await bcrypt.hash(adminPassword, 10);
  await pool.query(
    `INSERT INTO admin_users (username, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (username) DO NOTHING`,
    [adminUser, adminPasswordHash]
  );
}

module.exports = {
  pool,
  ensureDatabaseSchema,
};
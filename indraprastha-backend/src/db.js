const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { normalizeTestCategory } = require('./utils/categoryHelper');

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
        min: 2,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        statement_timeout: 30000,
      }
    : {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        max: 20,
        min: 2,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        statement_timeout: 30000,
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
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS password_hash TEXT;
  `);

  await pool.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS is_blocked BOOLEAN DEFAULT FALSE;
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
    CREATE TABLE IF NOT EXISTS classes (
      id SERIAL PRIMARY KEY,
      name VARCHAR(60) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS subjects (
      id SERIAL PRIMARY KEY,
      class_id INTEGER REFERENCES classes(id) ON DELETE SET NULL,
      name VARCHAR(80) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (class_id, name)
    );
  `);

  await pool.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS batch_id INTEGER REFERENCES batches(id);
  `);

  await pool.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS firebase_uid TEXT UNIQUE;
  `);

  await pool.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS email VARCHAR(255);
  `);

  await pool.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS onboarding_checklist JSONB DEFAULT '{}'::jsonb;
  `);

  await pool.query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS onboarding_checklist_dismissed BOOLEAN DEFAULT FALSE;
  `);

  await pool.query(`
    ALTER TABLE users
    ALTER COLUMN phone DROP NOT NULL;
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
    ALTER TABLE book_chapters
    ADD COLUMN IF NOT EXISTS material_drive_file_id TEXT DEFAULT '';
  `);
  await pool.query(`
    ALTER TABLE book_chapters
    ADD COLUMN IF NOT EXISTS material_drive_folder_id TEXT DEFAULT '';
  `);

  // Backfill NULL -> '' so JS string .length checks work on old rows
  await pool.query(`
    UPDATE book_chapters
    SET
      material_drive_file_id   = COALESCE(material_drive_file_id, ''),
      material_drive_folder_id = COALESCE(material_drive_folder_id, '')
    WHERE material_drive_file_id IS NULL OR material_drive_folder_id IS NULL;
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
    ALTER TABLE pyqs
    ADD COLUMN IF NOT EXISTS question_image_link TEXT;
  `);
  await pool.query(`
    ALTER TABLE pyqs
    ADD COLUMN IF NOT EXISTS question_image_drive_file_id TEXT;
  `);
  await pool.query(`
    ALTER TABLE pyqs
    ADD COLUMN IF NOT EXISTS question_image_drive_folder_id TEXT;
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
    ALTER TABLE practice_questions
    ADD COLUMN IF NOT EXISTS question_image_link TEXT;
  `);
  await pool.query(`
    ALTER TABLE practice_questions
    ADD COLUMN IF NOT EXISTS question_image_drive_file_id TEXT;
  `);
  await pool.query(`
    ALTER TABLE practice_questions
    ADD COLUMN IF NOT EXISTS question_image_drive_folder_id TEXT;
  `);
  await pool.query(`
    ALTER TABLE practice_questions
    ADD COLUMN IF NOT EXISTS explanation_image_link TEXT;
  `);
  await pool.query(`
    ALTER TABLE practice_questions
    ADD COLUMN IF NOT EXISTS explanation_image_drive_file_id TEXT;
  `);
  await pool.query(`
    ALTER TABLE practice_questions
    ADD COLUMN IF NOT EXISTS explanation_image_drive_folder_id TEXT DEFAULT '';
  `);
  await pool.query(`
    ALTER TABLE practice_questions
    ADD COLUMN IF NOT EXISTS explanation_video_link TEXT DEFAULT '';
  `);
  await pool.query(`
    ALTER TABLE practice_questions
    ADD COLUMN IF NOT EXISTS explanation_video_drive_file_id TEXT DEFAULT '';
  `);
  await pool.query(`
    ALTER TABLE practice_questions
    ADD COLUMN IF NOT EXISTS explanation_video_drive_folder_id TEXT DEFAULT '';
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

  try {
    const existingTests = await pool.query('SELECT id, title, category, subject, topic FROM tests');
    for (const t of existingTests.rows) {
      const norm = normalizeTestCategory(t);
      if (t.category !== norm) {
        await pool.query('UPDATE tests SET category = $1 WHERE id = $2', [norm, t.id]);
      }
    }
  } catch (err) {
    console.error('Test category auto-normalization warning:', err?.message);
  }

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
    ALTER TABLE test_questions
    ADD COLUMN IF NOT EXISTS question_image_link TEXT;
  `);
  await pool.query(`
    ALTER TABLE test_questions
    ADD COLUMN IF NOT EXISTS question_image_drive_file_id TEXT;
  `);
  await pool.query(`
    ALTER TABLE test_questions
    ADD COLUMN IF NOT EXISTS question_image_drive_folder_id TEXT;
  `);
  await pool.query(`
    ALTER TABLE test_questions
    ADD COLUMN IF NOT EXISTS explanation_image_link TEXT;
  `);
  await pool.query(`
    ALTER TABLE test_questions
    ADD COLUMN IF NOT EXISTS explanation_image_drive_file_id TEXT;
  `);
  await pool.query(`
    ALTER TABLE test_questions
    ADD COLUMN IF NOT EXISTS explanation_image_drive_folder_id TEXT DEFAULT '';
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
    CREATE TABLE IF NOT EXISTS test_attempt_details (
      id SERIAL PRIMARY KEY,
      test_attempt_id INTEGER REFERENCES test_attempts(id) ON DELETE CASCADE,
      question_id INTEGER REFERENCES test_questions(id) ON DELETE SET NULL,
      subject VARCHAR(80),
      topic VARCHAR(140),
      is_correct BOOLEAN DEFAULT FALSE,
      time_taken_seconds INTEGER DEFAULT 0,
      user_answer VARCHAR(10),
      correct_answer VARCHAR(10),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_test_attempt_details_test_attempt ON test_attempt_details(test_attempt_id);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_test_attempt_details_subject_topic ON test_attempt_details(subject, topic);`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_analytics (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
      total_tests_taken INTEGER DEFAULT 0,
      average_score NUMERIC(5,2) DEFAULT 0,
      average_accuracy NUMERIC(5,2) DEFAULT 0,
      physics_accuracy NUMERIC(5,2) DEFAULT 0,
      chemistry_accuracy NUMERIC(5,2) DEFAULT 0,
      biology_accuracy NUMERIC(5,2) DEFAULT 0,
      topic_accuracy JSONB DEFAULT '{}',
      weak_topics TEXT[] DEFAULT '{}',
      strong_topics TEXT[] DEFAULT '{}',
      average_time_per_question NUMERIC(5,2) DEFAULT 0,
      speed_trend JSONB DEFAULT '{}',
      daily_study_hours NUMERIC(5,2) DEFAULT 0,
      study_hours_history JSONB DEFAULT '{}',
      predicted_neet_score INTEGER DEFAULT 0,
      predicted_neet_rank INTEGER DEFAULT 0,
      prediction_confidence NUMERIC(5,2) DEFAULT 0,
      current_study_streak INTEGER DEFAULT 0,
      longest_study_streak INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_user_analytics_user_id ON user_analytics(user_id);`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS study_logs (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      date DATE,
      study_hours NUMERIC(5,2) DEFAULT 0,
      questions_attempted INTEGER DEFAULT 0,
      questions_correct INTEGER DEFAULT 0,
      tests_taken INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, date)
    );
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_study_logs_user_id_date ON study_logs(user_id, date);`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS topic_performance (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      subject VARCHAR(80),
      topic VARCHAR(140),
      accuracy NUMERIC(5,2) DEFAULT 0,
      questions_attempted INTEGER DEFAULT 0,
      questions_correct INTEGER DEFAULT 0,
      last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, subject, topic)
    );
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_topic_performance_user_id ON topic_performance(user_id);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_topic_performance_accuracy ON topic_performance(accuracy);`);


  await pool.query(`
    CREATE TABLE IF NOT EXISTS practice_attempts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      practice_set_id INTEGER NOT NULL REFERENCES practice_sets(id) ON DELETE CASCADE,
      score INTEGER NOT NULL DEFAULT 0,
      accuracy NUMERIC(5,2) NOT NULL DEFAULT 0,
      correct_count INTEGER NOT NULL DEFAULT 0,
      wrong_count INTEGER NOT NULL DEFAULT 0,
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
    CREATE TABLE IF NOT EXISTS packages (
      id SERIAL PRIMARY KEY,
      name VARCHAR(120) UNIQUE NOT NULL,
      price_label VARCHAR(60) NOT NULL,
      validity VARCHAR(60) NOT NULL,
      highlight TEXT DEFAULT '',
      features_json JSONB DEFAULT '[]'::jsonb,
      is_active BOOLEAN DEFAULT TRUE,
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

  await pool.query(`
    CREATE TABLE IF NOT EXISTS app_config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS daily_mcqs (
      id SERIAL PRIMARY KEY,
      batch_id INTEGER NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
      class_label VARCHAR(40),
      subject VARCHAR(80) DEFAULT '',
      topic VARCHAR(140) DEFAULT '',
      question TEXT NOT NULL,
      option_a TEXT NOT NULL,
      option_b TEXT NOT NULL,
      option_c TEXT NOT NULL,
      option_d TEXT NOT NULL,
      correct_option CHAR(1) NOT NULL,
      explanation TEXT DEFAULT '',
      question_image_link TEXT,
      question_image_drive_file_id TEXT,
      question_image_drive_folder_id TEXT DEFAULT '',
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS fcm_tokens (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      token TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_fcm_tokens_user_id ON fcm_tokens(user_id);`);

  await pool.query(`
    ALTER TABLE packages
    ADD COLUMN IF NOT EXISTS amount_inr NUMERIC(10,2) DEFAULT 0;
  `);

  await pool.query(`
    ALTER TABLE practice_sets
    ADD COLUMN IF NOT EXISTS source_type VARCHAR(40) DEFAULT 'topic_mcq';
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS payment_orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      package_id INTEGER NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
      order_id VARCHAR(120) UNIQUE NOT NULL,
      cf_order_id VARCHAR(120),
      payment_session_id TEXT,
      amount_inr NUMERIC(10,2) NOT NULL DEFAULT 0,
      currency VARCHAR(10) DEFAULT 'INR',
      status VARCHAR(40) DEFAULT 'CREATED',
      gateway_response JSONB,
      paid_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_subscriptions (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      package_id INTEGER REFERENCES packages(id) ON DELETE SET NULL,
      payment_order_id INTEGER REFERENCES payment_orders(id) ON DELETE SET NULL,
      plan_name VARCHAR(120) DEFAULT '',
      status VARCHAR(40) DEFAULT 'inactive',
      starts_at TIMESTAMP,
      expires_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`CREATE INDEX IF NOT EXISTS idx_payment_orders_user_id ON payment_orders(user_id);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);`);

  // Performance indexes for frequent mobile/admin listing filters.
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_users_batch_id ON users(batch_id);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_books_batch_class_subject_topic ON books(batch_id, class_label, subject, topic);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_book_chapters_book_id ON book_chapters(book_id);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_pyqs_chapter_id ON pyqs(chapter_id);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_practice_sets_batch_class_subject_topic ON practice_sets(batch_id, class_label, subject, topic);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_practice_questions_set_id ON practice_questions(practice_set_id);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_tests_batch_class_subject_topic ON tests(batch_id, class_label, subject, topic);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_test_questions_test_id ON test_questions(test_id);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_daily_mcqs_batch_active ON daily_mcqs(batch_id, is_active);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_videos_batch_class_subject_topic ON videos(batch_id, class_label, subject, topic);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_exam_analytics_user_created ON exam_analytics(user_id, created_at DESC);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_test_attempts_user_test ON test_attempts(user_id, test_id, attempted_at DESC);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_practice_attempts_user_set ON practice_attempts(user_id, practice_set_id, attempted_at DESC);`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS slider_images (
      id SERIAL PRIMARY KEY,
      title VARCHAR(200) DEFAULT '',
      image_url TEXT NOT NULL,
      target_link TEXT DEFAULT '',
      display_order INT DEFAULT 0,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const sliderCount = await pool.query('SELECT COUNT(*)::int AS count FROM slider_images');
  if (sliderCount.rows[0].count === 0) {
    await pool.query(`
      INSERT INTO slider_images (title, image_url, display_order, is_active) VALUES
      ('NEET 2026/2027 Rank Booster', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&auto=format&fit=crop&q=80', 1, TRUE),
      ('Biology NCERT Line-by-Line', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80', 2, TRUE),
      ('Full Syllabus Mock Test Series', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80', 3, TRUE),
      ('Physics & Chemistry Formula Sheets', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80', 4, TRUE),
      ('Daily Revision & Target Practice', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&auto=format&fit=crop&q=80', 5, TRUE);
    `);
  }

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

  await pool.query(
    `INSERT INTO classes (name)
     VALUES ('Class 11'), ('Class 12'), ('Dropper')
     ON CONFLICT (name) DO NOTHING`
  );

  await pool.query(
    `INSERT INTO packages (name, price_label, validity, highlight, features_json, is_active, amount_inr)
     VALUES
      ('Starter', 'Rs 2999', '1 year', 'Full 1 Year Access until NEET Exam', '["Practice sets","Topic tests","1 Year Access"]'::jsonb, TRUE, 2999),
      ('Rank Pro', 'Rs 4999', '1 year', 'Advanced prep for 1 Year until NEET Exam', '["Full test series","Detailed analytics","Video lectures","1 Year Access"]'::jsonb, TRUE, 4999)
     ON CONFLICT (name) DO NOTHING`
  );

  await pool.query(`
    UPDATE packages
    SET validity = '1 year',
        price_label = 'Rs 2999',
        amount_inr = 2999
    WHERE LOWER(name) = 'starter'
  `);

  await pool.query(`
    UPDATE packages
    SET validity = '1 year'
    WHERE validity IS NULL OR validity != '1 year'
  `);

  await pool.query(
    `INSERT INTO subjects (class_id, name)
     SELECT c.id, s.name
     FROM classes c
     CROSS JOIN (VALUES ('Physics'), ('Chemistry'), ('Biology'), ('Botany'), ('Zoology')) AS s(name)
     ON CONFLICT (class_id, name) DO NOTHING`
  );

  await pool.query(`
    CREATE TABLE IF NOT EXISTS complaints (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      full_name VARCHAR(100),
      email VARCHAR(100),
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      status VARCHAR(50) DEFAULT 'open',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    ALTER TABLE complaints
    ADD COLUMN IF NOT EXISTS full_name VARCHAR(100);
  `);

  await pool.query(`
    ALTER TABLE complaints
    ADD COLUMN IF NOT EXISTS email VARCHAR(100);
  `);

  await pool.query(`
    ALTER TABLE complaints
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
  `);

  await pool.query(`
    ALTER TABLE complaints
    ADD COLUMN IF NOT EXISTS report_type VARCHAR(50) DEFAULT 'general';
  `);

  await pool.query(`
    ALTER TABLE complaints
    ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
  `);

  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin@123';
  const adminPasswordHash = await bcrypt.hash(adminPassword, 10);
  await pool.query(
    `INSERT INTO admin_users (username, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (username) DO NOTHING`,
    [adminUser, adminPasswordHash]
  );

  // Create streaks tracking tables
  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_streaks (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      activity_date DATE NOT NULL,
      streak_count INTEGER DEFAULT 0,
      last_active_time TIMESTAMP,
      duration_minutes INTEGER DEFAULT 0,
      activity_type VARCHAR(50),
      activity_count INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (user_id, activity_date)
    );
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_user_streaks_user_date ON user_streaks(user_id, activity_date DESC);`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_activities (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      activity_date DATE NOT NULL,
      activity_type VARCHAR(50) NOT NULL,
      activity_count INTEGER DEFAULT 0,
      duration_minutes INTEGER DEFAULT 0,
      metadata JSONB,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_user_activities_user_date ON user_activities(user_id, activity_date DESC);`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_content_views (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      content_id INTEGER,
      content_name VARCHAR(255) NOT NULL,
      content_type VARCHAR(50),
      viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_user_content_views_user_date ON user_content_views(user_id, viewed_at DESC);`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_answers (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      question_id INTEGER NOT NULL,
      practice_set_id INTEGER,
      test_id INTEGER,
      option_key VARCHAR(5) NOT NULL,
      is_correct BOOLEAN DEFAULT FALSE,
      answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_user_answers_stats ON user_answers(question_id, option_key);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_user_answers_practice_set ON user_answers(practice_set_id, question_id);`);

  // Admin-sent push notification history
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_notifications (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      image_url TEXT,
      target_type VARCHAR(20) DEFAULT 'all',
      target_user_ids INTEGER[],
      sent_count INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Ensure test_questions has chapter and topic
  await pool.query(`ALTER TABLE test_questions ADD COLUMN IF NOT EXISTS chapter VARCHAR(140) DEFAULT '';`);
  await pool.query(`ALTER TABLE test_questions ADD COLUMN IF NOT EXISTS topic VARCHAR(140) DEFAULT '';`);

  // Test Benchmarks table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS test_benchmarks (
      id SERIAL PRIMARY KEY,
      test_id INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE UNIQUE,
      total_participants INTEGER DEFAULT 0,
      top100_count INTEGER DEFAULT 0,
      overall_average_score NUMERIC(7,2) DEFAULT 0,
      top100_average_score NUMERIC(7,2) DEFAULT 0,
      subject_benchmarks JSONB DEFAULT '[]'::jsonb,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_test_benchmarks_test_id ON test_benchmarks(test_id);`);

  // Student Test Analytics table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS student_test_analytics (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      test_id INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
      attempt_id INTEGER REFERENCES test_attempts(id) ON DELETE CASCADE,
      score INTEGER NOT NULL DEFAULT 0,
      total_marks INTEGER DEFAULT 720,
      rank INTEGER DEFAULT 1,
      total_participants INTEGER DEFAULT 1,
      performance_category VARCHAR(50) DEFAULT 'Average',
      subject_analysis JSONB DEFAULT '[]'::jsonb,
      topic_analysis JSONB DEFAULT '[]'::jsonb,
      weak_topics JSONB DEFAULT '[]'::jsonb,
      strong_topics JSONB DEFAULT '[]'::jsonb,
      priority_areas JSONB DEFAULT '[]'::jsonb,
      historical_performance JSONB DEFAULT '[]'::jsonb,
      topic_improvement JSONB DEFAULT '[]'::jsonb,
      recommended_practice JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT unique_student_test_attempt UNIQUE (user_id, test_id, attempt_id)
    );
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_student_test_analytics_user_test ON student_test_analytics(user_id, test_id);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_student_test_analytics_attempt ON student_test_analytics(attempt_id);`);

  // AI Test Analysis table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ai_test_analysis (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      test_id INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
      attempt_id INTEGER REFERENCES test_attempts(id) ON DELETE CASCADE,
      ai_response JSONB NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT unique_ai_test_attempt UNIQUE (user_id, test_id, attempt_id)
    );
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_ai_test_analysis_user_test ON ai_test_analysis(user_id, test_id);`);

  // AI Similar Question Batches
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ai_similar_question_batches (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      source_question_id INTEGER,
      source_type VARCHAR(20) DEFAULT 'test',
      test_id INTEGER,
      subject VARCHAR(100) NOT NULL,
      chapter VARCHAR(150) NOT NULL,
      topic VARCHAR(150) DEFAULT '',
      concept VARCHAR(150) DEFAULT '',
      difficulty VARCHAR(30) DEFAULT 'Medium',
      requested_count INTEGER NOT NULL,
      valid_count INTEGER NOT NULL,
      model VARCHAR(60) NOT NULL,
      status VARCHAR(30) DEFAULT 'completed',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_ai_batches_user ON ai_similar_question_batches(user_id);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_ai_batches_source_q ON ai_similar_question_batches(source_question_id);`);

  // AI Similar Questions
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ai_similar_questions (
      id SERIAL PRIMARY KEY,
      batch_id INTEGER NOT NULL REFERENCES ai_similar_question_batches(id) ON DELETE CASCADE,
      question_text TEXT NOT NULL,
      option_a TEXT NOT NULL,
      option_b TEXT NOT NULL,
      option_c TEXT NOT NULL,
      option_d TEXT NOT NULL,
      correct_option CHAR(1) NOT NULL,
      explanation TEXT NOT NULL,
      user_answer CHAR(1),
      is_correct BOOLEAN,
      answered_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_ai_similar_q_batch ON ai_similar_questions(batch_id);`);
}

async function loadRuntimeConfigFromDb() {
  const rows = await pool.query(
    `SELECT key, value
     FROM app_config
     WHERE key IN ('GDRIVE_OAUTH_REFRESH_TOKEN', 'FIREBASE_SERVICE_ACCOUNT_JSON')`
  );
  for (const row of rows.rows) {
    process.env[row.key] = row.value;
  }
}

const query = (text, params) => pool.query(text, params);

module.exports = {
  pool,
  query,
  ensureDatabaseSchema,
  loadRuntimeConfigFromDb,
};
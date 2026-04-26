CREATE DATABASE indraprastha_db;


CREATE TABLE users (
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
  batch_id INTEGER,
  active_session_id TEXT,
  is_profile_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE batches (
  id SERIAL PRIMARY KEY,
  course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  name VARCHAR(180) UNIQUE NOT NULL,
  target_year VARCHAR(20),
  class_label VARCHAR(40),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users
ADD COLUMN IF NOT EXISTS batch_id INTEGER REFERENCES batches(id);

CREATE TABLE otp_sessions (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(15) UNIQUE NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE colleges (
  id SERIAL PRIMARY KEY,
  state VARCHAR(100) NOT NULL,
  name VARCHAR(200) NOT NULL
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  batch_id INTEGER NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  subject VARCHAR(80) NOT NULL,
  level VARCHAR(80) DEFAULT 'Core',
  category VARCHAR(100) DEFAULT 'NCERT books',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE book_chapters (
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

CREATE TABLE pyqs (
  id SERIAL PRIMARY KEY,
  chapter_id INTEGER NOT NULL REFERENCES book_chapters(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_option CHAR(1) NOT NULL,
  explanation TEXT DEFAULT '',
  question_image_link TEXT,
  year_label VARCHAR(20) DEFAULT 'NEET',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE practice_sets (
  id SERIAL PRIMARY KEY,
  batch_id INTEGER NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  topic VARCHAR(140) NOT NULL,
  difficulty VARCHAR(30) DEFAULT 'Moderate',
  estimated_minutes INTEGER DEFAULT 20,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE practice_questions (
  id SERIAL PRIMARY KEY,
  practice_set_id INTEGER NOT NULL REFERENCES practice_sets(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_option CHAR(1) NOT NULL,
  explanation TEXT DEFAULT '',
  question_image_link TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tests (
  id SERIAL PRIMARY KEY,
  batch_id INTEGER NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  title VARCHAR(220) NOT NULL,
  category VARCHAR(60) DEFAULT 'Grand test',
  duration_minutes INTEGER DEFAULT 180,
  marks INTEGER DEFAULT 720,
  question_count INTEGER DEFAULT 180,
  syllabus_coverage TEXT DEFAULT '',
  schedule_label VARCHAR(80) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE test_questions (
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
  question_image_link TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE test_attempts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  test_id INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  accuracy NUMERIC(5,2) NOT NULL DEFAULT 0,
  attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  batch_id INTEGER NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  title VARCHAR(220) NOT NULL,
  subject VARCHAR(80) NOT NULL,
  chapter_hint VARCHAR(200) DEFAULT '',
  section_label VARCHAR(120) DEFAULT 'Concept explainers',
  duration_label VARCHAR(40) DEFAULT '15 min',
  drive_link TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(80) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exam_analytics (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  test_id INTEGER REFERENCES tests(id) ON DELETE SET NULL,
  overall_accuracy NUMERIC(5,2) DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  wrong_count INTEGER DEFAULT 0,
  unattempted_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ai_insights (
  id SERIAL PRIMARY KEY,
  analytics_id INTEGER NOT NULL REFERENCES exam_analytics(id) ON DELETE CASCADE,
  insight_title VARCHAR(200) NOT NULL,
  insight_body TEXT NOT NULL,
  priority VARCHAR(20) DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO courses (name) VALUES ('Neet Dropper Batch')
ON CONFLICT (name) DO NOTHING;

INSERT INTO batches (course_id, name, target_year, class_label)
SELECT c.id, b.name, b.target_year, b.class_label
FROM courses c
CROSS JOIN (
  VALUES
    ('Target Neet 2028 - Class 11th Going', '2028', 'Class 11'),
    ('Target Neet 2027 - Class 12th Going', '2027', 'Class 12'),
    ('Target Neet 2027 - Dropper Batch', '2027', 'Dropper')
) AS b(name, target_year, class_label)
WHERE c.name = 'Neet Dropper Batch'
ON CONFLICT (name) DO NOTHING;

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
('Foreign Medical Graduates', 'Foreign University')
ON CONFLICT DO NOTHING;
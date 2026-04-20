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
  is_profile_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
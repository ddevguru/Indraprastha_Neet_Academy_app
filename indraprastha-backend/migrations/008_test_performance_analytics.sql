-- Migration: 008_test_performance_analytics.sql
-- Purpose: Advanced Test Performance Analytics, Top-100 Benchmark, Topic Analysis & AI Mentor Caching
-- Date: October 2026

-- 1. Ensure test_questions has chapter and topic columns
ALTER TABLE test_questions ADD COLUMN IF NOT EXISTS chapter VARCHAR(140) DEFAULT '';
ALTER TABLE test_questions ADD COLUMN IF NOT EXISTS topic VARCHAR(140) DEFAULT '';

-- 2. Table: test_benchmarks
-- Persists test-specific Top-100 benchmark averages and participant statistics
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

CREATE INDEX IF NOT EXISTS idx_test_benchmarks_test_id ON test_benchmarks(test_id);

-- 3. Table: student_test_analytics
-- Stores complete pre-computed analytics per student test attempt
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

CREATE INDEX IF NOT EXISTS idx_student_test_analytics_user_test ON student_test_analytics(user_id, test_id);
CREATE INDEX IF NOT EXISTS idx_student_test_analytics_attempt ON student_test_analytics(attempt_id);

-- 4. Table: ai_test_analysis
-- Stores cached structured AI mentor feedback per user test attempt
CREATE TABLE IF NOT EXISTS ai_test_analysis (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  test_id INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  attempt_id INTEGER REFERENCES test_attempts(id) ON DELETE CASCADE,
  ai_response JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_ai_test_attempt UNIQUE (user_id, test_id, attempt_id)
);

CREATE INDEX IF NOT EXISTS idx_ai_test_analysis_user_test ON ai_test_analysis(user_id, test_id);

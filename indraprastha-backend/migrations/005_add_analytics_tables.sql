-- Migration: Add Analytics Tables for AI Features
-- Date: June 2026
-- Purpose: Add tables for user analytics, study logs, and performance tracking

-- Table: user_analytics
-- Stores aggregated analytics for each user
CREATE TABLE IF NOT EXISTS user_analytics (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,

  -- Test performance
  total_tests_taken INTEGER DEFAULT 0,
  average_score NUMERIC(5,2) DEFAULT 0,
  average_accuracy NUMERIC(5,2) DEFAULT 0,

  -- Subject-wise accuracy
  physics_accuracy NUMERIC(5,2) DEFAULT 0,
  chemistry_accuracy NUMERIC(5,2) DEFAULT 0,
  biology_accuracy NUMERIC(5,2) DEFAULT 0,

  -- Topic-wise performance (JSON)
  topic_accuracy JSONB DEFAULT '{}',
  weak_topics TEXT[] DEFAULT '{}',
  strong_topics TEXT[] DEFAULT '{}',

  -- Speed metrics (seconds per question)
  average_time_per_question NUMERIC(5,2) DEFAULT 0,
  speed_trend JSONB DEFAULT '{}',

  -- Daily study hours
  daily_study_hours NUMERIC(5,2) DEFAULT 0,
  study_hours_history JSONB DEFAULT '{}',

  -- NEET predictions
  predicted_neet_score INTEGER DEFAULT 0,
  predicted_neet_rank INTEGER DEFAULT 0,
  prediction_confidence NUMERIC(5,2) DEFAULT 0,

  -- Study streaks
  current_study_streak INTEGER DEFAULT 0,
  longest_study_streak INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_analytics_user_id ON user_analytics(user_id);

-- Table: test_attempt_details
-- Detailed question-level data for each test attempt
CREATE TABLE IF NOT EXISTS test_attempt_details (
  id SERIAL PRIMARY KEY,
  test_attempt_id INTEGER REFERENCES test_attempts(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES test_questions(id),
  subject VARCHAR(50),  -- Physics, Chemistry, Biology
  topic VARCHAR(100),   -- Mechanics, Organic, Ecology, etc.
  is_correct BOOLEAN,
  time_taken_seconds INTEGER,
  user_answer VARCHAR(1),  -- A, B, C, D
  correct_answer VARCHAR(1),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_test_attempt_details_test_attempt ON test_attempt_details(test_attempt_id);
CREATE INDEX idx_test_attempt_details_subject_topic ON test_attempt_details(subject, topic);

-- Table: study_logs
-- Daily study activity log
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

CREATE INDEX idx_study_logs_user_id_date ON study_logs(user_id, date);

-- Table: topic_performance
-- Topic-wise aggregated performance for quick lookup
CREATE TABLE IF NOT EXISTS topic_performance (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(50),
  topic VARCHAR(100),
  accuracy NUMERIC(5,2) DEFAULT 0,
  questions_attempted INTEGER DEFAULT 0,
  questions_correct INTEGER DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, subject, topic)
);

CREATE INDEX idx_topic_performance_user_id ON topic_performance(user_id);
CREATE INDEX idx_topic_performance_accuracy ON topic_performance(accuracy);

-- Initialize analytics for existing users
INSERT INTO user_analytics (user_id)
SELECT id FROM users
WHERE id NOT IN (SELECT user_id FROM user_analytics)
ON CONFLICT DO NOTHING;

-- Create function to update user_analytics on test submission
CREATE OR REPLACE FUNCTION update_user_analytics()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE user_analytics
  SET
    total_tests_taken = total_tests_taken + 1,
    average_score = (average_score * (total_tests_taken) + NEW.score) / (total_tests_taken + 1),
    updated_at = CURRENT_TIMESTAMP
  WHERE user_id = NEW.user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update analytics on test attempt
DROP TRIGGER IF EXISTS trigger_update_analytics ON test_attempts;
CREATE TRIGGER trigger_update_analytics
AFTER INSERT ON test_attempts
FOR EACH ROW
EXECUTE FUNCTION update_user_analytics();

-- Create function to auto-populate topic_performance
CREATE OR REPLACE FUNCTION sync_topic_performance()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO topic_performance (user_id, subject, topic, accuracy, questions_attempted, questions_correct, last_updated)
  VALUES (
    NEW.test_attempt_id,
    NEW.subject,
    NEW.topic,
    CASE WHEN NEW.is_correct THEN 100 ELSE 0 END,
    1,
    CASE WHEN NEW.is_correct THEN 1 ELSE 0 END,
    CURRENT_TIMESTAMP
  )
  ON CONFLICT (user_id, subject, topic) DO UPDATE
  SET
    accuracy = (
      (questions_correct::float / questions_attempted * 100) +
      (CASE WHEN EXCLUDED.is_correct THEN 100 ELSE 0 END)
    ) / (questions_attempted + 1),
    questions_attempted = questions_attempted + 1,
    questions_correct = questions_correct + (CASE WHEN EXCLUDED.is_correct THEN 1 ELSE 0 END),
    last_updated = CURRENT_TIMESTAMP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to sync topic performance
DROP TRIGGER IF EXISTS trigger_sync_topic_performance ON test_attempt_details;
CREATE TRIGGER trigger_sync_topic_performance
AFTER INSERT ON test_attempt_details
FOR EACH ROW
EXECUTE FUNCTION sync_topic_performance();

-- Migration complete
COMMIT;

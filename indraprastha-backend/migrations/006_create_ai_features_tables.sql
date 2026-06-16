-- Migration: Create AI Features Tables
-- Purpose: Analytics, predictions, performance tracking
-- Date: June 2026

-- ============================================
-- USER ANALYTICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ai_user_analytics (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,

  -- Test Performance
  total_tests_taken INTEGER DEFAULT 0,
  average_test_score NUMERIC(7,2) DEFAULT 0,
  average_test_accuracy NUMERIC(5,2) DEFAULT 0,

  -- Subject-wise Accuracy (Percentage)
  physics_accuracy NUMERIC(5,2) DEFAULT 0,
  chemistry_accuracy NUMERIC(5,2) DEFAULT 0,
  biology_accuracy NUMERIC(5,2) DEFAULT 0,

  -- Topic-wise Storage (JSON format)
  topic_accuracy JSONB DEFAULT '{}',

  -- Weak and Strong Topics (Array)
  weak_topics_list TEXT[] DEFAULT '{}',
  strong_topics_list TEXT[] DEFAULT '{}',

  -- Speed Metrics
  average_time_per_question NUMERIC(7,2) DEFAULT 0,

  -- Daily Activity
  total_study_hours NUMERIC(7,2) DEFAULT 0,

  -- NEET Predictions
  predicted_neet_score INTEGER DEFAULT 0,
  predicted_neet_rank INTEGER DEFAULT 0,
  prediction_confidence NUMERIC(5,2) DEFAULT 0,
  last_prediction_date TIMESTAMP,

  -- Study Streaks
  current_study_streak INTEGER DEFAULT 0,
  longest_study_streak INTEGER DEFAULT 0,
  last_study_date DATE,

  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT unique_user_analytics UNIQUE(user_id)
);

CREATE INDEX idx_ai_user_analytics_user_id ON ai_user_analytics(user_id);
CREATE INDEX idx_ai_user_analytics_physics ON ai_user_analytics(physics_accuracy);
CREATE INDEX idx_ai_user_analytics_chemistry ON ai_user_analytics(chemistry_accuracy);
CREATE INDEX idx_ai_user_analytics_biology ON ai_user_analytics(biology_accuracy);

-- ============================================
-- STUDY LOGS TABLE (Daily Tracking)
-- ============================================
CREATE TABLE IF NOT EXISTS ai_study_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  log_date DATE,

  -- Study Activity
  study_hours_today NUMERIC(5,2) DEFAULT 0,
  questions_attempted_today INTEGER DEFAULT 0,
  questions_correct_today INTEGER DEFAULT 0,
  tests_taken_today INTEGER DEFAULT 0,

  -- Session info
  session_count INTEGER DEFAULT 0,
  total_session_minutes INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT unique_study_log UNIQUE(user_id, log_date)
);

CREATE INDEX idx_ai_study_logs_user_id ON ai_study_logs(user_id);
CREATE INDEX idx_ai_study_logs_date ON ai_study_logs(log_date);
CREATE INDEX idx_ai_study_logs_user_date ON ai_study_logs(user_id, log_date);

-- ============================================
-- TEST ATTEMPT DETAILS TABLE (Per Question)
-- ============================================
CREATE TABLE IF NOT EXISTS ai_test_attempt_details (
  id SERIAL PRIMARY KEY,
  test_attempt_id INTEGER REFERENCES test_attempts(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES test_questions(id),

  -- Question Metadata
  subject VARCHAR(100),     -- Physics, Chemistry, Biology
  topic VARCHAR(255),       -- Mechanics, Organic, etc.
  difficulty VARCHAR(20),   -- easy, medium, hard

  -- User Response
  is_correct BOOLEAN DEFAULT FALSE,
  time_taken_seconds INTEGER,
  user_answer VARCHAR(1),   -- A, B, C, D
  correct_answer VARCHAR(1),

  -- Additional Data
  confidence_level INTEGER,  -- 1-5 scale (optional)

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_test_attempt_details_test_attempt ON ai_test_attempt_details(test_attempt_id);
CREATE INDEX idx_ai_test_attempt_details_question ON ai_test_attempt_details(question_id);
CREATE INDEX idx_ai_test_attempt_details_subject_topic ON ai_test_attempt_details(subject, topic);

-- ============================================
-- TOPIC PERFORMANCE TABLE (Aggregated)
-- ============================================
CREATE TABLE IF NOT EXISTS ai_topic_performance (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  -- Topic Info
  subject VARCHAR(100),
  topic VARCHAR(255),

  -- Performance
  accuracy NUMERIC(5,2) DEFAULT 0,
  questions_attempted INTEGER DEFAULT 0,
  questions_correct INTEGER DEFAULT 0,
  average_time_seconds NUMERIC(7,2) DEFAULT 0,

  -- Tracking
  first_attempt_date TIMESTAMP,
  last_attempt_date TIMESTAMP,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT unique_topic_performance UNIQUE(user_id, subject, topic)
);

CREATE INDEX idx_ai_topic_performance_user ON ai_topic_performance(user_id);
CREATE INDEX idx_ai_topic_performance_accuracy ON ai_topic_performance(accuracy);
CREATE INDEX idx_ai_topic_performance_user_subject ON ai_topic_performance(user_id, subject);

-- ============================================
-- TEST PERFORMANCE HISTORY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ai_test_performance_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  test_id INTEGER REFERENCES tests(id),

  -- Score Info
  score INTEGER,
  total_questions INTEGER,
  accuracy_percent NUMERIC(5,2),
  time_taken_seconds INTEGER,

  -- Subject breakdown
  physics_score INTEGER,
  chemistry_score INTEGER,
  biology_score INTEGER,

  -- Ranking
  percentile_rank NUMERIC(5,2),  -- 0-100
  test_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_test_performance_user ON ai_test_performance_history(user_id);
CREATE INDEX idx_ai_test_performance_date ON ai_test_performance_history(test_date);
CREATE INDEX idx_ai_test_performance_percentile ON ai_test_performance_history(percentile_rank);

-- ============================================
-- WEAK AREAS TRACKING TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ai_weak_areas (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  -- Topic Info
  subject VARCHAR(100),
  topic VARCHAR(255),

  -- Weakness Level
  severity INTEGER,  -- 1-10 scale (10 = most critical)
  accuracy_percent NUMERIC(5,2),

  -- Tracking
  identified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_attempted_date TIMESTAMP,
  improvement_tracked BOOLEAN DEFAULT FALSE,

  CONSTRAINT unique_weak_area UNIQUE(user_id, subject, topic)
);

CREATE INDEX idx_ai_weak_areas_user ON ai_weak_areas(user_id);
CREATE INDEX idx_ai_weak_areas_severity ON ai_weak_areas(severity DESC);

-- ============================================
-- STUDY RECOMMENDATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ai_study_recommendations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  -- Recommendation
  recommendation_text TEXT,
  recommendation_type VARCHAR(50),  -- weak_topic, speed, accuracy, etc.
  priority INTEGER,  -- 1-10

  -- Target
  target_subject VARCHAR(100),
  target_topic VARCHAR(255),

  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP
);

CREATE INDEX idx_ai_recommendations_user ON ai_study_recommendations(user_id);
CREATE INDEX idx_ai_recommendations_active ON ai_study_recommendations(is_active);

-- ============================================
-- PREDICTION HISTORY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ai_neet_predictions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  -- Prediction
  predicted_score INTEGER,
  predicted_rank INTEGER,
  confidence_percent NUMERIC(5,2),

  -- Actual (after exam)
  actual_score INTEGER,
  actual_rank INTEGER,

  -- Input Data
  tests_completed INTEGER,
  average_accuracy NUMERIC(5,2),
  study_hours NUMERIC(7,2),

  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actual_score_date TIMESTAMP
);

CREATE INDEX idx_ai_predictions_user ON ai_neet_predictions(user_id);
CREATE INDEX idx_ai_predictions_date ON ai_neet_predictions(created_at);

-- ============================================
-- PERFORMANCE COMPARISON TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ai_performance_comparisons (
  id SERIAL PRIMARY KEY,
  test_id INTEGER REFERENCES tests(id),

  -- Aggregate Stats
  total_attempts INTEGER,
  average_score NUMERIC(7,2),
  highest_score INTEGER,
  lowest_score INTEGER,
  median_score NUMERIC(7,2),

  -- Distribution
  average_percentile NUMERIC(5,2),

  -- Date
  calculated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_comparisons_test ON ai_performance_comparisons(test_id);

-- ============================================
-- INITIALIZE ANALYTICS FOR EXISTING USERS
-- ============================================
INSERT INTO ai_user_analytics (user_id)
SELECT id FROM users
WHERE id NOT IN (SELECT user_id FROM ai_user_analytics WHERE user_id IS NOT NULL)
ON CONFLICT (user_id) DO NOTHING;

-- ============================================
-- TRIGGER: Update ai_user_analytics on test submission
-- ============================================
CREATE OR REPLACE FUNCTION fn_update_analytics_on_test()
RETURNS TRIGGER AS $$
BEGIN
  -- Update total tests and average score
  UPDATE ai_user_analytics
  SET
    total_tests_taken = total_tests_taken + 1,
    average_test_score = (
      (average_test_score * (total_tests_taken) + NEW.score) /
      (total_tests_taken + 1)
    ),
    updated_at = CURRENT_TIMESTAMP
  WHERE user_id = NEW.user_id;

  -- Create study log entry if not exists
  INSERT INTO ai_study_logs (user_id, log_date, tests_taken_today)
  VALUES (NEW.user_id, CURRENT_DATE, 1)
  ON CONFLICT (user_id, log_date) DO UPDATE
  SET tests_taken_today = tests_taken_today + 1;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_analytics_on_test ON test_attempts;
CREATE TRIGGER trg_update_analytics_on_test
AFTER INSERT ON test_attempts
FOR EACH ROW
EXECUTE FUNCTION fn_update_analytics_on_test();

-- ============================================
-- TRIGGER: Calculate accuracies on test details insert
-- ============================================
CREATE OR REPLACE FUNCTION fn_calculate_topic_accuracy()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert or update topic performance
  INSERT INTO ai_topic_performance (
    user_id, subject, topic,
    accuracy, questions_attempted, questions_correct,
    first_attempt_date, last_attempt_date
  )
  SELECT
    NEW.test_attempt_id,
    NEW.subject,
    NEW.topic,
    0,  -- Will be calculated below
    1,
    CASE WHEN NEW.is_correct THEN 1 ELSE 0 END,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  FROM (SELECT NEW.test_attempt_id) AS t
  WHERE NOT EXISTS (
    SELECT 1 FROM ai_topic_performance
    WHERE user_id = NEW.test_attempt_id
    AND subject = NEW.subject
    AND topic = NEW.topic
  )
  ON CONFLICT (user_id, subject, topic) DO UPDATE
  SET
    questions_attempted = questions_attempted + 1,
    questions_correct = questions_correct + CASE WHEN EXCLUDED.is_correct THEN 1 ELSE 0 END,
    accuracy = (
      (SELECT questions_correct FROM ai_topic_performance
       WHERE user_id = EXCLUDED.user_id
       AND subject = EXCLUDED.subject
       AND topic = EXCLUDED.topic)
      /
      (SELECT questions_attempted FROM ai_topic_performance
       WHERE user_id = EXCLUDED.user_id
       AND subject = EXCLUDED.subject
       AND topic = EXCLUDED.topic)
    ) * 100,
    last_attempt_date = CURRENT_TIMESTAMP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_calculate_topic_accuracy ON ai_test_attempt_details;
CREATE TRIGGER trg_calculate_topic_accuracy
AFTER INSERT ON ai_test_attempt_details
FOR EACH ROW
EXECUTE FUNCTION fn_calculate_topic_accuracy();

-- ============================================
-- MIGRATION STATUS
-- ============================================
-- All tables created successfully
-- All indexes created for performance
-- All triggers initialized
-- Ready for analytics features

COMMIT;

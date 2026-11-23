-- Migration: 011_create_ai_learning_intelligence_tables.sql
-- Purpose: Complete AI-Powered Personalized Learning Intelligence System tables
-- Date: November 2026

-- 1. Table: student_topic_learning_state
-- Tracks student mastery, study status, and multi-label AI categorization per topic
CREATE TABLE IF NOT EXISTS student_topic_learning_state (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(80) NOT NULL,
  chapter VARCHAR(140) NOT NULL,
  topic VARCHAR(140) NOT NULL,
  study_status VARCHAR(40) DEFAULT 'UNKNOWN', -- 'NOT_STUDIED', 'STUDIED', 'INSUFFICIENT_DATA', 'UNKNOWN'
  
  -- ML Model Predictions
  mastery_score NUMERIC(5,2) DEFAULT 0.0,       -- 0.0 to 100.0%
  mastery_category VARCHAR(40) DEFAULT 'NOVICE', -- 'NOVICE', 'DEVELOPING', 'COMPETENT', 'PROFICIENT', 'MASTER'
  prediction_confidence NUMERIC(5,2) DEFAULT 0.0, -- 0.0 to 100.0%
  performance_trend VARCHAR(20) DEFAULT 'STABLE', -- 'IMPROVING', 'DECLINING', 'STABLE'

  -- Core Learning Category Flags (Independent / Multi-label)
  is_not_studied BOOLEAN DEFAULT FALSE,
  is_poorly_understood BOOLEAN DEFAULT FALSE,
  is_repeatedly_incorrect BOOLEAN DEFAULT FALSE,
  is_needs_revision BOOLEAN DEFAULT FALSE,

  -- Quantitative Metrics
  total_questions_attempted INTEGER DEFAULT 0,
  total_questions_correct INTEGER DEFAULT 0,
  accuracy_percentage NUMERIC(5,2) DEFAULT 0.0,
  recent_accuracy NUMERIC(5,2) DEFAULT 0.0,
  previous_accuracy NUMERIC(5,2) DEFAULT 0.0,
  repeated_mistake_count INTEGER DEFAULT 0,
  avg_time_seconds NUMERIC(6,2) DEFAULT 0.0,
  content_views_count INTEGER DEFAULT 0,

  -- Revision & Spaced Repetition Metrics (Forgetting Curve)
  last_studied_at TIMESTAMP,
  last_practiced_at TIMESTAMP,
  last_revised_at TIMESTAMP,
  revision_count INTEGER DEFAULT 0,
  retention_estimate NUMERIC(5,2) DEFAULT 100.0,  -- 0.0 to 100.0%
  revision_priority VARCHAR(20) DEFAULT 'NONE',    -- 'HIGH', 'MEDIUM', 'LOW', 'NONE'

  -- Explainability & Guidance
  ai_explanation TEXT DEFAULT '',
  recommended_action TEXT DEFAULT '',
  weak_concepts TEXT[] DEFAULT '{}',

  last_evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT uq_student_topic_learning_state UNIQUE (user_id, subject, chapter, topic)
);

CREATE INDEX IF NOT EXISTS idx_student_topic_user ON student_topic_learning_state(user_id);
CREATE INDEX IF NOT EXISTS idx_student_topic_flags ON student_topic_learning_state(user_id, is_not_studied, is_poorly_understood, is_repeatedly_incorrect, is_needs_revision);
CREATE INDEX IF NOT EXISTS idx_student_topic_subj ON student_topic_learning_state(user_id, subject);

-- 2. Table: student_repeated_mistakes
-- Tracks persistent incorrect answers and conceptual misconceptions
CREATE TABLE IF NOT EXISTS student_repeated_mistakes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(80) NOT NULL,
  chapter VARCHAR(140) NOT NULL,
  topic VARCHAR(140) NOT NULL,
  concept VARCHAR(180) DEFAULT '',
  question_id INTEGER,
  source_type VARCHAR(40) DEFAULT 'test', -- 'test', 'practice_set', 'pyq'
  wrong_attempt_count INTEGER DEFAULT 1,
  last_wrong_answer VARCHAR(10) DEFAULT '',
  correct_answer VARCHAR(10) DEFAULT '',
  question_text TEXT DEFAULT '',
  explanation TEXT DEFAULT '',
  is_resolved BOOLEAN DEFAULT FALSE,
  first_occurred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_occurred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP,
  CONSTRAINT uq_student_repeated_mistakes UNIQUE (user_id, question_id)
);

CREATE INDEX IF NOT EXISTS idx_repeated_mistakes_user ON student_repeated_mistakes(user_id, is_resolved);
CREATE INDEX IF NOT EXISTS idx_repeated_mistakes_topic ON student_repeated_mistakes(user_id, subject, topic);
CREATE UNIQUE INDEX IF NOT EXISTS uq_student_repeated_mistakes_idx ON student_repeated_mistakes(user_id, question_id);

-- 3. Table: student_ai_recommendations
-- Personalized actionable study and revision tasks linked to real content
CREATE TABLE IF NOT EXISTS student_ai_recommendations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(40) NOT NULL, -- 'NOT_STUDIED', 'POORLY_UNDERSTOOD', 'REPEATED_MISTAKES', 'NEEDS_REVISION', 'DAILY_PLAN'
  priority INTEGER DEFAULT 1,    -- 1 = highest priority
  subject VARCHAR(80) NOT NULL,
  chapter VARCHAR(140) NOT NULL,
  topic VARCHAR(140) NOT NULL,
  action_type VARCHAR(60) NOT NULL, -- 'study_chapter', 'revise_topic', 'practice_mcqs', 'attempt_pyqs', 'retake_test'
  title VARCHAR(220) NOT NULL,
  description TEXT NOT NULL,
  target_resource_type VARCHAR(40) DEFAULT 'practice_set', -- 'book_chapter', 'practice_set', 'test', 'pyq'
  target_resource_id INTEGER,
  estimated_minutes INTEGER DEFAULT 15,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_recommendations_user ON student_ai_recommendations(user_id, is_completed, priority);

-- 4. Table: ai_model_registry
-- Tracks trained ML models, evaluation metrics, versioning and training datasets
CREATE TABLE IF NOT EXISTS ai_model_registry (
  id SERIAL PRIMARY KEY,
  model_name VARCHAR(100) NOT NULL,
  version VARCHAR(40) NOT NULL,
  algorithm VARCHAR(100) NOT NULL,
  task_type VARCHAR(40) NOT NULL, -- 'regression', 'classification'
  metrics_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  artifacts_path VARCHAR(255) NOT NULL,
  training_sample_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_model_registry_active ON ai_model_registry(model_name, is_active);


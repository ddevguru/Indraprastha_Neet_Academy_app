-- ============================================================
-- Indraprastha Backend - Explanation Images Support
-- PostgreSQL Migration Script
-- Created: June 16, 2024
-- Purpose: Add explanation image support with multiple uploads
-- ============================================================

-- ============================================================
-- TABLE: explanation_images
-- For storing multiple explanation images per question
-- Supports: pyqs, practice_questions, test_questions, daily_mcqs
-- ============================================================

CREATE TABLE IF NOT EXISTS explanation_images (
  id SERIAL PRIMARY KEY,

  -- Association to different question types
  pyq_id INTEGER REFERENCES pyqs(id) ON DELETE CASCADE,
  practice_question_id INTEGER REFERENCES practice_questions(id) ON DELETE CASCADE,
  test_question_id INTEGER REFERENCES test_questions(id) ON DELETE CASCADE,
  daily_mcq_id INTEGER REFERENCES daily_mcqs(id) ON DELETE CASCADE,

  -- Image metadata
  image_url TEXT NOT NULL,
  image_drive_file_id TEXT,
  image_drive_folder_id TEXT DEFAULT '',
  image_drive_link TEXT,

  -- Display information
  order_index INTEGER DEFAULT 0,  -- For ordering multiple images
  caption VARCHAR(255) DEFAULT '',  -- Image caption/description

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Only one foreign key should be set at a time
  CONSTRAINT only_one_question_type CHECK (
    (CASE WHEN pyq_id IS NOT NULL THEN 1 ELSE 0 END +
     CASE WHEN practice_question_id IS NOT NULL THEN 1 ELSE 0 END +
     CASE WHEN test_question_id IS NOT NULL THEN 1 ELSE 0 END +
     CASE WHEN daily_mcq_id IS NOT NULL THEN 1 ELSE 0 END) = 1
  )
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_explanation_images_pyq_id ON explanation_images(pyq_id);
CREATE INDEX IF NOT EXISTS idx_explanation_images_practice_question_id ON explanation_images(practice_question_id);
CREATE INDEX IF NOT EXISTS idx_explanation_images_test_question_id ON explanation_images(test_question_id);
CREATE INDEX IF NOT EXISTS idx_explanation_images_daily_mcq_id ON explanation_images(daily_mcq_id);
CREATE INDEX IF NOT EXISTS idx_explanation_images_order ON explanation_images(order_index);

-- ============================================================
-- ADD EXPLANATION IMAGE COLUMNS TO EXISTING TABLES
-- For backward compatibility and single image support
-- ============================================================

-- Table: pyqs - Add explanation image columns
ALTER TABLE pyqs
ADD COLUMN IF NOT EXISTS explanation_image_link TEXT;

ALTER TABLE pyqs
ADD COLUMN IF NOT EXISTS explanation_image_drive_file_id TEXT;

ALTER TABLE pyqs
ADD COLUMN IF NOT EXISTS explanation_image_drive_folder_id TEXT DEFAULT '';

-- Table: practice_questions - Add explanation image columns
ALTER TABLE practice_questions
ADD COLUMN IF NOT EXISTS explanation_image_link TEXT;

ALTER TABLE practice_questions
ADD COLUMN IF NOT EXISTS explanation_image_drive_file_id TEXT;

ALTER TABLE practice_questions
ADD COLUMN IF NOT EXISTS explanation_image_drive_folder_id TEXT DEFAULT '';

-- Table: test_questions - Add explanation image columns
ALTER TABLE test_questions
ADD COLUMN IF NOT EXISTS explanation_image_link TEXT;

ALTER TABLE test_questions
ADD COLUMN IF NOT EXISTS explanation_image_drive_file_id TEXT;

ALTER TABLE test_questions
ADD COLUMN IF NOT EXISTS explanation_image_drive_folder_id TEXT DEFAULT '';

-- Table: daily_mcqs - Add explanation image columns
ALTER TABLE daily_mcqs
ADD COLUMN IF NOT EXISTS explanation_image_link TEXT;

ALTER TABLE daily_mcqs
ADD COLUMN IF NOT EXISTS explanation_image_drive_file_id TEXT;

ALTER TABLE daily_mcqs
ADD COLUMN IF NOT EXISTS explanation_image_drive_folder_id TEXT DEFAULT '';

-- ============================================================
-- ADMIN UPLOAD TABLE (Optional - for tracking uploads)
-- ============================================================

CREATE TABLE IF NOT EXISTS admin_uploads (
  id SERIAL PRIMARY KEY,

  -- Admin info
  admin_id INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,

  -- Upload details
  upload_type VARCHAR(50),  -- 'question', 'explanation', 'book_chapter', etc.
  associated_table VARCHAR(100),  -- 'pyqs', 'practice_questions', 'test_questions', etc.
  associated_id INTEGER,  -- ID of the record being updated

  -- File info
  file_name VARCHAR(255),
  file_size INTEGER,  -- in bytes
  drive_file_id TEXT,
  drive_folder_id TEXT,

  -- Status
  upload_status VARCHAR(50) DEFAULT 'success',  -- 'pending', 'success', 'failed'
  error_message TEXT,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_admin_uploads_admin_id ON admin_uploads(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_uploads_type ON admin_uploads(upload_type);
CREATE INDEX IF NOT EXISTS idx_admin_uploads_created ON admin_uploads(created_at DESC);

-- ============================================================
-- BATCH UPLOAD TABLE (For bulk explanation uploads)
-- ============================================================

CREATE TABLE IF NOT EXISTS batch_uploads (
  id SERIAL PRIMARY KEY,

  -- Admin info
  admin_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,

  -- Batch info
  batch_name VARCHAR(255),  -- Name of the upload batch
  batch_type VARCHAR(50),  -- 'explanations', 'questions', 'videos', etc.

  -- Statistics
  total_files INTEGER DEFAULT 0,
  successful_uploads INTEGER DEFAULT 0,
  failed_uploads INTEGER DEFAULT 0,

  -- Status
  status VARCHAR(50) DEFAULT 'in_progress',  -- 'in_progress', 'completed', 'failed'

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_batch_uploads_admin_id ON batch_uploads(admin_id);
CREATE INDEX IF NOT EXISTS idx_batch_uploads_status ON batch_uploads(status);
CREATE INDEX IF NOT EXISTS idx_batch_uploads_created ON batch_uploads(created_at DESC);

-- ============================================================
-- VIEW: question_with_explanations
-- Unified view for fetching questions with all explanation images
-- ============================================================

CREATE OR REPLACE VIEW question_with_explanations AS
SELECT
  pq.id,
  pq.question,
  pq.option_a,
  pq.option_b,
  pq.option_c,
  pq.option_d,
  pq.correct_option,
  pq.explanation,
  pq.explanation_image_link,
  pq.explanation_image_drive_file_id,
  pq.explanation_image_drive_folder_id,
  'pyq' as question_type,
  pq.created_at,
  (
    SELECT json_agg(
      json_build_object(
        'id', ei.id,
        'image_url', ei.image_url,
        'image_drive_file_id', ei.image_drive_file_id,
        'image_drive_link', ei.image_drive_link,
        'caption', ei.caption,
        'order_index', ei.order_index
      ) ORDER BY ei.order_index
    )
    FROM explanation_images ei
    WHERE ei.pyq_id = pq.id
  ) as explanation_images_list
FROM pyqs pq

UNION ALL

SELECT
  pq.id,
  pq.question,
  pq.option_a,
  pq.option_b,
  pq.option_c,
  pq.option_d,
  pq.correct_option,
  pq.explanation,
  pq.explanation_image_link,
  pq.explanation_image_drive_file_id,
  pq.explanation_image_drive_folder_id,
  'practice_question' as question_type,
  pq.created_at,
  (
    SELECT json_agg(
      json_build_object(
        'id', ei.id,
        'image_url', ei.image_url,
        'image_drive_file_id', ei.image_drive_file_id,
        'image_drive_link', ei.image_drive_link,
        'caption', ei.caption,
        'order_index', ei.order_index
      ) ORDER BY ei.order_index
    )
    FROM explanation_images ei
    WHERE ei.practice_question_id = pq.id
  ) as explanation_images_list
FROM practice_questions pq

UNION ALL

SELECT
  tq.id,
  tq.question,
  tq.option_a,
  tq.option_b,
  tq.option_c,
  tq.option_d,
  tq.correct_option,
  tq.explanation,
  tq.explanation_image_link,
  tq.explanation_image_drive_file_id,
  tq.explanation_image_drive_folder_id,
  'test_question' as question_type,
  tq.created_at,
  (
    SELECT json_agg(
      json_build_object(
        'id', ei.id,
        'image_url', ei.image_url,
        'image_drive_file_id', ei.image_drive_file_id,
        'image_drive_link', ei.image_drive_link,
        'caption', ei.caption,
        'order_index', ei.order_index
      ) ORDER BY ei.order_index
    )
    FROM explanation_images ei
    WHERE ei.test_question_id = tq.id
  ) as explanation_images_list
FROM test_questions tq

UNION ALL

SELECT
  dm.id,
  dm.question,
  dm.option_a,
  dm.option_b,
  dm.option_c,
  dm.option_d,
  dm.correct_option,
  dm.explanation,
  dm.explanation_image_link,
  dm.explanation_image_drive_file_id,
  dm.explanation_image_drive_folder_id,
  'daily_mcq' as question_type,
  dm.created_at,
  (
    SELECT json_agg(
      json_build_object(
        'id', ei.id,
        'image_url', ei.image_url,
        'image_drive_file_id', ei.image_drive_file_id,
        'image_drive_link', ei.image_drive_link,
        'caption', ei.caption,
        'order_index', ei.order_index
      ) ORDER BY ei.order_index
    )
    FROM explanation_images ei
    WHERE ei.daily_mcq_id = dm.id
  ) as explanation_images_list
FROM daily_mcqs dm;

-- ============================================================
-- FUNCTION: Add explanation image
-- ============================================================

CREATE OR REPLACE FUNCTION add_explanation_image(
  p_question_type VARCHAR,
  p_question_id INTEGER,
  p_image_url TEXT,
  p_image_drive_file_id TEXT,
  p_image_drive_link TEXT,
  p_caption VARCHAR DEFAULT ''
)
RETURNS TABLE(
  image_id INTEGER,
  status VARCHAR,
  message VARCHAR
) AS $$
DECLARE
  v_image_id INTEGER;
  v_max_order INTEGER;
BEGIN
  -- Get max order index for this question
  SELECT COALESCE(MAX(order_index), 0) + 1 INTO v_max_order
  FROM explanation_images
  WHERE
    (pyq_id = p_question_id AND p_question_type = 'pyq')
    OR (practice_question_id = p_question_id AND p_question_type = 'practice_question')
    OR (test_question_id = p_question_id AND p_question_type = 'test_question')
    OR (daily_mcq_id = p_question_id AND p_question_type = 'daily_mcq');

  -- Insert based on question type
  IF p_question_type = 'pyq' THEN
    INSERT INTO explanation_images (
      pyq_id, image_url, image_drive_file_id, image_drive_link, caption, order_index
    ) VALUES (
      p_question_id, p_image_url, p_image_drive_file_id, p_image_drive_link, p_caption, v_max_order
    ) RETURNING id INTO v_image_id;

  ELSIF p_question_type = 'practice_question' THEN
    INSERT INTO explanation_images (
      practice_question_id, image_url, image_drive_file_id, image_drive_link, caption, order_index
    ) VALUES (
      p_question_id, p_image_url, p_image_drive_file_id, p_image_drive_link, p_caption, v_max_order
    ) RETURNING id INTO v_image_id;

  ELSIF p_question_type = 'test_question' THEN
    INSERT INTO explanation_images (
      test_question_id, image_url, image_drive_file_id, image_drive_link, caption, order_index
    ) VALUES (
      p_question_id, p_image_url, p_image_drive_file_id, p_image_drive_link, p_caption, v_max_order
    ) RETURNING id INTO v_image_id;

  ELSIF p_question_type = 'daily_mcq' THEN
    INSERT INTO explanation_images (
      daily_mcq_id, image_url, image_drive_file_id, image_drive_link, caption, order_index
    ) VALUES (
      p_question_id, p_image_url, p_image_drive_file_id, p_image_drive_link, p_caption, v_max_order
    ) RETURNING id INTO v_image_id;
  ELSE
    RETURN QUERY SELECT 0::INTEGER, 'error'::VARCHAR, 'Invalid question type'::VARCHAR;
    RETURN;
  END IF;

  RETURN QUERY SELECT v_image_id, 'success'::VARCHAR, 'Explanation image added successfully'::VARCHAR;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- FUNCTION: Delete explanation image
-- ============================================================

CREATE OR REPLACE FUNCTION delete_explanation_image(p_image_id INTEGER)
RETURNS TABLE(
  status VARCHAR,
  message VARCHAR
) AS $$
DECLARE
  v_deleted BOOLEAN;
BEGIN
  DELETE FROM explanation_images WHERE id = p_image_id;

  IF FOUND THEN
    RETURN QUERY SELECT 'success'::VARCHAR, 'Explanation image deleted successfully'::VARCHAR;
  ELSE
    RETURN QUERY SELECT 'error'::VARCHAR, 'Explanation image not found'::VARCHAR;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- MIGRATION COMPLETE
-- ============================================================
-- Explanation images support added successfully
-- Supports multiple images per question
-- Admin can upload multiple explanation images
-- View available: question_with_explanations
-- ============================================================

COMMIT;

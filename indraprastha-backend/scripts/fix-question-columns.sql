-- Quick fix: missing explanation image columns on question tables.
-- Safe to run multiple times (IF NOT EXISTS).

ALTER TABLE test_questions
  ADD COLUMN IF NOT EXISTS explanation_image_link TEXT;
ALTER TABLE test_questions
  ADD COLUMN IF NOT EXISTS explanation_image_drive_file_id TEXT;
ALTER TABLE test_questions
  ADD COLUMN IF NOT EXISTS explanation_image_drive_folder_id TEXT DEFAULT '';
ALTER TABLE test_questions
  ADD COLUMN IF NOT EXISTS explanation_video_link TEXT DEFAULT '';
ALTER TABLE test_questions
  ADD COLUMN IF NOT EXISTS explanation_video_drive_file_id TEXT DEFAULT '';
ALTER TABLE test_questions
  ADD COLUMN IF NOT EXISTS explanation_video_drive_folder_id TEXT DEFAULT '';
ALTER TABLE test_questions
  ADD COLUMN IF NOT EXISTS similar_question JSONB DEFAULT NULL;

ALTER TABLE practice_questions
  ADD COLUMN IF NOT EXISTS explanation_image_link TEXT;
ALTER TABLE practice_questions
  ADD COLUMN IF NOT EXISTS explanation_image_drive_file_id TEXT;
ALTER TABLE practice_questions
  ADD COLUMN IF NOT EXISTS explanation_image_drive_folder_id TEXT DEFAULT '';

ALTER TABLE daily_mcqs
  ADD COLUMN IF NOT EXISTS explanation_image_link TEXT;
ALTER TABLE daily_mcqs
  ADD COLUMN IF NOT EXISTS explanation_image_drive_file_id TEXT;
ALTER TABLE daily_mcqs
  ADD COLUMN IF NOT EXISTS explanation_image_drive_folder_id TEXT DEFAULT '';

ALTER TABLE pyqs
  ADD COLUMN IF NOT EXISTS explanation_image_link TEXT;
ALTER TABLE pyqs
  ADD COLUMN IF NOT EXISTS explanation_image_drive_file_id TEXT;
ALTER TABLE pyqs
  ADD COLUMN IF NOT EXISTS explanation_image_drive_folder_id TEXT DEFAULT '';

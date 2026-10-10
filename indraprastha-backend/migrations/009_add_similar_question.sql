-- Migration: 009_add_similar_question.sql
-- Adds similar_question JSONB column to practice_questions and test_questions

ALTER TABLE practice_questions
ADD COLUMN IF NOT EXISTS similar_question JSONB DEFAULT NULL;

ALTER TABLE test_questions
ADD COLUMN IF NOT EXISTS similar_question JSONB DEFAULT NULL;

ALTER TABLE test_questions
ADD COLUMN IF NOT EXISTS explanation_video_link TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS explanation_video_drive_file_id TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS explanation_video_drive_folder_id TEXT DEFAULT '';

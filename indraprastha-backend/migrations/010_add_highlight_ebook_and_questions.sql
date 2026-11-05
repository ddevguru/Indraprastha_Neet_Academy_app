-- Migration: 010_add_highlight_ebook_and_questions.sql
-- Adds Highlighted eBook drive links to book_chapters and creates chapter_highlight_questions table

ALTER TABLE book_chapters
ADD COLUMN IF NOT EXISTS highlight_drive_link TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS highlight_drive_file_id TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS highlight_drive_folder_id TEXT DEFAULT '';

CREATE TABLE IF NOT EXISTS chapter_highlight_questions (
  id SERIAL PRIMARY KEY,
  chapter_id INTEGER NOT NULL REFERENCES book_chapters(id) ON DELETE CASCADE,
  highlight_text TEXT NOT NULL,
  page_number INTEGER DEFAULT 1,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_option CHAR(1) NOT NULL,
  explanation TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_highlight_questions_chapter_id ON chapter_highlight_questions(chapter_id);


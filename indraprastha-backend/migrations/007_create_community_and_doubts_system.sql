-- Migration 007: Private Student Community, Doubt Resolution, Interactive Whiteboards, Teacher Management & Audit System
-- Indraprastha NEET Academy

-- 1. Student Communities (Each student has 6 isolated subject workspaces)
CREATE TABLE IF NOT EXISTS student_communities (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  class_level VARCHAR(30) NOT NULL, -- 'Class 11' or 'Class 12'
  subject VARCHAR(50) NOT NULL,     -- 'Physics', 'Chemistry', 'Biology'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_student_class_subject UNIQUE (student_id, class_level, subject)
);

CREATE INDEX IF NOT EXISTS idx_student_communities_student ON student_communities(student_id);

-- 2. Community Messages (Private chat within each subject workspace)
CREATE TABLE IF NOT EXISTS community_messages (
  id SERIAL PRIMARY KEY,
  community_id INTEGER NOT NULL REFERENCES student_communities(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message_type VARCHAR(20) DEFAULT 'text', -- 'text', 'image', 'video', 'audio', 'document'
  text_content TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE INDEX IF NOT EXISTS idx_comm_messages_community ON community_messages(community_id, created_at);
CREATE INDEX IF NOT EXISTS idx_comm_messages_student ON community_messages(student_id);

-- 3. Community Attachments (Uploaded directly to Google Drive)
CREATE TABLE IF NOT EXISTS community_attachments (
  id SERIAL PRIMARY KEY,
  message_id INTEGER NOT NULL REFERENCES community_messages(id) ON DELETE CASCADE,
  storage_key TEXT NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  file_size BIGINT NOT NULL DEFAULT 0,
  drive_file_id VARCHAR(255) DEFAULT '',
  drive_view_link TEXT DEFAULT '',
  drive_download_link TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_comm_attachments_message ON community_attachments(message_id);

-- 4. Student Whiteboards (Private editable canvas per community)
CREATE TABLE IF NOT EXISTS student_whiteboards (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  community_id INTEGER NOT NULL REFERENCES student_communities(id) ON DELETE CASCADE,
  document_json JSONB NOT NULL DEFAULT '{"elements": []}',
  snapshot_drive_link TEXT DEFAULT '',
  snapshot_drive_file_id VARCHAR(255) DEFAULT '',
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_student_whiteboard_community UNIQUE (student_id, community_id)
);

CREATE INDEX IF NOT EXISTS idx_student_whiteboards_comm ON student_whiteboards(student_id, community_id);

-- 5. Teacher Profiles (Admin-created teacher accounts)
CREATE TABLE IF NOT EXISTS teacher_profiles (
  id SERIAL PRIMARY KEY,
  teacher_code VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(120) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(20) DEFAULT '',
  password_hash TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_teacher_profiles_email ON teacher_profiles(email);
CREATE INDEX IF NOT EXISTS idx_teacher_profiles_active ON teacher_profiles(is_active);

-- 6. Teacher Subject Assignments (Class + Subject combination assigned by Admin)
CREATE TABLE IF NOT EXISTS teacher_subject_assignments (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  class_level VARCHAR(30) NOT NULL, -- 'Class 11' or 'Class 12'
  subject VARCHAR(50) NOT NULL,     -- 'Physics', 'Chemistry', 'Biology'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_teacher_class_subject UNIQUE (teacher_id, class_level, subject)
);

CREATE INDEX IF NOT EXISTS idx_teacher_assignments_lookup ON teacher_subject_assignments(class_level, subject);

-- 7. Doubts (Explicitly submitted by student)
CREATE TABLE IF NOT EXISTS doubts (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  community_id INTEGER REFERENCES student_communities(id) ON DELETE SET NULL,
  class_level VARCHAR(30) NOT NULL,
  subject VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'Pending', 
  -- Allowed: 'Pending', 'Assigned', 'In Progress', 'Answered', 'Resolved', 'Reopened'
  assigned_teacher_id INTEGER REFERENCES teacher_profiles(id) ON DELETE SET NULL,
  version INTEGER NOT NULL DEFAULT 1,
  first_opened_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  first_response_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  last_response_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  resolved_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_doubts_student ON doubts(student_id);
CREATE INDEX IF NOT EXISTS idx_doubts_status ON doubts(status);
CREATE INDEX IF NOT EXISTS idx_doubts_filter ON doubts(class_level, subject, status);
CREATE INDEX IF NOT EXISTS idx_doubts_teacher ON doubts(assigned_teacher_id);

-- 8. Doubt Attachments (Submitted with doubt, stored in Admin Google Drive)
CREATE TABLE IF NOT EXISTS doubt_attachments (
  id SERIAL PRIMARY KEY,
  doubt_id INTEGER NOT NULL REFERENCES doubts(id) ON DELETE CASCADE,
  storage_key TEXT NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  file_size BIGINT NOT NULL DEFAULT 0,
  drive_file_id VARCHAR(255) DEFAULT '',
  drive_view_link TEXT DEFAULT '',
  drive_download_link TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_doubt_attachments_doubt ON doubt_attachments(doubt_id);

-- 9. Doubt Responses (Teacher answers)
CREATE TABLE IF NOT EXISTS doubt_responses (
  id SERIAL PRIMARY KEY,
  doubt_id INTEGER NOT NULL REFERENCES doubts(id) ON DELETE CASCADE,
  teacher_id INTEGER NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  response_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_doubt_responses_doubt ON doubt_responses(doubt_id);

-- 10. Doubt Response Attachments (Media in teacher responses)
CREATE TABLE IF NOT EXISTS doubt_response_attachments (
  id SERIAL PRIMARY KEY,
  response_id INTEGER NOT NULL REFERENCES doubt_responses(id) ON DELETE CASCADE,
  storage_key TEXT NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  file_size BIGINT NOT NULL DEFAULT 0,
  drive_file_id VARCHAR(255) DEFAULT '',
  drive_view_link TEXT DEFAULT '',
  drive_download_link TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Teacher Solution Whiteboards (Read-Only for Students, Editable for Teacher until published)
CREATE TABLE IF NOT EXISTS teacher_solution_whiteboards (
  id SERIAL PRIMARY KEY,
  doubt_id INTEGER NOT NULL REFERENCES doubts(id) ON DELETE CASCADE,
  teacher_id INTEGER NOT NULL REFERENCES teacher_profiles(id) ON DELETE CASCADE,
  document_json JSONB NOT NULL DEFAULT '{"elements": []}',
  snapshot_drive_link TEXT DEFAULT '',
  snapshot_drive_file_id VARCHAR(255) DEFAULT '',
  version INTEGER NOT NULL DEFAULT 1,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_teacher_solution_doubt ON teacher_solution_whiteboards(doubt_id);

-- 12. Doubt Status History
CREATE TABLE IF NOT EXISTS doubt_status_history (
  id SERIAL PRIMARY KEY,
  doubt_id INTEGER NOT NULL REFERENCES doubts(id) ON DELETE CASCADE,
  previous_status VARCHAR(30),
  new_status VARCHAR(30) NOT NULL,
  changed_by_user_id INTEGER NOT NULL,
  changed_by_role VARCHAR(20) NOT NULL, -- 'student', 'teacher', 'admin'
  reason TEXT DEFAULT '',
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_doubt_status_hist_doubt ON doubt_status_history(doubt_id);

-- 13. Doubt Activity Events (Comprehensive audit timeline)
CREATE TABLE IF NOT EXISTS doubt_activity_events (
  id SERIAL PRIMARY KEY,
  doubt_id INTEGER NOT NULL REFERENCES doubts(id) ON DELETE CASCADE,
  actor_id INTEGER NOT NULL,
  actor_role VARCHAR(20) NOT NULL, -- 'student', 'teacher', 'admin', 'system'
  event_type VARCHAR(60) NOT NULL,
  event_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  previous_status VARCHAR(30),
  new_status VARCHAR(30),
  response_id INTEGER,
  whiteboard_version_id INTEGER,
  metadata_json JSONB DEFAULT '{}',
  request_id VARCHAR(100) DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_activity_events_doubt ON doubt_activity_events(doubt_id, event_timestamp);

-- 14. Doubt Resolution Cycles (Preserves multiple resolution rounds on reopening)
CREATE TABLE IF NOT EXISTS doubt_resolution_cycles (
  id SERIAL PRIMARY KEY,
  doubt_id INTEGER NOT NULL REFERENCES doubts(id) ON DELETE CASCADE,
  cycle_number INTEGER NOT NULL DEFAULT 1,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  first_response_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  resolved_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  reopened_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  closed_by_user_id INTEGER DEFAULT NULL,
  CONSTRAINT uq_doubt_cycle UNIQUE (doubt_id, cycle_number)
);

CREATE INDEX IF NOT EXISTS idx_resolution_cycles_doubt ON doubt_resolution_cycles(doubt_id);

-- 15. Doubt Audit Logs
CREATE TABLE IF NOT EXISTS doubt_audit_logs (
  id SERIAL PRIMARY KEY,
  doubt_id INTEGER REFERENCES doubts(id) ON DELETE SET NULL,
  actor_id INTEGER NOT NULL,
  actor_role VARCHAR(20) NOT NULL,
  action VARCHAR(100) NOT NULL,
  metadata_json JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_doubt_audit_doubt ON doubt_audit_logs(doubt_id);

-- 16. Community Notifications
CREATE TABLE IF NOT EXISTS community_notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  user_role VARCHAR(20) NOT NULL, -- 'student', 'teacher', 'admin'
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  doubt_id INTEGER REFERENCES doubts(id) ON DELETE SET NULL,
  community_id INTEGER REFERENCES student_communities(id) ON DELETE SET NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_comm_notif_user ON community_notifications(user_id, user_role, is_read);

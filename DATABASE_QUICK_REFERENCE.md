# Database Quick Reference Guide

## 📊 Database Overview

**Total Tables:** 33
**Primary Database:** PostgreSQL
**Connection:** Via pool (connection string or individual credentials)

---

## 🗂️ Table Categories & Quick Access

### 👥 User & Authentication (4 tables)
| Table | Purpose | Key Fields |
|-------|---------|-----------|
| **users** | Student accounts | id, phone, password_hash, batch_id, full_name |
| **admin_users** | Admin accounts | id, username, password_hash |
| **otp_sessions** | OTP verification | phone, otp_code, expires_at, verified_at |
| **fcm_tokens** | Push notifications | user_id, token |

### 📚 Content Structure (11 tables)
| Table | Purpose | Relationships |
|-------|---------|---------------|
| **courses** | Course offerings | 1:M → batches |
| **batches** | Classes/cohorts | M:1 ← courses, 1:M → books/tests/videos |
| **classes** | Class definitions | 1:M → subjects |
| **subjects** | Subject names | M:1 ← classes |
| **books** | Study materials | 1:M → book_chapters |
| **book_chapters** | Book sections | M:1 ← books, 1:M → pyqs |
| **pyqs** | Previous year Q's | M:1 ← book_chapters |
| **practice_sets** | Curated Q collections | 1:M → practice_questions |
| **practice_questions** | Practice Q's | M:1 ← practice_sets |
| **tests** | Full-length exams | 1:M → test_questions, test_attempts |
| **test_questions** | Individual test Q's | M:1 ← tests |
| **videos** | Video lectures | M:1 ← batches |
| **daily_mcqs** | Daily practice Q's | M:1 ← batches |

### 🏪 Business (2 tables)
| Table | Purpose | Notes |
|-------|---------|-------|
| **packages** | Subscription tiers | Starter, Rank Pro |
| **colleges** | Medical colleges | 12 colleges seeded |

### 📈 User Activity (2 tables)
| Table | Purpose | Tracks |
|-------|---------|--------|
| **test_attempts** | Test submissions | user_id, test_id, score, accuracy |
| **app_config** | Runtime config | OAuth tokens, feature flags |

### 📊 Analytics v1 (2 tables)
| Table | Purpose | Content |
|-------|---------|---------|
| **exam_analytics** | Test-level analytics | accuracy, correct/wrong counts |
| **ai_insights** | AI-generated insights | titles, body, priority |

### 🤖 Analytics v2 - AI (9 tables)
| Table | Purpose | Key Metrics |
|-------|---------|------------|
| **ai_user_analytics** | User-level aggregates | test count, accuracy, predictions, streaks |
| **ai_study_logs** | Daily tracking | study hours, questions attempted |
| **ai_test_attempt_details** | Per-question data | subject, topic, time, correctness |
| **ai_topic_performance** | Topic aggregates | accuracy %, questions, time |
| **ai_test_performance_history** | Score history | scores, percentiles, dates |
| **ai_weak_areas** | Weakness tracking | severity, identified date |
| **ai_study_recommendations** | AI suggestions | type, priority, target topic |
| **ai_neet_predictions** | Score predictions | predicted/actual scores, confidence |
| **ai_performance_comparisons** | Test statistics | averages, medians, percentiles |

---

## 🔑 Primary Keys & Constraints

### Serial IDs (1, 2, 3...)
- users, admin_users, courses, batches, classes, subjects
- books, book_chapters, pyqs, practice_sets, practice_questions
- tests, test_questions, test_attempts, videos, daily_mcqs, packages
- colleges, otp_sessions, fcm_tokens
- exam_analytics, ai_insights
- All AI analytics tables

### Unique Constraints
- users.phone (UNIQUE)
- admin_users.username (UNIQUE)
- courses.name (UNIQUE)
- batches.name (UNIQUE)
- classes.name (UNIQUE)
- subjects (UNIQUE: class_id, name)
- otp_sessions.phone (UNIQUE)
- fcm_tokens.token (UNIQUE)
- ai_user_analytics.user_id (UNIQUE)
- ai_study_logs (UNIQUE: user_id, log_date)
- ai_topic_performance (UNIQUE: user_id, subject, topic)
- ai_weak_areas (UNIQUE: user_id, subject, topic)

---

## 🔗 Foreign Key Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                    RELATIONSHIP MAP                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  courses                                                    │
│    └── batches (FK: course_id)                             │
│         ├── books (FK: batch_id)                           │
│         │    └── book_chapters (FK: book_id)              │
│         │         └── pyqs (FK: chapter_id)               │
│         ├── practice_sets (FK: batch_id)                  │
│         │    └── practice_questions (FK: practice_set_id) │
│         ├── tests (FK: batch_id)                          │
│         │    ├── test_questions (FK: test_id)             │
│         │    └── test_attempts (FK: test_id)              │
│         │         └── test_attempt_details                │
│         ├── videos (FK: batch_id)                         │
│         └── daily_mcqs (FK: batch_id)                     │
│                                                             │
│  users                                                      │
│    ├── batches (FK: batch_id)                             │
│    ├── test_attempts (FK: user_id)                        │
│    ├── fcm_tokens (FK: user_id)                           │
│    ├── exam_analytics (FK: user_id)                       │
│    ├── ai_user_analytics (FK: user_id)                    │
│    ├── ai_study_logs (FK: user_id)                        │
│    ├── ai_topic_performance (FK: user_id)                 │
│    ├── ai_weak_areas (FK: user_id)                        │
│    ├── ai_study_recommendations (FK: user_id)             │
│    └── ai_neet_predictions (FK: user_id)                  │
│                                                             │
│  classes                                                    │
│    └── subjects (FK: class_id)                            │
│                                                             │
│  packages (standalone)                                     │
│  colleges (standalone)                                     │
│  admin_users (standalone)                                  │
│  app_config (standalone)                                   │
│  otp_sessions (standalone)                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📑 Column Data Types Guide

### Text Fields
```sql
VARCHAR(n)     -- Fixed-length strings
TEXT           -- Long text (PDFs, notes, explanations)
CHAR(1)        -- Single character (option A/B/C/D)
```

### Numeric Fields
```sql
SERIAL         -- Auto-incrementing integer (1, 2, 3...)
INTEGER        -- Whole numbers (score, count, rank)
NUMERIC(7,2)   -- Decimal with 5 digits + 2 decimals (hours, score)
NUMERIC(5,2)   -- Decimal with 3 digits + 2 decimals (accuracy %)
```

### Time Fields
```sql
TIMESTAMP            -- Date + time (2024-06-16 10:30:00)
DATE                 -- Date only (2024-06-16)
DEFAULT CURRENT_TIMESTAMP  -- Automatically set to now
```

### Array & JSON Fields
```sql
TEXT[]               -- Array of text (weak_topics, strong_topics)
JSONB                -- JSON data (topic_accuracy, features_json)
BOOLEAN              -- True/False
```

---

## 🔍 Most Used Queries

### User Management
```sql
-- Get user profile with batch info
SELECT u.*, b.name as batch_name, c.name as class_label
FROM users u
LEFT JOIN batches b ON u.batch_id = b.id
WHERE u.id = $1;

-- Count users per batch
SELECT b.name, COUNT(u.id) as user_count
FROM batches b
LEFT JOIN users u ON u.batch_id = b.id
GROUP BY b.id;
```

### Content Queries
```sql
-- Get all books for a batch
SELECT * FROM books WHERE batch_id = $1 ORDER BY created_at DESC;

-- Get chapters for a book with question count
SELECT bc.*, COUNT(p.id) as question_count
FROM book_chapters bc
LEFT JOIN pyqs p ON bc.id = p.chapter_id
WHERE bc.book_id = $1
GROUP BY bc.id;

-- Get all tests for a batch
SELECT * FROM tests WHERE batch_id = $1 AND is_active = TRUE;
```

### Analytics Queries
```sql
-- Get user's test history
SELECT ta.*, t.title, (ta.score::float / t.marks * 100) as percentage
FROM test_attempts ta
JOIN tests t ON ta.test_id = t.id
WHERE ta.user_id = $1
ORDER BY ta.attempted_at DESC;

-- Get weak areas for a user
SELECT subject, topic, accuracy_percent, severity
FROM ai_weak_areas
WHERE user_id = $1 AND improvement_tracked = FALSE
ORDER BY severity DESC;

-- Get user's analytics summary
SELECT 
  total_tests_taken,
  average_test_accuracy,
  physics_accuracy,
  chemistry_accuracy,
  biology_accuracy,
  predicted_neet_score,
  current_study_streak
FROM ai_user_analytics
WHERE user_id = $1;
```

### Admin Queries
```sql
-- Verify admin
SELECT * FROM admin_users WHERE username = $1;

-- Get all students in a batch
SELECT u.* FROM users u
WHERE u.batch_id = $1
ORDER BY u.created_at DESC;

-- Dashboard stats
SELECT
  (SELECT COUNT(*) FROM users) as total_users,
  (SELECT COUNT(*) FROM test_attempts) as total_tests_taken,
  (SELECT AVG(average_test_accuracy) FROM ai_user_analytics) as avg_accuracy
```

---

## 📊 Index Performance Optimization

**Total Indexes:** 30+

### Critical Indexes (Most Queries)
```sql
idx_users_batch_id
idx_tests_batch_class_subject_topic
idx_books_batch_class_subject_topic
idx_test_questions_test_id
idx_book_chapters_book_id
idx_practice_questions_set_id
idx_practice_sets_batch_class_subject_topic
idx_videos_batch_class_subject_topic
idx_daily_mcqs_batch_active
idx_fcm_tokens_user_id
idx_exam_analytics_user_created
```

### Analytics Indexes
```sql
idx_ai_user_analytics_user_id
idx_ai_user_analytics_physics
idx_ai_user_analytics_chemistry
idx_ai_user_analytics_biology
idx_ai_study_logs_user_id
idx_ai_study_logs_date
idx_ai_study_logs_user_date
idx_ai_topic_performance_user
idx_ai_topic_performance_accuracy
idx_ai_topic_performance_user_subject
idx_ai_test_performance_user
idx_ai_test_performance_date
idx_ai_test_performance_percentile
idx_ai_weak_areas_user
idx_ai_weak_areas_severity
```

---

## 🔄 Database Triggers

| Trigger | Table | Event | Function |
|---------|-------|-------|----------|
| **trigger_update_analytics** | test_attempts | INSERT | Updates user_analytics (v1) |
| **trigger_sync_topic_performance** | test_attempt_details | INSERT | Syncs topic_performance |
| **trg_update_analytics_on_test** | test_attempts | INSERT | Updates ai_user_analytics (v2) |
| **trg_calculate_topic_accuracy** | ai_test_attempt_details | INSERT | Calculates topic accuracy |

---

## 📋 Seeded/Default Data

### Courses (1)
- Neet Dropper Batch

### Batches (3)
- Target Neet 2028 - Class 11th Going
- Target Neet 2027 - Class 12th Going
- Target Neet 2027 - Dropper Batch

### Classes (3)
- Class 11
- Class 12
- Dropper

### Subjects (15: 3 classes × 5 subjects)
- Physics, Chemistry, Biology, Botany, Zoology (for each class)

### Colleges (12)
- AIIMS Delhi, Maulana Azad Medical College, etc.

### Packages (2)
- Starter: Rs 999/month
- Rank Pro: Rs 4999/6 months

### Admin Users (1 default)
- username: admin
- password: admin@123 (hashed)

---

## 🔐 Data Access Patterns

### Public (No Auth)
- `/api/auth/send-otp` - Send OTP
- `/api/auth/verify-otp` - Verify OTP
- `/api/auth/login` - Login
- `/health` - Health check

### Authenticated User
- `/api/content/*` - Access books, tests, videos, etc.
- `/api/auth/profile` - View/update own profile
- `/api/analytics` - View own analytics

### Admin Only (JWT + role='admin')
- `/api/admin/login` - Admin login
- `/api/admin/books/upload` - Create content
- `/api/admin/test/create` - Create tests
- `/api/admin/notifications/send` - Send notifications
- `/api/admin/analytics` - View dashboard

---

## ⚙️ Configuration Table (app_config)

| Key | Example Value | Purpose |
|-----|---------------|---------|
| GDRIVE_OAUTH_REFRESH_TOKEN | ya29.a0AfH6SMB... | Google Drive OAuth |
| (Add more as needed) | | |

---

## 🔄 Migration History

| File | Purpose | Tables |
|------|---------|--------|
| `db.js` (ensureDatabaseSchema) | Initial schema | 21 core tables |
| `005_add_analytics_tables.sql` | v1 Analytics | user_analytics, test_attempt_details, study_logs, topic_performance |
| `006_create_ai_features_tables.sql` | v2 AI Analytics | 9 comprehensive AI tables |

---

## 📝 Common Operations

### Add New Admin
```sql
INSERT INTO admin_users (username, password_hash)
VALUES ('admin2', '$2a$10$...');
```

### Add New Batch
```sql
INSERT INTO batches (course_id, name, target_year, class_label)
VALUES (1, 'New Batch 2024', '2024', 'Class 12');
```

### Add New Package
```sql
INSERT INTO packages (name, price_label, validity, features_json)
VALUES ('Premium', 'Rs 9999', '1 year', '["All features"]'::jsonb);
```

### Create Book with Chapter
```sql
-- 1. Insert book
INSERT INTO books (batch_id, title, subject, topic) 
VALUES (1, 'Physics Book 1', 'Physics', 'Mechanics')
RETURNING id;

-- 2. Insert chapter for that book
INSERT INTO book_chapters (book_id, title, note_summary)
VALUES (<book_id>, 'Chapter 1: Motion', '...');
```

### Submit Test Attempt
```sql
-- 1. Insert attempt
INSERT INTO test_attempts (user_id, test_id, score, accuracy)
VALUES (1, 1, 150, 83.33)
RETURNING id;

-- 2. Insert per-question details (auto-triggers analytics update)
INSERT INTO ai_test_attempt_details 
(test_attempt_id, question_id, subject, topic, is_correct, time_taken_seconds)
VALUES (<attempt_id>, 1, 'Physics', 'Mechanics', true, 45);
```

---

## 🚀 Performance Tips

1. **Always use indexes for filtering:**
   - batch_id, class_label, subject, topic
   - user_id, created_at/updated_at

2. **Batch analytics updates:**
   - Insert multiple test_attempt_details in one transaction
   - Triggers auto-calculate aggregates

3. **Cache frequently accessed data:**
   - Batches, classes, subjects
   - User analytics (ai_user_analytics)

4. **Archive old test attempts:**
   - Consider partitioning test_attempts by date

---

## 📚 Related Documentation

- [BACKEND_STRUCTURE.md](BACKEND_STRUCTURE.md) - Detailed schema with descriptions
- [ADMIN_SYSTEM.md](ADMIN_SYSTEM.md) - Admin authentication & routes
- [db.js](indraprastha-backend/src/db.js) - Schema initialization code
- [admin.js](indraprastha-backend/src/routes/admin.js) - Admin endpoints


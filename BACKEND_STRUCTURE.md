# Indraprastha Backend - Complete Structure & Database Schema

## 🏗️ Backend Architecture Overview

### Project Structure
```
indraprastha-backend/
├── src/
│   ├── index.js                 # Express app setup, routes initialization
│   ├── db.js                    # PostgreSQL connection & schema initialization
│   ├── routes/
│   │   ├── auth.js              # Authentication routes (OTP, login, profile)
│   │   ├── content.js           # Student content routes (books, tests, videos, etc)
│   │   └── admin.js             # Admin routes (content management)
│   └── services/
│       ├── drive.js             # Google Drive integration & OCR
│       ├── firebase.js          # Firebase notifications
│       ├── notifications.js     # Notification dispatch logic
│       └── analytics.js         # Analytics processing
├── migrations/
│   ├── 005_add_analytics_tables.sql       # Analytics tables (v1)
│   └── 006_create_ai_features_tables.sql  # AI analytics tables (v2)
└── package.json
```

### API Endpoints

#### 🔐 Authentication Routes (`/api/auth`)
- `POST /send-otp` - Send OTP to phone
- `POST /verify-otp` - Verify OTP and create session
- `POST /login` - Login with credentials
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile

#### 📚 Content Routes (`/api/content`)
- `GET /books` - List books with filters
- `GET /books/:id/chapters` - Get book chapters
- `GET /pyqs/:chapterId` - Get practice questions
- `GET /practice-sets` - List practice sets
- `GET /practice-questions` - Get practice questions from set
- `GET /tests` - List tests
- `GET /test/:id/questions` - Get test questions
- `POST /test/:id/submit` - Submit test attempt
- `GET /daily-mcq` - Get daily MCQ
- `GET /videos` - List video lectures
- `GET /analytics` - Get user analytics

#### ⚙️ Admin Routes (`/api/admin`)
- `POST /login` - Admin login
- `POST /books/upload` - Upload book chapter (PDF)
- `POST /pyqs/upload` - Upload PYQ from PDF
- `POST /practice-sets/create` - Create practice set
- `POST /test/create` - Create test
- `POST /notifications/send` - Send notifications
- `GET /analytics` - View analytics dashboard
- CRUD operations for all content

---

## 📊 Database Schema (PostgreSQL)

### Core Tables

#### 1. **users** - Student user accounts
```sql
id (SERIAL PRIMARY KEY)
phone (VARCHAR(15) UNIQUE NOT NULL)
full_name (VARCHAR(100))
password_hash (TEXT)
preferred_language (VARCHAR(40)) DEFAULT 'English'
target_exam_year (VARCHAR(20)) DEFAULT 'NEET'
preferred_plan (VARCHAR(50)) DEFAULT 'Starter'
course_category (VARCHAR(100))
college_state (VARCHAR(100))
mbbs_admission_year (VARCHAR(20))
medical_college (VARCHAR(200))
batch_id (INTEGER) FOREIGN KEY → batches.id
active_session_id (TEXT)
is_profile_complete (BOOLEAN) DEFAULT FALSE
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```
**Relationships:** One-to-Many with test_attempts, one-to-many with fcm_tokens
**Indexes:** batch_id

---

#### 2. **admin_users** - Admin accounts
```sql
id (SERIAL PRIMARY KEY)
username (VARCHAR(80) UNIQUE NOT NULL)
password_hash (TEXT NOT NULL)
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```
**Authentication:** JWT-based with Bearer token

---

#### 3. **courses** - Course offerings
```sql
id (SERIAL PRIMARY KEY)
name (VARCHAR(120) UNIQUE NOT NULL)
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```
**Example Data:**
- Neet Dropper Batch

---

#### 4. **batches** - Classes/batches per course
```sql
id (SERIAL PRIMARY KEY)
course_id (INTEGER NOT NULL) FOREIGN KEY → courses.id
name (VARCHAR(180) UNIQUE NOT NULL)
target_year (VARCHAR(20))
class_label (VARCHAR(40))
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```
**Example Data:**
- Target Neet 2028 - Class 11th Going
- Target Neet 2027 - Class 12th Going
- Target Neet 2027 - Dropper Batch
**Relationships:** One-to-Many with books, tests, videos, practice_sets, daily_mcqs

---

#### 5. **classes** - Class/Grade definitions
```sql
id (SERIAL PRIMARY KEY)
name (VARCHAR(60) UNIQUE NOT NULL)
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```
**Example Data:** Class 11, Class 12, Dropper
**Relationships:** One-to-Many with subjects

---

#### 6. **subjects** - Subject hierarchy
```sql
id (SERIAL PRIMARY KEY)
class_id (INTEGER) FOREIGN KEY → classes.id
name (VARCHAR(80) NOT NULL)
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
UNIQUE (class_id, name)
```
**Example Data:** Physics, Chemistry, Biology, Botany, Zoology

---

### Content Tables

#### 7. **books** - Study material books
```sql
id (SERIAL PRIMARY KEY)
batch_id (INTEGER NOT NULL) FOREIGN KEY → batches.id
class_label (VARCHAR(40))
title (VARCHAR(200) NOT NULL)
subject (VARCHAR(80) NOT NULL)
topic (VARCHAR(140)) DEFAULT ''
level (VARCHAR(80)) DEFAULT 'Core'
category (VARCHAR(100)) DEFAULT 'NCERT books'
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```
**Relationships:** One-to-Many with book_chapters
**Index:** batch_id, class_label, subject, topic

---

#### 8. **book_chapters** - Chapters within books
```sql
id (SERIAL PRIMARY KEY)
book_id (INTEGER NOT NULL) FOREIGN KEY → books.id
title (VARCHAR(200) NOT NULL)
overview (TEXT) DEFAULT ''
note_summary (TEXT) DEFAULT ''
highlight (TEXT) DEFAULT ''
material_type (VARCHAR(20)) DEFAULT 'text' (e.g., 'pdf', 'text', 'video')
material_drive_link (TEXT)
material_drive_file_id (TEXT) DEFAULT ''
material_drive_folder_id (TEXT) DEFAULT ''
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```
**Storage:** Google Drive integration for materials
**Relationships:** One-to-Many with pyqs

---

#### 9. **pyqs** - Previous Year Questions
```sql
id (SERIAL PRIMARY KEY)
chapter_id (INTEGER NOT NULL) FOREIGN KEY → book_chapters.id
question (TEXT NOT NULL)
option_a (TEXT NOT NULL)
option_b (TEXT NOT NULL)
option_c (TEXT NOT NULL)
option_d (TEXT NOT NULL)
correct_option (CHAR(1) NOT NULL) -- A, B, C, or D
explanation (TEXT) DEFAULT ''
year_label (VARCHAR(20)) DEFAULT 'NEET'
question_image_link (TEXT)
question_image_drive_file_id (TEXT)
question_image_drive_folder_id (TEXT)
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```

---

#### 10. **practice_sets** - Curated practice question sets
```sql
id (SERIAL PRIMARY KEY)
batch_id (INTEGER NOT NULL) FOREIGN KEY → batches.id
class_label (VARCHAR(40))
subject (VARCHAR(80)) DEFAULT ''
title (VARCHAR(200) NOT NULL)
topic (VARCHAR(140) NOT NULL)
difficulty (VARCHAR(30)) DEFAULT 'Moderate'
estimated_minutes (INTEGER) DEFAULT 20
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```
**Relationships:** One-to-Many with practice_questions
**Index:** batch_id, class_label, subject, topic

---

#### 11. **practice_questions** - Questions in practice sets
```sql
id (SERIAL PRIMARY KEY)
practice_set_id (INTEGER NOT NULL) FOREIGN KEY → practice_sets.id
question (TEXT NOT NULL)
option_a (TEXT NOT NULL)
option_b (TEXT NOT NULL)
option_c (TEXT NOT NULL)
option_d (TEXT NOT NULL)
correct_option (CHAR(1) NOT NULL)
explanation (TEXT) DEFAULT ''
question_image_link (TEXT)
question_image_drive_file_id (TEXT)
question_image_drive_folder_id (TEXT)
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```

---

#### 12. **tests** - Full-length tests / exams
```sql
id (SERIAL PRIMARY KEY)
batch_id (INTEGER NOT NULL) FOREIGN KEY → batches.id
class_label (VARCHAR(40))
subject (VARCHAR(80)) DEFAULT ''
topic (VARCHAR(140)) DEFAULT ''
title (VARCHAR(220) NOT NULL)
category (VARCHAR(60)) DEFAULT 'Grand test'
duration_minutes (INTEGER) DEFAULT 180
marks (INTEGER) DEFAULT 720
question_count (INTEGER) DEFAULT 180
syllabus_coverage (TEXT) DEFAULT ''
schedule_label (VARCHAR(80)) DEFAULT ''
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```
**Relationships:** One-to-Many with test_questions, test_attempts
**Index:** batch_id, class_label, subject, topic

---

#### 13. **test_questions** - Individual test questions
```sql
id (SERIAL PRIMARY KEY)
test_id (INTEGER NOT NULL) FOREIGN KEY → tests.id
subject (VARCHAR(80)) DEFAULT 'Biology'
question (TEXT NOT NULL)
option_a (TEXT NOT NULL)
option_b (TEXT NOT NULL)
option_c (TEXT NOT NULL)
option_d (TEXT NOT NULL)
correct_option (CHAR(1) NOT NULL)
explanation (TEXT) DEFAULT ''
question_image_link (TEXT)
question_image_drive_file_id (TEXT)
question_image_drive_folder_id (TEXT)
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```
**Index:** test_id

---

#### 14. **test_attempts** - User test submissions
```sql
id (SERIAL PRIMARY KEY)
user_id (INTEGER NOT NULL) FOREIGN KEY → users.id
test_id (INTEGER NOT NULL) FOREIGN KEY → tests.id
score (INTEGER NOT NULL)
accuracy (NUMERIC(5,2)) DEFAULT 0
attempted_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```
**Relationships:** One-to-Many with test_attempt_details
**Triggers:** Updates user_analytics and study logs

---

#### 15. **videos** - Video lectures
```sql
id (SERIAL PRIMARY KEY)
batch_id (INTEGER NOT NULL) FOREIGN KEY → batches.id
class_label (VARCHAR(40))
title (VARCHAR(220) NOT NULL)
subject (VARCHAR(80) NOT NULL)
topic (VARCHAR(140)) DEFAULT ''
chapter_hint (VARCHAR(200)) DEFAULT ''
section_label (VARCHAR(120)) DEFAULT 'Concept explainers'
duration_label (VARCHAR(40)) DEFAULT '15 min'
drive_link (TEXT NOT NULL)
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```
**Storage:** Google Drive hosted
**Index:** batch_id, class_label, subject, topic

---

#### 16. **daily_mcqs** - Daily practice MCQs
```sql
id (SERIAL PRIMARY KEY)
batch_id (INTEGER NOT NULL) FOREIGN KEY → batches.id
class_label (VARCHAR(40))
subject (VARCHAR(80)) DEFAULT ''
topic (VARCHAR(140)) DEFAULT ''
question (TEXT NOT NULL)
option_a (TEXT NOT NULL)
option_b (TEXT NOT NULL)
option_c (TEXT NOT NULL)
option_d (TEXT NOT NULL)
correct_option (CHAR(1) NOT NULL)
explanation (TEXT) DEFAULT ''
question_image_link (TEXT)
question_image_drive_file_id (TEXT)
question_image_drive_folder_id (TEXT) DEFAULT ''
is_active (BOOLEAN) DEFAULT TRUE
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```
**Index:** batch_id, is_active

---

#### 17. **packages** - Subscription packages
```sql
id (SERIAL PRIMARY KEY)
name (VARCHAR(120) UNIQUE NOT NULL)
price_label (VARCHAR(60) NOT NULL)
validity (VARCHAR(60) NOT NULL)
highlight (TEXT) DEFAULT ''
features_json (JSONB) DEFAULT '[]'::jsonb
is_active (BOOLEAN) DEFAULT TRUE
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```
**Example Data:**
- Starter: Rs 999, 1 month
- Rank Pro: Rs 4999, 6 months

---

### Supporting Tables

#### 18. **otp_sessions** - OTP verification
```sql
id (SERIAL PRIMARY KEY)
phone (VARCHAR(15) UNIQUE NOT NULL)
otp_code (VARCHAR(6) NOT NULL)
expires_at (TIMESTAMP NOT NULL)
verified_at (TIMESTAMP)
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```

---

#### 19. **colleges** - Medical colleges directory
```sql
id (SERIAL PRIMARY KEY)
state (VARCHAR(100) NOT NULL)
name (VARCHAR(200) NOT NULL)
```
**Seeded with:** 12 colleges across India (AIIMS Delhi, Grant Medical, etc.)

---

#### 20. **fcm_tokens** - Push notification tokens
```sql
id (SERIAL PRIMARY KEY)
user_id (INTEGER) FOREIGN KEY → users.id
token (TEXT UNIQUE NOT NULL)
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
updated_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```
**Index:** user_id
**Purpose:** Firebase Cloud Messaging for push notifications

---

#### 21. **app_config** - Runtime configuration
```sql
key (TEXT PRIMARY KEY)
value (TEXT NOT NULL)
updated_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```
**Example:** Stores Google Drive OAuth refresh tokens

---

### Analytics Tables (v1)

#### 22. **exam_analytics** - Test analytics
```sql
id (SERIAL PRIMARY KEY)
user_id (INTEGER NOT NULL) FOREIGN KEY → users.id
test_id (INTEGER) FOREIGN KEY → tests.id
overall_accuracy (NUMERIC(5,2)) DEFAULT 0
correct_count (INTEGER) DEFAULT 0
wrong_count (INTEGER) DEFAULT 0
unattempted_count (INTEGER) DEFAULT 0
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```

---

#### 23. **ai_insights** - AI-generated insights
```sql
id (SERIAL PRIMARY KEY)
analytics_id (INTEGER NOT NULL) FOREIGN KEY → exam_analytics.id
insight_title (VARCHAR(200) NOT NULL)
insight_body (TEXT NOT NULL)
priority (VARCHAR(20)) DEFAULT 'medium'
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```

---

### Analytics Tables (v2 - AI Features)

#### 24. **ai_user_analytics** - Comprehensive user analytics
```sql
id (SERIAL PRIMARY KEY)
user_id (INTEGER NOT NULL) UNIQUE FOREIGN KEY → users.id

-- Test Performance
total_tests_taken (INTEGER) DEFAULT 0
average_test_score (NUMERIC(7,2)) DEFAULT 0
average_test_accuracy (NUMERIC(5,2)) DEFAULT 0

-- Subject-wise Accuracy (%)
physics_accuracy (NUMERIC(5,2)) DEFAULT 0
chemistry_accuracy (NUMERIC(5,2)) DEFAULT 0
biology_accuracy (NUMERIC(5,2)) DEFAULT 0

-- Topic-wise Performance (JSON)
topic_accuracy (JSONB) DEFAULT '{}'
weak_topics_list (TEXT[]) DEFAULT '{}'
strong_topics_list (TEXT[]) DEFAULT '{}'

-- Speed Metrics (seconds per question)
average_time_per_question (NUMERIC(7,2)) DEFAULT 0

-- Study Activity
total_study_hours (NUMERIC(7,2)) DEFAULT 0

-- NEET Predictions
predicted_neet_score (INTEGER) DEFAULT 0
predicted_neet_rank (INTEGER) DEFAULT 0
prediction_confidence (NUMERIC(5,2)) DEFAULT 0
last_prediction_date (TIMESTAMP)

-- Study Streaks
current_study_streak (INTEGER) DEFAULT 0
longest_study_streak (INTEGER) DEFAULT 0
last_study_date (DATE)

-- Metadata
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
updated_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```
**Indexes:** user_id, physics_accuracy, chemistry_accuracy, biology_accuracy
**Triggers:** Auto-updated on test submission

---

#### 25. **ai_study_logs** - Daily study tracking
```sql
id (SERIAL PRIMARY KEY)
user_id (INTEGER NOT NULL) FOREIGN KEY → users.id
log_date (DATE)

-- Daily Activity
study_hours_today (NUMERIC(5,2)) DEFAULT 0
questions_attempted_today (INTEGER) DEFAULT 0
questions_correct_today (INTEGER) DEFAULT 0
tests_taken_today (INTEGER) DEFAULT 0

-- Session Info
session_count (INTEGER) DEFAULT 0
total_session_minutes (INTEGER) DEFAULT 0

created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
updated_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP

UNIQUE(user_id, log_date)
```
**Index:** user_id, log_date, user_id+log_date

---

#### 26. **ai_test_attempt_details** - Per-question test data
```sql
id (SERIAL PRIMARY KEY)
test_attempt_id (INTEGER NOT NULL) FOREIGN KEY → test_attempts.id
question_id (INTEGER) FOREIGN KEY → test_questions.id

-- Question Metadata
subject (VARCHAR(100))
topic (VARCHAR(255))
difficulty (VARCHAR(20))

-- User Response
is_correct (BOOLEAN) DEFAULT FALSE
time_taken_seconds (INTEGER)
user_answer (VARCHAR(1))
correct_answer (VARCHAR(1))
confidence_level (INTEGER) -- 1-5 scale (optional)

created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```
**Indexes:** test_attempt_id, question_id, subject+topic

---

#### 27. **ai_topic_performance** - Aggregated topic metrics
```sql
id (SERIAL PRIMARY KEY)
user_id (INTEGER NOT NULL) FOREIGN KEY → users.id

-- Topic Info
subject (VARCHAR(100))
topic (VARCHAR(255))

-- Performance
accuracy (NUMERIC(5,2)) DEFAULT 0
questions_attempted (INTEGER) DEFAULT 0
questions_correct (INTEGER) DEFAULT 0
average_time_seconds (NUMERIC(7,2)) DEFAULT 0

-- Tracking
first_attempt_date (TIMESTAMP)
last_attempt_date (TIMESTAMP)

created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
updated_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP

UNIQUE(user_id, subject, topic)
```
**Indexes:** user_id, accuracy, user_id+subject

---

#### 28. **ai_test_performance_history** - Test score history
```sql
id (SERIAL PRIMARY KEY)
user_id (INTEGER NOT NULL) FOREIGN KEY → users.id
test_id (INTEGER) FOREIGN KEY → tests.id

-- Score Info
score (INTEGER)
total_questions (INTEGER)
accuracy_percent (NUMERIC(5,2))
time_taken_seconds (INTEGER)

-- Subject Breakdown
physics_score (INTEGER)
chemistry_score (INTEGER)
biology_score (INTEGER)

-- Ranking
percentile_rank (NUMERIC(5,2))
test_date (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP

created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```
**Indexes:** user_id, test_date, percentile_rank

---

#### 29. **ai_weak_areas** - Weakness tracking
```sql
id (SERIAL PRIMARY KEY)
user_id (INTEGER NOT NULL) FOREIGN KEY → users.id

-- Topic Info
subject (VARCHAR(100))
topic (VARCHAR(255))

-- Weakness Level
severity (INTEGER) -- 1-10 scale (10 = most critical)
accuracy_percent (NUMERIC(5,2))

-- Tracking
identified_date (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
last_attempted_date (TIMESTAMP)
improvement_tracked (BOOLEAN) DEFAULT FALSE

UNIQUE(user_id, subject, topic)
```
**Indexes:** user_id, severity DESC

---

#### 30. **ai_study_recommendations** - AI study suggestions
```sql
id (SERIAL PRIMARY KEY)
user_id (INTEGER NOT NULL) FOREIGN KEY → users.id

-- Recommendation
recommendation_text (TEXT)
recommendation_type (VARCHAR(50)) -- weak_topic, speed, accuracy, etc.
priority (INTEGER) -- 1-10

-- Target
target_subject (VARCHAR(100))
target_topic (VARCHAR(255))

-- Status
is_active (BOOLEAN) DEFAULT TRUE
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
expires_at (TIMESTAMP)
```
**Indexes:** user_id, is_active

---

#### 31. **ai_neet_predictions** - NEET score predictions
```sql
id (SERIAL PRIMARY KEY)
user_id (INTEGER NOT NULL) FOREIGN KEY → users.id

-- Prediction
predicted_score (INTEGER)
predicted_rank (INTEGER)
confidence_percent (NUMERIC(5,2))

-- Actual (after exam)
actual_score (INTEGER)
actual_rank (INTEGER)

-- Input Data
tests_completed (INTEGER)
average_accuracy (NUMERIC(5,2))
study_hours (NUMERIC(7,2))

-- Metadata
created_at (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
actual_score_date (TIMESTAMP)
```
**Indexes:** user_id, created_at

---

#### 32. **ai_performance_comparisons** - Test statistics
```sql
id (SERIAL PRIMARY KEY)
test_id (INTEGER) FOREIGN KEY → tests.id

-- Aggregate Stats
total_attempts (INTEGER)
average_score (NUMERIC(7,2))
highest_score (INTEGER)
lowest_score (INTEGER)
median_score (NUMERIC(7,2))

-- Distribution
average_percentile (NUMERIC(5,2))

-- Date
calculated_date (TIMESTAMP) DEFAULT CURRENT_TIMESTAMP
```
**Index:** test_id

---

## 🔄 Database Triggers & Functions

### 1. **trigger_update_analytics** (Migration 005)
- **Trigger:** AFTER INSERT ON test_attempts
- **Function:** update_user_analytics()
- **Action:** Auto-updates average score and test count in user_analytics

### 2. **trigger_sync_topic_performance** (Migration 005)
- **Trigger:** AFTER INSERT ON test_attempt_details
- **Function:** sync_topic_performance()
- **Action:** Auto-calculates and updates topic_performance records

### 3. **trg_update_analytics_on_test** (Migration 006)
- **Trigger:** AFTER INSERT ON test_attempts
- **Function:** fn_update_analytics_on_test()
- **Action:** 
  - Updates ai_user_analytics (test count, average score)
  - Creates/updates ai_study_logs for the day

### 4. **trg_calculate_topic_accuracy** (Migration 006)
- **Trigger:** AFTER INSERT ON ai_test_attempt_details
- **Function:** fn_calculate_topic_accuracy()
- **Action:** 
  - Inserts new topic_performance record if not exists
  - Updates accuracy percentage on subsequent attempts

---

## 📋 Summary Statistics

| Category | Count | Purpose |
|----------|-------|---------|
| **Core Tables** | 10 | Users, courses, batches, classes, subjects, etc. |
| **Content Tables** | 8 | Books, chapters, questions, tests, videos, etc. |
| **Support Tables** | 3 | OTP, colleges, FCM tokens |
| **Config Tables** | 1 | Runtime configuration |
| **Analytics v1 Tables** | 2 | exam_analytics, ai_insights |
| **Analytics v2 Tables** | 9 | Comprehensive AI analytics suite |
| **TOTAL TABLES** | **33** | Complete database schema |
| **Indexes** | **30+** | Performance optimization indexes |
| **Triggers** | **4** | Automated data synchronization |

---

## 🗝️ Key Relationships

```
courses
  └── batches (1:M)
        ├── books (1:M)
        │     └── book_chapters (1:M)
        │           └── pyqs (1:M)
        ├── practice_sets (1:M)
        │     └── practice_questions (1:M)
        ├── tests (1:M)
        │     ├── test_questions (1:M)
        │     └── test_attempts (1:M) ← users
        ├── videos (1:M)
        └── daily_mcqs (1:M)

users
  ├── batches (M:1)
  ├── test_attempts (1:M)
  │     └── test_attempt_details (1:M)
  ├── fcm_tokens (1:M)
  ├── ai_user_analytics (1:1)
  ├── ai_study_logs (1:M)
  ├── ai_topic_performance (1:M)
  ├── ai_weak_areas (1:M)
  ├── ai_study_recommendations (1:M)
  └── ai_neet_predictions (1:M)

admin_users (standalone)
packages (standalone)
colleges (standalone)
```

---

## 🔒 Authentication & Security

- **User Auth:** OTP-based + Password hashing (bcrypt)
- **Admin Auth:** JWT Bearer token with role="admin"
- **Session Management:** active_session_id in users table
- **Data Security:** Foreign key constraints, ON DELETE CASCADE/SET NULL

---

## ✅ Admin Table Status

**YES, the admin table EXISTS:** `admin_users` table is fully implemented with:
- Admin user creation
- Password hashing (bcrypt)
- JWT-based authentication
- Admin-only route protection via middleware

---

## 📱 Integration Services

1. **Google Drive:** PDF uploads, OCR, file hosting
2. **Firebase:** Push notifications via FCM tokens
3. **PostgreSQL:** Primary database with 33 tables
4. **Express.js:** REST API backend

---

## 🚀 Environment Variables Required

```
DATABASE_URL or (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD)
JWT_SECRET
ADMIN_USERNAME
ADMIN_PASSWORD
GDRIVE_OAUTH_REFRESH_TOKEN
FIREBASE_CONFIG
PORT
NODE_ENV
CORS_ORIGINS
```

---

## 📝 Notes

- **Deleted Migration:** `indraprastha_final.sql` was removed from git (old migration)
- **Current Active Migrations:** 005 & 006
- **Data Seeding:** Default batches, classes, subjects, colleges, and packages are auto-created
- **Performance:** 30+ indexes for efficient querying of frequently filtered content
- **Analytics:** Two-generation system (v1 basic → v2 comprehensive AI analytics)


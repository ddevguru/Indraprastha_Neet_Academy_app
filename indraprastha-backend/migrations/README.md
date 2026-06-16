# Indraprastha Backend - Database Migrations

Complete SQL migration scripts for Indraprastha backend database setup.

---

## 📋 Migration Files

### 1. **001_create_all_tables.sql** (Main Schema)
- Creates all 33 database tables
- Sets up all indexes (30+)
- Creates database triggers and functions
- Seeds default data (courses, batches, classes, subjects, colleges, packages)

**Size:** ~700 lines
**Execution Time:** ~5 seconds
**Tables Created:** 33

### 2. **002_seed_admin_users.sql** (Admin Users)
- Creates admin users with bcrypt hashed passwords
- Template for adding additional admins
- Instructions for generating bcrypt hashes

**Size:** ~100 lines
**Execution Time:** <1 second

### 3. **003_add_explanation_images.sql** (Explanation Images with Multiple Uploads)
- Adds explanation_images table for multiple image support per question
- Adds admin_uploads table for tracking file uploads
- Adds batch_uploads table for bulk operations
- Adds columns to existing question tables for backward compatibility
- Creates question_with_explanations unified view
- Creates add_explanation_image() and delete_explanation_image() functions
- Supports: pyqs, practice_questions, test_questions, daily_mcqs

**Size:** ~450 lines
**Execution Time:** ~2 seconds
**Tables Created:** 3 (explanation_images, admin_uploads, batch_uploads)
**Views Created:** 1 (question_with_explanations)
**Functions Created:** 2 (add/delete_explanation_image)

---

## 🚀 How to Execute

### Option 1: Using psql (PostgreSQL CLI)

```bash
# Connect to your PostgreSQL database and run the migrations
psql -U postgres -d indraprastha < migrations/001_create_all_tables.sql
psql -U postgres -d indraprastha < migrations/002_seed_admin_users.sql
psql -U postgres -d indraprastha < migrations/003_add_explanation_images.sql
```

### Option 2: Using Connection String

```bash
# With DATABASE_URL environment variable
psql $DATABASE_URL < migrations/001_create_all_tables.sql
psql $DATABASE_URL < migrations/002_seed_admin_users.sql
```

### Option 3: From Node.js Application

The backend automatically runs these migrations via `ensureDatabaseSchema()` function in `src/db.js`:

```javascript
const { ensureDatabaseSchema } = require('./src/db');
await ensureDatabaseSchema();
```

### Option 4: Using pgAdmin (GUI)

1. Open pgAdmin
2. Select your database
3. Click "Query Tool"
4. Copy-paste content from SQL file
5. Click "Execute" button

### Option 5: Using DBeaver (GUI)

1. Right-click database → SQL Editor → New SQL Script
2. Copy-paste content from SQL file
3. Press Ctrl+Enter to execute

---

## 📊 Database Tables Created

### Core Tables (4)
- **users** - Student accounts
- **admin_users** - Admin accounts
- **otp_sessions** - OTP verification
- **fcm_tokens** - Push notification tokens

### Course Hierarchy (4)
- **courses** - Course offerings
- **batches** - Classes/batches
- **classes** - Class definitions
- **subjects** - Subject names

### Content Tables (8)
- **books** - Study materials
- **book_chapters** - Book chapters
- **pyqs** - Previous year questions
- **practice_sets** - Practice collections
- **practice_questions** - Practice questions
- **tests** - Full-length tests
- **test_questions** - Test questions
- **videos** - Video lectures
- **daily_mcqs** - Daily MCQs

### Business Tables (2)
- **packages** - Subscription packages
- **colleges** - Medical colleges directory

### Configuration (1)
- **app_config** - Runtime configuration

### Analytics v1 (2)
- **exam_analytics** - Test analytics
- **ai_insights** - AI insights

### Analytics v2 (9)
- **ai_user_analytics** - User analytics
- **ai_study_logs** - Study logs
- **ai_test_attempt_details** - Question details
- **ai_topic_performance** - Topic performance
- **ai_test_performance_history** - Score history
- **ai_weak_areas** - Weakness tracking
- **ai_study_recommendations** - Study suggestions
- **ai_neet_predictions** - NEET predictions
- **ai_performance_comparisons** - Test statistics

**Total: 33 Tables**

---

## 🔑 Indexes Created

Over 30 performance indexes on:
- Foreign key columns
- Frequently filtered columns
- Batch, class, subject, topic combinations
- User and date fields
- Analytics lookup columns

Example indexes:
```sql
idx_users_batch_id
idx_tests_batch_class_subject_topic
idx_books_batch_class_subject_topic
idx_ai_user_analytics_physics
idx_exam_analytics_user_created
... and 25+ more
```

---

## 🔄 Triggers & Functions

### 4 Database Triggers:

1. **trg_update_analytics_on_test**
   - Fires: AFTER INSERT ON test_attempts
   - Updates: ai_user_analytics, ai_study_logs
   - Auto-calculates test count and average score

2. **trg_calculate_topic_accuracy**
   - Fires: AFTER INSERT ON ai_test_attempt_details
   - Updates: ai_topic_performance
   - Auto-calculates topic-wise accuracy

---

## 📊 Default Seeded Data

### Courses (1)
```
Neet Dropper Batch
```

### Batches (3)
```
Target Neet 2028 - Class 11th Going
Target Neet 2027 - Class 12th Going
Target Neet 2027 - Dropper Batch
```

### Classes (3)
```
Class 11
Class 12
Dropper
```

### Subjects (15: 3 classes × 5 subjects)
```
Physics, Chemistry, Biology, Botany, Zoology
(For each class)
```

### Colleges (12)
```
AIIMS Delhi
Maulana Azad Medical College
Lady Hardinge Medical College
Grant Medical College
Seth GS Medical College
Bangalore Medical College
Mysore Medical College
Guntur Medical College
King George's Medical University
Madras Medical College
SMS Medical College
Foreign University
```

### Packages (2)
```
Starter: Rs 999, 1 month
Rank Pro: Rs 4999, 6 months
```

---

## 🔐 Admin User Setup

### Default Admin (from 002_seed_admin_users.sql)
```
Username: admin
Password: admin@123
```

⚠️ **IMPORTANT:** Change these credentials in production!

### Generate Bcrypt Hash for Custom Passwords

**Using Node.js:**
```javascript
const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  console.log(hash);
}

hashPassword('your_password');
```

**Using Command Line:**
```bash
npm install -g bcryptjs
bcryptjs 'your_password' 10
```

**Output:** `$2a$10$...` (64 characters)

### Add New Admin User

Edit `002_seed_admin_users.sql`:

```sql
INSERT INTO admin_users (username, password_hash)
VALUES (
  'newadmin',
  '$2a$10$...(your bcrypt hash)...'
)
ON CONFLICT (username) DO NOTHING;
```

Then run:
```bash
psql -U postgres -d indraprastha < migrations/002_seed_admin_users.sql
```

---

## 🗄️ Foreign Key Constraints

All tables with foreign keys use:
- `ON DELETE CASCADE` - Delete related records
- `ON DELETE SET NULL` - Set to NULL if referenced record deleted

This ensures data integrity across the system.

---

## 📈 Performance Optimization

### Indexes on Commonly Filtered Columns
```sql
- batch_id (users, books, tests, etc.)
- class_label, subject, topic (content tables)
- user_id, created_at (analytics tables)
- test_id, question_id (test tables)
```

### Expected Query Performance
- User lookup by phone: <1ms
- Books by batch: <5ms
- Test with 100+ questions: <50ms
- User analytics: <10ms

---

## ✅ Verification Queries

After running migrations, verify setup:

```sql
-- Check all tables created
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Should return 33 tables

-- Check indexes
SELECT indexname FROM pg_indexes 
WHERE schemaname = 'public' 
ORDER BY indexname;

-- Should return 30+ indexes

-- Check admin users
SELECT id, username FROM admin_users;

-- Should show at least 1 admin user

-- Check default data
SELECT COUNT(*) FROM courses;        -- Should be 1
SELECT COUNT(*) FROM batches;        -- Should be 3
SELECT COUNT(*) FROM classes;        -- Should be 3
SELECT COUNT(*) FROM subjects;       -- Should be 15
SELECT COUNT(*) FROM colleges;       -- Should be 12
SELECT COUNT(*) FROM packages;       -- Should be 2
```

---

## 🔄 Migration Order

Always run migrations in this order:

1. **001_create_all_tables.sql** (Main schema)
   - Creates all tables, indexes, functions, triggers
   - Seeds default data

2. **002_seed_admin_users.sql** (Admin users)
   - Adds admin users
   - Optional, can be customized

3. **003_add_explanation_images.sql** (Explanation images)
   - Adds explanation image support with multiple uploads
   - Adds tracking tables
   - Creates unified view and helper functions
   - Optional but recommended

---

## 📝 Important Notes

### Create vs Drop
- Uses `CREATE TABLE IF NOT EXISTS` - safe to re-run
- Uses `DROP TRIGGER IF EXISTS` - safe to re-run
- No data loss on re-execution

### Bcrypt Hashing
- All passwords use bcrypt with 10 rounds
- Never store plain text passwords
- Always generate hashes outside SQL

### JSON Fields
- `packages.features_json` - JSONB format
- `ai_user_analytics.topic_accuracy` - JSONB format
- Query example: `SELECT features_json->'features' FROM packages;`

### Array Fields
- `subjects.weak_topics_list` - TEXT[] array
- `subjects.strong_topics_list` - TEXT[] array
- Query example: `SELECT weak_topics_list FROM ai_user_analytics WHERE user_id = 1;`

---

## 🚨 Troubleshooting

### Error: "relation already exists"
**Solution:** Tables already created. This is safe - migrations use `IF NOT EXISTS`.

### Error: "foreign key constraint fails"
**Solution:** Insert parent records first (courses before batches, users before test_attempts).

### Error: "duplicate key value"
**Solution:** Use `ON CONFLICT DO NOTHING` to skip duplicates.

### Error: "permission denied"
**Solution:** Ensure user has CREATE TABLE and TRIGGER permissions.

---

## 🔗 Related Files

- [src/db.js](../src/db.js) - Node.js schema initialization
- [BACKEND_STRUCTURE.md](../../BACKEND_STRUCTURE.md) - Complete documentation
- [ADMIN_SYSTEM.md](../../ADMIN_SYSTEM.md) - Admin setup guide
- [DATABASE_QUICK_REFERENCE.md](../../DATABASE_QUICK_REFERENCE.md) - Query reference

---

## 📋 Summary

| Item | Count | Status |
|------|-------|--------|
| **Tables** | 36 | ✅ All created (33 base + 3 explanation) |
| **Indexes** | 35+ | ✅ Performance optimized |
| **Triggers** | 2 | ✅ Auto-updates enabled |
| **Functions** | 4 | ✅ Analytics + explanation management |
| **Views** | 1 | ✅ question_with_explanations |
| **Default Data** | Multiple | ✅ Pre-seeded |
| **Admin Users** | 1 | ✅ Default created |

---

## 📚 Execution Checklist

- [ ] PostgreSQL database created and running
- [ ] Run `001_create_all_tables.sql`
- [ ] Verify all 33 tables created
- [ ] Verify 30+ indexes created
- [ ] Run `002_seed_admin_users.sql` (optional)
- [ ] Verify admin users created
- [ ] Update admin credentials for production
- [ ] Update `DATABASE_URL` in `.env`
- [ ] Start Node.js backend
- [ ] Test API endpoints
- [ ] Deploy to production

---

**Last Updated:** June 16, 2024
**Status:** Production Ready ✅
**Database:** PostgreSQL 12+


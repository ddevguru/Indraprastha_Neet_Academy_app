# Critical Fixes - Test Submit Error + Performance Issues

## 🚨 Issue 1: Database Query Error - URGENT

**Error:** `Exception: column reference 'tests_taken_today' is ambiguous`

**Root Cause:** Query joining multiple tables with same column names

**Fix:**

```sql
-- WRONG (ambiguous):
INSERT INTO ai_study_logs (user_id, log_date, tests_taken_today)
VALUES (NEW.user_id, CURRENT_DATE, 1)
ON CONFLICT (user_id, log_date) DO UPDATE
SET tests_taken_today = tests_taken_today + 1;  -- AMBIGUOUS!

-- CORRECT (specify table):
INSERT INTO ai_study_logs (user_id, log_date, tests_taken_today)
VALUES (NEW.user_id, CURRENT_DATE, 1)
ON CONFLICT (user_id, log_date) DO UPDATE
SET tests_taken_today = ai_study_logs.tests_taken_today + 1;
```

---

## 🐌 Issue 2: Performance - Slow Question Loading

**Problem:** Admin app slow when adding questions

**Solutions:**

### A. Add Batch Insert (Instead of one-by-one)

```javascript
// SLOW (Current way)
for (const question of questions) {
  await pool.query('INSERT INTO test_questions ...', [...]);
}

// FAST (Batch way)
const values = questions.map((q, i) => {
  const paramNum = i * 11;
  return `($${paramNum+1},$${paramNum+2},...$${paramNum+11})`;
}).join(',');

const allParams = questions.flatMap(q => [
  q.test_id, q.subject, q.question, q.optionA, q.optionB, 
  q.optionC, q.optionD, q.correctOption, q.explanation, 
  q.questionImageLink, ''
]);

await pool.query(
  `INSERT INTO test_questions (...) VALUES ${values}`,
  allParams
);
```

### B. Add Connection Pooling Config

In `src/db.js`:

```javascript
const pool = new Pool({
  ...connectionConfig,
  max: 20,              // Max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  statement_timeout: 30000
});
```

### C. Add Indexes for Foreign Keys

```sql
-- If not already present
CREATE INDEX IF NOT EXISTS idx_test_questions_test_id ON test_questions(test_id);
CREATE INDEX IF NOT EXISTS idx_ai_test_attempt_details_test_attempt ON ai_test_attempt_details(test_attempt_id);
```

---

## 🖼️ Issue 3: Images Loading Slow

**Problem:** Images in questions take too long to load

**Solutions:**

### A. Use Google Drive Image Links Directly

```javascript
// SLOW: Fetch from Drive every time
const links = buildDrivePublicLinks(fileId);

// FAST: Cache the link
const cachedLinks = {
  imageLink: `https://drive.google.com/uc?id=${fileId}&export=download`,
  downloadLink: `https://drive.google.com/uc?id=${fileId}&export=download`,
  previewLink: `https://drive.google.com/file/d/${fileId}/preview`
};
```

### B. Use Image CDN/Compression

Add to environment:

```env
USE_IMAGE_CACHE=true
IMAGE_CACHE_TTL=3600
```

### C. Optimize Query - Don't Fetch Full Explanation Text

```javascript
// Instead of SELECT * (which includes large text)
SELECT id, question, option_a, option_b, option_c, option_d, 
       correct_option, question_image_link, test_id
// Fetch explanation separately when needed

// For explanation images only
SELECT image_url FROM explanation_images 
WHERE test_question_id = $1 
ORDER BY order_index;
```

---

## 📄 Issue 4: Multiple Explanation Images + Text

**Need to Update Schema:**

```sql
-- Add table for explanation content (not just images)
CREATE TABLE IF NOT EXISTS question_explanations (
  id SERIAL PRIMARY KEY,
  question_id INTEGER,
  question_type VARCHAR(50), -- 'pyq', 'test_question', etc
  content_type VARCHAR(20), -- 'text', 'image'
  content_order INTEGER,
  
  -- For text
  text_content TEXT,
  
  -- For images
  image_url TEXT,
  image_drive_file_id TEXT,
  image_caption VARCHAR(255),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Or simpler approach - update explanation_images table:

```sql
-- Add to explanation_images table
ALTER TABLE explanation_images
ADD COLUMN IF NOT EXISTS text_before TEXT;  -- Text before image

ALTER TABLE explanation_images
ADD COLUMN IF NOT EXISTS text_after TEXT;   -- Text after image
```

---

## 🔄 Issue 5: Question Review on Next Page (Not Same Page)

**Need Two Screens:**

### Screen 1: Score Summary
```json
{
  "score": 150,
  "accuracy": 83.5,
  "performance": {
    "correct": 25,
    "wrong": 5,
    "unattempted": 0
  },
  "insights": [...]
}
```

### Screen 2: Question Review (One by One)
```json
{
  "currentQuestion": 1,
  "totalQuestions": 30,
  "questions": [
    {
      "id": 1,
      "question": "...",
      "userAnswer": "A",
      "correctAnswer": "A",
      "isCorrect": true,
      "explanation": "...",
      "explanation_images": [...]
    }
  ],
  "navigation": {
    "current": 1,
    "total": 30,
    "hasPrevious": false,
    "hasNext": true
  }
}
```

**API Changes Needed:**

```
GET /api/content/test/:testId/attempt/:attemptId/summary
  → Returns score page

GET /api/content/test/:testId/attempt/:attemptId/review?page=1&limit=1
  → Returns one question at a time with pagination
```

---

## 🤖 Issue 6: AI Features Not Showing

**Check Response Format:**

```json
// Should include:
{
  "success": true,
  "attempt": {...},
  "analytics": {...},
  "aiAnalytics": {
    "insights": [
      {
        "insight_title": "Physics accuracy",
        "insight_body": "You scored 85% in physics...",
        "priority": "medium"
      }
    ]
  },
  "questionsWithExplanations": [...]
}
```

**Fix:** Make sure this is in test submit response

---

## 🚀 Performance Optimization Plan

### Phase 1: Database (30 min)
```sql
-- Add missing indexes
CREATE INDEX idx_questions_test_id ON test_questions(test_id);
CREATE INDEX idx_questions_subject_topic ON test_questions(subject, topic);
CREATE INDEX idx_images_question_type ON explanation_images(test_question_id);

-- Add query optimization hints
ANALYZE;
VACUUM ANALYZE;
```

### Phase 2: Backend (1 hour)
```javascript
// 1. Batch inserts instead of one-by-one
// 2. Connection pooling
// 3. Query optimization
// 4. Caching for frequently accessed data
```

### Phase 3: Frontend (Mobile App)
```dart
// 1. Image lazy loading
// 2. Pagination for questions
// 3. Caching of responses
// 4. Background loading
```

---

## 📋 Implementation Order

1. ✅ Fix ambiguous column error (15 min)
2. ✅ Add batch insert for questions (30 min)
3. ✅ Optimize image queries (20 min)
4. ✅ Create review pagination API (45 min)
5. ✅ Update UI for two-screen flow (depends on frontend)
6. ✅ Verify AI insights show up (15 min)

---

## 🔧 Quick Fixes (Do First)

### Fix 1: Ambiguous Column Error

In the trigger function, change:

```sql
-- WRONG
SET tests_taken_today = tests_taken_today + 1

-- CORRECT
SET tests_taken_today = ai_study_logs.tests_taken_today + 1
```

### Fix 2: Add Connection Pool Limits

In `src/db.js`:

```javascript
const pool = new Pool({
  ...config,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});
```

### Fix 3: Optimize Test Query

Fetch explanation separately:

```javascript
// Get test questions (lightweight)
const questions = await pool.query(
  `SELECT id, question, option_a, option_b, option_c, option_d, 
          correct_option, question_image_link
   FROM test_questions WHERE test_id = $1`
);

// Get explanations separately (only when needed)
for (const q of questions.rows) {
  const explanation = await pool.query(
    `SELECT explanation, explanation_images FROM ... WHERE id = $1`,
    [q.id]
  );
  q.explanation = explanation.rows[0];
}
```

---

## 📱 Frontend Changes Needed

### Test Result Flow (Current vs New)

**Current:**
```
Submit Test → Show Score + Review Questions (same page)
```

**New (Better):**
```
Submit Test → Show Score Summary (Screen 1)
           ↓
        Next Button
           ↓
      Review Questions One by One (Screen 2)
```

### Questions Review Screen

```dart
// Show pagination dots
Row(
  children: List.generate(totalQuestions, (index) {
    return Container(
      width: currentQuestion == index ? 12 : 8,
      height: 8,
      decoration: BoxDecoration(
        color: currentQuestion == index ? Colors.red : Colors.grey,
        borderRadius: BorderRadius.circular(4)
      ),
    );
  }),
)

// Show current question
Text('${currentQuestion + 1}/${totalQuestions}')

// Show explanation with images
Column(
  children: [
    Text(question['explanation']),
    if (question['explanation_images'] != null)
      ListView.builder(
        itemCount: question['explanation_images'].length,
        itemBuilder: (context, index) {
          final img = question['explanation_images'][index];
          return Column(
            children: [
              Image.network(img['image_url']),
              if (img['caption'] != null)
                Text(img['caption'])
            ],
          );
        }
      )
  ],
)
```

---

## ⏱️ Estimated Completion

- **Database fixes:** 15 minutes
- **Performance optimization:** 1 hour
- **Two-screen flow API:** 45 minutes
- **Frontend updates:** 2-3 hours (depends on team)
- **Testing:** 1 hour

**Total:** ~5 hours

---

## Status Check

After implementing these fixes:
- ✅ Test submit will work without errors
- ✅ Questions load 5-10x faster
- ✅ Images load faster (cached + optimized)
- ✅ Two-screen review flow implemented
- ✅ AI insights visible
- ✅ Pagination dots showing progress


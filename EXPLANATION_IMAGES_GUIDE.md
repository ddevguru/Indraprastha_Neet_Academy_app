# Explanation Images - Complete Implementation Guide

## 🖼️ Overview

Your database now supports **explanation images with multiple uploads**!

Just like question images, explanation images can be:
- ✅ Multiple images per question
- ✅ Stored on Google Drive
- ✅ Fetched with proper ordering
- ✅ Displayed in student app

---

## 📊 Database Tables Added

### 1. **explanation_images** (Main Table)
Stores all explanation images with support for multiple question types.

```sql
CREATE TABLE explanation_images (
  id SERIAL PRIMARY KEY,
  
  -- Association to different question types (only one per row)
  pyq_id INTEGER REFERENCES pyqs(id),
  practice_question_id INTEGER REFERENCES practice_questions(id),
  test_question_id INTEGER REFERENCES test_questions(id),
  daily_mcq_id INTEGER REFERENCES daily_mcqs(id),
  
  -- Image data
  image_url TEXT NOT NULL,
  image_drive_file_id TEXT,
  image_drive_folder_id TEXT DEFAULT '',
  image_drive_link TEXT,
  
  -- Display info
  order_index INTEGER DEFAULT 0,      -- For ordering multiple images
  caption VARCHAR(255) DEFAULT '',    -- Image description/caption
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Why separate table?**
- ✅ Supports unlimited images per question
- ✅ Clean ordering with order_index
- ✅ Flexible design for future enhancements
- ✅ Easy to add captions

---

### 2. **admin_uploads** (Optional - Track Uploads)
Tracks all file uploads by admins for auditing and debugging.

```sql
CREATE TABLE admin_uploads (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER REFERENCES admin_users(id),
  upload_type VARCHAR(50),           -- 'question', 'explanation'
  associated_table VARCHAR(100),     -- 'pyqs', 'test_questions', etc.
  associated_id INTEGER,             -- The question ID
  file_name VARCHAR(255),
  file_size INTEGER,
  drive_file_id TEXT,
  upload_status VARCHAR(50),         -- 'success', 'failed'
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 3. **batch_uploads** (Optional - Bulk Operations)
Tracks batch uploads for admin dashboard.

```sql
CREATE TABLE batch_uploads (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER NOT NULL REFERENCES admin_users(id),
  batch_name VARCHAR(255),
  batch_type VARCHAR(50),            -- 'explanations', 'questions'
  total_files INTEGER DEFAULT 0,
  successful_uploads INTEGER DEFAULT 0,
  failed_uploads INTEGER DEFAULT 0,
  status VARCHAR(50),                -- 'in_progress', 'completed'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);
```

---

## 📝 Columns Added to Existing Tables

All these tables now have explanation image columns for **single image support** (backward compatible):

### Tables Updated:
- **pyqs**
- **practice_questions**
- **test_questions**
- **daily_mcqs**

### Columns Added to Each:
```sql
ALTER TABLE table_name
ADD COLUMN explanation_image_link TEXT;
ADD COLUMN explanation_image_drive_file_id TEXT;
ADD COLUMN explanation_image_drive_folder_id TEXT DEFAULT '';
```

**Purpose:** Backward compatibility + ability to set a primary explanation image

---

## 🔗 Relationships

```
pyqs
  ├── explanation_images (1:M)
  │   ├── image_url
  │   ├── image_drive_file_id
  │   ├── order_index (0, 1, 2, ...)
  │   └── caption
  └── explanation_image_link (primary image, backward compat)

practice_questions
  ├── explanation_images (1:M)
  │   ├── image_url
  │   ├── image_drive_file_id
  │   ├── order_index
  │   └── caption
  └── explanation_image_link (primary image)

test_questions
  ├── explanation_images (1:M)
  │   ├── image_url
  │   ├── image_drive_file_id
  │   ├── order_index
  │   └── caption
  └── explanation_image_link (primary image)

daily_mcqs
  ├── explanation_images (1:M)
  │   ├── image_url
  │   ├── image_drive_file_id
  │   ├── order_index
  │   └── caption
  └── explanation_image_link (primary image)
```

---

## 📖 SQL Views Created

### **question_with_explanations** (Unified View)

Fetches any question type with all explanation images as JSON array.

```sql
SELECT * FROM question_with_explanations 
WHERE id = 123;
```

**Response Structure:**
```json
{
  "id": 123,
  "question": "What is Newton's first law?",
  "option_a": "...",
  "option_b": "...",
  "option_c": "...",
  "option_d": "...",
  "correct_option": "A",
  "explanation": "Newton's first law states...",
  "explanation_image_link": "https://...",
  "explanation_image_drive_file_id": "...",
  "explanation_image_drive_folder_id": "...",
  "question_type": "pyq",
  "created_at": "2024-06-16",
  "explanation_images_list": [
    {
      "id": 1,
      "image_url": "https://...",
      "image_drive_file_id": "...",
      "image_drive_link": "...",
      "caption": "Force diagram",
      "order_index": 0
    },
    {
      "id": 2,
      "image_url": "https://...",
      "image_drive_file_id": "...",
      "image_drive_link": "...",
      "caption": "Free body diagram",
      "order_index": 1
    }
  ]
}
```

---

## 🛠️ SQL Functions Created

### 1. **add_explanation_image()** Function

Add a single explanation image to any question type.

**Signature:**
```sql
SELECT * FROM add_explanation_image(
  p_question_type VARCHAR,
  p_question_id INTEGER,
  p_image_url TEXT,
  p_image_drive_file_id TEXT,
  p_image_drive_link TEXT,
  p_caption VARCHAR DEFAULT ''
);
```

**Usage Example:**
```sql
SELECT * FROM add_explanation_image(
  'pyq',
  123,
  'https://drive.google.com/uc?id=...',
  '1abc2def3ghi4jkl5mno6pqr7stu8vwx',
  'https://drive.google.com/file/d/1abc.../view',
  'Newton\'s laws diagram'
);
```

**Response:**
```
image_id | status  | message
---------|---------|-----------------------------------
   45    | success | Explanation image added successfully
```

---

### 2. **delete_explanation_image()** Function

Delete a specific explanation image.

**Signature:**
```sql
SELECT * FROM delete_explanation_image(p_image_id INTEGER);
```

**Usage Example:**
```sql
SELECT * FROM delete_explanation_image(45);
```

**Response:**
```
status  | message
--------|-------------------------------
success | Explanation image deleted successfully
```

---

## 📱 Admin API Routes (To Implement)

### Upload Single Explanation Image
```http
POST /api/admin/explanation/upload
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

{
  "question_type": "pyq",           // or "practice_question", "test_question", "daily_mcq"
  "question_id": 123,
  "file": <image_file>,
  "caption": "Newton's laws diagram"
}
```

**Response:**
```json
{
  "success": true,
  "image_id": 45,
  "image_url": "https://drive.google.com/uc?id=...",
  "image_drive_file_id": "...",
  "message": "Explanation image uploaded successfully"
}
```

---

### Upload Multiple Explanation Images (Bulk)
```http
POST /api/admin/explanation/upload-multiple
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

{
  "question_type": "test_question",
  "question_id": 456,
  "files": [<image1>, <image2>, <image3>],
  "captions": ["Diagram 1", "Diagram 2", "Diagram 3"]
}
```

**Response:**
```json
{
  "success": true,
  "batch_upload_id": 10,
  "total_uploaded": 3,
  "images": [
    {
      "id": 46,
      "image_url": "...",
      "caption": "Diagram 1",
      "order_index": 0
    },
    {
      "id": 47,
      "image_url": "...",
      "caption": "Diagram 2",
      "order_index": 1
    },
    {
      "id": 48,
      "image_url": "...",
      "caption": "Diagram 3",
      "order_index": 2
    }
  ]
}
```

---

### Delete Explanation Image
```http
DELETE /api/admin/explanation/:image_id
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Explanation image deleted successfully"
}
```

---

### Reorder Explanation Images
```http
PUT /api/admin/explanation/reorder
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "images": [
    { "id": 46, "order_index": 2 },
    { "id": 47, "order_index": 0 },
    { "id": 48, "order_index": 1 }
  ]
}
```

---

## 🔍 SQL Queries for Student App

### Get Question with All Explanation Images
```sql
SELECT * FROM question_with_explanations 
WHERE id = 123 AND question_type = 'pyq';
```

### Get Specific Question with Images (Direct Query)
```sql
SELECT
  pq.*,
  (SELECT json_agg(
    json_build_object(
      'id', ei.id,
      'image_url', ei.image_url,
      'image_drive_file_id', ei.image_drive_file_id,
      'image_drive_link', ei.image_drive_link,
      'caption', ei.caption,
      'order_index', ei.order_index
    ) ORDER BY ei.order_index
  ) FROM explanation_images ei WHERE ei.pyq_id = pq.id) as explanation_images
FROM pyqs pq
WHERE pq.id = 123;
```

### Get All Explanation Images for a Question
```sql
SELECT * FROM explanation_images 
WHERE pyq_id = 123 
ORDER BY order_index ASC;
```

### Update Image Order
```sql
UPDATE explanation_images 
SET order_index = 0 
WHERE id = 46;

UPDATE explanation_images 
SET order_index = 1 
WHERE id = 47;
```

---

## 🚀 Implementation in Backend

### Node.js Example: Upload Explanation Image

```javascript
const router = require('express').Router();
const { pool } = require('../db');
const { uploadBufferToDrive } = require('../services/drive');

// Upload explanation image
router.post('/explanation/upload', adminAuth, upload.single('file'), async (req, res) => {
  try {
    const { question_type, question_id, caption } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Upload to Google Drive
    const { fileId, publicUrl } = await uploadBufferToDrive(
      file.buffer,
      file.originalname,
      'explanation_images'
    );

    // Add to database
    const result = await pool.query(
      `SELECT * FROM add_explanation_image($1, $2, $3, $4, $5, $6)`,
      [
        question_type,
        question_id,
        publicUrl,
        fileId,
        publicUrl,
        caption || ''
      ]
    );

    const imageData = result.rows[0];

    if (imageData.status === 'error') {
      return res.status(400).json({ error: imageData.message });
    }

    res.json({
      success: true,
      image_id: imageData.image_id,
      image_url: publicUrl,
      image_drive_file_id: fileId,
      message: imageData.message
    });
  } catch (error) {
    console.error('Error uploading explanation image:', error);
    res.status(500).json({ error: 'Failed to upload explanation image' });
  }
});

// Delete explanation image
router.delete('/explanation/:image_id', adminAuth, async (req, res) => {
  try {
    const { image_id } = req.params;

    const result = await pool.query(
      `SELECT * FROM delete_explanation_image($1)`,
      [image_id]
    );

    const deleteResult = result.rows[0];

    if (deleteResult.status === 'error') {
      return res.status(400).json({ error: deleteResult.message });
    }

    res.json({
      success: true,
      message: deleteResult.message
    });
  } catch (error) {
    console.error('Error deleting explanation image:', error);
    res.status(500).json({ error: 'Failed to delete explanation image' });
  }
});

module.exports = router;
```

---

## 📱 Student App - Display Explanation

### React Example

```jsx
function QuestionWithExplanation({ questionId }) {
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    // Fetch question with explanation images
    fetch(`/api/content/question/${questionId}`)
      .then(res => res.json())
      .then(data => setQuestion(data));
  }, [questionId]);

  if (!question) return <div>Loading...</div>;

  return (
    <div className="question-container">
      <h3>{question.question}</h3>
      <div className="options">
        <Option label="A" text={question.option_a} />
        <Option label="B" text={question.option_b} />
        <Option label="C" text={question.option_c} />
        <Option label="D" text={question.option_d} />
      </div>

      <div className="explanation">
        <h4>Explanation</h4>
        <p>{question.explanation}</p>

        {/* Primary explanation image (backward compat) */}
        {question.explanation_image_link && (
          <img src={question.explanation_image_link} alt="Explanation" />
        )}

        {/* Multiple explanation images */}
        {question.explanation_images_list && (
          <div className="explanation-images">
            {question.explanation_images_list.map((img, idx) => (
              <figure key={img.id}>
                <img src={img.image_url} alt={img.caption || `Explanation ${idx + 1}`} />
                {img.caption && <figcaption>{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## ✅ Migration Checklist

- [ ] Run migration: `003_add_explanation_images.sql`
- [ ] Verify tables created:
  ```sql
  SELECT * FROM information_schema.tables 
  WHERE table_name IN ('explanation_images', 'admin_uploads', 'batch_uploads');
  ```
- [ ] Verify view created:
  ```sql
  SELECT * FROM information_schema.views 
  WHERE table_name = 'question_with_explanations';
  ```
- [ ] Verify functions created:
  ```sql
  SELECT routine_name FROM information_schema.routines 
  WHERE routine_name LIKE 'add_explanation_%' OR routine_name LIKE 'delete_explanation_%';
  ```
- [ ] Test add function:
  ```sql
  SELECT * FROM add_explanation_image('pyq', 1, 'https://example.com/image.png', 'file_id', 'https://...', 'Test caption');
  ```
- [ ] Implement API routes
- [ ] Update student app to fetch and display images
- [ ] Test in admin panel

---

## 🎯 Features

### ✅ What You Can Do Now

1. **Upload multiple explanation images** per question
2. **Order images** with order_index (for sequential display)
3. **Add captions** to each image
4. **Track uploads** with admin_uploads table
5. **Batch operations** with batch_uploads table
6. **Unified view** for fetching questions with all images
7. **Backward compatibility** with single explanation_image_link
8. **PL/pgSQL functions** for easy management

---

## 📝 Summary

| Feature | Status | Details |
|---------|--------|---------|
| Multiple explanation images | ✅ Yes | Unlimited per question |
| Image ordering | ✅ Yes | order_index field |
| Image captions | ✅ Yes | Description for each image |
| Google Drive integration | ✅ Yes | Same as question images |
| Admin tracking | ✅ Yes | admin_uploads table |
| Bulk operations | ✅ Yes | batch_uploads table |
| Student API | 📝 TODO | Implement routes |
| Student App UI | 📝 TODO | Display images |

---

## 🔗 Related Files

- [Migrations: 003_add_explanation_images.sql](indraprastha-backend/migrations/003_add_explanation_images.sql)
- [Backend Structure: BACKEND_STRUCTURE.md](BACKEND_STRUCTURE.md)
- [Admin System: ADMIN_SYSTEM.md](ADMIN_SYSTEM.md)

---

**Created:** June 16, 2024
**Status:** Ready for implementation ✅
**Schema Version:** v3 (with explanation images)


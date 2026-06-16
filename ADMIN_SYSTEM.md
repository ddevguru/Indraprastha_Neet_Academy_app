# Admin & Authentication System - Complete Guide

## 📋 Admin Table Status

### ✅ **YES - Admin Table EXISTS and is FULLY IMPLEMENTED**

```sql
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(80) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Location in Code:** [db.js:361-367](indraprastha-backend/src/db.js#L361-L367)

---

## 🔐 Admin Authentication System

### 1. **Admin User Creation & Initialization**

When the backend starts, it automatically:
1. Checks if admin user exists
2. If not, creates default admin with credentials from environment variables

**Code:** [db.js:519-527](indraprastha-backend/src/db.js#L519-L527)

```javascript
const adminUser = process.env.ADMIN_USERNAME || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD || 'admin@123';
const adminPasswordHash = await bcrypt.hash(adminPassword, 10);
await pool.query(
  `INSERT INTO admin_users (username, password_hash)
   VALUES ($1, $2)
   ON CONFLICT (username) DO NOTHING`,
  [adminUser, adminPasswordHash]
);
```

### 2. **Environment Variables Required**

```env
ADMIN_USERNAME=admin          # Default: 'admin'
ADMIN_PASSWORD=admin@123      # Default: 'admin@123'
JWT_SECRET=your_jwt_secret    # Used for token signing
NODE_ENV=production           # For SSL settings
DATABASE_URL=...              # PostgreSQL connection
```

---

## 🛡️ Admin Authentication Flow

### Login Endpoint
**Route:** `POST /api/admin/login`

**Request:**
```json
{
  "username": "admin",
  "password": "admin@123"
}
```

**Response (Success):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": 1,
    "username": "admin"
  }
}
```

**Implementation:** [admin.js](indraprastha-backend/src/routes/admin.js)

```javascript
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  const result = await pool.query(
    'SELECT * FROM admin_users WHERE username = $1',
    [username]
  );
  
  if (result.rows.length === 0) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const admin = result.rows[0];
  const passwordMatch = await bcrypt.compare(password, admin.password_hash);
  
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Generate JWT token
  const token = jwt.sign(
    { id: admin.id, username: admin.username, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  res.json({ token, admin: { id: admin.id, username: admin.username } });
});
```

---

## 🔓 Admin Authorization Middleware

All admin routes are protected with `adminAuth` middleware that:
1. Checks for `Authorization: Bearer <token>` header
2. Verifies JWT token signature and expiration
3. Verifies `role === 'admin'` claim
4. Rejects with 401/403 if invalid

**Implementation:** [admin.js:45-62](indraprastha-backend/src/routes/admin.js#L45-L62)

```javascript
function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Admin auth required' });
  }

  try {
    const token = authHeader.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== 'admin') {
      return res.status(403).json({ error: 'Admin role required' });
    }
    req.admin = payload;
    next();
  } catch (_) {
    return res.status(401).json({ error: 'Invalid admin token' });
  }
}
```

---

## 📝 Protected Admin Routes

All routes in `/api/admin` are protected with the `adminAuth` middleware:

### Content Management

#### 1. **Upload Book Chapter**
```
POST /api/admin/books/upload
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

{
  "bookId": 1,
  "chapterTitle": "Introduction to Physics",
  "material_type": "pdf",
  "file": <PDF file>,
  "note_summary": "Chapter summary text",
  "highlight": "Key points"
}
```

#### 2. **Upload Previous Year Questions**
```
POST /api/admin/pyqs/upload
Authorization: Bearer <admin_token>

{
  "chapterId": 1,
  "questions": [
    {
      "question": "What is Newton's first law?",
      "optionA": "A",
      "optionB": "B",
      "optionC": "C",
      "optionD": "D",
      "correctOption": "A",
      "explanation": "..."
    }
  ]
}
```

#### 3. **Create Practice Set**
```
POST /api/admin/practice-sets/create
Authorization: Bearer <admin_token>

{
  "batchId": 1,
  "title": "Mechanics Practice Set 1",
  "subject": "Physics",
  "topic": "Mechanics",
  "difficulty": "Moderate",
  "questions": [...]
}
```

#### 4. **Create Test**
```
POST /api/admin/test/create
Authorization: Bearer <admin_token>

{
  "batchId": 1,
  "title": "Full Length Test 1",
  "duration_minutes": 180,
  "marks": 720,
  "question_count": 180,
  "questions": [...]
}
```

#### 5. **Send Notifications**
```
POST /api/admin/notifications/send
Authorization: Bearer <admin_token>

{
  "title": "New Test Available",
  "body": "Check out Test 1",
  "targetUsers": "all" | ["user_id_1", "user_id_2"]
}
```

### Analytics & Reporting

#### 6. **View Analytics Dashboard**
```
GET /api/admin/analytics
Authorization: Bearer <admin_token>

Response:
{
  "totalUsers": 150,
  "totalTestsTaken": 1200,
  "averageAccuracy": 65.5,
  "topPerformers": [...],
  "subjectwise_accuracy": {
    "physics": 68.2,
    "chemistry": 65.1,
    "biology": 64.8
  }
}
```

---

## 🎫 JWT Token Structure

**Header:**
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload (Admin):**
```json
{
  "id": 1,
  "username": "admin",
  "role": "admin",
  "iat": 1718534400,
  "exp": 1718620800
}
```

**Signature:**
```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  JWT_SECRET
)
```

---

## 🗄️ Admin Data Persistence

### Admin User Table Structure

```sql
id          | SERIAL PRIMARY KEY
username    | VARCHAR(80) UNIQUE NOT NULL
password_hash | TEXT NOT NULL
created_at  | TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### Password Security
- Passwords are **hashed using bcrypt** (10 rounds)
- Raw passwords are **never stored**
- Hash is compared during login using `bcrypt.compare()`

### Example Admin Record
```sql
id: 1
username: "admin"
password_hash: "$2a$10$abc123def456ghi789jkl..."
created_at: 2024-06-16 10:30:00
```

---

## 🔄 Admin User Management

### Create Additional Admin (SQL)
```sql
INSERT INTO admin_users (username, password_hash)
VALUES ('admin2', '$2a$10$...');
```

### Update Admin Password
```sql
UPDATE admin_users 
SET password_hash = crypt('newpassword', gen_salt('bf', 10))
WHERE username = 'admin';
```

### List All Admins
```sql
SELECT id, username, created_at FROM admin_users;
```

### Delete Admin
```sql
DELETE FROM admin_users WHERE username = 'admin2';
```

---

## 📊 Admin Capabilities Matrix

| Feature | Available | Implementation |
|---------|-----------|-----------------|
| Login/Auth | ✅ Yes | JWT Bearer token |
| Create Books | ✅ Yes | Upload chapters with PDF |
| Create Questions | ✅ Yes | MCQ format (A, B, C, D) |
| Create Tests | ✅ Yes | Full-length tests with multiple questions |
| Create Practice Sets | ✅ Yes | Topic-based question collections |
| Upload Videos | ✅ Yes | Google Drive integration |
| Send Notifications | ✅ Yes | Firebase Cloud Messaging |
| View Analytics | ✅ Yes | User performance dashboard |
| Manage Batches | ✅ Yes | CRUD operations |
| View User Data | ✅ Yes | Read-only access (with filters) |
| Manage Packages | ✅ Yes | Subscription tiers |

---

## 🚀 Admin Panel Features (Backend Ready)

The backend supports these admin operations:

### 1. **Content Upload & Management**
- ✅ Upload books/chapters as PDF
- ✅ Extract text via OCR if needed
- ✅ Store on Google Drive for CDN
- ✅ Create practice sets and questions
- ✅ Create full-length tests
- ✅ Upload video lectures

### 2. **User Management**
- ✅ View user profiles
- ✅ Filter by batch, class, subject
- ✅ Track enrollment
- ✅ View profile completeness

### 3. **Analytics Dashboard**
- ✅ Total users, tests, accuracy metrics
- ✅ Subject-wise performance
- ✅ Topic-wise performance by user
- ✅ Weak areas identification
- ✅ NEET score predictions
- ✅ Study streak tracking

### 4. **Notifications**
- ✅ Send push notifications via Firebase
- ✅ Target all users or specific users
- ✅ Include title, body, deep links

### 5. **Configuration**
- ✅ Runtime config management (app_config table)
- ✅ Store OAuth tokens
- ✅ Manage feature flags

---

## 🔒 Security Checklist

- ✅ Admin routes protected with JWT
- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ Role-based access control (role === 'admin')
- ✅ Token expiration (24 hours default)
- ✅ CORS protection
- ✅ Rate limiting (300 requests per 15 min)
- ✅ Helmet security headers
- ✅ HTTPS enforcement in production

---

## 📋 Default Credentials

**Username:** `admin` (or env var: ADMIN_USERNAME)
**Password:** `admin@123` (or env var: ADMIN_PASSWORD)

⚠️ **IMPORTANT:** Change these credentials in production!

---

## 🔗 Integration with Other Systems

### Google Drive Integration
- Admin can upload files to Google Drive
- Automatic OCR for scanned PDFs
- Public shareable links generated
- File IDs stored in database for tracking

### Firebase Notifications
- Admin can send push notifications
- Stored FCM tokens for each user
- Delivery tracking via Firebase console

### Analytics Engine
- Real-time analytics on test submissions
- AI-powered weak area identification
- NEET score predictions
- Performance comparisons

---

## 📱 Admin Frontend (TODO)

The backend is ready for a frontend admin panel with:
- Login page
- Content upload interface
- User management dashboard
- Analytics/reporting dashboard
- Notification sender
- Settings page

---

## 🎯 Summary

| Item | Status | Details |
|------|--------|---------|
| **Admin Table** | ✅ Exists | 33 total DB tables |
| **Authentication** | ✅ Implemented | JWT + bcrypt |
| **Authorization** | ✅ Implemented | Role-based middleware |
| **Routes Protected** | ✅ All routes | Every /api/admin/* requires token |
| **User Management** | ✅ Available | Can add/remove/edit admins via SQL |
| **Content Management** | ✅ Available | Books, tests, questions, videos |
| **Analytics** | ✅ Available | Comprehensive performance tracking |
| **Notifications** | ✅ Available | Firebase FCM integration |
| **Security** | ✅ Strong | Bcrypt hashing, JWT, role checks |

---

## 🔗 Related Files

- [db.js](indraprastha-backend/src/db.js) - Schema & admin user init
- [admin.js](indraprastha-backend/src/routes/admin.js) - All admin routes
- [BACKEND_STRUCTURE.md](BACKEND_STRUCTURE.md) - Complete database schema
- [.env.example](indraprastha-backend/.env.example) - Environment variables


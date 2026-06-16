# Technical Architecture Document
## Indraprastha NEET Academy

**Version:** 1.0  
**Last Updated:** June 15, 2026  
**Owner:** Tech Lead  
**Status:** Active

---

## 1. System Overview

Indraprastha NEET Academy is a **scalable, cloud-hosted educational platform** with:
- **Frontend:** Flutter (iOS, Android, Web, Windows)
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Hosting:** Google Cloud Platform (Compute Engine)
- **Authentication:** Firebase Phone Auth + JWT
- **File Storage:** Google Drive (admin uploads)
- **Push Notifications:** Firebase Cloud Messaging (FCM)
- **SSL/HTTPS:** Let's Encrypt

---

## 2. System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                             │
├─────────────────┬─────────────────┬──────────────┬──────────┤
│  Flutter iOS    │ Flutter Android │ Flutter Web  │ Windows  │
│                 │                 │              │ Desktop  │
└────────┬────────┴────────┬────────┴──────────┬───┴──────────┘
         │                 │                   │
         │        HTTPS/TLS (Let's Encrypt)    │
         │                 │                   │
┌────────┴─────────────────┴───────────────────┴──────────────┐
│              API GATEWAY (nginx)                             │
│  • Reverse Proxy                                             │
│  • Rate Limiting                                             │
│  • SSL Termination                                           │
│  • Load Balancing (future)                                   │
└────────┬──────────────────────────────────────────────────┬──┘
         │                                                  │
         │ HTTP (internal)                                 │
         │                                                  │
┌────────▼────────────────────────────────────────────────┐  │
│           Node.js Backend (Express)                      │  │
│  • REST API Endpoints                                    │  │
│  • Business Logic                                        │  │
│  • Authentication (JWT)                                  │  │
│  • Authorization                                         │  │
│  • Data Validation                                       │  │
├────────────────────────────────────────────────────────┤  │
│  Routes:                                                 │  │
│  • /auth/* (signup, login, verify token)                │  │
│  • /courses/* (batch, class, subject)                    │  │
│  • /books/* (upload, retrieve)                           │  │
│  • /practice/* (questions, sets)                         │  │
│  • /tests/* (create, attempt)                            │  │
│  • /analytics/* (user progress, reports)                 │  │
│  • /admin/* (dashboard, content management)              │  │
│  • /users/* (profile, account)                           │  │
└────────┬────────────────────────────────────────────────┘  │
         │                                                    │
         └────────────────────────────────┬──────────────────┘
                                          │
                ┌─────────────────────────┼─────────────────────────┐
                │                         │                         │
┌───────────────▼────────────┐  ┌────────▼─────────────┐  ┌───────▼──────────────┐
│   PostgreSQL Database      │  │ Firebase Services   │  │ External Services    │
│                            │  │                     │  │                      │
│ • users                    │  │ • Phone Auth        │  │ • Google Drive API   │
│ • courses                  │  │ • Cloud Messaging   │  │ • Let's Encrypt      │
│ • batches                  │  │ • Crashlytics       │  │                      │
│ • classes                  │  │                     │  │                      │
│ • subjects                 │  │                     │  │                      │
│ • books                    │  │                     │  │                      │
│ • book_chapters            │  │                     │  │                      │
│ • practice_sets            │  │                     │  │                      │
│ • practice_questions       │  │                     │  │                      │
│ • tests                    │  │                     │  │                      │
│ • test_questions           │  │                     │  │                      │
│ • test_attempts            │  │                     │  │                      │
│ • videos                   │  │                     │  │                      │
│ • daily_mcqs               │  │                     │  │                      │
│ • fcm_tokens               │  │                     │  │                      │
│ • exam_analytics           │  │                     │  │                      │
│ • ai_insights (future)     │  │                     │  │                      │
│ • packages (future)        │  │                     │  │                      │
│                            │  │                     │  │                      │
│ Location: Google Cloud VM  │  │ Cloud Console       │  │ Cloud APIs           │
│ (India region)             │  │                     │  │                      │
└────────────────────────────┘  └─────────────────────┘  └──────────────────────┘
```

---

## 3. Technology Stack

### 3.1 Frontend

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | Flutter | ^3.10.1 | Cross-platform mobile & web |
| **State Mgmt** | Flutter BLoC | ^9.1.1 | Business logic & state |
| **Auth** | Firebase Auth | ^5.5.4 | Phone OTP + Signup |
| **Storage** | Flutter Secure Storage | ^9.2.4 | Token storage |
| **HTTP** | http package | ^1.5.0 | API requests |
| **Navigation** | GoRouter | ^17.2.1 | App navigation |
| **UI Framework** | Material 3 | Built-in | Design system |

### 3.2 Backend

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Runtime** | Node.js | 18+ | JavaScript runtime |
| **Framework** | Express | 4.x | Web framework |
| **Database** | PostgreSQL | 14+ | Relational database |
| **ORM/Query** | pg package | ^8.x | Database driver |
| **Auth** | Firebase Admin SDK | ^11.x | Token verification |
| **Env Vars** | dotenv | ^16.x | Configuration |
| **Process Mgmt** | PM2 | ^5.x | Daemon management |
| **SSL** | Let's Encrypt | Latest | HTTPS certificates |

### 3.3 Infrastructure

| Component | Service | Details |
|-----------|---------|---------|
| **Hosting** | Google Cloud Compute Engine | VM instance, India region |
| **OS** | Linux (Ubuntu 22.04) | Server operating system |
| **Web Server** | nginx | Reverse proxy, SSL termination |
| **Process Manager** | PM2 | Manage Node.js app lifecycle |
| **Database Host** | Google Cloud SQL (future) | Managed PostgreSQL |
| **Storage** | Google Drive | File uploads for content |
| **DNS** | Custom domain | indraprasthaneetacademy.com |
| **Monitoring** | Google Cloud Logging | Error tracking, logs |

### 3.4 APIs & Services

| Service | Purpose | Authentication |
|---------|---------|-----------------|
| Firebase Phone Auth | OTP generation & verification | API key |
| Firebase Admin SDK | ID token verification | Service account JSON |
| Firebase Cloud Messaging | Push notifications | Server key |
| Google Drive API | File upload/download | OAuth 2.0 refresh token |
| Google Cloud APIs | Infrastructure | Service account |

---

## 4. Backend API Specification

### 4.1 Authentication Endpoints

#### POST /auth/verify-firebase-token
```
Request:
{
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjMxZjEyN..."
}

Response:
{
  "isNewUser": true,
  "phone": "+919876543210"
}
```
- Verifies Firebase ID token
- Returns whether user is new
- No database query required

#### POST /auth/complete-signup
```
Request:
{
  "idToken": "...",
  "fullName": "Aarav Sharma",
  "password": "SecurePass@123",
  "batchId": 1,
  "courseCategory": "NEET 2025"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 42,
    "phone": "+919876543210",
    "fullName": "Aarav Sharma",
    "batchId": 1
  }
}
```
- Creates new user account
- Hashes password with bcrypt
- Returns JWT token

#### POST /auth/login
```
Request:
{
  "phone": "9876543210",
  "password": "SecurePass@123"
}

Response:
{
  "token": "...",
  "user": {...}
}
```
- Login with phone + password (no OTP)
- Enforces single-device sessions
- Returns JWT token

---

### 4.2 Course Management Endpoints

#### GET /courses/batches
Lists all available batches for enrollment

#### POST /courses/classes
Creates a new class (admin only)

#### GET /courses/:courseId/subjects
Lists subjects in a course

---

### 4.3 Books Endpoints

#### POST /books
Upload or create a book (admin)

#### GET /books?batchId=1&subject=Physics
Fetch books by batch and subject

#### GET /books/:bookId/chapters
List chapters in a book

---

### 4.4 Practice Questions Endpoints

#### GET /practice/sets
List practice sets

#### GET /practice/sets/:setId
Get questions in a practice set

#### POST /practice/questions/:questionId/answer
Submit answer and get feedback

---

### 4.5 Tests Endpoints

#### POST /tests
Create a new test (admin)

#### GET /tests/:testId/attempt
Start a test attempt

#### POST /tests/:testId/attempt/:attemptId/submit
Submit test answers

#### GET /tests/:testId/attempt/:attemptId/results
Get test results and analytics

---

### 4.6 Admin Endpoints

#### GET /admin/dashboard
Dashboard stats (users, content, etc.)

#### POST /admin/drive/oauth/start
Initiate Google Drive OAuth flow

#### POST /admin/drive/oauth/exchange
Exchange OAuth code for refresh token

#### GET /admin/drive/oauth/status
Check Drive connection status

---

## 5. Database Schema (PostgreSQL)

### 5.1 Core Tables

```sql
-- Users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(20) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  password_hash TEXT,
  batch_id INTEGER REFERENCES batches(id),
  course_category VARCHAR(100),
  preferred_language VARCHAR(20) DEFAULT 'English',
  active_session_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);

-- Courses
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP
);

-- Batches
CREATE TABLE batches (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id),
  name VARCHAR(255) NOT NULL,
  target_year INTEGER,
  class_label VARCHAR(100),
  created_at TIMESTAMP
);

-- Classes
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP
);

-- Subjects
CREATE TABLE subjects (
  id SERIAL PRIMARY KEY,
  class_id INTEGER REFERENCES classes(id),
  name VARCHAR(100),
  created_at TIMESTAMP
);

-- Books
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  batch_id INTEGER REFERENCES batches(id),
  class_label VARCHAR(100),
  title VARCHAR(255),
  subject VARCHAR(100),
  topic VARCHAR(255),
  category VARCHAR(100),
  created_at TIMESTAMP
);

-- Book Chapters
CREATE TABLE book_chapters (
  id SERIAL PRIMARY KEY,
  book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
  title VARCHAR(255),
  overview TEXT,
  note_summary TEXT,
  highlight TEXT,
  created_at TIMESTAMP
);

-- Practice Sets
CREATE TABLE practice_sets (
  id SERIAL PRIMARY KEY,
  batch_id INTEGER REFERENCES batches(id),
  title VARCHAR(255),
  class_label VARCHAR(100),
  subject VARCHAR(100),
  topic VARCHAR(255),
  created_at TIMESTAMP
);

-- Practice Questions
CREATE TABLE practice_questions (
  id SERIAL PRIMARY KEY,
  practice_set_id INTEGER REFERENCES practice_sets(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_option VARCHAR(1),
  explanation TEXT,
  question_image_link TEXT,
  explanation_image_link TEXT,
  created_at TIMESTAMP
);

-- Tests
CREATE TABLE tests (
  id SERIAL PRIMARY KEY,
  batch_id INTEGER REFERENCES batches(id),
  title VARCHAR(255),
  description TEXT,
  total_questions INTEGER,
  duration_minutes INTEGER,
  class_label VARCHAR(100),
  subject VARCHAR(100),
  topic VARCHAR(255),
  created_at TIMESTAMP
);

-- Test Questions
CREATE TABLE test_questions (
  id SERIAL PRIMARY KEY,
  test_id INTEGER REFERENCES tests(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_answer VARCHAR(1),
  explanation TEXT,
  question_image_link TEXT,
  explanation_image_link TEXT,
  created_at TIMESTAMP
);

-- Test Attempts
CREATE TABLE test_attempts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  test_id INTEGER REFERENCES tests(id) ON DELETE CASCADE,
  score INTEGER,
  correct_answers INTEGER,
  time_taken_seconds INTEGER,
  started_at TIMESTAMP,
  submitted_at TIMESTAMP
);

-- Daily MCQs
CREATE TABLE daily_mcqs (
  id SERIAL PRIMARY KEY,
  question_text TEXT NOT NULL,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_option VARCHAR(1),
  date_assigned DATE,
  created_at TIMESTAMP
);

-- FCM Tokens
CREATE TABLE fcm_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  device_token TEXT NOT NULL,
  created_at TIMESTAMP,
  UNIQUE(user_id, device_token)
);

-- Videos
CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  batch_id INTEGER REFERENCES batches(id),
  class_label VARCHAR(100),
  subject VARCHAR(100),
  topic VARCHAR(255),
  title VARCHAR(255),
  video_url TEXT,
  duration_seconds INTEGER,
  created_at TIMESTAMP
);

-- Admin Users
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP
);

-- App Config (for storing OAuth tokens, settings)
CREATE TABLE app_config (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) UNIQUE,
  value TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Exam Analytics
CREATE TABLE exam_analytics (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  test_id INTEGER REFERENCES tests(id),
  subject VARCHAR(100),
  accuracy_percent NUMERIC,
  speed_questions_per_minute NUMERIC,
  created_at TIMESTAMP
);
```

### 5.2 Key Relationships

```
Users
├── active_session_id (JWT token)
├── batch_id → Batches
├── fcm_tokens (1:Many)
├── test_attempts (1:Many)
└── exam_analytics (1:Many)

Batches
├── course_id → Courses
├── books (1:Many)
├── practice_sets (1:Many)
├── tests (1:Many)
└── videos (1:Many)

Books
└── chapters (1:Many)

Practice Sets
└── questions (1:Many)

Tests
└── questions (1:Many)
└── attempts (1:Many)
```

---

## 6. Authentication & Security Flow

### 6.1 Signup Flow

```
1. User enters phone number
   ↓
2. Firebase Phone Auth sends SMS OTP
   ↓
3. User enters OTP
   ↓
4. Frontend verifies with Firebase → gets ID token
   ↓
5. Frontend calls POST /auth/verify-firebase-token
   Backend verifies ID token with Firebase Admin SDK
   ↓
6. User enters full name, password, batch, category
   ↓
7. Frontend calls POST /auth/complete-signup {idToken, fullName, password, batchId, ...}
   Backend:
   - Verifies ID token again
   - Creates user in database
   - Hashes password with bcrypt
   - Creates JWT token
   - Stores active_session_id
   ↓
8. User logged in, token stored in Secure Storage
```

### 6.2 Login Flow

```
1. User enters phone + password
   ↓
2. Frontend calls POST /auth/login {phone, password}
   Backend:
   - Finds user by phone
   - Compares bcrypt hash
   - Invalidates previous session (active_session_id)
   - Creates new JWT token
   ↓
3. User logged in
```

### 6.3 Token Management

- **JWT Token:** Stored in Flutter Secure Storage
- **Token Expiry:** 24 hours
- **Refresh:** Automatic on app launch (if expired)
- **Session Enforcement:** Only 1 active session per user (last login wins)

---

## 7. Security Measures

### 7.1 Password Security
```javascript
// Password hashing
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds

// Password verification
const isValid = await bcrypt.compare(password, hashedPassword);
```

### 7.2 API Security
- **HTTPS/TLS:** All traffic encrypted
- **CORS:** Restricted to known origins
- **Rate Limiting:** 100 req/min per IP
- **Input Validation:** All inputs validated
- **SQL Injection Prevention:** Parameterized queries (pg package)
- **XSS Prevention:** Input sanitization

### 7.3 Database Security
- **Encryption at Rest:** PostgreSQL supports encryption
- **Encryption in Transit:** SSL connections to database
- **Least Privilege:** Database user with minimal permissions
- **Backup Security:** Encrypted backups on Google Cloud

### 7.4 Token Security
- **Signing Key:** Strong JWT secret (base64)
- **Algorithm:** HS256 (HMAC SHA-256)
- **Validation:** Every API request requires valid token
- **Claim Verification:** Validate user ID and expiry

---

## 8. Deployment Architecture

### 8.1 Server Setup
```
Google Cloud VM (Ubuntu 22.04)
├── Node.js (v18+)
├── PostgreSQL 14+
├── nginx (reverse proxy)
├── PM2 (process manager)
└── Let's Encrypt (HTTPS)
```

### 8.2 Service Configuration

**nginx** (port 80/443):
```nginx
server {
  listen 443 ssl http2;
  server_name api.indraprasthaneetacademy.com;
  
  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/key.pem;
  
  location / {
    proxy_pass http://localhost:3000;
  }
}
```

**PM2** (Node.js management):
```
pm2 start src/index.js --name indraprastha-backend
pm2 save
pm2 startup
```

### 8.3 Environment Variables (.env)
```
NODE_ENV=production
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=indraprastha_db
DB_USER=neetadmin
DB_PASSWORD=***
JWT_SECRET=***
FIREBASE_SERVICE_ACCOUNT_JSON={...}
GDRIVE_OAUTH_CLIENT_ID=***
GDRIVE_OAUTH_CLIENT_SECRET=***
ADMIN_USERNAME=indraprasthaadmin
ADMIN_PASSWORD=***
```

---

## 9. Monitoring & Logging

### 9.1 Log Levels
- **ERROR:** Database failures, authentication errors
- **WARN:** Suspicious activity, rate limit hits
- **INFO:** User logins, content uploads
- **DEBUG:** API request/response logs (development only)

### 9.2 Monitoring Tools
- **Google Cloud Logging:** Central log aggregation
- **Firebase Crashlytics:** App crash tracking
- **PM2 Monitoring:** Process health checks
- **Custom Dashboards:** Key metrics visualization

### 9.3 Alerting
- **Uptime:** Alert if server down > 5 minutes
- **Error Rate:** Alert if error rate > 5%
- **Database:** Alert if connection fails
- **Disk Space:** Alert if < 10% free space

---

## 10. Scalability Considerations

### 10.1 Current State
- Single Node.js process on single VM
- Single PostgreSQL instance
- Suitable for 500-1000 concurrent users

### 10.2 Future Scaling (Phase 4)
```
Load Balancer (GCP)
├── Node.js Instance 1
├── Node.js Instance 2
└── Node.js Instance 3

PostgreSQL (Cloud SQL, replicated)
├── Primary (read/write)
├── Replica 1 (read-only)
└── Replica 2 (read-only)

Redis Cache (future)
└── Session storage, query caching

CDN (CloudFlare or GCP CDN)
└── Static assets, video streaming
```

### 10.3 Database Optimization
- **Indexing:** Phone, user_id, test_id, batch_id
- **Partitioning:** test_attempts by date range (future)
- **Query Optimization:** Analysis using EXPLAIN
- **Connection Pooling:** pgBouncer (future)

---

## 11. Disaster Recovery

### 11.1 Backup Strategy
- **Daily Backups:** 7 daily snapshots retained
- **Weekly Backups:** 4 weekly snapshots retained
- **Monthly Backups:** 12 monthly snapshots retained
- **Recovery Time:** < 1 hour
- **Recovery Point:** < 24 hours

### 11.2 Failover Plan
- **Disk Failure:** Restore from snapshot
- **Data Corruption:** Restore from backup
- **Service Outage:** Failover to secondary region (future)
- **Configuration:** Infrastructure-as-Code (Terraform, future)

---

## 12. Development Workflow

### 12.1 Branching Strategy
```
main (production)
├── v1.0.0 (tagged releases)
└── develop (staging)
    ├── feature/auth
    ├── feature/books
    └── bugfix/login
```

### 12.2 CI/CD Pipeline (future)
```
Commit to GitHub
↓
Automated Tests (Jest)
↓
Build Docker Image
↓
Push to GCP Container Registry
↓
Deploy to staging (if develop branch)
↓
Manual testing
↓
Deploy to production (if main branch)
```

---

## 13. Technology Roadmap

| Phase | Timeline | Technology |
|-------|----------|-----------|
| **Phase 1** | Q1 2025 | Firebase Phone Auth, basic Node.js API |
| **Phase 2** | Q2 2025 | Books, videos, analytics |
| **Phase 3** | Q3 2025 | Redis caching, optimized queries |
| **Phase 4** | Q4 2025 | Load balancing, auto-scaling |
| **Phase 5** | 2026 | Kubernetes, AI/ML features |

---

## 14. Compliance & Standards

- **OWASP Top 10:** Addressed (injection, auth, sensitive data)
- **PCI DSS:** N/A (no payment processing yet)
- **GDPR:** N/A (India-only, no EU users)
- **India IT Rules 2021:** Full compliance (data localization)
- **HTTPS/TLS:** Let's Encrypt certificates

---

## 15. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | June 2026 | Tech Lead | Initial architecture document |

---

**Status:** APPROVED  
**Next Review:** September 2026

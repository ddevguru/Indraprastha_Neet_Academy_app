# Feature Tickets & Development Roadmap
## Indraprastha NEET Academy

**Version:** 1.0  
**Last Updated:** June 15, 2026  
**Owner:** Product Manager  
**Status:** Active

---

## 1. Release Timeline

```
Phase 1: MVP (Q1 2025) ✅ COMPLETED
├── Basic authentication (phone + password)
├── Core course structure
├── Practice questions
├── Basic tests
└── User dashboard

Phase 2: Content & Features (Q2-Q3 2025) 🟡 IN PROGRESS
├── Books & NCERT uploads
├── Video integration
├── Advanced analytics
├── Daily MCQs
└── Batch management improvements

Phase 3: Scaling & Premium (Q4 2025) 🔴 NOT STARTED
├── Subscription tiers
├── Payment integration
├── Live classes (future)
├── Advanced analytics dashboard
└── AI recommendations

Phase 4: Growth (2026) 🔴 NOT STARTED
├── Multiple exam types (AIIMS, JIPMER)
├── Partnerships with coaching centers
├── Mobile-first optimization
└── International expansion (future)
```

---

## 2. Phase 1: MVP Features (Q1 2025) ✅

### 2.1 Authentication & Account Management

#### Ticket: AUTH-001 - Phone Number Verification
- **Status:** ✅ COMPLETED
- **Priority:** CRITICAL
- **Effort:** 5 SP
- **Description:** Implement SMS OTP verification using Firebase Phone Auth
- **Acceptance Criteria:**
  - [ ] User enters 10-digit phone number
  - [ ] Firebase sends 6-digit OTP
  - [ ] User can verify OTP within 5 minutes
  - [ ] Max 5 attempts per phone
  - [ ] Rate limiting applied
- **Technology:** Firebase Phone Authentication
- **Completed Date:** January 2025

---

#### Ticket: AUTH-002 - Password-Based Signup
- **Status:** ✅ COMPLETED
- **Priority:** CRITICAL
- **Effort:** 3 SP
- **Description:** Create password-protected accounts during signup
- **Acceptance Criteria:**
  - [ ] Password minimum 8 characters
  - [ ] Bcrypt hashing (10 rounds)
  - [ ] Password confirmation validation
  - [ ] Clear error messages
- **Completed Date:** January 2025

---

#### Ticket: AUTH-003 - Phone + Password Login
- **Status:** ✅ COMPLETED
- **Priority:** CRITICAL
- **Effort:** 3 SP
- **Description:** Login with phone number and password
- **Acceptance Criteria:**
  - [ ] Phone number validation
  - [ ] Password verification against bcrypt hash
  - [ ] JWT token generation (24-hour expiry)
  - [ ] Single-device session enforcement
- **Completed Date:** January 2025

---

#### Ticket: AUTH-004 - Session Management
- **Status:** ✅ COMPLETED
- **Priority:** HIGH
- **Effort:** 3 SP
- **Description:** Manage user sessions with JWT tokens
- **Acceptance Criteria:**
  - [ ] Token stored in secure storage
  - [ ] Token auto-refresh on app launch
  - [ ] Auto-logout after 24 hours
  - [ ] Logout endpoint clears tokens
- **Completed Date:** January 2025

---

### 2.2 Course Management

#### Ticket: COURSE-001 - Batch Management
- **Status:** ✅ COMPLETED
- **Priority:** CRITICAL
- **Effort:** 5 SP
- **Description:** Create and manage course batches (NEET 2025, 2026, etc.)
- **Acceptance Criteria:**
  - [ ] Admin can create batches
  - [ ] Batch has name, target year, class label
  - [ ] Students select batch during signup
  - [ ] Batch-wise content filtering
- **Completed Date:** January 2025

---

#### Ticket: COURSE-002 - Subject & Topic Hierarchy
- **Status:** ✅ COMPLETED
- **Priority:** HIGH
- **Effort:** 5 SP
- **Description:** Organize content by subject and topic
- **Acceptance Criteria:**
  - [ ] Classes created (Class 11, Class 12)
  - [ ] Subjects per class (Physics, Chemistry, Biology)
  - [ ] Topics per subject
  - [ ] Topic-wise analytics
- **Completed Date:** January 2025

---

### 2.3 Practice & Questions

#### Ticket: PRACTICE-001 - Practice Question Seeding
- **Status:** ✅ COMPLETED
- **Priority:** CRITICAL
- **Effort:** 8 SP
- **Description:** Migrate 3462 legacy questions to new schema
- **Acceptance Criteria:**
  - [ ] 3462 questions migrated
  - [ ] All questions have 4 options (A, B, C, D)
  - [ ] Correct answers assigned
  - [ ] Questions organized by topic/difficulty
  - [ ] No data loss
- **Completed Date:** March 2025
- **Data Source:** indraprastha_final.sql

---

#### Ticket: PRACTICE-002 - Practice Sets
- **Status:** ✅ COMPLETED
- **Priority:** HIGH
- **Effort:** 5 SP
- **Description:** Create topic-wise practice question sets
- **Acceptance Criteria:**
  - [ ] 70+ practice sets created
  - [ ] Each set has 50+ questions
  - [ ] Set organization by subject
  - [ ] Difficulty levels defined
- **Completed Date:** March 2025

---

#### Ticket: PRACTICE-003 - Answer Submission & Feedback
- **Status:** ✅ COMPLETED
- **Priority:** HIGH
- **Effort:** 3 SP
- **Description:** Submit practice answers and get immediate feedback
- **Acceptance Criteria:**
  - [ ] Student selects answer (A/B/C/D)
  - [ ] Immediate feedback (correct/incorrect)
  - [ ] Show explanation
  - [ ] Track user responses
  - [ ] Calculate accuracy per topic
- **Completed Date:** January 2025

---

### 2.4 Mock Tests

#### Ticket: TEST-001 - Test Creation (Admin)
- **Status:** ✅ COMPLETED
- **Priority:** CRITICAL
- **Effort:** 5 SP
- **Description:** Admin interface to create mock tests
- **Acceptance Criteria:**
  - [ ] Admin can add test title, duration, questions
  - [ ] Support for 45+ questions (NEET pattern)
  - [ ] Time limit per test
  - [ ] Test categorization (full-length, subject-wise)
- **Completed Date:** February 2025

---

#### Ticket: TEST-002 - Test Attempt & Submission
- **Status:** ✅ COMPLETED
- **Priority:** CRITICAL
- **Effort:** 5 SP
- **Description:** Students take timed tests
- **Acceptance Criteria:**
  - [ ] Real-time countdown timer
  - [ ] Auto-submit on time expiry
  - [ ] Pause/resume capability
  - [ ] Navigate to any question
  - [ ] Mark for review feature
- **Completed Date:** February 2025

---

#### Ticket: TEST-003 - Results & Analytics
- **Status:** ✅ COMPLETED
- **Priority:** HIGH
- **Effort:** 5 SP
- **Description:** Show detailed test results and performance metrics
- **Acceptance Criteria:**
  - [ ] Overall score and percentage
  - [ ] Subject-wise breakdown
  - [ ] Accuracy and speed metrics
  - [ ] Question-wise analysis
  - [ ] Compare with previous attempts (if available)
- **Completed Date:** March 2025

---

### 2.5 Dashboard & Analytics

#### Ticket: DASHBOARD-001 - User Dashboard
- **Status:** ✅ COMPLETED
- **Priority:** HIGH
- **Effort:** 5 SP
- **Description:** Main dashboard showing learning progress
- **Acceptance Criteria:**
  - [ ] Questions solved (progress bar)
  - [ ] Accuracy percentage
  - [ ] Weak topics identified
  - [ ] Study streak (future)
  - [ ] Next recommended action
- **Completed Date:** February 2025

---

#### Ticket: DASHBOARD-002 - Analytics Tracking
- **Status:** ✅ COMPLETED
- **Priority:** HIGH
- **Effort:** 5 SP
- **Description:** Track user performance metrics
- **Acceptance Criteria:**
  - [ ] Store test attempts
  - [ ] Calculate topic-wise accuracy
  - [ ] Calculate speed metrics
  - [ ] Track time trends
  - [ ] Generate reports
- **Completed Date:** March 2025

---

## 3. Phase 2: Content & Features (Q2-Q3 2025) 🟡

### 3.1 Books & Study Materials

#### Ticket: BOOKS-001 - Book Upload (Admin)
- **Status:** 🟡 IN PROGRESS
- **Priority:** HIGH
- **Effort:** 8 SP
- **Description:** Admin can upload NCERT books and notes as PDFs
- **Acceptance Criteria:**
  - [ ] Admin selects batch, subject, chapter
  - [ ] Upload PDF file
  - [ ] File stored on Google Drive
  - [ ] Metadata saved in database
  - [ ] Show upload progress
  - [ ] Support chunked uploads (for large files)
- **Started:** April 2025
- **Target Date:** June 2025
- **Technology:** Google Drive API, Chunked uploads

---

#### Ticket: BOOKS-002 - Chapter Management
- **Status:** 🟡 IN PROGRESS
- **Priority:** MEDIUM
- **Effort:** 5 SP
- **Description:** Extract chapters from books and add metadata
- **Acceptance Criteria:**
  - [ ] Manual chapter creation
  - [ ] Chapter title and overview
  - [ ] Add highlights/key concepts
  - [ ] Link to practice questions
  - [ ] Track chapter view count
- **Target Date:** July 2025

---

#### Ticket: BOOKS-003 - Book Reading Interface
- **Status:** 🔴 NOT STARTED
- **Priority:** MEDIUM
- **Effort:** 8 SP
- **Description:** Student interface to view PDF books
- **Acceptance Criteria:**
  - [ ] PDF viewer with zoom
  - [ ] Page navigation
  - [ ] Bookmark pages
  - [ ] Take notes while reading (future)
  - [ ] Track reading progress
- **Target Date:** August 2025

---

### 3.2 Video Lectures

#### Ticket: VIDEOS-001 - Video Upload & Linking
- **Status:** 🔴 NOT STARTED
- **Priority:** HIGH
- **Effort:** 5 SP
- **Description:** Admin uploads educational videos
- **Acceptance Criteria:**
  - [ ] Upload video files (mp4, webm)
  - [ ] Store on Google Drive or cloud storage
  - [ ] Add video metadata (title, subject, topic)
  - [ ] Link to course structure
  - [ ] Support multiple video qualities (future)
- **Target Date:** July 2025

---

#### Ticket: VIDEOS-002 - Video Player
- **Status:** 🔴 NOT STARTED
- **Priority:** MEDIUM
- **Effort:** 5 SP
- **Description:** Student video viewing interface
- **Acceptance Criteria:**
  - [ ] Play/pause/seek controls
  - [ ] Playback speed options
  - [ ] Video quality selection (future)
  - [ ] Continue watching feature
  - [ ] Watch history tracking
- **Target Date:** August 2025

---

### 3.3 Daily MCQs

#### Ticket: MCQS-001 - Daily MCQ System
- **Status:** 🟡 IN PROGRESS
- **Priority:** MEDIUM
- **Effort:** 5 SP
- **Description:** One MCQ per day for habit building
- **Acceptance Criteria:**
  - [ ] Admin adds daily MCQs
  - [ ] Auto-assign to all students
  - [ ] Push notification reminder
  - [ ] Track completion status
  - [ ] Show correct answer after submission
  - [ ] Maintain streak counter
- **Target Date:** June 2025
- **Technology:** Firebase Cloud Messaging (FCM)

---

### 3.4 Advanced Analytics

#### Ticket: ANALYTICS-001 - Performance Reports
- **Status:** 🔴 NOT STARTED
- **Priority:** HIGH
- **Effort:** 8 SP
- **Description:** Detailed analytics dashboard for students
- **Acceptance Criteria:**
  - [ ] Topic-wise accuracy graph
  - [ ] Speed trends over time
  - [ ] Comparison with previous tests
  - [ ] Predicted score calculator
  - [ ] Weak area identification
  - [ ] Study recommendations
- **Target Date:** September 2025

---

#### Ticket: ANALYTICS-002 - Admin Analytics Dashboard
- **Status:** 🔴 NOT STARTED
- **Priority:** MEDIUM
- **Effort:** 8 SP
- **Description:** Admin view of student performance and content engagement
- **Acceptance Criteria:**
  - [ ] Total students enrolled
  - [ ] Content consumption metrics
  - [ ] Student performance ranking
  - [ ] Content effectiveness analysis
  - [ ] Dropout analysis
  - [ ] CSV export capability
- **Target Date:** August 2025

---

## 4. Phase 3: Premium & Scaling (Q4 2025) 🔴

### 4.1 Payment & Subscription

#### Ticket: PAYMENT-001 - Payment Gateway Integration
- **Status:** 🔴 NOT STARTED
- **Priority:** CRITICAL
- **Effort:** 8 SP
- **Description:** Integrate Razorpay/PayU for payment processing
- **Acceptance Criteria:**
  - [ ] Payment processing (UPI, cards, wallets)
  - [ ] Payment verification
  - [ ] Invoice generation
  - [ ] Refund handling
  - [ ] PCI DSS compliance
- **Target Date:** October 2025

---

#### Ticket: SUBSCRIPTION-001 - Subscription Tiers
- **Status:** 🔴 NOT STARTED
- **Priority:** HIGH
- **Effort:** 8 SP
- **Description:** Create free, basic, premium tiers
- **Acceptance Criteria:**
  - [ ] Free tier: limited questions
  - [ ] Basic tier: full questions + videos
  - [ ] Premium tier: all features + priority support
  - [ ] Validity period management
  - [ ] Auto-renewal capability
- **Target Date:** October 2025

---

### 4.2 Live Classes (Future)

#### Ticket: LIVE-001 - Live Class Infrastructure
- **Status:** 🔴 NOT STARTED (FUTURE)
- **Priority:** MEDIUM
- **Effort:** 13 SP
- **Description:** Setup for live doubt-solving sessions
- **Acceptance Criteria:**
  - [ ] Video conferencing integration (Jitsi/Agora)
  - [ ] Live chat during class
  - [ ] Class recording
  - [ ] Interactive whiteboard
  - [ ] QA system
- **Target Date:** Q1 2026

---

## 5. Phase 4: Growth & Expansion (2026) 🔴

### 5.1 Multi-Exam Support

#### Ticket: EXAMS-001 - AIIMS & JIPMER Patterns
- **Status:** 🔴 NOT STARTED
- **Priority:** HIGH
- **Effort:** 8 SP
- **Description:** Support other medical entrance exams beyond NEET
- **Acceptance Criteria:**
  - [ ] AIIMS exam pattern
  - [ ] JIPMER exam pattern
  - [ ] Content for each exam
  - [ ] Separate batches per exam
  - [ ] Exam-specific analytics
- **Target Date:** Q2 2026

---

### 5.2 AI-Powered Features

#### Ticket: AI-001 - Personalized Learning Paths
- **Status:** 🔴 NOT STARTED (FUTURE)
- **Priority:** MEDIUM
- **Effort:** 13 SP
- **Description:** AI-generated custom study recommendations
- **Acceptance Criteria:**
  - [ ] Analyze student performance
  - [ ] Identify knowledge gaps
  - [ ] Suggest focused practice
  - [ ] Adaptive difficulty adjustment
  - [ ] ETA to target score
- **Target Date:** Q3 2026
- **Technology:** Machine Learning model

---

---

## 6. Bug Fixes & Improvements

### 6.1 Current Issues

#### Ticket: BUG-001 - Firebase Phone Auth: Region Not Enabled
- **Status:** ✅ FIXED
- **Priority:** CRITICAL
- **Description:** SMS OTP not sending in India (Firebase region issue)
- **Root Cause:** India SMS region not enabled in Firebase Console
- **Solution:** Enable India region in Firebase Phone Auth settings
- **Fixed Date:** May 2025

---

#### Ticket: BUG-002 - UUID vs INTEGER Database Mismatch
- **Status:** ✅ FIXED
- **Priority:** CRITICAL
- **Description:** Foreign key constraint errors due to UUID/INTEGER mismatch
- **Root Cause:** db.js had UUID primary keys but foreign keys used INTEGER
- **Solution:** Revert all UUID keys to SERIAL (INTEGER) throughout schema
- **Fixed Date:** May 2025

---

#### Ticket: BUG-003 - HTML Response During OTP Verification
- **Status:** ✅ FIXED
- **Priority:** HIGH
- **Description:** Backend returning HTML error page instead of JSON
- **Root Cause:** FIREBASE_SERVICE_ACCOUNT_JSON not in server .env
- **Solution:** 
  1. Add JSON to .env
  2. Add HTML response detection in Flutter auth_repository.dart
- **Fixed Date:** June 2025

---

#### Ticket: BUG-004 - Admin Drive OAuth Not Connected
- **Status:** 🟡 IN PROGRESS
- **Priority:** MEDIUM
- **Description:** Admin app shows "Drive not connected" on login
- **Root Cause:** GDRIVE_OAUTH_REDIRECT_URI not correct, OAuth flow incomplete
- **Workaround:** User must complete OAuth flow in Setup tab
- **Solution:** Fix redirect URI in .env and backend OAuth endpoints
- **Target Date:** June 2025

---

## 7. Backlog & Ideas

### 7.1 Potential Features (Low Priority)

| Feature | Effort | Priority | Notes |
|---------|--------|----------|-------|
| **Leaderboards** | 5 SP | LOW | Rank students by accuracy/speed |
| **Study Groups** | 8 SP | LOW | Peer collaboration features |
| **Doubt Chat** | 8 SP | LOW | Live doubt-solving with mentors |
| **Offline Mode** | 13 SP | LOW | Download content for offline use |
| **Badges & Achievements** | 5 SP | LOW | Gamification elements |
| **Multi-Language Support** | 8 SP | LOW | Hindi, regional languages |
| **Biometric Login** | 5 SP | LOW | Fingerprint / Face recognition |
| **Smart Test Booking** | 3 SP | LOW | Personalized test recommendations |

---

## 8. Metrics & Success Criteria

### 8.1 Feature Completion

| Phase | Planned | Completed | % |
|-------|---------|-----------|---|
| Phase 1 | 15 features | 15 | 100% ✅ |
| Phase 2 | 8 features | 2 | 25% 🟡 |
| Phase 3 | 6 features | 0 | 0% 🔴 |
| Phase 4 | 5 features | 0 | 0% 🔴 |

### 8.2 Code Metrics

- **Tests Coverage:** 45% (target: 70%)
- **Documentation:** 80% (good)
- **Performance:** < 500ms API response (achieved)
- **Uptime:** 99.2% (target: 99%)

---

## 9. Velocity & Capacity

**Team:** 1 backend developer + 1 frontend developer + 1 content manager

**Sprint Duration:** 2 weeks

**Typical Velocity:**
- Backend: 20 story points / sprint
- Frontend: 20 story points / sprint
- Combined: 40 story points / sprint (max)

**Constraints:**
- Part-time contributors
- Limited infrastructure budget
- Content creation bottleneck (need more teachers)

---

## 10. Dependency Management

```
Ticket Dependencies:
├── AUTH-001 (Phone OTP)
│   └── AUTH-002 (Signup)
│       └── AUTH-003 (Login)
│           └── AUTH-004 (Sessions)
├── COURSE-001 (Batches)
│   └── COURSE-002 (Subjects)
│       └── PRACTICE-001 (Question seeding)
│           ├── PRACTICE-002 (Practice sets)
│           └── TEST-001 (Create tests)
├── TEST-001 → TEST-002 (Test attempt) → TEST-003 (Results)
├── DASHBOARD-001 (Dashboard) depends on:
│   └── ANALYTICS-002 (Analytics data)
├── BOOKS-001 (Upload) → BOOKS-002 (Chapters) → BOOKS-003 (Reader)
├── VIDEOS-001 (Upload) → VIDEOS-002 (Player)
├── MCQS-001 (Daily MCQs) depends on:
│   └── Firebase Cloud Messaging setup
└── PAYMENT-001 (Gateway) → SUBSCRIPTION-001 (Tiers)
```

---

## 11. Release Notes Template

```markdown
## Version 1.1.0 (June 15, 2026)

### New Features
- ✨ Daily MCQ system for habit building
- ✨ Advanced analytics dashboard
- ✨ Book chapter organization

### Improvements
- 🔧 Faster question loading
- 🔧 Better error messages
- 🔧 Improved offline handling (future)

### Bug Fixes
- 🐛 Fixed Firebase region issue (SMS OTP)
- 🐛 Fixed UUID/INTEGER database mismatch
- 🐛 Fixed HTML response parsing

### Security
- 🔒 Bcrypt password hashing (10 rounds)
- 🔒 JWT token expiry (24 hours)
- 🔒 HTTPS everywhere

### Performance
- ⚡ 45% faster database queries
- ⚡ Optimized image loading
- ⚡ Reduced bundle size

### Known Issues
- ⚠️ Admin Drive OAuth needs manual setup
- ⚠️ Offline mode not yet available

### Deprecations
- ❌ Old OTP-based authentication (removed)

### Contributors
- Claude Code (development)
- [User Name] (content)
```

---

## 12. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | June 2026 | Product Manager | Initial roadmap |

---

**Status:** ACTIVE  
**Last Updated:** June 15, 2026  
**Next Review:** September 2026  
**Approval:** [PM Sign-off]

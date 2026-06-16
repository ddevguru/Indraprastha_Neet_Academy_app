# Product Requirements Document (PRD)
## Indraprastha NEET Academy

**Version:** 1.0  
**Last Updated:** June 15, 2026  
**Document Owner:** Product Manager  
**Status:** Active

---

## 1. Executive Summary

Indraprastha NEET Academy is a **mobile-first, cloud-hosted educational platform** designed to help NEET aspirants prepare through:
- Interactive practice questions
- Full-length mock tests
- Video lectures and books
- Real-time progress tracking
- AI-powered insights

**Target Users:**
- NEET exam aspirants (Medical entrance test)
- Age 13-25 years
- India-based students

**Primary Platforms:**
- iOS (Flutter)
- Android (Flutter)
- Web Admin Panel (Flutter)
- Windows Desktop (Flutter)

---

## 2. Business Objectives

### 2.1 Short-term (6 months)
- ✅ Launch mobile app with core features (DONE)
- ✅ Deploy self-hosted backend on Google Cloud (DONE)
- ✅ Migrate legacy data (3462 questions) (DONE)
- [ ] Achieve 500+ monthly active users
- [ ] Gather user feedback and iterate

### 2.2 Mid-term (6-12 months)
- [ ] Implement premium subscription tiers
- [ ] Add live doubt-solving sessions
- [ ] Launch analytics dashboard for teachers
- [ ] Achieve 2000+ monthly active users
- [ ] Partner with coaching centers

### 2.3 Long-term (1-2 years)
- [ ] Expand to other medical entrance exams (AIIMS, JIPMER)
- [ ] Add AI-powered personalized learning paths
- [ ] Integrate with educational institutions
- [ ] Achieve 10,000+ monthly active users
- [ ] Consider Series A fundraising

---

## 3. User Personas & Use Cases

### 3.1 Student User (Primary)

**Name:** Aarav (Age 18, NEET Aspirant)

**Goals:**
- Prepare for NEET exam in 6 months
- Track progress across subjects
- Solve past-year questions
- Understand weak areas

**Pain Points:**
- Unstructured learning materials
- Unclear progress tracking
- No feedback on mistakes
- Overwhelming number of resources

**How Platform Helps:**
- Curated practice questions by topic
- Real-time score tracking
- Topic-wise performance analytics
- Focused mock tests

---

### 3.2 Admin User (Secondary)

**Name:** Priya (Teacher, Content Manager)

**Goals:**
- Manage course content
- Upload books, videos, questions
- View student progress
- Create mock tests

**Pain Points:**
- Manual file management
- No centralized dashboard
- Difficulty organizing content
- Cannot track student performance

**How Platform Helps:**
- Drag-drop content upload
- Google Drive integration
- Admin dashboard with student analytics
- Batch-wise performance reports

---

## 4. Core Features

### 4.1 Authentication & Account Management

**Feature:** Firebase Phone OTP + Password-based Login

**Requirements:**
- Phone verification via SMS OTP (Firebase Phone Auth)
- Password-based signup
- Single-device login enforcement (active_session_id)
- Account deletion with data purge
- Session management with JWT tokens

**User Stories:**
- "As a new student, I want to signup using my phone number and password so I can access the platform immediately"
- "As an existing user, I want to login using phone + password (no OTP needed every time)"
- "As a security-conscious user, I want my old sessions to expire when I login from a new device"

---

### 4.2 Course & Batch Management

**Feature:** Hierarchical Course Organization

**Hierarchy:**
```
Course (NEET 2025)
└── Batch (Class 11, Class 12)
    └── Class (Class 11)
        └── Subject (Physics, Chemistry, Biology)
            └── Topics/Books
```

**Requirements:**
- Create courses and assign to batches
- Support multiple course categories
- Batch-wise content separation
- Easy course enrollment

**User Stories:**
- "As a student, I want to select my batch during signup so I see only relevant content"
- "As an admin, I want to create new batches for upcoming exam years"

---

### 4.3 Books & Notes Management

**Feature:** Upload & Organize Study Materials

**Requirements:**
- Upload PDF books, handwritten notes
- Organize by subject and chapter
- Generate chapters from PDF (future: AI-powered)
- Track which students viewed which chapters
- Integration with Google Drive for backup

**User Stories:**
- "As an admin, I want to upload NCERT books organized by subject so students can access them"
- "As a student, I want to view chapters with highlighted key concepts"

**File Types Supported:**
- PDF (primary)
- Images (for notes)
- Video files (mp4, mkv)

---

### 4.4 Practice Questions & Sets

**Feature:** Unlimited Practice with Smart Analytics

**Requirements:**
- Create practice sets (curated collections)
- Questions with 4 options (A, B, C, D)
- Explanations for each question
- Image support (question image, explanation image)
- Topic-wise organization
- Difficulty levels (easy, medium, hard)
- Progress tracking per student

**Data Model:**
```sql
practice_sets (id, title, subject, topic, ...)
└── practice_questions (id, question, option_a, option_b, option_c, option_d, correct_option, explanation, ...)
```

**User Stories:**
- "As a student, I want to solve physics practice questions to test my understanding"
- "As an admin, I want to add explanations with images for difficult questions"
- "As a student, I want to see my accuracy % for each topic"

---

### 4.5 Full-Length Tests (Mocks)

**Feature:** Timed Practice Tests with Performance Analytics

**Requirements:**
- Create mock tests (full NEET pattern or topic-wise)
- Auto-grade multiple-choice questions
- Calculate scores and percentiles
- Track test history and performance trends
- Time-limit per test
- Question shuffling (optional)
- Detailed analytics (topic-wise, speed, accuracy)

**Data Model:**
```sql
tests (id, title, duration_minutes, total_questions, ...)
├── test_questions (id, test_id, question, options, correct_answer, ...)
└── test_attempts (id, user_id, test_id, score, time_taken, ...)
```

**User Stories:**
- "As a student, I want to solve a full NEET mock test to assess my readiness"
- "As a student, I want to see my score, rank percentile, and weak topics after the test"
- "As an admin, I want to create multiple versions of the same test"

---

### 4.6 Daily MCQs

**Feature:** One Question Per Day (Motivation & Habit Building)

**Requirements:**
- Auto-assign one MCQ per day
- Different question per user (randomized)
- Track daily streaks and achievements
- Gamification (badges, streaks)
- Push notifications for daily MCQ

**Data Model:**
```sql
daily_mcqs (id, question, option_a, option_b, option_c, option_d, correct_option, date, ...)
```

**User Stories:**
- "As a student, I want to solve one quick MCQ every morning to build a study habit"
- "As an admin, I want to know how many students solved the daily MCQ"

---

### 4.7 Video Lectures

**Feature:** Organize & Stream Educational Videos

**Requirements:**
- Upload videos (hosted on Google Drive or cloud storage)
- Organize by subject and topic
- Track watch history (play time, completion %)
- Support multiple video qualities (future: adaptive streaming)
- Timestamps/chapters within videos (future)

**Data Model:**
```sql
videos (id, title, subject, topic, video_url, duration, ...)
```

**User Stories:**
- "As a student, I want to watch Physics videos on Mechanics topic"
- "As an admin, I want to know which videos students watched completely"

---

### 4.8 Packages & Offers

**Feature:** Subscription Tiers & Bundled Content

**Requirements:**
- Create packages (courses + features)
- Set pricing and discounts
- Track package purchases
- Provide access control based on package
- Manage validity dates

**Data Model:**
```sql
packages (id, name, price, description, validity_days, ...)
```

**Future:** Will implement payment gateway (Razorpay, PayU)

---

### 4.9 User Progress Dashboard

**Feature:** Track Learning & Performance

**Requirements (Student View):**
- Total questions solved
- Accuracy percentage
- Average time per question
- Topic-wise performance (radar chart)
- Weak areas highlighted
- Target score progress
- Leaderboard ranking (optional, anonymized)

**Requirements (Admin View):**
- Student count
- Batch-wise enrollment
- Content consumption metrics
- Top performers
- Dropout analysis
- Content recommendations

**Tools:**
- Charts: Bar charts, pie charts, line graphs
- Reports: CSV export of analytics

---

### 4.10 Push Notifications (FCM)

**Feature:** Timely Reminders & Engagement

**Requirements:**
- Send daily MCQ reminders
- Weak topic alerts
- Test score notifications
- App update notifications
- Study streak reminders
- Opt-in/opt-out support

**Data Model:**
```sql
fcm_tokens (user_id, device_token, created_at, ...)
```

---

## 5. Non-Functional Requirements

### 5.1 Performance
- **App Launch Time:** < 3 seconds
- **API Response Time:** < 500ms (p95)
- **Database Query Time:** < 100ms (p95)
- **Video Buffering:** < 5 seconds

### 5.2 Scalability
- Support 10,000+ concurrent users
- Auto-scaling backend (Google Cloud)
- CDN for static content (future)
- Database replication (future)

### 5.3 Availability
- **Target Uptime:** 99% (4h 43m downtime/month acceptable)
- **Backup:** Daily automated backups
- **Recovery Time:** < 1 hour after failure
- **Disaster Recovery:** Multi-region (future)

### 5.4 Security
- **Encryption:** HTTPS/TLS 1.2+ only
- **Password:** Bcrypt hashing (10+ rounds)
- **Tokens:** JWT with 24-hour expiry
- **CORS:** Restricted to known domains
- **Rate Limiting:** 100 requests/min per user
- **SQL Injection:** Prepared statements only
- **XSS Protection:** Input sanitization + CSP headers

### 5.5 Accessibility
- WCAG 2.1 Level AA compliance (future)
- Minimum font size: 12pt
- Color contrast ratio: 4.5:1
- Support for screen readers (future)

### 5.6 Compatibility
- **Mobile:** iOS 12+, Android 6+
- **Tablet:** iPad, Samsung Galaxy Tab
- **Web:** Chrome, Firefox, Safari, Edge (latest versions)
- **Desktop:** Windows 10+, macOS 10.15+

---

## 6. Data & Analytics

### 6.1 Key Metrics (KPIs)

| Metric | Target | Frequency |
|--------|--------|-----------|
| Monthly Active Users | 2,000 | Daily |
| Daily Active Users | 500 | Daily |
| Question Solve Rate | 100/user/month | Daily |
| Test Completion Rate | 80% | Weekly |
| User Retention (30-day) | 60% | Weekly |
| Crash-Free Sessions | 99.9% | Daily |
| App Rating | 4.5+ stars | Monthly |

### 6.2 Tracking
- Firebase Analytics for user behavior
- Google Cloud Logging for backend events
- Custom dashboards for admins
- Weekly performance reports

---

## 7. Timeline & Milestones

| Phase | Duration | Deliverables | Status |
|-------|----------|--------------|--------|
| **Phase 1: MVP** | Q1 2025 | Core app, basic auth, practice questions | ✅ DONE |
| **Phase 2: Content** | Q2 2025 | Books, videos, mock tests | 🟡 IN PROGRESS |
| **Phase 3: Analytics** | Q3 2025 | Dashboards, detailed reports | 🔴 NOT STARTED |
| **Phase 4: Premium** | Q4 2025 | Subscription tiers, payments | 🔴 NOT STARTED |
| **Phase 5: Scale** | 2026 | AI features, partnerships | 🔴 NOT STARTED |

---

## 8. Success Criteria

### 8.1 User Adoption
- ✅ 500+ monthly active users (target achieved by Q2)
- [ ] 2,000+ monthly active users (target for Q3)
- [ ] 4.5+ app store rating (target)

### 8.2 Content Coverage
- ✅ 3,462 practice questions migrated (DONE)
- [ ] 100+ full-length mock tests (20+ completed)
- [ ] All NCERT books uploaded (0% done)
- [ ] 50+ video lectures per subject (0% done)

### 8.3 Retention & Engagement
- [ ] 60% 30-day retention rate
- [ ] Average 100 questions solved per user per month
- [ ] 3+ session times per week

### 8.4 Technical Health
- ✅ 99% uptime (achieved)
- ✅ < 500ms API response time (achieved)
- ✅ HTTPS deployed (achieved)

---

## 9. Out of Scope (Future Phases)

- Live classes (real-time video conferencing)
- Doubt-solving chat with mentors
- AI-generated study plans
- Adaptive difficulty adjustment
- Payment processing
- Offline mode
- Multi-language support (beyond English/Hindi)
- Social features (comments, peer help)
- Third-party integrations (LMS, school management)

---

## 10. Assumptions & Constraints

### 10.1 Assumptions
- Students have reliable internet connectivity
- Users are aged 13+ (with parental consent if < 18)
- Firebase services remain available
- Google Cloud infrastructure is stable
- Apple/Google app store approvals without delays

### 10.2 Constraints
- **Budget:** Limited (self-funded initially)
- **Team:** 1 full-stack developer, 1 content manager
- **Infrastructure:** Google Cloud free tier + paid resources
- **Time:** MVP released in Q1 2025
- **Regulatory:** Must comply with India's IT Rules 2021

---

## 11. Risks & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| Low user adoption | Revenue impact | Medium | Influencer partnerships, free tier |
| Data breach | Legal + reputation | Low | Security audits, encrypted storage |
| Server downtime | User frustration | Low | Auto-scaling, backup servers |
| Content piracy | Legal issues | Medium | Watermarking, DRM (future) |
| Firebase service outage | Service unavailable | Low | Multi-provider redundancy (future) |
| Exam pattern change | Content obsolete | Low | Annual curriculum review |

---

## 12. Glossary

| Term | Definition |
|------|-----------|
| **NEET** | National Eligibility cum Entrance Test (medical entrance exam) |
| **Mock Test** | Practice full-length test simulating actual exam |
| **PYQ** | Previous Year Question (from past exams) |
| **FCM** | Firebase Cloud Messaging (push notifications) |
| **JWT** | JSON Web Token (secure authentication token) |
| **OTP** | One-Time Password (SMS verification code) |
| **MAU** | Monthly Active Users |
| **DAU** | Daily Active Users |
| **KPI** | Key Performance Indicator |

---

## 13. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | June 2026 | Product Manager | Initial PRD document |

---

**Document Status:** APPROVED  
**Next Review:** September 2026  
**Approval Signature:** [To be signed]

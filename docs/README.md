# Indraprastha NEET Academy - Documentation Portal

**Last Updated:** June 15, 2026  
**Version:** 1.0

---

## 📚 Documentation Index

### Legal Documents

1. **[Privacy Policy](LEGAL_PRIVACY_POLICY.md)** 📋
   - User data collection and usage
   - GDPR/India IT Rules 2021 compliance
   - Data security & encryption
   - User rights (access, deletion, correction)
   - Third-party service details (Firebase, Google Cloud, Google Drive)
   - **Key Points:** Data localized in India, no data selling, bcrypt password hashing

2. **[Terms of Service](LEGAL_TERMS_OF_SERVICE.md)** ⚖️
   - User responsibilities and restrictions
   - Intellectual property rights
   - Limitation of liability
   - Payment & refund policy (future: payment support)
   - Dispute resolution & jurisdiction
   - **Key Points:** Content is for educational use only, not refundable, India jurisdiction

---

### Technical Documents

3. **[Product Requirements Document (PRD)](TECHNICAL_PRD.md)** 📊
   - Business objectives (short/mid/long-term)
   - User personas (Student, Admin, Teacher)
   - Core features overview:
     * Authentication (Phone OTP + password)
     * Course hierarchy (Batches → Classes → Subjects → Topics)
     * Practice questions (3462 migrated)
     * Mock tests (70+ sets)
     * Daily MCQs
     * Video lectures
     * Books & study materials
     * Analytics & progress tracking
   - Non-functional requirements (performance, scalability, security, accessibility)
   - Success metrics & KPIs
   - Timeline & milestones

4. **[Technical Architecture Document](TECHNICAL_ARCHITECTURE.md)** 🏗️
   - System overview (Flutter + Node.js + PostgreSQL + GCP)
   - Architecture diagram (Client → API → Backend → DB)
   - Technology stack:
     * Frontend: Flutter 3.10.1+
     * Backend: Node.js + Express
     * Database: PostgreSQL 14+
     * Hosting: Google Cloud Compute Engine
     * Auth: Firebase Phone Auth + JWT
     * Notifications: Firebase Cloud Messaging
     * SSL: Let's Encrypt
   - Database schema (20+ tables)
   - API endpoints specification
   - Authentication flows (Signup, Login, Token management)
   - Security measures & encryption
   - Deployment architecture (nginx, PM2, .env)
   - Scalability roadmap (future: load balancing, Redis, CDN)

5. **[Security & Access Control Document](TECHNICAL_SECURITY_ACCESS.md)** 🔒
   - Authentication mechanisms:
     * Phase 1: Phone OTP (Firebase Phone Auth)
     * Phase 2: Password setup (bcrypt 10 rounds)
     * Phase 3: Login (phone + password, no OTP)
   - Authorization & role-based access:
     * STUDENT: Personal data only
     * ADMIN: Full access
     * GUEST: No access
   - Data protection:
     * HTTPS/TLS encryption in transit
     * Bcrypt password hashing at rest
     * Secure token storage (Keychain/Keystore)
   - Network security (firewall, CORS, rate limiting)
   - Input validation & SQL injection prevention
   - Session management (JWT, 24-hour expiry, single-device)
   - Vulnerability management & incident response
   - Compliance (OWASP Top 10, India IT Rules 2021)

6. **[Frontend Specification Document](TECHNICAL_FRONTEND_SPEC.md)** 🎨
   - Project structure & architecture
   - Design system:
     * Color palette (Primary: Orange #E85A1C)
     * Typography & spacing scale
     * Border radius tokens
   - Authentication screens (3-step signup, login)
   - Main dashboard & navigation
   - Core screens:
     * Courses (subjects & topics)
     * Practice questions with explanations
     * Mock tests with timer & navigator
     * Test results & analytics
     * Videos with continue-watching
     * Books & chapters
     * User profile & settings
   - State management (BLoC pattern)
   - API integration & error handling
   - Responsive design (mobile, tablet, desktop)
   - Performance optimization
   - Accessibility & testing
   - Future enhancements (offline mode, dark mode, biometric)

---

### Project Management

7. **[Feature Tickets & Development Roadmap](FEATURE_TICKETS_ROADMAP.md)** 🚀
   - 4-phase release timeline:
     * **Phase 1 (Q1 2025):** MVP - 15 features ✅ DONE
     * **Phase 2 (Q2-Q3 2025):** Content - 8 features 🟡 IN PROGRESS
     * **Phase 3 (Q4 2025):** Premium - 6 features 🔴 NOT STARTED
     * **Phase 4 (2026):** Growth - 5 features 🔴 NOT STARTED
   - Detailed ticket tracking:
     * Each ticket has status, priority, effort estimate
     * User stories & acceptance criteria
     * Dependencies & blockers
   - Bug fixes (Firebase, UUID/INTEGER, HTML response, Drive OAuth)
   - Backlog & low-priority ideas
   - Team velocity (40 SP/sprint)
   - Release notes template

---

## 🎯 Quick Start

### For New Developers
1. Read **PRD** for feature overview
2. Read **Technical Architecture** for system design
3. Read **Frontend Spec** for UI/UX details
4. Read **Security Document** for auth flows
5. Check **Feature Roadmap** for what's next

### For Product Managers
1. Read **PRD** for business context
2. Check **Feature Roadmap** for timeline & status
3. Review **Terms of Service** & **Privacy Policy** for compliance
4. Monitor metrics in PRD (KPIs, success criteria)

### For Security & DevOps Teams
1. Read **Security Document** for auth & encryption details
2. Check **Technical Architecture** for infrastructure
3. Review firewall rules and backup strategy
4. Implement monitoring & alerting

### For Legal/Compliance
1. Read **Privacy Policy** for data handling
2. Read **Terms of Service** for user obligations
3. Verify compliance with India IT Rules 2021
4. Check third-party terms (Firebase, Google)

---

## 📁 Directory Structure

```
docs/
├── README.md (this file)
├── LEGAL_PRIVACY_POLICY.md
├── LEGAL_TERMS_OF_SERVICE.md
├── TECHNICAL_PRD.md
├── TECHNICAL_ARCHITECTURE.md
├── TECHNICAL_SECURITY_ACCESS.md
├── TECHNICAL_FRONTEND_SPEC.md
└── FEATURE_TICKETS_ROADMAP.md
```

---

## 🔑 Key Information at a Glance

### Platform Details
- **Name:** Indraprastha NEET Academy
- **Domain:** indraprasthaneetacademy.com
- **API Base URL:** https://api.indraprasthaneetacademy.com/api
- **Regions:** India-based (Google Cloud India)
- **Platforms:** iOS, Android, Web, Windows Desktop

### Technology Stack
```
Frontend:     Flutter 3.10.1+ (BLoC, Material 3)
Backend:      Node.js + Express 4.x
Database:     PostgreSQL 14+ (3000+ questions, 70+ tests)
Auth:         Firebase Phone Auth + JWT
Notifications: Firebase Cloud Messaging (FCM)
Hosting:      Google Cloud Compute Engine (VM)
SSL:          Let's Encrypt (auto-renewing)
```

### User Roles
- **Students:** 500+ MAU (target), access courses & practice
- **Admins:** Content management, analytics, user management
- **Teachers:** (Future) Live classes, doubt-solving

### Content Scale (as of June 2026)
- **Questions:** 3,462 practice + migrated
- **Tests:** 70+ mock tests created
- **Books:** NCERT uploads in progress
- **Videos:** To be uploaded
- **Batches:** NEET 2025, 2026 (multi-exam future)

### Security Features
- ✅ HTTPS/TLS encryption (all traffic)
- ✅ Bcrypt password hashing (10 rounds)
- ✅ Firebase Phone OTP verification
- ✅ JWT tokens (24-hour expiry)
- ✅ Single-device session enforcement
- ✅ Data localization (India)
- ✅ SQL injection prevention (parameterized queries)

### Performance Targets
- **API Response Time:** < 500ms (p95)
- **App Launch:** < 3 seconds
- **Database Queries:** < 100ms (p95)
- **Uptime:** 99% (target)
- **Server Capacity:** 10,000+ concurrent users (future)

---

## 📋 Compliance Checklist

### Legal
- ✅ Privacy Policy drafted (GDPR + India IT Rules 2021)
- ✅ Terms of Service drafted (India jurisdiction)
- ✅ Data localization in India confirmed
- ⏳ CCPA exemption (US-only users excluded)

### Security
- ✅ HTTPS deployed (Let's Encrypt)
- ✅ Password hashing (bcrypt 10 rounds)
- ✅ Authentication (Firebase Phone Auth + JWT)
- ✅ Rate limiting implemented
- ⏳ Penetration testing (annual)
- ⏳ Security audit (quarterly)

### Data Protection
- ✅ Data encrypted in transit (HTTPS)
- ✅ Passwords encrypted at rest (bcrypt)
- ✅ Secure token storage (Keychain/Keystore)
- ✅ No third-party data sharing
- ✅ User data deletion capability

### Deployment
- ✅ Backend deployed on GCP
- ✅ PostgreSQL configured
- ✅ nginx configured (HTTPS, proxy)
- ✅ PM2 process manager setup
- ⏳ Automated backups (daily)
- ⏳ Disaster recovery plan (documented)

---

## 🔄 Document Maintenance

### Review Schedule
- **Quarterly:** PRD, Roadmap, Architecture
- **Semi-Annual:** Security Document, Terms of Service
- **Annual:** Privacy Policy (GDPR updates)
- **On-Demand:** Bug fixes, emergency patches

### Update Process
1. Identify change needed
2. Create git branch: `docs/update-<section>`
3. Update markdown file
4. Get review/approval
5. Merge to main
6. Tag version (YYYY-MM-DD)

### Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | June 15, 2026 | Initial documentation package |

---

## 📞 Contact & Support

### For Questions About:
- **Product Features:** See PRD
- **Technical Architecture:** See Technical Architecture Doc
- **Security & Auth:** See Security Document
- **UI/UX Details:** See Frontend Spec
- **Development Roadmap:** See Feature Roadmap
- **Legal Compliance:** See Legal Documents

### Key Contacts
- **Product Manager:** [Name] - Product & PRD
- **Tech Lead:** [Name] - Architecture & Backend
- **Frontend Lead:** [Name] - UI/UX & Mobile
- **Security Lead:** [Name] - Compliance & Security
- **DevOps:** [Name] - Infrastructure & Deployment

---

## 📚 External References

### Tools & Services
- [Flutter Documentation](https://flutter.dev)
- [Node.js Documentation](https://nodejs.org)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Google Cloud Documentation](https://cloud.google.com/docs)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [RFC 7519 - JSON Web Token (JWT)](https://datatracker.ietf.org/doc/html/rfc7519)

### Regulatory References
- [India IT Rules 2021](https://www.meity.gov.in) (Data protection)
- [Bharatiya Nyaya Sanhita 2023](https://legislative.gov.in) (Criminal code)
- [RBI Payment Guidelines](https://www.rbi.org.in) (Future payments)

---

## ✅ Approval & Sign-off

- [ ] **Product Manager:** _____________________ Date: _______
- [ ] **Tech Lead:** _____________________ Date: _______
- [ ] **Security Lead:** _____________________ Date: _______
- [ ] **Legal Counsel:** _____________________ Date: _______

---

**Documentation Status:** ACTIVE ✅  
**Last Updated:** June 15, 2026  
**Next Review:** September 15, 2026

---

## 🚀 Getting Started

**New to the project?** Start here:
1. **What does the app do?** → Read PRD
2. **How is it built?** → Read Technical Architecture
3. **How do I build the UI?** → Read Frontend Spec
4. **How are users authenticated?** → Read Security Document
5. **What should I work on next?** → Read Feature Roadmap

**Have a question?** Check the relevant document above, or contact the team lead.

**Found an issue?** Create a ticket in the Feature Roadmap following the template.

---

**Made with ❤️ for NEET Aspirants**

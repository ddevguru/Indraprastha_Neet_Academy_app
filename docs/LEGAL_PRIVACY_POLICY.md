# Privacy Policy - Indraprastha NEET Academy

**Effective Date:** January 2026  
**Last Updated:** June 15, 2026

## 1. Introduction

Indraprastha NEET Academy ("we," "our," "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application, web application, and related services ("Platform").

## 2. Information We Collect

### 2.1 Personal Information
- **Phone Number** (for SMS-based OTP verification during signup)
- **Full Name**
- **Batch/Course Selection**
- **Course Category Preference**
- **Preferred Language**
- **Password (hashed with bcrypt)** — never stored in plain text

### 2.2 Device Information
- Device ID (Firebase Cloud Messaging tokens)
- Device type, OS version
- App version and crash logs
- IP address (from server logs)

### 2.3 Usage Data
- Test attempts and scores
- Practice set progress
- Video watch history
- MCQ responses
- Time spent on each section

### 2.4 Drive Integration (Admin Only)
- Google Drive OAuth refresh token (for file uploads only)
- File metadata (names, upload timestamps)

## 3. How We Use Your Information

### 3.1 Core Service Delivery
- Create and maintain your account
- Verify your phone number (OTP via Firebase Phone Authentication)
- Deliver course materials, tests, and practice content
- Track your learning progress
- Send push notifications (FCM)

### 3.2 Analytics & Improvement
- Analyze app usage patterns (anonymized)
- Improve content quality and UX
- Fix bugs and performance issues
- Generate learning analytics for admin dashboard

### 3.3 Communication
- Send OTP for phone verification
- Educational reminders and announcements
- Account security alerts

### 3.4 Legal Compliance
- Comply with government regulations
- Prevent fraud and abuse
- Enforce Terms of Service

## 4. Data Security

### 4.1 Encryption & Storage
- **Passwords:** Hashed with bcrypt (never reversible)
- **API Communication:** HTTPS/TLS encryption
- **Database:** PostgreSQL with password-protected access
- **Tokens:** JWT tokens stored in secure storage (Flutter Secure Storage)
- **Phone Numbers:** Stored in plain text (necessary for OTP verification)

### 4.2 Access Control
- Admin-only access via username/password authentication
- Session management with single-device enforcement
- JWT token expiration after 24 hours
- Secure server deployment on Google Cloud VMs

### 4.3 No Third-Party Sharing
- We do NOT sell your personal data
- We do NOT share phone numbers with third parties
- We do NOT use marketing companies or data brokers

## 5. Firebase & Google Services

### 5.1 Firebase Phone Authentication
- Phone numbers are processed by Firebase (Google)
- SMS OTP is sent via Firebase's SMS service (India region enabled)
- Firebase Admin SDK verifies ID tokens server-side
- Google's Privacy Policy applies to Firebase: https://policies.google.com/privacy

### 5.2 Google Drive Integration (Admin Only)
- Admin users can connect their Google Drive account (optional)
- OAuth refresh token is stored in our database
- No personal Google Drive files are accessed/downloaded
- Only used to upload course materials

### 5.3 Google Cloud Platform
- Backend hosted on Google Cloud Compute Engine
- Data center location: India region
- GCP Privacy Policy: https://cloud.google.com/terms/cloud-privacy-notice

## 6. Data Retention

| Data Type | Retention Period | Deletion Method |
|-----------|------------------|-----------------|
| Account info (name, phone) | Until account deletion | Hard delete from PostgreSQL |
| Test attempts & scores | 5 years (educational record) | Hard delete + archive |
| Push notification tokens | While app is installed | Auto-delete on uninstall |
| OAuth tokens | Until revoked by user | Immediate deletion |
| Server logs | 30 days | Auto-rotation |

## 7. Your Rights

### 7.1 Data Access
- Request a copy of your personal data: support@indraprasthaneetacademy.com
- We will provide data in CSV format within 15 days

### 7.2 Data Deletion
- Request account deletion anytime via app Settings
- All personal data will be deleted within 7 days
- Educational records (test scores) may be retained per legal requirements

### 7.3 Data Correction
- Edit your profile information (name, language preference) in-app
- Request phone number changes via support email

### 7.4 Withdraw Consent
- You can revoke Google Drive OAuth access anytime
- You can disable push notifications in app settings
- You can deny SMS OTP and use alternative login methods (if available)

## 8. Cookies & Tracking

- **Mobile App:** No cookies (uses JWT tokens instead)
- **Web Admin Panel:** Session cookies (secure, HttpOnly, SameSite)
- **Analytics:** No Google Analytics or third-party trackers
- **Crash Reporting:** Firebase Crashlytics (anonymized error logs)

## 9. Children's Privacy

Indraprastha NEET Academy is intended for students aged **13 and above**. We do not knowingly collect data from children under 13. If we discover such data, we will delete it immediately.

**Parental Consent:** If a student is under 13, parental consent is required before signup.

## 10. Data Transfers & Compliance

### 10.1 India Data Localization
- All user data is stored in India (Google Cloud India region)
- Complies with India's data localization laws
- No cross-border transfers to other countries

### 10.2 Regulatory Compliance
- **GDPR:** Not applicable (EU users should not use this service)
- **CCPA:** Not applicable (California users should not use this service)
- **India's IT Rules 2021:** Full compliance with data handling rules

## 11. Third-Party Services

| Service | Purpose | Data Shared | Privacy Link |
|---------|---------|-------------|--------------|
| Firebase | Phone Auth, Cloud Messaging | Phone #, FCM tokens | https://policies.google.com/privacy |
| Google Cloud | Backend hosting | All server data | https://cloud.google.com/terms |
| Let's Encrypt | HTTPS certificate | Domain name only | https://letsencrypt.org/privacy |

## 12. Contact & Grievance Redressal

**Email:** support@indraprasthaneetacademy.com  
**Address:** [Company Address — update as needed]  
**Response Time:** 15-30 days

### Grievance Officer (as per IT Rules 2021)
- **Name:** [Officer Name]
- **Email:** grievance@indraprasthaneetacademy.com
- **Phone:** [Contact Number]

## 13. Changes to This Policy

We may update this policy anytime. Changes will be notified via:
- In-app notification
- Email to registered users
- Updated "Last Updated" date above

Continued use of the app after changes = acceptance of new policy.

## 14. Summary: What We Promise

✅ **We DO:**
- Encrypt all data in transit (HTTPS)
- Hash passwords (never store plain text)
- Keep data in India
- Delete data on your request
- Use data only for educational purposes

❌ **We DO NOT:**
- Sell your data to advertisers
- Share phone numbers with third parties
- Use cookies for tracking (in mobile app)
- Store payment information
- Allow data mining by external companies

---

**By using Indraprastha NEET Academy, you agree to this Privacy Policy.**

Questions? Email: support@indraprasthaneetacademy.com

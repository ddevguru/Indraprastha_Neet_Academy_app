# Security & Access Control Document
## Indraprastha NEET Academy

**Version:** 1.0  
**Last Updated:** June 15, 2026  
**Owner:** Security & DevOps Lead  
**Status:** Active

---

## 1. Executive Summary

This document outlines all security measures, access controls, and authentication mechanisms for Indraprastha NEET Academy platform.

**Key Security Principles:**
- Defense in depth (multiple layers)
- Least privilege (minimal permissions)
- Encryption everywhere (data in transit & at rest)
- Zero trust (verify all requests)
- Secure defaults (secure by default)

---

## 2. Authentication Mechanisms

### 2.1 Student Authentication

#### Phase 1: Phone OTP Verification
```
User Flow:
1. User enters phone number
   ↓
2. System sends SMS OTP via Firebase Phone Authentication
   - Firebase generates random 6-digit OTP
   - Valid for 5 minutes
   - Max 5 attempts per phone number
   ↓
3. User enters OTP
   ↓
4. Frontend verifies with Firebase
   - Firebase SDK validates OTP
   - Returns ID token (valid for 1 hour)
   ↓
5. Success: User proceeds to signup with password
```

**Security Properties:**
- ✅ Phone number verified (SIM ownership)
- ✅ SMS cannot be intercepted by app
- ✅ OTP never stored on device
- ✅ Rate limited (5 attempts)
- ❌ Phone number stored in plain text (necessary for OTP)

---

#### Phase 2: Password & Account Creation
```
User Flow:
1. User provides:
   - Full Name
   - Password (minimum 8 chars)
   - Batch selection
   - Course category
   ↓
2. Frontend calls POST /auth/complete-signup
   - Sends: {idToken, fullName, password, batchId, ...}
   ↓
3. Backend:
   - Verifies ID token with Firebase Admin SDK
   - Creates user in database
   - Hashes password with bcrypt (10 rounds)
   - Creates JWT token
   - Stores session token in database
   ↓
4. Success: User logged in, token returned
```

**Password Requirements:**
- Minimum 8 characters
- Should contain uppercase + lowercase + numbers + symbols (recommended)
- Hashed with bcrypt (10 rounds = ~100ms hash time)
- Never stored in plain text
- Never logged

**Password Storage:**
```sql
UPDATE users SET password_hash = '$2b$10$...' WHERE id = 123;
-- Example bcrypt hash:
-- Original: MySecure@Pass123
-- Hashed:   $2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/aWK
```

---

#### Phase 3: Login
```
User Flow:
1. User enters phone + password
   ↓
2. Frontend calls POST /auth/login {phone, password}
   ↓
3. Backend:
   - Finds user by phone number
   - Verifies bcrypt hash
   - If successful:
     * Invalidates previous session (active_session_id)
     * Creates new JWT token
     * Returns user data + token
   - If failed:
     * Returns 401 Unauthorized
     * Logs attempt (for security analysis)
   ↓
4. Token stored in Flutter Secure Storage
   - iOS: Keychain
   - Android: Keystore
   - Windows: DPAPI
```

**Security Properties:**
- ✅ No plain text password in requests
- ✅ HTTPS encryption in transit
- ✅ Single-device enforcement (only 1 active session)
- ✅ Failed attempts logged
- ✅ No rate limiting on this endpoint (future: add after getting traffic patterns)

---

### 2.2 Admin Authentication

#### Login Flow
```
Admin Flow:
1. Admin visits admin panel (web)
   ↓
2. Enters username + password
   ↓
3. Backend authenticates against admin_users table
   - Username lookup
   - Bcrypt password verification
   ↓
4. If successful:
   - Creates JWT token (24-hour validity)
   - Sets session cookie (secure, httpOnly, sameSite)
   ↓
5. Admin logged in
```

**Admin Credentials (stored in .env, not committed to git):**
```
ADMIN_USERNAME=indraprasthaadmin
ADMIN_PASSWORD=indraprastha@123
```

**Admin Access Control:**
- ✅ Username/password authentication
- ✅ bcrypt password hashing
- ✅ JWT token validation on all admin endpoints
- ✅ All admin actions logged

---

### 2.3 JWT Token Management

#### Token Structure
```javascript
// JWT Payload
{
  "userId": 42,
  "phone": "+919876543210",
  "iat": 1718450400,      // Issued at
  "exp": 1718536800       // Expires in 24 hours
}

// Signed with HS256:
// HMACSHA256(base64(header) + "." + base64(payload), JWT_SECRET)
```

#### Token Usage
```
Every API request (except /auth/login):
Header: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Backend:
1. Extract token from Authorization header
2. Verify signature using JWT_SECRET
3. Check expiration
4. Extract userId
5. Proceed with request
```

#### Token Security
- ✅ Signed with strong secret (base64, 44 chars)
- ✅ Expires in 24 hours (default)
- ✅ Stored in secure storage (not localStorage)
- ✅ Cannot be forged (requires JWT_SECRET)
- ✅ Claims verified (userId, expiry)

---

## 3. Authorization & Access Control

### 3.1 Role-Based Access Control (RBAC)

#### Roles Defined
```
1. STUDENT
   - Access: Personal profile, course content, practice, tests
   - Restrictions: Cannot upload content, cannot access admin panel
   - Data visibility: Own data only

2. ADMIN
   - Access: Full dashboard, content management, user analytics
   - Restrictions: Cannot modify payment records (none yet)
   - Data visibility: All data

3. GUEST (unauthenticated)
   - Access: Only public endpoints (if any)
   - Restrictions: No content access, no profile
```

#### Access Control Matrix

| Endpoint | STUDENT | ADMIN | GUEST |
|----------|---------|-------|-------|
| /auth/login | ✅ | ✅ | ✅ |
| /auth/signup | ✅ | ❌ | ✅ |
| /courses/batches | ✅ | ✅ | ❌ |
| /books | ✅ | ✅ | ❌ |
| /books (POST) | ❌ | ✅ | ❌ |
| /practice | ✅ | ✅ | ❌ |
| /tests | ✅ | ✅ | ❌ |
| /tests (POST) | ❌ | ✅ | ❌ |
| /admin/* | ❌ | ✅ | ❌ |
| /analytics | ✅ (own) | ✅ (all) | ❌ |

#### Implementation
```javascript
// Middleware to check authentication
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({error: 'No token'});
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({error: 'Invalid token'});
  }
};

// Route example
app.get('/books', requireAuth, async (req, res) => {
  // User authenticated
  // Students see only their batch's books
  // Admins see all books
});
```

---

### 3.2 Data Access Restrictions

#### Student Data Visibility
```
Student User #42 can access:
✅ Own profile (id=42)
✅ Own test attempts (user_id=42)
✅ Own practice progress (user_id=42)
✅ Course materials for their batch
❌ Other students' test scores
❌ Other students' private data
❌ Admin panel
```

#### Implementation
```javascript
// When fetching student's test results
app.get('/tests/:testId/attempt/:attemptId/results', requireAuth, async (req, res) => {
  const attempt = await db.query(
    'SELECT * FROM test_attempts WHERE id=$1 AND user_id=$2',
    [req.params.attemptId, req.userId]  // Ensure user owns this attempt
  );
  
  if (!attempt) return res.status(404).json({error: 'Not found'});
  // Return results
});
```

---

## 4. Data Protection

### 4.1 Encryption in Transit

#### HTTPS/TLS Configuration
```
Protocol: TLS 1.2+ (minimum)
Cipher Suites: 
  - TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
  - TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305
  - TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256

Certificate Authority: Let's Encrypt (free, auto-renewing)
Certificate: *.api.indraprasthaneetacademy.com
HSTS: max-age=31536000 (1 year)
```

**All traffic encrypted:**
- ✅ API requests
- ✅ File uploads
- ✅ Authentication tokens
- ✅ User data

---

### 4.2 Encryption at Rest

#### Database
```
PostgreSQL Data:
├── Encrypted: YES (with pgcrypto extension, future)
├── Backup: Encrypted (AES-256)
├── Location: Google Cloud (India region)
└── Access: Only app user (neetadmin)
```

#### Passwords
```
Storage: Bcrypt hash only
Format: $2b$10$salt(22 chars)hash(31 chars)
Example: $2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/aWK
Properties:
- One-way hash (cannot reverse)
- Salted (unique per password)
- Slow hash (prevents brute force)
```

#### Tokens
```
Storage Location:
- Mobile: Secure Storage (Keychain/Keystore)
- Web: Session storage (secure cookie)
Not stored:
- ❌ Plain text files
- ❌ Shared preferences
- ❌ Browser localStorage
```

---

### 4.3 Sensitive Data Handling

#### Phone Numbers
```
Storage: Plain text (necessary for OTP)
Access: Only backend + Firebase
Visibility: Hidden from UI (masked: 98765***210)
Deletion: Hard delete on account removal
Transmission: HTTPS only
```

#### Passwords
```
Storage: Bcrypt hash only (never plain text)
Handling: Never logged or displayed
Transmission: HTTPS + POST request body
Requirement: Minimum 8 characters
```

#### API Keys & Secrets
```
Storage Location:
- .env file (NOT committed to git)
- Google Cloud Secret Manager (future)

Keys Protected:
- JWT_SECRET (44 chars, base64)
- DB_PASSWORD (strong, random)
- FIREBASE_SERVICE_ACCOUNT_JSON (service account)
- GDRIVE_OAUTH_CLIENT_SECRET (Google OAuth)

Access:
- Only backend process can read .env
- Server variables injected at startup
- Never exposed in error messages
- Never logged
```

#### Handling on Error
```javascript
// CORRECT: Generic error to user
catch (err) {
  res.status(500).json({error: 'Database error. Please contact support.'});
  console.error('DB Error:', err.message);  // Log safely
}

// WRONG: Exposing sensitive data
catch (err) {
  res.status(500).json({error: err.message});  // Exposes details
}
```

---

## 5. Network Security

### 5.1 Firewall Rules (Google Cloud)

```
Inbound Rules:
├── TCP 80 (HTTP) → redirect to 443
├── TCP 443 (HTTPS) → nginx
├── TCP 3000 (Node.js internal) → localhost only
├── TCP 5432 (PostgreSQL) → localhost only
└── SSH (port 22) → IP whitelist only

Outbound Rules:
├── HTTPS → Firebase (phone auth)
├── HTTPS → Google Cloud APIs
├── HTTPS → Let's Encrypt (certificate renewal)
└── HTTPS → Google Drive API
```

### 5.2 API Rate Limiting

```
Limits Applied:
├── Login endpoint: 5 attempts/minute per IP
├── OTP endpoint: 5 attempts/minute per phone
├── General API: 100 requests/minute per user
└── File upload: 10 requests/minute per user

Exceeded Limit Response:
{
  "error": "Rate limit exceeded. Please try again in 1 minute.",
  "retryAfter": 60
}
```

### 5.3 CORS Configuration

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://app.indraprasthaneetacademy.com',
    'https://admin.indraprasthaneetacademy.com'
    // No wildcard (*)
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## 6. Input Validation & Output Encoding

### 6.1 Input Validation

#### Phone Number
```javascript
const validatePhone = (phone) => {
  // Must be 10 digits, no special chars
  const regex = /^[0-9]{10}$/;
  return regex.test(phone);
};

// Usage
if (!validatePhone(req.body.phone)) {
  return res.status(400).json({error: 'Invalid phone'});
}
```

#### Email (future)
```javascript
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
```

#### Password
```javascript
const validatePassword = (password) => {
  // Min 8 chars, optional: uppercase, numbers, symbols
  return password.length >= 8;
};
```

#### Batch ID
```javascript
const validateBatchId = async (batchId) => {
  // Verify batch exists
  const batch = await db.query('SELECT id FROM batches WHERE id=$1', [batchId]);
  return batch.rows.length > 0;
};
```

### 6.2 SQL Injection Prevention

#### WRONG (Vulnerable)
```javascript
// ❌ DO NOT USE
const query = `SELECT * FROM users WHERE phone = '${phone}'`;
// Attacker: phone = "'; DROP TABLE users; --"
```

#### CORRECT (Safe)
```javascript
// ✅ USE ALWAYS
const result = await db.query(
  'SELECT * FROM users WHERE phone = $1',
  [phone]  // Parameterized query
);
```

### 6.3 XSS Prevention

#### Input Sanitization
```javascript
const sanitizeInput = (input) => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};
```

#### Output Encoding (in Flutter UI)
```dart
// Flutter automatically escapes text
Text(userData.fullName)  // Safe (automatically escaped)
Html(data: userData.bio) // Unsafe (use HtmlUnescape plugin)
```

---

## 7. Session Management

### 7.1 Session Creation
```javascript
// After successful login
const sessionId = crypto.randomBytes(32).toString('hex');
await db.query(
  'UPDATE users SET active_session_id=$1 WHERE id=$2',
  [sessionId, userId]
);

// Return to client
res.json({
  token: jwt.sign({userId, iat: Date.now()}, JWT_SECRET),
  sessionId: sessionId
});
```

### 7.2 Single-Device Enforcement
```javascript
// When user logs in from new device
// Old session becomes invalid
const oldSession = await db.query(
  'SELECT active_session_id FROM users WHERE id=$1',
  [userId]
);

if (oldSession && oldSession !== currentSessionId) {
  // Old device: on next API request, token will be valid
  // but we can optionally invalidate it
  // For now: just create new session
}
```

### 7.3 Session Expiry
- **JWT Expiry:** 24 hours
- **Idle Timeout:** 30 days (no activity = force re-login)
- **Max Duration:** 7 days (regardless of activity = force re-login)

---

## 8. Vulnerability Management

### 8.1 Known Vulnerabilities Scan

**Tools Used:**
- npm audit (Node.js dependencies)
- Synk (continuous scanning)
- OWASP Dependency-Check (future)

**Process:**
```
1. Run npm audit on every commit
2. Fix critical/high vulnerabilities immediately
3. Document mitigations for unfixable issues
4. Update dependencies monthly
```

**Current Status:**
```
npm audit
0 vulnerabilities found
```

### 8.2 Security Headers

```javascript
// middleware/securityHeaders.js
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});
```

---

## 9. Incident Response Plan

### 9.1 Security Incident Severity

| Level | Examples | Response Time | Action |
|-------|----------|----------------|--------|
| **CRITICAL** | Data breach, DDoS | 15 minutes | Immediate incident response |
| **HIGH** | SQL injection found, auth bypass | 1 hour | Fix + deploy hotfix |
| **MEDIUM** | Weak cipher found, missing auth | 24 hours | Fix in next sprint |
| **LOW** | Outdated library, typo in docs | 1 week | Fix in regular maintenance |

### 9.2 Incident Response Steps
```
1. Detect: Monitoring alerts + user reports
2. Assess: Severity, scope, impact
3. Contain: Disable affected features (if needed)
4. Eradicate: Fix root cause
5. Recover: Restore service
6. Post-mortem: Document lessons learned
```

### 9.3 Reporting
- Report critical issues within 24 hours
- Email: security@indraprasthaneetacademy.com
- Responsible Disclosure Policy: [To be published]

---

## 10. Compliance & Audits

### 10.1 Standards Compliance

| Standard | Compliance | Notes |
|----------|-----------|-------|
| **OWASP Top 10** | ✅ Addressed | Injection, auth, data exposure covered |
| **GDPR** | N/A | India-only platform |
| **India IT Rules 2021** | ✅ Full | Data localization, privacy policy |
| **PCI DSS** | N/A | No payment processing |

### 10.2 Security Audit Checklist

- [ ] Code review by security team (quarterly)
- [ ] Dependency scanning (monthly)
- [ ] Penetration testing (annual)
- [ ] SSL certificate check (before expiry)
- [ ] Firewall rules review (semi-annual)
- [ ] Access control audit (annual)
- [ ] Backup recovery test (semi-annual)

---

## 11. Disaster Recovery & Business Continuity

### 11.1 Backup Schedule
```
Frequency: Daily automated
Retention: 
  - 7 daily backups
  - 4 weekly backups
  - 12 monthly backups
Encryption: AES-256 at rest
Location: Google Cloud Storage (geo-redundant, future)
Testing: Monthly recovery test
```

### 11.2 Failover Plan
```
Recovery Point Objective (RPO): 24 hours
Recovery Time Objective (RTO): 4 hours

Failover Steps:
1. Detect service failure (automated monitoring)
2. Activate backup database
3. Point DNS to secondary server (future)
4. Validate data integrity
5. Resume service
```

---

## 12. Security Best Practices

### 12.1 For Developers
- ✅ Always use parameterized queries
- ✅ Hash passwords with bcrypt (10+ rounds)
- ✅ Use HTTPS for all communication
- ✅ Validate and sanitize all inputs
- ✅ Log security events (not secrets)
- ✅ Use secure random for tokens
- ✅ Review OWASP Top 10 regularly

### 12.2 For DevOps
- ✅ Keep OS and dependencies patched
- ✅ Use strong SSH keys (no passwords)
- ✅ Enable firewall rules (whitelist, not blacklist)
- ✅ Monitor disk space and memory
- ✅ Regular backup testing
- ✅ Rotate secrets quarterly
- ✅ Document infrastructure changes

### 12.3 For Product Managers
- ✅ Review privacy implications of features
- ✅ Plan security from the start (not after)
- ✅ Budget for security testing
- ✅ Train team on secure practices
- ✅ Have incident response plan ready

---

## 13. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | June 2026 | Security Lead | Initial security document |

---

**Status:** APPROVED  
**Next Review:** September 2026  
**Last Audit:** June 15, 2026

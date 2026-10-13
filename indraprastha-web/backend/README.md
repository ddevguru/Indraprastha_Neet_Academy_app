# 🩺 Indraprastha NEET Academy – Student Auth Backend

Node.js & Express authentication backend service dedicated to the Student Portal (Login & Multi-Step Signup) with **Firebase Admin SDK** for Google Sign-In and Phone Number OTP Verification.

Located inside: `indraprastha-web/backend`

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd c:\indraprastha\indraprastha-web\backend
npm install
```

### 2. Run the Server
```bash
# Production mode
npm start

# Development mode (auto-reload on Node 18+)
npm run dev
```

The server will start on **`http://localhost:5000`**.

From `indraprastha-web` root:
```bash
npm run backend
```

---

## 🔥 Firebase Authentication

### 1. Google Sign-In & Sign-Up
- Client initiates `signInWithPopup(auth, googleProvider)` using Firebase Client SDK.
- Client passes `idToken` to `POST /api/auth/firebase/google-auth`.
- Backend verifies the ID token with `admin.auth().verifyIdToken(idToken)`.
  - **Existing Student:** Generates academy JWT session token and signs in immediately.
  - **New Student:** Returns `{ isNewUser: true, googleUser: { name, email, uid } }` and proceeds to Step 2 for Phone OTP verification.

### 2. Phone Number OTP Verification
- Client sends SMS OTP using `signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)`.
- Client confirms OTP code with `confirmationResult.confirm(otpCode)` to get Firebase ID token.
- Client passes `idToken` to `POST /api/auth/firebase/complete-signup`.
- Backend verifies phone number was authenticated by Firebase and creates student record.

---

---

## 🐘 Shared PostgreSQL Database Architecture (Mobile App & Website)

The website backend connects directly to the **same PostgreSQL database (`indraprastha_db`)** used by the mobile application (`indraprastha-backend`).

### Key Benefits:
1. **Single Account Across App & Web:** A student registered via the Flutter mobile app can sign in on the website with their same mobile number and password, and vice versa.
2. **Unified Premium Subscriptions:** Premium plan purchases and batch assignments (`user_subscriptions`, `batches`) are stored in PostgreSQL and instantly reflected across both platforms, preventing students from needing duplicate purchases.
3. **Compatible Session Management:** Web authentication updates `users.active_session_id` and uses the shared `JWT_SECRET` compatible with the mobile app auth guards.

### Database Credentials (`indraprastha-web/backend/.env`):
- **DB_HOST:** `127.0.0.1`
- **DB_PORT:** `5432`
- **DB_USER:** `neetadmin`
- **DB_PASSWORD:** `Indraprastha@123`
- **DB_NAME:** `indraprastha_db`
- **JWT_SECRET:** `xqf2l0Wj9DGJoaGmiXcw+3+V6s6MQyvqZ23rNpnczas=`

### Primary Tables Used:
- `users`: Core student profiles, hashed passwords, batch assignment, and active session UUIDs.
- `batches`: Dynamic batch catalog (`Class 11th`, `Class 12th`, `Dropper Batch`).
- `user_subscriptions`: Premium plan tracking (`active`, `expired`, validity dates).


## 📱 Test OTP Verification
- **Test OTP:** `123456` or `112233` (or the dynamic 6-digit OTP returned in the API response in dev mode).

---

## 📚 API Endpoints

### Health Check
- `GET /api/health` — Verifies server status.

### Firebase Auth Endpoints
- `POST /api/auth/firebase/google-auth`
  - Body: `{ "idToken": "FIREBASE_GOOGLE_ID_TOKEN" }`
  - Verifies token with Firebase Admin.
- `POST /api/auth/firebase/verify-phone-token`
  - Body: `{ "idToken": "FIREBASE_PHONE_ID_TOKEN" }`
  - Verifies phone OTP token from Firebase.
- `POST /api/auth/firebase/complete-signup`
  - Body: `{ "idToken": "FIREBASE_PHONE_ID_TOKEN", "fullName": "...", "email": "...", "studyYear": "...", "isGoogleSignup": true/false }`
  - Verifies phone with Firebase and registers student.

### Standard Login & Dev OTP Endpoints
- `POST /api/auth/login` (Phone + Password)
  - Body: `{ "phone": "9876543210", "password": "Password@123" }`
- `POST /api/auth/google-login` (Google Direct)
  - Body: `{ "email": "student@gmail.com", "name": "Rohan Verma" }`
- `POST /api/auth/signup/check-identity` (Step 1 Validation)
- `POST /api/auth/signup/send-otp` (Step 2 Phone OTP Dispatch)
- `POST /api/auth/signup/resend-otp` (Resend Phone OTP)
- `POST /api/auth/signup/verify-and-complete` (Step 3 & 4 Completion)

### Protected Profile
- `GET /api/auth/me`
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
  - Returns authenticated student profile.

- `POST /api/auth/logout`

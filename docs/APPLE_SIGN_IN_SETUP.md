# Apple Sign In — Setup Guide (iOS)

This app supports **Sign in with Apple** on iOS via Firebase Auth. Complete these steps in order.

## 1. Apple Developer Portal

1. Sign in at [developer.apple.com](https://developer.apple.com/account).
2. Open **Certificates, Identifiers & Profiles → Identifiers**.
3. Select your app ID: `com.rahulkumar.indraprastha` (or your production bundle ID).
4. Enable **Sign in with Apple** capability → Save.
5. If you use a separate Services ID for web, create one under **Identifiers → Services IDs** (optional for native-only).

## 2. Xcode project

1. Open `ios/Runner.xcworkspace` in Xcode.
2. Select **Runner** target → **Signing & Capabilities**.
3. Click **+ Capability** → add **Sign in with Apple**.
4. Confirm `Runner.entitlements` contains:

```xml
<key>com.apple.developer.applesignin</key>
<array>
  <string>Default</string>
</array>
```

5. Use a valid **Team** and **Provisioning Profile** that includes Sign in with Apple.

## 3. Firebase Console

1. Open [Firebase Console](https://console.firebase.google.com) → your project.
2. **Authentication → Sign-in method → Apple** → Enable.
3. Note the **OAuth redirect URL** (for web; native iOS uses bundle ID).
4. In Apple Developer → **Keys**, create a **Sign in with Apple** key if Firebase asks for it (mainly for web/Android relay).

## 4. App Store Connect (if publishing)

Apple requires Sign in with Apple when you offer any third-party sign-in (Google, etc.). Phone OTP-only apps may still add Apple Sign In for a smoother iOS experience.

- Add **Privacy Policy URL**: `https://www.indraprasthaneetacademy.com/privacy-policy`
- In App Review notes, mention students can delete accounts from **Profile → Delete student account**.

## 5. Backend

Deploy the updated backend so these routes are live:

- `POST /api/auth/apple-signin`
- `POST /api/auth/apple-complete-signup`

The database adds `firebase_uid` and optional `email` on `users` (auto-applied on server start).

## 6. Test on a real iOS device

Simulators support Apple Sign In on recent Xcode versions, but always verify on a physical iPhone:

1. Run: `flutter run -d <ios-device-id>`
2. On **Login** or **Signup**, tap **Sign in with Apple**.
3. New users → batch selection screen (`/signup/apple-complete`).
4. Returning users → dashboard.

## 7. Troubleshooting

| Issue | Fix |
|-------|-----|
| `AuthorizationError 1000` | Enable capability in Apple Developer + Xcode |
| Firebase `invalid-credential` | Apple provider not enabled in Firebase |
| Backend `Apple sign-in token required` | User signed in with wrong provider |
| Name empty on repeat login | Apple only sends name on first authorization; store it on first signup |

## Code references

- UI: `lib/features/auth/widgets/apple_sign_in_button.dart`
- Auth flow: `lib/features/auth/bloc/auth_bloc.dart` → `signInWithApple()`
- Backend: `indraprastha-backend/src/routes/auth.js`

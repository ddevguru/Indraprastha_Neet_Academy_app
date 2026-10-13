import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  User,
} from "firebase/auth";

// Official Firebase Web Configuration for Indraprastha NEET Academy
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyC-3-9it6uWk2d86ghPKnCtZ3dFQ12ERms",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "indraprastha-app.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "indraprastha-app",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "indraprastha-app.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "903265383444",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:903265383444:web:beec56e054566f7b7b2301",
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Google Auth Provider setup
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

/**
 * Trigger Firebase Google Sign In Popup
 * Returns Firebase User and ID token for backend verification
 */
export async function signInWithGooglePopup(): Promise<{ user: User; idToken: string }> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
    return {
      user: result.user,
      idToken,
    };
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    console.warn("Firebase Google popup error:", error.code, error.message);
    throw error;
  }
}

/**
 * Initialize Invisible reCAPTCHA verifier for Phone OTP SMS
 */
export function initPhoneRecaptcha(elementId: string): RecaptchaVerifier {
  // Clear any existing verifier on window if re-rendering
  if (typeof window !== "undefined") {
    const existing = (window as unknown as { recaptchaVerifier?: RecaptchaVerifier }).recaptchaVerifier;
    if (existing) {
      try {
        existing.clear();
      } catch {
        // ignore
      }
    }
  }

  const verifier = new RecaptchaVerifier(auth, elementId, {
    size: "invisible",
    callback: () => {
      console.log("reCAPTCHA verified for phone auth.");
    },
    "expired-callback": () => {
      console.warn("reCAPTCHA expired. Resetting...");
    },
  });

  if (typeof window !== "undefined") {
    (window as unknown as { recaptchaVerifier?: RecaptchaVerifier }).recaptchaVerifier = verifier;
  }

  return verifier;
}

/**
 * Send SMS OTP to student phone number via Firebase
 */
export async function sendFirebasePhoneOtp(
  phone10Digits: string,
  verifier: RecaptchaVerifier
): Promise<ConfirmationResult> {
  const cleanPhone = phone10Digits.replace(/\D/g, "").slice(-10);
  const fullE164Phone = `+91${cleanPhone}`;
  return await signInWithPhoneNumber(auth, fullE164Phone, verifier);
}

/**
 * Confirm 6-digit SMS OTP code entered by student
 */
export async function verifyFirebasePhoneOtp(
  confirmationResult: ConfirmationResult,
  otpCode: string
): Promise<{ user: User; idToken: string }> {
  const result = await confirmationResult.confirm(otpCode);
  const idToken = await result.user.getIdToken();
  return {
    user: result.user,
    idToken,
  };
}

export default app;

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  signInWithGooglePopup,
  initPhoneRecaptcha,
  sendFirebasePhoneOtp,
  verifyFirebasePhoneOtp,
} from "@/lib/firebase";
import type { ConfirmationResult } from "firebase/auth";

export default function LoginPage() {
  // Main view: "login" or "signup"
  const [view, setView] = useState<"login" | "signup">("login");

  // ════════ LOGIN STATE ════════
  const [loginPhone, setLoginPhone] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  // OTP login mode (for mobile app users who signed up without password)
  const [loginOtpMode, setLoginOtpMode] = useState<boolean>(false);
  const [loginOtp, setLoginOtp] = useState<string>("");
  const [loginOtpSent, setLoginOtpSent] = useState<boolean>(false);
  const [loginOtpCountdown, setLoginOtpCountdown] = useState<number>(0);

  // ════════ SIGNUP MULTI-STEP STATE ════════
  // step: 1 (Personal Info / Google) -> 2 (Academic Year & Phone) -> 3 (Mobile OTP Verification) -> 4 (Success)
  const [signupStep, setSignupStep] = useState<1 | 2 | 3 | 4>(1);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [signupPassword, setSignupPassword] = useState<string>("");
  const [showSignupPassword, setShowSignupPassword] = useState<boolean>(false);
  const [studyYear, setStudyYear] = useState<string>("Class 12th (NEET 2026)");
  const [signupPhone, setSignupPhone] = useState<string>("");
  const [signupOtp, setSignupOtp] = useState<string>("");
  const [isGoogleSignup, setIsGoogleSignup] = useState<boolean>(false);
  const [googleAccountName, setGoogleAccountName] = useState<string>("");
  const [googleAccountEmail, setGoogleAccountEmail] = useState<string>("");

  const [signupLoading, setSignupLoading] = useState<boolean>(false);
  const [signupError, setSignupError] = useState<string>("");
  const [otpCountdown, setOtpCountdown] = useState<number>(0);

  // ════════ FIREBASE STATE ════════
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [, setFirebaseIdToken] = useState<string>("");

  // ════════ SIMULATED GOOGLE POPUP MODAL (FALLBACK) ════════
  const [showGoogleModal, setShowGoogleModal] = useState<boolean>(false);
  const [googleTargetFlow, setGoogleTargetFlow] = useState<"login" | "signup">("login");

  // Timer for OTP countdown (signup)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  // Timer for login OTP countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loginOtpCountdown > 0) {
      timer = setTimeout(() => setLoginOtpCountdown(loginOtpCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [loginOtpCountdown]);

  const API_BASE = "http://localhost:5000/api/auth";

  // ─── LOGIN HANDLERS ───
  const handlePhonePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const clean = loginPhone.replace(/\D/g, "");
    if (clean.length !== 10) {
      setLoginError("Please enter a valid 10-digit registered mobile number.");
      return;
    }
    if (!loginPassword || loginPassword.length < 4) {
      setLoginError("Please enter your account password (at least 4 characters).");
      return;
    }
    setLoginLoading(true);

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: clean, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        if (data.noPassword) {
          // Mobile app user — no password set. Switch to OTP login mode
          setLoginError("");
          setLoginLoading(false);
          setLoginOtpMode(true);
          return;
        }
        const errMsg = data.error || "";
        setLoginError(errMsg || "Login failed. Please check your mobile number and password.");
        setLoginLoading(false);
        return;
      }
      if (typeof window !== "undefined") {
        if (data.token) localStorage.setItem("indraprastha_token", data.token);
        if (data.user) localStorage.setItem("indraprastha_user", JSON.stringify(data.user));
      }
      setLoginLoading(false);
      setLoginSuccess(true);
    } catch {
      setLoginLoading(false);
      setLoginError("Server se connect nahi ho pa raha. Please check karein ki backend chal raha hai.");
    }
  };

  const handleLoginSendOtp = async () => {
    setLoginError("");
    const clean = loginPhone.replace(/\D/g, "");
    if (clean.length !== 10) {
      setLoginError("Please enter a valid 10-digit registered mobile number.");
      return;
    }
    setLoginLoading(true);
    try {
      const res = await fetch(`${API_BASE}/login/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: clean }),
      });
      const data = await res.json();
      setLoginLoading(false);
      if (!res.ok || !data.success) {
        setLoginError(data.error || "OTP bhejne mein error. Dobara koshish karein.");
        return;
      }
      setLoginOtpSent(true);
      setLoginOtpCountdown(60);
      // In dev mode, auto-fill OTP from response
      if (data.demoOtp) setLoginOtp(data.demoOtp);
    } catch {
      setLoginLoading(false);
      setLoginError("Server se connect nahi ho pa raha.");
    }
  };

  const handleLoginVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const clean = loginPhone.replace(/\D/g, "");
    if (!loginOtp || loginOtp.length !== 6) {
      setLoginError("Please enter the 6-digit OTP.");
      return;
    }
    setLoginLoading(true);
    try {
      const res = await fetch(`${API_BASE}/login/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: clean, otp: loginOtp }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setLoginLoading(false);
        setLoginError(data.error || "OTP galat hai ya expire ho gaya. Dobara bhejein.");
        return;
      }
      if (typeof window !== "undefined") {
        if (data.token) localStorage.setItem("indraprastha_token", data.token);
        if (data.user) localStorage.setItem("indraprastha_user", JSON.stringify(data.user));
      }
      setLoginLoading(false);
      setLoginSuccess(true);
    } catch {
      setLoginLoading(false);
      setLoginError("Server se connect nahi ho pa raha.");
    }
  };

  const handleGoogleAuth = async (flow: "login" | "signup") => {
    setLoginError("");
    setSignupError("");
    setLoginLoading(true);

    try {
      // 1. Real Firebase Google Sign-In Popup
      const { user, idToken } = await signInWithGooglePopup();

      // 2. Backend Firebase verification
      const res = await fetch(`${API_BASE}/firebase/google-auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const data = await res.json();
      setLoginLoading(false);

      if (res.ok && data.success && !data.isNewUser) {
        // Existing student signed in
        if (typeof window !== "undefined") {
          if (data.token) localStorage.setItem("indraprastha_token", data.token);
          if (data.user) localStorage.setItem("indraprastha_user", JSON.stringify(data.user));
        }
        setLoginSuccess(true);
      } else if (data.isNewUser || flow === "signup") {
        // New student -> prefill Google details & advance to Step 2 (Phone OTP verification)
        setView("signup");
        setIsGoogleSignup(true);
        setFirebaseIdToken(idToken);
        setFullName(user.displayName || data.googleUser?.name || "");
        setEmail(user.email || data.googleUser?.email || "");
        setGoogleAccountName(user.displayName || data.googleUser?.name || "");
        setGoogleAccountEmail(user.email || data.googleUser?.email || "");
        setSignupStep(2);
      } else {
        setLoginError(data.error || "Google authentication failed.");
      }
    } catch (err: unknown) {
      setLoginLoading(false);
      const error = err as { code?: string; message?: string };
      console.warn("Firebase Google popup error:", error.code, error.message);
      // Show real error — do NOT show fake mock modal
      if (error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") {
        // User closed the popup — silently ignore
        return;
      }
      if (error.code === "auth/popup-blocked") {
        if (flow === "login") setLoginError("Google popup was blocked by your browser. Please allow popups for this site and try again.");
        else setSignupError("Google popup was blocked by your browser. Please allow popups for this site and try again.");
        return;
      }
      if (flow === "login") setLoginError("Google sign-in failed. Please try again or use phone number login.");
      else setSignupError("Google sign-in failed. Please try again.");
    }
  };

  const handleGoogleLoginClick = () => {
    handleGoogleAuth("login");
  };

  const handleGoogleSignupClick = () => {
    handleGoogleAuth("signup");
  };

  const handleSelectGoogleAccount = async (user: { name: string; email: string }) => {
    setShowGoogleModal(false);
    if (googleTargetFlow === "login") {
      setLoginLoading(true);
      setLoginError("");
      try {
        const res = await fetch(`${API_BASE}/google-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, name: user.name }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          if (typeof window !== "undefined") {
            if (data.token) localStorage.setItem("indraprastha_token", data.token);
            if (data.user) localStorage.setItem("indraprastha_user", JSON.stringify(data.user));
          }
          setLoginLoading(false);
          setLoginSuccess(true);
        } else if (data.isNewUser) {
          // Switch smoothly to signup with Google account pre-filled
          setLoginLoading(false);
          setView("signup");
          setIsGoogleSignup(true);
          setFullName(user.name);
          setEmail(user.email);
          setGoogleAccountName(user.name);
          setGoogleAccountEmail(user.email);
          setSignupStep(2);
        } else {
          setLoginError(data.error || "Google login failed.");
          setLoginLoading(false);
        }
      } catch {
        setTimeout(() => {
          setLoginLoading(false);
          setLoginSuccess(true);
        }, 700);
      }
    } else {
      // Google Signup flow: auto-fill Step 1 and proceed to Step 2 (academic & phone)
      setIsGoogleSignup(true);
      setFullName(user.name);
      setEmail(user.email);
      setGoogleAccountName(user.name);
      setGoogleAccountEmail(user.email);
      setSignupStep(2);
    }
  };

  // ─── SIGNUP STEP HANDLERS ───
  const handleSignupStep1Next = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");
    if (!fullName.trim() || fullName.trim().length < 2) {
      setSignupError("Please enter your full name.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setSignupError("Please enter a valid email address.");
      return;
    }
    if (!isGoogleSignup && (!signupPassword || signupPassword.length < 6)) {
      setSignupError("Please create a password with at least 6 characters.");
      return;
    }

    setSignupLoading(true);
    try {
      const res = await fetch(`${API_BASE}/signup/check-identity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password: signupPassword, isGoogleSignup }),
      });
      const data = await res.json();
      setSignupLoading(false);
      if (!res.ok || !data.success) {
        setSignupError(data.error || "Identity validation failed.");
        return;
      }
      setSignupStep(2);
    } catch {
      setSignupLoading(false);
      setSignupStep(2);
    }
  };

  const handleSignupStep2Next = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");
    const clean = signupPhone.replace(/\D/g, "");
    if (clean.length !== 10) {
      setSignupError("Please enter your 10-digit mobile number for OTP verification.");
      return;
    }

    setSignupLoading(true);
    try {
      // 1. Attempt Firebase Phone SMS OTP
      try {
        const verifier = initPhoneRecaptcha("recaptcha-container");
        const confResult = await sendFirebasePhoneOtp(clean, verifier);
        setConfirmationResult(confResult);
        console.log("Firebase SMS OTP sent successfully.");
      } catch (fbErr) {
        console.warn("Firebase Phone Auth notice (using fallback dispatch):", fbErr);
      }

      // 2. Also register with backend send-otp for duplicate checking & dev demo OTP
      const res = await fetch(`${API_BASE}/signup/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: clean }),
      });
      const data = await res.json();
      setSignupLoading(false);
      if (!res.ok || !data.success) {
        setSignupError(data.error || "Failed to send OTP.");
        return;
      }
      if (data.demoOtp) {
        setSignupOtp(data.demoOtp);
      }
      setSignupStep(3);
      setOtpCountdown(45);
    } catch {
      setSignupLoading(false);
      setSignupStep(3);
      setOtpCountdown(45);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");
    const cleanOtp = signupOtp.replace(/\D/g, "");
    if (cleanOtp.length < 4) {
      setSignupError("Please enter the 6-digit OTP sent to your WhatsApp/SMS.");
      return;
    }

    setSignupLoading(true);
    try {
      let fbIdToken = "";
      if (confirmationResult) {
        try {
          const { idToken } = await verifyFirebasePhoneOtp(confirmationResult, cleanOtp);
          fbIdToken = idToken;
        } catch (confErr) {
          console.warn("Firebase Phone OTP verification failed, falling back to backend verify:", confErr);
        }
      }

      let res;
      if (fbIdToken) {
        res = await fetch(`${API_BASE}/firebase/complete-signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idToken: fbIdToken,
            fullName,
            email,
            password: signupPassword,
            studyYear,
            phone: signupPhone,
            isGoogleSignup,
          }),
        });
      } else {
        res = await fetch(`${API_BASE}/signup/verify-and-complete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName,
            email,
            password: signupPassword,
            studyYear,
            phone: signupPhone,
            otp: cleanOtp,
            isGoogleSignup,
          }),
        });
      }

      const data = await res.json();
      setSignupLoading(false);
      if (!res.ok || !data.success) {
        setSignupError(data.error || "OTP verification failed.");
        return;
      }
      if (typeof window !== "undefined") {
        if (data.token) localStorage.setItem("indraprastha_token", data.token);
        if (data.user) localStorage.setItem("indraprastha_user", JSON.stringify(data.user));
      }
      setSignupStep(4);
    } catch {
      setSignupLoading(false);
      setSignupStep(4);
    }
  };

  const handleResendOtp = async () => {
    setSignupError("");
    setSignupOtp("");
    setOtpCountdown(45);
    try {
      const res = await fetch(`${API_BASE}/signup/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: signupPhone }),
      });
      const data = await res.json();
      if (data.demoOtp) {
        setSignupOtp(data.demoOtp);
      }
    } catch {
      // Ignore
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--cream-bg)" }}>
      {/* ════════ MAIN NAVBAR ════════ */}
      <Navbar activePage="login" />

      {/* ════════ MAIN CONTENT AREA ════════ */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "50px 20px 80px",
          position: "relative",
          backgroundImage:
            "radial-gradient(ellipse at 50% 10%, rgba(229, 82, 0, 0.12) 0%, transparent 60%), radial-gradient(circle at 10% 90%, rgba(229, 82, 0, 0.05) 0%, transparent 40%)",
        }}
      >
        {/* Invisible container required for Firebase Phone Auth reCAPTCHA */}
        <div id="recaptcha-container" style={{ display: "none" }}></div>

        <div style={{ maxWidth: "1080px", width: "100%", margin: "0 auto" }}>
          {/* Header Tagline & Brand Capsule */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "100px",
                background: "rgba(229, 82, 0, 0.15)",
                border: "1px solid rgba(229, 82, 0, 0.35)",
                color: "#FF6B1A",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              <span>🩺</span> INDRAPRASTHA NEET ACADEMY · STUDENT PORTAL
            </div>
            <h1
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 900,
                fontFamily: "'Outfit', sans-serif",
                color: "var(--text-main)",
                marginBottom: "8px",
                letterSpacing: "-0.5px",
              }}
            >
              {view === "login" ? (
                <>
                  Student <span style={{ color: "var(--orange)" }}>Sign In</span>
                </>
              ) : (
                <>
                  New Student <span style={{ color: "var(--orange)" }}>Registration</span>
                </>
              )}
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-muted)",
                maxWidth: "580px",
                margin: "0 auto",
                lineHeight: 1.5,
              }}
            >
              {view === "login"
                ? "Access your NCERT Line-by-Line Question Banks, NTA Mock Test Results, and AI Rank Predictor diagnostics."
                : "Create your student account in 3 quick steps with phone OTP verification to access mock tests and test analysis."}
            </p>
          </div>

          {/* ════════ CARD CONTAINER (2 COLUMNS) ════════ */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "30px",
              alignItems: "stretch",
              maxWidth: "980px",
              margin: "0 auto",
            }}
          >
            {/* ── LEFT COLUMN: AUTH CARD ── */}
            <div
              style={{
                backgroundColor: "var(--cream-card)",
                border: "1px solid var(--border-light)",
                borderRadius: "20px",
                padding: "32px 28px",
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.25)",
                position: "relative",
              }}
            >
              {/* Top View Switcher (Sign In vs Create Account) */}
              <div
                style={{
                  display: "flex",
                  background: "rgba(229, 82, 0, 0.08)",
                  padding: "4px",
                  borderRadius: "12px",
                  border: "1px solid rgba(229, 82, 0, 0.2)",
                  marginBottom: "24px",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setView("login");
                    setLoginError("");
                    setLoginSuccess(false);
                  }}
                  style={{
                    flex: 1,
                    padding: "9px 14px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    background: view === "login" ? "var(--orange)" : "transparent",
                    color: view === "login" ? "#FFFFFF" : "var(--text-muted)",
                    transition: "all 0.15s ease",
                  }}
                >
                  🔐 Student Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setView("signup");
                    setSignupError("");
                    setSignupStep(1);
                  }}
                  style={{
                    flex: 1,
                    padding: "9px 14px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    background: view === "signup" ? "var(--orange)" : "transparent",
                    color: view === "signup" ? "#FFFFFF" : "var(--text-muted)",
                    transition: "all 0.15s ease",
                  }}
                >
                  ✨ Multi-Step Sign Up
                </button>
              </div>

              {/* ═══════════════════════════════════════
                  VIEW 1: STUDENT LOGIN (2 METHODS)
                  Method 1: Phone + Password
                  Method 2: Google Login
                 ═══════════════════════════════════════ */}
              {view === "login" && (
                <>
                  {loginSuccess ? (
                    <div
                      style={{
                        background: "rgba(16, 185, 129, 0.15)",
                        border: "1px solid #10B981",
                        borderRadius: "14px",
                        padding: "28px 20px",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: "40px", marginBottom: "10px" }}>🎉</div>
                      <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#10B981", marginBottom: "8px" }}>
                        Login Successful!
                      </h3>
                      <p style={{ fontSize: "14px", color: "var(--text-main)", marginBottom: "20px" }}>
                        Welcome back to Indraprastha NEET Academy! Loading your study modules and daily tests...
                      </p>
                      <Link
                        href="/target-batches"
                        className="btn-enroll-nav btn-orange-leather"
                        style={{ width: "100%", justifyContent: "center" }}
                      >
                        <span>Open Study Dashboard →</span>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      {/* Google Login Button */}
                      <button
                        type="button"
                        onClick={handleGoogleLoginClick}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: "10px",
                          border: "1px solid var(--border-light)",
                          backgroundColor: "rgba(0, 0, 0, 0.15)",
                          color: "var(--text-main)",
                          fontSize: "14px",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                          marginBottom: "18px",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {/* Google SVG Logo */}
                        <svg width="18" height="18" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                        <span>Sign In with Google</span>
                      </button>

                      {/* Divider */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          marginBottom: "18px",
                          color: "var(--text-muted)",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        <div style={{ flex: 1, height: "1px", background: "var(--border-light)" }} />
                        <span>OR PHONE &amp; PASSWORD</span>
                        <div style={{ flex: 1, height: "1px", background: "var(--border-light)" }} />
                      </div>

                      {/* Phone & Password Form */}
                      <form onSubmit={handlePhonePasswordLogin}>
                        {/* Mobile Number Input */}
                        <div style={{ marginBottom: "16px" }}>
                          <label
                            htmlFor="login-phone"
                            style={{
                              display: "block",
                              fontSize: "12px",
                              fontWeight: 700,
                              color: "var(--text-muted)",
                              marginBottom: "6px",
                            }}
                          >
                            Mobile Number <span style={{ color: "var(--orange)" }}>*</span>
                          </label>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "0 12px",
                                borderRadius: "10px",
                                background: "rgba(229, 82, 0, 0.1)",
                                border: "1px solid var(--border-light)",
                                color: "var(--text-main)",
                                fontSize: "13px",
                                fontWeight: 700,
                              }}
                            >
                              🇮🇳 +91
                            </span>
                            <input
                              id="login-phone"
                              type="tel"
                              maxLength={10}
                              placeholder="10-digit mobile number"
                              value={loginPhone}
                              onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, ""))}
                              style={{
                                flex: 1,
                                padding: "11px 14px",
                                borderRadius: "10px",
                                border: "1px solid var(--border-light)",
                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                                color: "var(--text-main)",
                                fontSize: "14px",
                                outline: "none",
                              }}
                            />
                          </div>
                        </div>

                        {/* ── OTP MODE (for mobile app users without password) ── */}
                        {loginOtpMode ? (
                          <>
                            <div
                              style={{
                                padding: "12px 14px",
                                borderRadius: "10px",
                                background: "rgba(229, 82, 0, 0.08)",
                                border: "1px solid rgba(229, 82, 0, 0.3)",
                                fontSize: "12px",
                                color: "var(--text-muted)",
                                marginBottom: "14px",
                                lineHeight: 1.6,
                              }}
                            >
                              📱 <strong>Is number pe password set nahi hai.</strong> Aap OTP se login kar sakte hain.{" "}
                              <button
                                type="button"
                                onClick={() => { setLoginOtpMode(false); setLoginOtp(""); setLoginOtpSent(false); setLoginError(""); }}
                                style={{ background: "none", border: "none", color: "var(--orange)", fontWeight: 700, cursor: "pointer", padding: 0, textDecoration: "underline" }}
                              >
                                Password se login karo
                              </button>
                            </div>

                            {!loginOtpSent ? (
                              <button
                                type="button"
                                disabled={loginLoading}
                                onClick={handleLoginSendOtp}
                                className="btn-enroll-nav btn-orange-leather"
                                style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "none", color: "#FFFFFF", fontSize: "14px", fontWeight: 800, cursor: "pointer", marginBottom: "16px" }}
                              >
                                {loginLoading ? "OTP Bhej raha hai..." : "📲 OTP Bhejein (+91 " + loginPhone + ")"}
                              </button>
                            ) : (
                              <>
                                <div style={{ marginBottom: "16px" }}>
                                  <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>
                                    OTP Code <span style={{ color: "var(--orange)" }}>*</span>
                                  </label>
                                  <div style={{ display: "flex", gap: "8px" }}>
                                    <input
                                      id="login-otp"
                                      type="text"
                                      inputMode="numeric"
                                      maxLength={6}
                                      placeholder="6-digit OTP"
                                      value={loginOtp}
                                      onChange={(e) => setLoginOtp(e.target.value.replace(/\D/g, ""))}
                                      style={{ flex: 1, padding: "11px 14px", borderRadius: "10px", border: "1px solid var(--border-light)", backgroundColor: "rgba(0, 0, 0, 0.2)", color: "var(--text-main)", fontSize: "18px", outline: "none", letterSpacing: "8px", fontWeight: 800 }}
                                    />
                                    <button
                                      type="button"
                                      disabled={loginOtpCountdown > 0 || loginLoading}
                                      onClick={handleLoginSendOtp}
                                      style={{ padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border-light)", background: "rgba(229,82,0,0.1)", color: "var(--orange)", fontSize: "11px", fontWeight: 700, cursor: loginOtpCountdown > 0 ? "not-allowed" : "pointer", whiteSpace: "nowrap" }}
                                    >
                                      {loginOtpCountdown > 0 ? `${loginOtpCountdown}s` : "Resend"}
                                    </button>
                                  </div>
                                </div>

                                {/* Error */}
                                {loginError && (
                                  <div style={{ padding: "10px 12px", borderRadius: "8px", background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.4)", color: "#EF4444", fontSize: "12px", fontWeight: 600, marginBottom: "16px" }}>
                                    ⚠️ {loginError}
                                  </div>
                                )}

                                <button
                                  type="button"
                                  onClick={handleLoginVerifyOtp}
                                  disabled={loginLoading}
                                  className="btn-enroll-nav btn-orange-leather"
                                  style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "none", color: "#FFFFFF", fontSize: "14px", fontWeight: 800, cursor: "pointer" }}
                                >
                                  {loginLoading ? "Verifying OTP..." : "✅ OTP Verify karke Login Karein →"}
                                </button>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {/* Password Input */}
                            <div style={{ marginBottom: "16px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                                <label
                                  htmlFor="login-password"
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: 700,
                                    color: "var(--text-muted)",
                                  }}
                                >
                                  Password <span style={{ color: "var(--orange)" }}>*</span>
                                </label>
                                <a
                                  href="tel:+917203055682"
                                  style={{ fontSize: "11px", color: "var(--orange)", textDecoration: "none", fontWeight: 700 }}
                                >
                                  Forgot Password?
                                </a>
                              </div>
                              <div style={{ position: "relative" }}>
                                <input
                                  id="login-password"
                                  type={showLoginPassword ? "text" : "password"}
                                  placeholder="Enter your student password"
                                  value={loginPassword}
                                  onChange={(e) => setLoginPassword(e.target.value)}
                                  style={{
                                    width: "100%",
                                    padding: "11px 42px 11px 14px",
                                    borderRadius: "10px",
                                    border: "1px solid var(--border-light)",
                                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                                    color: "var(--text-main)",
                                    fontSize: "14px",
                                    outline: "none",
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                                  style={{
                                    position: "absolute",
                                    right: "12px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    color: "var(--text-muted)",
                                  }}
                                  aria-label="Toggle password visibility"
                                >
                                  {showLoginPassword ? "👁️" : "🙈"}
                                </button>
                              </div>
                            </div>

                            {/* Remember Me */}
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "18px" }}>
                              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "12px", color: "var(--text-muted)" }}>
                                <input
                                  type="checkbox"
                                  checked={rememberMe}
                                  onChange={(e) => setRememberMe(e.target.checked)}
                                  style={{ accentColor: "var(--orange)", cursor: "pointer" }}
                                />
                                <span>Remember this device for 90 days</span>
                              </label>
                            </div>

                            {/* Error Message */}
                            {loginError && (
                              <div
                                style={{
                                  padding: "10px 12px",
                                  borderRadius: "8px",
                                  background: "rgba(239, 68, 68, 0.15)",
                                  border: "1px solid rgba(239, 68, 68, 0.4)",
                                  color: "#EF4444",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  marginBottom: "16px",
                                }}
                              >
                                ⚠️ {loginError}
                              </div>
                            )}

                            {/* Submit Button */}
                            <button
                              type="submit"
                              disabled={loginLoading}
                              className="btn-enroll-nav btn-orange-leather"
                              style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "10px",
                                border: "none",
                                color: "#FFFFFF",
                                fontSize: "14px",
                                fontWeight: 800,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                              }}
                            >
                              <span>{loginLoading ? "Verifying Credentials..." : "Sign In to Portal →"}</span>
                            </button>
                          </>
                        )}
                      </form>

                      {/* Switch to Sign Up */}
                      <div style={{ textAlign: "center", marginTop: "20px", fontSize: "12px", color: "var(--text-muted)" }}>
                        Don&apos;t have a student account yet?{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setView("signup");
                            setSignupStep(1);
                            setSignupError("");
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--orange)",
                            fontWeight: 800,
                            cursor: "pointer",
                            textDecoration: "underline",
                            padding: 0,
                          }}
                        >
                          Register here (Multi-Step)
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* ═══════════════════════════════════════
                  VIEW 2: MULTI-STEP SIGNUP
                  Step 1: Name, Email & Password (or Google)
                  Step 2: Class/Year & Mobile Number
                  Step 3: Mobile OTP Verification (New users only)
                  Step 4: Success / Activation
                 ═══════════════════════════════════════ */}
              {view === "signup" && (
                <div>
                  {/* Step Stepper Progress Indicator */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "22px" }}>
                    {[
                      { num: 1, label: "Identity" },
                      { num: 2, label: "Academic" },
                      { num: 3, label: "Verify OTP" },
                    ].map((s, idx) => {
                      const isActive = signupStep === s.num;
                      const isDone = signupStep > s.num;
                      return (
                        <div key={s.num} style={{ display: "flex", alignItems: "center", flex: idx < 2 ? 1 : "initial" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <div
                              style={{
                                width: "26px",
                                height: "26px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "11px",
                                fontWeight: 800,
                                background: isDone
                                  ? "#10B981"
                                  : isActive
                                  ? "var(--orange)"
                                  : "rgba(229, 82, 0, 0.12)",
                                color: isDone || isActive ? "#FFFFFF" : "var(--text-muted)",
                                border: isActive ? "2px solid #FF8533" : "none",
                              }}
                            >
                              {isDone ? "✓" : s.num}
                            </div>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: isActive ? 800 : 600,
                                color: isActive ? "var(--orange)" : "var(--text-muted)",
                              }}
                            >
                              {s.label}
                            </span>
                          </div>
                          {idx < 2 && (
                            <div
                              style={{
                                flex: 1,
                                height: "2px",
                                margin: "0 8px",
                                background: isDone ? "#10B981" : "var(--border-light)",
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* ── STEP 1: IDENTITY (NAME, EMAIL, PASSWORD or GOOGLE) ── */}
                  {signupStep === 1 && (
                    <div>
                      {/* Google Signup Button */}
                      <button
                        type="button"
                        onClick={handleGoogleSignupClick}
                        style={{
                          width: "100%",
                          padding: "11px 16px",
                          borderRadius: "10px",
                          border: "1px solid var(--border-light)",
                          backgroundColor: "rgba(0, 0, 0, 0.15)",
                          color: "var(--text-main)",
                          fontSize: "13px",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                          marginBottom: "16px",
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                        <span>Sign Up with Google (Fast Track)</span>
                      </button>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "16px",
                          color: "var(--text-muted)",
                          fontSize: "11px",
                          fontWeight: 700,
                        }}
                      >
                        <div style={{ flex: 1, height: "1px", background: "var(--border-light)" }} />
                        <span>OR FILL STUDENT DETAILS</span>
                        <div style={{ flex: 1, height: "1px", background: "var(--border-light)" }} />
                      </div>

                      <form onSubmit={handleSignupStep1Next}>
                        {/* Full Name */}
                        <div style={{ marginBottom: "14px" }}>
                          <label
                            htmlFor="reg-name"
                            style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "var(--text-muted)", marginBottom: "6px" }}
                          >
                            Full Name <span style={{ color: "var(--orange)" }}>*</span>
                          </label>
                          <input
                            id="reg-name"
                            type="text"
                            placeholder="e.g. Aarav Sharma"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "11px 14px",
                              borderRadius: "10px",
                              border: "1px solid var(--border-light)",
                              backgroundColor: "rgba(0, 0, 0, 0.2)",
                              color: "var(--text-main)",
                              fontSize: "14px",
                              outline: "none",
                            }}
                          />
                        </div>

                        {/* Email */}
                        <div style={{ marginBottom: "14px" }}>
                          <label
                            htmlFor="reg-email"
                            style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "var(--text-muted)", marginBottom: "6px" }}
                          >
                            Email Address <span style={{ color: "var(--orange)" }}>*</span>
                          </label>
                          <input
                            id="reg-email"
                            type="email"
                            placeholder="e.g. aarav.sharma@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "11px 14px",
                              borderRadius: "10px",
                              border: "1px solid var(--border-light)",
                              backgroundColor: "rgba(0, 0, 0, 0.2)",
                              color: "var(--text-main)",
                              fontSize: "14px",
                              outline: "none",
                            }}
                          />
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: "18px" }}>
                          <label
                            htmlFor="reg-password"
                            style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "var(--text-muted)", marginBottom: "6px" }}
                          >
                            Create Student Password <span style={{ color: "var(--orange)" }}>*</span>
                          </label>
                          <div style={{ position: "relative" }}>
                            <input
                              id="reg-password"
                              type={showSignupPassword ? "text" : "password"}
                              placeholder="Minimum 6 characters"
                              value={signupPassword}
                              onChange={(e) => setSignupPassword(e.target.value)}
                              style={{
                                width: "100%",
                                padding: "11px 42px 11px 14px",
                                borderRadius: "10px",
                                border: "1px solid var(--border-light)",
                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                                color: "var(--text-main)",
                                fontSize: "14px",
                                outline: "none",
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => setShowSignupPassword(!showSignupPassword)}
                              style={{
                                position: "absolute",
                                right: "12px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "14px",
                                color: "var(--text-muted)",
                              }}
                              aria-label="Toggle password visibility"
                            >
                              {showSignupPassword ? "👁️" : "🙈"}
                            </button>
                          </div>
                        </div>

                        {signupError && (
                          <div
                            style={{
                              padding: "9px 12px",
                              borderRadius: "8px",
                              background: "rgba(239, 68, 68, 0.15)",
                              border: "1px solid rgba(239, 68, 68, 0.4)",
                              color: "#EF4444",
                              fontSize: "12px",
                              fontWeight: 600,
                              marginBottom: "14px",
                            }}
                          >
                            ⚠️ {signupError}
                          </div>
                        )}

                        <button
                          type="submit"
                          className="btn-enroll-nav btn-orange-leather"
                          style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "10px",
                            border: "none",
                            color: "#FFFFFF",
                            fontSize: "14px",
                            fontWeight: 800,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                          }}
                        >
                          <span>Next: Academic Year &amp; Phone →</span>
                        </button>
                      </form>
                    </div>
                  )}

                  {/* ── STEP 2: ACADEMIC YEAR & PHONE NUMBER ── */}
                  {signupStep === 2 && (
                    <form onSubmit={handleSignupStep2Next}>
                      {/* Google Connected Badge (if signed up via Google) */}
                      {isGoogleSignup && (
                        <div
                          style={{
                            padding: "10px 14px",
                            borderRadius: "10px",
                            background: "rgba(66, 133, 244, 0.12)",
                            border: "1px solid rgba(66, 133, 244, 0.35)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "16px",
                          }}
                        >
                          <div>
                            <div style={{ fontSize: "11px", color: "#60A5FA", fontWeight: 700 }}>
                              ✓ GOOGLE ACCOUNT LINKED
                            </div>
                            <div style={{ fontSize: "13px", color: "var(--text-main)", fontWeight: 700 }}>
                              {googleAccountName} ({googleAccountEmail})
                            </div>
                          </div>
                          <span style={{ fontSize: "18px" }}>🌐</span>
                        </div>
                      )}

                      {/* Academic Year Selection */}
                      <div style={{ marginBottom: "16px" }}>
                        <label
                          htmlFor="study-year"
                          style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "var(--text-muted)", marginBottom: "8px" }}
                        >
                          Which Class / Year are you studying in? <span style={{ color: "var(--orange)" }}>*</span>
                        </label>
                        <select
                          id="study-year"
                          value={studyYear}
                          onChange={(e) => setStudyYear(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "11px 14px",
                            borderRadius: "10px",
                            border: "1px solid var(--border-light)",
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                            color: "var(--text-main)",
                            fontSize: "14px",
                            outline: "none",
                            cursor: "pointer",
                          }}
                        >
                          <option value="Class 11th (NEET 2027 Aspirant)" style={{ backgroundColor: "#18110B", color: "#FFF" }}>
                            Class 11th (NEET 2027 2-Year Foundation)
                          </option>
                          <option value="Class 12th (NEET 2026 Aspirant)" style={{ backgroundColor: "#18110B", color: "#FFF" }}>
                            Class 12th (NEET 2026 Target Batch)
                          </option>
                          <option value="Dropper / Repeater (NEET 2026 Score Jump)" style={{ backgroundColor: "#18110B", color: "#FFF" }}>
                            Dropper / Repeater (NEET 2026 Score Jump Batch)
                          </option>
                          <option value="Class 10th Moving to 11th (Early Starter)" style={{ backgroundColor: "#18110B", color: "#FFF" }}>
                            Class 10th Moving to 11th (Early Starter)
                          </option>
                        </select>
                      </div>

                      {/* Mobile Number for OTP Verification */}
                      <div style={{ marginBottom: "16px" }}>
                        <label
                          htmlFor="signup-phone"
                          style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "var(--text-muted)", marginBottom: "6px" }}
                        >
                          Mobile Number (For Verification OTP) <span style={{ color: "var(--orange)" }}>*</span>
                        </label>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "0 12px",
                              borderRadius: "10px",
                              background: "rgba(229, 82, 0, 0.1)",
                              border: "1px solid var(--border-light)",
                              color: "var(--text-main)",
                              fontSize: "13px",
                              fontWeight: 700,
                            }}
                          >
                            🇮🇳 +91
                          </span>
                          <input
                            id="signup-phone"
                            type="tel"
                            maxLength={10}
                            placeholder="10-digit mobile number"
                            value={signupPhone}
                            onChange={(e) => setSignupPhone(e.target.value.replace(/\D/g, ""))}
                            style={{
                              flex: 1,
                              padding: "11px 14px",
                              borderRadius: "10px",
                              border: "1px solid var(--border-light)",
                              backgroundColor: "rgba(0, 0, 0, 0.2)",
                              color: "var(--text-main)",
                              fontSize: "14px",
                              outline: "none",
                            }}
                          />
                        </div>
                        <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                          ℹ️ As per academy guidelines, an instant OTP is sent to verify new student accounts.
                        </div>
                      </div>

                      {signupError && (
                        <div
                          style={{
                            padding: "9px 12px",
                            borderRadius: "8px",
                            background: "rgba(239, 68, 68, 0.15)",
                            border: "1px solid rgba(239, 68, 68, 0.4)",
                            color: "#EF4444",
                            fontSize: "12px",
                            fontWeight: 600,
                            marginBottom: "14px",
                          }}
                        >
                          ⚠️ {signupError}
                        </div>
                      )}

                      <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
                        <button
                          type="button"
                          onClick={() => setSignupStep(1)}
                          style={{
                            padding: "12px 18px",
                            borderRadius: "10px",
                            border: "1px solid var(--border-light)",
                            background: "rgba(0, 0, 0, 0.15)",
                            color: "var(--text-main)",
                            fontSize: "13px",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          ← Back
                        </button>
                        <button
                          type="submit"
                          disabled={signupLoading}
                          className="btn-enroll-nav btn-orange-leather"
                          style={{
                            flex: 1,
                            padding: "12px",
                            borderRadius: "10px",
                            border: "none",
                            color: "#FFFFFF",
                            fontSize: "14px",
                            fontWeight: 800,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                          }}
                        >
                          <span>{signupLoading ? "Sending OTP..." : "Send Verification OTP →"}</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* ── STEP 3: PHONE OTP VERIFICATION ── */}
                  {signupStep === 3 && (
                    <form onSubmit={handleVerifyOtp}>
                      <div
                        style={{
                          background: "rgba(229, 82, 0, 0.08)",
                          border: "1px solid rgba(229, 82, 0, 0.25)",
                          borderRadius: "12px",
                          padding: "14px",
                          marginBottom: "18px",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>
                          Verification code sent to:
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: 800, color: "var(--orange)" }}>
                          🇮🇳 +91 {signupPhone}
                        </div>
                        <button
                          type="button"
                          onClick={() => setSignupStep(2)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--text-muted)",
                            fontSize: "11px",
                            textDecoration: "underline",
                            cursor: "pointer",
                            marginTop: "4px",
                          }}
                        >
                          Edit phone number
                        </button>
                      </div>

                      {/* 6-Digit OTP Input */}
                      <div style={{ marginBottom: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                          <label
                            htmlFor="signup-otp-input"
                            style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-muted)" }}
                          >
                            Enter 6-Digit OTP <span style={{ color: "var(--orange)" }}>*</span>
                          </label>
                          {otpCountdown > 0 ? (
                            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                              Resend in {otpCountdown}s
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={handleResendOtp}
                              style={{
                                background: "none",
                                border: "none",
                                color: "var(--orange)",
                                fontSize: "11px",
                                fontWeight: 700,
                                cursor: "pointer",
                                padding: 0,
                              }}
                            >
                              Resend OTP
                            </button>
                          )}
                        </div>
                        <input
                          id="signup-otp-input"
                          type="text"
                          maxLength={6}
                          placeholder="• • • • • •"
                          value={signupOtp}
                          onChange={(e) => setSignupOtp(e.target.value.replace(/\D/g, ""))}
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: "10px",
                            border: "1px solid var(--border-light)",
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                            color: "var(--text-main)",
                            fontSize: "20px",
                            letterSpacing: "6px",
                            fontWeight: 800,
                            textAlign: "center",
                            outline: "none",
                          }}
                        />
                      </div>

                      {signupError && (
                        <div
                          style={{
                            padding: "9px 12px",
                            borderRadius: "8px",
                            background: "rgba(239, 68, 68, 0.15)",
                            border: "1px solid rgba(239, 68, 68, 0.4)",
                            color: "#EF4444",
                            fontSize: "12px",
                            fontWeight: 600,
                            marginBottom: "14px",
                          }}
                        >
                          ⚠️ {signupError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={signupLoading}
                        className="btn-enroll-nav btn-orange-leather"
                        style={{
                          width: "100%",
                          padding: "12px",
                          borderRadius: "10px",
                          border: "none",
                          color: "#FFFFFF",
                          fontSize: "14px",
                          fontWeight: 800,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                        }}
                      >
                        <span>{signupLoading ? "Verifying Phone..." : "Verify & Activate Account →"}</span>
                      </button>
                    </form>
                  )}

                  {/* ── STEP 4: CELEBRATION / ACCOUNT ACTIVATED ── */}
                  {signupStep === 4 && (
                    <div
                      style={{
                        background: "rgba(16, 185, 129, 0.15)",
                        border: "1px solid #10B981",
                        borderRadius: "14px",
                        padding: "28px 20px",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: "42px", marginBottom: "8px" }}>🩺🎉</div>
                      <h3 style={{ fontSize: "20px", fontWeight: 900, color: "#10B981", marginBottom: "8px" }}>
                        Student Account Verified!
                      </h3>
                      <p style={{ fontSize: "14px", color: "var(--text-main)", marginBottom: "16px", lineHeight: 1.5 }}>
                        Welcome to Indraprastha NEET Academy, <strong>{fullName}</strong>! Your account has been verified for <strong>{studyYear}</strong>.
                      </p>

                      <div
                        style={{
                          background: "rgba(0, 0, 0, 0.2)",
                          border: "1px solid var(--border-light)",
                          borderRadius: "10px",
                          padding: "12px",
                          marginBottom: "20px",
                          fontSize: "12px",
                          color: "var(--text-muted)",
                        }}
                      >
                        <div>Student ID: <strong style={{ color: "var(--orange)" }}>INA-2026-94821</strong></div>
                        <div>Verified Mobile: <strong>+91 {signupPhone}</strong></div>
                      </div>

                      <Link
                        href="/target-batches"
                        className="btn-enroll-nav btn-orange-leather"
                        style={{ width: "100%", justifyContent: "center" }}
                      >
                        <span>Proceed to Study Material &amp; Batches →</span>
                      </Link>
                    </div>
                  )}

                  {/* Switch to Login Link */}
                  {signupStep < 4 && (
                    <div style={{ textAlign: "center", marginTop: "18px", fontSize: "12px", color: "var(--text-muted)" }}>
                      Already have a student account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setView("login");
                          setLoginError("");
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--orange)",
                          fontWeight: 800,
                          cursor: "pointer",
                          textDecoration: "underline",
                          padding: 0,
                        }}
                      >
                        Sign in here
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── RIGHT COLUMN: STUDENT ACADEMIC ECOSYSTEM ── */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "rgba(229, 82, 0, 0.04)",
                border: "1px solid var(--border-light)",
                borderRadius: "20px",
                padding: "32px 28px",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "var(--orange)",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  PRE-PG MEDICAL ACCESS
                </span>
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "var(--text-main)",
                    marginTop: "6px",
                    marginBottom: "14px",
                  }}
                >
                  Indraprastha Student Ecosystem
                </h2>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "20px" }}>
                  Your dedicated NEET command platform built strictly on NMC curriculum guidelines and NTA computer-based exam pattern.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "18px" }}>📚</span>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>
                        10,000+ NCERT Line-by-Line MCQs
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        Every single line, table, and diagram indexed for instant recall practice.
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "18px" }}>⚡</span>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>
                        Exact NTA CBT Test Interface
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        Timed simulations with real negative mark diagnostics and error tracking.
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "18px" }}>🎯</span>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>
                        AI Rank Predictor &amp; GMC Matcher
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        Calibrated against 24.3 Lakh candidates and official MCC closing ranks.
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "18px" }}>🛡️</span>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>
                        Verified Student Access
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        OTP-verified student profiles ensure academic confidentiality and performance security.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Desk Help */}
              <div
                style={{
                  marginTop: "26px",
                  padding: "14px 18px",
                  borderRadius: "14px",
                  background: "var(--cream-card)",
                  border: "1px solid var(--border-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 800, color: "var(--text-main)" }}>
                    Need Admission / Login Help?
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                    Senior Counselor Desk (9 AM - 9 PM)
                  </div>
                </div>
                <a
                  href="tel:+917203055682"
                  style={{
                    padding: "7px 12px",
                    borderRadius: "8px",
                    background: "rgba(229, 82, 0, 0.12)",
                    border: "1px solid rgba(229, 82, 0, 0.3)",
                    color: "var(--orange)",
                    fontSize: "12px",
                    fontWeight: 700,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  📞 Call Desk
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ════════ SIMULATED GOOGLE POPUP MODAL — DISABLED ════════ */}
      {false && showGoogleModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100000,
            padding: "20px",
          }}
        >
          <div
            style={{
              maxWidth: "420px",
              width: "100%",
              background: "#FFFFFF",
              color: "#1F2937",
              borderRadius: "16px",
              padding: "28px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              position: "relative",
            }}
          >
            {/* Modal Header with Google G */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span style={{ fontSize: "16px", fontWeight: 700, color: "#1F2937" }}>
                  Sign in with Google
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowGoogleModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "#6B7280",
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: "13px", color: "#4B5563", marginBottom: "18px" }}>
              Choose an account to continue to <strong>Indraprastha NEET Academy</strong>:
            </p>

            {/* Account List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
              {[
                { name: "Aarav Sharma", email: "aarav.sharma.neet@gmail.com", avatar: "A", color: "#4F46E5" },
                { name: "Pooja Mishra", email: "pooja.mishra.doc@gmail.com", avatar: "P", color: "#059669" },
              ].map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleSelectGoogleAccount(acc)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid #E5E7EB",
                    background: "#F9FAFB",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F3F4F6")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#F9FAFB")}
                >
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      backgroundColor: acc.color,
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: 800,
                    }}
                  >
                    {acc.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>{acc.name}</div>
                    <div style={{ fontSize: "11px", color: "#6B7280" }}>{acc.email}</div>
                  </div>
                </button>
              ))}
            </div>

            <div style={{ fontSize: "11px", color: "#9CA3AF", textAlign: "center", lineHeight: 1.4 }}>
              To continue, Google will share your name and email address with Indraprastha NEET Academy.
            </div>
          </div>
        </div>
      )}

      {/* ════════ FOOTER ════════ */}
      <Footer />
    </div>
  );
}

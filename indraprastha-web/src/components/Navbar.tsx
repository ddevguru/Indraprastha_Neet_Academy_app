"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavbarProps {
  activePage?: "home" | "target-batches" | "ai-rank-predictor" | "methodology" | "legal" | "login";
  currentTheme?: "light" | "dark";
  onThemeToggle?: (newTheme: "light" | "dark") => void;
}

export default function Navbar({ activePage, currentTheme, onThemeToggle }: NavbarProps) {
  const [theme, setTheme] = useState<"light" | "dark">(currentTheme || "dark");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(Boolean(localStorage.getItem("indraprastha_token") || localStorage.getItem("indraprastha_user")));
    }
  }, []);

  useEffect(() => {
    // Default to dark mode across all pages
    const savedTheme = localStorage.getItem("indraprastha_theme") as "light" | "dark" | null;
    const initialTheme = currentTheme || (savedTheme === "light" ? "light" : "dark");
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [currentTheme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("indraprastha_theme", nextTheme);
    if (nextTheme === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      document.documentElement.setAttribute("data-theme", "light");
    }
    if (onThemeToggle) {
      onThemeToggle(nextTheme);
    }
  };

  const closeMobile = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`pred-navbar ${isScrolled ? "is-scrolled" : ""}`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="pred-navbar-inner">
        {/* Brand Logo */}
        <Link href="/" className="navbar-brand" aria-label="Indraprastha NEET Academy Home" onClick={closeMobile}>
          <Image
            src="/logo_app.jpeg"
            alt="Indraprastha NEET Logo"
            width={38}
            height={38}
            priority
            style={{ objectFit: "cover" }}
          />
          <div>
            <span className="brand-title">IndraprasthaNEET</span>
            <span className="brand-sub">ACADEMY</span>
          </div>
        </Link>

        {/* Navigation Links (Desktop) */}
        {isLoggedIn ? (
          <ul className="pred-nav-links">
            <li>
              <Link
                href="/dashboard"
                className={`pred-nav-link ${activePage === "home" ? "" : "active-pill"}`}
              >
                📊 Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/target-batches"
                className={`pred-nav-link ${activePage === "target-batches" ? "active-pill" : ""}`}
              >
                📝 Daily MCQs &amp; Tests
              </Link>
            </li>
            <li>
              <Link
                href="/ai-rank-predictor"
                className={`pred-nav-link ${activePage === "ai-rank-predictor" ? "active-pill" : ""}`}
              >
                🎯 AI Rank Predictor
              </Link>
            </li>
            <li>
              <Link
                href="/methodology"
                className={`pred-nav-link ${activePage === "methodology" ? "active-pill" : ""}`}
              >
                🔬 Methodology
              </Link>
            </li>
            <li>
              <Link href="/#mentorship" className="pred-nav-link">
                👨‍⚕️ Mentorship
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="pred-nav-links">
            <li>
              <Link
                href="/"
                className={`pred-nav-link ${activePage === "home" ? "active-pill" : ""}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/target-batches"
                className={`pred-nav-link ${activePage === "target-batches" ? "active-pill" : ""}`}
              >
                Target Batches
              </Link>
            </li>
            <li>
              <Link
                href="/ai-rank-predictor"
                className={`pred-nav-link ${activePage === "ai-rank-predictor" ? "active-pill" : ""}`}
              >
                AI Rank Predictor
              </Link>
            </li>
            <li>
              <Link
                href="/methodology"
                className={`pred-nav-link ${activePage === "methodology" ? "active-pill" : ""}`}
              >
                Methodology
              </Link>
            </li>
            <li>
              <Link href="/#mentorship" className="pred-nav-link">
                Dr. Mentorship
              </Link>
            </li>
            <li>
              <Link href="/#app" className="pred-nav-link">
                Mobile App
              </Link>
            </li>
          </ul>
        )}

        {/* Right Action Buttons */}
        <div className="pred-nav-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title="Toggle Light / Dark Mode"
            aria-label="Toggle Theme"
          >
            <span style={{ whiteSpace: "nowrap" }}>
              {theme === "light" ? "☀️ / 🌙" : "🌙 / ☀️"}
            </span>
          </button>

          <a href="tel:+917703033682" className="pred-phone-pill">
            📞 +91 77030 33682
          </a>

          {isLoggedIn ? (
            <div className="nav-auth-wrapper" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Link
                href="/dashboard"
                className="btn-enroll-nav btn-orange-leather nav-login-btn"
                id="nav-dashboard-btn"
              >
                <span>Dashboard</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("indraprastha_token");
                  localStorage.removeItem("indraprastha_user");
                  window.location.href = "/login";
                }}
                className="btn-signout-nav auth-btns-desktop"
                style={{
                  padding: "7px 12px",
                  borderRadius: "20px",
                  border: "1px solid rgba(239, 68, 68, 0.35)",
                  backgroundColor: "rgba(239, 68, 68, 0.08)",
                  color: "#EF4444",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>🚪 Sign Out</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className={`btn-enroll-nav btn-orange-leather nav-login-btn ${activePage === "login" ? "active-login" : ""}`}
              id="nav-login-btn"
            >
              <span>Login →</span>
            </Link>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className={`mobile-menu-toggle ${isMobileMenuOpen ? "is-active" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="hamburger-bar bar-1"></span>
            <span className="hamburger-bar bar-2"></span>
            <span className="hamburger-bar bar-3"></span>
          </button>
        </div>
      </div>

      {/* ════════ MOBILE FULL DRAWER MENU ════════ */}
      <div
        className={`mobile-nav-overlay ${isMobileMenuOpen ? "active" : ""}`}
        onClick={closeMobile}
      />
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? "active" : ""}`}>
        <div className="mobile-nav-header">
          <div className="mobile-drawer-brand">
            <Image
              src="/logo_app.jpeg"
              alt="Indraprastha Logo"
              width={34}
              height={34}
              style={{ borderRadius: "8px", objectFit: "cover" }}
            />
            <div>
              <span className="brand-title" style={{ fontSize: "14px" }}>IndraprasthaNEET</span>
              <span className="brand-sub" style={{ fontSize: "9px" }}>ACADEMY</span>
            </div>
          </div>
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={closeMobile}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="mobile-nav-body">
          <ul className="mobile-links-list">
            <li>
              <Link
                href="/"
                className={`mobile-nav-link ${activePage === "home" ? "active" : ""}`}
                onClick={closeMobile}
              >
                <span>🏠 Home Overview</span>
              </Link>
            </li>
            <li>
              <Link
                href="/target-batches"
                className={`mobile-nav-link ${activePage === "target-batches" ? "active" : ""}`}
                onClick={closeMobile}
              >
                <span>🎯 Target Batches 2026/27</span>
              </Link>
            </li>
            <li>
              <Link
                href="/ai-rank-predictor"
                className={`mobile-nav-link ${activePage === "ai-rank-predictor" ? "active" : ""}`}
                onClick={closeMobile}
              >
                <span>⚡ AI Rank Predictor</span>
              </Link>
            </li>
            <li>
              <Link
                href="/methodology"
                className={`mobile-nav-link ${activePage === "methodology" ? "active" : ""}`}
                onClick={closeMobile}
              >
                <span>🔬 The Indraprastha Method</span>
              </Link>
            </li>
            <li>
              <Link
                href="/#mentorship"
                className="mobile-nav-link"
                onClick={closeMobile}
              >
                <span>👨‍⚕️ Dr Rahul Mentorship</span>
              </Link>
            </li>
            <li>
              <Link
                href="/#app"
                className="mobile-nav-link"
                onClick={closeMobile}
              >
                <span>📱 Mobile Android App</span>
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link
                  href="/dashboard"
                  className="mobile-nav-link highlight"
                  onClick={closeMobile}
                >
                  <span>📊 Student Study Dashboard</span>
                </Link>
              </li>
            )}
          </ul>

          <div className="mobile-drawer-footer">
            <div className="mobile-phone-cta">
              <a href="tel:+917703033682" className="mobile-phone-link">
                <span>📞 +91 77030 33682</span>
                <span className="mobile-phone-hint">24/7 Academic Helpline</span>
              </a>
            </div>

            <div className="mobile-auth-row">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="btn-primary-hero btn-orange-leather"
                    style={{ flex: 1, textAlign: "center", padding: "12px" }}
                    onClick={closeMobile}
                  >
                    <span>Dashboard</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("indraprastha_token");
                      localStorage.removeItem("indraprastha_user");
                      closeMobile();
                      window.location.href = "/login";
                    }}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: "1px solid rgba(239, 68, 68, 0.4)",
                      backgroundColor: "rgba(239, 68, 68, 0.12)",
                      color: "#EF4444",
                      fontSize: "13px",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="btn-primary-hero btn-orange-leather"
                  style={{ width: "100%", textAlign: "center", padding: "12px", justifyContent: "center" }}
                  onClick={closeMobile}
                >
                  <span>Student Sign In / Register →</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

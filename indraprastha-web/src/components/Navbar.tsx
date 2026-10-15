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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(Boolean(localStorage.getItem("indraprastha_token") || localStorage.getItem("indraprastha_user")));
    }
  }, []);

  useEffect(() => {
    // Default to dark mode across all pages
    const savedTheme = localStorage.getItem("indraprastha_theme") as "light" | "dark" | null;
    const initialTheme = currentTheme || savedTheme || "dark";
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.body.classList.add("dark-theme");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
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

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("indraprastha_theme", nextTheme);
    if (nextTheme === "dark") {
      document.body.classList.add("dark-theme");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      document.documentElement.setAttribute("data-theme", "light");
    }
    if (onThemeToggle) {
      onThemeToggle(nextTheme);
    }
  };

  return (
    <nav
      className={`pred-navbar ${isScrolled ? "is-scrolled" : ""}`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="pred-navbar-inner">
        {/* Brand Logo */}
        <Link href="/" className="navbar-brand" aria-label="Indraprastha NEET Academy Home">
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

        {/* Navigation Links - Dynamically updates if logged in */}
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
              <Link href="/#app" className="pred-nav-link">
                Mobile App
              </Link>
            </li>
            <li>
              <a href="tel:+917203055682" className="pred-nav-link">
                Talk to Support
              </a>
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
          <a href="tel:+917203055682" className="pred-phone-pill">
            📞 +91 72030 55682
          </a>
          {isLoggedIn ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Link
                href="/dashboard"
                className="btn-enroll-nav btn-orange-leather"
                id="nav-dashboard-btn"
                style={{ padding: "8px 14px", fontSize: "12px" }}
              >
                <span>Dashboard 🩺</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("indraprastha_token");
                  localStorage.removeItem("indraprastha_user");
                  window.location.href = "/login";
                }}
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
              className={`btn-enroll-nav btn-orange-leather ${activePage === "login" ? "active-login" : ""}`}
              id="nav-login-btn"
            >
              <span>Login →</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

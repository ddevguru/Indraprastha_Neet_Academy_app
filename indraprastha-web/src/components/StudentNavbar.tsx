"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface StudentUserProfile {
  id?: number;
  phone?: string;
  full_name?: string;
  name?: string;
  email?: string | null;
  target_exam_year?: string;
  preferred_plan?: string;
  course_category?: string;
  batch_name?: string;
  subscription_plan?: string;
  subscription_status?: string;
  has_active_subscription?: boolean;
  subscription_expires_at?: string;
  created_at?: string;
}

interface StudentNavbarProps {
  activeTab?: "dashboard" | "daily-mcqs" | "practice" | "pyqs" | "tests" | "subscriptions" | "leaderboard" | "streaks" | "profile";
  userName?: string;
  onLogout?: () => void;
  onOpenProfile?: () => void;
  onOpenSubscriptions?: () => void;
}

export default function StudentNavbar({
  activeTab = "dashboard",
  userName,
  onLogout,
  onOpenProfile,
  onOpenSubscriptions,
}: StudentNavbarProps) {
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<StudentUserProfile | null>(null);

  useEffect(() => {
    // Read saved theme, default to dark
    const savedTheme = localStorage.getItem("indraprastha_theme") as "light" | "dark" | null;
    const initialTheme = savedTheme === "light" ? "light" : "dark";
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

    // Read saved user
    const storedUser = localStorage.getItem("indraprastha_user");
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        setProfile(u);
      } catch {
        // ignore
      }
    }
  }, [userName]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 6);
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

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobile = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem("indraprastha_token");
      localStorage.removeItem("indraprastha_user");
      router.push("/login");
    }
  };

  const displayName = profile?.full_name || profile?.name || userName || "Deepak Mishra";
  const firstName = displayName.split(" ")[0];

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 9999,
        backgroundColor: "var(--cream-card, #FFFFFF)",
        borderBottom: "1px solid var(--border-light, #EDE3DA)",
        boxShadow: isScrolled
          ? "0 4px 20px rgba(0, 0, 0, 0.08)"
          : "0 2px 10px rgba(0, 0, 0, 0.03)",
        transition: "all 0.2s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        {/* ── Brand Logo & Portal Tag ── */}
        <Link
          href="/dashboard"
          onClick={closeMobile}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "inherit",
            flexShrink: 0,
          }}
        >
          <Image
            src="/logo_app.jpeg"
            alt="Indraprastha NEET Logo"
            width={36}
            height={36}
            priority
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "15px", fontWeight: 900, color: "var(--text-main)", letterSpacing: "-0.3px" }}>
                IndraprasthaNEET
              </span>
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 800,
                  backgroundColor: "rgba(229, 82, 0, 0.12)",
                  color: "#E55200",
                  padding: "1px 6px",
                  borderRadius: "5px",
                  letterSpacing: "0.5px",
                }}
              >
                STUDENT
              </span>
            </div>
            <span style={{ fontSize: "9px", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "1px", display: "block" }}>
              ACADEMY PORTAL
            </span>
          </div>
        </Link>

        {/* ── Desktop Navigation Items (Hidden on Mobile <= 992px) ── */}
        <div
          className="student-desktop-nav"
          style={{
            backgroundColor: "rgba(229, 82, 0, 0.04)",
            padding: "3px 4px",
            borderRadius: "10px",
            border: "1px solid var(--border-light, #EDE3DA)",
            flexShrink: 0,
          }}
        >
          <Link
            href="/dashboard"
            style={{
              padding: "6px 12px",
              borderRadius: "7px",
              fontSize: "12px",
              fontWeight: 700,
              textDecoration: "none",
              color: activeTab === "dashboard" ? "#FFFFFF" : "var(--text-main)",
              backgroundColor: activeTab === "dashboard" ? "#E55200" : "transparent",
              transition: "all 0.15s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span>📊</span>
            <span>Dashboard</span>
          </Link>

          <Link
            href="/daily-mcqs"
            style={{
              padding: "6px 12px",
              borderRadius: "7px",
              fontSize: "12px",
              fontWeight: 700,
              textDecoration: "none",
              color: activeTab === "daily-mcqs" ? "#FFFFFF" : "var(--text-main)",
              backgroundColor: activeTab === "daily-mcqs" ? "#E55200" : "transparent",
              transition: "all 0.15s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span>📝</span>
            <span>Daily MCQs</span>
          </Link>

          <Link
            href="/practice"
            style={{
              padding: "6px 12px",
              borderRadius: "7px",
              fontSize: "12px",
              fontWeight: 700,
              textDecoration: "none",
              color: activeTab === "practice" ? "#FFFFFF" : "var(--text-main)",
              backgroundColor: activeTab === "practice" ? "#E55200" : "transparent",
              transition: "all 0.15s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span>📚</span>
            <span>Practice</span>
          </Link>

          <Link
            href="/pyqs"
            style={{
              padding: "6px 12px",
              borderRadius: "7px",
              fontSize: "12px",
              fontWeight: 700,
              textDecoration: "none",
              color: activeTab === "pyqs" ? "#FFFFFF" : "var(--text-main)",
              backgroundColor: activeTab === "pyqs" ? "#E55200" : "transparent",
              transition: "all 0.15s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span>📜</span>
            <span>PYQs</span>
          </Link>

          <Link
            href="/tests"
            style={{
              padding: "6px 12px",
              borderRadius: "7px",
              fontSize: "12px",
              fontWeight: 700,
              textDecoration: "none",
              color: activeTab === "tests" ? "#FFFFFF" : "var(--text-main)",
              backgroundColor: activeTab === "tests" ? "#E55200" : "transparent",
              transition: "all 0.15s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span>🎯</span>
            <span>Tests</span>
          </Link>

          <Link
            href="/subscriptions"
            style={{
              padding: "6px 12px",
              borderRadius: "7px",
              fontSize: "12px",
              fontWeight: 700,
              textDecoration: "none",
              color: activeTab === "subscriptions" ? "#FFFFFF" : "var(--text-main)",
              backgroundColor: activeTab === "subscriptions" ? "#E55200" : "transparent",
              transition: "all 0.15s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span>👑</span>
            <span>Plans</span>
          </Link>
        </div>

        {/* ── Right Actions: Theme Toggle, User Profile, Sign Out, Mobile Hamburger ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            title="Toggle Light / Dark Mode"
            aria-label="Toggle Theme"
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              border: "1px solid var(--border-light, #EDE3DA)",
              backgroundColor: "rgba(229, 82, 0, 0.05)",
              color: "var(--text-main)",
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span>{theme === "light" ? "☀️" : "🌙"}</span>
            <span className="student-desktop-pill-text">{theme === "light" ? " Light" : " Dark"}</span>
          </button>

          {/* Student Profile Pill - Clickable to open profile */}
          <button
            type="button"
            onClick={() => {
              if (onOpenProfile) {
                onOpenProfile();
              } else {
                router.push("/profile");
              }
            }}
            title="Click to view Profile & Account Details"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 10px 4px 5px",
              borderRadius: "100px",
              border: "1.5px solid rgba(229, 82, 0, 0.35)",
              backgroundColor: "rgba(229, 82, 0, 0.08)",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s ease",
            }}
          >
            <div
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FF6B00, #E55200)",
                color: "#FFFFFF",
                fontSize: "12px",
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {firstName.charAt(0).toUpperCase()}
            </div>
            <div className="student-desktop-pill-text" style={{ lineHeight: 1.1 }}>
              <div style={{ fontSize: "12px", fontWeight: 800, color: "var(--text-main)" }}>
                {firstName}
              </div>
              <div style={{ fontSize: "9px", color: "#E55200", fontWeight: 700 }}>
                {profile?.subscription_plan || "Starter Plan"} ▾
              </div>
            </div>
          </button>

          {/* Desktop Sign Out Button */}
          <button
            type="button"
            onClick={handleSignOut}
            title="Sign Out of Academy"
            className="student-desktop-signout"
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              border: "1px solid rgba(239, 68, 68, 0.25)",
              backgroundColor: "rgba(239, 68, 68, 0.08)",
              color: "#EF4444",
              fontSize: "11px",
              fontWeight: 800,
              cursor: "pointer",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>

          {/* ── Mobile Hamburger Toggle Button (Mobile Only) ── */}
          <button
            type="button"
            className={`mobile-menu-toggle ${isMobileMenuOpen ? "is-active" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
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
        {/* Drawer Header */}
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
              <span className="brand-sub" style={{ fontSize: "9px" }}>STUDENT PORTAL</span>
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

        {/* Drawer Body */}
        <div className="mobile-nav-body" style={{ overflowY: "auto" }}>
          <div>
            {/* Student Profile Card in Drawer */}
            <div
              style={{
                padding: "12px 14px",
                borderRadius: "12px",
                backgroundColor: "rgba(229, 82, 0, 0.06)",
                border: "1px solid rgba(229, 82, 0, 0.2)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #FF6B00, #E55200)",
                  color: "#FFFFFF",
                  fontSize: "18px",
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {firstName.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-main)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {displayName}
                </div>
                <div style={{ fontSize: "11px", color: "var(--orange)", fontWeight: 700 }}>
                  {profile?.subscription_plan || "Starter Plan"} • {profile?.target_exam_year || "NEET 2026/27"}
                </div>
              </div>
            </div>

            {/* Student Navigation Links */}
            <ul className="mobile-links-list">
              <li>
                <Link
                  href="/dashboard"
                  className={`mobile-nav-link ${activeTab === "dashboard" ? "active" : ""}`}
                  onClick={closeMobile}
                >
                  <span>📊</span>
                  <span>Student Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/daily-mcqs"
                  className={`mobile-nav-link ${activeTab === "daily-mcqs" ? "active" : ""}`}
                  onClick={closeMobile}
                >
                  <span>📝</span>
                  <span>Daily Practice MCQs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/practice"
                  className={`mobile-nav-link ${activeTab === "practice" ? "active" : ""}`}
                  onClick={closeMobile}
                >
                  <span>📚</span>
                  <span>Topic-Wise Practice</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/pyqs"
                  className={`mobile-nav-link ${activeTab === "pyqs" ? "active" : ""}`}
                  onClick={closeMobile}
                >
                  <span>📜</span>
                  <span>Chapter-Wise PYQs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tests"
                  className={`mobile-nav-link ${activeTab === "tests" ? "active" : ""}`}
                  onClick={closeMobile}
                >
                  <span>🎯</span>
                  <span>Test Series &amp; CBT Mocks</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/subscriptions"
                  className={`mobile-nav-link ${activeTab === "subscriptions" ? "active" : ""}`}
                  onClick={closeMobile}
                >
                  <span>👑</span>
                  <span>Membership &amp; Plans</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/streaks"
                  className={`mobile-nav-link ${activeTab === "streaks" ? "active" : ""}`}
                  onClick={closeMobile}
                >
                  <span>🔥</span>
                  <span>Study Streaks &amp; Badges</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className={`mobile-nav-link ${activeTab === "leaderboard" ? "active" : ""}`}
                  onClick={closeMobile}
                >
                  <span>🏆</span>
                  <span>All-India Leaderboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className={`mobile-nav-link ${activeTab === "profile" ? "active" : ""}`}
                  onClick={() => {
                    closeMobile();
                    if (onOpenProfile) onOpenProfile();
                  }}
                >
                  <span>👤</span>
                  <span>My Profile &amp; Account</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Drawer Footer with Helpline & Actions */}
          <div className="mobile-drawer-footer">
            <a href="tel:+917703033682" className="mobile-phone-link">
              <span>📞 +91 77030 33682</span>
              <span className="mobile-phone-hint">24/7 Academic Helpline</span>
            </a>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={toggleTheme}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid var(--border-light, #EDE3DA)",
                  background: "var(--cream-bg, #FAF6F0)",
                  color: "var(--text-main)",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <span>{theme === "light" ? "🌙 Dark" : "☀️ Light"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  closeMobile();
                  handleSignOut();
                }}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid rgba(239, 68, 68, 0.4)",
                  backgroundColor: "rgba(239, 68, 68, 0.12)",
                  color: "#EF4444",
                  fontSize: "12px",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <span>🚪 Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

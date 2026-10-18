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
  activeTab?: "dashboard" | "daily-mcqs" | "practice" | "tests" | "subscriptions" | "leaderboard" | "streaks" | "profile";
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
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [profile, setProfile] = useState<StudentUserProfile | null>(null);

  useEffect(() => {
    // Read saved theme
    const savedTheme = localStorage.getItem("indraprastha_theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.body.classList.add("dark-theme");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
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
          flexWrap: "nowrap",
          whiteSpace: "nowrap",
          overflowX: "auto",
        }}
      >
        {/* ── Brand Logo & Portal Tag ── */}
        <Link
          href="/dashboard"
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

        {/* ── All Student Navigation Items In A Single Line (No AI Predictor, No Methodology) ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
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

        {/* ── Right Actions: Theme Toggle, User Profile (Clickable modal), Sign Out ── */}
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
            <span>{theme === "light" ? "☀️ Light" : "🌙 Dark"}</span>
          </button>

          {/* Student Profile Pill - CLICKABLE to view profile page */}
          <button
            type="button"
            onClick={() => {
              if (onOpenProfile) {
                onOpenProfile();
              } else {
                router.push("/profile");
              }
            }}
            title="Click to view Profile &amp; Account Details"
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
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontSize: "12px", fontWeight: 800, color: "var(--text-main)" }}>
                {firstName}
              </div>
              <div style={{ fontSize: "9px", color: "#E55200", fontWeight: 700 }}>
                {profile?.subscription_plan || "Starter Plan"} ▾
              </div>
            </div>
          </button>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleSignOut}
            title="Sign Out of Academy"
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              border: "1px solid rgba(239, 68, 68, 0.25)",
              backgroundColor: "rgba(239, 68, 68, 0.08)",
              color: "#EF4444",
              fontSize: "11px",
              fontWeight: 800,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

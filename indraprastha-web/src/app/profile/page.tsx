"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StudentNavbar, { StudentUserProfile } from "@/components/StudentNavbar";
import Footer from "@/components/Footer";
import { applyTheme, getStoredTheme, ThemeMode } from "@/lib/theme";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<StudentUserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Performance stats
  const [testsCompleted, setTestsCompleted] = useState<number>(18);
  const [practiceCompleted, setPracticeCompleted] = useState<number>(10);
  const [totalQuestionsSolved, setTotalQuestionsSolved] = useState<number>(1069);
  const [accuracyRate, setAccuracyRate] = useState<number>(81.5);
  const [myRank, setMyRank] = useState<number>(4);
  const [myPoints, setMyPoints] = useState<number>(3099);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const initialTheme = getStoredTheme();
      setTheme(initialTheme);
      applyTheme(initialTheme);

      const handleThemeChange = (e: any) => {
        if (e.detail?.theme) {
          setTheme(e.detail.theme);
        }
      };
      window.addEventListener("indraprastha_theme_change", handleThemeChange);

      const storedUser = localStorage.getItem("indraprastha_user");
      const storedToken = localStorage.getItem("indraprastha_token");
      if (!storedUser && !storedToken) {
        router.push("/login");
        return () => window.removeEventListener("indraprastha_theme_change", handleThemeChange);
      }

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          // ignore
        }
      }
      setLoading(false);

      if (storedToken) {
        fetchProfileAndStats(storedToken);
      }

      return () => window.removeEventListener("indraprastha_theme_change", handleThemeChange);
    }
  }, [router]);

  const fetchProfileAndStats = async (token: string) => {
    const API_BASE = "https://api.indraprasthaneetacademy.com/api";
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const res = await fetch(`${API_BASE}/auth/me`, { headers });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          localStorage.setItem("indraprastha_user", JSON.stringify(data.user));
        }
      }
    } catch {
      // ignore
    }

    try {
      const res = await fetch(`${API_BASE}/content/analytics/latest`, { headers });
      if (res.ok) {
        const data = await res.json();
        if (data.analytics) {
          if (data.analytics.tests_completed) setTestsCompleted(data.analytics.tests_completed);
          if (data.analytics.practice_completed) setPracticeCompleted(data.analytics.practice_completed);
        }
      }
    } catch {
      // ignore
    }

    try {
      const res = await fetch(`${API_BASE}/leaderboard?filter=overall`, { headers });
      if (res.ok) {
        const data = await res.json();
        if (data.myRank) {
          if (data.myRank.rank) setMyRank(data.myRank.rank);
          if (data.myRank.points) setMyPoints(data.myRank.points);
          if (data.myRank.accuracy) setAccuracyRate(data.myRank.accuracy);
        }
      }
    } catch {
      // ignore
    }
  };

  const handleToggleTheme = () => {
    const nextTheme: ThemeMode = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  const handleSignOut = () => {
    localStorage.removeItem("indraprastha_token");
    localStorage.removeItem("indraprastha_user");
    router.push("/login");
  };

  const displayName = user?.full_name || user?.name || "Deepak Mishra";
  const firstName = displayName.split(" ")[0];
  const targetYear = user?.target_exam_year || "NEET 2026/2027";
  const batchName = user?.batch_name || "Target Neet 2027 - Class 12th Going";
  const courseCategory = user?.course_category || "State Boards / CBSE";
  const phone = user?.phone || "7703033682";
  const email = user?.email || "deepak.mishra@student.indraprastha.com";
  const planName = user?.subscription_plan || "Starter Plan";
  const hasActiveSub = user?.has_active_subscription || user?.subscription_status === "active";

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--cream-bg, #FAF6F0)" }}>
        <p style={{ color: "var(--text-main)", fontWeight: 700 }}>Loading Profile Details...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--cream-bg, #FAF6F0)" }}>
      <StudentNavbar
        activeTab="profile"
        userName={displayName}
        onOpenProfile={() => {}}
      />

      <main style={{ flex: 1, padding: "24px 20px 80px", maxWidth: "1180px", width: "100%", margin: "0 auto" }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", fontSize: "13px" }}>
          <Link href="/dashboard" style={{ color: "#E55200", textDecoration: "none", fontWeight: 700 }}>
            ← Back to Dashboard
          </Link>
          <span style={{ color: "var(--text-muted)" }}>/</span>
          <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Student Profile &amp; Account Details</span>
        </div>

        {/* ── TOP IDENTITY CARD ── */}
        <section
          style={{
            backgroundColor: "var(--cream-card, #FFFFFF)",
            border: "1px solid var(--border-light, #EDE3DA)",
            borderRadius: "22px",
            padding: "26px",
            marginBottom: "24px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                padding: "3px",
                background: "linear-gradient(135deg, #FF6B00, #E55200)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 18px rgba(229, 82, 0, 0.25)",
              }}
            >
              <Image
                src="/logo_app.jpeg"
                alt="Student Avatar"
                width={74}
                height={74}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <h1 style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                  {displayName}
                </h1>
                <span
                  style={{
                    backgroundColor: "rgba(16, 185, 129, 0.12)",
                    color: "#10B981",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    padding: "3px 10px",
                    borderRadius: "100px",
                    fontSize: "11px",
                    fontWeight: 800,
                  }}
                >
                  ✓ VERIFIED ASPIRANT
                </span>
                <span
                  style={{
                    backgroundColor: "rgba(229, 82, 0, 0.12)",
                    color: "#E55200",
                    border: "1px solid rgba(229, 82, 0, 0.25)",
                    padding: "3px 10px",
                    borderRadius: "100px",
                    fontSize: "11px",
                    fontWeight: 800,
                  }}
                >
                  🎖️ Rank #{myRank}
                </span>
              </div>
              <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "4px 0 0" }}>
                <strong style={{ color: "#E55200" }}>{targetYear} Aspirant</strong> · {batchName}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link
              href="/subscriptions"
              style={{
                padding: "10px 18px",
                backgroundColor: "#E55200",
                color: "#FFFFFF",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 800,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 4px 12px rgba(229, 82, 0, 0.25)",
              }}
            >
              <span>👑 Upgrade Plan</span>
            </Link>
            <button
              onClick={handleSignOut}
              style={{
                padding: "10px 16px",
                backgroundColor: "rgba(239, 68, 68, 0.08)",
                border: "1px solid rgba(239, 68, 68, 0.25)",
                color: "#EF4444",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 800,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>🚪 Sign Out</span>
            </button>
          </div>
        </section>

        {/* ── 2-COLUMN MAIN CONTENT ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
          
          {/* LEFT COLUMN: Personal Info & Subscription */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Personal Details Card */}
            <section
              style={{
                backgroundColor: "var(--cream-card, #FFFFFF)",
                border: "1px solid var(--border-light, #EDE3DA)",
                borderRadius: "20px",
                padding: "24px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
              }}
            >
              <h2 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)", margin: "0 0 16px" }}>
                Student Contact &amp; Batch Info
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ padding: "12px 16px", borderRadius: "12px", backgroundColor: "rgba(229, 82, 0, 0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 700 }}>PHONE NUMBER</span>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-main)" }}>+91 {phone}</span>
                </div>

                <div style={{ padding: "12px 16px", borderRadius: "12px", backgroundColor: "rgba(229, 82, 0, 0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 700 }}>EMAIL ADDRESS</span>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)" }}>{email}</span>
                </div>

                <div style={{ padding: "12px 16px", borderRadius: "12px", backgroundColor: "rgba(229, 82, 0, 0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 700 }}>TARGET EXAM</span>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#E55200" }}>{targetYear}</span>
                </div>

                <div style={{ padding: "12px 16px", borderRadius: "12px", backgroundColor: "rgba(229, 82, 0, 0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 700 }}>ENROLLED BATCH</span>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)" }}>{batchName}</span>
                </div>

                <div style={{ padding: "12px 16px", borderRadius: "12px", backgroundColor: "rgba(229, 82, 0, 0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 700 }}>COURSE CATEGORY</span>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)" }}>{courseCategory}</span>
                </div>
              </div>
            </section>

            {/* Subscription Card */}
            <section
              style={{
                backgroundColor: "var(--cream-card, #FFFFFF)",
                border: "1px solid var(--border-light, #EDE3DA)",
                borderRadius: "20px",
                padding: "24px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "20px" }}>👑</span>
                  <h2 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)", margin: 0 }}>
                    Subscription &amp; Membership
                  </h2>
                </div>
                <span
                  style={{
                    backgroundColor: hasActiveSub ? "rgba(16, 185, 129, 0.15)" : "rgba(229, 82, 0, 0.15)",
                    color: hasActiveSub ? "#10B981" : "#E55200",
                    padding: "3px 10px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: 800,
                  }}
                >
                  {hasActiveSub ? "● ACTIVE MEMBERSHIP" : "STARTER ACCESS"}
                </span>
              </div>

              <div
                style={{
                  padding: "16px",
                  borderRadius: "14px",
                  backgroundColor: "rgba(229, 82, 0, 0.06)",
                  border: "1.5px solid rgba(229, 82, 0, 0.3)",
                  marginBottom: "16px",
                }}
              >
                <div style={{ fontSize: "18px", fontWeight: 900, color: "#E55200", marginBottom: "4px" }}>
                  {planName}
                </div>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0 }}>
                  Access to NCERT line-by-line questions, mock tests, AI diagnostics and video solutions.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "18px" }}>
                {[
                  "Unlimited NCERT Line-by-Line Question Bank",
                  "Official NEET CBT Mock Test Engine & Solutions",
                  "Solve Similar Questions AI Engine",
                  "Video Explanations from Top NEET Mentors",
                  "All-India Percentile & Leaderboard Tracking",
                ].map((feature, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text-main)" }}>
                    <span style={{ color: "#10B981", fontWeight: 900 }}>✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/subscriptions"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "12px",
                  borderRadius: "10px",
                  backgroundColor: "#E55200",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: 800,
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(229, 82, 0, 0.25)",
                }}
              >
                Manage or Upgrade Subscription Plans →
              </Link>
            </section>
          </div>

          {/* RIGHT COLUMN: Academic Diagnostics & Settings */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Performance Diagnostic Overview */}
            <section
              style={{
                backgroundColor: "var(--cream-card, #FFFFFF)",
                border: "1px solid var(--border-light, #EDE3DA)",
                borderRadius: "20px",
                padding: "24px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
              }}
            >
              <h2 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)", margin: "0 0 16px" }}>
                Academic Diagnostics &amp; Milestones
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "18px" }}>
                <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(229, 82, 0, 0.04)", border: "1px solid var(--border-light, #EDE3DA)" }}>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block" }}>TESTS COMPLETED</span>
                  <strong style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-main)" }}>{testsCompleted}</strong>
                </div>

                <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(229, 82, 0, 0.04)", border: "1px solid var(--border-light, #EDE3DA)" }}>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block" }}>PRACTICE SETS</span>
                  <strong style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-main)" }}>{practiceCompleted}</strong>
                </div>

                <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(229, 82, 0, 0.04)", border: "1px solid var(--border-light, #EDE3DA)" }}>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block" }}>MCQs SOLVED</span>
                  <strong style={{ fontSize: "22px", fontWeight: 900, color: "#E55200" }}>{totalQuestionsSolved}</strong>
                </div>

                <div style={{ padding: "14px", borderRadius: "12px", backgroundColor: "rgba(229, 82, 0, 0.04)", border: "1px solid var(--border-light, #EDE3DA)" }}>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block" }}>ACCURACY RATE</span>
                  <strong style={{ fontSize: "22px", fontWeight: 900, color: "#10B981" }}>{accuracyRate}%</strong>
                </div>
              </div>

              {/* Quick links to full sub-pages */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Link
                  href="/leaderboard"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(229, 82, 0, 0.05)",
                    border: "1px solid var(--border-light, #EDE3DA)",
                    textDecoration: "none",
                    color: "var(--text-main)",
                    fontWeight: 700,
                    fontSize: "13px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>🏆</span>
                    <span>View All-India Leaderboard &amp; Ranks</span>
                  </div>
                  <span style={{ color: "#E55200" }}>#{myRank} →</span>
                </Link>

                <Link
                  href="/streaks"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(229, 82, 0, 0.05)",
                    border: "1px solid var(--border-light, #EDE3DA)",
                    textDecoration: "none",
                    color: "var(--text-main)",
                    fontWeight: 700,
                    fontSize: "13px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>🔥</span>
                    <span>View Full Revision Streaks &amp; Calendar</span>
                  </div>
                  <span style={{ color: "#E55200" }}>View →</span>
                </Link>
              </div>
            </section>

            {/* Preferences & Settings Card */}
            <section
              style={{
                backgroundColor: "var(--cream-card, #FFFFFF)",
                border: "1px solid var(--border-light, #EDE3DA)",
                borderRadius: "20px",
                padding: "24px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
              }}
            >
              <h2 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)", margin: "0 0 16px" }}>
                Portal Settings &amp; Preferences
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <strong style={{ fontSize: "13px", color: "var(--text-main)", display: "block" }}>Color Theme</strong>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Current theme: {theme === "light" ? "Light" : "Dark"}</span>
                  </div>
                  <button
                    onClick={handleToggleTheme}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "8px",
                      border: "1px solid var(--border-light, #EDE3DA)",
                      backgroundColor: "rgba(229, 82, 0, 0.06)",
                      color: "var(--text-main)",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {theme === "light" ? "🌙 Switch to Dark" : "☀️ Switch to Light"}
                  </button>
                </div>

                <div style={{ borderTop: "1px solid var(--border-light, #EDE3DA)", paddingTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <strong style={{ fontSize: "13px", color: "var(--text-main)", display: "block" }}>Student Helpdesk</strong>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Faculty &amp; Academic Inquiries</span>
                  </div>
                  <a
                    href="tel:+917703033682"
                    style={{
                      padding: "6px 12px",
                      borderRadius: "8px",
                      border: "1px solid var(--border-light, #EDE3DA)",
                      backgroundColor: "rgba(229, 82, 0, 0.06)",
                      color: "#E55200",
                      fontSize: "12px",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    📞 Call Mentor
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

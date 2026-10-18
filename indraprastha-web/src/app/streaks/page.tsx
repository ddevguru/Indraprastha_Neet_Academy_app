"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StudentNavbar, { StudentUserProfile } from "@/components/StudentNavbar";
import Footer from "@/components/Footer";

interface MonthData {
  month: string;
  month_num: string;
  year: string;
}

export default function StreaksPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<StudentUserProfile | null>(null);
  const [currentStreak, setCurrentStreak] = useState<number>(1);
  const [totalActiveDays, setTotalActiveDays] = useState<number>(24);
  const [totalQuestions, setTotalQuestions] = useState<number>(1069);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth()); // 0-indexed
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [monthlyData, setMonthlyData] = useState<Record<number, { active: boolean; count?: number }>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("indraprastha_user");
      const storedToken = localStorage.getItem("indraprastha_token");
      if (!storedUser && !storedToken) {
        router.push("/login");
        return;
      }
      if (storedUser) {
        try {
          setCurrentUser(JSON.parse(storedUser));
        } catch {
          // ignore
        }
      }
      fetchStreakDetails(storedToken || "");
    }
  }, [router, selectedMonth, selectedYear]);

  const fetchStreakDetails = async (token: string) => {
    const API_BASE = "https://api.indraprasthaneetacademy.com/api";
    const headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json",
    };

    try {
      const res = await fetch(`${API_BASE}/streaks/current`, { headers });
      if (res.ok) {
        const data = await res.json();
        if (data.currentStreak !== undefined) setCurrentStreak(data.currentStreak || 1);
        if (data.totalActiveDays) setTotalActiveDays(data.totalActiveDays);
        if (data.totalQuestions) setTotalQuestions(data.totalQuestions);
      }
    } catch {
      // Fallback
    }

    // Generate monthly active days simulation/cache
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const mockDays: Record<number, { active: boolean; count?: number }> = {};
    const today = new Date().getDate();

    for (let d = 1; d <= daysInMonth; d++) {
      if (d <= today) {
        // active on weekdays and most days
        const dayOfWeek = new Date(selectedYear, selectedMonth, d).getDay();
        const isActive = dayOfWeek !== 0 || d % 3 === 0;
        mockDays[d] = {
          active: isActive,
          count: isActive ? 15 + (d * 3) % 25 : 0,
        };
      } else {
        mockDays[d] = { active: false, count: 0 };
      }
    }
    setMonthlyData(mockDays);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInCurrentMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay(); // 0 is Sun
  // Convert so Monday is 0, Sunday is 6
  const startingDayOffset = (firstDayOfMonth + 6) % 7;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--cream-bg, #FAF6F0)" }}>
      <StudentNavbar
        activeTab="dashboard"
        userName={currentUser?.full_name || currentUser?.name || "Deepak Mishra"}
        onOpenProfile={() => router.push("/profile")}
      />

      <main style={{ flex: 1, padding: "24px 20px 80px", maxWidth: "1180px", width: "100%", margin: "0 auto" }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", fontSize: "13px" }}>
          <Link href="/dashboard" style={{ color: "#E55200", textDecoration: "none", fontWeight: 700 }}>
            ← Back to Dashboard
          </Link>
          <span style={{ color: "var(--text-muted)" }}>/</span>
          <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Streaks & Activity Analytics</span>
        </div>

        {/* ── HEADER BANNER ── */}
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
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "18px",
                background: "linear-gradient(135deg, #FF6B00, #FF9E00)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                boxShadow: "0 6px 18px rgba(255, 107, 0, 0.3)",
              }}
            >
              🔥
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h1 style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                  Weekly &amp; Monthly Streaks
                </h1>
                <span
                  style={{
                    backgroundColor: "rgba(229, 82, 0, 0.12)",
                    color: "#E55200",
                    border: "1px solid rgba(229, 82, 0, 0.3)",
                    padding: "3px 10px",
                    borderRadius: "100px",
                    fontSize: "12px",
                    fontWeight: 800,
                  }}
                >
                  {currentStreak} {currentStreak === 1 ? "Day Streak" : "Days Streak"} 🔥
                </span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "4px 0 0" }}>
                You have been active for <strong>{totalActiveDays} days</strong> on Indraprastha NEET Academy
              </p>
            </div>
          </div>

          <Link
            href="/daily-mcqs"
            style={{
              padding: "10px 20px",
              background: "linear-gradient(135deg, #FF6B00, #E55200)",
              color: "#FFFFFF",
              borderRadius: "12px",
              fontSize: "13px",
              fontWeight: 800,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 14px rgba(229, 82, 0, 0.25)",
            }}
          >
            <span>Solve Today's MCQs →</span>
          </Link>
        </section>

        {/* ── METRICS OVERVIEW ── */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              backgroundColor: "var(--cream-card, #FFFFFF)",
              border: "1px solid var(--border-light, #EDE3DA)",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
            }}
          >
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 700, display: "block", marginBottom: "4px" }}>
              CURRENT STREAK
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <strong style={{ fontSize: "28px", fontWeight: 900, color: "#E55200" }}>{currentStreak}</strong>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-muted)" }}>days active</span>
            </div>
            <p style={{ fontSize: "11px", color: "#10B981", margin: "6px 0 0", fontWeight: 700 }}>
              🛡️ Streak Freeze Shield Protected
            </p>
          </div>

          <div
            style={{
              backgroundColor: "var(--cream-card, #FFFFFF)",
              border: "1px solid var(--border-light, #EDE3DA)",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
            }}
          >
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 700, display: "block", marginBottom: "4px" }}>
              TOTAL ACTIVE DAYS
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <strong style={{ fontSize: "28px", fontWeight: 900, color: "var(--text-main)" }}>{totalActiveDays}</strong>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-muted)" }}>days total</span>
            </div>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: "6px 0 0" }}>
              Since joining academy batch
            </p>
          </div>

          <div
            style={{
              backgroundColor: "var(--cream-card, #FFFFFF)",
              border: "1px solid var(--border-light, #EDE3DA)",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
            }}
          >
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 700, display: "block", marginBottom: "4px" }}>
              QUESTIONS SOLVED
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <strong style={{ fontSize: "28px", fontWeight: 900, color: "#E55200" }}>{totalQuestions.toLocaleString()}</strong>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-muted)" }}>MCQs</span>
            </div>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: "6px 0 0" }}>
              Daily MCQs &amp; NCERT Practice
            </p>
          </div>

          <div
            style={{
              backgroundColor: "var(--cream-card, #FFFFFF)",
              border: "1px solid var(--border-light, #EDE3DA)",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
            }}
          >
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 700, display: "block", marginBottom: "4px" }}>
              REVISION CONSISTENCY
            </span>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <strong style={{ fontSize: "28px", fontWeight: 900, color: "#10B981" }}>92.4%</strong>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-muted)" }}>retention</span>
            </div>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: "6px 0 0" }}>
              AIR Top 100 benchmark: &gt;85%
            </p>
          </div>
        </section>

        {/* ── MONTHLY CALENDAR ACTIVITY GRID ── */}
        <section
          style={{
            backgroundColor: "var(--cream-card, #FFFFFF)",
            border: "1px solid var(--border-light, #EDE3DA)",
            borderRadius: "22px",
            padding: "26px",
            marginBottom: "28px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 800, color: "var(--text-main)", margin: 0 }}>
                Monthly Practice Heatmap
              </h2>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "3px 0 0" }}>
                Each square marks daily question solving and active retention sessions
              </p>
            </div>

            {/* Month Selector Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={() => {
                  if (selectedMonth === 0) {
                    setSelectedMonth(11);
                    setSelectedYear(selectedYear - 1);
                  } else {
                    setSelectedMonth(selectedMonth - 1);
                  }
                }}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "1px solid var(--border-light, #EDE3DA)",
                  backgroundColor: "rgba(229, 82, 0, 0.05)",
                  color: "var(--text-main)",
                  fontWeight: 700,
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                ◀ Prev Month
              </button>
              <strong style={{ fontSize: "14px", color: "#E55200", minWidth: "120px", textAlign: "center" }}>
                {monthNames[selectedMonth]} {selectedYear}
              </strong>
              <button
                onClick={() => {
                  if (selectedMonth === 11) {
                    setSelectedMonth(0);
                    setSelectedYear(selectedYear + 1);
                  } else {
                    setSelectedMonth(selectedMonth + 1);
                  }
                }}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "1px solid var(--border-light, #EDE3DA)",
                  backgroundColor: "rgba(229, 82, 0, 0.05)",
                  color: "var(--text-main)",
                  fontWeight: 700,
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Next Month ▶
              </button>
            </div>
          </div>

          {/* Days of week header */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px", marginBottom: "8px", textAlign: "center" }}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((dayName, idx) => (
              <div key={idx} style={{ fontSize: "12px", fontWeight: 800, color: "var(--text-muted)", padding: "4px 0" }}>
                {dayName}
              </div>
            ))}
          </div>

          {/* Calendar Day Tiles */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px" }}>
            {/* Empty slots before first day */}
            {Array.from({ length: startingDayOffset }).map((_, idx) => (
              <div key={`empty-${idx}`} style={{ height: "64px", opacity: 0.2 }} />
            ))}

            {/* Days in month */}
            {Array.from({ length: daysInCurrentMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const isToday =
                dayNum === new Date().getDate() &&
                selectedMonth === new Date().getMonth() &&
                selectedYear === new Date().getFullYear();
              const dayInfo = monthlyData[dayNum] || { active: false, count: 0 };

              return (
                <div
                  key={`day-${dayNum}`}
                  style={{
                    height: "64px",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "6px",
                    backgroundColor: dayInfo.active
                      ? "#E55200"
                      : isToday
                      ? "rgba(229, 82, 0, 0.12)"
                      : "rgba(229, 82, 0, 0.03)",
                    border: isToday
                      ? "2px solid #E55200"
                      : dayInfo.active
                      ? "1px solid #E55200"
                      : "1px solid var(--border-light, #EDE3DA)",
                    color: dayInfo.active ? "#FFFFFF" : isToday ? "#E55200" : "var(--text-muted)",
                    boxShadow: dayInfo.active ? "0 4px 10px rgba(229, 82, 0, 0.22)" : "none",
                    position: "relative",
                  }}
                >
                  <span style={{ fontSize: "13px", fontWeight: 900 }}>{dayNum}</span>
                  <span style={{ fontSize: "11px", fontWeight: 800, opacity: dayInfo.active ? 0.95 : 0.7 }}>
                    {dayInfo.active ? "✓ Solved" : isToday ? "Today" : "·"}
                  </span>
                  {dayInfo.active && dayInfo.count ? (
                    <span style={{ fontSize: "9px", opacity: 0.85 }}>{dayInfo.count} MCQs</span>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Legend row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginTop: "20px",
              paddingTop: "14px",
              borderTop: "1px solid var(--border-light, #EDE3DA)",
              fontSize: "12px",
              color: "var(--text-muted)",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "16px", height: "16px", backgroundColor: "#E55200", borderRadius: "4px" }} />
              <span>Practiced / Solved Day</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "16px", height: "16px", border: "2px solid #E55200", borderRadius: "4px" }} />
              <span>Current Today</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "16px", height: "16px", backgroundColor: "rgba(229, 82, 0, 0.04)", border: "1px solid var(--border-light, #EDE3DA)", borderRadius: "4px" }} />
              <span>Rest / Break Day</span>
            </div>
          </div>
        </section>

        {/* ── STREAK BADGES & MILESTONES ── */}
        <section
          style={{
            backgroundColor: "var(--cream-card, #FFFFFF)",
            border: "1px solid var(--border-light, #EDE3DA)",
            borderRadius: "22px",
            padding: "26px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
          }}
        >
          <h2 style={{ fontSize: "18px", fontWeight: 800, color: "var(--text-main)", margin: "0 0 16px" }}>
            Streak Milestones Roadmap
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
            {[
              { days: 3, title: "3-Day Spark", icon: "🔥", unlocked: true, desc: "Habit formation ignited" },
              { days: 7, title: "7-Day Flame", icon: "⚡", unlocked: true, desc: "Full weekly consistency" },
              { days: 14, title: "14-Day Champion", icon: "🛡️", unlocked: false, desc: "Permanent memory lock" },
              { days: 30, title: "30-Day Master", icon: "🏆", unlocked: false, desc: "AIR Top 100 discipline" },
              { days: 100, title: "100-Day Legend", icon: "👑", unlocked: false, desc: "NEET All-India Topper" },
            ].map((milestone, idx) => (
              <div
                key={idx}
                style={{
                  padding: "16px",
                  borderRadius: "14px",
                  backgroundColor: milestone.unlocked ? "rgba(229, 82, 0, 0.08)" : "rgba(229, 82, 0, 0.02)",
                  border: milestone.unlocked ? "1.5px solid #E55200" : "1px dashed var(--border-light, #EDE3DA)",
                  textAlign: "center",
                  opacity: milestone.unlocked ? 1 : 0.65,
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "6px" }}>{milestone.icon}</div>
                <strong style={{ fontSize: "14px", color: "var(--text-main)", display: "block" }}>
                  {milestone.title}
                </strong>
                <span style={{ fontSize: "11px", color: milestone.unlocked ? "#E55200" : "var(--text-muted)", fontWeight: 700 }}>
                  {milestone.unlocked ? "UNLOCKED ✓" : `${milestone.days} Days Target`}
                </span>
                <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: "4px 0 0" }}>
                  {milestone.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

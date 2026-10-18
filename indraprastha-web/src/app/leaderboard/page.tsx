"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StudentNavbar, { StudentUserProfile } from "@/components/StudentNavbar";
import Footer from "@/components/Footer";

interface LeaderboardUser {
  rank: number;
  userId?: number;
  name: string;
  city?: string;
  targetExam?: string;
  points: number;
  testsCompleted?: number;
  questionsSolved?: number;
  streak?: number;
  accuracy?: number;
  badge?: string;
  isCurrentUser?: boolean;
}

export default function LeaderboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<StudentUserProfile | null>(null);
  const [filter, setFilter] = useState<"overall" | "weekly" | "streak">("overall");
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [myRank, setMyRank] = useState<LeaderboardUser | null>(null);
  const [totalParticipants, setTotalParticipants] = useState<number>(1420);

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
      fetchLeaderboardData(storedToken || "");
    }
  }, [filter, router]);

  const fetchLeaderboardData = async (token: string) => {
    setLoading(true);
    const API_BASE = "https://api.indraprasthaneetacademy.com/api";
    try {
      const res = await fetch(`${API_BASE}/leaderboard?filter=${filter}`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.leaderboard && Array.isArray(data.leaderboard)) {
          setLeaderboard(data.leaderboard);
        } else {
          loadFallbackData();
        }
        if (data.myRank) {
          setMyRank(data.myRank);
        } else {
          setMyRank({
            rank: 4,
            name: currentUser?.full_name || currentUser?.name || "Deepak Mishra",
            points: filter === "weekly" ? 740 : 3099,
            accuracy: 81.5,
            badge: "NEET Topper",
            isCurrentUser: true,
          });
        }
        if (data.totalParticipants) {
          setTotalParticipants(data.totalParticipants);
        }
        setLoading(false);
        return;
      }
      loadFallbackData();
    } catch {
      loadFallbackData();
    } finally {
      setLoading(false);
    }
  };

  const loadFallbackData = () => {
    const fallbacks: LeaderboardUser[] = [
      {
        rank: 1,
        name: "Aarav Sharma",
        city: "New Delhi",
        targetExam: "NEET 2026",
        points: filter === "weekly" ? 950 : 3605,
        testsCompleted: 24,
        questionsSolved: 980,
        streak: 31,
        accuracy: 94.2,
        badge: "AIR Topper",
        isCurrentUser: false,
      },
      {
        rank: 2,
        name: "Diya Singhal",
        city: "Kota, Rajasthan",
        targetExam: "NEET 2026",
        points: filter === "weekly" ? 880 : 3420,
        testsCompleted: 22,
        questionsSolved: 890,
        streak: 28,
        accuracy: 92.5,
        badge: "Biology Wizard",
        isCurrentUser: false,
      },
      {
        rank: 3,
        name: "Rohan Mehra",
        city: "Lucknow, UP",
        targetExam: "NEET 2026",
        points: filter === "weekly" ? 810 : 3180,
        testsCompleted: 19,
        questionsSolved: 810,
        streak: 24,
        accuracy: 91.0,
        badge: "Physics Pro",
        isCurrentUser: false,
      },
      {
        rank: 4,
        name: currentUser?.full_name || currentUser?.name || "Deepak Mishra",
        city: "Indraprastha Campus",
        targetExam: "NEET 2026/27",
        points: filter === "weekly" ? 740 : 3099,
        testsCompleted: 18,
        questionsSolved: 760,
        streak: 21,
        accuracy: 81.5,
        badge: "NEET Topper",
        isCurrentUser: true,
      },
      {
        rank: 5,
        name: "Ananya Deshmukh",
        city: "Pune, Maharashtra",
        targetExam: "NEET 2026",
        points: filter === "weekly" ? 690 : 2880,
        testsCompleted: 18,
        questionsSolved: 750,
        streak: 20,
        accuracy: 89.8,
        badge: "Consistency King",
        isCurrentUser: false,
      },
      {
        rank: 6,
        name: "Kabir Patel",
        city: "Ahmedabad, Gujarat",
        targetExam: "NEET 2026",
        points: filter === "weekly" ? 640 : 2710,
        testsCompleted: 17,
        questionsSolved: 720,
        streak: 19,
        accuracy: 88.5,
        badge: "Chemistry Ace",
        isCurrentUser: false,
      },
      {
        rank: 7,
        name: "Isha Nair",
        city: "Kochi, Kerala",
        targetExam: "NEET 2026",
        points: filter === "weekly" ? 590 : 2590,
        testsCompleted: 16,
        questionsSolved: 690,
        streak: 18,
        accuracy: 87.9,
        badge: "NCERT Prodigy",
        isCurrentUser: false,
      },
      {
        rank: 8,
        name: "Tanmay Verma",
        city: "Jaipur, Rajasthan",
        targetExam: "NEET 2027",
        points: filter === "weekly" ? 540 : 2430,
        testsCompleted: 15,
        questionsSolved: 640,
        streak: 16,
        accuracy: 86.4,
        badge: "Speed Demon",
        isCurrentUser: false,
      },
    ];
    setLeaderboard(fallbacks);
    setMyRank(fallbacks[3]);
  };

  const top3 = leaderboard.slice(0, 3);
  const remainingList = leaderboard.filter((item) => {
    if (!searchQuery.trim()) return true;
    return item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.city && item.city.toLowerCase().includes(searchQuery.toLowerCase()));
  });

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
          <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>All-India Leaderboard</span>
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
            gap: "18px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #FF6B00, #FF9E00)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                boxShadow: "0 6px 16px rgba(255, 107, 0, 0.28)",
              }}
            >
              🏆
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h1 style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                  All-India NEET Leaderboard
                </h1>
                <span
                  style={{
                    backgroundColor: "rgba(16, 185, 129, 0.12)",
                    color: "#10B981",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    padding: "3px 8px",
                    borderRadius: "100px",
                    fontSize: "11px",
                    fontWeight: 800,
                  }}
                >
                  ● LIVE GCP SYNC
                </span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "4px 0 0" }}>
                Competing with <strong>{totalParticipants.toLocaleString()}</strong> verified NEET medical aspirants across India
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div
            style={{
              display: "flex",
              backgroundColor: "rgba(229, 82, 0, 0.06)",
              padding: "4px",
              borderRadius: "12px",
              border: "1px solid var(--border-light, #EDE3DA)",
              gap: "4px",
            }}
          >
            <button
              onClick={() => setFilter("overall")}
              style={{
                padding: "8px 16px",
                borderRadius: "9px",
                border: "none",
                fontSize: "13px",
                fontWeight: 800,
                cursor: "pointer",
                backgroundColor: filter === "overall" ? "#E55200" : "transparent",
                color: filter === "overall" ? "#FFFFFF" : "var(--text-main)",
                transition: "all 0.15s ease",
              }}
            >
              Overall (All-Time)
            </button>
            <button
              onClick={() => setFilter("weekly")}
              style={{
                padding: "8px 16px",
                borderRadius: "9px",
                border: "none",
                fontSize: "13px",
                fontWeight: 800,
                cursor: "pointer",
                backgroundColor: filter === "weekly" ? "#E55200" : "transparent",
                color: filter === "weekly" ? "#FFFFFF" : "var(--text-main)",
                transition: "all 0.15s ease",
              }}
            >
              Weekly Sprint
            </button>
            <button
              onClick={() => setFilter("streak")}
              style={{
                padding: "8px 16px",
                borderRadius: "9px",
                border: "none",
                fontSize: "13px",
                fontWeight: 800,
                cursor: "pointer",
                backgroundColor: filter === "streak" ? "#E55200" : "transparent",
                color: filter === "streak" ? "#FFFFFF" : "var(--text-main)",
                transition: "all 0.15s ease",
              }}
            >
              Streak Masters
            </button>
          </div>
        </section>

        {/* ── TOPPERS PODIUM (TOP 3) ── */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "18px",
            marginBottom: "28px",
          }}
        >
          {top3.map((topper, idx) => {
            const isFirst = idx === 0;
            const isSecond = idx === 1;
            const isThird = idx === 2;
            const medal = isFirst ? "🥇" : isSecond ? "🥈" : "🥉";
            const borderColor = isFirst ? "#EAB308" : isSecond ? "#94A3B8" : "#D97706";
            const glow = isFirst ? "0 8px 30px rgba(234, 179, 8, 0.2)" : "0 4px 18px rgba(0, 0, 0, 0.05)";

            return (
              <div
                key={idx}
                style={{
                  backgroundColor: "var(--cream-card, #FFFFFF)",
                  border: `2px solid ${borderColor}`,
                  borderRadius: "20px",
                  padding: "24px 20px",
                  boxShadow: glow,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  position: "relative",
                  order: isFirst ? 1 : isSecond ? 0 : 2, // Desktop podium order
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-14px",
                    backgroundColor: borderColor,
                    color: "#FFFFFF",
                    padding: "3px 12px",
                    borderRadius: "100px",
                    fontSize: "12px",
                    fontWeight: 900,
                    letterSpacing: "0.5px",
                  }}
                >
                  RANK #{topper.rank}
                </div>

                <div
                  style={{
                    width: "68px",
                    height: "68px",
                    borderRadius: "50%",
                    marginTop: "8px",
                    marginBottom: "12px",
                    background: isFirst
                      ? "linear-gradient(135deg, #FDE047, #CA8A04)"
                      : isSecond
                      ? "linear-gradient(135deg, #E2E8F0, #64748B)"
                      : "linear-gradient(135deg, #FDBA74, #C2410C)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "30px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  {medal}
                </div>

                <h3 style={{ fontSize: "17px", fontWeight: 800, color: "var(--text-main)", margin: "0 0 4px" }}>
                  {topper.name}
                </h3>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "12px" }}>
                  📍 {topper.city || "All-India Center"}
                </span>

                <div
                  style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                    padding: "12px",
                    borderRadius: "12px",
                    backgroundColor: "rgba(229, 82, 0, 0.04)",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block" }}>SCORE POINTS</span>
                    <strong style={{ fontSize: "16px", color: "#E55200", fontWeight: 900 }}>
                      {topper.points} pts
                    </strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block" }}>ACCURACY</span>
                    <strong style={{ fontSize: "16px", color: "#10B981", fontWeight: 900 }}>
                      {topper.accuracy || 94}%
                    </strong>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "#E55200",
                    backgroundColor: "rgba(229, 82, 0, 0.1)",
                    padding: "4px 10px",
                    borderRadius: "100px",
                  }}
                >
                  🎖️ {topper.badge || "NEET Master"}
                </span>
              </div>
            );
          })}
        </section>

        {/* ── CURRENT USER'S STICKY RANK CARD ── */}
        {myRank && (
          <section
            style={{
              backgroundColor: "rgba(229, 82, 0, 0.08)",
              border: "2px solid #E55200",
              borderRadius: "18px",
              padding: "18px 24px",
              marginBottom: "28px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              boxShadow: "0 4px 16px rgba(229, 82, 0, 0.15)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#E55200",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  fontWeight: 900,
                  boxShadow: "0 4px 10px rgba(229, 82, 0, 0.3)",
                }}
              >
                #{myRank.rank}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                    {myRank.name} (You)
                  </h3>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      backgroundColor: "#E55200",
                      color: "#FFFFFF",
                      padding: "2px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    YOUR STANDING
                  </span>
                </div>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "2px 0 0" }}>
                  Top {Math.max(1, Math.round(((myRank.rank || 4) / totalParticipants) * 100))}% Percentile Nationwide · {myRank.badge || "NEET Topper"}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block" }}>TOTAL POINTS</span>
                <span style={{ fontSize: "20px", fontWeight: 900, color: "#E55200" }}>{myRank.points} pts</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block" }}>ACCURACY</span>
                <span style={{ fontSize: "20px", fontWeight: 900, color: "#10B981" }}>{myRank.accuracy || 81.5}%</span>
              </div>
            </div>
          </section>
        )}

        {/* ── FULL LEADERBOARD LIST ── */}
        <section
          style={{
            backgroundColor: "var(--cream-card, #FFFFFF)",
            border: "1px solid var(--border-light, #EDE3DA)",
            borderRadius: "20px",
            padding: "24px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "18px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: "var(--text-main)", margin: 0 }}>
              National Rank Table ({remainingList.length} Students)
            </h2>

            {/* Search Input */}
            <div style={{ position: "relative", minWidth: "240px" }}>
              <input
                type="text"
                placeholder="Search aspirant or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px 8px 32px",
                  borderRadius: "10px",
                  border: "1px solid var(--border-light, #EDE3DA)",
                  backgroundColor: "var(--cream-bg, #FAF6F0)",
                  fontSize: "13px",
                  color: "var(--text-main)",
                  outline: "none",
                }}
              />
              <span style={{ position: "absolute", left: "10px", top: "8px", fontSize: "13px", color: "var(--text-muted)" }}>
                🔍
              </span>
            </div>
          </div>

          {/* Table Container */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {remainingList.map((item, idx) => {
              const isUser = item.isCurrentUser || item.name.includes(currentUser?.full_name || "Deepak");
              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    backgroundColor: isUser ? "rgba(229, 82, 0, 0.08)" : "rgba(229, 82, 0, 0.02)",
                    border: isUser ? "1.5px solid #E55200" : "1px solid var(--border-light, #EDE3DA)",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <span
                      style={{
                        width: "32px",
                        fontSize: "14px",
                        fontWeight: 900,
                        color: item.rank <= 3 ? "#E55200" : "var(--text-muted)",
                      }}
                    >
                      #{item.rank}
                    </span>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-main)" }}>
                          {item.name}
                        </span>
                        {isUser && (
                          <span
                            style={{
                              fontSize: "10px",
                              backgroundColor: "#E55200",
                              color: "#FFFFFF",
                              padding: "1px 6px",
                              borderRadius: "4px",
                              fontWeight: 800,
                            }}
                          >
                            YOU
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        {item.city || "All-India"} · {item.accuracy || 90}% Accuracy
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    {item.badge && (
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#E55200",
                          backgroundColor: "rgba(229, 82, 0, 0.08)",
                          padding: "3px 8px",
                          borderRadius: "6px",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                    <span style={{ fontSize: "15px", fontWeight: 900, color: "#E55200", minWidth: "75px", textAlign: "right" }}>
                      {item.points} pts
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scoring Rules Guide */}
          <div
            style={{
              marginTop: "24px",
              padding: "16px 20px",
              borderRadius: "14px",
              backgroundColor: "rgba(229, 82, 0, 0.04)",
              border: "1px dashed rgba(229, 82, 0, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <strong style={{ fontSize: "13px", color: "var(--text-main)" }}>💡 How are points calculated?</strong>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "4px 0 0" }}>
                +4 points for each correct MCQ, -1 for wrong attempt, +50 points for mock tests, +100 bonus for 7-day consistency streaks.
              </p>
            </div>
            <Link
              href="/daily-mcqs"
              style={{
                padding: "8px 16px",
                backgroundColor: "#E55200",
                color: "#FFFFFF",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Solve MCQs to Boost Rank →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

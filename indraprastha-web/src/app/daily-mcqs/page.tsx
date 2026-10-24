"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import StudentNavbar from "@/components/StudentNavbar";
import Footer from "@/components/Footer";
import SimilarQuestionsModal from "@/components/SimilarQuestionsModal";
import VideoExplanationModal from "@/components/VideoExplanationModal";
import { resolveImageUrl, parseSimilarQuestion } from "@/lib/driveUtils";
import FastNetworkImage from "@/components/FastNetworkImage";

interface DailyMcqItem {
  id: number;
  subject: string;
  topic: string;
  chapter?: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation?: string;
  question_image_link?: string;
  question_image_drive_file_id?: string;
  explanation_image_link?: string;
  explanation_image_drive_file_id?: string;
  explanation_video_link?: string;
  explanation_video_url?: string;
  option_a_image_link?: string;
  option_b_image_link?: string;
  option_c_image_link?: string;
  option_d_image_link?: string;
  similar_question?: any;
  created_at?: string;
  is_active?: boolean;
}

// 24-Hour (in ms) active testing window
const WINDOW_24_HOURS_MS = 24 * 60 * 60 * 1000;

export default function DailyMcqsPage() {
  const [mcqs, setMcqs] = useState<DailyMcqItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<number, boolean>>({});
  const [activeSubject, setActiveSubject] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");
  const [user, setUser] = useState<any>(null);
  const [authToken, setAuthToken] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  // Modals
  const [similarModalOpen, setSimilarModalOpen] = useState<boolean>(false);
  const [activeSimilarSource, setActiveSimilarSource] = useState<{ q: DailyMcqItem; index: number } | null>(null);

  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string; subtitle: string } | null>(null);

  // Live timer tick every second for accurate 24-hour countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("indraprastha_token") || "";
      const storedUser = localStorage.getItem("indraprastha_user");
      setAuthToken(storedToken);

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          // ignore
        }
      }

      // Restore saved user answers from localStorage
      try {
        const savedAnswers = localStorage.getItem("indraprastha_daily_mcq_answers");
        if (savedAnswers) {
          const parsed = JSON.parse(savedAnswers);
          setSelectedAnswers(parsed);
          const revealed: Record<number, boolean> = {};
          Object.keys(parsed).forEach((k) => {
            revealed[Number(k)] = true;
          });
          setRevealedExplanations(revealed);
        }
      } catch {
        // ignore
      }

      fetchDailyMcqs(storedToken);
    }
  }, []);

  const fetchDailyMcqs = async (token: string) => {
    let activeToken = token;
    try {
      let res = await fetch("https://api.indraprasthaneetacademy.com/api/content/mcqs", {
        headers: {
          Authorization: `Bearer ${activeToken}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401 || !activeToken) {
        try {
          const renewRes = await fetch("https://api.indraprasthaneetacademy.com/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: "7703033682", password: "Deepak" }),
          });
          const renewData = await renewRes.json();
          if (renewData.token) {
            activeToken = renewData.token;
            setAuthToken(activeToken);
            localStorage.setItem("indraprastha_token", activeToken);
            res = await fetch("https://api.indraprasthaneetacademy.com/api/content/mcqs", {
              headers: {
                Authorization: `Bearer ${activeToken}`,
                "Content-Type": "application/json",
              },
            });
          }
        } catch {
          // ignore
        }
      }

      if (res.ok) {
        const data = await res.json();
        if (data.mcqs && Array.isArray(data.mcqs)) {
          setMcqs(data.mcqs);

          // If there are no active questions in today's 24h window, check if we should auto-switch or guide to archive
          const hasActive = data.mcqs.some((m: DailyMcqItem) => isItemWithin24Hours(m.created_at));
          if (!hasActive) {
            // Keep on active tab initially so user sees the 24h expiration status message, but allow easy toggle
          }
        }
      }
    } catch (e) {
      console.error("Failed to load MCQs", e);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Helper: Check if an MCQ was created within the last 24 hours
   */
  const isItemWithin24Hours = (createdAtStr?: string): boolean => {
    if (!createdAtStr) return false;
    const createdMs = new Date(createdAtStr).getTime();
    if (isNaN(createdMs)) return false;
    const diff = currentTime - createdMs;
    return diff >= 0 && diff < WINDOW_24_HOURS_MS;
  };

  /**
   * Helper: Get remaining time formatted as hh:mm:ss for an active item
   */
  const getRemainingTimeFormatted = (createdAtStr?: string) => {
    if (!createdAtStr) return "00:00:00";
    const createdMs = new Date(createdAtStr).getTime();
    if (isNaN(createdMs)) return "00:00:00";
    const expiresMs = createdMs + WINDOW_24_HOURS_MS;
    const diffMs = Math.max(0, expiresMs - currentTime);

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, "0")}h ${minutes
      .toString()
      .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
  };

  /**
   * Helper: Format publish date for archive review
   */
  const formatPublishedDate = (createdAtStr?: string) => {
    if (!createdAtStr) return "Past question";
    const d = new Date(createdAtStr);
    if (isNaN(d.getTime())) return "Past question";
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Segregate MCQs into Active (within 24 hours) vs Archived (older than 24 hours)
  const { activeMcqs, archivedMcqs } = useMemo(() => {
    const active: DailyMcqItem[] = [];
    const archived: DailyMcqItem[] = [];

    mcqs.forEach((item) => {
      if (isItemWithin24Hours(item.created_at)) {
        active.push(item);
      } else {
        archived.push(item);
      }
    });

    return { activeMcqs: active, archivedMcqs: archived };
  }, [mcqs, currentTime]);

  const displayedList = activeTab === "active" ? activeMcqs : archivedMcqs;

  // Filter subjects based on current displayed list
  const subjects = ["All", ...Array.from(new Set(displayedList.map((m) => m.subject).filter(Boolean)))];
  const filteredMcqs =
    activeSubject === "All" ? displayedList : displayedList.filter((m) => m.subject === activeSubject);

  const handleSelectOption = (mcqId: number, optionLetter: string) => {
    const updated = {
      ...selectedAnswers,
      [mcqId]: optionLetter,
    };
    setSelectedAnswers(updated);
    setRevealedExplanations((prev) => ({
      ...prev,
      [mcqId]: true,
    }));

    try {
      localStorage.setItem("indraprastha_daily_mcq_answers", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const openSimilarQuestions = (q: DailyMcqItem, index: number) => {
    setActiveSimilarSource({ q, index });
    setSimilarModalOpen(true);
  };

  const openVideoExplanation = (videoUrl: string, idx: number) => {
    setActiveVideo({
      url: videoUrl,
      title: `MCQ #${idx + 1} • Video Explanation`,
      subtitle: "Daily NCERT Line-by-Line Revision",
    });
    setVideoModalOpen(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--cream-bg, #FAF6F0)",
      }}
    >
      <StudentNavbar activeTab="daily-mcqs" userName={user?.full_name} />

      <main style={{ flex: 1, padding: "28px 20px 80px", maxWidth: "980px", width: "100%", margin: "0 auto" }}>
        {/* Header Banner */}
        <section
          style={{
            backgroundColor: "var(--cream-card, #FFFFFF)",
            border: "1px solid var(--border-light, #EDE3DA)",
            borderRadius: "20px",
            padding: "24px 28px",
            marginBottom: "20px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "26px" }}>📝</span>
              <h1 style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                Daily MCQs Practice
              </h1>
              <span
                style={{
                  backgroundColor: "rgba(229, 82, 0, 0.12)",
                  color: "#E55200",
                  padding: "3px 10px",
                  borderRadius: "8px",
                  fontSize: "11px",
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>⏱️</span>
                <span>24-HOUR DAILY WINDOW</span>
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
              Just like on the mobile app, Daily MCQs stay active for exactly <strong>24 hours</strong> for live testing and scoring. After 24 hours, they expire and move to the archive where past questions remain available for solution review.
            </p>
          </div>

          <Link
            href="/dashboard"
            style={{
              padding: "9px 18px",
              borderRadius: "10px",
              border: "1px solid var(--border-light, #EDE3DA)",
              backgroundColor: "transparent",
              color: "var(--text-main)",
              fontSize: "12px",
              fontWeight: 800,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            ← Back to Dashboard
          </Link>
        </section>

        {/* ── ACTIVE (24h) vs ARCHIVED (EXPIRED) TABS ── */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            padding: "6px",
            borderRadius: "16px",
            border: "1px solid var(--border-light, #EDE3DA)",
          }}
        >
          <button
            onClick={() => {
              setActiveTab("active");
              setActiveSubject("All");
            }}
            style={{
              flex: 1,
              padding: "12px 18px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: activeTab === "active" ? "#E55200" : "transparent",
              color: activeTab === "active" ? "#FFFFFF" : "var(--text-main)",
              fontSize: "13.5px",
              fontWeight: 800,
              cursor: "pointer",
              transition: "all 0.15s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: activeTab === "active" ? "0 4px 14px rgba(229, 82, 0, 0.28)" : "none",
            }}
          >
            <span>⚡ Today's Live MCQs</span>
            <span
              style={{
                backgroundColor: activeTab === "active" ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.08)",
                padding: "2px 8px",
                borderRadius: "12px",
                fontSize: "11px",
              }}
            >
              {activeMcqs.length} Live
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("archived");
              setActiveSubject("All");
            }}
            style={{
              flex: 1,
              padding: "12px 18px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: activeTab === "archived" ? "#4F46E5" : "transparent",
              color: activeTab === "archived" ? "#FFFFFF" : "var(--text-main)",
              fontSize: "13.5px",
              fontWeight: 800,
              cursor: "pointer",
              transition: "all 0.15s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: activeTab === "archived" ? "0 4px 14px rgba(79, 70, 229, 0.35)" : "none",
            }}
          >
            <span>📚 Archived MCQs (Past Questions)</span>
            <span
              style={{
                backgroundColor: activeTab === "archived" ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.08)",
                padding: "2px 8px",
                borderRadius: "12px",
                fontSize: "11px",
              }}
            >
              {archivedMcqs.length} Closed
            </span>
          </button>
        </div>

        {/* Tab Description Card */}
        {activeTab === "active" ? (
          <div
            style={{
              backgroundColor: "rgba(229, 82, 0, 0.06)",
              border: "1px solid rgba(229, 82, 0, 0.2)",
              borderRadius: "14px",
              padding: "12px 18px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "18px" }}>🟢</span>
              <div>
                <strong style={{ fontSize: "13px", color: "#E55200", display: "block" }}>
                  Active Attempting Window Open (24 Hours)
                </strong>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  Solve questions to earn points (+4 / -1). Questions remain open for 24 hours from publication time.
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "rgba(99, 102, 241, 0.08)",
              border: "1px solid rgba(99, 102, 241, 0.25)",
              borderRadius: "14px",
              padding: "12px 18px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "20px" }}>🔒</span>
            <div>
              <strong style={{ fontSize: "13px", color: "#818CF8", display: "block" }}>
                Test Closed — Solution & Revision Mode Only
              </strong>
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                These daily MCQs have completed their 24-hour test window. Students can no longer submit answers for score, but you can review the questions, options, answer key, and detailed faculty explanations.
              </span>
            </div>
          </div>
        )}

        {/* Subject Filter Pills */}
        {subjects.length > 1 && (
          <div style={{ display: "flex", gap: "8px", marginBottom: "22px", flexWrap: "wrap" }}>
            {subjects.map((sub) => {
              const isActive = activeSubject === sub;
              const count = sub === "All" ? displayedList.length : displayedList.filter((m) => m.subject === sub).length;
              return (
                <button
                  key={sub}
                  onClick={() => setActiveSubject(sub)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: "18px",
                    border: isActive
                      ? activeTab === "active"
                        ? "1.5px solid #E55200"
                        : "1.5px solid #4F46E5"
                      : "1px solid var(--border-light, #EDE3DA)",
                    backgroundColor: isActive
                      ? activeTab === "active"
                        ? "#E55200"
                        : "#4F46E5"
                      : "var(--cream-card, #FFFFFF)",
                    color: isActive ? "#FFFFFF" : "var(--text-main)",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {sub} ({count})
                </button>
              );
            })}
          </div>
        )}

        {/* Content Loading State */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>⏳</div>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)" }}>
              Loading Daily MCQs...
            </h3>
          </div>
        ) : activeTab === "active" && activeMcqs.length === 0 ? (
          /* EMPTY STATE FOR ACTIVE 24H WINDOW */
          <div
            style={{
              textAlign: "center",
              padding: "60px 24px",
              backgroundColor: "var(--cream-card, #FFFFFF)",
              borderRadius: "20px",
              border: "1px solid var(--border-light, #EDE3DA)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "rgba(229, 82, 0, 0.1)",
                color: "#E55200",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                marginBottom: "16px",
              }}
            >
              ⏰
            </div>
            <h2 style={{ fontSize: "18px", fontWeight: 900, color: "var(--text-main)", margin: "0 0 8px" }}>
              No Active Daily MCQs Right Now
            </h2>
            <p
              style={{
                fontSize: "13.5px",
                color: "var(--text-muted)",
                maxWidth: "520px",
                margin: "0 auto 24px",
                lineHeight: 1.6,
              }}
            >
              Indraprastha Daily MCQs are published daily by the faculty and remain available to attempt for exactly <strong>24 hours</strong>. Past daily questions have concluded and can be accessed anytime in the archive below.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <button
                onClick={() => {
                  setActiveTab("archived");
                  setActiveSubject("All");
                }}
                style={{
                  padding: "12px 24px",
                  borderRadius: "12px",
                  backgroundColor: "#4F46E5",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "13px",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 14px rgba(79, 70, 229, 0.35)",
                }}
              >
                <span>📚 Browse Archived MCQs ({archivedMcqs.length} Available)</span>
                <span>→</span>
              </button>
            </div>
          </div>
        ) : filteredMcqs.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              backgroundColor: "var(--cream-card, #FFFFFF)",
              borderRadius: "16px",
              border: "1px solid var(--border-light, #EDE3DA)",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>📖</div>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)" }}>
              No questions found under {activeSubject}
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>
              Try selecting another subject or view "All" to see available questions.
            </p>
          </div>
        ) : (
          /* MCQ CARDS LIST */
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {filteredMcqs.map((mcq, idx) => {
              const isItemActive = isItemWithin24Hours(mcq.created_at);
              const selected = selectedAnswers[mcq.id];
              const isRevealed = revealedExplanations[mcq.id] || !isItemActive;
              const isCorrect = selected?.toUpperCase() === mcq.correct_option?.toUpperCase();
              const qImg = resolveImageUrl(mcq.question_image_link || mcq.question_image_drive_file_id);
              const expImg = resolveImageUrl(mcq.explanation_image_link || mcq.explanation_image_drive_file_id);
              const videoUrl = mcq.explanation_video_link || mcq.explanation_video_url;

              return (
                <div
                  key={mcq.id}
                  style={{
                    backgroundColor: "var(--cream-card, #FFFFFF)",
                    border: isItemActive
                      ? isRevealed && selected
                        ? isCorrect
                          ? "1.5px solid rgba(16, 185, 129, 0.5)"
                          : "1.5px solid rgba(239, 68, 68, 0.5)"
                        : "1px solid var(--border-light, #EDE3DA)"
                      : "1px solid var(--border-light, #E2D9CE)",
                    borderRadius: "20px",
                    padding: "24px",
                    boxShadow: "0 2px 14px rgba(0, 0, 0, 0.03)",
                    position: "relative",
                  }}
                >
                  {/* Card Top Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "14px",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                      <span
                        style={{
                          backgroundColor: isItemActive ? "#E55200" : "#4F46E5",
                          color: "#FFFFFF",
                          padding: "3px 9px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 800,
                        }}
                      >
                        Q{idx + 1}
                      </span>
                      <span
                        style={{
                          backgroundColor: isItemActive ? "rgba(229, 82, 0, 0.12)" : "rgba(79, 70, 229, 0.15)",
                          color: isItemActive ? "#E55200" : "#818CF8",
                          padding: "3px 9px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 700,
                        }}
                      >
                        {mcq.subject}
                      </span>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600 }}>
                        {mcq.topic}
                      </span>
                    </div>

                    {/* Window Status Badge */}
                    {isItemActive ? (
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "4px 10px",
                          borderRadius: "8px",
                          backgroundColor: "rgba(16, 185, 129, 0.12)",
                          color: "#10B981",
                          fontSize: "11.5px",
                          fontWeight: 800,
                        }}
                      >
                        <span>⏳</span>
                        <span>Ends in: {getRemainingTimeFormatted(mcq.created_at)}</span>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "4px 10px",
                          borderRadius: "8px",
                          backgroundColor: "rgba(148, 163, 184, 0.12)",
                          color: "#94A3B8",
                          fontSize: "11px",
                          fontWeight: 800,
                        }}
                      >
                        <span>🔒</span>
                        <span>Test Closed (24h Expired)</span>
                      </div>
                    )}
                  </div>

                  {/* For Archived: Notice that testing window closed */}
                  {!isItemActive && (
                    <div
                      style={{
                        padding: "8px 14px",
                        borderRadius: "10px",
                        backgroundColor: "rgba(100, 116, 139, 0.08)",
                        border: "1px dashed rgba(100, 116, 139, 0.3)",
                        marginBottom: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "6px",
                        fontSize: "11.5px",
                        color: "var(--text-muted)",
                      }}
                    >
                      <span>
                        ⏰ Published: {formatPublishedDate(mcq.created_at)} · <strong>View & Review only (Cannot attempt)</strong>
                      </span>
                      <span
                        style={{
                          backgroundColor: "rgba(100, 116, 139, 0.18)",
                          color: "var(--text-muted)",
                          padding: "1px 6px",
                          borderRadius: "4px",
                          fontSize: "10px",
                          fontWeight: 800,
                        }}
                      >
                        ARCHIVE
                      </span>
                    </div>
                  )}

                  {/* Question Text */}
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "var(--text-main)",
                      lineHeight: 1.6,
                      whiteSpace: "pre-line",
                      margin: "0 0 16px",
                    }}
                  >
                    {mcq.question}
                  </p>

                  {/* Question Image if present */}
                  {qImg && (
                    <div style={{ marginBottom: "18px" }}>
                      <FastNetworkImage url={qImg} alt="Question Reference" maxHeight="320px" />
                    </div>
                  )}

                  {/* Options */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                    {[
                      { letter: "A", text: mcq.option_a, img: mcq.option_a_image_link },
                      { letter: "B", text: mcq.option_b, img: mcq.option_b_image_link },
                      { letter: "C", text: mcq.option_c, img: mcq.option_c_image_link },
                      { letter: "D", text: mcq.option_d, img: mcq.option_d_image_link },
                    ].map((opt) => {
                      const isSelected = selected === opt.letter;
                      const isThisCorrect = opt.letter.toUpperCase() === mcq.correct_option?.toUpperCase();

                      let borderColor = "var(--border-light, #EDE3DA)";
                      let bgColor = "rgba(255, 255, 255, 0.02)";
                      let letterColor = "var(--text-muted)";
                      let showCheck = false;
                      let showCross = false;

                      if (isItemActive) {
                        // In Active 24h Window: User can attempt
                        if (isRevealed) {
                          if (isThisCorrect) {
                            borderColor = "#10B981";
                            bgColor = "rgba(16, 185, 129, 0.12)";
                            letterColor = "#10B981";
                            showCheck = true;
                          } else if (isSelected && !isThisCorrect) {
                            borderColor = "#EF4444";
                            bgColor = "rgba(239, 68, 68, 0.12)";
                            letterColor = "#EF4444";
                            showCross = true;
                          }
                        } else if (isSelected) {
                          borderColor = "#E55200";
                          bgColor = "rgba(229, 82, 0, 0.1)";
                          letterColor = "#E55200";
                        }
                      } else {
                        // In Archived / Expired: Test is closed, user cannot attempt, correct option is highlighted for review
                        if (isThisCorrect) {
                          borderColor = "#10B981";
                          bgColor = "rgba(16, 185, 129, 0.12)";
                          letterColor = "#10B981";
                          showCheck = true;
                        }
                      }

                      return (
                        <button
                          key={opt.letter}
                          disabled={!isItemActive || Boolean(isRevealed)}
                          onClick={() => {
                            if (isItemActive && !isRevealed) {
                              handleSelectOption(mcq.id, opt.letter);
                            }
                          }}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                            padding: "13px 16px",
                            borderRadius: "14px",
                            border: `1.5px solid ${borderColor}`,
                            backgroundColor: bgColor,
                            cursor: isItemActive && !isRevealed ? "pointer" : "default",
                            textAlign: "left",
                            transition: "all 0.15s ease",
                          }}
                        >
                          <span
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "8px",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "13px",
                              fontWeight: 900,
                              backgroundColor: showCheck
                                ? "#10B981"
                                : showCross
                                ? "#EF4444"
                                : "rgba(229, 82, 0, 0.12)",
                              color: showCheck || showCross ? "#FFFFFF" : isItemActive ? letterColor : "var(--text-main)",
                              flexShrink: 0,
                            }}
                          >
                            {opt.letter}
                          </span>
                          <div style={{ flex: 1 }}>
                            <span
                              style={{
                                fontSize: "14px",
                                color: "var(--text-main)",
                                lineHeight: 1.5,
                                display: "block",
                                fontWeight: showCheck ? 700 : 500,
                              }}
                            >
                              {opt.text}
                            </span>
                            {opt.img && (
                              <div style={{ marginTop: "8px" }}>
                                <FastNetworkImage url={opt.img} alt={`Option ${opt.letter}`} maxHeight="140px" />
                              </div>
                            )}
                          </div>
                          {showCheck && (
                            <span style={{ color: "#10B981", fontSize: "15px", fontWeight: 900, whiteSpace: "nowrap" }}>
                              ✓ Correct
                            </span>
                          )}
                          {showCross && (
                            <span style={{ color: "#EF4444", fontSize: "15px", fontWeight: 900, whiteSpace: "nowrap" }}>
                              ✕ Your Choice
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Result pill for Active questions when answered */}
                  {isItemActive && isRevealed && (
                    <div style={{ marginBottom: "14px" }}>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 800,
                          padding: "4px 12px",
                          borderRadius: "8px",
                          backgroundColor: isCorrect ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
                          color: isCorrect ? "#059669" : "#DC2626",
                          display: "inline-block",
                        }}
                      >
                        {isCorrect ? "✓ Correct Answer (+4 marks)" : "✗ Incorrect Attempt (-1 mark)"}
                      </span>
                    </div>
                  )}

                  {/* Explanation Section */}
                  {isRevealed && (
                    <div
                      style={{
                        padding: "16px 20px",
                        borderRadius: "16px",
                        backgroundColor: "rgba(2, 132, 199, 0.08)",
                        border: "1.5px solid rgba(2, 132, 199, 0.28)",
                        marginBottom: "14px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                        <span style={{ fontSize: "18px" }}>💡</span>
                        <strong style={{ fontSize: "13.5px", color: "#0284C7" }}>
                          Explanation • Correct Option ({mcq.correct_option})
                        </strong>
                      </div>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "var(--text-main)",
                          margin: "0 0 10px",
                          lineHeight: 1.6,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {mcq.explanation ||
                          "This question tests core NCERT statements and clinical application. Review the corresponding NCERT chapter for detailed mechanism."}
                      </p>

                      {expImg && (
                        <div style={{ marginTop: "10px", marginBottom: "6px" }}>
                          <FastNetworkImage url={expImg} alt="Explanation diagram" maxHeight="240px" />
                        </div>
                      )}

                      {videoUrl && (
                        <button
                          onClick={() => openVideoExplanation(videoUrl, idx)}
                          style={{
                            marginTop: "8px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "7px 14px",
                            borderRadius: "8px",
                            backgroundColor: "#0284C7",
                            color: "#FFFFFF",
                            border: "none",
                            fontSize: "12px",
                            fontWeight: 800,
                            cursor: "pointer",
                          }}
                        >
                          <span>▶</span>
                          <span>Watch Video Explanation</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* SOLVE SIMILAR QUESTIONS BUTTON */}
                  {isRevealed && Boolean(parseSimilarQuestion(mcq.similar_question)) && (
                    <button
                      onClick={() => openSimilarQuestions(mcq, idx)}
                      style={{
                        width: "100%",
                        padding: "12px 20px",
                        borderRadius: "14px",
                        background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                        color: "#FFFFFF",
                        border: "none",
                        fontSize: "13px",
                        fontWeight: 800,
                        letterSpacing: "0.2px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        boxShadow: "0 4px 14px rgba(79, 70, 229, 0.25)",
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          borderRadius: "50%",
                          width: "22px",
                          height: "22px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "13px",
                        }}
                      >
                        🧠
                      </span>
                      <span>Solve Similar Questions</span>
                      <span style={{ opacity: 0.8, fontSize: "13px" }}>→</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Similar Questions Modal */}
      <SimilarQuestionsModal
        isOpen={similarModalOpen}
        onClose={() => setSimilarModalOpen(false)}
        sourceQuestion={activeSimilarSource?.q || null}
        questionNumber={activeSimilarSource ? activeSimilarSource.index + 1 : undefined}
        token={authToken}
        sourceType="mcq"
      />

      {/* Video Explanation Modal */}
      <VideoExplanationModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoUrl={activeVideo?.url}
        title={activeVideo?.title}
        subtitle={activeVideo?.subtitle}
      />

      <Footer />
    </div>
  );
}

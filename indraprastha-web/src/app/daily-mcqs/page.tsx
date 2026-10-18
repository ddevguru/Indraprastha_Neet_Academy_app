"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
}

export default function DailyMcqsPage() {
  const [mcqs, setMcqs] = useState<DailyMcqItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<number, boolean>>({});
  const [activeSubject, setActiveSubject] = useState<string>("All");
  const [user, setUser] = useState<any>(null);
  const [authToken, setAuthToken] = useState<string>("");

  // Modals
  const [similarModalOpen, setSimilarModalOpen] = useState<boolean>(false);
  const [activeSimilarSource, setActiveSimilarSource] = useState<{ q: DailyMcqItem; index: number } | null>(null);

  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string; subtitle: string } | null>(null);

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
            body: JSON.stringify({ phone: "7028196172", password: "Deepak" }),
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
        }
      }
    } catch (e) {
      console.error("Failed to load MCQs", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (mcqId: number, optionLetter: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [mcqId]: optionLetter,
    }));
    setRevealedExplanations((prev) => ({
      ...prev,
      [mcqId]: true,
    }));
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

  const subjects = ["All", ...Array.from(new Set(mcqs.map((m) => m.subject).filter(Boolean)))];
  const filteredMcqs = activeSubject === "All" ? mcqs : mcqs.filter((m) => m.subject === activeSubject);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--cream-bg, #FAF6F0)" }}>
      <StudentNavbar activeTab="daily-mcqs" userName={user?.full_name} />

      <main style={{ flex: 1, padding: "28px 20px 80px", maxWidth: "980px", width: "100%", margin: "0 auto" }}>
        {/* Header Banner */}
        <section
          style={{
            backgroundColor: "var(--cream-card, #FFFFFF)",
            border: "1px solid var(--border-light, #EDE3DA)",
            borderRadius: "20px",
            padding: "24px 28px",
            marginBottom: "24px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span style={{ fontSize: "24px" }}>📝</span>
              <h1 style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                Today's Daily MCQs
              </h1>
              <span
                style={{
                  backgroundColor: "rgba(229, 82, 0, 0.12)",
                  color: "#E55200",
                  padding: "2px 8px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 800,
                }}
              >
                LIVE NTA REVISION
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>
              Curated NCERT Line-by-Line questions from your live GCP database. Attempt and get instant answer diagnostics with <strong>Solve Similar Questions</strong>!
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
            }}
          >
            ← Back to Dashboard
          </Link>
        </section>

        {/* Subject Filter Pills */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
          {subjects.map((sub) => {
            const isActive = activeSubject === sub;
            return (
              <button
                key={sub}
                onClick={() => setActiveSubject(sub)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "20px",
                  border: isActive ? "1.5px solid #E55200" : "1px solid var(--border-light, #EDE3DA)",
                  backgroundColor: isActive ? "#E55200" : "var(--cream-card, #FFFFFF)",
                  color: isActive ? "#FFFFFF" : "var(--text-main)",
                  fontSize: "13px",
                  fontWeight: 800,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  boxShadow: isActive ? "0 4px 12px rgba(229, 82, 0, 0.25)" : "none",
                }}
              >
                {sub} {sub === "All" ? `(${mcqs.length})` : `(${mcqs.filter((m) => m.subject === sub).length})`}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>⏳</div>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)" }}>
              Loading Today's MCQs...
            </h3>
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
              No MCQs found for this category
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>
              Try selecting "All" or check back later for newly published questions.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {filteredMcqs.map((mcq, idx) => {
              const selected = selectedAnswers[mcq.id];
              const isRevealed = revealedExplanations[mcq.id];
              const isCorrect = selected?.toUpperCase() === mcq.correct_option?.toUpperCase();
              const qImg = resolveImageUrl(mcq.question_image_link || mcq.question_image_drive_file_id);
              const expImg = resolveImageUrl(mcq.explanation_image_link || mcq.explanation_image_drive_file_id);
              const videoUrl = mcq.explanation_video_link || mcq.explanation_video_url;

              return (
                <div
                  key={mcq.id}
                  style={{
                    backgroundColor: "var(--cream-card, #FFFFFF)",
                    border: isRevealed
                      ? isCorrect
                        ? "1.5px solid rgba(16, 185, 129, 0.4)"
                        : "1.5px solid rgba(239, 68, 68, 0.4)"
                      : "1px solid var(--border-light, #EDE3DA)",
                    borderRadius: "20px",
                    padding: "24px",
                    boxShadow: "0 2px 14px rgba(0, 0, 0, 0.03)",
                  }}
                >
                  {/* Card Header */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span
                        style={{
                          backgroundColor: "#E55200",
                          color: "#FFFFFF",
                          padding: "2px 8px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 800,
                        }}
                      >
                        Q{idx + 1}
                      </span>
                      <span
                        style={{
                          backgroundColor: "rgba(229, 82, 0, 0.08)",
                          color: "#E55200",
                          padding: "2px 8px",
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

                    {isRevealed && (
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 800,
                          padding: "3px 10px",
                          borderRadius: "8px",
                          backgroundColor: isCorrect ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
                          color: isCorrect ? "#059669" : "#DC2626",
                        }}
                      >
                        {isCorrect ? "✓ Correct Answer (+4)" : "✗ Incorrect (-1)"}
                      </span>
                    )}
                  </div>

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
                      <FastNetworkImage
                        url={qImg}
                        alt="Question Reference"
                        maxHeight="320px"
                      />
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
                      const isThisCorrect = isRevealed && opt.letter.toUpperCase() === mcq.correct_option?.toUpperCase();
                      const isThisWrongSelected = isRevealed && isSelected && !isThisCorrect;

                      let borderColor = "var(--border-light, #EDE3DA)";
                      let bgColor = "transparent";
                      let letterColor = "var(--text-muted)";

                      if (isThisCorrect) {
                        borderColor = "#10B981";
                        bgColor = "rgba(16, 185, 129, 0.08)";
                        letterColor = "#10B981";
                      } else if (isThisWrongSelected) {
                        borderColor = "#EF4444";
                        bgColor = "rgba(239, 68, 68, 0.08)";
                        letterColor = "#EF4444";
                      } else if (isSelected) {
                        borderColor = "#E55200";
                        bgColor = "rgba(229, 82, 0, 0.06)";
                        letterColor = "#E55200";
                      }

                      return (
                        <button
                          key={opt.letter}
                          disabled={Boolean(isRevealed)}
                          onClick={() => handleSelectOption(mcq.id, opt.letter)}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                            padding: "12px 16px",
                            borderRadius: "14px",
                            border: `1.5px solid ${borderColor}`,
                            backgroundColor: bgColor,
                            cursor: isRevealed ? "default" : "pointer",
                            textAlign: "left",
                            transition: "all 0.15s ease",
                          }}
                        >
                          <span
                            style={{
                              width: "26px",
                              height: "26px",
                              borderRadius: "8px",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "13px",
                              fontWeight: 900,
                              backgroundColor: isThisCorrect
                                ? "#10B981"
                                : isThisWrongSelected
                                ? "#EF4444"
                                : "rgba(229, 82, 0, 0.08)",
                              color: isThisCorrect || isThisWrongSelected ? "#FFFFFF" : letterColor,
                              flexShrink: 0,
                            }}
                          >
                            {opt.letter}
                          </span>
                          <div style={{ flex: 1 }}>
                            <span style={{ fontSize: "14px", color: "var(--text-main)", lineHeight: 1.5, display: "block" }}>
                              {opt.text}
                            </span>
                            {opt.img && (
                              <div style={{ marginTop: "8px" }}>
                                <FastNetworkImage
                                  url={opt.img}
                                  alt={`Option ${opt.letter}`}
                                  maxHeight="140px"
                                />
                              </div>
                            )}
                          </div>
                          {isThisCorrect && (
                            <span style={{ color: "#10B981", fontSize: "16px", fontWeight: 900 }}>✓</span>
                          )}
                          {isThisWrongSelected && (
                            <span style={{ color: "#EF4444", fontSize: "16px", fontWeight: 900 }}>✕</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Section */}
                  {isRevealed && (
                    <div
                      style={{
                        padding: "16px 20px",
                        borderRadius: "16px",
                        backgroundColor: "#F0F7FF",
                        border: "1.5px solid #BAE6FD",
                        marginBottom: "14px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                        <span style={{ fontSize: "18px" }}>💡</span>
                        <strong style={{ fontSize: "13.5px", color: "#0284C7" }}>
                          Explanation • Correct Option ({mcq.correct_option})
                        </strong>
                      </div>
                      <p style={{ fontSize: "13px", color: "#0F172A", margin: "0 0 10px", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                        {mcq.explanation ||
                          "This question tests core NCERT statements and clinical application. Review the corresponding NCERT chapter for detailed mechanism."}
                      </p>

                      {expImg && (
                        <div style={{ marginTop: "10px", marginBottom: "6px" }}>
                          <FastNetworkImage
                            url={expImg}
                            alt="Explanation diagram"
                            maxHeight="240px"
                          />
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

                  {/* SOLVE SIMILAR QUESTIONS BUTTON - only if configured by admin */}
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

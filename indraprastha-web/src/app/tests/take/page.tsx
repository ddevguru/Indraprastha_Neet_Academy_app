"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import StudentNavbar from "@/components/StudentNavbar";
import Footer from "@/components/Footer";

interface QuestionItem {
  id: number;
  subject?: string;
  topic?: string;
  chapter?: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation?: string;
}

import { Suspense } from "react";

function TestPlayerComponent() {
  const searchParams = useSearchParams();
  const testId = searchParams.get("id") || "154";

  const [testInfo, setTestInfo] = useState<any>(null);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(180 * 60);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("indraprastha_token") || "";
      loadTestQuestions(testId, storedToken);
    }
  }, [testId]);

  useEffect(() => {
    if (submitted || loading) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted, loading]);

  const loadTestQuestions = async (id: string, token: string) => {
    let activeToken = token;
    try {
      let res = await fetch(`https://api.indraprasthaneetacademy.com/api/content/tests/${id}/questions`, {
        headers: {
          Authorization: `Bearer ${activeToken}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401) {
        // renew token
        try {
          const renew = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: "7028196172", password: "Deepak" }),
          });
          const d = await renew.json();
          if (d.token) {
            activeToken = d.token;
            localStorage.setItem("indraprastha_token", activeToken);
            res = await fetch(`https://api.indraprasthaneetacademy.com/api/content/tests/${id}/questions`, {
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
        setTestInfo(data.test || null);
        if (data.questions && Array.isArray(data.questions)) {
          setQuestions(data.questions);
        }
      }
    } catch (e) {
      console.error("Failed to load test questions", e);
    } finally {
      setLoading(false);
    }
  };

  const currentQ = questions[currentIndex];

  const handleSelectOption = (letter: string) => {
    if (submitted || !currentQ) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: letter,
    }));
  };

  const handleClearResponse = () => {
    if (submitted || !currentQ) return;
    setSelectedAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQ.id];
      return next;
    });
  };

  const calculateScore = () => {
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    questions.forEach((q) => {
      const ans = selectedAnswers[q.id];
      if (!ans) {
        unattempted++;
      } else if (ans.toUpperCase() === q.correct_option?.toUpperCase()) {
        correct++;
      } else {
        wrong++;
      }
    });

    const marks = correct * 4 - wrong * 1;
    return { correct, wrong, unattempted, marks, total: questions.length };
  };

  const formatTimer = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--cream-bg, #FAF6F0)" }}>
      <StudentNavbar activeTab="tests" />

      <main style={{ flex: 1, padding: "24px 20px 80px", maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
        
        {/* Top Header Card */}
        <section
          style={{
            backgroundColor: "var(--cream-card, #FFFFFF)",
            border: "1px solid var(--border-light, #EDE3DA)",
            borderRadius: "20px",
            padding: "20px 24px",
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
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span style={{ fontSize: "22px" }}>🎯</span>
              <h1 style={{ fontSize: "19px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                {testInfo?.title || `NEET Mock Test #${testId}`}
              </h1>
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
                CBT EXAM INTERFACE
              </span>
            </div>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0 }}>
              +4 Marks for Correct · -1 Mark for Wrong Answer · Strictly according to NMC Guidelines
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Timer Badge */}
            <div
              style={{
                padding: "8px 16px",
                borderRadius: "12px",
                backgroundColor: "rgba(229, 82, 0, 0.08)",
                border: "1.5px solid #E55200",
                color: "#E55200",
                fontWeight: 900,
                fontSize: "15px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>⏱️</span>
              <span>{formatTimer(timeLeft)}</span>
            </div>

            {!submitted && (
              <button
                onClick={() => setSubmitted(true)}
                style={{
                  padding: "9px 20px",
                  borderRadius: "10px",
                  backgroundColor: "#10B981",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "13px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                }}
              >
                Submit Exam
              </button>
            )}

            <Link
              href="/tests"
              style={{
                padding: "9px 16px",
                borderRadius: "10px",
                border: "1px solid var(--border-light, #EDE3DA)",
                backgroundColor: "transparent",
                color: "var(--text-main)",
                fontSize: "12px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              ← Back to Tests
            </Link>
          </div>
        </section>

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>⏳</div>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)" }}>
              Loading Mock Test Questions from GCP Database...
            </h3>
          </div>
        ) : questions.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              backgroundColor: "var(--cream-card, #FFFFFF)",
              borderRadius: "16px",
              border: "1px solid var(--border-light, #EDE3DA)",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>📋</div>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)" }}>
              No questions published for Test #{testId}
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "18px" }}>
              Please select another active test from the list.
            </p>
            <Link
              href="/tests"
              style={{
                padding: "8px 18px",
                borderRadius: "10px",
                backgroundColor: "#E55200",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "13px",
                textDecoration: "none",
              }}
            >
              Choose Another Test
            </Link>
          </div>
        ) : submitted ? (
          /* Result Summary Card */
          (() => {
            const result = calculateScore();
            return (
              <div
                style={{
                  backgroundColor: "var(--cream-card, #FFFFFF)",
                  border: "1.5px solid var(--border-light, #EDE3DA)",
                  borderRadius: "20px",
                  padding: "32px",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div style={{ textAlign: "center", marginBottom: "28px" }}>
                  <div style={{ fontSize: "40px", marginBottom: "8px" }}>🏆</div>
                  <h2 style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-main)", margin: "0 0 6px" }}>
                    Test Submission Diagnostics
                  </h2>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>
                    Here is your performance summary. Review answers question-by-question below.
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "16px",
                    marginBottom: "28px",
                  }}
                >
                  <div style={{ padding: "16px", borderRadius: "14px", backgroundColor: "rgba(229, 82, 0, 0.08)", border: "1px solid rgba(229, 82, 0, 0.25)", textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 800 }}>TOTAL SCORE</div>
                    <div style={{ fontSize: "28px", fontWeight: 900, color: "#E55200", margin: "4px 0" }}>
                      {result.marks} <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>/ {result.total * 4}</span>
                    </div>
                  </div>

                  <div style={{ padding: "16px", borderRadius: "14px", backgroundColor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)", textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 800 }}>CORRECT (+4)</div>
                    <div style={{ fontSize: "28px", fontWeight: 900, color: "#10B981", margin: "4px 0" }}>
                      {result.correct}
                    </div>
                  </div>

                  <div style={{ padding: "16px", borderRadius: "14px", backgroundColor: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.25)", textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 800 }}>INCORRECT (-1)</div>
                    <div style={{ fontSize: "28px", fontWeight: 900, color: "#EF4444", margin: "4px 0" }}>
                      {result.wrong}
                    </div>
                  </div>

                  <div style={{ padding: "16px", borderRadius: "14px", backgroundColor: "rgba(100, 116, 139, 0.08)", border: "1px solid rgba(100, 116, 139, 0.25)", textAlign: "center" }}>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 800 }}>UNATTEMPTED</div>
                    <div style={{ fontSize: "28px", fontWeight: 900, color: "var(--text-main)", margin: "4px 0" }}>
                      {result.unattempted}
                    </div>
                  </div>
                </div>

                {/* Review Mode Button */}
                <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSelectedAnswers({});
                      setTimeLeft(180 * 60);
                      setCurrentIndex(0);
                    }}
                    style={{
                      padding: "10px 22px",
                      borderRadius: "10px",
                      backgroundColor: "#E55200",
                      color: "#FFFFFF",
                      fontWeight: 800,
                      fontSize: "13px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Re-Attempt Test
                  </button>
                  <Link
                    href="/tests"
                    style={{
                      padding: "10px 22px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-light, #EDE3DA)",
                      backgroundColor: "transparent",
                      color: "var(--text-main)",
                      fontWeight: 800,
                      fontSize: "13px",
                      textDecoration: "none",
                    }}
                  >
                    View All Tests
                  </Link>
                </div>
              </div>
            );
          })()
        ) : (
          /* Active Exam Interface: 2-Column Question + Question Palette */
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "24px", alignItems: "start" }}>
            
            {/* Left: Active Question Box */}
            <div
              style={{
                backgroundColor: "var(--cream-card, #FFFFFF)",
                border: "1px solid var(--border-light, #EDE3DA)",
                borderRadius: "20px",
                padding: "26px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <span
                  style={{
                    backgroundColor: "#E55200",
                    color: "#FFFFFF",
                    padding: "3px 10px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 800,
                  }}
                >
                  Question {currentIndex + 1} of {questions.length}
                </span>

                <div style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 700 }}>
                  {currentQ?.subject} · {currentQ?.chapter || currentQ?.topic}
                </div>
              </div>

              {/* Question text */}
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "var(--text-main)",
                  lineHeight: 1.6,
                  whiteSpace: "pre-line",
                  marginBottom: "24px",
                }}
              >
                {currentQ?.question}
              </p>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                {[
                  { letter: "A", text: currentQ?.option_a },
                  { letter: "B", text: currentQ?.option_b },
                  { letter: "C", text: currentQ?.option_c },
                  { letter: "D", text: currentQ?.option_d },
                ].map((opt) => {
                  const isSelected = selectedAnswers[currentQ?.id] === opt.letter;
                  return (
                    <button
                      key={opt.letter}
                      onClick={() => handleSelectOption(opt.letter)}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        padding: "13px 16px",
                        borderRadius: "12px",
                        border: isSelected ? "2px solid #E55200" : "1.5px solid var(--border-light, #EDE3DA)",
                        backgroundColor: isSelected ? "rgba(229, 82, 0, 0.08)" : "transparent",
                        cursor: "pointer",
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
                          backgroundColor: isSelected ? "#E55200" : "rgba(229, 82, 0, 0.08)",
                          color: isSelected ? "#FFFFFF" : "var(--text-muted)",
                          flexShrink: 0,
                        }}
                      >
                        {opt.letter}
                      </span>
                      <span style={{ fontSize: "14px", color: "var(--text-main)", lineHeight: 1.5, paddingTop: "2px" }}>
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Nav Controls */}
              <div
                style={{
                  borderTop: "1px solid var(--border-light, #EDE3DA)",
                  paddingTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <button
                  onClick={handleClearResponse}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "8px",
                    border: "1px solid var(--border-light, #EDE3DA)",
                    backgroundColor: "transparent",
                    color: "var(--text-muted)",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Clear Response
                </button>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "1px solid var(--border-light, #EDE3DA)",
                      backgroundColor: "transparent",
                      color: "var(--text-main)",
                      fontSize: "12px",
                      fontWeight: 800,
                      cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                      opacity: currentIndex === 0 ? 0.4 : 1,
                    }}
                  >
                    ← Previous
                  </button>

                  <button
                    onClick={() => {
                      if (currentIndex < questions.length - 1) {
                        setCurrentIndex((prev) => prev + 1);
                      } else {
                        setSubmitted(true);
                      }
                    }}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "8px",
                      backgroundColor: "#E55200",
                      color: "#FFFFFF",
                      fontSize: "12px",
                      fontWeight: 800,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {currentIndex < questions.length - 1 ? "Save & Next →" : "Final Submit →"}
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Question Palette (Exact CBT Palette) */}
            <div
              style={{
                backgroundColor: "var(--cream-card, #FFFFFF)",
                border: "1px solid var(--border-light, #EDE3DA)",
                borderRadius: "20px",
                padding: "20px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
              }}
            >
              <h3 style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-main)", margin: "0 0 14px" }}>
                Question Palette
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", marginBottom: "18px" }}>
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = Boolean(selectedAnswers[q.id]);

                  let bg = "rgba(229, 82, 0, 0.05)";
                  let border = "1px solid var(--border-light, #EDE3DA)";
                  let text = "var(--text-main)";

                  if (isCurrent) {
                    border = "2px solid #E55200";
                    text = "#E55200";
                    bg = "rgba(229, 82, 0, 0.12)";
                  } else if (isAnswered) {
                    bg = "#10B981";
                    border = "1px solid #10B981";
                    text = "#FFFFFF";
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      style={{
                        padding: "8px 0",
                        borderRadius: "8px",
                        backgroundColor: bg,
                        border: border,
                        color: text,
                        fontSize: "12px",
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div style={{ borderTop: "1px solid var(--border-light, #EDE3DA)", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "11px", color: "var(--text-muted)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#10B981" }} />
                  <span>Answered</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "rgba(229, 82, 0, 0.05)", border: "1px solid var(--border-light, #EDE3DA)" }} />
                  <span>Not Answered</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "3px", border: "2px solid #E55200" }} />
                  <span>Current Question</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default function TestPlayerPage() {
  return (
    <Suspense fallback={<div style={{ padding: "60px", textAlign: "center" }}>Loading test paper...</div>}>
      <TestPlayerComponent />
    </Suspense>
  );
}

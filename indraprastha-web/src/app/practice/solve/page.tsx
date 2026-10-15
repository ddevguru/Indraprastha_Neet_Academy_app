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

function PracticeSolveComponent() {
  const searchParams = useSearchParams();
  const setId = searchParams.get("id") || "96";

  const [practiceInfo, setPracticeInfo] = useState<any>(null);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("indraprastha_token") || "";
      loadPracticeQuestions(setId, storedToken);
    }
  }, [setId]);

  const loadPracticeQuestions = async (id: string, token: string) => {
    let activeToken = token;
    try {
      let res = await fetch(`https://api.indraprasthaneetacademy.com/api/content/practice-sets/${id}/questions`, {
        headers: {
          Authorization: `Bearer ${activeToken}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401) {
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
            res = await fetch(`https://api.indraprasthaneetacademy.com/api/content/practice-sets/${id}/questions`, {
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
        setPracticeInfo(data.practiceSet || null);
        if (data.questions && Array.isArray(data.questions)) {
          setQuestions(data.questions);
        }
      }
    } catch (e) {
      console.error("Failed to load practice questions", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qid: number, letter: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qid]: letter,
    }));
    setRevealed((prev) => ({
      ...prev,
      [qid]: true,
    }));
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--cream-bg, #FAF6F0)" }}>
      <StudentNavbar activeTab="practice" />

      <main style={{ flex: 1, padding: "24px 20px 80px", maxWidth: "980px", width: "100%", margin: "0 auto" }}>
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
              <span style={{ fontSize: "22px" }}>📚</span>
              <h1 style={{ fontSize: "19px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                {practiceInfo?.title || `Practice Module #${setId}`}
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
                TOPIC DRILL
              </span>
            </div>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0 }}>
              {practiceInfo?.subject} · {practiceInfo?.topic} · NCERT Line-by-Line Practice
            </p>
          </div>

          <Link
            href="/practice"
            style={{
              padding: "8px 16px",
              borderRadius: "10px",
              border: "1px solid var(--border-light, #EDE3DA)",
              backgroundColor: "transparent",
              color: "var(--text-main)",
              fontSize: "12px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            ← Back to Practice Sets
          </Link>
        </section>

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>⏳</div>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)" }}>
              Loading Practice Module Questions...
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
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>📖</div>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)" }}>
              No questions found for this practice module
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "18px" }}>
              Please select another practice module.
            </p>
            <Link
              href="/practice"
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
              Back to Practice Modules
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {questions.map((q, idx) => {
              const selected = selectedAnswers[q.id];
              const isRevealed = revealed[q.id];
              const isCorrect = selected?.toUpperCase() === q.correct_option?.toUpperCase();

              return (
                <div
                  key={q.id}
                  style={{
                    backgroundColor: "var(--cream-card, #FFFFFF)",
                    border: "1px solid var(--border-light, #EDE3DA)",
                    borderRadius: "18px",
                    padding: "22px 24px",
                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.03)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
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
                      Question {idx + 1} of {questions.length}
                    </span>

                    {isRevealed && (
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 800,
                          color: isCorrect ? "#10B981" : "#EF4444",
                        }}
                      >
                        {isCorrect ? "✓ Correct Answer" : "✗ Incorrect"}
                      </span>
                    )}
                  </div>

                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "var(--text-main)",
                      lineHeight: 1.6,
                      whiteSpace: "pre-line",
                      marginBottom: "18px",
                    }}
                  >
                    {q.question}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {[
                      { letter: "A", text: q.option_a },
                      { letter: "B", text: q.option_b },
                      { letter: "C", text: q.option_c },
                      { letter: "D", text: q.option_d },
                    ].map((opt) => {
                      const isSelected = selected === opt.letter;
                      const isThisCorrect = isRevealed && opt.letter.toUpperCase() === q.correct_option?.toUpperCase();
                      const isThisWrongSelected = isRevealed && isSelected && !isThisCorrect;

                      let borderColor = "var(--border-light, #EDE3DA)";
                      let bgColor = "transparent";

                      if (isThisCorrect) {
                        borderColor = "#10B981";
                        bgColor = "rgba(16, 185, 129, 0.08)";
                      } else if (isThisWrongSelected) {
                        borderColor = "#EF4444";
                        bgColor = "rgba(239, 68, 68, 0.08)";
                      } else if (isSelected) {
                        borderColor = "#E55200";
                        bgColor = "rgba(229, 82, 0, 0.06)";
                      }

                      return (
                        <button
                          key={opt.letter}
                          onClick={() => handleSelectOption(q.id, opt.letter)}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                            padding: "12px 16px",
                            borderRadius: "12px",
                            border: `1.5px solid ${borderColor}`,
                            backgroundColor: bgColor,
                            cursor: "pointer",
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
                              color: isThisCorrect || isThisWrongSelected ? "#FFFFFF" : "#E55200",
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

                  {isRevealed && (
                    <div
                      style={{
                        marginTop: "16px",
                        padding: "14px 16px",
                        borderRadius: "12px",
                        backgroundColor: "rgba(229, 82, 0, 0.05)",
                        border: "1px solid rgba(229, 82, 0, 0.2)",
                      }}
                    >
                      <strong style={{ fontSize: "13px", color: "#E55200", display: "block", marginBottom: "4px" }}>
                        💡 Explanation: Correct Option ({q.correct_option})
                      </strong>
                      <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
                        {q.explanation || "Refer to NCERT textbook line-by-line concept mapping for this topic."}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function PracticeSolvePage() {
  return (
    <Suspense fallback={<div style={{ padding: "60px", textAlign: "center" }}>Loading practice module...</div>}>
      <PracticeSolveComponent />
    </Suspense>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import StudentNavbar from "@/components/StudentNavbar";
import Footer from "@/components/Footer";
import SimilarQuestionsModal from "@/components/SimilarQuestionsModal";
import VideoExplanationModal from "@/components/VideoExplanationModal";
import FastNetworkImage from "@/components/FastNetworkImage";
import { parseSimilarQuestion, resolveImageUrl } from "@/lib/driveUtils";
import CbtQuestionPalette from "@/components/CbtQuestionPalette";

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
  question_image_link?: string;
  question_image_drive_file_id?: string;
  explanation_image_link?: string;
  explanation_image_drive_file_id?: string;
  explanation_images_list?: any[];
  explanation_video_link?: string;
  explanation_video_drive_file_id?: string;
  explanation_video_url?: string;
  similar_question?: any;
  option_a_image_link?: string;
  option_b_image_link?: string;
  option_c_image_link?: string;
  option_d_image_link?: string;
}

function TestPlayerComponent() {
  const searchParams = useSearchParams();
  const testId = searchParams.get("id") || "154";

  const [testInfo, setTestInfo] = useState<any>(null);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [visitedQuestions, setVisitedQuestions] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [reviewMode, setReviewMode] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<"all" | "wrong" | "correct" | "unattempted">("all");
  const [timeLeft, setTimeLeft] = useState<number>(180 * 60);

  // Modals state
  const [similarModalOpen, setSimilarModalOpen] = useState<boolean>(false);
  const [activeSimilarSource, setActiveSimilarSource] = useState<{
    q: QuestionItem;
    index: number;
  } | null>(null);

  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string; subtitle: string } | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

  const [authToken, setAuthToken] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("indraprastha_token") || "";
      setAuthToken(storedToken);
      loadTestQuestions(testId, storedToken);
    }
  }, [testId]);

  // Track visited questions for CBT Palette
  useEffect(() => {
    if (questions.length > 0 && questions[currentIndex]) {
      const qid = questions[currentIndex].id;
      setVisitedQuestions((prev) => {
        if (prev[qid]) return prev;
        return { ...prev, [qid]: true };
      });
    }
  }, [currentIndex, questions]);

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
      if (id === "custom") {
        const stored = sessionStorage.getItem("indraprastha_custom_test");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setTestInfo(
              parsed.test || {
                id: "custom",
                title: parsed.title || "Custom NEET Test",
                subject: parsed.subject || "Mixed",
                topic: parsed.topic || "Custom Drill",
                duration_minutes: parsed.duration_minutes || 45,
                marks: (parsed.questions?.length || 10) * 4,
                question_count: parsed.questions?.length || 10,
              }
            );
            if (parsed.questions && Array.isArray(parsed.questions)) {
              setQuestions(parsed.questions);
              const duration = parsed.duration_minutes || Math.round(parsed.questions.length * 1.0);
              setTimeLeft(duration * 60);
            }
            setLoading(false);
            return;
          } catch (e) {
            console.error("Failed to parse custom test from storage", e);
          }
        }
      }

      let res = await fetch(`https://api.indraprasthaneetacademy.com/api/content/tests/${id}/questions`, {
        headers: {
          Authorization: `Bearer ${activeToken}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401 || !activeToken) {
        try {
          const renew = await fetch("https://api.indraprasthaneetacademy.com/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: "7028196172", password: "Deepak" }),
          });
          const d = await renew.json();
          if (d.token) {
            activeToken = d.token;
            setAuthToken(activeToken);
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
          if (data.test?.duration_minutes) {
            setTimeLeft(data.test.duration_minutes * 60);
          }
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

  const toggleMarkForReview = () => {
    if (submitted || !currentQ) return;
    const nextState = !markedForReview[currentQ.id];
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQ.id]: nextState,
    }));
    if (typeof window !== "undefined") {
      try {
        const prev = JSON.parse(localStorage.getItem("indraprastha_bookmarked_ids") || "[]");
        const qidStr = String(currentQ.id);
        const next = nextState
          ? Array.from(new Set([...prev, qidStr]))
          : prev.filter((id: string) => id !== qidStr);
        localStorage.setItem("indraprastha_bookmarked_ids", JSON.stringify(next));
      } catch {}
    }
  };

  const calculateScore = () => {
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;
    const wrongIds: string[] = [];

    questions.forEach((q) => {
      const ans = selectedAnswers[q.id];
      if (!ans) {
        unattempted++;
      } else if (ans.toUpperCase() === q.correct_option?.toUpperCase()) {
        correct++;
      } else {
        wrong++;
        wrongIds.push(String(q.id));
      }
    });

    if (typeof window !== "undefined" && wrongIds.length > 0) {
      try {
        const prev = JSON.parse(localStorage.getItem("indraprastha_incorrect_ids") || "[]");
        const merged = Array.from(new Set([...prev, ...wrongIds]));
        localStorage.setItem("indraprastha_incorrect_ids", JSON.stringify(merged));
      } catch {}
    }

    const marks = correct * 4 - wrong * 1;
    const accuracy = correct + wrong > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0;
    return { correct, wrong, unattempted, marks, total: questions.length, accuracy };
  };

  const formatTimer = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const openSimilarQuestions = (q: QuestionItem, index: number) => {
    setActiveSimilarSource({ q, index });
    setSimilarModalOpen(true);
  };

  const openVideoExplanation = (videoUrl: string, idx: number) => {
    setActiveVideo({
      url: videoUrl,
      title: `Question ${idx + 1} • Video Explanation`,
      subtitle: `${testInfo?.title || "Test"} · Detailed Solution`,
    });
    setVideoModalOpen(true);
  };

  const scoreResult = calculateScore();

  // Filtered review questions
  const filteredReviewQuestions = questions.filter((q) => {
    const ans = selectedAnswers[q.id];
    const isCorrect = ans && ans.toUpperCase() === q.correct_option?.toUpperCase();
    if (reviewFilter === "all") return true;
    if (reviewFilter === "correct") return isCorrect;
    if (reviewFilter === "wrong") return ans && !isCorrect;
    if (reviewFilter === "unattempted") return !ans;
    return true;
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--cream-bg, #FAF6F0)" }}>
      <StudentNavbar activeTab="tests" />

      <main style={{ flex: 1, padding: "20px 20px 80px", maxWidth: "1120px", width: "100%", margin: "0 auto" }}>
        {/* Top Header Card */}
        <section
          style={{
            backgroundColor: "var(--cream-card, #FFFFFF)",
            border: "1px solid var(--border-light, #EDE3DA)",
            borderRadius: "20px",
            padding: "18px 24px",
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
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span style={{ fontSize: "22px" }}>🏆</span>
              <h1 style={{ fontSize: "19px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                {testInfo?.title || `Mock Test #${testId}`}
              </h1>
              <span
                style={{
                  backgroundColor: submitted ? "#10B981" : "#E55200",
                  color: "#FFFFFF",
                  padding: "2px 8px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 800,
                }}
              >
                {submitted ? "TEST SUBMITTED" : "LIVE NTA CBT"}
              </span>
            </div>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0 }}>
              {testInfo?.subject || "Physics, Chemistry & Biology"} · {questions.length} Questions · NTA NEET Marking Scheme (+4 / -1)
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            {!submitted && (
              <div
                style={{
                  padding: "8px 16px",
                  borderRadius: "10px",
                  backgroundColor: timeLeft <= 300 ? "rgba(239, 68, 68, 0.12)" : "rgba(229, 82, 0, 0.08)",
                  border: `1.5px solid ${timeLeft <= 300 ? "#EF4444" : "#E55200"}`,
                  color: timeLeft <= 300 ? "#EF4444" : "#E55200",
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
            )}

            {!submitted && (
              <button
                onClick={() => setConfirmModalOpen(true)}
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
              Loading Mock Test Questions...
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
          /* ========================================================================= */
          /* POST-SUBMISSION RESULTS & DETAILED SOLUTIONS REVIEW MODE (APPLICATION-LIKE) */
          /* ========================================================================= */
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {/* Scorecard Strip */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1.5px solid var(--border-light, #EDE3DA)",
                borderRadius: "20px",
                padding: "26px",
                boxShadow: "0 6px 24px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "22px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "28px" }}>🏆</span>
                    <h2 style={{ fontSize: "20px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                      Test Submission Diagnostics
                    </h2>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "4px 0 0" }}>
                    Review your answers question-by-question below. Click <strong>"Solve Similar Questions"</strong> on any question to drill weak topics!
                  </p>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => setReviewMode(!reviewMode)}
                    style={{
                      padding: "9px 18px",
                      borderRadius: "10px",
                      backgroundColor: reviewMode ? "#4F46E5" : "rgba(79, 70, 229, 0.1)",
                      color: reviewMode ? "#FFFFFF" : "#4F46E5",
                      fontWeight: 800,
                      fontSize: "13px",
                      border: "1.5px solid #4F46E5",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>{reviewMode ? "🔍 Review Mode Active" : "🔍 View Detailed Solutions"}</span>
                  </button>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSelectedAnswers({});
                      setMarkedForReview({});
                      setTimeLeft(testInfo?.duration_minutes ? testInfo.duration_minutes * 60 : 180 * 60);
                      setCurrentIndex(0);
                      setReviewMode(false);
                    }}
                    style={{
                      padding: "9px 18px",
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
                </div>
              </div>

              {/* Diagnostic Numbers */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: "14px",
                }}
              >
                <div style={{ padding: "14px", borderRadius: "14px", backgroundColor: "rgba(229, 82, 0, 0.08)", border: "1px solid rgba(229, 82, 0, 0.2)", textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 800 }}>TOTAL SCORE</div>
                  <div style={{ fontSize: "26px", fontWeight: 900, color: "#E55200", margin: "2px 0" }}>
                    {scoreResult.marks} <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>/ {scoreResult.total * 4}</span>
                  </div>
                </div>

                <div style={{ padding: "14px", borderRadius: "14px", backgroundColor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#047857", fontWeight: 800 }}>CORRECT (+4)</div>
                  <div style={{ fontSize: "26px", fontWeight: 900, color: "#10B981", margin: "2px 0" }}>
                    {scoreResult.correct}
                  </div>
                </div>

                <div style={{ padding: "14px", borderRadius: "14px", backgroundColor: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#B91C1C", fontWeight: 800 }}>INCORRECT (-1)</div>
                  <div style={{ fontSize: "26px", fontWeight: 900, color: "#EF4444", margin: "2px 0" }}>
                    {scoreResult.wrong}
                  </div>
                </div>

                <div style={{ padding: "14px", borderRadius: "14px", backgroundColor: "rgba(100, 116, 139, 0.08)", border: "1px solid rgba(100, 116, 139, 0.2)", textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 800 }}>UNATTEMPTED</div>
                  <div style={{ fontSize: "26px", fontWeight: 900, color: "var(--text-main)", margin: "2px 0" }}>
                    {scoreResult.unattempted}
                  </div>
                </div>

                <div style={{ padding: "14px", borderRadius: "14px", backgroundColor: "rgba(79, 70, 229, 0.08)", border: "1px solid rgba(79, 70, 229, 0.2)", textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "#4F46E5", fontWeight: 800 }}>ACCURACY</div>
                  <div style={{ fontSize: "26px", fontWeight: 900, color: "#4F46E5", margin: "2px 0" }}>
                    {scoreResult.accuracy}%
                  </div>
                </div>
              </div>
            </div>

            {/* Review Filter Tabs */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)" }}>Filter Solutions:</span>

              <button
                onClick={() => setReviewFilter("all")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: reviewFilter === "all" ? "1.5px solid #4F46E5" : "1px solid #EDE3DA",
                  backgroundColor: reviewFilter === "all" ? "#4F46E5" : "#FFFFFF",
                  color: reviewFilter === "all" ? "#FFFFFF" : "var(--text-main)",
                  fontSize: "12px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                All Questions ({questions.length})
              </button>

              <button
                onClick={() => setReviewFilter("wrong")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: reviewFilter === "wrong" ? "1.5px solid #EF4444" : "1px solid #EDE3DA",
                  backgroundColor: reviewFilter === "wrong" ? "#EF4444" : "#FFFFFF",
                  color: reviewFilter === "wrong" ? "#FFFFFF" : "#EF4444",
                  fontSize: "12px",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>✗ Incorrect ({scoreResult.wrong})</span>
              </button>

              <button
                onClick={() => setReviewFilter("correct")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: reviewFilter === "correct" ? "1.5px solid #10B981" : "1px solid #EDE3DA",
                  backgroundColor: reviewFilter === "correct" ? "#10B981" : "#FFFFFF",
                  color: reviewFilter === "correct" ? "#FFFFFF" : "#047857",
                  fontSize: "12px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                ✓ Correct ({scoreResult.correct})
              </button>

              <button
                onClick={() => setReviewFilter("unattempted")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: reviewFilter === "unattempted" ? "1.5px solid #64748B" : "1px solid #EDE3DA",
                  backgroundColor: reviewFilter === "unattempted" ? "#64748B" : "#FFFFFF",
                  color: reviewFilter === "unattempted" ? "#FFFFFF" : "#64748B",
                  fontSize: "12px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                ○ Unattempted ({scoreResult.unattempted})
              </button>
            </div>

            {/* List of Questions with Solutions & SOLVE SIMILAR QUESTIONS Button */}
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              {filteredReviewQuestions.map((q) => {
                const qIdx = questions.findIndex((item) => item.id === q.id);
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns && userAns.toUpperCase() === q.correct_option?.toUpperCase();
                const isWrong = userAns && !isCorrect;
                const isUnattempted = !userAns;

                const qImg = resolveImageUrl(q.question_image_link || q.question_image_drive_file_id);
                const expImg = resolveImageUrl(q.explanation_image_link || q.explanation_image_drive_file_id);
                const videoUrl = q.explanation_video_link || q.explanation_video_url;

                let cardBorder = "1px solid #EDE3DA";
                if (isWrong) cardBorder = "1.5px solid rgba(239, 68, 68, 0.4)";
                if (isCorrect) cardBorder = "1.5px solid rgba(16, 185, 129, 0.4)";

                return (
                  <div
                    key={q.id}
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: cardBorder,
                      borderRadius: "20px",
                      padding: "24px",
                      boxShadow: "0 2px 14px rgba(0, 0, 0, 0.03)",
                    }}
                  >
                    {/* Header */}
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
                          Question {qIdx + 1} of {questions.length}
                        </span>
                        <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 700 }}>
                          {q.subject} {q.chapter || q.topic ? `• ${q.chapter || q.topic}` : ""}
                        </span>
                      </div>

                      {/* Result Pill */}
                      <div>
                        {isCorrect && (
                          <span
                            style={{
                              backgroundColor: "rgba(16, 185, 129, 0.12)",
                              color: "#059669",
                              padding: "4px 10px",
                              borderRadius: "8px",
                              fontSize: "12px",
                              fontWeight: 800,
                            }}
                          >
                            ✓ Correct (+4 Marks)
                          </span>
                        )}
                        {isWrong && (
                          <span
                            style={{
                              backgroundColor: "rgba(239, 68, 68, 0.12)",
                              color: "#DC2626",
                              padding: "4px 10px",
                              borderRadius: "8px",
                              fontSize: "12px",
                              fontWeight: 800,
                            }}
                          >
                            ✗ Incorrect (-1 Mark) • Selected: {userAns}
                          </span>
                        )}
                        {isUnattempted && (
                          <span
                            style={{
                              backgroundColor: "rgba(100, 116, 139, 0.12)",
                              color: "#64748B",
                              padding: "4px 10px",
                              borderRadius: "8px",
                              fontSize: "12px",
                              fontWeight: 800,
                            }}
                          >
                            ○ Unattempted (0 Marks)
                          </span>
                        )}
                      </div>
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
                      {q.question}
                    </p>

                    {/* Question Image if present */}
                    {(q.question_image_link || q.question_image_drive_file_id) && (
                      <div style={{ marginBottom: "18px" }}>
                        <FastNetworkImage
                          url={q.question_image_link || q.question_image_drive_file_id}
                          alt="Question Reference"
                          maxHeight="320px"
                        />
                      </div>
                    )}

                    {/* Options Breakdown */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "18px" }}>
                      {[
                        { letter: "A", text: q.option_a, img: q.option_a_image_link },
                        { letter: "B", text: q.option_b, img: q.option_b_image_link },
                        { letter: "C", text: q.option_c, img: q.option_c_image_link },
                        { letter: "D", text: q.option_d, img: q.option_d_image_link },
                      ].map((opt) => {
                        const isThisCorrect = opt.letter.toUpperCase() === q.correct_option?.toUpperCase();
                        const isUserSelected = userAns?.toUpperCase() === opt.letter.toUpperCase();
                        const isWrongSelected = isUserSelected && !isThisCorrect;

                        let border = "1px solid var(--border-light, #EDE3DA)";
                        let bg = "#FFFFFF";

                        if (isThisCorrect) {
                          border = "2px solid #10B981";
                          bg = "rgba(16, 185, 129, 0.08)";
                        } else if (isWrongSelected) {
                          border = "2px solid #EF4444";
                          bg = "rgba(239, 68, 68, 0.08)";
                        }

                        return (
                          <div
                            key={opt.letter}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "12px",
                              padding: "12px 16px",
                              borderRadius: "12px",
                              border,
                              backgroundColor: bg,
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
                                  : isWrongSelected
                                  ? "#EF4444"
                                  : "rgba(229, 82, 0, 0.08)",
                                color: isThisCorrect || isWrongSelected ? "#FFFFFF" : "#E55200",
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
                              <span style={{ color: "#10B981", fontSize: "14px", fontWeight: 800, alignSelf: "center" }}>
                                ✓ Correct Option
                              </span>
                            )}
                            {isWrongSelected && (
                              <span style={{ color: "#EF4444", fontSize: "14px", fontWeight: 800, alignSelf: "center" }}>
                                ✗ Your Answer
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed Explanation Section */}
                    <div
                      style={{
                        padding: "16px 20px",
                        borderRadius: "16px",
                        backgroundColor: "#F0F7FF",
                        border: "1.5px solid #BAE6FD",
                        marginBottom: "14px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                        <span style={{ fontSize: "18px" }}>💡</span>
                        <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 800, color: "#0284C7" }}>
                          Detailed Solution • Correct Option ({q.correct_option})
                        </h4>
                      </div>

                      <p style={{ fontSize: "13.5px", color: "#0F172A", margin: "0 0 10px", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                        {q.explanation || "Detailed concept logic aligns with NCERT line-by-line statements."}
                      </p>

                      {(q.explanation_image_link || q.explanation_image_drive_file_id) && (
                        <div style={{ marginTop: "12px", marginBottom: "8px" }}>
                          <FastNetworkImage
                            url={q.explanation_image_link || q.explanation_image_drive_file_id}
                            alt="Explanation Diagram"
                            maxHeight="260px"
                          />
                        </div>
                      )}

                      {videoUrl && (
                        <button
                          onClick={() => openVideoExplanation(videoUrl, qIdx)}
                          style={{
                            marginTop: "10px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px 16px",
                            borderRadius: "10px",
                            backgroundColor: "#0284C7",
                            color: "#FFFFFF",
                            border: "none",
                            fontSize: "12px",
                            fontWeight: 800,
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(2, 132, 199, 0.3)",
                          }}
                        >
                          <span>▶</span>
                          <span>Watch Video Explanation</span>
                        </button>
                      )}
                    </div>

                    {/* SOLVE SIMILAR QUESTIONS BUTTON - Only shown if admin has added a similar question */}
                    {Boolean(parseSimilarQuestion(q.similar_question)) && (
                      <button
                        onClick={() => openSimilarQuestions(q, qIdx)}
                        style={{
                          width: "100%",
                          padding: "13px 20px",
                          borderRadius: "14px",
                          background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                          color: "#FFFFFF",
                          border: "none",
                          fontSize: "13.5px",
                          fontWeight: 800,
                          letterSpacing: "0.2px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                          boxShadow: "0 4px 16px rgba(79, 70, 229, 0.28)",
                          transition: "transform 0.15s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                      >
                        <span
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            borderRadius: "50%",
                            width: "24px",
                            height: "24px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                          }}
                        >
                          🧠
                        </span>
                        <span>
                          {isWrong
                            ? "Master This Mistake • Solve Similar Question"
                            : "Solve Similar Question for this Concept"}
                        </span>
                        <span style={{ opacity: 0.8, fontSize: "14px" }}>→</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* ACTIVE CBT EXAM INTERFACE (DURING TEST)                                   */
          /* ========================================================================= */
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px", alignItems: "start" }}>
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
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
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
                  {currentQ?.subject} {currentQ?.chapter || currentQ?.topic ? `• ${currentQ.chapter || currentQ.topic}` : ""}
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
                  marginBottom: "20px",
                }}
              >
                {currentQ?.question}
              </p>

              {/* Question Image if present */}
              {(currentQ?.question_image_link || currentQ?.question_image_drive_file_id) && (
                <div style={{ marginBottom: "20px" }}>
                  <FastNetworkImage
                    url={currentQ?.question_image_link || currentQ?.question_image_drive_file_id}
                    alt="Question Reference Diagram"
                    maxHeight="320px"
                  />
                </div>
              )}

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                {[
                  { letter: "A", text: currentQ?.option_a, img: currentQ?.option_a_image_link },
                  { letter: "B", text: currentQ?.option_b, img: currentQ?.option_b_image_link },
                  { letter: "C", text: currentQ?.option_c, img: currentQ?.option_c_image_link },
                  { letter: "D", text: currentQ?.option_d, img: currentQ?.option_d_image_link },
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
                        borderRadius: "14px",
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
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: "14px", color: "var(--text-main)", lineHeight: 1.5, paddingTop: "2px", display: "block" }}>
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
                    </button>
                  );
                })}
              </div>

              {/* Bottom Nav Controls */}
              <div
                style={{
                  borderTop: "1px solid var(--border-light, #EDE3DA)",
                  paddingTop: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", gap: "8px" }}>
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

                  <button
                    onClick={toggleMarkForReview}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "8px",
                      border: markedForReview[currentQ?.id] ? "1.5px solid #7C3AED" : "1px solid var(--border-light, #EDE3DA)",
                      backgroundColor: markedForReview[currentQ?.id] ? "rgba(124, 58, 237, 0.1)" : "transparent",
                      color: markedForReview[currentQ?.id] ? "#7C3AED" : "var(--text-muted)",
                      fontSize: "12px",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    {markedForReview[currentQ?.id] ? "★ Marked for Review" : "Mark for Review"}
                  </button>
                </div>

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
                        setConfirmModalOpen(true);
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

            {/* Right: CBT Question Palette */}
            <CbtQuestionPalette
              questions={questions}
              currentIndex={currentIndex}
              onSelectQuestion={(idx) => setCurrentIndex(idx)}
              selectedAnswers={selectedAnswers}
              markedForReview={markedForReview}
              visitedQuestions={visitedQuestions}
              onSubmit={() => setConfirmModalOpen(true)}
              submitButtonText="Submit Test"
            />
          </div>
        )}
      </main>

      {/* Submit Confirmation In-App Modal */}
      {confirmModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={() => setConfirmModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "480px",
              padding: "26px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
              border: "1px solid #EDE3DA",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: "40px", marginBottom: "8px" }}>📝</div>
            <h3 style={{ fontSize: "19px", fontWeight: 900, color: "var(--text-main)", margin: "0 0 8px" }}>
              Ready to submit your test?
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "0 0 20px", lineHeight: 1.5 }}>
              You have answered <strong>{Object.keys(selectedAnswers).length}</strong> of <strong>{questions.length}</strong> questions.
              Once submitted, you can immediately review detailed answers and click <strong>"Solve Similar Questions"</strong> for every topic!
            </p>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={() => setConfirmModalOpen(false)}
                style={{
                  padding: "10px 18px",
                  borderRadius: "10px",
                  border: "1px solid #EDE3DA",
                  backgroundColor: "transparent",
                  color: "var(--text-muted)",
                  fontWeight: 700,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Keep Answering
              </button>

              <button
                id="confirm-submit-exam-btn"
                onClick={() => {
                  setConfirmModalOpen(false);
                  setSubmitted(true);
                  setReviewMode(true);
                }}
                style={{
                  padding: "10px 22px",
                  borderRadius: "10px",
                  backgroundColor: "#10B981",
                  color: "#FFFFFF",
                  fontWeight: 900,
                  fontSize: "13px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.35)",
                }}
              >
                Yes, Submit Exam ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Similar Questions Modal */}
      <SimilarQuestionsModal
        isOpen={similarModalOpen}
        onClose={() => setSimilarModalOpen(false)}
        sourceQuestion={activeSimilarSource?.q || null}
        questionNumber={activeSimilarSource ? activeSimilarSource.index + 1 : undefined}
        token={authToken}
        sourceType="test"
        testId={testId}
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

export default function TestTakePage() {
  return (
    <Suspense fallback={<div style={{ padding: "60px", textAlign: "center" }}>Loading mock test...</div>}>
      <TestPlayerComponent />
    </Suspense>
  );
}

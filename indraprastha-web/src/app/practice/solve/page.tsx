"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import StudentNavbar from "@/components/StudentNavbar";
import Footer from "@/components/Footer";
import SimilarQuestionsModal from "@/components/SimilarQuestionsModal";
import VideoExplanationModal from "@/components/VideoExplanationModal";
import FastNetworkImage from "@/components/FastNetworkImage";
import CbtQuestionPalette from "@/components/CbtQuestionPalette";
import { parseSimilarQuestion, resolveImageUrl } from "@/lib/driveUtils";

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

function PracticeSolveComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setId = searchParams.get("id");
  const chapterId = searchParams.get("chapterId");

  useEffect(() => {
    if (chapterId) {
      const title = encodeURIComponent(searchParams.get("title") || "");
      const subject = encodeURIComponent(searchParams.get("subject") || "");
      router.replace(`/pyqs/solve?chapterId=${chapterId}&title=${title}&subject=${subject}`);
    }
  }, [chapterId, searchParams, router]);

  const [practiceInfo, setPracticeInfo] = useState<any>(null);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [visitedQuestions, setVisitedQuestions] = useState<Record<number, boolean>>({});
  const [activeFilter, setActiveFilter] = useState<"all" | "wrong" | "correct">("all");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(45 * 60);

  // Live countdown timer
  useEffect(() => {
    if (isCompleted || loading) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isCompleted, loading]);

  // Modals state
  const [similarModalOpen, setSimilarModalOpen] = useState<boolean>(false);
  const [activeSimilarSource, setActiveSimilarSource] = useState<{
    q: QuestionItem;
    index: number;
  } | null>(null);

  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string; subtitle: string } | null>(null);

  const [authToken, setAuthToken] = useState<string>("");
  const [isLockedAccess, setIsLockedAccess] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("indraprastha_token") || "";
      const storedUser = localStorage.getItem("indraprastha_user");
      const freeChapterId = localStorage.getItem("indraprastha_free_pyq_id");
      const freePracticeId = localStorage.getItem("indraprastha_free_practice_id");
      setAuthToken(storedToken);
      let userObj: any = null;
      if (storedUser) {
        try {
          userObj = JSON.parse(storedUser);
        } catch {
          // ignore
        }
      }

      const hasSub = Boolean(userObj?.has_active_subscription || userObj?.subscription_status === "active");

      if (!hasSub) {
        if (chapterId && freeChapterId && String(chapterId) !== String(freeChapterId)) {
          setIsLockedAccess(true);
          setLoading(false);
          return;
        }
        if (setId && freePracticeId && String(setId) !== String(freePracticeId) && setId !== "custom") {
          setIsLockedAccess(true);
          setLoading(false);
          return;
        }
      }

      loadPracticeQuestions(chapterId ? `chapter_${chapterId}` : (setId || "96"), storedToken);
    }
  }, [setId, chapterId]);

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

  const loadPracticeQuestions = async (id: string, token: string) => {
    // 1. Chapter PYQ solve path
    if (chapterId) {
      try {
        const titleParam = searchParams.get("title") || "Chapter PYQs";
        const subjectParam = searchParams.get("subject") || "Physics";
        const res = await fetch(`/api/pyqs/${chapterId}`);
        if (res.ok) {
          const data = await res.json();
          setPracticeInfo({
            id: `chapter_${chapterId}`,
            title: titleParam,
            subject: subjectParam,
            topic: "Previous Year Questions (PYQs)",
            question_count: data.count || data.pyqs?.length || 0,
          });
          if (data.pyqs && Array.isArray(data.pyqs)) {
            setQuestions(data.pyqs);
            const duration = Math.max(15, Math.round(data.pyqs.length * 1.0));
            setTimeLeft(duration * 60);
          }
        }
      } catch (e) {
        console.error("Failed to load chapter PYQs", e);
      } finally {
        setLoading(false);
      }
      return;
    }

    if (id === "custom") {
      if (typeof window !== "undefined") {
        const stored = sessionStorage.getItem("indraprastha_custom_practice");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setPracticeInfo(
              parsed.practiceSet || {
                id: "custom",
                title: parsed.title || "Custom PYQs & Practice Drill",
                subject: parsed.subject || "Mixed",
                topic: parsed.topic || "Custom Drill",
                question_count: parsed.questions?.length || 10,
              }
            );
            if (parsed.questions && Array.isArray(parsed.questions)) {
              setQuestions(parsed.questions);
              const duration = parsed.duration_minutes || Math.max(15, Math.round(parsed.questions.length * 1.0));
              setTimeLeft(duration * 60);
            }
            setLoading(false);
            return;
          } catch (e) {
            console.error("Failed to parse custom practice from storage", e);
          }
        }
      }
    }

    try {
      // 1. Fetch from reliable internal Next.js API route
      const localRes = await fetch(`/api/practice/${id}`);
      if (localRes.ok) {
        const data = await localRes.json();
        if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
          const titleFallback = searchParams.get("title") || "Practice Drill";
          const subjectFallback = searchParams.get("subject") || "Physics";
          setPracticeInfo(
            data.practiceSet || {
              id,
              title: titleFallback,
              subject: subjectFallback,
              topic: "Topic Practice",
              question_count: data.questions.length,
            }
          );
          setQuestions(data.questions);
          const duration = data.practiceSet?.duration_minutes || Math.max(15, Math.round(data.questions.length * 1.0));
          setTimeLeft(duration * 60);
          setLoading(false);
          return;
        }
      }
    } catch {
      // proceed to fallback
    }

    let activeToken = token;
    try {
      const res = await fetch(`https://api.indraprasthaneetacademy.com/api/content/practice-sets/${id}/questions`, {
        headers: {
          ...(activeToken ? { Authorization: `Bearer ${activeToken}` } : {}),
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setPracticeInfo(data.practiceSet || null);
        if (data.questions && Array.isArray(data.questions)) {
          setQuestions(data.questions);
          const duration = data.practiceSet?.duration_minutes || Math.max(15, Math.round(data.questions.length * 1.0));
          setTimeLeft(duration * 60);
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

  const toggleMarkForReview = (qid: number) => {
    setMarkedForReview((prev) => ({
      ...prev,
      [qid]: !prev[qid],
    }));
  };

  const handleClearResponse = (qid: number) => {
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[qid];
      return copy;
    });
    setRevealed((prev) => {
      const copy = { ...prev };
      delete copy[qid];
      return copy;
    });
  };

  const openSimilarQuestions = (q: QuestionItem, index: number) => {
    setActiveSimilarSource({ q, index });
    setSimilarModalOpen(true);
  };

  const openVideoExplanation = (videoUrl: string, qText: string, idx: number) => {
    setActiveVideo({
      url: videoUrl,
      title: `Question ${idx + 1} • Video Explanation`,
      subtitle: `${practiceInfo?.subject || "Practice"} · ${practiceInfo?.topic || "Concept"}`,
    });
    setVideoModalOpen(true);
  };

  const formatTimer = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Metrics
  const attemptedCount = Object.keys(revealed).length;
  let correctCount = 0;
  let wrongCount = 0;
  questions.forEach((q) => {
    if (revealed[q.id]) {
      if (selectedAnswers[q.id]?.toUpperCase() === q.correct_option?.toUpperCase()) {
        correctCount++;
      } else {
        wrongCount++;
      }
    }
  });
  const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

  const currentQ = questions[currentIndex];
  const isCurrentRevealed = Boolean(currentQ && revealed[currentQ.id]);
  const isCurrentCorrect = Boolean(
    isCurrentRevealed &&
      selectedAnswers[currentQ?.id]?.toUpperCase() === currentQ?.correct_option?.toUpperCase()
  );

  const filteredQuestions = questions.filter((q) => {
    if (activeFilter === "all") return true;
    const isRev = revealed[q.id];
    if (!isRev) return false;
    const isCor = selectedAnswers[q.id]?.toUpperCase() === q.correct_option?.toUpperCase();
    if (activeFilter === "correct") return isCor;
    if (activeFilter === "wrong") return !isCor;
    return true;
  });

  if (isLockedAccess) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--cream-bg, #FAF6F0)" }}>
        <StudentNavbar activeTab={chapterId ? "pyqs" : "practice"} />
        <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
          <div
            style={{
              backgroundColor: "var(--cream-card, #FFFFFF)",
              borderRadius: "24px",
              border: "1.5px solid var(--border-light, #EDE3DA)",
              maxWidth: "520px",
              width: "100%",
              padding: "40px 32px",
              textAlign: "center",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div style={{ fontSize: "56px", marginBottom: "16px" }}>🔒</div>
            <div
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: "20px",
                backgroundColor: "rgba(229, 82, 0, 0.12)",
                color: "#E55200",
                fontSize: "12px",
                fontWeight: 800,
                marginBottom: "16px",
                textTransform: "uppercase",
              }}
            >
              Subscription Required
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-main)", marginBottom: "12px" }}>
              Unlock Chapter Practice Questions
            </h2>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "28px" }}>
              This module is locked. Without an active subscription, only 1 Free Demo set is unlocked for practice. Please upgrade your subscription to unlock all NCERT questions with audited step-by-step solutions.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link
                href="/subscriptions"
                style={{
                  padding: "14px 24px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #FF6B00 0%, #E55200 100%)",
                  color: "#FFFFFF",
                  fontSize: "15px",
                  fontWeight: 800,
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(229, 82, 0, 0.35)",
                }}
              >
                Upgrade / Buy Subscription →
              </Link>
              <Link
                href={chapterId ? "/pyqs" : "/practice"}
                style={{
                  padding: "12px 24px",
                  borderRadius: "12px",
                  backgroundColor: "transparent",
                  border: "1px solid var(--border-light, #EDE3DA)",
                  color: "var(--text-main)",
                  fontSize: "14px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Back to {chapterId ? "All PYQs" : "Practice"}
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div
      style={{
        height: isCompleted ? "auto" : "100vh",
        maxHeight: isCompleted ? "none" : "100vh",
        minHeight: "100vh",
        overflow: isCompleted ? "auto" : "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--cream-bg, #FAF6F0)",
      }}
    >
      <StudentNavbar activeTab={chapterId ? "pyqs" : "practice"} />

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: isCompleted ? "20px 20px 80px" : "8px 16px 10px",
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
          minHeight: 0,
          overflow: isCompleted ? "visible" : "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* Top Header Card - Compact in CBT Mode */}
        <section
          style={{
            backgroundColor: "var(--cream-card, #FFFFFF)",
            border: "1px solid var(--border-light, #EDE3DA)",
            borderRadius: "16px",
            padding: isCompleted ? "18px 24px" : "10px 18px",
            marginBottom: isCompleted ? "20px" : "10px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
              <span style={{ fontSize: "24px" }}>📚</span>
              <h1 style={{ fontSize: "20px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
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
                NCERT DRILL
              </span>
            </div>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0 }}>
              {practiceInfo?.subject || "Biology, Physics & Chemistry"} · {questions.length} Questions · NCERT Concept Mastery
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            {/* Live Countdown Timer Pill */}
            {!isCompleted && questions.length > 0 && (
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
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
                }}
              >
                <span>⏱️</span>
                <span>{formatTimer(timeLeft)}</span>
              </div>
            )}

            {/* Live Progress Pill */}
            {!isCompleted && questions.length > 0 && (
              <div
                style={{
                  padding: "8px 16px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(229, 82, 0, 0.08)",
                  border: "1px solid rgba(229, 82, 0, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#E55200",
                  fontWeight: 800,
                  fontSize: "13px",
                }}
              >
                <span>🎯</span>
                <span>{attemptedCount} / {questions.length} Solved</span>
              </div>
            )}

            {!isCompleted && (
              <button
                onClick={() => setIsCompleted(true)}
                style={{
                  padding: "9px 18px",
                  borderRadius: "10px",
                  backgroundColor: "#10B981",
                  color: "#FFFFFF",
                  border: "none",
                  fontWeight: 800,
                  fontSize: "13px",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
                }}
              >
                Finish Practice & Review
              </button>
            )}

            <Link
              href={chapterId ? "/pyqs" : "/practice"}
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
              ← Back to {chapterId ? "PYQs" : "Practice"}
            </Link>
          </div>
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
              href={chapterId ? "/pyqs" : "/practice"}
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
              Back to {chapterId ? "PYQ Chapters" : "Practice Modules"}
            </Link>
          </div>
        ) : !isCompleted ? (
          /* ========================================================================= */
          /* CBT QUESTION PALETTE PRACTICE MODE (MATCHING TEST PLAYER CLEANLY)        */
          /* ========================================================================= */
          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 340px",
              gap: "16px",
              alignItems: "stretch",
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            {/* Left: Active Question Box */}
            <div
              style={{
                backgroundColor: "var(--cream-card, #FFFFFF)",
                border: "1px solid var(--border-light, #EDE3DA)",
                borderRadius: "20px",
                padding: "18px 22px 12px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              {/* Question Scrollable Content Area */}
              <div style={{ flex: 1, overflowY: "auto", paddingRight: "6px", marginBottom: "10px" }}>
                {/* Card Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
                    {currentQ?.topic && (
                      <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 700 }}>
                        • {currentQ.topic}
                      </span>
                    )}
                  </div>

                  {isCurrentRevealed && (
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 800,
                        padding: "3px 10px",
                        borderRadius: "8px",
                        backgroundColor: isCurrentCorrect ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                        color: isCurrentCorrect ? "#10B981" : "#EF4444",
                      }}
                    >
                      {isCurrentCorrect ? "✓ Correct Answer (+4)" : "✗ Incorrect (-1)"}
                    </span>
                  )}
                </div>

                {/* Question Text */}
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "var(--text-main)",
                    lineHeight: 1.55,
                    whiteSpace: "pre-line",
                    marginBottom: "16px",
                  }}
                >
                  {currentQ?.question}
                </p>

                {/* Question Image if present */}
                {(currentQ?.question_image_link || currentQ?.question_image_drive_file_id) && (
                  <div style={{ marginBottom: "16px" }}>
                    <FastNetworkImage
                      url={currentQ.question_image_link || currentQ.question_image_drive_file_id}
                      alt="Question Reference Diagram"
                      maxHeight="240px"
                    />
                  </div>
                )}

                {/* Options */}
                <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginBottom: "14px" }}>
                  {[
                    { letter: "A", text: currentQ?.option_a, img: currentQ?.option_a_image_link },
                    { letter: "B", text: currentQ?.option_b, img: currentQ?.option_b_image_link },
                    { letter: "C", text: currentQ?.option_c, img: currentQ?.option_c_image_link },
                    { letter: "D", text: currentQ?.option_d, img: currentQ?.option_d_image_link },
                  ].map((opt) => {
                    const isSelected = selectedAnswers[currentQ?.id] === opt.letter;
                    const isThisCorrect = isCurrentRevealed && opt.letter.toUpperCase() === currentQ?.correct_option?.toUpperCase();
                    const isThisWrongSelected = isCurrentRevealed && isSelected && !isThisCorrect;

                    let borderColor = "var(--border-light, #EDE3DA)";
                    let bgColor = "transparent";
                    let letterColor = "var(--text-main)";

                    if (isThisCorrect) {
                      borderColor = "#10B981";
                      bgColor = "rgba(16, 185, 129, 0.12)";
                      letterColor = "#10B981";
                    } else if (isThisWrongSelected) {
                      borderColor = "#EF4444";
                      bgColor = "rgba(239, 68, 68, 0.12)";
                      letterColor = "#EF4444";
                    } else if (isSelected) {
                      borderColor = "#E55200";
                      bgColor = "rgba(229, 82, 0, 0.08)";
                      letterColor = "#E55200";
                    }

                    return (
                      <button
                        key={opt.letter}
                        onClick={() => handleSelectOption(currentQ.id, opt.letter)}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          padding: "10px 14px",
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
                            borderRadius: "7px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: 900,
                            backgroundColor: isThisCorrect
                              ? "#10B981"
                              : isThisWrongSelected
                              ? "#EF4444"
                              : isSelected
                              ? "#E55200"
                              : "rgba(229, 82, 0, 0.08)",
                            color: isThisCorrect || isThisWrongSelected || isSelected ? "#FFFFFF" : letterColor,
                            flexShrink: 0,
                          }}
                        >
                          {opt.letter}
                        </span>
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: "14px", color: "var(--text-main)", lineHeight: 1.45, paddingTop: "2px", display: "block" }}>
                            {opt.text}
                          </span>
                          {opt.img && (
                            <div style={{ marginTop: "6px" }}>
                              <FastNetworkImage
                                url={opt.img}
                                alt={`Option ${opt.letter}`}
                                maxHeight="120px"
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

                {/* Instant Detailed Solution Section (Dark Theme Compatible) */}
                {isCurrentRevealed && (
                  <div
                    style={{
                      padding: "16px 20px",
                      borderRadius: "14px",
                      backgroundColor: "rgba(2, 132, 199, 0.08)",
                      border: "1.5px solid rgba(2, 132, 199, 0.28)",
                      marginBottom: "14px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <span style={{ fontSize: "18px" }}>💡</span>
                      <strong style={{ fontSize: "13.5px", color: "#0284C7" }}>
                        Detailed Solution • Correct Option ({currentQ?.correct_option})
                      </strong>
                    </div>

                    <p style={{ fontSize: "13.5px", color: "var(--text-main)", margin: "0 0 10px", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                      {currentQ?.explanation || "Review the corresponding NCERT chapter statements and mechanism for detailed mastery."}
                    </p>

                    {/* Explanation Diagram */}
                    {(currentQ?.explanation_image_link || currentQ?.explanation_image_drive_file_id) && (
                      <div style={{ marginTop: "12px", marginBottom: "8px" }}>
                        <FastNetworkImage
                          url={currentQ.explanation_image_link || currentQ.explanation_image_drive_file_id}
                          alt="Explanation Diagram"
                          maxHeight="220px"
                        />
                      </div>
                    )}

                    {/* Video Explanation Button */}
                    {(currentQ?.explanation_video_link || currentQ?.explanation_video_url) && (
                      <button
                        onClick={() =>
                          openVideoExplanation(
                            (currentQ.explanation_video_link || currentQ.explanation_video_url)!,
                            currentQ.question,
                            currentIndex
                          )
                        }
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

                {/* SOLVE SIMILAR QUESTIONS BUTTON - strictly if admin configured it */}
                {isCurrentRevealed && Boolean(parseSimilarQuestion(currentQ?.similar_question)) && (
                  <button
                    onClick={() => openSimilarQuestions(currentQ, currentIndex)}
                    style={{
                      width: "100%",
                      padding: "12px 18px",
                      borderRadius: "12px",
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
                      gap: "8px",
                      boxShadow: "0 4px 16px rgba(79, 70, 229, 0.28)",
                      transition: "transform 0.15s ease",
                      marginBottom: "10px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
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
                    <span>Solve Similar Question</span>
                    <span style={{ opacity: 0.8, fontSize: "13px" }}>→</span>
                  </button>
                )}
              </div>

              {/* Action Controls Bar (Pinned at bottom, horizontally aligned with palette submit button) */}
              <div
                style={{
                  borderTop: "1px solid var(--border-light, #EDE3DA)",
                  paddingTop: "12px",
                  minHeight: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "nowrap",
                  gap: "10px",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => handleClearResponse(currentQ.id)}
                    style={{
                      height: "36px",
                      padding: "0 12px",
                      borderRadius: "8px",
                      border: "1px solid var(--border-light, #EDE3DA)",
                      backgroundColor: "transparent",
                      color: "var(--text-muted)",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Clear Response
                  </button>

                  <button
                    onClick={() => toggleMarkForReview(currentQ.id)}
                    style={{
                      height: "36px",
                      padding: "0 12px",
                      borderRadius: "8px",
                      border: markedForReview[currentQ?.id] ? "1.5px solid #7C3AED" : "1px solid var(--border-light, #EDE3DA)",
                      backgroundColor: markedForReview[currentQ?.id] ? "rgba(124, 58, 237, 0.12)" : "transparent",
                      color: markedForReview[currentQ?.id] ? "#7C3AED" : "var(--text-muted)",
                      fontSize: "12px",
                      fontWeight: 800,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {markedForReview[currentQ?.id] ? "★ Marked for Review" : "Mark for Review"}
                  </button>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    style={{
                      height: "36px",
                      padding: "0 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--border-light, #EDE3DA)",
                      backgroundColor: "transparent",
                      color: "var(--text-main)",
                      fontSize: "12px",
                      fontWeight: 800,
                      cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                      opacity: currentIndex === 0 ? 0.4 : 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    ← Previous
                  </button>

                  <button
                    onClick={() => {
                      if (currentIndex < questions.length - 1) {
                        setCurrentIndex((prev) => prev + 1);
                      } else {
                        setIsCompleted(true);
                      }
                    }}
                    style={{
                      height: "36px",
                      padding: "0 16px",
                      borderRadius: "8px",
                      backgroundColor: "#E55200",
                      color: "#FFFFFF",
                      fontSize: "12px",
                      fontWeight: 800,
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(229, 82, 0, 0.3)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {currentIndex < questions.length - 1 ? "Save & Next →" : "Finish Practice →"}
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Sticky CBT Question Palette with 5 Exam States */}
            <CbtQuestionPalette
              questions={questions}
              currentIndex={currentIndex}
              onSelectQuestion={(idx) => setCurrentIndex(idx)}
              selectedAnswers={selectedAnswers}
              markedForReview={markedForReview}
              visitedQuestions={visitedQuestions}
              title="Question Palette"
              isPractice={true}
              onSubmit={() => setIsCompleted(true)}
              submitButtonText="Finish Practice & Review"
            />
          </div>
        ) : (
          /* ========================================================================= */
          /* PRACTICE COMPLETED: PERFORMANCE SUMMARY & FULL ANSWER REVIEW              */
          /* ========================================================================= */
          <div>
            {/* Top Score Banner */}
            <div
              style={{
                backgroundColor: "var(--cream-card, #FFFFFF)",
                border: "1px solid var(--border-light, #EDE3DA)",
                borderRadius: "20px",
                padding: "26px",
                marginBottom: "20px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <div>
                <span
                  style={{
                    backgroundColor: "rgba(16, 185, 129, 0.12)",
                    color: "#10B981",
                    padding: "3px 10px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 800,
                  }}
                >
                  PRACTICE COMPLETED
                </span>
                <h2 style={{ fontSize: "24px", fontWeight: 900, color: "var(--text-main)", margin: "8px 0 4px" }}>
                  Your Accuracy: {accuracy}%
                </h2>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>
                  You solved {attemptedCount} out of {questions.length} questions ({correctCount} correct, {wrongCount} incorrect).
                </p>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => {
                    if (timeLeft <= 0) {
                      const dur = practiceInfo?.duration_minutes || Math.max(15, Math.round(questions.length * 1.0));
                      setTimeLeft(dur * 60);
                    }
                    setIsCompleted(false);
                  }}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "12px",
                    backgroundColor: "#E55200",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  ← Return to CBT Question Player
                </button>
              </div>
            </div>

            {/* Diagnostic Score Cards (Themed Properly) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  backgroundColor: "var(--cream-card, #FFFFFF)",
                  border: "1px solid var(--border-light, #EDE3DA)",
                  borderRadius: "14px",
                  padding: "14px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 800 }}>TOTAL QUESTIONS</div>
                <div style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-main)", margin: "2px 0" }}>
                  {questions.length}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "var(--cream-card, #FFFFFF)",
                  border: "1px solid var(--border-light, #EDE3DA)",
                  borderRadius: "14px",
                  padding: "14px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 800 }}>ATTEMPTED</div>
                <div style={{ fontSize: "22px", fontWeight: 900, color: "#E55200", margin: "2px 0" }}>
                  {attemptedCount}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "var(--cream-card, #FFFFFF)",
                  border: "1.5px solid rgba(16, 185, 129, 0.4)",
                  borderRadius: "14px",
                  padding: "14px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "11px", color: "#10B981", fontWeight: 800 }}>CORRECT</div>
                <div style={{ fontSize: "22px", fontWeight: 900, color: "#10B981", margin: "2px 0" }}>
                  {correctCount}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "var(--cream-card, #FFFFFF)",
                  border: "1.5px solid rgba(239, 68, 68, 0.4)",
                  borderRadius: "14px",
                  padding: "14px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "11px", color: "#EF4444", fontWeight: 800 }}>WRONG</div>
                <div style={{ fontSize: "22px", fontWeight: 900, color: "#EF4444", margin: "2px 0" }}>
                  {wrongCount}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "var(--cream-card, #FFFFFF)",
                  border: "1.5px solid rgba(79, 70, 229, 0.4)",
                  borderRadius: "14px",
                  padding: "14px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "11px", color: "#7C3AED", fontWeight: 800 }}>ACCURACY</div>
                <div style={{ fontSize: "22px", fontWeight: 900, color: "#7C3AED", margin: "2px 0" }}>
                  {accuracy}%
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
              <button
                onClick={() => setActiveFilter("all")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: activeFilter === "all" ? "1.5px solid #E55200" : "1px solid var(--border-light, #EDE3DA)",
                  backgroundColor: activeFilter === "all" ? "rgba(229, 82, 0, 0.12)" : "var(--cream-card, #FFFFFF)",
                  color: activeFilter === "all" ? "#E55200" : "var(--text-main)",
                  fontSize: "12px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                All Questions ({questions.length})
              </button>
              <button
                onClick={() => setActiveFilter("wrong")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: activeFilter === "wrong" ? "1.5px solid #EF4444" : "1px solid var(--border-light, #EDE3DA)",
                  backgroundColor: activeFilter === "wrong" ? "rgba(239, 68, 68, 0.12)" : "var(--cream-card, #FFFFFF)",
                  color: activeFilter === "wrong" ? "#EF4444" : "var(--text-main)",
                  fontSize: "12px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Needs Practice / Wrong ({wrongCount})
              </button>
              <button
                onClick={() => setActiveFilter("correct")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: activeFilter === "correct" ? "1.5px solid #10B981" : "1px solid var(--border-light, #EDE3DA)",
                  backgroundColor: activeFilter === "correct" ? "rgba(16, 185, 129, 0.12)" : "var(--cream-card, #FFFFFF)",
                  color: activeFilter === "correct" ? "#10B981" : "var(--text-main)",
                  fontSize: "12px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Correct ({correctCount})
              </button>
            </div>

            {/* Questions List for Complete Review */}
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              {filteredQuestions.map((q, idx) => {
                const selected = selectedAnswers[q.id];
                const isRev = revealed[q.id];
                const isCor = selected?.toUpperCase() === q.correct_option?.toUpperCase();
                const qImg = resolveImageUrl(q.question_image_link || q.question_image_drive_file_id);
                const expImg = resolveImageUrl(q.explanation_image_link || q.explanation_image_drive_file_id);
                const videoUrl = q.explanation_video_link || q.explanation_video_url;

                return (
                  <div
                    key={q.id}
                    style={{
                      backgroundColor: "var(--cream-card, #FFFFFF)",
                      border: isRev
                        ? isCor
                          ? "1.5px solid rgba(16, 185, 129, 0.4)"
                          : "1.5px solid rgba(239, 68, 68, 0.4)"
                        : "1px solid var(--border-light, #EDE3DA)",
                      borderRadius: "20px",
                      padding: "24px",
                      boxShadow: "0 2px 14px rgba(0, 0, 0, 0.03)",
                    }}
                  >
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
                          Question {idx + 1} of {questions.length}
                        </span>
                        {q.topic && (
                          <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600 }}>
                            • {q.topic}
                          </span>
                        )}
                      </div>

                      {isRev && (
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: 800,
                            padding: "3px 10px",
                            borderRadius: "8px",
                            backgroundColor: isCor ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                            color: isCor ? "#10B981" : "#EF4444",
                          }}
                        >
                          {isCor ? "✓ Correct Answer (+4)" : "✗ Incorrect (-1)"}
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-main)", lineHeight: 1.6, whiteSpace: "pre-line", margin: "0 0 16px" }}>
                      {q.question}
                    </p>

                    {qImg && (
                      <div style={{ marginBottom: "18px" }}>
                        <FastNetworkImage url={qImg} alt="Question Reference" maxHeight="320px" />
                      </div>
                    )}

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "18px" }}>
                      {[
                        { letter: "A", text: q.option_a, img: q.option_a_image_link },
                        { letter: "B", text: q.option_b, img: q.option_b_image_link },
                        { letter: "C", text: q.option_c, img: q.option_c_image_link },
                        { letter: "D", text: q.option_d, img: q.option_d_image_link },
                      ].map((opt) => {
                        const isSelected = selected === opt.letter;
                        const isThisCorrect = isRev && opt.letter.toUpperCase() === q.correct_option?.toUpperCase();
                        const isThisWrongSelected = isRev && isSelected && !isThisCorrect;

                        let borderColor = "var(--border-light, #EDE3DA)";
                        let bgColor = "transparent";

                        if (isThisCorrect) {
                          borderColor = "#10B981";
                          bgColor = "rgba(16, 185, 129, 0.12)";
                        } else if (isThisWrongSelected) {
                          borderColor = "#EF4444";
                          bgColor = "rgba(239, 68, 68, 0.12)";
                        } else if (isSelected) {
                          borderColor = "#E55200";
                          bgColor = "rgba(229, 82, 0, 0.08)";
                        }

                        return (
                          <div
                            key={opt.letter}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "12px",
                              padding: "13px 16px",
                              borderRadius: "14px",
                              border: `1.5px solid ${borderColor}`,
                              backgroundColor: bgColor,
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
                            <div style={{ flex: 1 }}>
                              <span style={{ fontSize: "14px", color: "var(--text-main)", lineHeight: 1.5, display: "block" }}>
                                {opt.text}
                              </span>
                              {opt.img && (
                                <div style={{ marginTop: "8px" }}>
                                  <FastNetworkImage url={opt.img} alt={`Option ${opt.letter}`} maxHeight="140px" />
                                </div>
                              )}
                            </div>
                            {isThisCorrect && <span style={{ color: "#10B981", fontSize: "18px", fontWeight: 900 }}>✓</span>}
                            {isThisWrongSelected && <span style={{ color: "#EF4444", fontSize: "18px", fontWeight: 900 }}>✕</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {isRev && (
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
                            Explanation • Correct Option ({q.correct_option})
                          </strong>
                        </div>
                        <p style={{ fontSize: "13px", color: "var(--text-main)", margin: "0 0 10px", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                          {q.explanation || "Review the corresponding NCERT chapter statements and mechanism for detailed mastery."}
                        </p>

                        {expImg && (
                          <div style={{ marginTop: "10px", marginBottom: "6px" }}>
                            <FastNetworkImage url={expImg} alt="Explanation diagram" maxHeight="240px" />
                          </div>
                        )}

                        {videoUrl && (
                          <button
                            onClick={() => openVideoExplanation(videoUrl, q.question, idx)}
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

                    {/* Solve Similar Questions button if present */}
                    {isRev && Boolean(parseSimilarQuestion(q.similar_question)) && (
                      <button
                        onClick={() => openSimilarQuestions(q, idx)}
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
                        }}
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
                        <span>Solve Similar Question</span>
                        <span style={{ opacity: 0.8, fontSize: "14px" }}>→</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
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
        sourceType="practice"
      />

      {/* Video Explanation Modal */}
      <VideoExplanationModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoUrl={activeVideo?.url}
        title={activeVideo?.title}
        subtitle={activeVideo?.subtitle}
      />
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

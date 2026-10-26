"use client";

import React, { useState } from "react";

export type QuestionStatus =
  | "not_visited"
  | "not_answered"
  | "answered"
  | "marked_for_review"
  | "answered_and_marked";

export interface CbtQuestionPaletteProps {
  questions: Array<{ id: number; [key: string]: any }>;
  currentIndex: number;
  onSelectQuestion: (index: number) => void;
  selectedAnswers: Record<number, string>;
  markedForReview: Record<number, boolean>;
  visitedQuestions: Record<number, boolean>;
  title?: string;
  isPractice?: boolean;
  onSubmit?: () => void;
  submitButtonText?: string;
}

export function getQuestionStatus({
  isVisited,
  isAnswered,
  isMarked,
}: {
  isVisited: boolean;
  isAnswered: boolean;
  isMarked: boolean;
}): QuestionStatus {
  if (isMarked && isAnswered) return "answered_and_marked";
  if (isMarked) return "marked_for_review";
  if (isAnswered) return "answered";
  if (isVisited) return "not_answered";
  return "not_visited";
}

export default function CbtQuestionPalette({
  questions,
  currentIndex,
  onSelectQuestion,
  selectedAnswers,
  markedForReview,
  visitedQuestions,
  title = "Question Palette",
  isPractice = false,
  onSubmit,
  submitButtonText = "Submit Test",
}: CbtQuestionPaletteProps) {
  const [collapsed, setCollapsed] = useState(false);

  // Compute live breakdown counts
  let countNotVisited = 0;
  let countNotAnswered = 0;
  let countAnswered = 0;
  let countMarked = 0;
  let countAnsweredAndMarked = 0;

  questions.forEach((q, idx) => {
    const isAns = Boolean(selectedAnswers[q.id]);
    const isMrk = Boolean(markedForReview[q.id]);
    // Question 0 is automatically visited once loaded
    const isVis = Boolean(visitedQuestions[q.id]) || idx === 0 || idx === currentIndex;

    const status = getQuestionStatus({
      isVisited: isVis,
      isAnswered: isAns,
      isMarked: isMrk,
    });

    if (status === "not_visited") countNotVisited++;
    else if (status === "not_answered") countNotAnswered++;
    else if (status === "answered") countAnswered++;
    else if (status === "marked_for_review") countMarked++;
    else if (status === "answered_and_marked") countAnsweredAndMarked++;
  });

  if (collapsed) {
    return (
      <div
        style={{
          backgroundColor: "var(--cream-card, #FFFFFF)",
          border: "1px solid var(--border-light, #EDE3DA)",
          borderRadius: "16px",
          padding: "16px 12px",
          boxShadow: "0 4px 18px rgba(0, 0, 0, 0.04)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          width: "56px",
        }}
      >
        <button
          onClick={() => setCollapsed(false)}
          title="Expand Question Palette"
          style={{
            background: "#E55200",
            border: "none",
            color: "#FFFFFF",
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 900,
          }}
        >
          ‹
        </button>
        <span
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: "12px",
            fontWeight: 800,
            color: "var(--text-muted)",
            letterSpacing: "1px",
            marginTop: "6px",
          }}
        >
          QUESTION PALETTE ({currentIndex + 1}/{questions.length})
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "var(--cream-card, #FFFFFF)",
        border: "1px solid var(--border-light, #EDE3DA)",
        borderRadius: "20px",
        padding: "18px 18px 12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1, minHeight: 0, overflowY: "auto", paddingRight: "2px" }}>
        {/* Palette Header with collapse toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontSize: "14.5px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
              {title}
            </h3>
            <span style={{ fontSize: "10.5px", color: "var(--text-muted)", fontWeight: 700 }}>
              Official NEET CBT Format
            </span>
          </div>

          <button
            onClick={() => setCollapsed(true)}
            title="Collapse Question Palette"
            style={{
              background: "rgba(0, 0, 0, 0.04)",
              border: "1px solid var(--border-light, #EDE3DA)",
              borderRadius: "8px",
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 800,
              color: "var(--text-muted)",
            }}
          >
            ›
          </button>
        </div>

        {/* Counter Badges (Quick Status Summary) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "5px",
            padding: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.02)",
            borderRadius: "10px",
            border: "1px solid var(--border-light, #EDE3DA)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span
              style={{
                width: "20px",
                height: "18px",
                backgroundColor: "#16A34A",
                clipPath: "polygon(0 0, 75% 0, 100% 50%, 75% 100%, 0 100%)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "9.5px",
                fontWeight: 900,
                color: "#FFFFFF",
                paddingRight: "2px",
              }}
            >
              {countAnswered}
            </span>
            <span style={{ fontSize: "10.5px", color: "var(--text-main)", fontWeight: 700 }}>Answered</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span
              style={{
                width: "20px",
                height: "18px",
                backgroundColor: "#EA580C",
                clipPath: "polygon(0 0, 75% 0, 100% 50%, 75% 100%, 0 100%)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "9.5px",
                fontWeight: 900,
                color: "#FFFFFF",
                paddingRight: "2px",
              }}
            >
              {countNotAnswered}
            </span>
            <span style={{ fontSize: "10.5px", color: "var(--text-main)", fontWeight: 700 }}>Not Answered</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span
              style={{
                width: "18px",
                height: "18px",
                backgroundColor: "#334155",
                borderRadius: "3px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "9.5px",
                fontWeight: 900,
                color: "#FFFFFF",
              }}
            >
              {countNotVisited}
            </span>
            <span style={{ fontSize: "10.5px", color: "var(--text-main)", fontWeight: 700 }}>Not Visited</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span
              style={{
                width: "18px",
                height: "18px",
                backgroundColor: "#7C3AED",
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "9.5px",
                fontWeight: 900,
                color: "#FFFFFF",
              }}
            >
              {countMarked}
            </span>
            <span style={{ fontSize: "10.5px", color: "var(--text-main)", fontWeight: 700 }}>Marked</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px", gridColumn: "span 2" }}>
            <div style={{ position: "relative", width: "18px", height: "18px" }}>
              <span
                style={{
                  width: "18px",
                  height: "18px",
                  backgroundColor: "#7C3AED",
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9.5px",
                  fontWeight: 900,
                  color: "#FFFFFF",
                }}
              >
                {countAnsweredAndMarked}
              </span>
              <span
                style={{
                  position: "absolute",
                  bottom: "-1px",
                  right: "-1px",
                  width: "6px",
                  height: "6px",
                  backgroundColor: "#22C55E",
                  border: "1px solid #FFFFFF",
                  borderRadius: "1px",
                }}
              />
            </div>
            <span style={{ fontSize: "10px", color: "var(--text-main)", fontWeight: 700 }}>
              Ans &amp; Marked for Review ({countAnsweredAndMarked})
            </span>
          </div>
        </div>

        {/* Question Number Grid: STRICTLY UP TO 20 VISIBLE, REST SCROLL INTERNALLY */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "6px",
            maxHeight: "164px", // Exactly 4 rows of 5 buttons = 20 questions!
            overflowY: "auto",
            padding: "2px 2px",
          }}
        >
          {questions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const isAns = Boolean(selectedAnswers[q.id]);
            const isMrk = Boolean(markedForReview[q.id]);
            const isVis = Boolean(visitedQuestions[q.id]) || idx === 0 || idx === currentIndex;

            const status = getQuestionStatus({
              isVisited: isVis,
              isAnswered: isAns,
              isMarked: isMrk,
            });

            // Style by NEET status
            let bg = "#334155";
            let color = "#FFFFFF";
            let clipPath: string | undefined = undefined;
            let borderRadius = "6px";
            let hasGreenBadge = false;
            let paddingRight = "0px";

            if (status === "not_visited") {
              bg = "#334155"; // Grey rounded square
              borderRadius = "6px";
            } else if (status === "not_answered") {
              bg = "#EA580C"; // Orange tag
              clipPath = "polygon(0 0, 75% 0, 100% 50%, 75% 100%, 0 100%)";
              borderRadius = "2px";
              paddingRight = "4px";
            } else if (status === "answered") {
              bg = "#16A34A"; // Green tag
              clipPath = "polygon(0 0, 75% 0, 100% 50%, 75% 100%, 0 100%)";
              borderRadius = "2px";
              paddingRight = "4px";
            } else if (status === "marked_for_review") {
              bg = "#7C3AED"; // Purple circle
              borderRadius = "50%";
            } else if (status === "answered_and_marked") {
              bg = "#7C3AED"; // Purple circle with green badge
              borderRadius = "50%";
              hasGreenBadge = true;
            }

            return (
              <div
                key={q.id}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => onSelectQuestion(idx)}
                  title={`Question ${idx + 1} (${status.replace(/_/g, " ")})`}
                  style={{
                    width: "100%",
                    height: "34px",
                    backgroundColor: bg,
                    clipPath,
                    borderRadius,
                    color,
                    fontSize: "12px",
                    fontWeight: 900,
                    cursor: "pointer",
                    border: "none",
                    padding: 0,
                    paddingRight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    outline: isCurrent ? "2.5px solid #F59E0B" : "none",
                    outlineOffset: isCurrent ? "2px" : "0",
                    transform: isCurrent ? "scale(1.06)" : "scale(1)",
                    transition: "all 0.15s ease",
                    boxShadow: isCurrent ? "0 0 8px rgba(245, 158, 11, 0.45)" : "none",
                  }}
                >
                  {idx + 1}
                </button>

                {hasGreenBadge && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-1px",
                      right: "2px",
                      width: "7px",
                      height: "7px",
                      backgroundColor: "#22C55E",
                      border: "1px solid #FFFFFF",
                      borderRadius: "2px",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Official NEET CBT Legend (Compact & Clean) */}
        <div
          style={{
            borderTop: "1px solid var(--border-light, #EDE3DA)",
            paddingTop: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <span style={{ fontSize: "10.5px", fontWeight: 800, color: "var(--text-main)", letterSpacing: "0.2px" }}>
            LEGEND:
          </span>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px 8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: "16px",
                  height: "15px",
                  backgroundColor: "#334155",
                  borderRadius: "3px",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "10px", color: "var(--text-main)", lineHeight: 1.2 }}>Not Visited</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: "17px",
                  height: "15px",
                  backgroundColor: "#EA580C",
                  clipPath: "polygon(0 0, 75% 0, 100% 50%, 75% 100%, 0 100%)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "10px", color: "var(--text-main)", lineHeight: 1.2 }}>Not Answered</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: "17px",
                  height: "15px",
                  backgroundColor: "#16A34A",
                  clipPath: "polygon(0 0, 75% 0, 100% 50%, 75% 100%, 0 100%)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "10px", color: "var(--text-main)", lineHeight: 1.2 }}>Answered</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: "15px",
                  height: "15px",
                  backgroundColor: "#7C3AED",
                  borderRadius: "50%",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "10px", color: "var(--text-main)", lineHeight: 1.2 }}>Marked for Review</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
            <div style={{ position: "relative", width: "15px", height: "15px", flexShrink: 0 }}>
              <span
                style={{
                  width: "15px",
                  height: "15px",
                  backgroundColor: "#7C3AED",
                  borderRadius: "50%",
                  display: "block",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: "-1px",
                  right: "-1px",
                  width: "6px",
                  height: "6px",
                  backgroundColor: "#22C55E",
                  border: "1px solid #FFFFFF",
                  borderRadius: "1px",
                }}
              />
            </div>
            <span style={{ fontSize: "9.5px", color: "var(--text-muted)", lineHeight: 1.2 }}>
              Ans &amp; Marked for Review (considered for evaluation)
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar: [ Submit Test / Finish Practice ] (Exact Horizontal Line with Save & Next) */}
      {onSubmit && (
        <div
          style={{
            borderTop: "1px solid var(--border-light, #EDE3DA)",
            paddingTop: "12px",
            minHeight: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <button
            onClick={onSubmit}
            style={{
              width: "100%",
              height: "36px",
              padding: "0 16px",
              borderRadius: "8px",
              backgroundColor: isPractice ? "#E55200" : "#10B981",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "13px",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: isPractice ? "0 2px 8px rgba(229, 82, 0, 0.25)" : "0 2px 8px rgba(16, 185, 129, 0.25)",
              transition: "transform 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {submitButtonText}
          </button>
        </div>
      )}
    </div>
  );
}

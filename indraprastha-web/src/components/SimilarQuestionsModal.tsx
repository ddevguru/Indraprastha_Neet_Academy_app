"use client";

import React, { useState, useEffect } from "react";
import FastNetworkImage from "@/components/FastNetworkImage";
import { parseSimilarQuestion } from "@/lib/driveUtils";

interface SimilarQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceQuestion: {
    id?: number | string;
    question?: string;
    option_a?: string;
    option_b?: string;
    option_c?: string;
    option_d?: string;
    correct_option?: string;
    explanation?: string;
    subject?: string;
    topic?: string;
    chapter?: string;
    similar_question?: any;
  } | null;
  questionNumber?: number;
  token?: string;
  sourceType?: string;
  testId?: string | number;
}

export default function SimilarQuestionsModal({
  isOpen,
  onClose,
  sourceQuestion,
  questionNumber,
}: SimilarQuestionsModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Reset state when modal opens or question changes
  useEffect(() => {
    if (!isOpen) return;
    setSelectedOption(null);
    setIsSubmitted(false);
  }, [isOpen, sourceQuestion?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !sourceQuestion) return null;

  // Read admin-added similar question directly
  const adminSimilar = parseSimilarQuestion(sourceQuestion.similar_question);

  const qText = adminSimilar?.question || "";
  const optA = adminSimilar?.option_a || "";
  const optB = adminSimilar?.option_b || "";
  const optC = adminSimilar?.option_c || "";
  const optD = adminSimilar?.option_d || "";
  const correctOpt = (adminSimilar?.correct_option || "A").toUpperCase().trim();
  const explanation = adminSimilar?.explanation || "";
  const qImage = adminSimilar?.question_image_link || "";
  const expImage = adminSimilar?.explanation_image_link || "";

  const isCorrect = isSubmitted && selectedOption === correctOpt;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "760px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header - Matches Flutter SolveSingleSimilarQuestionSheet */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid #EDE3DA",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#FAF6F0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                boxShadow: "0 4px 14px rgba(79, 70, 229, 0.35)",
              }}
            >
              🧠
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 900, color: "#0F172A" }}>
                  Solve Similar Question
                </h3>
                <span
                  style={{
                    backgroundColor: "rgba(79, 70, 229, 0.12)",
                    color: "#4F46E5",
                    padding: "2px 8px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: 800,
                  }}
                >
                  CURATED BY TEACHER
                </span>
              </div>
              <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#475569", fontWeight: 600 }}>
                {questionNumber ? `Question #${questionNumber} · ` : ""}
                {sourceQuestion.subject || "Practice"} {sourceQuestion.topic || sourceQuestion.chapter ? `• ${sourceQuestion.topic || sourceQuestion.chapter}` : ""}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "#F1F5F9",
              border: "none",
              color: "#64748B",
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 700,
            }}
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {!adminSimilar ? (
            <div style={{ textAlign: "center", padding: "50px 20px" }}>
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>📖</div>
              <h4 style={{ fontSize: "16px", fontWeight: 800, color: "#1E293B", margin: "0 0 6px" }}>
                No similar question available for this question yet.
              </h4>
              <p style={{ fontSize: "13px", color: "#64748B", margin: "0 0 16px" }}>
                Your teacher has not linked a parallel question for this specific item yet.
              </p>
              <button
                onClick={onClose}
                style={{
                  padding: "8px 20px",
                  borderRadius: "10px",
                  backgroundColor: "#E55200",
                  color: "#FFFFFF",
                  border: "none",
                  fontWeight: 800,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Back to Questions
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Question Box */}
              <div
                style={{
                  backgroundColor: "#F8FAFC",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: "16px",
                  padding: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <span
                    style={{
                      background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                      color: "#FFFFFF",
                      padding: "2px 8px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontWeight: 800,
                    }}
                  >
                    Similar Question
                  </span>
                  <span style={{ fontSize: "11px", color: "#64748B", fontWeight: 600 }}>
                    Solve to master this concept
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#0F172A",
                    lineHeight: 1.6,
                    margin: 0,
                    whiteSpace: "pre-line",
                  }}
                >
                  {qText}
                </p>

                {qImage && (
                  <div style={{ marginTop: "14px" }}>
                    <FastNetworkImage url={qImage} alt="Similar Question Reference" maxHeight="280px" />
                  </div>
                )}
              </div>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { letter: "A", text: optA },
                  { letter: "B", text: optB },
                  { letter: "C", text: optC },
                  { letter: "D", text: optD },
                ]
                  .filter((opt) => opt.text && opt.text.trim().length > 0)
                  .map((opt) => {
                    const isSelected = selectedOption === opt.letter;
                    const isThisCorrect = isSubmitted && opt.letter === correctOpt;
                    const isWrongSelected = isSubmitted && isSelected && !isThisCorrect;

                    let border = "1.5px solid #E2E8F0";
                    let bg = "#FFFFFF";
                    let badgeBg = "rgba(79, 70, 229, 0.08)";
                    let badgeColor = "#4F46E5";

                    if (isSubmitted) {
                      if (isThisCorrect) {
                        border = "2px solid #10B981";
                        bg = "rgba(16, 185, 129, 0.08)";
                        badgeBg = "#10B981";
                        badgeColor = "#FFFFFF";
                      } else if (isWrongSelected) {
                        border = "2px solid #EF4444";
                        bg = "rgba(239, 68, 68, 0.08)";
                        badgeBg = "#EF4444";
                        badgeColor = "#FFFFFF";
                      }
                    } else if (isSelected) {
                      border = "2px solid #4F46E5";
                      bg = "rgba(79, 70, 229, 0.06)";
                      badgeBg = "#4F46E5";
                      badgeColor = "#FFFFFF";
                    }

                    return (
                      <button
                        key={opt.letter}
                        disabled={isSubmitted}
                        onClick={() => setSelectedOption(opt.letter)}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                          padding: "13px 16px",
                          borderRadius: "14px",
                          border,
                          backgroundColor: bg,
                          cursor: isSubmitted ? "default" : "pointer",
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
                            backgroundColor: badgeBg,
                            color: badgeColor,
                            flexShrink: 0,
                          }}
                        >
                          {opt.letter}
                        </span>

                        <span
                          style={{
                            fontSize: "14px",
                            color: "#1E293B",
                            fontWeight: isSelected ? 700 : 500,
                            lineHeight: 1.5,
                            paddingTop: "3px",
                            flex: 1,
                          }}
                        >
                          {opt.text}
                        </span>

                        {isSubmitted && isThisCorrect && (
                          <span style={{ color: "#10B981", fontSize: "18px", fontWeight: 900 }}>✓</span>
                        )}
                        {isSubmitted && isWrongSelected && (
                          <span style={{ color: "#EF4444", fontSize: "18px", fontWeight: 900 }}>✕</span>
                        )}
                      </button>
                    );
                  })}
              </div>

              {/* Result Notification */}
              {isSubmitted && (
                <div
                  style={{
                    padding: "14px 18px",
                    borderRadius: "14px",
                    backgroundColor: isCorrect ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                    border: `1.5px solid ${isCorrect ? "#10B981" : "#EF4444"}`,
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span style={{ fontSize: "24px" }}>{isCorrect ? "🎉" : "💡"}</span>
                  <div>
                    <h5
                      style={{
                        margin: 0,
                        fontSize: "14px",
                        fontWeight: 900,
                        color: isCorrect ? "#047857" : "#B91C1C",
                      }}
                    >
                      {isCorrect ? "Correct Answer! Great work! 🎉" : `Incorrect. The correct answer is Option (${correctOpt}).`}
                    </h5>
                    <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#475569" }}>
                      {isCorrect
                        ? "You've successfully solved this parallel NCERT concept."
                        : "Review the explanation below to clear your concept."}
                    </p>
                  </div>
                </div>
              )}

              {/* Explanation Card */}
              {isSubmitted && (
                <div
                  style={{
                    backgroundColor: "#F0FDF4",
                    border: "1px solid #BBF7D0",
                    borderRadius: "16px",
                    padding: "18px 20px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <span style={{ fontSize: "16px" }}>💡</span>
                    <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 800, color: "#15803D" }}>
                      Explanation & Solution
                    </h4>
                  </div>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "13.5px",
                      color: "#166534",
                      lineHeight: 1.6,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {explanation || "Refer to NCERT textbook line-by-line statements for this concept."}
                  </p>

                  {expImage && (
                    <div style={{ marginTop: "12px" }}>
                      <FastNetworkImage url={expImage} alt="Explanation Diagram" maxHeight="240px" />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #EDE3DA",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            backgroundColor: "#FAF6F0",
            gap: "12px",
          }}
        >
          {adminSimilar && !isSubmitted && (
            <button
              disabled={!selectedOption}
              onClick={() => setIsSubmitted(true)}
              style={{
                padding: "10px 24px",
                borderRadius: "12px",
                backgroundColor: selectedOption ? "#4F46E5" : "#94A3B8",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 800,
                border: "none",
                cursor: selectedOption ? "pointer" : "not-allowed",
                boxShadow: selectedOption ? "0 4px 14px rgba(79, 70, 229, 0.35)" : "none",
              }}
            >
              Submit Answer →
            </button>
          )}

          {adminSimilar && isSubmitted && (
            <button
              onClick={onClose}
              style={{
                padding: "10px 24px",
                borderRadius: "12px",
                backgroundColor: "#10B981",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 800,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)",
              }}
            >
              Done / Back to Questions ✓
            </button>
          )}

          {!adminSimilar && (
            <button
              onClick={onClose}
              style={{
                padding: "9px 20px",
                borderRadius: "10px",
                backgroundColor: "#64748B",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

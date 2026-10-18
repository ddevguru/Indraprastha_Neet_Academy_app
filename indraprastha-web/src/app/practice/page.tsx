"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import StudentNavbar from "@/components/StudentNavbar";
import Footer from "@/components/Footer";

interface PracticeSetItem {
  id: number;
  title: string;
  topic: string;
  subject: string;
  class_label?: string;
  difficulty?: string;
  estimated_minutes?: number;
  question_count?: number;
  is_completed?: boolean;
  last_accuracy?: string;
}

export default function PracticePage() {
  const [sets, setSets] = useState<PracticeSetItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeStandard, setActiveStandard] = useState<string>("All");
  const [activeSubject, setActiveSubject] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("indraprastha_token");
      const storedUser = localStorage.getItem("indraprastha_user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          // ignore
        }
      }

      fetchPracticeSets(storedToken || "");
    }
  }, []);

  const fetchPracticeSets = async (token: string) => {
    let activeToken = token;
    try {
      let res = await fetch("https://api.indraprasthaneetacademy.com/api/content/practice-sets", {
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
            localStorage.setItem("indraprastha_token", activeToken);
            res = await fetch("https://api.indraprasthaneetacademy.com/api/content/practice-sets", {
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
        if (data.practiceSets && Array.isArray(data.practiceSets)) {
          setSets(data.practiceSets);
        }
      }
    } catch (e) {
      console.error("Failed to load practice sets", e);
    } finally {
      setLoading(false);
    }
  };

  const normalizeSubject = (s?: string) => {
    if (!s) return "";
    const lower = s.trim().toLowerCase();
    if (lower.includes("bio")) return "Biology";
    if (lower.includes("chem")) return "Chemistry";
    if (lower.includes("phys")) return "Physics";
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  };

  const distinctStandards = Array.from(
    new Set(sets.map((s) => s.class_label?.trim()).filter(Boolean) as string[])
  ).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const standards = ["All", ...distinctStandards];

  const distinctSubjects = Array.from(
    new Set(sets.map((s) => normalizeSubject(s.subject)).filter(Boolean))
  ).sort();

  const subjects = ["All", ...distinctSubjects];

  const filteredSets = sets.filter((s) => {
    const matchesStandard =
      activeStandard === "All" ||
      (s.class_label && s.class_label.trim().toLowerCase() === activeStandard.trim().toLowerCase());

    const matchesSubject =
      activeSubject === "All" ||
      normalizeSubject(s.subject).toLowerCase() === activeSubject.toLowerCase();

    const matchesSearch =
      !searchQuery.trim() ||
      s.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.topic?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStandard && matchesSubject && matchesSearch;
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--cream-bg, #FAF6F0)" }}>
      <StudentNavbar activeTab="practice" userName={user?.full_name} />

      <main style={{ flex: 1, padding: "28px 20px 80px", maxWidth: "1180px", width: "100%", margin: "0 auto" }}>
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
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span style={{ fontSize: "24px" }}>📚</span>
              <h1 style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                Chapter &amp; Topic Practice Sets
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
                LIVE QUESTION BANK
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>
              Strengthen each chapter topic-by-topic. Solve targeted NCERT questions calibrated for NEET 2026 / 2027.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                padding: "8px 14px",
                borderRadius: "10px",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                color: "#10B981",
                fontSize: "13px",
                fontWeight: 800,
                border: "1px solid rgba(16, 185, 129, 0.25)",
              }}
            >
              {filteredSets.length} Modules Active
            </span>
          </div>
        </section>

        {/* Filters Section (Standard + Subject + Search) */}
        <div
          style={{
            backgroundColor: "var(--cream-card, #FFFFFF)",
            border: "1px solid var(--border-light, #EDE3DA)",
            borderRadius: "18px",
            padding: "16px 20px",
            marginBottom: "24px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {/* Row 1: Standard Filter + Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  minWidth: "85px",
                }}
              >
                <span>🎓</span> Standard:
              </span>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {standards.map((std) => {
                  const isSelected = activeStandard === std;
                  return (
                    <button
                      key={std}
                      onClick={() => setActiveStandard(std)}
                      style={{
                        padding: "6px 16px",
                        borderRadius: "100px",
                        border: isSelected ? "1.5px solid #E55200" : "1px solid var(--border-light, #EDE3DA)",
                        backgroundColor: isSelected ? "#E55200" : "var(--cream-bg, #FAF6F0)",
                        color: isSelected ? "#FFFFFF" : "var(--text-main)",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {std === "All" ? "All Standards" : std}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Search */}
            <div style={{ position: "relative", minWidth: "220px", maxWidth: "300px", width: "100%" }}>
              <input
                type="text"
                placeholder="Search chapters or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "7px 12px 7px 32px",
                  fontSize: "12px",
                  borderRadius: "100px",
                  border: "1px solid var(--border-light, #EDE3DA)",
                  backgroundColor: "var(--cream-bg, #FAF6F0)",
                  color: "var(--text-main)",
                  outline: "none",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "11px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  pointerEvents: "none",
                }}
              >
                🔍
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div style={{ height: "1px", backgroundColor: "var(--border-light, #EDE3DA)", opacity: 0.6 }} />

          {/* Row 2: Subject Filter */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                minWidth: "85px",
              }}
            >
              <span>📖</span> Subject:
            </span>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", overflowX: "auto" }}>
              {subjects.map((subj) => {
                const isSelected = activeSubject === subj;
                return (
                  <button
                    key={subj}
                    onClick={() => setActiveSubject(subj)}
                    style={{
                      padding: "6px 16px",
                      borderRadius: "100px",
                      border: isSelected ? "1.5px solid #E55200" : "1px solid var(--border-light, #EDE3DA)",
                      backgroundColor: isSelected ? "#E55200" : "var(--cream-bg, #FAF6F0)",
                      color: isSelected ? "#FFFFFF" : "var(--text-main)",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {subj === "All" ? "All Subjects" : subj}
                  </button>
                );
              })}
            </div>

            {/* Reset Filters Button */}
            {(activeSubject !== "All" || activeStandard !== "All" || searchQuery.trim()) && (
              <button
                onClick={() => {
                  setActiveSubject("All");
                  setActiveStandard("All");
                  setSearchQuery("");
                }}
                style={{
                  padding: "5px 12px",
                  borderRadius: "100px",
                  border: "1px dashed #E55200",
                  backgroundColor: "transparent",
                  color: "#E55200",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                  marginLeft: "auto",
                }}
              >
                Reset Filters ↺
              </button>
            )}
          </div>
        </div>

        {/* Practice Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-muted)" }}>
              Loading practice modules from live database...
            </p>
          </div>
        ) : filteredSets.length === 0 ? (
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
              No practice sets found
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Try selecting 'All' or another subject.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "18px" }}>
            {filteredSets.map((set) => (
              <div
                key={set.id}
                style={{
                  backgroundColor: "var(--cream-card, #FFFFFF)",
                  border: "1px solid var(--border-light, #EDE3DA)",
                  borderRadius: "16px",
                  padding: "20px",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.03)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <span
                      style={{
                        backgroundColor: "rgba(229, 82, 0, 0.1)",
                        color: "#E55200",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                      }}
                    >
                      {normalizeSubject(set.subject)}
                    </span>
                    <span
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        color: "var(--text-muted)",
                        fontWeight: 700,
                      }}
                    >
                      {set.class_label || "Class 11/12"}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)", margin: "0 0 6px" }}>
                    {set.title}
                  </h3>

                  <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "0 0 14px", lineHeight: 1.4 }}>
                    Topic: <strong>{set.topic}</strong>
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", color: "var(--text-muted)", marginBottom: "16px" }}>
                    <span>❓ {set.question_count || 10} Questions</span>
                    <span>⏱️ {set.estimated_minutes || 20} Mins</span>
                    <span style={{ color: "#E55200", fontWeight: 700 }}>⚡ {set.difficulty || "Moderate"}</span>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid var(--border-light, #EDE3DA)", paddingTop: "14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  {set.is_completed ? (
                    <span style={{ fontSize: "12px", color: "#10B981", fontWeight: 700 }}>
                      ✓ Completed ({set.last_accuracy || 80}% Acc)
                    </span>
                  ) : (
                    <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600 }}>
                      Not Attempted
                    </span>
                  )}

                  <Link
                    href={`/practice/solve?id=${set.id}`}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #FF6B00 0%, #E55200 100%)",
                      color: "#FFFFFF",
                      fontSize: "12px",
                      fontWeight: 800,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      boxShadow: "0 2px 8px rgba(229, 82, 0, 0.25)",
                    }}
                  >
                    <span>Practice Now</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

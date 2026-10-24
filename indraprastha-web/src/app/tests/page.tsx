"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StudentNavbar from "@/components/StudentNavbar";
import Footer from "@/components/Footer";

interface TestItem {
  id: number;
  title: string;
  category: string;
  subject: string;
  topic: string;
  class_label?: string;
  duration_minutes: number;
  marks: number;
  question_count: number;
  schedule_label?: string;
  is_completed?: boolean;
  last_score?: number;
}

export default function TestsPage() {
  const router = useRouter();
  const [tests, setTests] = useState<TestItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeStandard, setActiveStandard] = useState<string>("All");
  const [activeSubject, setActiveSubject] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [user, setUser] = useState<any>(null);

  // Custom Test Builder state (same as mobile app Custom module)
  const [customStandard, setCustomStandard] = useState<string>("All");
  const [customSubject, setCustomSubject] = useState<string>("All");
  const [customTopic, setCustomTopic] = useState<string>("All");
  const [customQuestionCount, setCustomQuestionCount] = useState<number>(45);
  const [customFilterMode, setCustomFilterMode] = useState<"all" | "bookmarked" | "wrong" | "both">("all");
  const [customDuration, setCustomDuration] = useState<number>(45);
  const [buildingTest, setBuildingTest] = useState<boolean>(false);

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

      fetchTests(storedToken || "");
    }
  }, []);

  const fetchTests = async (token: string) => {
    let activeToken = token;
    try {
      let res = await fetch("https://api.indraprasthaneetacademy.com/api/content/tests", {
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
            localStorage.setItem("indraprastha_token", activeToken);
            res = await fetch("https://api.indraprasthaneetacademy.com/api/content/tests", {
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
        if (data.tests && Array.isArray(data.tests)) {
          setTests(data.tests);
        }
      }
    } catch (e) {
      console.error("Failed to load tests", e);
    } finally {
      setLoading(false);
    }
  };

  const normalizeCategory = (cat?: string) => {
    if (!cat) return "";
    const lower = cat.trim().toLowerCase();
    if (lower.includes("grand")) return "Grand Tests";
    if (lower.includes("chapter")) return "Chapter Tests";
    if (lower.includes("subject")) return "Subject Tests";
    return cat.trim();
  };

  const normalizeSubject = (s?: string) => {
    if (!s) return "";
    const lower = s.trim().toLowerCase();
    if (lower.includes("bio")) return "Biology";
    if (lower.includes("chem")) return "Chemistry";
    if (lower.includes("phys")) return "Physics";
    if (lower.includes("full") || lower.includes("neet")) return "Full Syllabus";
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  };

  const normalizeClass = (c?: string) => {
    if (!c) return "";
    const lower = c.trim().toLowerCase();
    if (lower.includes("11") || lower.includes("xi")) return "Class 11";
    if (lower.includes("12") || lower.includes("xii")) return "Class 12";
    return "";
  };

  const categories = ["All", "Chapter Tests", "Subject Tests", "Grand Tests", "⚡ Custom Test"];
  const standards = ["All", "Class 11", "Class 12"];
  const subjects = ["All", "Physics", "Chemistry", "Biology", "Full Syllabus"];

  const availableTopics = Array.from(
    new Set(
      tests
        .filter((t) => {
          if (customSubject !== "All" && normalizeSubject(t.subject) !== customSubject) {
            return false;
          }
          if (customStandard !== "All" && normalizeClass(t.class_label) !== customStandard) {
            return false;
          }
          return true;
        })
        .map((t) => t.title || t.topic)
        .filter(Boolean)
    )
  ).sort();

  const matchingTestsForCustom = tests.filter((t) => {
    if (customSubject !== "All" && normalizeSubject(t.subject) !== customSubject) {
      return false;
    }
    if (customStandard !== "All" && normalizeClass(t.class_label) !== customStandard) {
      return false;
    }
    if (customTopic !== "All" && t.title !== customTopic && t.topic !== customTopic) {
      return false;
    }
    return true;
  });

  const handleStartCustomTest = async () => {
    if (matchingTestsForCustom.length === 0) {
      alert("No test papers match the chosen criteria. Please adjust your selections.");
      return;
    }

    setBuildingTest(true);
    try {
      const token = localStorage.getItem("indraprastha_token") || "";
      const selectedSources = matchingTestsForCustom.slice(0, 6);
      const questionFetches = selectedSources.map(async (item) => {
        try {
          const res = await fetch(`https://api.indraprasthaneetacademy.com/api/content/tests/${item.id}/questions`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            return data.questions || [];
          }
        } catch {
          // ignore
        }
        return [];
      });

      const questionResults = await Promise.all(questionFetches);
      const pooled: any[] = [];
      questionResults.forEach((arr) => pooled.push(...arr));

      const uniqueQuestions = Array.from(
        new Map(pooled.map((q) => [q.id, q])).values()
      );

      let candidateQuestions = [...uniqueQuestions];

      if (customFilterMode !== "all" && typeof window !== "undefined") {
        let savedBookmarked: string[] = [];
        let savedIncorrect: string[] = [];
        try {
          savedBookmarked = JSON.parse(localStorage.getItem("indraprastha_bookmarked_ids") || "[]");
          savedIncorrect = JSON.parse(localStorage.getItem("indraprastha_incorrect_ids") || "[]");
        } catch {
          // ignore
        }

        const bSet = new Set(savedBookmarked.map(String));
        const iSet = new Set(savedIncorrect.map(String));

        if (customFilterMode === "both") {
          const matched = candidateQuestions.filter((q) => bSet.has(String(q.id)) || iSet.has(String(q.id)));
          if (matched.length === 0) {
            alert("No bookmarked or incorrect questions found for this selection yet. Please attempt tests to build your mistake/bookmark bank, or choose 'Curated Question Pool'.");
            setBuildingTest(false);
            return;
          }
          candidateQuestions = matched;
        } else if (customFilterMode === "bookmarked") {
          const matched = candidateQuestions.filter((q) => bSet.has(String(q.id)));
          if (matched.length === 0) {
            alert("No bookmarked questions found for this selection yet. Bookmark questions during tests or choose 'Curated Question Pool'.");
            setBuildingTest(false);
            return;
          }
          candidateQuestions = matched;
        } else if (customFilterMode === "wrong") {
          const matched = candidateQuestions.filter((q) => iSet.has(String(q.id)));
          if (matched.length === 0) {
            alert("No incorrect questions found for this selection yet. Great job! Choose 'Curated Question Pool' for new questions.");
            setBuildingTest(false);
            return;
          }
          candidateQuestions = matched;
        }
      }

      candidateQuestions.sort(() => Math.random() - 0.5);
      const picked = candidateQuestions.slice(0, customQuestionCount);

      const titleParts = [];
      if (customSubject !== "All") titleParts.push(customSubject);
      if (customStandard !== "All") titleParts.push(customStandard);
      if (customTopic !== "All") titleParts.push(customTopic);
      if (customFilterMode === "both") titleParts.push("Bookmarks & Wrong");
      else if (customFilterMode === "bookmarked") titleParts.push("Bookmarked");
      else if (customFilterMode === "wrong") titleParts.push("Incorrect");

      const testTitle = titleParts.length > 0
        ? `Custom Drill: ${titleParts.join(" · ")}`
        : `Custom NEET Test (${picked.length} Qs)`;

      const customPayload = {
        test: {
          id: "custom",
          title: testTitle,
          category: "Custom Test",
          subject: customSubject !== "All" ? customSubject : "Mixed",
          topic: customTopic !== "All" ? customTopic : "Custom Drill",
          duration_minutes: customDuration,
          marks: picked.length * 4,
          question_count: picked.length,
        },
        questions: picked,
        duration_minutes: customDuration,
      };

      sessionStorage.setItem("indraprastha_custom_test", JSON.stringify(customPayload));
      router.push("/tests/take?id=custom");
    } catch (e) {
      console.error("Failed to generate custom test", e);
      alert("Error starting custom test. Please try again.");
      setBuildingTest(false);
    }
  };

  const filteredTests = tests.filter((t) => {
    const matchesCategory =
      activeCategory === "All" ||
      normalizeCategory(t.category) === activeCategory;

    const matchesStandard =
      activeStandard === "All" ||
      normalizeClass(t.class_label) === activeStandard;

    const matchesSubject =
      activeSubject === "All" ||
      normalizeSubject(t.subject) === activeSubject;

    const matchesSearch =
      !searchQuery.trim() ||
      t.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.topic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesStandard && matchesSubject && matchesSearch;
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--cream-bg, #FAF6F0)" }}>
      <StudentNavbar activeTab="tests" userName={user?.full_name} />

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
              <span style={{ fontSize: "24px" }}>🎯</span>
              <h1 style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                NEET Test Series &amp; Mock Exams
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
                EXACT NEET CBT PATTERN
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>
              Grand Mock Tests, Subject-Wise Speed Drills, and Chapter Tests with negative marking (+4 / -1) and All-India Rank simulation.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
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
              {filteredTests.length} Tests Ready
            </span>
            <button
              onClick={() => setActiveCategory("⚡ Custom Test")}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #FF6B00 0%, #E55200 100%)",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 800,
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 2px 10px rgba(229, 82, 0, 0.3)",
              }}
            >
              <span>⚡</span>
              <span>Create Custom Test</span>
            </button>
          </div>
        </section>

        {/* Filters Section (Category + Standard + Subject + Search) */}
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
          {/* Row 1: Test Type Category + Quick Search */}
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
                <span>🎯</span> Test Type:
              </span>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {categories.map((cat) => {
                  const isSelected = activeCategory === cat;
                  const count =
                    cat === "All"
                      ? tests.length
                      : tests.filter((t) => normalizeCategory(t.category) === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
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
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span>{cat === "All" ? "All Tests" : cat}</span>
                      <span
                        style={{
                          fontSize: "10px",
                          padding: "1px 6px",
                          borderRadius: "10px",
                          backgroundColor: isSelected ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.08)",
                          color: isSelected ? "#FFFFFF" : "var(--text-muted)",
                          fontWeight: 800,
                        }}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Search */}
            <div style={{ position: "relative", minWidth: "220px", maxWidth: "300px", width: "100%" }}>
              <input
                type="text"
                placeholder="Search test papers or topics..."
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

          {/* Row 2: Standard Filter & Subject Filter */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            {/* Standard Filter */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
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
                        padding: "5px 14px",
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

            {/* Subject Filter */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
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
                        padding: "5px 14px",
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
            </div>

            {/* Reset Filters Button */}
            {(activeCategory !== "All" || activeStandard !== "All" || activeSubject !== "All" || searchQuery.trim()) && (
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setActiveStandard("All");
                  setActiveSubject("All");
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

        {/* Tests Grid OR Custom Module Builder */}
        {activeCategory === "⚡ Custom Test" ? (
          <div
            style={{
              backgroundColor: "var(--cream-card, #FFFFFF)",
              border: "1px solid var(--border-light, #EDE3DA)",
              borderRadius: "20px",
              padding: "30px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
              maxWidth: "820px",
              margin: "0 auto",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "24px",
                borderBottom: "1px solid var(--border-light, #EDE3DA)",
                paddingBottom: "18px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "24px" }}>🛠️</span>
                  <h2 style={{ fontSize: "20px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                    Build Your Custom Test Drill
                  </h2>
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
                    CUSTOM MODULE
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>
                  Select your subject and topic, set your target question count and duration, and instantly generate a personalized CBT mock test.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveCategory("All")}
                style={{
                  padding: "7px 16px",
                  borderRadius: "8px",
                  border: "1px solid var(--border-light, #EDE3DA)",
                  backgroundColor: "var(--cream-bg, #FAF6F0)",
                  color: "var(--text-main)",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                ← Back to Tests
              </button>
            </div>

            {/* 1. Standard / Class Selection */}
            <div style={{ marginBottom: "22px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 800, color: "var(--text-main)", marginBottom: "8px" }}>
                1. Standard / Class
              </label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["All", "Class 11", "Class 12"].map((std) => {
                  const isSelected = customStandard === std;
                  return (
                    <button
                      key={std}
                      type="button"
                      onClick={() => {
                        setCustomStandard(std);
                        setCustomTopic("All");
                      }}
                      style={{
                        padding: "8px 18px",
                        borderRadius: "100px",
                        border: isSelected ? "1.5px solid #E55200" : "1px solid var(--border-light, #EDE3DA)",
                        backgroundColor: isSelected ? "#E55200" : "var(--cream-bg, #FAF6F0)",
                        color: isSelected ? "#FFFFFF" : "var(--text-main)",
                        fontSize: "13px",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {std === "All" ? "All Standards (11th + 12th)" : std}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Subject Selection */}
            <div style={{ marginBottom: "22px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 800, color: "var(--text-main)", marginBottom: "8px" }}>
                2. Subject
              </label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["All", "Physics", "Chemistry", "Biology"].map((subj) => {
                  const isSelected = customSubject === subj;
                  return (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => {
                        setCustomSubject(subj);
                        setCustomTopic("All");
                      }}
                      style={{
                        padding: "8px 18px",
                        borderRadius: "100px",
                        border: isSelected ? "1.5px solid #E55200" : "1px solid var(--border-light, #EDE3DA)",
                        backgroundColor: isSelected ? "#E55200" : "var(--cream-bg, #FAF6F0)",
                        color: isSelected ? "#FFFFFF" : "var(--text-main)",
                        fontSize: "13px",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {subj === "All" ? "All Subjects (Full Syllabus)" : subj}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Chapter / Topic Dropdown */}
            <div style={{ marginBottom: "22px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 800, color: "var(--text-main)", marginBottom: "8px" }}>
                3. Chapter / Topic Filter
              </label>
              <select
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid var(--border-light, #EDE3DA)",
                  backgroundColor: "var(--cream-bg, #FAF6F0)",
                  color: "var(--text-main)",
                  fontSize: "13px",
                  fontWeight: 600,
                  outline: "none",
                }}
              >
                <option value="All">All Topics / Mixed Syllabus ({availableTopics.length} chapters available)</option>
                {availableTopics.map((top) => (
                  <option key={top} value={top}>
                    {top}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Question Source / Mode */}
            <div style={{ marginBottom: "22px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 800, color: "var(--text-main)", marginBottom: "8px" }}>
                4. Question Source / Mode
              </label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {[
                  { id: "all", label: "Curated Question Pool", icon: "⚡" },
                  { id: "wrong", label: "Wrong Answers Only", icon: "❌" },
                  { id: "bookmarked", label: "Bookmarked Questions", icon: "🔖" },
                  { id: "both", label: "Bookmarked & Wrong", icon: "📚" },
                ].map((mode) => {
                  const isSelected = customFilterMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setCustomFilterMode(mode.id as any)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "10px",
                        border: isSelected ? "1.5px solid #E55200" : "1px solid var(--border-light, #EDE3DA)",
                        backgroundColor: isSelected ? "#E55200" : "var(--cream-bg, #FAF6F0)",
                        color: isSelected ? "#FFFFFF" : "var(--text-main)",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span>{mode.icon}</span>
                      <span>{mode.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Question Count Selection */}
            <div style={{ marginBottom: "26px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 800, color: "var(--text-main)", marginBottom: "8px" }}>
                5. Number of Questions &amp; Time
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px" }}>
                {[
                  { count: 10, time: 15, tag: "Quick Drill" },
                  { count: 25, time: 35, tag: "Half Section" },
                  { count: 45, time: 45, tag: "Standard Section" },
                  { count: 90, time: 90, tag: "Biology Booster" },
                  { count: 180, time: 180, tag: "Full NEET Mock" },
                ].map((item) => {
                  const isSelected = customQuestionCount === item.count;
                  return (
                    <button
                      key={item.count}
                      type="button"
                      onClick={() => {
                        setCustomQuestionCount(item.count);
                        setCustomDuration(item.time);
                      }}
                      style={{
                        padding: "12px",
                        borderRadius: "12px",
                        border: isSelected ? "2px solid #E55200" : "1px solid var(--border-light, #EDE3DA)",
                        backgroundColor: isSelected ? "rgba(229, 82, 0, 0.08)" : "var(--cream-bg, #FAF6F0)",
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div style={{ fontSize: "18px", fontWeight: 900, color: isSelected ? "#E55200" : "var(--text-main)" }}>
                        {item.count} Qs
                      </div>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", marginTop: "2px" }}>
                        ⏱️ {item.time} mins
                      </div>
                      <div style={{ fontSize: "10px", color: isSelected ? "#E55200" : "var(--text-muted)", marginTop: "4px", fontWeight: 800 }}>
                        {item.tag}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Test Configuration Summary Box */}
            <div
              style={{
                backgroundColor: "rgba(229, 82, 0, 0.05)",
                border: "1px dashed rgba(229, 82, 0, 0.3)",
                borderRadius: "12px",
                padding: "16px 20px",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div>
                <div style={{ fontSize: "11px", fontWeight: 800, color: "#E55200", textTransform: "uppercase" }}>
                  TEST SPECIFICATIONS
                </div>
                <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-main)", marginTop: "2px" }}>
                  {customSubject === "All" ? "Full Syllabus" : customSubject} · {customQuestionCount} Questions · {customDuration} Minutes · {customQuestionCount * 4} Marks
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                  Marking scheme: +4 for correct answer, -1 for wrong answer (Exact NEET CBT pattern)
                </div>
              </div>

              <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-muted)" }}>
                {matchingTestsForCustom.length} matching test paper{matchingTestsForCustom.length === 1 ? "" : "s"} ready
              </div>
            </div>

            {/* Start Button */}
            <button
              type="button"
              onClick={handleStartCustomTest}
              disabled={buildingTest}
              style={{
                width: "100%",
                padding: "14px 24px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #FF6B00 0%, #E55200 100%)",
                color: "#FFFFFF",
                fontSize: "15px",
                fontWeight: 900,
                border: "none",
                cursor: buildingTest ? "not-allowed" : "pointer",
                boxShadow: "0 4px 16px rgba(229, 82, 0, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "transform 0.15s ease",
              }}
            >
              {buildingTest ? (
                <span>⏳ Generating Custom Questions Pool...</span>
              ) : (
                <>
                  <span>🚀 Start Custom Test ({customQuestionCount} Qs • {customDuration} Mins)</span>
                  <span>→</span>
                </>
              )}
            </button>
          </div>
        ) : loading ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-muted)" }}>
              Loading test papers from GCP database...
            </p>
          </div>
        ) : filteredTests.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              backgroundColor: "var(--cream-card, #FFFFFF)",
              borderRadius: "16px",
              border: "1px solid var(--border-light, #EDE3DA)",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>📝</div>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)" }}>
              No tests found in this category
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Try selecting 'All' to view all tests, or build a Custom Test!
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px" }}>
            {filteredTests.map((test) => (
              <div
                key={test.id}
                style={{
                  backgroundColor: "var(--cream-card, #FFFFFF)",
                  border: "1px solid var(--border-light, #EDE3DA)",
                  borderRadius: "18px",
                  padding: "22px",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.03)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
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
                        {test.category || "Grand Test"}
                      </span>
                      {normalizeClass(test.class_label) && (
                        <span
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                            border: "1px solid var(--border-light, #EDE3DA)",
                            color: "var(--text-muted)",
                            padding: "3px 8px",
                            borderRadius: "6px",
                            fontSize: "11px",
                            fontWeight: 700,
                          }}
                        >
                          {normalizeClass(test.class_label)}
                        </span>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        color: test.schedule_label === "Completed" || test.is_completed ? "#10B981" : "#E55200",
                        fontWeight: 700,
                        backgroundColor:
                          test.schedule_label === "Completed" || test.is_completed
                            ? "rgba(16, 185, 129, 0.08)"
                            : "rgba(229, 82, 0, 0.08)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {test.is_completed ? "Completed" : "Upcoming"}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)", margin: "0 0 6px" }}>
                    {test.title}
                  </h3>

                  <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "0 0 16px" }}>
                    Subject: <strong>{normalizeSubject(test.subject)}</strong> · {test.topic}
                  </p>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "8px",
                      backgroundColor: "rgba(229, 82, 0, 0.04)",
                      padding: "10px 12px",
                      borderRadius: "10px",
                      marginBottom: "18px",
                      textAlign: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 700 }}>QUESTIONS</div>
                      <div style={{ fontSize: "14px", fontWeight: 900, color: "var(--text-main)" }}>
                        {test.question_count || 180}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 700 }}>DURATION</div>
                      <div style={{ fontSize: "14px", fontWeight: 900, color: "var(--text-main)" }}>
                        {test.duration_minutes || 180}m
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 700 }}>TOTAL MARKS</div>
                      <div style={{ fontSize: "14px", fontWeight: 900, color: "#E55200" }}>
                        {test.marks || 720}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid var(--border-light, #EDE3DA)", paddingTop: "14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  {test.is_completed ? (
                    <span style={{ fontSize: "12px", color: "#10B981", fontWeight: 700 }}>
                      Score: {test.last_score || 0}/{test.marks || 720}
                    </span>
                  ) : (
                    <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600 }}>
                      Ready to Start
                    </span>
                  )}

                  <Link
                    href={`/tests/take?id=${test.id}`}
                    style={{
                      padding: "8px 18px",
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
                    <span>{test.is_completed ? "Re-attempt Test" : "Take Test"}</span>
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

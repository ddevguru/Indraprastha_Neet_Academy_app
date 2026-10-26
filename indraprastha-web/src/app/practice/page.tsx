"use client";

import Link from "next/link";
import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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

interface SectionDefinition {
  id: string;
  key: string;
  title: string;
  standard: "Class 11" | "Class 12";
  subject: "Physics" | "Chemistry" | "Biology";
  icon: string;
  tagline: string;
  accentColor: string;
  badgeBg: string;
  badgeColor: string;
  gradient: string;
}

const SECTIONS_CONFIG: SectionDefinition[] = [
  {
    id: "11-physics",
    key: "Class 11 Physics",
    title: "Class 11th Physics",
    standard: "Class 11",
    subject: "Physics",
    icon: "⚡",
    tagline: "Mechanics, Gravitation, Solids, Fluids, Heat & Waves",
    accentColor: "#3B82F6",
    badgeBg: "rgba(59, 130, 246, 0.14)",
    badgeColor: "#60A5FA",
    gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.04) 100%)",
  },
  {
    id: "11-chemistry",
    key: "Class 11 Chemistry",
    title: "Class 11th Chemistry",
    standard: "Class 11",
    subject: "Chemistry",
    icon: "🧪",
    tagline: "Atomic Structure, Bonding, Thermodynamics, Equilibrium & Hydrocarbons",
    accentColor: "#10B981",
    badgeBg: "rgba(16, 185, 129, 0.14)",
    badgeColor: "#34D399",
    gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.04) 100%)",
  },
  {
    id: "11-biology",
    key: "Class 11 Biology",
    title: "Class 11th Biology",
    standard: "Class 11",
    subject: "Biology",
    icon: "🌿",
    tagline: "Living World, Plant & Animal Kingdom, Cell Cycle & Human Physiology",
    accentColor: "#8B5CF6",
    badgeBg: "rgba(139, 92, 246, 0.14)",
    badgeColor: "#A78BFA",
    gradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(124, 58, 237, 0.04) 100%)",
  },
  {
    id: "12-physics",
    key: "Class 12 Physics",
    title: "Class 12th Physics",
    standard: "Class 12",
    subject: "Physics",
    icon: "🚀",
    tagline: "Electrostatics, Current, Magnetism, Optics & Modern Physics",
    accentColor: "#F59E0B",
    badgeBg: "rgba(245, 158, 11, 0.14)",
    badgeColor: "#FBBF24",
    gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.04) 100%)",
  },
  {
    id: "12-chemistry",
    key: "Class 12 Chemistry",
    title: "Class 12th Chemistry",
    standard: "Class 12",
    subject: "Chemistry",
    icon: "⚗️",
    tagline: "Electrochemistry, Chemical Kinetics, Coordination Compounds & Organic Reactions",
    accentColor: "#EC4899",
    badgeBg: "rgba(236, 72, 153, 0.14)",
    badgeColor: "#F472B6",
    gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(219, 39, 119, 0.04) 100%)",
  },
  {
    id: "12-biology",
    key: "Class 12 Biology",
    title: "Class 12th Biology",
    standard: "Class 12",
    subject: "Biology",
    icon: "🧬",
    tagline: "Reproduction, Genetics, Molecular Inheritance, Biotechnology & Ecology",
    accentColor: "#0EA5E9",
    badgeBg: "rgba(14, 165, 233, 0.14)",
    badgeColor: "#38BDF8",
    gradient: "linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(2, 132, 199, 0.04) 100%)",
  },
];

function normalizeClass(c?: string): "Class 11" | "Class 12" {
  if (!c) return "Class 11";
  const lower = c.trim().toLowerCase();
  if (lower.includes("12") || lower.includes("xii")) return "Class 12";
  return "Class 11";
}

function normalizeSubject(s?: string): "Physics" | "Chemistry" | "Biology" {
  if (!s) return "Physics";
  const lower = s.trim().toLowerCase();
  if (lower.includes("chem")) return "Chemistry";
  if (lower.includes("bio") || lower.includes("bot") || lower.includes("zoo")) return "Biology";
  return "Physics";
}

function PracticePageComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sets, setSets] = useState<PracticeSetItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [authToken, setAuthToken] = useState<string>("");

  // Tabs: "pyqs" (6 Sections) vs "custom" (Custom Module Builder) vs "all" (All 95 Chapters)
  const [activeTab, setActiveTab] = useState<"pyqs" | "custom" | "all">("pyqs");

  // Selected 6-section key (e.g. "Class 11 Physics") or null to view all 6 section cards
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  // Search within section or overall
  const [sectionSearch, setSectionSearch] = useState<string>("");
  const [allSearch, setAllSearch] = useState<string>("");

  // Filters for flat "all" view
  const [filterStandard, setFilterStandard] = useState<string>("All");
  const [filterSubject, setFilterSubject] = useState<string>("All");

  // ── CUSTOM PRACTICE BUILDER STATE (MATCHING TEST BUILDER) ──
  const [customStandard, setCustomStandard] = useState<string>("All");
  const [customSubject, setCustomSubject] = useState<string>("All");
  const [customTopic, setCustomTopic] = useState<string>("All");
  const [customQuestionCount, setCustomQuestionCount] = useState<number>(25);
  const [customDuration, setCustomDuration] = useState<number>(35);
  const [customFilterMode, setCustomFilterMode] = useState<"all" | "bookmarked" | "wrong" | "both">("all");
  const [customExecutionMode, setCustomExecutionMode] = useState<"practice" | "test">("practice");
  const [buildingCustom, setBuildingCustom] = useState<boolean>(false);

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

      fetchPracticeSets(storedToken);
    }
  }, []);

  // Handle URL query ?section=... or ?tab=custom
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "custom") {
      setActiveTab("custom");
    }

    const secParam = searchParams.get("section");
    if (secParam) {
      const matched = SECTIONS_CONFIG.find(
        (s) => s.id === secParam.toLowerCase() || s.key.toLowerCase() === secParam.toLowerCase()
      );
      if (matched) {
        setSelectedSection(matched.key);
        setActiveTab("pyqs");
      }
    }
  }, [searchParams]);

  const fetchPracticeSets = async (token: string) => {
    try {
      // 1. Fetch from reliable Next.js API route
      const localRes = await fetch("/api/practice");
      if (localRes.ok) {
        const data = await localRes.json();
        if (data.practiceSets && Array.isArray(data.practiceSets) && data.practiceSets.length > 0) {
          setSets(data.practiceSets);
          if (typeof window !== "undefined" && data.practiceSets[0]?.id) {
            localStorage.setItem("indraprastha_free_practice_id", String(data.practiceSets[0].id));
          }
          setLoading(false);
          return;
        }
      }
    } catch {
      // proceed to fallback
    }

    let activeToken = token;
    try {
      const res = await fetch("https://api.indraprasthaneetacademy.com/api/content/practice-sets", {
        headers: {
          ...(activeToken ? { Authorization: `Bearer ${activeToken}` } : {}),
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.practiceSets && Array.isArray(data.practiceSets)) {
          setSets(data.practiceSets);
          if (typeof window !== "undefined" && data.practiceSets[0]?.id) {
            localStorage.setItem("indraprastha_free_practice_id", String(data.practiceSets[0].id));
          }
        }
      }
    } catch (e) {
      console.error("Failed to load practice sets", e);
    } finally {
      setLoading(false);
    }
  };

  // Group practice sets into 6 sections
  const sectionGroups = useMemo(() => {
    const map: Record<string, PracticeSetItem[]> = {
      "Class 11 Physics": [],
      "Class 11 Chemistry": [],
      "Class 11 Biology": [],
      "Class 12 Physics": [],
      "Class 12 Chemistry": [],
      "Class 12 Biology": [],
    };

    sets.forEach((set) => {
      const std = normalizeClass(set.class_label);
      const sub = normalizeSubject(set.subject);
      const key = `${std} ${sub}`;
      if (map[key]) {
        map[key].push(set);
      }
    });

    // Sort chapters in each section by id ASC (standard syllabus sequence)
    Object.keys(map).forEach((key) => {
      map[key].sort((a, b) => a.id - b.id);
    });

    return map;
  }, [sets]);

  // Total questions count across all 95 sets
  const totalQuestionsCount = useMemo(() => {
    return sets.reduce((acc, s) => acc + (s.question_count || 0), 0);
  }, [sets]);

  // Selected section metadata & chapters
  const currentSectionMeta = useMemo(() => {
    if (!selectedSection) return null;
    return SECTIONS_CONFIG.find((s) => s.key === selectedSection) || null;
  }, [selectedSection]);

  const currentSectionChapters = useMemo(() => {
    if (!selectedSection) return [];
    const list = sectionGroups[selectedSection] || [];
    if (!sectionSearch.trim()) return list;
    const q = sectionSearch.toLowerCase();
    return list.filter(
      (c) => c.title.toLowerCase().includes(q) || c.topic.toLowerCase().includes(q)
    );
  }, [selectedSection, sectionGroups, sectionSearch]);

  // Available topics for custom module generator
  const availableCustomTopics = useMemo(() => {
    return Array.from(
      new Set(
        sets
          .filter((s) => {
            if (customSubject !== "All" && normalizeSubject(s.subject) !== customSubject) return false;
            if (customStandard !== "All" && normalizeClass(s.class_label) !== customStandard) return false;
            return true;
          })
          .map((s) => s.title || s.topic)
          .filter(Boolean)
      )
    ).sort();
  }, [sets, customSubject, customStandard]);

  // Matching sets for custom builder
  const matchingSetsForCustom = useMemo(() => {
    return sets.filter((s) => {
      if (customSubject !== "All" && normalizeSubject(s.subject) !== customSubject) return false;
      if (customStandard !== "All" && normalizeClass(s.class_label) !== customStandard) return false;
      if (customTopic !== "All" && s.title !== customTopic && s.topic !== customTopic) return false;
      return true;
    });
  }, [sets, customSubject, customStandard, customTopic]);

  // Filtered list for "All Practice Sets" view
  const allFilteredSets = useMemo(() => {
    return sets.filter((s) => {
      const matchesStandard =
        filterStandard === "All" ||
        normalizeClass(s.class_label).toLowerCase() === filterStandard.toLowerCase();

      const matchesSubject =
        filterSubject === "All" ||
        normalizeSubject(s.subject).toLowerCase() === filterSubject.toLowerCase();

      const matchesSearch =
        !allSearch.trim() ||
        s.title.toLowerCase().includes(allSearch.toLowerCase()) ||
        s.topic.toLowerCase().includes(allSearch.toLowerCase());

      return matchesStandard && matchesSubject && matchesSearch;
    });
  }, [sets, filterStandard, filterSubject, allSearch]);

  const handleSelectSection = (sectionKey: string) => {
    setSelectedSection(sectionKey);
    setSectionSearch("");
    const matched = SECTIONS_CONFIG.find((s) => s.key === sectionKey);
    if (matched) {
      window.history.pushState(null, "", `/practice?section=${matched.id}`);
    }
  };

  const handleBackToSections = () => {
    setSelectedSection(null);
    setSectionSearch("");
    window.history.pushState(null, "", "/practice");
  };

  // ── GENERATE & START CUSTOM MODULE DRILL ──
  const handleStartCustomPractice = async () => {
    if (matchingSetsForCustom.length === 0) {
      alert("No chapters match the selected standard and subject. Please choose another combination.");
      return;
    }

    setBuildingCustom(true);
    let activeToken = authToken;
    try {
      // Pick up to 6 matching chapters if there are many to make fetching instant
      const setsToQuery =
        matchingSetsForCustom.length > 6
          ? [...matchingSetsForCustom].sort(() => Math.random() - 0.5).slice(0, 6)
          : matchingSetsForCustom;

      const questionFetches = setsToQuery.map(async (s) => {
        try {
          let res = await fetch(`/api/practice/${s.id}`);
          if (!res.ok) {
            res = await fetch(`https://api.indraprasthaneetacademy.com/api/content/practice-sets/${s.id}/questions`, {
              headers: {
                ...(activeToken ? { Authorization: `Bearer ${activeToken}` } : {}),
                "Content-Type": "application/json",
              },
            });
          }
          if (res.ok) {
            const data = await res.json();
            return (data.questions || []).map((q: any) => ({
              ...q,
              subject: s.subject,
              chapter: s.title,
              topic: s.topic,
            }));
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
            alert("No bookmarked or incorrect questions found for this selection yet. Choose 'Curated Question Pool' for new questions.");
            setBuildingCustom(false);
            return;
          }
          candidateQuestions = matched;
        } else if (customFilterMode === "bookmarked") {
          const matched = candidateQuestions.filter((q) => bSet.has(String(q.id)));
          if (matched.length === 0) {
            alert("No bookmarked questions found for this selection yet. Bookmark questions during practice or choose 'Curated Question Pool'.");
            setBuildingCustom(false);
            return;
          }
          candidateQuestions = matched;
        } else if (customFilterMode === "wrong") {
          const matched = candidateQuestions.filter((q) => iSet.has(String(q.id)));
          if (matched.length === 0) {
            alert("No incorrect questions found for this selection yet. Great job! Choose 'Curated Question Pool' for new questions.");
            setBuildingCustom(false);
            return;
          }
          candidateQuestions = matched;
        }
      }

      if (candidateQuestions.length === 0) {
        alert("No questions found for the selected chapters. Please try another selection.");
        setBuildingCustom(false);
        return;
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

      const drillTitle =
        titleParts.length > 0
          ? `Custom Drill: ${titleParts.join(" · ")}`
          : `Custom PYQs & Practice (${picked.length} Qs)`;

      const customPayload = {
        practiceSet: {
          id: "custom",
          title: drillTitle,
          subject: customSubject !== "All" ? customSubject : "Mixed",
          topic: customTopic !== "All" ? customTopic : "Custom Chapter Pool",
          difficulty: "Adaptive",
          question_count: picked.length,
        },
        test: {
          id: "custom",
          title: drillTitle,
          category: "Custom Practice Test",
          subject: customSubject !== "All" ? customSubject : "Mixed",
          topic: customTopic !== "All" ? customTopic : "Custom Chapter Pool",
          duration_minutes: customDuration,
          marks: picked.length * 4,
          question_count: picked.length,
        },
        questions: picked,
        duration_minutes: customDuration,
      };

      sessionStorage.setItem("indraprastha_custom_practice", JSON.stringify(customPayload));
      sessionStorage.setItem("indraprastha_custom_test", JSON.stringify(customPayload));

      if (customExecutionMode === "test") {
        router.push("/tests/take?id=custom");
      } else {
        router.push("/practice/solve?id=custom");
      }
    } catch (e) {
      console.error("Failed to generate custom practice drill", e);
      alert("Error starting custom drill. Please try again.");
      setBuildingCustom(false);
    }
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
      <StudentNavbar activeTab="practice" userName={user?.full_name} />

      <main style={{ flex: 1, padding: "28px 20px 80px", maxWidth: "1180px", width: "100%", margin: "0 auto" }}>
        {/* ── HEADER BANNER ── */}
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
              <span style={{ fontSize: "26px" }}>🎯</span>
              <h1 style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                NCERT Topic-wise Practice Drill Modules
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
                <span>⚡</span>
                <span>NEET 2026 / 2027 CURATED</span>
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>
              Master high-yield NCERT concepts through 6 Class &amp; Subject sections, build custom module drills, or solve chapter-by-chapter questions with instant explanations.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span
              style={{
                padding: "8px 14px",
                borderRadius: "10px",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                color: "#10B981",
                fontSize: "12.5px",
                fontWeight: 800,
                border: "1px solid rgba(16, 185, 129, 0.25)",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>📚</span>
              <span>{sets.length} Chapters • {totalQuestionsCount.toLocaleString()} MCQs</span>
            </span>
          </div>
        </section>

        {/* ── TOP NAVIGATION TABS (MATCHING APP CATEGORIES + CUSTOM MODULE) ── */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "22px",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            padding: "6px",
            borderRadius: "16px",
            border: "1px solid var(--border-light, #EDE3DA)",
            flexWrap: "wrap",
          }}
        >
          {/* TAB 1: 6 SECTIONS */}
          <button
            onClick={() => {
              setActiveTab("pyqs");
            }}
            style={{
              flex: "1 1 240px",
              padding: "11px 18px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: activeTab === "pyqs" ? "#E55200" : "transparent",
              color: activeTab === "pyqs" ? "#FFFFFF" : "var(--text-main)",
              fontSize: "13px",
              fontWeight: 800,
              cursor: "pointer",
              transition: "all 0.15s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: activeTab === "pyqs" ? "0 4px 14px rgba(229, 82, 0, 0.28)" : "none",
            }}
          >
            <span>🎯 Class-wise Practice MCQs (6 Sections)</span>
            <span
              style={{
                backgroundColor: activeTab === "pyqs" ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.08)",
                padding: "2px 8px",
                borderRadius: "10px",
                fontSize: "10.5px",
              }}
            >
              6 Sections
            </span>
          </button>

          {/* TAB 2: CUSTOM PRACTICE TEST GENERATOR */}
          <button
            onClick={() => {
              setActiveTab("custom");
              setSelectedSection(null);
            }}
            style={{
              flex: "1 1 240px",
              padding: "11px 18px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: activeTab === "custom" ? "#E55200" : "transparent",
              color: activeTab === "custom" ? "#FFFFFF" : "var(--text-main)",
              fontSize: "13px",
              fontWeight: 800,
              cursor: "pointer",
              transition: "all 0.15s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: activeTab === "custom" ? "0 4px 14px rgba(229, 82, 0, 0.35)" : "none",
            }}
          >
            <span>⚡ Custom Module Test (Create Your Own Drill)</span>
            <span
              style={{
                backgroundColor: activeTab === "custom" ? "rgba(255, 255, 255, 0.25)" : "rgba(229, 82, 0, 0.15)",
                color: activeTab === "custom" ? "#FFFFFF" : "#E55200",
                padding: "2px 8px",
                borderRadius: "10px",
                fontSize: "10.5px",
                fontWeight: 900,
              }}
            >
              NEW
            </span>
          </button>

          {/* TAB 3: ALL 95 CHAPTERS FLAT GRID */}
          <button
            onClick={() => {
              setActiveTab("all");
              setSelectedSection(null);
            }}
            style={{
              flex: "1 1 200px",
              padding: "11px 18px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: activeTab === "all" ? "#4F46E5" : "transparent",
              color: activeTab === "all" ? "#FFFFFF" : "var(--text-main)",
              fontSize: "13px",
              fontWeight: 800,
              cursor: "pointer",
              transition: "all 0.15s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: activeTab === "all" ? "0 4px 14px rgba(79, 70, 229, 0.35)" : "none",
            }}
          >
            <span>📑 All 95 Chapters</span>
            <span
              style={{
                backgroundColor: activeTab === "all" ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.08)",
                padding: "2px 8px",
                borderRadius: "10px",
                fontSize: "10.5px",
              }}
            >
              {sets.length}
            </span>
          </button>
        </div>

        {/* ── LOADING STATE ── */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>⏳</div>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)" }}>
              Loading Practice Modules &amp; PYQs from GCP Database...
            </h3>
          </div>
        ) : activeTab === "custom" ? (
          /* ========================================================================= */
          /* CUSTOM PRACTICE MODULE TEST BUILDER (MATCHING /tests CUSTOM TEST BUILDER) */
          /* ========================================================================= */
          <div
            style={{
              backgroundColor: "var(--cream-card, #FFFFFF)",
              border: "1px solid var(--border-light, #EDE3DA)",
              borderRadius: "20px",
              padding: "28px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
              marginBottom: "30px",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
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
                  <span style={{ fontSize: "24px" }}>⚡</span>
                  <h2 style={{ fontSize: "20px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                    Build Your Custom PYQs &amp; Practice Drill
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
                  Select your class, subject, and chapter, set your target question count, and instantly generate a customized practice drill with step-by-step explanations or CBT timed exam.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab("pyqs")}
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
                ← Back to 6 Sections
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

            {/* 3. Chapter / Topic Filter Dropdown */}
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
                <option value="All">All Topics / Mixed Chapter Pool ({availableCustomTopics.length} chapters available)</option>
                {availableCustomTopics.map((top) => (
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
                  { id: "wrong", label: "Wrong Answers Only (Past Mistakes)", icon: "❌" },
                  { id: "bookmarked", label: "Bookmarked Questions", icon: "🔖" },
                  { id: "both", label: "Bookmarked & Wrong Combined", icon: "📚" },
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

            {/* 5. Question Count & Duration Selection */}
            <div style={{ marginBottom: "22px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 800, color: "var(--text-main)", marginBottom: "8px" }}>
                5. Number of Questions &amp; Duration
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px" }}>
                {[
                  { count: 10, time: 15, tag: "Quick Drill" },
                  { count: 25, time: 35, tag: "Chapter Drill" },
                  { count: 45, time: 45, tag: "Standard Section" },
                  { count: 90, time: 90, tag: "Heavy Drill" },
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

            {/* 6. Execution Mode Selection */}
            <div style={{ marginBottom: "26px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 800, color: "var(--text-main)", marginBottom: "8px" }}>
                6. Solve Experience
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
                <div
                  onClick={() => setCustomExecutionMode("practice")}
                  style={{
                    padding: "14px 18px",
                    borderRadius: "14px",
                    border: customExecutionMode === "practice" ? "2px solid #E55200" : "1px solid var(--border-light, #EDE3DA)",
                    backgroundColor: customExecutionMode === "practice" ? "rgba(229, 82, 0, 0.08)" : "var(--cream-bg, #FAF6F0)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span style={{ fontSize: "18px" }}>💡</span>
                    <strong style={{ fontSize: "14px", color: customExecutionMode === "practice" ? "#E55200" : "var(--text-main)" }}>
                      Practice Mode (Instant Feedback)
                    </strong>
                  </div>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0, lineHeight: 1.4 }}>
                    See correct answers right away with faculty step-by-step explanations and unlock Similar Questions for every concept.
                  </p>
                </div>

                <div
                  onClick={() => setCustomExecutionMode("test")}
                  style={{
                    padding: "14px 18px",
                    borderRadius: "14px",
                    border: customExecutionMode === "test" ? "2px solid #7C3AED" : "1px solid var(--border-light, #EDE3DA)",
                    backgroundColor: customExecutionMode === "test" ? "rgba(124, 58, 237, 0.08)" : "var(--cream-bg, #FAF6F0)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span style={{ fontSize: "18px" }}>⏱️</span>
                    <strong style={{ fontSize: "14px", color: customExecutionMode === "test" ? "#7C3AED" : "var(--text-main)" }}>
                      CBT Timed Exam Mode
                    </strong>
                  </div>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0, lineHeight: 1.4 }}>
                    Strict countdown timer, question palette navigation, +4 / -1 negative marking, and final diagnostic score breakdown.
                  </p>
                </div>
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
                  CUSTOM SPECIFICATIONS
                </div>
                <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-main)", marginTop: "2px" }}>
                  {customSubject === "All" ? "Full Syllabus" : customSubject} · {customQuestionCount} Questions · {customDuration} Minutes · {customQuestionCount * 4} Marks
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                  Mode: {customExecutionMode === "practice" ? "Practice with Step-by-Step Solutions & Similar Questions" : "CBT Timed Test (+4 / -1 Marking)"}
                </div>
              </div>

              <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-muted)" }}>
                {matchingSetsForCustom.length} matching chapter{matchingSetsForCustom.length === 1 ? "" : "s"} ready
              </div>
            </div>

            {/* Start Button */}
            <button
              type="button"
              onClick={handleStartCustomPractice}
              disabled={buildingCustom}
              style={{
                width: "100%",
                padding: "14px 24px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #FF6B00 0%, #E55200 100%)",
                color: "#FFFFFF",
                fontSize: "15px",
                fontWeight: 900,
                border: "none",
                cursor: buildingCustom ? "not-allowed" : "pointer",
                boxShadow: "0 4px 16px rgba(229, 82, 0, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "transform 0.15s ease",
              }}
            >
              {buildingCustom ? (
                <span>⏳ Generating Custom Questions Pool...</span>
              ) : (
                <>
                  <span>🚀 Start Custom Drill ({customQuestionCount} Questions • {customDuration} Mins)</span>
                  <span>→</span>
                </>
              )}
            </button>
          </div>
        ) : activeTab === "pyqs" ? (
          /* ========================================================================= */
          /* 6 CLASS-WISE SUBJECT SECTIONS VIEW (MATCHING MOBILE APP PRACTICE / PYQS)  */
          /* ========================================================================= */
          <div>
            {!selectedSection ? (
              /* ── 6 SECTION CARDS GRID ── */
              <div>
                <div
                  style={{
                    backgroundColor: "rgba(229, 82, 0, 0.05)",
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
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "18px" }}>💡</span>
                    <span style={{ fontSize: "13px", color: "var(--text-main)", fontWeight: 600 }}>
                      Select any of the <strong>6 Class &amp; Subject sections</strong> below to practice chapter-wise MCQs and previous year questions.
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTab("custom")}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "8px",
                      backgroundColor: "#E55200",
                      color: "#FFFFFF",
                      border: "none",
                      fontSize: "12px",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    ⚡ Build Custom Drill →
                  </button>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {SECTIONS_CONFIG.map((sec) => {
                    const chapterList = sectionGroups[sec.key] || [];
                    const qCount = chapterList.reduce((acc, s) => acc + (s.question_count || 0), 0);

                    return (
                      <div
                        key={sec.key}
                        onClick={() => handleSelectSection(sec.key)}
                        style={{
                          backgroundColor: "var(--cream-card, #FFFFFF)",
                          border: `1.5px solid var(--border-light, #EDE3DA)`,
                          borderRadius: "20px",
                          padding: "24px",
                          boxShadow: "0 4px 18px rgba(0, 0, 0, 0.04)",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          position: "relative",
                          overflow: "hidden",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-3px)";
                          e.currentTarget.style.borderColor = sec.accentColor;
                          e.currentTarget.style.boxShadow = `0 8px 24px rgba(0, 0, 0, 0.12)`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.borderColor = "var(--border-light, #EDE3DA)";
                          e.currentTarget.style.boxShadow = "0 4px 18px rgba(0, 0, 0, 0.04)";
                        }}
                      >
                        {/* Subtle accent bar at top */}
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "4px",
                            backgroundColor: sec.accentColor,
                          }}
                        />

                        <div>
                          {/* Card Top: Standard badge & icon */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginBottom: "16px",
                            }}
                          >
                            <span
                              style={{
                                backgroundColor: sec.badgeBg,
                                color: sec.badgeColor,
                                padding: "4px 10px",
                                borderRadius: "8px",
                                fontSize: "11.5px",
                                fontWeight: 800,
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                              }}
                            >
                              {sec.standard} NEET
                            </span>

                            <div
                              style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "12px",
                                backgroundColor: sec.badgeBg,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "22px",
                              }}
                            >
                              {sec.icon}
                            </div>
                          </div>

                          {/* Section Title */}
                          <h2
                            style={{
                              fontSize: "20px",
                              fontWeight: 900,
                              color: "var(--text-main)",
                              margin: "0 0 6px",
                            }}
                          >
                            {sec.title}
                          </h2>

                          {/* Tagline / Syllabus Scope */}
                          <p
                            style={{
                              fontSize: "12.5px",
                              color: "var(--text-muted)",
                              margin: "0 0 18px",
                              lineHeight: 1.5,
                            }}
                          >
                            {sec.tagline}
                          </p>
                        </div>

                        {/* Card Bottom: Chapter stats & CTA */}
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              paddingTop: "14px",
                              borderTop: "1px solid var(--border-light, #EDE3DA)",
                              fontSize: "12px",
                              color: "var(--text-muted)",
                            }}
                          >
                            <span style={{ fontWeight: 700, color: "var(--text-main)" }}>
                              📖 {chapterList.length} Chapters
                            </span>
                            <span style={{ fontWeight: 800, color: sec.accentColor }}>
                              ⚡ {qCount.toLocaleString()} MCQs
                            </span>
                          </div>

                          <button
                            type="button"
                            style={{
                              marginTop: "14px",
                              width: "100%",
                              padding: "10px 16px",
                              borderRadius: "10px",
                              backgroundColor: sec.badgeBg,
                              color: sec.badgeColor,
                              border: `1px solid ${sec.accentColor}`,
                              fontSize: "12.5px",
                              fontWeight: 800,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "6px",
                              transition: "all 0.15s ease",
                            }}
                          >
                            <span>Browse Chapters</span>
                            <span>→</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* ========================================================================= */
              /* CHAPTERS DETAIL VIEW FOR SELECTED SECTION                                 */
              /* ========================================================================= */
              <div>
                {/* Back Nav & Section Header */}
                <div
                  style={{
                    backgroundColor: "var(--cream-card, #FFFFFF)",
                    border: "1px solid var(--border-light, #EDE3DA)",
                    borderRadius: "18px",
                    padding: "20px 24px",
                    marginBottom: "20px",
                    boxShadow: "0 4px 18px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "14px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <button
                        onClick={handleBackToSections}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "10px",
                          border: "1px solid var(--border-light, #EDE3DA)",
                          backgroundColor: "transparent",
                          color: "var(--text-main)",
                          fontSize: "12.5px",
                          fontWeight: 800,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span>←</span>
                        <span>Back to 6 Sections</span>
                      </button>

                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "24px" }}>{currentSectionMeta?.icon}</span>
                        <div>
                          <h2 style={{ fontSize: "18px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                            {currentSectionMeta?.title}
                          </h2>
                          <span style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>
                            {currentSectionChapters.length} Chapters Available for Practice &amp; PYQs
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Section Switcher Dropdown for fast hopping */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 700 }}>Switch Section:</span>
                      <select
                        value={selectedSection}
                        onChange={(e) => handleSelectSection(e.target.value)}
                        style={{
                          padding: "7px 12px",
                          borderRadius: "8px",
                          border: "1px solid var(--border-light, #EDE3DA)",
                          backgroundColor: "var(--cream-bg, #FAF6F0)",
                          color: "var(--text-main)",
                          fontSize: "12px",
                          fontWeight: 700,
                          outline: "none",
                        }}
                      >
                        {SECTIONS_CONFIG.map((sec) => (
                          <option key={sec.key} value={sec.key}>
                            {sec.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Search inside this subject's chapters */}
                  <div style={{ position: "relative", width: "100%" }}>
                    <input
                      type="text"
                      placeholder={`Search in ${currentSectionMeta?.title} (e.g. Vectors, Laws of Motion, Bonding)...`}
                      value={sectionSearch}
                      onChange={(e) => setSectionSearch(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px 10px 38px",
                        fontSize: "13px",
                        borderRadius: "12px",
                        border: "1px solid var(--border-light, #EDE3DA)",
                        backgroundColor: "var(--cream-bg, #FAF6F0)",
                        color: "var(--text-main)",
                        outline: "none",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        left: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "14px",
                        color: "var(--text-muted)",
                        pointerEvents: "none",
                      }}
                    >
                      🔍
                    </span>
                    {sectionSearch && (
                      <button
                        onClick={() => setSectionSearch("")}
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "12px",
                          color: "var(--text-muted)",
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Chapters List */}
                {currentSectionChapters.length === 0 ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "60px 20px",
                      backgroundColor: "var(--cream-card, #FFFFFF)",
                      borderRadius: "16px",
                      border: "1px solid var(--border-light, #EDE3DA)",
                    }}
                  >
                    <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔍</div>
                    <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)" }}>
                      No chapters match &quot;{sectionSearch}&quot;
                    </h3>
                    <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                      Try typing a different chapter name or clear search.
                    </p>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "18px" }}>
                    {currentSectionChapters.map((chapter, idx) => (
                      <div
                        key={chapter.id}
                        style={{
                          backgroundColor: "var(--cream-card, #FFFFFF)",
                          border: "1px solid var(--border-light, #EDE3DA)",
                          borderRadius: "16px",
                          padding: "20px",
                          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.03)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          transition: "transform 0.15s ease",
                        }}
                      >
                        <div>
                          {/* Chapter Index & Difficulty */}
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                            <span
                              style={{
                                backgroundColor: currentSectionMeta?.badgeBg,
                                color: currentSectionMeta?.badgeColor,
                                padding: "3px 8px",
                                borderRadius: "6px",
                                fontSize: "11px",
                                fontWeight: 800,
                              }}
                            >
                              CH #{idx + 1}
                            </span>
                            <span
                              style={{
                                backgroundColor: "rgba(255, 255, 255, 0.08)",
                                border: "1px solid var(--border-light, #EDE3DA)",
                                padding: "3px 8px",
                                borderRadius: "6px",
                                fontSize: "11px",
                                color: "var(--text-muted)",
                                fontWeight: 700,
                              }}
                            >
                              ⚡ {chapter.difficulty || "Moderate"}
                            </span>
                          </div>

                          <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)", margin: "0 0 6px" }}>
                            {chapter.title}
                          </h3>

                          <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "0 0 14px", lineHeight: 1.4 }}>
                            Topic: <strong>{chapter.topic || chapter.title}</strong>
                          </p>

                          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", color: "var(--text-muted)", marginBottom: "16px" }}>
                            <span>❓ {chapter.question_count || 10} Questions</span>
                            <span>⏱️ {chapter.estimated_minutes || 45} Mins</span>
                          </div>
                        </div>

                        <div style={{ borderTop: "1px solid var(--border-light, #EDE3DA)", paddingTop: "14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          {chapter.is_completed ? (
                            <span style={{ fontSize: "12px", color: "#10B981", fontWeight: 700 }}>
                              ✓ Completed ({chapter.last_accuracy || 80}%)
                            </span>
                          ) : (
                            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600 }}>
                              Ready to Solve
                            </span>
                          )}

                          <Link
                            href={`/practice/solve?id=${chapter.id}`}
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
                            <span>Start Practice</span>
                            <span>→</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* ========================================================================= */
          /* FLAT VIEW: ALL 95 PRACTICE SETS WITH STANDARDS & SUBJECTS FILTERS         */
          /* ========================================================================= */
          <div>
            {/* Filter Bar */}
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
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                {/* Standard Filter */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>
                    Standard:
                  </span>
                  {["All", "Class 11", "Class 12"].map((std) => {
                    const isSelected = filterStandard === std;
                    return (
                      <button
                        key={std}
                        onClick={() => setFilterStandard(std)}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "100px",
                          border: isSelected ? "1.5px solid #4F46E5" : "1px solid var(--border-light, #EDE3DA)",
                          backgroundColor: isSelected ? "#4F46E5" : "var(--cream-bg, #FAF6F0)",
                          color: isSelected ? "#FFFFFF" : "var(--text-main)",
                          fontSize: "12px",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        {std}
                      </button>
                    );
                  })}
                </div>

                {/* Subject Filter */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>
                    Subject:
                  </span>
                  {["All", "Physics", "Chemistry", "Biology"].map((sub) => {
                    const isSelected = filterSubject === sub;
                    return (
                      <button
                        key={sub}
                        onClick={() => setFilterSubject(sub)}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "100px",
                          border: isSelected ? "1.5px solid #4F46E5" : "1px solid var(--border-light, #EDE3DA)",
                          backgroundColor: isSelected ? "#4F46E5" : "var(--cream-bg, #FAF6F0)",
                          color: isSelected ? "#FFFFFF" : "var(--text-main)",
                          fontSize: "12px",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        {sub}
                      </button>
                    );
                  })}
                </div>

                {/* Search */}
                <div style={{ position: "relative", minWidth: "220px", maxWidth: "280px", width: "100%" }}>
                  <input
                    type="text"
                    placeholder="Search all 95 chapters..."
                    value={allSearch}
                    onChange={(e) => setAllSearch(e.target.value)}
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
                </div>
              </div>
            </div>

            {/* Flat Grid */}
            {allFilteredSets.length === 0 ? (
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
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "18px" }}>
                {allFilteredSets.map((set) => (
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
                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                            border: "1px solid var(--border-light, #EDE3DA)",
                            padding: "3px 8px",
                            borderRadius: "6px",
                            fontSize: "11px",
                            color: "var(--text-muted)",
                            fontWeight: 700,
                          }}
                        >
                          {normalizeClass(set.class_label)}
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
                          ✓ Completed ({set.last_accuracy || 80}%)
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
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>⏳</div>
            <p style={{ fontWeight: 800 }}>Loading Practice &amp; PYQs Module...</p>
          </div>
        </div>
      }
    >
      <PracticePageComponent />
    </Suspense>
  );
}

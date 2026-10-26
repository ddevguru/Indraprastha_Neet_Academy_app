"use client";

import Link from "next/link";
import { useEffect, useState, useMemo, Suspense } from "react";
import { useRouter } from "next/navigation";
import StudentNavbar from "@/components/StudentNavbar";
import Footer from "@/components/Footer";

interface ChapterItem {
  id: number;
  book_id: number;
  title: string;
  topic: string;
  subject: string;
  class_label: string;
  question_count: number;
  order_index: number;
}

interface SectionMeta {
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

const SECTIONS_META: SectionMeta[] = [
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
    tagline: "Reproduction, Genetics, Evolution, Biotechnology & Ecology",
    accentColor: "#06B6D4",
    badgeBg: "rgba(6, 182, 212, 0.14)",
    badgeColor: "#22D3EE",
    gradient: "linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(8, 145, 178, 0.04) 100%)",
  },
];

function PyqsPageComponent() {
  const router = useRouter();
  const [chapters, setChapters] = useState<ChapterItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [subModalOpen, setSubModalOpen] = useState<boolean>(false);
  const [selectedLockedChapter, setSelectedLockedChapter] = useState<ChapterItem | null>(null);

  // Filters & State
  const [filterSubject, setFilterSubject] = useState<string>("All");
  const [filterStandard, setFilterStandard] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>(" ");
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const hasActiveSub = Boolean(user?.has_active_subscription || user?.subscription_status === "active");

  const freeChapterId = useMemo(() => {
    const valid = chapters.find((c) => c.question_count > 0);
    return valid ? valid.id : (chapters[0]?.id || null);
  }, [chapters]);

  useEffect(() => {
    if (freeChapterId && typeof window !== "undefined") {
      localStorage.setItem("indraprastha_free_pyq_id", String(freeChapterId));
    }
  }, [freeChapterId]);

  const isChapterUnlocked = (ch: ChapterItem) => {
    if (hasActiveSub) return true;
    return freeChapterId !== null && ch.id === freeChapterId;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("indraprastha_user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          // ignore
        }
      }
    }
    loadChapters();
  }, []);

  const loadChapters = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pyqs");
      if (res.ok) {
        const data = await res.json();
        setChapters(data.chapters || []);
      }
    } catch (e) {
      console.error("Failed to load PYQ chapters:", e);
    } finally {
      setLoading(false);
    }
  };

  // Group chapters by section key
  const chaptersBySection = useMemo(() => {
    const map: Record<string, ChapterItem[]> = {};
    for (const sec of SECTIONS_META) {
      map[sec.key] = [];
    }

    for (const ch of chapters) {
      const cls = ch.class_label.toLowerCase().includes("12") ? "Class 12" : "Class 11";
      let sub = "Physics";
      const subLower = ch.subject.toLowerCase();
      if (subLower.includes("chem")) sub = "Chemistry";
      else if (subLower.includes("bio") || subLower.includes("bot") || subLower.includes("zoo")) sub = "Biology";

      const key = `${cls} ${sub}`;
      if (!map[key]) {
        map[key] = [];
      }
      map[key].push(ch);
    }
    return map;
  }, [chapters]);

  // Overall statistics
  const totalQuestions = useMemo(() => {
    return chapters.reduce((sum, ch) => sum + (ch.question_count || 0), 0);
  }, [chapters]);

  // Filtered chapters for search/flat view
  const filteredChapters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return chapters.filter((ch) => {
      // Subject filter
      if (filterSubject !== "All") {
        const sub = ch.subject.toLowerCase();
        const sel = filterSubject.toLowerCase();
        if (sel === "biology") {
          if (!sub.includes("bio") && !sub.includes("bot") && !sub.includes("zoo")) return false;
        } else if (!sub.includes(sel)) {
          return false;
        }
      }

      // Class filter
      if (filterStandard !== "All") {
        if (!ch.class_label.toLowerCase().includes(filterStandard.toLowerCase())) {
          return false;
        }
      }

      // Query
      if (q.length > 0) {
        const matchTitle = ch.title.toLowerCase().includes(q);
        const matchTopic = ch.topic.toLowerCase().includes(q);
        const matchSub = ch.subject.toLowerCase().includes(q);
        if (!matchTitle && !matchTopic && !matchSub) return false;
      }

      return true;
    });
  }, [chapters, filterSubject, filterStandard, searchQuery]);

  // Handle Chapter Solve Navigation
  const handleSolveChapter = (ch: ChapterItem) => {
    if (!isChapterUnlocked(ch)) {
      setSelectedLockedChapter(ch);
      setSubModalOpen(true);
      return;
    }
    const title = encodeURIComponent(ch.title);
    const subject = encodeURIComponent(ch.subject);
    router.push(`/pyqs/solve?chapterId=${ch.id}&title=${title}&subject=${subject}`);
  };

  const getSubjectColor = (s: string) => {
    const lower = s.toLowerCase();
    if (lower.includes("physics")) return "#3B82F6";
    if (lower.includes("chem")) return "#10B981";
    return "#8B5CF6";
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
      <StudentNavbar activeTab="pyqs" userName={user?.full_name} />

      <main style={{ flex: 1, padding: "30px 16px 80px", maxWidth: "1320px", width: "100%", margin: "0 auto" }}>
        {/* ════════ HEADER HERO CARD ════════ */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "24px",
            background: "linear-gradient(135deg, rgba(229, 82, 0, 0.12) 0%, rgba(255, 107, 0, 0.04) 100%)",
            border: "1px solid rgba(229, 82, 0, 0.25)",
            padding: "36px 32px",
            marginBottom: "32px",
            boxShadow: "0 10px 40px rgba(229, 82, 0, 0.06)",
          }}
        >
          <div style={{ maxWidth: "880px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "100px",
                backgroundColor: "rgba(229, 82, 0, 0.14)",
                color: "#E55200",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.5px",
                marginBottom: "16px",
              }}
            >
              <span>📚</span>
              <span>NCERT BOOKS &amp; NEET ARCHIVES • CHAPTER-WISE PYQS</span>
            </div>

            <h1
              style={{
                fontSize: "32px",
                fontWeight: 900,
                color: "var(--text-main)",
                letterSpacing: "-0.8px",
                lineHeight: 1.2,
                marginBottom: "12px",
              }}
            >
              Class-wise &amp; Chapter-wise Previous Year Questions (PYQs)
            </h1>

            <p
              style={{
                fontSize: "15px",
                color: "var(--text-muted)",
                lineHeight: 1.6,
                maxWidth: "740px",
                marginBottom: "24px",
              }}
            >
              Directly extracted from official <strong>NCERT Textbook Chapters</strong> &amp; 37+ years of NEET/AIPMT papers.
              Master authentic past questions with instant verified step-by-step solutions, key derivations, and AI Similar Questions.
            </p>

            {/* Quick Metrics */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  backgroundColor: "var(--cream-card, #FFFFFF)",
                  border: "1px solid var(--border-light, #EDE3DA)",
                }}
              >
                <span style={{ fontSize: "20px" }}>📜</span>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 900, color: "#E55200", lineHeight: 1.1 }}>
                    {loading ? "..." : `${totalQuestions}+ Questions`}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 700 }}>
                    Official NEET &amp; AIPMT PYQs
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  backgroundColor: "var(--cream-card, #FFFFFF)",
                  border: "1px solid var(--border-light, #EDE3DA)",
                }}
              >
                <span style={{ fontSize: "20px" }}>📖</span>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 900, color: "var(--text-main)", lineHeight: 1.1 }}>
                    {loading ? "..." : `${chapters.length} NCERT Chapters`}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 700 }}>
                    Class 11th &amp; 12th Complete
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  backgroundColor: "var(--cream-card, #FFFFFF)",
                  border: "1px solid var(--border-light, #EDE3DA)",
                }}
              >
                <span style={{ fontSize: "20px" }}>🎯</span>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: 900, color: "#10B981", lineHeight: 1.1 }}>
                    100% Verified
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 700 }}>
                    Step-by-Step Solutions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ SUBSCRIPTION STATUS BANNER ════════ */}
        {!hasActiveSub ? (
          <div
            style={{
              backgroundColor: "rgba(229, 82, 0, 0.08)",
              border: "1.5px solid rgba(229, 82, 0, 0.25)",
              borderRadius: "16px",
              padding: "16px 20px",
              marginBottom: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "24px" }}>🎁</span>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--text-main)" }}>
                  Free Demo Mode: 1 Full Chapterwise PYQ Collection Unlocked
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  Subscribe to unlock all {chapters.length || "95+"} chapters of 15+ years NEET PYQs with audited step-by-step solutions.
                </div>
              </div>
            </div>
            <Link
              href="/subscriptions"
              style={{
                padding: "8px 18px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #FF6B00 0%, #E55200 100%)",
                color: "#FFFFFF",
                fontSize: "12px",
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(229, 82, 0, 0.25)",
                whiteSpace: "nowrap",
              }}
            >
              Unlock All PYQ Chapters with Subscription →
            </Link>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.08)",
              border: "1.5px solid rgba(16, 185, 129, 0.25)",
              borderRadius: "14px",
              padding: "12px 18px",
              marginBottom: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "18px" }}>✨</span>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#10B981" }}>
                Active Plan: {user?.subscription_plan || "Pro Target Batch"}
                <span style={{ fontSize: "12px", color: "var(--text-muted)", marginLeft: "8px", fontWeight: 500 }}>
                  • All 15+ years chapterwise NEET PYQs unlocked!
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ════════ SEARCH & FILTER CONTROLS ════════ */}
        <section
          style={{
            backgroundColor: "var(--cream-card, #FFFFFF)",
            border: "1px solid var(--border-light, #EDE3DA)",
            borderRadius: "18px",
            padding: "18px 20px",
            marginBottom: "28px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {/* Search Bar */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <div
              style={{
                flex: 1,
                minWidth: "260px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "var(--cream-bg, #FAF6F0)",
                border: "1px solid var(--border-light, #EDE3DA)",
                borderRadius: "12px",
                padding: "8px 14px",
              }}
            >
              <span style={{ fontSize: "16px", color: "var(--text-muted)" }}>🔍</span>
              <input
                type="text"
                value={searchQuery.trim()}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chapter name (e.g., Units, Thermodynamics, Ray Optics, Genetics)..."
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  color: "var(--text-main)",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              />
              {searchQuery.trim().length > 0 && (
                <button
                  type="button"
                  onClick={() => setSearchQuery(" ")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    fontSize: "14px",
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Toggle: Section Grid vs Flat List */}
            {selectedSection && (
              <button
                type="button"
                onClick={() => setSelectedSection(null)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "10px",
                  border: "1px solid rgba(229, 82, 0, 0.3)",
                  backgroundColor: "rgba(229, 82, 0, 0.08)",
                  color: "#E55200",
                  fontSize: "12px",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>←</span>
                <span>View All 6 Sections</span>
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
            {/* Subject Filters */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--text-muted)", marginRight: "4px" }}>
                Subject:
              </span>
              {["All", "Physics", "Chemistry", "Biology"].map((sub) => {
                const isActive = filterSubject === sub;
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => {
                      setFilterSubject(sub);
                      setSelectedSection(null);
                    }}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "8px",
                      border: isActive ? "1px solid #E55200" : "1px solid var(--border-light, #EDE3DA)",
                      backgroundColor: isActive ? "#E55200" : "transparent",
                      color: isActive ? "#FFFFFF" : "var(--text-main)",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {sub === "Physics" ? "⚡ Physics" : sub === "Chemistry" ? "🧪 Chemistry" : sub === "Biology" ? "🌿 Biology" : "All Subjects"}
                  </button>
                );
              })}
            </div>

            {/* Standard Filters */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--text-muted)", marginRight: "4px" }}>
                Class:
              </span>
              {["All", "Class 11", "Class 12"].map((cls) => {
                const isActive = filterStandard === cls;
                return (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => {
                      setFilterStandard(cls);
                      setSelectedSection(null);
                    }}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "8px",
                      border: isActive ? "1px solid var(--text-main)" : "1px solid var(--border-light, #EDE3DA)",
                      backgroundColor: isActive ? "var(--text-main)" : "transparent",
                      color: isActive ? "var(--cream-bg)" : "var(--text-main)",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {cls}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════ LOADING SKELETON ════════ */}
        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                style={{
                  height: "180px",
                  borderRadius: "18px",
                  backgroundColor: "var(--cream-card, #FFFFFF)",
                  border: "1px solid var(--border-light, #EDE3DA)",
                  animation: "pulse 1.5s infinite ease-in-out",
                }}
              />
            ))}
          </div>
        )}

        {/* ════════ MAIN VIEW ════════ */}
        {!loading && (
          <>
            {/* Case 1: Search query active or specific filters selected -> Show Flat Chapter Cards */}
            {searchQuery.trim().length > 0 || filterSubject !== "All" || filterStandard !== "All" || selectedSection !== null ? (
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <h2 style={{ fontSize: "18px", fontWeight: 800, color: "var(--text-main)" }}>
                    {selectedSection ? selectedSection : "Matching Chapters"} ({selectedSection ? (chaptersBySection[selectedSection] || []).length : filteredChapters.length})
                  </h2>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 700 }}>
                    Click any chapter to solve questions
                  </span>
                </div>

                {((selectedSection ? chaptersBySection[selectedSection] || [] : filteredChapters).length === 0) ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "60px 20px",
                      borderRadius: "18px",
                      backgroundColor: "var(--cream-card, #FFFFFF)",
                      border: "1px dashed var(--border-light, #EDE3DA)",
                    }}
                  >
                    <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
                    <div style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)", marginBottom: "6px" }}>
                      No matching chapters found
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "16px" }}>
                      Try adjusting your search query or reset your subject/class filters.
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery(" ");
                        setFilterSubject("All");
                        setFilterStandard("All");
                        setSelectedSection(null);
                      }}
                      style={{
                        padding: "8px 18px",
                        borderRadius: "10px",
                        backgroundColor: "#E55200",
                        color: "#FFFFFF",
                        border: "none",
                        fontWeight: 700,
                        fontSize: "13px",
                        cursor: "pointer",
                      }}
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "16px" }}>
                    {(selectedSection ? chaptersBySection[selectedSection] || [] : filteredChapters).map((ch, idx) => {
                      const hasPyqs = ch.question_count > 0;
                      const subLower = ch.subject.toLowerCase();
                      const icon = subLower.includes("physics") ? "⚡" : subLower.includes("chem") ? "🧪" : "🌿";
                      const color = getSubjectColor(ch.subject);

                      return (
                        <div
                          key={ch.id}
                          onClick={() => handleSolveChapter(ch)}
                          style={{
                            backgroundColor: "var(--cream-card, #FFFFFF)",
                            border: "1px solid var(--border-light, #EDE3DA)",
                            borderRadius: "18px",
                            padding: "20px",
                            cursor: "pointer",
                            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            gap: "16px",
                            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.borderColor = color;
                            e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.08)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "none";
                            e.currentTarget.style.borderColor = "var(--border-light, #EDE3DA)";
                            e.currentTarget.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.02)";
                          }}
                        >
                          <div>
                            {/* Badges Row */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "12px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <span
                                  style={{
                                    fontSize: "11px",
                                    fontWeight: 800,
                                    padding: "3px 8px",
                                    borderRadius: "6px",
                                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                                    color: "var(--text-main)",
                                  }}
                                >
                                  {ch.class_label}
                                </span>
                                <span
                                  style={{
                                    fontSize: "11px",
                                    fontWeight: 800,
                                    padding: "3px 8px",
                                    borderRadius: "6px",
                                    backgroundColor: `${color}18`,
                                    color: color,
                                  }}
                                >
                                  {icon} {ch.subject}
                                </span>
                              </div>

                              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <span
                                  style={{
                                    fontSize: "11px",
                                    fontWeight: 800,
                                    padding: "3px 8px",
                                    borderRadius: "6px",
                                    backgroundColor: isChapterUnlocked(ch) ? "rgba(16, 185, 129, 0.12)" : "rgba(229, 82, 0, 0.1)",
                                    color: isChapterUnlocked(ch) ? "#059669" : "#E55200",
                                  }}
                                >
                                  {isChapterUnlocked(ch) ? (hasActiveSub ? "Unlocked ✓" : "✨ Free Demo Chapter") : "🔒 Pro Only"}
                                </span>
                                <span
                                  style={{
                                    fontSize: "11px",
                                    fontWeight: 800,
                                    padding: "3px 8px",
                                    borderRadius: "6px",
                                    backgroundColor: hasPyqs ? "rgba(16, 185, 129, 0.12)" : "rgba(229, 82, 0, 0.08)",
                                    color: hasPyqs ? "#059669" : "#E55200",
                                  }}
                                >
                                  {hasPyqs ? `${ch.question_count} PYQs` : "NCERT Drill"}
                                </span>
                              </div>
                            </div>

                            {/* Chapter Title */}
                            <h3
                              style={{
                                fontSize: "16px",
                                fontWeight: 800,
                                color: "var(--text-main)",
                                lineHeight: 1.35,
                                marginBottom: "6px",
                              }}
                            >
                              {ch.title}
                            </h3>

                            {ch.topic && ch.topic !== ch.title && (
                              <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.4 }}>
                                {ch.topic}
                              </div>
                            )}
                          </div>

                          {/* Action Button */}
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid var(--border-light, #EDE3DA)" }}>
                            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-muted)" }}>
                              NCERT Chapter #{idx + 1}
                            </span>

                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                fontSize: "13px",
                                fontWeight: 800,
                                color: isChapterUnlocked(ch) ? color : "#E55200",
                              }}
                            >
                              <span>{isChapterUnlocked(ch) ? "Solve PYQs" : "🔒 Unlock Chapter"}</span>
                              <span>→</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* Case 2: Default 6 Section Cards (Matching NEET Standards) */
              <div>
                <div style={{ marginBottom: "20px" }}>
                  <h2 style={{ fontSize: "20px", fontWeight: 900, color: "var(--text-main)", marginBottom: "4px" }}>
                    Select Subject &amp; Class Section
                  </h2>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                    Choose a category below to explore all chapters from Class 11th &amp; 12th syllabus.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "20px" }}>
                  {SECTIONS_META.map((sec) => {
                    const secChapters = chaptersBySection[sec.key] || [];
                    const secPyqCount = secChapters.reduce((sum, c) => sum + (c.question_count || 0), 0);

                    return (
                      <div
                        key={sec.id}
                        onClick={() => setSelectedSection(sec.key)}
                        style={{
                          backgroundColor: "var(--cream-card, #FFFFFF)",
                          border: "1px solid var(--border-light, #EDE3DA)",
                          borderRadius: "20px",
                          padding: "24px",
                          cursor: "pointer",
                          transition: "all 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
                          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.03)",
                          position: "relative",
                          overflow: "hidden",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.borderColor = sec.accentColor;
                          e.currentTarget.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.08)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "none";
                          e.currentTarget.style.borderColor = "var(--border-light, #EDE3DA)";
                          e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.03)";
                        }}
                      >
                        {/* Background subtle tint */}
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: "140px",
                            height: "140px",
                            background: sec.gradient,
                            borderRadius: "50%",
                            filter: "blur(40px)",
                            opacity: 0.8,
                            pointerEvents: "none",
                          }}
                        />

                        {/* Top Icon & Tag */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                          <div
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "14px",
                              backgroundColor: sec.badgeBg,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "24px",
                            }}
                          >
                            {sec.icon}
                          </div>

                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 800,
                              padding: "4px 10px",
                              borderRadius: "100px",
                              backgroundColor: sec.badgeBg,
                              color: sec.accentColor,
                            }}
                          >
                            {sec.standard}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 style={{ fontSize: "19px", fontWeight: 900, color: "var(--text-main)", marginBottom: "6px" }}>
                          {sec.title}
                        </h3>

                        <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "20px" }}>
                          {sec.tagline}
                        </p>

                        {/* Stats Row */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingTop: "14px",
                            borderTop: "1px solid var(--border-light, #EDE3DA)",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div>
                              <span style={{ fontSize: "15px", fontWeight: 900, color: "var(--text-main)" }}>
                                {secChapters.length}
                              </span>{" "}
                              <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 700 }}>
                                Chapters
                              </span>
                            </div>
                            <span style={{ color: "var(--border-light, #EDE3DA)" }}>•</span>
                            <div>
                              <span style={{ fontSize: "15px", fontWeight: 900, color: sec.accentColor }}>
                                {secPyqCount > 0 ? `${secPyqCount}+` : `${secChapters.length * 25}+`}
                              </span>{" "}
                              <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 700 }}>
                                PYQs
                              </span>
                            </div>
                          </div>

                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              fontSize: "13px",
                              fontWeight: 800,
                              color: sec.accentColor,
                            }}
                          >
                            <span>Explore</span>
                            <span>→</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
        {/* ════════ SUBSCRIPTION UNLOCK MODAL ════════ */}
        {subModalOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(6px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
            }}
            onClick={() => setSubModalOpen(false)}
          >
            <div
              style={{
                backgroundColor: "var(--cream-card, #FFFFFF)",
                borderRadius: "20px",
                maxWidth: "520px",
                width: "100%",
                padding: "28px",
                border: "1.5px solid var(--border-light, #EDE3DA)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "24px" }}>🔒</span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#E55200",
                      backgroundColor: "rgba(229, 82, 0, 0.1)",
                      padding: "3px 10px",
                      borderRadius: "6px",
                      textTransform: "uppercase",
                    }}
                  >
                    Subscription Required
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSubModalOpen(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                  }}
                >
                  ✕
                </button>
              </div>

              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-main)", marginBottom: "8px" }}>
                Unlock {selectedLockedChapter?.title || "Chapterwise NEET PYQs"}
              </h3>

              <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "20px" }}>
                You are currently exploring the Free Demo. 1 Complete Chapter of PYQs is unlocked for you. To practice all 15+ years of chapterwise NEET PYQs with audited step-by-step solutions and AI Similar Questions, please upgrade to a subscription plan.
              </p>

              <div
                style={{
                  backgroundColor: "rgba(229, 82, 0, 0.04)",
                  border: "1px solid rgba(229, 82, 0, 0.12)",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  marginBottom: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  fontSize: "13px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-main)" }}>
                  <span style={{ color: "#10B981", fontWeight: 800 }}>✓</span>
                  <span>10,000+ NCERT Line-by-Line &amp; 15+ Years PYQs</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-main)" }}>
                  <span style={{ color: "#10B981", fontWeight: 800 }}>✓</span>
                  <span>Audited Step-by-Step Derivations &amp; Video Explanations</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-main)" }}>
                  <span style={{ color: "#10B981", fontWeight: 800 }}>✓</span>
                  <span>AI Solve Similar Questions Generator for Every MCQ</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Link
                  href="/subscriptions"
                  style={{
                    flex: 1,
                    minWidth: "180px",
                    padding: "12px 20px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #FF6B00 0%, #E55200 100%)",
                    color: "#FFFFFF",
                    fontSize: "14px",
                    fontWeight: 800,
                    textAlign: "center",
                    textDecoration: "none",
                    boxShadow: "0 4px 12px rgba(229, 82, 0, 0.3)",
                  }}
                >
                  Explore Subscription Plans →
                </Link>
                {freeChapterId && (
                  <button
                    type="button"
                    onClick={() => {
                      setSubModalOpen(false);
                      const freeCh = chapters.find((c) => c.id === freeChapterId);
                      if (freeCh) {
                        const title = encodeURIComponent(freeCh.title);
                        const subject = encodeURIComponent(freeCh.subject);
                        router.push(`/pyqs/solve?chapterId=${freeCh.id}&title=${title}&subject=${subject}`);
                      }
                    }}
                    style={{
                      padding: "12px 18px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-light, #EDE3DA)",
                      backgroundColor: "transparent",
                      color: "var(--text-main)",
                      fontSize: "13px",
                      fontWeight: 700,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    Solve Free Demo Chapter
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function PyqsPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#E55200" }}>Loading PYQs Archive...</div>
        </div>
      }
    >
      <PyqsPageComponent />
    </Suspense>
  );
}

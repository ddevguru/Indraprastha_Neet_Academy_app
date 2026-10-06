"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ─── DATA ─── */
const navItems = [
  { label: "Home", href: "/" },
  { label: "Target Batches", href: "/target-batches", active: true },
  { label: "AI Rank Predictor", href: "/#quiz" },
  { label: "Methodology", href: "/#methodology" },
  { label: "Mobile App", href: "/#app" },
  { label: "Help & Support", href: "#footer" },
];

const batchCards = [
  {
    id: "neet-2026-rank-booster",
    badge: "TWO YEAR COMPREHENSIVE",
    saveTag: "40% OFF",
    icon: "🏆",
    title: "NEET 2026 Rank Booster",
    subtitle: "Target: Class 11th + 12th Complete Syllabus Re-Engineering",
    price: "₹14,999",
    oldPrice: "₹24,999",
    materialInfo: "Includes Hardcopy Study Material",
    emiInfo: "💳 EMI starts ₹1,499/mo",
    emiSub: "Zero Interest + Instant Approval",
    targetYear: "2026",
    classFilter: "11th",
    feats: [
      {
        bold: "Full NCERT Audio/Visual Line-by-Line",
        text: "Word-for-word audio decoding with 3D anatomy diagrams.",
      },
      {
        bold: "45+ Full-Length Tests",
        text: "Simulated on exact NTA CBT interface with negative marking diagnostics.",
      },
      {
        bold: "Dedicated Doctor-Mentor",
        text: "Weekly progress review & AIIMS/JIPMER alumni 1:1 strategy calls.",
      },
      {
        bold: "15+ Years PYQ Taxonomy",
        text: "Decoded topic-wise with video explanations and error-maps.",
      },
    ],
    facultyLabel: "Top Medical Faculty Team",
    facultySub: "10+ Rated AIIMS Instructors",
    startDate: "STARTS 15TH JULY",
    timing: "Morning (08:00 AM - 01:00 PM)",
    ctaPrice: "Enroll Now • ₹14,999",
  },
  {
    id: "neet-2027-foundation",
    badge: "EARLY STARTER 2-YEAR",
    saveTag: "28% OFF",
    icon: "💎",
    title: "NEET 2027 Foundation Batch",
    subtitle: "Target: Fresh Class 11th Students Aiming for Top 100 AIR",
    price: "₹18,999",
    oldPrice: "₹25,999",
    materialInfo: "Covers 24 Months of Continuous Coaching",
    emiInfo: "💳 EMI starts ₹1,899/mo",
    emiSub: "Flexible 6 or 12 Month Plans",
    targetYear: "2027",
    classFilter: "11th",
    feats: [
      {
        bold: "Zero-to-Advanced Concepts",
        text: "Null vis visuals for Physics/Organic mechanisms from bedrock fundamentals.",
      },
      {
        bold: "Daily Practice Problems (DPP)",
        text: "30 high-yield questions every single day with video hints.",
      },
      {
        bold: "Weekly All-India Benchmarking",
        text: "Compete live across 45,000+ registered aspirants nationwide.",
      },
      {
        bold: "Parent Counseling Dashboards",
        text: "Monthly performance reports, attendance, and speed tracking.",
      },
    ],
    facultyLabel: "Flagship Faculty Owner",
    facultySub: "18+ Years Mean Experience",
    startDate: "STARTS 20TH JULY",
    timing: "Evening (04:00 PM - 09:00 PM)",
    ctaPrice: "Enroll Now • ₹18,999",
  },
  {
    id: "dropper-rapid-revision",
    badge: "DEDICATED REPEATERS",
    saveTag: "45% OFF",
    icon: "⚡",
    title: "Dropper Rapid Revision Batch",
    subtitle: "Target: Score Elevation From 450+ to 680+ in 10 Months",
    price: "₹12,499",
    oldPrice: "₹21,999",
    materialInfo: "Includes Hardcopy Rank Booster Kits",
    emiInfo: "💳 EMI starts ₹1,249/mo",
    emiSub: "No Processing Fee",
    targetYear: "2026",
    classFilter: "dropper",
    feats: [
      {
        bold: "Negative Marking Eraser Engine",
        text: "Pinpoints why you pick distractors and reduces hesitation.",
      },
      {
        bold: "Targeted High-Yield Formula Books",
        text: "Custom formula sheets compiled strictly from past test errors.",
      },
      {
        bold: "1-on-1 Monthly Diagnostic Review",
        text: "Live sit-down with Academic Dean to recalibrate study schedules.",
      },
      {
        bold: "8,000+ NCERT Assertion-Reason Traps",
        text: "Specialized drill for Tricky Section B Botany & Zoology items.",
      },
    ],
    facultyLabel: "Dropper Specialist Mentors",
    facultySub: "Rank Elevation Specialists",
    startDate: "STARTS 10TH AUGUST",
    timing: "Full-Day Intensive (09:00 AM - 05:00 PM)",
    ctaPrice: "Enroll Now • ₹12,499",
  },
  {
    id: "class-12-board-neet-synergy",
    badge: "DUAL-EXAM BOOSTER BATCH",
    saveTag: "36% OFF",
    icon: "📑",
    title: "Class 12 Board + NEET Synergy",
    subtitle: "Target: 95%+ in Board Exam + 680+ in NEET 2026",
    price: "₹13,999",
    oldPrice: "₹22,999",
    materialInfo: "Includes Subjective Board Answer Boosters",
    emiInfo: "💳 EMI starts ₹1,399/mo",
    emiSub: "Direct Bank Debit or UPI",
    targetYear: "2026",
    classFilter: "12th",
    feats: [
      {
        bold: "Dual-Track Syllabus Alignment",
        text: "Never study a topic twice. Seamless integration of subjective derivation + MCQs.",
      },
      {
        bold: "Board Answer Writing Clinics",
        text: "Step-marking techniques to secure centum in Biology & Chemistry theory.",
      },
      {
        bold: "Speed & Accuracy Drills",
        text: "Practice 45-second question pacing for NEET Physics numericals.",
      },
      {
        bold: "All-India Pre-Board Simulations",
        text: "5 Board Mocks followed immediately by full-length NEET Mocks.",
      },
    ],
    facultyLabel: "CBSE & NTA Expert Faculty",
    facultySub: "Top Board Evaluators",
    startDate: "STARTS 1ST AUGUST",
    timing: "Evening (05:00 PM - 09:00 PM)",
    ctaPrice: "Enroll Now • ₹13,999",
  },
];

const comparisonRows = [
  {
    factor: "NCERT Indexing & Coverage",
    indraprastha: "100% strict adherence with zero extraneous non-NCERT material",
    traditional: "Outdated 5,000-page module clutter with irrelevant MSc-level syllabus",
  },
  {
    factor: "Batch Strength & Attention",
    indraprastha: "25/40 Limit: 25 aspirants per academic mentor",
    traditional: "250 to 500 students crammed into stadium classrooms",
  },
  {
    factor: "24/7 Doubt Resolution Speed",
    indraprastha: "Under 7 minutes live audio/video step-by-step resolution",
    traditional: "Queue open faculty counters or wait 48h on community forums",
  },
  {
    factor: "AI Weak-Spot & Negative Marking Detection",
    indraprastha: "Real-time cognitive error log with personalized remedial drills",
    traditional: "Only gives raw marks and percentiles with zero actionable insights",
  },
  {
    factor: "Medical Alumni Mentorship",
    indraprastha: "Weekly 1:1 strategy calls with AIIMS & top GMC residents",
    traditional: "Non-existent; strictly sales counselors with no NEET background",
  },
];

export default function TargetBatchesPage() {
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [classFilter, setClassFilter] = useState<string>("all");
  const [activeModal, setActiveModal] = useState<{ type: string; batchName: string } | null>(null);

  const filteredBatches = batchCards.filter((b) => {
    if (yearFilter !== "all" && b.targetYear !== yearFilter) return false;
    if (classFilter !== "all" && b.classFilter !== classFilter) return false;
    return true;
  });

  return (
    <>
      {/* ════════ TOP ANNOUNCEMENT BAR ════════ */}
      <div
        style={{
          background: "#FFF4EC",
          borderBottom: "1px solid #FFD4BC",
          fontSize: "12px",
          color: "#4A3225",
          padding: "8px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              background: "var(--orange)",
              color: "#FFF",
              fontWeight: 900,
              fontSize: "10px",
              padding: "2px 8px",
              borderRadius: "4px",
              letterSpacing: "0.5px",
            }}
          >
            🔥 PROGRAM ANNOUNCEMENT
          </span>
          <strong>Batches strictly mapped to recent NMC syllabus rationalization guidelines</strong>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontWeight: 700 }}>
          <span style={{ color: "#16A34A" }}>✓ 100% NCERT Line-by-Line Pedagogy</span>
          <span style={{ color: "var(--orange)" }}>🎓 Scholarship Window Closes in 48h</span>
        </div>
      </div>

      {/* ════════ NAVBAR ════════ */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          {/* Logo */}
          <Link href="/" className="navbar-brand" aria-label="Indraprastha NEET Academy">
            <Image
              src="/logo_app.jpeg"
              alt="Indraprastha NEET Logo"
              width={38}
              height={38}
              priority
              style={{ objectFit: "cover" }}
            />
            <div>
              <span className="brand-title">IndraprasthaNEET</span>
              <span className="brand-sub">ACADEMY</span>
            </div>
          </Link>

          {/* Nav Items */}
          <ul className="navbar-nav">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={item.active ? "nav-link-active" : ""}
                  style={
                    item.active
                      ? { background: "rgba(229,82,0,0.1)", color: "var(--orange)", fontWeight: 800 }
                      : {}
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="navbar-actions">
            <a href="tel:+917702022682" className="phone-badge">
              📞 +91 77020 22682
            </a>
            <a href="#itre" className="btn-enroll-nav btn-orange-leather">
              <span>Enroll Now</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ════════ PAGE HERO BANNER & FILTERS ════════ */}
      <section className="hero-section has-texture" style={{ paddingTop: "96px", paddingBottom: "48px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          {/* Header Badges */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <span
              style={{
                border: "1px solid var(--orange)",
                color: "var(--orange)",
                fontSize: "11px",
                fontWeight: 800,
                padding: "4px 12px",
                borderRadius: "100px",
                letterSpacing: "0.5px",
                background: "#FFF4EC",
              }}
            >
              ADMISSIONS OPEN 2026 / 2027
            </span>
            <span
              style={{
                background: "#16A34A",
                color: "#FFF",
                fontSize: "11px",
                fontWeight: 800,
                padding: "4px 12px",
                borderRadius: "100px",
              }}
            >
              New NMC Blueprints
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "40px", alignItems: "flex-end" }}>
            <div>
              <h1 className="hero-title" style={{ fontSize: "48px", marginBottom: "14px" }}>
                NEET 2026 &amp; 2027{" "}
                <span style={{ color: "var(--orange)", fontStyle: "italic" }}>Target Batches</span>
              </h1>
              <p className="hero-subtitle" style={{ fontSize: "15px", maxWidth: "680px", margin: 0 }}>
                Curated programs built strictly on revised NMC &amp; NTA syllabus frameworks. Master complete NCERT line-by-line rigor under elite medical mentors and top AIIMS alumni faculties.
              </p>
            </div>

            {/* Right Trust Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div
                style={{
                  background: "#FFF",
                  border: "1px solid var(--border-light)",
                  borderRadius: "10px",
                  padding: "10px 16px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#3B2B23",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <span style={{ fontSize: "16px" }}>🎓</span>
                <span>1:25 Mentor Ratio Guaranteed</span>
              </div>

              <div
                style={{
                  background: "#FFF",
                  border: "1px solid var(--border-light)",
                  borderRadius: "10px",
                  padding: "10px 16px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#3B2B23",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <span style={{ fontSize: "16px" }}>⚡</span>
                <span>Daily Live Error-Desk Diagnosis</span>
              </div>
            </div>
          </div>

          {/* ── FILTER CONTROLS BAR ── */}
          <div
            style={{
              marginTop: "40px",
              background: "#FFF",
              borderRadius: "12px",
              border: "1px solid var(--border-light)",
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
              flexWrap: "wrap",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {/* Year Filters */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "11px", fontWeight: 800, color: "#8C786B", marginRight: "6px" }}>
                TARGET YEAR:
              </span>
              <button
                type="button"
                onClick={() => setYearFilter("all")}
                style={{
                  padding: "7px 16px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer",
                  background: yearFilter === "all" ? "var(--orange)" : "#F5ECE5",
                  color: yearFilter === "all" ? "#FFF" : "#4A362B",
                }}
              >
                All Batches
              </button>
              <button
                type="button"
                onClick={() => setYearFilter("2026")}
                style={{
                  padding: "7px 16px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer",
                  background: yearFilter === "2026" ? "var(--orange)" : "#F5ECE5",
                  color: yearFilter === "2026" ? "#FFF" : "#4A362B",
                }}
              >
                NEET 2026
              </button>
              <button
                type="button"
                onClick={() => setYearFilter("2027")}
                style={{
                  padding: "7px 16px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer",
                  background: yearFilter === "2027" ? "var(--orange)" : "#F5ECE5",
                  color: yearFilter === "2027" ? "#FFF" : "#4A362B",
                }}
              >
                NEET 2027
              </button>
            </div>

            {/* Class Filters */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "11px", fontWeight: 800, color: "#8C786B", marginRight: "6px" }}>
                FOR CLASS:
              </span>
              <button
                type="button"
                onClick={() => setClassFilter("all")}
                style={{
                  padding: "7px 14px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer",
                  background: classFilter === "all" ? "#1A1009" : "#F5ECE5",
                  color: classFilter === "all" ? "#FFF" : "#4A362B",
                }}
              >
                All Courses
              </button>
              <button
                type="button"
                onClick={() => setClassFilter("11th")}
                style={{
                  padding: "7px 14px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer",
                  background: classFilter === "11th" ? "#1A1009" : "#F5ECE5",
                  color: classFilter === "11th" ? "#FFF" : "#4A362B",
                }}
              >
                Class 11th
              </button>
              <button
                type="button"
                onClick={() => setClassFilter("12th")}
                style={{
                  padding: "7px 14px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer",
                  background: classFilter === "12th" ? "#1A1009" : "#F5ECE5",
                  color: classFilter === "12th" ? "#FFF" : "#4A362B",
                }}
              >
                Class 12th
              </button>
              <button
                type="button"
                onClick={() => setClassFilter("dropper")}
                style={{
                  padding: "7px 14px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer",
                  background: classFilter === "dropper" ? "#1A1009" : "#F5ECE5",
                  color: classFilter === "dropper" ? "#FFF" : "#4A362B",
                }}
              >
                Dropper / Repeater
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ 4 BATCH CARDS GRID (2x2) ════════ */}
      <section className="batches-section has-texture" style={{ paddingTop: "20px", paddingBottom: "80px" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "32px",
          }}
        >
          {filteredBatches.map((b) => (
            <div
              key={b.id}
              style={{
                background: "#FFF",
                borderRadius: "18px",
                border: "1px solid var(--border-light)",
                boxShadow: "0 4px 16px rgba(28, 18, 12, 0.05)",
                padding: "32px 30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <div>
                {/* Top Badge Row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      style={{
                        background: "#FFF0E6",
                        border: "1px solid #FFD4BC",
                        color: "var(--orange)",
                        fontSize: "10px",
                        fontWeight: 900,
                        padding: "4px 10px",
                        borderRadius: "4px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {b.badge}
                    </span>
                    <span
                      style={{
                        background: "#FFF6E5",
                        color: "#B45309",
                        fontSize: "10px",
                        fontWeight: 900,
                        padding: "4px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {b.saveTag}
                    </span>
                  </div>
                  <span style={{ fontSize: "22px" }}>{b.icon}</span>
                </div>

                {/* Batch Title & Subtitle */}
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "26px", fontWeight: 900, color: "#140A03", marginBottom: "4px" }}>
                  {b.title}
                </h3>
                <div style={{ fontSize: "13px", color: "#6E5B50", fontWeight: 600, marginBottom: "20px" }}>
                  {b.subtitle}
                </div>

                {/* Price Block */}
                <div
                  style={{
                    background: "#FAF5EF",
                    borderRadius: "12px",
                    padding: "16px 20px",
                    marginBottom: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "1px solid #EFE4D9",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                      <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "32px", fontWeight: 900, color: "#140A03" }}>
                        {b.price}
                      </span>
                      <span style={{ fontSize: "14px", color: "#9E8B7F", textDecoration: "line-through" }}>
                        {b.oldPrice}
                      </span>
                    </div>
                    <div style={{ fontSize: "11px", color: "#6E5B50", marginTop: "2px" }}>{b.materialInfo}</div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        background: "#16A34A",
                        color: "#FFF",
                        fontSize: "11px",
                        fontWeight: 800,
                        padding: "4px 10px",
                        borderRadius: "6px",
                        display: "inline-block",
                      }}
                    >
                      {b.emiInfo}
                    </span>
                    <div style={{ fontSize: "10px", color: "#8C786B", marginTop: "3px" }}>{b.emiSub}</div>
                  </div>
                </div>

                {/* Course Highlights Header */}
                <div style={{ fontSize: "11px", fontWeight: 900, color: "#8C786B", letterSpacing: "1px", marginBottom: "12px" }}>
                  COURSE HIGHLIGHTS
                </div>

                {/* Checklist */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
                  {b.feats.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "#3B2B23", lineHeight: 1.45 }}>
                      <span
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          background: "#E8F5E9",
                          color: "#16A34A",
                          fontWeight: 900,
                          fontSize: "11px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      >
                        ✓
                      </span>
                      <div>
                        <strong style={{ color: "#140A03" }}>{f.bold}: </strong>
                        <span>{f.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Faculty & Schedule Footer */}
                <div
                  style={{
                    paddingTop: "16px",
                    borderTop: "1px solid #F3ECE5",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "12px",
                  }}
                >
                  <div>
                    <strong style={{ color: "#140A03", display: "block" }}>{b.facultyLabel}</strong>
                    <span style={{ fontSize: "11px", color: "#6E5B50" }}>{b.facultySub}</span>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <strong style={{ color: "var(--orange)", display: "block" }}>{b.startDate}</strong>
                    <span style={{ fontSize: "11px", color: "#6E5B50" }}>{b.timing}</span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 120px", gap: "12px" }}>
                  <button
                    type="button"
                    className="btn-batch-enroll btn-orange-leather"
                    onClick={() => setActiveModal({ type: "enroll", batchName: b.title })}
                  >
                    <span>{b.ctaPrice}</span>
                  </button>

                  <button
                    type="button"
                    style={{
                      background: "#FAF5EF",
                      border: "1px solid #E8DDD4",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#3B2B23",
                      cursor: "pointer",
                    }}
                    onClick={() => setActiveModal({ type: "demo", batchName: b.title })}
                  >
                    📞 Free Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* ════════ COMPARISON TABLE: WHY CHOOSE TARGET BATCHES ════════ */}
      <section className="method-section has-texture" style={{ padding: "80px 0" }}>
        <div className="section-header-row" style={{ textAlign: "center", display: "block", marginBottom: "48px" }}>
          <span className="section-label">THE STRATEGIC EDGE</span>
          <h2 className="section-title">Why Choose Our Target Batches?</h2>
          <p className="section-subtitle" style={{ margin: "8px auto 0", maxWidth: "640px" }}>
            Compare our data-driven medical prep ecosystem against legacy coaching mass-factories.
          </p>
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              background: "#FFF",
              borderRadius: "16px",
              border: "1px solid var(--border-light)",
              boxShadow: "var(--shadow-sm)",
              overflow: "hidden",
            }}
          >
            {/* Table Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1.5fr 1.5fr",
                background: "#FAF5EF",
                borderBottom: "1px solid var(--border-light)",
                padding: "16px 24px",
                fontWeight: 800,
                fontSize: "13px",
                color: "#140A03",
              }}
            >
              <div>Prep Factor &amp; Delivery Architecture</div>
              <div style={{ color: "var(--orange)", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>🔥</span> Indraprastha NEET Batches
              </div>
              <div style={{ color: "#6E5B50" }}>Traditional Offline / Mass EdTech</div>
            </div>

            {/* Table Rows */}
            {comparisonRows.map((row, idx) => (
              <div
                key={row.factor}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1.5fr 1.5fr",
                  padding: "20px 24px",
                  borderBottom: idx === comparisonRows.length - 1 ? "none" : "1px solid #F3ECE5",
                  fontSize: "13px",
                  alignItems: "center",
                  background: idx % 2 === 0 ? "#FFF" : "#FCF9F5",
                }}
              >
                <div style={{ fontWeight: 700, color: "#140A03" }}>{row.factor}</div>
                <div style={{ color: "#16A34A", fontWeight: 700, paddingRight: "16px" }}>
                  ✓ {row.indraprastha}
                </div>
                <div style={{ color: "#7A675B", lineHeight: 1.4 }}>{row.traditional}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ INTERACTIVE ENROLLMENT MODAL ════════ */}
      {activeModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setActiveModal(null)}
        >
          <div
            style={{
              background: "#FFF",
              borderRadius: "16px",
              padding: "36px",
              maxWidth: "480px",
              width: "100%",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              border: "1px solid var(--border-light)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "20px", fontWeight: 800, color: "#140A03" }}>
                {activeModal.type === "enroll" ? `Enroll in ${activeModal.batchName}` : `Request Free Demo for ${activeModal.batchName}`}
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#8C786B" }}
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Thank you! Your request for ${activeModal.batchName} has been received. Our senior counselor will call you within 15 minutes.`);
                setActiveModal(null);
              }}
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#4A362B", display: "block", marginBottom: "4px" }}>
                  Student Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #DCC8BA",
                    fontSize: "13px",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#4A362B", display: "block", marginBottom: "4px" }}>
                  Mobile Number (WhatsApp)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #DCC8BA",
                    fontSize: "13px",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#4A362B", display: "block", marginBottom: "4px" }}>
                  Current Target Year
                </label>
                <select
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #DCC8BA",
                    fontSize: "13px",
                    background: "#FFF",
                  }}
                >
                  <option value="2026">NEET 2026 Aspirant</option>
                  <option value="2027">NEET 2027 Aspirant</option>
                  <option value="dropper">Dropper / Repeater Batch</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn-orange-leather"
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "14px",
                  fontWeight: 800,
                  color: "#FFF",
                  border: "none",
                  borderRadius: "8px",
                  marginTop: "8px",
                  cursor: "pointer",
                }}
              >
                <span>Submit &amp; Reserve Seat</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ════════ FOOTER ════════ */}
      <footer className="footer-section has-dark-texture" id="footer">
        <div className="footer-container">
          <div className="footer-top-grid">
            {/* Col 1 */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Image
                  src="/logo_app.jpeg"
                  alt="Indraprastha Logo"
                  width={34}
                  height={34}
                  style={{ borderRadius: "7px", objectFit: "cover" }}
                />
                <div>
                  <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "15px", fontWeight: "900", color: "#FFFFFF" }}>
                    IndraprasthaNEET
                  </span>
                  <span style={{ fontSize: "9px", color: "var(--orange)", fontWeight: "800", display: "block", letterSpacing: "1px" }}>
                    ACADEMY
                  </span>
                </div>
              </div>

              <p className="footer-bio-text">
                Pioneering India&apos;s top NEET aspirants with rigorous cognitive analytics, strategy-led NCERT exemplar modules and AIR Top 100 Producing Faculty.
              </p>

              <span className="footer-badge-pill">🏆 AIR Top 100 Producing Faculty</span>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="footer-col-title">Quick Access</h4>
              <ul className="footer-links-list">
                <li><Link href="/">Home Overview</Link></li>
                <li><Link href="/target-batches">Target Batches 2026/27</Link></li>
                <li><a href="/#quiz">AI Rank Predictor</a></li>
                <li><a href="/#methodology">Indraprastha Method</a></li>
                <li><a href="/#app">Mobile App Showcase</a></li>
                <li><a href="#footer">Help Desk &amp; FAQs</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="footer-col-title">Helpline &amp; Campus</h4>
              <div className="footer-contact-item">
                <span>📞</span>
                <div>
                  <strong style={{ color: "#FFFFFF" }}>+91 77020 22682</strong>
                  <div style={{ fontSize: "11px" }}>WhatsApp &amp; Phone Support</div>
                </div>
              </div>

              <div className="footer-contact-item">
                <span>✉️</span>
                <div>
                  <div style={{ color: "#FFFFFF" }}>support@indraprastha-neetacademy.com</div>
                </div>
              </div>

              <div className="footer-contact-item">
                <span>⏰</span>
                <div>Mon - Sat: 08:00 AM - 08:00 PM IST</div>
              </div>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="footer-col-title">Digital Study App</h4>
              <div className="app-store-btns">
                <a href="#" className="btn-app-store-badge">
                  <span>▶</span>
                  <div>
                    <span className="store-badge-sub">GET IT ON</span>
                    <span className="store-badge-title">Google Play</span>
                  </div>
                </a>

                <a href="#" className="btn-app-store-badge">
                  <span>🍎</span>
                  <div>
                    <span className="store-badge-sub">DOWNLOAD ON THE</span>
                    <span className="store-badge-title">App Store</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div>© 2026 Indraprastha NEET Academy. All academic rights reserved.</div>
            <div className="footer-legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Admission</a>
              <a href="#">Honor Code</a>
              <a href="#">Grievance Redressal</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

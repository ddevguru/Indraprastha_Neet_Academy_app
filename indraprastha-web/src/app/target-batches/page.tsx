"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── DATA ─── */
const navItems = [
  { label: "Home", href: "/" },
  { label: "Target Batches", href: "/target-batches", active: true },
  { label: "AI Rank Predictor", href: "/ai-rank-predictor" },
  { label: "Methodology", href: "/methodology" },
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
      <div className="top-announcement-bar">
        <div className="announcement-inner">
          <div className="announcement-left">
            <span className="announcement-badge">
              🔥 PROGRAM ANNOUNCEMENT
            </span>
            <span className="announcement-main-text">
              <strong>Batches strictly mapped to recent NMC syllabus rationalization guidelines</strong>
            </span>
          </div>

          <div className="announcement-right">
            <span className="announcement-tag-green">✓ 100% NCERT Line-by-Line Pedagogy</span>
            <span className="announcement-tag-orange">🎓 Scholarship Window Closes in 48h</span>
          </div>
        </div>
      </div>

      {/* ════════ MAIN NAVBAR ════════ */}
      <Navbar activePage="target-batches" />

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
          <div className="tb-hero-grid">
            <div>
              <h1 className="hero-title" style={{ fontSize: "clamp(28px, 4.5vw, 48px)", marginBottom: "14px" }}>
                NEET 2026 &amp; 2027{" "}
                <span style={{ color: "var(--orange)", fontStyle: "italic" }}>Target Batches</span>
              </h1>
              <p className="hero-subtitle" style={{ fontSize: "15px", maxWidth: "680px", margin: 0 }}>
                Curated programs built strictly on revised NMC &amp; NTA syllabus frameworks. Master complete NCERT line-by-line rigor under elite medical mentors and top AIIMS alumni faculties.
              </p>
            </div>

            {/* Right Trust Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div className="tb-trust-pill">
                <span style={{ fontSize: "16px" }}>🎓</span>
                <span>1:25 Mentor Ratio Guaranteed</span>
              </div>

              <div className="tb-trust-pill">
                <span style={{ fontSize: "16px" }}>⚡</span>
                <span>Daily Live Error-Desk Diagnosis</span>
              </div>
            </div>
          </div>

          {/* ── FILTER CONTROLS BAR ── */}
          <div className="tb-filter-bar">
            {/* Year Filters */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "11px", fontWeight: 800, color: "#8C786B", marginRight: "6px" }}>
                TARGET YEAR:
              </span>
              <button
                type="button"
                onClick={() => setYearFilter("all")}
                className={`tb-filter-btn ${yearFilter === "all" ? "active-orange" : ""}`}
              >
                All Batches
              </button>
              <button
                type="button"
                onClick={() => setYearFilter("2026")}
                className={`tb-filter-btn ${yearFilter === "2026" ? "active-orange" : ""}`}
              >
                NEET 2026
              </button>
              <button
                type="button"
                onClick={() => setYearFilter("2027")}
                className={`tb-filter-btn ${yearFilter === "2027" ? "active-orange" : ""}`}
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
                className={`tb-filter-btn ${classFilter === "all" ? "active-dark" : ""}`}
              >
                All Courses
              </button>
              <button
                type="button"
                onClick={() => setClassFilter("11th")}
                className={`tb-filter-btn ${classFilter === "11th" ? "active-dark" : ""}`}
              >
                Class 11th
              </button>
              <button
                type="button"
                onClick={() => setClassFilter("12th")}
                className={`tb-filter-btn ${classFilter === "12th" ? "active-dark" : ""}`}
              >
                Class 12th
              </button>
              <button
                type="button"
                onClick={() => setClassFilter("dropper")}
                className={`tb-filter-btn ${classFilter === "dropper" ? "active-dark" : ""}`}
              >
                Dropper / Repeater
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ 4 BATCH CARDS GRID (2x2) ════════ */}
      <section className="batches-section has-texture" style={{ paddingTop: "20px", paddingBottom: "80px" }}>
        {/* Featured Dr. Rahul Mentorship Banner in Target Batches */}
        <div style={{ maxWidth: "1280px", margin: "0 auto 32px", padding: "0 24px" }}>
          <div className="mentorship-banner-card" style={{ padding: "18px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ background: "rgba(229, 82, 0, 0.12)", color: "var(--orange)", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 800 }}>
                  👨‍⚕️ INCLUDED IN ALL BATCHES
                </span>
                <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)" }}>
                  Personalised Mentorship by Dr Rahul Kumar
                </span>
              </div>
              <a href="tel:+917203055682" style={{ fontSize: "12px", fontWeight: 800, color: "var(--orange)", textDecoration: "none" }}>
                📞 Book Free Counseling Call: +91 72030 55682 ↗
              </a>
            </div>
            <div className="mentorship-banner-image-wrapper">
              <Image
                src="/dr_rahul_mentorship.png"
                alt="Personalised Mentorship by Dr Rahul Kumar"
                width={1200}
                height={450}
                className="mentorship-banner-img"
              />
            </div>
          </div>
        </div>

        <div className="tb-batches-grid-container">
          {filteredBatches.map((b) => (
            <div key={b.id} className="tb-batch-card">
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
                <h3 className="tb-batch-title">
                  {b.title}
                </h3>
                <div className="tb-batch-sub">
                  {b.subtitle}
                </div>

                {/* Price Block */}
                <div className="tb-price-box">
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                      <span className="tb-price-main">
                        {b.price}
                      </span>
                      <span className="tb-price-old">
                        {b.oldPrice}
                      </span>
                    </div>
                    <div className="tb-material-info">{b.materialInfo}</div>
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
                    <div key={i} className="tb-feat-text" style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
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
                        <strong>{f.bold}: </strong>
                        <span>{f.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Faculty & Schedule Footer */}
                <div className="tb-faculty-footer">
                  <div>
                    <strong style={{ display: "block" }}>{b.facultyLabel}</strong>
                    <span>{b.facultySub}</span>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <strong style={{ color: "var(--orange)", display: "block" }}>{b.startDate}</strong>
                    <span>{b.timing}</span>
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
                    className="tb-btn-demo"
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
          <div className="tb-comparison-card">
            {/* Table Header */}
            <div className="tb-comp-head">
              <div>Prep Factor &amp; Delivery Architecture</div>
              <div style={{ color: "var(--orange)", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>🔥</span> Indraprastha NEET Batches
              </div>
              <div style={{ color: "#6E5B50" }}>Traditional Offline / Mass EdTech</div>
            </div>

            {/* Table Rows */}
            {comparisonRows.map((row) => (
              <div
                key={row.factor}
                className="tb-comp-row"
              >
                <div>{row.factor}</div>
                <div style={{ color: "#16A34A", fontWeight: 700, paddingRight: "16px" }}>
                  ✓ {row.indraprastha}
                </div>
                <div style={{ lineHeight: 1.4 }}>{row.traditional}</div>
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
            className="tb-modal-box"
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
      <Footer />
    </>
  );
}

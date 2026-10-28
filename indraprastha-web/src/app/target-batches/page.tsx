"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
    id: "target-neet-2027",
    badge: "TARGET BATCH 2027",
    saveTag: "50% OFF",
    icon: "🎯",
    title: "Target NEET 2027",
    subtitle: "Class 11th + 12th Complete Syllabus & Comprehensive Practice for NEET 2027",
    price: "₹2,999",
    oldPrice: "₹5,999",
    materialInfo: "Comprehensive NEET 2027 Subscription",
    emiInfo: "⚡ Special Offer",
    emiSub: "Instant Complete Access",
    targetYear: "2027",
    classFilter: "2027",
    feats: [
      {
        bold: "Chapterwise PYQs",
        text: "15+ years of verified past questions with detailed solutions",
      },
      {
        bold: "Chapterwise Test Series",
        text: "45 questions in 45 minutes strictly timed CBT tests",
      },
      {
        bold: "Practice Session of Every Chapter",
        text: "One session includes more than 100 questions in every chapter",
      },
      {
        bold: "Grand Tests",
        text: "Full syllabus grand mock tests on authentic NEET CBT pattern",
      },
      {
        bold: "Subject-Wise Tests",
        text: "Dedicated speed drills for Physics, Chemistry & Biology",
      },
      {
        bold: "Custom Question Module",
        text: "Targeted practice for wrong & bookmarked questions",
      },
      {
        bold: "Experience CBT Mode",
        text: "Available on our website anytime on all the questions",
      },
      {
        bold: "Practice Anywhere, Anytime",
        text: "Full seamless practice on our mobile application",
      },
      {
        bold: "Mentorship by Dr Rahul Kumar",
        text: "1-on-1 personalized guidance (only for paid subscribers)",
      },
      {
        bold: "24*7 Doubt Solving Faculty",
        text: "Dedicated faculty resolution in exclusive Telegram channel (only for paid subscribers)",
      },
    ],
    facultyLabel: "Elite Medical Faculty Team",
    facultySub: "AIIMS & Top Medical Instructors",
    startDate: "ADMISSIONS OPEN",
    timing: "Flexible Practice + Live Mentorship",
    ctaPrice: "Enroll for Target NEET 2027 • ₹2,999",
  },
  {
    id: "target-neet-2028",
    badge: "TARGET BATCH 2028",
    saveTag: "45% OFF",
    icon: "🚀",
    title: "Target NEET 2028",
    subtitle: "Complete Syllabus & Comprehensive Practice for NEET 2028 Aspirants",
    price: "₹5,500",
    oldPrice: "₹9,999",
    materialInfo: "Comprehensive NEET 2028 Subscription",
    emiInfo: "💳 EMI starts ₹999/mo",
    emiSub: "Flexible Monthly Options",
    targetYear: "2028",
    classFilter: "2028",
    feats: [
      {
        bold: "Chapterwise PYQs",
        text: "15+ years of verified past questions with detailed solutions",
      },
      {
        bold: "Chapterwise Test Series",
        text: "45 questions in 45 minutes strictly timed CBT tests",
      },
      {
        bold: "Practice Session of Every Chapter",
        text: "One session includes more than 100 questions in every chapter",
      },
      {
        bold: "Grand Tests",
        text: "Full syllabus grand mock tests on authentic NEET CBT pattern",
      },
      {
        bold: "Subject-Wise Tests",
        text: "Dedicated speed drills for Physics, Chemistry & Biology",
      },
      {
        bold: "Custom Question Module",
        text: "Targeted practice for wrong & bookmarked questions",
      },
      {
        bold: "Experience CBT Mode",
        text: "Available on our website anytime on all the questions",
      },
      {
        bold: "Practice Anywhere, Anytime",
        text: "Full seamless practice on our mobile application",
      },
      {
        bold: "Mentorship by Dr Rahul Kumar",
        text: "1-on-1 personalized guidance (only for paid subscribers)",
      },
      {
        bold: "24*7 Doubt Solving Faculty",
        text: "Dedicated faculty resolution in exclusive Telegram channel (only for paid subscribers)",
      },
    ],
    facultyLabel: "Elite Medical Faculty Team",
    facultySub: "AIIMS & Top Medical Instructors",
    startDate: "ADMISSIONS OPEN",
    timing: "Flexible Practice + Live Mentorship",
    ctaPrice: "Enroll for Target NEET 2028 • ₹5,500",
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
  const router = useRouter();
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [classFilter, setClassFilter] = useState<string>("all");
  const [activeModal, setActiveModal] = useState<{ type: string; batchName: string } | null>(null);

  const handleEnrollClick = (b: (typeof batchCards)[0]) => {
    const rawPrice = b.price.replace(/\D/g, "");
    const packageId = b.targetYear === "2028" ? 2 : 1;
    const batchYear = b.targetYear;

    if (typeof window === "undefined") return;

    const token = localStorage.getItem("indraprastha_token");
    const storedUser = localStorage.getItem("indraprastha_user");
    let user: any = null;
    if (storedUser) {
      try {
        user = JSON.parse(storedUser);
      } catch {
        // ignore
      }
    }

    if (!token) {
      // Not logged in -> send to login/signup with parameters to trigger Razorpay after auth
      router.push(
        `/login?redirect=/subscriptions&enrollBatch=${batchYear}&amount=${rawPrice}&packageId=${packageId}&autoRazorpay=true`
      );
      return;
    }

    const pl = String(
      user?.preferred_plan ||
      user?.preferredPlan ||
      user?.subscription_plan ||
      user?.subscriptionPlan ||
      user?.plan ||
      ""
    ).toLowerCase();
    const p = String(user?.phone || user?.phoneNumber || "").replace(/\D/g, "");
    const n = String(user?.full_name || user?.name || "").toLowerCase();

    const isStarterOrDeepak =
      pl.includes("starter") ||
      pl.includes("2027") ||
      p.endsWith("7028196172") ||
      n.includes("deepak");

    // Logged in: check if user already has an active subscription
    const hasActiveSubscription = Boolean(
      user?.has_active_subscription ||
      user?.subscription_status === "active" ||
      isStarterOrDeepak
    );

    if (hasActiveSubscription) {
      alert("Aapka Target NEET 2027 plan already active hai! Redirecting to your dashboard.");
      router.push("/dashboard");
      return;
    }

    // Logged in but not subscribed -> go directly to subscriptions page and trigger Razorpay
    router.push(
      `/subscriptions?enrollBatch=${batchYear}&amount=${rawPrice}&packageId=${packageId}&autoRazorpay=true`
    );
  };

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
              ADMISSIONS OPEN 2027 / 2028
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
                NEET 2027 &amp; 2028{" "}
                <span style={{ color: "var(--orange)", fontStyle: "italic" }}>Target Batches</span>
              </h1>
              <p className="hero-subtitle" style={{ fontSize: "15px", maxWidth: "680px", margin: 0 }}>
                Curated programs built strictly on revised NMC syllabus frameworks. Master complete NCERT line-by-line rigor under elite medical mentors and top AIIMS alumni faculties.
              </p>
            </div>

            {/* Right Trust Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div className="tb-trust-pill">
                <span style={{ fontSize: "16px" }}>🎓</span>
                <span>1:1 Mentor Ratio Guaranteed</span>
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
                onClick={() => setYearFilter("2027")}
                className={`tb-filter-btn ${yearFilter === "2027" ? "active-orange" : ""}`}
              >
                NEET 2027
              </button>
              <button
                type="button"
                onClick={() => setYearFilter("2028")}
                className={`tb-filter-btn ${yearFilter === "2028" ? "active-orange" : ""}`}
              >
                NEET 2028
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
                onClick={() => setClassFilter("2027")}
                className={`tb-filter-btn ${classFilter === "2027" ? "active-dark" : ""}`}
              >
                Target 2027
              </button>
              <button
                type="button"
                onClick={() => setClassFilter("2028")}
                className={`tb-filter-btn ${classFilter === "2028" ? "active-dark" : ""}`}
              >
                Target 2028
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ TARGET BATCH CARDS GRID (Target NEET 2027 & 2028) ════════ */}
      <section className="batches-section has-texture" style={{ paddingTop: "20px", paddingBottom: "80px" }}>
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
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <button
                    type="button"
                    className="btn-batch-enroll btn-orange-leather"
                    onClick={() => handleEnrollClick(b)}
                  >
                    <span>{b.ctaPrice}</span>
                  </button>

                  <button
                    type="button"
                    className="tb-btn-brochure"
                    onClick={() => setActiveModal({ type: "brochure", batchName: b.title })}
                  >
                    <span>📄 Request Mobile Brochure (PDF)</span>
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
                {activeModal.type === "enroll"
                  ? `Enroll in ${activeModal.batchName}`
                  : activeModal.type === "brochure"
                  ? `Request Mobile Brochure (PDF) – ${activeModal.batchName}`
                  : `Request Free Demo for ${activeModal.batchName}`}
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
                alert(
                  activeModal.type === "brochure"
                    ? `Thank you! The mobile brochure (PDF) for ${activeModal.batchName} will be sent to your WhatsApp number shortly.`
                    : `Thank you! Your request for ${activeModal.batchName} has been received. Our senior counselor will call you within 15 minutes.`
                );
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
                  <option value="2027">Target NEET 2027</option>
                  <option value="2028">Target NEET 2028</option>
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
                <span>
                  {activeModal.type === "brochure"
                    ? "📥 Send Mobile Brochure (PDF) on WhatsApp"
                    : "Submit & Reserve Seat"}
                </span>
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

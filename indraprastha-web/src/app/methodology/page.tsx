"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./methodology.css";

export default function MethodologyPage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [selectedRuBisCOOpt, setSelectedRuBisCOOpt] = useState<number>(1); // B by default

  useEffect(() => {
    const savedTheme = localStorage.getItem("indraprastha_theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.body.classList.add("dark-theme");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  return (
    <div className={`methodology-page ${theme === "dark" ? "dark-theme" : ""}`}>
      {/* ════════ MAIN NAVBAR ════════ */}
      <Navbar
        activePage="methodology"
        currentTheme={theme}
        onThemeToggle={(next) => setTheme(next)}
      />

      {/* ════════ HERO SECTION ════════ */}
      <header className="meth-hero">
        <div className="meth-tagline-capsule">
          <span>🎯 HIGH-YIELD NEET PREPARATION PHILOSOPHY</span>
        </div>
        <h1 className="meth-hero-title">
          The Indraprastha <span className="meth-title-highlight">4-Pillar</span> Learning Framework
        </h1>
        <p className="meth-hero-sub">
          Built for the serious aspirant who refuses to leave admission to guesswork. From your NCERT preparation to rigorous live drills, daily active recall, and zero-leakage test analysis.
        </p>

        {/* 4 Stat Badges Row */}
        <div className="meth-stats-grid">
          <div className="meth-stat-card">
            <div className="meth-stat-val">99.4%</div>
            <div className="meth-stat-label">NCERT Strike Rate</div>
          </div>
          <div className="meth-stat-card">
            <div className="meth-stat-val">15+ Yrs</div>
            <div className="meth-stat-label">NTA PYQ Repository Indexed</div>
          </div>
          <div className="meth-stat-card">
            <div className="meth-stat-val">&lt;7 Mins</div>
            <div className="meth-stat-label">Expert Doubt Resolution</div>
          </div>
          <div className="meth-stat-card">
            <div className="meth-stat-val">685+</div>
            <div className="meth-stat-label">Avg AIR Batch Benchmark</div>
          </div>
        </div>
      </header>

      {/* ════════ FOUR PILLARS SECTION ════════ */}
      <section className="meth-pillars-section">
        <div className="meth-section-header">
          <div className="meth-tagline-capsule">CORE METHODOLOGY ENGINE</div>
          <h2 className="meth-section-title">Four Pillars to Guaranteed Competence</h2>
          <p className="meth-section-subtitle">
            Every pillar addresses a critical bottleneck in NEET preparation — transforming passive reading into high-velocity retention and analytical mastery.
          </p>
        </div>

        {/* ── PILLAR 01: NCERT LINE-BY-LINE INDEXING ── */}
        <div className="meth-pillar-row">
          <div>
            <div className="pillar-badge-group">
              <span className="pillar-num-badge">01</span>
              <span className="pillar-category-tag">Foundational Mastery</span>
            </div>
            <h3 className="pillar-title">NCERT Line-by-Line Indexing</h3>
            <p className="pillar-desc">
              Every single sentence in NCERT Biology is an exam question: diagrams, labels, footnote data, and summary paragraphs. We index NCERT word-for-word so zero blind spots remain.
            </p>

            <ul className="pillar-bullets">
              <li className="pillar-bullet-item">
                <span className="bullet-check-icon">✔</span>
                <span>Micro-passage testing filtering (Plant Phys, Genetics, Biotech) with instant recall metrics.</span>
              </li>
              <li className="pillar-bullet-item">
                <span className="bullet-check-icon">✔</span>
                <span>Diagram-heavy drills: identifying structural modifications and anatomical labels.</span>
              </li>
              <li className="pillar-bullet-item">
                <span className="bullet-check-icon">✔</span>
                <span>Line-to-MCQ conversion tracker with real-time accuracy scoring.</span>
              </li>
            </ul>

            <div className="pillar-footer-banner">
              <span style={{ fontSize: "20px" }}>📚</span>
              <div>
                <div className="pillar-footer-title">Indexed NCERT Question Bank</div>
                <div className="pillar-footer-sub">10,000+ Questions Tagged • 100% NCERT Fidelity</div>
              </div>
            </div>
          </div>

          {/* Interactive Mockup 1: NCERT Quiz & Lineage */}
          <div className="mockup-card">
            <div className="mockup-header-row">
              <span className="mockup-badge-orange">Interactive NCERT Index</span>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--meth-text-muted)" }}>
                NCERT Page 218 • Top 1%
              </span>
            </div>

            <div style={{ fontSize: "10.5px", fontWeight: "800", color: "var(--meth-accent)", marginBottom: "6px" }}>
              NEET TARGET: PLANT PHYSIOLOGY
            </div>

            <div className="mockup-question-box">
              Which of the following statement regarding RuBisCO enzyme in C4 plants is strictly aligned with NCERT Biology?
            </div>

            <div className="mockup-options-list">
              {[
                "A. It is found in bundle sheath cells only",
                "B. It is present in mesophyll chloroplasts during photorespiration",
                "C. It exhibits oxygenase activity under normal temperature",
              ].map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedRuBisCOOpt(idx)}
                  className={`mockup-opt-item ${selectedRuBisCOOpt === idx ? "selected" : ""}`}
                >
                  <span>{opt}</span>
                  {selectedRuBisCOOpt === idx && <span>✔</span>}
                </div>
              ))}
            </div>

            <div className="mockup-citation-box">
              <div className="citation-header">VERIFIED NCERT LINEAGE CITATION:</div>
              &ldquo;In C4 plants bundle sheath cells contain large RuBisCO enzymes lacking photorespiration enzymes (RuBP Carboxylase/Oxygenase).&rdquo; — NCERT Class 11, Chapter 13, Page 218, Para 4.
            </div>
          </div>
        </div>

        {/* ── PILLAR 02: 15+ YEARS CHAPTER-WISE PYQ MASTERY ── */}
        <div className="meth-pillar-row">
          {/* Mockup Left */}
          <div className="mockup-card">
            <div className="mockup-header-row">
              <span style={{ fontSize: "12px", fontWeight: "800", color: "var(--meth-text-main)" }}>
                Physics: Thermal Properties (2010–2024)
              </span>
              <span className="mockup-badge-cyan">DIFFICULTY FREQUENCY HEATMAP</span>
            </div>

            <div className="heatmap-topic-row">
              <div>
                <div className="heatmap-name">Principles of Calorimetry & Radiation</div>
                <div className="heatmap-sub">Physics • Class 11</div>
              </div>
              <div className="heatmap-bars-badge">
                <span>🔥 5.0 Hit/Yr</span>
              </div>
            </div>

            <div className="heatmap-topic-row">
              <div>
                <div className="heatmap-name">Current Electricity & Drift Velocity</div>
                <div className="heatmap-sub">Physics • Class 12</div>
              </div>
              <div className="heatmap-bars-badge" style={{ background: "var(--meth-cyan-soft)", color: "var(--meth-cyan)" }}>
                <span>⚡ 3.8 Hit/Yr</span>
              </div>
            </div>

            <div className="heatmap-topic-row">
              <div>
                <div className="heatmap-name">Coordination Compounds & Hybridization</div>
                <div className="heatmap-sub">Chemistry • Class 12</div>
              </div>
              <div className="heatmap-bars-badge" style={{ background: "var(--meth-cyan-soft)", color: "var(--meth-cyan)" }}>
                <span>🧪 4.2 Hit/Yr</span>
              </div>
            </div>

            <div className="trap-spotted-box">
              <div style={{ fontSize: "11px", fontWeight: "800", color: "var(--meth-accent)", marginBottom: "3px" }}>
                💡 Teacher&apos;s PYQ Trap Spotted in 2024 Paper:
              </div>
              <p style={{ fontSize: "11px", lineHeight: "1.5", color: "var(--meth-text-muted)" }}>
                &ldquo;A question from this chapter was framed with &apos;Radiation at Distance d vs d/2&apos; similar to 2018 NEET. Our students were the first to identify this formulaic pattern.&rdquo;
              </p>
            </div>
          </div>

          {/* Content Right */}
          <div>
            <div className="pillar-badge-group">
              <span className="pillar-num-badge">02</span>
              <span className="pillar-category-tag">Exam Pattern Blueprint</span>
            </div>
            <h3 className="pillar-title">15+ Years Chapter-Wise PYQ Mastery</h3>
            <p className="pillar-desc">
              Solving random past papers without structure wastes hundreds of hours. We dissect 15+ years into precise micro-topics, uncovering NTA question-framing patterns and recurring numerical shortcuts.
            </p>

            <ul className="pillar-bullets">
              <li className="pillar-bullet-item">
                <span className="bullet-check-icon">✔</span>
                <span>NTA Frequency Heatmap: identify recurring high-yield questions with high exam probability.</span>
              </li>
              <li className="pillar-bullet-item">
                <span className="bullet-check-icon">✔</span>
                <span>&ldquo;Trap Analysis&rdquo; highlighting recurring pitfalls, misread options, and distractors in AIPMT/NEET.</span>
              </li>
              <li className="pillar-bullet-item">
                <span className="bullet-check-icon">✔</span>
                <span>Video walkthroughs by AIIMS faculty detailing absolute shortcut techniques for lengthy calculations.</span>
              </li>
            </ul>

            <Link href="/target-batches" style={{ color: "var(--meth-accent)", fontWeight: "700", fontSize: "12.5px", textDecoration: "none" }}>
              Request Chapter-Wise PYQ Taxonomy PDF 📥
            </Link>
          </div>
        </div>

        {/* ── PILLAR 03: AI WEAK SPOT & SPEED TRACKER ── */}
        <div className="meth-pillar-row">
          <div>
            <div className="pillar-badge-group">
              <span className="pillar-num-badge">03</span>
              <span className="pillar-category-tag">Cognitive Diagnostic</span>
            </div>
            <h3 className="pillar-title">AI Weak Spot & Speed Tracker</h3>
            <p className="pillar-desc">
              NEET is a race against time. Our proprietary neural tracker monitors your answer speed, agitation index, and accuracy on every MCQ, identifying negative-marking patterns before they cost marks on exam day.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
              <div style={{ padding: "12px", background: "var(--meth-card-subtle)", borderRadius: "10px", border: "1px solid var(--meth-card-border)" }}>
                <div style={{ fontSize: "11px", fontWeight: "800", color: "var(--meth-accent)" }}>Hesitation Flag</div>
                <div style={{ fontSize: "11px", color: "var(--meth-text-muted)", marginTop: "2px" }}>
                  MCQs where &gt;80s spent triggers review drill
                </div>
              </div>
              <div style={{ padding: "12px", background: "var(--meth-card-subtle)", borderRadius: "10px", border: "1px solid var(--meth-card-border)" }}>
                <div style={{ fontSize: "11px", fontWeight: "800", color: "var(--meth-success)" }}>Precision Rate</div>
                <div style={{ fontSize: "11px", color: "var(--meth-text-muted)", marginTop: "2px" }}>
                  Targeted 94%+ accuracy in high-yield sections
                </div>
              </div>
            </div>

            <Link href="/ai-rank-predictor" className="btn-enroll-nav btn-orange-leather" style={{ padding: "10px 20px" }}>
              <span>🔥 Run Speed & Weak-Spot Scan</span>
            </Link>
          </div>

          {/* Mockup Right: Velocity Tracker */}
          <div className="mockup-card">
            <div className="mockup-header-row">
              <span style={{ fontSize: "12px", fontWeight: "800", color: "var(--meth-text-main)" }}>
                Student Velocity Tracker (Roll: #NEET-8874)
              </span>
              <span className="mockup-badge-orange">SPEED INDEX: 42 SEC/MCQ (NTA ELITE)</span>
            </div>

            <div className="velocity-stat-row">
              <span>Average Response Velocity</span>
              <span style={{ color: "var(--meth-success)" }}>42 sec/question (Optimal: 45 sec)</span>
            </div>

            <div className="velocity-bar-track">
              <div className="velocity-bar-fill"></div>
            </div>

            <div className="trap-spotted-box" style={{ borderLeft: "3px solid #D97706" }}>
              <div style={{ fontSize: "11px", fontWeight: "800", color: "#D97706", marginBottom: "2px" }}>
                ⚠️ NEGATIVE-MARK RISK DETECTED: ORGANIC MECHANISMS
              </div>
              <div style={{ fontSize: "11px", color: "var(--meth-text-muted)" }}>
                &ldquo;You spend an average of 95s on Carbocation rearrangement questions. Recommended: Review Rule 4 in Chemistry Module.&rdquo;
              </div>
            </div>

            <div className="accuracy-trio-grid">
              <div className="accuracy-pill-box">
                <div className="accuracy-pill-val">82.4%</div>
                <div className="accuracy-pill-label">Negative Accuracy</div>
              </div>
              <div className="accuracy-pill-box">
                <div className="accuracy-pill-val">94.0%</div>
                <div className="accuracy-pill-label">Cumulative Accuracy</div>
              </div>
              <div className="accuracy-pill-box">
                <div className="accuracy-pill-val">97.2%</div>
                <div className="accuracy-pill-label">Biology Accuracy</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── PILLAR 04: 24/7 FACULTY DOUBT DESK ── */}
        <div className="meth-pillar-row">
          {/* Mockup Left: Live Chat & Audio */}
          <div className="mockup-card">
            <div className="mockup-header-row">
              <span style={{ fontSize: "12px", fontWeight: "800", color: "var(--meth-text-main)" }}>
                LIVE DOUBT DESK SESSION #24098-11-NEET
              </span>
              <span className="mockup-badge-cyan">AUDIO / CHAT</span>
            </div>

            <div className="doubt-chat-box">
              <div className="chat-bubble-student">
                <div className="chat-sender-name">Aarav Sharma (NEET 2026 Aspirant)</div>
                <p className="chat-msg-text">
                  &ldquo;Sir, why is osmotic pressure considered a colligative property if it depends on temperature (π = CRT) and colligative properties depend only on solute number?&rdquo;
                </p>
              </div>

              <div className="chat-bubble-faculty">
                <div className="chat-sender-name" style={{ color: "var(--meth-accent)" }}>
                  Dr. Ramanand Verma (Ex-AIIMS Faculty)
                </div>
                <p className="chat-msg-text">
                  &ldquo;Excellent question! Temperature affects kinetic energy, but colligative properties depend on the relative number of solute vs solvent particles at constant T...&rdquo;
                </p>
                <div className="voice-audio-pill">
                  <span>▶</span>
                  <span>Voice Explanation (04:12) • High Yield Solute Dissociation Sheet Attached</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Right */}
          <div>
            <div className="pillar-badge-group">
              <span className="pillar-num-badge">04</span>
              <span className="pillar-category-tag">Zero Doubt Backlog</span>
            </div>
            <h3 className="pillar-title">24/7 Faculty Doubt Desk</h3>
            <p className="pillar-desc">
              Unresolved doubts compound into exam panic. At Indraprastha, students never carry doubt back home. Experienced Doctor and AIIMS faculty resolve technical difficulties with audio-visual voice notes, step-by-step solutions, and instant peer support.
            </p>

            <ul className="pillar-bullets">
              <li className="pillar-bullet-item">
                <span className="bullet-check-icon">✔</span>
                <span>Direct WhatsApp & In-App Doubt Hotline with &lt;7 min SLA response.</span>
              </li>
              <li className="pillar-bullet-item">
                <span className="bullet-check-icon">✔</span>
                <span>Audio-voice note explanations detailing the underlying theoretical nuance.</span>
              </li>
              <li className="pillar-bullet-item">
                <span className="bullet-check-icon">✔</span>
                <span>Daily 1-on-1 Zoom doubt rooms with senior doctors and exam toppers.</span>
              </li>
            </ul>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <a
                href="https://wa.me/917203055682"
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "9px 16px",
                  borderRadius: "8px",
                  background: "var(--meth-success)",
                  color: "#FFFFFF",
                  fontSize: "12px",
                  fontWeight: "700",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>💬 WhatsApp Doubt Desk</span>
              </a>
              <a
                href="tel:+917203055682"
                className="pred-phone-pill"
                style={{ fontSize: "12px" }}
              >
                📞 +91 72030 55682
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ DAILY MICRO-HABIT LOOP (3 CARDS) ════════ */}
      <section className="meth-habits-section">
        <div className="meth-section-header" style={{ textAlign: "center" }}>
          <div className="meth-tagline-capsule">THE CULTURE OF EXCELLENCE</div>
          <h2 className="meth-section-title">Daily Micro-Habit Loop: From Drills to AIR</h2>
          <p className="meth-section-subtitle" style={{ margin: "0 auto" }}>
            Caliber is common; rigorous daily discipline is rare. Our structured habit engine cultivates an intuitive test-day environment that guarantees peak performance on exam day.
          </p>
        </div>

        <div className="habits-grid">
          <div className="habit-card">
            <div className="habit-top-row">
              <div className="habit-num">01</div>
              <div className="habit-time-tag">Daily Rhythm • 06:00 AM</div>
            </div>
            <h4 className="habit-title">30-Min NCERT Micro-Drill</h4>
            <p className="habit-desc">
              Wake up to 25 timed NCERT line questions before breakfast. Solidify retention across active chapters with instant feedback.
            </p>
            <Link href="/target-batches" className="habit-footer-link">
              <span>🎯 Today&apos;s 25-Q Drill Active →</span>
            </Link>
          </div>

          <div className="habit-card">
            <div className="habit-top-row">
              <div className="habit-num">02</div>
              <div className="habit-time-tag">Post-Test Protocol • Daily</div>
            </div>
            <h4 className="habit-title">Mistake Book Digital Logging</h4>
            <p className="habit-desc">
              Every incorrect solution is categorized: &apos;Calculation Error&apos;, &apos;Conceptual Blindspot&apos;, or &apos;Careless Reading&apos;. Zero repeated mistakes.
            </p>
            <Link href="/target-batches" className="habit-footer-link">
              <span>📓 Digital Error Log Vault →</span>
            </Link>
          </div>

          <div className="habit-card">
            <div className="habit-top-row">
              <div className="habit-num">03</div>
              <div className="habit-time-tag">Every Sunday • 02:00 PM</div>
            </div>
            <h4 className="habit-title">Weekly Speed & Accuracy Audit</h4>
            <p className="habit-desc">
              3-hour full-syllabus CBT exam in exact NTA simulation interface. Identify rank trajectory and time-management leaks before the real test.
            </p>
            <Link href="/target-batches" className="habit-footer-link">
              <span>📊 Sunday All-India Mock Test →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ FACULTY & ADVISORY BOARD SECTION ════════ */}
      <section className="meth-faculty-section">
        <div className="meth-section-header">
          <div className="meth-tagline-capsule">WORLD-CLASS MENTORS</div>
          <h2 className="meth-section-title">Academic Faculty & Medical Advisory Board</h2>
          <p className="meth-section-subtitle">
            Learn directly from top practicing doctors, AIIMS alumni, and author faculty who have mentored hundreds of AIR Top 100 rankers.
          </p>
        </div>

        <div className="faculty-grid">
          {/* Faculty 1 */}
          <div className="faculty-card">
            <div className="faculty-avatar-box">
              <span className="faculty-avatar-icon">👨‍⚕️</span>
              <div className="faculty-badge-overlay">Top 1% Rated</div>
            </div>
            <h4 className="faculty-name">Dr. Ramanand Verma</h4>
            <div className="faculty-creds">MBBS (AIIMS New Delhi), Ex-AIIMS Senior Resident</div>
            <p className="faculty-bio">
              Head of Medical Pedagogy. Over 15+ years mentoring Top 50 AIR rankers. Specializes in Human Physiology, Genetics, and High-Yield NCERT Audio Decoding.
            </p>
            <div className="faculty-stat-tags">
              <span>🏆 AIR 1 Produced (2021)</span>
              <span>4,800+ Doctors Guided</span>
            </div>
          </div>

          {/* Faculty 2 */}
          <div className="faculty-card">
            <div className="faculty-avatar-box">
              <span className="faculty-avatar-icon">👨‍🏫</span>
              <div className="faculty-badge-overlay">Author & Mentor</div>
            </div>
            <h4 className="faculty-name">Prof. K. S. Tyagi</h4>
            <div className="faculty-creds">M.Sc (IIT Roorkee), Author of Modern Mechanics</div>
            <p className="faculty-bio">
              Renowned for simplifying mechanics, electrodynamics, and modern physics through visual analogies, real-world simulations, and formulaic shortcuts.
            </p>
            <div className="faculty-stat-tags">
              <span>📚 22+ Yrs Teaching</span>
              <span>99.8% Physics Record</span>
            </div>
          </div>

          {/* Faculty 3 */}
          <div className="faculty-card">
            <div className="faculty-avatar-box">
              <span className="faculty-avatar-icon">👩‍⚕️</span>
              <div className="faculty-badge-overlay">Gold Medalist</div>
            </div>
            <h4 className="faculty-name">Dr. Shweta Mukherjee</h4>
            <div className="faculty-creds">MD (Biochemistry), Gold Medalist (KGMU Lucknow)</div>
            <p className="faculty-bio">
              Architect of the NCERT Line-by-Line Question Bank. Creator of the famous &apos;Reaction Flow Map&apos; that transformed organic chemistry recall for 10k+ aspirants.
            </p>
            <div className="faculty-stat-tags">
              <span>🧬 Organic Specialist</span>
              <span>10k+ MCQs Authored</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ BOTTOM DIAGNOSTIC CALLOUT BANNER ════════ */}
      <section className="meth-bottom-callout" id="audit">
        <div className="meth-callout-card">
          <div className="callout-left">
            <div className="meth-tagline-capsule" style={{ marginBottom: "6px" }}>
              SPEED & ACCURACY DIAGNOSTIC
            </div>
            <h3 className="callout-title">Curious How Your Current Speed Maps to NEET-UG AIR?</h3>
            <p className="callout-desc">
              Take a 15-minute simulated test against our real-time neural algorithm. Our cognitive engine will reveal your exact speed-to-accuracy bottleneck and deliver a personalized roadmap.
            </p>
            <div className="callout-bullets-row">
              <span>✔ Free 15-min Speed Audit</span>
              <span>✔ Instant AI Weak-Spot Report</span>
              <span>✔ 1-on-1 Doctor Mentorship Session</span>
            </div>
          </div>

          <div className="callout-right-actions">
            <Link href="/ai-rank-predictor" className="btn-schedule-audit">
              <span>⚡ Schedule Free AI Audit</span>
            </Link>
            <a href="tel:+917203055682" className="callout-phone-text">
              📞 Talk to Academic Dean: +91 72030 55682
            </a>
          </div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <Footer />
    </div>
  );
}

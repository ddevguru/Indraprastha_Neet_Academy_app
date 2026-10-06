"use client";
import Image from "next/image";
import { useState } from "react";

/* ─── DATA ─── */
const navItems = [
  { label: "Home", href: "#" },
  { label: "Target Batches", href: "/target-batches" },
  { label: "Achievers Wall", href: "#achievers" },
  { label: "Methodology", href: "#methodology" },
  { label: "Mobile App", href: "#app" },
  { label: "Help & Support", href: "#footer" },
];

const quizOptions = [
  { label: "AUG (Codon)", correct: true, rank: "#1,340", score: "685/720 · TOP 0.1%" },
  { label: "UAA (Ochre)", correct: false, rank: "#12,450", score: "540/720 · TOP 4.2%" },
  { label: "UGA (Opal)", correct: false, rank: "#18,900", score: "490/720 · TOP 8.5%" },
  { label: "UAG (Amber)", correct: false, rank: "#24,100", score: "430/720 · TOP 12.1%" },
];

const statsBar = [
  { icon: "📚", val: "10,000+", label: "NCERT Line-by-Line MCQs" },
  { icon: "🏛️", val: "15+ Years", label: "Chapter-Wise PYQs & Audited Solutions" },
  { icon: "🎓", val: "99.8%", label: "NTA Exam Pattern Alignment" },
  { icon: "📞", val: "24/7 Helpline", label: "+91 77020 22682" },
];

const batches = [
  {
    badge: "BEST SELLER",
    badgeType: "orange",
    subBadge: "CLASS 11 + 12 COMPREHENSIVE",
    name: "NEET 2026 Rank Booster",
    desc: "Complete syllabus revision, master problem solving and 50+ full-length mock tests.",
    price: "₹14,999",
    oldPrice: "₹24,999",
    save: "SAVE 40%",
    featured: true,
    feats: [
      "350+ Live Interactive Masterclasses",
      "15,000+ NCERT Line-by-Line Question Vault",
      "Daily 1-on-1 Faculty Doubt Clearance Desks",
      "Printed Theory & Exemplar Hardcopy Dispatch",
    ],
    cta: "Enroll Now for NEET 2026",
    secondary: "Request Mobile Brochure (PDF)",
  },
  {
    badge: "2-YEAR FOUNDATION",
    badgeType: "green",
    subBadge: "CLASS 11 (EARLY STARTER)",
    name: "NEET 2027 Foundation",
    desc: "Comprehensive Class 11 & Class 12 preparation for foundational mastery.",
    price: "₹18,999",
    oldPrice: "₹29,999",
    save: "SAVE 36%",
    featured: false,
    feats: [
      "Gradual Concept Building: Fundamentals to Olympiad",
      "Physics & Chemistry Mathematical Bridge Modules",
      "School Board Exam + NEET Integrated Calendar",
      "Bi-weekly Parent-Teacher Counseling Calls",
    ],
    cta: "Enroll Now for NEET 2027",
    secondary: "Request Counseling Session",
  },
  {
    badge: "INTENSIVE REVISION",
    badgeType: "sub",
    subBadge: "DROPPER SPECIAL RAPID",
    name: "Dropper Special Rapid",
    desc: "High-speed NEET revision focusing on high-yield topics, speed drills, and score jump tactics.",
    price: "₹12,499",
    oldPrice: "₹19,999",
    save: "SAVE 37%",
    featured: false,
    feats: [
      "Zero To 700+ High-Yield Topic Prioritization",
      "15 Years Full Extreme Engineering Sessions",
      "Personal Weak-Topic AI Diagnosis Analytics",
      "Weekly Full-Syllabus Time-Simulation Tests",
    ],
    cta: "Join Dropper Batch",
    secondary: "Review Detailed Schedule",
  },
];

const methodologyCards = [
  {
    num: "01",
    title: "NCERT Line-by-Line Indexing",
    desc: "Every line, diagram, footnote, summary paragraph, and exemplar problem documented into micro-test modules so no corner of NEET is missed.",
  },
  {
    num: "02",
    title: "Chapter-Wise PYQ Mastery",
    desc: "15+ years of NEET, AIPMT, and AIIMS questions tagged by concept. Identify recurring trends and master high-yield topics first.",
  },
  {
    num: "03",
    title: "AI Weak-Spot Diagnosis",
    desc: "Our algorithm pinpoints your negative marks, reveals time wasted on tricky questions, and assigns targeted micro-quizzes to erase knowledge gaps.",
  },
  {
    num: "04",
    title: "24/7 Faculty Doubt Desk",
    desc: "Stuck on a Physics numerical or organic mechanism? Upload a photo and receive audio-visual step-by-step solutions from senior faculty.",
  },
];

const achievers = [
  {
    air: "AIR 74 | AIIMS NEW DELHI",
    score: "715/720",
    quote: `"Solving the Line-by-Line NCERT question bank in Physics eliminated my panic during the exam. The timed mock tests prepared me to solve Zoology and Botany in record time."`,
    name: "Aarav Sharma",
    batch: "NEET 2024 2-Year Classroom Batch",
    init: "AS",
  },
  {
    air: "AIR 112 | AIIMS DEOGHAR",
    score: "705/720",
    quote: `"I cleared NEET on my first attempt. The Chapter-Wise PYQ book completely re-engineered my Physics numerical accuracy. The 24/7 doubt resolution desk cleared 30+ doubts weekly."`,
    name: "Pooja Mishra",
    batch: "NEET 2024 1-Year Rapid Batch",
    init: "PM",
  },
  {
    air: "AIR 284 | VMMC NEW DELHI",
    score: "695/720",
    quote: `"The Dropper batch didn't waste time on trivia; it pinpointed what was missing. 10k NCERT questions in Biology meant I didn't make a single careless mistake."`,
    name: "Rohan Verma",
    batch: "NEET 2024 2-Year Dropper Batch",
    init: "RV",
  },
];

export default function Page() {
  const [selectedOption, setSelectedOption] = useState<number>(0);

  return (
    <>
      {/* ════════ NAVBAR ════════ */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          {/* Logo */}
          <a href="#" className="navbar-brand" aria-label="Indraprastha NEET Academy">
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
          </a>

          {/* Nav Items */}
          <ul className="navbar-nav">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="navbar-actions">
            <a href="tel:+919000000000" className="phone-badge">
              📞 +91 90000 00000
            </a>
            <a href="#courses" className="btn-enroll-nav btn-orange-leather" id="nav-enroll-btn">
              <span>Enroll Now</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ════════ HERO SECTION ════════ */}
      <section className="hero-section has-texture" id="home">
        <div className="hero-container">
          {/* Left Column Text */}
          <div>
            <div className="hero-pill-tag">
              <span>🔥 INDIA&apos;S MOST TRUSTED NEET 2026/2027 TARGET BATCHES</span>
              <span className="tag-sub">⚡ NTA Exam Engine Aligned</span>
            </div>

            <h1 className="hero-title">
              Crack NEET 2026/2027 with{" "}
              <span className="highlight-underline">NCERT Line-by-Line</span> Precision & Disciplined Practice
            </h1>

            <p className="hero-subtitle">
              Access 10,000+ NCERT-mapped MCQs, 15+ years chapter-wise PYQs, full syllabus NTA mock tests, and real-time AI performance analytics designed exclusively for future PRE-PG rankers.
            </p>

            <div className="hero-cta-group">
              <a href="/target-batches" className="btn-primary-hero btn-orange-leather">
                <span>Explore Target Batches →</span>
              </a>
              <a href="#app" className="btn-secondary-hero">
                📥 Download Student App
              </a>
            </div>

            <div className="hero-rating-row">
              <div className="avatar-stack">
                <div className="avatar-pill">AS</div>
                <div className="avatar-pill">PM</div>
                <div className="avatar-pill">RV</div>
                <div className="avatar-pill">SS</div>
              </div>
              <div className="rating-text">
                <span className="stars">★★★★★</span>
                <strong>4.9/5.0</strong> · 18.5k+ Active Aspirants in 2025/2026
              </div>
            </div>
          </div>

          {/* Right Column Interactive Quiz Card */}
          <div className="quiz-card">
            <div className="quiz-card-header">
              <span className="quiz-subject">Biology | Molecular Basis of Inheritance</span>
              <span className="quiz-tag">🔥 Trend Aligned</span>
            </div>

            <div className="quiz-question">
              Which codon functions as both the start codon and codes for Methionine?
            </div>

            <div className="quiz-options-list">
              {quizOptions.map((opt, idx) => (
                <button
                  key={opt.label}
                  type="button"
                  className={`quiz-option-btn ${selectedOption === idx ? "selected" : ""}`}
                  onClick={() => setSelectedOption(idx)}
                >
                  <span className="radio-circle" />
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>

            <div className="rank-predict-box">
              <div>
                <div className="rank-title">Predicted AIR Range</div>
                <div className="rank-number">AIR {quizOptions[selectedOption].rank}</div>
                <div style={{ fontSize: "11px", color: "#8C5638", marginTop: "2px" }}>
                  {quizOptions[selectedOption].score}
                </div>
              </div>
              <button
                type="button"
                className="btn-predict"
                onClick={() => alert(`Your target score prediction is updated!`)}
              >
                Predict Yours ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ TRUST / STATS BAR ════════ */}
      <section className="stats-bar-section">
        <div className="stats-bar-container">
          <div className="stats-grid">
            {statsBar.map((st) => (
              <div className="stat-item" key={st.label}>
                <div className="stat-icon-box">{st.icon}</div>
                <div>
                  <div className="stat-val">{st.val}</div>
                  <div className="stat-lbl">{st.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ TARGET BATCHES SECTION ════════ */}
      <section className="batches-section has-texture" id="courses">
        <div className="section-header-row">
          <div>
            <span className="section-label">INDRAPRASTHA MEDICAL COURSES</span>
            <h2 className="section-title">Featured Target Batches for NEET 2026/27</h2>
            <p className="section-subtitle">
              Built strictly adhering to the revised NMC syllabus with timed module simulations and verified doctor-faculty mentorship.
            </p>
          </div>
          <span className="engine-tag">⚡ All batches include NTA Test Engine</span>
        </div>

        <div className="batches-grid">
          {batches.map((b) => (
            <div className={`batch-card ${b.featured ? "featured" : ""}`} key={b.name}>
              <div>
                <div className="batch-badges-row">
                  <span className={`badge-${b.badgeType}`}>{b.badge}</span>
                  <span className="badge-sub">{b.subBadge}</span>
                </div>
                <h3 className="batch-title">{b.name}</h3>
                <p className="batch-desc">{b.desc}</p>

                <div className="price-row">
                  <span className="price-main">{b.price}</span>
                  <span className="price-old">{b.oldPrice}</span>
                  <span className="price-save">{b.save}</span>
                </div>

                <ul className="batch-features-list">
                  {b.feats.map((f) => (
                    <li key={f}>
                      <span className="check-icon">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <a href="#enroll" className="btn-batch-enroll btn-orange-leather">
                  <span>{b.cta}</span>
                </a>
                <a href="#brochure" className="btn-batch-secondary">
                  {b.secondary}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════ METHODOLOGY SECTION ════════ */}
      <section className="method-section has-texture" id="methodology">
        <div className="section-header-row" style={{ marginBottom: "36px" }}>
          <div>
            <span className="section-label">THE INDRAPRASTHA METHOD</span>
            <h2 className="section-title">How We Transform Medical Aspirants Into Rankers</h2>
            <p className="section-subtitle">
              A 4-pillar pedagogical blueprint engineered to eliminate guesswork, solidify memory retention, and maximize exam-day accuracy.
            </p>
          </div>
        </div>

        <div className="method-grid">
          {methodologyCards.map((m) => (
            <div className="method-card" key={m.num}>
              <div className="method-num-pill">{m.num}</div>
              <h3 className="method-title">{m.title}</h3>
              <p className="method-desc">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════ MOBILE APP SECTION ════════ */}
      <section className="app-section has-texture" id="app">
        <div className="app-dark-card has-dark-texture">
          {/* Left info */}
          <div>
            <div className="app-pill-tag">
              <span>⚡ Class Tested Daily Progress on App Available</span>
            </div>

            <h2 className="app-title">Carry 10,000+ High-Yield Questions In Your Pocket</h2>

            <p className="app-desc">
              Solve time-bound tests on the subway, listen to methodology audio notes during commute, and monitor your AIR rank preparation in real-time.
            </p>

            <div className="app-streak-card">
              <div className="streak-header">
                <span className="streak-title">🔥 18 Days Active Study Streak</span>
                <span className="streak-badge">TOP 2% ACTIVE</span>
              </div>

              <div className="subject-bars-grid">
                <div>
                  <div className="bar-lbl">
                    <span>Botany Mastery</span>
                    <span className="bar-pct">88%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: "88%" }} />
                  </div>
                </div>

                <div>
                  <div className="bar-lbl">
                    <span>Chemistry Reactions</span>
                    <span className="bar-pct">82%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: "82%" }} />
                  </div>
                </div>

                <div>
                  <div className="bar-lbl">
                    <span>Zoology Index</span>
                    <span className="bar-pct">84%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: "84%" }} />
                  </div>
                </div>

                <div>
                  <div className="bar-lbl">
                    <span>Physics Formulae</span>
                    <span className="bar-pct">79%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: "79%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="app-buttons-group">
              <a href="#" className="btn-apk-download btn-orange-leather">
                <span>Direct APK Download (v4.2)</span>
              </a>
              <a href="#" className="btn-store-dark">
                Google Play Store
              </a>
            </div>
          </div>

          {/* Right Phone Mockup */}
          <div className="phone-mockup-card">
            <div className="phone-mockup-header">
              <span style={{ fontSize: "11px", color: "#9C897D" }}>NEET Live Mock #42</span>
              <span className="time-rem">⏱️ Time: 02:45 Remaining</span>
            </div>

            <div className="mockup-question">
              Q42. Which of the following nitrogenous bases is present exclusively in RNA and absent in DNA?
            </div>

            <div className="mockup-option">A) Adenine</div>
            <div className="mockup-option active">✓ B) Uracil (Selected - Correct)</div>
            <div className="mockup-option">C) Thymine</div>
            <div className="mockup-option">D) Guanine</div>

            <div
              style={{
                marginTop: "16px",
                padding: "12px",
                background: "rgba(22,163,74,0.15)",
                border: "1px solid rgba(22,163,74,0.3)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "#4ADE80",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>Instant Score +4 Marks</span>
              <strong style={{ color: "#FFFFFF" }}>Rank Boosted +14 Spots</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ WALL OF FAME ════════ */}
      <section className="fame-section has-texture" id="achievers">
        <div className="section-header-row">
          <div>
            <span className="section-label">UNSTOPPABLE RESULTS</span>
            <h2 className="section-title">Wall of Fame: NEET 2024 Achievers</h2>
            <p className="section-subtitle">
              Hear directly from students who secured their dream government medical colleges through our precision question banks.
            </p>
          </div>
          <a
            href="#"
            style={{ fontSize: "13px", fontWeight: "800", color: "var(--orange)", textDecoration: "none" }}
          >
            View all 50+ Selections ↗
          </a>
        </div>

        <div className="fame-grid">
          {achievers.map((a) => (
            <div className="fame-card" key={a.name}>
              <div>
                <div className="fame-top-row">
                  <span className="air-badge">{a.air}</span>
                  <span className="score-badge">{a.score}</span>
                </div>
                <p className="fame-quote">{a.quote}</p>
              </div>

              <div className="fame-student-info">
                <div className="student-avatar">{a.init}</div>
                <div>
                  <div className="student-name">{a.name}</div>
                  <div className="student-batch">{a.batch}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════ ORANGE LEATHER CTA BANNER ════════ */}
      <section className="cta-section" id="enroll">
        <div className="cta-leather-container banner-orange-leather">
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="cta-tag">LIMITED SEATS FOR 2026/2027 BATCHES</span>
            <h2 className="cta-title">Ready to Wear the White Coat in 2026 or 2027?</h2>
            <p className="cta-sub">
              Speak with a senior academic counselor or book your diagnostic scholarship test today.
            </p>
          </div>

          <div className="cta-actions" style={{ position: "relative", zIndex: 1 }}>
            <a href="tel:+917702022682" className="btn-cta-phone">
              📞 Call +91 77020 22682
            </a>
            <a href="#" className="btn-cta-online">
              Apply Online ↗
            </a>
          </div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="footer-section has-dark-texture" id="footer">
        <div className="footer-container">
          <div className="footer-top-grid">
            {/* Col 1: Bio */}
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

            {/* Col 2: Quick Access */}
            <div>
              <h4 className="footer-col-title">Quick Access</h4>
              <ul className="footer-links-list">
                <li><a href="#home">Home Overview</a></li>
                <li><a href="#courses">Target Batches 2026/27</a></li>
                <li><a href="#methodology">Indraprastha Method</a></li>
                <li><a href="#app">Mobile App Features</a></li>
                <li><a href="#footer">Help Desk & FAQs</a></li>
              </ul>
            </div>

            {/* Col 3: Helpline & Campus */}
            <div>
              <h4 className="footer-col-title">Helpline & Campus</h4>
              <div className="footer-contact-item">
                <span>📞</span>
                <div>
                  <strong style={{ color: "#FFFFFF" }}>+91 77020 22682</strong>
                  <div style={{ fontSize: "11px" }}>Primary Academic Helpline</div>
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
                <div>Mon - Sat: 08:00AM - 08:00PM</div>
              </div>
            </div>

            {/* Col 4: Digital Study App */}
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
            <div>© 2026 Indraprastha NEET Academy. All rights reserved.</div>
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

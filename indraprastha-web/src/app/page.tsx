"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MentorshipBannerSlider from "@/components/MentorshipBannerSlider";

/* ─── DATA ─── */
const navItems = [
  { label: "Home", href: "/" },
  { label: "Target Batches", href: "/target-batches" },
  { label: "AI Rank Predictor", href: "/ai-rank-predictor" },
  { label: "Methodology", href: "/methodology" },
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
  { icon: "🎓", val: "99.8%", label: "NEET Exam Pattern Alignment" },
  { icon: "📞", val: "24/7 Helpline", label: "+91 77030 33682" },
];

const batches = [
  {
    badge: "TARGET BATCH",
    badgeType: "orange",
    subBadge: "CLASS 11 + 12 COMPREHENSIVE",
    name: "Target NEET 2027",
    desc: "Complete 2-year syllabus mastery with 100+ questions per chapter, CBT tests & doctor mentorship.",
    price: "₹2,999",
    oldPrice: "₹5,999",
    save: "SAVE 50%",
    featured: true,
    feats: [
      "Chapterwise pyq",
      "Chapterwise test Series ( 45 question in 45 minutes )",
      "Practice Session of Every Chapter ( one session includes more than 100 question in every chapter )",
      "Grant test including full syllabus",
      "Subject Wise Test",
      "Custom Module for Wrong & bookmarked question",
      "Experince CBT Mode On our website Any time on all the questions",
      "Pratice anywhere anytime On our application",
      "Mentorship By Dr Rahul Kumar ( only for paid subscribers )",
      "24*7 Doubt solving faculty in our exclusive telegram channel ( only for paid Subscribers )",
    ],
    cta: "Enroll for Target NEET 2027 • ₹2,999",
    secondary: "Request Mobile Brochure (PDF)",
  },
  {
    badge: "TARGET BATCH",
    badgeType: "green",
    subBadge: "NEET 2028 ASPIRANTS",
    name: "Target NEET 2028",
    desc: "Complete syllabus & comprehensive problem-solving drills tailored for NEET 2028 aspirants.",
    price: "₹5,500",
    oldPrice: "₹9,999",
    save: "SAVE 45%",
    featured: false,
    feats: [
      "Chapterwise pyq",
      "Chapterwise test Series ( 45 question in 45 minutes )",
      "Practice Session of Every Chapter ( one session includes more than 100 question in every chapter )",
      "Grant test including full syllabus",
      "Subject Wise Test",
      "Custom Module for Wrong & bookmarked question",
      "Experince CBT Mode On our website Any time on all the questions",
      "Pratice anywhere anytime On our application",
      "Mentorship By Dr Rahul Kumar ( only for paid subscribers )",
      "24*7 Doubt solving faculty in our exclusive telegram channel ( only for paid Subscribers )",
    ],
    cta: "Enroll for Target NEET 2028 • ₹5,500",
    secondary: "Request Mobile Brochure (PDF)",
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

const homepageFaqs = [
  {
    q: "What is Indraprastha NEET Academy?",
    a: "Indraprastha NEET Academy is a NEET preparation platform offering question practice, chapter-wise previous year questions, CBT-mode tests, performance analytics and doubt-solving support.",
  },
  {
    q: "How can I practise questions for NEET online?",
    a: "You can practise NEET questions online by selecting a subject or chapter, answering questions, reviewing your performance and revisiting concepts that need more practice.",
  },
  {
    q: "Does Indraprastha NEET Academy provide NEET practice tests?",
    a: "The platform offers online question practice and CBT-mode tests to help students practise in an exam-style interface. Check the current app or website for the available tests.",
  },
  {
    q: "Can I prepare for NEET Biology, Physics and Chemistry on the platform?",
    a: "Yes. The platform is designed for NEET preparation across Biology, Physics and Chemistry, with subject-wise and chapter-wise question practice.",
  },
];

export default function Page() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleHeroNavigate = (destination: string) => {
    router.push(destination);
  };

  const handleEnrollClick = (batch: (typeof batches)[0]) => {
    const rawPrice = batch.price.replace(/\D/g, "");
    const packageId = batch.name.includes("2028") ? 2 : 1;
    const batchYear = batch.name.includes("2028") ? "2028" : "2027";

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

  return (
    <>
      {/* ════════ MAIN NAVBAR ════════ */}
      <Navbar activePage="home" />

      {/* ════════ HERO SECTION ════════ */}
      <section className="hero-section has-texture" id="home">
        <div className="hero-container">
          {/* Left Column Text matching image */}
          <div>
            <div className="hero-pill-tag">
              <span style={{ color: "#E55200", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", fontSize: "11px" }}>
                INDRAPRASTHA NEET ACADEMY
              </span>
            </div>

            <h1 className="hero-title" style={{ marginBottom: "12px" }}>
              NEET Preparation Through <span className="highlight-underline">Smart Question Practice</span>
            </h1>

            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--text-main, #332014)",
                marginBottom: "12px",
                lineHeight: 1.4,
              }}
            >
              Start Your NEET 2027 Practice · Chapterwise PYQs &amp; CBT Test Series
            </div>

            <p className="hero-subtitle" style={{ marginBottom: "28px" }}>
              Prepare chapter by chapter with dedicated previous year question practice and chapterwise tests for NEET 2027.
            </p>

            <div className="hero-cta-group" style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "32px" }}>
              <button
                type="button"
                onClick={() => handleHeroNavigate("/tests")}
                className="btn-primary-hero btn-orange-leather"
                style={{
                  cursor: "pointer",
                  border: "none",
                  fontSize: "15px",
                  fontWeight: 800,
                  padding: "14px 26px",
                  borderRadius: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#A8432A",
                  color: "#FFFFFF",
                  boxShadow: "0 4px 14px rgba(168, 67, 42, 0.35)",
                  transition: "all 0.2s ease",
                }}
              >
                <span>Chapterwise NEET Test Series →</span>
              </button>

              <button
                type="button"
                onClick={() => handleHeroNavigate("/pyqs")}
                className="btn-secondary-hero"
                style={{
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: 800,
                  padding: "14px 26px",
                  borderRadius: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "rgba(229, 82, 0, 0.04)",
                  color: "#E55200",
                  border: "1.5px solid #E55200",
                  transition: "all 0.2s ease",
                }}
              >
                <span>Chapterwise NEET PYQs →</span>
              </button>
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

      {/* ════════ PERSONALISED MENTORSHIP BY DR RAHUL KUMAR ════════ */}
      <section className="mentorship-section has-texture" id="mentorship">
        <div className="mentorship-container">
          <div className="section-header-row" style={{ marginBottom: "28px" }}>
            <div>
              <span className="section-label">👨‍⚕️ FOUNDER &amp; CHIEF ACADEMIC MENTOR</span>
              <h2 className="section-title">Personalised Mentorship by Dr Rahul Kumar</h2>
              <p className="section-subtitle">
                Bridging the vital gap between textbook memorization and exam-day rank. Every Indraprastha aspirant receives doctor-led 1-on-1 strategic guidance, tailored revision timelines, and psychological mindset coaching.
              </p>
            </div>
            <a href="tel:+917703033682" className="engine-tag" style={{ textDecoration: "none" }}>
              📞 Call Mentorship Desk: +91 77030 33682
            </a>
          </div>

          {/* Featured Platform Showcase Slider (CBT Mode, Similar Questions, 24x7 Doubt Solving) */}
          <div className="mentorship-banner-card">
            <MentorshipBannerSlider />

            {/* Value Highlights Grid Below Banner */}
            <div className="mentorship-features-grid">
              <div className="mentorship-feat-card">
                <div className="feat-card-icon-box">🎯</div>
                <div>
                  <h4 className="feat-card-title">Understand Exam Pattern</h4>
                  <p className="feat-card-desc">
                    Deconstruct the exact NEET &amp; NMC question patterns. Learn how assertion-reason, statement-based, and multi-concept questions are designed.
                  </p>
                </div>
              </div>

              <div className="mentorship-feat-card">
                <div className="feat-card-icon-box">📈</div>
                <div>
                  <h4 className="feat-card-title">Plan Your Revision</h4>
                  <p className="feat-card-desc">
                    Get an individualized, scientifically-structured 90-day &amp; 180-day active recall plan that stops forgetting cycles before exam day.
                  </p>
                </div>
              </div>

              <div className="mentorship-feat-card">
                <div className="feat-card-icon-box">📖</div>
                <div>
                  <h4 className="feat-card-title">Focus on Weaker Areas</h4>
                  <p className="feat-card-desc">
                    Identify your negative marking leaks through AI diagnostics and rectify them with 1-on-1 doctor doubt consultations and targeted drills.
                  </p>
                </div>
              </div>
            </div>

            {/* Dr. Rahul Quote & CTA Row */}
            <div className="mentorship-bottom-cta">
              <div className="mentor-quote-box">
                <p className="mentor-quote-text">
                  &ldquo;Cracking Neet is not about studying 16 hours haphazardly; it is about revision & Question practicing as many questions as  you can do form a Topic&rdquo;
                </p>
                <div className="mentor-sign-text">
                  <strong>— Dr Rahul Kumar</strong> · Founder &amp; Academic Director
                </div>
              </div>

              <div className="mentor-actions-group">
                <a href="tel:+917703033682" className="btn-primary-hero btn-orange-leather">
                  <span>Book Free 1-on-1 Mentorship Call 📞</span>
                </a>
                <a href="/target-batches" className="btn-secondary-hero">
                  Explore Batches with Mentorship →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ TARGET BATCHES SECTION ════════ */}
      <section className="batches-section has-texture" id="courses">
        <div className="section-header-row">
          <div>
            <span className="section-label">INDRAPRASTHA MEDICAL COURSES</span>
            <h2 className="section-title">Featured Target Batches for NEET 2027 &amp; 2028</h2>
            <p className="section-subtitle">
              Built strictly adhering to the revised NMC syllabus with timed module simulations and verified doctor-faculty mentorship.
            </p>
          </div>
          <span className="engine-tag">⚡ All batches include NEET Test Engine</span>
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
                <button
                  type="button"
                  onClick={() => handleEnrollClick(b)}
                  className="btn-batch-enroll btn-orange-leather"
                  style={{ width: "100%", cursor: "pointer", border: "none" }}
                >
                  <span>{b.cta}</span>
                </button>
                <Link href="/target-batches" className="btn-batch-secondary">
                  {b.secondary}
                </Link>
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

            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", marginTop: "24px" }}>
              {/* Google Play Store Button */}
              <a
                href="https://play.google.com/store/apps/details?id=com.indraprastha.neetacademy&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 22px",
                  background: "linear-gradient(135deg, #FF6B00 0%, #E55200 100%)",
                  color: "#FFFFFF",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: "15px",
                  boxShadow: "0 6px 20px rgba(229, 82, 0, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  transition: "all 0.2s ease",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.6 1.8C3.3 2.1 3.1 2.6 3.1 3.2V20.8C3.1 21.4 3.3 21.9 3.6 22.2L3.7 22.3L13.8 12.2V11.8L3.7 1.7L3.6 1.8Z" fill="#00D2FF"/>
                  <path d="M17.2 15.6L13.8 12.2V11.8L17.2 8.4L17.3 8.5L21.3 10.8C22.4 11.4 22.4 12.6 21.3 13.2L17.3 15.5L17.2 15.6Z" fill="#FFD400"/>
                  <path d="M17.3 15.5L13.8 12L3.6 22.2C4 22.6 4.7 22.7 5.5 22.2L17.3 15.5Z" fill="#FF3333"/>
                  <path d="M17.3 8.5L5.5 1.8C4.7 1.3 4 1.4 3.6 1.8L13.8 12L17.3 8.5Z" fill="#00E676"/>
                </svg>
                <div style={{ textAlign: "left" }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase", display: "block", opacity: 0.9 }}>
                    GET IT ON
                  </span>
                  <span style={{ fontSize: "16px", fontWeight: 900, letterSpacing: "-0.2px", display: "block", lineHeight: 1.1 }}>
                    Google Play
                  </span>
                </div>
              </a>

              {/* QR Code Scan Card */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px 16px 8px 10px",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(229, 82, 0, 0.35)",
                  borderRadius: "14px",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Image
                  src="/app_qr_code.png"
                  alt="Indraprastha NEET Academy App QR Code"
                  width={66}
                  height={66}
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#FFFFFF",
                    padding: "4px",
                    display: "block",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  }}
                />
                <div>
                  <span style={{ fontSize: "10px", fontWeight: 900, color: "#FF7A1A", letterSpacing: "0.8px", textTransform: "uppercase", display: "block" }}>
                    📷 Scan QR Code
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#FFFFFF", display: "block", marginTop: "2px" }}>
                    Install on Mobile
                  </span>
                  <span style={{ fontSize: "11px", color: "var(--text-muted, #A38E82)", display: "block" }}>
                    Camera se scan karein
                  </span>
                </div>
              </div>
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

      {/* ════════ HOMEPAGE FAQ SECTION (SEO & AI SEARCH OPTIMIZED) ════════ */}
      <section className="faq-section has-texture" style={{ padding: "70px 20px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="section-label" style={{ color: "#E55200", fontWeight: 800, fontSize: "12px", letterSpacing: "1.2px", textTransform: "uppercase" }}>
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--text-main)", margin: "8px 0 12px" }}>
            Everything You Need to Know About NEET Preparation
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "15px", maxWidth: "680px", margin: "0 auto" }}>
            Direct, factual answers regarding online question practice, previous year questions, CBT mock tests, and academy features.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {homepageFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.q}
                style={{
                  borderRadius: "14px",
                  border: "1px solid var(--border-light, #EDE3DA)",
                  backgroundColor: "var(--cream-card, #FFFFFF)",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                  boxShadow: isOpen ? "0 4px 16px rgba(229, 82, 0, 0.08)" : "0 2px 6px rgba(0,0,0,0.02)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  style={{
                    width: "100%",
                    padding: "18px 22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    color: "var(--text-main)",
                    fontSize: "16px",
                    fontWeight: 800,
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: "18px", color: "#E55200", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                    ▾
                  </span>
                </button>
                {isOpen && (
                  <div
                    style={{
                      padding: "0 22px 18px",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      color: "var(--text-muted)",
                      borderTop: "1px solid var(--border-light, #EDE3DA)",
                      paddingTop: "14px",
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* JSON-LD Structured Data for FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: homepageFaqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.a,
                },
              })),
            }),
          }}
        />
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
            <a href="tel:+917703033682" className="btn-cta-phone">
              📞 Call +91 77030 33682
            </a>
            <a href="#" className="btn-cta-online">
              Apply Online ↗
            </a>
          </div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <Footer />
    </>
  );
}

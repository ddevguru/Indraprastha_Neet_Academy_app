import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "NEET Test Series 2027 & Online Mock Tests | Indraprastha",
  description:
    "Prepare for NEET 2027 with chapterwise tests, subject tests and grand mock exams. Practise Physics, Chemistry and Biology with timed tests and performance review on Indraprastha NEET Academy.",
  keywords: [
    "NEET Test Series 2027",
    "NEET Chapterwise Test Series",
    "NEET Online Mock Test",
    "NEET Subjectwise Tests",
    "NEET Grand Test",
    "NEET CBT Practice",
    "Indraprastha NEET Test Series",
  ],
  alternates: {
    canonical: "https://www.indraprasthaneetacademy.com/neet-test-series",
  },
  openGraph: {
    title: "NEET Test Series 2027 & Online Mock Tests | Indraprastha",
    description:
      "Prepare for NEET 2027 with chapterwise tests, subject tests and grand mock exams. Practise Physics, Chemistry and Biology with timed tests and performance review on Indraprastha NEET Academy.",
    url: "https://www.indraprasthaneetacademy.com/neet-test-series",
    siteName: "Indraprastha NEET Academy",
    type: "website",
  },
};

const testCategories = [
  {
    title: "Chapter-Wise Tests",
    count: "79 Tests",
    desc: "45 questions in 45 minutes for every chapter in Physics, Chemistry, and Biology. Aligned with NCERT line-by-line.",
    icon: "📖",
    tag: "High-Yield Foundation",
    href: "/tests?category=chapter",
  },
  {
    title: "Subject-Wise Tests",
    count: "12 Tests",
    desc: "Comprehensive sectional tests covering full Physics, Chemistry, Botany, and Zoology to build cross-topic speed.",
    icon: "🧪",
    tag: "Sectional Speed",
    href: "/tests?category=subject",
  },
  {
    title: "Grand Full Mock Exams",
    count: "7 Tests",
    desc: "Full 720-mark simulated NEET exam papers with timed 200-minute CBT interface and all-India percentile calculation.",
    icon: "🏆",
    tag: "Exam Day Simulation",
    href: "/tests?category=grand",
  },
];

const subjectBreakdown = [
  {
    subject: "Physics",
    class11: "Units, Kinematics, Laws of Motion, Work Power Energy, Rotational Motion, Gravitation, Solids, Fluids, Heat & Waves",
    class12: "Electrostatics, Current Electricity, Magnetism, EMI, AC, Optics, Dual Nature, Atoms, Nuclei & Semiconductors",
    testCount: "32 Tests",
    badgeColor: "#3B82F6",
  },
  {
    subject: "Chemistry",
    class11: "Mole Concept, Atomic Structure, Chemical Bonding, Thermodynamics, Equilibrium, Redox Reactions & Hydrocarbons",
    class12: "Solid State, Solutions, Electrochemistry, Kinetics, P-Block, D & F Block, Coordination & Organic Chemistry",
    testCount: "35 Tests",
    badgeColor: "#10B981",
  },
  {
    subject: "Biology",
    class11: "Living World, Classification, Plant & Animal Kingdom, Morphology, Anatomy, Cell Cycle & Human Physiology",
    class12: "Reproduction, Genetics, Molecular Biology, Evolution, Human Health, Biotechnology & Ecology",
    testCount: "31 Tests",
    badgeColor: "#8B5CF6",
  },
];

const testSeriesFaqs = [
  {
    q: "How does online CBT-mode practice help students become familiar with test interfaces?",
    a: "CBT-mode practice simulates the exact exam screen, including question status indicators (Answered, Unanswered, Marked for Review), countdown timers, and question palettes. This removes interface anxiety on exam day and trains students to manage their 3 hours and 20 minutes effectively.",
  },
  {
    q: "What types of tests are included in the Indraprastha NEET Test Series?",
    a: "The test series includes 98 total curated tests: 79 chapter-wise tests (45 questions in 45 minutes), 12 subject-wise cumulative tests, and 7 full-syllabus grand mock tests matching the latest NTA NEET UG pattern.",
  },
  {
    q: "What is the duration and marking scheme for the tests?",
    a: "Chapter-wise tests are set to 45 questions in 45 minutes (180 marks). Full grand mock exams follow the 720-mark NEET UG scheme (+4 marks for correct answers, -1 negative mark for incorrect attempts, and 0 for unattempted questions).",
  },
  {
    q: "How does similar-question practice help after making a mistake in a test?",
    a: "Whenever you make a mistake or get stuck on a concept, Indraprastha's learning system recommends similar questions testing the exact same underlying NCERT concept. This ensures you master the concept immediately instead of repeating the same error in future tests.",
  },
  {
    q: "Can I review answers and solutions after submitting my test?",
    a: "Yes. Immediately upon test submission, you receive an in-depth performance review with correct answers, step-by-step scientific Unicode derivations, time spent per question, and personalized accuracy metrics.",
  },
];

export default function NeetTestSeriesPage() {
  return (
    <>
      <Navbar activePage="tests" />

      <main style={{ minHeight: "100vh", backgroundColor: "var(--cream-bg, #FAF6F0)", color: "var(--text-main, #140A03)" }}>
        {/* Breadcrumb Navigation */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 20px 0", fontSize: "13px", color: "var(--text-muted)" }}>
          <Link href="/" style={{ color: "#E55200", textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--text-main)", fontWeight: 700 }}>NEET Test Series 2027</span>
        </div>

        {/* Hero Section */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "36px 20px 48px" }}>
          <div style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "100px",
                backgroundColor: "rgba(229, 82, 0, 0.1)",
                border: "1px solid rgba(229, 82, 0, 0.25)",
                color: "#E55200",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "0.5px",
                marginBottom: "18px",
              }}
            >
              <span>🎯 CBT-MODE EXAM SIMULATION</span>
              <span>•</span>
              <span>NEET 2027 BENCHMARK</span>
            </div>

            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "18px", color: "var(--text-main)" }}>
              NEET Test Series and Online Mock Exams for <span style={{ color: "#E55200" }}>NEET 2027</span>
            </h1>

            <p style={{ fontSize: "17px", lineHeight: 1.6, color: "var(--text-muted)", marginBottom: "32px", maxWidth: "780px", margin: "0 auto 32px" }}>
              Prepare for NEET 2027 with chapterwise tests, subject tests and grand mock exams. Practise Physics, Chemistry and Biology with timed tests, negative marking simulation, and instant performance review on Indraprastha NEET Academy.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap", marginBottom: "40px" }}>
              <Link
                href="/tests"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 28px",
                  borderRadius: "12px",
                  backgroundColor: "#E55200",
                  color: "#FFFFFF",
                  fontSize: "15px",
                  fontWeight: 800,
                  textDecoration: "none",
                  boxShadow: "0 8px 24px rgba(229, 82, 0, 0.3)",
                }}
              >
                <span>Explore NEET Tests Portal →</span>
              </Link>
              <Link
                href="/subscriptions"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 26px",
                  borderRadius: "12px",
                  border: "1.5px solid var(--border-light, #EDE3DA)",
                  backgroundColor: "var(--cream-card, #FFFFFF)",
                  color: "var(--text-main)",
                  fontSize: "15px",
                  fontWeight: 800,
                  textDecoration: "none",
                }}
              >
                <span>👑 View Test Series Plans</span>
              </Link>
            </div>

            {/* Test Stats Counter Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                padding: "24px",
                borderRadius: "18px",
                backgroundColor: "var(--cream-card, #FFFFFF)",
                border: "1px solid var(--border-light, #EDE3DA)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
              }}
            >
              <div>
                <div style={{ fontSize: "32px", fontWeight: 900, color: "#E55200" }}>98</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>Total NEET Tests</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Covering 100% NCERT</div>
              </div>
              <div>
                <div style={{ fontSize: "32px", fontWeight: 900, color: "#3B82F6" }}>79</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>Chapterwise Tests</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>45 Qs / 45 Minutes</div>
              </div>
              <div>
                <div style={{ fontSize: "32px", fontWeight: 900, color: "#10B981" }}>12</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>Subject Tests</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Full Section Revision</div>
              </div>
              <div>
                <div style={{ fontSize: "32px", fontWeight: 900, color: "#8B5CF6" }}>7</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>Grand Mock Exams</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Full 720-Mark Simulation</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Test Types Cards */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 48px" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <span style={{ color: "#E55200", fontWeight: 800, fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
              STRUCTURED TEST ARCHITECTURE
            </span>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-main)", marginTop: "6px" }}>
              Three Dedicated Formats for Complete Exam Readiness
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            {testCategories.map((c) => (
              <div
                key={c.title}
                style={{
                  padding: "28px",
                  borderRadius: "16px",
                  backgroundColor: "var(--cream-card, #FFFFFF)",
                  border: "1.5px solid var(--border-light, #EDE3DA)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <span style={{ fontSize: "28px" }}>{c.icon}</span>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "100px",
                        backgroundColor: "rgba(229, 82, 0, 0.1)",
                        color: "#E55200",
                        fontSize: "12px",
                        fontWeight: 800,
                      }}
                    >
                      {c.count}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "8px" }}>
                    {c.title}
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--text-muted)", marginBottom: "20px" }}>
                    {c.desc}
                  </p>
                </div>

                <Link
                  href={c.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(229, 82, 0, 0.06)",
                    color: "#E55200",
                    fontWeight: 800,
                    fontSize: "13px",
                    textDecoration: "none",
                  }}
                >
                  <span>Practise {c.title}</span>
                  <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Subject-Wise & Class 11/12 Coverage */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 48px" }}>
          <div style={{ padding: "36px", borderRadius: "20px", backgroundColor: "var(--cream-card, #FFFFFF)", border: "1px solid var(--border-light, #EDE3DA)" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <span style={{ color: "#E55200", fontWeight: 800, fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
                CLASS 11 &amp; CLASS 12 SYLLABUS
              </span>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-main)", marginTop: "6px" }}>
                Physics, Chemistry &amp; Biology Subject Breakdown
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
              {subjectBreakdown.map((s) => (
                <div
                  key={s.subject}
                  style={{
                    padding: "24px",
                    borderRadius: "14px",
                    backgroundColor: "rgba(229, 82, 0, 0.03)",
                    border: "1px solid var(--border-light, #EDE3DA)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-main)", margin: 0 }}>
                      {s.subject}
                    </h3>
                    <span style={{ padding: "3px 8px", borderRadius: "6px", backgroundColor: s.badgeColor, color: "#FFFFFF", fontSize: "11px", fontWeight: 800 }}>
                      {s.testCount}
                    </span>
                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <strong style={{ fontSize: "12px", color: "#E55200", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                      Class 11 Chapters:
                    </strong>
                    <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
                      {s.class11}
                    </p>
                  </div>

                  <div>
                    <strong style={{ fontSize: "12px", color: "#E55200", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                      Class 12 Chapters:
                    </strong>
                    <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
                      {s.class12}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real Differentiators: CBT Mode + Similar Questions */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            <div
              style={{
                padding: "32px",
                borderRadius: "18px",
                background: "linear-gradient(135deg, #18110B 0%, #2A1B10 100%)",
                color: "#FFFFFF",
                border: "1px solid #3E291C",
              }}
            >
              <span style={{ color: "#FF7A1A", fontSize: "11px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1px" }}>
                REAL EXAM ENVIRONMENT
              </span>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 900, margin: "8px 0 14px", color: "#FFFFFF" }}>
                Online CBT-Mode Practice
              </h3>
              <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#D1C2B7", marginBottom: "18px" }}>
                Our testing interface is built to mirror computer-based test conditions. Students gain familiarity with question palletes (Answered, Unanswered, Marked for Review), countdown timers, and question switching before entering the exam hall.
              </p>
              <ul style={{ paddingLeft: "18px", fontSize: "13px", color: "#D1C2B7", lineHeight: 1.8 }}>
                <li>Live countdown timer with auto-submit alerts</li>
                <li>Single-click palette navigation across all 45/180 questions</li>
                <li>NTA NEET marking (+4 for correct, -1 for negative)</li>
              </ul>
            </div>

            <div
              style={{
                padding: "32px",
                borderRadius: "18px",
                backgroundColor: "var(--cream-card, #FFFFFF)",
                border: "1.5px solid var(--border-light, #EDE3DA)",
              }}
            >
              <span style={{ color: "#E55200", fontSize: "11px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1px" }}>
                MISTAKE CORRECTION ENGINE
              </span>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 900, margin: "8px 0 14px", color: "var(--text-main)" }}>
                Similar-Question Practice After Mistakes
              </h3>
              <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--text-muted)", marginBottom: "18px" }}>
                One wrong answer shouldn't end your learning. For every question answered incorrectly in a test, the platform provides a corresponding similar question with full step-by-step scientific derivations to ensure the underlying concept is mastered.
              </p>
              <ul style={{ paddingLeft: "18px", fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.8 }}>
                <li>Step-by-step plain text scientific solutions (no raw LaTeX)</li>
                <li>Instant second attempt with a similar concept variant</li>
                <li>Master mistakes custom revision bucket</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 20px 60px" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <span style={{ color: "#E55200", fontWeight: 800, fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
              QUESTIONS &amp; ANSWERS
            </span>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-main)", marginTop: "6px" }}>
              Frequently Asked Questions About NEET Test Series
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {testSeriesFaqs.map((faq) => (
              <details
                key={faq.q}
                style={{
                  padding: "18px 22px",
                  borderRadius: "12px",
                  backgroundColor: "var(--cream-card, #FFFFFF)",
                  border: "1px solid var(--border-light, #EDE3DA)",
                  cursor: "pointer",
                }}
              >
                <summary style={{ fontSize: "15px", fontWeight: 800, color: "var(--text-main)", outline: "none" }}>
                  {faq.q}
                </summary>
                <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--text-muted)", marginTop: "12px", marginBottom: 0 }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          {/* JSON-LD Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: testSeriesFaqs.map((f) => ({
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
      </main>

      <Footer />
    </>
  );
}

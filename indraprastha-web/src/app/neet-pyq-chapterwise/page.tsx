import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "NEET Previous Year Questions Chapterwise | Indraprastha NEET Academy",
  description:
    "Practise NEET previous year questions chapterwise for Physics, Chemistry and Biology. Explore available PYQs by subject, chapter and exam year with Indraprastha NEET Academy.",
  keywords: [
    "NEET previous year questions chapter wise",
    "NEET PYQ chapterwise",
    "NEET Biology PYQs",
    "NEET Physics PYQs",
    "NEET Chemistry PYQs",
    "Chapterwise NEET PYQs with solutions",
    "NEET 2024 question paper solutions",
    "Indraprastha NEET Academy",
  ],
  alternates: {
    canonical: "https://www.indraprasthaneetacademy.com/neet-pyq-chapterwise",
  },
  openGraph: {
    title: "NEET Previous Year Questions Chapterwise | Indraprastha NEET Academy",
    description:
      "Practise NEET previous year questions chapterwise for Physics, Chemistry and Biology. Explore available PYQs by subject, chapter and exam year with Indraprastha NEET Academy.",
    url: "https://www.indraprasthaneetacademy.com/neet-pyq-chapterwise",
    siteName: "Indraprastha NEET Academy",
    type: "website",
  },
};

const pyqSubjects = [
  {
    id: "biology",
    name: "Biology (Botany & Zoology)",
    icon: "🧬",
    totalChapters: "38 Chapters",
    pyqCount: "3,200+ PYQs",
    weightage: "360 / 720 Marks (50%)",
    accentColor: "#10B981",
    class11: [
      { name: "The Living World", years: "2010–2024", count: 48 },
      { name: "Biological Classification", years: "2010–2024", count: 96 },
      { name: "Plant Kingdom", years: "2010–2024", count: 112 },
      { name: "Animal Kingdom", years: "2010–2024", count: 125 },
      { name: "Morphology of Flowering Plants", years: "2010–2024", count: 88 },
      { name: "Anatomy of Flowering Plants", years: "2010–2024", count: 74 },
      { name: "Cell: The Unit of Life", years: "2010–2024", count: 130 },
      { name: "Cell Cycle and Cell Division", years: "2010–2024", count: 104 },
      { name: "Photosynthesis in Higher Plants", years: "2010–2024", count: 92 },
      { name: "Respiration in Plants", years: "2010–2024", count: 82 },
      { name: "Human Physiology (Full System)", years: "2010–2024", count: 320 },
    ],
    class12: [
      { name: "Sexual Reproduction in Flowering Plants", years: "2010–2024", count: 118 },
      { name: "Human Reproduction & Reproductive Health", years: "2010–2024", count: 142 },
      { name: "Principles of Inheritance and Variation", years: "2010–2024", count: 165 },
      { name: "Molecular Basis of Inheritance", years: "2010–2024", count: 180 },
      { name: "Evolution", years: "2010–2024", count: 94 },
      { name: "Human Health and Disease", years: "2010–2024", count: 110 },
      { name: "Biotechnology: Principles & Applications", years: "2010–2024", count: 140 },
      { name: "Ecology, Ecosystem & Biodiversity", years: "2010–2024", count: 175 },
    ],
  },
  {
    id: "physics",
    name: "Physics",
    icon: "⚡",
    totalChapters: "28 Chapters",
    pyqCount: "2,400+ PYQs",
    weightage: "180 / 720 Marks (25%)",
    accentColor: "#3B82F6",
    class11: [
      { name: "Units and Measurements", years: "2010–2024", count: 72 },
      { name: "Motion in a Straight Line & Plane", years: "2010–2024", count: 118 },
      { name: "Laws of Motion & Friction", years: "2010–2024", count: 135 },
      { name: "Work, Energy and Power", years: "2010–2024", count: 110 },
      { name: "System of Particles & Rotational Motion", years: "2010–2024", count: 145 },
      { name: "Gravitation", years: "2010–2024", count: 86 },
      { name: "Mechanical Properties of Solids & Fluids", years: "2010–2024", count: 122 },
      { name: "Thermal Properties & Thermodynamics", years: "2010–2024", count: 134 },
      { name: "Oscillations and Waves", years: "2010–2024", count: 115 },
    ],
    class12: [
      { name: "Electrostatics & Capacitance", years: "2010–2024", count: 160 },
      { name: "Current Electricity", years: "2010–2024", count: 142 },
      { name: "Moving Charges & Magnetism", years: "2010–2024", count: 128 },
      { name: "Electromagnetic Induction & AC", years: "2010–2024", count: 138 },
      { name: "Electromagnetic Waves", years: "2010–2024", count: 44 },
      { name: "Ray Optics and Optical Instruments", years: "2010–2024", count: 152 },
      { name: "Wave Optics", years: "2010–2024", count: 82 },
      { name: "Dual Nature of Radiation & Matter", years: "2010–2024", count: 86 },
      { name: "Atoms & Nuclei", years: "2010–2024", count: 112 },
      { name: "Semiconductor Electronics", years: "2010–2024", count: 96 },
    ],
  },
  {
    id: "chemistry",
    name: "Chemistry (Physical, Inorganic & Organic)",
    icon: "🧪",
    totalChapters: "30 Chapters",
    pyqCount: "2,600+ PYQs",
    weightage: "180 / 720 Marks (25%)",
    accentColor: "#F59E0B",
    class11: [
      { name: "Some Basic Concepts of Chemistry (Mole)", years: "2010–2024", count: 84 },
      { name: "Structure of Atom", years: "2010–2024", count: 92 },
      { name: "Classification of Elements & Periodicity", years: "2010–2024", count: 68 },
      { name: "Chemical Bonding & Molecular Structure", years: "2010–2024", count: 145 },
      { name: "Chemical Thermodynamics", years: "2010–2024", count: 118 },
      { name: "Chemical & Ionic Equilibrium", years: "2010–2024", count: 132 },
      { name: "Redox Reactions", years: "2010–2024", count: 58 },
      { name: "Hydrocarbons & Organic Principles", years: "2010–2024", count: 154 },
    ],
    class12: [
      { name: "Solutions", years: "2010–2024", count: 88 },
      { name: "Electrochemistry", years: "2010–2024", count: 110 },
      { name: "Chemical Kinetics", years: "2010–2024", count: 96 },
      { name: "d and f Block Elements", years: "2010–2024", count: 82 },
      { name: "Coordination Compounds", years: "2010–2024", count: 116 },
      { name: "Haloalkanes and Haloarenes", years: "2010–2024", count: 78 },
      { name: "Alcohols, Phenols and Ethers", years: "2010–2024", count: 94 },
      { name: "Aldehydes, Ketones and Carboxylic Acids", years: "2010–2024", count: 122 },
      { name: "Amines & Nitrogen Compounds", years: "2010–2024", count: 86 },
      { name: "Biomolecules", years: "2010–2024", count: 74 },
    ],
  },
];

const samplePyq = {
  exam: "NEET 2024 (Re-NEET Shift)",
  subject: "Physics · Ray Optics",
  question: "A convex lens of focal length 20 cm is placed in contact with a concave lens of focal length 30 cm. What is the power and nature of the combination?",
  options: [
    { label: "A", text: "+1.67 D, Converging", isCorrect: true },
    { label: "B", text: "-1.67 D, Diverging", isCorrect: false },
    { label: "C", text: "+5.0 D, Converging", isCorrect: false },
    { label: "D", text: "-5.0 D, Diverging", isCorrect: false },
  ],
  explanation: `Step 1: Formula for effective focal length of two lenses in contact is 1/F = 1/f₁ + 1/f₂.
Step 2: Here f₁ = +20 cm = +0.2 m (convex), and f₂ = -30 cm = -0.3 m (concave).
Step 3: 1/F = 1/20 - 1/30 = (3 - 2)/60 = 1/60 cm⁻¹.
Step 4: Effective focal length F = +60 cm = +0.6 m.
Step 5: Power P = 1 / F(in meters) = 1 / 0.6 = +1.67 Dioptres.
Since the combined focal length and power are positive (+), the lens combination acts as a Converging lens.
Therefore, Option (A) is the correct answer.`,
  similarConcept: "Practise Similar Question: 'Two thin lenses of power +3.5 D and -1.5 D are placed in contact. Find the equivalent focal length.'",
};

const pyqFaqs = [
  {
    q: "How should students use chapter-wise NEET PYQs for revision?",
    a: "The most effective approach is to complete the NCERT theory for a chapter, solve all previous year questions for that specific topic to understand question trends, identify incorrect answers, and then practice similar questions to eliminate recurring mistakes.",
  },
  {
    q: "Which years of NEET Previous Year Questions are covered?",
    a: "Indraprastha NEET Academy covers over 15+ years of past medical entrance examinations, from AIPMT/NEET 2010 up through NEET 2024 (including Manipur re-exams and second shifts), structured strictly chapter by chapter.",
  },
  {
    q: "Are step-by-step solutions and explanations provided for every PYQ?",
    a: "Yes. Every single PYQ is paired with a clear, methodical English explanation using clean scientific Unicode characters (no broken LaTeX or symbols) that walks through the fundamental NCERT principle, calculation steps, and final option deduction.",
  },
  {
    q: "Can I practice PYQs in a timed test format?",
    a: "Yes. Students can either practice PYQs in self-paced practice mode with instant answers or take them in timed CBT test mode on both our web portal and Android mobile application.",
  },
  {
    q: "How does similar-question practice help when I get a PYQ wrong?",
    a: "When you mark a wrong option on a PYQ, our system immediately suggests a similar question testing the identical concept. This cements the concept in memory so you don't repeat the error on exam day.",
  },
];

export default function NeetPyqChapterwisePage() {
  return (
    <>
      <Navbar activePage="pyqs" />

      <main style={{ minHeight: "100vh", backgroundColor: "var(--cream-bg, #FAF6F0)", color: "var(--text-main, #140A03)" }}>
        {/* Breadcrumb Navigation */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 20px 0", fontSize: "13px", color: "var(--text-muted)" }}>
          <Link href="/" style={{ color: "#E55200", textDecoration: "none" }}>Home</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--text-main)", fontWeight: 700 }}>NEET PYQ Chapterwise</span>
        </div>

        {/* Hero Section */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "36px 20px 48px" }}>
          <div style={{ textAlign: "center", maxWidth: "920px", margin: "0 auto" }}>
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
              <span>📜 15+ YEARS NEET &amp; AIPMT ARCHIVE</span>
              <span>•</span>
              <span>100% NCERT CHAPTERWISE</span>
            </div>

            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "18px", color: "var(--text-main)" }}>
              NEET Previous Year Questions (PYQs) Chapterwise for <span style={{ color: "#E55200" }}>NEET 2027</span>
            </h1>

            <p style={{ fontSize: "17px", lineHeight: 1.6, color: "var(--text-muted)", marginBottom: "32px", maxWidth: "780px", margin: "0 auto 32px" }}>
              Practise NEET previous year questions chapterwise for Physics, Chemistry and Biology. Explore available PYQs by subject, chapter and exam year with step-by-step scientific explanations and similar-question practice on Indraprastha NEET Academy.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap", marginBottom: "40px" }}>
              <Link
                href="/pyqs"
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
                <span>Access Interactive PYQ Solve Portal →</span>
              </Link>
              <Link
                href="/practice"
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
                <span>📚 Explore Topic Practice Sets</span>
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "16px",
                padding: "24px",
                borderRadius: "18px",
                backgroundColor: "var(--cream-card, #FFFFFF)",
                border: "1px solid var(--border-light, #EDE3DA)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
              }}
            >
              <div>
                <div style={{ fontSize: "32px", fontWeight: 900, color: "#10B981" }}>3,200+</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>Biology PYQs</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Botany &amp; Zoology 38 Chapters</div>
              </div>
              <div>
                <div style={{ fontSize: "32px", fontWeight: 900, color: "#3B82F6" }}>2,400+</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>Physics PYQs</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Mechanics to Modern Physics</div>
              </div>
              <div>
                <div style={{ fontSize: "32px", fontWeight: 900, color: "#F59E0B" }}>2,600+</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>Chemistry PYQs</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Physical, Inorganic &amp; Organic</div>
              </div>
              <div>
                <div style={{ fontSize: "32px", fontWeight: 900, color: "#E55200" }}>100%</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>Step-by-Step Derivations</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>With Similar Question Engine</div>
              </div>
            </div>
          </div>
        </section>

        {/* Working Demonstrator Sample PYQ Card */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 48px" }}>
          <div
            style={{
              padding: "32px",
              borderRadius: "20px",
              backgroundColor: "var(--cream-card, #FFFFFF)",
              border: "1.5px solid var(--border-light, #EDE3DA)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ padding: "4px 10px", borderRadius: "6px", backgroundColor: "rgba(229, 82, 0, 0.12)", color: "#E55200", fontSize: "12px", fontWeight: 800 }}>
                  {samplePyq.exam}
                </span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 700 }}>
                  {samplePyq.subject}
                </span>
              </div>
              <span style={{ fontSize: "11px", color: "#10B981", fontWeight: 800, backgroundColor: "rgba(16, 185, 129, 0.1)", padding: "3px 8px", borderRadius: "4px" }}>
                ✓ Audited Scientific Solution
              </span>
            </div>

            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-main)", lineHeight: 1.5, marginBottom: "20px" }}>
              {samplePyq.question}
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "10px", marginBottom: "24px" }}>
              {samplePyq.options.map((opt) => (
                <div
                  key={opt.label}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: opt.isCorrect ? "2px solid #10B981" : "1px solid var(--border-light, #EDE3DA)",
                    backgroundColor: opt.isCorrect ? "rgba(16, 185, 129, 0.08)" : "transparent",
                    color: opt.isCorrect ? "#065F46" : "var(--text-main)",
                    fontWeight: opt.isCorrect ? 800 : 600,
                    fontSize: "14px",
                  }}
                >
                  <strong>({opt.label})</strong> {opt.text} {opt.isCorrect && "✓"}
                </div>
              ))}
            </div>

            <div style={{ padding: "20px", borderRadius: "12px", backgroundColor: "rgba(229, 82, 0, 0.04)", border: "1px solid rgba(229, 82, 0, 0.15)", marginBottom: "16px" }}>
              <strong style={{ fontSize: "13px", color: "#E55200", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                Methodical Step-by-Step Derivation:
              </strong>
              <pre
                style={{
                  fontFamily: "inherit",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  color: "var(--text-main)",
                  whiteSpace: "pre-wrap",
                  margin: 0,
                }}
              >
                {samplePyq.explanation}
              </pre>
            </div>

            <div style={{ padding: "14px 18px", borderRadius: "10px", backgroundColor: "rgba(59, 130, 246, 0.08)", border: "1px solid rgba(59, 130, 246, 0.2)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ fontSize: "13px", color: "#1E40AF" }}>
                💡 <strong>Differentiator:</strong> {samplePyq.similarConcept}
              </div>
              <Link href="/pyqs" style={{ fontSize: "12px", fontWeight: 800, color: "#2563EB", textDecoration: "none" }}>
                Practise More in PYQ Portal →
              </Link>
            </div>
          </div>
        </section>

        {/* Subject-Wise Chapters Archive Directory */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 48px" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span style={{ color: "#E55200", fontWeight: 800, fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
              COMPLETE CHAPTER-WISE PYQ DIRECTORY
            </span>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-main)", marginTop: "6px" }}>
              Browse PYQs Across Biology, Physics &amp; Chemistry
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {pyqSubjects.map((sub) => (
              <div
                key={sub.id}
                style={{
                  padding: "32px",
                  borderRadius: "20px",
                  backgroundColor: "var(--cream-card, #FFFFFF)",
                  border: "1px solid var(--border-light, #EDE3DA)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "28px" }}>{sub.icon}</span>
                    <div>
                      <h3 style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                        {sub.name}
                      </h3>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        {sub.totalChapters} • {sub.pyqCount} • Weightage: {sub.weightage}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/pyqs?subject=${encodeURIComponent(sub.name.split(" ")[0])}`}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      backgroundColor: sub.accentColor,
                      color: "#FFFFFF",
                      fontSize: "12px",
                      fontWeight: 800,
                      textDecoration: "none",
                    }}
                  >
                    Solve {sub.name.split(" ")[0]} PYQs →
                  </Link>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                  {/* Class 11 Column */}
                  <div>
                    <h4 style={{ fontSize: "13px", fontWeight: 800, color: "#E55200", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>
                      Class 11 Chapters:
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {sub.class11.map((ch) => (
                        <div
                          key={ch.name}
                          style={{
                            padding: "10px 14px",
                            borderRadius: "8px",
                            backgroundColor: "rgba(229, 82, 0, 0.03)",
                            border: "1px solid var(--border-light, #EDE3DA)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "13px",
                          }}
                        >
                          <span style={{ fontWeight: 700, color: "var(--text-main)" }}>{ch.name}</span>
                          <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{ch.count} Qs</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Class 12 Column */}
                  <div>
                    <h4 style={{ fontSize: "13px", fontWeight: 800, color: "#E55200", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>
                      Class 12 Chapters:
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {sub.class12.map((ch) => (
                        <div
                          key={ch.name}
                          style={{
                            padding: "10px 14px",
                            borderRadius: "8px",
                            backgroundColor: "rgba(229, 82, 0, 0.03)",
                            border: "1px solid var(--border-light, #EDE3DA)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "13px",
                          }}
                        >
                          <span style={{ fontWeight: 700, color: "var(--text-main)" }}>{ch.name}</span>
                          <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{ch.count} Qs</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 20px 60px" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <span style={{ color: "#E55200", fontWeight: 800, fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
              QUESTIONS &amp; ANSWERS
            </span>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-main)", marginTop: "6px" }}>
              Frequently Asked Questions About Chapterwise NEET PYQs
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {pyqFaqs.map((faq) => (
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
                mainEntity: pyqFaqs.map((f) => ({
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

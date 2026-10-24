"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../legal-documents/legal.css";

export default function DisclaimerPage() {
  return (
    <div className="legal-page-wrapper">
      {/* Universal Navbar */}
      <Navbar activePage="legal" />

      {/* Main Content Area */}
      <main className="legal-main doc-detail-container">
        {/* Back Navigation */}
        <div className="doc-back-nav">
          <Link href="/legal-documents" className="doc-back-link">
            <span>←</span> Back to Legal Documents
          </Link>
        </div>

        {/* Disclaimer Document Card */}
        <article className="doc-card-body">
          <div className="legal-card-top-accent" />

          {/* Eyebrow & Main Title */}
          <div className="doc-eyebrow">
            <span>📄</span> DISCLAIMER
          </div>
          <h1 className="doc-main-heading">Educational Content &amp; Exam Performance Disclaimer</h1>
          <p className="doc-intro-p">
            Important legal disclaimers regarding the educational materials, simulated test patterns, AI rank predictions, and student preparation results provided by Indraprastha NEET Academy.
          </p>

          {/* 1. General Disclaimer */}
          <section className="doc-section">
            <h2 className="doc-section-title">1. General Educational Disclaimer</h2>
            <p className="doc-p">
              The services, test series, analytical models, rank predictors, and study materials provided by Indraprastha NEET Academy are offered strictly on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis for educational and supplementary test preparation purposes.
            </p>
          </section>

          {/* 2. No Score or Rank Guarantee */}
          <section className="doc-section">
            <h2 className="doc-section-title">2. No Examination Result Guarantee</h2>
            <p className="doc-p">
              While our pedagogic methods, NCERT line-by-line analyses, and simulated tests are designed with maximum alignment to official NEET examination patterns, enrollment in any batch or program does not guarantee selection, specific scores, or government medical college seats. Individual outcomes depend entirely on candidate dedication, regular practice, and actual examination day performance.
            </p>
          </section>

          {/* 3. AI Rank Predictor Disclaimer */}
          <section className="doc-section">
            <h2 className="doc-section-title">3. AI Rank Predictor &amp; Score Estimations</h2>
            <p className="doc-p">
              Our AI Rank Predictor generates percentile and rank estimates based on historical statistical trends, previous years&apos; cutoffs, and normalized difficulty heuristics. These estimations are strictly for indicative guidance and planning purposes and do not represent official examination scorecards or counselling allotments.
            </p>
          </section>

          {/* 4. Third-Party Content & External Portals */}
          <section className="doc-section">
            <h2 className="doc-section-title">4. Third-Party Links &amp; Examination Notices</h2>
            <p className="doc-p">
              References to external examination bodies (such as NMC, MCC) and external informational links are provided for student convenience. Indraprastha NEET Academy does not claim official affiliation with national examination bodies or government regulatory authorities unless explicitly stated.
            </p>
          </section>

          {/* 5. Contact */}
          <section className="doc-section">
            <h2 className="doc-section-title">5. Grievances &amp; Legal Notices</h2>
            <p className="doc-p">
              For any clarification regarding academic disclaimers, please reach out to our administration desk:
            </p>
            <div className="doc-contact-highlight">
              <span>✉️</span>
              <div>
                <span>Support Desk: </span>
                <a href="mailto:contact@indraprasthaneetacademy.com">contact@indraprasthaneetacademy.com</a>
              </div>
            </div>
          </section>
        </article>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

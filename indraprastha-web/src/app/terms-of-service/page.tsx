"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../legal-documents/legal.css";

export default function TermsOfServicePage() {
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

        {/* Terms Document Card */}
        <article className="doc-card-body">
          <div className="legal-card-top-accent" />

          {/* Eyebrow & Main Title */}
          <div className="doc-eyebrow">
            <span>⚖️</span> TERMS OF SERVICE
          </div>
          <h1 className="doc-main-heading">Agreement &amp; Terms for Using Our Platform</h1>
          <p className="doc-intro-p">
            By using Indraprastha NEET Academy, you agree to abide by these terms and conditions. Please read carefully before proceeding.
          </p>

          {/* 1. Agreement & Acceptance */}
          <section className="doc-section">
            <h2 className="doc-section-title">1. Agreement &amp; Acceptance</h2>
            <p className="doc-p">
              By downloading, installing, or using the Indraprastha NEET Academy mobile application, web portal, or related services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you must not use the Platform.
            </p>
          </section>

          {/* 2. User Eligibility & Registration */}
          <section className="doc-section">
            <h2 className="doc-section-title">2. User Eligibility &amp; Registration</h2>
            <ul className="doc-list">
              <li>
                <strong>Minimum Age:</strong> 13 years. Users under 18 must have parental or legal guardian consent.
              </li>
              <li>
                <strong>Accurate Information:</strong> You must provide truthful, complete, and verifiable information during signup.
              </li>
              <li>
                <strong>Account Security:</strong> You are responsible for maintaining confidentiality of your login credentials and one-time passcodes.
              </li>
              <li>
                <strong>Valid Phone Number:</strong> Required for secure SMS OTP verification and session authentication.
              </li>
            </ul>
          </section>

          {/* 3. Permitted Use */}
          <section className="doc-section">
            <h2 className="doc-section-title">3. Permitted Use</h2>
            <p className="doc-p">You agree to use the Platform solely for educational and personal preparation purposes:</p>
            <ul className="doc-list">
              <li>Access course materials, mock test series, and practice questions</li>
              <li>Track your learning progress, percentile, and rank analytics</li>
              <li>Watch educational videos and conceptual live/recorded lectures</li>
              <li>Solve practice questions, NCERT exemplars, and chapter quizzes</li>
              <li>Download content for personal offline study (where specifically permitted)</li>
            </ul>
          </section>

          {/* 4. Prohibited Activities */}
          <section className="doc-section">
            <h2 className="doc-section-title">4. Prohibited Activities</h2>
            <p className="doc-p">You agree NOT to engage in any of the following activities:</p>
            <ul className="doc-list">
              <li>Reproduce, redistribute, republish, or commercially sell course content</li>
              <li>Reverse-engineer, decompile, or modify the mobile application or web source</li>
              <li>Share login credentials, passwords, or multi-login accounts with others</li>
              <li>Attempt to hack, probe, or breach platform security systems and servers</li>
              <li>Upload viruses, malware, trojans, or harmful automated code</li>
              <li>Use bots, automated scrapers, or cheating scripts to artificially inflate test scores</li>
              <li>Impersonate other students, faculty members, or academy administrators</li>
              <li>Use the app or platform for commercial promotional purposes without prior written consent</li>
              <li>Violate copyright, intellectual property, or proprietary rights</li>
              <li>Engage in harassment, cyberbullying, hate speech, or abusive behavior in community forums</li>
              <li>Post illegal, infringing, or defamatory content</li>
            </ul>
          </section>

          {/* 5. Intellectual Property Rights */}
          <section className="doc-section">
            <h2 className="doc-section-title">5. Intellectual Property Rights</h2>
            <p className="doc-p">
              All content on the Platform—including course materials, videos, books, practice questions, pedagogical frameworks, logos, trademarks, and design elements—is the exclusive intellectual property of Indraprastha NEET Academy. You may not reproduce, distribute, or modify this content without express written authorization.
            </p>
          </section>

          {/* 6. Limitation of Liability */}
          <section className="doc-section">
            <h2 className="doc-section-title">6. Limitation of Liability</h2>
            <p className="doc-p">
              The Platform is provided on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis. Indraprastha NEET Academy is not liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform, including loss of profits, data, or services.
            </p>
          </section>

          {/* 7. Disclaimer of Warranties */}
          <section className="doc-section">
            <h2 className="doc-section-title">7. Disclaimer of Warranties</h2>
            <p className="doc-p">
              We do not warrant that the Platform will be uninterrupted, error-free, or entirely bug-free at all times. Use of the service is at your sole risk. Indraprastha NEET Academy makes no warranties regarding the absolute accuracy or exhaustive completeness of external question solutions.
            </p>
          </section>

          {/* 8. Account Suspension & Termination */}
          <section className="doc-section">
            <h2 className="doc-section-title">8. Account Suspension &amp; Termination</h2>
            <p className="doc-p">
              We reserve the right to immediately suspend or permanently terminate accounts that violate these Terms, provide false identification, engage in test-tampering or fraud, or attempt unauthorized system access.
            </p>
          </section>

          {/* 9. Changes to These Terms */}
          <section className="doc-section">
            <h2 className="doc-section-title">9. Changes to These Terms</h2>
            <p className="doc-p">
              We may update these Terms anytime to reflect regulatory or academic changes. Material modifications will be notified via in-app notification and email. Continued use of the Platform after changes constitutes acceptance of the amended terms.
            </p>
          </section>

          {/* 10. Jurisdiction & Dispute Resolution */}
          <section className="doc-section">
            <h2 className="doc-section-title">10. Jurisdiction &amp; Dispute Resolution</h2>
            <p className="doc-p">
              These Terms are governed strictly by the laws of India. Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction of the competent courts of India.
            </p>
          </section>

          {/* 11. Contact Information */}
          <section className="doc-section">
            <h2 className="doc-section-title">11. Contact Information</h2>
            <p className="doc-p">
              For questions regarding these Terms of Service, compliance queries, or reporting violations, please contact us:
            </p>
            <div className="doc-contact-highlight">
              <span>✉️</span>
              <div>
                <span>Official Legal Contact: </span>
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

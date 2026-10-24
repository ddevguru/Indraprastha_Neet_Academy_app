"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./legal.css";

export default function LegalDocumentsPage() {
  return (
    <div className="legal-page-wrapper">
      {/* Top Universal Navbar */}
      <Navbar activePage="legal" />

      {/* Main Content Area */}
      <main className="legal-main">
        {/* Header Hero */}
        <section className="legal-hero">
          <div className="legal-badge-pill">
            <span>🛡️</span> LEGAL COMPLIANCE &amp; GOVERNANCE
          </div>
          <h1 className="legal-title">Legal Documents</h1>
          <p className="legal-subtitle">
            Important policies, agreements, and governance frameworks for using Indraprastha NEET Academy digital services and learning platform.
          </p>
        </section>

        {/* 4 Cards Grid */}
        <div className="legal-cards-grid">
          {/* Card 1: Privacy Policy */}
          <div className="legal-card">
            <div className="legal-card-top-accent" />
            <div className="legal-card-header">
              <div className="legal-card-icon-wrap" role="img" aria-label="Shield Icon">
                🛡️
              </div>
              <span className="legal-date-tag">Updated June 15, 2026</span>
            </div>
            <h2 className="legal-card-title">Privacy Policy</h2>
            <p className="legal-card-desc">
              Learn how we collect, use, and protect your personal data, credentials, and academic analytics with strict confidentiality.
            </p>
            <Link href="/privacy-policy" className="legal-card-action">
              Read Document <span>→</span>
            </Link>
          </div>

          {/* Card 2: Terms of Service */}
          <div className="legal-card">
            <div className="legal-card-top-accent" />
            <div className="legal-card-header">
              <div className="legal-card-icon-wrap" role="img" aria-label="Gavel Icon">
                ⚖️
              </div>
              <span className="legal-date-tag">Updated June 15, 2026</span>
            </div>
            <h2 className="legal-card-title">Terms of Service</h2>
            <p className="legal-card-desc">
              Understand the rules, conditions, code of conduct, and academic integrity policies for using our platform.
            </p>
            <Link href="/terms-of-service" className="legal-card-action">
              Read Document <span>→</span>
            </Link>
          </div>

          {/* Card 3: Cookies Policy */}
          <div className="legal-card">
            <div className="legal-card-top-accent" />
            <div className="legal-card-header">
              <div className="legal-card-icon-wrap" role="img" aria-label="Cookie Icon">
                🍪
              </div>
              <span className="legal-date-tag">Updated June 15, 2026</span>
            </div>
            <h2 className="legal-card-title">Cookies Policy</h2>
            <p className="legal-card-desc">
              Information about how we use cookies, session storage, and tracking technologies to optimize your test-taking speed and security.
            </p>
            <Link href="/cookies-policy" className="legal-card-action">
              Read Document <span>→</span>
            </Link>
          </div>

          {/* Card 4: Disclaimer */}
          <div className="legal-card">
            <div className="legal-card-top-accent" />
            <div className="legal-card-header">
              <div className="legal-card-icon-wrap" role="img" aria-label="Disclaimer Icon">
                📄
              </div>
              <span className="legal-date-tag">Updated June 15, 2026</span>
            </div>
            <h2 className="legal-card-title">Disclaimer</h2>
            <p className="legal-card-desc">
              Important disclaimers about the use of our educational content, simulated test patterns, AI rank estimations, and study resources.
            </p>
            <Link href="/disclaimer" className="legal-card-action">
              Read Document <span>→</span>
            </Link>
          </div>
        </div>

        {/* Important Information Box */}
        <div className="legal-important-box">
          <h3 className="legal-important-title">
            <span>ℹ️</span> Important Information
          </h3>
          <ul className="legal-important-list">
            <li>By using our platform, you agree to these legal documents and policies.</li>
            <li>We may update these policies anytime. Continued use means acceptance of changes.</li>
            <li>
              For any concerns or disputes, contact us at{" "}
              <a href="mailto:contact@indraprasthaneetacademy.com">contact@indraprasthaneetacademy.com</a>
            </li>
            <li>These policies are governed by the laws of India.</li>
          </ul>
        </div>

        {/* Questions or Concerns Section */}
        <div className="legal-questions-box">
          <h3 className="legal-questions-title">Questions or Concerns?</h3>
          <p className="legal-questions-desc">
            If you have any questions regarding these legal documents or your personal data, please do not hesitate to contact our legal and grievance cell.
          </p>
          <div className="legal-questions-actions">
            <a href="mailto:contact@indraprasthaneetacademy.com" className="btn-legal-primary">
              <span>✉️</span> Email Us
            </a>
            <a href="tel:+917703033682" className="btn-legal-outline">
              <span>📞</span> Contact Us
            </a>
          </div>
        </div>
      </main>

      {/* Unified Global Footer */}
      <Footer />
    </div>
  );
}

"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../legal-documents/legal.css";

export default function CookiesPolicyPage() {
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

        {/* Policy Document Card */}
        <article className="doc-card-body">
          <div className="legal-card-top-accent" />

          {/* Eyebrow & Main Title */}
          <div className="doc-eyebrow">
            <span>🍪</span> COOKIES POLICY
          </div>
          <h1 className="doc-main-heading">How cookies and similar technologies are used</h1>
          <p className="doc-intro-p">
            Cookies help the platform remember sessions, improve performance, and understand how visitors use the website.
          </p>

          {/* Section 1 */}
          <section className="doc-section">
            <h2 className="doc-section-title">What cookies do</h2>
            <p className="doc-p">
              Cookies are small data files stored in your browser. They can help us keep you signed in, remember preferences, measure usage, and maintain secure sessions across your test sessions and dashboard.
            </p>
          </section>

          {/* Section 2 */}
          <section className="doc-section">
            <h2 className="doc-section-title">Types we may use</h2>
            <ul className="doc-list">
              <li>
                <strong>Essential cookies:</strong> Required for login, authentication tokens, and uninterrupted test session continuity.
              </li>
              <li>
                <strong>Preference cookies:</strong> Store your theme settings (e.g. Dark Obsidian mode), cohort choices, and language preferences.
              </li>
              <li>
                <strong>Analytics cookies:</strong> Used anonymously to understand site navigation patterns, test loading speed, and optimize platform reliability.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="doc-section">
            <h2 className="doc-section-title">Managing cookies</h2>
            <p className="doc-p">
              You can manage or delete cookies through your browser settings at any time. Please note that disabling essential cookies may affect login, account access, or certain critical exam-taking features.
            </p>
            <div className="doc-contact-highlight">
              <span>✉️</span>
              <div>
                <span>Queries regarding cookie telemetry? Contact us: </span>
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

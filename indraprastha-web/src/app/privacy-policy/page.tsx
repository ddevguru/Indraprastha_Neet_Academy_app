"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../legal-documents/legal.css";

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page-wrapper">
      {/* Universal Navbar */}
      <Navbar activePage="legal" />

      {/* Main Content Area */}
      <main className="legal-main doc-detail-container">
        {/* Back Link */}
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
            <span>🛡️</span> PRIVACY POLICY
          </div>
          <h1 className="doc-main-heading">How student and visitor information is handled</h1>
          <p className="doc-intro-p">
            This page explains the basic information we collect, why it is collected, and how it may be used while operating the platform.
          </p>

          {/* Section 1 */}
          <section className="doc-section">
            <h2 className="doc-section-title">Information we collect</h2>
            <p className="doc-p">
              We may collect details such as your name, email address, phone number, login information, course activity, and other details you submit while using the website or contacting the academy.
            </p>
          </section>

          {/* Section 2 */}
          <section className="doc-section">
            <h2 className="doc-section-title">How we use information</h2>
            <ul className="doc-list">
              <li>To create and manage your student account</li>
              <li>To provide access to courses, notes, tests, and mentorship</li>
              <li>To improve content quality, support, and platform reliability</li>
              <li>To communicate important updates, support responses, or service notices</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="doc-section">
            <h2 className="doc-section-title">Data sharing</h2>
            <p className="doc-p">
              We do not sell personal information. Data may be shared only with service providers or infrastructure partners when required to run the platform, process services, or comply with legal obligations.
            </p>
          </section>

          {/* Section 4 */}
          <section className="doc-section">
            <h2 className="doc-section-title">Contact</h2>
            <p className="doc-p">
              For privacy-related requests, grievance redressal, or data modification inquiries, please contact our data protection team:
            </p>
            <div className="doc-contact-highlight">
              <span>✉️</span>
              <div>
                <span>Official Privacy Contact: </span>
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

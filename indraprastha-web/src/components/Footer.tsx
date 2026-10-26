"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-section has-dark-texture" id="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-top-grid">
          {/* Col 1: Bio */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Image
                src="/logo_app.jpeg"
                alt="Indraprastha Logo"
                width={36}
                height={36}
                style={{ borderRadius: "7px", objectFit: "cover" }}
              />
              <div>
                <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "16px", fontWeight: "900", color: "#FFFFFF" }}>
                  IndraprasthaNEET
                </span>
                <span style={{ fontSize: "9px", color: "var(--orange)", fontWeight: "800", display: "block", letterSpacing: "1px" }}>
                  ACADEMY
                </span>
              </div>
            </div>

            <p className="footer-bio-text">
              Pioneering India&apos;s top NEET aspirants with rigorous cognitive analytics, strategy-led NCERT exemplar modules, and AIR Top 100 Producing Faculty.
            </p>

            <span className="footer-badge-pill">🏆 AIR Top 100 Producing Faculty</span>
          </div>

          {/* Col 2: Quick Access & Academic Links */}
          <div>
            <h4 className="footer-col-title">Quick Access</h4>
            <ul className="footer-links-list">
              <li><Link href="/">Home Overview</Link></li>
              <li><Link href="/neet-test-series" style={{ color: "var(--orange)", fontWeight: 700 }}>NEET Test Series 2027</Link></li>
              <li><Link href="/neet-pyq-chapterwise" style={{ color: "var(--orange)", fontWeight: 700 }}>NEET PYQ Chapterwise</Link></li>
              <li><Link href="/target-batches">Target Batches 2026/27</Link></li>
              <li><Link href="/ai-rank-predictor">AI Rank Predictor</Link></li>
              <li><Link href="/methodology">Indraprastha Method</Link></li>
              <li><Link href="/legal-documents">Legal Documents</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/cookies-policy">Cookies Policy</Link></li>
            </ul>
          </div>

          {/* Col 3: Helpline & Campus */}
          <div>
            <h4 className="footer-col-title">Helpline &amp; Support</h4>
            <div className="footer-contact-item">
              <span>📞</span>
              <div>
                <a href="tel:+917703033682" style={{ color: "#FFFFFF", textDecoration: "none", fontWeight: 700 }}>
                  +91 77030 33682
                </a>
                <div style={{ fontSize: "11px", color: "#8C786B" }}>WhatsApp &amp; Phone Support</div>
              </div>
            </div>

            <div className="footer-contact-item">
              <span>✉️</span>
              <div>
                <a href="mailto:contact@indraprasthaneetacademy.com" style={{ color: "#FFFFFF", textDecoration: "none" }}>
                  contact@indraprasthaneetacademy.com
                </a>
                <div style={{ fontSize: "11px", color: "#8C786B" }}>Official Academy Desk</div>
              </div>
            </div>

            <div className="footer-contact-item">
              <span>⏰</span>
              <div>
                <div style={{ color: "#FFFFFF" }}>Mon - Sat: 08:00 AM - 08:00 PM</div>
                <div style={{ fontSize: "11px", color: "#8C786B" }}>Plot 4, Sector 62, Noida - 201309</div>
              </div>
            </div>
          </div>

          {/* Col 4: Digital Study App */}
          <div>
            <h4 className="footer-col-title">Digital Study App</h4>
            <p style={{ fontSize: "12px", color: "#A38E82", marginBottom: "14px", lineHeight: 1.5 }}>
              Solve 10,000+ NCERT MCQs, take simulated NEET mock tests, and track your AIR live.
            </p>
            <div className="app-store-btns" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <a
                  href="https://play.google.com/store/apps/details?id=com.indraprastha.neetacademy&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-app-store-badge"
                >
                  <span>▶</span>
                  <div>
                    <span className="store-badge-sub">GET IT ON</span>
                    <span className="store-badge-title">Google Play</span>
                  </div>
                </a>

                <a href="#app" className="btn-app-store-badge">
                  <span>🍎</span>
                  <div>
                    <span className="store-badge-sub">DOWNLOAD ON THE</span>
                    <span className="store-badge-title">App Store</span>
                  </div>
                </a>
              </div>

              {/* QR Scan Mini Badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "6px 12px 6px 8px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(229, 82, 0, 0.25)",
                  borderRadius: "10px",
                  width: "fit-content",
                }}
              >
                <Image
                  src="/app_qr_code.png"
                  alt="Indraprastha NEET App QR"
                  width={42}
                  height={42}
                  style={{
                    borderRadius: "6px",
                    backgroundColor: "#FFFFFF",
                    padding: "2px",
                    display: "block",
                  }}
                />
                <div>
                  <span style={{ fontSize: "9px", fontWeight: 800, color: "#FF7A1A", textTransform: "uppercase", display: "block" }}>
                    Scan QR
                  </span>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#FFFFFF", display: "block" }}>
                    Install Play Store App
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>© 2026 Indraprastha NEET Academy. All academic rights reserved.</div>
          <div className="footer-legal-links">
            <Link href="/legal-documents" style={{ color: "var(--orange)", fontWeight: 700 }}>
              Legal Documents
            </Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/cookies-policy">Cookies Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

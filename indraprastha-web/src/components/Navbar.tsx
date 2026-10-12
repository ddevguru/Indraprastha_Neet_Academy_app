"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavbarProps {
  activePage?: "home" | "target-batches" | "ai-rank-predictor" | "methodology" | "legal";
  currentTheme?: "light" | "dark";
  onThemeToggle?: (newTheme: "light" | "dark") => void;
}

export default function Navbar({ activePage, currentTheme, onThemeToggle }: NavbarProps) {
  const [theme, setTheme] = useState<"light" | "dark">(currentTheme || "light");

  useEffect(() => {
    // Default to light mode
    const savedTheme = localStorage.getItem("indraprastha_theme") as "light" | "dark" | null;
    const initialTheme = currentTheme || savedTheme || "light";
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.body.classList.add("dark-theme");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [currentTheme]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("indraprastha_theme", nextTheme);
    if (nextTheme === "dark") {
      document.body.classList.add("dark-theme");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      document.documentElement.setAttribute("data-theme", "light");
    }
    if (onThemeToggle) {
      onThemeToggle(nextTheme);
    }
  };

  return (
    <nav className="pred-navbar" role="navigation" aria-label="Main Navigation">
      <div className="pred-navbar-inner">
        {/* Brand Logo */}
        <Link href="/" className="navbar-brand" aria-label="Indraprastha NEET Academy Home">
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
        </Link>

        {/* Navigation Links */}
        <ul className="pred-nav-links">
          <li>
            <Link
              href="/"
              className={`pred-nav-link ${activePage === "home" ? "active-pill" : ""}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/target-batches"
              className={`pred-nav-link ${activePage === "target-batches" ? "active-pill" : ""}`}
            >
              Target Batches
            </Link>
          </li>
          <li>
            <Link
              href="/ai-rank-predictor"
              className={`pred-nav-link ${activePage === "ai-rank-predictor" ? "active-pill" : ""}`}
            >
              AI Rank Predictor
            </Link>
          </li>
          <li>
            <Link
              href="/methodology"
              className={`pred-nav-link ${activePage === "methodology" ? "active-pill" : ""}`}
            >
              Methodology
            </Link>
          </li>
          <li>
            <Link href="/#app" className="pred-nav-link">
              Mobile App
            </Link>
          </li>
          <li>
            <a href="tel:+917203055682" className="pred-nav-link">
              Talk to Support
            </a>
          </li>
        </ul>

        {/* Right Action Buttons */}
        <div className="pred-nav-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title="Toggle Light / Dark Mode"
            aria-label="Toggle Theme"
          >
            <span style={{ whiteSpace: "nowrap" }}>
              {theme === "light" ? "☀️ / 🌙" : "🌙 / ☀️"}
            </span>
          </button>
          <a href="tel:+917203055682" className="pred-phone-pill">
            📞 +91 72030 55682
          </a>
          <a href="/target-batches#courses" className="btn-enroll-nav btn-orange-leather">
            <span>Book Free Call →</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

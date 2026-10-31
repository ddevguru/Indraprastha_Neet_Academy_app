"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

interface SlideItem {
  src: string;
  alt: string;
  title: string;
}

const SLIDES: SlideItem[] = [
  {
    src: "/one_to_one_mentorship_banner.png",
    alt: "1-to-1 Mentorship By Dr Rahul Kumar – For Premium Users",
    title: "1-to-1 Mentorship By Dr Rahul Kumar",
  },
  {
    src: "/doubt_solving_community_banner.png",
    alt: "Doubt Solving Community – Helping to overcome doubts while learning",
    title: "Doubt Solving Community",
  },
  {
    src: "/cbt_mode_banner.png",
    alt: "Practice in CBT Mode – Experience CBT Mode every day on Indraprastha NEET Academy",
    title: "Practice in CBT Mode",
  },
  {
    src: "/master_mistakes_banner.png",
    alt: "Don't Just Find Your Mistakes. Master Them – Solve Similar Questions after every attempt",
    title: "Master Your Mistakes with Similar Questions",
  },
];

const AUTO_SLIDE_INTERVAL = 3500; // 3.5 seconds per slide for guaranteed, lively auto-play

export default function MentorshipBannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
      setProgressKey((k) => k + 1);
    }, AUTO_SLIDE_INTERVAL);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgressKey((k) => k + 1);
    resetTimer();
  }, [resetTimer]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    setProgressKey((k) => k + 1);
    resetTimer();
  }, [resetTimer]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgressKey((k) => k + 1);
    resetTimer();
  }, [resetTimer]);

  // Guaranteed Automatic Slider: Starts on mount and continuously auto-rotates
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 12px 36px rgba(0, 0, 0, 0.16)",
        backgroundColor: "#0F0905",
        border: "1.5px solid rgba(229, 82, 0, 0.28)",
        userSelect: "none",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Features Showcase Slider"
    >
      {/* Visual Live Auto-Play Progress Bar (Top) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          zIndex: 5,
          overflow: "hidden",
        }}
      >
        <div
          key={progressKey}
          style={{
            height: "100%",
            backgroundColor: "#E55200",
            boxShadow: "0 0 8px #E55200",
            width: "0%",
            animation: `slideProgress ${AUTO_SLIDE_INTERVAL}ms linear forwards`,
          }}
        />
      </div>


      {/* Slides Container */}
      <div
        style={{
          display: "flex",
          width: `${SLIDES.length * 100}%`,
          transform: `translateX(-${(currentIndex * 100) / SLIDES.length}%)`,
          transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      >
        {SLIDES.map((slide, idx) => (
          <div
            key={slide.src}
            style={{
              width: `${100 / SLIDES.length}%`,
              position: "relative",
              flexShrink: 0,
              backgroundColor: "#0F0905",
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              width={2048}
              height={1152}
              unoptimized={true}
              priority={idx === 0}
              quality={100}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "contain",
                imageRendering: "-webkit-optimize-contrast",
              }}
            />
          </div>
        ))}
      </div>

      {/* Left Arrow Button */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        style={{
          position: "absolute",
          top: "50%",
          left: "14px",
          transform: "translateY(-50%)",
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
          border: "1.5px solid rgba(255, 255, 255, 0.35)",
          color: "#FFFFFF",
          fontSize: "20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
          zIndex: 4,
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.4)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#E55200";
          e.currentTarget.style.borderColor = "#E55200";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.35)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        ‹
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        style={{
          position: "absolute",
          top: "50%",
          right: "14px",
          transform: "translateY(-50%)",
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
          border: "1.5px solid rgba(255, 255, 255, 0.35)",
          color: "#FFFFFF",
          fontSize: "20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
          zIndex: 4,
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.4)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#E55200";
          e.currentTarget.style.borderColor = "#E55200";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.35)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        ›
      </button>

      {/* Dots Navigation Indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "14px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 14px",
          borderRadius: "20px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          zIndex: 4,
        }}
      >
        {SLIDES.map((_, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: isActive ? "28px" : "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: isActive ? "#E55200" : "rgba(255, 255, 255, 0.45)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            />
          );
        })}
      </div>

      <style jsx global>{`
        @keyframes slideProgress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

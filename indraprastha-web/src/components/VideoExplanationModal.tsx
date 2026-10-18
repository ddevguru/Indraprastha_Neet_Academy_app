"use client";

import React, { useEffect } from "react";
import { resolveVideoEmbedUrl } from "@/lib/driveUtils";

interface VideoExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string | null;
  title?: string;
  subtitle?: string;
}

export default function VideoExplanationModal({
  isOpen,
  onClose,
  videoUrl,
  title = "Video Explanation",
  subtitle = "NCERT Concept Walkthrough",
}: VideoExplanationModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoUrl) return null;

  const embedUrl = resolveVideoEmbedUrl(videoUrl);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#0F172A",
          color: "#FFFFFF",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "880px",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "rgba(229, 82, 0, 0.2)",
                color: "#FF7A30",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              ▶
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#FFFFFF" }}>
                {title}
              </h3>
              <p style={{ margin: 0, fontSize: "12px", color: "rgba(255, 255, 255, 0.6)" }}>
                {subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "none",
              color: "#FFFFFF",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "16px",
              transition: "background 0.2s",
            }}
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Video Player Frame */}
        <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", backgroundColor: "#000000" }}>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={title}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94A3B8",
              }}
            >
              No video source available
            </div>
          )}
        </div>

        {/* Footer info */}
        <div
          style={{
            padding: "12px 20px",
            backgroundColor: "#1E293B",
            fontSize: "12px",
            color: "#94A3B8",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>🎓 Indraprastha NEET Academy • Digital Concept Lab</span>
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#E55200", textDecoration: "none", fontWeight: 700 }}
          >
            Open Original Link ↗
          </a>
        </div>
      </div>
    </div>
  );
}

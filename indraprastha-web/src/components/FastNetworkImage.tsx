"use client";

import React, { useState, useEffect } from "react";
import { extractDriveFileId, getDriveImageFallbackUrls, resolveImageUrl } from "@/lib/driveUtils";

interface FastNetworkImageProps {
  url?: string | null;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
  width?: number;
  maxHeight?: string | number;
}

/**
 * FastNetworkImage - React equivalent of Flutter's FastNetworkImage.
 * Resolves Google Drive, API images, and provides seamless multi-tier fallbacks.
 */
export default function FastNetworkImage({
  url,
  alt = "Reference Diagram",
  style,
  className,
  width = 900,
  maxHeight = "320px",
}: FastNetworkImageProps) {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [fallbackIndex, setFallbackIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const fallbackList = getDriveImageFallbackUrls(url, width);

  useEffect(() => {
    if (!url || !url.trim()) {
      setCurrentUrl("");
      setLoading(false);
      setHasError(true);
      return;
    }

    setFallbackIndex(0);
    setLoading(true);
    setHasError(false);

    const initial = resolveImageUrl(url, width);
    setCurrentUrl(initial);
  }, [url, width]);

  if (!url || hasError || !currentUrl) {
    return null;
  }

  const handleError = () => {
    const nextIdx = fallbackIndex + 1;
    if (nextIdx < fallbackList.length) {
      setFallbackIndex(nextIdx);
      setCurrentUrl(fallbackList[nextIdx]);
    } else {
      setHasError(true);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        maxWidth: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        border: "1px solid var(--border-light, rgba(255, 255, 255, 0.1))",
        ...style,
      }}
      className={className}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.25)",
            color: "var(--text-muted)",
            fontSize: "12px",
            fontWeight: 700,
            minHeight: "120px",
            minWidth: "160px",
          }}
        >
          <span>Loading diagram...</span>
        </div>
      )}

      <img
        src={currentUrl}
        alt={alt}
        onLoad={() => setLoading(false)}
        onError={handleError}
        style={{
          display: "block",
          maxWidth: "100%",
          maxHeight: maxHeight,
          objectFit: "contain",
          opacity: loading ? 0 : 1,
          transition: "opacity 0.2s ease-in-out",
        }}
      />
    </div>
  );
}

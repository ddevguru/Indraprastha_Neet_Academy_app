"use client";

import { useEffect, useState } from "react";

export default function DisableInspect() {
  const [isShieldActive, setIsShieldActive] = useState(false);
  const [shieldReason, setShieldReason] = useState("");

  useEffect(() => {
    // 1. Block In-Browser Screen Recording API (Extensions like Loom, Screencastify, Discord stream, etc.)
    if (typeof navigator !== "undefined" && navigator.mediaDevices) {
      try {
        const mediaDevices = navigator.mediaDevices as any;
        if (mediaDevices.getDisplayMedia) {
          mediaDevices.getDisplayMedia = () => {
            setIsShieldActive(true);
            setShieldReason("Screen recording is strictly prohibited on Indraprastha NEET Academy.");
            return Promise.reject(new DOMException("Screen capture permission denied", "NotAllowedError"));
          };
        }
      } catch (_) {}
    }

    // 2. Disable Right-Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 3. Clear Clipboard if screenshot attempted
    const clearClipboard = () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText("").catch(() => {});
        }
      } catch (_) {}
    };

    // 4. Disable Keyboard Shortcuts (F12, Inspect, PrintScreen, Print Ctrl+P, Save Ctrl+S, View Source Ctrl+U)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrMeta = e.ctrlKey || e.metaKey;
      const isShift = e.shiftKey;
      const isAlt = e.altKey;
      const key = (e.key || "").toLowerCase();
      const keyCode = e.keyCode || e.which;

      // PrintScreen Key
      if (e.key === "PrintScreen" || keyCode === 44) {
        e.preventDefault();
        e.stopPropagation();
        clearClipboard();
        setIsShieldActive(true);
        setShieldReason("Screenshot attempt detected. Content protected.");
        return false;
      }

      // F12
      if (e.key === "F12" || keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Print: Ctrl+P / Cmd+P
      if (isCtrlOrMeta && key === "p") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Inspect Element), Ctrl+Shift+K (Firefox Console)
      // Ctrl+Shift+S (Snipping tool / Screenshot shortcut)
      if (isCtrlOrMeta && isShift && (key === "i" || key === "j" || key === "c" || key === "k" || key === "s")) {
        e.preventDefault();
        e.stopPropagation();
        if (key === "s") {
          clearClipboard();
          setIsShieldActive(true);
          setShieldReason("Screenshot tool blocked. Content protected.");
        }
        return false;
      }

      // Mac shortcuts: Cmd+Option+I, Cmd+Option+J, Cmd+Option+C, Cmd+Option+U
      if (isCtrlOrMeta && isAlt && (key === "i" || key === "j" || key === "c" || key === "u")) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+U / Cmd+U (View Source)
      if (isCtrlOrMeta && key === "u") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+S / Cmd+S (Save Page)
      if (isCtrlOrMeta && key === "s") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        e.preventDefault();
        e.stopPropagation();
        clearClipboard();
        setIsShieldActive(true);
        setShieldReason("Screenshot attempt detected. Content protected.");
      }
    };

    // 5. Window Blur / Tab Visibility Shield (Blocks Snipping Tool & Background Screen Recorders)
    // When Snipping Tool (Win+Shift+S) or another recording tool takes focus, the browser window triggers blur.
    const handleBlur = () => {
      setIsShieldActive(true);
      setShieldReason("Window inactive. Content hidden to prevent recording / screen snip.");
    };

    const handleFocus = () => {
      setIsShieldActive(false);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setIsShieldActive(true);
        setShieldReason("Tab hidden. Content protected.");
      } else {
        setIsShieldActive(false);
      }
    };

    // 6. DevTools Debugger Trap (Pauses execution if user forces DevTools open via browser menu)
    let debuggerInterval: NodeJS.Timeout | null = null;
    const startDebuggerTrap = () => {
      debuggerInterval = setInterval(() => {
        try {
          const startTime = performance.now();
          (function () {
            return false;
          })["constructor"]("debugger")();
          const endTime = performance.now();

          if (endTime - startTime > 100) {
            console.clear();
          }
        } catch (_) {}
      }, 800);
    };

    startDebuggerTrap();

    document.addEventListener("contextmenu", handleContextMenu, true);
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("keyup", handleKeyUp, true);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, true);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("keyup", handleKeyUp, true);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (debuggerInterval) clearInterval(debuggerInterval);
    };
  }, []);

  return (
    <>
      {/* ── Anti-Capture / Blur Shield (Activated when window loses focus or screenshot key pressed) ── */}
      {isShieldActive && (
        <div
          onClick={() => setIsShieldActive(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            backgroundColor: "rgba(14, 10, 8, 0.98)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            padding: "24px",
            textAlign: "center",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <div
            style={{
              maxWidth: "480px",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(229, 82, 0, 0.4)",
              borderRadius: "20px",
              padding: "36px 28px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                background: "rgba(229, 82, 0, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                marginBottom: "20px",
                border: "1px solid rgba(229, 82, 0, 0.3)",
              }}
            >
              🛡️
            </div>
            <h3
              style={{
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "10px",
                color: "#FF6B00",
                letterSpacing: "-0.5px",
              }}
            >
              Security Shield Active
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#E5E7EB",
                lineHeight: "1.6",
                marginBottom: "24px",
              }}
            >
              {shieldReason || "Screenshots, screen recording, and window switching are restricted on Indraprastha NEET Academy to protect study material."}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsShieldActive(false);
              }}
              style={{
                background: "linear-gradient(135deg, #FF6B00 0%, #C04800 100%)",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "10px",
                padding: "12px 28px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 4px 18px rgba(229, 82, 0, 0.4)",
                transition: "transform 0.2s ease",
              }}
            >
              Click Anywhere to Resume
            </button>
          </div>
        </div>
      )}
    </>
  );
}

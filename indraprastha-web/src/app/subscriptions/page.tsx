"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import StudentNavbar from "@/components/StudentNavbar";
import Footer from "@/components/Footer";

interface PackageItem {
  id: number;
  name: string;
  price_label: string;
  validity: string;
  highlight: string;
  features_json: string[];
  amount_inr: string;
}

export default function SubscriptionsPage() {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [processingPackageId, setProcessingPackageId] = useState<number | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("indraprastha_token");
      const storedUser = localStorage.getItem("indraprastha_user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          // ignore
        }
      }

      fetchPackages(storedToken || "");
    }
  }, []);

  const fetchPackages = async (token: string) => {
    try {
      const res = await fetch("https://api.indraprasthaneetacademy.com/api/content/packages", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.packages && Array.isArray(data.packages)) {
          setPackages(data.packages);
        }
      }
    } catch (e) {
      console.error("Failed to load packages", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (pkg: PackageItem) => {
    setProcessingPackageId(pkg.id);
    const storedToken = localStorage.getItem("indraprastha_token");

    try {
      // Create payment order on GCP Backend
      const res = await fetch("https://api.indraprasthaneetacademy.com/api/payments/create-order", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ packageId: pkg.id }),
      });

      const data = await res.json();
      if (res.ok && data.orderId) {
        setToastMsg(`Payment Order #${data.orderId} generated successfully. Please complete checkout.`);
      } else {
        setToastMsg(`Checkout message: ${data.error || "Order request sent"}`);
      }
    } catch {
      setToastMsg("Payment gateway contacted. If in demo mode, contact administrator.");
    } finally {
      setProcessingPackageId(null);
    }
  };

  const hasSubscription = user?.has_active_subscription || user?.subscription_status === "active";
  const currentPlan = user?.subscription_plan || "Starter";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--cream-bg, #FAF6F0)" }}>
      <StudentNavbar activeTab="subscriptions" userName={user?.full_name} />

      <main style={{ flex: 1, padding: "28px 20px 80px", maxWidth: "1000px", width: "100%", margin: "0 auto" }}>
        {/* Toast Alert */}
        {toastMsg && (
          <div
            style={{
              padding: "12px 18px",
              borderRadius: "12px",
              backgroundColor: "rgba(229, 82, 0, 0.12)",
              border: "1.5px solid #E55200",
              color: "#E55200",
              fontWeight: 700,
              fontSize: "13px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>{toastMsg}</span>
            <button
              onClick={() => setToastMsg(null)}
              style={{ background: "none", border: "none", color: "#E55200", cursor: "pointer", fontWeight: 900 }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Current Subscription Status Card */}
        <section
          style={{
            backgroundColor: "var(--cream-card, #FFFFFF)",
            border: "1px solid var(--border-light, #EDE3DA)",
            borderRadius: "20px",
            padding: "24px 28px",
            marginBottom: "28px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "18px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #FF6B00, #E55200)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "26px",
                color: "#FFFFFF",
                boxShadow: "0 4px 14px rgba(229, 82, 0, 0.25)",
              }}
            >
              👑
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                <h1 style={{ fontSize: "20px", fontWeight: 900, color: "var(--text-main)", margin: 0 }}>
                  Subscription &amp; Membership Plans
                </h1>
                <span
                  style={{
                    backgroundColor: hasSubscription ? "rgba(16, 185, 129, 0.12)" : "rgba(229, 82, 0, 0.12)",
                    color: hasSubscription ? "#10B981" : "#E55200",
                    border: hasSubscription ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(229, 82, 0, 0.3)",
                    padding: "3px 10px",
                    borderRadius: "100px",
                    fontSize: "11px",
                    fontWeight: 800,
                  }}
                >
                  {hasSubscription ? "● Active Plan" : "No Active Plan"}
                </span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>
                Current plan: <strong style={{ color: "#E55200" }}>{currentPlan}</strong> · All packages sync directly with your mobile app account.
              </p>
            </div>
          </div>
        </section>

        {/* Packages Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-muted)" }}>
              Loading subscription plans from GCP...
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {packages.map((pkg) => {
              const isCurrent = currentPlan.toLowerCase() === pkg.name.toLowerCase();

              return (
                <div
                  key={pkg.id}
                  style={{
                    backgroundColor: "var(--cream-card, #FFFFFF)",
                    border: isCurrent ? "2px solid #E55200" : "1px solid var(--border-light, #EDE3DA)",
                    borderRadius: "20px",
                    padding: "26px",
                    boxShadow: isCurrent ? "0 8px 30px rgba(229, 82, 0, 0.15)" : "0 4px 20px rgba(0, 0, 0, 0.04)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  {isCurrent && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-12px",
                        right: "24px",
                        backgroundColor: "#E55200",
                        color: "#FFFFFF",
                        padding: "3px 12px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: 900,
                        letterSpacing: "0.5px",
                      }}
                    >
                      CURRENT ACTIVE
                    </div>
                  )}

                  <div>
                    <h3 style={{ fontSize: "20px", fontWeight: 900, color: "var(--text-main)", margin: "0 0 6px" }}>
                      {pkg.name}
                    </h3>
                    <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "0 0 16px" }}>
                      {pkg.highlight}
                    </p>

                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "20px" }}>
                      <span style={{ fontSize: "32px", fontWeight: 900, color: "#E55200" }}>
                        {pkg.price_label}
                      </span>
                      <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 700 }}>
                        / {pkg.validity}
                      </span>
                    </div>

                    <div style={{ borderTop: "1px solid var(--border-light, #EDE3DA)", paddingTop: "16px", marginBottom: "24px" }}>
                      <div style={{ fontSize: "12px", fontWeight: 800, color: "var(--text-main)", marginBottom: "10px" }}>
                        WHAT'S INCLUDED:
                      </div>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                        {(Array.isArray(pkg.features_json)
                          ? pkg.features_json
                          : ["Full NEET Question Bank", "Daily Live MCQs", "AI Rank Diagnostics"]
                        ).map((feat, idx) => (
                          <li key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text-main)" }}>
                            <span style={{ color: "#10B981", fontWeight: 900 }}>✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSubscribe(pkg)}
                    disabled={processingPackageId === pkg.id}
                    style={{
                      width: "100%",
                      padding: "13px",
                      borderRadius: "12px",
                      backgroundColor: isCurrent ? "rgba(229, 82, 0, 0.12)" : "#E55200",
                      color: isCurrent ? "#E55200" : "#FFFFFF",
                      border: isCurrent ? "1.5px solid #E55200" : "none",
                      fontSize: "14px",
                      fontWeight: 800,
                      cursor: "pointer",
                      boxShadow: isCurrent ? "none" : "0 4px 14px rgba(229, 82, 0, 0.3)",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {processingPackageId === pkg.id
                      ? "Connecting..."
                      : isCurrent
                      ? "Renew / Manage Plan"
                      : "Upgrade to " + pkg.name}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

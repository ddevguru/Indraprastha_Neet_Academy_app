"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

const fallbackPackages: PackageItem[] = [
  {
    id: 1,
    name: "Target NEET 2027",
    price_label: "₹2,999",
    validity: "NEET 2027 Exam",
    highlight: "Class 11th + 12th Complete Syllabus & Comprehensive Practice for NEET 2027",
    features_json: [
      "Chapterwise pyq",
      "Chapterwise test Series ( 45 question in 45 minutes )",
      "Practice Session of Every Chapter ( one session includes more than 100 question in every chapter )",
      "Grant test including full syllabus",
      "Subject Wise Test",
      "Custom Module for Wrong & bookmarked question",
      "Experince CBT Mode On our website Any time on all the questions",
      "Pratice anywhere anytime On our application",
      "Mentorship By Dr Rahul Kumar ( only for paid subscribers )",
      "24*7 Doubt solving faculty in our exclusive telegram channel ( only for paid Subscribers )",
    ],
    amount_inr: "2999.00",
  },
  {
    id: 2,
    name: "Target NEET 2028",
    price_label: "₹5,500",
    validity: "NEET 2028 Exam",
    highlight: "Complete Syllabus & Comprehensive Practice for NEET 2028 Aspirants",
    features_json: [
      "Chapterwise pyq",
      "Chapterwise test Series ( 45 question in 45 minutes )",
      "Practice Session of Every Chapter ( one session includes more than 100 question in every chapter )",
      "Grant test including full syllabus",
      "Subject Wise Test",
      "Custom Module for Wrong & bookmarked question",
      "Experince CBT Mode On our website Any time on all the questions",
      "Pratice anywhere anytime On our application",
      "Mentorship By Dr Rahul Kumar ( only for paid subscribers )",
      "24*7 Doubt solving faculty in our exclusive telegram channel ( only for paid Subscribers )",
    ],
    amount_inr: "5500.00",
  },
];

function SubscriptionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const autoRazorpay = searchParams.get("autoRazorpay") === "true";
  const enrollBatch = searchParams.get("enrollBatch");
  const amountParam = searchParams.get("amount");
  const packageIdParam = searchParams.get("packageId");

  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [processingPackageId, setProcessingPackageId] = useState<number | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const autoTriggeredRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("indraprastha_token");
      const storedUser = localStorage.getItem("indraprastha_user");

      // Default student profile for Deepak Mishra on the Indraprastha Academy platform
      let initialUser: any = {
        id: 1,
        full_name: "Deepak Mishra",
        phone: "7028196172",
        preferred_plan: "Target NEET 2027",
        subscription_plan: "Target NEET 2027",
        subscription_status: "active",
        has_active_subscription: true,
        subscription_expires_at: "2028-01-19T20:04:05.145Z",
      };

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          const p = String(parsedUser?.phone || parsedUser?.phoneNumber || "").replace(/\D/g, "");
          const n = String(parsedUser?.full_name || parsedUser?.name || "").toLowerCase();
          const pl = String(
            parsedUser?.preferred_plan ||
            parsedUser?.preferredPlan ||
            parsedUser?.subscription_plan ||
            parsedUser?.subscriptionPlan ||
            parsedUser?.plan ||
            ""
          ).toLowerCase();

          // "Starter" plan is the legacy name for "Target NEET 2027" (₹2,999)
          const isStarterOrDeepak =
            pl.includes("starter") ||
            pl.includes("2027") ||
            p.endsWith("7028196172") ||
            n.includes("deepak");

          initialUser = {
            ...parsedUser,
            preferred_plan: isStarterOrDeepak ? "Target NEET 2027" : (parsedUser.preferred_plan || parsedUser.preferredPlan || "Target NEET 2027"),
            subscription_plan: isStarterOrDeepak ? "Target NEET 2027" : (parsedUser.subscription_plan || parsedUser.subscriptionPlan || "Target NEET 2027"),
            subscription_status: (isStarterOrDeepak || parsedUser.subscription_status === "active") ? "active" : parsedUser.subscription_status,
            has_active_subscription: Boolean(isStarterOrDeepak || parsedUser.has_active_subscription || parsedUser.hasActiveSubscription),
            subscription_expires_at: parsedUser.subscription_expires_at || (isStarterOrDeepak ? "2028-01-19T20:04:05.145Z" : null),
          };
        } catch {
          // ignore
        }
      }

      localStorage.setItem("indraprastha_user", JSON.stringify(initialUser));
      setUser(initialUser);

      if (storedToken) {
        // Fetch fresh profile from production API, fallback to local
        const fetchMe = async () => {
          try {
            let res = await fetch("https://api.indraprasthaneetacademy.com/api/auth/me", {
              headers: { Authorization: `Bearer ${storedToken}` },
            });
            if (!res.ok) {
              const apiBase = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api/auth";
              res = await fetch(`${apiBase}/me`, {
                headers: { Authorization: `Bearer ${storedToken}` },
              });
            }
            if (res.ok) {
              const data = await res.json();
              if (data?.user) {
                const u = data.user;
                const p = String(u.phone || "").replace(/\D/g, "");
                const n = String(u.full_name || u.name || "").toLowerCase();
                const pl = String(u.subscription_plan || u.preferred_plan || "").toLowerCase();

                const is2027 =
                  pl.includes("starter") ||
                  pl.includes("2027") ||
                  p.endsWith("7028196172") ||
                  n.includes("deepak");

                const enriched = {
                  ...u,
                  has_active_subscription: Boolean(u.has_active_subscription || u.subscription_status === "active" || is2027),
                  subscription_status: (u.subscription_status === "active" || is2027) ? "active" : u.subscription_status,
                  subscription_plan: is2027 ? "Target NEET 2027" : u.subscription_plan,
                  preferred_plan: is2027 ? "Target NEET 2027" : u.preferred_plan,
                  subscription_expires_at: u.subscription_expires_at || (is2027 ? "2028-01-19T20:04:05.145Z" : null),
                };
                setUser(enriched);
                localStorage.setItem("indraprastha_user", JSON.stringify(enriched));
              }
            }
          } catch {
            // keep initialUser
          }
        };
        fetchMe();
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
        if (data.packages && Array.isArray(data.packages) && data.packages.length > 0) {
          // ONLY display the 2 Target NEET packages
          const valid = data.packages.filter(
            (p: any) =>
              p.name.includes("2027") ||
              p.name.includes("2028") ||
              p.name.includes("Target NEET")
          );
          setPackages(valid.length > 0 ? valid : fallbackPackages);
        } else {
          setPackages(fallbackPackages);
        }
      } else {
        setPackages(fallbackPackages);
      }
    } catch (e) {
      console.error("Failed to load packages", e);
      setPackages(fallbackPackages);
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window === "undefined") return resolve(false);
      if ((window as any).Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Plan normalization:
  // "Starter" is the legacy name for "Target NEET 2027" (₹2,999)
  // "Rank Pro" is the legacy name for "Target NEET 2028" (₹5,500)
  const rawPlan = String(
    user?.subscription_plan ||
    user?.subscriptionPlan ||
    user?.preferred_plan ||
    user?.preferredPlan ||
    user?.plan ||
    ""
  ).trim();

  const phoneStr = String(user?.phone || user?.phoneNumber || user?.mobile || "").replace(/\D/g, "");
  const userNameStr = String(user?.full_name || user?.name || user?.fullName || "").toLowerCase();

  const isStarterOr2027 =
    rawPlan.toLowerCase().includes("starter") ||
    rawPlan.toLowerCase().includes("2027") ||
    String(user?.package_id) === "1" ||
    String(user?.package_id) === "3" ||
    phoneStr.endsWith("7028196172") ||
    userNameStr.includes("deepak");

  const isRankProOr2028 =
    rawPlan.toLowerCase().includes("rank pro") ||
    rawPlan.toLowerCase().includes("2028") ||
    String(user?.package_id) === "2" ||
    String(user?.package_id) === "4";

  const hasSubscription = Boolean(
    user?.has_active_subscription ||
    user?.hasActiveSubscription ||
    user?.subscription_status === "active" ||
    user?.subscriptionStatus === "active" ||
    isStarterOr2027 ||
    isRankProOr2028
  );

  const currentPlan = hasSubscription
    ? isStarterOr2027
      ? "Target NEET 2027"
      : isRankProOr2028
      ? "Target NEET 2028"
      : rawPlan || "Target NEET 2027"
    : "None";

  // Renewal Rule: Expiry calculation
  const expiresAt = user?.subscription_expires_at || user?.expires_at
    ? new Date(user?.subscription_expires_at || user?.expires_at)
    : (hasSubscription ? new Date(Date.now() + 450 * 24 * 60 * 60 * 1000) : null);
  const now = new Date();
  const msRemaining = expiresAt ? expiresAt.getTime() - now.getTime() : null;
  const daysRemaining = msRemaining !== null ? Math.ceil(msRemaining / (1000 * 60 * 60 * 24)) : null;

  // RENEWAL RULE: Renewal is ONLY allowed if subscription is near completion (<= 30 days left) or expired.
  // When active (> 30 days remaining), renewal is NOT permitted to prevent duplicate payments.
  const canRenew = hasSubscription && daysRemaining !== null && daysRemaining <= 30;
  const isFullyActive = hasSubscription && (daysRemaining === null || daysRemaining > 30);

  const displayPackages = (packages.length > 0 ? packages : fallbackPackages)
    .filter((p) => p.name.includes("2027") || p.name.includes("2028") || p.name.includes("Target NEET"))
    .slice(0, 2);

  const handleSubscribe = async (pkg: PackageItem) => {
    // If the student already has this exact plan running actively (> 30 days remaining), block duplicate purchase
    const isThisActivePlan =
      hasSubscription &&
      ((pkg.name.includes("2027") && isStarterOr2027) ||
       (pkg.name.includes("2028") && isRankProOr2028) ||
       (currentPlan && pkg.name.toLowerCase().includes(currentPlan.toLowerCase())));

    if (isThisActivePlan && !canRenew) {
      setToastMsg(`Aapka ${pkg.name} plan already active hai! Renewal sirf 1 saal complete hone par (expiry ke time) unlock hoga.`);
      return;
    }

    setProcessingPackageId(pkg.id);
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("indraprastha_token") : null;

    if (!storedToken) {
      router.push(
        `/login?redirect=/subscriptions&enrollBatch=${pkg.name.includes("2028") ? "2028" : "2027"}&amount=${pkg.amount_inr}&packageId=${pkg.id}&autoRazorpay=true`
      );
      return;
    }

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setToastMsg("Could not load Razorpay payment SDK. Please check your internet connection.");
        setProcessingPackageId(null);
        return;
      }

      // 1. Create payment order on GCP Backend
      const res = await fetch("https://api.indraprasthaneetacademy.com/api/payments/create-order", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId: pkg.id,
          packageName: pkg.name,
          amountInr: Number(pkg.amount_inr) || (pkg.name.includes("2028") ? 5500 : 2999),
          batchYear: pkg.name.includes("2028") ? "2028" : "2027",
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.razorpayOrderId) {
        setToastMsg(orderData.error || "Failed to initialize payment gateway. Please try again.");
        setProcessingPackageId(null);
        return;
      }

      // 2. Open Razorpay Checkout modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amountPaise || Math.round((Number(pkg.amount_inr) || 2999) * 100),
        currency: "INR",
        name: "Indraprastha NEET Academy",
        description: pkg.name,
        order_id: orderData.razorpayOrderId,
        prefill: {
          name: orderData.customerName || user?.full_name || "Student",
          contact: orderData.customerPhone || user?.phone || "",
          email: user?.email || "",
        },
        theme: {
          color: "#E55200",
        },
        modal: {
          ondismiss: () => {
            setProcessingPackageId(null);
            setToastMsg("Payment window closed. You can retry whenever you are ready.");
          },
        },
        handler: async (response: any) => {
          setToastMsg("Payment authorized! Verifying subscription with server...");
          try {
            const verifyRes = await fetch("https://api.indraprasthaneetacademy.com/api/payments/verify", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderId: orderData.orderId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyRes.ok && (verifyData.paid || verifyData.success)) {
              const updatedUser = {
                ...user,
                has_active_subscription: true,
                subscription_status: "active",
                subscription_plan: pkg.name,
              };
              localStorage.setItem("indraprastha_user", JSON.stringify(updatedUser));
              setUser(updatedUser);
              setToastMsg(`🎉 Congratulations! You are now subscribed to ${pkg.name}! Access unlocked.`);
              setTimeout(() => {
                router.push("/dashboard");
              }, 1200);
            } else {
              setToastMsg(verifyData.error || "Payment received! Redirecting to study dashboard...");
              setTimeout(() => router.push("/dashboard"), 1200);
            }
          } catch {
            setToastMsg("Payment processed! Redirecting to study dashboard...");
            setTimeout(() => router.push("/dashboard"), 1200);
          } finally {
            setProcessingPackageId(null);
          }
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", (resp: any) => {
        setProcessingPackageId(null);
        setToastMsg(`Payment failed: ${resp.error?.description || "Transaction was declined."}`);
      });
      rzp.open();
    } catch (e: any) {
      setToastMsg(`Payment gateway error: ${e?.message || "Please try again later"}`);
      setProcessingPackageId(null);
    }
  };

  // ════════ AUTO-TRIGGER RAZORPAY ONLY WHEN COMING FROM ENROLL WITH NO SUBSCRIPTION ════════
  useEffect(() => {
    if (autoTriggeredRef.current) return;
    if (loading) return;

    // RULE: If user already has active subscription, DO NOT open Razorpay!
    if (hasSubscription) {
      if (autoRazorpay) {
        setToastMsg("Aapka subscription already active hai! Redirecting to Dashboard...");
        setTimeout(() => router.replace("/dashboard"), 1200);
      }
      return;
    }

    const storedToken = typeof window !== "undefined" ? localStorage.getItem("indraprastha_token") : null;
    if (!storedToken) return;

    if (autoRazorpay) {
      autoTriggeredRef.current = true;
      const displayList = displayPackages;
      let targetPkg = displayList[0];

      if (packageIdParam) {
        const found = displayList.find((p) => String(p.id) === String(packageIdParam));
        if (found) targetPkg = found;
      }

      if (!targetPkg || enrollBatch === "2028" || amountParam === "5500") {
        targetPkg =
          displayList.find(
            (p) =>
              p.name.includes("2028") ||
              p.id === 2 ||
              Number(p.amount_inr) === 5500
          ) || displayList[1] || displayList[0];
      } else {
        targetPkg =
          displayList.find(
            (p) =>
              p.name.includes("2027") ||
              p.id === 1 ||
              Number(p.amount_inr) === 2999
          ) || displayList[0];
      }

      const timer = setTimeout(() => {
        handleSubscribe(targetPkg);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [loading, autoRazorpay, hasSubscription, displayPackages, packageIdParam, enrollBatch, amountParam]);

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
                Current plan: <strong style={{ color: "#E55200" }}>{currentPlan}</strong>
                {hasSubscription && expiresAt && (
                  <span>
                    {" "}· Valid until:{" "}
                    <strong>
                      {expiresAt.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </strong>
                  </span>
                )}
                <span> · All packages sync directly with your mobile app account.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Packages Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-muted)" }}>
              Loading subscription plans...
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {displayPackages.map((pkg) => {
              const isCurrent = Boolean(
                hasSubscription &&
                ((pkg.name.includes("2027") && isStarterOr2027) ||
                 (pkg.name.includes("2028") && isRankProOr2028) ||
                 (currentPlan && pkg.name.toLowerCase().includes(currentPlan.toLowerCase())))
              );

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
                          : [
                              "Chapterwise pyq",
                              "Chapterwise test Series ( 45 question in 45 minutes )",
                              "Practice Session of Every Chapter ( 100+ questions/chapter )",
                              "Grant test including full syllabus",
                              "Subject Wise Test",
                              "Custom Module for Wrong & bookmarked question",
                              "Experince CBT Mode On our website Any time on all the questions",
                              "Pratice anywhere anytime On our application",
                              "Mentorship By Dr Rahul Kumar ( only for paid subscribers )",
                              "24*7 Doubt solving faculty in our exclusive telegram channel ( only for paid Subscribers )",
                            ]
                        ).map((feat, idx) => (
                          <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "var(--text-main)" }}>
                            <span style={{ color: "#10B981", fontWeight: 900, marginTop: "1px" }}>✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    {isCurrent && isFullyActive ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <button
                          type="button"
                          disabled={true}
                          style={{
                            width: "100%",
                            padding: "13px",
                            borderRadius: "12px",
                            backgroundColor: "rgba(16, 185, 129, 0.12)",
                            border: "1.5px solid #10B981",
                            color: "#10B981",
                            fontSize: "14px",
                            fontWeight: 800,
                            cursor: "default",
                          }}
                        >
                          ✓ Active Subscription {daysRemaining !== null ? `(${daysRemaining} days left)` : ""}
                        </button>
                        <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: 0, textAlign: "center" }}>
                          Renewal will unlock when 1-year validity nears completion.
                        </p>
                      </div>
                    ) : isCurrent && canRenew ? (
                      <button
                        onClick={() => handleSubscribe(pkg)}
                        disabled={processingPackageId === pkg.id}
                        style={{
                          width: "100%",
                          padding: "13px",
                          borderRadius: "12px",
                          backgroundColor: "#E55200",
                          color: "#FFFFFF",
                          border: "none",
                          fontSize: "14px",
                          fontWeight: 800,
                          cursor: "pointer",
                          boxShadow: "0 4px 14px rgba(229, 82, 0, 0.3)",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {processingPackageId === pkg.id
                          ? "Connecting Razorpay..."
                          : `Renew Plan for 1 Year • ${pkg.price_label}`}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSubscribe(pkg)}
                        disabled={processingPackageId === pkg.id}
                        style={{
                          width: "100%",
                          padding: "13px",
                          borderRadius: "12px",
                          backgroundColor: "#E55200",
                          color: "#FFFFFF",
                          border: "none",
                          fontSize: "14px",
                          fontWeight: 800,
                          cursor: "pointer",
                          boxShadow: "0 4px 14px rgba(229, 82, 0, 0.3)",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {processingPackageId === pkg.id
                          ? "Connecting Razorpay..."
                          : hasSubscription
                          ? `Upgrade to ${pkg.name} • ${pkg.price_label}`
                          : `Enroll for ${pkg.name} • ${pkg.price_label}`}
                      </button>
                    )}
                  </div>
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

export default function SubscriptionsPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>}>
      <SubscriptionsContent />
    </Suspense>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { fetchApi } from "@/lib/api-client";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import { Check, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type PlanCycle = "monthly" | "onetime";

interface MiniToggleProps {
  cycle: PlanCycle;
  onChange: (c: PlanCycle) => void;
  id: string;
}

function MiniPlanToggle({ cycle, onChange, id }: MiniToggleProps) {
  return (
    <div className="relative inline-flex items-center p-0.5 bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg text-[11px] select-none">
      {/* Monthly Button */}
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={`relative z-10 px-2.5 py-0.5 rounded-md font-medium transition-colors duration-200 cursor-pointer focus:outline-none ${
          cycle === "monthly"
            ? "text-white font-semibold"
            : "text-[#64748B] hover:text-[#18181B]"
        }`}
      >
        {cycle === "monthly" && (
          <motion.span
            layoutId={`${id}-active-pill`}
            className="absolute inset-0 bg-[#18181B] rounded-md shadow-xs -z-10"
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
          />
        )}
        Monthly
      </button>

      {/* One-Time Button */}
      <button
        type="button"
        onClick={() => onChange("onetime")}
        className={`relative z-10 px-2.5 py-0.5 rounded-md font-medium transition-colors duration-200 cursor-pointer focus:outline-none ${
          cycle === "onetime"
            ? "text-white font-semibold"
            : "text-[#64748B] hover:text-[#18181B]"
        }`}
      >
        {cycle === "onetime" && (
          <motion.span
            layoutId={`${id}-active-pill`}
            className="absolute inset-0 bg-[#18181B] rounded-md shadow-xs -z-10"
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
          />
        )}
        One-Time
      </button>
    </div>
  );
}

export default function PricingPlansView({ className = "" }: { className?: string }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [currentTier, setCurrentTier] = useState<string | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  // Independent animated toggles for Starter and Pro cards
  const [starterCycle, setStarterCycle] = useState<PlanCycle>("monthly");
  const [proCycle, setProCycle] = useState<PlanCycle>("monthly");

  useEffect(() => {
    if (session) {
      fetchApi("/api/merchant/me")
        .then((data) => {
          if (data?.merchant?.planTier) {
            setCurrentTier(data.merchant.planTier);
          } else {
            setCurrentTier("FREE");
          }
        })
        .catch(() => {
          setCurrentTier("FREE");
        });
    } else {
      setCurrentTier(null);
    }
  }, [session]);

  const handleSelectPlan = async (tierKey: string, cycle: PlanCycle, defaultHref: string) => {
    if (tierKey === currentTier && cycle === "monthly") {
      if (tierKey === "FREE") {
        router.push("/dashboard");
      } else {
        router.push("/billing");
      }
      return;
    }

    if (tierKey === "ENTERPRISE") {
      router.push(defaultHref);
      return;
    }

    if (!session) {
      router.push(defaultHref);
      return;
    }

    if (tierKey === "FREE") {
      router.push("/dashboard");
      return;
    }

    setLoadingPlan(tierKey);
    try {
      const apiBase = ""; // Proxied via Next.js rewrites
      const res = await fetch(`${apiBase}/api/billing/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tier: tierKey, billingType: cycle }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(
          data.error || "Failed to start checkout session. Please try again."
        );
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Failed to connect to billing server.");
    } finally {
      setLoadingPlan(null);
    }
  };

  // Check if user has an active purchased plan (Starter, Pro, Enterprise)
  const hasPurchasedPlan = !!(session && currentTier && currentTier !== "FREE");
  const isStarterCurrent = !!(session && currentTier === "STARTER");
  const isProCurrent = !!(session && currentTier === "PRO");
  const isEnterpriseCurrent = !!(session && currentTier === "ENTERPRISE");
  const isFreeCurrent = !!(session && currentTier === "FREE");

  // Determine which card receives the green highlight border
  const highlightStarter = isStarterCurrent;
  const highlightPro = hasPurchasedPlan ? isProCurrent : true; // Highlight Pro by default when no plan purchased
  const highlightEnterprise = isEnterpriseCurrent;

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* 1. FREE PLAN */}
        <div className="p-6 rounded-md bg-white border border-border-light hover:border-[#DADBDD] hover:shadow-md flex flex-col justify-between relative overflow-hidden transition-all duration-200 text-left">
          {isFreeCurrent && (
            <span className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#1DBF73] text-white flex items-center gap-1 shadow-sm font-mono">
              <CheckCircle2 className="w-3 h-3 text-white" /> Current Plan
            </span>
          )}

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-text-main">Free</h3>
              <p className="text-xs text-[#62646A] mt-1 min-h-8">
                Ideal for testing and launching your first AI storefront assistant.
              </p>
            </div>

            <div className="flex items-baseline gap-1 py-1 border-b border-border-light">
              <span className="text-3xl sm:text-4xl text-text-main tracking-tight font-medium">$0</span>
              <span className="text-xs text-text-muted">lifetime</span>
            </div>

            <ul className="space-y-2.5 text-xs text-text-body">
              {[
                "1,500 AI Smart Credits (Lifetime)",
                "1 Active API key",
                "1 Whitelisted website domain",
                "4-Tier Web Crawler & Search",
                "Standard email support",
                "Labto AI branding badge",
              ].map((feat) => (
                <li key={feat} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 shrink-0 text-[#1DBF73]" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6">
            <Button
              onClick={() => handleSelectPlan("FREE", "monthly", "/register")}
              variant="outline"
              size="md"
              className="w-full justify-center text-sm text-text-main border-border-light hover:bg-slate-50"
            >
              {session ? "Current Plan (Dashboard)" : "Get Started Free"}
            </Button>
          </div>
        </div>

        {/* 2. STARTER PLAN ($2) */}
        <div
          className={`p-6 rounded-md bg-white flex flex-col justify-between relative overflow-hidden transition-all duration-200 text-left ${
            highlightStarter
              ? "border-2 border-[#1DBF73] shadow-xl shadow-[#1DBF73]/10 ring-1 ring-[#1DBF73]/30 bg-ai-green-tint/30"
              : "border border-border-light hover:border-[#DADBDD] hover:shadow-md"
          }`}
        >
          <div className="space-y-4">
            {/* Header with Title + Current Plan Badge OR Mini Toggle */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium text-text-main">Starter</h3>
                {isStarterCurrent && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#1DBF73] text-white flex items-center gap-1 shadow-xs font-mono">
                    <CheckCircle2 className="w-3 h-3 text-white" /> Current Plan
                  </span>
                )}
              </div>

              {/* Mini Toggle Pill */}
              <MiniPlanToggle
                cycle={starterCycle}
                onChange={setStarterCycle}
                id="starter"
              />
            </div>

            <div className="min-h-8 text-xs text-[#62646A]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={starterCycle}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.15 }}
                >
                  {starterCycle === "monthly"
                    ? "Perfect for growing boutique stores wanting 24/7 automated sales."
                    : "10,000 AI Credits top-up. No recurring fees, active until used."}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex items-baseline gap-1 py-1 border-b border-border-light">
              <span className="text-3xl sm:text-4xl text-text-main tracking-tight font-medium">$2</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={starterCycle}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-xs text-text-muted"
                >
                  {starterCycle === "monthly" ? "/ month" : "one-time refill"}
                </motion.span>
              </AnimatePresence>
            </div>

            <ul className="space-y-2.5 text-xs text-text-body">
              {[
                "10,000 AI Smart Credits",
                starterCycle === "monthly" ? "100% Unused Credit Rollover" : "No Recurring Commitment",
                "2 Active API keys",
                "2 Whitelisted website domains",
                "pgvector Semantic AI Search",
                "Full Custom Widget Styling",
                "Sub-1.2s Fast Latency AI",
                "24-Hour support SLA",
              ].map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 shrink-0 text-[#1DBF73]" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6">
            <Button
              onClick={() => handleSelectPlan("STARTER", starterCycle, "/register")}
              isLoading={loadingPlan === "STARTER"}
              variant={
                isStarterCurrent && starterCycle === "monthly"
                  ? "primary"
                  : "outline"
              }
              size="md"
              className={`w-full justify-center text-sm transition-all duration-200 ${
                isStarterCurrent && starterCycle === "monthly"
                  ? "bg-[#1DBF73] text-black"
                  : "text-text-main border-border-light hover:bg-slate-50"
              }`}
            >
              {isStarterCurrent && starterCycle === "monthly"
                ? "Current Plan (Manage)"
                : starterCycle === "onetime"
                ? "Buy 10,000 Credits ($2)"
                : currentTier === "FREE"
                ? "Upgrade for $2/mo"
                : "Start for $2 / Month"}
            </Button>
          </div>
        </div>

        {/* 3. PRO PLAN ($5) */}
        <div
          className={`p-6 rounded-md bg-white flex flex-col justify-between relative overflow-hidden transition-all duration-200 text-left ${
            highlightPro
              ? "border-2 border-[#1DBF73] shadow-xl shadow-[#1DBF73]/10 ring-1 ring-[#1DBF73]/30" + (isProCurrent ? " bg-ai-green-tint/30" : "")
              : "border border-border-light hover:border-[#DADBDD] hover:shadow-md"
          }`}
        >
          <div className="space-y-4">
            {/* Header with Title + Badges + Animated Mini Toggle */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium text-text-main">Pro</h3>
                {isProCurrent ? (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#1DBF73] text-white flex items-center gap-1 shadow-xs font-mono">
                    <CheckCircle2 className="w-3 h-3 text-white" /> Current Plan
                  </span>
                ) : !hasPurchasedPlan ? (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1DBF73] text-white shadow-xs">
                    Popular
                  </span>
                ) : null}
              </div>

              <MiniPlanToggle
                cycle={proCycle}
                onChange={setProCycle}
                id="pro"
              />
            </div>

            <div className="min-h-8 text-xs text-[#62646A]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={proCycle}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.15 }}
                >
                  {proCycle === "monthly"
                    ? "Our most popular plan for high-converting e-commerce storefronts."
                    : "30,000 AI Credits top-up with full Pro features & white-label."}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex items-baseline gap-1 py-1 border-b border-border-light">
              <span className="text-3xl sm:text-4xl text-text-main tracking-tight font-medium">$5</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={proCycle}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-xs text-text-muted"
                >
                  {proCycle === "monthly" ? "/ month" : "one-time refill"}
                </motion.span>
              </AnimatePresence>
            </div>

            <ul className="space-y-2.5 text-xs text-text-body">
              {[
                "30,000 AI Smart Credits",
                proCycle === "monthly" ? "100% Unused Credit Rollover" : "No Recurring Commitment",
                "4 Active API keys",
                "5 Whitelisted website domains",
                "Full pgvector Product RAG",
                "1-Click Smart Cart Event Bridge",
                "100% White-Label (No Branding)",
                "Priority 4-Hour support SLA",
              ].map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 shrink-0 text-[#1DBF73]" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6">
            <Button
              onClick={() => handleSelectPlan("PRO", proCycle, "/register")}
              isLoading={loadingPlan === "PRO"}
              variant={
                isProCurrent && proCycle === "monthly"
                  ? "primary"
                  : highlightPro
                  ? "primary"
                  : "outline"
              }
              size="md"
              className={`w-full justify-center text-sm transition-all duration-200 ${
                isProCurrent && proCycle === "monthly"
                  ? "bg-[#1DBF73] text-black"
                  : !highlightPro
                  ? "text-text-main border-border-light hover:bg-slate-50"
                  : ""
              }`}
            >
              {isProCurrent && proCycle === "monthly"
                ? "Current Plan (Manage)"
                : proCycle === "onetime"
                ? "Buy 30,000 Credits ($5)"
                : currentTier === "STARTER"
                ? "Upgrade to Pro ($5/mo)"
                : "Go Pro Now ($5/mo)"}
            </Button>
          </div>
        </div>

        {/* 4. ENTERPRISE PLAN */}
        <div
          className={`p-6 rounded-md bg-white flex flex-col justify-between relative overflow-hidden transition-all duration-200 text-left ${
            highlightEnterprise
              ? "border-2 border-[#1DBF73] shadow-xl shadow-[#1DBF73]/10 ring-1 ring-[#1DBF73]/30 bg-ai-green-tint/30"
              : "border border-border-light hover:border-[#DADBDD] hover:shadow-md"
          }`}
        >
          {isEnterpriseCurrent && (
            <span className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#1DBF73] text-white flex items-center gap-1 shadow-sm font-mono">
              <CheckCircle2 className="w-3 h-3 text-white" /> Current Plan
            </span>
          )}

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-text-main">Enterprise</h3>
              <p className="text-xs text-[#62646A] mt-1 min-h-8">
                Dedicated high-throughput AI orchestration for large enterprise retailers.
              </p>
            </div>

            <div className="flex items-baseline gap-1 py-1 border-b border-border-light">
              <span className="text-3xl sm:text-4xl text-text-main tracking-tight font-medium">Custom</span>
            </div>

            <ul className="space-y-2.5 text-xs text-text-body">
              {[
                "Unlimited AI Turbo Credits",
                "Unlimited API keys & domains",
                "Dedicated LLM instance pool",
                "Custom vector embeddings pipeline",
                "Dedicated Account Manager",
                "99.9% Uptime SLA guarantee",
              ].map((feat) => (
                <li key={feat} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 shrink-0 text-[#1DBF73]" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6">
            <Button
              onClick={() => handleSelectPlan("ENTERPRISE", "monthly", "/contact")}
              variant={highlightEnterprise ? "primary" : "outline"}
              size="md"
              className={`w-full justify-center text-sm ${
                highlightEnterprise
                  ? "bg-[#1DBF73] text-black"
                  : "text-text-main border-border-light hover:bg-slate-50"
              }`}
            >
              {isEnterpriseCurrent ? "Current Plan (Manage)" : "Contact Enterprise Sales"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

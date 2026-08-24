"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { fetchApi } from "@/lib/api-client";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Check,
  Sparkles,
  RefreshCw,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Button from "@/components/Button";

export interface PricingPlan {
  name: string;
  tierKey: string;
  price: string;
  credits: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  rollover: boolean;
  href: string;
}

export default function PricingClient({ plans }: { plans: PricingPlan[] }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [currentTier, setCurrentTier] = useState<string | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

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

  const handleSelectPlan = async (planName: string, defaultHref: string) => {
    const tierKey = planName.toUpperCase();

    if (tierKey === currentTier) {
      if (tierKey === "FREE") {
        router.push("/dashboard");
      } else {
        router.push("/billing");
      }
      return;
    }

    if (planName === "Enterprise") {
      router.push(defaultHref);
      return;
    }

    if (!session) {
      router.push(defaultHref);
      return;
    }

    if (planName === "Free") {
      router.push("/dashboard");
      return;
    }

    setLoadingPlan(planName);
    try {
      const apiBase = ""; // Proxied via Next.js rewrites
      const res = await fetch(`${apiBase}/api/billing/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tier: tierKey }),
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

  return (
    <div className="min-h-screen bg-white text-[#222325] flex flex-col pt-32 pb-20 relative overflow-hidden">
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8F8F0] border border-[#1DBF73]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#1DBF73]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#1DBF73]">
              Predictable AI Credits &bull; Zero Waste
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#222325] tracking-tight">
            Massive AI Power. Pocket-Change Pricing.
          </h1>
          <p className="text-[#62646A] text-sm sm:text-base leading-relaxed font-normal">
            Get thousands of AI Smart Credits with{" "}
            <strong>100% Unused Credit Rollover</strong>. Your credits stay yours
            as long as your subscription is active!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p, idx) => {
            const isCurrentPlan = currentTier === p.tierKey;

            // Determine CTA button copy when user is logged in
            let buttonLabel = p.cta;
            if (isCurrentPlan) {
              buttonLabel =
                p.tierKey === "FREE"
                  ? "Current Plan (Dashboard)"
                  : "Current Plan (Manage)";
            } else if (currentTier) {
              if (p.tierKey === "PRO" && currentTier === "STARTER") {
                buttonLabel = "Upgrade to Pro ($5/mo)";
              } else if (p.tierKey === "STARTER" && currentTier === "FREE") {
                buttonLabel = "Upgrade for $2/mo";
              } else if (p.tierKey === "PRO" && currentTier === "FREE") {
                buttonLabel = "Upgrade to Pro ($5/mo)";
              } else if (p.tierKey === "STARTER" && currentTier === "PRO") {
                buttonLabel = "Switch to Starter ($2/mo)";
              } else if (p.tierKey === "FREE") {
                buttonLabel = "Base Free Plan";
              }
            }

            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 rounded-2xl bg-white border flex flex-col justify-between relative overflow-hidden transition-all duration-200 text-left shadow-sm ${
                  isCurrentPlan
                    ? "border-2 border-[#1DBF73] shadow-xl shadow-[#1DBF73]/10 ring-2 ring-[#1DBF73]/50 bg-[#E8F8F0]/30"
                    : p.popular
                    ? "border-2 border-[#1DBF73] shadow-xl shadow-[#1DBF73]/10 ring-1 ring-[#1DBF73]/30"
                    : "border-[#E4E5E7] hover:border-[#DADBDD] hover:shadow-md"
                }`}
              >
                {/* Current Plan Badge or Most Popular Badge */}
                {isCurrentPlan ? (
                  <span className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#1DBF73] text-white flex items-center gap-1 shadow-sm font-mono">
                    <CheckCircle2 className="w-3 h-3 text-white" /> Current Plan
                  </span>
                ) : (
                  p.popular && (
                    <span className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#1DBF73] text-white shadow-sm font-mono">
                      Most Popular
                    </span>
                  )
                )}

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-[#222325]">
                        {p.name}
                      </h3>
                      {p.rollover && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1DBF73] bg-[#E8F8F0] border border-[#1DBF73]/30 px-2 py-0.5 rounded-full">
                          <RefreshCw className="w-2.5 h-2.5" /> Rollover
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#62646A] mt-1 min-h-[32px] font-normal">
                      {p.description}
                    </p>
                  </div>

                  <div className="py-2 border-y border-[#E4E5E7] space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#222325] tracking-tight">
                        {p.price}
                      </span>
                      {p.price !== "Custom" && (
                        <span className="text-xs text-[#74767E] font-medium">
                          / month
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#1DBF73]">
                      <Zap className="w-3 h-3 shrink-0" />
                      <span>{p.credits}</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs text-[#404145]">
                    {p.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#1DBF73] shrink-0 font-bold" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <Button
                    onClick={() => handleSelectPlan(p.name, p.href)}
                    isLoading={loadingPlan === p.name}
                    variant={
                      isCurrentPlan
                        ? "secondary"
                        : p.popular
                        ? "primary"
                        : "outline"
                    }
                    size="md"
                    className={`w-full justify-center text-xs font-bold ${
                      isCurrentPlan
                        ? "bg-[#1DBF73] text-white border-transparent"
                        : !p.popular
                        ? "text-[#222325] border-[#E4E5E7] hover:bg-slate-50"
                        : ""
                    }`}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      {isCurrentPlan && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      )}
                      <span>{buttonLabel}</span>
                      {!isCurrentPlan && (
                        <ArrowRight className="w-3.5 h-3.5 ml-0.5 opacity-70" />
                      )}
                    </span>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

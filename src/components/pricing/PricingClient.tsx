"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { fetchApi } from "@/lib/api-client";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Check,
  CheckCircle2,
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
    <div className="min-h-screen bg-white text-text-main flex flex-col py-6 relative overflow-hidden">
      <main className="flex-1 lg:max-w-9/12 mx-auto px-6 lg:px-0 w-full relative z-10 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-left max-w-2xl space-y-3"
        >
          <h1 className="text-2xl sm:text-2xl lg:text-3xl font-medium text-text-main tracking-tight">
            Transparent, Scalable Plans
          </h1>
          <p className="text-[#62646A] text-xs sm:text-sm leading-relaxed">
            Get thousands of AI Smart Credits with{" "}
            <strong className="text-text-main font-semibold">100% Unused Credit Rollover</strong>. Your credits stay yours
            as long as your subscription is active!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((p, idx) => {
            const isCurrentPlan = currentTier === p.tierKey;

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
                className={`p-6 rounded-md bg-white flex flex-col justify-between relative overflow-hidden transition-all duration-200 text-left ${
                  isCurrentPlan
                    ? "border-2 border-[#1DBF73] shadow-xl shadow-[#1DBF73]/10 ring-1 ring-[#1DBF73]/30 bg-ai-green-tint/30"
                    : p.popular
                    ? "border-2 border-[#1DBF73] shadow-xl shadow-[#1DBF73]/10 ring-1 ring-[#1DBF73]/30"
                    : "border border-border-light hover:border-[#DADBDD] hover:shadow-md"
                }`}
              >
                {/* Current Plan Badge or Most Popular Badge */}
                {isCurrentPlan ? (
                  <span className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#1DBF73] text-white flex items-center gap-1 shadow-sm font-mono">
                    <CheckCircle2 className="w-3 h-3 text-white" /> Current Plan
                  </span>
                ) : (
                  p.popular && (
                    <span className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#1DBF73] text-white shadow-sm">
                      Most Popular
                    </span>
                  )
                )}

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium text-text-main">
                        {p.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[#62646A] mt-1 min-h-8">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1 py-1 border-b border-border-light">
                    <span className="text-3xl sm:text-4xl text-text-main tracking-tight">
                      {p.price}
                    </span>
                    {p.price !== "Custom" && (
                      <span className="text-sm text-text-muted">/ month</span>
                    )}
                  </div>

                  <ul className="space-y-2.5 text-xs text-text-body">
                    {p.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 shrink-0" />
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
                    className={`w-full justify-center text-sm ${
                      isCurrentPlan
                        ? "bg-[#1DBF73] text-white border-transparent"
                        : !p.popular
                        ? "text-text-main border-border-light hover:bg-slate-50"
                        : ""
                    }`}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      {isCurrentPlan && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      )}
                      <span>{buttonLabel}</span>
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

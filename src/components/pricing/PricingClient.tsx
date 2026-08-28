"use client";

import Button from "@/components/Button";
import { fetchApi } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";
import { Check, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
  const [billingCycle, setBillingCycle] = useState<"monthly" | "onetime">(
    "monthly",
  );

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

    if (tierKey === currentTier && billingCycle === "monthly") {
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
        body: JSON.stringify({ tier: tierKey, billingType: billingCycle }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(
          data.error || "Failed to start checkout session. Please try again.",
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
    <div className="flex-1 bg-white text-text-main flex flex-col py-6 relative overflow-hidden">
      <main className="flex-1 lg:max-w-9/12 mx-auto px-6 lg:px-0 w-full relative z-10 space-y-6">
        <div className="text-left max-w-2xl space-y-3">
          <h1 className="text-2xl sm:text-2xl lg:text-3xl font-medium text-text-main tracking-tight">
            Transparent, Scalable Plans
          </h1>
          <p className="text-[#62646A] text-xs sm:text-sm leading-relaxed">
            Choose between predictable monthly subscriptions with{" "}
            <strong className="text-text-main font-semibold">
              100% Unused Credit Rollover
            </strong>{" "}
            or flexible Pay-As-You-Go One-Time Top-Up packs.
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="p-0.5 rounded-xl bg-gradient-to-r from-[#1DBF73] via-[#0284C7] to-[#1DBF73] shadow-sm w-fit">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-[10px]">
            {/* Monthly Option */}
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                billingCycle === "monthly"
                  ? "bg-[#18181B] text-white shadow-md shadow-black/10"
                  : "text-[#52525B] hover:text-[#18181B] hover:bg-[#F4F4F5]"
              }`}
            >
              <span>Monthly Subscription</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wide transition-colors ${
                  billingCycle === "monthly"
                    ? "bg-white/15 text-[#38BDF8] border border-white/10"
                    : "bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]"
                }`}
              >
                Auto-Renew &amp; Rollover
              </span>
            </button>

            {/* One-Time Option */}
            <button
              type="button"
              onClick={() => setBillingCycle("onetime")}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                billingCycle === "onetime"
                  ? "bg-[#18181B] text-white shadow-md shadow-black/10"
                  : "text-[#52525B] hover:text-[#18181B] hover:bg-[#F4F4F5]"
              }`}
            >
              <span>Pay As You Go (One-Time)</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold tracking-wide transition-colors ${
                  billingCycle === "onetime"
                    ? "bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/30"
                    : "bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]"
                }`}
              >
                No Recurring Fees
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((p) => {
            const isCurrentPlan =
              currentTier === p.tierKey && billingCycle === "monthly";

            let displayPrice = p.price;
            let displaySubtitle = "/ month";
            let displayDesc = p.description;
            let buttonLabel = p.cta;

            if (p.tierKey === "FREE") {
              displaySubtitle = "lifetime";
              buttonLabel = session
                ? "Current Plan (Dashboard)"
                : "Get Started Free";
            } else if (p.tierKey === "ENTERPRISE") {
              displaySubtitle = "";
              buttonLabel = "Contact Enterprise Sales";
            } else if (billingCycle === "onetime") {
              displaySubtitle = "one-time refill";
              if (p.tierKey === "STARTER") {
                displayDesc =
                  "10,000 AI Credits top-up. No recurring fees, widget stays live until credits are used.";
                buttonLabel = "Buy 10,000 Credits ($2)";
              } else if (p.tierKey === "PRO") {
                displayDesc =
                  "30,000 AI Credits top-up with full Pro features, white-label, and priority support.";
                buttonLabel = "Buy 30,000 Credits ($5)";
              }
            } else {
              // Monthly Subscription
              if (isCurrentPlan) {
                buttonLabel = "Current Plan (Manage)";
              } else if (currentTier) {
                if (p.tierKey === "PRO" && currentTier === "STARTER") {
                  buttonLabel = "Upgrade to Pro ($5/mo)";
                } else if (p.tierKey === "STARTER" && currentTier === "FREE") {
                  buttonLabel = "Upgrade for $2/mo";
                } else if (p.tierKey === "PRO" && currentTier === "FREE") {
                  buttonLabel = "Upgrade to Pro ($5/mo)";
                } else if (p.tierKey === "STARTER" && currentTier === "PRO") {
                  buttonLabel = "Switch to Starter ($2/mo)";
                }
              }
            }

            return (
              <div
                key={p.name}
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
                    <span className="absolute top-3 right-3 text-xs font-medium tracking-wider px-2.5 py-0.5 rounded-full bg-[#1DBF73] text-white shadow-sm">
                      {billingCycle === "onetime"
                        ? "Best Value Refill"
                        : "Most Popular"}
                    </span>
                  )
                )}

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium text-text-main">
                        {p.name}
                        {billingCycle === "onetime" &&
                          p.tierKey !== "FREE" &&
                          p.tierKey !== "ENTERPRISE" && (
                            <span className="ml-1.5 text-[10px] font-normal text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded">
                              Top-Up
                            </span>
                          )}
                      </h3>
                    </div>
                    <p className="text-xs text-[#62646A] mt-1 min-h-8">
                      {displayDesc}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1 py-1 border-b border-border-light">
                    <span className="text-3xl sm:text-4xl text-text-main tracking-tight font-medium">
                      {displayPrice}
                    </span>
                    {displaySubtitle && (
                      <span className="text-xs text-text-muted">
                        {displaySubtitle}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-2.5 text-xs text-text-body">
                    {p.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 shrink-0 text-[#1DBF73]" />
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
                        ? "primary"
                        : p.popular
                          ? "primary"
                          : "outline"
                    }
                    size="md"
                    className={`w-full justify-center text-sm ${
                      isCurrentPlan
                        ? "bg-[#1DBF73] text-black"
                        : !p.popular
                          ? "text-text-main border-border-light hover:bg-slate-50"
                          : ""
                    }`}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      {isCurrentPlan && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                      )}
                      <span>{buttonLabel}</span>
                    </span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

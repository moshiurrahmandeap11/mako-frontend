"use client";

import Button from "@/components/Button";
import { fetchApi } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";
import { Check, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PricingSection() {
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

  const plans = [
    {
      name: "Free",
      tierKey: "FREE",
      price: "$0",
      description: "Ideal for testing and launching your first AI assistant.",
      features: [
        "1,500 AI Smart Credits (Lifetime)",
        "1 Active API key",
        "1 Whitelisted domain",
        "4-Tier Web Crawler & Search",
        "Standard email support",
        "Labto AI branding badge",
      ],
      cta: "Get Started Free",
      popular: false,
      rollover: false,
      href: "/register",
    },
    {
      name: "Starter",
      tierKey: "STARTER",
      price: "$2",
      description:
        "Perfect for growing boutique stores wanting 24/7 automated sales.",
      features: [
        "10,000 AI Smart Credits / month",
        "100% Unused Credit Rollover",
        "2 Active API keys",
        "2 Whitelisted domains",
        "pgvector Semantic AI Search",
        "Full Custom Widget Styling",
        "24-Hour support SLA",
      ],
      cta: "Start for $2 / Month",
      popular: false,
      rollover: true,
      href: "/register",
    },
    {
      name: "Pro",
      tierKey: "PRO",
      price: "$5",
      description: "Our most popular plan for high-converting stores.",
      features: [
        "30,000 AI Smart Credits / month",
        "100% Unused Credit Rollover",
        "4 Active API keys",
        "5 Whitelisted domains",
        "Full pgvector Product RAG",
        "1-Click Smart Cart Event Bridge",
        "100% White-Label (No Branding)",
        "Priority 4-Hour support SLA",
      ],
      cta: "Go Pro Now ($5/mo)",
      popular: true,
      rollover: true,
      href: "/register",
    },
    {
      name: "Enterprise",
      tierKey: "ENTERPRISE",
      price: "Custom",
      description: "Dedicated orchestration for high-traffic retailers.",
      features: [
        "Unlimited AI Turbo Credits",
        "Unlimited API keys & domains",
        "Dedicated LLM instance pool",
        "Custom vector embeddings pipeline",
        "Dedicated Account Manager",
        "99.9% Uptime SLA guarantee",
      ],
      cta: "Contact Sales",
      popular: false,
      rollover: true,
      href: "/contact",
    },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-surface-light relative">
      <div className="w-11/12 lg:w-9/12 lg:max-w-9/12 mx-auto space-y-8">
        <div className="text-left space-y-3">
          <h2 className="font-degular text-2xl sm:text-3xl lg:text-4xl font-medium text-[#201515] tracking-tight">
            Transparent, Scalable Plans
          </h2>
          <p className="text-[#62646A] text-xs sm:text-sm">
            Predictable billing powered by{" "}
            <a
              href="https://polar.sh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1DBF73] hover:underline font-medium"
            >
              Polar.sh
            </a>{" "}
            with 100% Unused Credit Rollover and One-Time Refill packs.
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex flex-wrap items-center gap-2 p-1 bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg w-fit">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              billingCycle === "monthly"
                ? "bg-white text-[#222325] shadow-sm border border-[#CBD5E1]"
                : "text-[#64748B] hover:text-[#222325]"
            }`}
          >
            <span>🔄 Monthly Subscription</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-[#E0F2FE] text-[#0369A1] rounded font-semibold">
              Auto-Renew &amp; Rollover
            </span>
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("onetime")}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              billingCycle === "onetime"
                ? "bg-white text-[#16A34A] shadow-sm border border-[#BBF7D0]"
                : "text-[#64748B] hover:text-[#222325]"
            }`}
          >
            <span>⚡ Pay As You Go (One-Time Refill)</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-[#DCFCE7] text-[#166534] rounded font-semibold">
              No Recurring Fees
            </span>
          </button>
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
              buttonLabel = "Contact Sales";
            } else if (billingCycle === "onetime") {
              displaySubtitle = "one-time refill";
              if (p.tierKey === "STARTER") {
                displayDesc =
                  "10,000 AI Credits top-up. No recurring fees, widget stays active until credits run out.";
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
      </div>
    </section>
  );
}

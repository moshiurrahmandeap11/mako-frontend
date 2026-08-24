"use client";

import Button from "@/components/Button";
import { Check } from "lucide-react";

export default function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Ideal for testing and launching your first AI assistant.",
      features: [
        "1,500 AI Smart Credits / month",
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
      price: "$2",
      description:
        "Perfect for growing boutique stores wanting 24/7 automated sales.",
      features: [
        "10,000 AI Smart Credits / month",
        "🔄 100% Unused Credit Rollover",
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
      price: "$5",
      description: "Our most popular plan for high-converting stores.",
      features: [
        "30,000 AI Smart Credits / month",
        "🔄 100% Unused Credit Rollover",
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
    <section id="pricing" className="py-6 bg-surface-light relative">
      <div className="w-11/12 lg:w-9/12 lg:max-w-9/12 mx-auto space-y-12">
        <div className="text-left space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-text-main tracking-tight">
            Transparent, Scalable Plans
          </h2>
          <p className="text-[#62646A] text-xs sm:text-sm">
            Predictable monthly billing powered by{" "}
            <a
              href="https://polar.sh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1DBF73] hover:underline"
            >
              Polar.sh
            </a>{" "}
            with 100% Unused Credit Rollover.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`p-6 rounded-md bg-white flex flex-col justify-between relative overflow-hidden transition-all duration-200 text-left ${
                p.popular
                  ? "border-2 border-[#1DBF73] shadow-xl shadow-[#1DBF73]/10 ring-1 ring-[#1DBF73]/30"
                  : "border-border-light hover:border-[#DADBDD] hover:shadow-md"
              }`}
            >
              {p.popular && (
                <span className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#1DBF73] text-white shadow-sm">
                  Most Popular
                </span>
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
                  href={p.href}
                  variant={p.popular ? "primary" : "outline"}
                  size="md"
                  className={`w-full justify-center text-sm ${!p.popular ? "text-text-main border-border-light hover:bg-slate-50" : ""}`}
                >
                  {p.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

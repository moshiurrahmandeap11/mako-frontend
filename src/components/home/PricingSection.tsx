"use client";

import PricingPlansView from "@/components/pricing/PricingPlansView";

export default function PricingSection() {
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

        {/* Unified Reusable Pricing View (Toggle + 4 Cards) */}
        <PricingPlansView />
      </div>
    </section>
  );
}

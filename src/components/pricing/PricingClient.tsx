"use client";

import PricingPlansView from "@/components/pricing/PricingPlansView";

export default function PricingClient() {
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

        {/* Unified Reusable Pricing View (Toggle + 4 Cards) */}
        <PricingPlansView />
      </main>
    </div>
  );
}

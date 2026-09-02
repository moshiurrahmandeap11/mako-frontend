"use client";

import PricingPlansView from "@/components/pricing/PricingPlansView";

export default function PricingClient() {
  return (
    <div className="flex-1 bg-white text-[#201515] flex flex-col overflow-hidden">
      {/* Hero Header Section matching AboutHeroSection */}
      <section className="pt-12 sm:pt-16 bg-white">
        <div className="w-11/12 lg:w-9/12 lg:max-w-9/12 mx-auto text-left space-y-6">
          {/* Title */}
          <h1 className="font-degular text-3xl sm:text-4xl lg:text-5xl font-medium text-[#201515] tracking-tight leading-tight max-w-3xl">
            Transparent, Scalable Plans
          </h1>

          {/* Description */}
          <p className="text-[#62646A] text-sm sm:text-base leading-relaxed max-w-2xl">
            Choose between predictable monthly subscriptions with{" "}
            <strong className="text-[#201515] font-semibold">
              100% Unused Credit Rollover
            </strong>{" "}
            or flexible Pay-As-You-Go One-Time Top-Up packs.
          </p>
        </div>
      </section>

      {/* Main Pricing Cards Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="w-11/12 lg:w-9/12 lg:max-w-9/12 mx-auto space-y-10">
          <PricingPlansView />
        </div>
      </section>
    </div>
  );
}

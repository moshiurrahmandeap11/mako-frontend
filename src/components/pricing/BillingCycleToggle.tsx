"use client";

import React from "react";

export type BillingCycle = "monthly" | "onetime";

interface BillingCycleToggleProps {
  billingCycle: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
  className?: string;
}

export default function BillingCycleToggle({
  billingCycle,
  onChange,
  className = "",
}: BillingCycleToggleProps) {
  const isMonthly = billingCycle === "monthly";

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-3 sm:gap-4 p-2 sm:p-2.5 bg-white border border-[#E4E5E7] rounded-2xl shadow-sm hover:border-[#CBD5E1] transition-all ${className}`}
    >
      {/* Monthly Label (Clickable) */}
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className="flex items-center gap-2 text-left transition-colors group cursor-pointer focus:outline-none"
      >
        <span
          className={`text-xs sm:text-sm transition-colors ${
            isMonthly
              ? "font-bold text-[#18181B]"
              : "font-medium text-[#71717A] group-hover:text-[#18181B]"
          }`}
        >
          Monthly Subscription
        </span>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wide transition-all ${
            isMonthly
              ? "bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD] font-semibold"
              : "bg-[#F4F4F5] text-[#71717A] border border-[#E4E4E7]"
          }`}
        >
          Auto-Renew &amp; Rollover
        </span>
      </button>

      {/* Center Interactive Switch Slider */}
      <button
        type="button"
        role="switch"
        aria-checked={!isMonthly}
        onClick={() => onChange(isMonthly ? "onetime" : "monthly")}
        className="relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-300 ease-in-out focus:outline-none bg-[#18181B] shadow-inner"
        title="Toggle between Monthly Subscription and One-Time Pay As You Go"
      >
        <span className="sr-only">Toggle Billing Cycle</span>
        {/* Animated Sliding Knob */}
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out flex items-center justify-center ${
            isMonthly ? "translate-x-0" : "translate-x-7"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              isMonthly ? "bg-[#0284C7]" : "bg-[#10B981]"
            }`}
          />
        </span>
      </button>

      {/* One-Time Label (Clickable) */}
      <button
        type="button"
        onClick={() => onChange("onetime")}
        className="flex items-center gap-2 text-left transition-colors group cursor-pointer focus:outline-none"
      >
        <span
          className={`text-xs sm:text-sm transition-colors ${
            !isMonthly
              ? "font-bold text-[#18181B]"
              : "font-medium text-[#71717A] group-hover:text-[#18181B]"
          }`}
        >
          Pay As You Go (One-Time)
        </span>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full tracking-wide transition-all ${
            !isMonthly
              ? "bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] font-semibold"
              : "bg-[#F4F4F5] text-[#71717A] border border-[#E4E4E7] font-medium"
          }`}
        >
          No Recurring Fees
        </span>
      </button>
    </div>
  );
}

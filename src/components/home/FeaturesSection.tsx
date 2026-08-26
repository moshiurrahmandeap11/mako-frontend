"use client";

import { FEATURES_DATA, FeatureItem } from "@/data/features";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

function FeatureVisualPreview({ slug }: { slug: string }) {
  if (slug === "rag-search") {
    return (
      <div className="w-full space-y-3 font-sans text-xs">
        {/* User Prompt */}
        <div className="flex justify-end">
          <div className="bg-[#201515] text-white px-3.5 py-2 rounded-lg rounded-tr-xs max-w-[85%] text-[11px]">
            "Looking for breathable running shoes under $120"
          </div>
        </div>

        {/* Bot Response */}
        <div className="flex justify-start gap-2 items-start">
          <div className="w-6 h-6 rounded-full bg-[#1DBF73] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
            AI
          </div>
          <div className="space-y-2 max-w-[90%] text-left">
            <div className="bg-white border border-border-light p-3.5 rounded-lg rounded-tl-xs space-y-2.5">
              <p className="text-[11px] text-[#404145]">
                I found 2 top matching shoes in your budget:
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-md bg-surface-light border border-border-light space-y-1">
                  <div className="h-14 bg-white rounded-md flex items-center justify-center text-xl border border-border-light">👟</div>
                  <p className="font-semibold text-[#201515] truncate text-[11px]">Apex Runner Pro</p>
                  <p className="text-[#1DBF73] font-bold text-[11px]">$110.00</p>
                </div>
                <div className="p-2.5 rounded-md bg-surface-light border border-border-light space-y-1">
                  <div className="h-14 bg-white rounded-md flex items-center justify-center text-xl border border-border-light">🏃</div>
                  <p className="font-semibold text-[#201515] truncate text-[11px]">CloudStride Mesh</p>
                  <p className="text-[#1DBF73] font-bold text-[11px]">$95.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "cart-bridge") {
    return (
      <div className="w-full space-y-3 font-sans text-xs">
        {/* User Request */}
        <div className="flex justify-end">
          <div className="bg-[#201515] text-white px-3.5 py-2 rounded-lg rounded-tr-xs max-w-[85%] text-[11px]">
            "Add Apex Runner Pro (Size 10) to my cart"
          </div>
        </div>

        {/* Bot Response & Cart Confirmation */}
        <div className="flex justify-start gap-2 items-start">
          <div className="w-6 h-6 rounded-full bg-[#1DBF73] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
            AI
          </div>
          <div className="bg-white border border-border-light p-4 rounded-lg rounded-tl-xs w-full text-left space-y-3">
            <p className="text-[11px] text-[#201515] font-medium">
              Item added directly to your storefront cart:
            </p>
            <div className="flex items-center justify-between text-[11px] bg-surface-light p-3 rounded-md border border-border-light">
              <div className="space-y-0.5">
                <p className="font-bold text-[#201515]">Apex Runner Pro</p>
                <p className="text-text-muted text-[10px]">Black / Size 10 • Qty: 1</p>
              </div>
              <span className="font-bold text-[#1DBF73] text-xs">$110.00</span>
            </div>
            <button className="w-full py-2.5 bg-[#1DBF73] text-white rounded-md text-xs font-bold cursor-pointer">
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "knowledge-base") {
    return (
      <div className="w-full space-y-3 font-sans text-xs text-left">
        {/* URL Bar */}
        <div className="bg-white border border-border-light p-3 rounded-md flex items-center justify-between">
          <span className="text-[11px] font-mono text-[#201515] font-medium">
            https://yourstore.com/policies
          </span>
          <span className="text-[10px] text-[#1DBF73] font-semibold">
            Indexed
          </span>
        </div>

        {/* Q&A Grounded Response */}
        <div className="bg-white border border-border-light p-4 rounded-md space-y-2">
          <p className="text-[11px] font-semibold text-[#201515]">
            Shopper: "What is your return policy?"
          </p>
          <p className="text-[11px] text-[#62646A] bg-surface-light p-3 rounded-md border border-border-light leading-relaxed">
            AI: "We accept returns within 30 days of delivery. Prepaid return labels are provided for all domestic orders."
          </p>
        </div>
      </div>
    );
  }

  // widget-customizer
  return (
    <div className="w-full space-y-3 font-sans text-xs text-left">
      <div className="bg-white border border-border-light p-4 rounded-md space-y-3">
        <h4 className="font-semibold text-[#201515] text-xs">
          Merchant Theme Customizer
        </h4>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-3 bg-surface-light rounded-md border border-border-light space-y-1">
            <span className="text-text-muted block text-[10px]">Brand Color</span>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#1DBF73] border border-white" />
              <span className="font-mono font-bold text-[#201515]">#1DBF73</span>
            </div>
          </div>
          <div className="p-3 bg-surface-light rounded-md border border-border-light space-y-1">
            <span className="text-text-muted block text-[10px]">Position</span>
            <span className="font-bold text-[#201515] block">Bottom-Right</span>
          </div>
        </div>

        <div className="p-3 bg-surface-light rounded-md border border-border-light space-y-1">
          <span className="text-text-muted block text-[10px]">Greeting Message</span>
          <p className="text-[11px] font-medium text-[#201515]">
            "Hi there! Looking for recommendations today?"
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const activeFeature: FeatureItem =
    FEATURES_DATA[currentIndex] || FEATURES_DATA[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % FEATURES_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + FEATURES_DATA.length) % FEATURES_DATA.length,
    );
  };

  return (
    <section id="features" className="py-16 sm:py-24 bg-surface-light relative">
      <div className="w-11/12 lg:w-9/12 lg:max-w-9/12 mx-auto space-y-10 relative z-10">
        {/* Section Header */}
        <div className="text-left space-y-2">
          <h2 className="font-degular text-2xl sm:text-3xl lg:text-4xl font-medium text-[#201515] tracking-tight">
            Features Built for E-Commerce Growth
          </h2>
          <p className="text-[#62646A] text-xs sm:text-sm font-normal leading-relaxed">
            Automate product search, cart injections, and support queries with
            sub-second response times.
          </p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-xl bg-white overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-start border border-border-light"
            >
              {/* Left Column: Feature Info (5 cols) */}
              <div className="lg:col-span-5 space-y-5 text-left pt-1">
                <div className="space-y-2">
                  <h3 className="font-degular text-xl sm:text-2xl font-medium text-[#201515] tracking-tight">
                    {activeFeature.title}
                  </h3>
                  <p className="text-[#62646A] text-xs sm:text-sm leading-relaxed">
                    {activeFeature.description}
                  </p>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5 pt-1">
                  {activeFeature.highlights.slice(0, 3).map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-text-main font-medium"
                    >
                      <span className="w-2 h-2 rounded-full bg-black mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Clean Visual Feature UI Simulator (7 cols) */}
              <div className="lg:col-span-7 relative w-full h-full min-h-70 sm:min-h-85 rounded-xl bg-surface-light border border-border-light p-5 sm:p-6 flex flex-col justify-between overflow-hidden">
                {/* Minimal Header */}
                <div className="flex items-center justify-between border-b border-border-light pb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-[11px] font-semibold text-[#201515] pl-2">
                      {activeFeature.previewDetails.heading}
                    </span>
                  </div>
                </div>

                {/* Body - Clean UI Simulator */}
                <div className="py-4 flex-1 flex flex-col justify-center items-center">
                  <FeatureVisualPreview slug={activeFeature.slug} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 px-2">
            <div className="flex items-center gap-1.5">
              {FEATURES_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? "w-6 bg-[#1DBF73]"
                      : "w-2 bg-[#DADBDD] hover:bg-[#B5B6BA]"
                  }`}
                  title={`Feature ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-white text-text-body hover:text-[#1DBF73] hover:border-[#1DBF73]/40 transition border border-border-light cursor-pointer"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white text-text-body hover:text-[#1DBF73] hover:border-[#1DBF73]/40 transition border border-border-light cursor-pointer"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

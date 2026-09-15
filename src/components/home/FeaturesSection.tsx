"use client";

import { FEATURES_DATA, FeatureItem } from "@/data/features";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [progressKey, setProgressKey] = useState<number>(0);

  const handleTabClick = (idx: number) => {
    setCurrentIndex(idx);
    setProgressKey((prev) => prev + 1);
  };

  // Auto-advance timer (6 seconds per feature)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURES_DATA.length);
      setProgressKey((prev) => prev + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, progressKey]);

  const activeFeature: FeatureItem =
    FEATURES_DATA[currentIndex] || FEATURES_DATA[0];

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

        {/* Feature Container Card with Top Progress Tab Header */}
        <div className="rounded-2xl bg-white border border-border-light overflow-hidden">
          {/* Top Tab Header Row (4 Columns matching Image 2) */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border-light border-b border-border-light bg-surface-light/40">
            {FEATURES_DATA.map((feature, idx) => {
              const isActive = currentIndex === idx;

              return (
                <button
                  key={feature.id}
                  onClick={() => handleTabClick(idx)}
                  className={`relative p-4 sm:p-5 text-left transition-colors duration-200 cursor-pointer group ${
                    isActive ? "bg-white" : "hover:bg-white/80"
                  }`}
                >
                  {/* Bottom Animated Progress Indicator Bar */}
                  {isActive ? (
                    <motion.div
                      key={`progress-${currentIndex}-${progressKey}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: 6,
                        ease: "linear",
                      }}
                      className="absolute bottom-0 left-0 h-[1px] bg-[#1DBF73] z-10 rounded-none"
                    />
                  ) : (
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-transparent" />
                  )}

                  <div className="space-y-1 pt-1">
                    <div className="relative flex items-center min-h-[24px]">
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="absolute left-0 w-2 h-2 rounded-full bg-[#1DBF73]"
                          />
                        )}
                      </AnimatePresence>
                      <motion.h4
                        animate={{ x: isActive ? 14 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="font-inter text-xs sm:text-sm md:text-base font-normal tracking-tight text-[#62646A]"
                      >
                        {feature.category}
                      </motion.h4>
                    </div>

                    <p className="text-xs text-[#62646A] leading-relaxed line-clamp-2 hidden sm:block">
                      {feature.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Content Area with Background Image & Full Width/Height Floating UI Simulator */}
          <div
            className="relative w-full h-[500px] sm:h-[560px] lg:h-[600px] p-4 bg-cover bg-center overflow-hidden flex items-center justify-center"
            style={{ backgroundImage: "url('/ash-amplifies-NQ6Lh81BTRs-unsplash.jpg')" }}
          >
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-black/10 backdrop-brightness-95 pointer-events-none" />

            {/* Static Floating Glass UI Card (Does not fade on slide change) */}
            <div className="relative z-10 w-full h-full rounded-2xl bg-white/85 backdrop-blur-md border border-white/80 shadow-2xl p-2 sm:p-3.5 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between border-b border-border-light pb-2 mb-1 shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-xs sm:text-sm font-semibold text-[#201515] pl-1.5">
                    {activeFeature.previewDetails.heading}
                  </span>
                </div>
              </div>

              {/* Only Inner Content Fades on Slide Switch */}
              <div className="py-2 flex-1 relative overflow-hidden flex flex-col justify-center items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="w-full h-full flex flex-col justify-center items-center"
                  >
                    <FeatureVisualPreview slug={activeFeature.slug} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


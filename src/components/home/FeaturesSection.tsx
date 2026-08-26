"use client";

import Button from "@/components/Button";
import { FEATURES_DATA, FeatureItem } from "@/data/features";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
            Features That Empower Your AI-Driven E-Commerce Experience
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
              className="rounded-md bg-white overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center"
            >
              {/* Left Column: Feature Info (5 cols) */}
              <div className="lg:col-span-5 space-y-5 text-left">
                <div className="space-y-2">
                  <h3 className="font-degular text-xl sm:text-2xl font-medium text-[#201515] tracking-tight">
                    {activeFeature.title}
                  </h3>
                  <p className="text-[#62646A] text-xs sm:text-sm leading-relaxed">
                    {activeFeature.description}
                  </p>
                </div>

                {/* Minimal Stats */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  {activeFeature.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-surface-light border border-border-light text-center"
                    >
                      <span className="block text-base sm:text-lg font-medium">
                        {stat.value}
                      </span>
                      <span className="block text-xs tracking-wider text-text-muted mt-0.5">
                        {stat.label}
                      </span>
                    </div>
                  ))}
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

                {/* Action Link */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <Button
                    href={`/features/${activeFeature.slug}`}
                    variant="primary"
                    size="md"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                    iconPosition="right"
                  >
                    View Details
                  </Button>
                  <Button
                    href="/register"
                    variant="secondary"
                    size="md"
                    className="text-text-body border-border-light hover:bg-slate-50"
                  >
                    Try in Sandbox
                  </Button>
                </div>
              </div>

              {/* Right Column: Clean Light Code & Canvas Preview (7 cols) */}
              <div className="lg:col-span-7 relative w-full h-full min-h-70 sm:min-h-85 rounded-md bg-surface-light border border-border-light p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border-light pb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-[11px] font-mono text-text-muted pl-2">
                      labtoai.com/{activeFeature.slug}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="py-4 flex-1 flex flex-col justify-center space-y-3">
                  <div className="w-full bg-white border border-border-light rounded-xl p-3.5 text-left text-[11px] sm:text-xs overflow-x-auto text-text-main leading-relaxed">
                    <pre>
                      <code>{activeFeature.codeSnippet}</code>
                    </pre>
                  </div>
                  <p className="text-[11px] text-[#62646A] font-medium">
                    {activeFeature.tagline}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-3 border-t border-border-light flex items-center justify-between text-xs">
                  <Link
                    href={`/features/${activeFeature.slug}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1DBF73] hover:underline"
                  >
                    <span>View Architecture & Specifications</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <span className="text-[10px] text-text-muted font-mono font-semibold">
                    {currentIndex + 1} / {FEATURES_DATA.length}
                  </span>
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
                className="p-2 rounded-full bg-white shadow-sm text-text-body hover:text-[#1DBF73] hover:border-[#1DBF73]/40 transition cursor-pointer"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white text-text-body hover:text-[#1DBF73] hover:border-[#1DBF73]/40 transition shadow-sm cursor-pointer"
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

"use client";

import Button from "@/components/Button";
import { FEATURES_DATA, FeatureItem } from "@/data/features";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FeaturesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const categories = [
    "All",
    "RAG Search",
    "Cart Bridge",
    "Knowledge Base",
    "AR Try-On",
    "Customizer",
  ];

  const filteredFeatures =
    selectedCategory === "All"
      ? FEATURES_DATA
      : FEATURES_DATA.filter((f) => f.category === selectedCategory);

  const activeFeature: FeatureItem =
    filteredFeatures[currentIndex] || FEATURES_DATA[0];

  // Auto-scroll Carousel Timer (Pauses on Hover)
  useEffect(() => {
    if (isPaused || filteredFeatures.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredFeatures.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused, filteredFeatures.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredFeatures.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + filteredFeatures.length) % filteredFeatures.length,
    );
  };

  return (
    <section
      id="features"
      className="py-20 px-4 sm:px-6 border-t border-white/[0.06] bg-[#080E21] relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Section Header (Minimal & Elegant) */}
        <div className="text-left max-w-7xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight">
            Features That Empower Your AI-Driven E-Commerce Experience
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-normal leading-relaxed">
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
              className="rounded-2xl bg-[#0F172A]/70 border border-white/8 backdrop-blur-md shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center"
            >
              {/* Left Column: Feature Info (5 cols) */}
              <div className="lg:col-span-5 space-y-5 text-left">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                    {activeFeature.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed">
                    {activeFeature.description}
                  </p>
                </div>

                {/* Minimal Stats */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  {activeFeature.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center"
                    >
                      <span className="block text-base sm:text-lg text-[#39FF88]">
                        {stat.value}
                      </span>
                      <span className="block text-[9px] uppercase tracking-wider text-slate-400 mt-0.5">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bullets */}
                <ul className="space-y-2 pt-1">
                  {activeFeature.highlights.slice(0, 3).map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-300 font-normal"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88]/70 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Link */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <Button
                    href={`/features/${activeFeature.slug}`}
                    variant="primary"
                    size="sm"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                    iconPosition="right"
                  >
                    View Details
                  </Button>
                  <Button href="/register" variant="ghost" size="sm">
                    Try in Sandbox
                  </Button>
                </div>
              </div>

              {/* Right Column: Clean Code & Canvas Preview (7 cols) */}
              <div className="lg:col-span-7 relative w-full h-full min-h-[280px] sm:min-h-[340px] rounded-xl bg-[#060B18] border border-white/[0.06] p-4 sm:p-6 flex flex-col justify-between overflow-hidden shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <span className="text-[11px] font-mono text-slate-400 pl-2">
                      labto.ai/{activeFeature.slug}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-[#39FF88] uppercase tracking-wider">
                    Auto Active
                  </span>
                </div>

                {/* Body */}
                <div className="py-4 flex-1 flex flex-col justify-center space-y-3">
                  <div className="w-full bg-[#0B132B]/80 border border-white/[0.06] rounded-lg p-3.5 font-mono text-left text-[11px] sm:text-xs overflow-x-auto text-slate-300 leading-relaxed">
                    <pre>
                      <code>{activeFeature.codeSnippet}</code>
                    </pre>
                  </div>
                  <p className="text-[11px] text-slate-400 font-normal">
                    {activeFeature.tagline}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <Link
                    href={`/features/${activeFeature.slug}`}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-[#39FF88] hover:underline"
                  >
                    <span>View Architecture & Specifications</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <span className="text-[10px] text-slate-500 font-mono">
                    {currentIndex + 1} / {filteredFeatures.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Auto-Scroll Navigation Controls */}
          <div className="flex items-center justify-between pt-4 px-2">
            <div className="flex items-center gap-1.5">
              {filteredFeatures.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? "w-6 bg-[#39FF88]"
                      : "w-1.5 bg-slate-800 hover:bg-slate-600"
                  }`}
                  title={`Feature ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20 transition cursor-pointer"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20 transition cursor-pointer"
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

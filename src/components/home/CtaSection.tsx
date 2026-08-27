"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="w-11/12 lg:w-9/12 lg:max-w-9/12 mx-auto">
        <div className="relative overflow-hidden rounded-md bg-[#1DBF73] p-8 sm:p-12 lg:p-14 text-white shadow-lg flex flex-col justify-center min-h-[300px]">
          {/* Concentric Circles Right Graphic Pattern (Anchored at Right Edge) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 pointer-events-none flex items-center justify-center opacity-90">
            <div className="w-[500px] h-[500px] sm:w-[680px] sm:h-[680px] rounded-full bg-white/10 flex items-center justify-center">
              <div className="w-[400px] h-[400px] sm:w-[540px] sm:h-[540px] rounded-full bg-white/15 flex items-center justify-center">
                <div className="w-[300px] h-[300px] sm:w-[410px] sm:h-[410px] rounded-full bg-white/20 flex items-center justify-center">
                  <div className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] rounded-full bg-white/30 flex items-center justify-center">
                    <div className="w-[110px] h-[110px] sm:w-[160px] sm:h-[160px] rounded-full bg-white/50 flex items-center justify-center">
                      <div className="w-[55px] h-[55px] sm:w-[75px] sm:h-[75px] rounded-full bg-white/80" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Left Content Column */}
          <div className="relative z-10 max-w-xl text-left space-y-4">
            <h2 className="font-degular text-2xl sm:text-3xl lg:text-4xl font-extrabold !text-white text-white tracking-tight leading-tight">
              Let's Get In Touch.
            </h2>
            <p className="text-white/90 text-xs sm:text-sm leading-relaxed max-w-lg">
              Your storefront AI assistant should serve you, not the other way around. We're happy to help you scale your store.
            </p>

            {/* Button matching Button component border-radius (rounded-md) */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href="/register"
                className="inline-flex items-center justify-between gap-6 sm:gap-8 pl-5 pr-2 py-2 rounded-md bg-[#111111] text-white font-medium text-xs sm:text-sm hover:bg-black transition-all shadow-md group cursor-pointer"
              >
                <span>Get Started Free</span>
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-white/20 group-hover:bg-white text-white group-hover:text-black flex items-center justify-center transition-colors shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

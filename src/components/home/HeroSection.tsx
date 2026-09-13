"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      router.push(`/register?email=${encodeURIComponent(email.trim())}`);
    } else {
      router.push("/register");
    }
  };

  return (
    <section className="w-full h-screen p-2 sm:p-3 flex flex-col box-border">
      {/* White Hero Container (Full Height 100vh flexbox) */}
      <div className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-xs relative flex flex-col justify-between">
        {/* Top Text & CTA Section */}
        <div className="w-11/12 lg:w-9/12 max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-28 text-center space-y-3 sm:space-y-4 shrink-0 z-20">
          {/* Main Cormorant Garamond Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-3xl sm:text-5xl lg:text-6xl xl:text-[68px] font-normal text-[#1f2429] tracking-tight leading-[1.08]"
          >
            AI agents shoppers love.
            <br />
            Sales you can prove.
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-inter text-xs sm:text-sm lg:text-base text-[#6e797b] max-w-xl mx-auto font-normal leading-relaxed"
          >
            The autonomous AI assistant that helps e-commerce teams own every customer interaction, from question resolution to 1-click cart checkout.
          </motion.p>

          {/* Floating Email CTA Pill Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2 sm:pt-3 pb-1 flex justify-center"
          >
            <form
              onSubmit={handleGetStarted}
              className="w-full max-w-md bg-white rounded-xl p-1.5 sm:p-2 border border-[#1f2429]/10 flex items-center justify-between gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="What's your work email?"
                className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-[#1f2429] placeholder:text-[#6e797b]/70 outline-none bg-transparent font-inter"
              />
              <button
                type="submit"
                className="px-5 sm:px-6 py-2.5 rounded-lg bg-[#1dbf73] hover:bg-[#19a463] text-white font-inter font-medium text-xs sm:text-sm whitespace-nowrap transition-all active:scale-[0.98] cursor-pointer shrink-0"
              >
                Get started
              </button>
            </form>
          </motion.div>
        </div>

        {/* Hero Image Container (Flex-1 to fill the remaining 100vh height seamlessly) */}
        <div className="relative w-full flex-1 min-h-[220px] overflow-hidden rounded-b-2xl mt-2">
          {/* Top Gradient Fade to blend seamlessly with pure white container */}
          <div className="absolute inset-x-0 top-0 h-24 sm:h-36 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-10" />

          {/* Background Hero Image - Anchored at the bottom */}
          <Image
            src="/hero-bgg.jpg"
            alt="AI Storefront Assistant Preview"
            fill
            priority
            quality={95}
            className="object-cover object-bottom"
          />
        </div>
      </div>
    </section>
  );
}


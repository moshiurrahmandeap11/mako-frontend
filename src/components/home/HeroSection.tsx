"use client";

import Button from "@/components/Button";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useRef, useState } from "react";

export default function HeroSection() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Track scroll from top of page (0px) to scrolled down (420px)
  const { scrollY } = useScroll();
  const videoScale = useTransform(scrollY, [0, 420], [0.7, 1]);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative pt-6 overflow-hidden bg-white">
      <div className="w-11/12 lg:w-9/12 lg:max-w-9/12 mx-auto space-y-10 text-center">
        {/* Commanding Fiverr-Style Headline */}
        <div className="max-w-4xl mx-auto space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-medium text-text-main tracking-tight leading-[1.12]"
          >
            Find the right AI assistant for your{" "}
            <span className="relative inline-block text-[#1DBF73]">
              E-Commerce Store
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-[#62646A] max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Convert more visitors with sub-second pgvector search,
            zero-hallucination policy answers, and 1-click cart injection.
          </motion.p>
        </div>

        {/* Fiverr-Style Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            href="/pricing"
            variant="primary"
            size="lg"
            className="px-8 py-3.5 text-sm font-bold shadow-md shadow-[#1DBF73]/20"
          >
            <span className="flex items-center gap-2">
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </span>
          </Button>

          <Button
            href="/contact"
            variant="secondary"
            size="lg"
            className="px-7 py-3.5 text-sm font-bold bg-white text-text-main border-border-light hover:border-[#1DBF73] hover:text-[#1DBF73]"
          >
            Partner with us
          </Button>
        </motion.div>

        {/* Feature Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 text-xs text-text-muted pt-1 font-medium"
        >
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#1DBF73]" />
            Free 1,500 credits to test
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#1DBF73]" />
            1-minute script embed
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#1DBF73]" />
            Zero credit expiration rollover
          </span>
        </motion.div>

        {/* Full-Width Showcase Video Frame with Scroll-Driven Expand */}
        <div className="w-full pt-4 pb-4 flex justify-center">
          <motion.div
            style={{
              scale: videoScale,
              transformOrigin: "center top",
            }}
            className="relative w-full rounded-md overflow-hidden p-2 bg-white text-left"
          >
            {/* HTML5 Showcase Video */}
            <video
              ref={videoRef}
              src="/hero.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full aspect-video object-cover rounded-xl"
            />

            {/* Video Bottom Left Live Status Pill */}
            <div className="absolute bottom-6 left-6 z-20 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-border-light">
              <span className="text-xs font-semibold text-text-main">
                Live AI Assistant
              </span>
            </div>

            {/* Sound Mute/Unmute Toggle Button */}
            <button
              onClick={toggleSound}
              className="absolute bottom-6 right-6 z-20 p-3 rounded-full bg-white/95 text-text-main hover:text-[#1DBF73] transition-all backdrop-blur-md shadow-lg border border-border-light flex items-center gap-2 group cursor-pointer"
              title={isMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#1DBF73]" />
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

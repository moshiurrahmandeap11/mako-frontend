"use client";

import Button from "@/components/Button";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
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
    <section className="relative pt-12 sm:pt-16 pb-12 sm:pb-20 overflow-hidden bg-white">
      <div className="w-11/12 lg:w-9/12 lg:max-w-9/12 mx-auto space-y-10 text-center">
        {/* Commanding Fiverr-Style Headline */}
        <div className="max-w-4xl mx-auto space-y-4 pt-4 sm:pt-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-degular text-2xl sm:text-4xl lg:text-5xl font-medium text-[#201515] tracking-tight leading-[1.15]"
          >
            Find the right AI assistant for your{" "}
            <span className="relative inline-block text-[#1DBF73]">
              Website
            </span>{" "}
            in 60 seconds
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-[#62646A] max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Turn website visitors into buyers with instant AI product recommendations, 24/7 automated support, and direct 1-click cart additions.
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



        {/* Full-Width Showcase Video Frame with Scroll-Driven Expand */}
        {/* <div className="w-full pt-4 pb-4 flex justify-center">
          <motion.div
            style={{
              scale: videoScale,
              transformOrigin: "center top",
            }}
            className="relative w-full rounded-md overflow-hidden p-2 bg-white text-left"
          >
            <video
              ref={videoRef}
              src="/hero.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full aspect-video object-cover rounded-xl"
            />

            <div className="absolute bottom-6 left-6 z-20 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-border-light">
              <span className="text-xs font-semibold text-text-main">
                Live AI Assistant
              </span>
            </div>

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
        </div> */}
      </div>
    </section>
  );
}

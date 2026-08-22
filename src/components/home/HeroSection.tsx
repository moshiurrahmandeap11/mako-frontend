'use client';

import { useState, useEffect, useRef } from 'react';
import Button from '@/components/Button';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroSection() {
  const dynamicWords = ["E-Commerce", "Blog", "Portfolio", "Website"];
  const [wordIndex, setWordIndex] = useState(0);

  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [dynamicWords.length]);

  return (
    <section className="relative pt-24 sm:pt-28 pb-12 px-2 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(57,255,136,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Full-Width Video Frame Container */}
        <div className="relative w-full rounded-md overflow-hidden p-1.5 sm:p-2">
          {/* HTML5 Video with ref */}
          <video
            ref={videoRef}
            src="/hero.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-115 sm:h-135 lg:h-150 object-cover rounded-md"
          />
          <div className="absolute bottom-5 sm:bottom-8 left-5 sm:left-8 right-16 sm:right-auto z-20 space-y-2.5 max-w-lg text-left">
            {/* Dynamic Rotating Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-base sm:text-lg lg:text-xl text-white tracking-tight flex flex-wrap items-center gap-x-1.5"
            >
              <span>AI Assistant for your</span>
              <span className="relative inline-block text-ai-green underline decoration-ai-green/60 underline-offset-4 font-bold">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block"
                  >
                    {dynamicWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Button href="/register" variant="primary" size="sm">
                Start Free Trial
              </Button>
              <Button href="/contact" variant="secondary" size="sm">
                Partner with us
              </Button>
            </div>
          </div>

          {/* Sound Mute/Unmute Toggle Button */}
          <button
            onClick={toggleSound}
            className="absolute bottom-5 sm:bottom-8 right-5 sm:right-8 z-20 p-2.5 rounded-full bg-prompt-blue/80 text-ai-green transition-all backdrop-blur-md shadow-2xl flex items-center gap-2 group cursor-pointer"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

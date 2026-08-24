"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SplashIntro() {
  const pathname = usePathname();
  const [showSplash, setShowSplash] = useState(false);
  const [stage, setStage] = useState<"drawing" | "flying" | "done">("drawing");
  const [targetCoords, setTargetCoords] = useState<{
    x: number;
    y: number;
    scale: number;
  }>({
    x: 0,
    y: 0,
    scale: 0.28,
  });

  const splashIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run splash on homepage on initial visit
    if (pathname !== "/") {
      setShowSplash(false);
      return;
    }

    const hasAnimated = sessionStorage.getItem("splash_animated");
    if (hasAnimated) {
      setShowSplash(false);
      return;
    }

    setShowSplash(true);

    const updateTargetCoords = () => {
      const targetEl = document.getElementById("navbar-logomark-target");
      const splashEl = splashIconRef.current;

      if (targetEl && splashEl) {
        const targetRect = targetEl.getBoundingClientRect();
        const splashRect = splashEl.getBoundingClientRect();

        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;

        const splashCenterX = splashRect.left + splashRect.width / 2;
        const splashCenterY = splashRect.top + splashRect.height / 2;

        const deltaX = targetCenterX - splashCenterX;
        const deltaY = targetCenterY - splashCenterY;
        const scale = targetRect.width / splashRect.width;

        setTargetCoords({
          x: deltaX,
          y: deltaY,
          scale: scale > 0 ? scale : 0.28,
        });
      }
    };

    updateTargetCoords();
    window.addEventListener("resize", updateTargetCoords);

    const flyTimer = setTimeout(() => {
      updateTargetCoords();
      setStage("flying");
    }, 900);

    const doneTimer = setTimeout(() => {
      setStage("done");
      setShowSplash(false);
      sessionStorage.setItem("splash_animated", "true");
    }, 1500);

    return () => {
      window.removeEventListener("resize", updateTargetCoords);
      clearTimeout(flyTimer);
      clearTimeout(doneTimer);
    };
  }, [pathname]);

  if (!showSplash) return null;

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: stage === "flying" ? 0.9 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          {/* Central Anchor Container */}
          <div className="relative flex flex-col items-center gap-4 z-10">
            {/* Morphing Logo Icon */}
            <motion.div
              ref={splashIconRef}
              initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
              animate={
                stage === "drawing"
                  ? { scale: 1, x: 0, y: 0, opacity: 1 }
                  : {
                      scale: targetCoords.scale,
                      x: targetCoords.x,
                      y: targetCoords.y,
                      opacity: 1,
                      transition: {
                        duration: 0.55,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    }
              }
              className="w-28 h-28 sm:w-36 sm:h-36 relative origin-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 500 500"
                className="w-full h-full"
              >
                <g
                  stroke="#1DBF73"
                  strokeWidth="28"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                >
                  {/* Chat Bubble Outline (Path Drawing) */}
                  <motion.path
                    d="M 120,90 H 380 A 50,50 0 0 1 430,140 V 310 A 50,50 0 0 1 380,360 H 350 L 380,415 L 310,360 H 120 A 50,50 0 0 1 70,310 V 140 A 50,50 0 0 1 120,90 Z"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: 0.7,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Hollow Letter L (Path Drawing) */}
                  <motion.path
                    d="M 155,160 V 290 H 235"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      duration: 0.45,
                      ease: "easeOut",
                    }}
                  />

                  {/* Hollow AI Sparkle Star (Path Drawing) */}
                  <motion.path
                    d="M 315,165 Q 315,225 375,225 Q 315,225 315,285 Q 315,225 255,225 Q 315,225 315,165 Z"
                    initial={{ pathLength: 0, opacity: 0, scale: 0.8 }}
                    animate={{ pathLength: 1, opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.35,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  />
                </g>
              </svg>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion } from "framer-motion";

export default function PlatformLogosBar() {
  const platforms = [
    {
      name: "Shopify",
      logo: "/ecommerce-platforms/shopify.svg",
      heightClass: "h-7 sm:h-8",
    },
    {
      name: "WooCommerce",
      logo: "/ecommerce-platforms/WooCommerce_logo_(2015).svg",
      heightClass: "h-6 sm:h-7",
    },
    {
      name: "Webflow",
      logo: "/ecommerce-platforms/Webflow_logo_2023.svg",
      heightClass: "h-5 sm:h-6",
    },
    {
      name: "BigCommerce",
      logo: "/ecommerce-platforms/bigcommerce-ar21.svg",
      heightClass: "h-7 sm:h-8",
    },
    {
      name: "Next.js",
      logo: "/ecommerce-platforms/Nextjs-logo.svg",
      heightClass: "h-5 sm:h-6",
    },
  ];

  // Repeat logos 8x (40 logo items) to ensure ultra-wide screens & zoomed-out viewports never see empty gaps
  const marqueeLogos = [
    ...platforms,
    ...platforms,
    ...platforms,
    ...platforms,
    ...platforms,
    ...platforms,
    ...platforms,
    ...platforms,
  ];

  return (
    <section className="py-12 sm:py-16 bg-surface-light border-y border-border-light overflow-hidden w-full">
      <div className="w-full space-y-6 text-center">
        <h2 className="font-degular text-xl sm:text-2xl lg:text-3xl font-medium text-[#201515] tracking-tight max-w-2xl mx-auto px-4 mb-10">
          Integrates Into Any Storefront in 2 Minutes
        </h2>

        {/* Outer Marquee Container with Gradient Side Fades */}
        <div className="relative w-full overflow-hidden py-3">
          {/* Left & Right Smooth Side Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 z-10 bg-gradient-to-r from-surface-light via-surface-light/80 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 z-10 bg-gradient-to-l from-surface-light via-surface-light/80 to-transparent pointer-events-none" />

          {/* 100% Gap-Free Framer Motion Track */}
          <motion.div
            className="flex items-center gap-14 sm:gap-20 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 35,
              repeat: Infinity,
            }}
          >
            {marqueeLogos.map((platform, i) => (
              <div
                key={`${platform.name}-${i}`}
                className="flex items-center justify-center shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-200 group cursor-default"
              >
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className={`${platform.heightClass} w-auto object-contain transition-transform duration-200 group-hover:scale-105`}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

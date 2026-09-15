"use client";

import { motion } from "framer-motion";

export default function PlatformLogosBar() {
  const platforms = [
    {
      name: "Shopify",
      logo: "/ecommerce-platforms/shopify.svg",
      heightClass: "h-7 sm:h-8 md:h-9",
    },
    {
      name: "WooCommerce",
      logo: "/ecommerce-platforms/WooCommerce_logo_(2015).svg",
      heightClass: "h-6 sm:h-7 md:h-8",
    },
    {
      name: "Webflow",
      logo: "/ecommerce-platforms/Webflow_logo_2023.svg",
      heightClass: "h-5 sm:h-6 md:h-7",
    },
    {
      name: "BigCommerce",
      logo: "/ecommerce-platforms/bigcommerce-ar21.svg",
      heightClass: "h-9 sm:h-12 md:h-13",
    },
    {
      name: "Next.js",
      logo: "/ecommerce-platforms/Nextjs-logo.svg",
      heightClass: "h-4 sm:h-5 md:h-6",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-bg w-full">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8 text-center">
        {/* Title & Description */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1f2429] tracking-tight">
            Integrates Into Any Storefront in 2 Minutes
          </h2>
          <p className="font-inter text-xs sm:text-sm text-[#6e797b] font-normal leading-relaxed">
            Connect your AI assistant to your existing e-commerce storefront or custom tech stack with zero complex engineering.
          </p>
        </div>

        {/* Single Row Container without Borders */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-transparent rounded-2xl overflow-hidden"
        >
          <div className="grid grid-cols-5">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="h-20 sm:h-24 md:h-28 flex items-center justify-center p-2 sm:p-4 md:p-6 group cursor-default"
              >
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className={`${platform.heightClass} max-w-full w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-200`}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}






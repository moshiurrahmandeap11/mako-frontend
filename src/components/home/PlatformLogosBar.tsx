"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Store, Globe, Zap, Code2 } from "lucide-react";

export default function PlatformLogosBar() {
  const platforms = [
    { name: "Shopify", icon: ShoppingBag, color: "#95BF47" },
    { name: "WooCommerce", icon: Store, color: "#96588A" },
    { name: "Webflow", icon: Globe, color: "#146EF5" },
    { name: "BigCommerce", icon: Zap, color: "#121118" },
    { name: "Next.js / Custom", icon: Code2, color: "#000000" },
  ];

  return (
    <section className="py-14 sm:py-16 bg-surface-light border-y border-border-light">
      <div className="w-11/12 lg:w-9/12 max-w-7xl mx-auto space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Integrates seamlessly into any e-commerce storefront in under 2 minutes
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 pt-2">
          {platforms.map((platform, i) => {
            const Icon = platform.icon;
            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="flex items-center gap-2.5 text-text-muted hover:text-text-main transition-colors group cursor-default"
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: platform.color }} />
                <span className="text-sm font-semibold tracking-tight">
                  {platform.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

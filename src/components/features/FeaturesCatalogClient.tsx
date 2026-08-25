"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Sliders,
  FileText,
  Camera,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Button from "@/components/Button";
import { FeatureItem } from "@/data/features";

export default function FeaturesCatalogClient({
  features,
}: {
  features: FeatureItem[];
}) {
  const getIcon = (slug: string) => {
    switch (slug) {
      case "rag-search":
        return <Search className="w-6 h-6" />;
      case "cart-bridge":
        return <ShoppingCart className="w-6 h-6" />;
      case "knowledge-base":
        return <FileText className="w-6 h-6" />;
      case "ar-tryon":
        return <Camera className="w-6 h-6" />;
      case "widget-customizer":
        return <Sliders className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-text-main flex flex-col overflow-hidden">
      <main className="relative z-10 flex-1 px-6 lg:px-0 lg:max-w-9/12 mx-auto w-full py-6 flex flex-col justify-center space-y-12">
        {/* Header */}
        <div className="max-w-3xl text-left space-y-4">

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl tracking-tight text-text-main leading-tight"
          >
            Enterprise AI Features Built for Modern E-Commerce.
          </motion.h1>

          <p className="text-[#62646A] text-sm sm:text-base leading-relaxed font-normal">
            Click on any feature card below to watch the live video demonstration, inspect architectural mechanics, and copy integration SDK snippets.
          </p>
        </div>

        {/* Features Interactive Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                href={`/features/${feat.slug}`}
                className="group h-full p-8 bg-white border border-border-light rounded-md hover:border-[#1DBF73] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="space-y-4">

                  <h3 className="text-lg font-medium text-text-main transition-colors duration-300">
                    {feat.title}
                  </h3>

                  <p className="text-text-main text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-border-light flex items-center justify-between text-sm group-hover:text-[#1DBF73] transition-colors duration-300">
                  <span>View Architecture & Specs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="p-8 rounded-md border border-border-light flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <h4 className="text-lg text-text-main">
              Ready to automate your online store?
            </h4>
            <p className="text-text-main text-sm mt-1">
              Get started in under 2 minutes with our 1-click script snippet.
            </p>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button href="/pricing" variant="primary" size="lg">
              Start Free Trial
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

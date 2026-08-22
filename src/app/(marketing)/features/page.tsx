'use client';

import Link from 'next/link';
import NetworkWave from '@/components/NetworkWave';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Sliders, Zap, FileText, Camera, ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/Button';
import { FEATURES_DATA } from '@/data/features';

export default function FeaturesPage() {
  const getIcon = (slug: string) => {
    switch (slug) {
      case 'rag-search':
        return <Search className="w-6 h-6" />;
      case 'cart-bridge':
        return <ShoppingCart className="w-6 h-6" />;
      case 'knowledge-base':
        return <FileText className="w-6 h-6" />;
      case 'ar-tryon':
        return <Camera className="w-6 h-6" />;
      case 'widget-customizer':
        return <Sliders className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0B132B] text-slate-100 flex flex-col overflow-hidden">
      {/* Background Wave */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <NetworkWave />
      </div>

      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 pt-36 pb-20 flex flex-col justify-center space-y-12">
        {/* Header */}
        <div className="max-w-3xl text-left space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#39FF88]/10 border border-[#39FF88]/30 text-[#39FF88] text-xs font-bold uppercase tracking-widest"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Autonomous Storefront Capabilities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight"
          >
            Enterprise AI Features Built for Modern E-Commerce.
          </motion.h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Click on any feature card below to watch the live video demonstration, inspect architectural mechanics, and copy integration SDK snippets.
          </p>
        </div>

        {/* Features Interactive Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_DATA.map((feat, idx) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                href={`/features/${feat.slug}`}
                className="group h-full p-8 bg-[#131D38] border border-[#39FF88]/20 rounded-2xl hover:border-[#39FF88]/70 hover:shadow-[0_10px_30px_rgba(57,255,136,0.15)] transition-all duration-300 flex flex-col justify-between block relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl border border-[#39FF88]/30 flex items-center justify-center text-[#39FF88] bg-[#0B132B] group-hover:bg-[#39FF88] group-hover:text-[#0B132B] transition-all duration-300">
                      {getIcon(feat.slug)}
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#39FF88] bg-[#39FF88]/10 px-2.5 py-1 rounded-full border border-[#39FF88]/20">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#39FF88] transition-colors duration-300">
                    {feat.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#39FF88]/15 flex items-center justify-between text-xs font-bold text-[#39FF88]">
                  <span>Watch Video & Details</span>
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
          className="mt-16 p-8 rounded-3xl bg-[#131D38] border border-[#39FF88]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <h4 className="text-lg font-bold text-white">Ready to automate your online store?</h4>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">Get started in under 2 minutes with our 1-click script snippet.</p>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button href="/register" variant="primary" size="lg">
              Start Free Trial
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

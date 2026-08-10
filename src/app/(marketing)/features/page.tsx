'use client';

import NetworkWave from '@/components/NetworkWave';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Sliders, Zap } from 'lucide-react';
import Button from '@/components/Button';

export default function FeaturesPage() {
  const features = [
    {
      icon: Search,
      title: 'Contextual Semantic Search',
      desc: 'Bypass rigid keyword matches. Labto AI understands conversational intents, synonyms, and natural phrasing to suggest the perfect products instantly.',
    },
    {
      icon: ShoppingCart,
      title: 'Cart Event Bridge',
      desc: 'Triggers context-aware assistance when shoppers abandon items, dynamically offering personalized guides or tailored answers to clear doubts.',
    },
    {
      icon: Sliders,
      title: 'Tailored Styling Engine',
      desc: 'Style the assistant without writing CSS. Customize colors, fonts, shapes, and placement to match your brand style guides in one click.',
    },
    {
      icon: Zap,
      title: 'Low-Latency Embeddings',
      desc: 'Queries resolved in under 50ms using a specialized vector pipeline, delivering answers before the user has finished typing their query.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      {/* Background Wave */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <NetworkWave />
      </div>


      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-6 pt-36 pb-20 flex flex-col justify-center">
        {/* Header */}
        <div className="max-w-2xl mb-16 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-[0.2em] text-orange-500 uppercase mb-3"
          >
            Core Capabilities
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-medium tracking-tight text-white leading-tight"
          >
            Capabilities designed to transform <br className="hidden sm:inline" />
            your store's conversation.
          </motion.h1>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-8 bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded hover:border-slate-700/80 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded border border-slate-800 flex items-center justify-center text-amber-500 bg-slate-950 group-hover:border-amber-500/50 transition-colors duration-300 mb-6">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-amber-500 transition-colors duration-300">
                  {feat.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <h4 className="text-base font-semibold text-white">Ready to elevate your conversion rate?</h4>
            <p className="text-slate-400 text-sm mt-1">Get started for free or partner with us for high-volume stores.</p>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button href="/register" className="w-full sm:w-auto px-6 py-3">
              Get Started Free
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

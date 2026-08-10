'use client';

import NetworkWave from '@/components/NetworkWave';
import { motion } from 'framer-motion';
import { Database, Cpu, Shield, Zap } from 'lucide-react';
import Button from '@/components/Button';

export default function TechnologyPage() {
  const techSpecs = [
    {
      icon: Database,
      title: 'pgvector Hybrid Embeddings',
      desc: 'Utilizing Postgres pgvector extension to run hybrid dense vector and keyword matches, giving extremely fast and precise retrieval of your store products.',
    },
    {
      icon: Cpu,
      title: 'Contextual Memory Orchestrator',
      desc: 'Powered by highly optimized LLMs that hold shopper contexts across multiple pages, cart changes, and sessions to guide users all the way to checkout.',
    },
    {
      icon: Shield,
      title: 'Decoupled Edge Isolation',
      desc: 'Labto AI loads asynchronously through a lightweight CDN script, ensuring no interference with your website’s initial page load speeds or core metrics.',
    },
    {
      icon: Zap,
      title: 'Instant Event Syncing',
      desc: 'Real-time client-side event listener that syncs user browsing patterns, clicks, and cart actions to construct prompts with real-time awareness.',
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
            Engineering Stack
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-medium tracking-tight text-white leading-tight"
          >
            Engineered for performance, speed, <br className="hidden sm:inline" />
            and high-volume transactions.
          </motion.h1>
        </div>

        {/* Technology Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {techSpecs.map((spec, idx) => {
            const Icon = spec.icon;
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
                  {spec.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {spec.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <h4 className="text-base font-semibold text-white">Curious about custom LLM integrations?</h4>
            <p className="text-slate-400 text-sm mt-1">We can hook up custom embeddings or fine-tuned models for enterprises.</p>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button href="/register" className="w-full sm:w-auto px-6 py-3">
              Explore Integration Docs
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

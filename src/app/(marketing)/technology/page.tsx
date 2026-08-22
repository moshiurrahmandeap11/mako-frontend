'use client';

import NetworkWave from '@/components/NetworkWave';
import { motion } from 'framer-motion';
import { Database, Cpu, Shield, Zap, Code, Camera } from 'lucide-react';
import Button from '@/components/Button';

export default function TechnologyPage() {
  const techSpecs = [
    {
      icon: Database,
      title: 'pgvector Hybrid Embeddings',
      desc: 'Utilizing Postgres pgvector extension to run hybrid dense vector and keyword matches, delivering sub-second, ultra-precise retrieval of your store products.',
    },
    {
      icon: Cpu,
      title: 'Gemini 2.0 Flash AI Pipeline',
      desc: 'Powered by Google Gemini 2.0 Flash with a hard 1.2-second race deadline and in-memory FAQ fast-paths to guide users all the way to checkout.',
    },
    {
      icon: Shield,
      title: 'Decoupled CDN Script & CORS Security',
      desc: 'Labto AI loads asynchronously via a lightweight CDN script (< 40KB gzip), with strict CORS preflight checks ensuring zero impact on your storefront page speed.',
    },
    {
      icon: Zap,
      title: 'Real-Time Event Bridge',
      desc: 'Client-side event listener that syncs user browsing patterns, clicks, and cart actions to construct prompts with real-time awareness.',
    },
    {
      icon: Camera,
      title: 'WebAssembly AR Pose Engine',
      desc: 'Integrates Google MediaPipe Pose models executing 100% client-side via WebGL shaders, tracking 33 body landmarks at 60 FPS with $0 cloud GPU cost.',
    },
    {
      icon: Code,
      title: 'Automated PDF & Document Parsing',
      desc: 'Native backend document parsing pipeline utilizing pdfkit and custom text chunkers to index store catalogs and knowledge bases automatically.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0B132B] text-slate-100 flex flex-col overflow-hidden">
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
            className="text-xs font-bold tracking-[0.2em] text-[#39FF88] uppercase mb-3"
          >
            Engineering Stack
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
          >
            Engineered for Sub-Second Performance, <br className="hidden sm:inline" />
            Security, and High-Volume Scale.
          </motion.h1>
        </div>

        {/* Technology Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techSpecs.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-8 bg-[#131D38] backdrop-blur-md border border-[#39FF88]/20 rounded-xl hover:border-[#39FF88]/60 transition-all duration-300 shadow-xl"
              >
                <div className="w-12 h-12 rounded-lg border border-[#39FF88]/30 flex items-center justify-center text-[#39FF88] bg-[#0B132B] group-hover:bg-[#39FF88] group-hover:text-[#0B132B] transition-all duration-300 mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#39FF88] transition-colors duration-300">
                  {spec.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
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
          className="mt-16 pt-8 border-t border-[#39FF88]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <h4 className="text-base font-bold text-white">Curious about custom LLM integrations?</h4>
            <p className="text-slate-400 text-sm mt-1">We can hook up custom embeddings or fine-tuned models for enterprise stores.</p>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button href="/register" className="w-full sm:w-auto px-6 py-3 bg-[#39FF88] text-[#0B132B] hover:bg-[#00CC66] font-bold">
              Explore Documentation
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

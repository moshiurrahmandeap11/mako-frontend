'use client';

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
    <div className="relative min-h-screen bg-white text-[#222325] flex flex-col overflow-hidden">
      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-6 pt-36 pb-20 flex flex-col justify-center">
        {/* Header */}
        <div className="max-w-2xl mb-16 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-wider text-[#1DBF73] uppercase mb-3 bg-[#E8F8F0] px-3 py-1 rounded-full border border-[#1DBF73]/20 inline-block"
          >
            Engineering Stack
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#222325] leading-tight"
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
                className="group relative p-8 bg-white border border-[#E4E5E7] rounded-2xl hover:border-[#1DBF73] hover:shadow-lg transition-all duration-300 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl border border-[#1DBF73]/20 flex items-center justify-center text-[#1DBF73] bg-[#E8F8F0] group-hover:bg-[#1DBF73] group-hover:text-white transition-all duration-300 mb-6 font-bold">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#222325] mb-3 group-hover:text-[#1DBF73] transition-colors duration-300">
                  {spec.title}
                </h3>
                <p className="text-[#62646A] text-sm leading-relaxed">
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
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 p-8 bg-[#F7F7F7] border border-[#E4E5E7] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div>
            <h4 className="text-base font-bold text-[#222325]">Curious about custom LLM integrations?</h4>
            <p className="text-[#62646A] text-sm mt-1">We can hook up custom embeddings or fine-tuned models for enterprise stores.</p>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button href="/docs" variant="primary" className="w-full sm:w-auto">
              Explore Documentation
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

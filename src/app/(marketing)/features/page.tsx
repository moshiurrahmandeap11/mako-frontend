'use client';

import NetworkWave from '@/components/NetworkWave';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Sliders, Zap, FileText, Camera, Shield, Cpu } from 'lucide-react';
import Button from '@/components/Button';

export default function FeaturesPage() {
  const features = [
    {
      icon: Search,
      title: 'Sub-Second RAG Vector Search Engine',
      desc: 'Bypass rigid keyword matches. Labto AI leverages Gemini 2.0 Flash AI and pgvector embeddings to deliver intelligent context-aware product recommendations in under 1.2 seconds.',
    },
    {
      icon: FileText,
      title: 'PDF & Document Knowledge Indexer',
      desc: 'Drag and drop store FAQs, warranty docs, or manuals in PDF/Word format. Labto AI automatically parses, chunks, and indexes knowledge to answer shopper queries on autopilot.',
    },
    {
      icon: ShoppingCart,
      title: 'Cart Event & Checkout Bridge',
      desc: 'Triggers context-aware assistance when shoppers abandon items, dynamically offering personalized guides or tailored answers to clear doubts and boost conversions.',
    },
    {
      icon: Sliders,
      title: 'Tailored Styling & Widget Controls',
      desc: 'Style the assistant without writing CSS. Customize colors, greeting messages, shapes, and placement with a live iframe simulator matching your store brand.',
    },
    {
      icon: Camera,
      title: 'AR Live Camera Fitting Room',
      desc: 'Browser-based real-time 60 FPS body landmark estimation (Google MediaPipe Pose). Shoppers can visually try on apparel live with zero server GPU cost.',
    },
    {
      icon: Shield,
      title: 'Multi-Tenant Security & PDF Exports',
      desc: 'Strict tenant data isolation, CORS preflight guards, and 1-click A4 PDF report transcript generation for merchant records and sales analytics.',
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
            Core Capabilities
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
          >
            Enterprise AI Features <br className="hidden sm:inline" />
            Designed for Modern E-Commerce.
          </motion.h1>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
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
                  {feat.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
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
          className="mt-16 pt-8 border-t border-[#39FF88]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <h4 className="text-base font-bold text-white">Ready to elevate your conversion rate?</h4>
            <p className="text-slate-400 text-sm mt-1">Get started for free or partner with us for high-volume stores.</p>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button href="/register" className="w-full sm:w-auto px-6 py-3 bg-[#39FF88] text-[#0B132B] hover:bg-[#00CC66] font-bold">
              Start Free Trial
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Database, Cpu, Shield, Zap, Code, Camera, LucideIcon } from "lucide-react";
import Button from "@/components/Button";

interface TechSpec {
  iconName: string;
  title: string;
  desc: string;
}

export default function TechnologyClient({
  techSpecs,
}: {
  techSpecs: TechSpec[];
}) {
  const getIcon = (name: string): LucideIcon => {
    switch (name) {
      case "Database":
        return Database;
      case "Cpu":
        return Cpu;
      case "Shield":
        return Shield;
      case "Zap":
        return Zap;
      case "Camera":
        return Camera;
      case "Code":
      default:
        return Code;
    }
  };

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
            const Icon = getIcon(spec.iconName);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-8 bg-white border border-[#E4E5E7] rounded-2xl hover:border-[#1DBF73] hover:shadow-lg transition-all duration-300 shadow-sm text-left"
              >
                <div className="w-12 h-12 rounded-xl border border-[#1DBF73]/20 flex items-center justify-center text-[#1DBF73] bg-[#E8F8F0] group-hover:bg-[#1DBF73] group-hover:text-white transition-all duration-300 mb-6 font-bold">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#222325] mb-3 group-hover:text-[#1DBF73] transition-colors duration-300">
                  {spec.title}
                </h3>
                <p className="text-[#62646A] text-sm leading-relaxed font-normal">
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
          className="mt-16 p-8 bg-[#F7F7F7] border border-[#E4E5E7] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm text-left"
        >
          <div>
            <h4 className="text-base font-bold text-[#222325]">
              Curious about custom LLM integrations?
            </h4>
            <p className="text-[#62646A] text-sm mt-1 font-normal">
              We can hook up custom embeddings or fine-tuned models for enterprise stores.
            </p>
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

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
    <div className="relative min-h-screen bg-white text-text-main flex flex-col overflow-hidden">
      <main className="relative z-10 flex-1 px-6 lg:px-0 lg:max-w-9/12 mx-auto w-full py-6 flex flex-col justify-center">
        {/* Header */}
        <div className="max-w-3xl mb-6 text-left">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl tracking-tight text-text-main leading-tight"
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
                className="group relative p-8 bg-white border border-[#E4E5E7] rounded-md hover:border-[#1DBF73] transition-all duration-300 text-left"
              >
                <h3 className="text-lg font-bold text-text-main mb-3">
                  {spec.title}
                </h3>
                <p className="text-text-main text-sm leading-relaxed font-normal">
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
          className="mt-16 p-8 bg-surface-light border border-border-light rounded-md flex flex-col md:flex-row items-center justify-between gap-6 text-left"
        >
          <div>
            <h4 className="text-lg text-text-main">
              Curious about custom LLM integrations?
            </h4>
            <p className="text-text-main text-sm mt-1 font-normal">
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

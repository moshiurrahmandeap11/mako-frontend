"use client";

import { Code2, Cpu, Palette, ShoppingBag } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Connect Your Website",
      description:
        "Paste your website URL or insert our 1-line script tag into Shopify, WooCommerce, Webflow, or custom Next.js websites.",
      icon: Code2,
      gridSpan: "lg:col-span-7",
    },
    {
      step: "02",
      title: "Auto-Sync Catalog & Knowledge",
      description:
        "Our automated crawler ingests store products, FAQs, shipping policies, and warranty rules into vector embeddings automatically.",
      icon: Cpu,
      gridSpan: "lg:col-span-5",
    },
    {
      step: "03",
      title: "Customize Assistant Theme",
      description:
        "Style brand colors, launcher icons, bot name, and initial greeting prompts directly from your merchant dashboard.",
      icon: Palette,
      gridSpan: "lg:col-span-5",
    },
    {
      step: "04",
      title: "Automate Support & Cart Sales",
      description:
        "Your AI shopping assistant answers customer queries 24/7, recommends relevant products, and injects items directly into host store carts.",
      icon: ShoppingBag,
      gridSpan: "lg:col-span-7",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white border-y border-border-light relative overflow-hidden">
      <div className="w-11/12 lg:w-9/12 lg:max-w-9/12 mx-auto space-y-12 relative z-10">
        {/* Section Title */}
        <div className="text-left space-y-2 max-w-3xl">
          <h2 className="font-degular text-2xl sm:text-3xl lg:text-4xl font-medium text-[#201515] tracking-tight">
            How Labto AI Works
          </h2>
          <p className="text-[#62646A] text-xs sm:text-sm font-normal leading-relaxed">
            Go live with your AI sales assistant in 4 simple steps with zero coding required.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className={`${item.gridSpan} rounded-xl bg-white border border-border-light p-6 sm:p-8 flex flex-col justify-between hover:bg-[#1DBF73] hover:border-[#1DBF73] transition-all duration-300 group cursor-pointer text-left space-y-4`}
              >
                {/* Step Header */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl sm:text-3xl font-bold font-degular text-[#1DBF73] group-hover:!text-white transition-colors duration-300">
                    {item.step}
                  </span>
                  <Icon className="w-6 sm:w-7 h-6 sm:h-7 text-[#201515] group-hover:!text-white transition-colors duration-300" strokeWidth={1.25} />
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="font-degular text-lg sm:text-xl font-medium text-[#201515] group-hover:!text-white tracking-tight transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[#62646A] group-hover:!text-white text-xs sm:text-sm leading-relaxed transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
}

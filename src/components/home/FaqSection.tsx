"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How long does installation take?",
      answer:
        "Under 2 minutes. All you need to do is copy 1 line of JavaScript from your dashboard and paste it into your store's HTML header, Shopify theme, or Webflow custom code setting.",
    },
    {
      question: "Will the chat widget slow down my website?",
      answer:
        "Not at all. The widget is packaged as an ultra-lightweight (<15KB) bundle that loads asynchronously after your store's main content has completely rendered.",
    },
    {
      question: "Can the AI hallucinate wrong prices or non-existent items?",
      answer:
        "No. Labto AI utilizes strict vector database grounding (pgvector) connected directly to your uploaded store catalog and knowledge chunks, guaranteeing 0% pricing hallucinations.",
    },
    {
      question: "How does the 1-Click Cart Injection work?",
      answer:
        "The widget communicates with your store using custom browser events (CustomEvent bridge). When a shopper asks the bot to add a product, it dispatches an event directly to your storefront cart without exposing private API keys.",
    },
    {
      question: "Can I customize the widget colors, logo, and avatar?",
      answer:
        "Yes! You can fully customize primary colors, header background, launcher icons, greeting prompts, and bot avatar images from your merchant dashboard.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-t border-border-light">
      <div className="w-11/12 lg:w-9/12 max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1DBF73]/10 text-[#1DBF73] text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-degular text-2xl sm:text-4xl font-medium text-[#201515] tracking-tight">
            Everything You Need To Know
          </h2>
          <p className="text-sm text-[#62646A] max-w-xl mx-auto">
            Got questions about setup, compatibility, or AI safety? We have answers.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-border-light rounded-xl overflow-hidden bg-white transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-semibold text-text-main pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-text-muted transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-[#1DBF73]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#62646A] leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

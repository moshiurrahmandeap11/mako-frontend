"use client";

import Button from "@/components/Button";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Database,
  FileText,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";

interface TechItem {
  id: string;
  tabLabel: string;
  tabBadge: string;
  badgeType?: "popular" | "default";
  icon: typeof Database;
  title: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  secondaryText: string;
  codeHeader: string;
  codeSnippet: string;
  footnote: string;
}

export default function TechStackSection() {
  const [activeTabId, setActiveTabId] = useState<string>("pgvector");

  const techItems: TechItem[] = [
    {
      id: "pgvector",
      tabLabel: "pgvector Semantic Search",
      tabBadge: "Sub-Second",
      icon: Database,
      title: "Vector Distance Engine",
      headline: "Describe what you want. AI finds it instantly.",
      description:
        "Converts natural language shopper prompts into 1536-dimensional vector embeddings with cosine similarity distance scoring in under 1.2 seconds.",
      ctaText: "Explore RAG Engine",
      ctaHref: "/features/rag-search",
      secondaryText: "pgvector + Gemini 2.0",
      codeHeader: "PostgreSQL Pooler Query",
      codeSnippet: `SELECT id, title, price, imageUrl,
       (embedding <=> $1::vector) as distance
FROM "Product"
WHERE "merchantId" = $2 AND "inStock" = true
ORDER BY distance ASC
LIMIT 5;`,
      footnote:
        "* Matches buyer intent with cosine vector embeddings against active store catalog.",
    },
    {
      id: "cart-bridge",
      tabLabel: "Storefront Cart Event Bridge",
      tabBadge: "Popular",
      badgeType: "popular",
      icon: ShoppingCart,
      title: "Decoupled Storefront Bridge",
      headline: "Seamless 1-click cart injection for any store.",
      description:
        "Decoupled iframe architecture emits standardized CustomEvents to mutate Shopify, WooCommerce, or custom Next.js carts without exposing backend secrets.",
      ctaText: "Inspect Event Bridge",
      ctaHref: "/features/cart-bridge",
      secondaryText: "15ms Event Dispatch",
      codeHeader: "window.dispatchEvent Listener",
      codeSnippet: `window.addEventListener("ai-widget:add-to-cart", (e) => {
  const { productId, variantId, quantity } = e.detail;
  storefrontCart.addItem({ productId, variantId, quantity });
  storefrontCart.openDrawer();
});`,
      footnote:
        "* Universal CustomEvent architecture compatible with all storefront checkout drawers.",
    },
    {
      id: "knowledge-base",
      tabLabel: "PDF & Document Parser",
      tabBadge: "Auto-Sync",
      icon: FileText,
      title: "Knowledge Ingestion Pipeline",
      headline: "Drop your policy documents. AI learns instantly.",
      description:
        "Auto-extracts, chunks, and indexes warranty terms, return policies, and size charts from PDF and DOCX files with zero hallucinated answers.",
      ctaText: "View Parser Docs",
      ctaHref: "/features/knowledge-base",
      secondaryText: "500 pages / minute",
      codeHeader: "Knowledge Chunking API",
      codeSnippet: `const response = await fetch('/api/knowledge-base/upload', {
  method: 'POST',
  headers: { 'x-api-key': 'YOUR_API_KEY' },
  body: formData // PDF or DOCX file stream
});`,
      footnote:
        "* Strict truth grounding ensuring zero fabricated responses for store policies.",
    },
  ];

  const activeItem =
    techItems.find((item) => item.id === activeTabId) || techItems[0];
  const IconComponent = activeItem.icon;

  return (
    <section
      id="technology"
      className="py-20 px-4 sm:px-6 bg-white border-t border-[#E4E5E7] relative"
    >
      <div className="w-11/12 lg:w-10/12 max-w-10/12 max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Section Header */}
        <div className="text-left max-w-7xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#222325] tracking-tight">
            Next-Gen Architecture & Integration
          </h2>
          <p className="text-[#62646A] text-xs sm:text-sm font-normal leading-relaxed">
            Engineered with pgvector indexing, decoupled iframe security, and
            Gemini 2.0 Flash speed.
          </p>
        </div>

        {/* Interactive Workspace Container */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F7F7F7] border border-[#E4E5E7] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Vertical Selection Tabs (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-2">
            <div className="space-y-2">
              {techItems.map((item) => {
                const ItemIcon = item.icon;
                const isActive = item.id === activeTabId;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTabId(item.id)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-center justify-between border cursor-pointer ${
                      isActive
                        ? "bg-white border-2 border-[#1DBF73] shadow-md shadow-[#1DBF73]/10"
                        : "bg-white/60 border-[#E4E5E7] hover:bg-white text-[#62646A]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isActive
                            ? "bg-[#E8F8F0] text-[#1DBF73] font-bold"
                            : "bg-[#F7F7F7] text-[#74767E]"
                        }`}
                      >
                        <ItemIcon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <p
                          className={`text-xs font-bold ${
                            isActive ? "text-[#222325]" : "text-[#404145]"
                          }`}
                        >
                          {item.tabLabel}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        item.badgeType === "popular"
                          ? "bg-[#E8F8F0] text-[#1DBF73] border-[#1DBF73]/30 font-bold"
                          : isActive
                            ? "bg-[#E8F8F0] text-[#1DBF73] border-[#1DBF73]/20 font-bold"
                            : "bg-[#F7F7F7] text-[#74767E] border-[#E4E5E7]"
                      }`}
                    >
                      {item.tabBadge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Summary Footnote */}
            <div className="p-4 rounded-2xl bg-white border border-[#E4E5E7] text-[11px] text-[#62646A] space-y-1.5 shadow-sm hidden lg:block">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1DBF73] block">
                Store Integration SLA
              </span>
              <p>
                Asynchronous lightweight script payload under 40KB gzip with
                instant hydration.
              </p>
            </div>
          </div>

          {/* Right Column: Active Item Panel (8 cols) */}
          <div className="lg:col-span-8 rounded-2xl bg-white border border-[#E4E5E7] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden text-left shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 flex-1 flex flex-col justify-between relative z-10"
              >
                {/* Header Icon + Module Title */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E8F8F0] border border-[#1DBF73]/30 flex items-center justify-center text-[#1DBF73]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#1DBF73]">
                        {activeItem.title}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#222325] tracking-tight">
                    {activeItem.headline}
                  </h3>

                  <p className="text-[#62646A] text-xs sm:text-sm font-normal leading-relaxed max-w-2xl">
                    {activeItem.description}
                  </p>
                </div>

                {/* Code / Architecture Box (Clean Light Theme) */}
                <div className="bg-[#F7F7F7] border border-[#E4E5E7] rounded-xl p-4 font-mono text-xs overflow-hidden shadow-inner">
                  <div className="flex items-center justify-between border-b border-[#E4E5E7] pb-2 mb-3">
                    <span className="text-[10px] uppercase tracking-wider text-[#74767E] font-bold">
                      {activeItem.codeHeader}
                    </span>
                    <span className="text-[10px] font-mono text-[#1DBF73] font-bold bg-[#E8F8F0] px-2 py-0.5 rounded-full border border-[#1DBF73]/20">
                      Production Ready
                    </span>
                  </div>

                  <pre className="text-[11px] text-[#222325] overflow-x-auto leading-relaxed select-all bg-white p-3 rounded-lg border border-[#E4E5E7]">
                    <code>{activeItem.codeSnippet}</code>
                  </pre>

                  <div className="mt-3 pt-2 border-t border-[#E4E5E7] text-[10px] text-[#74767E] font-sans">
                    {activeItem.footnote}
                  </div>
                </div>

                {/* Action CTA & Badge */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Button
                      href={activeItem.ctaHref}
                      variant="primary"
                      size="sm"
                      icon={<ArrowRight className="w-3.5 h-3.5" />}
                      iconPosition="right"
                    >
                      {activeItem.ctaText}
                    </Button>
                  </div>

                  <span className="text-xs text-[#74767E] font-normal">
                    Performance:{" "}
                    <strong className="text-[#1DBF73] font-bold">
                      {activeItem.secondaryText}
                    </strong>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

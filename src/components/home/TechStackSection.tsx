"use client";

import Button from "@/components/Button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Database, FileText, ShoppingCart } from "lucide-react";
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
    <section id="technology" className="py-6 bg-white relative">
      <div className="w-11/12 lg:w-9/12 lg:max-w-9/12 mx-auto space-y-10 relative z-10">
        {/* Section Header */}
        <div className="text-left space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-text-main tracking-tight">
            Next-Gen Architecture & Integration
          </h2>
          <p className="text-[#62646A] text-xs sm:text-sm leading-relaxed">
            Engineered with pgvector indexing, decoupled iframe security, and
            Gemini 2.0 Flash speed.
          </p>
        </div>

        {/* Interactive Workspace Container */}
        <div className="p-2 sm:p-4 rounded-md bg-surface-light grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
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
                    className={`w-full text-left p-4 rounded-md transition-all duration-200 flex items-center justify-between border cursor-pointer ${
                      isActive
                        ? "bg-white border-2 border-[#1DBF73] shadow-md shadow-[#1DBF73]/10"
                        : "bg-white/60 border-border-light hover:bg-white text-[#62646A]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-md flex items-center justify-center transition-colors ${
                          isActive
                            ? "text-[#1DBF73]"
                            : "bg-surface-light text-text-muted"
                        }`}
                      >
                        <ItemIcon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            isActive ? "text-text-main" : "text-text-body"
                          }`}
                        >
                          {item.tabLabel}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Summary Footnote */}
            <div className="p-4 rounded-md bg-white text-[11px] text-[#62646A] space-y-1.5  hidden lg:block">
              <span className="text-sm font-semibold tracking-wider  block">
                Store Integration SLA
              </span>
              <p>
                Asynchronous lightweight script payload under 40KB gzip with
                instant hydration.
              </p>
            </div>
          </div>

          {/* Right Column: Active Item Panel (8 cols) */}
          <div className="lg:col-span-8 rounded-md bg-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden text-left">
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
                    <div className="w-10 h-10 rounded-md flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm tracking-widest">
                        {activeItem.title}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-text-main tracking-tight">
                    {activeItem.headline}
                  </h3>

                  <p className="text-[#62646A] text-xs sm:text-sm leading-relaxed max-w-2xl">
                    {activeItem.description}
                  </p>
                </div>

                {/* Code / Architecture Box (Clean Light Theme) */}
                <div className="bg-surface-light rounded-md p-4 text-xs overflow-hidden">
                  <div className="flex items-center justify-between border-b border-border-light pb-2 mb-3">
                    <span className="text-xs tracking-wider text-text-muted font-medium">
                      {activeItem.codeHeader}
                    </span>
                  </div>

                  <pre className="text-[11px] text-text-main overflow-x-auto leading-relaxed select-all bg-white p-3 rounded-md">
                    <code>{activeItem.codeSnippet}</code>
                  </pre>

                  <div className="mt-3 pt-2 border-t border-border-light text-[10px] text-text-muted">
                    {activeItem.footnote}
                  </div>
                </div>

                {/* Action CTA & Badge */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Button
                      href={activeItem.ctaHref}
                      variant="primary"
                      size="md"
                      icon={<ArrowRight className="w-3.5 h-3.5" />}
                      iconPosition="right"
                    >
                      {activeItem.ctaText}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

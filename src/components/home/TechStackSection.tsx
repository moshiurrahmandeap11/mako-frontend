"use client";

import Button from "@/components/Button";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Camera,
  Database,
  FileText,
  ShoppingCart,
  Sliders,
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
    {
      id: "ar-tryon",
      tabLabel: "WebAssembly AR Fitting Room",
      tabBadge: "60 FPS",
      icon: Camera,
      title: "Client-Side AR Engine",
      headline: "Real-time 60 FPS body landmark estimation.",
      description:
        "Executes 33-point body and pose landmark tracking 100% inside the customer’s browser GPU via WebAssembly with zero remote cloud server costs.",
      ctaText: "Test AR Sandbox",
      ctaHref: "/features/ar-tryon",
      secondaryText: "$0.00 Server GPU Fees",
      codeHeader: "MediaPipe Pose WASM Hook",
      codeSnippet: `const { isTracking, bodyLandmarks } = useVirtualTryOn({
  modelPath: '/models/mediapipe-pose.wasm',
  targetCategory: 'apparel-upper-body'
});`,
      footnote:
        "* Real-time browser computer vision with total camera stream privacy.",
    },
    {
      id: "customizer",
      tabLabel: "No-Code Widget Customizer",
      tabBadge: "Real-Time",
      icon: Sliders,
      title: "Visual Theme Simulator",
      headline: "Brand colors and placement with live simulator.",
      description:
        "Customize launcher icons, brand color themes, greeting messages, and corner placement in real time with an instant iframe test sandbox.",
      ctaText: "Open Customizer",
      ctaHref: "/features/widget-customizer",
      secondaryText: "0 Lines CSS Needed",
      codeHeader: "Widget Configuration Payload",
      codeSnippet: `const settings = {
  primaryColor: '#39FF88',
  backgroundColor: '#0B132B',
  title: 'Store Concierge AI',
  position: 'bottom-right'
};`,
      footnote: "* Instant synchronization to active live shopper sessions.",
    },
  ];

  const activeItem =
    techItems.find((item) => item.id === activeTabId) || techItems[0];
  const IconComponent = activeItem.icon;

  return (
    <section
      id="about"
      className=" px-4 sm:px-6 border-t border-white/[0.06] bg-[#080E21] relative"
    >
      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Section Header */}
        <div className="text-left max-w-7xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
            Built on the Modern AI Stack
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-normal">
            Select a core engine module to explore its underlying architecture.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* TABBED COMPONENT (FOLLOWING USER'S SCREENSHOT REFERENCE DESIGN) */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-[#0B132B] border border-white/[0.08] p-3 sm:p-4 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch">
          {/* Left Column: Vertical Stack of Pills/Tabs (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-2">
            {techItems.map((item) => {
              const isActive = item.id === activeTabId;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTabId(item.id)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                    isActive
                      ? "bg-[#131D38] border border-[#39FF88]/40 shadow-lg text-white font-medium scale-[1.01]"
                      : "bg-white/[0.02] border border-white/[0.04] text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] hover:border-white/[0.08]"
                  }`}
                >
                  <span className="text-xs sm:text-sm font-medium">
                    {item.tabLabel}
                  </span>

                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 ${
                      item.badgeType === "popular"
                        ? "bg-[#39FF88] text-[#0B132B]"
                        : isActive
                          ? "bg-[#39FF88]/15 text-[#39FF88] border border-[#39FF88]/30"
                          : "bg-white/[0.05] text-slate-400"
                    }`}
                  >
                    {item.tabBadge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Item Panel (8 cols) */}
          <div className="lg:col-span-8 rounded-2xl bg-[#131D38] border border-white/[0.06] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden text-left shadow-inner">
            {/* Subtle background radial ambient */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#39FF88]/5 rounded-full blur-3xl pointer-events-none" />

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
                    <div className="w-10 h-10 rounded-xl bg-[#0B132B] border border-[#39FF88]/30 flex items-center justify-center text-[#39FF88]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#39FF88]">
                        {activeItem.title}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white tracking-tight">
                    {activeItem.headline}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed max-w-2xl">
                    {activeItem.description}
                  </p>
                </div>

                {/* Code / Architecture Box */}
                <div className="bg-[#080E21] border border-white/[0.06] rounded-xl p-4 font-mono text-xs overflow-hidden shadow-inner">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 mb-3">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      {activeItem.codeHeader}
                    </span>
                    <span className="text-[10px] font-mono text-[#39FF88]">
                      Production Ready
                    </span>
                  </div>

                  <pre className="text-[11px] text-slate-300 overflow-x-auto leading-relaxed select-all">
                    <code>{activeItem.codeSnippet}</code>
                  </pre>

                  <div className="mt-3 pt-2 border-t border-white/[0.04] text-[10px] text-slate-400 font-sans">
                    {activeItem.footnote}
                  </div>
                </div>

                {/* Action CTA & Badge (Matching Screenshot's "Start Free Trial + Price/Note" pattern) */}
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

                  <span className="text-xs text-slate-400 font-normal">
                    Performance:{" "}
                    <strong className="text-[#39FF88] font-semibold">
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

'use client';

import { useState } from 'react';
import { Database, Layers, Palette } from 'lucide-react';

export default function TechStackSection() {
  const [activeTab, setActiveTab] = useState<'search' | 'bridge' | 'design'>('search');

  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 border-t border-white/[0.06] bg-[#0B132B] relative"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Tech Description */}
        <div className="lg:col-span-5 space-y-5 text-left">
          <span className="text-[11px] font-medium tracking-[0.2em] text-[#39FF88] uppercase">
            Under the Hood
          </span>
          <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Built on the Modern AI Stack
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm font-normal leading-relaxed">
            Cloud-native database vector indexing and lightweight client runtimes delivering instant storefront responsiveness.
          </p>

          {/* Tab Selectors */}
          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => setActiveTab('search')}
              className={`w-full text-left p-3.5 rounded-xl border transition flex items-center gap-3 cursor-pointer ${
                activeTab === 'search'
                  ? 'bg-white/[0.06] border-[#39FF88]/40 text-white'
                  : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-slate-200 hover:border-white/15'
              }`}
            >
              <Database className="w-4 h-4 text-[#39FF88]" />
              <div>
                <h4 className="text-xs font-semibold text-white">
                  Vector Similarity Search
                </h4>
                <p className="text-[10px] text-slate-400 font-normal">
                  pgvector catalog index distance mapping
                </p>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('bridge')}
              className={`w-full text-left p-3.5 rounded-xl border transition flex items-center gap-3 cursor-pointer ${
                activeTab === 'bridge'
                  ? 'bg-white/[0.06] border-[#39FF88]/40 text-white'
                  : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-slate-200 hover:border-white/15'
              }`}
            >
              <Layers className="w-4 h-4 text-[#39FF88]" />
              <div>
                <h4 className="text-xs font-semibold text-white">
                  CustomEvent Cart Integration
                </h4>
                <p className="text-[10px] text-slate-400 font-normal">
                  Decoupled iframe communication bridge
                </p>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('design')}
              className={`w-full text-left p-3.5 rounded-xl border transition flex items-center gap-3 cursor-pointer ${
                activeTab === 'design'
                  ? 'bg-white/[0.06] border-[#39FF88]/40 text-white'
                  : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-slate-200 hover:border-white/15'
              }`}
            >
              <Palette className="w-4 h-4 text-[#39FF88]" />
              <div>
                <h4 className="text-xs font-semibold text-white">
                  Small-Footprint Preact Engine
                </h4>
                <p className="text-[10px] text-slate-400 font-normal">
                  &lt;40kb gzipped client execution bundle
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: Code/Preview pane rendering based on active tab */}
        <div className="lg:col-span-7 bg-[#060B18] border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-xl h-[300px] flex flex-col justify-between font-mono text-xs text-left">
          {activeTab === 'search' && (
            <>
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                <span className="text-slate-400 uppercase tracking-widest text-[9px] font-semibold">
                  pgvector similarity query
                </span>
                <span className="text-[#39FF88] text-[10px] font-mono">
                  PostgreSQL Pooler
                </span>
              </div>
              <pre className="flex-1 pt-3 text-slate-300 overflow-x-auto leading-relaxed select-all text-[11px]">
                {`SELECT id, title, price, imageUrl, productUrl,
       (embedding <=> $1::vector) as distance
FROM "Product"
WHERE "merchantId" = $2 AND "inStock" = true
ORDER BY distance ASC
LIMIT 5;`}
              </pre>
              <div className="text-[10px] text-slate-400">
                * Computes cosine distance mapping for shopper queries using Gemini embeddings.
              </div>
            </>
          )}

          {activeTab === 'bridge' && (
            <>
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                <span className="text-slate-400 uppercase tracking-widest text-[9px] font-semibold">
                  Integration JavaScript Event
                </span>
                <span className="text-[#39FF88] text-[10px] font-mono">
                  window.dispatchEvent
                </span>
              </div>
              <pre className="flex-1 pt-3 text-slate-300 overflow-x-auto leading-relaxed select-all text-[11px]">
                {`window.addEventListener("ai-widget:add-to-cart", (e) => {
  const { productId, quantity } = e.detail;
  myStorefrontCart.add(productId, quantity);
  alert("Product added to cart!");
});`}
              </pre>
              <div className="text-[10px] text-slate-400">
                * Decouples widget execution from backend storefront secrets.
              </div>
            </>
          )}

          {activeTab === 'design' && (
            <>
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                <span className="text-slate-400 uppercase tracking-widest text-[9px] font-semibold">
                  HTML Script Snippet
                </span>
                <span className="text-[#39FF88] text-[10px] font-mono">
                  Merchant Onboarding
                </span>
              </div>
              <pre className="flex-1 pt-3 text-slate-300 overflow-x-auto leading-relaxed select-all text-[11px]">
                {`<script
  src="https://labto.ahsanul.dev/widget.js"
  data-api-key="aiw_live_a8f9c1b7e6d4c..."
  defer
></script>`}
              </pre>
              <div className="text-[10px] text-slate-400">
                * Bootstraps dynamically inside document body on DOMContentLoaded.
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

'use client';

import NetworkWave from '@/components/NetworkWave';

export default function DocsPage() {
  return (
    <div className="relative min-h-screen bg-[#0B132B] text-slate-100 flex flex-col overflow-hidden">
      {/* Background Wave */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <NetworkWave />
      </div>

      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-6 pt-36 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#39FF88] mb-4">Documentation</div>
          <a href="#quickstart" className="block px-3 py-2 text-xs font-bold text-[#39FF88] bg-[#39FF88]/10 rounded border border-[#39FF88]/20">
            1. Quickstart Embed
          </a>
          <a href="#authentication" className="block px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white transition">
            2. API Authentication
          </a>
          <a href="#chat-api" className="block px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white transition">
            3. Storefront Chat API
          </a>
          <a href="#vector-api" className="block px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white transition">
            4. Product Vector Sync
          </a>
        </aside>

        {/* Content Area */}
        <div className="lg:col-span-9 space-y-12">
          <div id="quickstart" className="space-y-4">
            <h1 className="text-3xl font-extrabold text-white">1-Click Widget Integration</h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Add Labto AI to any HTML5, Shopify, WooCommerce, or Next.js storefront by pasting a single script snippet before the closing body tag.
            </p>

            <div className="bg-[#131D38] border border-[#39FF88]/30 rounded-xl p-4 font-mono text-xs text-[#39FF88] overflow-x-auto shadow-xl">
              <code>{`<script src="https://mako-api.ahsanul.dev/public/widget.js" data-api-key="YOUR_MERCHANT_API_KEY" defer></script>`}</code>
            </div>
          </div>

          <div id="authentication" className="space-y-4 pt-8 border-t border-[#39FF88]/15">
            <h2 className="text-2xl font-bold text-white">API Key Authentication</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Send requests to the Labto AI REST API using your merchant API key passed via the <code className="text-[#39FF88] bg-[#131D38] px-1.5 py-0.5 rounded">x-api-key</code> HTTP header.
            </p>

            <div className="bg-[#131D38] border border-[#39FF88]/20 rounded-xl p-4 font-mono text-xs text-slate-200 overflow-x-auto">
              <pre>{`curl -X POST https://mako-api.ahsanul.dev/api/widget/chat \\
  -H "x-api-key: your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{"message": "What is your return policy?"}'`}</pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

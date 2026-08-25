'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api-client';
import { ShoppingBag, ArrowLeft, ExternalLink, RefreshCw, ShieldCheck } from 'lucide-react';
import Button from '@/components/Button';

export default function WidgetTestPage() {
  const [apiKey, setApiKey] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const scriptHost = process.env.NEXT_PUBLIC_WIDGET_SCRIPT_URL || 'http://localhost:4000/widget.js';

  useEffect(() => {
    fetchApi('/api/keys')
      .then((data) => {
        const activeKeys = (data.keys || []).filter((k: any) => k.isActive);
        if (activeKeys.length > 0) {
          setApiKey(activeKeys[0].keyPrefix);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!apiKey) return;

    // Load widget script into page dynamically
    const script = document.createElement('script');
    script.src = scriptHost;
    script.setAttribute('data-api-key', apiKey);
    script.async = true;
    script.id = 'test-widget-script';
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById('test-widget-script');
      if (existingScript) existingScript.remove();
      const existingHost = document.getElementById('ai-shopping-widget-host');
      if (existingHost) existingHost.remove();
    };
  }, [apiKey, scriptHost]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Banner Control Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button href="/widget-settings" variant="outline" className="!p-2 text-slate-300 border-slate-700 hover:bg-slate-800">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-sm font-medium text-slate-100 flex items-center gap-2">
              <span>Live Widget Test Sandbox</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                Interactive Testing
              </span>
            </h1>
            <p className="text-xs text-slate-400">Testing assistant integration on simulated storefront</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="text-xs text-slate-300 border-slate-700 hover:bg-slate-800 !py-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Reload Sandbox
          </Button>
        </div>
      </div>

      {/* Simulated Storefront Webpage Content */}
      <div className="flex-1 p-6 sm:p-12 max-w-5xl mx-auto w-full space-y-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-850 border border-slate-750 rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-lg space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShoppingBag className="w-3.5 h-3.5" /> Sample E-commerce Storefront
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
              Experience Your AI Assistant Live
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Use the floating widget in the bottom corner to ask questions, search products, or request recommendations using your real store knowledge.
            </p>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Premium Wireless Headphones', price: '$129.99', category: 'Audio' },
            { title: 'Smart Fitness Tracker Watch', price: '$89.50', category: 'Wearables' },
            { title: 'Ergonomic Mechanical Keyboard', price: '$149.00', category: 'Peripherals' },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 space-y-3">
              <div className="w-full h-32 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-500 text-xs font-mono">
                Product Image Placeholder
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider">{item.category}</span>
                <h3 className="text-sm font-medium text-slate-100">{item.title}</h3>
                <p className="text-sm font-semibold text-emerald-400 mt-1">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import NetworkWave from '@/components/NetworkWave';

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-[#0B132B] text-slate-100 flex flex-col overflow-hidden">
      {/* Background Wave */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <NetworkWave />
      </div>

      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-6 pt-36 pb-20 space-y-8">
        <div className="space-y-3">
          <span className="text-xs font-bold text-[#39FF88] uppercase tracking-widest">Legal & Data Security</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-xs text-slate-400">Last updated: August 2026</p>
        </div>

        <div className="bg-[#131D38] border border-[#39FF88]/20 rounded-2xl p-8 space-y-6 text-sm text-slate-300 leading-relaxed shadow-2xl">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Zero Video & Camera Feed Retention</h2>
            <p>
              Labto AI AR Virtual Try-On processes video feeds 100% client-side inside the user's browser memory (RAM/GPU) via WebAssembly. No video frames, camera feeds, or facial metrics are ever sent to, recorded by, or stored on external cloud servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Merchant Data Isolation</h2>
            <p>
              All merchant product catalogs, knowledge base documents, and customer chat logs are strictly segregated at the database level with encrypted tenant keys. Data is never shared across store tenants or used for public AI model training.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Third-Party Integrations & Security</h2>
            <p>
              Payment processing is handled securely by Stripe. Live emails are delivered via encrypted API triggers. All API traffic is protected with strict CORS preflight policies.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

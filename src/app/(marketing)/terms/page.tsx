'use client';

import NetworkWave from '@/components/NetworkWave';

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-[#0B132B] text-slate-100 flex flex-col overflow-hidden">
      {/* Background Wave */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <NetworkWave />
      </div>

      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-6 pt-36 pb-20 space-y-8">
        <div className="space-y-3">
          <span className="text-xs font-bold text-[#39FF88] uppercase tracking-widest">Merchant Service Agreement</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms of Service</h1>
          <p className="text-xs text-slate-400">Last updated: August 2026</p>
        </div>

        <div className="bg-[#131D38] border border-[#39FF88]/20 rounded-2xl p-8 space-y-6 text-sm text-slate-300 leading-relaxed shadow-2xl">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Service Provision & Uptime SLA</h2>
            <p>
              Labto AI provides high-availability API endpoints for e-commerce assistants. We maintain a 99.9% uptime target for paid tier plans (Starter, Pro, Enterprise).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Acceptable Use & Whitelisting</h2>
            <p>
              Merchants agree to embed the widget only on authorized domain names registered in their merchant settings. Rate limits apply according to plan tier specifications.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Billing & Cancellation</h2>
            <p>
              Subscriptions renew automatically on a monthly cycle via Stripe. Merchants may upgrade, downgrade, or cancel their subscription at any time directly through the billing console.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

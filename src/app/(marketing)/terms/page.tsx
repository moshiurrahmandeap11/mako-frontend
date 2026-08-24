import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service & Merchant Agreement | Labto AI",
  description:
    "Labto AI terms of service: 99.9% uptime SLA, acceptable domain whitelisting, and monthly subscription policies.",
  canonicalUrl: "/terms",
});

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#222325] flex flex-col overflow-hidden">
      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-6 pt-36 pb-20 space-y-8 text-left">
        <div className="space-y-3">
          <span className="text-xs font-bold text-[#1DBF73] uppercase tracking-wider bg-[#E8F8F0] px-3 py-1 rounded-full border border-[#1DBF73]/20 inline-block">
            Merchant Service Agreement
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#222325]">
            Terms of Service
          </h1>
          <p className="text-xs text-[#74767E] font-normal">
            Last updated: August 2026
          </p>
        </div>

        <div className="bg-white border border-[#E4E5E7] rounded-2xl p-8 space-y-6 text-sm text-[#404145] leading-relaxed shadow-sm">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#222325]">
              1. Service Provision & Uptime SLA
            </h2>
            <p className="font-normal">
              Labto AI provides high-availability API endpoints for e-commerce
              assistants. We maintain a 99.9% uptime target for paid tier plans
              (Starter, Pro, Enterprise).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#222325]">
              2. Acceptable Use & Whitelisting
            </h2>
            <p className="font-normal">
              Merchants agree to embed the widget only on authorized domain
              names registered in their merchant settings. Rate limits apply
              according to plan tier specifications.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#222325]">
              3. Billing & Cancellation
            </h2>
            <p className="font-normal">
              Subscriptions renew automatically on a monthly cycle via Polar.sh.
              Merchants may upgrade, downgrade, or cancel their subscription at
              any time directly through the billing console.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

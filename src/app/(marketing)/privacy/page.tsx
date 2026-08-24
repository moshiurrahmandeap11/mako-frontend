import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy & Data Security | Labto AI",
  description:
    "Labto AI data protection policy: 100% client-side WebAssembly video processing, zero camera retention, and encrypted tenant database isolation.",
  canonicalUrl: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#222325] flex flex-col overflow-hidden">
      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-6 pt-36 pb-20 space-y-8 text-left">
        <div className="space-y-3">
          <span className="text-xs font-bold text-[#1DBF73] uppercase tracking-wider bg-[#E8F8F0] px-3 py-1 rounded-full border border-[#1DBF73]/20 inline-block">
            Legal & Data Security
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#222325]">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#74767E] font-normal">
            Last updated: August 2026
          </p>
        </div>

        <div className="bg-white border border-[#E4E5E7] rounded-2xl p-8 space-y-6 text-sm text-[#404145] leading-relaxed shadow-sm">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#222325]">
              1. Zero Video & Camera Feed Retention
            </h2>
            <p className="font-normal">
              Labto AI AR Virtual Try-On processes video feeds 100% client-side
              inside the user&apos;s browser memory (RAM/GPU) via WebAssembly.
              No video frames, camera feeds, or facial metrics are ever sent to,
              recorded by, or stored on external cloud servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#222325]">
              2. Merchant Data Isolation
            </h2>
            <p className="font-normal">
              All merchant product catalogs, knowledge base documents, and customer
              chat logs are strictly segregated at the database level with encrypted
              tenant keys. Data is never shared across store tenants or used for
              public AI model training.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#222325]">
              3. Third-Party Integrations & Security
            </h2>
            <p className="font-normal">
              Payment processing is handled securely by Polar.sh. Live emails are
              delivered via encrypted API triggers. All API traffic is protected
              with strict CORS preflight policies.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy & Data Security | Labto AI",
  description:
    "Labto AI data protection policy: Data collection, merchant database isolation, AI model grounding rules, and encrypted cloud infrastructure.",
  canonicalUrl: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#201515] flex flex-col overflow-hidden">
      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-6 pt-10 sm:pt-14 pb-20 space-y-8 text-left">
        <div className="space-y-2">
          <h1 className="font-degular text-3xl sm:text-4xl font-medium text-[#201515] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#62646A] font-normal">
            Last updated: August 2026
          </p>
        </div>

        <div className="bg-white border border-[#E4E5E7] rounded-xl p-8 space-y-8 text-sm text-[#404145] leading-relaxed">
          {/* Section 1: Information We Collect */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#201515]">
              1. Information We Collect
            </h2>
            <p className="font-normal">
              To deliver autonomous AI sales and customer service for online stores, Labto AI collects the following categories of information:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>
                <strong className="text-[#201515]">Merchant Account Details:</strong> Name, business email address, and authentication credentials managed via encrypted session cookies.
              </li>
              <li>
                <strong className="text-[#201515]">Storefront Catalog & Policy Data:</strong> Product titles, descriptions, prices, variant SKUs, images, and store policy pages (shipping, returns, FAQs) ingested manually or crawled automatically via Puppeteer.
              </li>
              <li>
                <strong className="text-[#201515]">Shopper Interactions:</strong> Natural language chat queries, AI recommendation outputs, and transient conversation session IDs.
              </li>
              <li>
                <strong className="text-[#201515]">Technical & Geolocation Metrics:</strong> Anonymized visitor IP addresses processed via IP geolocation services solely for aggregate country and city analytics inside merchant console reports.
              </li>
            </ul>
          </section>

          {/* Section 2: How We Use Your Data */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#201515]">
              2. How We Use Your Information
            </h2>
            <p className="font-normal">
              We process collected data exclusively to operate, maintain, and optimize your store assistant services:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>Generate sub-second vector product recommendations using PostgreSQL <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-[#201515]">pgvector</code> embeddings.</li>
              <li>Ground customer service AI answers strictly in your official store FAQs and policies to prevent hallucinated answers.</li>
              <li>Execute 1-click client-side cart injection bridge events on your host storefront.</li>
              <li>Track subscription credit quotas, plan tiers, and merchant usage analytics.</li>
            </ul>
          </section>

          {/* Section 3: AI Model Training & Data Isolation */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#201515]">
              3. AI Model Training & Tenant Isolation
            </h2>
            <p className="font-normal">
              Your store data is protected by strict database-level tenant isolation:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>All product vector embeddings and store policy documents are segregated with tenant-isolated database keys.</li>
              <li>
                <strong className="text-[#201515]">Zero Public LLM Training:</strong> Your proprietary product catalogs, internal margin details, and shopper chat logs are <strong className="text-[#201515]">never shared across merchant accounts</strong> or used to train public third-party foundation AI models.
              </li>
            </ul>
          </section>

          {/* Section 4: Cookies & Local Storage */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#201515]">
              4. Cookies & Local Storage
            </h2>
            <p className="font-normal">
              Labto AI utilizes minimal storage mechanisms required for system functionality:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>
                <strong className="text-[#201515]">Merchant Session Cookies:</strong> Encrypted HttpOnly cookies used to secure merchant dashboard logins.
              </li>
              <li>
                <strong className="text-[#201515]">Widget LocalStorage:</strong> Client-side browser <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-[#201515]">localStorage</code> used by the embedded chat widget to preserve session continuity for shoppers during browsing without tracking across third-party domains.
              </li>
            </ul>
          </section>

          {/* Section 5: Third-Party Data Processors */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#201515]">
              5. Third-Party Data Processors & Infrastructure
            </h2>
            <p className="font-normal">
              We partner with enterprise-grade infrastructure providers adhering to strict security standards:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>
                <strong className="text-[#201515]">AI Providers (OpenAI & Anthropic):</strong> Real-time natural language query processing under enterprise API zero-data-retention terms.
              </li>
              <li>
                <strong className="text-[#201515]">Cloud Storage & Database (Neon PostgreSQL):</strong> SOC2-compliant PostgreSQL database hosting with AES-256 encryption at rest.
              </li>
              <li>
                <strong className="text-[#201515]">Payment Processing (Polar.sh / Stripe):</strong> PCI-DSS Level 1 compliant payment gateways. Labto AI never stores full credit card numbers on its servers.
              </li>
            </ul>
          </section>

          {/* Section 6: Merchant Control & Data Rights */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#201515]">
              6. Data Control & Merchant Rights (GDPR / CCPA)
            </h2>
            <p className="font-normal">
              Under applicable data protection laws (GDPR, CCPA), merchants maintain full ownership of their store data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-normal text-xs sm:text-sm text-[#62646A]">
              <li><strong className="text-[#201515]">Right to Access:</strong> View and export product vector catalogs and conversation history at any time.</li>
              <li><strong className="text-[#201515]">Right to Delete:</strong> Purge scraped policy pages, delete indexed catalog vectors, or close your merchant account directly from your account settings.</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

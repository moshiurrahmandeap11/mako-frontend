import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service & Merchant Agreement | Labto AI",
  description:
    "Labto AI terms of service: Service agreement, domain whitelisting, subscription billing, 99.9% uptime SLA, and intellectual property terms.",
  canonicalUrl: "/terms",
});

export default function TermsPage() {
  return (
    <div className="relative flex-1 bg-white text-[#201515] flex flex-col overflow-hidden">
      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-6 pt-10 sm:pt-14 pb-20 space-y-8 text-left">
        <div className="space-y-2">
          <h1 className="font-degular text-3xl sm:text-4xl font-medium text-[#201515] tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-[#62646A] font-normal">
            Last updated: August 2026
          </p>
        </div>

        <div className="bg-white border border-[#E4E5E7] rounded-xl p-8 space-y-8 text-sm text-[#404145] leading-relaxed">
          {/* Section 1: Agreement & Acceptable Use */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#201515]">
              1. Service Provision & Acceptable Use
            </h2>
            <p className="font-normal">
              Labto AI Inc. ("Labto AI", "we", "us") provides autonomous AI shopping assistants, vector catalog search, web scraping policy ingestion, and client-side cart mutation widgets for online merchants. By creating an account or embedding the Labto AI widget script tag, merchants agree to the following acceptable use rules:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>
                <strong className="text-[#201515]">Domain Whitelisting:</strong> Merchants agree to embed widget script tags (<code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-[#201515]">widget.js</code>) strictly on authorized domain names registered inside their merchant settings console.
              </li>
              <li>
                <strong className="text-[#201515]">Lawful Content:</strong> Merchants must not train the AI assistant on deceptive, unlawful, fraudulent, or infringing product catalogs or store policies.
              </li>
            </ul>
          </section>

          {/* Section 2: Account Security & Merchant Responsibilities */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#201515]">
              2. Account Registration & Security
            </h2>
            <p className="font-normal">
              Merchants are responsible for maintaining the confidentiality of their dashboard credentials, account login details, and API keys. Merchants warrant that they possess all necessary rights and licenses for any product images, catalog listings, and policy web pages provided or crawled for AI training.
            </p>
          </section>

          {/* Section 3: Service Availability & Uptime SLA */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#201515]">
              3. Service Availability & 99.9% Uptime SLA
            </h2>
            <p className="font-normal">
              Labto AI maintains high-availability cloud infrastructure designed to support sub-second query turnaround times for active storefront shoppers:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>We maintain a <strong className="text-[#201515]">99.9% uptime target SLA</strong> for API endpoint routing and widget response delivery on paid subscription plans (Starter, Pro, Enterprise).</li>
              <li>Scheduled maintenance windows are announced in advance via dashboard notifications to minimize impact during peak shopping hours.</li>
            </ul>
          </section>

          {/* Section 4: Subscriptions, Billing & Cancellation */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#201515]">
              4. Subscriptions, Credits & Billing Terms
            </h2>
            <p className="font-normal">
              Subscriptions and credit quotas operate on a transparent recurring schedule:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>
                <strong className="text-[#201515]">Billing Cycle:</strong> Subscriptions renew automatically on a monthly cycle via Polar.sh / Stripe.
              </li>
              <li>
                <strong className="text-[#201515]">Credit Quotas:</strong> Plans include designated monthly AI query credit allowances (e.g., Free 1,500 credits, Pro 10,000 credits). Unused credits roll over according to specific plan tier rules.
              </li>
              <li>
                <strong className="text-[#201515]">Cancellation Policy:</strong> Merchants may upgrade, downgrade, or cancel their subscription at any time directly through the billing console with no long-term lock-in commitments.
              </li>
            </ul>
          </section>

          {/* Section 5: Intellectual Property & Store Catalog Ownership */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#201515]">
              5. Intellectual Property & Store Catalog Ownership
            </h2>
            <p className="font-normal">
              Intellectual property rights are strictly demarcated:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-normal text-xs sm:text-sm text-[#62646A]">
              <li>
                <strong className="text-[#201515]">Merchant Content:</strong> Merchants retain 100% full ownership of all product catalogs, brand trademarks, store imagery, policy text, and customer conversation logs.
              </li>
              <li>
                <strong className="text-[#201515]">Labto AI Platform:</strong> Labto AI retains all rights, title, and interest in and to the underlying software, algorithm engines, vector search pipelines, widget code, and user interface designs.
              </li>
            </ul>
          </section>

          {/* Section 6: Limitation of Liability & Governing Terms */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#201515]">
              6. Limitation of Liability & Modifications
            </h2>
            <p className="font-normal">
              To the maximum extent permitted by law, Labto AI shall not be liable for indirect, incidental, or consequential damages resulting from third-party storefront platform API outages (e.g., Shopify, WooCommerce, Webflow endpoints) or client-side cart drawer modifications. We reserve the right to update these terms with prior notice to registered merchants.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

import { Metadata } from "next";
import { constructMetadata, SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "API & Storefront Integration Documentation | Labto AI",
  description:
    "Learn how to integrate Labto AI shopping concierge with Shopify, WooCommerce, or custom storefronts in under 60 seconds with our lightweight CDN embed.",
  canonicalUrl: "/docs",
  keywords: [
    "Labto AI API Docs",
    "Storefront Embed Tutorial",
    "Shopify AI Integration Snippet",
    "WooCommerce AI Chatbot Setup",
  ],
});

export default function DocsPage() {
  const docsSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Labto AI Widget & REST API Integration Guide",
    description: "1-Click embed documentation and API key authentication reference.",
    url: `${SITE_CONFIG.url}/docs`,
    publisher: {
      "@type": "Organization",
      name: "Labto AI Inc.",
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}/og-image.jpg`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(docsSchema) }}
      />

      <div className="relative min-h-screen bg-white text-[#222325] flex flex-col overflow-hidden">
        <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-6 pt-36 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 space-y-2 text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1DBF73] mb-4">
              Documentation
            </div>
            <a
              href="#quickstart"
              className="block px-3 py-2 text-xs font-bold text-[#1DBF73] bg-[#E8F8F0] rounded-xl border border-[#1DBF73]/20"
            >
              1. Quickstart Embed
            </a>
            <a
              href="#authentication"
              className="block px-3 py-2 text-xs font-semibold text-[#62646A] hover:text-[#222325] transition"
            >
              2. API Authentication
            </a>
            <a
              href="#chat-api"
              className="block px-3 py-2 text-xs font-semibold text-[#62646A] hover:text-[#222325] transition"
            >
              3. Storefront Chat API
            </a>
            <a
              href="#vector-api"
              className="block px-3 py-2 text-xs font-semibold text-[#62646A] hover:text-[#222325] transition"
            >
              4. Product Vector Sync
            </a>
          </aside>

          {/* Content Area */}
          <div className="lg:col-span-9 space-y-12 text-left">
            <div id="quickstart" className="space-y-4">
              <h1 className="text-3xl font-extrabold text-[#222325]">
                1-Click Widget Integration
              </h1>
              <p className="text-[#62646A] text-sm leading-relaxed font-normal">
                Add Labto AI to any HTML5, Shopify, WooCommerce, or Next.js
                storefront by pasting a single script snippet before the closing
                body tag.
              </p>

              <div className="bg-[#F7F7F7] border border-[#E4E5E7] rounded-xl p-4 font-mono text-xs text-[#222325] overflow-x-auto shadow-sm">
                <code>{`<script src="https://labto.ahsanul.dev/widget.js" data-api-key="YOUR_MERCHANT_API_KEY" defer></script>`}</code>
              </div>
            </div>

            <div
              id="authentication"
              className="space-y-4 pt-8 border-t border-[#E4E5E7]"
            >
              <h2 className="text-2xl font-bold text-[#222325]">
                API Key Authentication
              </h2>
              <p className="text-[#62646A] text-sm leading-relaxed font-normal">
                Send requests to the Labto AI REST API using your merchant API key
                passed via the{" "}
                <code className="text-[#1DBF73] bg-[#E8F8F0] px-1.5 py-0.5 rounded font-mono font-bold">
                  x-api-key
                </code>{" "}
                HTTP header.
              </p>

              <div className="bg-[#F7F7F7] border border-[#E4E5E7] rounded-xl p-4 font-mono text-xs text-[#222325] overflow-x-auto shadow-sm">
                <pre>{`curl -X POST https://labto.ahsanul.dev/api/widget/chat \\
  -H "x-api-key: your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{"message": "What is your return policy?"}'`}</pre>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

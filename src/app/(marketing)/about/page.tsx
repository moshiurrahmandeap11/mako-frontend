import { Metadata } from "next";
import { constructMetadata, SITE_CONFIG } from "@/lib/seo";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutMissionSection from "@/components/about/AboutMissionSection";
import AboutPillarsSection from "@/components/about/AboutPillarsSection";

export const metadata: Metadata = constructMetadata({
  title: "About Labto AI — Autonomous E-Commerce AI Sales Assistant",
  description:
    "Learn about Labto AI: Our mission to empower e-commerce storefronts with sub-second RAG pgvector catalog search, zero-hallucination policy grounding, and merchant data privacy.",
  canonicalUrl: "/about",
  keywords: [
    "About Labto AI",
    "E-Commerce AI Shopping Concierge",
    "Shopify AI Assistant",
    "pgvector RAG Search",
    "Autonomous Sales Assistant",
    "Labto AI Company",
  ],
});

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Labto AI",
    description:
      "Autonomous AI sales assistant and shopping concierge for modern e-commerce storefronts.",
    url: `${SITE_CONFIG.url}/about`,
    publisher: {
      "@type": "Organization",
      name: "Labto AI Inc.",
      url: SITE_CONFIG.url,
      email: "support@labto.ahsanul.dev",
    },
  };

  return (
    <>
      {/* Schema.org Structured Data (SSR) for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <div className="flex-1 bg-white text-[#201515] flex flex-col overflow-hidden">
        <AboutHeroSection />
        <AboutMissionSection />
        <AboutPillarsSection />
      </div>
    </>
  );
}

import { Metadata } from "next";
import FeaturesCatalogClient from "@/components/features/FeaturesCatalogClient";
import { FEATURES_DATA } from "@/data/features";
import { constructMetadata, SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Autonomous E-Commerce Features & Architecture | Labto AI",
  description:
    "Explore Labto AI's enterprise e-commerce capabilities: Sub-second RAG vector search, dynamic cart event bridge, PDF knowledge base ingestion, and no-code customizer.",
  canonicalUrl: "/features",
  keywords: [
    "RAG Vector Search",
    "E-Commerce Cart Bridge",
    "Storefront Document Indexer",
    "Shopify AI Assistant Features",
    "Conversational AI E-Commerce",
    "AI Product Recommendation",
  ],
});

export default function FeaturesPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Enterprise E-Commerce AI Features — Labto AI",
    description:
      "Explore enterprise AI capabilities engineered for high-converting online stores.",
    url: `${SITE_CONFIG.url}/features`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: FEATURES_DATA.map((feat, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: feat.title,
        description: feat.description,
        url: `${SITE_CONFIG.url}/features/${feat.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <FeaturesCatalogClient features={FEATURES_DATA} />
    </>
  );
}

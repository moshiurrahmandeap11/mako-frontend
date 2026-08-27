import { Metadata } from "next";

export const SITE_CONFIG = {
  name: "Labto AI",
  title: "Labto AI — Next-Gen AI Assistant & Autonomous Website Copilot",
  description:
    "Autonomous AI sales assistant, shopping concierge, and intelligent customer support agent for websites and storefronts. Sub-second hybrid pgvector search, automated actions, zero-hallucination knowledge grounding, and 1-click embed.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://labtoai.com",
  ogImage: "/og-image.jpg",
  twitterHandle: "@labto_ai",
  keywords: [
    "Labto AI",
    "AI Website Chatbot",
    "Autonomous AI Assistant",
    "AI Customer Support Agent",
    "Business AI Chatbot",
    "Custom Website AI Agent",
    "AI E-Commerce Assistant",
    "AI Shopping Concierge",
    "Storefront Copilot",
    "RAG Vector Search",
    "Shopify AI Assistant",
    "WooCommerce AI Widget",
    "WordPress AI Chatbot",
    "Next.js AI Widget",
    "Webflow AI Assistant",
    "pgvector Knowledge Search",
    "Conversational AI Platform",
    "Automated Lead Generation AI",
  ],
  author: "Labto AI",
  creator: "Labto AI",
};

export function constructMetadata({
  title = SITE_CONFIG.title,
  description = SITE_CONFIG.description,
  image = SITE_CONFIG.ogImage,
  canonicalUrl,
  noIndex = false,
  keywords = SITE_CONFIG.keywords,
}: {
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  keywords?: string[];
} = {}): Metadata {
  const finalTitle = title.includes("Labto AI") ? title : `${title} | Labto AI`;
  const url = canonicalUrl
    ? `${SITE_CONFIG.url}${canonicalUrl.startsWith("/") ? canonicalUrl : `/${canonicalUrl}`}`
    : SITE_CONFIG.url;

  return {
    title: finalTitle,
    description,
    keywords,
    authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.url }],
    creator: SITE_CONFIG.creator,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: finalTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name} — Autonomous AI Assistant`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description,
      images: [image],
      creator: SITE_CONFIG.twitterHandle,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateSoftwareSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Labto AI",
    applicationCategory: "BusinessApplication",
    operatingSystem:
      "Web-based, Cloud, Shopify, WooCommerce, WordPress, Webflow, Next.js, Custom Websites",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "0",
      highPrice: "349",
      offerCount: "5",
    },
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    publisher: {
      "@type": "Organization",
      name: "Labto AI",
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}/og-image.jpg`,
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Labto AI",
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/og-image.jpg`,
    sameAs: [
      "https://twitter.com/labto_ai",
      "https://github.com/moshiurrahmandeap11",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@labtoai.com",
      availableLanguage: ["English"],
    },
  };
}

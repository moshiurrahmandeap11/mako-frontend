import { Metadata } from "next";

export const SITE_CONFIG = {
  name: "Labto AI",
  title: "Labto AI — Next-Gen AI Shopping Concierge & E-Commerce Copilot",
  description:
    "Autonomous AI sales assistant and shopping concierge for e-commerce storefronts. Sub-second hybrid pgvector search, automated cart mutations, zero-hallucination FAQ resolution, and 1-click embed.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://labtoai.com",
  ogImage: "/og-image.jpg",
  twitterHandle: "@labto_ai",
  keywords: [
    "AI E-Commerce Assistant",
    "AI Shopping Concierge",
    "Autonomous Storefront Chatbot",
    "E-Commerce Copilot",
    "RAG Vector Search Storefront",
    "Shopify AI Assistant",
    "WooCommerce AI Widget",
    "Gemini 2.0 Flash E-Commerce",
    "pgvector Product Search",
    "Storefront Cart Injection AI",
    "E-Commerce Conversational AI",
    "AI Customer Support Automation",
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
          alt: `${SITE_CONFIG.name} — AI Shopping Concierge`,
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
    operatingSystem: "Web-based, Cloud, Shopify, WooCommerce, Custom HTML",
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
      name: "Labto AI Inc.",
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
      email: "support@labto.ahsanul.dev",
      availableLanguage: ["English"],
    },
  };
}

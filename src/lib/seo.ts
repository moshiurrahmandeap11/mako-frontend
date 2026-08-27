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
    "AI Chatbot for Ecommerce Website",
    "AI Shopping Assistant",
    "Autonomous Sales Chatbot",
    "AI Customer Service Bot",
    "Shopify AI Chatbot",
    "WooCommerce AI Plugin",
    "WordPress AI Assistant",
    "Next.js AI Chatbot Widget",
    "React AI Assistant",
    "AI Shopping Concierge",
    "E-Commerce AI Copilot",
    "Increase Store Conversion Rate with AI",
    "Automated Product Recommendation Chatbot",
    "AI Sales Agent for Ecommerce",
    "Smart Shopping Assistant Widget",
    "AI Chatbot That Adds Products to Cart",
    "Ecommerce AI Agent 2026",
    "AI Chatbot to Boost Online Sales",
    "Conversational Commerce AI",
    "Shopify AI Shopping Assistant App",
    "Shopify Automated Customer Support Bot",
    "Add AI Chatbot to WordPress Site",
    "Laravel Ecommerce AI Chatbot",
    "Webflow AI Chatbot Widget",
    "Wix AI Chatbot Integration",
    "Magento AI Shopping Assistant",
    "PHP Website AI Chatbot",
    "Svelte Ecommerce AI Assistant",
    "Astro AI Chatbot Widget",
    "HTML Website AI Assistant Embed",
    "Fastest AI Chatbot for Website",
    "Sub-Second Latency AI Chatbot",
    "RAG Chatbot for Ecommerce Catalog",
    "Zero Hallucination AI Assistant",
    "AI Chatbot That Reads Website Pages",
    "Website Crawler AI Chatbot",
    "Custom Knowledge Base AI Chatbot",
    "AI Chatbot Trained on Website Content",
    "Vector Search Chatbot for Online Store",
    "pgvector Ecommerce AI Assistant",
    "Hybrid Search Website AI Bot",
    "AI Chatbot Trained on Product Catalog",
    "LLM Customer Support Agent",
    "Domain Restricted Knowledge AI",
    "White Label Website AI Chatbot Widget",
    "24/7 Automated Customer Support Chatbot",
    "AI Customer Service Software",
    "Replace Human Live Chat with AI",
    "AI Chatbot with Lead Generation",
    "Automated Order Tracking Chatbot",
    "FAQ Answering AI Chatbot",
    "AI Chatbot That Collects Customer Emails",
    "Reduce Support Tickets with AI Chatbot",
    "Instant Response Customer Service Bot",
    "Smart Website Copilot for Visitors",
    "Multilingual AI Chatbot for Website",
    "AI Customer Engagement Tool",
    "Interactive Shopping Concierge Widget",
    "Website Visitor Assistant Bot",
    "AI Virtual Sales Rep",
    "Tidio AI Alternative",
    "Intercom Fin Alternative",
    "Wonderchat Alternative",
    "Chatbase Alternative for Ecommerce",
    "Fastbots Alternative",
    "CustomGPT Alternative for Stores",
    "Botpress Ecommerce Alternative",
    "Voiceflow Website Widget Alternative",
    "Best Ecommerce AI Chatbot 2026",
    "Top Rated AI Assistant for Online Shops",
    "Affordable AI Customer Support Chatbot",
    "No Code AI Chatbot for Website",
    "1-Click Install AI Chatbot",
    "Best Shopping Concierge Platform",
    "AI Live Chat Widget for Websites",
    "AI Chatbot with Instant Cart Sync",
    "Interactive Variant Selector in AI Chat",
    "AI Chatbot with Product Cards",
    "Embeddable Floating AI Chat Widget",
    "Customizable AI Chat Widget Design",
    "AI Chat Widget Clean White Theme",
    "Instant Checkout Redirect AI Assistant",
    "Catalog Crawling AI Chatbot",
    "AI Assistant with Suggestion Chips",
    "Realtime Streaming AI Chatbot Widget",
    "AI Chatbot REST API for Developers",
    "Website Scraping AI Knowledge Base",
    "PDF Upload AI Chatbot Builder",
    "Rate Limiting and Security Guard AI",
    "Turn Website into AI Conversational Assistant",
    "How to Increase Ecommerce Sales with AI",
    "Best AI Tools for Online Store Owners",
    "Best AI Tools for Shopify Store in 2026",
    "Improve Website Conversion Rate with AI",
    "Automate Customer Questions on Website",
    "AI Shopping Assistant for D2C Brands",
    "Boost Store Revenue with Autonomous AI Agent",
    "How to Automate Sales on My Website",
    "AI Customer Copilot for Modern Brands",
    "Automated Ecommerce Shopping Concierge",
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

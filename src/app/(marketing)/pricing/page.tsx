import { Metadata } from "next";
import PricingClient, { PricingPlan } from "@/components/pricing/PricingClient";
import { constructMetadata, SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Predictable AI Credit Plans & Rollover Pricing | Labto AI",
  description:
    "Predictable, scalable AI credit pricing for Shopify, WooCommerce, and modern e-commerce storefronts. Enjoy 100% unused credit rollover with plans starting free.",
  canonicalUrl: "/pricing",
  keywords: [
    "AI E-Commerce Pricing",
    "Shopify Chatbot Pricing",
    "Credit Rollover E-Commerce AI",
    "Polar.sh AI Checkout",
    "Affordable AI Storefront Assistant",
  ],
});

const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Free",
    tierKey: "FREE",
    price: "$0",
    credits: "1,500 AI Smart Credits",
    description: "Ideal for testing and launching your first AI storefront assistant.",
    features: [
      "1,500 AI Smart Credits / month",
      "1 Whitelisted website domain",
      "1 Active API key",
      "4-Tier Web Crawler & Search",
      "Standard email support",
      "Labto AI branding badge",
    ],
    cta: "Get Started Free",
    popular: false,
    rollover: false,
    href: "/register",
  },
  {
    name: "Starter",
    tierKey: "STARTER",
    price: "$2",
    credits: "10,000 AI Smart Credits",
    description: "Perfect for growing boutique stores wanting 24/7 automated sales.",
    features: [
      "10,000 AI Smart Credits / month",
      "🔄 100% Unused Credit Rollover",
      "2 Whitelisted website domains",
      "2 Active API keys",
      "pgvector Semantic AI Search",
      "Full Custom Widget Styling",
      "Sub-1.2s Fast Latency AI",
      "24-Hour support SLA",
    ],
    cta: "Start for $2 / Month",
    popular: false,
    rollover: true,
    href: "/register",
  },
  {
    name: "Pro",
    tierKey: "PRO",
    price: "$5",
    credits: "30,000 AI Smart Credits",
    description: "Our most popular plan for high-converting e-commerce storefronts.",
    features: [
      "30,000 AI Smart Credits / month",
      "🔄 100% Unused Credit Rollover",
      "5 Whitelisted website domains",
      "4 Active API keys",
      "Full pgvector Product RAG",
      "1-Click Smart Cart Event Bridge",
      "100% White-Label (No Branding)",
      "Priority 4-Hour support SLA",
    ],
    cta: "Go Pro Now ($5/mo)",
    popular: true,
    rollover: true,
    href: "/register",
  },
  {
    name: "Enterprise",
    tierKey: "ENTERPRISE",
    price: "Custom",
    credits: "Unlimited Turbo Credits",
    description: "Dedicated high-throughput AI orchestration for large enterprise retailers.",
    features: [
      "Unlimited AI Turbo Credits",
      "Unlimited Whitelisted domains",
      "Unlimited API keys",
      "Dedicated LLM instance pool",
      "Custom pgvector embedding pipeline",
      "Dedicated Account Manager",
      "99.9% Uptime SLA guarantee",
    ],
    cta: "Contact Enterprise Sales",
    popular: false,
    rollover: true,
    href: "/contact",
  },
];

export default function PricingPage() {
  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Labto AI Assistant Subscription",
    description:
      "Autonomous AI sales assistant and shopping concierge plans with 100% unused credit rollover.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "0",
      highPrice: "5",
      offerCount: "4",
      offers: PRICING_PLANS.filter((p) => p.price !== "Custom").map((p) => ({
        "@type": "Offer",
        name: `${p.name} Plan`,
        price: p.price.replace("$", ""),
        priceCurrency: "USD",
        description: p.description,
        url: `${SITE_CONFIG.url}/pricing`,
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Unused Credit Rollover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "100% of your unused AI smart credits automatically roll over into the next billing month as long as your paid plan remains active.",
        },
      },
      {
        "@type": "Question",
        name: "How do I integrate Labto AI with my store?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Integration takes less than 1 minute. Copy your unique 1-line script snippet and paste it into your Shopify theme, WooCommerce header, or web codebase.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PricingClient plans={PRICING_PLANS} />
    </>
  );
}

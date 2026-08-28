import { Metadata } from "next";
import PricingClient from "@/components/pricing/PricingClient";
import { constructMetadata } from "@/lib/seo";

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

export default function PricingPage() {
  return <PricingClient />;
}

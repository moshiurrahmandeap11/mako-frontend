import CtaSection from "@/components/home/CtaSection";
import FaqSection from "@/components/home/FaqSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import PlatformLogosBar from "@/components/home/PlatformLogosBar";
import PricingSection from "@/components/home/PricingSection";
import {
  constructMetadata,
  generateOrganizationSchema,
  generateSoftwareSchema,
} from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Labto AI — Custom AI Chatbot & Website Copilot",
  description:
    "Transform any website with an autonomous 24/7 AI assistant. Instantly answer visitor questions, crawl knowledge bases, capture leads, recommend products, and embed in 1 minute.",
  canonicalUrl: "/",
});

export default function LandingPage() {
  const softwareSchema = generateSoftwareSchema();
  const orgSchema = generateOrganizationSchema();

  return (
    <>
      {/* Schema.org Structured Data (SSR) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <div className="bg-white text-[#201515] flex flex-col overflow-x-hidden">
        <HeroSection />
        <PlatformLogosBar />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </div>
    </>
  );
}

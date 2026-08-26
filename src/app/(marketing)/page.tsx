import { Metadata } from "next";
import FeaturesSection from "@/components/home/FeaturesSection";
import FooterSection from "@/components/home/FooterSection";
import HeroSection from "@/components/home/HeroSection";
import PlatformLogosBar from "@/components/home/PlatformLogosBar";
import FaqSection from "@/components/home/FaqSection";
import PricingSection from "@/components/home/PricingSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import {
  constructMetadata,
  generateOrganizationSchema,
  generateSoftwareSchema,
} from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Labto AI — Autonomous AI Sales Assistant & Shopping Concierge",
  description:
    "Empower your e-commerce storefront with autonomous AI sales agents. Sub-second pgvector search, automated cart injections, zero-hallucination policy answers, and 1-minute embed.",
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

      <div className="min-h-screen bg-white text-[#201515] flex flex-col overflow-x-hidden">
        <HeroSection />
        <PlatformLogosBar />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <FaqSection />
        <FooterSection />
      </div>
    </>
  );
}

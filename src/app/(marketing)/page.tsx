"use client";

import FeaturesSection from "@/components/home/FeaturesSection";
import FooterSection from "@/components/home/FooterSection";
import HeroSection from "@/components/home/HeroSection";
import PricingSection from "@/components/home/PricingSection";
import TechStackSection from "@/components/home/TechStackSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-text-main flex flex-col overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <TechStackSection />
      <PricingSection />
      <FooterSection />
    </div>
  );
}

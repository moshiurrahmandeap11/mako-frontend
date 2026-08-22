'use client';

import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TechStackSection from '@/components/home/TechStackSection';
import PricingSection from '@/components/home/PricingSection';
import FooterSection from '@/components/home/FooterSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-prompt-blue text-slate-100 flex flex-col overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <TechStackSection />
      <PricingSection />
      <FooterSection />
    </div>
  );
}

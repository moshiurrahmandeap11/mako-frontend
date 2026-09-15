"use client";

import BugReportButton from "@/components/BugReportButton";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FooterSection() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      router.push(`/register?email=${encodeURIComponent(email.trim())}`);
    } else {
      router.push("/register");
    }
  };

  return (
    <footer className="w-full p-2 sm:p-3 bg-white font-inter box-border">
      {/* Dark Outer Card Container (Matches Hero Section frame spacing & rounded-2xl) */}
      <div className="w-full bg-[#1f2429] text-white rounded-2xl p-6 sm:p-12 lg:p-14 relative overflow-hidden space-y-12 sm:space-y-16">
        
        {/* Top Integrated CTA Block */}
        <div className="text-center space-y-4 sm:space-y-5 pt-4 sm:pt-6">
          <div className="flex justify-center">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/10 select-none">
              Get started
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight max-w-2xl mx-auto leading-[1.08]">
            Take control of your AI customer experiences
          </h2>

          <p className="text-xs sm:text-sm text-[#9D9DA6] max-w-lg mx-auto font-normal leading-relaxed">
            Your storefront AI assistant should serve you, not the other way around. We're happy to help you scale your store.
          </p>

          {/* Email Input Form Pill */}
          <div className="pt-2 flex justify-center">
            <form
              onSubmit={handleGetStarted}
              className="w-full max-w-md bg-white/10 p-1.5 sm:p-2 rounded-xl border border-white/15 flex items-center justify-between gap-2 backdrop-blur-xs focus-within:border-[#1DBF73]/60 transition-colors"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="What's your work email?"
                className="w-full px-3.5 sm:px-4 py-2 text-xs sm:text-sm text-white placeholder:text-[#9D9DA6] outline-none bg-transparent font-inter"
              />
              <button
                type="submit"
                className="px-5 sm:px-6 py-2.5 rounded-lg bg-[#1DBF73] hover:bg-[#19a463] text-white font-inter font-medium text-xs sm:text-sm whitespace-nowrap transition-all active:scale-[0.98] cursor-pointer shrink-0 shadow-sm"
              >
                Get started
              </button>
            </form>
          </div>
        </div>

        {/* Subtle Horizontal Divider Line */}
        <div className="border-t border-white/10" />

        {/* Bottom Mega Grid Columns & Copyright */}
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4 text-left">
              <Link href="/" className="inline-block">
                <Image
                  src="/logo-white.svg"
                  alt="Labto AI"
                  width={180}
                  height={44}
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </Link>
              <p className="text-sm text-[#9D9DA6] leading-relaxed max-w-sm">
                Empowering modern e-commerce stores with sub-second AI sales assistants, 100% credit rollover, intelligent product RAG search, and 1-click cart event bridge.
              </p>
            </div>

            {/* Product Column */}
            <div className="space-y-3 text-left">
              <h4 className="text-xs font-medium uppercase tracking-wider text-white">
                Product
              </h4>
              <ul className="space-y-2 text-xs text-[#9D9DA6] font-normal">
                <li>
                  <Link href="#features" className="hover:text-[#1DBF73] transition-colors">
                    RAG Smart Search
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="hover:text-[#1DBF73] transition-colors">
                    Cart Event Bridge
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="hover:text-[#1DBF73] transition-colors">
                    Web Policy Scraper
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="hover:text-[#1DBF73] transition-colors">
                    Widget Customizer
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-[#1DBF73] transition-colors">
                    Pricing &amp; Refills
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="space-y-3 text-left">
              <h4 className="text-xs font-medium uppercase tracking-wider text-white">
                Resources
              </h4>
              <ul className="space-y-2 text-xs text-[#9D9DA6] font-normal">
                <li>
                  <Link href="/installation" className="hover:text-[#1DBF73] transition-colors">
                    Installation Guide
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-[#1DBF73] transition-colors">
                    Blog &amp; Insights
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#1DBF73] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#1DBF73] transition-colors">
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Action Column */}
            <div className="space-y-3 text-left">
              <h4 className="text-xs font-medium uppercase tracking-wider text-white">
                Legal &amp; Support
              </h4>
              <ul className="space-y-2 text-xs text-[#9D9DA6] font-normal">
                <li>
                  <Link href="/privacy" className="hover:text-[#1DBF73] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-[#1DBF73] transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
              <div className="pt-2">
                <BugReportButton className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-normal border border-white/20 rounded-md transition cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Bottom Copyright Divider */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9D9DA6] font-normal">
            <p>© {new Date().getFullYear()} Labto AI Inc. All rights reserved.</p>
            <p className="text-white/80">
              Built for modern e-commerce storefronts.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

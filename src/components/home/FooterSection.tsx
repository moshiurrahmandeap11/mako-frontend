"use client";

import BugReportButton from "@/components/BugReportButton";
import { LogoMark } from "@/components/Logo";
import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="mt-auto relative bg-[#1f2429] text-white font-inter">
      {/* Wave SVG Transition Graphic */}
      <div className="w-full overflow-hidden leading-none bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-12 sm:h-20 md:h-24 block"
          preserveAspectRatio="none"
        >
          <path
            fill="#1f2429"
            fillOpacity="1"
            d="M0,128L40,138.7C80,149,160,171,240,170.7C320,171,400,149,480,149.3C560,149,640,171,720,154.7C800,139,880,85,960,85.3C1040,85,1120,139,1200,144C1280,149,1360,107,1400,85.3L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          />
        </svg>
      </div>

      <div className="pt-4 pb-8 sm:pt-6 sm:pb-12">
        <div className="w-11/12 lg:w-9/12 mx-auto space-y-10">
          {/* Top Mega Grid Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
            {/* Brand Column (Spans 2 columns on lg screens) */}
            <div className="lg:col-span-2 space-y-4 text-left">
              <Link href="/" className="inline-flex items-center gap-2.5">
                <LogoMark size="md" />
                <span className="text-xl font-semibold font-inter text-white tracking-tight">
                  Labto AI
                </span>
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

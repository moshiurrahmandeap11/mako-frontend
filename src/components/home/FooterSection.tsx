"use client";

import BugReportButton from "@/components/BugReportButton";
import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="mt-auto relative bg-[#1f2429] text-white">
      {/* Wave SVG Transition Graphic */}
      <div className="w-full overflow-hidden leading-none bg-surface-light">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-10 sm:h-16 md:h-20 block"
          preserveAspectRatio="none"
        >
          <path
            fill="#1f2429"
            fillOpacity="1"
            d="M0,128L40,138.7C80,149,160,171,240,170.7C320,171,400,149,480,149.3C560,149,640,171,720,154.7C800,139,880,85,960,85.3C1040,85,1120,139,1200,144C1280,149,1360,107,1400,85.3L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          />
        </svg>
      </div>

      <div className="pt-2 pb-6 sm:pt-3 sm:pb-8">
        <div className="w-11/12 lg:w-9/12 mx-auto flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6 text-xs">
          <p className="text-center md:text-left order-2 md:order-1 text-[#9D9DA6]">
            © {new Date().getFullYear()} Labto AI Inc. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-5 sm:gap-x-6 gap-y-2.5 font-normal text-white order-1 md:order-2">
            <BugReportButton className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-normal border border-white/20 rounded-md transition cursor-pointer" />
            <Link
              href="/blog"
              className="hover:text-[#1DBF73] transition-colors whitespace-nowrap py-1 text-white/90 font-normal"
            >
              Blog
            </Link>
            <Link
              href="/installation"
              className="hover:text-[#1DBF73] transition-colors whitespace-nowrap py-1 text-white/90 font-normal"
            >
              Installation
            </Link>
            <Link
              href="/about"
              className="hover:text-[#1DBF73] transition-colors whitespace-nowrap py-1 text-white/90 font-normal"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#1DBF73] transition-colors whitespace-nowrap py-1 text-white/90 font-normal"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="hover:text-[#1DBF73] transition-colors whitespace-nowrap py-1 text-white/90 font-normal"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#1DBF73] transition-colors whitespace-nowrap py-1 text-white/90 font-normal"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import BugReportButton from "@/components/BugReportButton";
import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="mt-auto py-8 sm:py-10 md:py-12 border-t border-[#E4E5E7] bg-white">
      <div className="w-11/12 lg:w-9/12 mx-auto flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6 text-[#74767E] text-xs">
        <p className="text-center md:text-left order-2 md:order-1">
          © {new Date().getFullYear()} Labto AI Inc. All rights reserved.
        </p>

        <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-5 sm:gap-x-6 gap-y-2.5 font-medium sm:font-semibold text-[#62646A] order-1 md:order-2">
          <BugReportButton />
          <Link
            href="/blog"
            className="hover:text-[#1DBF73] transition-colors whitespace-nowrap py-1"
          >
            Blog
          </Link>
          <Link
            href="/installation"
            className="hover:text-[#1DBF73] transition-colors whitespace-nowrap py-1"
          >
            Installation
          </Link>
          <Link
            href="/about"
            className="hover:text-[#1DBF73] transition-colors whitespace-nowrap py-1"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="hover:text-[#1DBF73] transition-colors whitespace-nowrap py-1"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="hover:text-[#1DBF73] transition-colors whitespace-nowrap py-1"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="hover:text-[#1DBF73] transition-colors whitespace-nowrap py-1"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

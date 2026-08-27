"use client";

import BugReportButton from "@/components/BugReportButton";
import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="mt-auto py-12 px-6 border-t border-[#E4E5E7] bg-white">
      <div className="w-11/12 lg:w-9/12 max-w-9/12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[#74767E] text-xs">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} Labto AI Inc. All rights reserved.
        </p>

        <div className="flex items-center gap-5 font-semibold text-[#62646A]">
          <BugReportButton />
          <Link href="/about" className="hover:text-[#1DBF73] transition">
            About Us
          </Link>
          <Link href="/privacy" className="hover:text-[#1DBF73] transition">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[#1DBF73] transition">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

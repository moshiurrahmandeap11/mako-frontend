'use client';

import Link from 'next/link';

export default function FooterSection() {
  return (
    <footer className="mt-auto py-12 px-6 border-t border-[#E4E5E7] bg-white">
      <div className="w-11/12 lg:w-10/12 max-w-10/12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[#74767E] text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#1DBF73] animate-pulse" />
          <span className="text-[#222325] font-bold">
            Labto AI Platform Online
          </span>
        </div>

        <p className="text-center md:text-left">
          © {new Date().getFullYear()} Labto AI Inc. All rights reserved.
        </p>

        <div className="flex gap-5 font-semibold text-[#62646A]">
          <Link href="/privacy" className="hover:text-[#1DBF73] transition">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[#1DBF73] transition">
            Terms of Service
          </Link>
          <Link href="/docs" className="hover:text-[#1DBF73] transition">
            API Docs
          </Link>
        </div>
      </div>
    </footer>
  );
}

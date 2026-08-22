'use client';

import Link from 'next/link';

export default function FooterSection() {
  return (
    <footer className="mt-auto py-12 px-6 border-t border-[#39FF88]/15 bg-[#0B132B]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#39FF88] animate-pulse" />
          <span className="text-slate-300 font-semibold">
            Labto AI Service Platform Online
          </span>
        </div>

        <p className="text-center md:text-left">
          © {new Date().getFullYear()} Labto AI Inc. All rights reserved.
          Decoupled AI Embeds.
        </p>

        <div className="flex gap-4 font-bold">
          <Link href="/privacy" className="hover:text-[#39FF88] transition">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[#39FF88] transition">
            Terms of Service
          </Link>
          <Link href="/docs" className="hover:text-[#39FF88] transition">
            API Documentation
          </Link>
        </div>
      </div>
    </footer>
  );
}

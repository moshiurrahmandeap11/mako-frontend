import React from "react";
import { Metadata } from "next";
import InstallationClient from "@/components/installation/InstallationClient";

export const metadata: Metadata = {
  title: "Installation Guide & Video Tutorial — Labto AI",
  description:
    "Learn how to install the Labto AI storefront shopping assistant on Shopify, WooCommerce, WordPress, Webflow, or custom websites in under 2 minutes.",
  openGraph: {
    title: "How to Install Labto AI — Video Tutorial & Docs",
    description:
      "Step-by-step video tutorial and copy-paste code snippets to install Labto AI chatbot on any e-commerce platform.",
    url: "https://labtoai.com/installation",
    siteName: "Labto AI",
  },
  alternates: {
    canonical: "https://labtoai.com/installation",
  },
};

export default function InstallationPage() {
  return (
    <div className="bg-white min-h-screen py-12 lg:py-16 text-text-main">
      <div className="w-11/12 lg:w-9/12 max-w-7xl mx-auto px-4 lg:px-0 space-y-12">
        {/* Header Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-[#1DBF73]/10 text-[#1DBF73]">
            Installation Guide
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#222325]">
            How to Install <br />
            Labto AI Assistant.
          </h1>
          <p className="text-sm sm:text-base text-[#71717A] leading-relaxed">
            Follow our 2-minute video guide or use the copy-paste snippets below to embed your autonomous AI storefront assistant on any platform.
          </p>
        </div>

        {/* Main Installation Interactive Client */}
        <InstallationClient />
      </div>
    </div>
  );
}

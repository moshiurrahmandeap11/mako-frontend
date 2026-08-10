import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Shopping Assistant — Merchant Dashboard",
  description: "Manage your AI-powered shopping assistant widget, products, API keys, and visitor chat analytics.",
};

import QueryProvider from "@/components/QueryProvider";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full dark">
      <body className={`${inter.className} min-h-full bg-slate-950 text-slate-100 antialiased`}>
        <QueryProvider>
          {children}
        </QueryProvider>

        <Script
          src="http://localhost:4000/widget.js"
          data-api-key="aiw_live_db2b1034ebb8c8e18c31bc9133914c847e8ff883795314ae"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

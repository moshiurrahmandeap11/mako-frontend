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
import { Toaster } from "react-hot-toast";

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
        
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#0f172a',
              color: '#fff',
              border: '1px solid #1e293b',
              fontSize: '13px',
            },
          }}
        />

        <Script
          src="http://localhost:4000/widget.js"
          data-api-key="aiw_live_b344e76ca39295a8cb438c3b45f71d4c6acbafadd59f6332"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

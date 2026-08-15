import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Labto AI Assistant — Merchant Dashboard",
  description: "Manage your AI-powered assistant widget, products, API keys, and visitor chat analytics.",
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

        {process.env.NEXT_PUBLIC_DEMO_WIDGET_SCRIPT && process.env.NEXT_PUBLIC_DEMO_WIDGET_KEY && (
          <Script
            src={process.env.NEXT_PUBLIC_DEMO_WIDGET_SCRIPT}
            data-api-key={process.env.NEXT_PUBLIC_DEMO_WIDGET_KEY}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}

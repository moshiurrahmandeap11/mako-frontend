import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Labto AI Assistant — Next-Gen AI Shopping Concierge",
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
    <html lang="en" className="h-full light" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.className} min-h-full bg-white text-[#222325] antialiased`}
      >
        <QueryProvider>
          {children}
        </QueryProvider>

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#FFFFFF',
              color: '#222325',
              border: '1px solid #E4E5E7',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              fontSize: '13px',
              fontWeight: '600',
            },
          }}
        />

        <Script
          src={process.env.NEXT_PUBLIC_WIDGET_SCRIPT_URL || "https://labto.ahsanul.dev/widget.js" || "http://localhost:4000/widget.js"}
          data-api-key="cm7dfl2k000033b6t12345678"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}

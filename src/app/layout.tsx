import type { Metadata } from "next";
import { Inter, Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fontMontserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata();

import CookieConsent from "@/components/CookieConsent";
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
        className={`${fontSans.className} ${fontSans.variable} ${fontInter.variable} ${fontMontserrat.variable} min-h-full bg-white text-text-main antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>

        <CookieConsent />

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#FFFFFF",
              color: "#222325",
              border: "1px solid #E4E5E7",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              fontSize: "13px",
              fontWeight: "600",
            },
          }}
        />
        {/* aiw_live_7ad54fe45b4d6742248ba9a23aeac3aef15c7604448f10d8 */}
        <Script
          src={
            process.env.NEXT_PUBLIC_WIDGET_SCRIPT_URL ||
            "https://labto.ahsanul.dev/widget.js" ||
            "http://localhost:4000/widget.js"
          }
          data-api-key="aiw_live_8416eeab5df100b6a43deef69f84bd32f5145645d33041e2"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}

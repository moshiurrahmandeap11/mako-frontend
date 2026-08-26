"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const cookieYesId = process.env.NEXT_PUBLIC_COOKIEYES_ID;

  useEffect(() => {
    // Check if user has already accepted or rejected cookie consent
    const consent = localStorage.getItem("labto_cookie_consent");
    if (!consent && !cookieYesId) {
      setShowBanner(true);
    }
  }, [cookieYesId]);

  const handleAccept = () => {
    localStorage.setItem("labto_cookie_consent", "accepted");
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("labto_cookie_consent", "rejected");
    setShowBanner(false);
  };

  return (
    <>
      {/* CookieYes Official Integration (If NEXT_PUBLIC_COOKIEYES_ID is provided) */}
      {cookieYesId && (
        <Script
          id="cookieyes"
          type="text/javascript"
          src={`https://cdn-cookieyes.com/client_data/${cookieYesId}/script.js`}
          strategy="afterInteractive"
        />
      )}

      {/* Built-in GDPR & CookieYes Compliant Banner */}
      {showBanner && (
        <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 p-5 rounded-xl bg-white border border-[#E4E5E7] shadow-xl text-left space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-degular text-sm font-semibold text-[#201515]">
              Cookie Consent & Data Privacy
            </h3>
            <span className="w-2 h-2 rounded-full bg-[#1DBF73]" />
          </div>

          <p className="text-xs text-[#62646A] leading-relaxed">
            We use essential cookies and local storage to enable AI shopping assistant sessions, store preferences, and analyze anonymized site traffic. Learn more in our{" "}
            <Link href="/privacy" className="text-[#1DBF73] font-semibold underline hover:text-[#19a463]">
              Privacy Policy
            </Link>.
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAccept}
              className="flex-1 py-2 px-4 rounded-lg bg-[#1DBF73] text-white text-xs font-semibold hover:bg-[#19a463] transition cursor-pointer"
            >
              Accept All
            </button>
            <button
              onClick={handleReject}
              className="py-2 px-4 rounded-lg bg-surface-light border border-border-light text-[#201515] text-xs font-medium hover:bg-slate-100 transition cursor-pointer"
            >
              Reject Non-Essential
            </button>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import { Wrench, RefreshCw, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Button from "@/components/Button";

export default function MaintenancePage() {
  const router = useRouter();
  const [checking, setChecking] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["publicPlatformSettings"],
    queryFn: () => api.get("/api/settings/public") as Promise<any>,
    refetchInterval: 15000,
  });

  const isMaintenance = data?.maintenanceMode ?? true;
  const message =
    data?.maintenanceMessage ||
    "Labto AI is currently undergoing scheduled platform maintenance and system upgrades. We will be back online shortly.";

  const handleRefresh = async () => {
    setChecking(true);
    const res: any = await refetch();
    setChecking(false);
    if (res?.data && res.data.maintenanceMode === false) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#222325] flex flex-col justify-between p-6">
      {/* Top Header */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between">
        <Logo id="maint-logo" markId="maint-logo-target" href="/" />
        <Link
          href="/login?redirect=/admin"
          className="text-xs text-[#74767E] hover:text-[#222325] flex items-center gap-1 transition"
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Admin Portal</span>
        </Link>
      </div>

      {/* Center Card */}
      <div className="max-w-lg w-full mx-auto my-auto bg-white border border-[#E4E5E7] rounded-md p-8 sm:p-10 text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-[#1DBF73] border border-emerald-200 flex items-center justify-center mx-auto">
          <Wrench className="w-7 h-7" strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#F0F2F5] text-[#1DBF73] border border-[#E4E5E7] text-[11px] font-normal">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1DBF73] animate-pulse" />
            Scheduled Maintenance
          </span>
          <h1 className="text-2xl font-normal text-[#222325] tracking-tight">
            System Upgrades in Progress
          </h1>
          <p className="text-xs sm:text-sm text-[#62646A] leading-relaxed pt-1 max-w-sm mx-auto">
            {message}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={handleRefresh}
            variant="primary"
            disabled={checking}
            className="w-full sm:w-auto px-5 py-2.5 text-xs !font-normal flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${checking ? "animate-spin" : ""}`} />
            <span>{checking ? "Checking System..." : "Check Status & Refresh"}</span>
          </Button>
        </div>

        <div className="pt-4 border-t border-[#E4E5E7] text-[11px] text-[#74767E]">
          Thank you for your patience. All your store products, AI models, and conversations are safely preserved.
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-5xl w-full mx-auto text-center text-xs text-[#74767E]">
        © {new Date().getFullYear()} Labto AI Inc. All rights reserved.
      </div>
    </div>
  );
}

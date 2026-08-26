"use client";

import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Megaphone } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function MaintenanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["publicPlatformSettings"],
    queryFn: () => api.get("/api/settings/public") as Promise<any>,
    refetchInterval: 20000,
    retry: 1,
  });

  const isMaintenance = Boolean(data?.maintenanceMode);
  const announcementBanner = data?.announcementBanner || "";

  useEffect(() => {
    if (!pathname) return;

    // Super Admin routes and Login are NEVER blocked so admins can log in and manage settings
    const isAdminRoute = pathname.startsWith("/admin");
    const isLoginRoute = pathname.startsWith("/login");
    const isMaintenancePage = pathname === "/maintenance";

    if (isMaintenance) {
      if (!isAdminRoute && !isLoginRoute && !isMaintenancePage) {
        router.replace("/maintenance");
      }
    } else {
      // If maintenance mode was turned OFF and user is stuck on /maintenance, send to home
      if (isMaintenancePage) {
        router.replace("/dashboard");
      }
    }
  }, [isMaintenance, pathname, router]);

  return (
    <>
      {/* Optional Platform Announcement Banner */}
      {!isMaintenance &&
        announcementBanner &&
        !pathname.startsWith("/admin") && (
          <div className="bg-[#1DBF73] text-white px-4 py-2 text-xs font-normal text-center flex items-center justify-center gap-2 relative z-50">
            <Megaphone className="w-3.5 h-3.5 shrink-0" />
            <span>{announcementBanner}</span>
          </div>
        )}
      {children}
    </>
  );
}

"use client";

import DashPageHeader from "@/components/DashPageHeader";
import Logo from "@/components/Logo";
import Sidebar from "@/components/Sidebar";
import { Skeleton } from "@/components/Skeleton";
import { fetchApi } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function CheckoutVerifier() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      fetchApi(`/api/billing/verify?session_id=${sessionId}`)
        .then((data) => {
          if (data.success) {
            queryClient.invalidateQueries({ queryKey: ["merchantProfile"] });
          }
        })
        .catch(console.error);
    }
  }, [sessionId, queryClient]);

  return null;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const {
    data: merchantData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["merchantProfile"],
    queryFn: () => api.get("/api/merchant/me") as Promise<any>,
    retry: false,
  });

  const merchant = merchantData?.merchant;
  const adminEmail = (
    process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@ahsanul.dev"
  )
    .trim()
    .toLowerCase();
  const userEmail = merchant?.email?.trim().toLowerCase();
  const isAdmin = Boolean(
    merchant &&
    (merchant.isAdmin === true || (userEmail && userEmail === adminEmail)),
  );

  // Automatically close mobile nav on route change
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  if (isError) {
    router.push("/login");
    return null;
  }

  const handleLogout = async () => {
    try {
      await authClient.signOut();
    } catch {}
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-light text-text-main flex">
        {/* Skeleton Sidebar (Desktop) */}
        <aside className="hidden md:flex w-64 border-r border-border-light bg-white p-6 flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded" />
              <Skeleton className="w-28 h-5" />
            </div>
            <Skeleton className="w-full h-14 rounded-xl" />
            <div className="space-y-2 pt-4">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-9 rounded" />
              ))}
            </div>
          </div>
          <Skeleton className="w-full h-12 rounded-xl" />
        </aside>

        {/* Skeleton Content */}
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-border-light px-4 sm:px-8 flex items-center justify-between bg-white">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-36 h-6 rounded-full" />
          </header>
          <div className="p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
            <Skeleton className="w-full h-44 rounded-2xl" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-2xl" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#F7F7F7] text-[#222325] flex flex-col md:flex-row overflow-hidden">
      <Suspense fallback={null}>
        <CheckoutVerifier />
      </Suspense>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-[#E4E5E7] bg-white flex-col justify-between shrink-0 h-screen sticky top-0">
        <Sidebar merchant={merchant} isAdmin={isAdmin} />
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileNavOpen && (
        <div
          onClick={() => setIsMobileNavOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden animate-fade-in"
        />
      )}

      {/* Mobile Slide-in Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white border-r border-[#E4E5E7] transform transition-transform duration-200 ease-in-out md:hidden ${
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar merchant={merchant} isAdmin={isAdmin} onCloseMobileNav={() => setIsMobileNavOpen(false)} />
      </div>

      {/* Main Page Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <DashPageHeader
          pathname={pathname}
          merchant={merchant}
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
          onLogout={handleLogout}
        />

        {/* Page Content Container - Full Width Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 lg:p-4.5 w-full max-w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}


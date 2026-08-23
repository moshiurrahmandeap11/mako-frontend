"use client";

import { LogoMark } from "@/components/Logo";
import { Skeleton } from "@/components/Skeleton";
import { fetchApi } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  CreditCard,
  Key,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  Settings,
  ShieldCheck,
  Store,
  X,
} from "lucide-react";
import Link from "next/link";
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

  const navItems = [
    ...(isAdmin
      ? [
          {
            label: "Admin Console",
            href: "/admin",
            icon: ShieldCheck,
            isAdmin: true,
          },
        ]
      : []),
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Knowledge Base", href: "/knowledge-base", icon: BookOpen },
    { label: "Product Catalog", href: "/products", icon: Package },
    { label: "Widget Settings", href: "/widget-settings", icon: Settings },
    { label: "API Keys", href: "/api-keys", icon: Key },
    { label: "Conversations", href: "/conversations", icon: MessageSquare },
    { label: "Billing & Plans", href: "/billing", icon: CreditCard },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex">
        {/* Skeleton Sidebar (Desktop) */}
        <aside className="hidden md:flex w-64 border-r border-slate-800/80 bg-slate-900/60 p-6 flex-col justify-between shrink-0">
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
          <header className="h-16 border-b border-slate-800/80 px-4 sm:px-8 flex items-center justify-between">
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

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between">
      <div>
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-[#39FF88]/15 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <LogoMark size="sm" />
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-[0.18em] text-white group-hover:text-[#39FF88] transition">
                Labto AI
              </span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                {isAdmin ? "Super Admin Console" : "Merchant Console"}
              </span>
            </div>
          </Link>

          {/* Close button for mobile drawer */}
          <button
            onClick={() => setIsMobileNavOpen(false)}
            className="md:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Merchant Store Info */}
        <div className="p-3.5 mx-3 my-4 rounded-xl bg-[#0B132B] border border-[#39FF88]/20 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#131D38] border border-[#39FF88]/30 flex items-center justify-center text-[#39FF88] shrink-0">
            {isAdmin ? (
              <ShieldCheck className="w-4 h-4 text-[#39FF88]" />
            ) : (
              <Store className="w-4 h-4" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-white truncate">
                {merchant?.name || "My Store"}
              </p>
              {isAdmin && (
                <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-[#39FF88] text-[#0B132B]">
                  ADMIN
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 truncate">
              {merchant?.email}
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded text-xs font-bold tracking-[0.08em] uppercase transition ${
                  isActive
                    ? "bg-[#39FF88] text-[#0B132B] shadow-lg shadow-[#39FF88]/20 font-extrabold"
                    : item.isAdmin
                      ? "text-[#39FF88] bg-[#39FF88]/10 border border-[#39FF88]/20 hover:bg-[#39FF88]/20"
                      : "text-slate-400 hover:text-slate-100 hover:bg-[#1C2B4E]/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.isAdmin && !isActive && (
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-[#39FF88]/20 text-[#39FF88]">
                    MASTER
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Account & Tier Info */}
      <div className="p-4 border-t border-[#39FF88]/15">
        <div className="mb-3 px-3 py-2.5 rounded bg-[#0B132B] border border-[#39FF88]/20 text-slate-300 text-xs font-semibold flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            TIER
          </span>
          <span className="bg-[#39FF88] text-[#0B132B] text-[10px] px-2 py-0.5 rounded uppercase font-extrabold tracking-wider">
            {merchant?.planTier || "FREE"}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold tracking-[0.1em] uppercase text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition border border-transparent hover:border-rose-500/20"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 flex flex-col md:flex-row">
      <Suspense fallback={null}>
        <CheckoutVerifier />
      </Suspense>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-[#39FF88]/15 bg-[#131D38]/90 backdrop-blur-xl flex-col justify-between shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileNavOpen && (
        <div
          onClick={() => setIsMobileNavOpen(false)}
          className="fixed inset-0 z-40 bg-[#0B132B]/80 backdrop-blur-sm md:hidden animate-fade-in"
        />
      )}

      {/* Mobile Slide-in Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-[#131D38] border-r border-[#39FF88]/20 shadow-2xl transform transition-transform duration-200 ease-in-out md:hidden ${
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>

      {/* Main Page Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Sticky Header with Mobile Hamburger */}
        <header className="h-16 border-b border-[#39FF88]/15 bg-[#0B132B]/90 px-4 sm:px-8 flex items-center justify-between sticky top-0 backdrop-blur-xl z-30">
          <div className="flex items-center gap-3">
            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="md:hidden p-2 rounded-lg bg-[#131D38] border border-[#39FF88]/20 text-slate-300 hover:text-white"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span className="uppercase tracking-wider font-bold text-[10px] hidden sm:inline">
                Console
              </span>
              <span className="hidden sm:inline">/</span>
              <span className="text-white font-bold uppercase tracking-wider text-[10px] truncate max-w-[140px] sm:max-w-none">
                {pathname === "/dashboard"
                  ? "Overview"
                  : pathname === "/admin"
                    ? "Admin Console"
                    : pathname.replace("/", "").replace("-", " ")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#39FF88]/10 text-[#39FF88] border border-[#39FF88]/30 hover:bg-[#39FF88]/20 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin
              </Link>
            )}

            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-[#39FF88]/10 text-[#39FF88] border border-[#39FF88]/20">
              <span className="w-2 h-2 rounded-full bg-[#39FF88] animate-pulse" />
              <span className="hidden sm:inline">API Status:</span> Active
            </span>
          </div>
        </header>

        {/* Page Content Container - Full Width */}
        <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

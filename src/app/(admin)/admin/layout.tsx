"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { authClient } from "@/lib/auth-client";
import Logo from "@/components/Logo";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Cpu,
  Globe2,
  Inbox,
  Bug,
  Settings,
  ShieldCheck,
  ArrowUpRight,
  LogOut,
  Menu,
  X,
  Store,
  Sparkles,
  MailCheck,
  Newspaper,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: merchantData, isLoading, isError } = useQuery({
    queryKey: ["merchantProfile"],
    queryFn: () => api.get("/api/merchant/me") as Promise<any>,
    retry: false,
  });

  const merchant = merchantData?.merchant;
  const isAdmin = Boolean(merchant && (merchant.role === "ADMIN" || merchant.isAdmin === true));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center text-[#222325]">
        <div className="flex items-center gap-3 text-xs text-[#74767E]">
          <div className="w-4 h-4 border-2 border-[#1DBF73] border-t-transparent rounded-full animate-spin" />
          <span>Verifying Admin Authorization...</span>
        </div>
      </div>
    );
  }

  if (isError || !merchant || !isAdmin) {
    if (typeof window !== "undefined") {
      router.replace("/dashboard");
    }
    return null;
  }

  const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Merchants & Users", href: "/admin/users", icon: Users },
    { label: "Subscribers", href: "/admin/subscribers", icon: MailCheck },
    { label: "Blog Posts", href: "/admin/blogs", icon: Newspaper },
    { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
    { label: "AI Tokens & Pools", href: "/admin/token-usage", icon: Cpu },
    { label: "Crawler Monitor", href: "/admin/scraper-jobs", icon: Globe2 },
    { label: "Contact Inquiries", href: "/admin/inquiries", icon: Inbox },
    { label: "Bug Reports", href: "/admin/bug-reports", icon: Bug },
    { label: "Global Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  const getBreadcrumbTitle = () => {
    if (pathname === "/admin") return "OVERVIEW";
    const sub = pathname.replace("/admin/", "").replace("-", " ").toUpperCase();
    return sub;
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-white text-[#222325]">
      <div>
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-[#E4E5E7] flex items-center justify-between">
          <Logo id="admin-brand-logo" markId="admin-logomark-target" href="/admin" />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-[#74767E] hover:text-[#222325] p-1"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="px-3 pt-3 space-y-1">
          <div className="px-3.5 py-1.5 text-[10px] font-semibold text-[#74767E] uppercase tracking-wider">
            Super Admin Console
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-md text-sm font-normal transition ${
                  isActive
                    ? "bg-[#1DBF73] text-white font-medium"
                    : "text-[#62646A] hover:text-[#222325] hover:bg-[#F0F2F5]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.5} />
                  <span className="leading-none -mt-0.5">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Switch View */}
      <div className="p-4 border-t border-[#E4E5E7] space-y-2">
        <div className="mb-2 px-1 py-1 flex items-center justify-between text-xs font-normal">
          <span className="text-[#74767E]">Admin Role :</span>
          <span className="text-[#1DBF73] font-medium">Super Admin</span>
        </div>
        <Link
          href="/dashboard"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-normal bg-[#F0F2F5] hover:bg-[#E4E5E7] text-[#222325] border border-[#E4E5E7] rounded-md transition"
        >
          <Store className="w-3.5 h-3.5 text-[#62646A]" strokeWidth={1.5} />
          <span>Switch to Merchant View</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-md transition"
        >
          <LogOut className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-[#F7F7F7] text-[#222325] flex flex-col md:flex-row overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-[#E4E5E7] bg-white flex-col justify-between shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-in Drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white border-r border-[#E4E5E7] transform transition-transform duration-200 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>

      {/* Main Page Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 px-6 border-b border-[#E4E5E7] bg-white flex items-center justify-between shrink-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1.5 text-[#62646A] hover:text-[#222325] rounded-md border border-[#E4E5E7]"
            >
              <Menu className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-[#74767E] uppercase tracking-wider text-[10px]">
                ADMIN / {getBreadcrumbTitle()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F0F2F5] border border-[#E4E5E7] text-[#1DBF73] text-xs font-normal">
              <span className="w-2 h-2 rounded-full bg-[#1DBF73] animate-pulse" />
              <span>Platform Live</span>
            </div>

            <div className="flex items-center gap-2.5 pl-3 border-l border-[#E4E5E7]">
              <div className="w-8 h-8 rounded-full bg-[#1DBF73] text-white flex items-center justify-center text-xs font-bold">
                {merchant.email?.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-medium text-[#222325] truncate max-w-[130px]">{merchant.email}</p>
                <p className="text-[10px] text-[#74767E]">Master Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Body Container */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 lg:p-4.5 w-full max-w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

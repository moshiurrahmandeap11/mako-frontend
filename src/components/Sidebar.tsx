"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { TbSparkle2 } from "react-icons/tb";
import {
  BookOpen,
  CreditCard,
  Key,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";

interface SidebarProps {
  merchant: {
    planTier?: string | null;
    isAdmin?: boolean | null;
  } | null;
  isAdmin?: boolean;
  onCloseMobileNav?: () => void;
}

export default function Sidebar({
  merchant,
  isAdmin = false,
  onCloseMobileNav,
}: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    ...(isAdmin
      ? [
          {
            label: "Admin Console",
            href: "/admin",
            icon: ShieldCheck,
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

  return (
    <div className="h-full flex flex-col justify-between bg-white">
      <div>
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-border-light flex items-center justify-between">
          <Logo
            id="navbar-brand-logo"
            markId="navbar-logomark-target"
            href="/"
          />

          {/* Close button for mobile drawer */}
          {onCloseMobileNav && (
            <button
              onClick={onCloseMobileNav}
              className="md:hidden text-text-muted hover:text-text-main p-1"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="px-3 pt-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
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

      {/* Footer Account & Tier Info */}
      <div className="p-4 border-t border-[#E4E5E7]">
        <div className="mb-3 px-1 py-1 flex items-center justify-between text-xs font-normal">
          <span className="text-[#74767E]">Current Plan :</span>
          <span className="text-[#222325]">
            {merchant?.planTier
              ? merchant.planTier.charAt(0).toUpperCase() + merchant.planTier.slice(1).toLowerCase()
              : "Free"}
          </span>
        </div>

        <Link
          href="/pricing"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-normal bg-[#1DBF73] text-white rounded-md hover:bg-[#19A463] transition cursor-pointer"
        >
          <TbSparkle2 className="w-4 h-4" />
          <span>Upgrade Plan</span>
        </Link>
      </div>
    </div>
  );
}

"use client";

import { Menu } from "lucide-react";
import ProfileDropdown from "@/components/ProfileDropdown";

interface DashPageHeaderProps {
  pathname: string;
  merchant: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  onOpenMobileNav: () => void;
  onLogout: () => void;
}

export default function DashPageHeader({
  pathname,
  merchant,
  onOpenMobileNav,
  onLogout,
}: DashPageHeaderProps) {
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Overview";
    if (pathname === "/admin") return "Admin Console";
    return pathname.replace("/", "").replace(/-/g, " ");
  };

  return (
    <header className="h-16 shrink-0 border-b border-[#E4E5E7] bg-white/95 px-3.5 sm:px-4 lg:px-4.5 flex items-center justify-between sticky top-0 backdrop-blur-xl z-30">
      <div className="flex items-center gap-3">
        {/* Hamburger Button for Mobile */}
        <button
          onClick={onOpenMobileNav}
          className="md:hidden p-2 rounded-lg bg-[#F7F7F7] border border-[#E4E5E7] text-[#404145] hover:text-[#222325] cursor-pointer"
          aria-label="Open Navigation"
        >
          <Menu className="w-5 h-5" strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-2 text-xs text-[#74767E] font-medium">
          <span className="uppercase tracking-wider font-bold text-[10px] hidden sm:inline">
            Console
          </span>
          <span className="hidden sm:inline">/</span>
          <span className="text-[#222325] font-bold uppercase tracking-wider text-[10px] truncate max-w-[140px] sm:max-w-none">
            {getPageTitle()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <ProfileDropdown user={merchant} onLogout={onLogout} />
      </div>
    </header>
  );
}

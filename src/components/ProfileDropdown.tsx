"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, User } from "lucide-react";

interface ProfileDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  onLogout: () => void;
}

export default function ProfileDropdown({ user, onLogout }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full overflow-hidden border border-[#E4E5E7] transition-all flex items-center justify-center cursor-pointer shadow-sm focus:outline-none"
      >
        {user?.image ? (
          <Image
            src={user.image}
            alt="Profile"
            width={32}
            height={32}
            quality={100}
            priority
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#1DBF73] text-white font-medium text-xs leading-none flex items-center justify-center select-none">
            {user?.name ? (
              user.name.charAt(0).toUpperCase()
            ) : (
              <User className="w-4 h-4 text-white" strokeWidth={1.5} />
            )}
          </div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{
              duration: 0.16,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: "top right" }}
            className="absolute right-0 mt-2.5 w-60 bg-white border border-[#E4E5E7] rounded-md shadow-md py-2 z-50 text-left"
          >
            {/* User Profile Header */}
            <div className="px-3.5 pb-2.5">
              <p className="text-xs font-medium text-[#222325] leading-tight truncate">
                {user?.name || "User"}
              </p>
              <p className="text-[11px] text-[#74767E] truncate mt-0.5">
                {user?.email}
              </p>
            </div>

            <hr className="border-t border-[#E4E5E7] my-1" />

            {/* Navigation Links */}
            <div className="py-0.5">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="block px-3.5 py-1.5 text-xs font-normal text-[#222325] hover:bg-[#F0F2F5] transition"
              >
                Profile
              </Link>
              <Link
                href="/widget-settings"
                onClick={() => setIsOpen(false)}
                className="block px-3.5 py-1.5 text-xs font-normal text-[#222325] hover:bg-[#F0F2F5] transition"
              >
                Account settings
              </Link>
              <Link
                href="/billing"
                onClick={() => setIsOpen(false)}
                className="block px-3.5 py-1.5 text-xs font-normal text-[#222325] hover:bg-[#F0F2F5] transition"
              >
                Billing and payments
              </Link>
            </div>

            <hr className="border-t border-[#E4E5E7] my-1" />

            {/* Sign out */}
            <div className="pt-0.5">
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3.5 py-1.5 text-xs font-normal text-[#62646A] hover:text-rose-600 hover:bg-rose-50/50 transition cursor-pointer text-left"
              >
                <LogOut className="w-3.5 h-3.5 text-[#74767E]" strokeWidth={1.5} />
                <span>Sign out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

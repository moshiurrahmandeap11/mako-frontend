"use client";

import { authClient } from "@/lib/auth-client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut, Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#features", label: "Features" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/installation", label: "Installation" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 pointer-events-none ${
          isScrolled ? "pt-3 sm:pt-4 px-4 sm:px-6" : "pt-3 sm:pt-5 lg:pt-6 px-4 sm:px-8 lg:px-12"
        }`}
      >
        <motion.div
          layout
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between transition-all duration-300 w-full ${
            isScrolled
              ? "max-w-5xl h-14 pl-3.5 sm:pl-4 pr-1.5 sm:pr-2 rounded-lg bg-white/50 backdrop-blur-xl border border-[#1f2429]/[0.05] shadow-none"
              : "max-w-7xl h-20 px-2 sm:px-4 bg-transparent border border-transparent shadow-none"
          }`}
        >
          {/* Brand Logo */}
          <div className="flex items-center">
            <Logo
              id="navbar-brand-logo"
              markId="navbar-logomark-target"
              href="/"
              size="sm"
              onClick={handleLogoClick}
            />
          </div>

          {/* Centered Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 font-inter text-[13.5px] lg:text-[14px] font-normal text-[#1f2429]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg font-normal transition-colors duration-150 ${
                    isActive
                      ? "text-[#1dbf73] font-medium"
                      : "text-[#1f2429] hover:text-[#1dbf73] hover:bg-black/[0.03]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Aligned Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="w-24 h-8 rounded-lg bg-black/5 animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="w-9 h-9 rounded-full overflow-hidden border border-border-light transition-all flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-[#1dbf73]/40"
                  >
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt="Profile"
                        width={36}
                        height={36}
                        quality={100}
                        priority
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1dbf73] text-white font-bold text-[14px] leading-none flex items-center justify-center select-none">
                        {session.user.name ? (
                          session.user.name.charAt(0).toUpperCase()
                        ) : (
                          <User className="w-4 h-4 text-white" />
                        )}
                      </div>
                    )}
                  </button>

                  <AnimatePresence>
                    {profileMenuOpen && (
                      <>
                        {/* Invisible backdrop to close dropdown on outside click */}
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setProfileMenuOpen(false)}
                        />

                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -6 }}
                          transition={{
                            duration: 0.16,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          style={{ transformOrigin: "top right" }}
                          className="absolute right-0 mt-3 w-64 bg-white border border-[#1f2429]/10 rounded-xl shadow-2xl shadow-black/10 py-3 z-50 text-left font-inter"
                        >
                          {/* User Profile Header */}
                          <div className="px-4 pb-3">
                            <p className="text-[14px] font-bold text-[#1f2429] leading-tight truncate">
                              {session.user.name || "User"}
                            </p>
                            <p className="text-[12px] text-[#6e797b] truncate mt-0.5">
                              {session.user.email}
                            </p>
                            <Link
                              href="/dashboard"
                              onClick={() => setProfileMenuOpen(false)}
                              className="mt-3 block w-full py-1.5 px-3 text-center border border-[#1f2429]/10 rounded-lg text-xs font-semibold text-[#1f2429] hover:bg-black/5 transition"
                            >
                              Switch to Dashboard
                            </Link>
                          </div>

                          <hr className="border-t border-[#1f2429]/10 my-1" />

                          {/* Navigation Links */}
                          <div className="py-1">
                            <Link
                              href="/profile"
                              onClick={() => setProfileMenuOpen(false)}
                              className="block px-4 py-2 text-[13px] font-medium text-[#1f2429] hover:text-[#1dbf73] hover:bg-black/[0.03] transition"
                            >
                              Profile
                            </Link>
                            <Link
                              href="/widget-settings"
                              onClick={() => setProfileMenuOpen(false)}
                              className="block px-4 py-2 text-[13px] font-medium text-[#1f2429] hover:text-[#1dbf73] hover:bg-black/[0.03] transition"
                            >
                              Account settings
                            </Link>
                            <Link
                              href="/billing"
                              onClick={() => setProfileMenuOpen(false)}
                              className="block px-4 py-2 text-[13px] font-medium text-[#1f2429] hover:text-[#1dbf73] hover:bg-black/[0.03] transition"
                            >
                              Billing and payments
                            </Link>
                          </div>

                          <hr className="border-t border-[#1f2429]/10 my-1" />

                          {/* Sign out */}
                          <div className="pt-1">
                            <button
                              onClick={() => {
                                handleLogout();
                                setProfileMenuOpen(false);
                              }}
                              className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] font-medium text-[#1f2429] hover:text-red-600 transition cursor-pointer text-left"
                            >
                              <LogOut className="w-4 h-4 text-[#6e797b]" />
                              <span>Sign out</span>
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 lg:gap-3 font-inter">
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 text-[13.5px] lg:text-[14px] font-normal text-[#1f2429] hover:text-[#1dbf73] transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg bg-[#1dbf73] text-white font-medium text-[13px] lg:text-[14px] hover:bg-[#19a463] shadow-xs active:scale-[0.98] transition-all"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#1f2429] hover:text-[#1dbf73] p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </motion.div>
      </header>

      {/* Full-Screen Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 z-60 bg-white flex flex-col font-inter"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#1f2429]/10">
              <Logo
                id="navbar-brand-logo-mobile"
                markId="navbar-logomark-target-mobile"
                href="/"
                onClick={handleLogoClick}
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#6e797b] hover:text-[#1f2429] p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="flex flex-col gap-2 text-sm font-medium text-[#1f2429]">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-xl transition-colors duration-200 ${
                        isActive
                          ? "text-white font-semibold bg-[#1dbf73]"
                          : "hover:text-[#1dbf73] hover:bg-black/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                <hr className="border-t border-[#1f2429]/10 my-3" />

                <div className="flex flex-col gap-3">
                  {isPending ? (
                    <div className="h-12 bg-black/5 rounded-xl animate-pulse" />
                  ) : session ? (
                    <>
                      <div className="flex items-center gap-3 px-4 py-3 bg-black/[0.03] rounded-xl border border-[#1f2429]/10">
                        <div className="w-10 h-10 rounded-full bg-[#1dbf73] text-white font-bold text-sm flex items-center justify-center overflow-hidden shrink-0">
                          {session.user.image ? (
                            <Image
                              src={session.user.image}
                              alt="Profile"
                              width={36}
                              height={36}
                              quality={100}
                              className="w-full h-full object-cover"
                            />
                          ) : session.user.name ? (
                            session.user.name.charAt(0).toUpperCase()
                          ) : (
                            <User className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex flex-col overflow-hidden text-left">
                          <span className="text-sm text-[#1f2429] font-bold truncate">
                            {session.user.name || "User"}
                          </span>
                          <span className="text-xs text-[#6e797b] truncate">
                            {session.user.email}
                          </span>
                        </div>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-3 text-center bg-[#1dbf73] text-white rounded-xl font-semibold hover:bg-[#19a463] transition shadow-xs"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2.5 text-center border border-[#1f2429]/10 rounded-xl font-medium text-[#1f2429] hover:bg-black/5 transition"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="py-2.5 text-center bg-red-50 text-red-600 rounded-xl font-medium transition cursor-pointer"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-3 text-center border border-[#1f2429]/15 rounded-lg font-medium text-[#1f2429] hover:bg-black/5 transition"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-3 text-center bg-[#1dbf73] rounded-lg font-medium text-white hover:bg-[#19a463] transition shadow-xs"
                      >
                        Get started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


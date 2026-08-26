"use client";

import { authClient } from "@/lib/auth-client";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { href: "/pricing", label: "Pricing" },
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
      <header className="sticky top-0 left-0 right-0 w-full bg-gray-50 z-50 shadow-sm transition-all">
        <div className="w-11/12 lg:w-9/12 lg:max-w-9/12 mx-auto px-4 lg:px-0 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Logo
            id="navbar-brand-logo"
            markId="navbar-logomark-target"
            href="/"
            onClick={handleLogoClick}
          />

          {/* Centered Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 text-[15px] font-normal text-[#62646A]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 font-normal transition-colors duration-150 ${
                    isActive
                      ? "text-[#1DBF73]"
                      : "text-[#62646A] hover:text-[#1DBF73]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeFiverrNavIndicator"
                      className="absolute bottom-0 left-4 right-4 h-0.75 bg-[#1DBF73] rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Aligned Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              <div className="w-24 h-9 rounded-md bg-[#F0F2F5] border border-[#E4E5E7]/50 animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="w-9 h-9 rounded-full overflow-hidden border border-border-light transition-all flex items-center justify-center cursor-pointer"
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
                      <div className="w-full h-full bg-[#1DBF73] text-white font-black text-[14px] leading-none flex items-center justify-center select-none">
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
                          className="absolute right-0 mt-3 w-64 bg-white border border-border-light rounded-md shadow-2xl shadow-black/10 py-3 z-50 text-left"
                        >
                          {/* User Profile Header */}
                          <div className="px-4 pb-3">
                            <p className="text-[14px] font-bold text-text-main leading-tight truncate">
                              {session.user.name || "User"}
                            </p>
                            <p className="text-[12px] text-text-muted truncate mt-0.5">
                              {session.user.email}
                            </p>
                            <Link
                              href="/dashboard"
                              onClick={() => setProfileMenuOpen(false)}
                              className="mt-3 block w-full py-1.5 px-3 text-center border border-border-light rounded-md text-xs font-bold text-text-main hover:bg-bg-hover transition"
                            >
                              Switch to Dashboard
                            </Link>
                          </div>

                          <hr className="border-t border-border-light my-1" />

                          {/* Navigation Links */}
                          <div className="py-1">
                            <Link
                              href="/profile"
                              onClick={() => setProfileMenuOpen(false)}
                              className="block px-4 py-2 text-[13px] font-medium text-text-main hover:text-text-hover hover:bg-bg-hover transition"
                            >
                              Profile
                            </Link>
                            <Link
                              href="/widget-settings"
                              onClick={() => setProfileMenuOpen(false)}
                              className="block px-4 py-2 text-[13px] font-medium text-text-main hover:text-text-hover hover:bg-bg-hover transition"
                            >
                              Account settings
                            </Link>
                            <Link
                              href="/billing"
                              onClick={() => setProfileMenuOpen(false)}
                              className="block px-4 py-2 text-[13px] font-medium text-text-main hover:text-text-hover hover:bg-bg-hover transition"
                            >
                              Billing and payments
                            </Link>
                          </div>

                          <hr className="border-t border-border-light my-1" />

                          {/* Sign out */}
                          <div className="pt-1">
                            <button
                              onClick={() => {
                                handleLogout();
                                setProfileMenuOpen(false);
                              }}
                              className="w-full flex items-center gap-2.5 px-4 py-2 text-[13px] font-medium text-text-main hover:text-red-600 transition cursor-pointer text-left"
                            >
                              <LogOut className="w-4 h-4 text-text-muted" />
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
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-[15px] font-normal text-[#62646A] hover:text-[#1DBF73] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2 rounded-md border border-[#1DBF73] text-[#1DBF73] font-normal text-sm hover:bg-[#1DBF73] hover:text-white transition-all"
                >
                  Try Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-text-body hover:text-[#1DBF73] p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden fixed inset-0 z-60 bg-white flex flex-col"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-border-light">
              <Logo
                id="navbar-brand-logo"
                markId="navbar-logomark-target"
                href="/"
                onClick={handleLogoClick}
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-text-muted hover:text-text-main p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto px-6 py-1">
              <div className="flex flex-col gap-4 text-sm font-bold tracking-wider text-[#62646A]">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-md transition-colors duration-200 ${
                        isActive
                          ? "text-white font-semibold bg-[#1DBF73]"
                          : "hover:text-[#1DBF73] hover:bg-surface-light"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <hr className="border-border-light my-2" />
                <div className="flex flex-col gap-4">
                  {isPending ? (
                    <div className="h-12 bg-[#F0F2F5] border border-[#E4E5E7] rounded-xl animate-pulse" />
                  ) : session ? (
                    <>
                      <div className="flex items-center gap-4 px-3 py-3 mb-2 bg-surface-light rounded-xl border border-border-light">
                        <div className="w-11 h-11 rounded-full bg-[#1DBF73] text-white font-black text-base flex items-center justify-center overflow-hidden shadow-sm shrink-0">
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
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-base text-text-main font-bold truncate">
                            {session.user.name || "User"}
                          </span>
                          <span className="text-xs text-text-muted truncate">
                            {session.user.email}
                          </span>
                        </div>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-3 text-center border border-border-light rounded-md font-semibold text-text-body hover:bg-surface-light transition"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-3 text-center border border-border-light rounded-md font-semibold text-text-body hover:bg-surface-light transition"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="py-3 text-center bg-red-50 text-red-500 rounded-md font-semibold transition mt-2 cursor-pointer"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-3 text-center bg-surface-light border border-border-light rounded-md font-bold text-text-main hover:bg-surface-dark transition"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-3 text-center bg-[#1DBF73] rounded-md font-bold text-white hover:bg-[#19A463] transition mt-2 shadow-sm"
                      >
                        Try Now
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

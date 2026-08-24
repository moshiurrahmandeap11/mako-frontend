"use client";

import { authClient } from "@/lib/auth-client";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, User, X, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: "/features", label: "Features" },
    { href: "/technology", label: "Technology" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    setMounted(true);
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <header className="fixed top-0 left-0 right-0 w-full bg-white border-b border-[#E4E5E7] z-50 shadow-sm transition-all">
        <div className="w-11/12 lg:w-10/12 max-w-10/12 max-w-7xl mx-auto px-2 sm:px-4 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Logo
              id="navbar-brand-logo"
              markId="navbar-logomark-target"
              href="/"
              onClick={handleLogoClick}
            />

            {/* Desktop Navigation Links (Fiverr Style) */}
            <nav className="hidden lg:flex items-center gap-1 text-[15px] font-bold text-[#62646A]">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-2 transition-colors duration-150 ${
                      isActive
                        ? "text-[#1DBF73] font-black"
                        : "hover:text-[#1DBF73]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeFiverrNavIndicator"
                        className="absolute bottom-0 left-3.5 right-3.5 h-[3px] bg-[#1DBF73] rounded-full"
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
          </div>

          {/* Right Aligned Actions */}
          <div className="hidden md:flex items-center gap-4">
            {!mounted || isPending ? (
              <div className="w-24 h-9 rounded-md bg-[#F0F2F5] animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-md bg-[#1DBF73] text-white text-sm font-bold hover:bg-[#19A463] transition shadow-sm"
                >
                  Dashboard
                </Link>

                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="w-10 h-10 rounded-full bg-[#1DBF73] p-[2px] flex items-center justify-center transition-transform hover:scale-105 shadow-sm cursor-pointer"
                  >
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                      {session.user.image ? (
                        <img
                          src={session.user.image}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 text-[#1DBF73]" />
                      )}
                    </div>
                  </button>

                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white border border-[#E4E5E7] rounded-xl shadow-xl py-2 z-50 overflow-hidden transform opacity-100 scale-100 transition-all duration-200 origin-top-right">
                      <div className="px-4 py-3 border-b border-[#E4E5E7] mb-1">
                        <p className="text-xs text-[#222325] font-bold truncate">
                          {session.user.name || "User"}
                        </p>
                        <p className="text-[10px] text-[#74767E] truncate mt-0.5">
                          {session.user.email}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setProfileMenuOpen(false)}
                        className="block px-4 py-2.5 text-xs font-semibold text-[#404145] hover:text-[#1DBF73] hover:bg-[#F7F7F7] transition"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileMenuOpen(false)}
                        className="block px-4 py-2.5 text-xs font-semibold text-[#404145] hover:text-[#1DBF73] hover:bg-[#F7F7F7] transition"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-500 hover:text-red-600 hover:bg-red-50 transition mt-1 border-t border-[#E4E5E7] pt-2 cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-[15px] font-bold text-[#62646A] hover:text-[#1DBF73] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2 rounded-md border-2 border-[#1DBF73] text-[#1DBF73] font-bold text-sm hover:bg-[#1DBF73] hover:text-white transition-all shadow-sm"
                >
                  Join
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#404145] hover:text-[#1DBF73] p-2 cursor-pointer"
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
            className="lg:hidden fixed inset-0 z-[60] bg-white flex flex-col"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-[#E4E5E7]">
              <span className="font-black text-xl text-[#222325] tracking-widest flex items-center gap-2">
                <Zap className="w-6 h-6 text-[#1DBF73]" />
                Labto AI
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#74767E] hover:text-[#222325] p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <div className="flex flex-col gap-4 text-sm font-bold tracking-wider text-[#62646A]">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-xl transition-colors duration-200 ${
                        isActive
                          ? "text-white font-extrabold bg-[#1DBF73] shadow-md shadow-[#1DBF73]/20"
                          : "hover:text-[#1DBF73] hover:bg-[#F7F7F7]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <hr className="border-[#E4E5E7] my-2" />
                <div className="flex flex-col gap-4">
                  {!mounted || isPending ? (
                    <div className="h-12 bg-slate-100 rounded animate-pulse" />
                  ) : session ? (
                    <>
                      <div className="flex items-center gap-4 px-3 py-3 mb-2 bg-[#F7F7F7] rounded-xl border border-[#E4E5E7]">
                        <div className="w-12 h-12 rounded-full bg-[#1DBF73] p-[2px] flex items-center justify-center">
                          <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                            {session.user.image ? (
                              <img
                                src={session.user.image}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="w-6 h-6 text-[#1DBF73]" />
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-base text-[#222325] font-bold truncate">
                            {session.user.name || "User"}
                          </span>
                          <span className="text-xs text-[#74767E] truncate">
                            {session.user.email}
                          </span>
                        </div>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-3 text-center border border-[#E4E5E7] rounded-xl font-semibold text-[#404145] hover:bg-[#F7F7F7] transition"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-3 text-center border border-[#E4E5E7] rounded-xl font-semibold text-[#404145] hover:bg-[#F7F7F7] transition"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="py-3 text-center bg-red-50 text-red-500 border border-red-200 rounded-xl font-semibold hover:bg-red-100 transition mt-2 cursor-pointer"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-3 text-center bg-[#F7F7F7] border border-[#E4E5E7] rounded-xl font-bold text-[#222325] hover:bg-slate-100 transition"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-3 text-center bg-[#1DBF73] rounded-xl font-bold text-white hover:bg-[#19A463] transition mt-2 shadow-sm"
                      >
                        Join
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

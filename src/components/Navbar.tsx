'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Menu, X, User, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import Logo from './Logo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: '/features', label: 'Features' },
    { href: '/technology', label: 'Technology' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
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
    router.push('/');
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl bg-slate-950/60 backdrop-blur-xl border border-slate-800/80 rounded-full z-50 shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
      >
        <div className="px-6 md:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Logo href="/" />

          {/* Right Aligned Navigation and Action Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-1 text-[11px] font-bold tracking-[0.15em] text-slate-400">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-full uppercase transition-colors duration-300 ${
                      isActive ? 'text-white font-extrabold' : 'hover:text-slate-200'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavBackground"
                        className="absolute inset-0 bg-slate-900 rounded-full -z-10 border border-slate-800/80"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              {isPending ? (
                <div className="w-8 h-8 rounded-full bg-slate-800 animate-pulse" />
              ) : session ? (
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 p-[2px] flex items-center justify-center transition-transform hover:scale-105 shadow-lg shadow-orange-500/20"
                  >
                    <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center overflow-hidden">
                      {session.user.image ? (
                        <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 text-amber-500" />
                      )}
                    </div>
                  </button>

                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 overflow-hidden transform opacity-100 scale-100 transition-all duration-200 origin-top-right">
                      <div className="px-4 py-3 border-b border-slate-800/60 mb-2">
                        <p className="text-xs text-white font-bold truncate">{session.user.name || 'User'}</p>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">{session.user.email}</p>
                      </div>
                      <Link href="/profile" onClick={() => setProfileMenuOpen(false)} className="block px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-amber-500 hover:bg-slate-900/80 transition">Profile</Link>
                      <Link href="/dashboard" onClick={() => setProfileMenuOpen(false)} className="block px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-amber-500 hover:bg-slate-900/80 transition">Dashboard</Link>
                      <Link href="/settings" onClick={() => setProfileMenuOpen(false)} className="block px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-amber-500 hover:bg-slate-900/80 transition">Settings</Link>
                      <button
                        onClick={() => { handleLogout(); setProfileMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-slate-900/80 transition mt-2 border-t border-slate-800/60 pt-2"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-xs font-bold tracking-[0.12em] text-slate-400 hover:text-white transition uppercase px-4 py-2"
                  >
                    Sign In
                  </Link>
                  <Button href="/register">
                    GET STARTED
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Full-Screen Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-xl flex flex-col"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-slate-900/60">
              <span className="font-black text-xl text-white tracking-widest flex items-center gap-2">
                <Zap className="w-6 h-6 text-orange-500" />
                Labto AI
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <div className="flex flex-col gap-4 text-sm font-bold tracking-wider text-slate-400">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded transition-colors duration-200 ${
                        isActive
                          ? 'text-white font-extrabold bg-slate-900 border border-slate-800'
                          : 'hover:text-amber-500'
                      }`}
                    >
                      {link.label.toUpperCase()}
                    </Link>
                  );
                })}
                <hr className="border-slate-800 my-2" />
                <div className="flex flex-col gap-4">
                  {isPending ? (
                    <div className="h-12 bg-slate-900 rounded animate-pulse" />
                  ) : session ? (
                    <>
                      <div className="flex items-center gap-4 px-3 py-3 mb-2 bg-slate-900/50 rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 p-[2px] flex items-center justify-center">
                          <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center overflow-hidden">
                            {session.user.image ? (
                              <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                              <User className="w-6 h-6 text-amber-500" />
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-base text-white font-bold truncate">{session.user.name || 'User'}</span>
                          <span className="text-xs text-slate-400 truncate">{session.user.email}</span>
                        </div>
                      </div>
                      <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="py-3 text-center border border-slate-800 rounded font-semibold text-slate-300 hover:bg-slate-900 transition">PROFILE</Link>
                      <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="py-3 text-center border border-slate-800 rounded font-semibold text-slate-300 hover:bg-slate-900 transition">DASHBOARD</Link>
                      <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className="py-3 text-center border border-slate-800 rounded font-semibold text-slate-300 hover:bg-slate-900 transition">SETTINGS</Link>
                      <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="py-3 text-center bg-red-500/10 text-red-400 border border-red-500/20 rounded font-semibold hover:bg-red-500/20 transition mt-2">LOGOUT</button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="py-3 text-center bg-slate-900 rounded font-semibold text-white hover:bg-slate-800 transition">SIGN IN</Link>
                      <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="py-3 text-center bg-amber-500 rounded font-semibold text-slate-950 hover:bg-amber-400 transition mt-2">GET STARTED</Link>
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

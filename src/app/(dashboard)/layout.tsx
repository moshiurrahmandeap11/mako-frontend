'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Settings,
  Key,
  MessageSquare,
  LogOut,
  Store,
  Sparkles,
  CreditCard,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { authClient } from '@/lib/auth-client';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const { data: merchantData, isLoading, isError } = useQuery({
    queryKey: ['merchantProfile'],
    queryFn: () => api.get('/api/merchant/me') as Promise<any>,
    retry: false
  });

  const merchant = merchantData?.merchant;

  if (isError) {
    router.push('/login');
    return null;
  }

  const handleLogout = async () => {
    try {
      await authClient.signOut();
    } catch {}
    router.push('/login');
  };

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Product Catalog', href: '/products', icon: Package },
    { label: 'Widget Settings', href: '/widget-settings', icon: Settings },
    { label: 'API Keys', href: '/api-keys', icon: Key },
    { label: 'Conversations', href: '/conversations', icon: MessageSquare },
    { label: 'Billing & Plans', href: '/billing', icon: CreditCard },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="flex items-center gap-3 text-indigo-400">
          <Sparkles className="w-6 h-6 animate-spin" />
          <span className="font-medium text-sm">Loading Merchant Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Brand */}
          <div className="h-16 px-6 border-b border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm text-white tracking-wide block leading-none">AI Shopping</span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Assistant SaaS</span>
            </div>
          </div>

          {/* Store Info Banner */}
          <div className="p-4 mx-3 my-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
              <Store className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">{merchant?.name || 'My Merchant Store'}</p>
              <p className="text-[10px] text-slate-400 truncate">{merchant?.email}</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Account Actions */}
        <div className="p-4 border-t border-slate-800/80">
          <div className="mb-3 px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold flex items-center justify-between">
            <span>PLAN TIER</span>
            <span className="bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-md uppercase font-bold tracking-wider">
              {merchant?.planTier || 'FREE'}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition border border-transparent hover:border-rose-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Body */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 border-b border-slate-800 bg-slate-900/30 px-8 flex items-center justify-between sticky top-0 backdrop-blur-md z-10">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-white capitalize">{pathname === '/dashboard' ? 'Overview' : pathname.replace('/', '')}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              API Service Online
            </span>
          </div>
        </header>

        <div className="p-8 max-w-7xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}

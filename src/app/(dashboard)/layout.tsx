'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Settings,
  Key,
  MessageSquare,
  LogOut,
  Store,
  Zap,
  CreditCard,
} from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { authClient } from '@/lib/auth-client';
import { fetchApi } from '@/lib/api-client';
import { Skeleton } from '@/components/Skeleton';

function CheckoutVerifier() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      fetchApi(`/api/billing/verify?session_id=${sessionId}`)
        .then((data) => {
          if (data.success) {
            queryClient.invalidateQueries({ queryKey: ['merchantProfile'] });
          }
        })
        .catch(console.error);
    }
  }, [sessionId, queryClient]);

  return null;
}

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
      <div className="min-h-screen bg-slate-950 text-slate-100 flex">
        {/* Skeleton Sidebar */}
        <aside className="w-64 border-r border-slate-800/80 bg-slate-900/60 p-6 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded" />
              <Skeleton className="w-28 h-5" />
            </div>
            <Skeleton className="w-full h-14 rounded-xl" />
            <div className="space-y-2 pt-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-9 rounded" />
              ))}
            </div>
          </div>
          <Skeleton className="w-full h-12 rounded-xl" />
        </aside>

        {/* Skeleton Content */}
        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-slate-800/80 px-8 flex items-center justify-between">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-36 h-6 rounded-full" />
          </header>
          <div className="p-8 space-y-6 max-w-7xl w-full mx-auto">
            <Skeleton className="w-full h-44 rounded-2xl" />
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-2xl" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Suspense fallback={null}>
        <CheckoutVerifier />
      </Suspense>

      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-800/80 bg-slate-900/60 backdrop-blur-xl flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="h-16 px-6 border-b border-slate-800/80 flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 rounded bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm tracking-tighter">
                <Zap className="w-4 h-4 text-slate-950" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-[0.18em] text-white group-hover:text-amber-500 transition">
                  Labto AI
                </span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Merchant Console</span>
              </div>
            </Link>
          </div>

          {/* Merchant Store Info */}
          <div className="p-3.5 mx-3 my-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-500">
              <Store className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{merchant?.name || 'My Store'}</p>
              <p className="text-[10px] text-slate-400 truncate">{merchant?.email}</p>
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
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-bold tracking-[0.08em] uppercase transition ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Account & Tier Info */}
        <div className="p-4 border-t border-slate-800/80">
          <div className="mb-3 px-3 py-2.5 rounded bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">TIER</span>
            <span className="bg-amber-500 text-slate-950 text-[10px] px-2 py-0.5 rounded uppercase font-extrabold tracking-wider">
              {merchant?.planTier || 'FREE'}
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
      </aside>

      {/* Main Page Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 border-b border-slate-800/80 bg-slate-950/70 px-8 flex items-center justify-between sticky top-0 backdrop-blur-xl z-10">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span className="uppercase tracking-wider font-bold text-[10px]">Console</span>
            <span>/</span>
            <span className="text-white font-bold uppercase tracking-wider text-[10px]">{pathname === '/dashboard' ? 'Overview' : pathname.replace('/', '')}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              API Status: Active
            </span>
          </div>
        </header>

        <div className="p-8 max-w-7xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}

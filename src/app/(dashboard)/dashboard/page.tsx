'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Package,
  MessageSquare,
  Key,
  TrendingUp,
  ArrowRight,
  Zap,
  CheckCircle2,
  Code2,
} from 'lucide-react';
import { fetchApi } from '@/lib/api-client';
import Button from '@/components/Button';
import { MetricCardSkeleton } from '@/components/Skeleton';

export default function OverviewPage() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi('/api/analytics/summary')
      .then((data) => setSummary(data.summary))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    {
      label: 'Products in Catalog',
      value: summary?.totalProducts ?? 0,
      icon: Package,
      href: '/products',
    },
    {
      label: 'AI Conversations',
      value: summary?.totalConversations ?? 0,
      icon: MessageSquare,
      href: '/conversations',
    },
    {
      label: 'Total AI Messages',
      value: summary?.totalMessages ?? 0,
      icon: TrendingUp,
      href: '/conversations',
    },
    {
      label: 'Active API Keys',
      value: summary?.totalApiKeys ?? 0,
      icon: Key,
      href: '/api-keys',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 shadow-xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-widest border border-amber-500/20 mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Labto AI Platform</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Welcome to Labto AI Console
          </h1>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            Drive storefront conversions with an intelligent shopping assistant that interacts naturally with shoppers, recommends products via vector similarity search, and executes direct add-to-cart actions.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="/widget-settings" variant="filled">
              <span className="flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                <span>Get Embed Code</span>
              </span>
            </Button>
            <Button href="/products" variant="outline">
              <span className="flex items-center gap-2">
                <span>Manage Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <MetricCardSkeleton key={i} />)
          : stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Link
                  key={i}
                  href={stat.href}
                  className="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/50 transition duration-300 shadow-xl flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{stat.label}</span>
                    <div className="w-9 h-9 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-bold">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-6 flex items-baseline justify-between">
                    <span className="text-3xl font-extrabold text-white tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider group-hover:translate-x-1 transition flex items-center gap-1">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
      </div>

      {/* Onboarding Checklist Guide */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
        <h2 className="text-base font-bold text-white mb-1">Integration Checklist</h2>
        <p className="text-slate-400 text-xs mb-6">Four quick steps to launch the Labto AI assistant on your storefront:</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <div className="flex items-center gap-2.5 mb-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-bold text-white">1. Add Domain</h3>
            </div>
            <p className="text-slate-400 text-[11px]">Whitelist your store domain e.g. shop.mysite.com</p>
            <Link href="/widget-settings" className="mt-3 inline-block text-[10px] font-bold uppercase tracking-wider text-amber-500 hover:underline">
              Domain settings →
            </Link>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <div className="flex items-center gap-2.5 mb-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-bold text-white">2. Create API Key</h3>
            </div>
            <p className="text-slate-400 text-[11px]">Generate a secure API key for widget authentication</p>
            <Link href="/api-keys" className="mt-3 inline-block text-[10px] font-bold uppercase tracking-wider text-amber-500 hover:underline">
              Manage keys →
            </Link>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <div className="flex items-center gap-2.5 mb-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-bold text-white">3. Import Catalog</h3>
            </div>
            <p className="text-slate-400 text-[11px]">Upload catalog JSON/CSV to enable AI recommendations</p>
            <Link href="/products" className="mt-3 inline-block text-[10px] font-bold uppercase tracking-wider text-amber-500 hover:underline">
              Upload catalog →
            </Link>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <div className="flex items-center gap-2.5 mb-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-bold text-white">4. Embed Script</h3>
            </div>
            <p className="text-slate-400 text-[11px]">Paste the script tag into your website footer</p>
            <Link href="/widget-settings" className="mt-3 inline-block text-[10px] font-bold uppercase tracking-wider text-amber-500 hover:underline">
              Get snippet →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

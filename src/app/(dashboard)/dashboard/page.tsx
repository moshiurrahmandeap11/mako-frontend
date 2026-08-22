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
  Users,
  Globe,
} from 'lucide-react';
import { fetchApi } from '@/lib/api-client';
import Button from '@/components/Button';
import { MetricCardSkeleton } from '@/components/Skeleton';
import { LogoMark } from '@/components/Logo';

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
      label: 'Unique Store Visitors',
      value: summary?.totalUniqueVisitors ?? 0,
      icon: Users,
      href: '#visitor-analytics',
    },
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
      label: 'Active API Keys',
      value: summary?.totalApiKeys ?? 0,
      icon: Key,
      href: '/api-keys',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner */}
      <div className="bg-[#131D38] border border-[#39FF88]/20 rounded-2xl p-8 shadow-xl">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39FF88]/10 border border-[#39FF88]/30 text-[#39FF88] text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>AI Console Live</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Labto AI Merchant Console
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Monitor real-time AI conversation volume, index store product catalogs, manage API keys, and export transcript reports.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Button href="/widget-settings" variant="filled" className="bg-[#39FF88] text-[#0B132B] hover:bg-[#00CC66] font-bold">
              <span className="flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                <span>Get Embed Code</span>
              </span>
            </Button>
            <Button href="/products" variant="outline" className="text-[#39FF88] border-[#39FF88]/40 hover:bg-[#39FF88] hover:text-[#0B132B] font-bold">
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
                  className="group p-6 rounded-2xl bg-[#131D38] border border-[#39FF88]/20 hover:border-[#39FF88]/60 transition duration-300 shadow-xl flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">{stat.label}</span>
                    <div className="w-9 h-9 rounded-lg bg-[#39FF88]/10 border border-[#39FF88]/30 flex items-center justify-center text-[#39FF88] font-bold">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <div className="mt-6 flex items-baseline justify-between">
                    <span className="text-3xl font-extrabold text-white tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-[11px] font-bold text-[#39FF88] uppercase tracking-wider group-hover:translate-x-1 transition flex items-center gap-1">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
      </div>

      {/* Geographic Visitor Distribution Section */}
      <div id="visitor-analytics" className="bg-[#131D38] border border-[#39FF88]/20 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#39FF88]" />
              <span>Geographic Visitor Distribution</span>
            </h2>
            <p className="text-slate-300 text-xs mt-1">Real-time unique visitor traffic breakdown by country</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#39FF88]/10 text-[#39FF88] text-[10px] font-extrabold uppercase tracking-widest border border-[#39FF88]/30">
            {summary?.totalUniqueVisitors ?? 0} Total Unique Visitors
          </span>
        </div>

        {summary?.visitorCountries && summary.visitorCountries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {summary.visitorCountries.map((c: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl bg-[#0B132B] border border-[#39FF88]/20 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#39FF88]/10 border border-[#39FF88]/30 text-[#39FF88] font-bold text-xs flex items-center justify-center">
                    {c.countryCode}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{c.country}</h4>
                    <span className="text-[10px] text-slate-400">Country Code: {c.countryCode}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-[#39FF88]">{c.count}</span>
                  <span className="block text-[9px] uppercase font-bold text-slate-400">Visitors</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-[#0B132B] border border-[#39FF88]/15 rounded-xl text-slate-400 text-xs font-semibold">
            No geographic traffic recorded yet. Embed your widget script to start tracking visitors.
          </div>
        )}
      </div>
    </div>
  );
}

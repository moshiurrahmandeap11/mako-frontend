'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Package,
  MessageSquare,
  Key,
  ArrowRight,
  Zap,
  Code2,
  Users,
  Globe,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { fetchApi } from '@/lib/api-client';
import Button from '@/components/Button';
import { MetricCardSkeleton } from '@/components/Skeleton';

export default function OverviewPage() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const tier = params.get('tier');

    if (sessionId || tier) {
      fetchApi(`/api/billing/verify?session_id=${sessionId || ''}&tier=${tier || ''}`)
        .then(() => {
          window.history.replaceState({}, '', window.location.pathname);
        })
        .catch(console.error);
    }

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

  const credits = summary?.credits;
  const isEnterprise = summary?.planTier === 'ENTERPRISE';
  const totalCredits = credits?.totalAllowedCredits || 1500;
  const usedCredits = credits?.creditsUsedThisMonth || 0;
  const remainingCredits = isEnterprise ? 'Unlimited' : (credits?.creditsRemaining ?? totalCredits).toLocaleString();
  const usagePercentage = isEnterprise ? 5 : Math.min(100, Math.round((usedCredits / totalCredits) * 100));

  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner */}
      <div className="bg-white border border-[#E4E5E7] rounded-2xl p-8 shadow-sm">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F8F0] border border-[#1DBF73]/30 text-[#1DBF73] text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>AI Console Live</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#222325] tracking-tight sm:text-4xl">
            Labto AI Merchant Console
          </h1>
          <p className="text-[#62646A] text-sm leading-relaxed">
            Monitor real-time AI conversation volume, index store product catalogs, manage API keys, and export transcript reports.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Button
              href="/widget-settings"
              variant="primary"
              icon={<Code2 className="w-4 h-4" />}
            >
              Get Embed Code
            </Button>
            <Button
              href="/products"
              variant="secondary"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="text-[#222325] border-[#E4E5E7] hover:bg-slate-50"
            >
              Manage Catalog
            </Button>
          </div>
        </div>
      </div>

      {/* AI Smart Credits Card */}
      <div className="p-6 rounded-2xl bg-white border border-[#E4E5E7] shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E4E5E7] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#1DBF73]" />
              <h2 className="text-base font-bold text-[#222325]">AI Smart Credits Balance</h2>
              {credits?.rolloverEnabled && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1DBF73] bg-[#E8F8F0] border border-[#1DBF73]/30 px-2 py-0.5 rounded-full">
                  <RefreshCw className="w-2.5 h-2.5" /> Rollover Active
                </span>
              )}
            </div>
            <p className="text-[#62646A] text-xs mt-1">
              Plan Tier: <strong className="text-[#222325] uppercase font-bold">{summary?.planTier || 'FREE'}</strong>
              {credits?.rolloverCredits > 0 && (
                <span className="text-[#1DBF73] font-semibold ml-2">
                  (+{credits.rolloverCredits.toLocaleString()} rolled over from last month)
                </span>
              )}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-2xl font-extrabold text-[#222325] tracking-tight">
              {remainingCredits}
            </span>
            <span className="text-xs text-[#74767E] block">
              {isEnterprise ? 'Turbo Credits' : `of ${totalCredits.toLocaleString()} Total Credits Available`}
            </span>
          </div>
        </div>

        {!isEnterprise && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-[#404145]">
              <span>Current Month Usage ({usedCredits.toLocaleString()} credits used)</span>
              <span className={usagePercentage > 80 ? 'text-amber-500 font-bold' : 'text-[#1DBF73] font-bold'}>
                {usagePercentage}% used
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#F0F2F5] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  usagePercentage > 90
                    ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                    : 'bg-[#1DBF73]'
                }`}
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
          </div>
        )}
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
                  className="group p-6 rounded-2xl bg-white border border-[#E4E5E7] hover:border-[#1DBF73] transition duration-200 shadow-sm hover:shadow-md flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#74767E]">{stat.label}</span>
                    <div className="w-9 h-9 rounded-xl bg-[#E8F8F0] border border-[#1DBF73]/20 flex items-center justify-center text-[#1DBF73] font-bold">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <div className="mt-6 flex items-baseline justify-between">
                    <span className="text-3xl font-extrabold text-[#222325] tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-[11px] font-bold text-[#1DBF73] uppercase tracking-wider group-hover:translate-x-1 transition flex items-center gap-1">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
      </div>

      {/* Geographic Visitor Distribution Section */}
      <div id="visitor-analytics" className="bg-white border border-[#E4E5E7] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-[#222325] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#1DBF73]" />
              <span>Geographic Visitor Distribution</span>
            </h2>
            <p className="text-[#62646A] text-xs mt-1">Real-time unique visitor traffic breakdown by country</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#E8F8F0] text-[#1DBF73] text-[10px] font-extrabold uppercase tracking-wider border border-[#1DBF73]/30">
            {summary?.totalUniqueVisitors ?? 0} Total Unique Visitors
          </span>
        </div>

        {summary?.visitorCountries && summary.visitorCountries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {summary.visitorCountries.map((c: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl bg-[#F7F7F7] border border-[#E4E5E7] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F8F0] border border-[#1DBF73]/20 text-[#1DBF73] font-bold text-xs flex items-center justify-center">
                    {c.countryCode}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#222325]">{c.country}</h4>
                    <span className="text-[10px] text-[#74767E]">Country Code: {c.countryCode}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-[#1DBF73]">{c.count}</span>
                  <span className="block text-[9px] uppercase font-bold text-[#74767E]">Visitors</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-[#F7F7F7] border border-[#E4E5E7] rounded-xl text-[#74767E] text-xs font-semibold">
            No geographic traffic recorded yet. Embed your widget script to start tracking visitors.
          </div>
        )}
      </div>
    </div>
  );
}

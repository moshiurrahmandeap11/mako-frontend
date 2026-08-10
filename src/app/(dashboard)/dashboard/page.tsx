'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Package,
  MessageSquare,
  Key,
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Code2,
} from 'lucide-react';
import { fetchApi } from '@/lib/api-client';

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
      color: 'from-blue-500 to-indigo-600',
      href: '/products',
    },
    {
      label: 'AI Conversations',
      value: summary?.totalConversations ?? 0,
      icon: MessageSquare,
      color: 'from-purple-500 to-pink-600',
      href: '/conversations',
    },
    {
      label: 'Total AI Messages',
      value: summary?.totalMessages ?? 0,
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-600',
      href: '/conversations',
    },
    {
      label: 'Active API Keys',
      value: summary?.totalApiKeys ?? 0,
      icon: Key,
      color: 'from-amber-500 to-orange-600',
      href: '/api-keys',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/20 p-8 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Assistant SaaS Console</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Welcome to your AI Shopping Assistant
          </h1>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            Boost storefront conversion with an intelligent shopping assistant that chats with customers, recommends catalog items via vector similarity search, and triggers direct add-to-cart actions.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/widget-settings"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition"
            >
              <Code2 className="w-4 h-4" />
              <span>Get Embed Snippet</span>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition"
            >
              <span>Manage Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link
              key={i}
              href={stat.href}
              className="group p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition shadow-lg flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{stat.label}</span>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-white shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-6 flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-white tracking-tight">
                  {loading ? '...' : stat.value}
                </span>
                <span className="text-xs text-indigo-400 group-hover:translate-x-1 transition flex items-center gap-1 font-medium">
                  View <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Onboarding Checklist Guide */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-bold text-white mb-1">Quick Integration Checklist</h2>
        <p className="text-slate-400 text-xs mb-6">Complete these steps to launch the AI widget on your online store:</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-semibold text-white">1. Add Domain</h3>
            </div>
            <p className="text-slate-400 text-xs">Whitelist your storefront domain e.g. shop.mysite.com</p>
            <Link href="/widget-settings" className="mt-3 inline-block text-xs font-medium text-indigo-400 hover:underline">
              Domain settings →
            </Link>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-semibold text-white">2. Create API Key</h3>
            </div>
            <p className="text-slate-400 text-xs">Generate a secure API key for widget authentication</p>
            <Link href="/api-keys" className="mt-3 inline-block text-xs font-medium text-indigo-400 hover:underline">
              Manage keys →
            </Link>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-semibold text-white">3. Upload Products</h3>
            </div>
            <p className="text-slate-400 text-xs">Upload your catalog JSON/CSV to enable AI recommendations</p>
            <Link href="/products" className="mt-3 inline-block text-xs font-medium text-indigo-400 hover:underline">
              Upload catalog →
            </Link>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-semibold text-white">4. Paste Script</h3>
            </div>
            <p className="text-slate-400 text-xs">Paste the 1-line HTML snippet into your website footer</p>
            <Link href="/widget-settings" className="mt-3 inline-block text-xs font-medium text-indigo-400 hover:underline">
              Get snippet →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

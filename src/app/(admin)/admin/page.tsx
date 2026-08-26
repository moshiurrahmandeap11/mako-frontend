"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import {
  Users,
  CreditCard,
  MessageSquare,
  BookOpen,
  Inbox,
  Bug,
  DollarSign,
  ArrowRight,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/Button";

export default function AdminOverviewPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["adminOverviewStats"],
    queryFn: () => api.get("/api/admin/overview") as Promise<any>,
  });

  const metrics = data?.metrics || {};
  const recentMerchants = data?.recentMerchants || [];
  const tierBreakdown = metrics?.tierBreakdown || {};

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="h-32 bg-white border border-[#E4E5E7] rounded-md animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-white border border-[#E4E5E7] rounded-md animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const kpis = [
    {
      label: "Total Merchants",
      value: metrics.totalMerchants || 0,
      sub: `${tierBreakdown.PRO || 0} Pro, ${tierBreakdown.STARTER || 0} Starter`,
      icon: Users,
      href: "/admin/users",
    },
    {
      label: "Estimated MRR",
      value: `$${metrics.estimatedMrr || 0}`,
      sub: "Active Subscriptions",
      icon: DollarSign,
      href: "/admin/subscriptions",
    },
    {
      label: "Total AI Messages",
      value: (metrics.totalMessages || 0).toLocaleString(),
      sub: `~${Math.round((metrics.totalTokensEstimated || 0) / 1000)}k tokens`,
      icon: MessageSquare,
      href: "/admin/token-usage",
    },
    {
      label: "Indexed Knowledge",
      value: metrics.totalKnowledgeChunks || 0,
      sub: "Vector chunks in DB",
      icon: BookOpen,
      href: "/admin/scraper-jobs",
    },
  ];

  return (
    <div className="space-y-3 text-left">
      {/* Hero Welcome Banner */}
      <div className="bg-white border border-[#E4E5E7] rounded-md p-5 sm:p-5.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="max-w-2xl space-y-1.5">
          <h1 className="text-xl sm:text-2xl font-normal text-[#222325] tracking-tight">
            Platform Master Console
          </h1>
          <p className="text-xs sm:text-sm text-[#62646A] leading-relaxed">
            Monitor platform-wide revenue, manage merchant subscription tiers, inspect AI key pools, and respond to incoming bug reports.
          </p>
        </div>
        <div className="flex gap-2">
          <Button href="/admin/users" variant="primary" className="!font-normal text-xs">
            Manage Merchants
          </Button>
        </div>
      </div>

      {/* KPI Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={i}
              href={kpi.href}
              className="group p-4 sm:p-5 rounded-md bg-white border border-[#E4E5E7] hover:border-[#1DBF73] transition duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-normal text-[#74767E]">{kpi.label}</span>
                <Icon className="w-4.5 h-4.5 text-[#74767E]" strokeWidth={1.5} />
              </div>
              <div className="mt-5 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-medium text-[#222325] tracking-tight">{kpi.value}</span>
                  <span className="text-[11px] text-[#74767E] block mt-0.5">{kpi.sub}</span>
                </div>
                <span className="text-[11px] font-normal text-[#1DBF73] group-hover:translate-x-1 transition flex items-center gap-1">
                  View <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Column Grid: Tier Breakdown & Support Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Tier Breakdown Card */}
        <div className="lg:col-span-6 p-5 sm:p-6 bg-white border border-[#E4E5E7] rounded-md space-y-4">
          <div className="flex items-center justify-between border-b border-[#E4E5E7] pb-3">
            <h2 className="text-base font-medium text-[#222325]">Merchant Plan Distribution</h2>
            <Link href="/admin/subscriptions" className="text-xs text-[#1DBF73] hover:underline flex items-center gap-1">
              <span>View Revenue</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3 pt-1">
            {[
              { tier: "FREE", count: tierBreakdown.FREE || 0, price: "$0/mo", color: "bg-slate-400" },
              { tier: "STARTER", count: tierBreakdown.STARTER || 0, price: "$2/mo", color: "bg-blue-500" },
              { tier: "PRO", count: tierBreakdown.PRO || 0, price: "$5/mo", color: "bg-[#1DBF73]" },
              { tier: "ENTERPRISE", count: tierBreakdown.ENTERPRISE || 0, price: "Custom", color: "bg-purple-500" },
            ].map((plan) => {
              const total = metrics.totalMerchants || 1;
              const percentage = Math.round((plan.count / total) * 100);
              return (
                <div key={plan.tier} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-normal text-[#404145]">
                      {plan.tier} <span className="text-[#74767E]">({plan.price})</span>
                    </span>
                    <span className="font-medium text-[#222325]">
                      {plan.count} merchants ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#F0F2F5] rounded-full overflow-hidden">
                    <div className={`h-full ${plan.color} rounded-full`} style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Support & AI Pool Health */}
        <div className="lg:col-span-6 p-5 sm:p-6 bg-white border border-[#E4E5E7] rounded-md space-y-4">
          <div className="flex items-center justify-between border-b border-[#E4E5E7] pb-3">
            <h2 className="text-base font-medium text-[#222325]">Support & System Health</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/admin/inquiries"
              className="p-4 bg-[#F7F7F7] hover:bg-[#F0F2F5] border border-[#E4E5E7] rounded-md transition flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-normal text-[#74767E]">Contact Inquiries</p>
                <p className="text-2xl font-medium text-[#222325] mt-1">{metrics.pendingInquiriesCount || 0}</p>
                <p className="text-[11px] text-amber-600 font-normal mt-0.5">Pending Review</p>
              </div>
              <Inbox className="w-5 h-5 text-[#74767E]" strokeWidth={1.5} />
            </Link>

            <Link
              href="/admin/bug-reports"
              className="p-4 bg-[#F7F7F7] hover:bg-[#F0F2F5] border border-[#E4E5E7] rounded-md transition flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-normal text-[#74767E]">Bug Reports</p>
                <p className="text-2xl font-medium text-[#222325] mt-1">{metrics.openBugsCount || 0}</p>
                <p className="text-[11px] text-rose-600 font-normal mt-0.5">Open Issues</p>
              </div>
              <Bug className="w-5 h-5 text-[#74767E]" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="p-3.5 bg-[#F7F7F7] border border-[#E4E5E7] rounded-md flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#1DBF73] animate-pulse" />
              <div>
                <p className="text-xs font-medium text-[#222325]">AI KeyRotator Pools Operational</p>
                <p className="text-[11px] text-[#74767E]">Groq, OpenRouter & Gemini keys ready</p>
              </div>
            </div>
            <Link
              href="/admin/token-usage"
              className="px-3 py-1 text-xs font-normal text-[#222325] bg-white border border-[#E4E5E7] hover:bg-slate-50 rounded-md transition"
            >
              Inspect Pools
            </Link>
          </div>
        </div>
      </div>

      {/* Recently Joined Merchants Table */}
      <div className="bg-white border border-[#E4E5E7] rounded-md p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-medium text-[#222325]">Recently Joined Merchants</h2>
            <p className="text-xs text-[#74767E]">Latest registered store accounts</p>
          </div>
          <Link
            href="/admin/users"
            className="px-3 py-1.5 text-xs font-normal text-[#222325] bg-[#F7F7F7] hover:bg-[#F0F2F5] border border-[#E4E5E7] rounded-md transition"
          >
            Manage All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E4E5E7] text-[#74767E] font-normal">
                <th className="pb-3">Merchant Name</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Plan</th>
                <th className="pb-3 text-right">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E5E7]">
              {recentMerchants.map((m: any) => (
                <tr key={m.id} className="text-[#222325] hover:bg-[#F7F7F7] transition">
                  <td className="py-3 font-medium text-[#222325]">{m.name || "Untitled"}</td>
                  <td className="py-3 font-mono text-[#62646A]">{m.email}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-normal border ${
                      m.planTier === "PRO"
                        ? "bg-emerald-50 text-[#1DBF73] border-emerald-200"
                        : m.planTier === "STARTER"
                        ? "bg-blue-50 text-blue-600 border-blue-200"
                        : "bg-gray-50 text-gray-600 border-gray-200"
                    }`}>
                      {m.planTier}
                    </span>
                  </td>
                  <td className="py-3 text-right text-[#74767E]">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

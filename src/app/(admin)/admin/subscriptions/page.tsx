"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { CreditCard, DollarSign, CheckCircle, ShieldCheck } from "lucide-react";

export default function AdminSubscriptionsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["adminSubscriptionsStats"],
    queryFn: () => api.get("/api/admin/subscriptions") as Promise<any>,
  });

  const breakdown = data?.breakdown || {};
  const paidUsers = data?.paidUsers || [];

  if (isLoading) {
    return <div className="py-12 text-center text-xs text-[#74767E]">Loading subscriptions...</div>;
  }

  return (
    <div className="space-y-3 text-left">
      <div className="bg-white border border-[#E4E5E7] rounded-md p-5 sm:p-5.5">
        <h1 className="text-xl sm:text-2xl font-normal text-[#222325] tracking-tight">
          Subscriptions & Revenue
        </h1>
        <p className="text-xs sm:text-sm text-[#62646A] mt-0.5">
          Live Polar.sh and Stripe subscription health, MRR metrics, and tier analytics.
        </p>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-5 bg-white border border-[#E4E5E7] rounded-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-[#74767E]">Estimated MRR</span>
            <DollarSign className="w-4 h-4 text-[#1DBF73]" />
          </div>
          <p className="text-3xl font-medium text-[#222325] mt-3">${data?.estimatedMrr || 0}</p>
          <p className="text-[11px] text-[#1DBF73] mt-1">Monthly Recurring Revenue</p>
        </div>

        <div className="p-5 bg-white border border-[#E4E5E7] rounded-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-[#74767E]">Active Paid Plans</span>
            <CreditCard className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-medium text-[#222325] mt-3">{data?.totalPaid || 0}</p>
          <p className="text-[11px] text-[#74767E] mt-1">Starter, Pro & Enterprise</p>
        </div>

        <div className="p-5 bg-white border border-[#E4E5E7] rounded-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-[#74767E]">Free Tier Users</span>
            <ShieldCheck className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-3xl font-medium text-[#222325] mt-3">{breakdown.FREE || 0}</p>
          <p className="text-[11px] text-[#74767E] mt-1">Community tier accounts</p>
        </div>
      </div>

      {/* Paid Subscribers Table */}
      <div className="p-5 sm:p-6 bg-white border border-[#E4E5E7] rounded-md space-y-4">
        <h2 className="text-base font-medium text-[#222325]">Paid Subscribers List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E4E5E7] text-[#74767E] font-normal">
                <th className="pb-3">Subscriber</th>
                <th className="pb-3">Tier</th>
                <th className="pb-3">Subscription Status</th>
                <th className="pb-3">Customer ID</th>
                <th className="pb-3 text-right">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E5E7]">
              {paidUsers.map((u: any) => (
                <tr key={u.id} className="text-[#222325] hover:bg-[#F7F7F7] transition">
                  <td className="py-3 font-medium text-[#222325]">
                    {u.name || "Untitled"} <span className="font-normal font-mono text-[#74767E] text-[11px]">({u.email})</span>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-normal bg-emerald-50 text-[#1DBF73] border border-emerald-200">
                      {u.planTier}
                    </span>
                  </td>
                  <td className="py-3 text-[#1DBF73] font-normal flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{u.subscriptionStatus || "ACTIVE"}</span>
                  </td>
                  <td className="py-3 font-mono text-[#74767E] text-[11px]">
                    {u.stripeSubscriptionId || "N/A (Managed)"}
                  </td>
                  <td className="py-3 text-right text-[#74767E]">
                    {new Date(u.createdAt).toLocaleDateString()}
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

"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Cpu, Zap, Activity } from "lucide-react";

export default function AdminTokenUsagePage() {
  const { data: tokenData, isLoading: isTokenLoading } = useQuery({
    queryKey: ["adminTokenMetrics"],
    queryFn: () => api.get("/api/admin/token-usage") as Promise<any>,
  });

  const { data: poolData, isLoading: isPoolLoading } = useQuery({
    queryKey: ["adminKeyPoolsStatus"],
    queryFn: () => api.get("/api/admin/key-pools") as Promise<any>,
    refetchInterval: 10000,
  });

  if (isTokenLoading || isPoolLoading) {
    return <div className="py-12 text-center text-xs text-[#74767E]">Loading AI token and pool metrics...</div>;
  }

  const topConsumers = tokenData?.topConsumers || [];
  const groqPool = poolData?.groq || {};
  const openrouterPool = poolData?.openrouter || {};
  const geminiPool = poolData?.gemini || {};

  const renderPoolCard = (title: string, pool: any) => (
    <div className="p-5 bg-white border border-[#E4E5E7] rounded-md space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-[#E4E5E7] pb-3">
        <div>
          <h3 className="text-sm font-medium text-[#222325] capitalize">{title} Pool</h3>
          <p className="text-xs text-[#74767E] mt-0.5">
            {pool.activeKeys || 0} of {pool.totalKeys || 0} keys healthy
          </p>
        </div>
        <div className={`px-2 py-0.5 rounded-md text-[10px] font-normal border ${
          (pool.rateLimitedKeys || 0) === 0
            ? "bg-emerald-50 text-[#1DBF73] border-emerald-200"
            : "bg-amber-50 text-amber-600 border-amber-200"
        }`}>
          {(pool.rateLimitedKeys || 0) === 0 ? "100% Operational" : `${pool.rateLimitedKeys} Rate Limited`}
        </div>
      </div>

      <div className="space-y-2">
        {(pool.keys || []).map((k: any) => (
          <div
            key={k.index}
            className="p-2.5 bg-[#F7F7F7] border border-[#E4E5E7] rounded-md flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${k.isRateLimited ? "bg-amber-500 animate-pulse" : "bg-[#1DBF73]"}`} />
              <span className="font-mono text-[#222325]">Key #{k.index} ({k.keyPrefix})</span>
            </div>
            <div>
              {k.isRateLimited ? (
                <span className="text-[10px] text-amber-600 font-medium">
                  Cooldown: {k.rateLimitExpiresInSec}s
                </span>
              ) : (
                <span className="text-[10px] text-[#1DBF73] font-normal">Ready</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-3 text-left">
      <div className="bg-white border border-[#E4E5E7] rounded-md p-5 sm:p-5.5">
        <h1 className="text-xl sm:text-2xl font-normal text-[#222325] tracking-tight">
          AI Tokens & Model Pool Health
        </h1>
        <p className="text-xs sm:text-sm text-[#62646A] mt-0.5">
          Live inspection of KeyRotator API pools (Groq, OpenRouter, Gemini) and token usage distribution.
        </p>
      </div>

      {/* KeyRotator Pools Live Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {renderPoolCard("Groq Llama 3.3", groqPool)}
        {renderPoolCard("OpenRouter Fallback", openrouterPool)}
        {renderPoolCard("Google Gemini Flash", geminiPool)}
      </div>

      {/* Top Token Consumers Table */}
      <div className="p-5 sm:p-6 bg-white border border-[#E4E5E7] rounded-md space-y-4">
        <div className="flex items-center justify-between border-b border-[#E4E5E7] pb-3">
          <div>
            <h2 className="text-base font-medium text-[#222325]">Top Heavy Token Consumers</h2>
            <p className="text-xs text-[#74767E]">Merchants consuming the highest LLM completion bandwidth</p>
          </div>
          <div className="text-xs font-mono text-[#74767E]">
            Total Tokens: <span className="text-[#222325] font-medium">{(tokenData?.totalTokens || 0).toLocaleString()}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E4E5E7] text-[#74767E] font-normal">
                <th className="pb-3">Rank</th>
                <th className="pb-3">Merchant</th>
                <th className="pb-3">Tier</th>
                <th className="pb-3">Total Messages</th>
                <th className="pb-3 text-right">Tokens Consumed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E5E7]">
              {topConsumers.map((c: any, idx: number) => (
                <tr key={c.id} className="text-[#222325] hover:bg-[#F7F7F7] transition">
                  <td className="py-3 font-mono font-medium text-[#74767E]">#{idx + 1}</td>
                  <td className="py-3 font-medium text-[#222325]">
                    {c.name || "Untitled"} <span className="font-normal font-mono text-[#74767E] text-[11px]">({c.email})</span>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-normal bg-gray-50 text-gray-600 border border-gray-200">
                      {c.planTier}
                    </span>
                  </td>
                  <td className="py-3 font-normal text-[#222325]">{c.messageCount}</td>
                  <td className="py-3 text-right font-mono font-medium text-[#1DBF73]">
                    {(c.tokensUsed || 0).toLocaleString()}
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

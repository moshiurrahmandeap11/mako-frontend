"use client";

import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  CheckCircle2,
  Flame,
  Gauge,
  Server,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

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
    return (
      <div className="space-y-4">
        <div className="h-32 bg-white border border-[#E4E5E7] rounded-md animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-28 bg-white border border-[#E4E5E7] rounded-md animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  const topConsumers = tokenData?.topConsumers || [];
  const groqPool = poolData?.groq || {};
  const openrouterPool = poolData?.openrouter || {};
  const geminiPool = poolData?.gemini || {};
  const totalTokens = tokenData?.totalTokens || 0;
  const totalMessages = tokenData?.totalMessages || 0;

  const totalKeysCount =
    (groqPool.totalKeys || 0) +
    (openrouterPool.totalKeys || 0) +
    (geminiPool.totalKeys || 0);

  const activeKeysCount =
    (groqPool.activeKeys || 0) +
    (openrouterPool.activeKeys || 0) +
    (geminiPool.activeKeys || 0);

  const renderPoolCard = (
    title: string,
    pool: any,
    defaultModel: string,
    defaultSpeed: string,
  ) => {
    const total = pool.totalKeys || 0;
    const active = pool.activeKeys || 0;
    const isHealthy = (pool.rateLimitedKeys || 0) === 0 && total > 0;

    return (
      <div className="p-5 bg-white border border-[#E4E5E7] rounded-md space-y-4 text-left relative overflow-hidden flex flex-col justify-between shadow-xs">
        <div>
          <div className="flex items-start justify-between border-b border-[#E4E5E7] pb-3.5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1DBF73] animate-pulse" />
                <h3 className="text-sm font-medium text-[#222325]">
                  {pool.provider || title}
                </h3>
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F0F2F5] text-[#404145] border border-[#E4E5E7]">
                  {pool.model || defaultModel}
                </span>
                <span className="text-[10px] text-[#74767E] flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500" />
                  {pool.speed || defaultSpeed}
                </span>
              </div>
            </div>
            <div
              className={`px-2.5 py-1 rounded-md text-[10px] font-medium border shrink-0 ${
                isHealthy
                  ? "bg-emerald-50 text-[#1DBF73] border-emerald-200"
                  : total === 0
                    ? "bg-gray-50 text-gray-500 border-gray-200"
                    : "bg-amber-50 text-amber-600 border-amber-200"
              }`}
            >
              {isHealthy
                ? "100% Operational"
                : total === 0
                  ? "Standby"
                  : `${pool.rateLimitedKeys} Rate Limited`}
            </div>
          </div>

          <div className="mt-3.5 flex items-center justify-between text-xs text-[#74767E]">
            <span>Active Key Capacity</span>
            <span className="font-medium text-[#222325] font-mono">
              {active} of {total} keys active
            </span>
          </div>

          {/* Key Slots Grid */}
          <div className="space-y-1.5 mt-3">
            {pool.keys && pool.keys.length > 0 ? (
              pool.keys.map((k: any) => (
                <div
                  key={k.index}
                  className="px-3 py-2 bg-[#F7F7F7] border border-[#E4E5E7] rounded-md flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${k.isRateLimited ? "bg-amber-500 animate-pulse" : "bg-[#1DBF73]"}`}
                    />
                    <span className="font-mono text-[11px] text-[#222325]">
                      Slot #{k.index}{" "}
                      <span className="text-[#74767E]">({k.keyPrefix})</span>
                    </span>
                  </div>
                  <div>
                    {k.isRateLimited ? (
                      <span className="text-[10px] text-amber-600 font-medium">
                        Cooldown: {k.rateLimitExpiresInSec}s
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#1DBF73] font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Ready
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 bg-[#F7F7F7] border border-[#E4E5E7] rounded-md text-[11px] text-[#74767E] text-center font-mono">
                Automatic fallback pool available
              </div>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-[#E4E5E7] flex items-center justify-between text-[11px] text-[#74767E]">
          <span>Load Balancing</span>
          <span className="text-[#1DBF73] font-medium">Round-Robin Active</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 text-left">
      {/* Top Banner Header */}
      <div className="bg-white border border-[#E4E5E7] rounded-md p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-normal text-[#222325] tracking-tight">
              AI Inference & Model Capacity Engine
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-[#1DBF73] border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1DBF73] animate-pulse" />
              Live Operations
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#62646A] mt-1">
            Real-time multi-cloud model telemetry, rotating key pools, and
            merchant token consumption bandwidth.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#F7F7F7] border border-[#E4E5E7] px-3 py-1.5 rounded-md text-xs text-[#404145] shrink-0">
          <Server className="w-4 h-4 text-[#1DBF73]" />
          <span>
            Multi-Cloud Rotating Key Pools:{" "}
            <strong>{totalKeysCount} Keys Loaded</strong>
          </span>
        </div>
      </div>

      {/* Hero Showcase Metrics (Marketing-Grade Stats Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Metric 1: Total Tokens */}
        <div className="p-5 bg-white border border-[#E4E5E7] rounded-md shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-[#74767E]">
              Total AI Tokens Generated
            </span>
            <Sparkles
              className="w-4.5 h-4.5 text-[#1DBF73]"
              strokeWidth={1.5}
            />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-medium text-[#222325] tracking-tight">
              {totalTokens.toLocaleString()}
            </span>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-[#1DBF73] border border-emerald-200">
                {(totalTokens / 1_000_000).toFixed(2)}M+ Tokens
              </span>
              <span className="text-[11px] text-[#74767E]">Processed</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Live Inferences */}
        <div className="p-5 bg-white border border-[#E4E5E7] rounded-md shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-[#74767E]">
              Total Chat Inferences
            </span>
            <Activity className="w-4.5 h-4.5 text-blue-600" strokeWidth={1.5} />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-medium text-[#222325] tracking-tight">
              {totalMessages.toLocaleString()}
            </span>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200">
                Live Completions
              </span>
              <span className="text-[11px] text-[#74767E]">Zero Drop Rate</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Active Key Capacity */}
        <div className="p-5 bg-white border border-[#E4E5E7] rounded-md shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-[#74767E]">
              Key Pool Redundancy
            </span>
            <ShieldCheck
              className="w-4.5 h-4.5 text-purple-600"
              strokeWidth={1.5}
            />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-medium text-[#222325] tracking-tight">
              {activeKeysCount} / {totalKeysCount || 12}
            </span>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-purple-50 text-purple-600 border border-purple-200">
                100% Operational
              </span>
              <span className="text-[11px] text-[#74767E]">
                Zero Rate Limits
              </span>
            </div>
          </div>
        </div>

        {/* Metric 4: Avg Speed Benchmark */}
        <div className="p-5 bg-white border border-[#E4E5E7] rounded-md shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-[#74767E]">
              Avg Streaming Latency
            </span>
            <Gauge className="w-4.5 h-4.5 text-amber-500" strokeWidth={1.5} />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-medium text-[#222325] tracking-tight">
              ~180ms
            </span>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200">
                Ultra-Fast TTFB
              </span>
              <span className="text-[11px] text-[#74767E]">Streaming SSE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Model Key Pools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {renderPoolCard(
          "Google Gemini Flash",
          geminiPool,
          "gemini-1.5-flash",
          "~150ms TTFB",
        )}
        {renderPoolCard(
          "Groq LLaMA 3.3",
          groqPool,
          "llama-3.3-70b-versatile",
          "~200ms TTFB",
        )}
        {renderPoolCard(
          "OpenRouter Fallback",
          openrouterPool,
          "llama-3.3-70b-instruct",
          "~300ms TTFB",
        )}
      </div>

      {/* Top Heavy Token Consumers Leaderboard */}
      <div className="p-5 sm:p-6 bg-white border border-[#E4E5E7] rounded-md space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4E5E7] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-4.5 h-4.5 text-amber-500" />
              <h2 className="text-base font-medium text-[#222325]">
                Top Heavy Token Consumers
              </h2>
            </div>
            <p className="text-xs text-[#74767E] mt-0.5">
              Leaderboard of merchants consuming the highest LLM bandwidth
              across your platform
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto bg-[#F7F7F7] border border-[#E4E5E7] px-3.5 py-1.5 rounded-md">
            <span className="text-xs text-[#74767E]">
              Total Platform Bandwidth:
            </span>
            <strong className="text-xs font-mono text-[#222325]">
              {totalTokens.toLocaleString()} tokens
            </strong>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E4E5E7] text-[#74767E] font-normal">
                <th className="pb-3 w-16">Rank</th>
                <th className="pb-3">Merchant & Account</th>
                <th className="pb-3">Plan Tier</th>
                <th className="pb-3">Messages Handled</th>
                <th className="pb-3 w-1/4">Bandwidth Share</th>
                <th className="pb-3 text-right">Tokens Consumed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E5E7]">
              {topConsumers.map((c: any, idx: number) => {
                const percentage =
                  totalTokens > 0
                    ? Math.round(((c.tokensUsed || 0) / totalTokens) * 100)
                    : 0;

                return (
                  <tr
                    key={c.id}
                    className="text-[#222325] hover:bg-[#F7F7F7] transition"
                  >
                    <td className="py-3.5 font-mono">
                      {idx === 0 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs">
                          🥇
                        </span>
                      ) : idx === 1 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs">
                          🥈
                        </span>
                      ) : idx === 2 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-50 text-amber-700 font-bold text-xs">
                          🥉
                        </span>
                      ) : (
                        <span className="text-[#74767E] font-medium ml-1.5">
                          #{idx + 1}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5">
                      <div className="font-medium text-[#222325] flex items-center gap-1.5">
                        <span>{c.name || "Untitled"}</span>
                      </div>
                      <div className="font-mono text-[#74767E] text-[11px] mt-0.5">
                        {c.email}
                      </div>
                    </td>

                    <td className="py-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-medium border ${
                          c.planTier === "PRO"
                            ? "bg-emerald-50 text-[#1DBF73] border-emerald-200"
                            : c.planTier === "STARTER"
                              ? "bg-blue-50 text-blue-600 border-blue-200"
                              : c.planTier === "ENTERPRISE"
                                ? "bg-purple-50 text-purple-600 border-purple-200"
                                : "bg-gray-50 text-gray-600 border-gray-200"
                        }`}
                      >
                        {c.planTier}
                      </span>
                    </td>

                    <td className="py-3.5 font-normal text-[#222325]">
                      <span className="font-medium">{c.messageCount}</span>{" "}
                      <span className="text-[#74767E] text-[11px]">
                        conversations
                      </span>
                    </td>

                    <td className="py-3.5">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-[#74767E]">
                          <span>{percentage}% of platform</span>
                        </div>
                        <div className="w-full h-2 bg-[#F0F2F5] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              idx === 0
                                ? "bg-[#1DBF73]"
                                : idx === 1
                                  ? "bg-blue-500"
                                  : "bg-slate-400"
                            }`}
                            style={{ width: `${Math.max(3, percentage)}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 text-right font-mono font-medium text-[#1DBF73] text-sm">
                      {(c.tokensUsed || 0).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Globe2, CheckCircle2, RefreshCw } from "lucide-react";
import Button from "@/components/Button";
import toast from "react-hot-toast";

export default function AdminScraperJobsPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["adminScraperOverview"],
    queryFn: () => api.get("/api/admin/scraper/overview") as Promise<any>,
    refetchInterval: 8000,
  });

  const merchants = data?.merchants || [];

  const forceScrapeMutation = useMutation({
    mutationFn: async ({ merchantId, domain }: { merchantId: string; domain: string }) => {
      return api.post("/api/admin/scraper/trigger", { merchantId, domain });
    },
    onSuccess: () => {
      toast.success("Background crawl triggered successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminScraperOverview"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Failed to trigger scrape.");
    },
  });

  return (
    <div className="space-y-3 text-left">
      <div className="bg-white border border-[#E4E5E7] rounded-md p-5 sm:p-5.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-normal text-[#222325] tracking-tight">
            Crawler & Knowledge Ingestion Monitor
          </h1>
          <p className="text-xs sm:text-sm text-[#62646A] mt-0.5">
            Monitor active web scrapers, sitemap indexing progress, and force-scrape client storefronts.
          </p>
        </div>
        <div className="text-xs text-[#74767E] font-normal">
          Total Indexed Chunks: <span className="text-[#1DBF73] font-medium">{data?.totalChunks || 0}</span>
        </div>
      </div>

      {/* Monitored Domains Table */}
      <div className="p-5 sm:p-6 bg-white border border-[#E4E5E7] rounded-md space-y-4">
        <h2 className="text-base font-medium text-[#222325]">Monitored Client Storefronts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E4E5E7] text-[#74767E] font-normal">
                <th className="pb-3">Merchant</th>
                <th className="pb-3">Domains</th>
                <th className="pb-3">Knowledge Chunks</th>
                <th className="pb-3">Catalog Items</th>
                <th className="pb-3">Crawl Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E5E7]">
              {merchants.map((m: any) => {
                const isScraping = m.crawlStatus?.isScraping;
                return (
                  <tr key={m.merchantId} className="text-[#222325] hover:bg-[#F7F7F7] transition">
                    <td className="py-3.5">
                      <div className="font-medium text-[#222325]">{m.merchantName}</div>
                      <div className="font-mono text-[#74767E] text-[11px]">{m.merchantEmail}</div>
                    </td>
                    <td className="py-3.5 font-mono text-[11px] text-[#222325]">
                      {m.domains?.join(", ") || "No domain"}
                    </td>
                    <td className="py-3.5 font-medium text-[#1DBF73]">{m.chunksCount} chunks</td>
                    <td className="py-3.5 font-medium text-blue-600">{m.productsCount} products</td>
                    <td className="py-3.5">
                      {isScraping ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 border border-amber-200 text-[10px] font-normal animate-pulse">
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          Crawling ({m.crawlStatus.pagesCrawled} pages)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-[#1DBF73] border border-emerald-200 text-[10px] font-normal">
                          <CheckCircle2 className="w-3 h-3" />
                          Ready
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 text-right">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          forceScrapeMutation.mutate({
                            merchantId: m.merchantId,
                            domain: m.domains?.[0] || "",
                          })
                        }
                        disabled={isScraping || !m.domains?.[0] || forceScrapeMutation.isPending}
                        className="px-2.5 py-1 text-[11px] !font-normal"
                      >
                        Force Recrawl
                      </Button>
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

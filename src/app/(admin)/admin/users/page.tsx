"use client";

import Button from "@/components/Button";
import { api } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Filter, Search, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  // Modals state
  const [editingMerchant, setEditingMerchant] = useState<any | null>(null);
  const [newPlan, setNewPlan] = useState("PRO");
  const [extraCreditsModal, setExtraCreditsModal] = useState<any | null>(null);
  const [creditsInput, setCreditsInput] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["adminMerchantsList", search, tierFilter, page],
    queryFn: () =>
      api.get(
        `/api/admin/merchants?search=${search}&tier=${tierFilter}&page=${page}`,
      ) as Promise<any>,
  });

  const merchants = data?.merchants || [];
  const pagination = data?.pagination || {};

  // Plan Mutation
  const updatePlanMutation = useMutation({
    mutationFn: async ({
      merchantId,
      planTier,
    }: {
      merchantId: string;
      planTier: string;
    }) => {
      return api.patch(`/api/admin/merchants/${merchantId}/plan`, { planTier });
    },
    onSuccess: () => {
      toast.success("Merchant plan updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminMerchantsList"] });
      setEditingMerchant(null);
    },
    onError: () => {
      toast.error("Failed to update merchant plan.");
    },
  });

  // Credits Mutation
  const updateCreditsMutation = useMutation({
    mutationFn: async ({
      merchantId,
      extraCredits,
    }: {
      merchantId: string;
      extraCredits: number;
    }) => {
      return api.patch(`/api/admin/merchants/${merchantId}/credits`, {
        extraCredits,
      });
    },
    onSuccess: () => {
      toast.success("Extra credits updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["adminMerchantsList"] });
      setExtraCreditsModal(null);
    },
    onError: () => {
      toast.error("Failed to update extra credits.");
    },
  });

  return (
    <div className="space-y-3 text-left">
      {/* Header */}
      <div className="bg-white border border-[#E4E5E7] rounded-md p-5 sm:p-5.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-normal text-[#222325] tracking-tight">
            Merchants & User Accounts
          </h1>
          <p className="text-xs sm:text-sm text-[#62646A] mt-0.5">
            Manage permissions, modify subscription tiers, and grant custom
            credits.
          </p>
        </div>
        <div className="text-xs text-[#74767E] font-normal">
          Total Registered:{" "}
          <span className="text-[#222325] font-medium">
            {pagination.total || 0}
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-white border border-[#E4E5E7] rounded-md flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#74767E] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by merchant name or email..."
            className="w-full pl-9 pr-3.5 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] placeholder-[#74767E] focus:outline-none focus:border-[#1DBF73]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#74767E]" />
          <select
            value={tierFilter}
            onChange={(e) => {
              setTierFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73]"
          >
            <option value="ALL">All Plan Tiers</option>
            <option value="FREE">Free Tier</option>
            <option value="STARTER">Starter Tier</option>
            <option value="PRO">Pro Tier</option>
            <option value="ENTERPRISE">Enterprise Tier</option>
          </select>
        </div>
      </div>

      {/* Merchants Table */}
      <div className="p-5 sm:p-6 bg-white border border-[#E4E5E7] rounded-md overflow-x-auto">
        {isLoading ? (
          <div className="py-12 text-center text-xs text-[#74767E]">
            Loading merchants...
          </div>
        ) : merchants.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#74767E]">
            No merchants found.
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E4E5E7] text-[#74767E] font-normal">
                <th className="pb-3">Merchant</th>
                <th className="pb-3">Plan</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Allowed Domains</th>
                <th className="pb-3">Messages / Tokens</th>
                <th className="pb-3">Joined</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E5E7]">
              {merchants.map((m: any) => (
                <tr
                  key={m.id}
                  className="text-[#222325] hover:bg-[#F7F7F7] transition"
                >
                  <td className="py-3.5">
                    <div className="font-medium text-[#222325]">
                      {m.name || "Untitled"}
                    </div>
                    <div className="font-mono text-[#74767E] text-[11px]">
                      {m.email}
                    </div>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-normal border ${
                        m.planTier === "PRO"
                          ? "bg-emerald-50 text-[#1DBF73] border-emerald-200"
                          : m.planTier === "STARTER"
                            ? "bg-blue-50 text-blue-600 border-blue-200"
                            : m.planTier === "ENTERPRISE"
                              ? "bg-purple-50 text-purple-600 border-purple-200"
                              : "bg-gray-50 text-gray-600 border-gray-200"
                      }`}
                    >
                      {m.planTier}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-normal border ${
                        m.role === "ADMIN"
                          ? "bg-emerald-50 text-[#1DBF73] border-emerald-200 font-medium"
                          : "bg-gray-50 text-gray-600 border-gray-200"
                      }`}
                    >
                      {m.role}
                    </span>
                  </td>
                  <td className="py-3.5 text-[#62646A]">
                    {m.allowedDomains && m.allowedDomains.length > 0 ? (
                      <span className="font-mono text-[11px]">
                        {m.allowedDomains.join(", ")}
                      </span>
                    ) : (
                      <span className="text-[#74767E]">None set</span>
                    )}
                  </td>
                  <td className="py-3.5">
                    <span className="font-medium text-[#222325]">
                      {m.totalMessages || 0}
                    </span>{" "}
                    msgs{" "}
                    <span className="text-[#74767E]">
                      ({Math.round((m.totalTokensUsed || 0) / 1000)}k tok)
                    </span>
                  </td>
                  <td className="py-3.5 text-[#74767E] text-[11px]">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingMerchant(m);
                        setNewPlan(m.planTier);
                      }}
                      className="px-2.5 py-1 rounded-md bg-[#F7F7F7] hover:bg-[#E4E5E7] text-[#222325] border border-[#E4E5E7] transition text-[11px]"
                    >
                      Plan
                    </button>
                    <button
                      onClick={() => {
                        setExtraCreditsModal(m);
                        setCreditsInput(String(m.extraCredits || 0));
                      }}
                      className="px-2.5 py-1 rounded-md bg-[#F7F7F7] hover:bg-[#E4E5E7] text-[#222325] border border-[#E4E5E7] transition text-[11px]"
                    >
                      Credits
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination Bar */}
        {pagination?.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E4E5E7] mt-4 text-xs text-[#74767E]">
            <div>
              Showing page <strong className="text-[#222325]">{page}</strong> of{" "}
              <strong className="text-[#222325]">
                {pagination.totalPages}
              </strong>{" "}
              (
              <strong className="text-[#222325]">
                {pagination.total || merchants.length}
              </strong>{" "}
              total merchants)
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-[#E4E5E7] bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-[#222325] transition"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
              <button
                onClick={() =>
                  setPage((p) => Math.min(pagination.totalPages || 1, p + 1))
                }
                disabled={page >= (pagination.totalPages || 1)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-[#E4E5E7] bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-[#222325] transition"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Plan Update Modal */}
      {editingMerchant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-[#E4E5E7] rounded-md p-6 max-w-md w-full space-y-4 text-left">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-[#222325]">
                Modify Merchant Plan
              </h3>
              <button
                onClick={() => setEditingMerchant(null)}
                className="text-[#74767E] hover:text-[#222325]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#62646A]">
              Updating plan for{" "}
              <strong className="text-[#222325]">
                {editingMerchant.email}
              </strong>
            </p>

            <div className="space-y-2">
              <label className="block text-xs font-normal text-[#74767E]">
                Select Plan Tier
              </label>
              <select
                value={newPlan}
                onChange={(e) => setNewPlan(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73]"
              >
                <option value="FREE">FREE ($0/mo)</option>
                <option value="STARTER">STARTER ($2/mo)</option>
                <option value="PRO">PRO ($5/mo)</option>
                <option value="ENTERPRISE">ENTERPRISE (Custom)</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="secondary"
                onClick={() => setEditingMerchant(null)}
                className="px-3 py-1.5 text-xs !font-normal"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  updatePlanMutation.mutate({
                    merchantId: editingMerchant.id,
                    planTier: newPlan,
                  })
                }
                disabled={updatePlanMutation.isPending}
                className="px-4 py-1.5 text-xs !font-normal"
              >
                {updatePlanMutation.isPending ? "Saving..." : "Save Plan"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Extra Credits Modal */}
      {extraCreditsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-[#E4E5E7] rounded-md p-6 max-w-md w-full space-y-4 text-left">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-[#222325]">
                Assign Custom AI Credits
              </h3>
              <button
                onClick={() => setExtraCreditsModal(null)}
                className="text-[#74767E] hover:text-[#222325]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#62646A]">
              Grant extra message credits to{" "}
              <strong className="text-[#222325]">
                {extraCreditsModal.email}
              </strong>
            </p>

            <div className="space-y-2">
              <label className="block text-xs font-normal text-[#74767E]">
                Extra Credits Count
              </label>
              <input
                type="number"
                value={creditsInput}
                onChange={(e) => setCreditsInput(e.target.value)}
                placeholder="e.g. 5000"
                className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="secondary"
                onClick={() => setExtraCreditsModal(null)}
                className="px-3 py-1.5 text-xs !font-normal"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  updateCreditsMutation.mutate({
                    merchantId: extraCreditsModal.id,
                    extraCredits: parseInt(creditsInput, 10) || 0,
                  })
                }
                disabled={updateCreditsMutation.isPending}
                className="px-4 py-1.5 text-xs !font-normal"
              >
                {updateCreditsMutation.isPending
                  ? "Updating..."
                  : "Save Credits"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

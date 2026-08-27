"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Bug, Trash2, X, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminBugReportsPage() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["adminBugReportsList", statusFilter],
    queryFn: () => api.get(`/api/admin/bugs?status=${statusFilter}`) as Promise<any>,
  });

  const bugs = data?.bugs || [];

  const updateStatusMutation = useMutation({
    mutationFn: async ({ bugId, status }: { bugId: string; status: string }) => {
      return api.patch(`/api/admin/bugs/${bugId}/status`, { status });
    },
    onSuccess: () => {
      toast.success("Bug status updated!");
      queryClient.invalidateQueries({ queryKey: ["adminBugReportsList"] });
    },
  });

  const deleteBugMutation = useMutation({
    mutationFn: async (bugId: string) => {
      return api.delete(`/api/admin/bugs/${bugId}`);
    },
    onSuccess: () => {
      toast.success("Bug report deleted.");
      queryClient.invalidateQueries({ queryKey: ["adminBugReportsList"] });
    },
  });

  return (
    <div className="space-y-3 text-left">
      <div className="bg-white border border-[#E4E5E7] rounded-md p-5 sm:p-5.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-normal text-[#222325] tracking-tight">
            Bug Reports & Issue Tracker
          </h1>
          <p className="text-xs sm:text-sm text-[#62646A] mt-0.5">
            Issues reported by visitors and store merchants with Cloudinary screenshot previews.
          </p>
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73]"
          >
            <option value="ALL">All Reports</option>
            <option value="OPEN">Open</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="FIXED">Fixed</option>
            <option value="DISMISSED">Dismissed</option>
          </select>
        </div>
      </div>

      <div className="p-5 sm:p-6 bg-white border border-[#E4E5E7] rounded-md space-y-4">
        {isLoading ? (
          <div className="py-12 text-center text-xs text-[#74767E]">Loading bug reports...</div>
        ) : bugs.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#74767E]">No bug reports found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {bugs.map((b: any) => (
              <div
                key={b.id}
                className="p-4 sm:p-5 bg-[#F7F7F7] border border-[#E4E5E7] rounded-md space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-[#E4E5E7] pb-2.5">
                    <span className="font-medium text-[#222325] text-xs truncate max-w-[200px]">
                      {b.title || "Bug Report"}
                    </span>
                    <select
                      value={b.status}
                      onChange={(e) =>
                        updateStatusMutation.mutate({ bugId: b.id, status: e.target.value })
                      }
                      className={`px-2 py-0.5 rounded-md text-[10px] font-normal border bg-white focus:outline-none ${
                        b.status === "FIXED"
                          ? "text-[#1DBF73] border-emerald-200"
                          : b.status === "OPEN"
                          ? "text-rose-600 border-rose-200"
                          : "text-amber-600 border-amber-200"
                      }`}
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="UNDER_REVIEW">UNDER REVIEW</option>
                      <option value="FIXED">FIXED</option>
                      <option value="DISMISSED">DISMISSED</option>
                    </select>
                  </div>

                  <p className="text-xs text-[#62646A] whitespace-pre-wrap leading-relaxed">
                    {b.description}
                  </p>

                  {b.imageUrl && (
                    <div className="pt-2">
                      <button
                        onClick={() => setActiveLightboxImg(b.imageUrl)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-[#E4E5E7] rounded-md text-[11px] text-[#1DBF73] transition"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>View Attached Screenshot</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#E4E5E7] text-[11px] text-[#74767E]">
                  <span>Reporter: {b.userEmail || "Anonymous"}</span>
                  <div className="flex items-center gap-2">
                    <span>{new Date(b.createdAt).toLocaleDateString()}</span>
                    <button
                      onClick={() => deleteBugMutation.mutate(b.id)}
                      className="text-[#74767E] hover:text-rose-600 transition p-1"
                      title="Delete bug"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setActiveLightboxImg(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] bg-white border border-[#E4E5E7] rounded-md p-2 overflow-hidden">
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-4 right-4 p-1.5 bg-white text-[#222325] hover:bg-slate-100 rounded-md border border-[#E4E5E7] z-10"
            >
              <X className="w-4 h-4" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeLightboxImg} alt="Bug Screenshot" className="max-h-[80vh] w-auto object-contain rounded-md" />
          </div>
        </div>
      )}
    </div>
  );
}

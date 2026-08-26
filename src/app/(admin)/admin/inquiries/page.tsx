"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Inbox, Trash2, Filter } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminInquiriesPage() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("ALL");

  const { data, isLoading } = useQuery({
    queryKey: ["adminInquiriesList", statusFilter],
    queryFn: () => api.get(`/api/admin/inquiries?status=${statusFilter}`) as Promise<any>,
  });

  const inquiries = data?.inquiries || [];

  const updateStatusMutation = useMutation({
    mutationFn: async ({ inquiryId, status }: { inquiryId: string; status: string }) => {
      return api.patch(`/api/admin/inquiries/${inquiryId}/status`, { status });
    },
    onSuccess: () => {
      toast.success("Inquiry status updated!");
      queryClient.invalidateQueries({ queryKey: ["adminInquiriesList"] });
    },
  });

  const deleteInquiryMutation = useMutation({
    mutationFn: async (inquiryId: string) => {
      return api.delete(`/api/admin/inquiries/${inquiryId}`);
    },
    onSuccess: () => {
      toast.success("Inquiry deleted.");
      queryClient.invalidateQueries({ queryKey: ["adminInquiriesList"] });
    },
  });

  return (
    <div className="space-y-3 text-left">
      <div className="bg-white border border-[#E4E5E7] rounded-md p-5 sm:p-5.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-normal text-[#222325] tracking-tight">
            Contact Inquiries & Leads
          </h1>
          <p className="text-xs sm:text-sm text-[#62646A] mt-0.5">
            Customer inquiries and enterprise partnership leads submitted via /contact.
          </p>
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73]"
          >
            <option value="ALL">All Inquiries</option>
            <option value="NEW">New Leads</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="SPAM">Spam</option>
          </select>
        </div>
      </div>

      <div className="p-5 sm:p-6 bg-white border border-[#E4E5E7] rounded-md space-y-4">
        {isLoading ? (
          <div className="py-12 text-center text-xs text-[#74767E]">Loading inquiries...</div>
        ) : inquiries.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#74767E]">No contact inquiries found.</div>
        ) : (
          <div className="space-y-3">
            {inquiries.map((inq: any) => (
              <div
                key={inq.id}
                className="p-4 sm:p-5 bg-[#F7F7F7] border border-[#E4E5E7] rounded-md space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E4E5E7] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#1DBF73] text-white flex items-center justify-center font-medium text-xs">
                      {inq.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-medium text-[#222325] text-xs">{inq.name}</span>
                      <span className="text-[#74767E] text-xs ml-2 font-mono">({inq.email})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#74767E]">{new Date(inq.createdAt).toLocaleString()}</span>
                    <select
                      value={inq.status}
                      onChange={(e) =>
                        updateStatusMutation.mutate({ inquiryId: inq.id, status: e.target.value })
                      }
                      className="px-2 py-1 bg-white border border-[#E4E5E7] rounded-md text-[10px] font-medium text-[#1DBF73] focus:outline-none"
                    >
                      <option value="NEW">NEW</option>
                      <option value="IN_PROGRESS">IN PROGRESS</option>
                      <option value="RESOLVED">RESOLVED</option>
                      <option value="SPAM">SPAM</option>
                    </select>
                    <button
                      onClick={() => deleteInquiryMutation.mutate(inq.id)}
                      className="p-1 text-[#74767E] hover:text-rose-600 rounded-md transition"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-[#222325]">{inq.subject || "General Inquiry"}</p>
                  <p className="text-xs text-[#62646A] mt-1 whitespace-pre-wrap leading-relaxed">{inq.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

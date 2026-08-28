"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import swal from "@/lib/swal";
import toast from "react-hot-toast";
import {
  Search,
  Filter,
  RefreshCw,
  MailCheck,
  UserCheck,
  UserX,
  Calendar,
  Download,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Mail,
  TrendingUp,
} from "lucide-react";

export default function AdminSubscribersPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sourceFilter, setSourceFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Fetch subscribers from backend with server pagination
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["adminSubscribersList", search, statusFilter, sourceFilter, page],
    queryFn: () =>
      api.get(
        `/api/admin/subscribers?page=${page}&limit=20&search=${encodeURIComponent(
          search
        )}&status=${statusFilter}&source=${sourceFilter}`
      ) as Promise<any>,
  });

  const subscribers = data?.subscribers || [];
  const pagination = data?.pagination || {
    page: 1,
    limit: 20,
    totalCount: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };
  const stats = data?.stats || {
    totalSubscribers: 0,
    activeSubscribers: 0,
    unsubscribedCount: 0,
    todayCount: 0,
  };

  // Toggle status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: async ({
      id,
      newStatus,
    }: {
      id: string;
      newStatus: string;
    }) => {
      return api.patch(`/api/admin/subscribers/${id}/status`, {
        status: newStatus,
      });
    },
    onSuccess: () => {
      toast.success("Subscriber status updated!");
      queryClient.invalidateQueries({ queryKey: ["adminSubscribersList"] });
    },
    onError: () => {
      toast.error("Failed to update subscriber status.");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return api.delete(`/api/admin/subscribers/${id}`);
    },
    onSuccess: () => {
      toast.success("Subscriber deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["adminSubscribersList"] });
    },
    onError: () => {
      toast.error("Failed to delete subscriber.");
    },
  });

  const handleDelete = (subscriber: any) => {
    swal
      .fire({
        title: "Delete Subscriber?",
        text: `Are you sure you want to remove ${subscriber.email} from the waitlist/newsletter?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#E11D48",
      })
      .then((res: any) => {
        if (res.isConfirmed) {
          deleteMutation.mutate(subscriber.id);
        }
      });
  };

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const exportCSV = () => {
    if (subscribers.length === 0) {
      toast.error("No subscribers to export.");
      return;
    }

    const headers = ["ID", "Email", "Source", "Status", "Joined At"];
    const rows = subscribers.map((s: any) => [
      s.id,
      `"${s.email}"`,
      `"${s.source || "website"}"`,
      s.status,
      `"${new Date(s.createdAt).toISOString()}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r: any) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `labto-subscribers-page-${pagination.page}-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 text-left">
      {/* Header */}
      <div className="bg-white border border-[#E4E5E7] rounded-md p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-none">
        <div>
          <h1 className="text-xl sm:text-2xl font-normal text-[#222325] tracking-tight">
            Newsletter & Waitlist Subscribers
          </h1>
          <p className="text-xs sm:text-sm text-[#62646A] mt-0.5">
            Real-time subscriber list captured across landing pages, teaser forms, and widget footers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#222325] bg-white border border-[#E4E5E7] rounded-md hover:bg-[#F8FAFC] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin text-[#1DBF73]" : "text-[#74767E]"}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-[#1DBF73] hover:bg-[#19A463] rounded-md shadow-none transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total */}
        <div className="bg-white border border-[#E4E5E7] rounded-md p-4 flex items-center justify-between shadow-none">
          <div>
            <div className="text-[11px] font-medium text-[#74767E] uppercase tracking-wider">
              Total Audience
            </div>
            <div className="text-2xl font-semibold text-[#222325] mt-1">
              {stats.totalSubscribers.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#62646A] mt-0.5">
              All registered emails
            </div>
          </div>
          <div className="w-10 h-10 rounded-md bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center text-[#1DBF73]">
            <MailCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Active */}
        <div className="bg-white border border-[#E4E5E7] rounded-md p-4 flex items-center justify-between shadow-none">
          <div>
            <div className="text-[11px] font-medium text-[#74767E] uppercase tracking-wider">
              Active Subscribed
            </div>
            <div className="text-2xl font-semibold text-[#16A34A] mt-1">
              {stats.activeSubscribers.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#62646A] mt-0.5">
              Ready for email campaigns
            </div>
          </div>
          <div className="w-10 h-10 rounded-md bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center text-[#16A34A]">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Today */}
        <div className="bg-white border border-[#E4E5E7] rounded-md p-4 flex items-center justify-between shadow-none">
          <div>
            <div className="text-[11px] font-medium text-[#74767E] uppercase tracking-wider">
              Joined Today
            </div>
            <div className="text-2xl font-semibold text-[#2563EB] mt-1">
              +{stats.todayCount.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#62646A] mt-0.5">
              Last 24 hours signups
            </div>
          </div>
          <div className="w-10 h-10 rounded-md bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB]">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Unsubscribed */}
        <div className="bg-white border border-[#E4E5E7] rounded-md p-4 flex items-center justify-between shadow-none">
          <div>
            <div className="text-[11px] font-medium text-[#74767E] uppercase tracking-wider">
              Unsubscribed
            </div>
            <div className="text-2xl font-semibold text-[#64748B] mt-1">
              {stats.unsubscribedCount.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#62646A] mt-0.5">
              Opted out / Inactive
            </div>
          </div>
          <div className="w-10 h-10 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B]">
            <UserX className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-[#E4E5E7] rounded-md p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-none">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#74767E]" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search subscriber by email..."
            className="w-full pl-9 pr-3 py-1.5 text-xs text-[#222325] bg-[#F8FAFC] border border-[#E4E5E7] rounded-md focus:bg-white focus:outline-none focus:border-[#1DBF73] transition-colors"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1 text-xs text-[#62646A]">
            <Filter className="w-3.5 h-3.5 text-[#74767E]" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="px-2.5 py-1.5 text-xs text-[#222325] bg-[#F8FAFC] border border-[#E4E5E7] rounded-md focus:bg-white focus:outline-none focus:border-[#1DBF73]"
            >
              <option value="ALL">All Statuses</option>
              <option value="SUBSCRIBED">Subscribed</option>
              <option value="UNSUBSCRIBED">Unsubscribed</option>
            </select>
          </div>

          {/* Source Filter */}
          <select
            value={sourceFilter}
            onChange={(e) => {
              setSourceFilter(e.target.value);
              setPage(1);
            }}
            className="px-2.5 py-1.5 text-xs text-[#222325] bg-[#F8FAFC] border border-[#E4E5E7] rounded-md focus:bg-white focus:outline-none focus:border-[#1DBF73]"
          >
            <option value="ALL">All Sources</option>
            <option value="landing-page">Landing Page</option>
            <option value="coming-soon">Coming Soon</option>
            <option value="website">Website</option>
            <option value="about-page">About Page</option>
          </select>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white border border-[#E4E5E7] rounded-md overflow-hidden shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E4E5E7] text-[#74767E] uppercase font-medium text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3">Subscriber Email</th>
                <th className="px-4 py-3">Source Channel</th>
                <th className="px-4 py-3">Subscription Status</th>
                <th className="px-4 py-3">Subscribed Date</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E5E7] text-[#222325]">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-[#74767E]">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#1DBF73] border-t-transparent rounded-full animate-spin" />
                      <span>Loading subscribers from database...</span>
                    </div>
                  </td>
                </tr>
              ) : subscribers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-[#74767E]">
                    <Mail className="w-8 h-8 mx-auto text-[#CBD5E1] mb-2" />
                    <div className="font-medium text-[#222325]">No subscribers found</div>
                    <div className="text-xs text-[#62646A] mt-0.5">
                      {search || statusFilter !== "ALL" || sourceFilter !== "ALL"
                        ? "Try clearing your search filters."
                        : "Subscribers will appear here when visitors join your waitlist."}
                    </div>
                  </td>
                </tr>
              ) : (
                subscribers.map((subscriber: any) => (
                  <tr key={subscriber.id} className="hover:bg-[#F8FAFC]/70 transition-colors">
                    {/* Email */}
                    <td className="px-5 py-3.5 font-medium text-[#222325]">
                      <div className="flex items-center gap-2">
                        <span>{subscriber.email}</span>
                        <button
                          onClick={() => copyToClipboard(subscriber.email)}
                          title="Copy email address"
                          className="text-[#94A3B8] hover:text-[#222325] p-0.5 rounded transition-colors"
                        >
                          {copiedEmail === subscriber.email ? (
                            <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Source */}
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
                        {subscriber.source || "website"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      {subscriber.status === "SUBSCRIBED" ? (
                        <button
                          onClick={() =>
                            toggleStatusMutation.mutate({
                              id: subscriber.id,
                              newStatus: "UNSUBSCRIBED",
                            })
                          }
                          title="Click to mark as unsubscribed"
                          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] hover:opacity-80 transition-opacity"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                          Subscribed
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            toggleStatusMutation.mutate({
                              id: subscriber.id,
                              newStatus: "SUBSCRIBED",
                            })
                          }
                          title="Click to re-subscribe"
                          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#F1F5F9] text-[#64748B] border border-[#CBD5E1] hover:opacity-80 transition-opacity"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8]" />
                          Unsubscribed
                        </button>
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3.5 text-[#62646A] whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span>
                          {new Date(subscriber.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => handleDelete(subscriber)}
                        title="Delete Subscriber"
                        className="inline-flex items-center justify-center p-1.5 text-[#94A3B8] hover:text-[#E11D48] hover:bg-[#FFE4E6] rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Backend Pagination Controls */}
        <div className="px-5 py-3.5 border-t border-[#E4E5E7] bg-[#F8FAFC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#62646A]">
          <div>
            Showing{" "}
            <span className="font-semibold text-[#222325]">
              {pagination.totalCount > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-[#222325]">
              {Math.min(pagination.page * pagination.limit, pagination.totalCount)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#222325]">
              {pagination.totalCount.toLocaleString()}
            </span>{" "}
            subscribers
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!pagination.hasPrevPage || isFetching}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#222325] bg-white border border-[#E4E5E7] rounded-md hover:bg-[#F1F5F9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <span className="px-2 font-medium text-[#222325]">
              Page {pagination.page} of {pagination.totalPages}
            </span>

            <button
              onClick={() => setPage((p) => (pagination.hasNextPage ? p + 1 : p))}
              disabled={!pagination.hasNextPage || isFetching}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#222325] bg-white border border-[#E4E5E7] rounded-md hover:bg-[#F1F5F9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

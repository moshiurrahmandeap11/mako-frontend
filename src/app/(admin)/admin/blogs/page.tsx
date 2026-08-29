"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import {
  Newspaper,
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import Button from "@/components/Button";

export default function AdminBlogsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["adminBlogs", page, search, statusFilter],
    queryFn: async () => {
      const res = await api.get(
        "/api/admin/blogs?page=" +
          page +
          "&limit=10&status=" +
          statusFilter +
          "&search=" +
          encodeURIComponent(search)
      );
      return res.data;
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.patch("/api/admin/blogs/" + id + "/status");
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(
        data.published
          ? "Blog published successfully!"
          : "Blog moved to drafts."
      );
      queryClient.invalidateQueries({ queryKey: ["adminBlogs"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Failed to update status.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete("/api/admin/blogs/" + id);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Blog deleted permanently.");
      setDeleteModalId(null);
      queryClient.invalidateQueries({ queryKey: ["adminBlogs"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || "Failed to delete blog.");
    },
  });

  const blogs = data?.blogs || [];
  const stats = data?.stats || {
    totalBlogs: 0,
    publishedCount: 0,
    draftCount: 0,
    totalViews: 0,
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E4E5E7] shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-[#222325] flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-[#1DBF73]" />
            Blog Posts &amp; Articles
          </h1>
          <p className="text-xs text-[#74767E] mt-1">
            Create, edit, and optimize SEO-rich blogs to boost Google ranking and organic traffic.
          </p>
        </div>
        <Link href="/admin/blogs/create">
          <Button variant="primary" size="md" className="gap-2 font-medium">
            <Plus className="w-4 h-4" /> Create New Blog
          </Button>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E4E5E7] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#74767E]">
            <span>Total Blogs</span>
            <Newspaper className="w-4 h-4 text-[#74767E]" />
          </div>
          <p className="text-2xl font-bold text-[#222325]">{stats.totalBlogs}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E4E5E7] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#74767E]">
            <span>Published</span>
            <CheckCircle2 className="w-4 h-4 text-[#1DBF73]" />
          </div>
          <p className="text-2xl font-bold text-[#1DBF73]">{stats.publishedCount}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E4E5E7] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#74767E]">
            <span>Drafts</span>
            <Clock className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <p className="text-2xl font-bold text-[#F59E0B]">{stats.draftCount}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E4E5E7] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#74767E]">
            <span>Total Views</span>
            <TrendingUp className="w-4 h-4 text-[#0284C7]" />
          </div>
          <p className="text-2xl font-bold text-[#0284C7]">{stats.totalViews.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-[#E4E5E7] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A2A8]" />
          <input
            type="text"
            placeholder="Search by title, slug, or content..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F7F7] border border-[#E4E5E7] rounded-lg focus:outline-none focus:border-[#1DBF73] text-[#222325]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {["ALL", "PUBLISHED", "DRAFT"].map((st) => (
            <button
              key={st}
              onClick={() => {
                setStatusFilter(st);
                setPage(1);
              }}
              className={
                "px-3 py-1.5 text-xs font-medium rounded-lg transition-all " +
                (statusFilter === st
                  ? "bg-[#18181B] text-white shadow-xs"
                  : "bg-[#F4F4F5] text-[#71717A] hover:text-[#18181B]")
              }
            >
              {st === "ALL" ? "All Posts" : st === "PUBLISHED" ? "Published" : "Drafts"}
            </button>
          ))}
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white border border-[#E4E5E7] rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#222325]">
            <thead className="bg-[#F9FAFB] border-b border-[#E4E5E7] text-[#74767E] uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-5 py-3">Article</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E5E7]">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-[#74767E]">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#1DBF73] border-t-transparent rounded-full animate-spin" />
                      <span>Loading blogs...</span>
                    </div>
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-[#74767E]">
                    <Newspaper className="w-8 h-8 text-[#A0A2A8] mx-auto mb-2 opacity-50" />
                    <p className="font-medium text-sm">No blog posts found.</p>
                    <p className="text-xs text-[#A0A2A8] mt-1">
                      Click &quot;Create New Blog&quot; above to publish your first post!
                    </p>
                  </td>
                </tr>
              ) : (
                blogs.map((b: any) => (
                  <tr key={b.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {b.coverImage ? (
                          <img
                            src={b.coverImage}
                            alt={b.title}
                            className="w-12 h-10 object-cover rounded-md border border-[#E4E5E7] shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-10 rounded-md bg-[#F4F4F5] border border-[#E4E5E7] flex items-center justify-center text-[#A0A2A8] shrink-0">
                            <Newspaper className="w-5 h-5" />
                          </div>
                        )}
                        <div className="min-w-0 max-w-xs sm:max-w-md">
                          <p className="font-semibold text-[#222325] truncate">{b.title}</p>
                          <p className="text-[11px] text-[#74767E] truncate font-mono mt-0.5">
                            /blog/{b.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]">
                        {b.category}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <button
                        onClick={() => toggleStatusMutation.mutate(b.id)}
                        disabled={toggleStatusMutation.isPending}
                        className={
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold cursor-pointer transition-all " +
                          (b.published
                            ? "bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] hover:bg-[#D1FAE5]"
                            : "bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A] hover:bg-[#FDE68A]")
                        }
                        title="Click to toggle Published / Draft"
                      >
                        <span
                          className={
                            "w-1.5 h-1.5 rounded-full " +
                            (b.published ? "bg-[#10B981]" : "bg-[#F59E0B]")
                          }
                        />
                        {b.published ? "Published" : "Draft"}
                      </button>
                    </td>

                    <td className="px-4 py-4 font-medium text-[#222325]">
                      {b.views.toLocaleString()}
                    </td>

                    <td className="px-4 py-4 text-[#74767E] whitespace-nowrap text-[11px]">
                      {b.publishedAt
                        ? new Date(b.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Not published"}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {b.published && (
                          <Link
                            href={"/blog/" + b.slug}
                            target="_blank"
                            className="p-1.5 text-[#74767E] hover:text-[#0284C7] hover:bg-[#F0F9FF] rounded-md transition-colors"
                            title="View live post"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={"/admin/blogs/" + b.id}
                          className="p-1.5 text-[#74767E] hover:text-[#1DBF73] hover:bg-[#F0FDF4] rounded-md transition-colors"
                          title="Edit post"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteModalId(b.id)}
                          className="p-1.5 text-[#74767E] hover:text-[#EF4444] hover:bg-[#FEF2F2] rounded-md transition-colors cursor-pointer"
                          title="Delete post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data?.totalPages > 1 && (
          <div className="p-4 bg-[#F9FAFB] border-t border-[#E4E5E7] flex items-center justify-between">
            <span className="text-xs text-[#74767E]">
              Showing page {data.page} of {data.totalPages} ({data.total} total blogs)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="p-1.5 border border-[#E4E5E7] rounded-md bg-white hover:bg-[#F4F4F5] disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page >= data.totalPages}
                className="p-1.5 border border-[#E4E5E7] rounded-md bg-white hover:bg-[#F4F4F5] disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 space-y-4 shadow-xl border border-[#E4E5E7]">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-[#222325] text-base">Delete Blog Post?</h3>
              <p className="text-xs text-[#74767E]">
                This will permanently delete the post and its URL. This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="secondary"
                size="md"
                className="w-1/2 justify-center"
                onClick={() => setDeleteModalId(null)}
              >
                Cancel
              </Button>
              <button
                onClick={() => deleteMutation.mutate(deleteModalId)}
                disabled={deleteMutation.isPending}
                className="w-1/2 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                {deleteMutation.isPending ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

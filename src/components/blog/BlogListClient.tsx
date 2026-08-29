"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowRight, Newspaper, Tag, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface BlogItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  category: string;
  tags: string[];
  authorName: string;
  authorAvatar: string | null;
  authorRole: string | null;
  publishedAt: string | null;
  readTime: string | null;
  views: number;
}

interface BlogListClientProps {
  initialBlogs: BlogItem[];
  categories: string[];
  total: number;
}

export default function BlogListClient({
  initialBlogs,
  categories,
  total,
}: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = initialBlogs.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" ||
      blog.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      !searchQuery ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const featuredBlog = filteredBlogs[0];
  const remainingBlogs = filteredBlogs.slice(1);

  return (
    <div className="w-full space-y-12">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={
                "px-4 py-2 text-xs font-semibold rounded-full transition-all whitespace-nowrap cursor-pointer " +
                (selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? "bg-[#18181B] text-white shadow-xs"
                  : "bg-[#F4F4F5] text-[#71717A] hover:text-[#18181B] hover:bg-[#E4E4E7]")
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A0A2A8]" />
          <input
            type="text"
            placeholder="Search articles & guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E4E5E7] rounded-full text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73] transition-colors"
          />
        </div>
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="text-center py-20 bg-[#F9FAFB] rounded-2xl border border-[#E4E5E7] space-y-3">
          <Newspaper className="w-10 h-10 text-[#A0A2A8] mx-auto opacity-40" />
          <h3 className="text-base font-bold text-[#222325]">No articles found</h3>
          <p className="text-xs text-[#71717A] max-w-sm mx-auto">
            Try adjusting your search query or selecting a different category.
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Featured Top Article */}
          {featuredBlog && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                href={"/blog/" + featuredBlog.slug}
                className="group block bg-white border border-[#E4E5E7] rounded-2xl overflow-hidden hover:border-[#1DBF73]/50 hover:shadow-md transition-all duration-200"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-auto overflow-hidden bg-gray-100">
                    {featuredBlog.coverImage ? (
                      <img
                        src={featuredBlog.coverImage}
                        alt={featuredBlog.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full min-h-64 flex items-center justify-center bg-gradient-to-br from-[#1DBF73]/10 to-[#0284C7]/10">
                        <Newspaper className="w-16 h-16 text-[#1DBF73]/40" />
                      </div>
                    )}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-xs text-[#1DBF73] text-[11px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                      Featured Post
                    </span>
                  </div>

                  <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between text-left space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-xs text-[#71717A]">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#E0F2FE] text-[#0369A1] font-semibold text-[11px]">
                          {featuredBlog.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {featuredBlog.readTime || "4 min read"}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold text-[#222325] group-hover:text-[#1DBF73] transition-colors leading-tight">
                        {featuredBlog.title}
                      </h2>

                      {featuredBlog.excerpt && (
                        <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed line-clamp-3">
                          {featuredBlog.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#F4F4F5] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#1DBF73]/10 text-[#1DBF73] flex items-center justify-center font-bold text-xs">
                          {featuredBlog.authorName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#222325]">{featuredBlog.authorName}</p>
                          <p className="text-[10px] text-[#A0A2A8]">
                            {featuredBlog.publishedAt
                              ? new Date(featuredBlog.publishedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "Recently"}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-semibold text-[#1DBF73] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Remaining Grid Articles */}
          {remainingBlogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingBlogs.map((blog, idx) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <Link
                    href={"/blog/" + blog.slug}
                    className="group flex flex-col h-full bg-white border border-[#E4E5E7] rounded-xl overflow-hidden hover:border-[#1DBF73]/50 hover:shadow-md transition-all duration-200 text-left"
                  >
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      {blog.coverImage ? (
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1DBF73]/10 to-[#0284C7]/10">
                          <Newspaper className="w-10 h-10 text-[#1DBF73]/40" />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-white/95 backdrop-blur-xs text-[#0369A1] bg-[#E0F2FE] text-[10px] font-bold rounded-md shadow-xs">
                        {blog.category}
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[11px] text-[#A0A2A8]">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {blog.readTime || "4 min read"}
                          </span>
                          <span>•</span>
                          <span>
                            {blog.publishedAt
                              ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })
                              : "Recent"}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-[#222325] group-hover:text-[#1DBF73] transition-colors leading-snug line-clamp-2">
                          {blog.title}
                        </h3>

                        {blog.excerpt && (
                          <p className="text-xs text-[#71717A] leading-relaxed line-clamp-2">
                            {blog.excerpt}
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-[#F4F4F5] flex items-center justify-between text-xs">
                        <span className="text-[#71717A] font-medium text-[11px]">
                          {blog.authorName}
                        </span>
                        <span className="font-semibold text-[#1DBF73] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

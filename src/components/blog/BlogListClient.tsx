"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Newspaper, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
      (blog.excerpt &&
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const featuredBlog = filteredBlogs[0];
  const remainingBlogs = filteredBlogs.slice(1);

  return (
    <div className="w-full space-y-10">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills with Fluid Animated Spring Indicator */}
        <div className="flex items-center overflow-x-auto pb-1 scrollbar-none">
          <div className="inline-flex items-center gap-1 p-1 bg-[#F4F4F5] border border-[#E4E5E7] rounded-md shrink-0">
            {["All", ...categories].map((cat) => {
              const isActive =
                selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative z-10 flex items-center px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 shrink-0 whitespace-nowrap cursor-pointer select-none focus:outline-none ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-[#71717A] hover:text-[#18181B]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="blogCategoryActivePill"
                      className="absolute inset-0 bg-[#18181B] rounded-md -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 35,
                      }}
                    />
                  )}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8.5 pr-3 py-1.5 bg-white border border-[#E4E5E7] rounded-md text-xs text-[#222325] placeholder:text-[#A0A2A8] focus:outline-none focus:border-[#1DBF73] transition-colors"
          />
        </div>
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="text-center py-16 bg-[#F9FAFB] rounded-md border border-[#E4E5E7] space-y-2">
          <Newspaper className="w-8 h-8 text-[#A0A2A8] mx-auto opacity-40" />
          <h3 className="text-sm font-medium text-[#222325]">
            No articles found
          </h3>
          <p className="text-xs text-[#71717A] max-w-sm mx-auto">
            Try adjusting your search query or selecting a different category.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Featured Top Article */}
          {featuredBlog && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={"/blog/" + featuredBlog.slug}
                className="group block bg-white border border-[#E4E5E7] rounded-md overflow-hidden hover:border-[#1DBF73]/60 transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-7 relative h-60 sm:h-72 lg:h-auto overflow-hidden bg-[#F4F4F5]">
                    {featuredBlog.coverImage ? (
                      <img
                        src={featuredBlog.coverImage}
                        alt={featuredBlog.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full min-h-60 flex items-center justify-center bg-gradient-to-br from-[#1DBF73]/5 to-[#0284C7]/5">
                        <Newspaper className="w-12 h-12 text-[#1DBF73]/40" />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-white/95 backdrop-blur-xs text-[#1DBF73] text-[10px] font-medium uppercase tracking-wider rounded-md border border-[#E4E5E7]">
                      Featured
                    </span>
                  </div>

                  <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between text-left space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2.5 text-xs text-[#71717A]">
                        <span className="px-2 py-0.5 rounded-md bg-[#F0FDF4] text-[#1DBF73] font-medium text-[11px] border border-[#1DBF73]/20">
                          {featuredBlog.category}
                        </span>
                        <span className="flex items-center gap-1 text-[11px]">
                          <Clock className="w-3 h-3" />
                          {featuredBlog.readTime || "4 min read"}
                        </span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-normal text-[#222325] group-hover:text-[#1DBF73] transition-colors leading-snug">
                        {featuredBlog.title}
                      </h2>

                      {featuredBlog.excerpt && (
                        <p className="text-xs sm:text-sm text-[#62646A] leading-relaxed line-clamp-3 font-normal">
                          {featuredBlog.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="pt-3.5 border-t border-[#F0F2F5] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#1DBF73]/10 text-[#1DBF73] flex items-center justify-center font-medium text-xs">
                          {featuredBlog.authorName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[#222325]">
                            {featuredBlog.authorName}
                          </p>
                          <p className="text-[10px] text-[#71717A]">
                            {featuredBlog.publishedAt
                              ? new Date(
                                  featuredBlog.publishedAt,
                                ).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "Recently"}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-normal text-[#1DBF73] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Read Article <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Remaining Grid Articles */}
          {remainingBlogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {remainingBlogs.map((blog, idx) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.03 }}
                >
                  <Link
                    href={"/blog/" + blog.slug}
                    className="group flex flex-col h-full bg-white border border-[#E4E5E7] rounded-md overflow-hidden hover:border-[#1DBF73]/60 transition-colors text-left"
                  >
                    <div className="relative h-44 overflow-hidden bg-[#F4F4F5]">
                      {blog.coverImage ? (
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1DBF73]/5 to-[#0284C7]/5">
                          <Newspaper className="w-8 h-8 text-[#1DBF73]/40" />
                        </div>
                      )}
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-white/95 backdrop-blur-xs text-[#1DBF73] bg-[#F0FDF4] text-[10px] font-medium rounded-md border border-[#1DBF73]/20">
                        {blog.category}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[11px] text-[#71717A]">
                          <Clock className="w-3 h-3" />
                          <span>{blog.readTime || "4 min read"}</span>
                          <span>•</span>
                          <span>
                            {blog.publishedAt
                              ? new Date(blog.publishedAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                  },
                                )
                              : "Recent"}
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-normal text-[#222325] group-hover:text-[#1DBF73] transition-colors leading-snug line-clamp-2">
                          {blog.title}
                        </h3>

                        {blog.excerpt && (
                          <p className="text-xs text-[#62646A] leading-relaxed line-clamp-2 font-normal">
                            {blog.excerpt}
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-[#F0F2F5] flex items-center justify-between text-xs">
                        <span className="text-[#71717A] font-normal text-[11px]">
                          {blog.authorName}
                        </span>
                        <span className="font-normal text-[#1DBF73] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-xs">
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

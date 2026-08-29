import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ChevronRight, ArrowRight, Newspaper } from "lucide-react";
import BlogDetailClient from "@/components/blog/BlogDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // ISR revalidate every 60 seconds

async function fetchBlog(slug: string) {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.INTERNAL_BACKEND_URL ||
    "http://127.0.0.1:4000";

  try {
    const res = await fetch(`${backendUrl}/api/blog/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Error fetching single blog:", err);
    return null;
  }
}

// Next.js Dynamic SEO Metadata Engine
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchBlog(slug);

  if (!data?.blog) {
    return {
      title: "Blog Post Not Found — Labto AI",
      description: "The requested article could not be found.",
    };
  }

  const blog = data.blog;
  const title = blog.metaTitle || blog.title;
  const description = blog.metaDescription || blog.excerpt || "Read this article on the Labto AI Blog.";
  const canonical = blog.canonicalUrl || `https://labtoai.com/blog/${blog.slug}`;
  const ogImg = blog.ogImage || blog.coverImage || "https://labtoai.com/og-blog.png";

  return {
    title: `${title} — Labto AI Blog`,
    description,
    keywords: blog.metaKeywords ? blog.metaKeywords.split(",") : blog.tags,
    authors: [{ name: blog.authorName || "Labto AI Team" }],
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Labto AI",
      type: "article",
      publishedTime: blog.publishedAt || blog.createdAt,
      authors: [blog.authorName || "Labto AI Team"],
      tags: blog.tags || [],
      images: [
        {
          url: ogImg,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImg],
      creator: "@LabtoAI",
    },
    alternates: {
      canonical,
    },
  };
}

export default async function SingleBlogPage({ params }: Props) {
  const { slug } = await params;
  const data = await fetchBlog(slug);

  if (!data?.blog) {
    notFound();
  }

  const blog = data.blog;
  const relatedBlogs = data.relatedBlogs || [];

  // Google Rich Snippet JSON-LD Schema Markup (schema.org/BlogPosting)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt || blog.metaDescription,
    image: blog.coverImage ? [blog.coverImage] : ["https://labtoai.com/og-blog.png"],
    datePublished: blog.publishedAt || blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    author: {
      "@type": "Organization",
      name: blog.authorName || "Labto AI Team",
      url: "https://labtoai.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Labto AI",
      logo: {
        "@type": "ImageObject",
        url: "https://labtoai.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://labtoai.com/blog/${blog.slug}`,
    },
    keywords: (blog.tags || []).join(", "),
  };

  return (
    <div className="bg-white min-h-screen py-10 lg:py-16 text-text-main">
      {/* Inject Google SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="w-11/12 lg:w-8/12 max-w-4xl mx-auto px-4 lg:px-0 text-left space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#71717A]">
          <Link href="/" className="hover:text-[#1DBF73] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A0A2A8]" />
          <Link href="/blog" className="hover:text-[#1DBF73] transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A0A2A8]" />
          <span className="text-[#222325] font-medium truncate max-w-xs sm:max-w-md">
            {blog.title}
          </span>
        </nav>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E0F2FE] text-[#0369A1]">
              {blog.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#71717A]">
              <Clock className="w-3.5 h-3.5" />
              {blog.readTime || "4 min read"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#222325] leading-tight">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="text-sm sm:text-base text-[#71717A] leading-relaxed font-normal">
              {blog.excerpt}
            </p>
          )}

          {/* Author & Share Bar */}
          <div className="pt-4 border-t border-b border-[#F4F4F5] py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1DBF73]/10 text-[#1DBF73] flex items-center justify-center font-bold text-sm">
                {blog.authorName.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-[#222325]">{blog.authorName}</p>
                <p className="text-[11px] text-[#71717A]">
                  {blog.authorRole || "AI Research & Product"} •{" "}
                  {blog.publishedAt
                    ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Recently"}
                </p>
              </div>
            </div>

            <BlogDetailClient title={blog.title} slug={blog.slug} />
          </div>
        </div>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="w-full rounded-2xl overflow-hidden border border-[#E4E5E7] shadow-sm max-h-120 bg-gray-50">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Rich Text Body Content */}
        <div className="prose prose-neutral max-w-none prose-headings:font-bold prose-headings:text-[#222325] prose-h2:text-2xl prose-h3:text-xl prose-p:text-[#4B5563] prose-p:leading-relaxed prose-a:text-[#1DBF73] prose-a:font-semibold hover:prose-a:underline prose-img:rounded-xl prose-img:border prose-img:border-[#E4E5E7] prose-blockquote:border-l-[#1DBF73] prose-blockquote:text-[#374151] prose-blockquote:font-normal prose-code:bg-gray-100 prose-code:text-[#222325] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="pt-6 border-t border-[#F4F4F5] flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#71717A] mr-1">Tags:</span>
            {blog.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-md bg-[#F4F4F5] text-[#71717A] text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Related Articles Section */}
        {relatedBlogs.length > 0 && (
          <div className="pt-12 border-t border-[#E4E5E7] space-y-6">
            <h3 className="text-xl font-bold text-[#222325]">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedBlogs.map((rel: any) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="group block bg-white border border-[#E4E5E7] rounded-xl p-4 hover:border-[#1DBF73]/50 hover:shadow-xs transition-all text-left space-y-2"
                >
                  <span className="text-[10px] font-bold uppercase text-[#0369A1] bg-[#E0F2FE] px-2 py-0.5 rounded">
                    {rel.category}
                  </span>
                  <h4 className="text-xs font-bold text-[#222325] group-hover:text-[#1DBF73] transition-colors line-clamp-2 leading-snug">
                    {rel.title}
                  </h4>
                  <p className="text-[11px] text-[#71717A] line-clamp-2">
                    {rel.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-[#18181B] to-[#27272A] text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Ready to Turn Store Visitors into Paying Customers?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md">
              Install the Labto AI storefront assistant in 2 minutes and start closing sales 24/7.
            </p>
          </div>
          <Link
            href="/register"
            className="px-6 py-3 rounded-lg bg-[#1DBF73] hover:bg-[#19A463] text-white font-bold text-xs shadow-md transition-all whitespace-nowrap"
          >
            Get Started Free
          </Link>
        </div>
      </article>
    </div>
  );
}

import BlogListClient from "@/components/blog/BlogListClient";
import { Metadata } from "next";

export const revalidate = 60; // ISR revalidate every 60 seconds

export const metadata: Metadata = {
  title: "Blog & Insights — Labto AI | E-commerce AI, CRO & Automated Growth",
  description:
    "Explore actionable strategies, in-depth case studies, and engineering updates on how AI chatbots increase e-commerce conversion, sales, and automated customer support.",
  openGraph: {
    title: "Labto AI Blog — Insights & Case Studies",
    description:
      "Actionable strategies and benchmarks for AI-driven storefront conversion and autonomous support.",
    url: "https://labtoai.com/blog",
    siteName: "Labto AI",
    images: [
      {
        url: "https://labtoai.com/og-blog.png",
        width: 1200,
        height: 630,
        alt: "Labto AI Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Labto AI Blog — Insights & Case Studies",
    description:
      "Actionable strategies and benchmarks for AI-driven storefront conversion and autonomous support.",
  },
  alternates: {
    canonical: "https://labtoai.com/blog",
  },
};

async function getBlogsData() {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.INTERNAL_BACKEND_URL ||
    "http://127.0.0.1:4000";

  try {
    const res = await fetch(`${backendUrl}/api/blog?limit=50`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return { blogs: [], categories: [], total: 0 };
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch blog posts from backend:", err);
    return { blogs: [], categories: [], total: 0 };
  }
}

export default async function BlogPage() {
  const { blogs = [], categories = [], total = 0 } = await getBlogsData();

  return (
    <div className="bg-white min-h-screen py-12 lg:py-16 text-text-main">
      <div className="w-11/12 lg:w-9/12 max-w-9/12 mx-auto px-4 lg:px-0 space-y-6">
        {/* Header Hero */}
        <div className="max-w-2xl space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#222325]">
            Insights, Guides &amp; <br />
            Product Updates.
          </h1>
          <p className="text-sm sm:text-base text-[#71717A] leading-relaxed">
            Discover how modern e-commerce stores and fast-scaling brands use
            autonomous AI chatbots to turn casual visitors into paying
            customers.
          </p>
        </div>

        {/* Blog Posts Interactive Client List */}
        <BlogListClient
          initialBlogs={blogs}
          categories={categories}
          total={total}
        />
      </div>
    </div>
  );
}

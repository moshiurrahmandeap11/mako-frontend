import BlogDetailClient from "@/components/blog/BlogDetailClient";
import { LogoMark } from "@/components/Logo";
import { ChevronRight, Clock } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
  parent: ResolvingMetadata,
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
  const description =
    blog.metaDescription ||
    blog.excerpt ||
    "Read this article on the Labto AI Blog.";
  const canonical =
    blog.canonicalUrl || `https://labtoai.com/blog/${blog.slug}`;
  const ogImg =
    blog.ogImage || blog.coverImage || "https://labtoai.com/og-blog.png";

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
    image: blog.coverImage
      ? [blog.coverImage]
      : ["https://labtoai.com/og-blog.png"],
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
    <div className="bg-white min-h-screen py-10 lg:py-16 text-text-main overflow-x-hidden w-full">
      {/* Inject Google SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="w-11/12 lg:w-full max-w-9/12 mx-auto px-4 lg:px-0 text-left space-y-8 min-w-0">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center flex-wrap gap-2 text-xs text-[#71717A] min-w-0">
          <Link
            href="/"
            className="hover:text-[#1DBF73] transition-colors shrink-0"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A0A2A8] shrink-0" />
          <Link
            href="/blog"
            className="hover:text-[#1DBF73] transition-colors shrink-0"
          >
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A0A2A8] shrink-0" />
          <span className="text-[#222325] font-medium truncate max-w-[200px] sm:max-w-md">
            {blog.title}
          </span>
        </nav>

        {/* Article Header */}
        <div className="space-y-4 min-w-0">
          <div className="flex items-center flex-wrap gap-3">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#F0FDF4] text-[#1DBF73] border border-[#1DBF73]/20">
              {blog.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#71717A]">
              <Clock className="w-3.5 h-3.5" />
              {blog.readTime || "4 min read"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#222325] leading-tight break-words">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="text-sm sm:text-base text-[#71717A] leading-relaxed font-normal break-words">
              {blog.excerpt}
            </p>
          )}

          {/* Author & Share Bar */}
          <div className="pt-4 border-t border-b border-[#F4F4F5] py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <LogoMark size="sm" />
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#222325] truncate">
                  {blog.authorName}
                </p>
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
          <div className="w-full rounded-md overflow-hidden border border-[#E4E5E7] max-h-120 bg-[#F4F4F5]">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-auto max-h-120 object-cover"
            />
          </div>
        )}

        {/* Rich Text Body Content with Responsive Overflow Guard */}
        <div className="blog-rich-content prose prose-neutral max-w-none w-full min-w-0 break-words overflow-hidden prose-headings:font-normal prose-headings:text-[#222325] prose-h2:text-2xl prose-h3:text-xl prose-p:text-[#4B5563] prose-p:leading-relaxed prose-a:text-[#1DBF73] prose-a:font-medium hover:prose-a:underline prose-img:rounded-md prose-img:border prose-img:border-[#E4E5E7] prose-blockquote:border-l-[#1DBF73] prose-blockquote:text-[#374151] prose-blockquote:font-normal prose-code:bg-gray-100 prose-code:text-[#222325] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="pt-6 border-t border-[#F4F4F5] flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-[#71717A] mr-1">
              Tags:
            </span>
            {blog.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md bg-[#F4F4F5] text-[#71717A] text-xs font-normal border border-[#E4E5E7]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Related Articles Section */}
        {relatedBlogs.length > 0 && (
          <div className="pt-10 border-t border-[#E4E5E7] space-y-4">
            <h3 className="text-lg font-normal text-[#222325]">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedBlogs.map((rel: any) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="group block bg-white border border-[#E4E5E7] rounded-md p-4 hover:border-[#1DBF73]/60 transition-colors text-left space-y-2 min-w-0"
                >
                  <span className="text-[10px] font-medium text-[#1DBF73] bg-[#F0FDF4] border border-[#1DBF73]/20 px-2 py-0.5 rounded-md">
                    {rel.category}
                  </span>
                  <h4 className="text-xs font-medium text-[#222325] group-hover:text-[#1DBF73] transition-colors line-clamp-2 leading-snug break-words">
                    {rel.title}
                  </h4>
                  <p className="text-[11px] text-[#71717A] line-clamp-2 break-words">
                    {rel.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

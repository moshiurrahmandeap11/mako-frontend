"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import { ArrowLeft, Save, Globe, Sparkles } from "lucide-react";
import Button from "@/components/Button";
import RichTextEditor from "@/components/editor/RichTextEditor";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("AI & E-commerce");
  const [tagsInput, setTagsInput] = useState("AI, E-commerce, Chatbot, Sales");
  const [authorName, setAuthorName] = useState("Labto AI Team");
  const [authorRole, setAuthorRole] = useState("AI Research & Product");
  const [published, setPublished] = useState(true);

  // SEO Fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isSlugManual) {
      setSlug(slugify(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a blog title.");
      return;
    }
    if (!content.trim() || content === "<p><br></p>") {
      toast.error("Please write blog content.");
      return;
    }

    setLoading(true);
    try {
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        title,
        slug: slug || slugify(title),
        excerpt,
        content,
        coverImage,
        category,
        tags,
        authorName,
        authorRole,
        published,
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt,
        metaKeywords,
      };

      const res = await api.post("/api/admin/blogs", payload);
      if (res.data.success) {
        toast.success("Blog post created successfully!");
        router.push("/admin/blogs");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to create blog post.");
    } finally {
      setLoading(false);
    }
  };

  const previewTitle = metaTitle || title || "Your Blog Post Title Goes Here";
  const previewDesc =
    metaDescription ||
    excerpt ||
    "This is how your blog description will appear on Google search results. Make it engaging to increase click-through rates.";
  const previewSlug = slug || "your-blog-slug";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-16 text-left">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#E4E5E7] shadow-sm sticky top-4 z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-2 border border-[#E4E5E7] rounded-lg hover:bg-gray-50 text-[#71717A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-[#222325]">Create New Blog Post</h1>
            <p className="text-xs text-[#74767E]">
              Draft high-converting, SEO-optimized articles for Labto AI.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-medium cursor-pointer bg-gray-50 px-3 py-2 rounded-lg border border-[#E4E5E7]">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 accent-[#1DBF73] rounded"
            />
            <span>Publish Immediately</span>
          </label>

          <Button
            type="submit"
            isLoading={loading}
            variant="primary"
            size="md"
            className="gap-2 font-medium"
          >
            <Save className="w-4 h-4" /> {published ? "Publish Blog" : "Save Draft"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Content & Editor (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-[#E4E5E7] shadow-sm space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#222325] mb-2">
                Blog Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. 7 Proven Ways AI Chatbots Increase Store Conversion by 45%"
                className="w-full px-4 py-3 bg-white border border-[#E4E5E7] rounded-lg focus:outline-none focus:border-[#1DBF73] text-sm text-[#222325] font-medium"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#222325]">
                  URL Slug <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-[#71717A] font-mono">
                  https://labtoai.com/blog/{previewSlug}
                </span>
              </div>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => {
                  setSlug(slugify(e.target.value));
                  setIsSlugManual(true);
                }}
                placeholder="url-slug-goes-here"
                className="w-full px-4 py-2.5 bg-white border border-[#E4E5E7] rounded-lg focus:outline-none focus:border-[#1DBF73] text-xs text-[#222325] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#222325] mb-2">
                Short Excerpt (Summary for Cards &amp; Social Snippets)
              </label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A compelling 2-sentence summary of the article..."
                className="w-full px-4 py-2.5 bg-white border border-[#E4E5E7] rounded-lg focus:outline-none focus:border-[#1DBF73] text-xs text-[#222325] leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#222325] mb-2">
                Blog Body Content (Rich Text) <span className="text-red-500">*</span>
              </label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Write your article here with headings, bullet points, links, images, quotes, and code blocks..."
              />
            </div>
          </div>
        </div>

        {/* Right Column: Meta, Categories, Google Preview (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Live Google Search Preview Card */}
          <div className="bg-white p-5 rounded-xl border border-[#E4E5E7] shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#222325]">
              <Globe className="w-4 h-4 text-[#1DBF73]" />
              Live Google Search Preview
            </div>
            <div className="p-4 bg-[#F9FAFB] border border-[#E4E5E7] rounded-lg space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] text-[#202124]">
                <div className="w-4 h-4 rounded-full bg-[#1DBF73] text-white flex items-center justify-center text-[9px] font-bold">
                  L
                </div>
                <span className="font-medium">Labto AI</span>
                <span className="text-[#5F6368]">› blog › {previewSlug}</span>
              </div>
              <h3 className="text-sm font-medium text-[#1A0DAB] hover:underline cursor-pointer line-clamp-1 leading-snug">
                {previewTitle} | Labto AI Blog
              </h3>
              <p className="text-xs text-[#4D5156] line-clamp-2 leading-relaxed">
                {previewDesc}
              </p>
            </div>
          </div>

          {/* Publishing & Category Settings */}
          <div className="bg-white p-5 rounded-xl border border-[#E4E5E7] shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#222325]">
              Post Attributes
            </h3>

            <div>
              <label className="block text-xs text-[#71717A] mb-1.5 font-medium">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-lg text-xs focus:outline-none focus:border-[#1DBF73]"
              >
                <option value="AI & E-commerce">AI &amp; E-commerce</option>
                <option value="Product Updates">Product Updates</option>
                <option value="Case Studies">Case Studies</option>
                <option value="Growth & Sales">Growth &amp; Sales</option>
                <option value="Tutorials & Guides">Tutorials &amp; Guides</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-[#71717A] mb-1.5 font-medium">
                Cover Image URL
              </label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-lg text-xs focus:outline-none focus:border-[#1DBF73]"
              />
              {coverImage && (
                <img
                  src={coverImage}
                  alt="Cover Preview"
                  className="mt-2 w-full h-32 object-cover rounded-lg border border-[#E4E5E7]"
                />
              )}
            </div>

            <div>
              <label className="block text-xs text-[#71717A] mb-1.5 font-medium">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="AI, E-commerce, Chatbot"
                className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-lg text-xs focus:outline-none focus:border-[#1DBF73]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-[#71717A] mb-1 font-medium">
                  Author Name
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-lg text-xs focus:outline-none focus:border-[#1DBF73]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#71717A] mb-1 font-medium">
                  Author Role
                </label>
                <input
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-lg text-xs focus:outline-none focus:border-[#1DBF73]"
                />
              </div>
            </div>
          </div>

          {/* Advanced SEO Metadata Settings */}
          <div className="bg-white p-5 rounded-xl border border-[#E4E5E7] shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#222325] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#1DBF73]" /> SEO Metadata (Optional)
            </h3>

            <div>
              <label className="block text-xs text-[#71717A] mb-1 font-medium">
                Meta Title (Defaults to Blog Title)
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Custom Google Search Title"
                className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-lg text-xs focus:outline-none focus:border-[#1DBF73]"
              />
            </div>

            <div>
              <label className="block text-xs text-[#71717A] mb-1 font-medium">
                Meta Description (Defaults to Excerpt)
              </label>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Custom Google Meta Description"
                className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-lg text-xs focus:outline-none focus:border-[#1DBF73]"
              />
            </div>

            <div>
              <label className="block text-xs text-[#71717A] mb-1 font-medium">
                Meta Keywords
              </label>
              <input
                type="text"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
                placeholder="ai chatbot, ecommerce assistant, shopify ai"
                className="w-full px-3 py-2 bg-white border border-[#E4E5E7] rounded-lg text-xs focus:outline-none focus:border-[#1DBF73]"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

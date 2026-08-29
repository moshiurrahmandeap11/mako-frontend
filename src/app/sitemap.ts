import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  // Static marketing routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Dynamic Blog Slugs
  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      process.env.INTERNAL_BACKEND_URL ||
      "http://127.0.0.1:4000";

    const res = await fetch(`${backendUrl}/api/blog?limit=100`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      const blogRoutes: MetadataRoute.Sitemap = (data.blogs || []).map(
        (b: any) => ({
          url: `${baseUrl}/blog/${b.slug}`,
          lastModified: b.publishedAt ? new Date(b.publishedAt) : new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        })
      );
      return [...staticRoutes, ...blogRoutes];
    }
  } catch (err) {
    console.error("Sitemap dynamic blog fetch failed:", err);
  }

  return staticRoutes;
}

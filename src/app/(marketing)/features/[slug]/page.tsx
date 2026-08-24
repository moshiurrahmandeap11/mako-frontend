import Button from "@/components/Button";
import { FEATURES_DATA } from "@/data/features";
import { constructMetadata, SITE_CONFIG } from "@/lib/seo";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Generate static routes for all features
export function generateStaticParams() {
  return FEATURES_DATA.map((feature) => ({
    slug: feature.slug,
  }));
}

// Generate dynamic SEO metadata for each feature
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const feature = FEATURES_DATA.find((f) => f.slug === slug);

  if (!feature) {
    return constructMetadata({
      title: "Feature Not Found | Labto AI",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${feature.title} — E-Commerce Architecture | Labto AI`,
    description: `${feature.tagline} ${feature.description}`,
    canonicalUrl: `/features/${feature.slug}`,
    keywords: [
      feature.category,
      feature.title,
      "E-Commerce AI Architecture",
      "Storefront AI Integration",
      "Labto AI Feature",
    ],
  });
}

export default async function FeatureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = FEATURES_DATA.find((f) => f.slug === slug);

  if (!feature) {
    notFound();
  }

  // Find next feature for bottom pagination
  const currentIndex = FEATURES_DATA.findIndex((f) => f.slug === slug);
  const nextFeature = FEATURES_DATA[(currentIndex + 1) % FEATURES_DATA.length];

  // Schema.org Article / TechArticle Structured Data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: feature.title,
    description: feature.description,
    url: `${SITE_CONFIG.url}/features/${feature.slug}`,
    articleSection: feature.category,
    publisher: {
      "@type": "Organization",
      name: "Labto AI Inc.",
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}/og-image.jpg`,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_CONFIG.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Features",
          item: `${SITE_CONFIG.url}/features`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: feature.title,
          item: `${SITE_CONFIG.url}/features/${feature.slug}`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="relative min-h-screen bg-white text-text-main flex flex-col overflow-hidden">
        <main className="relative z-10 flex-1 px-4 lg:px-0 lg:max-w-9/12 mx-auto w-full py-6 space-y-4">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between">
            <Link
              href="/features"
              className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-main transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Features</span>
            </Link>
          </div>

          {/* Feature Hero Header */}
          <div className="space-y-3 text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-text-main tracking-tight leading-tight">
              {feature.title}
            </h1>
            <p className="text-[#62646A] text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
              {feature.description}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {feature.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-md bg-white border border-border-light text-center"
              >
                <span className="block text-xl sm:text-2xl">{stat.value}</span>
                <span className="block text-sm text-text-muted mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Step-by-Step Technical Breakdown */}
          <div className="p-4 rounded-md bg-white border border-border-light space-y-6 text-left">
            <div>
              <span className="text-sm font-medium block mb-1">
                Architecture & Mechanics
              </span>
              <h2 className="text-xl sm:text-2xl font-medium text-text-main">
                {feature.previewDetails.heading}
              </h2>
              <p className="text-[#62646A] text-xs mt-1 font-normal">
                {feature.previewDetails.subheading}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {feature.previewDetails.points.map((pt, i) => (
                <div
                  key={i}
                  className="p-4 rounded-md bg-surface-light space-y-2"
                >
                  <h4 className="text-sm font-medium text-text-main tracking-wider">
                    {pt.title}
                  </h4>
                  <p className="text-[11px] text-[#62646A] leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Code & Integration Box */}
          <div className="p-4 rounded-md bg-white border border-border-light space-y-3 text-left">
            <div className="flex items-center justify-between border-b border-border-light pb-3">
              <div className="flex items-center gap-2 text-sm text-text-main">
                <span>Implementation Snippet</span>
              </div>
              <span className="text-[10px] text-text-muted">
                JavaScript / TypeScript
              </span>
            </div>

            <div className="bg-surface-light rounded-md p-4 text-xs text-text-main overflow-x-auto leading-relaxed">
              <pre>
                <code>{feature.codeSnippet}</code>
              </pre>
            </div>
          </div>

          {/* Next Feature Pagination & Action CTAs */}
          <div className="pt-4 flex flex-row items-center justify-between gap-2 sm:gap-4 w-full">
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                href="/register"
                variant="primary"
                size="sm"
                className="text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5 whitespace-nowrap shadow-sm"
              >
                Start Free Trial
              </Button>
              <div className="hidden md:block">
                <Button
                  href="/docs"
                  variant="secondary"
                  size="md"
                  className="text-text-main"
                >
                  Documentation
                </Button>
              </div>
            </div>

            {/* Next Feature Link */}
            <Link
              href={`/features/${nextFeature.slug}`}
              className="group flex items-center gap-1.5 sm:gap-2.5 p-2 sm:p-2.5 px-3 sm:px-4 rounded-md bg-white border border-border-light hover:border-[#1DBF73] transition text-right shrink-0 shadow-sm"
            >
              <span className="text-[11px] sm:text-xs font-bold text-text-main group-hover:text-[#1DBF73] transition truncate max-w-32.5 xs:max-w-[180px] sm:max-w-none">
                {nextFeature.title}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-[#1DBF73] group-hover:translate-x-0.5 transition shrink-0" />
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

import Button from "@/components/Button";
import { FEATURES_DATA } from "@/data/features";
import { ArrowLeft, ArrowRight, Code2, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Generate static routes for all features
export function generateStaticParams() {
  return FEATURES_DATA.map((feature) => ({
    slug: feature.slug,
  }));
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

  return (
    <div className="relative min-h-screen bg-white text-[#222325] flex flex-col overflow-hidden">
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-32 pb-24 space-y-10">
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/#features"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#74767E] hover:text-[#222325] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F0] border border-[#1DBF73]/20 text-[#1DBF73] text-[11px] font-bold">
            <Sparkles className="w-3 h-3" />
            <span>{feature.category}</span>
          </div>
        </div>

        {/* Feature Hero Header */}
        <div className="space-y-3 text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#222325] tracking-tight leading-tight">
            {feature.title}
          </h1>
          <p className="text-[#62646A] text-xs sm:text-sm md:text-base leading-relaxed font-normal max-w-2xl">
            {feature.description}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {feature.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#E4E5E7] text-center shadow-sm"
            >
              <span className="block text-xl sm:text-2xl font-extrabold text-[#1DBF73]">
                {stat.value}
              </span>
              <span className="block text-[10px] uppercase font-bold text-[#74767E] mt-1 tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step-by-Step Technical Breakdown */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E4E5E7] shadow-sm space-y-6 text-left">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-[#1DBF73] uppercase block mb-1">
              Architecture & Mechanics
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#222325]">
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
                className="p-4 rounded-xl bg-[#F7F7F7] border border-[#E4E5E7] space-y-2"
              >
                <div className="w-6 h-6 rounded-md bg-[#E8F8F0] flex items-center justify-center text-[#1DBF73] font-bold text-[11px]">
                  0{i + 1}
                </div>
                <h4 className="text-xs font-bold text-[#222325]">{pt.title}</h4>
                <p className="text-[11px] text-[#62646A] leading-relaxed font-normal">
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Code & Integration Box */}
        <div className="p-6 rounded-2xl bg-white border border-[#E4E5E7] shadow-sm space-y-3 text-left">
          <div className="flex items-center justify-between border-b border-[#E4E5E7] pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#222325]">
              <Code2 className="w-3.5 h-3.5 text-[#1DBF73]" />
              <span>Implementation Snippet</span>
            </div>
            <span className="text-[10px] font-mono text-[#74767E]">
              JavaScript / TypeScript
            </span>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 font-mono text-xs text-[#1DBF73] overflow-x-auto leading-relaxed shadow-inner">
            <pre>
              <code>{feature.codeSnippet}</code>
            </pre>
          </div>
        </div>

        {/* Next Feature Pagination & Action CTAs */}
        <div className="pt-6 border-t border-[#E4E5E7] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Button href="/register" variant="primary" size="sm">
              Start Free Trial
            </Button>
            <Button href="/docs" variant="ghost" size="sm" className="text-[#222325]">
              Documentation
            </Button>
          </div>

          {/* Next Feature Link */}
          <Link
            href={`/features/${nextFeature.slug}`}
            className="group flex items-center gap-2.5 p-2.5 px-4 rounded-xl bg-white border border-[#E4E5E7] hover:border-[#1DBF73] shadow-sm transition text-right"
          >
            <div>
              <span className="block text-[9px] uppercase font-bold text-[#74767E]">
                Next
              </span>
              <span className="text-xs font-bold text-[#222325] group-hover:text-[#1DBF73] transition">
                {nextFeature.title}
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#74767E] group-hover:text-[#1DBF73] group-hover:translate-x-0.5 transition" />
          </Link>
        </div>
      </main>
    </div>
  );
}

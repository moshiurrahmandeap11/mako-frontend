import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FEATURES_DATA } from '@/data/features';
import Button from '@/components/Button';
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Sparkles,
  Youtube,
} from 'lucide-react';
import NetworkWave from '@/components/NetworkWave';

// Generate static routes for all 5 features
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
    <div className="relative min-h-screen bg-[#080E21] text-slate-100 flex flex-col overflow-hidden">
      {/* Background 3D Wave */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <NetworkWave />
      </div>

      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 pt-32 pb-24 space-y-10">
        
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/#features"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[#39FF88] text-[11px] font-medium">
            <Sparkles className="w-3 h-3" />
            <span>{feature.category}</span>
          </div>
        </div>

        {/* Feature Hero Header */}
        <div className="space-y-3 text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-tight">
            {feature.title}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal max-w-2xl">
            {feature.description}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* YOUTUBE VIDEO DEMO EMBED PLAYER (MINIMAL FRAME) */}
        {/* ========================================================================= */}
        <div className="rounded-2xl overflow-hidden bg-[#0F172A]/70 border border-white/[0.08] shadow-xl p-2 sm:p-3 space-y-2.5">
          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
              <Youtube className="w-3.5 h-3.5 text-red-400" />
              <span>Feature Demonstration</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              HD Video
            </span>
          </div>

          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#060B18] border border-white/[0.04]">
            <iframe
              src={`https://www.youtube.com/embed/${feature.youtubeId}?rel=0&modestbranding=1`}
              title={`${feature.title} Video Walkthrough`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {feature.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#0F172A]/70 border border-white/[0.08] text-center"
            >
              <span className="block text-xl sm:text-2xl font-bold text-[#39FF88]">
                {stat.value}
              </span>
              <span className="block text-[10px] uppercase font-medium text-slate-400 mt-1 tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step-by-Step Technical Breakdown */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0F172A]/70 border border-white/[0.08] shadow-lg space-y-6 text-left">
          <div>
            <span className="text-[11px] font-medium tracking-[0.2em] text-[#39FF88] uppercase block mb-1">
              Architecture & Mechanics
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              {feature.previewDetails.heading}
            </h2>
            <p className="text-slate-400 text-xs mt-1 font-normal">
              {feature.previewDetails.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {feature.previewDetails.points.map((pt, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-[#060B18] border border-white/[0.05] space-y-2"
              >
                <div className="w-6 h-6 rounded-md bg-white/[0.05] flex items-center justify-center text-[#39FF88] font-bold text-[11px]">
                  0{i + 1}
                </div>
                <h4 className="text-xs font-semibold text-white">{pt.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-normal">{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Code & Integration Box */}
        <div className="p-6 rounded-2xl bg-[#0F172A]/70 border border-white/[0.08] shadow-lg space-y-3 text-left">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <Code2 className="w-3.5 h-3.5 text-[#39FF88]" />
              <span>Implementation Snippet</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">JavaScript / TypeScript</span>
          </div>

          <div className="bg-[#060B18] border border-white/[0.04] rounded-xl p-4 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
            <pre><code>{feature.codeSnippet}</code></pre>
          </div>
        </div>

        {/* Next Feature Pagination & Action CTAs */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Button href="/register" variant="primary" size="sm">
              Start Free Trial
            </Button>
            <Button href="/docs" variant="ghost" size="sm">
              Documentation
            </Button>
          </div>

          {/* Next Feature Link */}
          <Link
            href={`/features/${nextFeature.slug}`}
            className="group flex items-center gap-2.5 p-2.5 px-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition text-right"
          >
            <div>
              <span className="block text-[9px] uppercase font-medium text-slate-500">Next</span>
              <span className="text-xs font-medium text-slate-200 group-hover:text-[#39FF88] transition">
                {nextFeature.title}
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#39FF88] group-hover:translate-x-0.5 transition" />
          </Link>
        </div>

      </main>
    </div>
  );
}

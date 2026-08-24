import { Metadata } from "next";
import TechnologyClient from "@/components/technology/TechnologyClient";
import { constructMetadata, SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Engineering Stack & Architecture | Labto AI",
  description:
    "Explore Labto AI's deep tech stack: pgvector 1536-dim embeddings, Google Gemini 2.0 Flash pipeline, WebAssembly 60 FPS pose tracking, and decoupled CDN script architecture.",
  canonicalUrl: "/technology",
  keywords: [
    "pgvector Architecture",
    "Gemini 2.0 Flash E-Commerce",
    "WebAssembly MediaPipe AI",
    "Decoupled E-Commerce Iframe",
    "Sub-Second AI Inference Pipeline",
    "PostgreSQL Vector Search E-Commerce",
  ],
});

const TECH_SPECS = [
  {
    iconName: "Database",
    title: "pgvector Hybrid Embeddings",
    desc: "Utilizing Postgres pgvector extension to run hybrid dense vector and keyword matches, delivering sub-second, ultra-precise retrieval of your store products.",
  },
  {
    iconName: "Cpu",
    title: "Gemini 2.0 Flash AI Pipeline",
    desc: "Powered by Google Gemini 2.0 Flash with a hard 1.2-second race deadline and in-memory FAQ fast-paths to guide users all the way to checkout.",
  },
  {
    iconName: "Shield",
    title: "Decoupled CDN Script & CORS Security",
    desc: "Labto AI loads asynchronously via a lightweight CDN script (< 40KB gzip), with strict CORS preflight checks ensuring zero impact on your storefront page speed.",
  },
  {
    iconName: "Zap",
    title: "Real-Time Event Bridge",
    desc: "Client-side event listener that syncs user browsing patterns, clicks, and cart actions to construct prompts with real-time awareness.",
  },
  {
    iconName: "Camera",
    title: "WebAssembly AR Pose Engine",
    desc: "Integrates Google MediaPipe Pose models executing 100% client-side via WebGL shaders, tracking 33 body landmarks at 60 FPS with $0 cloud GPU cost.",
  },
  {
    iconName: "Code",
    title: "Automated PDF & Document Parsing",
    desc: "Native backend document parsing pipeline utilizing pdfkit and custom text chunkers to index store catalogs and knowledge bases automatically.",
  },
];

export default function TechnologyPage() {
  const techSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Labto AI — Sub-Second Architecture & Engineering Stack",
    description:
      "Deep technical overview of pgvector search, Gemini 2.0 Flash AI pipeline, and decoupled iframe security.",
    url: `${SITE_CONFIG.url}/technology`,
    publisher: {
      "@type": "Organization",
      name: "Labto AI Inc.",
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}/og-image.jpg`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techSchema) }}
      />
      <TechnologyClient techSpecs={TECH_SPECS} />
    </>
  );
}

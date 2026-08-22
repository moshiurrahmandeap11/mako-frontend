"use client";

import Button from "@/components/Button";
import { authClient } from "@/lib/auth-client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Database,
  Layers,
  Palette,
  ShoppingCart,
  Volume2,
  VolumeX,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"search" | "bridge" | "design">(
    "search",
  );

  // Dynamic Headline Rotating Words State
  const dynamicWords = ["E-Commerce", "Blog", "Portfolio", "Website"];
  const [wordIndex, setWordIndex] = useState(0);

  // Video Sound Control State (Default Muted = true)
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [dynamicWords.length]);

  const { data: session } = authClient.useSession();
  const router = useRouter();

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Ideal for testing and small development environments.",
      features: [
        "100 messages / month limit",
        "1 API key",
        "1 whitelisted domain",
        "Standard database search",
        "Standard email support",
        "Labto AI branding",
      ],
      cta: "Get Started Free",
      popular: false,
      href: "/register",
    },
    {
      name: "Starter",
      price: "$19",
      description: "Perfect for growing boutique stores starting with AI.",
      features: [
        "500 messages / month limit",
        "2 API keys",
        "2 whitelisted domains",
        "pgvector Similarity Search",
        "Custom widget appearance",
        "24-hour email support",
      ],
      cta: "Start Starter Plan",
      popular: false,
      href: "/register",
    },
    {
      name: "Pro",
      price: "$49",
      description: "Our most popular plan for scaling e-commerce stores.",
      features: [
        "1,500 messages / month limit",
        "4 API keys",
        "5 whitelisted domains",
        "Full pgvector similarity search",
        "Storefront cart event bridge",
        "Priority SLA support (4h)",
        "No Labto AI branding",
      ],
      cta: "Go Pro Now",
      popular: true,
      href: "/register",
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Dedicated orchestration for high-traffic retailers.",
      features: [
        "Unlimited message limits",
        "Unlimited API keys",
        "Unlimited whitelisted domains",
        "Dedicated LLM instances",
        "Custom vector embeddings pipeline",
        "Dedicated account manager",
        "99.9% uptime SLA guarantee",
      ],
      cta: "Contact Sales",
      popular: false,
      href: "/contact",
    },
  ];

  return (
    <div className="min-h-screen bg-prompt-blue text-slate-100 flex flex-col overflow-x-hidden">
      {/* Hero Section (Full-Width Video Canvas with Compact Bottom-Left Overlay & Bottom-Right Mute Toggle) */}
      <section className="relative pt-24 sm:pt-28 pb-12 px-2 overflow-hidden">
        {/* Background Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(57,255,136,0.08),transparent_70%)] pointer-events-none" />

        {/* 3D Network Particle Wave */}
        {/* <NetworkWave /> */}

        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Full-Width Video Frame Container */}
          <div className="relative w-full rounded-md overflow-hidden p-1.5 sm:p-2">
            {/* HTML5 Video with ref */}
            <video
              ref={videoRef}
              src="/hero.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-115 sm:h-135 lg:h-150 object-cover rounded-md"
            />
            <div className="absolute bottom-5 sm:bottom-8 left-5 sm:left-8 right-16 sm:right-auto z-20 space-y-2.5 max-w-lg text-left">
              {/* Dynamic Rotating Headline (Compact Sizes) */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-base sm:text-lg lg:text-xl text-white  tracking-tight flex flex-wrap items-center gap-x-1.5"
              >
                <span>AI Assistant for your</span>
                <span className="relative inline-block text-ai-green underline decoration-ai-green/60 underline-offset-4">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="inline-block"
                    >
                      {dynamicWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.h1>

              {/* Two Compact Action CTAs */}
              <div className=" flex flex-wrap items-center gap-2.5">
                <Button href="/register" variant="primary" size="sm">
                  Start Free Trial
                </Button>
                <Button href="/contact" variant="secondary" size="sm">
                  Partner with us
                </Button>
              </div>
            </div>

            {/* Bottom-Right Corner Overlay: Sound Mute/Unmute Toggle Button */}
            <button
              onClick={toggleSound}
              className="absolute bottom-5 sm:bottom-8 right-5 sm:right-8 z-20 p-2.5 rounded-full bg-prompt-blue/80  text-ai-green  transition-all backdrop-blur-md shadow-2xl flex items-center gap-2 group cursor-pointer"
              title={isMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Features Overview Section */}
      <section
        id="features"
        className="py-24 px-6 border-t border-ai-green/15 bg-[#0B132B] relative"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#39FF88]">
              Core Features
            </h2>
            <p className="text-3xl font-extrabold text-white tracking-tight">
              Everything you need to automate e-commerce sales
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Labto AI combines cutting edge vector search with a standard event
              bridge to give you zero-friction AI support and lead generation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#131D38] border border-[#39FF88]/20 hover:border-[#39FF88]/60 transition duration-300 space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#39FF88]/10 border border-[#39FF88]/30 flex items-center justify-center text-[#39FF88]">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                pgvector Semantic Search
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Matches buyer search intents directly to catalog items by
                computing cosine distance embeddings. Returns relevant
                recommendations for unstructured prompts.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#131D38] border border-[#39FF88]/20 hover:border-[#39FF88]/60 transition duration-300 space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#39FF88]/10 border border-[#39FF88]/30 flex items-center justify-center text-[#39FF88]">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Storefront Cart Event Bridge
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Triggers cart mutations dynamically by emitting standardized
                client custom events. Merchants integrate additions with
                standard vanilla JavaScript event listeners.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#131D38] border border-[#39FF88]/20 hover:border-[#39FF88]/60 transition duration-300 space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#39FF88]/10 border border-[#39FF88]/30 flex items-center justify-center text-[#39FF88]">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Theme Widget Customize
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Brand colors, chatbot titles, welcoming messages, placement
                properties, and action options are configured in the dashboard
                and sync in real-time to active sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Focus Section with Active Tabs */}
      <section
        id="about"
        className="py-24 px-6 border-t border-[#39FF88]/15 relative"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Tech Description */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#39FF88]">
              Under the Hood
            </h2>
            <h3 className="text-3xl font-extrabold text-white tracking-tight">
              Built on the Modern AI Stack
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              We leverage cloud-native database performance and state-of-the-art
              language processing pipelines to deliver lightning-fast responses
              on your storefront.
            </p>

            {/* Tab Selectors */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => setActiveTab("search")}
                className={`w-full text-left p-4 rounded-xl border transition flex items-center gap-3 ${
                  activeTab === "search"
                    ? "bg-[#39FF88]/10 border-[#39FF88] text-white"
                    : "bg-transparent border-[#39FF88]/15 text-slate-400 hover:text-slate-200"
                }`}
              >
                <Database className="w-5 h-5 text-[#39FF88]" />
                <div>
                  <h4 className="text-sm font-bold">
                    Vector Similarity Search
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    pgvector catalog index distance mapping
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("bridge")}
                className={`w-full text-left p-4 rounded-xl border transition flex items-center gap-3 ${
                  activeTab === "bridge"
                    ? "bg-[#39FF88]/10 border-[#39FF88] text-white"
                    : "bg-transparent border-[#39FF88]/15 text-slate-400 hover:text-slate-200"
                }`}
              >
                <Layers className="w-5 h-5 text-[#39FF88]" />
                <div>
                  <h4 className="text-sm font-bold">
                    CustomEvent Cart Integration
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Decoupled iframe communication bridge
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("design")}
                className={`w-full text-left p-4 rounded-xl border transition flex items-center gap-3 ${
                  activeTab === "design"
                    ? "bg-[#39FF88]/10 border-[#39FF88] text-white"
                    : "bg-transparent border-[#39FF88]/15 text-slate-400 hover:text-slate-200"
                }`}
              >
                <Palette className="w-5 h-5 text-[#39FF88]" />
                <div>
                  <h4 className="text-sm font-bold">
                    Small-Footprint Preact Engine
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    &lt;40kb gzipped client execution bundle
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Code/Preview pane rendering based on active tab */}
          <div className="lg:col-span-7 bg-[#131D38] border border-[#39FF88]/30 rounded-2xl p-6 shadow-2xl h-[340px] flex flex-col justify-between font-mono text-xs">
            {activeTab === "search" && (
              <>
                <div className="flex items-center justify-between border-b border-[#39FF88]/15 pb-3">
                  <span className="text-slate-400 uppercase tracking-widest text-[9px] font-bold">
                    pgvector similarity query
                  </span>
                  <span className="text-[#39FF88] text-[10px] font-bold">
                    PostgreSQL Pooler
                  </span>
                </div>
                <pre className="flex-1 pt-4 text-[#39FF88] overflow-x-auto leading-relaxed select-all">
                  {`SELECT id, title, price, imageUrl, productUrl,
       (embedding <=> $1::vector) as distance
FROM "Product"
WHERE "merchantId" = $2 AND "inStock" = true
ORDER BY distance ASC
LIMIT 5;`}
                </pre>
                <div className="text-[10px] text-slate-400 italic">
                  * Calculates vector distance mapping for shopper queries using
                  Gemini/OpenAI embeddings.
                </div>
              </>
            )}

            {activeTab === "bridge" && (
              <>
                <div className="flex items-center justify-between border-b border-[#39FF88]/15 pb-3">
                  <span className="text-slate-400 uppercase tracking-widest text-[9px] font-bold">
                    Integration JavaScript Event
                  </span>
                  <span className="text-[#39FF88] text-[10px] font-bold">
                    window.dispatchEvent
                  </span>
                </div>
                <pre className="flex-1 pt-4 text-[#39FF88] overflow-x-auto leading-relaxed select-all">
                  {`window.addEventListener("ai-widget:add-to-cart", (e) => {
  const { productId, quantity } = e.detail;
  // Map internal/external SKU to your native storefront cart
  myStorefrontCart.add(productId, quantity);
  alert("Product added to cart!");
});`}
                </pre>
                <div className="text-[10px] text-slate-400 italic">
                  * Decouples widget execution from backend storefront secrets.
                  Progressive enhancement fallback.
                </div>
              </>
            )}

            {activeTab === "design" && (
              <>
                <div className="flex items-center justify-between border-b border-[#39FF88]/15 pb-3">
                  <span className="text-slate-400 uppercase tracking-widest text-[9px] font-bold">
                    HTML Script Snippet
                  </span>
                  <span className="text-[#39FF88] text-[10px] font-bold">
                    Merchant Onboarding Docs
                  </span>
                </div>
                <pre className="flex-1 pt-4 text-[#39FF88] overflow-x-auto leading-relaxed select-all">
                  {`<script
  src="https://mako-api.ahsanul.dev/public/widget.js"
  data-api-key="aiw_live_a8f9c1b7e6d4c..."
  defer
></script>`}
                </pre>
                <div className="text-[10px] text-slate-400 italic">
                  * Bootstraps dynamically inside document body on
                  DOMContentLoaded, reading whitelisted API key.
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-24 px-6 border-t border-[#39FF88]/15 bg-[#0B132B] relative"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#39FF88]">
              Flexible Tiers
            </h2>
            <p className="text-3xl font-extrabold text-white tracking-tight">
              Scale-as-you-grow plans for any store
            </p>
            <p className="text-slate-300 text-sm">
              Transparent monthly pricing tailored to your customer chat
              traffic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`p-6 rounded-2xl bg-[#131D38] border flex flex-col justify-between relative overflow-hidden shadow-2xl transition-all duration-300 ${
                  p.popular
                    ? "border-[#39FF88] shadow-lg shadow-[#39FF88]/20 scale-105 z-10"
                    : "border-[#39FF88]/20 hover:border-[#39FF88]/50"
                }`}
              >
                {p.popular && (
                  <div className="absolute top-0 right-0 bg-[#39FF88] text-[#0B132B] text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-bl-xl">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                    {p.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">
                      {p.price}
                    </span>
                    {p.price !== "Custom" && (
                      <span className="text-xs text-[#39FF88] font-bold">
                        / month
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {p.description}
                  </p>
                  <hr className="border-[#39FF88]/15" />
                  <ul className="space-y-3">
                    {p.features.map((feat) => (
                      <li
                        key={feat}
                        className="text-xs text-slate-200 flex items-center gap-2"
                      >
                        <Check className="w-3.5 h-3.5 text-[#39FF88] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Button
                    href={p.href}
                    variant={p.popular ? "primary" : "secondary"}
                    className="w-full"
                  >
                    {p.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Landing Footer */}
      <footer className="mt-auto py-12 px-6 border-t border-[#39FF88]/15 bg-[#0B132B]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#39FF88] animate-pulse" />
            <span className="text-slate-300 font-semibold">
              Labto AI Service Platform Online
            </span>
          </div>

          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Labto AI Inc. All rights reserved.
            Decoupled AI Embeds.
          </p>

          <div className="flex gap-4 font-bold">
            <Link href="/privacy" className="hover:text-[#39FF88] transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#39FF88] transition">
              Terms of Service
            </Link>
            <Link href="/docs" className="hover:text-[#39FF88] transition">
              API Documentation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

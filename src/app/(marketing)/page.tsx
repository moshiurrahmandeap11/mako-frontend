'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import Button from '@/components/Button';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Database,
  ShoppingCart,
  Palette,
  Send,
  Check,
  User,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NetworkWave from '@/components/NetworkWave';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'search' | 'bridge' | 'design'>('search');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 3000);
  };

  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Ideal for testing and small development environments.',
      features: [
        '100 messages / month limit',
        '1 API key',
        '1 whitelisted domain',
        'Standard database search',
        'Standard email support',
        'Labto AI branding'
      ],
      cta: 'Get Started Free',
      popular: false,
      href: '/register'
    },
    {
      name: 'Starter',
      price: '$19',
      description: 'Perfect for growing boutique stores starting with AI.',
      features: [
        '500 messages / month limit',
        '2 API keys',
        '2 whitelisted domains',
        'pgvector Similarity Search',
        'Custom widget appearance',
        '24-hour email support'
      ],
      cta: 'Start Starter Plan',
      popular: false,
      href: '/register'
    },
    {
      name: 'Pro',
      price: '$49',
      description: 'Our most popular plan for scaling e-commerce stores.',
      features: [
        '1,500 messages / month limit',
        '4 API keys',
        '5 whitelisted domains',
        'Full pgvector similarity search',
        'Storefront cart event bridge',
        'Priority SLA support (4h)',
        'No Labto AI branding'
      ],
      cta: 'Go Pro Now',
      popular: true,
      href: '/register'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Dedicated orchestration for high-traffic retailers.',
      features: [
        'Unlimited message limits',
        'Unlimited API keys',
        'Unlimited whitelisted domains',
        'Dedicated LLM instances',
        'Custom vector embeddings pipeline',
        'Dedicated account manager',
        '99.9% uptime SLA guarantee'
      ],
      cta: 'Contact Sales',
      popular: false,
      href: '/contact'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 flex flex-col font-sans overflow-x-hidden">
      {/* Top Banner Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#39FF88] via-[#00CC66] to-[#39FF88]" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Gradients & Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(57,255,136,0.06),transparent_70%)] pointer-events-none" />
        
        {/* Network Wave 3D Background */}
        <NetworkWave />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#39FF88]/10 border border-[#39FF88]/30 text-[#39FF88] text-xs font-extrabold tracking-wider uppercase"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next.js 15 • Gemini 2.0 AI • pgvector</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-white leading-tight"
            >
              Intelligent AI Assistant <br className="hidden sm:inline" />
              for your website <br />
              in 3 simple steps
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-sm leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Transform casual storefront visitors into buyers. Sub-second RAG product recommendations, embeddable Preact widget, and PDF analytics export.
            </motion.p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                href="/register"
                variant="filled"
                className="w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm font-bold shadow-lg shadow-[#39FF88]/20"
              >
                Start Free Trial
              </Button>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#131D38] text-slate-200 hover:text-[#39FF88] hover:bg-[#1C2B4E] font-bold rounded-lg text-xs tracking-wider uppercase border border-[#39FF88]/30 transition-all duration-200"
              >
                Partner with us
              </Link>
            </div>
          </div>

          {/* Right Column: Animated Interactive Step Cards */}
          <div className="lg:col-span-7 flex flex-col md:flex-row justify-center items-center relative min-h-[400px] gap-3 md:gap-4 mt-12 lg:mt-0">
            
            {/* Box 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                boxShadow: [
                  "0px 0px 10px rgba(57,255,136,0.2)",
                  "0px 0px 30px rgba(57,255,136,0.6)",
                  "0px 0px 10px rgba(57,255,136,0.2)"
                ]
              }}
              transition={{ duration: 0.5, delay: 0.8, type: 'spring', boxShadow: { repeat: Infinity, duration: 2 } }}
              className="group relative w-56 md:w-44 lg:w-52 py-8 bg-[#131D38] backdrop-blur border border-[#39FF88]/50 rounded-xl flex items-center justify-center text-xs font-bold text-white z-10 hover:border-[#39FF88] transition-all cursor-default shadow-xl"
            >
              <span className="tracking-widest uppercase text-xs">GET API KEY</span>
              
              {/* Tooltip */}
              <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-max bg-[#0B132B] border border-[#39FF88]/40 px-3 py-1.5 rounded-lg shadow-2xl">
                <p className="text-[10px] text-[#39FF88] font-mono">API_KEY: aiw_live_a8f9c1b7...</p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[#39FF88]/40"></div>
              </div>
            </motion.div>

            {/* Wave Arrow 1 */}
            <div className="hidden md:flex items-center justify-center w-16 text-[#39FF88]/70">
              <motion.svg className="w-full h-8 overflow-visible" fill="none" stroke="currentColor" viewBox="0 0 40 20">
                <motion.path 
                  initial={{ pathLength: 0, opacity: 0 }} 
                  animate={{ pathLength: 1, opacity: 1 }} 
                  transition={{ delay: 1.3, duration: 1, ease: "linear" }} 
                  strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"
                  d="M0 10 Q 10 0, 20 10 T 40 10" 
                />
                <circle cx="40" cy="10" r="3" fill="currentColor" />
              </motion.svg>
            </div>
            {/* Wave Arrow 1 (Mobile Down) */}
            <div className="md:hidden flex items-center justify-center h-12 text-[#39FF88]/70">
              <motion.svg className="w-8 h-full overflow-visible" fill="none" stroke="currentColor" viewBox="0 0 20 40">
                <motion.path 
                  initial={{ pathLength: 0, opacity: 0 }} 
                  animate={{ pathLength: 1, opacity: 1 }} 
                  transition={{ delay: 1.3, duration: 1, ease: "linear" }} 
                  strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"
                  d="M10 0 Q 20 10, 10 20 T 10 40" 
                />
              </motion.svg>
            </div>

            {/* Box 2 */}
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                boxShadow: [
                  "0px 0px 10px rgba(57,255,136,0.2)",
                  "0px 0px 30px rgba(57,255,136,0.6)",
                  "0px 0px 10px rgba(57,255,136,0.2)"
                ]
              }}
              transition={{ duration: 0.5, delay: 1.8, type: 'spring', boxShadow: { repeat: Infinity, duration: 2, delay: 0.6 } }}
              className="group relative w-56 md:w-44 lg:w-52 py-8 bg-[#131D38] backdrop-blur border border-[#39FF88]/50 rounded-xl flex items-center justify-center text-xs font-bold text-white z-10 hover:border-[#39FF88] transition-all cursor-default shadow-xl"
            >
              <span className="tracking-widest uppercase text-xs">Connect with script</span>
              
              {/* Tooltip */}
              <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-max max-w-[300px] bg-[#0B132B] border border-[#39FF88]/40 px-4 py-3 rounded-lg shadow-2xl">
                <code className="text-xs text-[#39FF88] font-mono break-all block leading-relaxed">
                  &lt;script src="widget.js" data-api-key="***"&gt;&lt;/script&gt;
                </code>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[#39FF88]/40"></div>
              </div>
            </motion.div>

            {/* Wave Arrow 2 */}
            <div className="hidden md:flex items-center justify-center w-16 text-[#39FF88]/70">
              <motion.svg className="w-full h-8 overflow-visible" fill="none" stroke="currentColor" viewBox="0 0 40 20">
                <motion.path 
                  initial={{ pathLength: 0, opacity: 0 }} 
                  animate={{ pathLength: 1, opacity: 1 }} 
                  transition={{ delay: 2.3, duration: 1, ease: "linear" }} 
                  strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"
                  d="M0 10 Q 10 20, 20 10 T 40 10" 
                />
                <circle cx="40" cy="10" r="3" fill="currentColor" />
              </motion.svg>
            </div>
            {/* Wave Arrow 2 (Mobile Down) */}
            <div className="md:hidden flex items-center justify-center h-12 text-[#39FF88]/70">
              <motion.svg className="w-8 h-full overflow-visible" fill="none" stroke="currentColor" viewBox="0 0 20 40">
                <motion.path 
                  initial={{ pathLength: 0, opacity: 0 }} 
                  animate={{ pathLength: 1, opacity: 1 }} 
                  transition={{ delay: 2.3, duration: 1, ease: "linear" }} 
                  strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"
                  d="M10 0 Q 0 10, 10 20 T 10 40" 
                />
              </motion.svg>
            </div>

            {/* Box 3 */}
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                boxShadow: [
                  "0px 0px 15px rgba(57,255,136,0.4)",
                  "0px 0px 40px rgba(57,255,136,0.8)",
                  "0px 0px 15px rgba(57,255,136,0.4)"
                ]
              }}
              transition={{ duration: 0.5, delay: 2.8, type: 'spring', boxShadow: { repeat: Infinity, duration: 2, delay: 1.2 } }}
              className="group relative w-56 md:w-44 lg:w-52 py-8 bg-[#131D38] backdrop-blur border border-[#39FF88] rounded-xl flex items-center justify-center text-xs font-extrabold text-[#39FF88] z-10 hover:bg-[#39FF88] hover:text-[#0B132B] transition-all cursor-default overflow-visible shadow-2xl"
            >
              <span className="tracking-widest uppercase text-xs">Integration Completed</span>

              {/* Tooltip Chat Simulation */}
              <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-64 bg-[#0B132B] border border-[#39FF88]/40 rounded-xl shadow-2xl flex flex-col overflow-hidden">
                <div className="bg-[#131D38] border-b border-[#39FF88]/20 text-[#39FF88] p-3 text-xs font-bold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#39FF88]/20 flex items-center justify-center">🤖</div>
                  <span>Labto AI Assistant</span>
                </div>
                <div className="p-4 bg-[#0B132B] space-y-3 h-32 flex flex-col justify-end text-left">
                  <div className="self-end bg-[#131D38] text-slate-200 p-2.5 rounded-lg rounded-br-none text-[10px] font-medium shadow-md">Looking for active headphones!</div>
                  <div className="self-start bg-[#39FF88]/15 border border-[#39FF88]/30 text-[#39FF88] p-2.5 rounded-lg rounded-bl-none text-[10px] font-medium shadow-md">I have great options in stock under $100. Should I add the Wireless Pro to your cart?</div>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[#39FF88]/40"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Overview Section */}
      <section id="features" className="py-24 px-6 border-t border-[#39FF88]/15 bg-[#0B132B] relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#39FF88]">Core Features</h2>
            <p className="text-3xl font-extrabold text-white tracking-tight">Everything you need to automate e-commerce sales</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Labto AI combines cutting edge vector search with a standard event bridge to give you zero-friction AI support and lead generation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#131D38] border border-[#39FF88]/20 hover:border-[#39FF88]/60 transition duration-300 space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#39FF88]/10 border border-[#39FF88]/30 flex items-center justify-center text-[#39FF88]">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">pgvector Semantic Search</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Matches buyer search intents directly to catalog items by computing cosine distance embeddings. Returns relevant recommendations for unstructured prompts.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#131D38] border border-[#39FF88]/20 hover:border-[#39FF88]/60 transition duration-300 space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#39FF88]/10 border border-[#39FF88]/30 flex items-center justify-center text-[#39FF88]">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Storefront Cart Event Bridge</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Triggers cart mutations dynamically by emitting standardized client custom events. Merchants integrate additions with standard vanilla JavaScript event listeners.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#131D38] border border-[#39FF88]/20 hover:border-[#39FF88]/60 transition duration-300 space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#39FF88]/10 border border-[#39FF88]/30 flex items-center justify-center text-[#39FF88]">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Theme Widget Customize</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Brand colors, chatbot titles, welcoming messages, placement properties, and action options are configured in the dashboard and sync in real-time to active sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Focus Section with Active Tabs */}
      <section id="about" className="py-24 px-6 border-t border-[#39FF88]/15 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Tech Description */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#39FF88]">Under the Hood</h2>
            <h3 className="text-3xl font-extrabold text-white tracking-tight">Built on the Modern AI Stack</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              We leverage cloud-native database performance and state-of-the-art language processing pipelines to deliver lightning-fast responses on your storefront.
            </p>

            {/* Tab Selectors */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => setActiveTab('search')}
                className={`w-full text-left p-4 rounded-xl border transition flex items-center gap-3 ${
                  activeTab === 'search'
                    ? 'bg-[#39FF88]/10 border-[#39FF88] text-white'
                    : 'bg-transparent border-[#39FF88]/15 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Database className="w-5 h-5 text-[#39FF88]" />
                <div>
                  <h4 className="text-sm font-bold">Vector Similarity Search</h4>
                  <p className="text-[11px] text-slate-400">pgvector catalog index distance mapping</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('bridge')}
                className={`w-full text-left p-4 rounded-xl border transition flex items-center gap-3 ${
                  activeTab === 'bridge'
                    ? 'bg-[#39FF88]/10 border-[#39FF88] text-white'
                    : 'bg-transparent border-[#39FF88]/15 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-5 h-5 text-[#39FF88]" />
                <div>
                  <h4 className="text-sm font-bold">CustomEvent Cart Integration</h4>
                  <p className="text-[11px] text-slate-400">Decoupled iframe communication bridge</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('design')}
                className={`w-full text-left p-4 rounded-xl border transition flex items-center gap-3 ${
                  activeTab === 'design'
                    ? 'bg-[#39FF88]/10 border-[#39FF88] text-white'
                    : 'bg-transparent border-[#39FF88]/15 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Palette className="w-5 h-5 text-[#39FF88]" />
                <div>
                  <h4 className="text-sm font-bold">Small-Footprint Preact Engine</h4>
                  <p className="text-[11px] text-slate-400">&lt;40kb gzipped client execution bundle</p>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Code/Preview pane rendering based on active tab */}
          <div className="lg:col-span-7 bg-[#131D38] border border-[#39FF88]/30 rounded-2xl p-6 shadow-2xl h-[340px] flex flex-col justify-between font-mono text-xs">
            {activeTab === 'search' && (
              <>
                <div className="flex items-center justify-between border-b border-[#39FF88]/15 pb-3">
                  <span className="text-slate-400 uppercase tracking-widest text-[9px] font-bold">pgvector similarity query</span>
                  <span className="text-[#39FF88] text-[10px] font-bold">PostgreSQL Pooler</span>
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
                  * Calculates vector distance mapping for shopper queries using Gemini/OpenAI embeddings.
                </div>
              </>
            )}

            {activeTab === 'bridge' && (
              <>
                <div className="flex items-center justify-between border-b border-[#39FF88]/15 pb-3">
                  <span className="text-slate-400 uppercase tracking-widest text-[9px] font-bold">Integration JavaScript Event</span>
                  <span className="text-[#39FF88] text-[10px] font-bold">window.dispatchEvent</span>
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
                  * Decouples widget execution from backend storefront secrets. Progressive enhancement fallback.
                </div>
              </>
            )}

            {activeTab === 'design' && (
              <>
                <div className="flex items-center justify-between border-b border-[#39FF88]/15 pb-3">
                  <span className="text-slate-400 uppercase tracking-widest text-[9px] font-bold">HTML Script Snippet</span>
                  <span className="text-[#39FF88] text-[10px] font-bold">Merchant Onboarding Docs</span>
                </div>
                <pre className="flex-1 pt-4 text-[#39FF88] overflow-x-auto leading-relaxed select-all">
{`<script
  src="https://mako-api.ahsanul.dev/public/widget.js"
  data-api-key="aiw_live_a8f9c1b7e6d4c..."
  defer
></script>`}
                </pre>
                <div className="text-[10px] text-slate-400 italic">
                  * Bootstraps dynamically inside document body on DOMContentLoaded, reading whitelisted API key.
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 border-t border-[#39FF88]/15 bg-[#0B132B] relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#39FF88]">Flexible Tiers</h2>
            <p className="text-3xl font-extrabold text-white tracking-tight">Scale-as-you-grow plans for any store</p>
            <p className="text-slate-300 text-sm">Transparent monthly pricing tailored to your customer chat traffic.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`p-6 rounded-2xl bg-[#131D38] border flex flex-col justify-between relative overflow-hidden shadow-2xl transition-all duration-300 ${
                  p.popular ? 'border-[#39FF88] shadow-lg shadow-[#39FF88]/20 scale-105 z-10' : 'border-[#39FF88]/20 hover:border-[#39FF88]/50'
                }`}
              >
                {p.popular && (
                  <div className="absolute top-0 right-0 bg-[#39FF88] text-[#0B132B] text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-bl-xl">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">{p.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">{p.price}</span>
                    {p.price !== 'Custom' && <span className="text-xs text-slate-400">/ month</span>}
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{p.description}</p>
                  <hr className="border-[#39FF88]/15" />
                  <ul className="space-y-3">
                    {p.features.map((feat) => (
                      <li key={feat} className="text-xs text-slate-200 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#39FF88] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Link
                    href={p.href}
                    className={`w-full py-3 rounded-xl text-center text-xs font-bold block transition ${
                      p.popular
                        ? 'bg-[#39FF88] text-[#0B132B] hover:bg-[#00CC66] shadow-lg shadow-[#39FF88]/20 font-extrabold'
                        : 'bg-[#0B132B] hover:bg-[#39FF88] hover:text-[#0B132B] text-[#39FF88] border border-[#39FF88]/30'
                    }`}
                  >
                    {p.cta}
                  </Link>
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
            <span className="text-slate-300 font-semibold">Labto AI Service Platform Online</span>
          </div>

          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Labto AI Inc. All rights reserved. Decoupled AI Embeds.
          </p>

          <div className="flex gap-4 font-bold">
            <Link href="/privacy" className="hover:text-[#39FF88] transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#39FF88] transition">Terms of Service</Link>
            <Link href="/docs" className="hover:text-[#39FF88] transition">API Documentation</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

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
  Menu,
  X,
  User,
  ArrowRightCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NetworkWave from '@/components/NetworkWave';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'bridge' | 'design'>('search');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/');
  };

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
        '100 messages / day limit',
        '1 whitelisted domain',
        'Standard database search',
        'Standard email support',
        'Mako branding'
      ],
      cta: 'Get Started Free',
      popular: false,
      href: '/register'
    },
    {
      name: 'Starter',
      price: '$29',
      description: 'Perfect for growing boutique stores starting with AI.',
      features: [
        '1,000 messages / day limit',
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
      price: '$79',
      description: 'Our most popular plan for scaling e-commerce stores.',
      features: [
        '10,000 messages / day limit',
        '5 whitelisted domains',
        'Full pgvector similarity search',
        'Storefront cart event bridge',
        'Priority SLA support (4h)',
        'No Mako branding'
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
        'Unlimited whitelisted domains',
        'Dedicated Claude model instances',
        'Custom vector embeddings pipeline',
        'Dedicated account manager',
        '99.9% uptime SLA guarantee'
      ],
      cta: 'Contact Sales',
      popular: false,
      href: '#contact'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-x-hidden">
      {/* Top Banner Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-orange-600 to-amber-400" />


      {/* Hero Section matching the dark 3D structures and orange glowing brain theme */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Gradients & Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.04),transparent_70%)] pointer-events-none" />
        
        {/* Network Wave Three.js Background */}
        <NetworkWave />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          
          {/* Left Column: Hero Text Copy */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left mt-8 lg:mt-0">
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-5xl font-medium text-white leading-tight"
            >
              Intelligent AI Assistant <br className="hidden sm:inline" />
              for your website <br />
              in 3 simple steps
            </motion.h1>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                href="/register"
                className="w-full sm:w-auto px-8 py-3 text-xs sm:text-sm"
              >
                Start Free Trial
              </Button>
              <Link
                href="#pricing"
                className="w-full sm:w-auto px-8 py-3 bg-transparent text-slate-300 hover:text-white hover:bg-slate-800 font-medium rounded text-sm border border-slate-700 hover:border-slate-500 transition-colors duration-200"
              >
                Partner with us
              </Link>
            </div>

          </div>

          {/* Right Column: Animated Flowchart */}
          <div className="lg:col-span-7 flex flex-col md:flex-row justify-center items-center relative min-h-[400px] gap-2 md:gap-4 mt-12 lg:mt-0">
            
            {/* Box 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1, boxShadow: ["0px 0px 10px rgba(249,115,22,0.2)", "0px 0px 30px rgba(249,115,22,0.6)", "0px 0px 10px rgba(249,115,22,0.2)"] }}
              transition={{ duration: 0.5, delay: 0.8, type: 'spring', boxShadow: { repeat: Infinity, duration: 2 } }}
              className="group relative w-56 md:w-40 lg:w-48 py-8 bg-slate-950/80 backdrop-blur border border-slate-800 rounded flex items-center justify-center text-[11px] lg:text-xs font-bold text-slate-300 z-10 hover:border-slate-600 transition-colors cursor-default"
            >
              GET API
              {/* Tooltip */}
              <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-max bg-slate-900 border border-slate-700 px-3 py-1.5 rounded shadow-2xl">
                <p className="text-[10px] text-emerald-400 font-mono">API_KEY: aiw_live_*******</p>
                {/* Tooltip triangle */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-700"></div>
              </div>
            </motion.div>

            {/* Wave Arrow 1 */}
            <div className="hidden md:flex items-center justify-center w-16 text-orange-500/60">
              <motion.svg className="w-full h-8 overflow-visible" fill="none" stroke="currentColor" viewBox="0 0 40 20">
                <motion.path 
                  initial={{ pathLength: 0, opacity: 0 }} 
                  animate={{ pathLength: 1, opacity: 1 }} 
                  transition={{ delay: 1.3, duration: 1, ease: "linear" }} 
                  strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"
                  d="M0 10 Q 10 0, 20 10 T 40 10" 
                />
                <circle cx="40" cy="10" r="2" fill="currentColor" />
              </motion.svg>
            </div>
            {/* Wave Arrow 1 (Mobile Down) */}
            <div className="md:hidden flex items-center justify-center h-12 text-orange-500/60">
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
              animate={{ opacity: 1, x: 0, scale: 1, boxShadow: ["0px 0px 10px rgba(249,115,22,0.2)", "0px 0px 30px rgba(249,115,22,0.6)", "0px 0px 10px rgba(249,115,22,0.2)"] }}
              transition={{ duration: 0.5, delay: 1.8, type: 'spring', boxShadow: { repeat: Infinity, duration: 2, delay: 0.6 } }}
              className="group relative w-56 md:w-40 lg:w-48 py-8 bg-slate-950/80 backdrop-blur border border-slate-800 rounded flex items-center justify-center text-[11px] lg:text-xs font-bold text-slate-300 z-10 hover:border-slate-600 transition-colors cursor-default"
            >
              Connect with script
              {/* Tooltip */}
              <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-max max-w-[300px] bg-slate-900 border border-slate-700 px-4 py-3 rounded shadow-2xl">
                <code className="text-xs text-sky-400 font-mono break-all block leading-relaxed">
                  &lt;script src="widget.js" data-api-key="***"&gt;&lt;/script&gt;
                </code>
                {/* Tooltip triangle */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-700"></div>
              </div>
            </motion.div>

            {/* Wave Arrow 2 */}
            <div className="hidden md:flex items-center justify-center w-16 text-orange-500/60">
              <motion.svg className="w-full h-8 overflow-visible" fill="none" stroke="currentColor" viewBox="0 0 40 20">
                <motion.path 
                  initial={{ pathLength: 0, opacity: 0 }} 
                  animate={{ pathLength: 1, opacity: 1 }} 
                  transition={{ delay: 2.3, duration: 1, ease: "linear" }} 
                  strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"
                  d="M0 10 Q 10 20, 20 10 T 40 10" 
                />
                <circle cx="40" cy="10" r="2" fill="currentColor" />
              </motion.svg>
            </div>
            {/* Wave Arrow 2 (Mobile Down) */}
            <div className="md:hidden flex items-center justify-center h-12 text-orange-500/60">
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
              animate={{ opacity: 1, x: 0, scale: 1, boxShadow: ["0px 0px 15px rgba(249,115,22,0.4)", "0px 0px 40px rgba(249,115,22,0.8)", "0px 0px 15px rgba(249,115,22,0.4)"] }}
              transition={{ duration: 0.5, delay: 2.8, type: 'spring', boxShadow: { repeat: Infinity, duration: 2, delay: 1.2 } }}
              className="group relative w-56 md:w-40 lg:w-48 py-8 bg-slate-950/80 backdrop-blur border border-orange-500/60 rounded flex items-center justify-center text-[11px] lg:text-xs font-bold text-white z-10 hover:border-orange-500 transition-colors cursor-default overflow-visible"
            >
              {/* Shine effect wrapper */}
              <div className="absolute inset-0 overflow-hidden rounded pointer-events-none">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 1.5, delay: 3.5, repeat: Infinity, repeatDelay: 3 }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
              </div>
              Integration Completed

              {/* Tooltip: Dummy Chatbot Scene */}
              <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl flex flex-col overflow-hidden">
                <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-3 text-xs font-bold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">🤖</div>
                  <span>Shopping Assistant</span>
                </div>
                <div className="p-4 bg-slate-950/50 space-y-3 h-32 flex flex-col justify-end text-left">
                  <div className="self-end bg-slate-800 text-slate-300 p-2.5 rounded-lg rounded-br-none text-[10px] max-w-[85%] font-medium shadow-md">Looking for active headphones!</div>
                  <div className="self-start bg-orange-500/20 border border-orange-500/30 text-orange-200 p-2.5 rounded-lg rounded-bl-none text-[10px] max-w-[90%] font-medium shadow-md">I have great options in stock. Should I add the Pro version to your cart?</div>
                </div>
                {/* Tooltip triangle */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-700"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Overview Section */}
      <section id="features" className="py-24 px-6 border-t border-slate-900/60 bg-slate-900/20 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-xs uppercase font-extrabold tracking-[0.2em] text-orange-500">Core Features</h2>
            <p className="text-3xl font-extrabold text-white tracking-tight">Everything you need to automate e-commerce sales</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              MAKO combines cutting edge vector search with a standard storefront event bridge to give you zero-friction AI shopping support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950/80 border border-slate-900 hover:border-slate-800 transition duration-300 space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-orange-400">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">pgvector Semantic Search</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Matches buyer search intents directly to catalog items by computing cosine distance embeddings. Returns relevant recommendations for unstructured prompts.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-slate-900 hover:border-slate-800 transition duration-300 space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-orange-400">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Storefront Cart Event Bridge</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Triggers cart mutations dynamically by emitting standardized client custom events. Merchants integrate additions with standard vanilla JavaScript event listeners.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950/80 border border-slate-900 hover:border-slate-800 transition duration-300 space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-orange-400">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Theme Widget Customize</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Brand colors, chatbot titles, welcoming messages, placement properties, and action options are configured in the dashboard and sync in real-time to active sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Focus Section with Active Tabs */}
      <section id="about" className="py-24 px-6 border-t border-slate-900/60 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Tech Description */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xs uppercase font-extrabold tracking-[0.2em] text-orange-500">Under the Hood</h2>
            <h3 className="text-3xl font-extrabold text-white tracking-tight">Built on the Modern AI Stack</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We leverage cloud-native database performance and state-of-the-art language processing pipelines to deliver lightning-fast responses on your storefront.
            </p>

            {/* Tab Selectors */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => setActiveTab('search')}
                className={`w-full text-left p-4 rounded-xl border transition flex items-center gap-3 ${
                  activeTab === 'search'
                    ? 'bg-orange-500/10 border-orange-500/35 text-white'
                    : 'bg-transparent border-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Database className="w-5 h-5" />
                <div>
                  <h4 className="text-sm font-bold">Vector Similarity Search</h4>
                  <p className="text-[11px] text-slate-500">1536-dimensional OpenAI catalog index mapping</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('bridge')}
                className={`w-full text-left p-4 rounded-xl border transition flex items-center gap-3 ${
                  activeTab === 'bridge'
                    ? 'bg-orange-500/10 border-orange-500/35 text-white'
                    : 'bg-transparent border-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-5 h-5" />
                <div>
                  <h4 className="text-sm font-bold">CustomEvent Cart Integration</h4>
                  <p className="text-[11px] text-slate-500">Decoupled iframe communication bridge</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('design')}
                className={`w-full text-left p-4 rounded-xl border transition flex items-center gap-3 ${
                  activeTab === 'design'
                    ? 'bg-orange-500/10 border-orange-500/35 text-white'
                    : 'bg-transparent border-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Palette className="w-5 h-5" />
                <div>
                  <h4 className="text-sm font-bold">Small-Footprint Preact Engine</h4>
                  <p className="text-[11px] text-slate-500">&lt;50kb gzipped client execution bundle</p>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Code/Preview pane rendering based on active tab */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-900 rounded-2xl p-6 shadow-2xl h-[340px] flex flex-col justify-between font-mono text-xs">
            {activeTab === 'search' && (
              <>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-slate-500 uppercase tracking-widest text-[9px] font-bold">pgvector similarity query</span>
                  <span className="text-orange-400 text-[10px]">Neon SQL Pooler</span>
                </div>
                <pre className="flex-1 pt-4 text-slate-300 overflow-x-auto leading-relaxed select-all">
{`SELECT id, title, price, imageUrl, productUrl,
       (embedding <=> $1::vector) as distance
FROM "Product"
WHERE "merchantId" = $2 AND "inStock" = true
ORDER BY distance ASC
LIMIT 5;`}
                </pre>
                <div className="text-[10px] text-slate-500 italic">
                  * Calculates vector distance mapping for shopper queries using OpenAI embeddings.
                </div>
              </>
            )}

            {activeTab === 'bridge' && (
              <>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-slate-500 uppercase tracking-widest text-[9px] font-bold">Integration JavaScript Event</span>
                  <span className="text-orange-400 text-[10px]">window.dispatchEvent</span>
                </div>
                <pre className="flex-1 pt-4 text-slate-300 overflow-x-auto leading-relaxed select-all">
{`window.addEventListener("ai-widget:add-to-cart", (e) => {
  const { productId, quantity } = e.detail;
  // Map internal/external SKU to your native storefront cart
  myStorefrontCart.add(productId, quantity);
  alert("Product added to cart!");
});`}
                </pre>
                <div className="text-[10px] text-slate-500 italic">
                  * Decouples widget execution from backend storefront secrets. Progressive enhancement fallback.
                </div>
              </>
            )}

            {activeTab === 'design' && (
              <>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-slate-500 uppercase tracking-widest text-[9px] font-bold">HTML Script Snippet</span>
                  <span className="text-orange-400 text-[10px]">Merchant Onboarding Docs</span>
                </div>
                <pre className="flex-1 pt-4 text-slate-300 overflow-x-auto leading-relaxed select-all">
{`<script
  src="https://cdn.mako-ai.com/widget.js"
  data-api-key="aiw_live_a8f9c1b7e6d4c..."
  async
></script>`}
                </pre>
                <div className="text-[10px] text-slate-500 italic">
                  * Bootstraps dynamically inside document body on DOMContentLoaded, reading whitelisted API key.
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 border-t border-slate-900/60 bg-slate-900/20 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-xs uppercase font-extrabold tracking-[0.2em] text-orange-500">Flexible Tiers</h2>
            <p className="text-3xl font-extrabold text-white tracking-tight">Scale-as-you-grow plans for any store</p>
            <p className="text-slate-400 text-sm">Transparent monthly pricing tailored to your customer chat traffic.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`p-6 rounded-2xl bg-slate-950 border flex flex-col justify-between relative overflow-hidden shadow-2xl ${
                  p.popular ? 'border-orange-500 shadow-orange-500/5' : 'border-slate-900'
                }`}
              >
                {p.popular && (
                  <div className="absolute top-0 right-0 bg-orange-500 text-slate-950 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-bl-xl">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">{p.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">{p.price}</span>
                    {p.price !== 'Custom' && <span className="text-xs text-slate-500">/ month</span>}
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{p.description}</p>
                  <hr className="border-slate-900" />
                  <ul className="space-y-3">
                    {p.features.map((feat) => (
                      <li key={feat} className="text-xs text-slate-300 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Link
                    href={p.href}
                    className={`w-full py-2.5 rounded-xl text-center text-xs font-bold block transition ${
                      p.popular
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 shadow-lg shadow-orange-500/10'
                        : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-800'
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

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 border-t border-slate-900/60 relative">
        <div className="max-w-xl mx-auto bg-slate-900/40 border border-slate-900 p-8 rounded-2xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xs uppercase font-extrabold tracking-[0.2em] text-orange-500">Get In Touch</h2>
            <h3 className="text-2xl font-bold text-white">Have questions? Partner with us</h3>
            <p className="text-slate-400 text-xs">Fill out the contact details below, and our integration team will reply within 24 hours.</p>
          </div>

          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span>Thank you! Your message has been sent successfully.</span>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Business Email</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="john@store.com"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Message / Requirements</label>
                <textarea
                  rows={4}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Describe your storefront platform and any custom styling goals..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-bold rounded-xl text-xs tracking-wider uppercase transition shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Landing Footer */}
      <footer className="mt-auto py-12 px-6 border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-xs">
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Mako Service Platform Online</span>
          </div>

          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Mako AI Inc. All rights reserved. Decoupled AI Embeds.
          </p>

          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-350 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-350 transition">Terms of Service</a>
            <a href="#" className="hover:text-slate-350 transition">API Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

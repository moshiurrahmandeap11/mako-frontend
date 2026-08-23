'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { fetchApi } from '@/lib/api-client';
import toast from 'react-hot-toast';
import NetworkWave from '@/components/NetworkWave';
import { motion } from 'framer-motion';
import { Check, Sparkles, RefreshCw, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import Button from '@/components/Button';

export default function PricingPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [currentTier, setCurrentTier] = useState<string | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      fetchApi('/api/merchant/me')
        .then((data) => {
          if (data?.merchant?.planTier) {
            setCurrentTier(data.merchant.planTier);
          } else {
            setCurrentTier('FREE');
          }
        })
        .catch(() => {
          setCurrentTier('FREE');
        });
    } else {
      setCurrentTier(null);
    }
  }, [session]);

  const handleSelectPlan = async (planName: string, defaultHref: string) => {
    const tierKey = planName.toUpperCase();

    if (tierKey === currentTier) {
      if (tierKey === 'FREE') {
        router.push('/dashboard');
      } else {
        router.push('/billing');
      }
      return;
    }

    if (planName === 'Enterprise') {
      router.push(defaultHref);
      return;
    }

    if (!session) {
      router.push(defaultHref);
      return;
    }

    if (planName === 'Free') {
      router.push('/dashboard');
      return;
    }

    setLoadingPlan(planName);
    try {
      const apiBase = ''; // Proxied via Next.js rewrites
      const res = await fetch(`${apiBase}/api/billing/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tier: tierKey }),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || 'Failed to start checkout session. Please try again.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      toast.error('Failed to connect to billing server.');
    } finally {
      setLoadingPlan(null);
    }
  };

  const plans = [
    {
      name: 'Free',
      tierKey: 'FREE',
      price: '$0',
      credits: '1,500 AI Smart Credits',
      description: 'Ideal for testing and launching your first AI storefront assistant.',
      features: [
        '1,500 AI Smart Credits / month',
        '1 Whitelisted website domain',
        '1 Active API key',
        '4-Tier Web Crawler & Search',
        'Standard email support',
        'Labto AI branding badge',
      ],
      cta: 'Get Started Free',
      popular: false,
      rollover: false,
      href: '/register',
    },
    {
      name: 'Starter',
      tierKey: 'STARTER',
      price: '$2',
      credits: '10,000 AI Smart Credits',
      description: 'Perfect for growing boutique stores wanting 24/7 automated sales.',
      features: [
        '10,000 AI Smart Credits / month',
        '🔄 100% Unused Credit Rollover',
        '2 Whitelisted website domains',
        '2 Active API keys',
        'pgvector Semantic AI Search',
        'Full Custom Widget Styling',
        'Sub-1.2s Fast Latency AI',
        '24-Hour support SLA',
      ],
      cta: 'Start for $2 / Month',
      popular: false,
      rollover: true,
      href: '/register',
    },
    {
      name: 'Pro',
      tierKey: 'PRO',
      price: '$5',
      credits: '30,000 AI Smart Credits',
      description: 'Our most popular plan for high-converting e-commerce storefronts.',
      features: [
        '30,000 AI Smart Credits / month',
        '🔄 100% Unused Credit Rollover',
        '5 Whitelisted website domains',
        '4 Active API keys',
        'Full pgvector Product RAG',
        '1-Click Smart Cart Event Bridge',
        '100% White-Label (No Branding)',
        'Priority 4-Hour support SLA',
      ],
      cta: 'Go Pro Now ($5/mo)',
      popular: true,
      rollover: true,
      href: '/register',
    },
    {
      name: 'Enterprise',
      tierKey: 'ENTERPRISE',
      price: 'Custom',
      credits: 'Unlimited Turbo Credits',
      description: 'Dedicated high-throughput AI orchestration for large enterprise retailers.',
      features: [
        'Unlimited AI Turbo Credits',
        'Unlimited Whitelisted domains',
        'Unlimited API keys',
        'Dedicated LLM instance pool',
        'Custom pgvector embedding pipeline',
        'Dedicated Account Manager',
        '99.9% Uptime SLA guarantee',
      ],
      cta: 'Contact Enterprise Sales',
      popular: false,
      rollover: true,
      href: '/contact',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080E21] text-slate-100 flex flex-col pt-32 pb-20 relative overflow-hidden">
      <NetworkWave />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#39FF88]/10 border border-[#39FF88]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#39FF88]" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#39FF88]">
              Predictable AI Credits &bull; Zero Waste
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Massive AI Power. Pocket-Change Pricing.
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Get thousands of AI Smart Credits with <strong>100% Unused Credit Rollover</strong>. Your credits stay yours as long as your subscription is active!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p, idx) => {
            const isCurrentPlan = currentTier === p.tierKey;

            // Determine CTA button copy when user is logged in
            let buttonLabel = p.cta;
            if (isCurrentPlan) {
              buttonLabel = p.tierKey === 'FREE' ? 'Current Plan (Dashboard)' : 'Current Plan (Manage)';
            } else if (currentTier) {
              if (p.tierKey === 'PRO' && currentTier === 'STARTER') {
                buttonLabel = 'Upgrade to Pro ($5/mo)';
              } else if (p.tierKey === 'STARTER' && currentTier === 'FREE') {
                buttonLabel = 'Upgrade for $2/mo';
              } else if (p.tierKey === 'PRO' && currentTier === 'FREE') {
                buttonLabel = 'Upgrade to Pro ($5/mo)';
              } else if (p.tierKey === 'STARTER' && currentTier === 'PRO') {
                buttonLabel = 'Switch to Starter ($2/mo)';
              } else if (p.tierKey === 'FREE') {
                buttonLabel = 'Base Free Plan';
              }
            }

            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 rounded-2xl bg-[#0F172A]/80 border flex flex-col justify-between relative overflow-hidden backdrop-blur-md transition-all duration-200 text-left ${
                  isCurrentPlan
                    ? 'border-emerald-400 shadow-xl shadow-emerald-500/15 ring-2 ring-emerald-400/60 bg-[#0F172A]'
                    : p.popular
                    ? 'border-[#39FF88]/60 shadow-xl shadow-[#39FF88]/15 ring-1 ring-[#39FF88]/30'
                    : 'border-white/[0.08] hover:border-white/[0.2]'
                }`}
              >
                {/* Current Plan Badge or Most Popular Badge */}
                {isCurrentPlan ? (
                  <span className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Current Plan
                  </span>
                ) : (
                  p.popular && (
                    <span className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#39FF88]/20 text-[#39FF88] border border-[#39FF88]/40">
                      Most Popular
                    </span>
                  )
                )}

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{p.name}</h3>
                      {p.rollover && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                          <RefreshCw className="w-2.5 h-2.5" /> Rollover
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{p.description}</p>
                  </div>

                  <div className="py-2 border-y border-white/[0.06] space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {p.price}
                      </span>
                      {p.price !== 'Custom' && (
                        <span className="text-xs text-slate-400 font-medium">/ month</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#39FF88]">
                      <Zap className="w-3 h-3 shrink-0" />
                      <span>{p.credits}</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {p.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#39FF88] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <Button
                    onClick={() => handleSelectPlan(p.name, p.href)}
                    isLoading={loadingPlan === p.name}
                    variant={isCurrentPlan ? 'secondary' : p.popular ? 'primary' : 'outline'}
                    size="md"
                    className={`w-full justify-center text-xs font-semibold ${
                      isCurrentPlan ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25' : ''
                    }`}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      {isCurrentPlan && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      <span>{buttonLabel}</span>
                      {!isCurrentPlan && <ArrowRight className="w-3.5 h-3.5 ml-0.5 opacity-70" />}
                    </span>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

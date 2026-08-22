'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import NetworkWave from '@/components/NetworkWave';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Button from '@/components/Button';

export default function PricingPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSelectPlan = async (planName: string, defaultHref: string) => {
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
        body: JSON.stringify({ tier: planName.toUpperCase() }),
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
      price: '$0',
      description: 'Ideal for testing and small development environments.',
      features: [
        '100 messages / month limit',
        '1 API key',
        '1 whitelisted domain',
        'Standard database search',
        'Standard email support',
        'Labto AI branding',
      ],
      cta: 'Get Started Free',
      popular: false,
      href: '/register',
    },
    {
      name: 'Starter',
      price: '$2',
      description: 'Perfect for growing boutique stores starting with AI.',
      features: [
        '500 messages / month limit',
        '2 API keys',
        '2 whitelisted domains',
        'pgvector Similarity Search',
        'Custom widget appearance',
        '24-hour email support',
      ],
      cta: 'Start Starter Plan',
      popular: false,
      href: '/register',
    },
    {
      name: 'Pro',
      price: '$5',
      description: 'Our most popular plan for scaling e-commerce stores.',
      features: [
        '1,200 messages / month limit',
        '4 API keys',
        '5 whitelisted domains',
        'Full pgvector similarity search',
        'Storefront cart event bridge',
        'Priority SLA support (4h)',
        'No Labto AI branding',
      ],
      cta: 'Go Pro Now',
      popular: true,
      href: '/register',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Dedicated orchestration for high-traffic retailers.',
      features: [
        'All Unlimited message limits',
        'Unlimited API keys',
        'Unlimited whitelisted domains',
        'Dedicated LLM instances',
        'Custom vector embeddings pipeline',
        'Dedicated account manager',
        '99.9% uptime SLA guarantee',
      ],
      cta: 'Contact Sales',
      popular: false,
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
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF88] px-3.5 py-1 rounded-full bg-[#39FF88]/10 border border-[#39FF88]/20">
            Predictable Pricing
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Plans built for every stage of your growth
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Choose the right conversational AI tier for your store. Powered seamlessly by Polar.sh.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-6 rounded-2xl bg-[#0F172A]/70 border flex flex-col justify-between relative overflow-hidden backdrop-blur-md transition-all duration-200 text-left ${
                p.popular
                  ? 'border-[#39FF88]/50 shadow-lg shadow-[#39FF88]/10'
                  : 'border-white/[0.08] hover:border-white/[0.15]'
              }`}
            >
              {p.popular && (
                <span className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#39FF88]/15 text-[#39FF88] border border-[#39FF88]/30">
                  Most Popular
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{p.description}</p>
                </div>

                <div className="flex items-baseline gap-1 py-1 border-b border-white/[0.06]">
                  <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    {p.price}
                  </span>
                  {p.price !== 'Custom' && (
                    <span className="text-xs text-slate-400 font-medium">/ month</span>
                  )}
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
                  variant={p.popular ? 'primary' : 'outline'}
                  size="md"
                  className="w-full justify-center text-xs font-semibold"
                >
                  {p.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

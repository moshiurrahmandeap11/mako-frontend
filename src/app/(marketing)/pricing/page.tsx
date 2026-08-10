'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
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
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
      const res = await fetch(`${apiBase}/api/billing/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tier: planName.toUpperCase() }),
        // Send Better Auth credential cookies
        credentials: 'include',
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Failed to start checkout session. Please try again.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to connect to billing server.');
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
        '100 messages / day limit',
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
      price: '$29',
      description: 'Perfect for growing boutique stores starting with AI.',
      features: [
        '1,000 messages / day limit',
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
      price: '$79',
      description: 'Our most popular plan for scaling e-commerce stores.',
      features: [
        '10,000 messages / day limit',
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
        'Unlimited message limits',
        'Unlimited whitelisted domains',
        'Dedicated LLM instances',
        'Custom embeddings pipeline',
        'Dedicated account manager',
        'Custom SLA support',
      ],
      cta: 'Contact Sales',
      popular: false,
      href: '/contact',
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      {/* Background Wave */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <NetworkWave />
      </div>


      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-6 pt-36 pb-20 flex flex-col justify-center">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-[0.2em] text-orange-500 uppercase mb-3"
          >
            Pricing & Plans
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4"
          >
            Flexible plans for stores of all sizes.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-sm leading-relaxed"
          >
            No hidden fees. Scale up, down, or cancel at any time. Start converting visitors with a free trial today.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`relative flex flex-col p-6 rounded bg-slate-900/40 backdrop-blur-md border transition-all duration-300 ${
                plan.popular
                  ? 'border-amber-500/70 shadow-lg shadow-orange-500/5'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-extrabold text-[10px] tracking-wider px-3.5 py-0.5 rounded-full uppercase shadow">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline text-white">
                  <span className="text-3xl font-semibold tracking-tight">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="ml-1 text-xs text-slate-500">/month</span>}
                </div>
                <p className="mt-3 text-xs text-slate-400 leading-relaxed min-h-[36px]">
                  {plan.description}
                </p>
              </div>

              <div className="flex-1 mb-8">
                <ul className="space-y-3.5">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={() => handleSelectPlan(plan.name, plan.href)}
                disabled={loadingPlan !== null}
                className={`w-full py-3 text-center text-xs font-bold tracking-[0.12em] ${
                  plan.popular
                    ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 hover:text-slate-950 border-transparent shadow-lg shadow-orange-500/20'
                    : 'bg-transparent text-amber-500 border-slate-800 hover:border-amber-500'
                }`}
              >
                {loadingPlan === plan.name ? 'Connecting...' : plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

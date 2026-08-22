'use client';

import Button from '@/components/Button';
import { Check } from 'lucide-react';

export default function PricingSection() {
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
    <section
      id="pricing"
      className="py-20 px-4 sm:px-6 border-t border-white/[0.06] bg-[#080E21] relative"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-[11px] font-medium tracking-[0.2em] text-[#39FF88] uppercase">
            Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
            Transparent, Scalable Plans
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-normal">
            Predictable monthly billing powered by Polar.sh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((p) => (
            <div
              key={p.name}
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
                  href={p.href}
                  variant={p.popular ? 'primary' : 'outline'}
                  size="md"
                  className="w-full justify-center text-xs font-semibold"
                >
                  {p.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

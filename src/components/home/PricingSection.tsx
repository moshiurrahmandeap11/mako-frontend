'use client';

import Button from '@/components/Button';
import { Check, RefreshCw } from 'lucide-react';

export default function PricingSection() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Ideal for testing and launching your first AI assistant.',
      features: [
        '1,500 AI Smart Credits / month',
        '1 Active API key',
        '1 Whitelisted domain',
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
      price: '$2',
      description: 'Perfect for growing boutique stores wanting 24/7 automated sales.',
      features: [
        '10,000 AI Smart Credits / month',
        '🔄 100% Unused Credit Rollover',
        '2 Active API keys',
        '2 Whitelisted domains',
        'pgvector Semantic AI Search',
        'Full Custom Widget Styling',
        '24-Hour support SLA',
      ],
      cta: 'Start for $2 / Month',
      popular: false,
      rollover: true,
      href: '/register',
    },
    {
      name: 'Pro',
      price: '$5',
      description: 'Our most popular plan for high-converting stores.',
      features: [
        '30,000 AI Smart Credits / month',
        '🔄 100% Unused Credit Rollover',
        '4 Active API keys',
        '5 Whitelisted domains',
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
      price: 'Custom',
      description: 'Dedicated orchestration for high-traffic retailers.',
      features: [
        'Unlimited AI Turbo Credits',
        'Unlimited API keys & domains',
        'Dedicated LLM instance pool',
        'Custom vector embeddings pipeline',
        'Dedicated Account Manager',
        '99.9% Uptime SLA guarantee',
      ],
      cta: 'Contact Sales',
      popular: false,
      rollover: true,
      href: '/contact',
    },
  ];

  return (
    <section
      id="pricing"
      className="py-20 px-4 sm:px-6 border-t border-[#E4E5E7] bg-[#F7F7F7] relative"
    >
      <div className="w-11/12 lg:w-9/12 max-w-9/12 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#1DBF73] uppercase bg-[#E8F8F0] px-3 py-1 rounded-full border border-[#1DBF73]/20">
            Predictable Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#222325] tracking-tight">
            Transparent, Scalable Plans
          </h2>
          <p className="text-[#62646A] text-xs sm:text-sm font-normal">
            Predictable monthly billing powered by Polar.sh with 100% Unused Credit Rollover.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`p-6 rounded-2xl bg-white border flex flex-col justify-between relative overflow-hidden transition-all duration-200 text-left shadow-sm ${
                p.popular
                  ? 'border-2 border-[#1DBF73] shadow-xl shadow-[#1DBF73]/10 ring-1 ring-[#1DBF73]/30'
                  : 'border-[#E4E5E7] hover:border-[#DADBDD] hover:shadow-md'
              }`}
            >
              {p.popular && (
                <span className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#1DBF73] text-white shadow-sm">
                  Most Popular
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[#222325]">{p.name}</h3>
                    {p.rollover && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#1DBF73] bg-[#E8F8F0] border border-[#1DBF73]/30 px-2 py-0.5 rounded-full">
                        <RefreshCw className="w-2.5 h-2.5" /> Rollover
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#62646A] mt-1 min-h-[32px]">{p.description}</p>
                </div>

                <div className="flex items-baseline gap-1 py-1 border-b border-[#E4E5E7]">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#222325] tracking-tight">
                    {p.price}
                  </span>
                  {p.price !== 'Custom' && (
                    <span className="text-xs text-[#74767E] font-medium">/ month</span>
                  )}
                </div>

                <ul className="space-y-2.5 text-xs text-[#404145]">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#1DBF73] shrink-0 font-bold" />
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
                  className={`w-full justify-center text-xs font-bold ${!p.popular ? 'text-[#222325] border-[#E4E5E7] hover:bg-slate-50' : ''}`}
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

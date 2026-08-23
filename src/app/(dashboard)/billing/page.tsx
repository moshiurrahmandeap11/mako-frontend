'use client';

import { useState, useEffect } from 'react';
import { fetchApi } from '@/lib/api-client';
import { CreditCard, ShieldAlert, Zap, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/Button';
import { Skeleton } from '@/components/Skeleton';

export default function BillingPage() {
  const [merchant, setMerchant] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await fetchApi('/api/merchant/me');
      setMerchant(data.merchant);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch merchant details.');
    } finally {
      setLoading(false);
    }
  };

  const loadInvoices = async () => {
    setLoadingInvoices(true);
    try {
      const data = await fetchApi('/api/billing/invoices');
      setInvoices(data.invoices || []);
    } catch (err) {
      console.error('Failed to load invoices:', err);
    } finally {
      setLoadingInvoices(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const tier = params.get('tier');

    if (sessionId || tier) {
      fetchApi(`/api/billing/verify?session_id=${sessionId || ''}&tier=${tier || ''}`)
        .then(() => {
          if (tier) {
            toast.success(`Successfully upgraded to ${tier} Plan! 🎉`);
          }
          loadProfile();
          window.history.replaceState({}, '', window.location.pathname);
        })
        .catch(() => {
          loadProfile();
        });
    } else {
      loadProfile();
    }
    loadInvoices();
  }, []);

  const handleManageBilling = async () => {
    setActionLoading(true);
    setError('');
    try {
      const data = await fetchApi('/api/billing/portal', { method: 'POST' });
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('Billing portal session failed.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect to billing server.');
    } finally {
      setActionLoading(false);
    }
  };

  const planLimits: Record<string, { desc: string; features: string[] }> = {
    FREE: {
      desc: 'Great for testing and development ($0/mo).',
      features: [
        '1,500 AI Smart Credits / month',
        '1 Active API key',
        '1 Whitelisted domain',
        '4-Tier Web Crawler & Search',
        'Labto AI branding footer',
      ],
    },
    STARTER: {
      desc: 'Perfect for growing boutique stores starting with AI ($2/mo).',
      features: [
        '10,000 AI Smart Credits / month',
        '🔄 100% Unused Credit Rollover',
        '2 Active API keys',
        '2 Whitelisted domains',
        'pgvector Semantic AI Search',
        'Custom widget appearance & styling',
        '24-Hour support SLA',
      ],
    },
    PRO: {
      desc: 'Our most popular plan for high-converting stores ($5/mo).',
      features: [
        '30,000 AI Smart Credits / month',
        '🔄 100% Unused Credit Rollover',
        '4 Active API keys',
        '5 Whitelisted domains',
        'Full pgvector Product RAG',
        '1-Click Smart Cart Event Bridge',
        'Priority SLA support (4h)',
        '100% White-Labeled (No Branding)',
      ],
    },
    ENTERPRISE: {
      desc: 'Dedicated high-traffic infrastructure & custom SLAs.',
      features: [
        'Unlimited AI Turbo Credits',
        'Unlimited API keys & domains',
        'Dedicated LLM instance pool',
        'Custom vector embeddings pipeline',
        'Dedicated Account Manager',
        '99.9% Uptime SLA guarantee',
      ],
    },
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <Skeleton className="lg:col-span-7 h-96 rounded-2xl" />
          <Skeleton className="lg:col-span-5 h-96 rounded-2xl" />
        </div>
      </div>
    );
  }

  const currentTier = merchant?.planTier || 'FREE';
  const limits = planLimits[currentTier] || planLimits.FREE;
  const isFree = currentTier === 'FREE';

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-[#39FF88]" />
          Billing & Subscription Plan
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Manage your Labto AI subscription, Polar.sh billing portal, and quota limits.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Billing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Active Subscription Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-8 bg-[#0B132B]/80 border border-white/[0.08] rounded-2xl relative overflow-hidden shadow-2xl backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-[#39FF88] uppercase tracking-widest bg-[#39FF88]/10 border border-[#39FF88]/20 px-3 py-1 rounded">
                  Current active plan
                </span>
                <h2 className="text-3xl font-extrabold text-white tracking-tight mt-4">
                  {currentTier} PLAN
                </h2>
                <p className="text-slate-300 text-xs mt-2 leading-relaxed max-w-md">
                  {limits.desc}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Status</p>
                <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-1 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {merchant?.subscriptionStatus || 'Active'}
                </p>
              </div>
            </div>

            {/* Current Tier Features List */}
            <div className="mt-8 pt-8 border-t border-white/[0.08] space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Plan Inclusions:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {limits.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-[#39FF88] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center gap-4">
              {isFree ? (
                <Button href="/pricing" variant="primary">
                  <span className="flex items-center gap-2">
                    <span>Upgrade Subscription</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              ) : (
                <Button onClick={handleManageBilling} disabled={actionLoading} variant="outline">
                  <span className="flex items-center gap-2">
                    {actionLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#39FF88]" />
                        <span>Opening Portal...</span>
                      </>
                    ) : (
                      <>
                        <span>Manage Polar.sh Subscription</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Invoice & Payment History */}
        <div className="lg:col-span-5 bg-[#0B132B]/80 border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#39FF88]" />
              Polar.sh Subscription Summary
            </h2>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {loadingInvoices ? (
              <div className="space-y-3 py-2">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ) : invoices.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No active subscription invoices found.
              </div>
            ) : (
              invoices.map((inv) => {
                const formattedDate = inv.dateFormatted || (typeof inv.created === 'number' ? new Date(inv.created * 1000).toLocaleDateString() : inv.created || 'N/A');
                const formattedAmount = inv.amount || (typeof inv.amount_paid === 'number' ? (inv.amount_paid / 100).toFixed(2) : '0.00');

                return (
                  <div key={inv.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">{inv.number}</p>
                      <p className="text-[10px] text-slate-400">{formattedDate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-white">${formattedAmount} {inv.currency || 'USD'}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#39FF88]/15 text-[#39FF88]">
                        {inv.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

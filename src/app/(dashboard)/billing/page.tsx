'use client';

import { useState, useEffect } from 'react';
import { fetchApi } from '@/lib/api-client';
import { CreditCard, ShieldAlert, Zap, ArrowRight, ShieldCheck, Loader2, Download } from 'lucide-react';
import Link from 'next/link';
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
    loadProfile();
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

  const handleDownloadInvoice = async (invoiceId: string, invoiceNumber: string) => {
    toast.loading('Generating invoice receipt...', { id: 'download-invoice' });
    try {
      const response = await fetch(`/api/billing/invoices/${invoiceId}/download`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve PDF file.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${invoiceNumber.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Invoice receipt downloaded!', { id: 'download-invoice' });
    } catch (err) {
      console.error('Invoice download error:', err);
      toast.error('Failed to download invoice PDF.', { id: 'download-invoice' });
    }
  };

  const planLimits: Record<string, { desc: string; features: string[] }> = {
    FREE: {
      desc: 'Great for testing and development.',
      features: [
        '100 messages / month limit',
        '1 API key',
        '1 whitelisted domain',
        'Standard database search',
        'Labto AI branding footer visible',
      ],
    },
    STARTER: {
      desc: 'Perfect for growing boutique stores starting with AI ($2/mo).',
      features: [
        '500 messages / month limit',
        '2 API keys',
        '2 whitelisted domains',
        'pgvector Similarity Search',
        'Custom widget appearance & styling',
        '24-hour email support',
      ],
    },
    PRO: {
      desc: 'Our most popular plan for scaling stores & agencies ($5/mo).',
      features: [
        '1,500 messages / month limit',
        '4 API keys',
        '5 whitelisted domains',
        'Full pgvector similarity search',
        'Storefront cart event bridge integrations',
        'Priority SLA support (4h)',
        'No Labto AI branding (completely white-labeled)',
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
          <CreditCard className="w-6 h-6 text-amber-500" />
          Billing & Subscription Plan
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Manage your Labto AI subscription, billing portal, and payment history.
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
          <div className="p-8 bg-slate-900/60 border border-slate-800/80 rounded-2xl relative overflow-hidden shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded">
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
            <div className="mt-8 pt-8 border-t border-slate-800/80 space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Plan Inclusions:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {limits.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-4">
              {isFree ? (
                <Button href="/pricing" variant="filled">
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
                        <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                        <span>Opening Portal...</span>
                      </>
                    ) : (
                      <>
                        <span>Manage Stripe Billing</span>
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
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Payment Receipts
            </h2>
          </div>

          <div className="divide-y divide-slate-800/60">
            {loadingInvoices ? (
              <div className="space-y-3 py-2">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ) : invoices.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No paid invoice receipts found.
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
                      <button
                        onClick={() => handleDownloadInvoice(inv.id, inv.number)}
                        className="p-2 text-slate-400 hover:text-amber-500 hover:bg-slate-800 rounded transition"
                        title="Download Invoice PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
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

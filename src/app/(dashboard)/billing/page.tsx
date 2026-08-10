'use client';

import { useState, useEffect } from 'react';
import { fetchApi } from '@/lib/api-client';
import { CreditCard, Check, ShieldAlert, Sparkles, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

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
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
      const response = await fetch(`${apiBase}/api/billing/invoices/${invoiceId}/download`, {
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
        '100 messages / day limit',
        '1 whitelisted domain',
        'Standard database search',
        'Labto AI branding footer visible',
      ],
    },
    STARTER: {
      desc: 'Perfect for small boutique stores starting with AI.',
      features: [
        '1,000 messages / day limit',
        '2 whitelisted domains',
        'pgvector Similarity Search',
        'Custom widget appearance & colors',
        'Labto AI branding footer visible',
      ],
    },
    PRO: {
      desc: 'Ideal for scaling e-commerce brands.',
      features: [
        '10,000 messages / day limit',
        '5 whitelisted domains',
        'Full pgvector similarity search',
        'Storefront cart event bridge integrations',
        'No Labto AI branding (completely white-labeled)',
      ],
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-indigo-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-medium">Fetching subscription details...</span>
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
          <CreditCard className="w-6 h-6 text-indigo-400" />
          Billing & Subscription Plan
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage your subscription plans, billing info, and widget quotas.
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
        {/* Left Column: Active Subscription card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-2xl relative overflow-hidden shadow-2xl">
            {/* Glowing Accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 blur-3xl pointer-events-none rounded-full" />

            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                  Current active plan
                </span>
                <h2 className="text-3xl font-extrabold text-white tracking-tight mt-4">
                  {currentTier} PLAN
                </h2>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed max-w-md">
                  {limits.desc}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 font-semibold uppercase">Status</p>
                <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-1 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {merchant.subscriptionStatus || 'Active'}
                </p>
              </div>
            </div>

            {/* Current Tier Features List */}
            <div className="mt-8 pt-8 border-t border-slate-800/80 space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Plan Inclusions:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {limits.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-350 leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA action buttons */}
            <div className="mt-8 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-4">
              {isFree ? (
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs tracking-wider rounded-xl transition shadow-lg shadow-indigo-500/10 flex items-center justify-center gap-2 uppercase"
                >
                  <span>Upgrade Subscription</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  onClick={handleManageBilling}
                  disabled={actionLoading}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs tracking-wider rounded-xl transition flex items-center justify-center gap-2 uppercase disabled:opacity-50"
                >
                  {actionLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Redirecting...</span>
                    </>
                  ) : (
                    <>
                      <span>Manage Invoices & Cards</span>
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Other Info Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-900/20 border border-slate-800/70 rounded-2xl space-y-4">
            <h3 className="text-sm font-semibold text-white">How Billing Works</h3>
            <div className="space-y-4 text-xs text-slate-400 leading-relaxed">
              <p>
                Labto AI billing utilizes secure Stripe servers to host invoicing, credit card detail saves, and upgrade/downgrade workflows.
              </p>
              <p>
                <strong>Upgrading:</strong> Changes are effective immediately. Stripe automatically applies proration credits.
              </p>
              <p>
                <strong>Cancellation:</strong> Cancelling your plan keeps starter/pro features active until the end of your billing cycle. After that, your widget automatically rolls back to the Free plan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice History Section */}
      <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-850 pb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Invoice History</h3>
            <p className="text-slate-400 text-xs mt-1">Review your recent transaction payments and download official receipts.</p>
          </div>

          {/* Labto AI Brand Logo Signature */}
          <div className="flex flex-col items-start sm:items-end gap-1 shrink-0 bg-slate-950/40 border border-slate-800/80 px-4 py-2.5 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent" />
                <div className="absolute w-1.5 h-1.5 rounded-full bg-amber-300" />
              </div>
              <span className="font-extrabold text-sm tracking-[0.15em] text-white">
                Labto AI
              </span>
            </div>
            <span className="text-[9px] text-slate-500 tracking-wider font-semibold uppercase">
              a product of Labtobit
            </span>
          </div>
        </div>

        {loadingInvoices ? (
          <div className="flex items-center gap-2 text-indigo-400 text-xs py-4">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Fetching payment history...</span>
          </div>
        ) : invoices.length === 0 ? (
          <div className="text-slate-500 text-xs py-4">No billing statements available. Upgrade to a paid plan to view history.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3.5 px-4 font-semibold">Invoice Number</th>
                  <th className="py-3.5 px-4 font-semibold">Date</th>
                  <th className="py-3.5 px-4 font-semibold">Amount</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-900/20 text-slate-350 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-white">{inv.number}</td>
                    <td className="py-3.5 px-4">{inv.created}</td>
                    <td className="py-3.5 px-4 font-semibold">{inv.amount} {inv.currency}</td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        inv.status === 'paid'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {inv.pdf ? (
                        <button
                          onClick={() => handleDownloadInvoice(inv.id, inv.number)}
                          className="text-amber-500 hover:text-amber-400 font-bold hover:underline cursor-pointer bg-transparent border-none p-0 outline-none"
                        >
                          Download PDF ↙
                        </button>
                      ) : (
                        <span className="text-slate-650">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Users,
  Key,
  MessageSquare,
  Cpu,
  ShieldCheck,
  Search,
  Filter,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap,
  Lock,
} from 'lucide-react';
import { api } from '@/lib/axios';

interface MerchantClient {
  id: string;
  name: string;
  email: string;
  role: string;
  planTier: 'FREE' | 'STARTER' | 'PRO' | 'ENTERPRISE';
  allowedDomains: string[];
  createdAt: string;
  emailVerified: boolean;
  totalMessages: number;
  totalTokensUsed: number;
  apiKeys: Array<{
    id: string;
    name: string;
    keyPrefix: string;
    template: string;
    isActive: boolean;
  }>;
  _count: {
    apiKeys: number;
    conversations: number;
    products: number;
    knowledgeChunks: number;
  };
}

export default function AdminPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [editingMerchant, setEditingMerchant] = useState<MerchantClient | null>(null);
  const [newTier, setNewTier] = useState<string>('PRO');
  const [successMsg, setSuccessMsg] = useState('');

  // 0. Fetch Current User Profile to verify Admin Access
  const { data: merchantData, isLoading: isMerchantLoading } = useQuery({
    queryKey: ['merchantProfile'],
    queryFn: () => api.get('/api/merchant/me') as Promise<any>,
  });

  const merchant = merchantData?.merchant;
  const adminEmail = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@ahsanul.dev').trim().toLowerCase();
  const userEmail = merchant?.email?.trim().toLowerCase();
  const isAdmin = Boolean(merchant && (merchant.isAdmin === true || (userEmail && userEmail === adminEmail)));

  // Redirect non-admin users immediately
  useEffect(() => {
    if (!isMerchantLoading && merchant && !isAdmin) {
      router.replace('/dashboard');
    }
  }, [isMerchantLoading, merchant, isAdmin, router]);

  // 1. Fetch Admin Overview Stats (only if admin)
  const { data: overviewData, isLoading: isOverviewLoading } = useQuery({
    queryKey: ['adminOverview'],
    queryFn: () => api.get('/api/admin/overview') as Promise<any>,
    enabled: isAdmin,
  });

  // 2. Fetch All Registered Merchants (only if admin)
  const { data: merchantsData, isLoading: isMerchantsLoading } = useQuery({
    queryKey: ['adminMerchants'],
    queryFn: () => api.get('/api/admin/merchants') as Promise<any>,
    enabled: isAdmin,
  });

  // 3. Update Merchant Plan Mutation
  const updatePlanMutation = useMutation({
    mutationFn: async ({ merchantId, planTier }: { merchantId: string; planTier: string }) => {
      return api.patch(`/api/admin/merchants/${merchantId}/plan`, { planTier });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminMerchants'] });
      queryClient.invalidateQueries({ queryKey: ['adminOverview'] });
      setSuccessMsg('Merchant package updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3500);
      setEditingMerchant(null);
    },
  });

  if (isMerchantLoading) {
    return (
      <div className="p-12 text-center text-slate-400">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs uppercase tracking-wider font-bold">Verifying Administrator Privileges...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="p-8 sm:p-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center max-w-lg mx-auto my-12 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-white">Restricted Access</h2>
        <p className="text-xs text-slate-300">
          This area is strictly restricted to master administrators. You do not have permissions to view this console.
        </p>
        <button
          onClick={() => router.replace('/dashboard')}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const metrics = overviewData?.metrics || {
    totalMerchants: 0,
    totalApiKeys: 0,
    totalConversations: 0,
    totalMessages: 0,
    totalTokensEstimated: 0,
    tierBreakdown: { FREE: 0, STARTER: 0, PRO: 0, ENTERPRISE: 0 },
  };

  const merchants: MerchantClient[] = merchantsData?.merchants || [];

  // Filter merchants based on search and tier filter
  const filteredMerchants = merchants.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedTier === 'ALL' || m.planTier === selectedTier;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/40 border border-slate-800/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Master Admin Console
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Client Portfolio & Global Usage
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Monitor active client deployments, provisioned API keys, cumulative token consumption, and manage merchant subscription tiers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-950/80 border border-slate-800 text-slate-300">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              {merchants.length} Registered Accounts
            </span>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {successMsg}
        </div>
      )}

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Merchants */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Clients</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{metrics.totalMerchants}</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">{metrics.tierBreakdown?.PRO || 0} Pro</span> •{' '}
            <span className="text-amber-400 font-bold">{metrics.tierBreakdown?.ENTERPRISE || 0} Enterprise</span>
          </div>
        </div>

        {/* Total API Keys */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active API Keys</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Key className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{metrics.totalApiKeys}</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">Provisioned across all websites</div>
        </div>

        {/* Total Messages */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Messages</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {metrics.totalMessages.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            {metrics.totalConversations} unique chat sessions
          </div>
        </div>

        {/* Estimated Token Consumption */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tokens Consumed</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {metrics.totalTokensEstimated > 1000000
                ? `${(metrics.totalTokensEstimated / 1000000).toFixed(2)}M`
                : `${(metrics.totalTokensEstimated / 1000).toFixed(1)}k`}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 font-medium">
            Token-Optimized Engine Active
          </div>
        </div>
      </div>

      {/* Client List & Controls */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl overflow-hidden">
        {/* Table Filters & Search Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">All Client Accounts</h2>
            <p className="text-xs text-slate-400">Manage client tiers, view API key counts and cumulative token usage.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            {/* Tier Filter */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950/80 border border-slate-800 text-xs">
              {['ALL', 'FREE', 'PRO', 'ENTERPRISE'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                    selectedTier === tier
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Merchants Table / Mobile Card Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/50 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4 sm:px-6">Client / Merchant</th>
                <th className="py-3.5 px-4">Plan Package</th>
                <th className="py-3.5 px-4">API Keys</th>
                <th className="py-3.5 px-4">Messages & Tokens</th>
                <th className="py-3.5 px-4">Knowledge & Catalog</th>
                <th className="py-3.5 px-4 text-right sm:pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredMerchants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 text-xs">
                    No client accounts match your current search filters.
                  </td>
                </tr>
              ) : (
                filteredMerchants.map((merchant) => (
                  <tr key={merchant.id} className="hover:bg-slate-800/30 transition">
                    {/* Merchant Info */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center font-extrabold text-amber-400 text-xs shrink-0">
                          {merchant.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white truncate">{merchant.name}</span>
                            {merchant.role === 'ADMIN' && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                ADMIN
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 truncate">{merchant.email}</p>
                          <span className="text-[10px] text-slate-500">
                            Joined {new Date(merchant.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Plan Tier */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          merchant.planTier === 'ENTERPRISE'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : merchant.planTier === 'PRO'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            : 'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {merchant.planTier}
                      </span>
                    </td>

                    {/* API Keys */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{merchant._count.apiKeys}</span>
                        <span className="text-slate-400 text-[11px]">keys</span>
                      </div>
                      {merchant.apiKeys.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {merchant.apiKeys.slice(0, 2).map((k) => (
                            <span
                              key={k.id}
                              className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[9px] text-slate-400 font-mono"
                            >
                              {k.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* Messages & Tokens */}
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                          <MessageSquare className="w-3 h-3 text-purple-400" />
                          <span>{merchant.totalMessages} messages</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-bold">
                          <Cpu className="w-3 h-3 text-amber-400" />
                          <span>~{merchant.totalTokensUsed.toLocaleString()} tokens</span>
                        </div>
                      </div>
                    </td>

                    {/* Knowledge Chunks & Products */}
                    <td className="py-4 px-4">
                      <div className="text-[11px] text-slate-400 space-y-0.5">
                        <p>
                          <span className="font-bold text-white">{merchant._count.knowledgeChunks}</span> knowledge chunks
                        </p>
                        <p>
                          <span className="font-bold text-white">{merchant._count.products}</span> catalog products
                        </p>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right sm:pr-6">
                      <button
                        onClick={() => {
                          setEditingMerchant(merchant);
                          setNewTier(merchant.planTier);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition border border-slate-700/80 hover:border-slate-600"
                      >
                        Change Tier
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Change Package Modal */}
      {editingMerchant && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Change Client Package</h3>
              <button
                onClick={() => setEditingMerchant(null)}
                className="text-slate-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <p className="text-xs font-bold text-white">{editingMerchant.name}</p>
              <p className="text-[11px] text-slate-400">{editingMerchant.email}</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Select Subscription Tier
              </label>
              <select
                value={newTier}
                onChange={(e) => setNewTier(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-amber-500/50"
              >
                <option value="FREE">FREE (1 Chatbot, 500 Messages)</option>
                <option value="STARTER">STARTER (3 Chatbots, 2,500 Messages)</option>
                <option value="PRO">PRO (Unlimited Chatbots, White-labeling)</option>
                <option value="ENTERPRISE">ENTERPRISE (Custom AI Models, Unlimited)</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditingMerchant(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={updatePlanMutation.isPending}
                onClick={() =>
                  updatePlanMutation.mutate({
                    merchantId: editingMerchant.id,
                    planTier: newTier,
                  })
                }
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition disabled:opacity-50"
              >
                {updatePlanMutation.isPending ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

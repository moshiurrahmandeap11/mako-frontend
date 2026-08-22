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
        <div className="w-8 h-8 border-2 border-[#39FF88] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
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
          className="px-4 py-2 rounded-lg bg-[#0B132B] hover:bg-[#131D38] text-[#39FF88] text-xs font-bold transition border border-[#39FF88]/30"
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
      <div className="p-6 sm:p-8 rounded-2xl bg-[#131D38] border border-[#39FF88]/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#39FF88]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#39FF88]/10 text-[#39FF88] border border-[#39FF88]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Master Admin Console
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Client Portfolio & Global Usage
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Monitor active client deployments, provisioned API keys, cumulative token consumption, and manage merchant subscription tiers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0B132B] border border-[#39FF88]/20 text-[#39FF88]">
              <Users className="w-3.5 h-3.5 text-[#39FF88]" />
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
        <div className="p-5 rounded-xl bg-[#131D38] border border-[#39FF88]/20 backdrop-blur-xl relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Total Clients</span>
            <div className="w-8 h-8 rounded-lg bg-[#39FF88]/10 border border-[#39FF88]/30 flex items-center justify-center text-[#39FF88]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{metrics.totalMerchants}</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-300 flex items-center gap-1.5">
            <span className="text-[#39FF88] font-bold">{metrics.tierBreakdown?.PRO || 0} Pro</span> •{' '}
            <span className="text-[#39FF88] font-bold">{metrics.tierBreakdown?.ENTERPRISE || 0} Enterprise</span>
          </div>
        </div>

        {/* Total API Keys */}
        <div className="p-5 rounded-xl bg-[#131D38] border border-[#39FF88]/20 backdrop-blur-xl relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Active API Keys</span>
            <div className="w-8 h-8 rounded-lg bg-[#39FF88]/10 border border-[#39FF88]/30 flex items-center justify-center text-[#39FF88]">
              <Key className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{metrics.totalApiKeys}</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-300">Provisioned across all websites</div>
        </div>

        {/* Total Messages */}
        <div className="p-5 rounded-xl bg-[#131D38] border border-[#39FF88]/20 backdrop-blur-xl relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Total Messages</span>
            <div className="w-8 h-8 rounded-lg bg-[#39FF88]/10 border border-[#39FF88]/30 flex items-center justify-center text-[#39FF88]">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {metrics.totalMessages.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-300">
            {metrics.totalConversations} unique chat sessions
          </div>
        </div>

        {/* Estimated Token Consumption */}
        <div className="p-5 rounded-xl bg-[#131D38] border border-[#39FF88]/20 backdrop-blur-xl relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Tokens Consumed</span>
            <div className="w-8 h-8 rounded-lg bg-[#39FF88]/10 border border-[#39FF88]/30 flex items-center justify-center text-[#39FF88]">
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
          <div className="mt-2 text-[11px] text-[#39FF88] font-bold">
            Token-Optimized Engine Active
          </div>
        </div>
      </div>

      {/* Client List & Controls */}
      <div className="rounded-2xl bg-[#131D38] border border-[#39FF88]/20 backdrop-blur-xl overflow-hidden shadow-2xl">
        {/* Table Filters & Search Bar */}
        <div className="p-4 sm:p-6 border-b border-[#39FF88]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">All Client Accounts</h2>
            <p className="text-xs text-slate-300">Manage client tiers, view API key counts and cumulative token usage.</p>
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
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#0B132B] border border-[#39FF88]/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#39FF88]"
              />
            </div>

            {/* Tier Filter */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#0B132B] border border-[#39FF88]/20 text-xs">
              {['ALL', 'FREE', 'STARTER', 'PRO', 'ENTERPRISE'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                    selectedTier === tier
                      ? 'bg-[#39FF88] text-[#0B132B] shadow-sm font-extrabold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Merchants Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#39FF88]/15 bg-[#0B132B]/50 text-[10px] uppercase font-bold text-slate-300 tracking-wider">
                <th className="p-4">Merchant</th>
                <th className="p-4">Plan Tier</th>
                <th className="p-4">Usage & Tokens</th>
                <th className="p-4">API Keys</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#39FF88]/10 text-xs">
              {filteredMerchants.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400 font-semibold">
                    No merchant accounts found matching filter.
                  </td>
                </tr>
              ) : (
                filteredMerchants.map((m) => (
                  <tr key={m.id} className="hover:bg-[#0B132B]/50 transition">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{m.name}</div>
                      <div className="text-[11px] text-slate-400">{m.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#39FF88]/10 text-[#39FF88] border border-[#39FF88]/30">
                        {m.planTier}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300">
                      <div><span className="font-bold text-white">{m.totalMessages}</span> messages</div>
                      <div className="text-[10px] text-slate-400">{(m.totalTokensUsed / 1000).toFixed(1)}k tokens</div>
                    </td>
                    <td className="p-4 text-slate-300">
                      <span className="font-bold text-white">{m._count?.apiKeys || 0}</span> keys
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setEditingMerchant(m);
                          setNewTier(m.planTier);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#39FF88]/10 text-[#39FF88] border border-[#39FF88]/30 hover:bg-[#39FF88] hover:text-[#0B132B] font-bold text-xs transition"
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

      {/* Edit Tier Modal */}
      {editingMerchant && (
        <div className="fixed inset-0 z-50 bg-[#0B132B]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131D38] border border-[#39FF88]/30 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-extrabold text-white">Update Merchant Plan Tier</h3>
            <p className="text-xs text-slate-300">
              Change subscription tier for <strong className="text-white">{editingMerchant.name}</strong> ({editingMerchant.email}).
            </p>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Select Tier</label>
              <select
                value={newTier}
                onChange={(e) => setNewTier(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B132B] border border-[#39FF88]/30 text-xs text-white focus:outline-none focus:border-[#39FF88]"
              >
                <option value="FREE">FREE</option>
                <option value="STARTER">STARTER</option>
                <option value="PRO">PRO</option>
                <option value="ENTERPRISE">ENTERPRISE</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4 justify-end">
              <button
                onClick={() => setEditingMerchant(null)}
                className="px-4 py-2 rounded-xl bg-[#0B132B] text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                onClick={() => updatePlanMutation.mutate({ merchantId: editingMerchant.id, planTier: newTier })}
                disabled={updatePlanMutation.isPending}
                className="px-4 py-2 rounded-xl bg-[#39FF88] text-[#0B132B] hover:bg-[#00CC66] text-xs font-extrabold transition shadow-lg shadow-[#39FF88]/20"
              >
                {updatePlanMutation.isPending ? 'Updating...' : 'Save Plan Tier'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

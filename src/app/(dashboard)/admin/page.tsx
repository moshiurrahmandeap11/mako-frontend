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
  CheckCircle2,
} from 'lucide-react';
import { api } from '@/lib/axios';
import Button from '@/components/Button';

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
      setSuccessMsg('Merchant plan updated successfully!');
      setEditingMerchant(null);
      setTimeout(() => setSuccessMsg(''), 4000);
    },
  });

  if (isMerchantLoading || (isAdmin && (isOverviewLoading || isMerchantsLoading))) {
    return (
      <div className="p-8 space-y-6">
        <div className="h-28 bg-white border border-[#E4E5E7] rounded-2xl animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-white border border-[#E4E5E7] rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="h-96 bg-white border border-[#E4E5E7] rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const metrics = overviewData?.overview || {
    totalMerchants: 0,
    totalApiKeys: 0,
    totalConversations: 0,
    totalMessages: 0,
    totalTokensEstimated: 0,
    tierBreakdown: {},
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
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E4E5E7] shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#E8F8F0] text-[#1DBF73] border border-[#1DBF73]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Master Admin Console
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#222325] tracking-tight">
              Client Portfolio & Global Usage
            </h1>
            <p className="text-xs sm:text-sm text-[#62646A] max-w-2xl">
              Monitor active client deployments, provisioned API keys, cumulative token consumption, and manage merchant subscription tiers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#E8F8F0] border border-[#1DBF73]/20 text-[#1DBF73]">
              <Users className="w-3.5 h-3.5 text-[#1DBF73]" />
              {merchants.length} Registered Accounts
            </span>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-[#E8F8F0] border border-[#1DBF73]/30 text-[#1DBF73] text-xs sm:text-sm font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {successMsg}
        </div>
      )}

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Merchants */}
        <div className="p-5 rounded-2xl bg-white border border-[#E4E5E7] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#74767E] uppercase tracking-wider">Total Clients</span>
            <div className="w-8 h-8 rounded-xl bg-[#E8F8F0] border border-[#1DBF73]/20 flex items-center justify-center text-[#1DBF73]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#222325]">{metrics.totalMerchants}</span>
          </div>
          <div className="mt-2 text-[11px] text-[#62646A] flex items-center gap-1.5 font-medium">
            <span className="text-[#1DBF73] font-bold">{metrics.tierBreakdown?.PRO || 0} Pro</span> •{' '}
            <span className="text-[#1DBF73] font-bold">{metrics.tierBreakdown?.ENTERPRISE || 0} Enterprise</span>
          </div>
        </div>

        {/* Total API Keys */}
        <div className="p-5 rounded-2xl bg-white border border-[#E4E5E7] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#74767E] uppercase tracking-wider">Active API Keys</span>
            <div className="w-8 h-8 rounded-xl bg-[#E8F8F0] border border-[#1DBF73]/20 flex items-center justify-center text-[#1DBF73]">
              <Key className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#222325]">{metrics.totalApiKeys}</span>
          </div>
          <div className="mt-2 text-[11px] text-[#74767E]">Provisioned across all websites</div>
        </div>

        {/* Total Messages */}
        <div className="p-5 rounded-2xl bg-white border border-[#E4E5E7] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#74767E] uppercase tracking-wider">Total Messages</span>
            <div className="w-8 h-8 rounded-xl bg-[#E8F8F0] border border-[#1DBF73]/20 flex items-center justify-center text-[#1DBF73]">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#222325]">
              {metrics.totalMessages.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-[#74767E]">
            {metrics.totalConversations} unique chat sessions
          </div>
        </div>

        {/* Estimated Token Consumption */}
        <div className="p-5 rounded-2xl bg-white border border-[#E4E5E7] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#74767E] uppercase tracking-wider">Tokens Consumed</span>
            <div className="w-8 h-8 rounded-xl bg-[#E8F8F0] border border-[#1DBF73]/20 flex items-center justify-center text-[#1DBF73]">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#222325]">
              {metrics.totalTokensEstimated > 1000000
                ? `${(metrics.totalTokensEstimated / 1000000).toFixed(2)}M`
                : `${(metrics.totalTokensEstimated / 1000).toFixed(1)}k`}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-[#1DBF73] font-bold">
            Token-Optimized Engine Active
          </div>
        </div>
      </div>

      {/* Client List & Controls */}
      <div className="rounded-2xl bg-white border border-[#E4E5E7] overflow-hidden shadow-sm">
        {/* Table Filters & Search Bar */}
        <div className="p-4 sm:p-6 border-b border-[#E4E5E7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#222325]">All Client Accounts</h2>
            <p className="text-xs text-[#62646A]">Manage client tiers, view API key counts and cumulative token usage.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#74767E]" />
              <input
                type="text"
                placeholder="Search name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#E4E5E7] text-xs text-[#222325] placeholder-[#74767E] focus:outline-none focus:border-[#1DBF73]"
              />
            </div>

            {/* Tier Filter */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F7F7F7] border border-[#E4E5E7] text-xs">
              {['ALL', 'FREE', 'STARTER', 'PRO', 'ENTERPRISE'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                    selectedTier === tier
                      ? 'bg-[#1DBF73] text-white shadow-sm font-extrabold'
                      : 'text-[#74767E] hover:text-[#222325]'
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
              <tr className="border-b border-[#E4E5E7] bg-[#F7F7F7] text-[10px] uppercase font-bold text-[#74767E] tracking-wider">
                <th className="p-4">Merchant</th>
                <th className="p-4">Plan Tier</th>
                <th className="p-4">Usage & Tokens</th>
                <th className="p-4">API Keys</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E5E7] text-xs text-[#404145]">
              {filteredMerchants.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#74767E] font-semibold">
                    No merchant accounts found matching filter.
                  </td>
                </tr>
              ) : (
                filteredMerchants.map((m) => (
                  <tr key={m.id} className="hover:bg-[#F7F7F7] transition">
                    <td className="p-4">
                      <div className="font-bold text-[#222325] text-sm">{m.name}</div>
                      <div className="text-[11px] text-[#74767E]">{m.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#E8F8F0] text-[#1DBF73] border border-[#1DBF73]/30">
                        {m.planTier}
                      </span>
                    </td>
                    <td className="p-4 text-[#404145]">
                      <div><span className="font-bold text-[#222325]">{m.totalMessages}</span> messages</div>
                      <div className="text-[10px] text-[#74767E]">{(m.totalTokensUsed / 1000).toFixed(1)}k tokens</div>
                    </td>
                    <td className="p-4 text-[#404145]">
                      <span className="font-bold text-[#222325]">{m._count?.apiKeys || 0}</span> keys
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="text-[#222325] border-[#E4E5E7]"
                        onClick={() => {
                          setEditingMerchant(m);
                          setNewTier(m.planTier);
                        }}
                      >
                        Change Tier
                      </Button>
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
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E4E5E7] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-[#222325]">Update Merchant Plan Tier</h3>
            <p className="text-xs text-[#62646A]">
              Change subscription tier for <strong className="text-[#222325]">{editingMerchant.name}</strong> ({editingMerchant.email}).
            </p>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#62646A]">Select Tier</label>
              <select
                value={newTier}
                onChange={(e) => setNewTier(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4E5E7] text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73]"
              >
                <option value="FREE">FREE</option>
                <option value="STARTER">STARTER</option>
                <option value="PRO">PRO</option>
                <option value="ENTERPRISE">ENTERPRISE</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4 justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#222325]"
                onClick={() => setEditingMerchant(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                isLoading={updatePlanMutation.isPending}
                onClick={() => updatePlanMutation.mutate({ merchantId: editingMerchant.id, planTier: newTier })}
              >
                Save Plan Tier
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import {
  Key,
  Plus,
  Copy,
  Check,
  ShieldAlert,
  Bot,
  Globe,
} from 'lucide-react';
import { fetchApi } from '@/lib/api-client';
import Button from '@/components/Button';
import { TableRowSkeleton } from '@/components/Skeleton';

const TEMPLATE_PROMPTS: Record<string, string> = {
  'Customer Support': 'You are a professional customer support agent. Answer questions about our products, services, and policies. If you don\'t know the answer, politely redirect the user to a human agent. Always be polite and concise.',
  'FAQ / Knowledge Base': 'You are a knowledgeable FAQ assistant. Answer user questions using only the provided store information and policy facts. Be direct and avoid conversation filler.',
  'Lead Capture': 'You are a friendly lead generation assistant. Ask the user for their name, email, and interest, and explain how we can help. Be welcoming and gather contact information politely.',
  'Booking & Scheduling': 'You are a scheduling assistant. Help the user find suitable times for appointments or support calls. Guide them through our opening hours and capture their preferred slots.',
  'Customer Support & Sales': 'You are a helpful Labto AI Assistant. Assist users with their inquiries, provide customer support, recommend services, and help capture leads.',
  'Onboarding Guide': 'You are a welcoming onboarding assistant. Help new customers navigate our website, understand how to get started, and explain our product features step-by-step.'
};

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form Config State
  const [showConfig, setShowConfig] = useState(false);
  const [name, setName] = useState('');
  const [template, setTemplate] = useState('Customer Support');
  const [prompt, setPrompt] = useState(TEMPLATE_PROMPTS['Customer Support']);
  const [domains, setDomains] = useState<string[]>(['localhost', '127.0.0.1']);
  const [domainInput, setDomainInput] = useState('');

  // Response UI State
  const [newKeyData, setNewKeyData] = useState<any>(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const loadKeys = async () => {
    setLoading(true);
    try {
      const data = await fetchApi('/api/keys');
      setKeys(data.keys || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKeys();
  }, []);

  const handleTemplateChange = (selectedTemplate: string) => {
    setTemplate(selectedTemplate);
    setPrompt(TEMPLATE_PROMPTS[selectedTemplate] || '');
  };

  const handleAddDomain = () => {
    const val = domainInput.trim().toLowerCase();
    if (val && !domains.includes(val)) {
      setDomains([...domains, val]);
      setDomainInput('');
    }
  };

  const handleRemoveDomain = (domainToRemove: string) => {
    setDomains(domains.filter((d) => d !== domainToRemove));
  };

  const handleCreateChatbot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (domains.length === 0) {
      alert('At least one allowed domain is required (e.g. localhost or shop.yourstore.com)');
      return;
    }
    setGenerating(true);
    setNewKeyData(null);
    try {
      const data = await fetchApi('/api/keys', {
        method: 'POST',
        body: JSON.stringify({
          name: name || 'My Support Bot',
          template,
          systemPrompt: prompt,
          allowedDomains: domains,
        }),
      });
      setNewKeyData(data.apiKey);
      setShowConfig(false);
      setName('');
      setDomains(['localhost', '127.0.0.1']);
      loadKeys();
    } catch (err: any) {
      alert(err.message || 'Failed to generate API Key');
    } finally {
      setGenerating(false);
    }
  };

  const handleRevokeKey = async (id: string) => {
    if (!confirm('Are you sure you want to revoke this API key? Embedded widgets using this key will stop functioning.')) return;

    try {
      await fetchApi(`/api/keys/${id}`, { method: 'DELETE' });
      loadKeys();
    } catch (err: any) {
      alert(err.message || 'Failed to revoke key');
    }
  };

  const copyFullKey = () => {
    if (newKeyData?.fullKey) {
      navigator.clipboard.writeText(newKeyData.fullKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">API Key Security</h1>
          <p className="text-slate-400 text-xs mt-1">Manage API keys used to authenticate widget requests from your storefront</p>
        </div>

        <Button onClick={() => setShowConfig(!showConfig)} variant="filled">
          <span className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>{showConfig ? 'Cancel' : 'Create New API Key'}</span>
          </span>
        </Button>
      </div>

      {/* Interactive Chatbot Creation Form */}
      {showConfig && (
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Bot className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-white">Configure New Chatbot API Key</h2>
          </div>

          <form onSubmit={handleCreateChatbot} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Chatbot Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sales Assistant"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Persona Template</label>
                <select
                  value={template}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  {Object.keys(TEMPLATE_PROMPTS).map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">System Instructions / Prompt</label>
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Allowed Host Domains</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="e.g. shop.mystore.com or *.mystore.com"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDomain())}
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <Button type="button" onClick={handleAddDomain} variant="outline">
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {domains.map((dom) => (
                  <span key={dom} className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono font-bold">
                    <Globe className="w-3 h-3 text-amber-500" />
                    {dom}
                    <button type="button" onClick={() => handleRemoveDomain(dom)} className="hover:text-rose-400">✕</button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <Button type="submit" disabled={generating} variant="filled">
                {generating ? 'Generating...' : 'Save & Generate Key'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Generated Key Security Alert Modal */}
      {newKeyData && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-amber-500/40 text-amber-400 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-amber-500" />
            <span>Save Your API Key Now!</span>
          </div>
          <p className="text-xs text-slate-300">
            This is the only time your unhashed API key will be displayed. Copy and save it safely:
          </p>

          <div className="flex items-center gap-3">
            <code className="flex-1 p-3 bg-slate-950 border border-amber-500/30 rounded font-mono text-xs text-amber-400 select-all overflow-x-auto">
              {newKeyData.fullKey}
            </code>
            <Button onClick={copyFullKey} variant="filled">
              <span className="flex items-center gap-1.5">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </span>
            </Button>
          </div>
        </div>
      )}

      {/* Keys Table List */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Name / Key Prefix</th>
                <th className="py-4 px-6">Template</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Created Date</th>
                <th className="py-4 px-6">Last Used</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm text-slate-300">
              {loading ? (
                <>
                  <TableRowSkeleton columns={6} />
                  <TableRowSkeleton columns={6} />
                  <TableRowSkeleton columns={6} />
                </>
              ) : keys.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500 text-xs">
                    <Key className="w-8 h-8 mx-auto mb-2 opacity-40 text-amber-500" />
                    No API keys found. Click "Create New API Key" to generate your first key!
                  </td>
                </tr>
              ) : (
                keys.map((k) => (
                  <tr key={k.id} className="hover:bg-slate-850/40 transition">
                    <td className="py-4 px-6">
                      <p className="font-bold text-white text-xs">{k.name || 'Chatbot API Key'}</p>
                      <p className="font-mono text-[11px] text-amber-500 font-bold">{k.keyPrefix}****************</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-slate-950 text-slate-300 border border-slate-800">
                        {k.template || 'Customer Support'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${k.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${k.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                        {k.isActive ? 'Active' : 'Revoked'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-400">
                      {new Date(k.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-400">
                      {k.lastUsedAt ? new Date(k.lastUsedAt).toLocaleString() : 'Never'}
                    </td>
                    <td className="py-4 px-6 text-right">
                      {k.isActive && (
                        <button
                          onClick={() => handleRevokeKey(k.id)}
                          className="px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 rounded transition font-medium"
                        >
                          Revoke Key
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

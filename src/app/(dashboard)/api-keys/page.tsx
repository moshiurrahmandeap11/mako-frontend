'use client';

import { useState, useEffect } from 'react';
import {
  Key,
  Plus,
  Copy,
  Check,
  ShieldAlert,
  Trash2,
  Bot,
  Settings,
  Globe,
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';
import { fetchApi } from '@/lib/api-client';

const TEMPLATE_PROMPTS: Record<string, string> = {
  'Customer Support': 'You are a professional customer support agent. Answer questions about our products, services, and policies. If you don\'t know the answer, politely redirect the user to a human agent. Always be polite and concise.',
  'FAQ / Knowledge Base': 'You are a knowledgeable FAQ assistant. Answer user questions using only the provided store information and policy facts. Be direct and avoid conversation filler.',
  'Lead Capture': 'You are a friendly lead generation assistant. Ask the user for their name, email, and interest, and explain how we can help. Be welcoming and gather contact information politely.',
  'Booking & Scheduling': 'You are a scheduling assistant. Help the user find suitable times for appointments or support calls. Guide them through our opening hours and capture their preferred slots.',
  'E-commerce Shopping': 'You are a helpful AI Shopping Assistant. Recommend catalog products, search our store inventory, provide prices, and call the add_to_cart tool when the user confirms they want to buy an item.',
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
    if (!confirm('Are you sure you want to revoke this chatbot API key? Embedded widgets using this key will stop functioning.')) return;

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
          <h1 className="text-2xl font-bold text-white tracking-tight">Chatbot Configurator & Keys</h1>
          <p className="text-slate-400 text-xs mt-1">Manage, template, and secure your storefront AI chatbot assistants</p>
        </div>

        {!showConfig && (
          <button
            onClick={() => {
              setShowConfig(true);
              setNewKeyData(null);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-500/20 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Chatbot</span>
          </button>
        )}
      </div>

      {/* Configuration Form Card (from user screenshot) */}
      {showConfig && (
        <form onSubmit={handleCreateChatbot} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 max-w-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-indigo-400" />
              Chatbot Configuration
            </span>
            <button
              type="button"
              onClick={() => setShowConfig(false)}
              className="text-slate-400 hover:text-white text-xs font-semibold"
            >
              Cancel
            </button>
          </div>

          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-350 uppercase tracking-wider">
              Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My Support Bot"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Template Selection Dropdown */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-350 uppercase tracking-wider">
              Start from a template
            </label>
            <select
              value={template}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition cursor-pointer"
            >
              {Object.keys(TEMPLATE_PROMPTS).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* System Prompt Instruction Editor */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-350 uppercase tracking-wider flex items-center gap-1.5">
              <span>System Prompt Instructions</span>
              <Info className="w-3.5 h-3.5 text-slate-500" />
            </label>
            <textarea
              rows={4}
              required
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter system prompt instructions for the AI..."
              className="w-full px-4 py-3 bg-slate-950 border border-slate-850 rounded-xl text-xs font-sans leading-relaxed text-slate-200 focus:outline-none focus:border-indigo-500 transition"
            />
            <p className="text-[10px] text-slate-500 italic">
              * The prompt will instruct Groq / OpenRouter / Claude on how to answer visitors.
            </p>
          </div>

          {/* Allowed Whitelist Domains Tag Builder */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-350 uppercase tracking-wider">
              Allowed Domains <span className="text-rose-500">*</span>
            </label>
            <p className="text-[10px] text-slate-500">At least one domain is required (e.g. localhost, mysite.com):</p>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. shop.example.com"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDomain())}
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs text-white placeholder-slate-700 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddDomain}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl"
              >
                + Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1.5">
              {domains.map((dom) => (
                <span key={dom} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-mono">
                  {dom}
                  <button type="button" onClick={() => handleRemoveDomain(dom)} className="hover:text-rose-450 font-bold ml-1">✕</button>
                </span>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setShowConfig(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-350 text-xs font-semibold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={generating || domains.length === 0}
              className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-650 hover:to-purple-700 text-white text-xs font-semibold rounded-xl disabled:opacity-50 shadow-lg shadow-indigo-500/25"
            >
              {generating ? 'Creating...' : 'Create Chatbot'}
            </button>
          </div>
        </form>
      )}

      {/* Generated Key Security Modal */}
      {newKeyData && (
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-3 shadow-2xl max-w-2xl">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 animate-bounce" />
            <span>Chatbot Connected Successfully! Save Your API Key Now</span>
          </div>
          <p className="text-xs text-amber-300/80 leading-relaxed">
            This is the only time your chatbot's API key will be shown in raw text. Copy and store it safely in a secure location:
          </p>

          <div className="flex items-center gap-3">
            <code className="flex-1 p-3 bg-slate-950 border border-amber-500/30 rounded-xl font-mono text-xs text-amber-300 select-all overflow-x-auto">
              {newKeyData.fullKey}
            </code>
            <button
              onClick={copyFullKey}
              className="flex items-center gap-1.5 px-4 py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Active Chatbots Table List */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 bg-slate-950/30 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Active Chatbots & API Whitelists
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Chatbot Name</th>
                <th className="py-4 px-6">Template type</th>
                <th className="py-4 px-6">API Key Prefix</th>
                <th className="py-4 px-6">Whitelisted Domains</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500">
                    Loading active chatbots...
                  </td>
                </tr>
              ) : keys.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500">
                    <Key className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    No active chatbots found. Create a chatbot configurator above!
                  </td>
                </tr>
              ) : (
                keys.map((k) => (
                  <tr key={k.id} className="hover:bg-slate-850/50 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-indigo-400" />
                        <span className="font-semibold text-white">{k.name || 'My Chatbot'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-xs text-slate-300">
                        {k.template || 'Customer Support'}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-slate-400">
                      {k.keyPrefix}****************
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {k.allowedDomains && k.allowedDomains.length > 0 ? (
                          k.allowedDomains.map((d: string) => (
                            <span key={d} className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400">
                              {d}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-500 italic text-xs">All (*)</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${k.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${k.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                        {k.isActive ? 'Active' : 'Revoked'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {k.isActive && (
                        <button
                          onClick={() => handleRevokeKey(k.id)}
                          className="px-3 py-1.5 text-xs text-rose-450 hover:bg-rose-500/10 border border-rose-500/20 rounded-lg transition font-medium"
                        >
                          Revoke
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

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
import swal from '@/lib/swal';
import { TableRowSkeleton } from '@/components/Skeleton';
import Link from 'next/link';

const TEMPLATE_PROMPTS: Record<string, string> = {
  'Customer Support': 'You are a professional customer support agent. Answer questions about our products, services, and policies. If you don\'t know the answer, politely redirect the user to a human agent. Always be polite and concise.',
  'FAQ / Knowledge Base': 'You are a knowledgeable FAQ assistant. Answer user questions using only the provided store information and policy facts. Be direct and avoid conversation filler.',
  'Booking & Scheduling': 'You are a scheduling assistant. Help the user find suitable times for appointments or support calls. Guide them through our opening hours and capture their preferred slots.',
  'Customer Support & Sales': 'You are a helpful Labto AI Assistant. Assist users with their inquiries, provide customer support, recommend services, and help capture leads.',
};

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form Config State
  const [showConfig, setShowConfig] = useState(false);
  const [name, setName] = useState('');
  const [template, setTemplate] = useState('Customer Support');
  const [prompt, setPrompt] = useState(TEMPLATE_PROMPTS['Customer Support']);

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

  const handleCreateChatbot = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setNewKeyData(null);
    try {
      const data = await fetchApi('/api/keys', {
        method: 'POST',
        body: JSON.stringify({
          name: name || 'My Support Bot',
          template,
          systemPrompt: prompt,
          allowedDomains: [],
        }),
      });
      setNewKeyData(data.apiKey);
      setShowConfig(false);
      setName('');
      loadKeys();
    } catch (err: any) {
      swal.fire({
        icon: 'error',
        title: 'Generation Failed',
        text: err.message || 'Failed to generate API Key.',
        confirmButtonText: 'OK',
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleRevokeKey = async (id: string) => {
    const result = await swal.fire({
      icon: 'warning',
      title: 'Revoke API Key?',
      text: 'Embedded widgets using this key will immediately stop functioning.',
      showCancelButton: true,
      confirmButtonText: 'Yes, Revoke It',
      cancelButtonText: 'Cancel',
    });
    if (!result.isConfirmed) return;

    try {
      await fetchApi(`/api/keys/${id}`, { method: 'DELETE' });
      loadKeys();
      swal.fire({
        icon: 'success',
        title: 'Key Revoked',
        text: 'The API key has been successfully revoked.',
        confirmButtonText: 'OK',
        timer: 2500,
        timerProgressBar: true,
      });
    } catch (err: any) {
      swal.fire({
        icon: 'error',
        title: 'Revoke Failed',
        text: err.message || 'Failed to revoke key.',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleDeleteKey = async (id: string) => {
    const result = await swal.fire({
      icon: 'error',
      title: 'Delete API Key?',
      text: 'This action is permanent and cannot be undone. All widgets using this key will break.',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
    });
    if (!result.isConfirmed) return;

    try {
      await fetchApi(`/api/keys/${id}/delete`, { method: 'DELETE' });
      loadKeys();
      swal.fire({
        icon: 'success',
        title: 'Key Deleted',
        text: 'The API key has been permanently removed.',
        confirmButtonText: 'OK',
        timer: 2500,
        timerProgressBar: true,
      });
    } catch (err: any) {
      swal.fire({
        icon: 'error',
        title: 'Delete Failed',
        text: err.message || 'Failed to delete key.',
        confirmButtonText: 'OK',
      });
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
          <h1 className="text-2xl font-bold text-[#222325] tracking-tight">API Key Security</h1>
          <p className="text-[#62646A] text-xs mt-1">Manage API keys used to authenticate widget requests from your storefront</p>
        </div>

        <Button onClick={() => setShowConfig(!showConfig)} variant="primary">
          <span className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>{showConfig ? 'Cancel' : 'Create New API Key'}</span>
          </span>
        </Button>
      </div>

      {/* Interactive Chatbot Creation Form */}
      {showConfig && (
        <div className="bg-white border border-[#E4E5E7] rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-[#E4E5E7] pb-3">
            <Bot className="w-5 h-5 text-[#1DBF73]" />
            <h2 className="text-base font-bold text-[#222325]">Configure New Chatbot API Key</h2>
          </div>

          <form onSubmit={handleCreateChatbot} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-[#62646A] uppercase tracking-wider mb-2">Chatbot Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sales Assistant"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#E4E5E7] rounded-xl text-sm text-[#222325] focus:outline-none focus:border-[#1DBF73]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#62646A] uppercase tracking-wider mb-2">Persona Template</label>
                <select
                  value={template}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#E4E5E7] rounded-xl text-sm text-[#222325] focus:outline-none focus:border-[#1DBF73]"
                >
                  {Object.keys(TEMPLATE_PROMPTS).map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#62646A] uppercase tracking-wider mb-2">System Instructions / Prompt</label>
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-3 bg-white border border-[#E4E5E7] rounded-xl text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73] font-mono"
              />
            </div>

            <div className="p-4 rounded-xl bg-[#F7F7F7] border border-[#E4E5E7] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#404145]">
                <Globe className="w-4 h-4 text-[#1DBF73] flex-shrink-0" />
                <span>Allowed host domains are managed globally under <strong>Widget Settings</strong>.</span>
              </div>
              <Link href="/widget-settings" className="text-[#1DBF73] hover:underline font-bold ml-2">
                Manage →
              </Link>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#E4E5E7]">
              <Button type="submit" disabled={generating} variant="primary">
                {generating ? 'Generating...' : 'Save & Generate Key'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Generated Key Security Alert Modal */}
      {newKeyData && (
        <div className="p-6 rounded-2xl bg-[#E8F8F0] border border-[#1DBF73]/40 text-[#1DBF73] space-y-3 shadow-md">
          <div className="flex items-center gap-2 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-[#1DBF73]" />
            <span className="text-[#222325]">Save Your API Key Now!</span>
          </div>
          <p className="text-xs text-[#404145]">
            This is the only time your unhashed API key will be displayed. Copy and save it safely:
          </p>

          <div className="flex items-center gap-3">
            <code className="flex-1 p-3 bg-white border border-[#1DBF73]/30 rounded-xl font-mono text-xs text-[#1DBF73] select-all overflow-x-auto font-bold">
              {newKeyData.fullKey}
            </code>
            <Button onClick={copyFullKey} variant="primary">
              <span className="flex items-center gap-1.5">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </span>
            </Button>
          </div>
        </div>
      )}

      {/* Keys Table List */}
      <div className="bg-white border border-[#E4E5E7] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E4E5E7] bg-[#F7F7F7] text-[10px] font-bold text-[#74767E] uppercase tracking-wider">
                <th className="py-4 px-6">Name / Key Prefix</th>
                <th className="py-4 px-6">Template</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Created Date</th>
                <th className="py-4 px-6">Last Used</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E5E7] text-sm text-[#404145]">
              {loading ? (
                <>
                  <TableRowSkeleton columns={6} />
                  <TableRowSkeleton columns={6} />
                  <TableRowSkeleton columns={6} />
                </>
              ) : keys.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-[#74767E] text-xs">
                    <Key className="w-8 h-8 mx-auto mb-2 opacity-40 text-[#1DBF73]" />
                    No API keys found. Click "Create New API Key" to generate your first key!
                  </td>
                </tr>
              ) : (
                keys.map((k) => (
                  <tr key={k.id} className="hover:bg-[#F7F7F7] transition">
                    <td className="py-4 px-6">
                      <p className="font-bold text-[#222325] text-xs">{k.name || 'Chatbot API Key'}</p>
                      <p className="font-mono text-[11px] text-[#1DBF73] font-bold">{k.keyPrefix}****************</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-[#F7F7F7] text-[#404145] border border-[#E4E5E7]">
                        {k.template || 'Customer Support'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${k.isActive ? 'bg-[#E8F8F0] text-[#1DBF73] border border-[#1DBF73]/20' : 'bg-slate-100 text-[#74767E] border border-slate-200'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${k.isActive ? 'bg-[#1DBF73]' : 'bg-slate-400'}`} />
                        {k.isActive ? 'Active' : 'Revoked'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-[#74767E]">
                      {new Date(k.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-xs text-[#74767E]">
                      {k.lastUsedAt ? new Date(k.lastUsedAt).toLocaleString() : 'Never'}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        {k.isActive && (
                          <button
                            onClick={() => handleRevokeKey(k.id)}
                            className="px-3 py-1.5 text-xs text-amber-600 hover:bg-amber-50 border border-amber-200 rounded-lg transition font-semibold"
                          >
                            Revoke
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteKey(k.id)}
                          className="px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg transition font-semibold"
                        >
                          Delete
                        </button>
                      </div>
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

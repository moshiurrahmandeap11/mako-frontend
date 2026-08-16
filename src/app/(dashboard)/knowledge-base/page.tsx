'use client';

import { useState, useEffect } from 'react';
import {
  Globe,
  Plus,
  RefreshCw,
  Trash2,
  BookOpen,
  Search,
  ExternalLink,
  Layers,
  FileText,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { fetchApi } from '@/lib/api-client';
import Button from '@/components/Button';
import { TableRowSkeleton } from '@/components/Skeleton';
import swal from '@/lib/swal';

export default function KnowledgeBasePage() {
  const [knowledgeData, setKnowledgeData] = useState<{
    totalChunks: number;
    totalPages: number;
    sources: { url: string; chunkCount: number }[];
    chunks: { id: string; url: string; content: string; createdAt: string }[];
  }>({
    totalChunks: 0,
    totalPages: 0,
    sources: [],
    chunks: [],
  });

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('all');

  // Modal states
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [scrapingUrl, setScrapingUrl] = useState(false);
  const [urlError, setUrlError] = useState('');

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteSourceUrl, setNoteSourceUrl] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [noteError, setNoteError] = useState('');

  const [rescapingAll, setRescrapingAll] = useState(false);

  const loadKnowledge = async () => {
    setLoading(true);
    try {
      const data = await fetchApi('/api/knowledge');
      setKnowledgeData(data);
    } catch (err) {
      console.error('Failed to load knowledge base:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKnowledge();
  }, []);

  const handleScrapeSingleUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setUrlError('');
    setScrapingUrl(true);

    try {
      const res = await fetchApi('/api/knowledge/scrape-url', {
        method: 'POST',
        body: JSON.stringify({ url: urlInput.trim() }),
      });

      setShowUrlModal(false);
      setUrlInput('');
      swal.fire({
        icon: 'success',
        title: 'URL Indexed Successfully',
        text: `Indexed ${res.chunksCreated || 0} knowledge chunks & ${res.productsIndexed || 0} items from ${res.pageTitle || 'the page'}.`,
        timer: 3000,
        showConfirmButton: false,
      });
      loadKnowledge();
    } catch (err: any) {
      setUrlError(err.message || 'Failed to crawl and index URL');
    } finally {
      setScrapingUrl(false);
    }
  };

  const handleAddCustomNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;
    setNoteError('');
    setSavingNote(true);

    try {
      await fetchApi('/api/knowledge/custom', {
        method: 'POST',
        body: JSON.stringify({
          title: noteTitle.trim(),
          content: noteContent.trim(),
          sourceUrl: noteSourceUrl.trim() || undefined,
        }),
      });

      setShowNoteModal(false);
      setNoteTitle('');
      setNoteContent('');
      setNoteSourceUrl('');
      swal.fire({
        icon: 'success',
        title: 'Custom Knowledge Saved',
        text: 'The AI assistant can now use this note to answer visitor inquiries.',
        timer: 2500,
        showConfirmButton: false,
      });
      loadKnowledge();
    } catch (err: any) {
      setNoteError(err.message || 'Failed to save note');
    } finally {
      setSavingNote(false);
    }
  };

  const handleDeleteChunk = async (id: string) => {
    const result = await swal.fire({
      icon: 'warning',
      title: 'Delete Knowledge Chunk?',
      text: 'This snippet will be permanently deleted from the AI context.',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#ef4444',
      cancelButtonText: 'Cancel',
      background: '#0f172a',
      color: '#f8fafc',
    });

    if (result.isConfirmed) {
      try {
        await fetchApi(`/api/knowledge/${id}`, { method: 'DELETE' });
        loadKnowledge();
        swal.fire({
          icon: 'success',
          title: 'Deleted',
          text: 'Knowledge chunk has been removed.',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err: any) {
        swal.fire({
          icon: 'error',
          title: 'Failed to delete',
          text: err.message,
        });
      }
    }
  };

  const handleDeleteAllChunks = async () => {
    const result = await swal.fire({
      icon: 'warning',
      title: 'Clear ALL Knowledge Base Chunks?',
      text: 'This will permanently wipe all scraped & indexed content. You can click Re-crawl Store anytime to refresh.',
      showCancelButton: true,
      confirmButtonText: 'Yes, Clear All',
      confirmButtonColor: '#ef4444',
      cancelButtonText: 'Cancel',
      background: '#0f172a',
      color: '#f8fafc',
    });

    if (result.isConfirmed) {
      try {
        await fetchApi('/api/knowledge/clear-all', { method: 'DELETE' });
        loadKnowledge();
        swal.fire({
          icon: 'success',
          title: 'Cleared',
          text: 'All knowledge base data has been cleared.',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err: any) {
        swal.fire({
          icon: 'error',
          title: 'Failed to clear',
          text: err.message,
        });
      }
    }
  };

  const handleRescrapeAll = async () => {
    const result = await swal.fire({
      icon: 'question',
      title: 'Re-crawl Entire Website?',
      text: 'Our 4-tier hybrid crawler will re-scan all sitemaps, SPA routes, and DOM pages to refresh your AI memory.',
      showCancelButton: true,
      confirmButtonText: 'Start Crawl',
      cancelButtonText: 'Cancel',
      background: '#0f172a',
      color: '#f8fafc',
    });

    if (result.isConfirmed) {
      setRescrapingAll(true);
      try {
        const res = await fetchApi('/api/knowledge/rescrape-all', { method: 'POST' });
        swal.fire({
          icon: 'success',
          title: 'Crawl Completed!',
          text: `Crawled ${res.pagesCrawled || 0} pages and created ${res.chunksCreated || 0} knowledge chunks.`,
          background: '#0f172a',
          color: '#f8fafc',
        });
        loadKnowledge();
      } catch (err: any) {
        swal.fire({
          icon: 'error',
          title: 'Crawl Failed',
          text: err.message || 'Unable to complete domain crawl',
        });
      } finally {
        setRescrapingAll(false);
      }
    }
  };

  const filteredChunks = knowledgeData.chunks.filter((chunk) => {
    const matchesSearch =
      search === '' ||
      chunk.content.toLowerCase().includes(search.toLowerCase()) ||
      chunk.url.toLowerCase().includes(search.toLowerCase());
    const matchesSource = selectedSource === 'all' || chunk.url === selectedSource;
    return matchesSearch && matchesSource;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-indigo-400" />
            AI Knowledge Base & Content
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage scraped website content, indexed URLs, and custom notes powering your AI assistant.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Button
            variant="outline"
            onClick={handleDeleteAllChunks}
            className="flex items-center gap-2 border-rose-800/60 bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 text-sm"
          >
            <Trash2 className="w-4 h-4 text-rose-400" />
            Clear All Data
          </Button>

          <Button
            variant="outline"
            onClick={handleRescrapeAll}
            disabled={rescapingAll}
            className="flex items-center gap-2 border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${rescapingAll ? 'animate-spin text-indigo-400' : ''}`} />
            {rescapingAll ? 'Crawling Website...' : 'Re-crawl Store'}
          </Button>

          <Button
            variant="outline"
            onClick={() => setShowUrlModal(true)}
            className="flex items-center gap-2 border-indigo-500/40 bg-indigo-950/30 hover:bg-indigo-900/50 text-indigo-300 text-sm"
          >
            <Globe className="w-4 h-4" />
            Add Custom URL
          </Button>

          <Button
            onClick={() => setShowNoteModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Custom Note / FAQ
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Knowledge Chunks</span>
            <Layers className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-bold text-white mt-3">{loading ? '...' : knowledgeData.totalChunks}</div>
          <p className="text-xs text-slate-400 mt-1">Vector embeddings indexed in pgvector memory</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Indexed Sources & Pages</span>
            <Globe className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white mt-3">{loading ? '...' : knowledgeData.totalPages}</div>
          <p className="text-xs text-slate-400 mt-1">Discovered via Sitemaps, SPA routes & DOM links</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Automated Syncing</span>
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex items-center gap-2 mt-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <span className="text-lg font-bold text-white">Daily 12:00 PM BST</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Automated background crawler keeps knowledge fresh</p>
        </div>
      </div>

      {/* Main Table / Explorer */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search in knowledge base contents or URLs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="all">All Indexed Sources ({knowledgeData.sources.length})</option>
              {knowledgeData.sources.map((s, idx) => (
                <option key={idx} value={s.url}>
                  {s.url.length > 50 ? `${s.url.slice(0, 50)}...` : s.url} ({s.chunkCount})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chunks List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/50 text-xs font-semibold uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Source / Origin</th>
                <th className="py-3 px-4">Knowledge Chunk Content</th>
                <th className="py-3 px-4">Added On</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} />)
              ) : filteredChunks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500">
                    <FileText className="w-10 h-10 mx-auto mb-2 opacity-40 text-slate-400" />
                    No knowledge chunks found. Click &quot;Add Custom URL&quot; or &quot;Re-crawl Store&quot; to populate your AI memory.
                  </td>
                </tr>
              ) : (
                filteredChunks.map((chunk) => (
                  <tr key={chunk.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 align-top w-1/4">
                      {chunk.url.startsWith('http') ? (
                        <a
                          href={chunk.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 break-all text-xs font-medium"
                        >
                          {chunk.url}
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40 text-xs font-mono">
                          Custom Note
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 align-top">
                      <div className="bg-slate-950/40 border border-slate-800/60 rounded-lg p-3 text-xs text-slate-300 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto leading-relaxed">
                        {chunk.content}
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top text-xs text-slate-500 whitespace-nowrap">
                      {chunk.createdAt ? new Date(chunk.createdAt).toLocaleDateString() : 'Active'}
                    </td>
                    <td className="py-4 px-4 align-top text-right whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteChunk(chunk.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-950/40 transition-colors"
                        title="Delete Chunk"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Custom URL Modal */}
      {showUrlModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-400" />
                Index Specific URL
              </h2>
              <button
                onClick={() => setShowUrlModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Provide a specific page link (e.g. <code>https://yourdomain.com/projects/item</code>, pricing, or service page). Our crawler will immediately extract text, markdown, and items.
            </p>

            <form onSubmit={handleScrapeSingleUrl} className="space-y-4">
              {urlError && (
                <div className="p-3 bg-rose-950/50 border border-rose-800 text-rose-300 text-xs rounded-xl">
                  {urlError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Page URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://example.com/services/web-development"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowUrlModal(false)}
                  className="text-sm"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={scrapingUrl}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm"
                >
                  {scrapingUrl ? 'Crawling & Indexing...' : 'Crawl & Index URL'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Custom Note / FAQ Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                Add Custom Note or Policy
              </h2>
              <button
                onClick={() => setShowNoteModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Directly feed custom instructions, FAQs, project descriptions, or contact details into the AI assistant.
            </p>

            <form onSubmit={handleAddCustomNote} className="space-y-4">
              {noteError && (
                <div className="p-3 bg-rose-950/50 border border-rose-800 text-rose-300 text-xs rounded-xl">
                  {noteError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Title / Topic</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3D Project Portfolio & Pricing"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Source Link (Optional)</label>
                <input
                  type="url"
                  placeholder="https://example.com/projects/aeshut"
                  value={noteSourceUrl}
                  onChange={(e) => setNoteSourceUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Content / Details (Markdown supported)</label>
                <textarea
                  required
                  rows={6}
                  placeholder={`- Project Aeshut: Immersive 3D Experience (https://example.com/projects/aeshut)\n- Project Regar: Next-Gen Commerce (https://example.com/projects/regar)\n- Custom quotes starting from $2,500.`}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNoteModal(false)}
                  className="text-sm"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={savingNote}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm"
                >
                  {savingNote ? 'Saving...' : 'Save Knowledge Note'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

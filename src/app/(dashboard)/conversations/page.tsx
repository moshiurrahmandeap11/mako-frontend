'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Calendar, User, Bot, ShoppingBag, Download } from 'lucide-react';
import { fetchApi } from '@/lib/api-client';
import { SessionListSkeleton } from '@/components/Skeleton';

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  useEffect(() => {
    fetchApi('/api/analytics/conversations')
      .then((data) => {
        const list = data.conversations || [];
        setConversations(list);
        if (list.length > 0) setSelectedConversation(list[0]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDownloadPdf = async () => {
    if (!selectedConversation?.sessionId) return;
    setDownloadingPdf(true);
    try {
      const res = await fetch(`/api/analytics/conversations/${selectedConversation.sessionId}/pdf`, {
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to generate PDF');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transcript-${selectedConversation.sessionId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download PDF error:', err);
      alert('Failed to download PDF transcript. Please try again.');
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Conversation Analytics & Chat Logs</h1>
        <p className="text-slate-400 text-xs mt-1">Review live chat transcripts and shopper product interactions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[640px]">
        {/* Left List Pane: Sessions */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl flex flex-col overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-500" />
              Visitor Sessions ({conversations.length})
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {loading ? (
              <SessionListSkeleton />
            ) : conversations.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No chat logs recorded yet. Test your widget on a storefront!
              </div>
            ) : (
              conversations.map((conv) => {
                const isSelected = selectedConversation?.id === conv.id;
                const messageCount = conv.messages?.length || 0;
                const lastMessage = conv.messages?.[conv.messages.length - 1];

                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full text-left p-4 transition flex flex-col gap-1.5 ${
                      isSelected
                        ? 'bg-amber-500/10 border-l-4 border-amber-500'
                        : 'hover:bg-slate-850/40 border-l-4 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-amber-500 truncate">
                        {conv.sessionId}
                      </span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(conv.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-1">
                      {lastMessage?.content || 'No messages'}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500">
                      <span>{messageCount} message{messageCount === 1 ? '' : 's'}</span>
                      <span className="text-emerald-400 font-medium">Session Recorded</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane: Selected Transcript Viewer */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800/80 rounded-2xl flex flex-col overflow-hidden shadow-xl">
          {selectedConversation ? (
            <>
              {/* Transcript Header */}
              <div className="p-4 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-white font-mono">{selectedConversation.sessionId}</h2>
                  <p className="text-[11px] text-slate-400">Started on {new Date(selectedConversation.createdAt).toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    {selectedConversation.messages?.length || 0} Messages
                  </span>

                  <button
                    onClick={handleDownloadPdf}
                    disabled={downloadingPdf}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
                    title="Download conversation transcript as PDF for research"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>{downloadingPdf ? 'Exporting...' : 'Export PDF'}</span>
                  </button>
                </div>
              </div>

              {/* Transcript Messages List */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-950/40">
                {selectedConversation.messages?.map((msg: any) => {
                  const isUser = msg.role === 'user';

                  return (
                    <div key={msg.id} className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded flex items-center justify-center text-xs shrink-0 font-bold ${isUser ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-amber-500 border border-slate-700'}`}>
                        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>

                      <div className={`max-w-[80%] space-y-2`}>
                        <div
                          className={`p-4 rounded-2xl text-xs leading-relaxed ${
                            isUser
                              ? 'bg-amber-500 text-slate-950 font-bold rounded-tr-none'
                              : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                          }`}
                        >
                          {msg.content}
                        </div>

                        {/* Tool Execution Details if present */}
                        {msg.toolCalls && (
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-2">
                            <div className="flex items-center gap-1.5 text-amber-500 font-bold text-[11px]">
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>AI Tool Executed: Catalog Products Recommended</span>
                            </div>

                            {msg.toolCalls.recommendedProducts && (
                              <div className="grid grid-cols-2 gap-2">
                                {msg.toolCalls.recommendedProducts.map((p: any) => (
                                  <div key={p.id} className="p-2 rounded bg-slate-950 border border-slate-800 text-[11px]">
                                    <p className="font-bold text-white truncate">{p.title}</p>
                                    <p className="text-amber-500 font-bold">${p.price} {p.currency}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        <span className={`block text-[10px] text-slate-500 ${isUser ? 'text-right' : 'text-left'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
              <MessageSquare className="w-10 h-10 mb-2 opacity-40 text-amber-500" />
              <p className="text-sm font-medium text-slate-400">Select a visitor session on the left to view transcript</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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
    <div className="space-y-3">
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-normal text-[#222325] tracking-tight">Conversation Analytics & Chat Logs</h1>
        <p className="text-[#62646A] text-xs sm:text-sm mt-1">Review live chat transcripts and shopper product interactions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 h-[640px]">
        {/* Left List Pane: Sessions */}
        <div className="lg:col-span-5 bg-white border border-[#E4E5E7] rounded-md flex flex-col overflow-hidden">
          <div className="p-3.5 border-b border-[#E4E5E7] bg-[#F7F7F7] flex items-center justify-between">
            <span className="text-xs font-normal text-[#74767E] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#74767E]" strokeWidth={1.5} />
              Visitor Sessions ({conversations.length})
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#E4E5E7]">
            {loading ? (
              <SessionListSkeleton />
            ) : conversations.length === 0 ? (
              <div className="text-center py-12 text-[#74767E] text-xs font-normal">
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
                    className={`w-full text-left p-3.5 transition flex flex-col gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#F0F2F5] border-l-2 border-[#1DBF73]'
                        : 'hover:bg-[#F7F7F7] border-l-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-normal text-[#222325] truncate">
                        {conv.sessionId}
                      </span>
                      <span className="text-[10px] text-[#74767E] flex items-center gap-1">
                        <Calendar className="w-3 h-3" strokeWidth={1.5} />
                        {new Date(conv.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-xs text-[#62646A] line-clamp-1">
                      {lastMessage?.content || 'No messages'}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[10px] text-[#74767E]">
                      <span>{messageCount} message{messageCount === 1 ? '' : 's'}</span>
                      <span className="text-[#62646A] font-normal">Session Recorded</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane: Selected Transcript Viewer */}
        <div className="lg:col-span-7 bg-white border border-[#E4E5E7] rounded-md flex flex-col overflow-hidden">
          {selectedConversation ? (
            <>
              {/* Transcript Header */}
              <div className="p-3.5 border-b border-[#E4E5E7] bg-[#F7F7F7] flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-normal text-[#222325] font-mono">{selectedConversation.sessionId}</h2>
                  <p className="text-[11px] text-[#74767E]">Started on {new Date(selectedConversation.createdAt).toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded-md text-xs font-normal bg-[#F0F2F5] text-[#62646A] border border-[#E4E5E7]">
                    {selectedConversation.messages?.length || 0} Messages
                  </span>

                  <button
                    onClick={handleDownloadPdf}
                    disabled={downloadingPdf}
                    className="px-3 py-1.5 rounded-md text-xs font-normal bg-white hover:bg-slate-50 text-[#222325] border border-[#E4E5E7] transition flex items-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer"
                    title="Download conversation transcript as PDF"
                  >
                    <Download className="w-3.5 h-3.5 text-[#74767E]" strokeWidth={1.5} />
                    <span>{downloadingPdf ? 'Exporting...' : 'Export PDF'}</span>
                  </button>
                </div>
              </div>

              {/* Transcript Messages List */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#F7F7F7]">
                {selectedConversation.messages?.map((msg: any) => {
                  const isUser = msg.role === 'user';

                  return (
                    <div key={msg.id} className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 font-normal ${isUser ? 'bg-[#1DBF73] text-white' : 'bg-white text-[#74767E] border border-[#E4E5E7]'}`}>
                        {isUser ? <User className="w-3.5 h-3.5" strokeWidth={1.5} /> : <Bot className="w-3.5 h-3.5" strokeWidth={1.5} />}
                      </div>

                      <div className={`max-w-[80%] space-y-2`}>
                        <div
                          className={`p-3.5 rounded-md text-xs leading-relaxed ${
                            isUser
                              ? 'bg-[#1DBF73] text-white font-normal rounded-tr-none'
                              : 'bg-white border border-[#E4E5E7] text-[#222325] rounded-tl-none'
                          }`}
                        >
                          {msg.content}
                        </div>

                        {/* Tool Execution Details if present */}
                        {msg.toolCalls && (
                          <div className="p-3 rounded-md bg-white border border-[#E4E5E7] text-xs text-[#62646A] space-y-2">
                            <div className="flex items-center gap-1.5 text-[#62646A] font-normal text-[11px]">
                              <ShoppingBag className="w-3.5 h-3.5 text-[#74767E]" strokeWidth={1.5} />
                              <span>AI Tool Executed: Catalog Products Recommended</span>
                            </div>

                            {msg.toolCalls.recommendedProducts && (
                              <div className="grid grid-cols-2 gap-2">
                                {msg.toolCalls.recommendedProducts.map((p: any) => (
                                  <div key={p.id} className="p-2 rounded-md bg-[#F7F7F7] border border-[#E4E5E7] text-[11px]">
                                    <p className="font-normal text-[#222325] truncate">{p.title}</p>
                                    <p className="text-[#222325] font-medium">${p.price} {p.currency}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        <span className={`block text-[10px] text-[#74767E] ${isUser ? 'text-right' : 'text-left'}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-[#74767E]">
              <MessageSquare className="w-10 h-10 mb-2 opacity-40 text-[#74767E]" strokeWidth={1.5} />
              <p className="text-xs font-normal text-[#62646A]">Select a visitor session on the left to view transcript</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

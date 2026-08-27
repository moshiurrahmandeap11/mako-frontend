"use client";

import Button from "@/components/Button";
import { TableRowSkeleton } from "@/components/Skeleton";
import { fetchApi } from "@/lib/api-client";
import swal from "@/lib/swal";
import {
  CheckCircle2,
  ExternalLink,
  FileText,
  Globe,
  Layers,
  RefreshCw,
  Search,
  Sparkles,
  Store,
  Trash2,
  Upload,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function extractDomainFromUrl(url: string): string {
  if (!url) return "global";
  if (
    url.startsWith("global://") ||
    url.startsWith("doc:") ||
    url.startsWith("custom-note") ||
    url.includes("/global") ||
    url.includes("global.labto.ai")
  ) {
    return "global";
  }
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    return parsed.hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "global";
  }
}

export default function KnowledgeBasePage() {
  const [knowledgeData, setKnowledgeData] = useState<{
    totalChunks: number;
    totalPages: number;
    allowedDomains?: string[];
    sources: { url: string; chunkCount: number }[];
    chunks: { id: string; url: string; content: string; createdAt: string }[];
  }>({
    totalChunks: 0,
    totalPages: 0,
    allowedDomains: [],
    sources: [],
    chunks: [],
  });

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [selectedSource, setSelectedSource] = useState<string>("all");

  // Modal states
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [scrapingUrl, setScrapingUrl] = useState(false);
  const [urlError, setUrlError] = useState("");

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteSourceUrl, setNoteSourceUrl] = useState("");
  const [noteTargetDomain, setNoteTargetDomain] = useState<string>("all");
  const [savingNote, setSavingNote] = useState(false);
  const [noteError, setNoteError] = useState("");

  // Upload Doc / PDF Modal State
  const [showDocModal, setShowDocModal] = useState(false);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docTargetDomain, setDocTargetDomain] = useState<string>("all");
  const [isDraggingDoc, setIsDraggingDoc] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [docError, setDocError] = useState("");

  const [rescapingAll, setRescrapingAll] = useState(false);

  const loadKnowledge = async () => {
    setLoading(true);
    try {
      const data = await fetchApi("/api/knowledge");
      setKnowledgeData(data);
    } catch (err) {
      console.error("Failed to load knowledge base:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKnowledge();
  }, []);

  // Compute all available domains & counts
  const domainTabs = useMemo(() => {
    const domainCounts: Record<string, number> = {};
    let globalCount = 0;

    // Seed with merchant allowed domains
    const allowed = (knowledgeData.allowedDomains || [])
      .map(
        (d) =>
          d
            .trim()
            .toLowerCase()
            .replace(/^https?:\/\//, "")
            .split("/")[0]
            .split(":")[0],
      )
      .filter(Boolean);

    allowed.forEach((d) => {
      if (!domainCounts[d]) domainCounts[d] = 0;
    });

    // Count chunks per domain
    (knowledgeData.chunks || []).forEach((c) => {
      const d = extractDomainFromUrl(c.url);
      if (d === "global") {
        globalCount++;
      } else {
        domainCounts[d] = (domainCounts[d] || 0) + 1;
      }
    });

    const uniqueDomains = Object.keys(domainCounts).sort();

    return {
      allCount: knowledgeData.chunks.length,
      globalCount,
      domains: uniqueDomains.map((domain) => ({
        domain,
        count: domainCounts[domain] || 0,
      })),
      allAllowedDomains: Array.from(new Set([...allowed, ...uniqueDomains])),
    };
  }, [knowledgeData]);

  // Filtered Chunks based on Domain + Search + Source Dropdown
  const { domainFilteredChunks, domainFilteredSources } = useMemo(() => {
    const chunks = knowledgeData.chunks.filter((chunk) => {
      if (selectedDomain === "all") return true;
      const d = extractDomainFromUrl(chunk.url);
      return d === selectedDomain;
    });

    const sourceMap = new Map<string, number>();
    chunks.forEach((chunk) => {
      const count = sourceMap.get(chunk.url) || 0;
      sourceMap.set(chunk.url, count + 1);
    });

    const sources = Array.from(sourceMap.entries()).map(([url, count]) => ({
      url,
      chunkCount: count,
    }));

    return {
      domainFilteredChunks: chunks,
      domainFilteredSources: sources,
    };
  }, [knowledgeData.chunks, selectedDomain]);

  // Final Chunks to display in table after text search & source filter
  const displayedChunks = useMemo(() => {
    return domainFilteredChunks.filter((chunk) => {
      const matchesSearch =
        search === "" ||
        chunk.content.toLowerCase().includes(search.toLowerCase()) ||
        chunk.url.toLowerCase().includes(search.toLowerCase());
      const matchesSource =
        selectedSource === "all" || chunk.url === selectedSource;
      return matchesSearch && matchesSource;
    });
  }, [domainFilteredChunks, search, selectedSource]);

  // Reset selected source filter if domain changes
  useEffect(() => {
    setSelectedSource("all");
  }, [selectedDomain]);

  const handleUploadDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docFile) return;
    setDocError("");
    setUploadingDoc(true);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(docFile);
      reader.onload = async () => {
        try {
          const base64Data = reader.result as string;
          const ext = docFile.name.split(".").pop()?.toLowerCase() || "pdf";

          const res = await fetchApi("/api/knowledge/upload-doc", {
            method: "POST",
            body: JSON.stringify({
              filename: docFile.name,
              fileData: base64Data,
              fileType: ext,
              targetDomain: docTargetDomain,
            }),
          });

          setShowDocModal(false);
          setDocFile(null);
          swal.fire({
            icon: "success",
            title: "Document Indexed",
            text: `Indexed ${res.chunksCreated || 0} chunks from "${docFile.name}" for ${
              docTargetDomain === "all" ? "All Domains" : docTargetDomain
            }.`,
            timer: 3000,
            showConfirmButton: false,
          });
          loadKnowledge();
        } catch (err: any) {
          setDocError(err.message || "Failed to upload document");
        } finally {
          setUploadingDoc(false);
        }
      };
      reader.onerror = () => {
        setDocError("Failed to read document file");
        setUploadingDoc(false);
      };
    } catch (err: any) {
      setDocError(err.message || "Failed to upload document");
      setUploadingDoc(false);
    }
  };

  const handleScrapeSingleUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setUrlError("");
    setScrapingUrl(true);

    try {
      const res = await fetchApi("/api/knowledge/scrape-url", {
        method: "POST",
        body: JSON.stringify({ url: urlInput.trim() }),
      });

      setShowUrlModal(false);
      setUrlInput("");
      swal.fire({
        icon: "success",
        title: "URL Indexed Successfully",
        text: `Indexed ${res.chunksCreated || 0} knowledge chunks & ${
          res.productsIndexed || 0
        } items from ${res.pageTitle || "the page"}.`,
        timer: 3000,
        showConfirmButton: false,
      });
      loadKnowledge();
    } catch (err: any) {
      setUrlError(err.message || "Failed to crawl and index URL");
    } finally {
      setScrapingUrl(false);
    }
  };

  const handleAddCustomNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;
    setNoteError("");
    setSavingNote(true);

    try {
      await fetchApi("/api/knowledge/custom", {
        method: "POST",
        body: JSON.stringify({
          title: noteTitle.trim(),
          content: noteContent.trim(),
          sourceUrl: noteSourceUrl.trim() || undefined,
          targetDomain: noteTargetDomain,
        }),
      });

      setShowNoteModal(false);
      setNoteTitle("");
      setNoteContent("");
      setNoteSourceUrl("");
      setNoteTargetDomain("all");
      swal.fire({
        icon: "success",
        title: "Custom Knowledge Saved",
        text: `Saved note for ${
          noteTargetDomain === "all" ? "All Domains (Global)" : noteTargetDomain
        }.`,
        timer: 2500,
        showConfirmButton: false,
      });
      loadKnowledge();
    } catch (err: any) {
      setNoteError(err.message || "Failed to save note");
    } finally {
      setSavingNote(false);
    }
  };

  const handleDeleteChunk = async (id: string) => {
    const result = await swal.fire({
      icon: "warning",
      title: "Delete Knowledge Chunk?",
      text: "This snippet will be permanently deleted from the AI assistant knowledge base.",
      showCancelButton: true,
      confirmButtonText: "Delete Chunk",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await fetchApi(`/api/knowledge/${id}`, { method: "DELETE" });
        loadKnowledge();
        swal.fire({
          icon: "success",
          title: "Deleted",
          text: "Knowledge chunk has been removed.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err: any) {
        swal.fire({
          icon: "error",
          title: "Failed to delete",
          text: err.message,
        });
      }
    }
  };

  const handleDeleteScopedChunks = async () => {
    const isSpecificDomain = selectedDomain !== "all";
    const domainLabel =
      selectedDomain === "global"
        ? "Global Notes & Uploaded Documents"
        : isSpecificDomain
          ? `Domain: ${selectedDomain}`
          : "ALL Knowledge Base Data";

    const result = await swal.fire({
      icon: "warning",
      title: `Clear ${domainLabel}?`,
      text: isSpecificDomain
        ? `This will permanently delete only the knowledge chunks associated with ${domainLabel}. Other domains will not be affected.`
        : "This will permanently wipe all scraped and indexed content across all stores.",
      showCancelButton: true,
      confirmButtonText: `Clear ${isSpecificDomain ? "Domain" : "All Data"}`,
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const query = isSpecificDomain
          ? `?domain=${encodeURIComponent(selectedDomain)}`
          : "";
        await fetchApi(`/api/knowledge/clear-all${query}`, {
          method: "DELETE",
        });
        loadKnowledge();
        swal.fire({
          icon: "success",
          title: "Cleared",
          text: `Knowledge data for ${domainLabel} has been removed.`,
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err: any) {
        swal.fire({
          icon: "error",
          title: "Failed to clear",
          text: err.message,
        });
      }
    }
  };

  const handleRescrapeScoped = async () => {
    const isSpecificDomain =
      selectedDomain !== "all" && selectedDomain !== "global";
    const targetLabel = isSpecificDomain
      ? `store "${selectedDomain}"`
      : "all connected stores";

    const result = await swal.fire({
      icon: "question",
      title: `Re-crawl ${isSpecificDomain ? selectedDomain : "All Stores"}?`,
      text: `Our hybrid crawler will re-scan sitemaps, SPA routes, and DOM pages for ${targetLabel} to refresh AI memory.`,
      showCancelButton: true,
      confirmButtonText: "Start Crawl",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setRescrapingAll(true);
      try {
        const res = await fetchApi("/api/knowledge/rescrape-all", {
          method: "POST",
          body: isSpecificDomain
            ? JSON.stringify({ domain: selectedDomain })
            : undefined,
        });
        swal.fire({
          icon: "success",
          title: "Crawl Initiated!",
          text:
            res.message ||
            `Crawling ${
              isSpecificDomain ? selectedDomain : "all stores"
            } in the background.`,
        });
        loadKnowledge();
      } catch (err: any) {
        swal.fire({
          icon: "error",
          title: "Crawl Failed",
          text: err.message || "Unable to initiate domain crawl",
        });
      } finally {
        setRescrapingAll(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-normal text-[#222325] tracking-tight flex items-center gap-2.5">
            <span>AI Knowledge Base & Content</span>
          </h1>
          <p className="text-[#62646A] text-xs sm:text-sm mt-1">
            Manage scraped website content, indexed URLs, and custom notes
            powering your AI assistant.
          </p>
        </div>

        {/* Primary CTA button on the right */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            onClick={() => {
              setNoteTargetDomain(
                selectedDomain !== "global" ? selectedDomain : "all",
              );
              setShowNoteModal(true);
            }}
            variant="primary"
            size="md"
            className="w-full sm:w-auto justify-center !font-normal text-xs sm:text-sm"
          >
            <span>Add Custom Note / FAQ</span>
          </Button>
        </div>
      </div>

      {/* Domain Switcher Bar (Tabs) */}
      <div className="bg-white border border-[#E4E5E7] rounded-md p-2 flex items-center gap-2 overflow-x-auto scrollbar-none shadow-xs">
        <div className="flex items-center gap-1.5 text-xs text-[#74767E] px-2 font-medium shrink-0">
          <Store className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>Domain Scope:</span>
        </div>

        <button
          onClick={() => setSelectedDomain("all")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-normal transition whitespace-nowrap cursor-pointer ${
            selectedDomain === "all"
              ? "bg-[#1DBF73] text-white shadow-xs"
              : "bg-[#F7F7F7] text-[#404145] hover:bg-[#EAEAEA]"
          }`}
        >
          <Globe className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>All Domains</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedDomain === "all"
                ? "bg-white/20 text-white"
                : "bg-[#E4E5E7] text-[#62646A]"
            }`}
          >
            {domainTabs.allCount}
          </span>
        </button>

        {domainTabs.domains.map(({ domain, count }) => (
          <button
            key={domain}
            onClick={() => setSelectedDomain(domain)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-normal transition whitespace-nowrap cursor-pointer ${
              selectedDomain === domain
                ? "bg-[#1DBF73] text-white shadow-xs"
                : "bg-[#F7F7F7] text-[#404145] hover:bg-[#EAEAEA]"
            }`}
          >
            <span className="truncate max-w-[160px]">{domain}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedDomain === domain
                  ? "bg-white/20 text-white"
                  : "bg-[#E4E5E7] text-[#62646A]"
              }`}
            >
              {count}
            </span>
          </button>
        ))}

        {domainTabs.globalCount > 0 && (
          <button
            onClick={() => setSelectedDomain("global")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-normal transition whitespace-nowrap cursor-pointer ${
              selectedDomain === "global"
                ? "bg-[#1DBF73] text-white shadow-xs"
                : "bg-[#F7F7F7] text-[#404145] hover:bg-[#EAEAEA]"
            }`}
          >
            <FileText className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Global Notes & Docs</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedDomain === "global"
                  ? "bg-white/20 text-white"
                  : "bg-[#E4E5E7] text-[#62646A]"
              }`}
            >
              {domainTabs.globalCount}
            </span>
          </button>
        )}
      </div>

      {/* Responsive Action Toolbar Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => {
            if (selectedDomain !== "all" && selectedDomain !== "global") {
              setUrlInput(`https://${selectedDomain}/`);
            }
            setShowUrlModal(true);
          }}
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-white border border-[#E4E5E7] hover:border-[#1DBF73] hover:bg-[#F7F7F7] text-[#222325] text-xs sm:text-sm font-normal transition group cursor-pointer"
        >
          <Globe
            className="w-4 h-4 text-[#74767E] shrink-0"
            strokeWidth={1.5}
          />
          <span className="truncate">Add Custom URL</span>
        </button>

        <button
          onClick={() => {
            setDocTargetDomain(
              selectedDomain !== "global" ? selectedDomain : "all",
            );
            setShowDocModal(true);
          }}
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-white border border-[#E4E5E7] hover:border-[#1DBF73] hover:bg-[#F7F7F7] text-[#222325] text-xs sm:text-sm font-normal transition group cursor-pointer"
        >
          <Upload
            className="w-4 h-4 text-[#74767E] shrink-0"
            strokeWidth={1.5}
          />
          <span className="truncate">Upload Doc / PDF</span>
        </button>

        <button
          onClick={handleRescrapeScoped}
          disabled={rescapingAll || selectedDomain === "global"}
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-white border border-[#E4E5E7] hover:border-[#1DBF73] hover:bg-[#F7F7F7] text-[#222325] text-xs sm:text-sm font-normal transition group disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw
            className={`w-4 h-4 text-[#74767E] shrink-0 ${
              rescapingAll ? "animate-spin" : ""
            }`}
            strokeWidth={1.5}
          />
          <span className="truncate">
            {rescapingAll
              ? "Crawling..."
              : selectedDomain !== "all" && selectedDomain !== "global"
                ? `Re-crawl ${selectedDomain}`
                : "Re-crawl Stores"}
          </span>
        </button>

        <button
          onClick={handleDeleteScopedChunks}
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-rose-50 border border-rose-200 hover:border-rose-300 hover:bg-rose-100 text-rose-600 text-xs sm:text-sm font-normal transition group cursor-pointer"
        >
          <Trash2
            className="w-4 h-4 text-rose-600 shrink-0"
            strokeWidth={1.5}
          />
          <span className="truncate">
            {selectedDomain !== "all"
              ? `Clear ${
                  selectedDomain === "global" ? "Notes" : selectedDomain
                }`
              : "Clear All Data"}
          </span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white border border-[#E4E5E7] rounded-md p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-[#74767E]">
              {selectedDomain === "all"
                ? "Total Knowledge Chunks"
                : `Chunks in ${selectedDomain}`}
            </span>
            <Layers className="w-4.5 h-4.5 text-[#74767E]" strokeWidth={1.5} />
          </div>
          <div className="text-2xl sm:text-3xl font-medium text-[#222325] mt-3">
            {loading ? "..." : domainFilteredChunks.length}
          </div>
          <p className="text-xs text-[#62646A] mt-1">
            {selectedDomain === "all"
              ? "Vector embeddings across all stores"
              : `Vector embeddings active for ${selectedDomain}`}
          </p>
        </div>

        <div className="bg-white border border-[#E4E5E7] rounded-md p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-[#74767E]">
              {selectedDomain === "all"
                ? "Indexed Sources & Pages"
                : `Pages in ${selectedDomain}`}
            </span>
            <Globe className="w-4.5 h-4.5 text-[#74767E]" strokeWidth={1.5} />
          </div>
          <div className="text-2xl sm:text-3xl font-medium text-[#222325] mt-3">
            {loading ? "..." : domainFilteredSources.length}
          </div>
          <p className="text-xs text-[#62646A] mt-1">
            Discovered via Sitemaps, SPA routes & DOM links
          </p>
        </div>

        <div className="bg-white border border-[#E4E5E7] rounded-md p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-[#74767E]">
              Automated Syncing
            </span>
            <Sparkles
              className="w-4.5 h-4.5 text-[#74767E]"
              strokeWidth={1.5}
            />
          </div>
          <div className="flex items-center gap-2 mt-3">
            <CheckCircle2
              className="w-5 h-5 text-[#1DBF73]"
              strokeWidth={1.5}
            />
            <span className="text-base font-medium text-[#222325]">
              Daily 12:00 PM BST
            </span>
          </div>
          <p className="text-xs text-[#62646A] mt-1">
            Automated background crawler keeps knowledge fresh
          </p>
        </div>
      </div>

      {/* Main Table / Explorer */}
      <div className="bg-white border border-[#E4E5E7] rounded-md p-4 sm:p-5 space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#74767E]"
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder={`Search in ${
                selectedDomain === "all" ? "all knowledge" : selectedDomain
              } contents or URLs...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-[#E4E5E7] rounded-md pl-10 pr-4 py-2 text-xs text-[#222325] placeholder-[#74767E] focus:outline-none focus:border-[#1DBF73] transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="bg-white border border-[#E4E5E7] rounded-md px-3.5 py-2 text-xs text-[#404145] focus:outline-none focus:border-[#1DBF73] transition-colors max-w-xs truncate"
            >
              <option value="all">
                All Sources in Scope ({domainFilteredSources.length})
              </option>
              {domainFilteredSources.map((s, idx) => (
                <option key={idx} value={s.url}>
                  {s.url.length > 50 ? `${s.url.slice(0, 50)}...` : s.url} (
                  {s.chunkCount})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chunks List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#404145] border-collapse">
            <thead className="bg-[#F7F7F7] text-xs font-normal text-[#74767E] border-b border-[#E4E5E7]">
              <tr>
                <th className="py-3 px-4 font-normal">Source / Origin</th>
                <th className="py-3 px-4 font-normal">Domain Scope</th>
                <th className="py-3 px-4 font-normal">
                  Knowledge Chunk Content
                </th>
                <th className="py-3 px-4 font-normal">Added On</th>
                <th className="py-3 px-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E5E7]">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRowSkeleton key={i} />
                ))
              ) : displayedChunks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#74767E]">
                    <FileText
                      className="w-10 h-10 mx-auto mb-2 opacity-40 text-[#74767E]"
                      strokeWidth={1.5}
                    />
                    No knowledge chunks found for this domain scope. Click
                    &quot;Add Custom URL&quot; or &quot;Re-crawl Store&quot; to
                    populate your AI memory.
                  </td>
                </tr>
              ) : (
                displayedChunks.map((chunk) => {
                  const chunkDomain = extractDomainFromUrl(chunk.url);
                  const isGlobal = chunkDomain === "global";

                  return (
                    <tr
                      key={chunk.id}
                      className="hover:bg-[#F7F7F7] transition-colors"
                    >
                      <td className="py-4 px-4 align-top w-1/4">
                        {chunk.url.startsWith("http") ? (
                          <a
                            href={chunk.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[#1DBF73] hover:underline break-all text-xs font-normal"
                          >
                            {chunk.url}
                            <ExternalLink
                              className="w-3 h-3 shrink-0"
                              strokeWidth={1.5}
                            />
                          </a>
                        ) : chunk.url.startsWith("doc:") ||
                          chunk.url.includes("/doc/") ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-xs font-normal font-mono">
                            <Upload className="w-3 h-3" />
                            {chunk.url.replace(/^.*doc[:/]/, "")}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#F0F2F5] text-[#62646A] border border-[#E4E5E7] text-xs font-normal font-mono">
                            <FileText className="w-3 h-3" />
                            Custom Note
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 align-top whitespace-nowrap">
                        {isGlobal ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-medium">
                            <Globe className="w-3 h-3" />
                            Global (All)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium">
                            <Store className="w-3 h-3" />
                            {chunkDomain}
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 align-top">
                        <div className="bg-[#F7F7F7] border border-[#E4E5E7] rounded-md p-3 text-xs text-[#222325] font-mono whitespace-pre-wrap max-h-40 overflow-y-auto leading-relaxed">
                          {chunk.content}
                        </div>
                      </td>
                      <td className="py-4 px-4 align-top text-xs text-[#74767E] whitespace-nowrap">
                        {chunk.createdAt
                          ? new Date(chunk.createdAt).toLocaleDateString()
                          : "Active"}
                      </td>
                      <td className="py-4 px-4 align-top text-right whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteChunk(chunk.id)}
                          className="p-1.5 text-[#74767E] hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Chunk"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Custom URL Modal */}
      {showUrlModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#E4E5E7] rounded-md w-full max-w-lg p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium text-[#222325] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#74767E]" strokeWidth={1.5} />
                Index Specific URL
              </h2>
              <button
                onClick={() => setShowUrlModal(false)}
                className="text-[#74767E] hover:text-[#222325] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#62646A]">
              Provide a specific page link (e.g.{" "}
              <code>https://yourdomain.com/projects/item</code>, pricing, or
              service page). Our crawler will immediately extract text,
              markdown, and items.
            </p>

            <form onSubmit={handleScrapeSingleUrl} className="space-y-4">
              {urlError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-md">
                  {urlError}
                </div>
              )}

              <div>
                <label className="block text-xs font-normal text-[#404145] mb-1">
                  Target Page URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://example.com/services/web-development"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full bg-white border border-[#E4E5E7] rounded-md px-3.5 py-2 text-xs text-[#222325] placeholder-[#74767E] focus:outline-none focus:border-[#1DBF73]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowUrlModal(false)}
                  className="text-xs text-[#222325] border-[#E4E5E7] !font-normal"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={scrapingUrl}
                  variant="primary"
                  className="text-xs !font-normal"
                >
                  {scrapingUrl ? "Crawling & Indexing..." : "Crawl & Index URL"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Custom Note / FAQ Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#E4E5E7] rounded-md w-full max-w-xl p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium text-[#222325] flex items-center gap-2">
                <FileText
                  className="w-4 h-4 text-[#74767E]"
                  strokeWidth={1.5}
                />
                Add Custom Note or Policy
              </h2>
              <button
                onClick={() => setShowNoteModal(false)}
                className="text-[#74767E] hover:text-[#222325] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#62646A]">
              Directly feed custom instructions, FAQs, project descriptions, or
              contact details into the AI assistant.
            </p>

            <form onSubmit={handleAddCustomNote} className="space-y-4">
              {noteError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-md">
                  {noteError}
                </div>
              )}

              {/* Target Domain Selector */}
              <div>
                <label className="block text-xs font-normal text-[#404145] mb-1">
                  Target Domain Scope
                </label>
                <select
                  value={noteTargetDomain}
                  onChange={(e) => setNoteTargetDomain(e.target.value)}
                  className="w-full bg-white border border-[#E4E5E7] rounded-md px-3.5 py-2 text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73]"
                >
                  <option value="all">
                    🌐 All Domains (Global Policy - Shared across all widgets)
                  </option>
                  {domainTabs.allAllowedDomains.map((d) => (
                    <option key={d} value={d}>
                      🛍️ Specific Store: {d}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[#74767E] mt-1">
                  Choose whether this note applies universally or strictly to a
                  single storefront.
                </p>
              </div>

              <div>
                <label className="block text-xs font-normal text-[#404145] mb-1">
                  Title / Topic
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shipping Policy & Return Window"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full bg-white border border-[#E4E5E7] rounded-md px-3.5 py-2 text-xs text-[#222325] placeholder-[#74767E] focus:outline-none focus:border-[#1DBF73]"
                />
              </div>

              <div>
                <label className="block text-xs font-normal text-[#404145] mb-1">
                  Source Link (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/shipping-policy"
                  value={noteSourceUrl}
                  onChange={(e) => setNoteSourceUrl(e.target.value)}
                  className="w-full bg-white border border-[#E4E5E7] rounded-md px-3.5 py-2 text-xs text-[#222325] placeholder-[#74767E] focus:outline-none focus:border-[#1DBF73]"
                />
              </div>

              <div>
                <label className="block text-xs font-normal text-[#404145] mb-1">
                  Content / Details (Markdown supported)
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder={`- Free delivery on orders over $50\n- Standard delivery fee: $5 (2-3 business days)\n- Returns accepted within 14 days of delivery.`}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full bg-white border border-[#E4E5E7] rounded-md p-3 text-xs text-[#222325] placeholder-[#74767E] focus:outline-none focus:border-[#1DBF73] font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNoteModal(false)}
                  className="text-xs text-[#222325] border-[#E4E5E7] !font-normal"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={savingNote}
                  variant="primary"
                  className="text-xs !font-normal"
                >
                  {savingNote ? "Saving..." : "Save Knowledge Note"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Doc / PDF Modal */}
      {showDocModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#E4E5E7] rounded-md w-full max-w-lg p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium text-[#222325] flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#74767E]" strokeWidth={1.5} />
                Upload Document or PDF
              </h2>
              <button
                onClick={() => setShowDocModal(false)}
                className="text-[#74767E] hover:text-[#222325] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#62646A]">
              Upload brand guidelines, return policies, user manuals, or FAQs
              (.pdf, .docx, .txt, .md). The backend will extract, chunk, and
              index vector embeddings into pgvector memory.
            </p>

            <form onSubmit={handleUploadDoc} className="space-y-4">
              {docError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-md">
                  {docError}
                </div>
              )}

              {/* Target Domain Selector */}
              <div>
                <label className="block text-xs font-normal text-[#404145] mb-1">
                  Assign to Domain Scope
                </label>
                <select
                  value={docTargetDomain}
                  onChange={(e) => setDocTargetDomain(e.target.value)}
                  className="w-full bg-white border border-[#E4E5E7] rounded-md px-3.5 py-2 text-xs text-[#222325] focus:outline-none focus:border-[#1DBF73]"
                >
                  <option value="all">
                    🌐 All Domains (Global Document - Shared across all widgets)
                  </option>
                  {domainTabs.allAllowedDomains.map((d) => (
                    <option key={d} value={d}>
                      🛍️ Specific Store: {d}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-[#74767E] mt-1">
                  Only the selected store widget will retrieve answers from this
                  document (or all if Global).
                </p>
              </div>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingDoc(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDraggingDoc(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDraggingDoc(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    setDocFile(e.dataTransfer.files[0]);
                  }
                }}
                className={`border-2 border-dashed rounded-md p-8 text-center transition cursor-pointer ${
                  isDraggingDoc
                    ? "border-[#1DBF73] bg-[#E8F8F0]"
                    : "border-[#E4E5E7] hover:border-[#1DBF73] bg-[#F7F7F7]"
                }`}
              >
                <input
                  type="file"
                  accept=".pdf, .docx, .doc, .txt, .md"
                  onChange={(e) => setDocFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="docFileInput"
                />
                <label
                  htmlFor="docFileInput"
                  className="cursor-pointer space-y-2 block"
                >
                  <Upload
                    className={`w-10 h-10 mx-auto transition ${
                      isDraggingDoc ? "text-[#1DBF73]" : "text-[#74767E]"
                    }`}
                    strokeWidth={1.5}
                  />
                  <p className="text-xs font-normal text-[#222325]">
                    {docFile
                      ? docFile.name
                      : isDraggingDoc
                        ? "Drop your Document here!"
                        : "Click or Drag & Drop PDF / Document here"}
                  </p>
                  <p className="text-[11px] text-[#74767E]">
                    Supports .pdf, .docx, .txt, .md files up to 15MB
                  </p>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#E4E5E7]">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDocModal(false)}
                  className="text-xs text-[#222325] border-[#E4E5E7] !font-normal"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={uploadingDoc || !docFile}
                  variant="primary"
                  className="text-xs !font-normal"
                >
                  {uploadingDoc
                    ? "Parsing & Vectorizing..."
                    : "Upload & Index Doc"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

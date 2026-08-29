"use client";

import React, { useState } from "react";
import { Share2, Twitter, Linkedin, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

interface BlogDetailClientProps {
  title: string;
  slug: string;
}

export default function BlogDetailClient({ title, slug }: BlogDetailClientProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://labtoai.com/blog/" + slug;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Article link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(title + " via @LabtoAI");
    const url = encodeURIComponent(shareUrl);
    window.open("https://twitter.com/intent/tweet?text=" + text + "&url=" + url, "_blank");
  };

  const handleLinkedinShare = () => {
    const url = encodeURIComponent(shareUrl);
    window.open("https://www.linkedin.com/sharing/share-offsite/?url=" + url, "_blank");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-[#71717A] mr-1">Share:</span>
      <button
        onClick={handleTwitterShare}
        className="p-2 border border-[#E4E5E7] rounded-full hover:bg-gray-50 text-[#71717A] hover:text-[#1DA1F2] transition-colors"
        title="Share on X (Twitter)"
      >
        <Twitter className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={handleLinkedinShare}
        className="p-2 border border-[#E4E5E7] rounded-full hover:bg-gray-50 text-[#71717A] hover:text-[#0A66C2] transition-colors"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={handleCopy}
        className="p-2 border border-[#E4E5E7] rounded-full hover:bg-gray-50 text-[#71717A] hover:text-[#1DBF73] transition-colors"
        title="Copy article link"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-[#1DBF73]" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}

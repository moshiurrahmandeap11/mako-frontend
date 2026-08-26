"use client";

import React, { useState } from "react";
import { Bug } from "lucide-react";
import BugReportModal from "./BugReportModal";

export default function BugReportButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-gray-50 text-text-muted hover:text-text-main text-xs font-medium border border-border-light rounded-md transition"
        title="Report a bug or issue"
      >
        <Bug className="w-3.5 h-3.5 text-red-500" />
        <span>Report an Issue</span>
      </button>
      <BugReportModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

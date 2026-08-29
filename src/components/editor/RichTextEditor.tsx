"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamic import with SSR disabled to prevent hydration mismatch in Next.js
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-64 border border-[#E4E5E7] rounded-lg bg-gray-50 flex items-center justify-center text-xs text-[#71717A] animate-pulse">
      Loading Rich Text Editor...
    </div>
  ),
});

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your blog post content here with headers, bullet points, images, and links...",
  className = "",
}: RichTextEditorProps) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        [{ color: [] }, { background: [] }],
        ["link", "image"],
        ["clean"],
      ],
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "color",
    "background",
    "link",
    "image",
  ];

  return (
    <div className={`rich-text-editor-container ${className}`}>
      <style jsx global>{`
        .rich-text-editor-container .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          border-color: #E4E5E7;
          background: #F9FAFB;
        }
        .rich-text-editor-container .ql-container {
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          border-color: #E4E5E7;
          min-height: 280px;
          font-size: 14px;
          color: #222325;
          font-family: inherit;
        }
        .rich-text-editor-container .ql-editor {
          min-height: 280px;
          line-height: 1.7;
        }
        .rich-text-editor-container .ql-editor.ql-blank::before {
          color: #9CA3AF;
          font-style: normal;
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
}

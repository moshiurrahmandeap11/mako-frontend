"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bug, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import Button from "@/components/Button";
import { api } from "@/lib/axios";
import toast from "react-hot-toast";

interface BugReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BugReportModal({ isOpen, onClose }: BugReportModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || description.trim().length < 5) {
      toast.error("Please describe the issue in at least 5 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/api/reports/bug", {
        title: title.trim() || "Bug Report",
        description: description.trim(),
        userEmail: userEmail.trim() || undefined,
        imageUrl: imagePreview || undefined,
      });

      setIsSubmitted(true);
      toast.success("Bug report submitted! Thank you.");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to submit bug report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setUserEmail("");
    setImagePreview(null);
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-white border border-border-light rounded-md p-6 overflow-hidden text-left"
        >
          {/* Close Button */}
          <button
            onClick={resetForm}
            className="absolute top-4 right-4 p-1.5 text-text-muted hover:text-text-main rounded-md transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-md bg-red-50 text-red-600 flex items-center justify-center border border-red-200">
                  <Bug className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-main tracking-tight">Report an Issue or Bug</h3>
                  <p className="text-xs text-text-muted">Help us make Labto AI flawless. We review all reports.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1">Issue Summary (Optional)</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Chat widget doesn't expand on mobile"
                    className="w-full px-3.5 py-2.5 bg-white border border-border-light rounded-md text-sm text-text-main focus:outline-none focus:border-ai-green transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Explain what happened, steps to reproduce, or browser/device info..."
                    className="w-full px-3.5 py-2.5 bg-white border border-border-light rounded-md text-sm text-text-main focus:outline-none focus:border-ai-green transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1">Screenshot / Image (Optional)</label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-border-light rounded-md text-xs font-medium text-text-main cursor-pointer transition">
                      <Upload className="w-4 h-4 text-text-muted" />
                      <span>{imagePreview ? "Change Image" : "Attach Screenshot"}</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                    {imagePreview && (
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {imagePreview && (
                    <div className="mt-2 relative w-full h-32 border border-border-light rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imagePreview} alt="Preview" className="max-h-full max-w-full object-contain" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1">Your Email (Optional, for updates)</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="you@store.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-border-light rounded-md text-sm text-text-main focus:outline-none focus:border-ai-green transition"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button type="button" variant="secondary" onClick={resetForm} className="px-4 py-2 text-xs">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" disabled={isSubmitting} className="px-5 py-2 text-xs justify-center">
                    {isSubmitting ? "Submitting..." : "Submit Bug Report"}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-ai-green-tint text-[#1DBF73] flex items-center justify-center mx-auto border border-[#1DBF73]/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-text-main">Thank You!</h3>
              <p className="text-xs text-text-muted max-w-xs mx-auto">
                Your report has been logged. Our engineering team will review and resolve it promptly.
              </p>
              <Button onClick={resetForm} variant="secondary" className="mt-4 px-6 py-2 text-xs">
                Done
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

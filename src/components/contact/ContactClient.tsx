"use client";

import Button from "@/components/Button";
import { api } from "@/lib/axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  Mail,
  MessageSquare,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/contact", form);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      toast.success("Inquiry sent successfully!");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error ||
          "Failed to submit message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-text-main flex flex-col overflow-hidden">
      <main className="relative z-10 flex-1 lg:max-w-9/12 mx-auto w-full px-6 lg:px-0 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-5 space-y-8 text-left">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-text-main tracking-tight"
            >
              Partner with Labto AI. <br />
              Let’s scale together.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#62646A] text-sm mt-4 leading-relaxed"
            >
              Have a high-volume store, specific compliance requirements, or
              custom integrations? Drop us a message and our technical team will
              reach out.
            </motion.p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-xs text-text-body">
              <div className="w-10 h-10 rounded-md flex items-center justify-center bg-gray-100">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-text-main">Direct Email</p>
                <p className="text-text-muted mt-0.5">hello@ahsanul.dev</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-text-body">
              <div className="w-10 h-10 rounded-md flex items-center justify-center bg-gray-100">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-text-main">SLA Support</p>
                <p className="text-text-muted mt-0.5">
                  under hour response guarantee for Enterprise clients
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-text-body">
              <div className="w-10 h-10 rounded-md flex items-center justify-center bg-gray-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-text-main">Data Privacy</p>
                <p className="text-text-muted mt-0.5">
                  100% Isolated Data & Zero Camera Feed Retention
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7 text-left">
          <div className="relative bg-white border border-border-light rounded-md p-8 overflow-hidden min-h-115 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm tracking-wider text-[#62646A] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 bg-white border border-border-light rounded-md text-text-main text-sm focus:outline-none focus:border-ai-green transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm tracking-wider text-[#62646A] mb-2">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="jane@store.com"
                      className="w-full px-4 py-3 bg-white border border-border-light rounded-md text-text-main text-sm focus:outline-none focus:border-ai-green transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm tracking-wider text-[#62646A] mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Tell us about your store volume or custom integration needs..."
                      className="w-full px-4 py-3 bg-white border border-border-light rounded-md text-text-main text-sm focus:outline-none focus:border-ai-green transition"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    variant="primary"
                    className="w-full py-3.5 justify-center"
                  >
                    {loading ? (
                      "Sending Message..."
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" /> Send Inquiry
                      </span>
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-ai-green-tint text-[#1DBF73] flex items-center justify-center mx-auto border border-[#1DBF73]/40">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-main">
                    Message Received!
                  </h3>
                  <p className="text-[#62646A] text-sm max-w-sm mx-auto font-normal">
                    Thank you for reaching out. Our technical architecture team
                    will get back to you within 4 hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="secondary"
                    className="mt-6 px-6 py-2.5 text-text-main border-border-light"
                  >
                    Send Another Inquiry
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

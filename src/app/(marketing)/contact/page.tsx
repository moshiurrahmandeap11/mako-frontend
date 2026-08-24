'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Mail, MessageSquare, ShieldCheck } from 'lucide-react';
import Button from '@/components/Button';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-white text-[#222325] flex flex-col overflow-hidden">
      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-6 pt-36 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold tracking-wider text-[#1DBF73] uppercase mb-3 bg-[#E8F8F0] px-3 py-1 rounded-full border border-[#1DBF73]/20 inline-block"
            >
              Get In Touch
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#222325] leading-tight"
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
              Have a high-volume store, specific compliance requirements, or custom integrations? Drop us a message and our technical team will reach out.
            </motion.p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#E4E5E7]">
            <div className="flex items-center gap-4 text-xs text-[#404145]">
              <div className="w-10 h-10 rounded-xl border border-[#1DBF73]/20 flex items-center justify-center text-[#1DBF73] bg-[#E8F8F0]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[#222325]">Direct Email</p>
                <p className="text-[#74767E] mt-0.5">support@ahsanul.dev</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#404145]">
              <div className="w-10 h-10 rounded-xl border border-[#1DBF73]/20 flex items-center justify-center text-[#1DBF73] bg-[#E8F8F0]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[#222325]">SLA Support</p>
                <p className="text-[#74767E] mt-0.5">4-hour response guarantee for Enterprise clients</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#404145]">
              <div className="w-10 h-10 rounded-xl border border-[#1DBF73]/20 flex items-center justify-center text-[#1DBF73] bg-[#E8F8F0]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[#222325]">Data Privacy</p>
                <p className="text-[#74767E] mt-0.5">100% Isolated Data & Zero Camera Feed Retention</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7">
          <div className="relative bg-white border border-[#E4E5E7] rounded-2xl p-8 shadow-xl overflow-hidden min-h-[460px] flex flex-col justify-center">
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#62646A] mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 bg-white border border-[#E4E5E7] rounded-xl text-[#222325] text-sm focus:outline-none focus:border-[#1DBF73] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#62646A] mb-2">Work Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@store.com"
                      className="w-full px-4 py-3 bg-white border border-[#E4E5E7] rounded-xl text-[#222325] text-sm focus:outline-none focus:border-[#1DBF73] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#62646A] mb-2">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your store volume or custom integration needs..."
                      className="w-full px-4 py-3 bg-white border border-[#E4E5E7] rounded-xl text-[#222325] text-sm focus:outline-none focus:border-[#1DBF73] transition"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    variant="primary"
                    className="w-full py-3.5 justify-center"
                  >
                    {loading ? 'Sending Message...' : <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Send Inquiry</span>}
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#E8F8F0] text-[#1DBF73] flex items-center justify-center mx-auto border border-[#1DBF73]/40">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#222325]">Message Received!</h3>
                  <p className="text-[#62646A] text-sm max-w-sm mx-auto">
                    Thank you for reaching out. Our technical architecture team will get back to you within 4 hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="secondary"
                    className="mt-6 px-6 py-2.5 text-[#222325] border-[#E4E5E7]"
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

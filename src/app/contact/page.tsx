'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import NetworkWave from '@/components/NetworkWave';
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
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      {/* Background Wave */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <NetworkWave />
      </div>

      <Navbar />

      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-6 pt-36 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold tracking-[0.2em] text-orange-500 uppercase mb-3"
            >
              Get In Touch
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-medium tracking-tight text-white leading-tight"
            >
              Partner with Mako. <br />
              Let’s scale together.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-400 text-sm mt-4 leading-relaxed"
            >
              Have a high-volume store, specific compliance requirements, or custom integrations? Drop us a message and our technical team will reach out.
            </motion.p>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-900">
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <div className="w-9 h-9 rounded border border-slate-800 flex items-center justify-center text-amber-500 bg-slate-950/50">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-white">Direct Email</p>
                <p className="text-slate-400 mt-0.5">hello@makoai.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <div className="w-9 h-9 rounded border border-slate-800 flex items-center justify-center text-amber-500 bg-slate-950/50">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-white">SLA Support</p>
                <p className="text-slate-400 mt-0.5">4-hour response guarantee for Enterprise clients</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <div className="w-9 h-9 rounded border border-slate-800 flex items-center justify-center text-amber-500 bg-slate-950/50">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-white">Data Privacy</p>
                <p className="text-slate-400 mt-0.5">GDPR & SOC2 Compliant integrations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7">
          <div className="relative bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded p-8 shadow-2xl overflow-hidden min-h-[460px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded focus:outline-none focus:border-slate-500 text-white placeholder-slate-600 text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@store.com"
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded focus:outline-none focus:border-slate-500 text-white placeholder-slate-600 text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Your Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your store size, platforms you use, and details of custom requirements..."
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded focus:outline-none focus:border-slate-500 text-white placeholder-slate-600 text-sm transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      'Sending...'
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 mb-2">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Message Transmitted</h3>
                  <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
                    Thank you. We have received your query. A technical integration specialist will respond within 4 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-amber-500 hover:text-amber-400 font-medium underline"
                    >
                      Send another message
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

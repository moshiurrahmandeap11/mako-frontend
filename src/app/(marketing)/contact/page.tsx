'use client';

import { useState } from 'react';
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
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-[#0B132B] text-slate-100 flex flex-col overflow-hidden">
      {/* Background Wave */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <NetworkWave />
      </div>

      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-6 pt-36 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold tracking-[0.2em] text-[#39FF88] uppercase mb-3"
            >
              Get In Touch
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
            >
              Partner with Labto AI. <br />
              Let’s scale together.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-300 text-sm mt-4 leading-relaxed"
            >
              Have a high-volume store, specific compliance requirements, or custom integrations? Drop us a message and our technical team will reach out.
            </motion.p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#39FF88]/15">
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <div className="w-10 h-10 rounded-lg border border-[#39FF88]/30 flex items-center justify-center text-[#39FF88] bg-[#131D38]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">Direct Email</p>
                <p className="text-slate-400 mt-0.5">support@ahsanul.dev</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <div className="w-10 h-10 rounded-lg border border-[#39FF88]/30 flex items-center justify-center text-[#39FF88] bg-[#131D38]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">SLA Support</p>
                <p className="text-slate-400 mt-0.5">4-hour response guarantee for Enterprise clients</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <div className="w-10 h-10 rounded-lg border border-[#39FF88]/30 flex items-center justify-center text-[#39FF88] bg-[#131D38]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white">Data Privacy</p>
                <p className="text-slate-400 mt-0.5">100% Isolated Data & Zero Camera Feed Retention</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7">
          <div className="relative bg-[#131D38] backdrop-blur-md border border-[#39FF88]/20 rounded-xl p-8 shadow-2xl overflow-hidden min-h-[460px] flex flex-col justify-center">
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 bg-[#0B132B] border border-[#39FF88]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#39FF88] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Work Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@store.com"
                      className="w-full px-4 py-3 bg-[#0B132B] border border-[#39FF88]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#39FF88] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your store volume or custom integration needs..."
                      className="w-full px-4 py-3 bg-[#0B132B] border border-[#39FF88]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#39FF88] transition"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#39FF88] text-[#0B132B] hover:bg-[#00CC66] font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#39FF88]/20"
                  >
                    {loading ? 'Sending Message...' : <><Send className="w-4 h-4" /> Send Inquiry</>}
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#39FF88]/20 text-[#39FF88] flex items-center justify-center mx-auto border border-[#39FF88]/40">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                  <p className="text-slate-300 text-sm max-w-sm mx-auto">
                    Thank you for reaching out. Our technical architecture team will get back to you within 4 hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 bg-[#0B132B] text-[#39FF88] border border-[#39FF88]/30 hover:bg-[#39FF88] hover:text-[#0B132B] font-bold px-6 py-2.5"
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

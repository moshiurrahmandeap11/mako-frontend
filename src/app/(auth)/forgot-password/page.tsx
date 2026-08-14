'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { KeyRound, ArrowLeft } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import NetworkWave from '@/components/NetworkWave';
import Button from '@/components/Button';
import Logo from '@/components/Logo';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: 'forget-password',
      });

      if (error) {
        throw new Error(error.message || 'Failed to send reset code');
      }

      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.message || 'Failed to send password reset code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      {/* Background Wave */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <NetworkWave />
      </div>

      {/* Header/Logo */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
        <Logo href="/" size="md" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">Forgot Password?</h1>
          <p className="text-slate-400 text-sm mt-2">
            Enter your work email address and we'll send you a 6-digit OTP code to reset your password.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="merchant@store.com"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded focus:outline-none focus:border-amber-500 text-white placeholder-slate-600 text-sm transition-colors"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full py-3.5">
            {loading ? 'Sending Code...' : 'Send Reset Code'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

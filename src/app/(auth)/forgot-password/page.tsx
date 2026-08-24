'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { KeyRound, ArrowLeft } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
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
    <div className="relative min-h-screen bg-[#F7F7F7] text-[#222325] flex items-center justify-center p-4">
      {/* Header/Logo */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
        <Logo href="/" size="md" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-white border border-[#E4E5E7] rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F8F0] border border-[#1DBF73]/20 text-[#1DBF73] flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#222325]">Forgot Password?</h1>
          <p className="text-[#62646A] text-sm mt-2">
            Enter your work email address and we'll send you a 6-digit OTP code to reset your password.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#62646A] mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="merchant@store.com"
              className="w-full px-4 py-3 bg-white border border-[#E4E5E7] rounded-xl focus:outline-none focus:border-[#1DBF73] text-[#222325] placeholder-[#74767E] text-sm transition-colors"
            />
          </div>

          <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full justify-center">
            {loading ? 'Sending Code...' : 'Send Reset Code'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="inline-flex items-center gap-2 text-[#74767E] hover:text-[#222325] transition-colors text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

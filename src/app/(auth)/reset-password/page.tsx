'use client';

import { useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Lock, Eye, EyeOff, CheckCircle2, ArrowLeft } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import Button from '@/components/Button';
import Logo from '@/components/Logo';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get('email') || '';

  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      setOtp(pastedData.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter the complete 6-digit OTP code.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.emailOtp.resetPassword({
        email,
        otp: otpCode,
        password,
      });

      if (error) {
        throw new Error(error.message || 'Failed to reset password');
      }

      setSuccess('Password updated successfully! Redirecting to sign in...');
      setTimeout(() => {
        router.push('/login');
      }, 1800);
    } catch (err: any) {
      setError(err.message || 'Invalid or expired OTP code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md bg-white border border-[#E4E5E7] rounded-2xl p-8 shadow-xl">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-[#E8F8F0] border border-[#1DBF73]/20 text-[#1DBF73] flex items-center justify-center mx-auto mb-4">
          <Lock className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#222325]">Reset Password</h1>
        <p className="text-[#62646A] text-sm mt-2">
          Enter the 6-digit OTP code sent to{' '}
          <span className="text-[#1DBF73] font-semibold">{email || 'your email'}</span> and choose your new password.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm text-center">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 rounded-xl bg-[#E8F8F0] border border-[#1DBF73]/20 text-[#1DBF73] text-sm flex items-center justify-center gap-2 text-center font-semibold">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {!initialEmail && (
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#62646A] mb-2">
              Work Email
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
        )}

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#62646A] mb-2 text-center">
            6-Digit OTP Code
          </label>
          <div className="flex justify-between gap-2" onPaste={handlePaste}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => { inputRefs.current[idx] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-12 h-14 bg-white border border-[#E4E5E7] rounded-xl text-center text-xl font-extrabold text-[#1DBF73] focus:outline-none focus:border-[#1DBF73] focus:ring-1 focus:ring-[#1DBF73] transition-colors"
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#62646A] mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full px-4 py-3 bg-white border border-[#E4E5E7] rounded-xl focus:outline-none focus:border-[#1DBF73] text-[#222325] placeholder-[#74767E] text-sm transition-colors pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#74767E] hover:text-[#222325] transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#62646A] mb-2">
            Confirm New Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            className="w-full px-4 py-3 bg-white border border-[#E4E5E7] rounded-xl focus:outline-none focus:border-[#1DBF73] text-[#222325] placeholder-[#74767E] text-sm transition-colors"
          />
        </div>

        <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full justify-center">
          {loading ? 'Resetting Password...' : 'Update Password'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link href="/login" className="inline-flex items-center gap-2 text-[#74767E] hover:text-[#222325] transition-colors text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="relative min-h-screen bg-[#F7F7F7] text-[#222325] flex items-center justify-center p-4">
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
        <Logo href="/" size="md" />
      </div>
      <Suspense fallback={<div className="text-[#74767E] text-sm">Loading reset password page...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Zap } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import NetworkWave from '@/components/NetworkWave';
import Button from '@/components/Button';
import Logo from '@/components/Logo';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session) {
      router.push('/dashboard');
    }
  }, [session, isPending, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: '/dashboard',
      });

      if (error) {
        throw new Error(error.message || 'Failed to create merchant account');
      }

      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to create merchant account');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google') => {
    setError('');
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      await authClient.signIn.social({
        provider,
        callbackURL: `${origin}/dashboard`,
      });
    } catch (err: any) {
      setError(err.message || `Failed to sign in with ${provider}`);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0B132B] text-slate-100 flex items-center justify-center p-4">
      {/* Background Wave */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <NetworkWave />
      </div>

      {/* Header/Logo */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
        <Logo href="/" size="md" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-[#131D38] backdrop-blur-md border border-[#39FF88]/25 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Create Merchant Account</h1>
          <p className="text-slate-300 text-sm mt-2">Start engaging store visitors with AI in 2 minutes</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Store / Business Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aura Fashion Store"
              className="w-full px-4 py-3 bg-[#0B132B] border border-[#39FF88]/20 rounded-xl focus:outline-none focus:border-[#39FF88] text-white placeholder-slate-500 text-sm transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Work Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="merchant@store.com"
              className="w-full px-4 py-3 bg-[#0B132B] border border-[#39FF88]/20 rounded-xl focus:outline-none focus:border-[#39FF88] text-white placeholder-slate-500 text-sm transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#0B132B] border border-[#39FF88]/20 rounded-xl focus:outline-none focus:border-[#39FF88] text-white placeholder-slate-500 text-sm transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            isLoading={loading}
            variant="primary"
            size="lg"
            className="w-full"
          >
            Create Account Free
          </Button>
        </form>

        <div className="relative my-6 text-center text-xs text-slate-400">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#39FF88]/15" />
          </div>
          <span className="relative px-3 bg-[#131D38] text-slate-400 uppercase tracking-widest text-[10px] font-bold">
            Or continue with
          </span>
        </div>

        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={() => handleSocialLogin('google')}
          icon={
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.2 8.9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.3 14.7c-.3-.8-.4-1.7-.4-2.7s.1-1.9.4-2.7L1.6 6.4C.6 8.4 0 10.1 0 12s.6 3.6 1.6 5.6l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.2-6.7-5.3L1.6 16C3.5 19.8 7.4 23 12 23z"
              />
            </svg>
          }
        >
          Google SSO
        </Button>

        <p className="text-center text-xs text-slate-400 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#39FF88] font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

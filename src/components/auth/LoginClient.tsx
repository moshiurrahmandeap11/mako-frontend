"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Button from "@/components/Button";
import Logo from "@/components/Logo";

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session) {
      router.push("/dashboard");
    }
  }, [session, isPending, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message || "Failed to login");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google") => {
    setError("");
    try {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      await authClient.signIn.social({
        provider,
        callbackURL: `${origin}/dashboard`,
      });
    } catch (err: any) {
      setError(err.message || `Failed to sign in with ${provider}`);
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
          <h1 className="text-2xl font-extrabold tracking-tight text-[#222325]">
            Get into Your Account
          </h1>
          <p className="text-[#62646A] text-sm mt-2 font-normal">
            Access your Labto AI Merchant Dashboard
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
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

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#62646A]">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#1DBF73] hover:underline font-bold"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white border border-[#E4E5E7] rounded-xl focus:outline-none focus:border-[#1DBF73] text-[#222325] placeholder-[#74767E] text-sm transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#74767E] hover:text-[#222325] cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            isLoading={loading}
            variant="primary"
            size="lg"
            className="w-full justify-center"
          >
            Sign In to Console
          </Button>
        </form>

        <div className="relative my-6 text-center text-xs text-[#74767E]">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E4E5E7]" />
          </div>
          <span className="relative px-3 bg-white text-[#74767E] uppercase tracking-widest text-[10px] font-bold">
            Or continue with
          </span>
        </div>

        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="w-full justify-center text-[#222325] border-[#E4E5E7] hover:bg-slate-50"
          onClick={() => handleSocialLogin("google")}
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

        <p className="text-center text-xs text-[#62646A] mt-6 font-normal">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-[#1DBF73] font-bold hover:underline"
          >
            Register store
          </Link>
        </p>
      </div>
    </div>
  );
}

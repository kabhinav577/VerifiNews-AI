'use client';

import { useState } from 'react';
import { supabase } from '../services/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] px-4 py-12 relative overflow-hidden font-sans">
      {/* Background Concentric Circles */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full border-[1px] border-slate-200/50 scale-[1]"></div>
        <div className="absolute w-[600px] h-[600px] rounded-full border-[1px] border-slate-200/40 scale-[1.5]"></div>
        <div className="absolute w-[600px] h-[600px] rounded-full border-[1px] border-slate-200/30 scale-[2]"></div>
        <div className="absolute w-[600px] h-[600px] rounded-full border-[1px] border-slate-200/20 scale-[2.5]"></div>
        <div className="absolute w-[600px] h-[600px] rounded-full border-[1px] border-slate-200/10 scale-[3]"></div>
      </div>

      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10 p-6 border border-gray-100 relative z-10">
        <div className="flex items-center justify-center mb-4">
            <Image src="/logo.png" alt="VerifiNews Logo" width={220} height={60} className="object-contain max-h-28 w-auto" priority />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Welcome Back</h1>
          <p className="text-[#64748B] mt-2 text-[14px]">Please enter your details to access the dashboard.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[13px] font-medium text-[#334155] mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#EFF6FF] focus:border-[#3B82F6] outline-none transition-all text-[14px] text-[#0F172A] placeholder:text-[#94A3B8]"
              placeholder="name@company.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[13px] font-medium text-[#334155]">
                Password
              </label>
              <a href="#" className="text-[13px] font-medium text-[#2563EB] hover:text-[#1D4ED8] transition-colors">
                Forgot Password?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#EFF6FF] focus:border-[#3B82F6] outline-none transition-all text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] tracking-widest font-sans"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-[14px] font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB] disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6"
          >
            {loading ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                </span>
            ) : 'Log In'}
          </button>
        </form>

        <div className="mt-7 mb-6 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-[#F1F5F9]" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-white text-[13px] text-[#94A3B8]">
              Or continue with
            </span>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => handleOAuthLogin('google')}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 border border-[#E2E8F0] rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.02)] bg-white text-[14px] font-semibold text-[#334155] hover:bg-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="mt-8 text-center text-[13.5px]">
          <span className="text-[#64748B]">Don't have an account? </span>
          <Link href="/signup" className="font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

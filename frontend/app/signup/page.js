'use client';

import { useState } from 'react';
import { supabase } from '../services/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || null,
          }
        }
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

      {/* Top Header */}
      <div className="absolute top-6 left-0 right-0 px-8 flex justify-between items-center z-20">
        <Link href="/" className="flex items-center">
           <Image src="/logo.png" alt="VerifiNews Logo" width={160} height={50} className="object-contain max-h-28 w-auto" priority />
        </Link>
        <a href="#" className="text-[14px] font-medium text-[#64748B] hover:text-[#334155] transition-colors hidden sm:block">
          Need help?
        </a>
      </div>

      <div className="w-full max-w-[440px] mt-12 mb-6">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10 p-6 border border-gray-100 relative z-10 w-full">
          {/* Blue Top Border */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#3B82F6] rounded-t-2xl"></div>

          <div className="text-center mb-8 mt-2">
            <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight">Create Account</h1>
            <p className="text-[#64748B] mt-2.5 text-[14px]">Start verifying the truth with AI precision.</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-700 text-[13px] rounded-lg border border-red-100 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[13px] font-medium text-[#334155] mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#EFF6FF] focus:border-[#3B82F6] outline-none transition-all text-[14px] text-[#0F172A] placeholder:text-[#94A3B8]"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[13px] font-medium text-[#334155] mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-9 pr-4 py-2.5 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#EFF6FF] focus:border-[#3B82F6] outline-none transition-all text-[14px] text-[#0F172A] placeholder:text-[#94A3B8]"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[13px] font-medium text-[#334155] mb-2">
                Password
              </label>
              <div className="relative mb-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-9 pr-10 py-2.5 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#EFF6FF] focus:border-[#3B82F6] outline-none transition-all text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] tracking-widest font-sans"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#94A3B8] hover:text-[#64748B] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="h-4 flex justify-end">
                  {password.length > 0 && (
                    <span className="text-[11px] text-[#94A3B8] font-medium">
                      {password.length >= 8 ? 'Good strength' : 'Weak'}
                    </span>
                  )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-[14px] font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB] disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
            >
              {loading ? (
                  <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                  </span>
              ) : 'Create Account'}
            </button>
          </form>

          <div className="mt-7 mb-6 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-[#F1F5F9]" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-[13px] text-[#94A3B8]">
                Or join with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-[#E2E8F0] rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.02)] bg-white text-[14px] font-semibold text-[#334155] hover:bg-[#F8FAFC] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-[#E2E8F0] rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.02)] bg-white text-[14px] font-semibold text-[#334155] hover:bg-[#F8FAFC] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477.108.108 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.645 0 0 .84-.268 2.75 1.024A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.335 1.909-1.292 2.747-1.024 2.747-1.024.546 1.375.203 2.392.1 2.645.64.698 1.028 1.591 1.028 2.682 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </button>
          </div>

          <div className="mt-8 text-center text-[13.5px]">
            <span className="text-[#64748B]">Already have an account? </span>
            <Link href="/login" className="font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors">
              Log in
            </Link>
          </div>
        </div>

        {/* Form Footer Text */}
        <div className="mt-6 text-center text-[12px] text-[#94A3B8] font-medium leading-[18px]">
          By creating an account, you agree to our <a href="#" className="underline hover:text-[#64748B]">Terms of Service</a> and <a href="#" className="underline hover:text-[#64748B]">Privacy Policy</a>.
        </div>
      </div>
      
      {/* Absolute Bottom Copyright */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-[11px] text-[#94A3B8] font-medium">
         © 2023 VerifiNews AI Inc. All rights reserved.
      </div>
    </div>
  );
}

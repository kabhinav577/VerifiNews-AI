'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../services/supabase';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => pathname === path;

  // Don't render header on auth pages to match mockups
  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-[10rem] h-[10rem]">
              <Image 
                src="/logo-2.png" 
                alt="VerifiNews-AI Logo" 
                fill
                className="object-contain"
                sizes="(max-width: 768px) 120px, 160px"
                priority
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link 
              href="/verify" 
              className={`transition-colors ${isActive('/verify') ? 'text-blue-600 font-bold' : 'hover:text-blue-600'}`}
            >
              Verify
            </Link>
            <Link 
              href="/feed" 
              className={`transition-colors ${isActive('/feed') ? 'text-blue-600 font-bold' : 'hover:text-blue-600'}`}
            >
              Feed
            </Link>
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-700 hover:text-blue-600 border border-slate-200 px-5 py-2.5 rounded-lg hover:bg-slate-50 transition-all"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4 text-base font-medium text-slate-600">
            <Link 
              href="/verify" 
              className={`py-2 border-b border-slate-50 transition-colors ${isActive('/verify') ? 'text-blue-600 font-bold' : 'hover:text-blue-600'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Verify News
            </Link>
            <Link 
              href="/feed" 
              className={`py-2 border-b border-slate-50 transition-colors ${isActive('/feed') ? 'text-blue-600 font-bold' : 'hover:text-blue-600'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Live Feed
            </Link>
          </nav>
          
          <div className="pt-2">
            {user ? (
              <div className="flex flex-col gap-4">
                <span className="text-sm text-slate-500 px-1">
                  Signed in as {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-left text-base font-medium text-red-600 hover:text-red-700 transition-colors py-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="block w-full text-center text-base font-medium text-white bg-blue-600 px-5 py-3 rounded-lg hover:bg-blue-700 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

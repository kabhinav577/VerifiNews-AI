'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../services/supabase';
import { useRouter, usePathname } from 'next/navigation';
import { Bell, User, LogOut, Settings, Bookmark } from 'lucide-react';

export default function Header() {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <header className="bg-white/80 dark:bg-brand-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-brand-border sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4 h-[5.5rem] flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-[10rem] h-[10rem]">
              <Image 
                src="/logo.png" 
                alt="VerifiNews-AI Logo" 
                fill
                className="object-contain"
                sizes="(max-width: 768px) 120px, 160px"
                priority
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link 
              href="/verify" 
              className={`transition-colors ${isActive('/verify') ? 'text-blue-600 dark:text-blue-400 font-bold' : 'hover:text-blue-600 dark:hover:text-blue-400'}`}
            >
              Verify
            </Link>
            <Link 
              href="/feed" 
              className={`transition-colors ${isActive('/feed') ? 'text-blue-600 dark:text-blue-400 font-bold' : 'hover:text-blue-600 dark:hover:text-blue-400'}`}
            >
              Feed
            </Link>
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
            {/* Notification Bell (Static Showpiece) */}
            <button className="relative w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
                2
              </span>
            </button>
          </div>

          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold overflow-hidden shadow-sm border-2 border-white dark:border-brand-border hover:scale-105 transition-transform">
                  {user.user_metadata?.avatar_url ? (
                    <Image 
                      src={user.user_metadata.avatar_url} 
                      alt="Profile" 
                      width={40} 
                      height={40} 
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    user.email.charAt(0).toUpperCase()
                  )}
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-brand-card rounded-xl shadow-xl border border-slate-100 dark:border-brand-border overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-brand-border bg-slate-50/50 dark:bg-brand-dark/50">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {user.user_metadata?.full_name || 'User'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="p-1.5 flex flex-col gap-0.5">
                    <Link 
                      href="/profile"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-brand-hover hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
                    >
                      <User className="w-4 h-4" /> Profile
                    </Link>
                    <Link 
                      href="#"
                      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-brand-hover hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
                    >
                      <Bookmark className="w-4 h-4" /> Saved Articles
                    </Link>
                    <Link 
                      href="#"
                      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-brand-hover hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
                    >
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                  </div>
                  <div className="p-1.5 border-t border-slate-100 dark:border-brand-border">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 px-5 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
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
        <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-brand-card border-b border-gray-100 dark:border-brand-border shadow-lg py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200 z-50">
          <nav className="flex flex-col gap-4 text-base font-medium text-slate-600 dark:text-slate-300">
            <Link 
              href="/verify" 
              className={`py-2 border-b border-slate-50 dark:border-brand-hover transition-colors ${isActive('/verify') ? 'text-blue-600 dark:text-blue-400 font-bold' : 'hover:text-blue-600 dark:hover:text-blue-400'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Verify News
            </Link>
            <Link 
              href="/feed" 
              className={`py-2 border-b border-slate-50 dark:border-brand-hover transition-colors ${isActive('/feed') ? 'text-blue-600 dark:text-blue-400 font-bold' : 'hover:text-blue-600 dark:hover:text-blue-400'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Live Feed
            </Link>
            {user && (
              <Link 
                href="/profile" 
                className={`py-2 border-b border-slate-50 dark:border-brand-hover transition-colors ${isActive('/profile') ? 'text-blue-600 dark:text-blue-400 font-bold' : 'hover:text-blue-600 dark:hover:text-blue-400'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
            )}
          </nav>
          
          <div className="pt-2">
            {user ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 px-1">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold overflow-hidden shadow-sm border border-white dark:border-brand-border">
                      {user.user_metadata?.avatar_url ? (
                        <Image 
                          src={user.user_metadata.avatar_url} 
                          alt="Profile" 
                          width={40} 
                          height={40} 
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        user.email.charAt(0).toUpperCase()
                      )}
                   </div>
                   <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {user.user_metadata?.full_name || 'User'}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {user.email}
                      </span>
                   </div>
                </div>
                
                {/* Leftover dark mode toggle removed */}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-center text-base font-medium text-red-600 hover:text-red-700 transition-colors py-3 border-t border-slate-100 dark:border-slate-800"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                 {/* Leftover dark mode toggle removed */}
                <Link
                  href="/login"
                  className="block w-full text-center flex justify-center items-center text-base font-medium text-white bg-blue-600 px-5 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-md mt-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

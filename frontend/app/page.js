'use client';

import Link from 'next/link';


export default function Home() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50/50">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 text-center">
        <div className="container mx-auto max-w-5xl">
          
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">Live Analysis Engine</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
            Verify News in <br className="hidden md:block" />
            <span className="relative inline-block text-blue-600">
              Seconds
              <svg className="absolute w-full h-3 -bottom-2 left-0 text-blue-200" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            AI-powered credibility analysis using advanced language models to detect bias, misinformation, and source reliability.
          </p>

          {/* Action Tabs & Form */}
          <div className="max-w-3xl mx-auto mb-24">
            <div className="flex justify-center gap-4 mb-8">
              <Link href="/verify" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/40 transition-all text-lg flex items-center gap-2 transform hover:-translate-y-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Launch Verifier
              </Link>
              <Link href="/feed" className="px-8 py-3 bg-white text-slate-700 font-bold rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm text-lg flex items-center gap-2 group">
                Browse Feed 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-slate-100 -z-10"></div>

            {/* Step 1 */}
            <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:shadow-md group-hover:bg-blue-100 transition-all">
                <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">1. Paste Link/Text</h3>
              <p className="text-slate-500 leading-relaxed">Copy any news article text or URL and drop it into our analyzer.</p>
            </div>

            {/* Step 2 */}
            <div className="text-center group hover:-translate-y-1 transition-transform duration-300 delay-100">
              <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:shadow-md group-hover:bg-blue-100 transition-all">
                <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">2. AI Analysis</h3>
              <p className="text-slate-500 leading-relaxed">Our advanced models cross-reference facts and detect sentiment bias.</p>
            </div>

            {/* Step 3 */}
            <div className="text-center group hover:-translate-y-1 transition-transform duration-300 delay-200">
              <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:shadow-md group-hover:bg-blue-100 transition-all">
                <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">3. Get Trust Score</h3>
              <p className="text-slate-500 leading-relaxed">Receive a comprehensive report on the article's credibility and sources.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">© 2026 VerifiNews-AI. Trust but verify.</p>
          <div className="flex justify-center gap-6 mt-4 text-sm text-slate-500">
            <a href="#" className="hover:text-blue-600">Privacy</a>
            <a href="#" className="hover:text-blue-600">Terms</a>
            <a href="#" className="hover:text-blue-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

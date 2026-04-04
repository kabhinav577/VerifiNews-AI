'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8fafc]">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 bg-blue-100/50 border border-blue-100 rounded-full px-3 py-1 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">AI-POWERED ANALYSIS</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
              Verify News <span className="text-blue-600">in<br/>Seconds.</span>
            </h1>

            <p className="text-lg text-slate-500 mb-8 max-w-xl leading-relaxed">
              AI-powered credibility analysis for a cleaner information ecosystem. Stop the spread of misinformation with instant, data-driven truth verification.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/verify" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition flex items-center gap-2">
                Analyze News
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </Link>
              <Link href="/feed" className="px-6 py-3 bg-white text-slate-700 font-semibold rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition">
                Explore Feed
              </Link>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-[540px] relative z-10">
            {/* Background Blur Blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 blur-[80px] pointer-events-none opacity-60">
              <div className="absolute top-0 right-10 w-64 h-64 bg-cyan-300 rounded-full mix-blend-multiply filter"></div>
              <div className="absolute bottom-10 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter"></div>
              <div className="absolute top-20 left-10 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter"></div>
            </div>

            {/* Main Glassmorphism Card */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] p-6 md:p-8 border border-white/80 space-y-6">
              
              {/* Top Row */}
              <div className="flex flex-col sm:flex-row gap-6 justify-between items-start">
                {/* Left: Verified Badge + Skeletons */}
                <div className="flex-1 space-y-5 w-full pt-2">
                  <div className="inline-flex items-center gap-3 bg-[#E1EDFF] px-6 py-3 rounded-[1rem] mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[26px] w-[26px] text-blue-600 stroke-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-blue-600 font-bold text-[22px] leading-none lowercase tracking-wide translate-y-[1px]">verified</span>
                  </div>
                  <div className="space-y-4">
                    <div className="h-3.5 bg-slate-200/80 rounded-full w-[100%]"></div>
                    <div className="h-3.5 bg-slate-200/80 rounded-full w-[100%]"></div>
                    <div className="h-3.5 bg-slate-200/80 rounded-full w-[80%]"></div>
                  </div>
                </div>

                {/* Right: Score Card */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex-shrink-0 w-full sm:w-[180px]">
                  <p className="text-[10px] font-bold text-slate-600 mb-4 whitespace-nowrap text-center">CREDIBILITY SCORE: 98%</p>
                  <div className="relative w-full aspect-[2/1] overflow-hidden flex justify-center mt-2">
                    {/* Semi-Circle Gauge SVG */}
                    <svg viewBox="0 0 100 50" className="w-[120px] h-auto overflow-visible">
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
                      {/* Gradient Arc */}
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="url(#scoreGradient)" strokeWidth="8" strokeLinecap="round" strokeDasharray="125.6" strokeDashoffset="5" />
                      <defs>
                        <linearGradient id="scoreGradient">
                          <stop offset="0%" stopColor="#ef4444" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute bottom-0 left-0 w-full text-center">
                      <span className="text-3xl font-extrabold text-slate-800 tracking-tighter">98<span className="text-xl">%</span></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Left: Network Graph Card */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex-1 flex items-center justify-center min-h-[160px] relative overflow-hidden">
                   <svg width="100%" height="100%" viewBox="0 0 200 120" className="opacity-90">
                     <g stroke="#cbd5e1" strokeWidth="0.75" opacity="0.6">
                       <line x1="30" y1="70" x2="60" y2="40" />
                       <line x1="30" y1="70" x2="60" y2="80" />
                       <line x1="60" y1="40" x2="90" y2="50" />
                       <line x1="60" y1="80" x2="90" y2="70" />
                       <line x1="90" y1="40" x2="110" y2="20" />
                       <line x1="90" y1="70" x2="110" y2="100" />
                       <line x1="90" y1="50" x2="130" y2="60" />
                       <line x1="110" y1="20" x2="150" y2="40" />
                       <line x1="110" y1="100" x2="140" y2="90" />
                       <line x1="130" y1="60" x2="150" y2="40" />
                       <line x1="130" y1="60" x2="140" y2="90" />
                       <line x1="130" y1="60" x2="170" y2="60" />
                       <line x1="60" y1="40" x2="90" y2="70" />
                       <line x1="90" y1="20" x2="130" y2="60" />
                       <line x1="90" y1="100" x2="130" y2="60" />
                       <line x1="60" y1="80" x2="110" y2="100" />
                     </g>
                     <g fill="#3b82f6" opacity="0.9">
                       <circle cx="30" cy="70" r="3" fill="#cbd5e1" />
                       <circle cx="60" cy="40" r="4" fill="#94A3B8" />
                       <circle cx="60" cy="80" r="3.5" />
                       <circle cx="90" cy="20" r="5" fill="#60a5fa" bg="white" strokeWidth="2" stroke="#bfdbfe" />
                       <circle cx="90" cy="50" r="4.5" />
                       <circle cx="90" cy="70" r="3" fill="#93c5fd" />
                       <circle cx="110" cy="20" r="2.5" />
                       <circle cx="110" cy="100" r="3.5" fill="#60a5fa" />
                       <circle cx="150" cy="40" r="2.5" fill="#93c5fd" />
                       <circle cx="140" cy="90" r="3.5" />
                       <circle cx="170" cy="60" r="2.5" fill="#60a5fa" />
                     </g>
                     {/* Focus Node */}
                     <circle cx="130" cy="60" r="6.5" fill="#a855f7" stroke="#f3e8ff" strokeWidth="3" />
                     <circle cx="130" cy="60" r="14" fill="none" stroke="#d8b4fe" strokeWidth="0.5" className="animate-ping" />
                   </svg>
                </div>

                {/* Right: Detail Card */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex-1 space-y-4">
                  <div>
                    <h4 className="text-[9px] font-bold text-slate-700 uppercase tracking-widest leading-none mb-1">SOURCE VERIFICATION:</h4>
                    <p className="text-emerald-500 font-semibold text-sm leading-none mb-2">High</p>
                    <div className="h-1 w-full bg-slate-100 rounded-full mb-2">
                       <div className="h-full bg-emerald-400 rounded-full w-[90%]"></div>
                    </div>
                    <div className="space-y-1 mt-2">
                      <div className="h-1 bg-slate-200/80 rounded-full w-[85%]"></div>
                      <div className="h-1 bg-slate-200/80 rounded-full w-[65%]"></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-[9px] font-bold text-slate-700 uppercase tracking-widest leading-none mb-1">BIAS ANALYSIS:</h4>
                    <p className="text-emerald-500 font-semibold text-sm leading-none mb-2">Minimal</p>
                    <div className="h-1 w-full bg-slate-100 rounded-full mb-2">
                       <div className="h-full bg-[#2563EB] rounded-full w-[80%]"></div>
                    </div>
                    <div className="space-y-1 mt-2">
                      <div className="h-1 bg-slate-200/80 rounded-full w-[95%]"></div>
                      <div className="h-1 bg-slate-200/80 rounded-full w-[55%]"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* The Truth Infrastructure Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The Truth Infrastructure</h2>
          <p className="text-slate-500 mb-16 mx-auto max-w-2xl">
            In an era of hyper-biased reporting and algorithmic misinformation, trust is our most valuable currency.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-red-50/40 rounded-2xl p-8 text-left border border-red-100">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-6 text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-red-900 mb-2">The Misinformation Crisis</h3>
              <p className="text-red-800/80 leading-relaxed text-sm">Fake news spreads 6x faster than truth on social networks, creating echo chambers that distort public perception and institutional trust.</p>
            </div>
            
            <div className="bg-blue-50/40 rounded-2xl p-8 text-left border border-blue-100">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">The AI Guardian Solution</h3>
              <p className="text-blue-800/80 leading-relaxed text-sm">Our neural networks analyze over 50 linguistic markers in milliseconds to provide neutral, fact-based scoring of any digital article.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 text-left border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-sm">Deep Link Analysis</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Simply paste any news URL. Our system crawls the metadata, author details, and hosting infrastructure to verify authenticity.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-left border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-sm">Linguistic Bias Detection</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Identifying subtle emotional manipulation and loaded language through advanced Natural Language Processing (NLP).</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-left border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-sm">Source Reliability</h3>
              <p className="text-slate-500 text-sm leading-relaxed">We cross-reference the publisher's historical accuracy and funding transparency against a global database of trusted sources.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Credibility Scale Section */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">The Credibility Scale</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-blue-50 shadow-sm flex flex-col items-center">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> High Trust (81-100)
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                The content exhibits objective reporting, verified citations, and comes from a historically reliable domain.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-amber-50 shadow-sm flex flex-col items-center">
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> Moderate (50-80)
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Presents elements of bias or missing context. Recommended to verify with a second independent source.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 border border-red-50 shadow-sm flex flex-col items-center">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> Fact Check (0-49)
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                High probability of misinformation, extreme bias, or manipulative intent. Content flagged for manual review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Steps to Clarity */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-20">Three Steps to Clarity</h2>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-6 left-[20%] right-[20%] h-px bg-slate-200 -z-10"></div>
            
            <div className="flex flex-col items-center relative bg-white">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mb-6 shadow-md">1</div>
              <h3 className="font-bold text-slate-900 mb-2 text-sm">Paste Article Link</h3>
              <p className="text-slate-500 text-xs text-center leading-relaxed max-w-[200px]">Input the URL of any digital news piece from any major platform.</p>
            </div>
            
            <div className="flex flex-col items-center relative bg-white">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mb-6 shadow-md">2</div>
              <h3 className="font-bold text-slate-900 mb-2 text-sm">AI Processing</h3>
              <p className="text-slate-500 text-xs text-center leading-relaxed max-w-[200px]">RoBERTa and MobileBERT models analyze syntax and cross-reference data.</p>
            </div>
            
            <div className="flex flex-col items-center relative bg-white">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mb-6 shadow-md">3</div>
              <h3 className="font-bold text-slate-900 mb-2 text-sm">Get Trust Score</h3>
              <p className="text-slate-500 text-xs text-center leading-relaxed max-w-[200px]">Receive an instant visual report detailing credibility and bias markers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-blue-600 text-white text-center px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-blue-400 text-4xl font-serif mb-6 flex justify-center">❝</div>
          <h2 className="text-xl md:text-2xl font-medium leading-relaxed mb-10 italic max-w-3xl mx-auto">
            "VerifiNews AI has become an essential part of my daily workflow. It allows me to quickly filter through the noise and focus on verified data points, saving hours of manual cross-referencing."
          </h2>
          <div className="flex items-center justify-center gap-4">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
              alt="Elena Rodriguez" 
              className="w-12 h-12 rounded-full border-2 border-blue-400 object-cover"
            />
            <div className="text-left">
              <div className="font-bold text-sm">Elena Rodriguez</div>
              <div className="text-blue-200 text-xs">Senior Investigative Journalist, Global Press</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Start Verifying Now</h2>
          <p className="text-slate-500 mb-10 text-sm">
            Join thousands of researchers and citizens in cleaning the information ecosystem.
          </p>
          
          <div className="bg-white p-2 rounded-xl md:rounded-full shadow-sm flex flex-col md:flex-row items-center mb-8 border border-slate-200 w-full max-w-2xl mx-auto gap-2">
            <input 
              type="text" 
              placeholder="https://news-article-link.com/..." 
              className="flex-1 w-full px-4 py-2 bg-transparent border-none outline-none text-slate-700 text-sm"
            />
            <button className="px-8 py-2.5 bg-blue-600 text-white font-semibold rounded-lg md:rounded-full w-full md:w-auto hover:bg-blue-700 transition text-sm">
              Analyze
            </button>
          </div>
          
          <div className="flex justify-center flex-wrap gap-8 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Secure Analysis
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              History Tracked
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              API Ready
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <div className="font-bold text-sm text-slate-900 mb-1">VerifiNews AI</div>
            <p className="text-slate-400 text-xs">© 2026 VerifiNews AI. The Transparent Guardian.</p>
          </div>
          <div className="flex gap-4 md:gap-6 text-xs text-slate-500 flex-wrap justify-center">
            <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition">Security</a>
            <a href="#" className="font-semibold text-slate-700 hover:text-blue-600 transition">API Documentation</a>
            <a href="#" className="hover:text-blue-600 transition">Trust Center</a>
            <a href="#" className="hover:text-blue-600 transition">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

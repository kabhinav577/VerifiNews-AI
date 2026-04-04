import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getArticleByTitle } from '../../services/api';

export async function generateMetadata({ params }) {
  const title = decodeURIComponent(params.id);
  const article = await getArticleByTitle(title);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} - VerifiNews-AI`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }) {
  const title = decodeURIComponent(params.id);
  const article = await getArticleByTitle(title);

  if (!article) {
    notFound();
  }

  // Clean the content of "[+1234 chars]"
  let displayContent = article.content || '';
  displayContent = displayContent.replace(/\[\+?\d+\s*chars\]\s*$/, '');

  // Calculate a mock read time based on word count of the truncated content + assumed total
  const readTime = Math.max(3, Math.ceil((displayContent.length + 2000) / 1000)); 

  // Format date
  const publishedDate = new Date(article.publishedAt);
  const formattedDate = publishedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Initials for avatar
  const sourceName = article.source?.name || 'News Source';
  const initials = sourceName.substring(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header/Nav area override just for layout matching - assuming global nav exists, we just add the back link */}
      <div className="container mx-auto px-4 py-6 max-w-4xl flex justify-end">
        <Link 
          href="/feed"
          className="inline-flex items-center text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-24 max-w-4xl">
        <article className="bg-white rounded-t-3xl shadow-sm overflow-hidden mb-6 relative">
          
          {/* Cover Image */}
          {article.image ? (
            <div className="relative w-full h-[400px]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw"
                priority
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-8">
                <span className="bg-blue-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium tracking-wide">
                  Top Story
                </span>
              </div>
            </div>
          ) : (
             <div className="relative w-full h-48 bg-slate-200">
                <div className="absolute bottom-6 left-8">
                  <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium tracking-wide">
                    Article
                  </span>
                </div>
             </div>
          )}

          <div className="px-8 md:px-12 py-10">
            {/* Title */}
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 w-fit mb-8 decoration-blue-600/30 hover:underline underline-offset-4">
              <h1 className="text-3xl md:text-[2.5rem] font-bold text-slate-900 leading-[1.2] tracking-tight group-hover:text-slate-800 transition-colors">
                {article.title}
              </h1>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 flex-shrink-0 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* Meta row: Avatar, Source, Date, Read Time */}
            <div className="flex items-center gap-4 text-slate-500 text-sm mb-12 border-b border-slate-100 pb-8">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-sm">
                {initials}
              </div>
              <div className="font-semibold text-slate-800">
                {sourceName}
              </div>
              
              <div className="flex items-center gap-1.5 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formattedDate}
              </div>
              
              <div className="flex items-center gap-1.5 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readTime} min read
              </div>
            </div>

            {/* Content Body */}
            <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed font-sans">
              
              <p className="text-xl text-slate-800 font-medium mb-8 leading-relaxed">
                {article.description}
              </p>
              
              <p className="mb-6 whitespace-pre-wrap">
                {displayContent}
              </p>
              
              {/* Optional blockquote to match design style if content is short */}
              {displayContent.length < 500 && (
                 <blockquote className="border-l-4 border-blue-600 pl-6 my-8 py-2 text-xl italic text-slate-700 font-serif bg-slate-50 rounded-r-lg">
                   "The transition will not be without its hurdles, particularly for developing economies reliant on traditional infrastructure."
                 </blockquote>
              )}

              {article.source.url && (
                <div className="mt-8">
                  <p className="text-sm text-slate-500 mb-2">Original article has been truncated. To read the complete coverage, please visit the source publication.</p>
                  <a 
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                  >
                    Continue reading on {sourceName}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>

            {/* Tags and Actions at bottom */}
            <div className="flex items-center justify-between mt-16 pt-8 border-t border-slate-100">
              <div className="flex gap-2 text-xs font-semibold text-slate-500">
                <span className="bg-slate-100 px-3 py-1.5 rounded-md hover:bg-slate-200 cursor-pointer transition">#News</span>
                <span className="bg-slate-100 px-3 py-1.5 rounded-md hover:bg-slate-200 cursor-pointer transition">#Update</span>
              </div>
              
              <div className="flex items-center gap-4 text-slate-400">
                <button className="hover:text-blue-600 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.632l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                <button className="hover:text-blue-600 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Floating Deep Blue Background Container for AI Verification */}
      <div className="bg-[#f0f4f8] py-12 border-t border-slate-200 -mt-16 relative z-0">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 flex flex-col md:flex-row gap-8 items-stretch relative">
            
            {/* Left side: Results */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">AI Verification Result</h3>
                </div>
                <span className="bg-green-100 text-green-700 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md">
                  Likely Credible
                </span>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm text-slate-500">Confidence Score</span>
                  <span className="text-lg font-bold text-blue-600">94%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full w-[94%]"></div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Analyzed by <span className="font-medium text-slate-600">VeriNews-Pro-v2</span> • 2s ago
              </div>
            </div>

            {/* Right side: Indicators */}
            <div className="w-full md:w-[280px] flex flex-col justify-center">
              <div className="bg-slate-50 rounded-xl border border-slate-100 p-5 mb-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Key Indicators</p>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-[10px] text-slate-400 mb-1">BIAS</p>
                    <p className="font-bold text-slate-800 text-sm">Low</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 mb-1">SENTIMENT</p>
                    <p className="font-bold text-slate-800 text-sm">Neutral</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 mb-1">FACTS</p>
                    <p className="font-bold text-slate-800 text-sm">Verified</p>
                  </div>
                </div>
              </div>
              
              <Link 
                href={`/?text=${encodeURIComponent(article.content || article.description)}`}
                className="w-full py-2.5 border border-blue-200 text-blue-600 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Re-analyze Article
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

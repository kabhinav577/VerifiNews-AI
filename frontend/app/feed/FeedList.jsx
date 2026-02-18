'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function FeedList({ initialArticles }) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = initialArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div>
      {/* Search and Filters */}
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Paste a news link or search topic to verify..."
            className="w-full pl-6 pr-32 py-4 bg-white border border-gray-200 rounded-full shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-full font-medium hover:bg-blue-700 transition-colors">
            Verify
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {['All Feed', 'Verified Real', 'Flagged Fake', 'Unsure'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f.toLowerCase().replace(' ', ''))}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                (filter === 'all' && f === 'All Feed') || filter === f.toLowerCase().replace(' ', '')
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                  : 'bg-white text-slate-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Article List */}
      <div className="max-w-3xl mx-auto space-y-6">
        {filteredArticles.length === 0 ? (
           <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <p className="text-gray-500">No articles found matching your search.</p>
          </div>
        ) : (
          filteredArticles.map((article, index) => (
            <div 
              key={`${article.title}-${index}`}
              className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Source Icon Placeholder */}
                  <div className="w-8 h-8 rounded-full bg-gray-100 relative overflow-hidden flex-shrink-0">
                     {/* Fallback or real icon if available */}
                     <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase">
                        {article.source.name.substring(0, 2)}
                     </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900 leading-tight">
                        {article.source.name}
                    </span>
                    <span className="text-xs text-gray-500">
                        {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {new Date(article.publishedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                {/* Simulated Verification Badge (For UI Demo) */}
                <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full flex items-center gap-1.5 border border-blue-100">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-bold tracking-wide">VERIFY</span>
                </div>
              </div>

              <Link href={`/article/${encodeURIComponent(article.title)}`}>
                <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {article.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {article.description}
                </p>
              </Link>

              {article.image && (
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden mt-4 mb-4">
                       <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                  </div>
              )}
            </div>
          ))
        )}
      </div>

       <div className="text-center mt-12">
        <button className="px-6 py-3 bg-white border border-gray-200 text-gray-600 font-medium rounded-full hover:bg-gray-50 transition-colors shadow-sm">
            Load More Stories
        </button>
       </div>
    </div>
  );
}

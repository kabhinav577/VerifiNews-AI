'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchCategorizedNews } from '../actions/newsActions';
import { predictUrl } from '../services/api';
import ResultCard from '../components/ResultCard';

const CATEGORIES = [
  'General', 'World', 'Nation', 'Business', 
  'Technology', 'Entertainment', 'Sports', 'Science', 'Health'
];

export default function FeedList({ initialArticles }) {
  const [category, setCategory] = useState('general');
  const [language, setLanguage] = useState('en');
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState(initialArticles);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // URL Verification States
  const [verifyUrl, setVerifyUrl] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState(null);
  const [verifyError, setVerifyError] = useState(null);

  const filteredArticles = articles.filter(article => {
    const titleMatch = article.title ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    const descMatch = article.description ? article.description.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    return titleMatch || descMatch;
  });

  const handleVerifyUrl = async (e) => {
    e.preventDefault();
    if (!verifyUrl.trim()) return;

    setVerifying(true);
    setVerifyError(null);
    setVerifyResult(null);

    try {
      const result = await predictUrl(verifyUrl, 'distilbert'); // Default to distilbert as per other areas
      setVerifyResult(result);
    } catch (err) {
      setVerifyError(err.message || 'Verification failed.');
    } finally {
      setVerifying(false);
    }
  };

  const handleLanguageChange = async (newLang) => {
    if (newLang === language) return;
    
    setLoadingCategory(true);
    setLanguage(newLang);
    setPage(1); // Reset page when language changes
    
    try {
      const data = await fetchCategorizedNews(category, 1, newLang);
      setArticles(data);
    } catch (err) {
      console.error('Failed to load language:', err);
    } finally {
      setLoadingCategory(false);
    }
  };

  const handleCategoryChange = async (newCategory) => {
    const formattedCategory = newCategory.toLowerCase();
    if (formattedCategory === category) return;

    setLoadingCategory(true);
    setCategory(formattedCategory);
    setPage(1); // Reset page when category changes
    
    try {
      const data = await fetchCategorizedNews(formattedCategory, 1, language);
      setArticles(data);
    } catch (err) {
      console.error('Failed to load category:', err);
    } finally {
      setLoadingCategory(false);
    }
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    
    try {
      const moreArticles = await fetchCategorizedNews(category, nextPage, language);
      setArticles(prev => [...prev, ...moreArticles]);
      setPage(nextPage);
    } catch (err) {
      console.error('Failed to load more articles:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div>
      {/* URL Verification Section */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <div className="mb-6 max-w-3xl mx-auto">
          <form onSubmit={handleVerifyUrl} className="relative">
            <input
              type="url"
              placeholder="Paste a news article URL to verify..."
              className="w-full pl-6 pr-36 py-4 bg-white dark:bg-brand-dark border border-gray-200 dark:border-brand-border rounded-full shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all text-gray-700 dark:text-slate-300"
              value={verifyUrl}
              onChange={(e) => setVerifyUrl(e.target.value)}
              disabled={verifying}
              required
            />
            <button 
              type="submit"
              disabled={verifying || !verifyUrl.trim()}
              className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-full font-medium hover:bg-blue-700 transition-colors disabled:opacity-75 flex items-center gap-2"
            >
              {verifying ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Verifying</span>
                </>
              ) : (
                'Verify URL'
              )}
            </button>
          </form>

          {verifyError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-left">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {verifyError}
            </div>
          )}

          {verifyResult && (
            <div className="mt-6 text-left animate-in fade-in slide-in-from-top-4">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Extracted Article</h4>
                <p className="font-medium text-gray-900 mt-1">{verifyResult.extracted_title}</p>
              </div>
              <ResultCard result={verifyResult} />
              
              <button 
                onClick={() => { setVerifyResult(null); setVerifyUrl(''); }}
                className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear Result
              </button>
            </div>
          )}
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center mb-6">
           <div className="inline-flex bg-slate-100 dark:bg-brand-card rounded-full p-1 border border-slate-200/60 dark:border-brand-border shadow-inner">
             <button
               onClick={() => handleLanguageChange('en')}
               className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                 language === 'en' 
                 ? 'bg-white dark:bg-brand-hover text-blue-600 shadow-sm' 
                 : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
               }`}
             >
               English
             </button>
             <button
               onClick={() => handleLanguageChange('hi')}
               className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-1.5 ${
                 language === 'hi' 
                 ? 'bg-white dark:bg-brand-hover text-blue-600 shadow-sm' 
                 : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
               }`}
             >
               Hindi (हिंदी)
             </button>
           </div>
        </div>

        {/* Categories Grid */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              disabled={loadingCategory}
              className={`px-4 py-2 rounded-full text-[13px] sm:text-sm font-medium transition-all ${
                category === cat.toLowerCase()
                  ? 'bg-slate-900 dark:bg-brand-hover text-white shadow-lg shadow-slate-200 dark:shadow-none'
                  : 'bg-white dark:bg-brand-card text-slate-600 dark:text-slate-400 border border-gray-200 dark:border-brand-border hover:border-gray-300 dark:hover:border-slate-500 hover:bg-gray-50 dark:hover:bg-brand-dark disabled:opacity-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Category State */}
      {loadingCategory ? (
        <div className="flex justify-center items-center py-20">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <>
          {/* Article List */}
          <div className="max-w-3xl mx-auto space-y-6">
            {filteredArticles.length === 0 ? (
               <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                <p className="text-gray-500">No articles found for "{category}". Try another category.</p>
              </div>
            ) : (
              filteredArticles.map((article, index) => (
                <div 
                  key={`${article.url}-${index}`}
                  className="bg-white dark:bg-brand-card rounded-3xl p-6 border border-gray-100 dark:border-brand-border hover:shadow-xl hover:shadow-slate-200/40 dark:hover:shadow-black/40 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 relative overflow-hidden flex-shrink-0 flex items-center justify-center">
                         <span className="text-[10px] font-bold text-slate-500 uppercase">
                            {article.source?.name?.substring(0, 2) || 'N/A'}
                         </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900 dark:text-slate-200 leading-tight">
                            {article.source?.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-slate-400">
                            {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {new Date(article.publishedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    <Link href={`/verify`}>
                      <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full flex items-center gap-1.5 border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-[11px] font-bold tracking-wide">VERIFY THIS</span>
                      </div>
                    </Link>
                  </div>

                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {article.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
                        {article.description}
                    </p>
                  </a>

                  {article.image && (
                      <div className="relative w-full h-64 rounded-2xl overflow-hidden mt-4 mb-2">
                           <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 800px"
                            unoptimized={true}
                          />
                      </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Load More Button */}
          {filteredArticles.length > 0 && (
             <div className="text-center mt-12 mb-8">
              <button 
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-8 py-3 bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border text-gray-700 dark:text-slate-300 font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-brand-hover hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm focus:ring-4 focus:ring-blue-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
              >
                  {loadingMore ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </>
                  ) : (
                    'Load More Stories'
                  )}
              </button>
             </div>
          )}
        </>
      )}
    </div>
  );
}

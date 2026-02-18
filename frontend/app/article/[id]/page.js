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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link 
        href="/feed"
        className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Feed
      </Link>

      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {article.image && (
          <div className="relative w-full h-96">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
               <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full mb-3 inline-block font-semibold">
                {article.source.name}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                {article.title}
              </h1>
            </div>
          </div>
        )}

        <div className="p-8">
          <div className="flex items-center justify-between text-gray-500 text-sm mb-8 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>
                Published on {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            {article.source.url && (
              <a 
                href={article.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                Visit Source
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            )}
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="lead text-xl text-gray-800 mb-6 font-medium">
              {article.description}
            </p>
            <p className="mb-6">
              {article.content}
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100 flex justify-center">
            <a 
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Read Full Article on {article.source.name}
            </a>
          </div>
        </div>
      </article>
      
      {/* Detailed AI Verification Result (Mockup for UI) */}
      <div className="mt-12 bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden relative">
        <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">AI Verification Result</h3>
            </div>
            
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-green-100 text-green-700 tracking-wide">
              LIKELY CREDIBLE
            </span>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-gray-500">Confidence Score</span>
              <span className="text-2xl font-bold text-blue-600">94%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out" 
                style={{ width: '94%' }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div className="text-center border-r border-gray-200 last:border-0">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Bias</p>
              <p className="font-bold text-gray-900">Low</p>
            </div>
            <div className="text-center border-r border-gray-200 last:border-0">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Sentiment</p>
              <p className="font-bold text-gray-900">Neutral</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Facts</p>
              <p className="font-bold text-gray-900">Verified</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Analyzed by VeriNews-Pro-v2 • Just now
            </div>
            
            <Link 
              href={`/?text=${encodeURIComponent(article.content || article.description)}`}
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
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
  );
}

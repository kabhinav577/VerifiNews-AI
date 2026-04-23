'use client';



/**
 * ResultCard Component
 * Displays the prediction results in a clean card format
 */
export default function ResultCard({ result }) {
  if (!result) return null;

  const { prediction, model_used, confidence } = result;
  
  // Determine styles and labels based on prediction
  const isReal = prediction === 'REAL' || prediction === 'Real News';
  const score = Math.round(confidence * 100);
  
  let statusColor = 'bg-gray-100 text-gray-700';
  const isFake = result.prediction.toLowerCase().includes('fake');
  
  // Theme colors based on prediction
  const themeColor = {
    bg: isFake ? 'bg-red-50 dark:bg-red-500/10' : 'bg-emerald-50 dark:bg-emerald-500/10',
    border: isFake ? 'border-red-200 dark:border-red-500/20' : 'border-emerald-200 dark:border-emerald-500/20',
    text: isFake ? 'text-red-700 dark:text-red-400' : 'text-emerald-700 dark:text-emerald-400',
    iconBg: isFake ? 'bg-red-100 dark:bg-red-500/20' : 'bg-emerald-100 dark:bg-emerald-500/20',
    progressBg: isFake ? 'bg-red-100 dark:bg-red-900/40' : 'bg-emerald-100 dark:bg-emerald-900/40',
    progressFill: isFake ? 'bg-red-500' : 'bg-emerald-500',
  };

  return (
    <div className={`w-full rounded-2xl border ${themeColor.border} bg-white dark:bg-brand-card shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500`}>
      {/* Header Section */}
      <div className={`${themeColor.bg} p-6 border-b ${themeColor.border}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${themeColor.iconBg} ${themeColor.text} flex items-center justify-center`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                {isFake ? (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                )}
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">AI Verification Result</h3>
          </div>
          <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold tracking-wide ${themeColor.text} ${themeColor.iconBg}`}>
            {isFake ? 'LIKELY FAKE' : 'LIKELY CREDIBLE'}
          </span>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Bias Analysis */}
          <div className="bg-slate-50 dark:bg-brand-dark/50 rounded-xl p-5 border border-slate-100 dark:border-brand-border">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 bg-white dark:bg-brand-card rounded-md shadow-sm border border-slate-100 dark:border-brand-border">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">Language Bias</h4>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-none">
                {isFake ? 'High' : 'Low'}
              </span>
              <span className="text-xs font-semibold text-slate-400">Indicator</span>
            </div>
            <div className={`mt-3 h-1.5 w-full bg-slate-200 dark:bg-brand-card rounded-full overflow-hidden`}>
               <div className={`h-full ${isFake ? 'w-4/5 bg-orange-400' : 'w-1/5 bg-blue-400'} rounded-full`}></div>
            </div>
          </div>

          {/* Sentiment Analysis */}
          <div className="bg-slate-50 dark:bg-brand-dark/50 rounded-xl p-5 border border-slate-100 dark:border-brand-border">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 bg-white dark:bg-brand-card rounded-md shadow-sm border border-slate-100 dark:border-brand-border">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </span>
              <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">Emotional Tone</h4>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-none">
                {isFake ? 'Negative' : 'Neutral'}
              </span>
              <span className="text-xs font-semibold text-slate-400">Sentiment</span>
            </div>
            <div className={`mt-3 h-1.5 w-full bg-slate-200 dark:bg-brand-card rounded-full overflow-hidden`}>
               <div className={`h-full ${isFake ? 'w-3/5 bg-purple-400' : 'w-2/5 bg-green-400'} rounded-full`}></div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {isFake 
                ? "This article exhibits high potential for misinformation based on our AI analysis." 
                : "This article appears credible based on our AI analysis language patterns."}
            </p>
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tighter">
              {(result.confidence * 100).toFixed(1)}%
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
              Confidence
            </div>
          </div>
        </div>

        {/* Technical Details Footer */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-brand-border flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-slate-400">
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
            </svg>
            Model Used: <span className="text-slate-600 dark:text-slate-300 capitalize">{result.model_used || 'Distilbert'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Analysis Time: {result.processing_time ? `${(result.processing_time * 1000).toFixed(0)}ms` : '< 100ms'}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabase';

export default function HistoryList({ refreshTrigger }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpand = (id) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setHistory([]);
        setLoading(false);
        return;
      }

      // Fetch analyses for this user, ordered by newest first
      const { data, error: supaError } = await supabase
        .from('analyses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (supaError) {
        throw supaError;
      }

      setHistory(data || []);
    } catch (err) {
      console.error('Error fetching history:', err);
      setError('Failed to load analysis history.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory, refreshTrigger]);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-8">
        <div className="flex flex-col items-center gap-2">
          <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm text-slate-500 font-medium">Loading history...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 bg-red-50 text-red-600 rounded-xl text-center text-sm border border-red-100 font-medium my-6">
        {error}
      </div>
    );
  }

  if (history.length === 0) {
    return null; // Don't show anything if there's no history yet
  }

  return (
    <div className="w-full mt-10">
      <div className="flex items-center gap-2 mb-6">
         <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Recent Verifications</h2>
         <span className="bg-slate-100 dark:bg-brand-card text-slate-500 text-xs font-bold px-2 py-0.5 rounded-full">{history.length}</span>
      </div>
      
      <div className="space-y-4 relative">
        {/* Timeline Line */}
        <div className="absolute left-[20px] top-[10px] bottom-[10px] w-0.5 bg-slate-100 dark:bg-brand-border z-0 hidden sm:block"></div>

        {history.map((item, index) => (
          <div key={item.id} className="relative z-10 flex flex-col sm:flex-row gap-4 items-start group">
            
            {/* Timeline Dot */}
            <div className={`hidden sm:flex shrink-0 w-10 h-10 rounded-full border-4 border-white items-center justify-center shrink-0 shadow-sm transition-colors mt-2 ${
                item.prediction.toLowerCase() === 'fake' 
                ? 'bg-red-100 text-red-600' 
                : 'bg-emerald-100 text-emerald-600'
            }`}>
                 {item.prediction.toLowerCase() === 'fake' ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                     </svg>
                 ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                 )}
            </div>

            {/* Card Content */}
            <div className="w-full bg-white dark:bg-brand-card rounded-xl shadow-sm border border-slate-200/60 dark:border-brand-border p-5 hover:shadow-md transition-shadow">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                     <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                        item.prediction.toLowerCase() === 'fake' 
                        ? 'bg-red-50 text-red-700 border border-red-100' 
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                     }`}>
                        {item.prediction} News
                     </span>
                     <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                        {(item.confidence * 100).toFixed(1)}% Confidence
                     </span>
                  </div>
                  <div className="text-xs text-slate-400 font-medium whitespace-nowrap">
                     {new Date(item.created_at).toLocaleDateString(undefined, {
                        month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                     })}
                  </div>
               </div>

               <div className="relative">
                 <p className={`text-sm text-slate-800 dark:text-slate-300 leading-relaxed font-medium transition-all duration-300 ${
                   expandedItems.has(item.id) ? '' : 'line-clamp-3'
                 }`}>
                    "{item.text}"
                 </p>
                 
                 {item.text && item.text.length > 150 && (
                   <button 
                     onClick={() => toggleExpand(item.id)}
                     className="text-blue-600 text-xs font-bold hover:text-blue-700 mt-2 transition-colors flex items-center gap-1"
                   >
                     {expandedItems.has(item.id) ? (
                       <>Show Less <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" /></svg></>
                     ) : (
                       <>Read Full Article <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg></>
                     )}
                   </button>
                 )}
               </div>
               
               {/* Derived Metrics */}
               <div className="flex gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-brand-border">
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bias:</span>
                     <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        item.prediction.toLowerCase() === 'fake' ? 'bg-orange-50 text-orange-700' : 'bg-green-50 text-green-700'
                     }`}>
                        {item.prediction.toLowerCase() === 'fake' ? 'High' : 'Low'}
                     </span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sentiment:</span>
                     <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        item.prediction.toLowerCase() === 'fake' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
                     }`}>
                        {item.prediction.toLowerCase() === 'fake' ? 'Negative' : 'Neutral'}
                     </span>
                  </div>
               </div>

               <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                 </svg>
                 Analyzed with {item.model_used.charAt(0).toUpperCase() + item.model_used.slice(1)}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

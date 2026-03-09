'use client';

import { useState } from 'react';
import NewsForm from '../components/NewsForm';
import HistoryList from '../components/HistoryList';

export default function VerifyPage() {
  const [refreshHistory, setRefreshHistory] = useState(0);

  const handleAnalysisComplete = () => {
    // Increment the trigger to force HistoryList to re-fetch
    setRefreshHistory(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Verify Article Authenticity</h1>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Paste your news article below to detect potential misinformation using our advanced AI models.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-2">
           <NewsForm onAnalysisComplete={handleAnalysisComplete} />
        </div>

        {/* Verification History */}
        <div className="mt-8 px-2">
           <HistoryList refreshTrigger={refreshHistory} />
        </div>
      </div>
    </div>
  );
}

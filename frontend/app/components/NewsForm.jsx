'use client';

import { useState } from 'react';
import { predictNews } from '../services/api';
import { supabase } from '../services/supabase';
import ResultCard from './ResultCard';

/**
 * NewsForm Component
 * Main form component for inputting news articles and selecting models
 */
export default function NewsForm({ onAnalysisComplete }) {
  const [text, setText] = useState('');
  const [model, setModel] = useState('distilbert');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);

  // Model options with descriptions
  const modelOptions = [
    { value: 'distilbert', label: 'DistilBERT', description: 'High Accuracy' },
    { value: 'mobilebert', label: 'MobileBERT', description: 'Fast Inference' },
    { value: 'tfidf_gb', label: 'TF-IDF + Gradient Boosting', description: 'Classical ML' },
  ];

  // Validate input text
  const validateInput = () => {
    if (text.trim().length < 50) {
      setWarning('Please enter a full-length news article for reliable prediction.');
      return false;
    }
    setWarning(null);
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    // Validate input
    if (!validateInput()) {
      return;
    }

    setLoading(true);

    try {
      const response = await predictNews(text, model);
      setResult(response);

      // Auto-save if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && response) {
        const { error: saveError } = await supabase.from('analyses').insert({
          user_id: user.id,
          text: text,
          prediction: response.prediction,
          confidence: response.confidence,
          model_used: response.model_used || model
        });

        if (saveError) {
          console.error('Error saving analysis:', saveError);
        } else {
          // Notify parent component to refresh history
          if (onAnalysisComplete) {
            onAnalysisComplete();
          }
        }
      }

    } catch (err) {
      setError(err.message || 'An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  // Handle text change and clear warnings
  const handleTextChange = (e) => {
    setText(e.target.value);
    if (warning && e.target.value.trim().length >= 50) {
      setWarning(null);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        {/* Textarea for news article */}
        <div className="relative">
          <label htmlFor="news-text" className="sr-only">
            News Article Text
          </label>
          <textarea
            id="news-text"
            value={text}
            onChange={handleTextChange}
            placeholder="Paste the news article text here..."
            rows={8}
            className="w-full px-6 py-6 border-0 focus:ring-0 resize-none text-lg text-slate-700 dark:text-slate-200 placeholder:text-slate-400 font-sans bg-transparent"
            disabled={loading}
          />
          {warning && (
            <div className="absolute bottom-4 right-4">
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                {warning}
              </span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-gray-50/50 dark:bg-brand-card/50 border-t border-slate-100 dark:border-brand-border">
            {/* Model Selection */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">AI Model:</span>
              <div className="relative">
                  <select
                  id="model-select"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={loading}
                  className="pl-3 pr-8 py-2 border border-slate-200 dark:border-brand-border rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-brand-dark hover:border-slate-300 dark:hover:border-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none cursor-pointer appearance-none transition-all"
                  >
                  {modelOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                      {option.label}
                      </option>
                  ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                  </div>
              </div>
            </div>

            {/* Status or Counter could go here */}
            <div className="hidden md:block text-xs text-slate-400 font-medium">
               {text.length > 0 ? `${text.length} characters` : 'Ready to analyze'}
            </div>

            {/* Submit Button */}
            <div className="w-full md:w-auto">
            <button
                type="submit"
                disabled={loading || text.trim().length < 50}
                className="w-full md:w-auto py-2.5 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md shadow-blue-500/20 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
                {loading ? (
                <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                </>
                ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Analyze Text
                </>
                )}
            </button>
            </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="mx-6 mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-800 font-medium">{error}</p>
          </div>
        )}
      </form>

      {/* Result Card */}
      <div className="mt-8">
        <ResultCard result={result} />
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { predictNews } from '../services/api';
import ResultCard from './ResultCard';

/**
 * NewsForm Component
 * Main form component for inputting news articles and selecting models
 */
export default function NewsForm() {
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
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Textarea for news article */}
        <div>
          <label
            htmlFor="news-text"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            News Article Text
          </label>
          <textarea
            id="news-text"
            value={text}
            onChange={handleTextChange}
            placeholder="Paste the full news article text here..."
            rows={12}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y font-sans text-sm"
            disabled={loading}
          />
          {warning && (
            <p className="mt-2 text-sm text-amber-600 font-medium">{warning}</p>
          )}
        </div>

        {/* Model Selection */}
        <div>
          <label
            htmlFor="model-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Model
          </label>
          <select
            id="model-select"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-sans text-sm font-medium text-gray-800 cursor-pointer"
            style={{ 
              appearance: 'auto',
              WebkitAppearance: 'menulist',
              MozAppearance: 'menulist'
            }}
          >
            {modelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.description})
              </option>
            ))}
          </select>
          {/* Display Selected Model Info */}
          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Selected: </span>
              <span className="text-blue-700 font-medium">
                {modelOptions.find(opt => opt.value === model)?.label} - {modelOptions.find(opt => opt.value === model)?.description}
              </span>
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading || text.trim().length < 50}
            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Check News'
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 font-medium">{error}</p>
          </div>
        )}
      </form>

      {/* Result Card */}
      <ResultCard result={result} />
    </div>
  );
}

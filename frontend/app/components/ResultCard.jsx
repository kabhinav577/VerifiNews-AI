'use client';

import ConfidenceBar from './ConfidenceBar';

/**
 * ResultCard Component
 * Displays the prediction results in a clean card format
 */
export default function ResultCard({ result }) {
  if (!result) return null;

  const { prediction, model_used, confidence } = result;
  const isReal = prediction === 'Real News';
  const borderColor = isReal ? 'border-green-500' : 'border-red-500';
  const textColor = isReal ? 'text-green-700' : 'text-red-700';
  const bgColor = isReal ? 'bg-green-50' : 'bg-red-50';

  // Format model name for display
  const formatModelName = (model) => {
    const modelMap = {
      distilbert: 'DistilBERT',
      mobilebert: 'MobileBERT',
      tfidf_gb: 'TF-IDF + Gradient Boosting',
    };
    return modelMap[model.toLowerCase()] || model;
  };

  return (
    <div
      className={`w-full max-w-2xl mx-auto mt-6 p-6 rounded-lg shadow-lg border-2 ${borderColor} ${bgColor} transition-all duration-300`}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Prediction Result</h2>
      
      <div className="space-y-4">
        {/* Prediction Label */}
        <div>
          <span className="text-sm font-medium text-gray-600">Prediction: </span>
          <span className={`text-2xl font-bold ${textColor}`}>
            {prediction}
          </span>
        </div>

        {/* Model Used */}
        <div>
          <span className="text-sm font-medium text-gray-600">Model Used: </span>
          <span className="text-lg font-semibold text-gray-800">
            {formatModelName(model_used)}
          </span>
        </div>

        {/* Confidence Score */}
        <div>
          <span className="text-sm font-medium text-gray-600">Confidence Score: </span>
          <span className="text-lg font-semibold text-gray-800">
            {confidence.toFixed(4)}
          </span>
        </div>

        {/* Confidence Bar */}
        <div className="pt-2">
          <ConfidenceBar confidence={confidence} prediction={prediction} />
        </div>
      </div>
    </div>
  );
}

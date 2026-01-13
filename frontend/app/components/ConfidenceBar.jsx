'use client';

/**
 * ConfidenceBar Component
 * Displays a horizontal confidence bar with color coding
 * Green for Real News, Red for Fake News
 */
export default function ConfidenceBar({ confidence, prediction }) {
  const percentage = (confidence * 100).toFixed(2);
  const isReal = prediction === 'Real News';
  const barColor = isReal ? 'bg-green-500' : 'bg-red-500';
  const textColor = isReal ? 'text-green-700' : 'text-red-700';

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Confidence:</span>
        <span className={`text-sm font-semibold ${textColor}`}>
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
        <div
          className={`h-full ${barColor} transition-all duration-500 ease-out rounded-full flex items-center justify-end pr-2`}
          style={{ width: `${percentage}%` }}
        >
          {parseFloat(percentage) > 15 && (
            <span className="text-xs font-medium text-white">
              {percentage}%
            </span>
          )}
        </div>
      </div>
      {parseFloat(percentage) <= 15 && (
        <div className="mt-1 text-xs text-gray-500 text-right">
          {percentage}%
        </div>
      )}
    </div>
  );
}

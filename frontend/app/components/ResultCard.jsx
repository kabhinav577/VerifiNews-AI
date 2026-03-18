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
  let statusText = prediction.toUpperCase();
  let barColor = 'bg-gray-600';
  
  if (isReal) {
    statusColor = 'bg-green-100 text-green-700';
    statusText = 'LIKELY CREDIBLE';
    barColor = 'bg-blue-600';
  } else if (prediction === 'FAKE' || prediction === 'Fake News') {
    statusColor = 'bg-red-100 text-red-700';
    statusText = 'LIKELY FAKE';
    barColor = 'bg-red-600';
  }

  // Sentiment from backend or mock fallback
  const bias = isReal ? 'Low' : 'High';
  const sentiment = result.sentiment ? result.sentiment.label : (isReal ? 'Neutral' : 'Negative');
  const facts = isReal ? 'Verified' : 'Unverified';

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden relative animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className={`h-2 ${isReal ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gradient-to-r from-red-500 to-orange-600'}`}></div>
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full ${isReal ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'} flex items-center justify-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  {isReal ? (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  )}
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">AI Verification Result</h3>
            </div>
            
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold tracking-wide ${statusColor}`}>
              {statusText}
            </span>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-gray-500">Confidence Score</span>
              <span className={`text-2xl font-bold ${isReal ? 'text-blue-600' : 'text-red-600'}`}>{score}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className={`${barColor} h-full rounded-full transition-all duration-1000 ease-out`} 
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div className="text-center border-r border-gray-200 last:border-0">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Bias</p>
              <p className="font-bold text-gray-900">{bias}</p>
            </div>
            <div className="text-center border-r border-gray-200 last:border-0">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Sentiment</p>
              <p className="font-bold text-gray-900">{sentiment}</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Facts</p>
              <p className="font-bold text-gray-900">{facts}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Analyzed by {model_used}
            </div>
          </div>
        </div>
    </div>
  );
}

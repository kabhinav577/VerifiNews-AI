'use client';

import NewsForm from './components/NewsForm';

/**
 * Main Page Component
 * VerifiNews-AI - Fake News Detection System
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-2">
            VerifiNews-AI
          </h1>
          <p className="text-center text-blue-100 text-lg">
            Advanced Fake News Detection System
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              How It Works
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Paste a full-length news article in the text area below and select
              a machine learning model. Our system will analyze the text and
              provide a prediction with confidence score indicating whether the
              news is real or fake.
            </p>
          </div>

          {/* News Form */}
          <NewsForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600 text-sm">
            VERIFINEWS-AI – MCA Final Year Project | Galgotias University
          </p>
        </div>
      </footer>
    </div>
  );
}

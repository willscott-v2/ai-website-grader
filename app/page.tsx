'use client';

import { useState } from 'react';
import URLAnalyzer from '@/components/URLAnalyzer';
import ScoreReport from '@/components/ScoreReport';
import { WebsiteAnalysis } from '@/types';

export default function Home() {
  const [analysis, setAnalysis] = useState<WebsiteAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysisStart = () => {
    setIsLoading(true);
  };

  const handleAnalysisComplete = (analysisResult: WebsiteAnalysis) => {
    setAnalysis(analysisResult);
    setIsLoading(false);
  };

  const handleNewAnalysis = () => {
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search Influence branding */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <a href="https://www.searchinfluence.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src="/search-influence-logo.png" alt="Search Influence" className="h-8 w-auto" />
              </a>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">AI Website Grader</h1>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Powered by AI-Driven SEO
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!analysis ? (
          <URLAnalyzer
            onAnalysisComplete={handleAnalysisComplete}
            onAnalysisStart={handleAnalysisStart}
            isLoading={isLoading}
          />
        ) : (
          <div>
            {/* Back Button */}
            <div className="mb-6">
              <button
                onClick={handleNewAnalysis}
                className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to Analysis
              </button>
            </div>
            
            {/* Report */}
            <ScoreReport analysis={analysis} />
          </div>
        )}
      </div>

      {/* Footer with Search Influence branding */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <a href="https://www.searchinfluence.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src="/search-influence-logo.png" alt="Search Influence" className="h-8 w-auto mr-3" />
              </a>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Search Influence</h3>
                <p className="text-sm text-gray-500">AI SEO Experts</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Helping higher education institutions and healthcare organizations 
              increase visibility and drive measurable growth.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <span>•</span>
              <a href="https://www.searchinfluence.com" className="text-blue-600 hover:text-blue-700">
                Visit Search Influence
              </a>
              <span>•</span>
              <span>AI Website Grader v1.0</span>
              <span>•</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

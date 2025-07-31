'use client';

import { useState, useRef } from 'react';
import { Search, FileText, Loader2, AlertCircle } from 'lucide-react';
import { WebsiteAnalysis } from '@/types';

interface URLAnalyzerProps {
  onAnalysisComplete: (analysis: WebsiteAnalysis) => void;
  onAnalysisStart: () => void;
  isLoading: boolean;
}

export default function URLAnalyzer({ onAnalysisComplete, onAnalysisStart, isLoading }: URLAnalyzerProps) {
  const [inputMode, setInputMode] = useState<'url' | 'text'>('url');
  const [url, setUrl] = useState('');
  const [textContent, setTextContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Note: Focus handling removed due to reliability issues
  // Users will manually switch to text tab and paste content

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const handleAnalyze = async () => {
    setError(null);
    
    if (inputMode === 'url') {
      if (!url.trim()) {
        setError('Please enter a URL');
        return;
      }
      if (!validateUrl(url)) {
        setError('Please enter a valid URL');
        return;
      }
    } else {
      if (!textContent.trim()) {
        setError('Please enter some content to analyze');
        return;
      }
      if (textContent.trim().length < 100) {
        setError('Please enter at least 100 characters of content');
        return;
      }
    }

    onAnalysisStart();

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: inputMode === 'url' ? url : undefined,
          textContent: inputMode === 'text' ? textContent : undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const analysis = await response.json();
      onAnalysisComplete(analysis);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed';
      setError(errorMessage);
      
      // Note: Automatic tab switching removed due to focus issues
      // User will be instructed to reload and manually switch to text tab
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI Website Grader
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
          Analyze your website&apos;s readiness for AI-powered search engines, 
          chat interfaces, and modern search algorithms.
        </p>
        <p className="text-sm text-blue-600 font-medium">
          <a href="https://www.searchinfluence.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Powered by Search Influence • AI SEO Experts</a>
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Input Mode Toggle */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setInputMode('url')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${
              inputMode === 'url'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Search className="w-4 h-4 mr-2" />
            Analyze URL
          </button>
          <button
            onClick={() => setInputMode('text')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${
              inputMode === 'text'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="w-4 h-4 mr-2" />
            Analyze Text
          </button>
        </div>

        {/* URL Input */}
        {inputMode === 'url' && (
          <div className="mb-6">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Website URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isLoading) {
                  handleAnalyze();
                }
              }}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>
        )}

        {/* Text Input */}
        {inputMode === 'text' && (
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content to Analyze
            </label>
            <textarea
              ref={textAreaRef}
              id="content"
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey && !isLoading) {
                  e.preventDefault();
                  handleAnalyze();
                }
              }}

              placeholder="Paste your website content here..."
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              disabled={isLoading}
              autoFocus={inputMode === 'text'}
              tabIndex={0}
              style={{ pointerEvents: 'auto' }}
            />
            <div className="text-sm text-gray-500 mt-1">
              {textContent.length} characters (minimum 100 required) • Press Ctrl+Enter to submit
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-700 whitespace-pre-wrap">{error}</p>
                {error.includes('Please reload the page') && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-blue-800 text-sm font-medium">
                      💡 <strong>Quick Fix:</strong> Please reload the page, then click the &quot;Analyze Text&quot; tab above and paste your website content directly.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing Website...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Analyze {inputMode === 'url' ? 'Website' : 'Content'}
            </>
          )}
        </button>

        {/* Features List */}
        <div className="mt-8 grid md:grid-cols-2 gap-6 text-sm text-gray-600">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">AI Optimization Focus:</h3>
            <ul className="space-y-1">
              <li>• Content chunkability for AI processing</li>
              <li>• Q&A format optimization</li>
              <li>• Entity recognition and clarity</li>
              <li>• Semantic structure analysis</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Comprehensive Analysis:</h3>
            <ul className="space-y-1">
              <li>• Technical SEO fundamentals</li>
              <li>• Content quality assessment</li>
              <li>• Authority and trust signals</li>
              <li>• User engagement factors</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 
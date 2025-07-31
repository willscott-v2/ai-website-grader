'use client';

import { useState } from 'react';
import Image from 'next/image';
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
    <div>
      {/* Header with Search Influence branding */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-container">
                <a href="https://www.searchinfluence.com" target="_blank" rel="noopener noreferrer">
                  <Image src="/search-influence-logo.png" alt="Search Influence" className="si-logo" width={200} height={60} />
                </a>
              </div>
              <h1>AI Website Grader</h1>
              <div className="tagline">Optimize for AI-Powered Search</div>
            </div>
            <div className="header-description">
              <p>
                Analyze your website&apos;s readiness for AI-powered search engines, 
                chat interfaces, and modern search algorithms. Get actionable insights 
                to improve your visibility in AI overviews, voice search results, 
                and chatbot responses.
              </p>
              <p style={{ marginTop: '20px', fontSize: '1rem', color: 'var(--orange-accent)' }}>
                <a href="https://www.searchinfluence.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--orange-accent)', textDecoration: 'underline' }}>
                  Powered by Search Influence - AI SEO Experts
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="main-section">
        <div className="container">
          {!analysis ? (
            <URLAnalyzer
              onAnalysisComplete={handleAnalysisComplete}
              onAnalysisStart={handleAnalysisStart}
              isLoading={isLoading}
            />
          ) : (
            <div>
              {/* Back Button */}
              <button
                onClick={handleNewAnalysis}
                className="back-btn"
              >
                Back to Analysis
              </button>
              
              {/* Report */}
              <ScoreReport analysis={analysis} />
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="container">
          <div className="feature">
            <div className="feature-icon">🎯</div>
            <h3>AI Optimization Focus</h3>
            <p>Content chunkability for AI processing, Q&A format optimization, entity recognition, and semantic structure analysis.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">⚡</div>
            <h3>Comprehensive Analysis</h3>
            <p>Technical SEO fundamentals, content quality assessment, authority and trust signals, and user engagement factors.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📊</div>
            <h3>Actionable Insights</h3>
            <p>Detailed scoring across 6 key categories with specific recommendations to improve your AI search visibility.</p>
          </div>
        </div>
      </div>

      {/* Footer with Search Influence branding */}
      <footer className="footer">
        <div className="container">
          <div className="text-center">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <div className="logo-container" style={{ margin: '0 15px 0 0' }}>
                <a href="https://www.searchinfluence.com" target="_blank" rel="noopener noreferrer">
                  <Image src="/search-influence-logo.png" alt="Search Influence" className="si-logo" width={200} height={60} />
                </a>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--white)', margin: '0 0 5px 0' }}>Search Influence</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--medium-gray)', margin: 0 }}>AI SEO Experts</p>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--dark-gray)', margin: '0 0 20px 0', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              Helping higher education institutions and healthcare organizations 
              increase visibility and drive measurable growth through AI-powered SEO strategies.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', fontSize: '0.8rem', color: 'var(--dark-gray)' }}>
              <span>•</span>
              <a href="https://www.searchinfluence.com" target="_blank" rel="noopener noreferrer">
                Visit Search Influence
              </a>
              <span>•</span>
              <span>AI Website Grader v1.0</span>
              <span>•</span>
              <a href="https://ai-grader.searchinfluence.com" target="_blank" rel="noopener noreferrer">
                AI Website Grader
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import { WebsiteAnalysis } from '@/types';
import ScoreCard from './ScoreCard';
import ExportButtons from './ExportButtons';
import { generateMarkdownReport, downloadMarkdown } from '@/lib/exporters';

interface ScoreReportProps {
  analysis: WebsiteAnalysis;
}

export default function ScoreReport({ analysis }: ScoreReportProps) {
  const handleExportMarkdown = () => {
    const markdown = generateMarkdownReport(analysis);
    const filename = `ai-grader-report-${analysis.url.replace(/[^a-z0-9]/gi, '-')}-${new Date().toISOString().split('T')[0]}.md`;
    downloadMarkdown(markdown, filename);
  };

  const getOverallScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getOverallScoreStatus = (score: number) => {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    if (score >= 40) return 'needs-improvement';
    return 'poor';
  };

  return (
    <div className="max-w-6xl mx-auto" id="report-container">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                AI Website Grader Report
              </h1>
              <p className="text-sm text-blue-600 font-medium">Search Influence</p>
            </div>
          </div>
          <p className="text-gray-600">
            Analysis completed on {new Date(analysis.timestamp).toLocaleDateString()}
          </p>
        </div>

        {/* Website Info */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Website Information</h3>
              <p className="text-gray-600">
                <span className="font-medium">URL:</span> {analysis.url}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Title:</span> {analysis.title}
              </p>
            </div>
            <div className="text-center">
              <div className="inline-block">
                <div className={`text-4xl font-bold ${getOverallScoreColor(analysis.overallScore)}`}>
                  {analysis.overallScore}%
                </div>
                <div className="text-sm text-gray-500 capitalize">
                  {getOverallScoreStatus(analysis.overallScore).replace('-', ' ')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Score Summary */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{analysis.aiOptimization.score}%</div>
            <div className="text-sm text-blue-700 font-medium">AI Optimization</div>
            <div className="text-xs text-blue-600 capitalize mt-1">
              {analysis.aiOptimization.status.replace('-', ' ')}
            </div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{analysis.contentQuality.score}%</div>
            <div className="text-sm text-green-700 font-medium">Content Quality</div>
            <div className="text-xs text-green-600 capitalize mt-1">
              {analysis.contentQuality.status.replace('-', ' ')}
            </div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{analysis.technicalSEO.score}%</div>
            <div className="text-sm text-purple-700 font-medium">Technical SEO</div>
            <div className="text-xs text-purple-600 capitalize mt-1">
              {analysis.technicalSEO.status.replace('-', ' ')}
            </div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{analysis.authority.score}%</div>
            <div className="text-sm text-orange-700 font-medium">Authority</div>
            <div className="text-xs text-orange-600 capitalize mt-1">
              {analysis.authority.status.replace('-', ' ')}
            </div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg">
            <div className="text-2xl font-bold text-pink-600">{analysis.userExperience.score}%</div>
            <div className="text-sm text-pink-700 font-medium">User Experience</div>
            <div className="text-xs text-pink-600 capitalize mt-1">
              {analysis.userExperience.status.replace('-', ' ')}
            </div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg">
            <div className="text-2xl font-bold text-teal-600">{analysis.contentStructure.score}%</div>
            <div className="text-sm text-teal-700 font-medium">Content Structure</div>
            <div className="text-xs text-teal-600 capitalize mt-1">
              {analysis.contentStructure.status.replace('-', ' ')}
            </div>
          </div>
        </div>

        {/* Export Buttons */}
        <ExportButtons 
          analysis={analysis} 
          onExportMarkdown={handleExportMarkdown}
        />
      </div>

      {/* Detailed Analysis */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* AI Optimization */}
        <ScoreCard
          title="AI Optimization"
          score={analysis.aiOptimization.score}
          status={analysis.aiOptimization.status}
          findings={analysis.aiOptimization.findings}
          recommendations={analysis.aiOptimization.recommendations}
          details={{
            chunkability: analysis.aiOptimization.chunkability,
            qaFormat: analysis.aiOptimization.qaFormat,
            entityRecognition: analysis.aiOptimization.entityRecognition,
            factualDensity: analysis.aiOptimization.factualDensity,
            semanticClarity: analysis.aiOptimization.semanticClarity
          }}
        />

        {/* Content Quality */}
        <ScoreCard
          title="Content Quality"
          score={analysis.contentQuality.score}
          status={analysis.contentQuality.status}
          findings={analysis.contentQuality.findings}
          recommendations={analysis.contentQuality.recommendations}
          details={{
            longTailKeywords: analysis.contentQuality.longTailKeywords,
            comprehensiveCoverage: analysis.contentQuality.comprehensiveCoverage,
            relevanceToUserIntent: analysis.contentQuality.relevanceToUserIntent,
            accuracyAndCurrency: analysis.contentQuality.accuracyAndCurrency,
            naturalLanguage: analysis.contentQuality.naturalLanguage
          }}
        />

        {/* Technical SEO */}
        <ScoreCard
          title="Technical SEO"
          score={analysis.technicalSEO.score}
          status={analysis.technicalSEO.status}
          findings={analysis.technicalSEO.findings}
          recommendations={analysis.technicalSEO.recommendations}
          details={{
            headingStructure: analysis.technicalSEO.headingStructure,
            metaInfo: analysis.technicalSEO.metaInfo,
            altText: analysis.technicalSEO.altText,
            links: analysis.technicalSEO.links
          }}
        />

        {/* Authority */}
        <ScoreCard
          title="Authority & Trust"
          score={analysis.authority.score}
          status={analysis.authority.status}
          findings={analysis.authority.findings}
          recommendations={analysis.authority.recommendations}
          details={{
            socialMediaPresence: analysis.authority.socialMediaPresence,
            companyInformation: analysis.authority.companyInformation,
            legalCompliance: analysis.authority.legalCompliance,
            testimonials: analysis.authority.testimonials,
            affiliations: analysis.authority.affiliations
          }}
        />

        {/* User Experience */}
        <ScoreCard
          title="User Experience"
          score={analysis.userExperience.score}
          status={analysis.userExperience.status}
          findings={analysis.userExperience.findings}
          recommendations={analysis.userExperience.recommendations}
          details={{
            contactInfo: analysis.userExperience.contactInfo,
            callsToAction: analysis.userExperience.callsToAction,
            language: analysis.userExperience.language
          }}
        />

        {/* Content Structure */}
        <ScoreCard
          title="Content Structure"
          score={analysis.contentStructure.score}
          status={analysis.contentStructure.status}
          findings={analysis.contentStructure.findings}
          recommendations={analysis.contentStructure.recommendations}
          details={{
            structuredContent: analysis.contentStructure.structuredContent,
            multimedia: analysis.contentStructure.multimedia,
            readability: analysis.contentStructure.readability
          }}
        />
      </div>

      {/* Content Improvements */}
      {analysis.contentImprovements.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Priority Content Improvements</h2>
          <div className="space-y-6">
            {analysis.contentImprovements.map((improvement, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm mr-3">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{improvement.section}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Current Issue:</h4>
                    <p className="text-sm text-gray-600 bg-red-50 p-3 rounded border-l-4 border-red-400">
                      {improvement.current}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Recommended Action:</h4>
                    <p className="text-sm text-gray-600 bg-green-50 p-3 rounded border-l-4 border-green-400">
                      {improvement.improved}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Why This Helps:</h4>
                  <p className="text-sm text-gray-600">{improvement.reasoning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Steps */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Immediate Actions</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">1.</span>
                Focus on AI Optimization improvements first - this has the highest impact
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">2.</span>
                Implement the priority content improvements listed above
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">3.</span>
                Address technical SEO issues for better search visibility
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Long-term Strategy</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">1.</span>
                Monitor your progress with regular re-analysis
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">2.</span>
                Stay updated with AI search algorithm changes
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">3.</span>
                Continuously improve content based on user feedback
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 
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
    if (score >= 80) return 'var(--success-green)';
    if (score >= 60) return 'var(--info-blue)';
    if (score >= 40) return 'var(--orange-accent)';
    return 'var(--error-red)';
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
      <div className="results">
        <div className="results-header">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0 0 10px 0', color: 'var(--white)' }}>
              AI Website Grader Report
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--white)', margin: 0 }}>
              Powered by Search Influence - AI SEO Experts
            </p>
          </div>
          <p style={{ textAlign: 'center', margin: 0, opacity: 0.9 }}>
            Analysis completed on {new Date(analysis.timestamp).toLocaleDateString()}
          </p>
        </div>

        <div className="content-area">
          {/* Website Info */}
          <div style={{ 
            background: 'var(--background-gray)', 
            borderRadius: '12px', 
            padding: '30px', 
            marginBottom: '30px' 
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '30px', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: 'var(--content-text)', margin: '0 0 15px 0' }}>
                  Website Information
                </h3>
                <p style={{ color: 'var(--secondary-content)', margin: '5px 0' }}>
                  <span style={{ fontWeight: '600' }}>URL:</span> {analysis.url}
                </p>
                <p style={{ color: 'var(--secondary-content)', margin: '5px 0' }}>
                  <span style={{ fontWeight: '600' }}>Title:</span> {analysis.title}
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '3rem', 
                  fontWeight: '800', 
                  color: getOverallScoreColor(analysis.overallScore),
                  marginBottom: '5px'
                }}>
                  {analysis.overallScore}%
                </div>
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: 'var(--muted-text)', 
                  textTransform: 'capitalize' 
                }}>
                  {getOverallScoreStatus(analysis.overallScore).replace('-', ' ')}
                </div>
              </div>
            </div>
          </div>

          {/* Score Summary */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '20px', 
            marginBottom: '40px' 
          }}>
            <div style={{ 
              textAlign: 'center', 
              padding: '20px', 
              background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1) 0%, rgba(52, 152, 219, 0.05) 100%)', 
              borderRadius: '12px',
              border: '1px solid rgba(52, 152, 219, 0.2)'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--info-blue)', marginBottom: '5px' }}>
                {analysis.aiOptimization.score}%
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--content-text)' }}>
                AI Optimization
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted-text)', marginTop: '5px', textTransform: 'capitalize' }}>
                {analysis.aiOptimization.status.replace('-', ' ')}
              </div>
            </div>
            <div style={{ 
              textAlign: 'center', 
              padding: '20px', 
              background: 'linear-gradient(135deg, rgba(39, 174, 96, 0.1) 0%, rgba(39, 174, 96, 0.05) 100%)', 
              borderRadius: '12px',
              border: '1px solid rgba(39, 174, 96, 0.2)'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--success-green)', marginBottom: '5px' }}>
                {analysis.contentQuality.score}%
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--content-text)' }}>
                Content Quality
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted-text)', marginTop: '5px', textTransform: 'capitalize' }}>
                {analysis.contentQuality.status.replace('-', ' ')}
              </div>
            </div>
            <div style={{ 
              textAlign: 'center', 
              padding: '20px', 
              background: 'linear-gradient(135deg, rgba(230, 126, 34, 0.1) 0%, rgba(230, 126, 34, 0.05) 100%)', 
              borderRadius: '12px',
              border: '1px solid rgba(230, 126, 34, 0.2)'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--orange-accent)', marginBottom: '5px' }}>
                {analysis.technicalSEO.score}%
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--content-text)' }}>
                Technical SEO
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted-text)', marginTop: '5px', textTransform: 'capitalize' }}>
                {analysis.technicalSEO.status.replace('-', ' ')}
              </div>
            </div>
            <div style={{ 
              textAlign: 'center', 
              padding: '20px', 
              background: 'linear-gradient(135deg, rgba(155, 89, 182, 0.1) 0%, rgba(155, 89, 182, 0.05) 100%)', 
              borderRadius: '12px',
              border: '1px solid rgba(155, 89, 182, 0.2)'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#9b59b6', marginBottom: '5px' }}>
                {analysis.authority.score}%
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--content-text)' }}>
                Authority
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted-text)', marginTop: '5px', textTransform: 'capitalize' }}>
                {analysis.authority.status.replace('-', ' ')}
              </div>
            </div>
            <div style={{ 
              textAlign: 'center', 
              padding: '20px', 
              background: 'linear-gradient(135deg, rgba(231, 76, 60, 0.1) 0%, rgba(231, 76, 60, 0.05) 100%)', 
              borderRadius: '12px',
              border: '1px solid rgba(231, 76, 60, 0.2)'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--error-red)', marginBottom: '5px' }}>
                {analysis.userExperience.score}%
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--content-text)' }}>
                User Experience
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted-text)', marginTop: '5px', textTransform: 'capitalize' }}>
                {analysis.userExperience.status.replace('-', ' ')}
              </div>
            </div>
            <div style={{ 
              textAlign: 'center', 
              padding: '20px', 
              background: 'linear-gradient(135deg, rgba(26, 188, 156, 0.1) 0%, rgba(26, 188, 156, 0.05) 100%)', 
              borderRadius: '12px',
              border: '1px solid rgba(26, 188, 156, 0.2)'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1abc9c', marginBottom: '5px' }}>
                {analysis.contentStructure.score}%
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--content-text)' }}>
                Content Structure
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted-text)', marginTop: '5px', textTransform: 'capitalize' }}>
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
      </div>

      {/* Detailed Analysis */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '30px',
        marginTop: '40px'
      }}>
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
        <div style={{ 
          marginTop: '40px',
          background: 'var(--content-bg)',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--content-text)', margin: '0 0 30px 0' }}>
            Priority Content Improvements
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {analysis.contentImprovements.map((improvement, index) => (
              <div key={index} style={{ 
                border: '1px solid var(--border-gray)', 
                borderRadius: '12px', 
                padding: '25px' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    background: 'var(--orange-accent)', 
                    color: 'var(--white)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontWeight: '700', 
                    fontSize: '0.9rem',
                    marginRight: '15px'
                  }}>
                    {index + 1}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--content-text)', margin: 0 }}>
                    {improvement.section}
                  </h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--content-text)', margin: '0 0 10px 0' }}>
                      Current Issue:
                    </h4>
                    <p style={{ 
                      fontSize: '0.9rem', 
                      color: 'var(--content-text)', 
                      background: 'rgba(231, 76, 60, 0.1)', 
                      padding: '15px', 
                      borderRadius: '8px', 
                      borderLeft: '4px solid var(--error-red)',
                      margin: 0
                    }}>
                      {improvement.current}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--content-text)', margin: '0 0 10px 0' }}>
                      Recommended Action:
                    </h4>
                    <p style={{ 
                      fontSize: '0.9rem', 
                      color: 'var(--content-text)', 
                      background: 'rgba(39, 174, 96, 0.1)', 
                      padding: '15px', 
                      borderRadius: '8px', 
                      borderLeft: '4px solid var(--success-green)',
                      margin: 0
                    }}>
                      {improvement.improved}
                    </p>
                  </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--content-text)', margin: '0 0 10px 0' }}>
                    Why This Helps:
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--secondary-content)', margin: 0 }}>
                    {improvement.reasoning}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Steps */}
      <div style={{ 
        marginTop: '40px',
        background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1) 0%, rgba(52, 152, 219, 0.05) 100%)',
        borderRadius: '12px',
        padding: '40px',
        border: '1px solid rgba(52, 152, 219, 0.2)'
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--content-text)', margin: '0 0 25px 0' }}>
          Next Steps
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--content-text)', margin: '0 0 15px 0' }}>
              Immediate Actions
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--secondary-content)' }}>
                <span style={{ color: 'var(--info-blue)', marginRight: '10px', fontWeight: '600' }}>1.</span>
                Focus on AI Optimization improvements first - this has the highest impact
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--secondary-content)' }}>
                <span style={{ color: 'var(--info-blue)', marginRight: '10px', fontWeight: '600' }}>2.</span>
                Implement the priority content improvements listed above
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--secondary-content)' }}>
                <span style={{ color: 'var(--info-blue)', marginRight: '10px', fontWeight: '600' }}>3.</span>
                Address technical SEO issues for better search visibility
              </li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--content-text)', margin: '0 0 15px 0' }}>
              Long-term Strategy
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--secondary-content)' }}>
                <span style={{ color: 'var(--info-blue)', marginRight: '10px', fontWeight: '600' }}>1.</span>
                Monitor your progress with regular re-analysis
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--secondary-content)' }}>
                <span style={{ color: 'var(--info-blue)', marginRight: '10px', fontWeight: '600' }}>2.</span>
                Stay updated with AI search algorithm changes
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--secondary-content)' }}>
                <span style={{ color: 'var(--info-blue)', marginRight: '10px', fontWeight: '600' }}>3.</span>
                Continuously improve content based on user feedback
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 
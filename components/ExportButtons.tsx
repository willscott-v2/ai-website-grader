'use client';

import { useState } from 'react';
import { Download, FileText, FileDown, Loader2, Printer } from 'lucide-react';
import { WebsiteAnalysis } from '@/types';
import { generatePDFReport } from '@/lib/exporters';

interface ExportButtonsProps {
  analysis: WebsiteAnalysis;
  onExportMarkdown: () => void;
}

export default function ExportButtons({ analysis, onExportMarkdown }: ExportButtonsProps) {
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  const handleExportPDF = async () => {
    setIsExportingPDF(true);
    try {
      console.log('Starting PDF export...');
      
      // Check if the report container exists
      const reportContainer = document.getElementById('report-container');
      if (!reportContainer) {
        throw new Error('Report container not found. Please ensure the analysis is complete.');
      }
      
      console.log('Report container found, waiting for render...');
      
      // Add a small delay to ensure the report is fully rendered
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Calling generatePDFReport...');
      await generatePDFReport(analysis, 'report-container');
      
      console.log('PDF export completed successfully');
    } catch (error) {
      console.error('PDF export failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to generate PDF: ${errorMessage}`);
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handlePrint = () => {
    // Create a print-friendly version of the report
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print the report');
      return;
    }

    const date = new Date(analysis.timestamp).toLocaleDateString();
    
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>AI Website Grader Report - ${analysis.title}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            margin: 20px; 
            color: #333;
          }
          h1 { color: #2c3e50; border-bottom: 3px solid #e67e22; padding-bottom: 10px; }
          h2 { color: #34495e; margin-top: 30px; }
          h3 { color: #2c3e50; margin-top: 20px; }
          table { border-collapse: collapse; width: 100%; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #f8f9fa; font-weight: bold; }
          .score { font-weight: bold; color: #e67e22; }
          .status { text-transform: capitalize; }
          .section { margin-bottom: 30px; }
          .findings, .recommendations { margin: 15px 0; }
          .detailed-scores { margin: 15px 0; }
          .detailed-scores ul { list-style: none; padding-left: 0; }
          .detailed-scores li { margin: 5px 0; }
          .improvements { margin: 20px 0; }
          .improvement-item { 
            border: 1px solid #ddd; 
            padding: 15px; 
            margin: 15px 0; 
            border-radius: 5px;
          }
          .current { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 10px; margin: 10px 0; }
          .improved { background-color: #d4edda; border-left: 4px solid #28a745; padding: 10px; margin: 10px 0; }
          .reasoning { background-color: #e2e3e5; border-left: 4px solid #6c757d; padding: 10px; margin: 10px 0; }
          .next-steps { background-color: #d1ecf1; border: 1px solid #bee5eb; padding: 15px; border-radius: 5px; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 0.9em; color: #666; }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>AI Website Grader Report</h1>
        <p><strong>Powered by Search Influence - AI SEO Experts</strong></p>
        
        <div class="section">
          <h3>Website Information</h3>
          <p><strong>Website:</strong> ${analysis.url}</p>
          <p><strong>Title:</strong> ${analysis.title}</p>
          <p><strong>Generated:</strong> ${date}</p>
          <p><strong>Overall Score:</strong> <span class="score">${analysis.overallScore}%</span></p>
        </div>

        <div class="section">
          <h2>Executive Summary</h2>
          <p>This report analyzes your website's readiness for AI-powered search engines, chat interfaces, and modern search algorithms. The analysis focuses on factors that influence visibility in AI overviews, voice search results, and chatbot responses. Powered by Search Influence - AI SEO Experts.</p>
        </div>

        <div class="section">
          <h2>Score Breakdown</h2>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>AI Optimization</strong></td>
                <td class="score">${analysis.aiOptimization.score}%</td>
                <td class="status">${analysis.aiOptimization.status}</td>
              </tr>
              <tr>
                <td><strong>Content Quality</strong></td>
                <td class="score">${analysis.contentQuality.score}%</td>
                <td class="status">${analysis.contentQuality.status}</td>
              </tr>
              <tr>
                <td><strong>Technical SEO</strong></td>
                <td class="score">${analysis.technicalSEO.score}%</td>
                <td class="status">${analysis.technicalSEO.status}</td>
              </tr>
              <tr>
                <td><strong>Authority & Trust</strong></td>
                <td class="score">${analysis.authority.score}%</td>
                <td class="status">${analysis.authority.status}</td>
              </tr>
              <tr>
                <td><strong>User Experience</strong></td>
                <td class="score">${analysis.userExperience.score}%</td>
                <td class="status">${analysis.userExperience.status}</td>
              </tr>
              <tr>
                <td><strong>Content Structure</strong></td>
                <td class="score">${analysis.contentStructure.score}%</td>
                <td class="status">${analysis.contentStructure.status}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="section">
          <h2>AI Optimization (${analysis.aiOptimization.score}%)</h2>
          <p><em>Optimized for AI search engines by Search Influence - AI SEO Experts</em></p>
          
          <div class="findings">
            <h3>Key Findings:</h3>
            <ul>
              ${analysis.aiOptimization.findings.map(finding => `<li>${finding}</li>`).join('')}
            </ul>
          </div>
          
          <div class="recommendations">
            <h3>Recommendations:</h3>
            <ul>
              ${analysis.aiOptimization.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
          </div>
          
          <div class="detailed-scores">
            <h3>Detailed Scores:</h3>
            <ul>
              <li><strong>Chunkability:</strong> ${analysis.aiOptimization.chunkability}%</li>
              <li><strong>Q&A Format:</strong> ${analysis.aiOptimization.qaFormat}%</li>
              <li><strong>Entity Recognition:</strong> ${analysis.aiOptimization.entityRecognition}%</li>
              <li><strong>Factual Density:</strong> ${analysis.aiOptimization.factualDensity}%</li>
              <li><strong>Semantic Clarity:</strong> ${analysis.aiOptimization.semanticClarity}%</li>
            </ul>
          </div>
        </div>

        <div class="section">
          <h2>Content Quality (${analysis.contentQuality.score}%)</h2>
          <p><em>Content optimization powered by Search Influence - AI SEO Experts</em></p>
          
          <div class="findings">
            <h3>Key Findings:</h3>
            <ul>
              ${analysis.contentQuality.findings.map(finding => `<li>${finding}</li>`).join('')}
            </ul>
          </div>
          
          <div class="recommendations">
            <h3>Recommendations:</h3>
            <ul>
              ${analysis.contentQuality.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
          </div>
          
          <div class="detailed-scores">
            <h3>Detailed Scores:</h3>
            <ul>
              <li><strong>Long-tail Keywords:</strong> ${analysis.contentQuality.longTailKeywords}%</li>
              <li><strong>Comprehensive Coverage:</strong> ${analysis.contentQuality.comprehensiveCoverage}%</li>
              <li><strong>Relevance to User Intent:</strong> ${analysis.contentQuality.relevanceToUserIntent}%</li>
              <li><strong>Accuracy and Currency:</strong> ${analysis.contentQuality.accuracyAndCurrency}%</li>
              <li><strong>Natural Language:</strong> ${analysis.contentQuality.naturalLanguage}%</li>
            </ul>
          </div>
        </div>

        <div class="section">
          <h2>Technical SEO (${analysis.technicalSEO.score}%)</h2>
          <p><em>Technical optimization by Search Influence - AI SEO Experts</em></p>
          
          <div class="findings">
            <h3>Key Findings:</h3>
            <ul>
              ${analysis.technicalSEO.findings.map(finding => `<li>${finding}</li>`).join('')}
            </ul>
          </div>
          
          <div class="recommendations">
            <h3>Recommendations:</h3>
            <ul>
              ${analysis.technicalSEO.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
          </div>
          
          <div class="detailed-scores">
            <h3>Detailed Scores:</h3>
            <ul>
              <li><strong>Heading Structure:</strong> ${analysis.technicalSEO.headingStructure}%</li>
              <li><strong>Meta Info:</strong> ${analysis.technicalSEO.metaInfo}%</li>
              <li><strong>Alt Text:</strong> ${analysis.technicalSEO.altText}%</li>
              <li><strong>Links:</strong> ${analysis.technicalSEO.links}%</li>
            </ul>
          </div>
        </div>

        <div class="section">
          <h2>Authority & Trust (${analysis.authority.score}%)</h2>
          <p><em>Authority building strategies from Search Influence - AI SEO Experts</em></p>
          
          <div class="findings">
            <h3>Key Findings:</h3>
            <ul>
              ${analysis.authority.findings.map(finding => `<li>${finding}</li>`).join('')}
            </ul>
          </div>
          
          <div class="recommendations">
            <h3>Recommendations:</h3>
            <ul>
              ${analysis.authority.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
          </div>
          
          <div class="detailed-scores">
            <h3>Detailed Scores:</h3>
            <ul>
              <li><strong>Social Media Presence:</strong> ${analysis.authority.socialMediaPresence}%</li>
              <li><strong>Company Information:</strong> ${analysis.authority.companyInformation}%</li>
              <li><strong>Legal Compliance:</strong> ${analysis.authority.legalCompliance}%</li>
              <li><strong>Testimonials:</strong> ${analysis.authority.testimonials}%</li>
              <li><strong>Affiliations:</strong> ${analysis.authority.affiliations}%</li>
            </ul>
          </div>
        </div>

        <div class="section">
          <h2>User Experience (${analysis.userExperience.score}%)</h2>
          <p><em>UX optimization by Search Influence - AI SEO Experts</em></p>
          
          <div class="findings">
            <h3>Key Findings:</h3>
            <ul>
              ${analysis.userExperience.findings.map(finding => `<li>${finding}</li>`).join('')}
            </ul>
          </div>
          
          <div class="recommendations">
            <h3>Recommendations:</h3>
            <ul>
              ${analysis.userExperience.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
          </div>
          
          <div class="detailed-scores">
            <h3>Detailed Scores:</h3>
            <ul>
              <li><strong>Contact Info:</strong> ${analysis.userExperience.contactInfo}%</li>
              <li><strong>Calls to Action:</strong> ${analysis.userExperience.callsToAction}%</li>
              <li><strong>Language:</strong> ${analysis.userExperience.language}%</li>
            </ul>
          </div>
        </div>

        <div class="section">
          <h2>Content Structure (${analysis.contentStructure.score}%)</h2>
          <p><em>Content structure optimization by Search Influence - AI SEO Experts</em></p>
          
          <div class="findings">
            <h3>Key Findings:</h3>
            <ul>
              ${analysis.contentStructure.findings.map(finding => `<li>${finding}</li>`).join('')}
            </ul>
          </div>
          
          <div class="recommendations">
            <h3>Recommendations:</h3>
            <ul>
              ${analysis.contentStructure.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
          </div>
          
          <div class="detailed-scores">
            <h3>Detailed Scores:</h3>
            <ul>
              <li><strong>Structured Content:</strong> ${analysis.contentStructure.structuredContent}%</li>
              <li><strong>Multimedia:</strong> ${analysis.contentStructure.multimedia}%</li>
              <li><strong>Readability:</strong> ${analysis.contentStructure.readability}%</li>
            </ul>
          </div>
        </div>

        ${analysis.contentImprovements.length > 0 ? `
        <div class="section">
          <h2>Priority Content Improvements</h2>
          <p><em>Strategic improvements recommended by Search Influence - AI SEO Experts</em></p>
          
          ${analysis.contentImprovements.map((improvement, index) => `
            <div class="improvement-item">
              <h3>${index + 1}. ${improvement.section}</h3>
              <div class="current">
                <strong>Current:</strong> ${improvement.current}
              </div>
              <div class="improved">
                <strong>Improved:</strong> ${improvement.improved}
              </div>
              <div class="reasoning">
                <strong>Why this helps:</strong> ${improvement.reasoning}
              </div>
            </div>
          `).join('')}
        </div>
        ` : ''}

        <div class="section">
          <h2>Next Steps</h2>
          <div class="next-steps">
            <ol>
              <li>Focus on AI Optimization - This is the most impactful area for future search visibility</li>
              <li>Implement Priority Improvements - Start with the content improvements listed above</li>
              <li>Monitor Progress - Re-run this analysis after implementing changes</li>
              <li>Stay Updated - AI search algorithms evolve rapidly; regular audits are recommended</li>
            </ol>
          </div>
        </div>

        <div class="footer">
          <p>Report generated by AI Website Grader - Optimizing content for the AI-powered search future. Powered by Search Influence - AI SEO Experts.</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: '12px',
      marginTop: '20px'
    }}>
      <button
        onClick={handleExportPDF}
        disabled={isExportingPDF}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 20px',
          background: 'linear-gradient(135deg, var(--orange-accent) 0%, var(--orange-dark) 100%)',
          color: 'var(--white)',
          border: 'none',
          borderRadius: '8px',
          cursor: isExportingPDF ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(230, 126, 34, 0.3)',
          opacity: isExportingPDF ? 0.6 : 1,
          fontSize: '14px',
          fontWeight: '600',
          fontFamily: 'var(--font-stack)'
        }}
        onMouseEnter={(e) => {
          if (!isExportingPDF) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(230, 126, 34, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(230, 126, 34, 0.3)';
        }}
      >
        {isExportingPDF ? (
          <Loader2 size={16} style={{ marginRight: '8px' }} />
        ) : (
          <FileDown size={16} style={{ marginRight: '8px' }} />
        )}
        {isExportingPDF ? 'Generating PDF...' : 'Export PDF'}
      </button>

      <button
        onClick={onExportMarkdown}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 20px',
          background: 'linear-gradient(135deg, var(--info-blue) 0%, #2980b9 100%)',
          color: 'var(--white)',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(52, 152, 219, 0.3)',
          fontSize: '14px',
          fontWeight: '600',
          fontFamily: 'var(--font-stack)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(52, 152, 219, 0.3)';
        }}
      >
        <FileText size={16} style={{ marginRight: '8px' }} />
        Export Markdown
      </button>

      <button
        onClick={handlePrint}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 20px',
          background: 'linear-gradient(135deg, var(--success-green) 0%, #229954 100%)',
          color: 'var(--white)',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(39, 174, 96, 0.3)',
          fontSize: '14px',
          fontWeight: '600',
          fontFamily: 'var(--font-stack)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(39, 174, 96, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(39, 174, 96, 0.3)';
        }}
      >
        <Printer size={16} style={{ marginRight: '8px' }} />
        Print Report
      </button>
    </div>
  );
} 
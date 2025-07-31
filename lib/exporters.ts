
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { WebsiteAnalysis } from '@/types';

export function generateMarkdownReport(analysis: WebsiteAnalysis): string {
  const date = new Date(analysis.timestamp).toLocaleDateString();
  
  // Helper function to round numbers to 2 decimal places
  const round = (num: number) => Math.round(num * 100) / 100;
  
  return `# AI Website Grader Report

**Powered by [Search Influence](https://www.searchinfluence.com/) - AI SEO Experts**

**Website:** ${analysis.url}  
**Title:** ${analysis.title}  
**Generated:** ${date}  
**Overall Score:** ${round(analysis.overallScore)}%

## Executive Summary

This report analyzes your website's readiness for AI-powered search engines, chat interfaces, and modern search algorithms. The analysis focuses on factors that influence visibility in AI overviews, voice search results, and chatbot responses. Powered by [Search Influence](https://www.searchinfluence.com/) - AI SEO Experts.

## Score Breakdown

| Category | Score | Status |
|----------|-------|--------|
| **AI Optimization** | ${round(analysis.aiOptimization.score)}% | ${analysis.aiOptimization.status} |
| **Content Quality** | ${round(analysis.contentQuality.score)}% | ${analysis.contentQuality.status} |
| **Technical SEO** | ${round(analysis.technicalSEO.score)}% | ${analysis.technicalSEO.status} |
| **Authority & Trust** | ${round(analysis.authority.score)}% | ${analysis.authority.status} |
| **User Experience** | ${round(analysis.userExperience.score)}% | ${analysis.userExperience.status} |
| **Content Structure** | ${round(analysis.contentStructure.score)}% | ${analysis.contentStructure.status} |

## AI Optimization (${round(analysis.aiOptimization.score)}%)

*Optimized for AI search engines by [Search Influence](https://www.searchinfluence.com/) - AI SEO Experts*

### Key Findings:
${analysis.aiOptimization.findings.map(finding => `- ${finding}`).join('\n')}

### Recommendations:
${analysis.aiOptimization.recommendations.map(rec => `- ${rec}`).join('\n')}

### Detailed Scores:
- **Chunkability:** ${round(analysis.aiOptimization.chunkability)}%
- **Q&A Format:** ${round(analysis.aiOptimization.qaFormat)}%
- **Entity Recognition:** ${round(analysis.aiOptimization.entityRecognition)}%
- **Factual Density:** ${round(analysis.aiOptimization.factualDensity)}%
- **Semantic Clarity:** ${round(analysis.aiOptimization.semanticClarity)}%

## Content Quality (${round(analysis.contentQuality.score)}%)

*Content optimization powered by [Search Influence](https://www.searchinfluence.com/) - AI SEO Experts*

### Key Findings:
${analysis.contentQuality.findings.map(finding => `- ${finding}`).join('\n')}

### Recommendations:
${analysis.contentQuality.recommendations.map(rec => `- ${rec}`).join('\n')}

### Detailed Scores:
- **Long-tail Keywords:** ${round(analysis.contentQuality.longTailKeywords)}%
- **Comprehensive Coverage:** ${round(analysis.contentQuality.comprehensiveCoverage)}%
- **Relevance to User Intent:** ${round(analysis.contentQuality.relevanceToUserIntent)}%
- **Accuracy and Currency:** ${round(analysis.contentQuality.accuracyAndCurrency)}%
- **Natural Language:** ${round(analysis.contentQuality.naturalLanguage)}%

## Technical SEO (${round(analysis.technicalSEO.score)}%)

*Technical optimization by [Search Influence](https://www.searchinfluence.com/) - AI SEO Experts*

### Key Findings:
${analysis.technicalSEO.findings.map(finding => `- ${finding}`).join('\n')}

### Recommendations:
${analysis.technicalSEO.recommendations.map(rec => `- ${rec}`).join('\n')}

### Detailed Scores:
- **Heading Structure:** ${round(analysis.technicalSEO.headingStructure)}%
- **Meta Info:** ${round(analysis.technicalSEO.metaInfo)}%
- **Alt Text:** ${round(analysis.technicalSEO.altText)}%
- **Links:** ${round(analysis.technicalSEO.links)}%

## Authority & Trust (${round(analysis.authority.score)}%)

*Authority building strategies from [Search Influence](https://www.searchinfluence.com/) - AI SEO Experts*

### Key Findings:
${analysis.authority.findings.map(finding => `- ${finding}`).join('\n')}

### Recommendations:
${analysis.authority.recommendations.map(rec => `- ${rec}`).join('\n')}

### Detailed Scores:
- **Social Media Presence:** ${round(analysis.authority.socialMediaPresence)}%
- **Company Information:** ${round(analysis.authority.companyInformation)}%
- **Legal Compliance:** ${round(analysis.authority.legalCompliance)}%
- **Testimonials:** ${round(analysis.authority.testimonials)}%
- **Affiliations:** ${round(analysis.authority.affiliations)}%

## User Experience (${round(analysis.userExperience.score)}%)

*UX optimization by [Search Influence](https://www.searchinfluence.com/) - AI SEO Experts*

### Key Findings:
${analysis.userExperience.findings.map(finding => `- ${finding}`).join('\n')}

### Recommendations:
${analysis.userExperience.recommendations.map(rec => `- ${rec}`).join('\n')}

### Detailed Scores:
- **Contact Info:** ${round(analysis.userExperience.contactInfo)}%
- **Calls to Action:** ${round(analysis.userExperience.callsToAction)}%
- **Language:** ${round(analysis.userExperience.language)}%

## Content Structure (${round(analysis.contentStructure.score)}%)

*Content structure optimization by [Search Influence](https://www.searchinfluence.com/) - AI SEO Experts*

### Key Findings:
${analysis.contentStructure.findings.map(finding => `- ${finding}`).join('\n')}

### Recommendations:
${analysis.contentStructure.recommendations.map(rec => `- ${rec}`).join('\n')}

### Detailed Scores:
- **Structured Content:** ${round(analysis.contentStructure.structuredContent)}%
- **Multimedia:** ${round(analysis.contentStructure.multimedia)}%
- **Readability:** ${round(analysis.contentStructure.readability)}%

## Priority Content Improvements

*Strategic improvements recommended by [Search Influence](https://www.searchinfluence.com/) - AI SEO Experts*

${analysis.contentImprovements.map((improvement, index) => `
### ${index + 1}. ${improvement.section}

**Current:** ${improvement.current}

**Improved:** ${improvement.improved}

**Why this helps:** ${improvement.reasoning}
`).join('\n')}

## Next Steps

*Powered by [Search Influence](https://www.searchinfluence.com/) - AI SEO Experts*

1. **Focus on AI Optimization** - This is the most impactful area for future search visibility
2. **Implement Priority Improvements** - Start with the content improvements listed above
3. **Monitor Progress** - Re-run this analysis after implementing changes
4. **Stay Updated** - AI search algorithms evolve rapidly; regular audits are recommended

---

*Report generated by [AI Website Grader](https://ai-grader.searchinfluence.com/) - Optimizing content for the AI-powered search future. Powered by [Search Influence](https://www.searchinfluence.com/) - AI SEO Experts.*`;
}

export async function generatePDFReport(analysis: WebsiteAnalysis, elementId: string): Promise<void> {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    throw new Error('PDF generation is only available in the browser');
  }

  try {
    // Helper function to round numbers
    const round = (num: number) => Math.round(num * 100) / 100;
    
    // Create HTML content for PDF
    const htmlContent = `
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
            font-size: 12px;
          }
          h1 { 
            color: #2c3e50; 
            border-bottom: 3px solid #e67e22; 
            padding-bottom: 10px; 
            font-size: 24px;
            margin-top: 0;
          }
          h2 { 
            color: #34495e; 
            margin-top: 25px; 
            font-size: 18px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
          }
          h3 { 
            color: #2c3e50; 
            margin-top: 20px; 
            font-size: 16px;
            font-weight: bold;
          }
          table { 
            border-collapse: collapse; 
            width: 100%; 
            margin: 15px 0; 
            font-size: 11px;
          }
          th, td { 
            border: 1px solid #ddd; 
            padding: 10px; 
            text-align: left; 
          }
          th { 
            background-color: #f8f9fa; 
            font-weight: bold; 
          }
          .score { 
            font-weight: bold; 
            color: #e67e22; 
          }
          .status { 
            text-transform: capitalize; 
          }
          .section { 
            margin-bottom: 25px; 
          }
          .findings, .recommendations { 
            margin: 12px 0; 
          }
          .detailed-scores { 
            margin: 12px 0; 
          }
          .detailed-scores ul { 
            list-style: none; 
            padding-left: 0; 
          }
          .detailed-scores li { 
            margin: 4px 0; 
          }
          .improvements { 
            margin: 15px 0; 
          }
          .improvement-item { 
            border: 1px solid #ddd; 
            padding: 12px; 
            margin: 12px 0; 
            border-radius: 5px;
          }
          .current { 
            background-color: #fff3cd; 
            border-left: 4px solid #ffc107; 
            padding: 8px; 
            margin: 8px 0; 
          }
          .improved { 
            background-color: #d4edda; 
            border-left: 4px solid #28a745; 
            padding: 8px; 
            margin: 8px 0; 
          }
          .reasoning { 
            background-color: #e2e3e5; 
            border-left: 4px solid #6c757d; 
            padding: 8px; 
            margin: 8px 0; 
          }
          .next-steps { 
            background-color: #d1ecf1; 
            border: 1px solid #bee5eb; 
            padding: 12px; 
            border-radius: 5px; 
          }
          .footer { 
            margin-top: 30px; 
            padding-top: 15px; 
            border-top: 1px solid #ddd; 
            font-size: 10px; 
            color: #666; 
          }
          a {
            color: #3498db;
            text-decoration: underline;
          }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>AI Website Grader Report</h1>
        <p><strong>Powered by <a href="https://www.searchinfluence.com/">Search Influence</a> - AI SEO Experts</strong></p>
        
        <div class="section">
          <h3>Website Information</h3>
          <p><strong>Website:</strong> ${analysis.url}</p>
          <p><strong>Title:</strong> ${analysis.title}</p>
          <p><strong>Generated:</strong> ${new Date(analysis.timestamp).toLocaleDateString()}</p>
          <p><strong>Overall Score:</strong> <span class="score">${round(analysis.overallScore)}%</span></p>
        </div>

        <div class="section">
          <h2>Executive Summary</h2>
          <p>This report analyzes your website's readiness for AI-powered search engines, chat interfaces, and modern search algorithms. The analysis focuses on factors that influence visibility in AI overviews, voice search results, and chatbot responses. Powered by <a href="https://www.searchinfluence.com/">Search Influence</a> - AI SEO Experts.</p>
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
                <td class="score">${round(analysis.aiOptimization.score)}%</td>
                <td class="status">${analysis.aiOptimization.status}</td>
              </tr>
              <tr>
                <td><strong>Content Quality</strong></td>
                <td class="score">${round(analysis.contentQuality.score)}%</td>
                <td class="status">${analysis.contentQuality.status}</td>
              </tr>
              <tr>
                <td><strong>Technical SEO</strong></td>
                <td class="score">${round(analysis.technicalSEO.score)}%</td>
                <td class="status">${analysis.technicalSEO.status}</td>
              </tr>
              <tr>
                <td><strong>Authority & Trust</strong></td>
                <td class="score">${round(analysis.authority.score)}%</td>
                <td class="status">${analysis.authority.status}</td>
              </tr>
              <tr>
                <td><strong>User Experience</strong></td>
                <td class="score">${round(analysis.userExperience.score)}%</td>
                <td class="status">${analysis.userExperience.status}</td>
              </tr>
              <tr>
                <td><strong>Content Structure</strong></td>
                <td class="score">${round(analysis.contentStructure.score)}%</td>
                <td class="status">${analysis.contentStructure.status}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="section">
          <h2>AI Optimization (${round(analysis.aiOptimization.score)}%)</h2>
          <p><em>Optimized for AI search engines by <a href="https://www.searchinfluence.com/">Search Influence</a> - AI SEO Experts</em></p>
          
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
              <li><strong>Chunkability:</strong> ${round(analysis.aiOptimization.chunkability)}%</li>
              <li><strong>Q&A Format:</strong> ${round(analysis.aiOptimization.qaFormat)}%</li>
              <li><strong>Entity Recognition:</strong> ${round(analysis.aiOptimization.entityRecognition)}%</li>
              <li><strong>Factual Density:</strong> ${round(analysis.aiOptimization.factualDensity)}%</li>
              <li><strong>Semantic Clarity:</strong> ${round(analysis.aiOptimization.semanticClarity)}%</li>
            </ul>
          </div>
        </div>

        <div class="section">
          <h2>Content Quality (${round(analysis.contentQuality.score)}%)</h2>
          <p><em>Content optimization powered by <a href="https://www.searchinfluence.com/">Search Influence</a> - AI SEO Experts</em></p>
          
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
              <li><strong>Long-tail Keywords:</strong> ${round(analysis.contentQuality.longTailKeywords)}%</li>
              <li><strong>Comprehensive Coverage:</strong> ${round(analysis.contentQuality.comprehensiveCoverage)}%</li>
              <li><strong>Relevance to User Intent:</strong> ${round(analysis.contentQuality.relevanceToUserIntent)}%</li>
              <li><strong>Accuracy and Currency:</strong> ${round(analysis.contentQuality.accuracyAndCurrency)}%</li>
              <li><strong>Natural Language:</strong> ${round(analysis.contentQuality.naturalLanguage)}%</li>
            </ul>
          </div>
        </div>

        <div class="section">
          <h2>Technical SEO (${round(analysis.technicalSEO.score)}%)</h2>
          <p><em>Technical optimization by <a href="https://www.searchinfluence.com/">Search Influence</a> - AI SEO Experts</em></p>
          
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
              <li><strong>Heading Structure:</strong> ${round(analysis.technicalSEO.headingStructure)}%</li>
              <li><strong>Meta Info:</strong> ${round(analysis.technicalSEO.metaInfo)}%</li>
              <li><strong>Alt Text:</strong> ${round(analysis.technicalSEO.altText)}%</li>
              <li><strong>Links:</strong> ${round(analysis.technicalSEO.links)}%</li>
            </ul>
          </div>
        </div>

        <div class="section">
          <h2>Authority & Trust (${round(analysis.authority.score)}%)</h2>
          <p><em>Authority building strategies from <a href="https://www.searchinfluence.com/">Search Influence</a> - AI SEO Experts</em></p>
          
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
              <li><strong>Social Media Presence:</strong> ${round(analysis.authority.socialMediaPresence)}%</li>
              <li><strong>Company Information:</strong> ${round(analysis.authority.companyInformation)}%</li>
              <li><strong>Legal Compliance:</strong> ${round(analysis.authority.legalCompliance)}%</li>
              <li><strong>Testimonials:</strong> ${round(analysis.authority.testimonials)}%</li>
              <li><strong>Affiliations:</strong> ${round(analysis.authority.affiliations)}%</li>
            </ul>
          </div>
        </div>

        <div class="section">
          <h2>User Experience (${round(analysis.userExperience.score)}%)</h2>
          <p><em>UX optimization by <a href="https://www.searchinfluence.com/">Search Influence</a> - AI SEO Experts</em></p>
          
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
              <li><strong>Contact Info:</strong> ${round(analysis.userExperience.contactInfo)}%</li>
              <li><strong>Calls to Action:</strong> ${round(analysis.userExperience.callsToAction)}%</li>
              <li><strong>Language:</strong> ${round(analysis.userExperience.language)}%</li>
            </ul>
          </div>
        </div>

        <div class="section">
          <h2>Content Structure (${round(analysis.contentStructure.score)}%)</h2>
          <p><em>Content structure optimization by <a href="https://www.searchinfluence.com/">Search Influence</a> - AI SEO Experts</em></p>
          
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
              <li><strong>Structured Content:</strong> ${round(analysis.contentStructure.structuredContent)}%</li>
              <li><strong>Multimedia:</strong> ${round(analysis.contentStructure.multimedia)}%</li>
              <li><strong>Readability:</strong> ${round(analysis.contentStructure.readability)}%</li>
            </ul>
          </div>
        </div>

        ${analysis.contentImprovements.length > 0 ? `
        <div class="section">
          <h2>Priority Content Improvements</h2>
          <p><em>Strategic improvements recommended by <a href="https://www.searchinfluence.com/">Search Influence</a> - AI SEO Experts</em></p>
          
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
          <p>Report generated by <a href="https://ai-grader.searchinfluence.com/">AI Website Grader</a> - Optimizing content for the AI-powered search future. Powered by <a href="https://www.searchinfluence.com/">Search Influence</a> - AI SEO Experts.</p>
        </div>
      </body>
      </html>
    `;

    // Create a new window with the HTML content
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Please allow popups to generate PDF');
    }

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };

    console.log('PDF generated successfully using HTML-to-PDF');

  } catch (error) {
    console.error('Error generating PDF:', error);
    
    if (error instanceof Error) {
      throw new Error(`PDF generation failed: ${error.message}`);
    } else {
      throw new Error('Failed to generate PDF report. Please try again.');
    }
  }
}

export function downloadMarkdown(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
} 
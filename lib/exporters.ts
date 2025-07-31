
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { WebsiteAnalysis } from '@/types';

export function generateMarkdownReport(analysis: WebsiteAnalysis): string {
  const date = new Date(analysis.timestamp).toLocaleDateString();
  
  return `# AI Website Grader Report

**Powered by Search Influence - AI SEO Experts**

**Website:** ${analysis.url}  
**Title:** ${analysis.title}  
**Generated:** ${date}  
**Overall Score:** ${analysis.overallScore}%

## Executive Summary

This report analyzes your website's readiness for AI-powered search engines, chat interfaces, and modern search algorithms. The analysis focuses on factors that influence visibility in AI overviews, voice search results, and chatbot responses. Powered by Search Influence - AI SEO Experts.

## Score Breakdown

| Category | Score | Status |
|----------|-------|--------|
| **AI Optimization** | ${analysis.aiOptimization.score}% | ${analysis.aiOptimization.status} |
| **Content Quality** | ${analysis.contentQuality.score}% | ${analysis.contentQuality.status} |
| **Technical SEO** | ${analysis.technicalSEO.score}% | ${analysis.technicalSEO.status} |
| **Authority & Trust** | ${analysis.authority.score}% | ${analysis.authority.status} |
| **User Experience** | ${analysis.userExperience.score}% | ${analysis.userExperience.status} |
| **Content Structure** | ${analysis.contentStructure.score}% | ${analysis.contentStructure.status} |

## AI Optimization (${analysis.aiOptimization.score}%)

*Optimized for AI search engines by [Search Influence](https://www.searchinfluence.com/) - AI SEO Experts*

### Key Findings:
${analysis.aiOptimization.findings.map(finding => `- ${finding}`).join('\n')}

### Recommendations:
${analysis.aiOptimization.recommendations.map(rec => `- ${rec}`).join('\n')}

### Detailed Scores:
- **Chunkability:** ${analysis.aiOptimization.chunkability}%
- **Q&A Format:** ${analysis.aiOptimization.qaFormat}%
- **Entity Recognition:** ${analysis.aiOptimization.entityRecognition}%
- **Factual Density:** ${analysis.aiOptimization.factualDensity}%
- **Semantic Clarity:** ${analysis.aiOptimization.semanticClarity}%

## Content Quality (${analysis.contentQuality.score}%)

*Content optimization powered by [Search Influence](https://www.searchinfluence.com/) - AI SEO Experts*

### Key Findings:
${analysis.contentQuality.findings.map(finding => `- ${finding}`).join('\n')}

### Recommendations:
${analysis.contentQuality.recommendations.map(rec => `- ${rec}`).join('\n')}

### Detailed Scores:
- **Long-tail Keywords:** ${analysis.contentQuality.longTailKeywords}%
- **Comprehensive Coverage:** ${analysis.contentQuality.comprehensiveCoverage}%
- **Relevance to User Intent:** ${analysis.contentQuality.relevanceToUserIntent}%
- **Accuracy and Currency:** ${analysis.contentQuality.accuracyAndCurrency}%
- **Natural Language:** ${analysis.contentQuality.naturalLanguage}%

## Technical SEO (${analysis.technicalSEO.score}%)

*Technical optimization by [Search Influence](https://www.searchinfluence.com/) - AI SEO Experts*

### Key Findings:
${analysis.technicalSEO.findings.map(finding => `- ${finding}`).join('\n')}

### Recommendations:
${analysis.technicalSEO.recommendations.map(rec => `- ${rec}`).join('\n')}

### Detailed Scores:
- **Heading Structure:** ${analysis.technicalSEO.headingStructure}%
- **Meta Info:** ${analysis.technicalSEO.metaInfo}%
- **Alt Text:** ${analysis.technicalSEO.altText}%
- **Links:** ${analysis.technicalSEO.links}%

## Authority & Trust (${analysis.authority.score}%)

*Authority building strategies from [Search Influence](https://www.searchinfluence.com/) - AI SEO Experts*

### Key Findings:
${analysis.authority.findings.map(finding => `- ${finding}`).join('\n')}

### Recommendations:
${analysis.authority.recommendations.map(rec => `- ${rec}`).join('\n')}

### Detailed Scores:
- **Social Media Presence:** ${analysis.authority.socialMediaPresence}%
- **Company Information:** ${analysis.authority.companyInformation}%
- **Legal Compliance:** ${analysis.authority.legalCompliance}%
- **Testimonials:** ${analysis.authority.testimonials}%
- **Affiliations:** ${analysis.authority.affiliations}%

## User Experience (${analysis.userExperience.score}%)

*UX optimization by [Search Influence](https://www.searchinfluence.com/) - AI SEO Experts*

### Key Findings:
${analysis.userExperience.findings.map(finding => `- ${finding}`).join('\n')}

### Recommendations:
${analysis.userExperience.recommendations.map(rec => `- ${rec}`).join('\n')}

### Detailed Scores:
- **Contact Info:** ${analysis.userExperience.contactInfo}%
- **Calls to Action:** ${analysis.userExperience.callsToAction}%
- **Language:** ${analysis.userExperience.language}%

## Content Structure (${analysis.contentStructure.score}%)

*Content structure optimization by [Search Influence](https://www.searchinfluence.com/) - AI SEO Experts*

### Key Findings:
${analysis.contentStructure.findings.map(finding => `- ${finding}`).join('\n')}

### Recommendations:
${analysis.contentStructure.recommendations.map(rec => `- ${rec}`).join('\n')}

### Detailed Scores:
- **Structured Content:** ${analysis.contentStructure.structuredContent}%
- **Multimedia:** ${analysis.contentStructure.multimedia}%
- **Readability:** ${analysis.contentStructure.readability}%

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

*Report generated by AI Website Grader - Optimizing content for the AI-powered search future. Powered by [Search Influence](https://www.searchinfluence.com/) - AI SEO Experts.*`;
}

export async function generatePDFReport(analysis: WebsiteAnalysis, elementId: string): Promise<void> {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    throw new Error('PDF generation is only available in the browser');
  }

  try {
    // Wait a bit for the DOM to be fully rendered
    await new Promise(resolve => setTimeout(resolve, 100));

    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Report element with ID '${elementId}' not found. Please ensure the report is fully loaded.`);
    }

    // Check if element is visible
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      throw new Error('Report element is not visible. Please ensure the report is fully rendered.');
    }

    console.log('Starting PDF generation...');

    try {
      // Try to capture the HTML element as a canvas
      const canvas = await html2canvas(element, {
        scale: 1.5, // Reduced scale for better performance
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false, // Disable logging for cleaner console
        width: rect.width,
        height: rect.height
      });

      console.log('Canvas created, generating PDF...');

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add first page
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if content is long
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Add metadata
      pdf.setProperties({
        title: `AI Website Grader Report - ${analysis.title}`,
        subject: 'Website Analysis Report',
        author: 'AI Website Grader',
        creator: 'AI Website Grader'
      });

      // Add Search Influence branding to the first page
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Powered by Search Influence - AI SEO Experts', 20, 25);

      // Download the PDF
      const fileName = `ai-grader-report-${analysis.url.replace(/[^a-z0-9]/gi, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      console.log('PDF generated successfully');

    } catch (html2canvasError) {
      console.warn('html2canvas failed, falling back to text-based PDF:', html2canvasError);
      
      // Fallback: Create a comprehensive text-based PDF that matches markdown structure
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      let yPos = 20;
      const pageHeight = 280; // Leave margin for footer
      const margin = 20;
      const contentWidth = 170;
      
      // Helper function to check page breaks
      const checkPageBreak = (requiredSpace: number) => {
        if (yPos + requiredSpace > pageHeight) {
          pdf.addPage();
          yPos = 20;
          return true;
        }
        return false;
      };

      // Header
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('AI Website Grader Report', margin, yPos);
      yPos += 15;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Powered by Search Influence - AI SEO Experts', margin, yPos);
      yPos += 10;
      
      // Website Info
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Website Information:', margin, yPos);
      yPos += 8;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Website: ${analysis.url}`, margin + 5, yPos);
      yPos += 6;
      pdf.text(`Title: ${analysis.title}`, margin + 5, yPos);
      yPos += 6;
      pdf.text(`Overall Score: ${analysis.overallScore}%`, margin + 5, yPos);
      yPos += 6;
      pdf.text(`Generated: ${new Date(analysis.timestamp).toLocaleDateString()}`, margin + 5, yPos);
      yPos += 15;

      // Executive Summary
      checkPageBreak(30);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Executive Summary', margin, yPos);
      yPos += 10;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const summaryText = 'This report analyzes your website\'s readiness for AI-powered search engines, chat interfaces, and modern search algorithms. The analysis focuses on factors that influence visibility in AI overviews, voice search results, and chatbot responses. Powered by Search Influence - AI SEO Experts.';
      const summaryLines = pdf.splitTextToSize(summaryText, contentWidth);
      summaryLines.forEach((line: string) => {
        pdf.text(line, margin, yPos);
        yPos += 5;
      });
      yPos += 10;

      // Score Breakdown
      checkPageBreak(40);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Score Breakdown', margin, yPos);
      yPos += 15;
      
      // Score table headers
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Category', margin, yPos);
      pdf.text('Score', margin + 80, yPos);
      pdf.text('Status', margin + 120, yPos);
      yPos += 8;
      
      // Table separator line
      pdf.line(margin, yPos, margin + 170, yPos);
      yPos += 8;
      
      // Score table rows
      pdf.setFontSize(10);
      const scores = [
        ['AI Optimization', analysis.aiOptimization.score, analysis.aiOptimization.status],
        ['Content Quality', analysis.contentQuality.score, analysis.contentQuality.status],
        ['Technical SEO', analysis.technicalSEO.score, analysis.technicalSEO.status],
        ['Authority & Trust', analysis.authority.score, analysis.authority.status],
        ['User Experience', analysis.userExperience.score, analysis.userExperience.status],
        ['Content Structure', analysis.contentStructure.score, analysis.contentStructure.status]
      ];
      
      scores.forEach((scoreData) => {
        const category = scoreData[0] as string;
        const score = scoreData[1] as number;
        const status = scoreData[2] as string;
        
        pdf.setFont('helvetica', 'bold');
        pdf.text(category, margin, yPos);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${score}%`, margin + 80, yPos);
        pdf.text(status, margin + 120, yPos);
        yPos += 8;
      });
      yPos += 15;

      // Detailed Analysis Sections
      const sections = [
        {
          title: 'AI Optimization',
          data: analysis.aiOptimization,
          subtitle: 'Optimized for AI search engines by Search Influence - AI SEO Experts',
          detailedScores: [
            ['Chunkability', analysis.aiOptimization.chunkability],
            ['Q&A Format', analysis.aiOptimization.qaFormat],
            ['Entity Recognition', analysis.aiOptimization.entityRecognition],
            ['Factual Density', analysis.aiOptimization.factualDensity],
            ['Semantic Clarity', analysis.aiOptimization.semanticClarity]
          ]
        },
        {
          title: 'Content Quality',
          data: analysis.contentQuality,
          subtitle: 'Content optimization powered by Search Influence - AI SEO Experts',
          detailedScores: [
            ['Long-tail Keywords', analysis.contentQuality.longTailKeywords],
            ['Comprehensive Coverage', analysis.contentQuality.comprehensiveCoverage],
            ['Relevance to User Intent', analysis.contentQuality.relevanceToUserIntent],
            ['Accuracy and Currency', analysis.contentQuality.accuracyAndCurrency],
            ['Natural Language', analysis.contentQuality.naturalLanguage]
          ]
        },
        {
          title: 'Technical SEO',
          data: analysis.technicalSEO,
          subtitle: 'Technical optimization by Search Influence - AI SEO Experts',
          detailedScores: [
            ['Heading Structure', analysis.technicalSEO.headingStructure],
            ['Meta Info', analysis.technicalSEO.metaInfo],
            ['Alt Text', analysis.technicalSEO.altText],
            ['Links', analysis.technicalSEO.links]
          ]
        },
        {
          title: 'Authority & Trust',
          data: analysis.authority,
          subtitle: 'Authority building strategies from Search Influence - AI SEO Experts',
          detailedScores: [
            ['Social Media Presence', analysis.authority.socialMediaPresence],
            ['Company Information', analysis.authority.companyInformation],
            ['Legal Compliance', analysis.authority.legalCompliance],
            ['Testimonials', analysis.authority.testimonials],
            ['Affiliations', analysis.authority.affiliations]
          ]
        },
        {
          title: 'User Experience',
          data: analysis.userExperience,
          subtitle: 'UX optimization by Search Influence - AI SEO Experts',
          detailedScores: [
            ['Contact Info', analysis.userExperience.contactInfo],
            ['Calls to Action', analysis.userExperience.callsToAction],
            ['Language', analysis.userExperience.language]
          ]
        },
        {
          title: 'Content Structure',
          data: analysis.contentStructure,
          subtitle: 'Content structure optimization by Search Influence - AI SEO Experts',
          detailedScores: [
            ['Structured Content', analysis.contentStructure.structuredContent],
            ['Multimedia', analysis.contentStructure.multimedia],
            ['Readability', analysis.contentStructure.readability]
          ]
        }
      ];

      sections.forEach((section) => {
        checkPageBreak(80);
        
        // Section header
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${section.title} (${section.data.score}%)`, margin, yPos);
        yPos += 8;
        
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'italic');
        pdf.text(section.subtitle, margin, yPos);
        yPos += 8;
        
        // Key Findings
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Key Findings:', margin, yPos);
        yPos += 8;
        
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        section.data.findings.forEach(finding => {
          const lines = pdf.splitTextToSize(`- ${finding}`, contentWidth);
          lines.forEach((line: string) => {
            checkPageBreak(5);
            pdf.text(line, margin + 5, yPos);
            yPos += 5;
          });
          yPos += 2;
        });
        
        // Recommendations
        yPos += 5;
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Recommendations:', margin, yPos);
        yPos += 8;
        
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        section.data.recommendations.forEach(rec => {
          const lines = pdf.splitTextToSize(`- ${rec}`, contentWidth);
          lines.forEach((line: string) => {
            checkPageBreak(5);
            pdf.text(line, margin + 5, yPos);
            yPos += 5;
          });
          yPos += 2;
        });
        
        // Detailed Scores
        yPos += 5;
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Detailed Scores:', margin, yPos);
        yPos += 8;
        
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        section.detailedScores.forEach(([label, score]) => {
          pdf.text(`- ${label}: ${score}%`, margin + 5, yPos);
          yPos += 5;
        });
        
        yPos += 10;
      });

      // Priority Content Improvements
      if (analysis.contentImprovements.length > 0) {
        checkPageBreak(40);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Priority Content Improvements', margin, yPos);
        yPos += 8;
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        pdf.text('Strategic improvements recommended by Search Influence - AI SEO Experts', margin, yPos);
        yPos += 15;

        analysis.contentImprovements.forEach((improvement, index) => {
          checkPageBreak(40);
          
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`${index + 1}. ${improvement.section}`, margin, yPos);
          yPos += 8;
          
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'normal');
          
          const currentLines = pdf.splitTextToSize(`Current: ${improvement.current}`, contentWidth);
          currentLines.forEach((line: string) => {
            checkPageBreak(5);
            pdf.text(line, margin + 5, yPos);
            yPos += 5;
          });
          yPos += 2;
          
          const improvedLines = pdf.splitTextToSize(`Improved: ${improvement.improved}`, contentWidth);
          improvedLines.forEach((line: string) => {
            checkPageBreak(5);
            pdf.text(line, margin + 5, yPos);
            yPos += 5;
          });
          yPos += 2;
          
          const reasoningLines = pdf.splitTextToSize(`Why this helps: ${improvement.reasoning}`, contentWidth);
          reasoningLines.forEach((line: string) => {
            checkPageBreak(5);
            pdf.text(line, margin + 5, yPos);
            yPos += 5;
          });
          yPos += 8;
        });
      }

      // Next Steps
      checkPageBreak(30);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Next Steps', margin, yPos);
      yPos += 8;
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      const nextSteps = [
        'Focus on AI Optimization - This is the most impactful area for future search visibility',
        'Implement Priority Improvements - Start with the content improvements listed above',
        'Monitor Progress - Re-run this analysis after implementing changes',
        'Stay Updated - AI search algorithms evolve rapidly; regular audits are recommended'
      ];
      nextSteps.forEach((step, index) => {
        const lines = pdf.splitTextToSize(`${index + 1}. ${step}`, contentWidth);
        lines.forEach((line: string) => {
          checkPageBreak(5);
          pdf.text(line, margin + 5, yPos);
          yPos += 5;
        });
        yPos += 2;
      });

      // Footer
      yPos += 10;
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      const footerText = 'Report generated by AI Website Grader - Optimizing content for the AI-powered search future. Powered by Search Influence - AI SEO Experts.';
      const footerLines = pdf.splitTextToSize(footerText, contentWidth);
      footerLines.forEach((line: string) => {
        checkPageBreak(5);
        pdf.text(line, margin, yPos);
        yPos += 5;
      });
      
      // Add metadata
      pdf.setProperties({
        title: `AI Website Grader Report - ${analysis.title}`,
        subject: 'Website Analysis Report',
        author: 'AI Website Grader',
        creator: 'AI Website Grader'
      });

      // Download the PDF
      const fileName = `ai-grader-report-${analysis.url.replace(/[^a-z0-9]/gi, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      console.log('Fallback PDF generated successfully');
    }

  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        throw new Error('Report element not found. Please refresh the page and try again.');
      } else if (error.message.includes('not visible')) {
        throw new Error('Report is not fully loaded. Please wait a moment and try again.');
      } else {
        throw new Error(`PDF generation failed: ${error.message}`);
      }
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
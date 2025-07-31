
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
    // Generate the markdown content
    const markdownContent = generateMarkdownReport(analysis);
    
    // Create PDF with markdown content
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
    
    // Helper function to round numbers
    const round = (num: number) => Math.round(num * 100) / 100;
    
    // Split markdown content into lines
    const lines = markdownContent.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (!line) {
        yPos += 5;
        continue;
      }
      
      // Handle headers
      if (line.startsWith('# ')) {
        checkPageBreak(15);
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(line.substring(2), margin, yPos);
        yPos += 15;
      } else if (line.startsWith('## ')) {
        checkPageBreak(12);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(line.substring(3), margin, yPos);
        yPos += 12;
      } else if (line.startsWith('### ')) {
        checkPageBreak(10);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(line.substring(4), margin, yPos);
        yPos += 10;
      } else if (line.startsWith('**') && line.endsWith('**')) {
        // Bold text
        checkPageBreak(8);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(line.substring(2, line.length - 2), margin, yPos);
        yPos += 8;
      } else if (line.startsWith('|')) {
        // Table row - handle table rendering
        if (line.includes('Category') && line.includes('Score') && line.includes('Status')) {
          // Table header
          checkPageBreak(20);
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'bold');
          
          // Draw table headers
          pdf.text('Category', margin, yPos);
          pdf.text('Score', margin + 80, yPos);
          pdf.text('Status', margin + 120, yPos);
          yPos += 8;
          
          // Draw separator line
          pdf.line(margin, yPos, margin + 170, yPos);
          yPos += 8;
          
          // Add table data
          const scores = [
            ['AI Optimization', round(analysis.aiOptimization.score), analysis.aiOptimization.status],
            ['Content Quality', round(analysis.contentQuality.score), analysis.contentQuality.status],
            ['Technical SEO', round(analysis.technicalSEO.score), analysis.technicalSEO.status],
            ['Authority & Trust', round(analysis.authority.score), analysis.authority.status],
            ['User Experience', round(analysis.userExperience.score), analysis.userExperience.status],
            ['Content Structure', round(analysis.contentStructure.score), analysis.contentStructure.status]
          ];
          
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'normal');
          scores.forEach((scoreData) => {
            const category = scoreData[0] as string;
            const score = scoreData[1] as number;
            const status = scoreData[2] as string;
            
            pdf.setFont('helvetica', 'bold');
            pdf.text(category, margin, yPos);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`${score}%`, margin + 80, yPos);
            pdf.text(status, margin + 120, yPos);
            yPos += 6;
          });
          yPos += 10;
        }
        continue;
      } else if (line.startsWith('- ')) {
        // List item
        const text = line.substring(2);
        const wrappedLines = pdf.splitTextToSize(`• ${text}`, contentWidth);
        wrappedLines.forEach((wrappedLine: string) => {
          checkPageBreak(5);
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'normal');
          pdf.text(wrappedLine, margin + 5, yPos);
          yPos += 5;
        });
        yPos += 2;
      } else if (line.startsWith('*') && line.endsWith('*')) {
        // Italic text
        checkPageBreak(8);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'italic');
        pdf.text(line.substring(1, line.length - 1), margin, yPos);
        yPos += 8;
      } else if (line.includes('[') && line.includes('](') && line.includes(')')) {
        // Link - extract text and URL
        const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          const linkText = linkMatch[1];
          const linkUrl = linkMatch[2];
          const textBefore = line.substring(0, line.indexOf('['));
          const textAfter = line.substring(line.indexOf(')') + 1);
          
          if (textBefore.trim()) {
            const wrappedLines = pdf.splitTextToSize(textBefore, contentWidth);
            wrappedLines.forEach((wrappedLine: string) => {
              checkPageBreak(5);
              pdf.setFontSize(9);
              pdf.setFont('helvetica', 'normal');
              pdf.text(wrappedLine, margin, yPos);
              yPos += 5;
            });
          }
          
          // Add link text with blue color
          checkPageBreak(5);
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(0, 0, 255);
          pdf.text(linkText, margin, yPos);
          pdf.setTextColor(0, 0, 0);
          yPos += 5;
          
          if (textAfter.trim()) {
            const wrappedLines = pdf.splitTextToSize(textAfter, contentWidth);
            wrappedLines.forEach((wrappedLine: string) => {
              checkPageBreak(5);
              pdf.setFontSize(9);
              pdf.setFont('helvetica', 'normal');
              pdf.text(wrappedLine, margin, yPos);
              yPos += 5;
            });
          }
        }
      } else {
        // Regular text
        const wrappedLines = pdf.splitTextToSize(line, contentWidth);
        wrappedLines.forEach((wrappedLine: string) => {
          checkPageBreak(5);
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'normal');
          pdf.text(wrappedLine, margin, yPos);
          yPos += 5;
        });
        yPos += 2;
      }
    }
    
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

    console.log('PDF generated successfully from markdown');

  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Provide more specific error messages
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
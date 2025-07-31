import { WebsiteAnalysis, CrawledContent, ContentImprovement, AnalysisScore } from '@/types';
import { crawlWebsite, parseTextContent } from './crawler';
import { 
  analyzeTechnicalSEO, 
  analyzeContentQuality, 
  analyzeAIOptimization, 
  analyzeAuthority, 
  analyzeUserExperience,
  analyzeContentStructure
} from './analyzer';

export async function analyzeWebsite(url: string, textContent?: string): Promise<WebsiteAnalysis> {
  let content: CrawledContent;
  
  try {
    if (textContent) {
      // Use provided text content
      content = parseTextContent(textContent);
      content.title = content.title || 'Manual Content Analysis';
    } else {
      // Crawl the website
      content = await crawlWebsite(url);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Check if it's a crawling-related error
    if (errorMessage.includes('aborted') || errorMessage.includes('timeout') || errorMessage.includes('Failed to crawl')) {
      throw new Error(`Website crawling failed. This can happen due to:

• Website blocking automated requests
• Network connectivity issues  
• Website requiring JavaScript

💡 Solution: Please reload the page, then click the "Analyze Text" tab above and paste your website content directly.`);
    }
    
    throw new Error(`Failed to analyze website: ${errorMessage}`);
  }
  
  // Run all analyses
  const technicalSEO = analyzeTechnicalSEO(content);
  const contentQuality = analyzeContentQuality(content);
  const aiOptimization = analyzeAIOptimization(content);
  const authority = analyzeAuthority(content);
  const userExperience = analyzeUserExperience(content);
  const contentStructure = analyzeContentStructure(content);
  
  // Calculate weighted overall score
  const overallScore = calculateOverallScore({
    technicalSEO: technicalSEO.score,
    contentQuality: contentQuality.score,
    aiOptimization: aiOptimization.score,
    authority: authority.score,
    userExperience: userExperience.score,
    contentStructure: contentStructure.score
  });
  
  // Generate content improvements
  const contentImprovements = generateContentImprovements({
    url: textContent ? 'manual-input' : url,
    title: content.title,
    overallScore,
    timestamp: new Date().toISOString(),
    technicalSEO,
    contentQuality,
    aiOptimization,
    authority,
    userExperience,
    contentStructure,
    contentImprovements: []
  });
  
  return {
    url: textContent ? 'manual-input' : url,
    title: content.title,
    overallScore,
    timestamp: new Date().toISOString(),
    technicalSEO,
    contentQuality,
    aiOptimization,
    authority,
    userExperience,
    contentStructure,
    contentImprovements
  };
}

export function calculateOverallScore(scores: {
  technicalSEO: number;
  contentQuality: number;
  aiOptimization: number;
  authority: number;
  userExperience: number;
  contentStructure: number;
}): number {
  // Weighted scoring - AI optimization is most important
  const weights = {
    aiOptimization: 0.25,      // 25% - Most important for AI search
    contentQuality: 0.20,      // 20% - Quality content is crucial
    technicalSEO: 0.20,        // 20% - Technical foundation
    authority: 0.15,           // 15% - Trust and credibility
    userExperience: 0.10,      // 10% - User experience
    contentStructure: 0.10     // 10% - Content structure
  };
  
  const weightedScore = 
    scores.aiOptimization * weights.aiOptimization +
    scores.contentQuality * weights.contentQuality +
    scores.technicalSEO * weights.technicalSEO +
    scores.authority * weights.authority +
    scores.userExperience * weights.userExperience +
    scores.contentStructure * weights.contentStructure;
  
  return Math.round(weightedScore);
}

export function generateContentImprovements(analysis: WebsiteAnalysis): ContentImprovement[] {
  const improvements: ContentImprovement[] = [];
  
  // Comprehensive improvement mapping for each category
  const improvementStrategies = {
    'AI Optimization': {
      lowScore: (score: number) => score < 70,
      improvements: [
        {
          current: 'Content lacks structured Q&A format',
          improved: 'Add FAQ sections with clear questions and detailed answers. Use schema markup for FAQ pages to help AI understand your content structure.',
          reasoning: 'AI search engines prioritize content that directly answers user questions. FAQ format improves chunkability and semantic clarity.'
        },
        {
          current: 'Limited entity recognition and factual density',
          improved: 'Include specific facts, statistics, and named entities. Add industry-specific terminology and proper nouns that AI can recognize and index.',
          reasoning: 'Higher factual density helps AI understand your content\'s authority and relevance to specific search queries.'
        },
        {
          current: 'Content lacks semantic clarity',
          improved: 'Use clear, unambiguous language. Define technical terms, use consistent terminology, and structure content with logical flow.',
          reasoning: 'Semantic clarity helps AI understand context and relationships between concepts, improving search relevance.'
        }
      ]
    },
    'Content Quality': {
      lowScore: (score: number) => score < 75,
      improvements: [
        {
          current: 'Insufficient long-tail keyword coverage',
          improved: 'Research and incorporate 15-20 long-tail keywords naturally throughout your content. Focus on specific user intent and search queries.',
          reasoning: 'Long-tail keywords capture specific search intent and often have less competition, improving search visibility.'
        },
        {
          current: 'Content lacks comprehensive coverage',
          improved: 'Expand content to cover all aspects of the topic. Include background information, step-by-step guides, and address common questions.',
          reasoning: 'Comprehensive content satisfies user intent better and signals expertise to search engines.'
        },
        {
          current: 'Limited relevance to user intent',
          improved: 'Analyze search intent and align content with what users actually want to know. Include practical examples and actionable advice.',
          reasoning: 'Content that matches user intent receives higher engagement and better search rankings.'
        }
      ]
    },
    'Technical SEO': {
      lowScore: (score: number) => score < 80,
      improvements: [
        {
          current: 'Poor heading structure and hierarchy',
          improved: 'Implement proper H1-H6 hierarchy. Use H1 for main title, H2 for major sections, H3 for subsections. Include target keywords in headings.',
          reasoning: 'Proper heading structure helps search engines understand content organization and improves readability.'
        },
        {
          current: 'Missing or poor meta descriptions',
          improved: 'Create compelling meta descriptions (150-160 characters) that include target keywords and encourage clicks. Make each unique and descriptive.',
          reasoning: 'Meta descriptions appear in search results and influence click-through rates, which affects rankings.'
        },
        {
          current: 'Images missing alt text',
          improved: 'Add descriptive alt text to all images. Include relevant keywords naturally and describe the image content for accessibility.',
          reasoning: 'Alt text helps search engines understand image content and improves accessibility for users with screen readers.'
        }
      ]
    },
    'Authority': {
      lowScore: (score: number) => score < 70,
      improvements: [
        {
          current: 'Limited social media presence',
          improved: 'Add social media links and encourage sharing. Include social proof, testimonials, and industry recognition on your website.',
          reasoning: 'Social signals and external mentions build domain authority and trust with search engines.'
        },
        {
          current: 'Missing company information and credentials',
          improved: 'Add detailed About Us page, team bios, certifications, awards, and industry affiliations. Include contact information and business hours.',
          reasoning: 'Comprehensive company information builds trust and signals legitimacy to both users and search engines.'
        },
        {
          current: 'Lack of testimonials and reviews',
          improved: 'Display customer testimonials, case studies, and reviews prominently. Include client logos and success stories where appropriate.',
          reasoning: 'Social proof increases credibility and can improve click-through rates from search results.'
        }
      ]
    },
    'User Experience': {
      lowScore: (score: number) => score < 75,
      improvements: [
        {
          current: 'Poor contact information visibility',
          improved: 'Display contact information prominently in header, footer, and contact page. Include phone, email, address, and business hours.',
          reasoning: 'Easy-to-find contact information improves user experience and can increase local search visibility.'
        },
        {
          current: 'Weak calls-to-action',
          improved: 'Add clear, compelling CTAs throughout the page. Use action-oriented language and make buttons visually prominent.',
          reasoning: 'Strong CTAs improve user engagement and conversion rates, which positively impacts search rankings.'
        },
        {
          current: 'Language accessibility issues',
          improved: 'Use clear, simple language. Avoid jargon, write in active voice, and ensure content is accessible to your target audience.',
          reasoning: 'Clear language improves readability and user engagement, which search engines reward.'
        }
      ]
    },
    'Content Structure': {
      lowScore: (score: number) => score < 75,
      improvements: [
        {
          current: 'Poor content structure and organization',
          improved: 'Use bullet points, numbered lists, and clear sections. Break up long paragraphs and use white space effectively.',
          reasoning: 'Well-structured content is easier to read and scan, improving user engagement and time on page.'
        },
        {
          current: 'Limited multimedia content',
          improved: 'Add relevant images, videos, infographics, and interactive elements. Ensure all media is optimized and includes proper alt text.',
          reasoning: 'Multimedia content increases engagement and provides additional ranking opportunities through image and video search.'
        },
        {
          current: 'Poor readability and formatting',
          improved: 'Use short paragraphs, clear fonts, and adequate spacing. Include subheadings and use formatting to highlight key points.',
          reasoning: 'Improved readability increases time on page and reduces bounce rate, both positive ranking signals.'
        }
      ]
    }
  };

  // Generate improvements for all categories that need them
  Object.entries(improvementStrategies).forEach(([category, strategy]) => {
    const categoryKey = category === 'AI Optimization' ? 'aiOptimization' : 
                       category === 'Content Quality' ? 'contentQuality' :
                       category === 'Technical SEO' ? 'technicalSEO' :
                       category === 'User Experience' ? 'userExperience' :
                       category === 'Content Structure' ? 'contentStructure' :
                       'authority';
    
    const score = analysis[categoryKey as keyof WebsiteAnalysis] as AnalysisScore;
    
    if (strategy.lowScore(score.score)) {
      // Add multiple improvements for low-scoring areas
      strategy.improvements.forEach((improvement, index) => {
        improvements.push({
          section: category,
          current: improvement.current,
          improved: improvement.improved,
          reasoning: improvement.reasoning
        });
      });
    }
  });

  // Add priority improvements for very low scores
  const criticalAreas = Object.entries(improvementStrategies).filter(([category, strategy]) => {
    const categoryKey = category === 'AI Optimization' ? 'aiOptimization' : 
                       category === 'Content Quality' ? 'contentQuality' :
                       category === 'Technical SEO' ? 'technicalSEO' :
                       category === 'User Experience' ? 'userExperience' :
                       category === 'Content Structure' ? 'contentStructure' :
                       'authority';
    
    const score = analysis[categoryKey as keyof WebsiteAnalysis] as AnalysisScore;
    return score.score < 50;
  });

  if (criticalAreas.length > 0) {
    improvements.unshift({
      section: 'Priority Action',
      current: `Multiple areas scoring below 50%: ${criticalAreas.map(([cat]) => cat).join(', ')}`,
      improved: 'Focus on these critical areas first as they have the biggest impact on your search visibility and user experience.',
      reasoning: 'Areas scoring below 50% represent significant opportunities for improvement and should be addressed before optimizing higher-scoring areas.'
    });
  }

  // Add overall strategy improvement
  if (analysis.overallScore < 70) {
    improvements.push({
      section: 'Overall Strategy',
      current: `Overall score of ${analysis.overallScore}% indicates room for improvement across multiple areas`,
      improved: 'Implement a comprehensive SEO strategy focusing on content quality, technical optimization, and user experience simultaneously.',
      reasoning: 'Holistic improvements across all areas will provide the best long-term results for search visibility and user engagement.'
    });
  }

  return improvements;
} 
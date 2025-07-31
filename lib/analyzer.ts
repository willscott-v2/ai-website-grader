import { CrawledContent, TechnicalSEO, ContentQuality, AIOptimization, Authority, UserExperience, ContentStructure } from '@/types';

export function analyzeTechnicalSEO(content: CrawledContent): TechnicalSEO {
  const findings: string[] = [];
  const recommendations: string[] = [];
  
  // Analyze heading structure
  const headingStructure = analyzeHeadingHierarchy(content.headings);
  if (headingStructure < 70) {
    findings.push('Heading structure needs improvement');
    recommendations.push('Implement proper H1-H6 hierarchy with one H1 per page. Use H2 for major sections, H3 for subsections. Include target keywords naturally in headings. Ensure logical flow from H1→H2→H3.');
  }
  
  // Analyze meta information
  const metaInfo = analyzeMetaInformation(content);
  if (metaInfo < 70) {
    findings.push('Meta information is incomplete or unoptimized');
    recommendations.push('Create compelling meta descriptions (150-160 characters) that include target keywords and encourage clicks. Optimize title tags to be descriptive and include primary keywords. Make each meta description unique and action-oriented.');
  }
  
  // Analyze alt text
  const altText = analyzeAltText(content.images);
  if (altText < 70) {
    findings.push('Images missing descriptive alt text');
    recommendations.push('Add descriptive alt text to all images that includes relevant keywords naturally. Describe the image content for accessibility while incorporating target keywords. Avoid keyword stuffing in alt text.');
  }
  
  // Analyze links
  const links = analyzeLinkQuality(content.links);
  if (links < 70) {
    findings.push('Link structure could be improved');
    recommendations.push('Improve internal linking with descriptive anchor text. Ensure external links are relevant, authoritative, and open in new tabs. Add contextual links throughout content to guide users and search engines.');
  }
  
  const score = Math.round((headingStructure + metaInfo + altText + links) / 4);
  const status = getScoreStatus(score);
  
  return {
    score,
    status,
    findings,
    recommendations,
    headingStructure,
    metaInfo,
    altText,
    links
  };
}

export function analyzeContentQuality(content: CrawledContent): ContentQuality {
  const findings: string[] = [];
  const recommendations: string[] = [];
  
  // Analyze long-tail keywords
  const longTailKeywords = analyzeLongTailKeywords(content.paragraphs);
  if (longTailKeywords < 70) {
    findings.push('Limited use of long-tail keywords and conversational phrases');
    recommendations.push('Research and incorporate 15-20 long-tail keywords naturally throughout your content. Focus on specific user intent, question-based phrases, and conversational terms that match voice search patterns. Use tools like Answer the Public or Google Keyword Planner to identify opportunities.');
  }
  
  // Analyze content depth
  const comprehensiveCoverage = analyzeContentDepth(content);
  if (comprehensiveCoverage < 70) {
    findings.push('Content lacks comprehensive coverage of the topic');
    recommendations.push('Expand content to thoroughly cover all aspects of the topic. Include background information, step-by-step guides, common questions, examples, case studies, and actionable takeaways. Aim for 1500+ words for comprehensive coverage.');
  }
  
  // Analyze relevance
  const relevanceToUserIntent = analyzeRelevance(content);
  if (relevanceToUserIntent < 70) {
    findings.push('Content may not fully address user search intent');
    recommendations.push('Analyze search intent and align content with what users actually want to know. Include practical examples, actionable advice, and directly answer common questions. Use tools like Google\'s "People also ask" to identify user needs.');
  }
  
  // Analyze accuracy indicators
  const accuracyAndCurrency = analyzeAccuracy(content);
  if (accuracyAndCurrency < 70) {
    findings.push('Content lacks indicators of accuracy and currency');
    recommendations.push('Add publication dates, author information, credentials, and cite authoritative sources. Include "last updated" timestamps and link to reputable sources. Consider adding expert quotes or industry statistics to build credibility.');
  }
  
  // Analyze natural language
  const naturalLanguage = analyzeNaturalLanguage(content.paragraphs);
  if (naturalLanguage < 70) {
    findings.push('Language could be more natural and conversational');
    recommendations.push('Use more natural, conversational language that matches how people speak. Write in active voice, use contractions, and include personal pronouns. Avoid overly formal or technical language unless necessary for your audience.');
  }
  
  const score = Math.round((longTailKeywords + comprehensiveCoverage + relevanceToUserIntent + accuracyAndCurrency + naturalLanguage) / 5);
  const status = getScoreStatus(score);
  
  return {
    score,
    status,
    findings,
    recommendations,
    longTailKeywords,
    comprehensiveCoverage,
    relevanceToUserIntent,
    accuracyAndCurrency,
    naturalLanguage
  };
}

export function analyzeAIOptimization(content: CrawledContent): AIOptimization {
  const findings: string[] = [];
  const recommendations: string[] = [];
  
  // Analyze chunkability - critical for AI systems
  const chunkability = analyzeChunkability(content.paragraphs);
  if (chunkability < 70) {
    findings.push('Content paragraphs are too long for optimal AI processing');
    recommendations.push('Break content into shorter, focused chunks of 2-4 sentences each. Use bullet points, numbered lists, and clear section breaks to improve AI chunkability and readability.');
  }
  
  // Analyze Q&A format
  const qaFormat = analyzeQAFormat(content);
  if (qaFormat < 70) {
    findings.push('Content lacks clear question-answer formatting');
    recommendations.push('Structure content with clear questions followed by direct, concise answers. Add FAQ sections and use schema markup for FAQ pages to help AI understand your content structure.');
  }
  
  // Analyze entity recognition
  const entityRecognition = analyzeEntityRecognition(content);
  if (entityRecognition < 70) {
    findings.push('Limited use of clearly defined entities (people, places, brands)');
    recommendations.push('Clearly mention and define key entities, people, places, and concepts. Include specific names, dates, locations, and industry terminology that AI can recognize and index.');
  }
  
  // Analyze factual density
  const factualDensity = analyzeFactualDensity(content.paragraphs);
  if (factualDensity < 70) {
    findings.push('Content has low fact-to-fluff ratio');
    recommendations.push('Increase information density by including more specific facts, data, statistics, and concrete details. Replace vague statements with specific, verifiable information.');
  }
  
  // Analyze semantic clarity
  const semanticClarity = analyzeSemanticClarity(content.paragraphs);
  if (semanticClarity < 70) {
    findings.push('Content contains ambiguous language that may confuse AI systems');
    recommendations.push('Use clear, unambiguous language and define technical terms explicitly. Avoid jargon, use consistent terminology, and structure content with logical flow to improve AI understanding.');
  }
  
  const score = Math.round((chunkability + qaFormat + entityRecognition + factualDensity + semanticClarity) / 5);
  const status = getScoreStatus(score);
  
  return {
    score,
    status,
    findings,
    recommendations,
    chunkability,
    qaFormat,
    entityRecognition,
    factualDensity,
    semanticClarity
  };
}

export function analyzeAuthority(content: CrawledContent): Authority {
  const findings: string[] = [];
  const recommendations: string[] = [];
  
  // Analyze social media presence indicators
  const socialMediaPresence = analyzeSocialMediaPresence(content);
  if (socialMediaPresence < 70) {
    findings.push('Limited social media presence indicators');
    recommendations.push('Add social media links prominently in header/footer. Include social sharing buttons and encourage content sharing. Display follower counts and social proof where appropriate.');
  }
  
  // Analyze company information
  const companyInformation = analyzeCompanyInformation(content);
  if (companyInformation < 70) {
    findings.push('Company information could be more detailed');
    recommendations.push('Provide comprehensive company background, team information, credentials, mission statement, and company history. Include business hours, location, and service areas.');
  }
  
  // Analyze legal compliance
  const legalCompliance = analyzeLegalCompliance(content);
  if (legalCompliance < 70) {
    findings.push('Legal compliance information may be missing');
    recommendations.push('Ensure privacy policy, terms of service, legal disclaimers, and cookie policy are accessible. Include contact information for legal inquiries and ensure compliance with relevant regulations.');
  }
  
  // Analyze testimonials
  const testimonials = analyzeTestimonials(content);
  if (testimonials < 70) {
    findings.push('Limited social proof and testimonials');
    recommendations.push('Add customer testimonials, reviews, case studies, and success stories. Include client logos, industry recognition, and awards. Display testimonials prominently on homepage and service pages.');
  }
  
  // Analyze affiliations
  const affiliations = analyzeAffiliations(content);
  if (affiliations < 70) {
    findings.push('Professional affiliations and certifications not prominently displayed');
    recommendations.push('Highlight industry certifications, partnerships, professional memberships, and awards. Include logos of partner organizations and highlight relevant credentials or certifications.');
  }
  
  const score = Math.round((socialMediaPresence + companyInformation + legalCompliance + testimonials + affiliations) / 5);
  const status = getScoreStatus(score);
  
  return {
    score,
    status,
    findings,
    recommendations,
    socialMediaPresence,
    companyInformation,
    legalCompliance,
    testimonials,
    affiliations
  };
}

export function analyzeUserExperience(content: CrawledContent): UserExperience {
  const findings: string[] = [];
  const recommendations: string[] = [];
  
  // Analyze contact information
  const contactInfo = analyzeContactInfo(content);
  if (contactInfo < 70) {
    findings.push('Contact information is not easily accessible');
    recommendations.push('Display contact information prominently in header, footer, and contact page. Include phone, email, address, business hours, and contact forms. Make it visible on every page.');
  }
  
  // Analyze calls to action
  const callsToAction = analyzeCallsToAction(content);
  if (callsToAction < 70) {
    findings.push('Calls-to-action could be more compelling and strategically placed');
    recommendations.push('Add clear, compelling CTAs throughout the content. Use action-oriented language, make buttons visually prominent, and place CTAs strategically at the end of sections and pages.');
  }
  
  // Analyze language accessibility
  const language = analyzeLanguageAccessibility(content);
  if (language < 70) {
    findings.push('Language may not be accessible to all audiences');
    recommendations.push('Use clear, simple language appropriate for your target audience. Avoid jargon, write in active voice, and ensure content is accessible to users with different reading levels.');
  }
  
  const score = Math.round((contactInfo + callsToAction + language) / 3);
  const status = getScoreStatus(score);
  
  return {
    score,
    status,
    findings,
    recommendations,
    contactInfo,
    callsToAction,
    language
  };
}

export function analyzeContentStructure(content: CrawledContent): ContentStructure {
  const findings: string[] = [];
  const recommendations: string[] = [];
  
  // Analyze structured content
  const structuredContent = analyzeStructuredContent(content);
  if (structuredContent < 70) {
    findings.push('Content structure could be more scannable');
    recommendations.push('Use more bullet points, numbered lists, clear sections, and structured formatting. Break up long paragraphs, use white space effectively, and organize content with clear headings and subheadings.');
  }
  
  // Analyze multimedia usage
  const multimedia = analyzeMultimedia(content);
  if (multimedia < 70) {
    findings.push('Limited use of multimedia elements');
    recommendations.push('Incorporate relevant images, videos, infographics, and interactive elements. Ensure all media is optimized, includes proper alt text, and enhances the user experience without slowing page load.');
  }
  
  // Analyze readability (moved from Technical SEO)
  const readability = analyzeReadability(content.paragraphs);
  if (readability < 70) {
    findings.push('Content readability needs improvement');
    recommendations.push('Use shorter sentences and paragraphs for better readability. Aim for 2-3 sentences per paragraph and use clear, simple language. Include subheadings and use formatting to highlight key points.');
  }
  
  const score = Math.round((structuredContent + multimedia + readability) / 3);
  const status = getScoreStatus(score);
  
  return {
    score,
    status,
    findings,
    recommendations,
    structuredContent,
    multimedia,
    readability
  };
}

// Helper functions for analysis
function analyzeHeadingHierarchy(headings: { level: number; text: string }[]): number {
  if (headings.length === 0) return 0;
  
  const h1Count = headings.filter(h => h.level === 1).length;
  if (h1Count !== 1) return 40; // Should have exactly one H1
  
  let score = 70;
  let prevLevel = 0;
  
  for (const heading of headings) {
    if (heading.level > prevLevel + 1) {
      score -= 10; // Skipped heading level
    }
    prevLevel = heading.level;
  }
  
  return Math.max(0, score);
}

function analyzeMetaInformation(content: CrawledContent): number {
  let score = 0;
  
  if (content.title && content.title.length > 0) score += 40;
  if (content.title && content.title.length >= 30 && content.title.length <= 60) score += 20;
  if (content.metaDescription && content.metaDescription.length > 0) score += 20;
  if (content.metaDescription && content.metaDescription.length >= 150 && content.metaDescription.length <= 160) score += 20;
  
  return score;
}

function analyzeAltText(images: { src: string; alt: string }[]): number {
  if (images.length === 0) return 100; // No images to analyze
  
  const imagesWithAlt = images.filter(img => img.alt && img.alt.trim().length > 0);
  return Math.round((imagesWithAlt.length / images.length) * 100);
}

function analyzeLinkQuality(links: { href: string; text: string; internal: boolean }[]): number {
  if (links.length === 0) return 50;
  
  const internalLinks = links.filter(link => link.internal).length;
  const externalLinks = links.filter(link => !link.internal).length;
  const descriptiveLinks = links.filter(link => 
    link.text.length > 5 && 
    !link.text.toLowerCase().includes('click here') && 
    !link.text.toLowerCase().includes('read more')
  ).length;
  
  let score = 50;
  if (internalLinks > 0) score += 20;
  if (externalLinks > 0) score += 10;
  if (descriptiveLinks / links.length > 0.8) score += 20;
  
  return Math.min(100, score);
}

function analyzeReadability(paragraphs: string[]): number {
  if (paragraphs.length === 0) return 0;
  
  const avgWordsPerParagraph = paragraphs.reduce((sum, p) => sum + p.split(' ').length, 0) / paragraphs.length;
  const avgSentencesPerParagraph = paragraphs.reduce((sum, p) => sum + p.split(/[.!?]+/).length, 0) / paragraphs.length;
  
  let score = 70;
  if (avgWordsPerParagraph > 100) score -= 20;
  if (avgSentencesPerParagraph > 5) score -= 10;
  
  return Math.max(0, score);
}

function analyzeLongTailKeywords(paragraphs: string[]): number {
  const text = paragraphs.join(' ').toLowerCase();
  const questionWords = ['how', 'what', 'why', 'when', 'where', 'which', 'who'];
  const questionPhrases = questionWords.filter(word => text.includes(word)).length;
  
  return Math.min(100, questionPhrases * 15);
}

function analyzeContentDepth(content: CrawledContent): number {
  const wordCount = content.wordCount;
  const headingCount = content.headings.length;
  const paragraphCount = content.paragraphs.length;
  
  let score = 0;
  if (wordCount > 300) score += 30;
  if (wordCount > 800) score += 20;
  if (headingCount > 3) score += 25;
  if (paragraphCount > 5) score += 25;
  
  return Math.min(100, score);
}

function analyzeRelevance(content: CrawledContent): number {
  // Simple relevance check based on title-content alignment
  const titleWords = content.title.toLowerCase().split(' ');
  const contentText = content.paragraphs.join(' ').toLowerCase();
  
  const titleWordsInContent = titleWords.filter(word => 
    word.length > 3 && contentText.includes(word)
  ).length;
  
  return Math.min(100, (titleWordsInContent / titleWords.length) * 100);
}

function analyzeAccuracy(content: CrawledContent): number {
  const text = content.paragraphs.join(' ').toLowerCase();
  const accuracyIndicators = [
    'published', 'updated', 'author', 'source', 'research', 'study', 
    'data', 'statistics', 'according to', 'based on'
  ];
  
  const foundIndicators = accuracyIndicators.filter(indicator => text.includes(indicator)).length;
  return Math.min(100, foundIndicators * 12);
}

function analyzeNaturalLanguage(paragraphs: string[]): number {
  const text = paragraphs.join(' ').toLowerCase();
  const conversationalWords = [
    'you', 'your', 'we', 'our', 'can', 'will', 'should', 'would', 
    'here\'s', 'let\'s', 'that\'s', 'it\'s', 'don\'t', 'won\'t'
  ];
  
  const conversationalCount = conversationalWords.filter(word => text.includes(word)).length;
  return Math.min(100, conversationalCount * 8);
}

function analyzeChunkability(paragraphs: string[]): number {
  if (paragraphs.length === 0) return 0;
  
  const idealChunks = paragraphs.filter(p => {
    const sentences = p.split(/[.!?]+/).filter(s => s.trim().length > 0);
    return sentences.length >= 2 && sentences.length <= 4 && p.length <= 300;
  }).length;
  
  return Math.round((idealChunks / paragraphs.length) * 100);
}

function analyzeQAFormat(content: CrawledContent): number {
  const text = content.paragraphs.join(' ').toLowerCase();
  const questionMarkers = text.match(/\?/g)?.length || 0;
  const headingQuestions = content.headings.filter(h => h.text.includes('?')).length;
  
  let score = 0;
  if (questionMarkers > 0) score += 40;
  if (headingQuestions > 0) score += 40;
  if (questionMarkers > 3) score += 20;
  
  return Math.min(100, score);
}

function analyzeEntityRecognition(content: CrawledContent): number {
  const text = content.paragraphs.join(' ');
  
  // Look for capitalized words (potential entities)
  const capitalizedWords = text.match(/\b[A-Z][a-z]+\b/g) || [];
  const uniqueEntities = new Set(capitalizedWords.filter(word => word.length > 2));
  
  return Math.min(100, uniqueEntities.size * 5);
}

function analyzeFactualDensity(paragraphs: string[]): number {
  const text = paragraphs.join(' ').toLowerCase();
  const factualWords = [
    'percent', '%', 'study', 'research', 'data', 'statistics', 'according to',
    'survey', 'report', 'analysis', 'found', 'shows', 'indicates', 'reveals'
  ];
  
  const factualCount = factualWords.filter(word => text.includes(word)).length;
  return Math.min(100, factualCount * 15);
}

function analyzeSemanticClarity(paragraphs: string[]): number {
  const text = paragraphs.join(' ').toLowerCase();
  const ambiguousWords = [
    'maybe', 'perhaps', 'might', 'could be', 'possibly', 'seems', 
    'appears', 'probably', 'likely', 'some', 'many', 'few'
  ];
  
  const ambiguousCount = ambiguousWords.filter(word => text.includes(word)).length;
  const totalWords = text.split(' ').length;
  
  return Math.max(0, 100 - (ambiguousCount / totalWords) * 1000);
}

function analyzeSocialMediaPresence(content: CrawledContent): number {
  const text = content.html.toLowerCase();
  const socialPlatforms = ['facebook', 'twitter', 'linkedin', 'instagram', 'youtube'];
  const foundPlatforms = socialPlatforms.filter(platform => text.includes(platform)).length;
  
  return foundPlatforms * 20;
}

function analyzeCompanyInformation(content: CrawledContent): number {
  const text = content.paragraphs.join(' ').toLowerCase();
  const companyIndicators = [
    'about us', 'our team', 'company', 'founded', 'established', 
    'mission', 'vision', 'values', 'experience', 'expertise'
  ];
  
  const foundIndicators = companyIndicators.filter(indicator => text.includes(indicator)).length;
  return Math.min(100, foundIndicators * 15);
}

function analyzeLegalCompliance(content: CrawledContent): number {
  const text = content.html.toLowerCase();
  const legalTerms = ['privacy policy', 'terms of service', 'cookie policy', 'gdpr', 'legal'];
  const foundTerms = legalTerms.filter(term => text.includes(term)).length;
  
  return Math.min(100, foundTerms * 25);
}

function analyzeTestimonials(content: CrawledContent): number {
  const text = content.paragraphs.join(' ').toLowerCase();
  const testimonialIndicators = [
    'testimonial', 'review', 'client says', 'customer', 'feedback',
    'satisfied', 'recommend', 'excellent service', 'great work'
  ];
  
  const foundIndicators = testimonialIndicators.filter(indicator => text.includes(indicator)).length;
  return Math.min(100, foundIndicators * 20);
}

function analyzeAffiliations(content: CrawledContent): number {
  const text = content.paragraphs.join(' ').toLowerCase();
  const affiliationIndicators = [
    'certified', 'accredited', 'member', 'association', 'partner',
    'award', 'recognition', 'licensed', 'qualified'
  ];
  
  const foundIndicators = affiliationIndicators.filter(indicator => text.includes(indicator)).length;
  return Math.min(100, foundIndicators * 15);
}

function analyzeContactInfo(content: CrawledContent): number {
  const text = content.html.toLowerCase();
  const contactIndicators = ['contact', 'phone', 'email', 'address', 'location'];
  const foundIndicators = contactIndicators.filter(indicator => text.includes(indicator)).length;
  
  return Math.min(100, foundIndicators * 25);
}

function analyzeCallsToAction(content: CrawledContent): number {
  const text = content.paragraphs.join(' ').toLowerCase();
  const ctaWords = [
    'contact us', 'get started', 'learn more', 'sign up', 'subscribe',
    'download', 'request', 'call now', 'book', 'schedule'
  ];
  
  const foundCTAs = ctaWords.filter(cta => text.includes(cta)).length;
  return Math.min(100, foundCTAs * 20);
}

function analyzeLanguageAccessibility(content: CrawledContent): number {
  const paragraphs = content.paragraphs;
  if (paragraphs.length === 0) return 0;
  
  const avgWordsPerSentence = paragraphs.reduce((sum, p) => {
    const sentences = p.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = sentences.reduce((wordSum, s) => wordSum + s.split(' ').length, 0);
    return sum + (sentences.length > 0 ? words / sentences.length : 0);
  }, 0) / paragraphs.length;
  
  // Optimal sentence length is 15-20 words
  if (avgWordsPerSentence >= 15 && avgWordsPerSentence <= 20) return 100;
  if (avgWordsPerSentence >= 10 && avgWordsPerSentence <= 25) return 80;
  return 60;
}

function analyzeStructuredContent(content: CrawledContent): number {
  const text = content.html.toLowerCase();
  const structureElements = ['<ul>', '<ol>', '<li>', '<table>', '<th>', '<td>'];
  const foundElements = structureElements.filter(element => text.includes(element)).length;
  
  return Math.min(100, foundElements * 20);
}

function analyzeMultimedia(content: CrawledContent): number {
  const imageCount = content.images.length;
  const videoCount = (content.html.match(/<video|<iframe.*youtube|<iframe.*vimeo/gi) || []).length;
  
  let score = 0;
  if (imageCount > 0) score += 50;
  if (imageCount > 3) score += 20;
  if (videoCount > 0) score += 30;
  
  return Math.min(100, score);
}

function getScoreStatus(score: number): 'excellent' | 'good' | 'needs-improvement' | 'poor' {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  if (score >= 40) return 'needs-improvement';
  return 'poor';
} 
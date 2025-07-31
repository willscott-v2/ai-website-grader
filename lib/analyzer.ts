import { CrawledContent, TechnicalSEO, ContentQuality, AIOptimization, Authority, UserExperience, ContentStructure, TechnicalCrawlability, MobileOptimization, SchemaAnalysis, RecommendationItem } from '@/types';

export function analyzeTechnicalSEO(content: CrawledContent): TechnicalSEO {
  const findings: string[] = [];
  const recommendations: RecommendationItem[] = [];
  
  // Analyze heading structure
  const headingStructure = analyzeHeadingHierarchy(content.headings);
  if (headingStructure < 70) {
    findings.push('Heading structure needs improvement');
    recommendations.push(createRecommendation(
      'Implement proper H1-H6 hierarchy with one H1 per page',
      'high',
      'heading-structure',
      '1. Ensure exactly one H1 tag per page\n2. Use H2 for major sections\n3. Use H3 for subsections\n4. Include target keywords naturally in headings\n5. Maintain logical hierarchy (H1→H2→H3)'
    ));
  }
  
  // Analyze meta information
  const metaInfo = analyzeMetaInformation(content);
  if (metaInfo < 70) {
    findings.push('Meta information is incomplete or unoptimized');
    recommendations.push(createRecommendation(
      'Create compelling meta descriptions and optimize title tags',
      'high',
      'meta-optimization',
      '1. Write meta descriptions 150-160 characters long\n2. Include target keywords naturally\n3. Make each meta description unique\n4. Create action-oriented descriptions\n5. Optimize title tags (30-60 characters)'
    ));
  }
  
  // Analyze alt text
  const altText = analyzeAltText(content.images);
  if (altText < 70) {
    findings.push('Images missing descriptive alt text');
    recommendations.push(createRecommendation(
      'Add descriptive alt text to all images',
      'medium',
      'image-optimization',
      '1. Describe image content accurately\n2. Include relevant keywords naturally\n3. Keep alt text concise but descriptive\n4. Avoid "image of" or "picture of"\n5. Use empty alt="" for decorative images'
    ));
  }
  
  // Analyze links
  const links = analyzeLinkQuality(content.links);
  if (links < 70) {
    findings.push('Link structure could be improved');
    recommendations.push(createRecommendation(
      'Improve internal linking and anchor text',
      'medium',
      'link-optimization',
      '1. Use descriptive anchor text\n2. Add more internal links to related content\n3. Ensure external links are relevant and authoritative\n4. Open external links in new tabs\n5. Avoid generic "click here" text'
    ));
  }
  
  // Analyze schema markup
  const schemaMarkup = analyzeSchemaMarkup(content);
  if (schemaMarkup < 70) {
    findings.push('Missing or incomplete schema markup');
    recommendations.push(createRecommendation(
      'Implement structured data markup',
      'medium',
      'schema-markup',
      '1. Add Organization schema\n2. Use Article schema for blog posts\n3. Implement FAQ schema for Q&A content\n4. Add Local Business schema if applicable\n5. Test with Google\'s Structured Data Testing Tool'
    ));
  }
  
  // Analyze page speed indicators
  const pageSpeed = analyzePageSpeedIndicators(content);
  if (pageSpeed < 70) {
    findings.push('Page speed optimization needed');
    recommendations.push(createRecommendation(
      'Optimize page loading speed',
      'medium',
      'page-speed',
      '1. Optimize images (compress, use WebP)\n2. Minify CSS and JavaScript\n3. Enable compression (gzip/brotli)\n4. Use browser caching\n5. Optimize server response time'
    ));
  }
  
  const score = Math.round((headingStructure + metaInfo + altText + links + schemaMarkup + pageSpeed) / 6);
  const status = getScoreStatus(score);
  
  return {
    score,
    status,
    findings,
    recommendations,
    headingStructure,
    metaInfo,
    altText,
    links,
    schemaMarkup,
    pageSpeed
  };
}

export function analyzeContentQuality(content: CrawledContent): ContentQuality {
  const findings: string[] = [];
  const recommendations: RecommendationItem[] = [];
  
  // Analyze long-tail keywords
  const longTailKeywords = analyzeLongTailKeywords(content.paragraphs);
  if (longTailKeywords < 70) {
    findings.push('Limited use of long-tail keywords and conversational phrases');
    recommendations.push(createRecommendation(
      'Incorporate more long-tail keywords and conversational phrases',
      'high',
      'keyword-optimization',
      '1. Research 15-20 long-tail keywords using tools like Answer the Public\n2. Focus on question-based phrases (how, what, why, where)\n3. Include conversational terms for voice search\n4. Use keywords naturally in content\n5. Target specific user intent rather than broad terms'
    ));
  }
  
  // Analyze content depth
  const comprehensiveCoverage = analyzeContentDepth(content);
  if (comprehensiveCoverage < 70) {
    findings.push('Content lacks comprehensive coverage of the topic');
    recommendations.push(createRecommendation(
      'Expand content to provide comprehensive topic coverage',
      'high',
      'content-depth',
      '1. Aim for 1500+ words for pillar content\n2. Include background information and context\n3. Add step-by-step guides and how-tos\n4. Include examples and case studies\n5. Provide actionable takeaways\n6. Answer related questions and subtopics'
    ));
  }
  
  // Analyze relevance
  const relevanceToUserIntent = analyzeRelevance(content);
  if (relevanceToUserIntent < 70) {
    findings.push('Content may not fully address user search intent');
    recommendations.push(createRecommendation(
      'Better align content with user search intent',
      'high',
      'user-intent',
      '1. Analyze search intent for target keywords\n2. Include practical examples and advice\n3. Answer common user questions directly\n4. Use Google\'s "People also ask" for insights\n5. Match content format to intent (informational, transactional, etc.)'
    ));
  }
  
  // Analyze accuracy indicators
  const accuracyAndCurrency = analyzeAccuracy(content);
  if (accuracyAndCurrency < 70) {
    findings.push('Content lacks indicators of accuracy and currency');
    recommendations.push(createRecommendation(
      'Add credibility and freshness indicators',
      'medium',
      'credibility',
      '1. Include publication and last updated dates\n2. Add author information and credentials\n3. Cite authoritative sources with links\n4. Include expert quotes and statistics\n5. Add references and footnotes where appropriate'
    ));
  }
  
  // Analyze natural language
  const naturalLanguage = analyzeNaturalLanguage(content.paragraphs);
  if (naturalLanguage < 70) {
    findings.push('Language could be more natural and conversational');
    recommendations.push(createRecommendation(
      'Use more natural, conversational language',
      'medium',
      'language-style',
      '1. Write in active voice\n2. Use contractions and personal pronouns\n3. Match how your audience speaks\n4. Avoid overly technical jargon\n5. Write as if explaining to a friend'
    ));
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
  const recommendations: RecommendationItem[] = [];
  
  // Analyze chunkability - critical for AI systems
  const chunkability = analyzeChunkability(content.paragraphs);
  if (chunkability < 70) {
    findings.push('Content paragraphs are too long for optimal AI processing');
    recommendations.push(createRecommendation(
      'Optimize content structure for AI chunking',
      'high',
      'content-chunking',
      '1. Break paragraphs into 2-4 sentences each\n2. Use bullet points and numbered lists\n3. Add clear section breaks with headings\n4. Aim for 150-300 characters per chunk\n5. Ensure each chunk contains complete thoughts'
    ));
  }
  
  // Analyze Q&A format
  const qaFormat = analyzeQAFormat(content);
  if (qaFormat < 70) {
    findings.push('Content lacks clear question-answer formatting');
    recommendations.push(createRecommendation(
      'Structure content with clear Q&A formatting',
      'high',
      'qa-structure',
      '1. Add FAQ sections with clear questions\n2. Follow questions with direct, concise answers\n3. Use H3 headings for questions\n4. Implement FAQ schema markup\n5. Start headings with question words (How, What, Why)'
    ));
  }
  
  // Analyze entity recognition
  const entityRecognition = analyzeEntityRecognition(content);
  if (entityRecognition < 70) {
    findings.push('Limited use of clearly defined entities (people, places, brands)');
    recommendations.push(createRecommendation(
      'Improve entity recognition and definition',
      'medium',
      'entity-optimization',
      '1. Clearly mention specific names, dates, locations\n2. Define key industry terminology\n3. Include company names and brand references\n4. Add person titles and credentials\n5. Use specific rather than generic terms'
    ));
  }
  
  // Analyze factual density
  const factualDensity = analyzeFactualDensity(content.paragraphs);
  if (factualDensity < 70) {
    findings.push('Content has low fact-to-fluff ratio');
    recommendations.push(createRecommendation(
      'Increase factual density and information value',
      'high',
      'factual-content',
      '1. Include specific statistics and data points\n2. Add concrete examples and case studies\n3. Replace vague statements with specific details\n4. Cite research studies and sources\n5. Include measurable results and outcomes'
    ));
  }
  
  // Analyze semantic clarity
  const semanticClarity = analyzeSemanticClarity(content.paragraphs);
  if (semanticClarity < 70) {
    findings.push('Content contains ambiguous language that may confuse AI systems');
    recommendations.push(createRecommendation(
      'Improve semantic clarity and reduce ambiguity',
      'medium',
      'semantic-clarity',
      '1. Define technical terms explicitly\n2. Use consistent terminology throughout\n3. Avoid jargon and ambiguous phrases\n4. Structure content with logical flow\n5. Use specific rather than general language'
    ));
  }
  
  // Analyze content structure for AI
  const contentStructureForAI = analyzeContentStructureForAI(content);
  if (contentStructureForAI < 70) {
    findings.push('Content structure not optimized for AI understanding');
    recommendations.push(createRecommendation(
      'Optimize content structure for AI processing',
      'medium',
      'ai-structure',
      '1. Use consistent heading hierarchy\n2. Implement schema markup\n3. Structure data in tables when appropriate\n4. Use descriptive link text\n5. Add structured data for key information'
    ));
  }
  
  // Analyze contextual relevance
  const contextualRelevance = analyzeContextualRelevance(content);
  if (contextualRelevance < 70) {
    findings.push('Content lacks sufficient context for AI understanding');
    recommendations.push(createRecommendation(
      'Improve contextual relevance and clarity',
      'medium',
      'contextual-clarity',
      '1. Provide background context for complex topics\n2. Link related concepts explicitly\n3. Use transitional phrases between ideas\n4. Include relevant keywords naturally\n5. Connect information to user intent'
    ));
  }
  
  const score = Math.round((chunkability + qaFormat + entityRecognition + factualDensity + semanticClarity + contentStructureForAI + contextualRelevance) / 7);
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
    semanticClarity,
    contentStructureForAI,
    contextualRelevance
  };
}

export function analyzeAuthority(content: CrawledContent): Authority {
  const findings: string[] = [];
  const recommendations: RecommendationItem[] = [];
  
  // Analyze social media presence indicators
  const socialMediaPresence = analyzeSocialMediaPresence(content);
  if (socialMediaPresence < 70) {
    findings.push('Limited social media presence indicators');
    recommendations.push(createRecommendation(
      'Strengthen social media presence and social proof',
      'medium',
      'social-presence',
      '1. Add social media links in header/footer\n2. Include social sharing buttons\n3. Display follower counts where appropriate\n4. Add social media widgets or feeds\n5. Encourage content sharing and engagement'
    ));
  }
  
  // Analyze company information
  const companyInformation = analyzeCompanyInformation(content);
  if (companyInformation < 70) {
    findings.push('Company information could be more detailed');
    recommendations.push(createRecommendation(
      'Provide comprehensive company information',
      'medium',
      'company-info',
      '1. Add detailed About Us page\n2. Include team member bios and credentials\n3. Add company mission and values\n4. Include business hours and location\n5. Provide company history and milestones'
    ));
  }
  
  // Analyze legal compliance
  const legalCompliance = analyzeLegalCompliance(content);
  if (legalCompliance < 70) {
    findings.push('Legal compliance information may be missing');
    recommendations.push(createRecommendation(
      'Ensure legal compliance and transparency',
      'high',
      'legal-compliance',
      '1. Add privacy policy and terms of service\n2. Include cookie policy if applicable\n3. Add legal disclaimers where needed\n4. Provide contact info for legal inquiries\n5. Ensure GDPR/CCPA compliance if applicable'
    ));
  }
  
  // Analyze testimonials
  const testimonials = analyzeTestimonials(content);
  if (testimonials < 70) {
    findings.push('Limited social proof and testimonials');
    recommendations.push(createRecommendation(
      'Add more social proof and testimonials',
      'medium',
      'social-proof',
      '1. Include customer testimonials with photos\n2. Add case studies and success stories\n3. Display client logos and awards\n4. Include industry recognition\n5. Add review widgets or badges'
    ));
  }
  
  // Analyze affiliations
  const affiliations = analyzeAffiliations(content);
  if (affiliations < 70) {
    findings.push('Professional affiliations and certifications not prominently displayed');
    recommendations.push(createRecommendation(
      'Highlight professional credentials and affiliations',
      'low',
      'affiliations',
      '1. Display industry certifications prominently\n2. Include partner organization logos\n3. Highlight professional memberships\n4. Add award badges and recognition\n5. Include relevant credentials and licenses'
    ));
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
  const recommendations: RecommendationItem[] = [];
  
  // Analyze contact information
  const contactInfo = analyzeContactInfo(content);
  if (contactInfo < 70) {
    findings.push('Contact information is not easily accessible');
    recommendations.push(createRecommendation(
      'Make contact information more prominent and accessible',
      'medium',
      'contact-accessibility',
      '1. Add contact info in header and footer\n2. Create a dedicated contact page\n3. Include phone, email, and address\n4. Add business hours and contact forms\n5. Make contact info visible on every page'
    ));
  }
  
  // Analyze calls to action
  const callsToAction = analyzeCallsToAction(content);
  if (callsToAction < 70) {
    findings.push('Calls-to-action could be more compelling and strategically placed');
    recommendations.push(createRecommendation(
      'Improve calls-to-action placement and effectiveness',
      'medium',
      'cta-optimization',
      '1. Use action-oriented language (Get Started, Learn More)\n2. Make CTA buttons visually prominent\n3. Place CTAs at the end of sections\n4. Use contrasting colors for CTA buttons\n5. Test different CTA variations'
    ));
  }
  
  // Analyze language accessibility
  const language = analyzeLanguageAccessibility(content);
  if (language < 70) {
    findings.push('Language may not be accessible to all audiences');
    recommendations.push(createRecommendation(
      'Improve language accessibility and readability',
      'low',
      'language-accessibility',
      '1. Use clear, simple language for target audience\n2. Avoid unnecessary jargon and technical terms\n3. Write in active voice\n4. Keep sentences concise (15-20 words)\n5. Define technical terms when necessary'
    ));
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
    recommendations: recommendations.map(rec => createRecommendation(rec, 'medium', 'content-structure')),
    structuredContent,
    multimedia,
    readability
  };
}

export function analyzeTechnicalCrawlability(content: CrawledContent): TechnicalCrawlability {
  const findings: string[] = [];
  const recommendations: RecommendationItem[] = [];
  
  // Analyze robots.txt access
  const robotsAccess = analyzeRobotsAccess(content);
  if (robotsAccess < 70) {
    findings.push('Robots.txt configuration may be blocking AI bots');
    recommendations.push(createRecommendation(
      'Ensure robots.txt allows AI crawlers like GPTBot, ChatGPT-User, CCBot, and BingBot',
      'high',
      'bot-access',
      '1. Check your robots.txt file\n2. Add "User-agent: GPTBot\nAllow: /"\n3. Add "User-agent: ChatGPT-User\nAllow: /"\n4. Add "User-agent: CCBot\nAllow: /"\n5. Test with Google Search Console'
    ));
  }
  
  // Analyze bot accessibility
  const botAccessibility = analyzeBotAccessibility(content);
  if (botAccessibility < 70) {
    findings.push('Content may not be easily accessible to AI bots');
    recommendations.push(createRecommendation(
      'Optimize content delivery for AI bot crawling',
      'high',
      'accessibility',
      '1. Ensure content loads without JavaScript\n2. Use server-side rendering\n3. Provide text alternatives for dynamic content\n4. Test your site with JavaScript disabled'
    ));
  }
  
  // Analyze content delivery speed
  const contentDelivery = analyzeContentDelivery(content);
  if (contentDelivery < 70) {
    findings.push('Page load speed may affect AI bot crawling efficiency');
    recommendations.push(createRecommendation(
      'Improve page load speed for better bot accessibility',
      'medium',
      'performance',
      '1. Optimize images (WebP format, proper sizing)\n2. Minify CSS and JavaScript\n3. Enable compression\n4. Use a CDN\n5. Optimize server response times'
    ));
  }
  
  // Analyze JavaScript dependency
  const javascriptDependency = analyzeJavaScriptDependency(content);
  if (javascriptDependency < 70) {
    findings.push('Content heavily depends on JavaScript, which may limit AI bot access');
    recommendations.push(createRecommendation(
      'Reduce JavaScript dependency for critical content',
      'high',
      'javascript',
      '1. Implement server-side rendering\n2. Provide noscript alternatives\n3. Use progressive enhancement\n4. Ensure critical content is in HTML\n5. Consider static site generation'
    ));
  }
  
  // Analyze load speed
  const loadSpeed = analyzeLoadSpeed(content);
  if (loadSpeed < 70) {
    findings.push('Slow loading times may impact AI bot crawling');
    recommendations.push(createRecommendation(
      'Optimize website loading speed for AI crawlers',
      'medium',
      'speed',
      '1. Enable browser caching\n2. Optimize images\n3. Minimize HTTP requests\n4. Use efficient hosting\n5. Monitor Core Web Vitals'
    ));
  }
  
  const score = Math.round((robotsAccess + botAccessibility + contentDelivery + javascriptDependency + loadSpeed) / 5);
  const status = getScoreStatus(score);
  
  return {
    score,
    status,
    findings,
    recommendations,
    robotsAccess,
    botAccessibility,
    contentDelivery,
    javascriptDependency,
    loadSpeed
  };
}

export function analyzeMobileOptimization(content: CrawledContent): MobileOptimization {
  const findings: string[] = [];
  const recommendations: RecommendationItem[] = [];
  
  // Analyze mobile page speed
  const mobilePageSpeed = analyzeMobilePageSpeed(content);
  if (mobilePageSpeed < 70) {
    findings.push('Mobile page speed needs optimization');
    recommendations.push(createRecommendation(
      'Optimize mobile page loading speed',
      'high',
      'mobile-speed',
      '1. Compress and optimize images for mobile\n2. Minify CSS and JavaScript\n3. Enable browser caching\n4. Use responsive image formats (WebP)\n5. Minimize render-blocking resources'
    ));
  }
  
  // Analyze touch targets
  const touchTargets = analyzeTouchTargets(content);
  if (touchTargets < 70) {
    findings.push('Touch targets may be too small or poorly spaced');
    recommendations.push(createRecommendation(
      'Improve touch target sizing and spacing',
      'high',
      'touch-targets',
      '1. Make buttons at least 44px × 44px\n2. Add 8px spacing between touch targets\n3. Ensure clickable areas are easily tappable\n4. Test on actual mobile devices\n5. Use larger fonts for better readability'
    ));
  }
  
  // Analyze viewport configuration
  const viewportConfiguration = analyzeViewportConfiguration(content);
  if (viewportConfiguration < 70) {
    findings.push('Viewport configuration is missing or incorrect');
    recommendations.push(createRecommendation(
      'Configure proper viewport meta tag',
      'high',
      'viewport-config',
      '1. Add viewport meta tag: <meta name="viewport" content="width=device-width, initial-scale=1">\n2. Avoid fixed-width layouts\n3. Test on various screen sizes\n4. Ensure content fits without horizontal scrolling\n5. Use flexible CSS units (%, vw, vh)'
    ));
  }
  
  // Analyze mobile usability
  const mobileUsability = analyzeMobileUsability(content);
  if (mobileUsability < 70) {
    findings.push('Mobile usability issues detected');
    recommendations.push(createRecommendation(
      'Improve mobile user experience',
      'medium',
      'mobile-usability',
      '1. Use mobile-friendly font sizes (16px minimum)\n2. Avoid Flash and other unsupported plugins\n3. Ensure content is accessible without zoom\n4. Optimize forms for mobile input\n5. Test navigation on mobile devices'
    ));
  }
  
  // Analyze responsive design
  const responsiveDesign = analyzeResponsiveDesign(content);
  if (responsiveDesign < 70) {
    findings.push('Responsive design implementation needs improvement');
    recommendations.push(createRecommendation(
      'Enhance responsive design implementation',
      'medium',
      'responsive-design',
      '1. Use CSS media queries for different screen sizes\n2. Implement flexible grid layouts\n3. Use responsive images with srcset\n4. Test on multiple devices and screen sizes\n5. Ensure consistent experience across devices'
    ));
  }
  
  const score = Math.round((mobilePageSpeed + touchTargets + viewportConfiguration + mobileUsability + responsiveDesign) / 5);
  const status = getScoreStatus(score);
  
  return {
    score,
    status,
    findings,
    recommendations,
    mobilePageSpeed,
    touchTargets,
    viewportConfiguration,
    mobileUsability,
    responsiveDesign
  };
}

export function analyzeSchemaAnalysis(content: CrawledContent): SchemaAnalysis {
  const findings: string[] = [];
  const recommendations: RecommendationItem[] = [];
  
  // Analyze schema presence
  const schemaPresence = analyzeSchemaPresence(content);
  if (schemaPresence < 70) {
    findings.push('Limited or missing structured data markup');
    recommendations.push(createRecommendation(
      'Implement comprehensive structured data markup',
      'high',
      'schema-presence',
      '1. Add Organization schema for business information\n2. Implement Article schema for blog posts\n3. Use Product schema for e-commerce items\n4. Add LocalBusiness schema if applicable\n5. Use Google\'s Structured Data Testing Tool to validate'
    ));
  }
  
  // Analyze schema validation
  const schemaValidation = analyzeSchemaValidation(content);
  if (schemaValidation < 70) {
    findings.push('Structured data contains errors or is incomplete');
    recommendations.push(createRecommendation(
      'Fix structured data validation errors',
      'high',
      'schema-validation',
      '1. Use Google\'s Rich Results Test tool\n2. Fix syntax errors in JSON-LD\n3. Ensure required properties are included\n4. Validate schema against Schema.org specifications\n5. Test for rich snippet eligibility'
    ));
  }
  
  // Analyze rich snippet potential
  const richSnippetPotential = analyzeRichSnippetPotential(content);
  if (richSnippetPotential < 70) {
    findings.push('Content not optimized for rich snippets');
    recommendations.push(createRecommendation(
      'Optimize content for rich snippet opportunities',
      'medium',
      'rich-snippets',
      '1. Add FAQ schema for question-answer content\n2. Implement Review schema for testimonials\n3. Use HowTo schema for step-by-step guides\n4. Add Recipe schema for cooking content\n5. Include Event schema for event listings'
    ));
  }
  
  // Analyze structured data completeness
  const structuredDataCompleteness = analyzeStructuredDataCompleteness(content);
  if (structuredDataCompleteness < 70) {
    findings.push('Structured data implementation is incomplete');
    recommendations.push(createRecommendation(
      'Complete structured data implementation',
      'medium',
      'schema-completeness',
      '1. Add missing required properties\n2. Include optional but valuable properties\n3. Ensure consistency across all pages\n4. Add breadcrumb schema for navigation\n5. Implement sitelinks search box schema'
    ));
  }
  
  // Analyze JSON-LD implementation
  const jsonLdImplementation = analyzeJsonLdImplementation(content);
  if (jsonLdImplementation < 70) {
    findings.push('JSON-LD implementation needs improvement');
    recommendations.push(createRecommendation(
      'Improve JSON-LD structured data implementation',
      'low',
      'json-ld',
      '1. Prefer JSON-LD over Microdata for new implementations\n2. Place JSON-LD in the <head> section\n3. Use proper schema.org context\n4. Ensure valid JSON syntax\n5. Keep structured data updated with content changes'
    ));
  }
  
  const score = Math.round((schemaPresence + schemaValidation + richSnippetPotential + structuredDataCompleteness + jsonLdImplementation) / 5);
  const status = getScoreStatus(score);
  
  return {
    score,
    status,
    findings,
    recommendations,
    schemaPresence,
    schemaValidation,
    richSnippetPotential,
    structuredDataCompleteness,
    jsonLdImplementation
  };
}

// Helper functions for TechnicalCrawlability analysis
function analyzeRobotsAccess(content: CrawledContent): number {
  if (!content.robotsInfo) {
    return 50; // Assume default if no robots info available
  }
  
  let score = 70; // Base score
  
  if (content.robotsInfo.hasRobotsTxt) {
    score += 10;
    if (content.robotsInfo.allowsAllBots) {
      score += 20;
    }
    if (content.robotsInfo.hasSpecificBotRules) {
      // Check if content mentions AI bot user agents
      const aiBotsAllowed = content.robotsInfo.content?.includes('GPTBot') ||
                           content.robotsInfo.content?.includes('ChatGPT-User') ||
                           content.robotsInfo.content?.includes('CCBot');
      if (aiBotsAllowed) score += 20;
    }
  } else {
    score -= 10; // No robots.txt might be an issue
  }
  
  return Math.min(100, score);
}

function analyzeBotAccessibility(content: CrawledContent): number {
  let score = 70;
  
  // Check if content is available without JavaScript
  if (!content.hasJavaScriptDependency) {
    score += 20;
  } else {
    score -= 10;
  }
  
  // Check for structured content that bots can easily parse
  if (content.headings.length > 0) score += 10;
  if (content.paragraphs.length > 0) score += 10;
  
  return Math.min(100, score);
}

function analyzeContentDelivery(content: CrawledContent): number {
  let score = 70;
  
  // Simulate load time analysis (in real implementation, this would be measured)
  if (content.loadTime) {
    if (content.loadTime < 2) score += 30;
    else if (content.loadTime < 4) score += 10;
    else score -= 20;
  }
  
  // Check content size indicators
  if (content.html.length < 50000) score += 10; // Reasonable HTML size
  if (content.images.length < 10) score += 10; // Not too many images
  
  return Math.min(100, score);
}

function analyzeJavaScriptDependency(content: CrawledContent): number {
  let score = 80;
  
  if (content.hasJavaScriptDependency) {
    score -= 30;
    
    // Check if there's still meaningful content without JS
    if (content.paragraphs.length > 3) score += 10;
    if (content.headings.length > 1) score += 10;
  }
  
  return Math.max(0, score);
}

function analyzeLoadSpeed(content: CrawledContent): number {
  let score = 70;
  
  // Estimate based on content size and complexity
  const htmlSize = content.html.length;
  const imageCount = content.images.length;
  
  if (htmlSize < 30000) score += 15;
  else if (htmlSize > 100000) score -= 15;
  
  if (imageCount > 10) score -= 10;
  
  // Check for performance indicators
  const hasOptimizedImages = content.images.some(img => 
    img.src.includes('.webp') || img.src.includes('optimize')
  );
  if (hasOptimizedImages) score += 15;
  
  return Math.min(100, score);
}

function analyzeSchemaMarkup(content: CrawledContent): number {
  let score = 0;
  
  // Check for common schema types
  const schemaCount = content.schemaMarkup.length;
  if (schemaCount > 0) score += 50;
  if (schemaCount > 2) score += 20;
  if (schemaCount > 4) score += 20;
  
  // Check for specific valuable schema types
  const schemaContent = content.schemaMarkup.join(' ').toLowerCase();
  if (schemaContent.includes('organization')) score += 10;
  if (schemaContent.includes('article')) score += 10;
  if (schemaContent.includes('faq')) score += 10;
  if (schemaContent.includes('local')) score += 10;
  
  return Math.min(100, score);
}

function analyzePageSpeedIndicators(content: CrawledContent): number {
  let score = 70;
  
  // Check HTML size
  const htmlSize = content.html.length;
  if (htmlSize < 50000) score += 10;
  else if (htmlSize > 200000) score -= 20;
  
  // Check image optimization
  const totalImages = content.images.length;
  if (totalImages === 0) score += 10;
  else {
    const optimizedImages = content.images.filter(img => 
      img.src.includes('.webp') || 
      img.src.includes('compress') || 
      img.src.includes('optimize')
    ).length;
    
    if (optimizedImages / totalImages > 0.5) score += 15;
  }
  
  // Check for performance best practices
  const html = content.html.toLowerCase();
  if (html.includes('defer') || html.includes('async')) score += 5;
  if (html.includes('preload')) score += 5;
  
  return Math.min(100, score);
}

function analyzeContentStructureForAI(content: CrawledContent): number {
  let score = 70;
  
  // Check heading hierarchy
  if (content.headings.length > 0) score += 10;
  if (content.headings.some(h => h.level === 1)) score += 10;
  
  // Check for structured elements
  const html = content.html.toLowerCase();
  if (html.includes('<table')) score += 5;
  if (html.includes('<ul>') || html.includes('<ol>')) score += 10;
  
  // Check schema markup
  if (content.schemaMarkup.length > 0) score += 15;
  
  // Check for clear content organization
  if (content.paragraphs.length > 3) score += 5;
  if (content.links.length > 0) score += 5;
  
  return Math.min(100, score);
}

function analyzeContextualRelevance(content: CrawledContent): number {
  let score = 70;
  
  // Check title-content alignment
  if (content.title && content.paragraphs.length > 0) {
    const titleWords = content.title.toLowerCase().split(' ');
    const contentText = content.paragraphs.join(' ').toLowerCase();
    const relevantWords = titleWords.filter(word => 
      word.length > 3 && contentText.includes(word)
    ).length;
    
    if (relevantWords / titleWords.length > 0.5) score += 15;
  }
  
  // Check for context-providing elements
  const text = content.paragraphs.join(' ').toLowerCase();
  const contextWords = ['because', 'therefore', 'however', 'additionally', 'furthermore', 'moreover'];
  const contextCount = contextWords.filter(word => text.includes(word)).length;
  if (contextCount > 2) score += 10;
  
  // Check for explanatory content
  if (text.includes('what is') || text.includes('how to') || text.includes('why')) score += 5;
  
  return Math.min(100, score);
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

// Helper function to convert string recommendations to RecommendationItem format
function createRecommendation(
  text: string, 
  priority: 'high' | 'medium' | 'low' = 'medium',
  category: string = 'general',
  implementation?: string
): RecommendationItem {
  return {
    text,
    priority,
    category,
    implementation
  };
}

function getScoreStatus(score: number): 'excellent' | 'good' | 'needs-improvement' | 'poor' {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  if (score >= 40) return 'needs-improvement';
  return 'poor';
}

// Helper functions for Mobile Optimization analysis
function analyzeMobilePageSpeed(content: CrawledContent): number {
  let score = 70;
  
  // Check for mobile optimization indicators
  if (content.mobileInfo?.mobileOptimizedCSS) score += 15;
  if (content.mobileInfo?.usesResponsiveImages) score += 10;
  
  // Penalize for large HTML size on mobile
  const htmlSize = content.html.length;
  if (htmlSize > 50000) score -= 10;
  if (htmlSize > 100000) score -= 20;
  
  // Check for performance best practices
  const html = content.html.toLowerCase();
  if (html.includes('async') || html.includes('defer')) score += 5;
  
  return Math.min(100, score);
}

function analyzeTouchTargets(content: CrawledContent): number {
  let score = 70;
  
  // Check for touchable elements
  if (content.mobileInfo?.hasTouchableElements) {
    score += 20;
  } else {
    score -= 20;
  }
  
  // Check for button and link elements
  const html = content.html.toLowerCase();
  const buttons = (html.match(/<button/g) || []).length;
  const links = content.links.length;
  
  if (buttons > 0) score += 5;
  if (links > 3) score += 5;
  
  // Check for form elements
  if (html.includes('<input') || html.includes('<select') || html.includes('<textarea')) {
    score += 10;
  }
  
  return Math.min(100, score);
}

function analyzeViewportConfiguration(content: CrawledContent): number {
  let score = 30;
  
  if (content.mobileInfo?.hasViewportMeta) {
    score += 50;
    
    const viewport = content.mobileInfo.viewportContent?.toLowerCase() || '';
    if (viewport.includes('width=device-width')) score += 15;
    if (viewport.includes('initial-scale=1')) score += 5;
    if (!viewport.includes('user-scalable=no')) score += 5; // Good for accessibility
  }
  
  return Math.min(100, score);
}

function analyzeMobileUsability(content: CrawledContent): number {
  let score = 70;
  
  const html = content.html.toLowerCase();
  
  // Check for mobile-unfriendly elements
  if (html.includes('flash') || html.includes('applet')) score -= 30;
  
  // Check for mobile-friendly indicators
  if (html.includes('media="screen"') || html.includes('@media')) score += 10;
  
  // Check font size indicators
  if (html.includes('font-size')) score += 5;
  
  // Check for form optimization
  if (html.includes('type="tel"') || html.includes('type="email"')) score += 10;
  
  return Math.min(100, score);
}

function analyzeResponsiveDesign(content: CrawledContent): number {
  let score = 50;
  
  const html = content.html.toLowerCase();
  
  // Check for responsive design indicators
  if (html.includes('@media')) score += 20;
  if (html.includes('max-width') || html.includes('min-width')) score += 15;
  if (html.includes('flexbox') || html.includes('grid')) score += 10;
  
  // Check for responsive images
  if (content.mobileInfo?.usesResponsiveImages) score += 15;
  if (html.includes('srcset')) score += 10;
  
  // Check viewport
  if (content.mobileInfo?.hasViewportMeta) score += 10;
  
  return Math.min(100, score);
}

// Helper functions for Schema Analysis
function analyzeSchemaPresence(content: CrawledContent): number {
  let score = 0;
  
  const schemaCount = content.schemaMarkup.length;
  if (schemaCount > 0) score += 40;
  if (schemaCount > 2) score += 20;
  if (schemaCount > 4) score += 20;
  
  // Check for microdata
  if (content.enhancedSchemaInfo?.microdataCount && content.enhancedSchemaInfo.microdataCount > 0) {
    score += 20;
  }
  
  return Math.min(100, score);
}

function analyzeSchemaValidation(content: CrawledContent): number {
  let score = 80; // Start with good score, penalize for errors
  
  if (content.enhancedSchemaInfo?.validationErrors) {
    const errorCount = content.enhancedSchemaInfo.validationErrors.length;
    score -= errorCount * 10; // Penalize 10 points per error
  }
  
  // Check for valid JSON-LD
  let validJsonLd = 0;
  content.schemaMarkup.forEach(schema => {
    try {
      JSON.parse(schema);
      validJsonLd++;
    } catch {
      score -= 15; // Penalize for invalid JSON
    }
  });
  
  return Math.max(0, score);
}

function analyzeRichSnippetPotential(content: CrawledContent): number {
  let score = 40;
  
  const schemaTypes = content.enhancedSchemaInfo?.schemaTypes || [];
  const html = content.html.toLowerCase();
  
  // Check for rich snippet opportunities
  if (schemaTypes.includes('FAQ') || html.includes('faq')) score += 15;
  if (schemaTypes.includes('Review') || html.includes('review')) score += 10;
  if (schemaTypes.includes('Recipe') || html.includes('recipe')) score += 10;
  if (schemaTypes.includes('Event') || html.includes('event')) score += 10;
  if (schemaTypes.includes('Product') || html.includes('product')) score += 10;
  if (schemaTypes.includes('HowTo') || html.includes('how to')) score += 5;
  
  return Math.min(100, score);
}

function analyzeStructuredDataCompleteness(content: CrawledContent): number {
  let score = 50;
  
  const schemaTypes = content.enhancedSchemaInfo?.schemaTypes || [];
  
  // Check for essential schema types
  if (schemaTypes.includes('Organization')) score += 15;
  if (schemaTypes.includes('WebSite')) score += 10;
  if (schemaTypes.includes('WebPage')) score += 10;
  if (schemaTypes.includes('BreadcrumbList')) score += 10;
  
  // Check for completeness based on content type
  if (content.schemaMarkup.length > 0) {
    score += 5; // Base points for having any schema
  }
  
  return Math.min(100, score);
}

function analyzeJsonLdImplementation(content: CrawledContent): number {
  let score = 50;
  
  const jsonLdCount = content.enhancedSchemaInfo?.jsonLdCount || 0;
  const microdataCount = content.enhancedSchemaInfo?.microdataCount || 0;
  
  // Prefer JSON-LD over microdata
  if (jsonLdCount > 0) score += 30;
  if (jsonLdCount > microdataCount) score += 20;
  
  // Check for proper JSON-LD placement (should be in head)
  const html = content.html;
  const headSection = html.substring(0, html.indexOf('</head>') + 7);
  if (headSection.includes('application/ld+json')) score += 10;
  
  return Math.min(100, score);
} 
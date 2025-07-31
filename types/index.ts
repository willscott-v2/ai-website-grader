export interface AnalysisScore {
  score: number; // 0-100
  status: 'excellent' | 'good' | 'needs-improvement' | 'poor';
  findings: string[];
  recommendations: RecommendationItem[];
}

export interface RecommendationItem {
  text: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  implementation?: string; // Step-by-step guide
}

export interface TechnicalSEO extends AnalysisScore {
  headingStructure: number;
  metaInfo: number;
  altText: number;
  links: number;
  schemaMarkup: number;
  pageSpeed: number;
}

export interface TechnicalCrawlability extends AnalysisScore {
  robotsAccess: number;
  botAccessibility: number;
  contentDelivery: number;
  javascriptDependency: number;
  loadSpeed: number;
}

export interface ContentQuality extends AnalysisScore {
  longTailKeywords: number;
  comprehensiveCoverage: number;
  relevanceToUserIntent: number;
  accuracyAndCurrency: number;
  naturalLanguage: number;
}

export interface AIOptimization extends AnalysisScore {
  chunkability: number;
  qaFormat: number;
  entityRecognition: number;
  factualDensity: number;
  semanticClarity: number;
  contentStructureForAI: number;
  contextualRelevance: number;
}

export interface Authority extends AnalysisScore {
  socialMediaPresence: number;
  companyInformation: number;
  legalCompliance: number;
  testimonials: number;
  affiliations: number;
}

export interface UserExperience extends AnalysisScore {
  contactInfo: number;
  callsToAction: number;
  language: number;
}

export interface ContentStructure extends AnalysisScore {
  structuredContent: number;
  multimedia: number;
  readability: number;
}

export interface MobileOptimization extends AnalysisScore {
  mobilePageSpeed: number;
  touchTargets: number;
  viewportConfiguration: number;
  mobileUsability: number;
  responsiveDesign: number;
}

export interface SchemaAnalysis extends AnalysisScore {
  schemaPresence: number;
  schemaValidation: number;
  richSnippetPotential: number;
  structuredDataCompleteness: number;
  jsonLdImplementation: number;
}

export interface CrawledContent {
  title: string;
  metaDescription: string;
  headings: { level: number; text: string }[];
  paragraphs: string[];
  images: { src: string; alt: string }[];
  links: { href: string; text: string; internal: boolean }[];
  wordCount: number;
  html: string;
  url: string;
  robotsInfo?: {
    hasRobotsTxt: boolean;
    allowsAllBots: boolean;
    hasSpecificBotRules: boolean;
    content?: string;
  };
  schemaMarkup: string[];
  loadTime?: number;
  hasJavaScriptDependency: boolean;
  mobileInfo?: {
    hasViewportMeta: boolean;
    viewportContent?: string;
    hasTouchableElements: boolean;
    usesResponsiveImages: boolean;
    mobileOptimizedCSS: boolean;
  };
  enhancedSchemaInfo?: {
    jsonLdCount: number;
    microdataCount: number;
    schemaTypes: string[];
    validationErrors: string[];
  };
}

export interface WebsiteAnalysis {
  url: string;
  title: string;
  overallScore: number;
  timestamp: string;
  technicalSEO: TechnicalSEO;
  technicalCrawlability: TechnicalCrawlability;
  contentQuality: ContentQuality;
  aiOptimization: AIOptimization;
  mobileOptimization: MobileOptimization;
  schemaAnalysis: SchemaAnalysis;
  authority: Authority;
  userExperience: UserExperience;
  contentStructure: ContentStructure;
  contentImprovements: ContentImprovement[];
}

export interface ContentImprovement {
  section: string;
  current: string;
  improved: string;
  reasoning: string;
  priority: 'high' | 'medium' | 'low';
  implementation?: string;
  estimatedImpact?: 'high' | 'medium' | 'low';
} 
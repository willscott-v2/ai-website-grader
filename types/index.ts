export interface AnalysisScore {
  score: number; // 0-100
  status: 'excellent' | 'good' | 'needs-improvement' | 'poor';
  findings: string[];
  recommendations: string[];
}

export interface TechnicalSEO extends AnalysisScore {
  headingStructure: number;
  metaInfo: number;
  altText: number;
  links: number;
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

export interface CrawledContent {
  title: string;
  metaDescription: string;
  headings: { level: number; text: string }[];
  paragraphs: string[];
  images: { src: string; alt: string }[];
  links: { href: string; text: string; internal: boolean }[];
  wordCount: number;
  html: string;
}

export interface WebsiteAnalysis {
  url: string;
  title: string;
  overallScore: number;
  timestamp: string;
  technicalSEO: TechnicalSEO;
  contentQuality: ContentQuality;
  aiOptimization: AIOptimization;
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
} 
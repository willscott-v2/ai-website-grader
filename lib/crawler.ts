import * as cheerio from 'cheerio';
import { CrawledContent } from '@/types';

export async function crawlWebsite(url: string): Promise<CrawledContent> {
  // Validate and normalize URL
  const normalizedUrl = normalizeUrl(url);
  
  // Fetch with timeout and error handling
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  
  try {
    const response = await fetch(normalizedUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'AI-Website-Grader/1.0 (+https://example.com/bot)',
      },
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const html = await response.text();
    
    // Fetch robots.txt info in parallel
    const robotsInfoPromise = fetchRobotsInfo(normalizedUrl);
    
    // Parse HTML content
    const content = parseHtmlContent(html, normalizedUrl);
    
    // Add robots info
    content.robotsInfo = await robotsInfoPromise;
    
    return content;
    
  } catch (error) {
    clearTimeout(timeoutId);
    throw new Error(`Failed to crawl website: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function parseTextContent(text: string): CrawledContent {
  // Handle manual text input as basic HTML
  const fakeHtml = `<html><body><div>${text.replace(/\n/g, '</p><p>')}</div></body></html>`;
  const content = parseHtmlContent(fakeHtml, 'manual-input');
  
  // Add default values for manual input
  content.robotsInfo = {
    hasRobotsTxt: false,
    allowsAllBots: true,
    hasSpecificBotRules: false
  };
  
  // Add default mobile and schema info for manual input
  content.mobileInfo = {
    hasViewportMeta: false,
    hasTouchableElements: false,
    usesResponsiveImages: false,
    mobileOptimizedCSS: false
  };
  
  content.enhancedSchemaInfo = {
    jsonLdCount: 0,
    microdataCount: 0,
    schemaTypes: [],
    validationErrors: []
  };
  
  return content;
}

function parseHtmlContent(html: string, url: string): CrawledContent {
  const $ = cheerio.load(html) as cheerio.CheerioAPI;
  
  // Extract title
  const title = $('title').text().trim() || $('h1').first().text().trim() || 'Untitled';
  
  // Extract meta description
  const metaDescription = $('meta[name="description"]').attr('content') || '';
  
  // Extract headings with hierarchy
  const headings: { level: number; text: string }[] = [];
  $('h1, h2, h3, h4, h5, h6').each((_, element) => {
    const tagName = $(element).prop('tagName') || 'h1';
    const level = parseInt(tagName.substring(1));
    const text = $(element).text().trim();
    if (text) headings.push({ level, text });
  });
  
  // Extract paragraphs
  const paragraphs: string[] = [];
  $('p, div').each((_, element) => {
    const text = $(element).text().trim();
    if (text && text.length > 20) {
      paragraphs.push(text);
    }
  });
  
  // Extract images
  const images: { src: string; alt: string }[] = [];
  $('img').each((_, element) => {
    const src = $(element).attr('src') || '';
    const alt = $(element).attr('alt') || '';
    if (src) images.push({ src, alt });
  });
  
  // Extract links
  const links: { href: string; text: string; internal: boolean }[] = [];
  $('a[href]').each((_, element) => {
    const href = $(element).attr('href') || '';
    const text = $(element).text().trim();
    const internal = href.startsWith('/') || href.includes(new URL(url).hostname);
    if (href && text) links.push({ href, text, internal });
  });
  
  // Calculate word count
  const wordCount = $('body').text().split(/\s+/).length;
  
  // Extract schema markup
  const schemaMarkup: string[] = [];
  $('script[type="application/ld+json"]').each((_, element) => {
    const content = $(element).html();
    if (content) schemaMarkup.push(content.trim());
  });
  
  // Analyze mobile information
  const mobileInfo = analyzeMobileInfo($, html);
  
  // Analyze enhanced schema information
  const enhancedSchemaInfo = analyzeEnhancedSchemaInfo($, schemaMarkup);
  
  // Check for JavaScript dependency
  const hasJavaScriptDependency = analyzeJavaScriptDependency($, html);
  
  // Estimate load time (simplified for demo - in production this would be measured)
  const loadTime = estimateLoadTime(html, images.length);
  
  return {
    title,
    metaDescription,
    headings,
    paragraphs,
    images,
    links,
    wordCount,
    html,
    url,
    schemaMarkup,
    loadTime,
    hasJavaScriptDependency,
    mobileInfo,
    enhancedSchemaInfo
  };
}

function analyzeJavaScriptDependency($: cheerio.CheerioAPI, html: string): boolean {
  // Check for script tags
  const scriptTags = $('script').length;
  
  // Check for common JS frameworks
  const hasReactVue = html.includes('react') || html.includes('vue') || html.includes('angular');
  
  // Check for dynamic content indicators
  const hasDynamicContent = html.includes('data-') || html.includes('ng-') || html.includes('v-');
  
  // Check for single page app indicators
  const isSPA = $('div[id="root"]').length > 0 || $('div[id="app"]').length > 0;
  
  return scriptTags > 3 || hasReactVue || hasDynamicContent || isSPA;
}

function estimateLoadTime(html: string, imageCount: number): number {
  // Simple estimation based on content size
  const htmlSize = html.length;
  
  // Base time in seconds
  let estimatedTime = 0.5; // Base 500ms
  
  // Add time based on HTML size
  if (htmlSize > 50000) estimatedTime += 0.5;
  if (htmlSize > 100000) estimatedTime += 1.0;
  
  // Add time based on image count
  estimatedTime += imageCount * 0.1;
  
  return Math.round(estimatedTime * 100) / 100; // Round to 2 decimal places
}

async function fetchRobotsInfo(url: string): Promise<CrawledContent['robotsInfo']> {
  try {
    const robotsUrl = new URL('/robots.txt', url).toString();
    const response = await fetch(robotsUrl);
    
    if (!response.ok) {
      return {
        hasRobotsTxt: false,
        allowsAllBots: true, // Assume allowed if no robots.txt
        hasSpecificBotRules: false
      };
    }
    
    const content = await response.text();
    const allowsAllBots = content.includes('User-agent: *') && content.includes('Allow: /');
    const hasSpecificBotRules = content.includes('GPTBot') || content.includes('ChatGPT') || content.includes('CCBot');
    
    return {
      hasRobotsTxt: true,
      allowsAllBots,
      hasSpecificBotRules,
      content
    };
  } catch {
    return {
      hasRobotsTxt: false,
      allowsAllBots: true,
      hasSpecificBotRules: false
    };
  }
}

function analyzeMobileInfo($: cheerio.CheerioAPI, html: string): CrawledContent['mobileInfo'] {
  // Check for viewport meta tag
  const viewportMeta = $('meta[name="viewport"]');
  const hasViewportMeta = viewportMeta.length > 0;
  const viewportContent = viewportMeta.attr('content');
  
  // Check for responsive design indicators
  const usesResponsiveImages = $('img[srcset]').length > 0 || html.includes('picture');
  
  // Check for mobile-optimized CSS
  const mobileOptimizedCSS = html.includes('@media') || 
                            $('link[media*="screen"]').length > 0 ||
                            html.includes('responsive') ||
                            html.includes('mobile');
  
  // Check for touchable elements
  const hasTouchableElements = $('button').length > 0 || 
                              $('a').length > 0 || 
                              $('input[type="button"]').length > 0 ||
                              $('input[type="submit"]').length > 0;
  
  return {
    hasViewportMeta,
    viewportContent,
    hasTouchableElements,
    usesResponsiveImages,
    mobileOptimizedCSS
  };
}

function analyzeEnhancedSchemaInfo($: cheerio.CheerioAPI, schemaMarkup: string[]): CrawledContent['enhancedSchemaInfo'] {
  const jsonLdCount = schemaMarkup.length;
  
  // Count microdata elements
  const microdataCount = $('[itemscope]').length;
  
  // Extract schema types
  const schemaTypes: string[] = [];
  const validationErrors: string[] = [];
  
  schemaMarkup.forEach((schema, index) => {
    try {
      const parsed = JSON.parse(schema);
      
      // Extract @type values
      function extractTypes(obj: unknown): void {
        if (obj && typeof obj === 'object' && obj !== null) {
          const objRecord = obj as Record<string, unknown>;
          if (objRecord['@type']) {
            const type = Array.isArray(objRecord['@type']) ? objRecord['@type'] : [objRecord['@type']];
            type.forEach((t: unknown) => {
              if (typeof t === 'string' && !schemaTypes.includes(t)) {
                schemaTypes.push(t);
              }
            });
          }
          
          // Recursively check nested objects
          Object.values(objRecord).forEach(value => {
            if (typeof value === 'object') {
              extractTypes(value);
            }
          });
        }
      }
      
      extractTypes(parsed);
      
      // Basic validation
      if (!parsed['@context']) {
        validationErrors.push(`Schema ${index + 1}: Missing @context`);
      }
      
      if (!parsed['@type']) {
        validationErrors.push(`Schema ${index + 1}: Missing @type`);
      }
      
    } catch {
      validationErrors.push(`Schema ${index + 1}: Invalid JSON syntax`);
    }
  });
  
  return {
    jsonLdCount,
    microdataCount,
    schemaTypes,
    validationErrors
  };
}

function normalizeUrl(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
} 
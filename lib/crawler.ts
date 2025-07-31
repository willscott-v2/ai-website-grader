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
    return parseHtmlContent(html, normalizedUrl);
    
  } catch (error) {
    clearTimeout(timeoutId);
    throw new Error(`Failed to crawl website: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function parseTextContent(text: string): CrawledContent {
  // Handle manual text input as basic HTML
  const fakeHtml = `<html><body><div>${text.replace(/\n/g, '</p><p>')}</div></body></html>`;
  return parseHtmlContent(fakeHtml, 'manual-input');
}

function parseHtmlContent(html: string, url: string): CrawledContent {
  const $ = cheerio.load(html);
  
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
  
  return {
    title,
    metaDescription,
    headings,
    paragraphs,
    images,
    links,
    wordCount,
    html
  };
}

function normalizeUrl(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
} 
import { NextRequest, NextResponse } from 'next/server';
import { analyzeWebsite } from '@/lib/analysis-engine';

export async function POST(request: NextRequest) {
  try {
    // Debug environment variables
    console.log('🔍 API Route - Environment check:');
    console.log('GOOGLE_PAGESPEED_API_KEY exists:', !!process.env.GOOGLE_PAGESPEED_API_KEY);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
    const body = await request.json();
    const { url, textContent } = body;

    if (!url && !textContent) {
      return NextResponse.json(
        { error: 'Either URL or text content is required' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        }
      );
    }

    const analysis = await analyzeWebsite(url || 'manual-input', textContent);

    return NextResponse.json(analysis, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Analysis failed' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}

// Add CORS headers for preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 
import { NextRequest, NextResponse } from 'next/server';
import { analyzeWebsite } from '@/lib/analysis-engine';

export async function POST(request: NextRequest) {
  try {
    // Debug environment variables
    console.log('🔍 API Route - Environment check:');
    console.log('GOOGLE_PAGESPEED_API_KEY exists:', !!process.env.GOOGLE_PAGESPEED_API_KEY);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('All env vars:', Object.keys(process.env).filter(key => key.includes('GOOGLE')));
    
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

// Test endpoint to check environment variables
export async function GET() {
  console.log('🔍 GET request - Environment check:');
  console.log('GOOGLE_PAGESPEED_API_KEY exists:', !!process.env.GOOGLE_PAGESPEED_API_KEY);
  console.log('API Key length:', process.env.GOOGLE_PAGESPEED_API_KEY?.length || 0);
  
  return NextResponse.json({
    apiKeyExists: !!process.env.GOOGLE_PAGESPEED_API_KEY,
    apiKeyLength: process.env.GOOGLE_PAGESPEED_API_KEY?.length || 0,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 
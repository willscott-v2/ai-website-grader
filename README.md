# AI Website Grader - Search Influence

A comprehensive web application that analyzes websites for their readiness in AI-powered search engines, chat interfaces, and modern search algorithms. Built with Next.js 14, TypeScript, and Tailwind CSS.

**Powered by Search Influence** - AI-Driven SEO Experts for Higher Education and Healthcare.

## 🚀 Features

### Core Analysis Categories
- **AI Optimization** (30% weight) - Most critical for future search visibility
  - Content chunkability for AI processing
  - Q&A format optimization
  - Entity recognition and clarity
  - Factual density analysis
  - Semantic clarity assessment

- **Content Quality** (25% weight)
  - Long-tail keyword usage
  - Comprehensive topic coverage
  - Relevance to user intent
  - Accuracy and currency indicators
  - Natural language assessment

- **Technical SEO** (20% weight)
  - Heading structure analysis
  - Meta information optimization
  - Alt text for images
  - Link quality assessment
  - Readability scoring

- **Authority & Trust** (15% weight)
  - Social media presence
  - Company information depth
  - Legal compliance
  - Testimonials and reviews
  - Professional affiliations

- **User Engagement** (10% weight)
  - Contact information accessibility
  - Call-to-action effectiveness
  - Language accessibility
  - Structured content usage
  - Multimedia integration

### Key Features
- **URL Analysis**: Crawl and analyze live websites
- **Text Analysis**: Analyze pasted content directly
- **Comprehensive Scoring**: Weighted scoring system focused on AI optimization
- **Detailed Reports**: In-depth analysis with actionable recommendations
- **Export Options**: PDF and Markdown export functionality
- **Professional UI**: Clean, modern interface similar to RankScale
- **Real-time Analysis**: Instant results with detailed breakdowns

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTML Parsing**: Cheerio
- **PDF Generation**: jsPDF + html2canvas
- **Deployment**: Vercel-ready

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-website-grader
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
ai-website-grader/
├── app/
│   ├── api/analyze/
│   │   └── route.ts          # API endpoint for analysis
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main application page
├── components/
│   ├── URLAnalyzer.tsx       # Main input component
│   ├── ScoreReport.tsx       # Comprehensive report display
│   ├── ScoreCard.tsx         # Individual score cards
│   └── ExportButtons.tsx     # Export functionality
├── lib/
│   ├── analysis-engine.ts    # Main analysis orchestration
│   ├── analyzer.ts           # Core analysis functions
│   ├── crawler.ts            # Website crawling logic
│   ├── exporters.ts          # PDF/Markdown export
│   └── utils.ts              # Utility functions
├── types/
│   └── index.ts              # TypeScript definitions
└── public/                   # Static assets
```

## 🔧 Usage

### URL Analysis
1. Enter a website URL in the input field
2. Click "Analyze Website"
3. View comprehensive results with detailed breakdowns
4. Export results as PDF or Markdown

### Text Analysis
1. Switch to "Analyze Text" mode
2. Paste your website content (minimum 100 characters)
3. Get instant analysis of your content
4. Receive actionable recommendations

### Understanding Scores
- **80-100%**: Excellent - Your content is well-optimized for AI search
- **60-79%**: Good - Minor improvements needed
- **40-59%**: Needs Improvement - Significant optimization required
- **0-39%**: Poor - Major improvements needed

## 🎯 AI Optimization Focus

This tool is specifically designed for the future of search, focusing on:

1. **Content Chunkability**: Breaking content into AI-processable chunks
2. **Q&A Format**: Structuring content for voice search and chatbots
3. **Entity Recognition**: Clear identification of people, places, and concepts
4. **Factual Density**: High information-to-fluff ratio
5. **Semantic Clarity**: Unambiguous language for AI systems

## 📊 Analysis Methodology

The scoring system uses weighted calculations with AI Optimization receiving the highest weight (30%) as it's most critical for future search visibility:

- AI Optimization: 30%
- Content Quality: 25%
- Technical SEO: 20%
- Authority & Trust: 15%
- User Engagement: 10%

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The application is built with Next.js and can be deployed to any platform that supports Node.js applications.

## 🔍 API Usage

The application includes a REST API endpoint for programmatic access:

```typescript
POST /api/analyze
Content-Type: application/json

{
  "url": "https://example.com",
  "textContent": "Optional text content for analysis"
}
```

Response:
```json
{
  "url": "https://example.com",
  "title": "Example Website",
  "overallScore": 75,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "technicalSEO": { /* detailed analysis */ },
  "contentQuality": { /* detailed analysis */ },
  "aiOptimization": { /* detailed analysis */ },
  "authority": { /* detailed analysis */ },
  "engagement": { /* detailed analysis */ },
  "contentImprovements": [ /* priority improvements */ ]
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with Next.js and TypeScript
- Styled with Tailwind CSS
- Icons from Lucide React
- HTML parsing with Cheerio
- PDF generation with jsPDF

---

**AI Website Grader** - Powered by Search Influence • Optimizing content for the AI-powered search future.

Visit [Search Influence](https://www.searchinfluence.com) for AI-driven SEO and digital advertising solutions.

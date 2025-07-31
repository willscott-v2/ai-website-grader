# Deployment Guide

## Quick Deploy to Vercel

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import the `ai-website-grader` repository

2. **Automatic Deployment**
   - Vercel will automatically detect Next.js
   - Build settings are pre-configured
   - Deploy with one click

## Environment Variables

No environment variables are required for this project. All analysis is performed client-side.

## Build Commands

- **Build**: `npm run build`
- **Start**: `npm start`
- **Dev**: `npm run dev`

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Monitoring

- Vercel provides built-in analytics
- Check deployment logs in the Vercel dashboard
- Monitor performance with Vercel Analytics

## Troubleshooting

- **Build fails**: Check that all dependencies are in `package.json`
- **Runtime errors**: Check browser console and Vercel function logs
- **Performance**: Optimize images and reduce bundle size if needed 
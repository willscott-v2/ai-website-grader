import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Website Grader - Search Influence",
  description: "Analyze your website's readiness for AI-powered search engines, chat interfaces, and modern search algorithms. Get comprehensive insights and actionable recommendations.",
  keywords: "AI SEO, website analysis, search optimization, content analysis, AI search, chatbot optimization, Search Influence",
  authors: [{ name: "Search Influence" }],
  creator: "Search Influence",
  publisher: "Search Influence",
  robots: "index, follow",
  openGraph: {
    title: "AI Website Grader - Search Influence",
    description: "Analyze your website's readiness for AI-powered search engines",
    type: "website",
    url: "https://ai-website-grader.searchinfluence.com",
    siteName: "Search Influence",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Website Grader - Search Influence",
    description: "Analyze your website's readiness for AI-powered search engines",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Baloo_2 } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IntlProvider from "@/components/IntlProvider";
import { siteDetails } from '@/data/siteDetails';
import { Analytics } from "@vercel/analytics/next"

import "./globals.css";

const baloo2 = Baloo_2({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteDetails.siteName}`,
    default: siteDetails.metadata.title,
  },
  description: siteDetails.metadata.description,
  metadataBase: new URL(siteDetails.siteUrl),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'fr': '/fr',
      'x-default': '/',
    },
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  keywords: [
    // Core keywords
    'children stories', 'kids storytelling app', 'creative screen time', 'animated storybooks', 'family app', 'kids creativity', 'educational app for kids', 'meaningful screen time',
    // AI search optimization - English
    'best apps for children stories', 'storytelling apps for kids', 'bedtime stories app', 'children story app', 'kids story generator', 'interactive stories for children', 'story apps for kids', 'best storytelling apps children', 'story creator app for kids', 'personalized stories for children',
    // AI search optimization - French
    'meilleures applications histoires enfants', 'application raconter histoires enfants', 'histoires pour enfants app', 'contes enfants application', 'livres audio enfants', 'histoires du soir application', 'generateur histoires enfants', 'application lecture enfants', 'creer histoires enfants', 'histoires personnalisees enfants'
  ],
  authors: [{ name: 'Fidjoo Team' }],
  creator: 'Fidjoo',
  publisher: 'Fidjoo',
  category: 'Education',
  applicationName: 'Fidjoo',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    url: siteDetails.siteUrl,
    siteName: siteDetails.siteName,
    locale: siteDetails.locale,
    alternateLocale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: `${siteDetails.siteUrl}api/og`,
        width: 1200,
        height: 630,
        alt: siteDetails.siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    images: [`${siteDetails.siteUrl}api/og`],
  },
  appleWebApp: {
    title: siteDetails.siteName,
    capable: true,
    statusBarStyle: 'default',
  },
  appLinks: {
    ios: {
      app_store_id: '6753658765',
      app_name: 'Fidjoo',
      url: siteDetails.appStoreUrl,
    },
    android: {
      package: 'com.fidjoo.app',
      app_name: 'Fidjoo',
      url: siteDetails.googlePlayUrl,
    },
  },
  other: {
    'apple-itunes-app': 'app-id=6753658765',
    'google-play-app': 'app-id=com.fidjoo.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics />
      <body
        className={`${baloo2.className} antialiased`}
      >
        {siteDetails.googleAnalyticsId && <GoogleAnalytics gaId={siteDetails.googleAnalyticsId} />}
        <IntlProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </IntlProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Baloo_2 } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WaitlistDialogProvider } from "@/components/WaitlistDialog";
import { siteDetails } from '@/data/siteDetails';
import { Analytics } from "@vercel/analytics/next"


import "./globals.css";

const baloo2 = Baloo_2({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

export const metadata: Metadata = {
  title: siteDetails.metadata.title,
  description: siteDetails.metadata.description,
  metadataBase: new URL(siteDetails.siteUrl),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  keywords: ['children stories', 'kids storytelling app', 'creative screen time', 'animated storybooks', 'family app', 'kids creativity', 'educational app for kids', 'meaningful screen time'],
  authors: [{ name: 'Fidjoo Team' }],
  creator: 'Fidjoo',
  publisher: 'Fidjoo',
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
        <WaitlistDialogProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </WaitlistDialogProvider>
      </body>
    </html>
  );
}

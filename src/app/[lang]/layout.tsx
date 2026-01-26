import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { locales, Locale, isValidLocale } from '@/i18n/config';
import { siteDetails } from '@/data/siteDetails';
import LocaleProvider from '@/components/LocaleProvider';
import { AuthProvider } from '@/components/AuthProvider';
import { RevenueCatProvider } from '@/components/RevenueCatProvider';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  return {
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en': '/en',
        'fr': '/fr',
        'x-default': '/en',
      },
    },
    openGraph: {
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: lang === 'fr' ? 'en_US' : 'fr_FR',
      url: `${siteDetails.siteUrl}${lang}`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const locale = lang as Locale;

  return (
    <LocaleProvider locale={locale}>
      <AuthProvider>
        <RevenueCatProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </RevenueCatProvider>
      </AuthProvider>
    </LocaleProvider>
  );
}

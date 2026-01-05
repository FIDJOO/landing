import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { locales, Locale, isValidLocale } from '@/i18n/config';
import { siteDetails } from '@/data/siteDetails';
import LocaleProvider from '@/components/LocaleProvider';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
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
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  return (
    <LocaleProvider locale={lang}>
      <Header />
      <main>{children}</main>
      <Footer />
    </LocaleProvider>
  );
}

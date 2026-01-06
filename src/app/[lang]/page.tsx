import { Metadata } from 'next';
import { AllJsonLd } from '@/components/JsonLd';
import HomeContent from '@/components/HomeContent';
import { Locale, isValidLocale, defaultLocale } from '@/i18n/config';
import { siteDetails } from '@/data/siteDetails';

import enMessages from '../../../messages/en.json';
import frMessages from '../../../messages/fr.json';

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  fr: frMessages,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;

  // Guard against invalid locales - use default if lang is not valid
  const validLang = isValidLocale(lang) ? lang : defaultLocale;
  const t = messages[validLang];

  return {
    title: t.metadata.title,
    description: t.metadata.description,
    alternates: {
      canonical: `/${validLang}`,
      languages: {
        en: '/en',
        fr: '/fr',
        'x-default': '/en',
      },
    },
    openGraph: {
      title: t.metadata.title,
      description: t.metadata.description,
      url: `${siteDetails.siteUrl}${validLang}`,
      locale: validLang === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: validLang === 'fr' ? 'en_US' : 'fr_FR',
    },
    twitter: {
      title: t.metadata.title,
      description: t.metadata.description,
    },
  };
}

export default function HomePage() {
  return (
    <>
      <AllJsonLd />
      <HomeContent />
    </>
  );
}

import { Metadata } from 'next';
import { AllJsonLd } from '@/components/JsonLd';
import HomeContent from '@/components/HomeContent';
import { Locale } from '@/i18n/config';
import { siteDetails } from '@/data/siteDetails';

import enMessages from '../../../messages/en.json';
import frMessages from '../../../messages/fr.json';

const messages = {
  en: enMessages,
  fr: frMessages,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = messages[lang];

  return {
    title: t.metadata.title,
    description: t.metadata.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: '/en',
        fr: '/fr',
        'x-default': '/en',
      },
    },
    openGraph: {
      title: t.metadata.title,
      description: t.metadata.description,
      url: `${siteDetails.siteUrl}${lang}`,
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: lang === 'fr' ? 'en_US' : 'fr_FR',
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

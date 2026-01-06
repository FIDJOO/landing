import { Metadata } from 'next';
import { Locale, isValidLocale, defaultLocale } from '@/i18n/config';
import { siteDetails } from '@/data/siteDetails';
import LegalContent from './LegalContent';

import enMessages from '../../../../messages/en.json';
import frMessages from '../../../../messages/fr.json';

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
  const validLang = isValidLocale(lang) ? lang : defaultLocale;
  const t = messages[validLang];

  return {
    title: t.pages.legal.metaTitle,
    description: t.pages.legal.metaDescription,
    alternates: {
      canonical: `/${validLang}/legal`,
      languages: {
        en: '/en/legal',
        fr: '/fr/legal',
        'x-default': '/en/legal',
      },
    },
    openGraph: {
      title: t.pages.legal.metaTitle,
      description: t.pages.legal.metaDescription,
      url: `${siteDetails.siteUrl}${validLang}/legal`,
      locale: validLang === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: validLang === 'fr' ? 'en_US' : 'fr_FR',
    },
    twitter: {
      title: t.pages.legal.metaTitle,
      description: t.pages.legal.metaDescription,
    },
  };
}

export default function LegalPage() {
  return <LegalContent />;
}

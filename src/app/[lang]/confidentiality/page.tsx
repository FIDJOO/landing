import { Metadata } from 'next';
import { Locale, isValidLocale, defaultLocale } from '@/i18n/config';
import { siteDetails } from '@/data/siteDetails';
import ConfidentialityContent from './ConfidentialityContent';

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
    title: t.pages.confidentiality.metaTitle,
    description: t.pages.confidentiality.metaDescription,
    alternates: {
      canonical: `/${validLang}/confidentiality`,
      languages: {
        en: '/en/confidentiality',
        fr: '/fr/confidentiality',
        'x-default': '/en/confidentiality',
      },
    },
    openGraph: {
      title: t.pages.confidentiality.metaTitle,
      description: t.pages.confidentiality.metaDescription,
      url: `${siteDetails.siteUrl}${validLang}/confidentiality`,
      locale: validLang === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: validLang === 'fr' ? 'en_US' : 'fr_FR',
    },
    twitter: {
      title: t.pages.confidentiality.metaTitle,
      description: t.pages.confidentiality.metaDescription,
    },
  };
}

export default function ConfidentialityPage() {
  return <ConfidentialityContent />;
}

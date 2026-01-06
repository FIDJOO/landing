import { Metadata } from 'next';
import { Locale, isValidLocale, defaultLocale } from '@/i18n/config';
import { siteDetails } from '@/data/siteDetails';
import PrivacyContent from './PrivacyContent';

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
    title: t.pages.privacy.metaTitle,
    description: t.pages.privacy.metaDescription,
    alternates: {
      canonical: `/${validLang}/privacy`,
      languages: {
        en: '/en/privacy',
        fr: '/fr/privacy',
        'x-default': '/en/privacy',
      },
    },
    openGraph: {
      title: t.pages.privacy.metaTitle,
      description: t.pages.privacy.metaDescription,
      url: `${siteDetails.siteUrl}${validLang}/privacy`,
      locale: validLang === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: validLang === 'fr' ? 'en_US' : 'fr_FR',
    },
    twitter: {
      title: t.pages.privacy.metaTitle,
      description: t.pages.privacy.metaDescription,
    },
  };
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}

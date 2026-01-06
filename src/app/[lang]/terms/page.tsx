import { Metadata } from 'next';
import { Locale, isValidLocale, defaultLocale } from '@/i18n/config';
import { siteDetails } from '@/data/siteDetails';
import TermsContent from './TermsContent';

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
    title: t.pages.terms.metaTitle,
    description: t.pages.terms.metaDescription,
    alternates: {
      canonical: `/${validLang}/terms`,
      languages: {
        en: '/en/terms',
        fr: '/fr/terms',
        'x-default': '/en/terms',
      },
    },
    openGraph: {
      title: t.pages.terms.metaTitle,
      description: t.pages.terms.metaDescription,
      url: `${siteDetails.siteUrl}${validLang}/terms`,
      locale: validLang === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: validLang === 'fr' ? 'en_US' : 'fr_FR',
    },
    twitter: {
      title: t.pages.terms.metaTitle,
      description: t.pages.terms.metaDescription,
    },
  };
}

export default function TermsPage() {
  return <TermsContent />;
}

import { Metadata } from 'next';
import { Locale, isValidLocale, defaultLocale } from '@/i18n/config';
import { siteDetails } from '@/data/siteDetails';
import ContactContent from './ContactContent';

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
    title: t.pages.contact.metaTitle,
    description: t.pages.contact.metaDescription,
    alternates: {
      canonical: `/${validLang}/contact`,
      languages: {
        en: '/en/contact',
        fr: '/fr/contact',
        'x-default': '/en/contact',
      },
    },
    openGraph: {
      title: t.pages.contact.metaTitle,
      description: t.pages.contact.metaDescription,
      url: `${siteDetails.siteUrl}${validLang}/contact`,
      locale: validLang === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: validLang === 'fr' ? 'en_US' : 'fr_FR',
    },
    twitter: {
      title: t.pages.contact.metaTitle,
      description: t.pages.contact.metaDescription,
    },
  };
}

export default function ContactPage() {
  return <ContactContent />;
}

import { Metadata } from 'next';
import { Locale, isValidLocale, defaultLocale, locales } from '@/i18n/config';
import { siteDetails } from '@/data/siteDetails';
import ContactContent from './ContactContent';
import { ContactPageJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';

import enMessages from '../../../../messages/en.json';
import frMessages from '../../../../messages/fr.json';

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  fr: frMessages,
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const validLang = isValidLocale(lang) ? lang : defaultLocale;
  const baseUrl = siteDetails.siteUrl.replace(/\/$/, '');

  return (
    <>
      <ContactPageJsonLd locale={validLang} />
      <BreadcrumbJsonLd
        items={[
          { name: validLang === 'fr' ? 'Accueil' : 'Home', url: `${baseUrl}/${validLang}` },
          { name: validLang === 'fr' ? 'Contact' : 'Contact', url: `${baseUrl}/${validLang}/contact` },
        ]}
      />
      <ContactContent />
    </>
  );
}

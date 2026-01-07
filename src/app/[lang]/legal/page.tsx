import { Metadata } from 'next';
import { Locale, isValidLocale, defaultLocale, locales } from '@/i18n/config';
import { siteDetails } from '@/data/siteDetails';
import LegalContent from './LegalContent';
import { WebPageJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';

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

export default async function LegalPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const validLang = isValidLocale(lang) ? lang : defaultLocale;
  const t = messages[validLang];
  const baseUrl = siteDetails.siteUrl.replace(/\/$/, '');

  return (
    <>
      <WebPageJsonLd
        name={t.pages.legal.metaTitle}
        description={t.pages.legal.metaDescription}
        url={`${baseUrl}/${validLang}/legal`}
        locale={validLang}
      />
      <BreadcrumbJsonLd
        items={[
          { name: validLang === 'fr' ? 'Accueil' : 'Home', url: `${baseUrl}/${validLang}` },
          { name: t.legal.title, url: `${baseUrl}/${validLang}/legal` },
        ]}
      />
      <LegalContent />
    </>
  );
}

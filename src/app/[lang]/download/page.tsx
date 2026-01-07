import { Metadata } from 'next';
import { Locale, isValidLocale, defaultLocale, locales } from '@/i18n/config';
import { siteDetails } from '@/data/siteDetails';
import DownloadContent from './DownloadContent';
import { DownloadPageJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';

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
    title: t.pages.download.metaTitle,
    description: t.pages.download.metaDescription,
    alternates: {
      canonical: `/${validLang}/download`,
      languages: {
        en: '/en/download',
        fr: '/fr/download',
        'x-default': '/en/download',
      },
    },
    openGraph: {
      title: t.pages.download.metaTitle,
      description: t.pages.download.metaDescription,
      url: `${siteDetails.siteUrl}${validLang}/download`,
      locale: validLang === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: validLang === 'fr' ? 'en_US' : 'fr_FR',
    },
    twitter: {
      title: t.pages.download.metaTitle,
      description: t.pages.download.metaDescription,
    },
  };
}

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const validLang = isValidLocale(lang) ? lang : defaultLocale;
  const baseUrl = siteDetails.siteUrl.replace(/\/$/, '');

  return (
    <>
      <DownloadPageJsonLd locale={validLang} />
      <BreadcrumbJsonLd
        items={[
          { name: validLang === 'fr' ? 'Accueil' : 'Home', url: `${baseUrl}/${validLang}` },
          { name: validLang === 'fr' ? 'Télécharger' : 'Download', url: `${baseUrl}/${validLang}/download` },
        ]}
      />
      <DownloadContent />
    </>
  );
}

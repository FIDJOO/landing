import { Metadata } from 'next';
import { Locale, isValidLocale, defaultLocale, locales } from '@/i18n/config';
import { siteDetails } from '@/data/siteDetails';
import ConfidentialityContent from './ConfidentialityContent';
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

export default async function ConfidentialityPage({
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
        name={t.pages.confidentiality.metaTitle}
        description={t.pages.confidentiality.metaDescription}
        url={`${baseUrl}/${validLang}/confidentiality`}
        locale={validLang}
      />
      <BreadcrumbJsonLd
        items={[
          { name: validLang === 'fr' ? 'Accueil' : 'Home', url: `${baseUrl}/${validLang}` },
          { name: validLang === 'fr' ? 'Mentions Légales' : 'Legal', url: `${baseUrl}/${validLang}/legal` },
          { name: t.legal.pages.confidentiality.title, url: `${baseUrl}/${validLang}/confidentiality` },
        ]}
      />
      <ConfidentialityContent />
    </>
  );
}

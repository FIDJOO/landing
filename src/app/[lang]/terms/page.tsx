import { Metadata } from 'next';
import { Locale, isValidLocale, defaultLocale, locales } from '@/i18n/config';
import { siteDetails } from '@/data/siteDetails';
import TermsContent from './TermsContent';
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

export default async function TermsPage({
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
        name={t.pages.terms.metaTitle}
        description={t.pages.terms.metaDescription}
        url={`${baseUrl}/${validLang}/terms`}
        locale={validLang}
      />
      <BreadcrumbJsonLd
        items={[
          { name: validLang === 'fr' ? 'Accueil' : 'Home', url: `${baseUrl}/${validLang}` },
          { name: validLang === 'fr' ? 'Mentions Légales' : 'Legal', url: `${baseUrl}/${validLang}/legal` },
          { name: t.legal.pages.terms.title, url: `${baseUrl}/${validLang}/terms` },
        ]}
      />
      <TermsContent />
    </>
  );
}

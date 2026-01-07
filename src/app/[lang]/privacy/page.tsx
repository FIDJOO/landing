import { Metadata } from 'next';
import { Locale, isValidLocale, defaultLocale, locales } from '@/i18n/config';
import { siteDetails } from '@/data/siteDetails';
import PrivacyContent from './PrivacyContent';
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

export default async function PrivacyPage({
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
        name={t.pages.privacy.metaTitle}
        description={t.pages.privacy.metaDescription}
        url={`${baseUrl}/${validLang}/privacy`}
        locale={validLang}
      />
      <BreadcrumbJsonLd
        items={[
          { name: validLang === 'fr' ? 'Accueil' : 'Home', url: `${baseUrl}/${validLang}` },
          { name: validLang === 'fr' ? 'Mentions Légales' : 'Legal', url: `${baseUrl}/${validLang}/legal` },
          { name: t.legal.pages.privacy.title, url: `${baseUrl}/${validLang}/privacy` },
        ]}
      />
      <PrivacyContent />
    </>
  );
}

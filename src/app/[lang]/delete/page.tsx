import { Metadata } from 'next';
import { Locale, isValidLocale, defaultLocale, locales } from '@/i18n/config';
import { siteDetails } from '@/data/siteDetails';
import DeleteContent from './DeleteContent';
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
    title: t.pages.delete.metaTitle,
    description: t.pages.delete.metaDescription,
    alternates: {
      canonical: `/${validLang}/delete`,
      languages: {
        en: '/en/delete',
        fr: '/fr/delete',
        'x-default': '/en/delete',
      },
    },
    openGraph: {
      title: t.pages.delete.metaTitle,
      description: t.pages.delete.metaDescription,
      url: `${siteDetails.siteUrl}${validLang}/delete`,
      locale: validLang === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: validLang === 'fr' ? 'en_US' : 'fr_FR',
    },
    twitter: {
      title: t.pages.delete.metaTitle,
      description: t.pages.delete.metaDescription,
    },
  };
}

export default async function DeletePage({
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
        name={t.pages.delete.metaTitle}
        description={t.pages.delete.metaDescription}
        url={`${baseUrl}/${validLang}/delete`}
        locale={validLang}
      />
      <BreadcrumbJsonLd
        items={[
          { name: validLang === 'fr' ? 'Accueil' : 'Home', url: `${baseUrl}/${validLang}` },
          { name: validLang === 'fr' ? 'Mentions Légales' : 'Legal', url: `${baseUrl}/${validLang}/legal` },
          { name: t.legal.pages.delete.title, url: `${baseUrl}/${validLang}/delete` },
        ]}
      />
      <DeleteContent />
    </>
  );
}

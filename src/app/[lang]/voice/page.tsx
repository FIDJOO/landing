import { Metadata } from 'next';
import { Locale, isValidLocale, defaultLocale, locales } from '@/i18n/config';
import { siteDetails } from '@/data/siteDetails';
import VoiceContent from './VoiceContent';
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
    title: t.pages.voice.metaTitle,
    description: t.pages.voice.metaDescription,
    alternates: {
      canonical: `/${validLang}/voice`,
      languages: {
        en: '/en/voice',
        fr: '/fr/voice',
        'x-default': '/en/voice',
      },
    },
    openGraph: {
      title: t.pages.voice.metaTitle,
      description: t.pages.voice.metaDescription,
      url: `${siteDetails.siteUrl}${validLang}/voice`,
      locale: validLang === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: validLang === 'fr' ? 'en_US' : 'fr_FR',
    },
    twitter: {
      title: t.pages.voice.metaTitle,
      description: t.pages.voice.metaDescription,
    },
  };
}

export default async function VoicePage({
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
        name={t.pages.voice.metaTitle}
        description={t.pages.voice.metaDescription}
        url={`${baseUrl}/${validLang}/voice`}
        locale={validLang}
      />
      <BreadcrumbJsonLd
        items={[
          { name: validLang === 'fr' ? 'Accueil' : 'Home', url: `${baseUrl}/${validLang}` },
          { name: validLang === 'fr' ? 'Mentions Légales' : 'Legal', url: `${baseUrl}/${validLang}/legal` },
          { name: t.legal.pages.voice.title, url: `${baseUrl}/${validLang}/voice` },
        ]}
      />
      <VoiceContent />
    </>
  );
}

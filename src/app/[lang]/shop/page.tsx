import { Metadata } from 'next';
import { Locale, isValidLocale, defaultLocale, locales } from '@/i18n/config';
import { siteDetails } from '@/data/siteDetails';
import ShopContent from './ShopContent';

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
    title: t.shop.title + "| FIDJOO",
    description: t.shop.description,
    alternates: {
      canonical: `${siteDetails.siteUrl}${validLang}/shop`,
      languages: {
        en: `${siteDetails.siteUrl}en/shop`,
        fr: `${siteDetails.siteUrl}fr/shop`,
        'x-default': `${siteDetails.siteUrl}en/shop`,
      },
    },
    robots: { index: false, follow: false },
  };
}

export default async function ShopPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const validLang = isValidLocale(lang) ? lang : defaultLocale;

  return <ShopContent locale={validLang} />;
}

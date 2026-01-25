import { Metadata } from 'next';
import { Locale, isValidLocale, defaultLocale, locales } from '@/i18n/config';
import { siteDetails } from '@/data/siteDetails';
import SignInContent from './SignInContent';

import enMessages from '../../../../../messages/en.json';
import frMessages from '../../../../../messages/fr.json';

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
    title: t.auth.signIn + ' | ' + siteDetails.siteName,
    description: validLang === 'fr'
      ? 'Connectez-vous a votre compte Fidjoo pour acceder a la boutique'
      : 'Sign in to your Fidjoo account to access the shop',
    alternates: {
      canonical: `${siteDetails.siteUrl}${validLang}/auth/sign-in`,
      languages: {
        en: `${siteDetails.siteUrl}en/auth/sign-in`,
        fr: `${siteDetails.siteUrl}fr/auth/sign-in`,
        'x-default': `${siteDetails.siteUrl}en/auth/sign-in`,
      },
    },
    robots: { index: false, follow: false },
  };
}

export default async function SignInPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ redirectTo?: string; error?: string }>;
}) {
  const { lang } = await params;
  const { redirectTo, error } = await searchParams;
  const validLang = isValidLocale(lang) ? lang : defaultLocale;

  return <SignInContent locale={validLang} redirectTo={redirectTo} error={error} />;
}

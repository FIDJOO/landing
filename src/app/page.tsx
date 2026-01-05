import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { defaultLocale, Locale, francophoneCountries } from '@/i18n/config';

function getPreferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const languages = acceptLanguage.split(',').map(lang => {
    const [code] = lang.trim().split(';');
    return code.split('-')[0].toLowerCase();
  });

  if (languages.includes('fr')) {
    return 'fr';
  }

  return defaultLocale;
}

async function getGeoLocale(headersList: Headers): Promise<Locale | null> {
  // Vercel provides geo headers
  const country = headersList.get('x-vercel-ip-country');
  if (country && francophoneCountries.includes(country)) {
    return 'fr';
  }
  return null;
}

export default async function RootPage() {
  const headersList = await headers();

  // 1. Try geo-based detection (Vercel headers)
  const geoLocale = await getGeoLocale(headersList);
  if (geoLocale) {
    redirect(`/${geoLocale}`);
  }

  // 2. Fall back to Accept-Language header
  const acceptLanguage = headersList.get('accept-language');
  const preferredLocale = getPreferredLocale(acceptLanguage);

  redirect(`/${preferredLocale}`);
}

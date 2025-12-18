'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useState, useEffect, ReactNode } from 'react';
import { Locale, defaultLocale, locales, francophoneCountries } from '@/i18n/config';

// Import messages statically at build time
import enMessages from '../../messages/en.json';
import frMessages from '../../messages/fr.json';

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  fr: frMessages,
};

function getStoredLocale(): Locale | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/NEXT_LOCALE=(\w+)/);
  const locale = match?.[1] as Locale | undefined;
  return locale && locales.includes(locale) ? locale : null;
}

function getBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return defaultLocale;

  const browserLang = navigator.language.split('-')[0];
  if (browserLang === 'fr') return 'fr';

  return defaultLocale;
}

async function getGeoLocale(): Promise<Locale> {
  try {
    // Use a free geo API to detect country
    const response = await fetch('https://ipapi.co/country/', {
      signal: AbortSignal.timeout(2000)
    });
    if (response.ok) {
      const country = await response.text();
      if (francophoneCountries.includes(country.trim())) {
        return 'fr';
      }
    }
  } catch {
    // Ignore errors, fall back to browser locale
  }
  return getBrowserLocale();
}

interface IntlProviderProps {
  children: ReactNode;
}

export default function IntlProvider({ children }: IntlProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const initLocale = async () => {
      // 1. Check cookie first (user preference)
      const storedLocale = getStoredLocale();
      if (storedLocale) {
        setLocale(storedLocale);
        setIsHydrated(true);
        return;
      }

      // 2. Try geo detection, fallback to browser locale
      const detectedLocale = await getGeoLocale();
      setLocale(detectedLocale);

      // Save detected locale to cookie
      document.cookie = `NEXT_LOCALE=${detectedLocale};path=/;max-age=31536000`;
      setIsHydrated(true);
    };

    initLocale();
  }, []);

  // Listen for locale changes from LanguageSwitcher
  useEffect(() => {
    const handleLocaleChange = () => {
      const newLocale = getStoredLocale();
      if (newLocale && newLocale !== locale) {
        setLocale(newLocale);
      }
    };

    // Custom event for instant locale switching
    window.addEventListener('localeChange', handleLocaleChange);
    return () => window.removeEventListener('localeChange', handleLocaleChange);
  }, [locale]);

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages[locale]}
      // Prevent hydration mismatch by showing default locale until client is ready
      key={isHydrated ? locale : 'default'}
      timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
    >
      {children}
    </NextIntlClientProvider>
  );
}

// Export for use in LanguageSwitcher
export function setLocale(newLocale: Locale) {
  document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
  window.dispatchEvent(new Event('localeChange'));
}

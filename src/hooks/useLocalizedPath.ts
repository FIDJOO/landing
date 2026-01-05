'use client';

import { useLocale } from 'next-intl';
import { Locale } from '@/i18n/config';

export function useLocalizedPath() {
  const locale = useLocale() as Locale;

  return (path: string) => {
    // Handle hash links (anchor links on same page)
    if (path.startsWith('#')) {
      return path;
    }

    // Handle absolute URLs
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    // Handle relative paths - add locale prefix
    if (path.startsWith('/')) {
      return `/${locale}${path}`;
    }

    // For paths without leading slash
    return `/${locale}/${path}`;
  };
}

export function useCurrentLocale(): Locale {
  return useLocale() as Locale;
}

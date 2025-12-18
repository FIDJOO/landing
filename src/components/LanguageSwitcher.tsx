'use client';

import { useLocale } from 'next-intl';
import { Locale, locales } from '@/i18n/config';
import { setLocale } from './IntlProvider';

const localeNames: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) return;
    setLocale(newLocale);
  };

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            locale === loc
              ? 'bg-white text-foreground shadow-sm'
              : 'text-gray-500 hover:text-foreground'
          }`}
          aria-label={`Switch to ${localeNames[loc]}`}
        >
          <span className="hidden sm:inline">{localeNames[loc]}</span>
        </button>
      ))}
    </div>
  );
}

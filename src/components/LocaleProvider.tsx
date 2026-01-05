'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { Locale } from '@/i18n/config';

import enMessages from '../../messages/en.json';
import frMessages from '../../messages/fr.json';

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  fr: frMessages,
};

interface LocaleProviderProps {
  children: ReactNode;
  locale: Locale;
}

export default function LocaleProvider({ children, locale }: LocaleProviderProps) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages[locale]}
      timeZone="Europe/Paris"
    >
      {children}
    </NextIntlClientProvider>
  );
}

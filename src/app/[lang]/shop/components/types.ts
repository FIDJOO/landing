import type { Locale } from '@/i18n/config';
import type enMessages from '../../../../../messages/en.json';

export type ShopTranslations = typeof enMessages;

export interface ShopComponentProps {
  t: ShopTranslations;
}

export interface ShopContentProps {
  locale: Locale;
}

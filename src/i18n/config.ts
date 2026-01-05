export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Francophone countries ISO codes
export const francophoneCountries = [
  'FR', // France
  'BE', // Belgium
  'CH', // Switzerland
  'CA', // Canada
  'LU', // Luxembourg
  'MC', // Monaco
  'SN', // Senegal
  'CI', // Ivory Coast
  'ML', // Mali
  'BF', // Burkina Faso
  'NE', // Niger
  'TG', // Togo
  'BJ', // Benin
  'GA', // Gabon
  'CG', // Congo
  'CD', // DR Congo
  'CM', // Cameroon
  'MG', // Madagascar
  'HT', // Haiti
  'MA', // Morocco
  'TN', // Tunisia
  'DZ', // Algeria
  'MU', // Mauritius
  'RE', // Reunion
  'GP', // Guadeloupe
  'MQ', // Martinique
  'GF', // French Guiana
  'PF', // French Polynesia
  'NC', // New Caledonia
];


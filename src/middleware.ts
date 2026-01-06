import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, francophoneCountries, Locale } from '@/i18n/config';

// Paths that should not be processed by the middleware
const PUBLIC_FILE = /\.(.*)$/;

// Common bot/crawler user agents for OG preview, SEO, etc.
const BOT_USER_AGENTS = [
  'facebookexternalhit',
  'Facebot',
  'Twitterbot',
  'LinkedInBot',
  'WhatsApp',
  'Slackbot',
  'TelegramBot',
  'Discordbot',
  'Googlebot',
  'bingbot',
  'Baiduspider',
  'YandexBot',
  'DuckDuckBot',
  'Applebot',
];

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return BOT_USER_AGENTS.some(bot => userAgent.toLowerCase().includes(bot.toLowerCase()));
}

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

function getLocaleFromRequest(request: NextRequest): Locale {
  // 1. Try geo-based detection (Vercel headers)
  const country = request.headers.get('x-vercel-ip-country');
  if (country && francophoneCountries.includes(country)) {
    return 'fr';
  }

  // 2. Fall back to Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  return getPreferredLocale(acceptLanguage);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a locale prefix
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const userAgent = request.headers.get('user-agent');
  const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;

  // For bots/crawlers: use rewrite (no redirect) to serve English content
  // This ensures OG previews always show English metadata
  if (isBot(userAgent)) {
    return NextResponse.rewrite(newUrl);
  }

  // For regular users: redirect to appropriate locale based on geo/language
  const locale = getLocaleFromRequest(request);
  const localizedUrl = new URL(`/${locale}${pathname}`, request.url);
  localizedUrl.search = request.nextUrl.search;

  return NextResponse.redirect(localizedUrl);
}

export const config = {
  matcher: [
    // Match all paths except static files and API
    '/((?!_next/static|_next/image|favicon.ico|images|.*\\..*).*)',
  ],
};

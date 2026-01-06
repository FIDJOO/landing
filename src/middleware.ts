import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, francophoneCountries, Locale } from '@/i18n/config';

// Paths that should not be processed by the middleware
const PUBLIC_FILE = /\.(.*)$/;

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

  // Redirect to the appropriate locale
  const locale = getLocaleFromRequest(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);

  // Preserve query string
  newUrl.search = request.nextUrl.search;

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Match all paths except static files and API
    '/((?!_next/static|_next/image|favicon.ico|images|.*\\..*).*)',
  ],
};

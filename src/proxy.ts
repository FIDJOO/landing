import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, francophoneCountries, Locale } from '@/i18n/config';
import { createMiddlewareClient } from '@/lib/supabase/middleware';

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

// Protected routes (paths without locale prefix)
const PROTECTED_ROUTES = ['/shop'];

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

function extractLocaleFromPath(pathname: string): { locale: Locale | null; pathWithoutLocale: string } {
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return {
        locale,
        pathWithoutLocale: pathname.replace(`/${locale}`, '') || '/',
      };
    }
  }
  return { locale: null, pathWithoutLocale: pathname };
}

function isProtectedRoute(pathWithoutLocale: string): boolean {
  return PROTECTED_ROUTES.some(route =>
    pathWithoutLocale.startsWith(route) || pathWithoutLocale === route
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public files, API routes, Next.js internals, and auth callback
  // Auth callback must be skipped to preserve PKCE code_verifier cookies
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('/auth/callback') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Extract locale info first (no auth needed for locale redirect)
  const { locale: pathLocale, pathWithoutLocale } = extractLocaleFromPath(pathname);

  // Safety net: if OAuth code param lands on wrong route, redirect to callback
  const code = request.nextUrl.searchParams.get('code');
  if (code && !pathname.includes('/auth/callback')) {
    const locale = pathLocale || getLocaleFromRequest(request);
    const callbackUrl = new URL(`/${locale}/auth/callback`, request.url);
    callbackUrl.search = request.nextUrl.search;
    return NextResponse.redirect(callbackUrl);
  }

  // If path has no locale prefix, redirect to appropriate locale
  if (!pathLocale) {
    const userAgent = request.headers.get('user-agent');

    // For bots/crawlers: use rewrite (no redirect) to serve English content
    if (isBot(userAgent)) {
      const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
      newUrl.search = request.nextUrl.search;
      return NextResponse.rewrite(newUrl);
    }

    // For regular users: redirect to appropriate locale based on geo/language
    const locale = getLocaleFromRequest(request);
    const localizedUrl = new URL(`/${locale}${pathname}`, request.url);
    localizedUrl.search = request.nextUrl.search;
    return NextResponse.redirect(localizedUrl);
  }

  // Only check auth for protected routes (avoid unnecessary Supabase calls)
  if (isProtectedRoute(pathWithoutLocale)) {
    const { supabase, response } = createMiddlewareClient(request);

    // Use getUser() for secure validation - getSession() can be spoofed
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      const signInUrl = new URL(`/${pathLocale}/auth/sign-in`, request.url);
      signInUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(signInUrl);
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and API
    '/((?!_next/static|_next/image|favicon.ico|images|.*\\..*).*)',
  ],
};

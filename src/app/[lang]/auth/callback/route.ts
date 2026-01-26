import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { isValidLocale, defaultLocale } from '@/i18n/config';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;

  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const redirectTo = searchParams.get('redirectTo') || `/${locale}/shop`;
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  // Handle OAuth errors
  if (error) {
    const errorUrl = new URL(`/${locale}/auth/sign-in`, request.url);
    errorUrl.searchParams.set('error', errorDescription || error);
    return NextResponse.redirect(errorUrl);
  }

  if (code) {
    // Create supabase client with cookie handling
    let response = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => {
              request.cookies.set(name, value);
            });
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      const errorUrl = new URL(`/${locale}/auth/sign-in`, request.url);
      errorUrl.searchParams.set('error', exchangeError.message);
      return NextResponse.redirect(errorUrl);
    }

    // Successful auth - redirect to intended destination
    const successUrl = new URL(redirectTo, request.url);

    // Copy cookies from response
    const redirectResponse = NextResponse.redirect(successUrl);
    response.cookies.getAll().forEach(cookie => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });

    return redirectResponse;
  }

  // No code, redirect to sign-in
  return NextResponse.redirect(new URL(`/${locale}/auth/sign-in`, request.url));
}

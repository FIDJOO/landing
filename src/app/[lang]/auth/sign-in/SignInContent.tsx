'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { Locale } from '@/i18n/config';
import Button3D from '@/components/ui/Button3D';
import { useAuth } from '@/components/AuthProvider';
import { useAppleSignIn } from '@/hooks/useAppleSignIn';
import { siteDetails } from '@/data/siteDetails';

import enMessages from '../../../../../messages/en.json';
import frMessages from '../../../../../messages/fr.json';

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  fr: frMessages,
};

interface SignInContentProps {
  locale: Locale;
  redirectTo?: string;
  error?: string;
}

export default function SignInContent({ locale, redirectTo, error }: SignInContentProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(error);

  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const { user, fidjooUser, error: authProviderError, isLoading: authLoading } = useAuth();
  const t = messages[locale];

  const handleAppleSuccess = useCallback(() => {
    // Auth state change will trigger redirect via useEffect
  }, []);

  const handleAppleError = useCallback((errorMsg: string) => {
    setAuthError(errorMsg);
  }, []);

  const { signIn: appleSignIn, isLoading: isAppleLoading } = useAppleSignIn({
    onSuccess: handleAppleSuccess,
    onError: handleAppleError,
  });

  // Handle case where user is authenticated but has no Fidjoo account
  const hasNoAccount = authProviderError === 'no_account';

  // Redirect if already authenticated and has account
  useEffect(() => {
    if (!authLoading && user && fidjooUser) {
      router.push(redirectTo || `/${locale}/shop`);
    }
  }, [user, fidjooUser, authLoading, router, redirectTo, locale]);

  const getCallbackUrl = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const callback = `${origin}/${locale}/auth/callback`;
    return redirectTo ? `${callback}?redirectTo=${encodeURIComponent(redirectTo)}` : callback;
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(undefined);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setAuthError(signInError.message);
      setIsLoading(false);
      return;
    }

    // Auth state change will trigger redirect via useEffect
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setAuthError(undefined);

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getCallbackUrl(),
      },
    });

    if (oauthError) {
      setAuthError(oauthError.message);
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setAuthError(undefined);
    await appleSignIn();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setAuthError(undefined);
  };

  // Show "no account" message if authenticated but no Fidjoo user
  if (hasNoAccount && user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md p-8 bg-card rounded-2xl shadow-lg text-center">
          <Image
            src={siteDetails.textLogo}
            alt={siteDetails.siteName}
            width={120}
            height={40}
            className="mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold mb-4 text-foreground">
            {t.auth.noAccountTitle}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t.auth.noAccountMessage}
          </p>
          <div className="space-y-3">
            <Link href={`/${locale}/download`}>
              <Button3D variant="primary" size="lg" className="w-full">
                {t.auth.downloadApp}
              </Button3D>
            </Link>
            <Button3D
              variant="outline"
              size="md"
              className="w-full"
              onClick={handleSignOut}
            >
              {t.auth.tryAnotherAccount}
            </Button3D>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-8 bg-card rounded-2xl shadow-lg">
        <Link href={`/${locale}`} className="block mb-6">
          <Image
            src={siteDetails.textLogo}
            alt={siteDetails.siteName}
            width={120}
            height={40}
            className="mx-auto"
          />
        </Link>

        <h1 className="text-2xl font-bold text-center mb-6 text-foreground">
          {t.auth.signIn}
        </h1>

        {authError && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
            {authError}
          </div>
        )}

        {/* OAuth Buttons */}
        <div className="space-y-3 mb-6">
          <Button3D
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center gap-3"
            onClick={handleGoogleSignIn}
            disabled={isLoading || isAppleLoading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t.auth.continueWithGoogle}
          </Button3D>

          <Button3D
            variant="outline"
            size="lg"
            className="w-full flex items-center justify-center gap-3"
            onClick={handleAppleSignIn}
            disabled={isLoading || isAppleLoading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            {t.auth.continueWithApple}
          </Button3D>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-gray-500">
              {t.auth.or}
            </span>
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">{t.auth.email}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.auth.email}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">{t.auth.password}</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.auth.password}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              required
              disabled={isLoading}
            />
          </div>
          <Button3D
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? t.auth.loading : t.auth.signIn}
          </Button3D>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {t.auth.noAccount}
          </p>
          <Link href={`/${locale}/download`}>
            <Button3D variant="outline" size="md" className="w-full">
              {t.auth.createAccount}
            </Button3D>
          </Link>
        </div>
      </div>
    </div>
  );
}

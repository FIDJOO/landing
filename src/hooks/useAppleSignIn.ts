'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

const APPLE_SCRIPT_ID = 'apple-signin-sdk';
const APPLE_SCRIPT_URL = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';

interface UseAppleSignInOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useAppleSignIn({ onSuccess, onError }: UseAppleSignInOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const nonceRef = useRef<string>('');

  // Load Apple Sign In script
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if script already exists
    if (document.getElementById(APPLE_SCRIPT_ID)) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.id = APPLE_SCRIPT_ID;
    script.src = APPLE_SCRIPT_URL;
    script.async = true;

    script.onload = () => {
      setIsScriptLoaded(true);
    };

    script.onerror = () => {
      console.error('Failed to load Apple Sign In script');
      onError?.('Failed to load Apple Sign In');
    };

    document.head.appendChild(script);

    return () => {
      // Don't remove the script on cleanup - it should persist
    };
  }, [onError]);

  const signIn = useCallback(async () => {
    if (!isScriptLoaded || typeof AppleID === 'undefined') {
      onError?.('Apple Sign In not ready');
      return;
    }

    const clientId = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID;
    if (!clientId) {
      onError?.('Apple Sign In not configured');
      console.error('NEXT_PUBLIC_APPLE_CLIENT_ID is not set');
      return;
    }

    setIsLoading(true);

    try {
      // Generate raw nonce and hash it for Apple
      const rawNonce = crypto.randomUUID();
      nonceRef.current = rawNonce;

      // Apple expects SHA256 hash of nonce, Supabase expects raw nonce
      const encoder = new TextEncoder();
      const data = encoder.encode(rawNonce);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashedNonce = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      const redirectURI = process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://fidjoo.com';

      AppleID.auth.init({
        clientId,
        scope: 'name email',
        redirectURI,
        usePopup: true,
        nonce: hashedNonce,
      });

      // Trigger sign in
      const response = await AppleID.auth.signIn();

      // Get the ID token from Apple's response
      const idToken = response.authorization.id_token;

      if (!idToken) {
        throw new Error('No ID token received from Apple');
      }

      // Sign in with Supabase using the ID token
      const supabase = getSupabaseBrowserClient();
      const { error: supabaseError } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: idToken,
        nonce: nonceRef.current,
      });

      if (supabaseError) {
        throw supabaseError;
      }

      // Apple only provides user name on first sign-in
      // Save it to user metadata if available
      if (response.user?.name) {
        const nameParts = [
          response.user.name.firstName,
          response.user.name.middleName,
          response.user.name.lastName,
        ].filter(Boolean);

        const fullName = nameParts.join(' ');

        if (fullName) {
          await supabase.auth.updateUser({
            data: {
              full_name: fullName,
              given_name: response.user.name.firstName,
              family_name: response.user.name.lastName,
            },
          });
        }
      }

      onSuccess?.();
    } catch (error) {
      console.error('Apple Sign In error:', error);

      // Handle user cancellation
      if (error && typeof error === 'object' && 'error' in error) {
        const appleError = error as { error: string };
        if (appleError.error === 'popup_closed_by_user') {
          setIsLoading(false);
          return; // User cancelled, don't show error
        }
      }

      const errorMessage = error instanceof Error ? error.message : 'Apple Sign In failed';
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isScriptLoaded, onSuccess, onError]);

  return {
    signIn,
    isLoading,
    isReady: isScriptLoaded,
  };
}

'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useRef, useCallback } from 'react';
import { Session, User, AuthChangeEvent } from '@supabase/supabase-js';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export interface FidjooUser {
  id: string;
  auth_id: string;
  revenuecat_app_user_id: string | null;
  email: string;
  first_name: string | null;
  last_name: string | null;
  subscription_status: 'active' | 'inactive' | 'trial' | 'cancelled' | null;
  language: 'en' | 'fr' | null;
  created_at: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  fidjooUser: FidjooUser | null;
  isLoading: boolean;
  error: string | null;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [fidjooUser, setFidjooUser] = useState<FidjooUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use ref to ensure supabase client is stable across renders
  const supabaseRef = useRef(getSupabaseBrowserClient());
  const supabase = supabaseRef.current;

  const fetchFidjooUser = useCallback(async (authId: string, mounted: { current: boolean }) => {
    console.log('[AuthProvider] Fetching Fidjoo user for:', authId);
    const { data, error: dbError } = await supabase
      .from('users')
      .select('id, auth_id, revenuecat_app_user_id, email, first_name, last_name, subscription_status, language, created_at')
      .eq('auth_id', authId)
      .single();

    if (!mounted.current) return;

    if (dbError) {
      console.error('[AuthProvider] Error fetching Fidjoo user:', dbError);
      setFidjooUser(null);
      if (dbError.code === 'PGRST116') {
        setError('no_account');
      }
    } else {
      console.log('[AuthProvider] Got Fidjoo user:', data?.id);
      setFidjooUser(data);
      setError(null);
    }
    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    const mounted = { current: true };
    let initialLoadHandled = false;

    // CRITICAL: Get initial session explicitly - onAuthStateChange INITIAL_SESSION
    // event is unreliable in some SSR setups
    const initializeAuth = async () => {
      console.log('[AuthProvider] Initializing auth...');
      try {
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('[AuthProvider] getSession error:', sessionError);
        }

        if (!mounted.current) return;

        console.log('[AuthProvider] Initial session:', initialSession?.user?.id ?? 'none');

        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        if (initialSession?.user) {
          await fetchFidjooUser(initialSession.user.id, mounted);
        } else {
          setIsLoading(false);
        }

        initialLoadHandled = true;
      } catch (err) {
        console.error('[AuthProvider] Init error:', err);
        if (mounted.current) {
          setIsLoading(false);
          initialLoadHandled = true;
        }
      }
    };

    initializeAuth();

    // Listen for subsequent auth changes (sign in, sign out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, newSession: Session | null) => {
        if (!mounted.current) return;

        // Skip INITIAL_SESSION if we already handled it via getSession()
        if (event === 'INITIAL_SESSION' && initialLoadHandled) {
          console.log('[AuthProvider] Skipping duplicate INITIAL_SESSION');
          return;
        }

        console.log('[AuthProvider] Auth state changed:', event, newSession?.user?.id);

        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (newSession?.user) {
          await fetchFidjooUser(newSession.user.id, mounted);
        } else {
          setFidjooUser(null);
          setError(null);
          setIsLoading(false);
        }
      }
    );

    return () => {
      mounted.current = false;
      subscription.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - supabase is stable via ref, fetchFidjooUser is stable via useCallback with supabase dep

  async function signOut() {
    await supabase.auth.signOut();
    setFidjooUser(null);
    setError(null);
  }

  async function refreshUser() {
    if (user) {
      const { data, error: dbError } = await supabase
        .from('users')
        .select('id, auth_id, revenuecat_app_user_id, email, first_name, last_name, subscription_status, language, created_at')
        .eq('auth_id', user.id)
        .single();

      if (dbError) {
        console.error('Error refreshing Fidjoo user:', dbError);
      } else {
        setFidjooUser(data);
      }
    }
  }

  return (
    <AuthContext.Provider value={{ session, user, fidjooUser, isLoading, error, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
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

  const supabase = getSupabaseBrowserClient();

  const fetchFidjooUser = useCallback(async (authId: string) => {
    const { data, error: dbError } = await supabase
      .from('users')
      .select('id, auth_id, revenuecat_app_user_id, email, first_name, last_name, subscription_status, language, created_at')
      .eq('auth_id', authId)
      .single();

    if (dbError) {
      console.error('Error fetching Fidjoo user:', dbError);
      setFidjooUser(null);
      if (dbError.code === 'PGRST116') {
        setError('no_account');
      }
    } else {
      setFidjooUser(data);
      setError(null);
    }
    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    let mounted = true;

    // Get initial session with error handling
    const initAuth = async () => {
      try {
        // Use getUser() for secure validation (getSession() reads cookies which can be stale)  
        const result = await supabase.auth.getUser();

        const { data: { user: authUser }, error: userError } = result;
        if (!mounted) return;

        if (userError || !authUser) {
          // No valid user - clear state and stop loading
          setSession(null);
          setUser(null);
          setIsLoading(false);
          return;
        }

        // Get session for the session object (needed for some operations)
        const { data: { session: currentSession } } = await supabase.auth.getSession();

        if (!mounted) return;

        setSession(currentSession);
        setUser(authUser);
        await fetchFidjooUser(authUser.id);
      } catch (err) {
        console.error('[AuthProvider] Auth initialization error:', err);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, newSession: Session | null) => {
        if (!mounted) return;

        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (newSession?.user) {
          await fetchFidjooUser(newSession.user.id);
        } else {
          setFidjooUser(null);
          setError(null);
          setIsLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, fetchFidjooUser]);

  async function signOut() {
    await supabase.auth.signOut();
    setFidjooUser(null);
    setError(null);
  }

  async function refreshUser() {
    if (user) {
      await fetchFidjooUser(user.id);
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

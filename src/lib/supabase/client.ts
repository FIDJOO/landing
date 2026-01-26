'use client';

import { createBrowserClient } from '@supabase/ssr';

let client: ReturnType<typeof createBrowserClient> | null = null;

// Workaround for GoTrueClient lock deadlocks (GitHub Issue #1594)
// The Web Locks API can hang indefinitely on some browsers/devices
const noOpLock = async <T>(
  _name: string,
  _acquireTimeout: number,
  fn: () => Promise<T>
): Promise<T> => {
  return await fn();
};

export function getSupabaseBrowserClient() {
  if (client) {
    return client;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Missing environment variables!');
  }

  client = createBrowserClient(url!, anonKey!, {
    auth: {
      lock: noOpLock,
    },
  });

  return client;
}

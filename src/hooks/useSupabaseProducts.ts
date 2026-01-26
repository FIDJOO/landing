'use client';

import { useEffect, useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export interface SupabaseProduct {
  identifier: string;
  display_name: string;
  description: string;
  credits: number;
  product_type: 'consumable' | 'subscription';
  reference_price: string;
  recommended: boolean;
  badge: string | null;
  position: number;
  metadata: {
    entitlements?: string[];
  } | null;
  platform: 'ios' | 'android' | 'web';
}

export interface SubscriptionFeatures {
  personalizedStories: boolean;
  fiveProfiles: boolean;
  noAds: boolean;
  parentVoice: boolean;
  earlyAccess: boolean;
}

export const CREDITS_PER_STORY = 3;

export function getSubscriptionFeatures(metadata: SupabaseProduct['metadata']): SubscriptionFeatures {
  const entitlements = metadata?.entitlements || [];
  const hasPremium = entitlements.includes('premium');
  const hasClone = entitlements.includes('clone');

  return {
    personalizedStories: true,
    fiveProfiles: true,
    noAds: true,
    parentVoice: hasClone,
    earlyAccess: hasPremium,
  };
}

export function useSupabaseProducts() {
  const [products, setProducts] = useState<SupabaseProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const supabase = getSupabaseBrowserClient();
        const { data, error: queryError } = await supabase
          .from('products')
          .select('identifier, display_name, description, credits, product_type, reference_price, recommended, badge, position, metadata, platform')
          .eq('is_active', true)
          .eq('platform', 'web')
          .order('product_type')
          .order('position');

        if (queryError) {
          throw new Error(queryError.message);
        }

        setProducts(data as SupabaseProduct[]);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const subscriptions = products.filter((p) => p.product_type === 'subscription');
  const creditPacks = products.filter((p) => p.product_type === 'consumable');

  return {
    products,
    subscriptions,
    creditPacks,
    isLoading,
    error,
  };
}

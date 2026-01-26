'use client';

import { useEffect, useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export interface SupabaseProduct {
  identifier: string;
  display_name: string;
  description: string;
  credits: number;
  product_type: 'consumable' | 'subscription';
  reference_price: number;
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

/**
 * Calculate discount percentage between web price and app price
 * @param webPriceMicros - Price in micros from RevenueCat (e.g., 9990000 for $9.99)
 * @param appPrice - Reference price from Supabase (number like 9.99 or string like "9.99")
 * @returns Discount percentage (positive means web is cheaper), or null if can't calculate
 */
export function calculateDiscountPercent(
  webPriceMicros: number | null,
  appPrice: string | number | null | undefined
): number | null {
  if (!webPriceMicros || appPrice == null) return null;

  const appPriceNum = typeof appPrice === 'number'
    ? appPrice
    : parseFloat(String(appPrice).replace(/[^0-9.]/g, ''));
  if (isNaN(appPriceNum) || appPriceNum <= 0) return null;

  const webPrice = webPriceMicros / 1_000_000;
  const discount = Math.round(((appPriceNum - webPrice) / appPriceNum) * 100);

  return discount > 0 ? discount : null;
}

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
  const [webProducts, setWebProducts] = useState<SupabaseProduct[]>([]);
  const [iosProducts, setIosProducts] = useState<SupabaseProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const supabase = getSupabaseBrowserClient();

        // Fetch web products for display and iOS products for price comparison
        const [webResult, iosResult] = await Promise.all([
          supabase
            .from('products')
            .select('identifier, display_name, description, credits, product_type, reference_price, recommended, badge, position, metadata, platform')
            .eq('is_active', true)
            .eq('platform', 'web')
            .order('product_type')
            .order('position'),
          supabase
            .from('products')
            .select('identifier, reference_price, product_type, platform')
            .eq('is_active', true)
            .eq('platform', 'ios'),
        ]);

        if (webResult.error) throw new Error(webResult.error.message);
        if (iosResult.error) throw new Error(iosResult.error.message);

        setWebProducts(webResult.data as SupabaseProduct[]);
        setIosProducts(iosResult.data as SupabaseProduct[]);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const subscriptions = webProducts.filter((p) => p.product_type === 'subscription');
  const creditPacks = webProducts.filter((p) => p.product_type === 'consumable');

  // Helper to get iOS reference price for a product identifier
  const getIosReferencePrice = (identifier: string): number | null => {
    // Normalize identifier for matching (remove platform suffixes like _web, _ios)
    const normalize = (s: string) => s.toLowerCase().replace(/[_-](web|ios|android)$/i, '').replace(/[_-]/g, '');
    const normalizedId = normalize(identifier);

    const iosProduct = iosProducts.find((p) => normalize(p.identifier) === normalizedId);
    return iosProduct?.reference_price ?? null;
  };

  return {
    products: webProducts,
    subscriptions,
    creditPacks,
    iosProducts,
    getIosReferencePrice,
    isLoading,
    error,
  };
}

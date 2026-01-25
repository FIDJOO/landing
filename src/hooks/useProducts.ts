'use client';

import { useState, useEffect } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { useRevenueCat } from '@/components/RevenueCatProvider';
import type { Package } from '@revenuecat/purchases-js';

export interface SupabaseProduct {
  id: string;
  identifier: string;
  revenuecat_product_id: string | null;
  display_name: string;
  description: string;
  credits: number;
  product_type: 'consumable' | 'subscription';
  product_category: 'NON_SUBSCRIPTION' | 'SUBSCRIPTION' | null;
  reference_price: number | null;
  reference_currency_code: string;
  recommended: boolean;
  badge: string | null;
  position: number | null;
  is_active: boolean;
  platform: string;
  metadata: Record<string, unknown> | null;
}

export interface EnrichedProduct extends SupabaseProduct {
  rcPackage: Package | null;
  price: string | null;
  pricePerMonth: string | null;
}

export function useProducts() {
  const [products, setProducts] = useState<EnrichedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { offerings, isLoading: rcLoading, isConfigured } = useRevenueCat();
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      setError(null);

      // Fetch active products from Supabase (web platform or null)
      const { data: supabaseProducts, error: dbError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .or('platform.eq.web,platform.is.null')
        .order('position', { ascending: true, nullsFirst: false });

      if (dbError) {
        setError(dbError.message);
        setIsLoading(false);
        return;
      }

      // Enrich with RevenueCat data if available
      const enrichedProducts: EnrichedProduct[] = (supabaseProducts || []).map((product: SupabaseProduct) => {
        let rcPackage: Package | null = null;

        if (isConfigured && offerings?.current && product.revenuecat_product_id) {
          // Find matching package by product ID
          rcPackage = offerings.current.availablePackages.find(
            (pkg) => pkg.webBillingProduct?.identifier === product.revenuecat_product_id
          ) || null;
        }

        return {
          ...product,
          rcPackage,
          price: rcPackage?.webBillingProduct?.currentPrice?.formattedPrice || null,
          pricePerMonth: null, // Price per month not available in web billing
        };
      });

      setProducts(enrichedProducts);
      setIsLoading(false);
    }

    if (!rcLoading) {
      fetchProducts();
    } else {
    }
  }, [offerings, rcLoading, isConfigured, supabase]);

  return { products, isLoading: isLoading || rcLoading, error };
}

'use client';

import { useMemo } from 'react';
import { useRevenueCat } from '@/components/RevenueCatProvider';
import type { Package } from '@revenuecat/purchases-js';

export interface Product {
  id: string;
  identifier: string;
  displayName: string;
  description: string | null;
  price: string | null;
  priceAmountMicros: number | null;
  currencyCode: string | null;
  productType: 'consumable' | 'subscription';
  rcPackage: Package;
}

export function useProducts() {
  const { offerings, isLoading, error, isConfigured } = useRevenueCat();

  const products = useMemo<Product[]>(() => {
    if (!isConfigured || !offerings) {
      return [];
    }

    // Use the "web" offering for web billing products
    const webOffering = offerings.all['web'];
    if (!webOffering) {
      return [];
    }

    // Track seen identifiers to remove duplicates
    const seenIdentifiers = new Set<string>();

    return webOffering.availablePackages
      .map((pkg): Product => {
        const webProduct = pkg.webBillingProduct;
        const hasSubscriptionOptions = webProduct?.subscriptionOptions && Object.keys(webProduct.subscriptionOptions).length > 0;

        return {
          id: pkg.identifier,
          identifier: webProduct?.identifier ?? pkg.identifier,
          displayName: webProduct?.title ?? pkg.identifier,
          description: webProduct?.description ?? null,
          price: webProduct?.price?.formattedPrice ?? null,
          priceAmountMicros: webProduct?.price?.amountMicros ?? null,
          currencyCode: webProduct?.price?.currency ?? null,
          productType: hasSubscriptionOptions ? 'subscription' : 'consumable',
          rcPackage: pkg,
        };
      })
      .filter((product) => {
        // Remove duplicates based on identifier
        if (seenIdentifiers.has(product.identifier)) {
          return false;
        }
        seenIdentifiers.add(product.identifier);
        return true;
      });
  }, [offerings, isConfigured]);

  return {
    products,
    isLoading,
    error: error ?? null,
  };
}

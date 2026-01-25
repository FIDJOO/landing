'use client';

import { Purchases } from '@revenuecat/purchases-js';

let purchasesInstance: Purchases | null = null;

export function initRevenueCat(appUserId: string): Purchases {
  if (purchasesInstance) {
    // If already configured with different user, change user
    const currentUserId = purchasesInstance.getAppUserId();
    if (currentUserId !== appUserId) {
      purchasesInstance.changeUser(appUserId);
    }
    return purchasesInstance;
  }

  purchasesInstance = Purchases.configure({
    apiKey: process.env.NEXT_PUBLIC_REVENUECAT_API_KEY!,
    appUserId,
  });

  return purchasesInstance;
}

export function getRevenueCatInstance(): Purchases | null {
  return purchasesInstance;
}

export function closeRevenueCat() {
  if (purchasesInstance) {
    purchasesInstance.close();
    purchasesInstance = null;
  }
}

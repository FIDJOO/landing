'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import type { Offerings, CustomerInfo, Package } from '@revenuecat/purchases-js';
import { useAuth } from './AuthProvider';
import { initRevenueCat, closeRevenueCat, getRevenueCatInstance } from '@/lib/revenuecat/client';

interface RevenueCatContextType {
  isConfigured: boolean;
  offerings: Offerings | null;
  customerInfo: CustomerInfo | null;
  isLoading: boolean;
  error: string | null;
  purchase: (pkg: Package) => Promise<unknown>;
  refreshCustomerInfo: () => Promise<void>;
}

const RevenueCatContext = createContext<RevenueCatContextType | null>(null);

export function RevenueCatProvider({ children }: { children: ReactNode }) {
  const { fidjooUser, isLoading: authLoading } = useAuth();
  const [isConfigured, setIsConfigured] = useState(false);
  const [offerings, setOfferings] = useState<Offerings | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!fidjooUser?.revenuecat_app_user_id) {
      closeRevenueCat();
      setIsConfigured(false);
      setOfferings(null);
      setCustomerInfo(null);
      setIsLoading(false);
      return;
    }

    // Initialize RevenueCat with user's RC ID
    const purchases = initRevenueCat(fidjooUser.revenuecat_app_user_id);
    setIsConfigured(true);

    // Fetch offerings and customer info
    Promise.all([
      purchases.getOfferings(),
      purchases.getCustomerInfo(),
    ])
      .then(([offeringsData, customerInfoData]) => {
        setOfferings(offeringsData);
        setCustomerInfo(customerInfoData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load RevenueCat data');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [fidjooUser, authLoading]);

  const purchase = useCallback(async (pkg: Package) => {
    const purchases = getRevenueCatInstance();
    if (!purchases) {
      throw new Error('RevenueCat not configured');
    }

    const result = await purchases.purchase({ rcPackage: pkg });

    // Refresh customer info after purchase
    const newCustomerInfo = await purchases.getCustomerInfo();
    setCustomerInfo(newCustomerInfo);

    return result;
  }, []);

  const refreshCustomerInfo = useCallback(async () => {
    const purchases = getRevenueCatInstance();
    if (!purchases) return;

    const info = await purchases.getCustomerInfo();
    setCustomerInfo(info);
  }, []);

  return (
    <RevenueCatContext.Provider
      value={{ isConfigured, offerings, customerInfo, isLoading, error, purchase, refreshCustomerInfo }}
    >
      {children}
    </RevenueCatContext.Provider>
  );
}

export function useRevenueCat() {
  const context = useContext(RevenueCatContext);
  if (!context) {
    throw new Error('useRevenueCat must be used within RevenueCatProvider');
  }
  return context;
}

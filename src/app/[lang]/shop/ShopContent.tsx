'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Locale } from '@/i18n/config';
import { useAuth } from '@/components/AuthProvider';
import { useRevenueCat } from '@/components/RevenueCatProvider';
import { useProducts } from '@/hooks/useProducts';
import { useSupabaseProducts, type SupabaseProduct } from '@/hooks/useSupabaseProducts';
import Button3D from '@/components/ui/Button3D';
import type { Package } from '@revenuecat/purchases-js';

import {
  CreditsRuleBanner,
  SubscriptionPricing,
  CreditPackCard,
  ComparisonTable,
  SubscriptionStatus,
  PurchaseHistory,
  ShopLoadingSkeleton,
  type ShopContentProps,
} from './components';
import { CreditsBadge } from '@/components/ui/CreditsBadge';

import enMessages from '../../../../messages/en.json';
import frMessages from '../../../../messages/fr.json';

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  fr: frMessages,
};

export default function ShopContent({ locale }: ShopContentProps) {
  const router = useRouter();
  const { fidjooUser, user, isLoading: authLoading, error: authError, signOut } = useAuth();
  const { customerInfo, purchase, isLoading: rcLoading, error: rcError, virtualCurrencies } = useRevenueCat();
  const { products, isLoading: productsLoading, error: productsError } = useProducts();
  const { subscriptions: supabaseSubscriptions, creditPacks: supabaseCreditPacks, isLoading: supabaseLoading, error: supabaseError } = useSupabaseProducts();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  const t = messages[locale];

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace(`/${locale}/auth/sign-in?redirectTo=/${locale}/shop`);
    }
  }, [authLoading, user, router, locale]);

  useEffect(() => {
    if (!authLoading && user && authError === 'no_account') {
      router.replace(`/${locale}/auth/sign-in`);
    }
  }, [authLoading, user, authError, router, locale]);

  const handlePurchase = async (pkg: Package) => {
    setIsPurchasing(true);
    setPurchaseError(null);

    try {
      await purchase(pkg);
    } catch (err) {
      console.error('Purchase error:', err);
      setPurchaseError(err instanceof Error ? err.message : 'Purchase failed');
    } finally {
      setIsPurchasing(false);
    }
  };

  const isLoading = authLoading || rcLoading || productsLoading || supabaseLoading;

  if (isLoading) {
    return <ShopLoadingSkeleton />;
  }

  const creditProducts = products.filter((p) => p.productType === 'consumable');
  const subscriptionProducts = products.filter((p) => p.productType === 'subscription');

  const getSupabaseProduct = (rcIdentifier: string): SupabaseProduct | undefined => {
    const allProducts = [...supabaseSubscriptions, ...supabaseCreditPacks];
    const directMatch = allProducts.find((sp) => sp.identifier === rcIdentifier);
    if (directMatch) return directMatch;

    const normalize = (s: string) => s.toLowerCase().replace(/[_-]/g, '');
    return allProducts.find((sp) => {
      const normalizedRc = normalize(rcIdentifier);
      const normalizedSp = normalize(sp.identifier);
      return normalizedRc.includes(normalizedSp) || normalizedSp.includes(normalizedRc);
    });
  };

  return (
    <div className="min-h-screen bg-background pt-32 md:pt-40 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t.shop.title}</h1>
            {fidjooUser && (
              <p className="text-gray-500 mt-1">
                {t.shop.welcome}, {fidjooUser.first_name || fidjooUser.email}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            {virtualCurrencies && (
              <CreditsBadge balance={virtualCurrencies.balance} />
            )}
            <Button3D variant="outline" size="sm" onClick={signOut}>
              {t.auth.signOut}
            </Button3D>
          </div>
        </div>

        {(rcError || productsError || purchaseError || supabaseError) && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg">
            {rcError || productsError || purchaseError || supabaseError}
          </div>
        )}

        <CreditsRuleBanner t={t} />

        <div className="mb-8">
          <SubscriptionStatus t={t} customerInfo={customerInfo} />
        </div>

        {subscriptionProducts.length > 0 && (
          <SubscriptionPricing
            products={subscriptionProducts}
            getSupabaseProduct={getSupabaseProduct}
            onPurchase={handlePurchase}
            isPurchasing={isPurchasing}
            t={t}
          />
        )}

        {supabaseSubscriptions.length > 0 && (
          <div className="mb-12 bg-card rounded-2xl shadow-md overflow-hidden">
            <button
              onClick={() => setIsComparisonOpen(!isComparisonOpen)}
              className="w-full p-6 flex items-center justify-between text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <h2 className="text-2xl font-bold text-foreground">{t.shop.comparison.title}</h2>
              <svg
                className={`w-6 h-6 text-foreground transition-transform duration-200 ${isComparisonOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`grid transition-all duration-200 ease-in-out ${isComparisonOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6">
                  <ComparisonTable subscriptions={supabaseSubscriptions} t={t} />
                </div>
              </div>
            </div>
          </div>
        )}

        {creditProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">{t.shop.creditPacks}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creditProducts.map((product) => (
                <CreditPackCard
                  key={product.id}
                  product={product}
                  supabaseProduct={getSupabaseProduct(product.identifier)}
                  onPurchase={handlePurchase}
                  isPurchasing={isPurchasing}
                  t={t}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <PurchaseHistory t={t} customerInfo={customerInfo} />
        </div>

        {customerInfo && (
          <div className="p-6 bg-card rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-4 text-foreground">{t.shop.manageBilling}</h2>
            <p className="text-gray-500 mb-4">{t.shop.manageBillingDescription}</p>
            <Button3D
              variant="outline"
              size="md"
              onClick={() => {
                window.open('https://billing.revenuecat.com', '_blank');
              }}
            >
              {t.shop.openBillingPortal}
            </Button3D>
          </div>
        )}
      </div>
    </div>
  );
}

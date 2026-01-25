'use client';

import { useState } from 'react';
import { Locale } from '@/i18n/config';
import { useAuth } from '@/components/AuthProvider';
import { useRevenueCat } from '@/components/RevenueCatProvider';
import { useProducts, EnrichedProduct } from '@/hooks/useProducts';
import Button3D from '@/components/ui/Button3D';
import type { Package } from '@revenuecat/purchases-js';

import enMessages from '../../../../messages/en.json';
import frMessages from '../../../../messages/fr.json';

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  fr: frMessages,
};

interface ShopContentProps {
  locale: Locale;
}

function ProductCard({
  product,
  onPurchase,
  isPurchasing,
  t,
}: {
  product: EnrichedProduct;
  onPurchase: (pkg: Package) => void;
  isPurchasing: boolean;
  t: typeof enMessages;
}) {
  const hasRCPackage = !!product.rcPackage;
  const displayPrice = product.price || (product.reference_price ? `${product.reference_currency_code} ${product.reference_price}` : null);

  return (
    <div className={`relative p-6 bg-card rounded-2xl shadow-md border-2 ${product.recommended ? 'border-primary' : 'border-transparent'}`}>
      {product.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-tertiary text-black text-xs font-bold rounded-full">
          {product.badge}
        </span>
      )}

      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-foreground">{product.display_name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.description}</p>
      </div>

      <div className="text-center mb-4">
        <span className="text-3xl font-bold text-primary">{product.credits}</span>
        <span className="text-gray-500 ml-1">{t.shop.credits}</span>
      </div>

      {displayPrice && (
        <div className="text-center mb-4">
          <span className="text-2xl font-bold text-foreground">{displayPrice}</span>
          {product.pricePerMonth && product.product_type === 'subscription' && (
            <span className="block text-sm text-gray-500">/{t.shop.perMonth}</span>
          )}
        </div>
      )}

      <Button3D
        variant={product.recommended ? 'primary' : 'secondary'}
        size="lg"
        className="w-full"
        onClick={() => product.rcPackage && onPurchase(product.rcPackage)}
        disabled={!hasRCPackage || isPurchasing}
      >
        {isPurchasing ? t.shop.processing : t.shop.buy}
      </Button3D>
    </div>
  );
}

function SubscriptionStatus({
  t,
  customerInfo,
}: {
  t: typeof enMessages;
  customerInfo: ReturnType<typeof useRevenueCat>['customerInfo'];
}) {
  if (!customerInfo) return null;

  const activeSubscriptions = Object.keys(customerInfo.entitlements.active);

  if (activeSubscriptions.length === 0) {
    return (
      <div className="p-6 bg-card rounded-2xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-foreground">{t.shop.subscription}</h2>
        <p className="text-gray-500">{t.shop.noActiveSubscription}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-card rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-foreground">{t.shop.subscription}</h2>
      <div className="space-y-2">
        {activeSubscriptions.map((entitlement) => {
          const ent = customerInfo.entitlements.active[entitlement];
          return (
            <div key={entitlement} className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="font-medium text-green-700 dark:text-green-400">{entitlement}</span>
              {ent.expirationDate && (
                <span className="text-sm text-gray-500">
                  {t.shop.expiresOn}: {new Date(ent.expirationDate).toLocaleDateString()}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PurchaseHistory({
  t,
  customerInfo,
}: {
  t: typeof enMessages;
  customerInfo: ReturnType<typeof useRevenueCat>['customerInfo'];
}) {
  if (!customerInfo) return null;

  const transactions = customerInfo.nonSubscriptionTransactions || [];

  return (
    <div className="p-6 bg-card rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-foreground">{t.shop.purchaseHistory}</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500">{t.shop.noPurchases}</p>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {transactions.slice(0, 10).map((transaction, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="font-medium text-foreground">{transaction.productIdentifier}</span>
              <span className="text-sm text-gray-500">
                {new Date(transaction.purchaseDate).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div> 
      )}
    </div>
  );
}

export default function ShopContent({ locale }: ShopContentProps) {
  const { fidjooUser, isLoading: authLoading, signOut } = useAuth();
  const { customerInfo, purchase, isLoading: rcLoading, error: rcError } = useRevenueCat();
  const { products, isLoading: productsLoading, error: productsError } = useProducts();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);

  const t = messages[locale];


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

  const isLoading = authLoading || rcLoading || productsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  const creditProducts = products.filter(p => p.product_type === 'consumable');
  const subscriptionProducts = products.filter(p => p.product_type === 'subscription');

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t.shop.title}</h1>
            {fidjooUser && (
              <p className="text-gray-500 mt-1">
                {t.shop.welcome}, {fidjooUser.first_name || fidjooUser.email}
              </p>
            )}
          </div>
          <Button3D variant="outline" size="sm" onClick={signOut}>
            {t.auth.signOut}
          </Button3D>
        </div>

        {/* Error messages */}
        {(rcError || productsError || purchaseError) && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg">
            {rcError || productsError || purchaseError}
          </div>
        )}

        {/* Subscription Status */}
        <div className="mb-8">
          <SubscriptionStatus t={t} customerInfo={customerInfo} />
        </div>

        {/* Subscription Products */}
        {subscriptionProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">{t.shop.subscriptions}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscriptionProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPurchase={handlePurchase}
                  isPurchasing={isPurchasing}
                  t={t}
                />
              ))}
            </div>
          </div>
        )}

        {/* Credit Packs */}
        {creditProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">{t.shop.creditPacks}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creditProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPurchase={handlePurchase}
                  isPurchasing={isPurchasing}
                  t={t}
                />
              ))}
            </div>
          </div>
        )}

        {/* Purchase History */}
        <div className="mb-8">
          <PurchaseHistory t={t} customerInfo={customerInfo} />
        </div>

        {/* Manage Billing */}
        {customerInfo && (
          <div className="p-6 bg-card rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-4 text-foreground">{t.shop.manageBilling}</h2>
            <p className="text-gray-500 mb-4">{t.shop.manageBillingDescription}</p>
            <Button3D
              variant="outline"
              size="md"
              onClick={() => {
                // RevenueCat billing portal - this URL would be configured in RevenueCat dashboard
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

import type { useRevenueCat } from '@/components/RevenueCatProvider';
import type { ShopComponentProps } from './types';

interface SubscriptionStatusProps extends ShopComponentProps {
  customerInfo: ReturnType<typeof useRevenueCat>['customerInfo'];
}

export function SubscriptionStatus({ t, customerInfo }: SubscriptionStatusProps) {
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

import type { useRevenueCat } from '@/components/RevenueCatProvider';
import type { ShopComponentProps } from './types';

interface PurchaseHistoryProps extends ShopComponentProps {
  customerInfo: ReturnType<typeof useRevenueCat>['customerInfo'];
}

export function PurchaseHistory({ t, customerInfo }: PurchaseHistoryProps) {
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
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
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

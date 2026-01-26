import { CREDITS_PER_STORY, getSubscriptionFeatures, type SupabaseProduct } from '@/hooks/useSupabaseProducts';
import type { ShopComponentProps } from './types';

interface ComparisonTableProps extends ShopComponentProps {
  subscriptions: SupabaseProduct[];
}

export function ComparisonTable({ subscriptions, t }: ComparisonTableProps) {
  const featureKeys = [
    { key: 'personalizedStories', label: t.shop.features.personalizedStories },
    { key: 'fiveProfiles', label: t.shop.features.fiveProfiles },
    { key: 'noAds', label: t.shop.features.noAds },
    { key: 'parentVoice', label: t.shop.features.parentVoice },
    { key: 'earlyAccess', label: t.shop.features.earlyAccess },
  ] as const;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-4 text-left text-foreground font-bold border-b border-gray-200 dark:border-gray-700">
              {t.shop.comparison.feature}
            </th>
            {subscriptions.map((sub) => (
              <th key={sub.identifier} className="p-4 text-center text-foreground font-bold border-b border-gray-200 dark:border-gray-700">
                {sub.display_name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-primary/5">
            <td className="p-4 text-foreground font-medium border-b border-gray-200 dark:border-gray-700">
              {t.shop.credits}/{t.shop.perMonth}
            </td>
            {subscriptions.map((sub) => (
              <td key={sub.identifier} className="p-4 text-center font-bold text-primary border-b border-gray-200 dark:border-gray-700">
                {sub.credits}
              </td>
            ))}
          </tr>
          <tr className="bg-tertiary/5">
            <td className="p-4 text-foreground font-medium border-b border-gray-200 dark:border-gray-700">
              {t.shop.stories}/{t.shop.perMonth}
            </td>
            {subscriptions.map((sub) => (
              <td key={sub.identifier} className="p-4 text-center font-bold text-tertiary border-b border-gray-200 dark:border-gray-700">
                {Math.floor(sub.credits / CREDITS_PER_STORY)}
              </td>
            ))}
          </tr>
          {featureKeys.map((feature) => (
            <tr key={feature.key}>
              <td className="p-4 text-foreground border-b border-gray-200 dark:border-gray-700">
                {feature.label}
              </td>
              {subscriptions.map((sub) => {
                const features = getSubscriptionFeatures(sub.metadata);
                const hasFeature = features[feature.key];
                return (
                  <td key={sub.identifier} className="p-4 text-center border-b border-gray-200 dark:border-gray-700">
                    <span className={hasFeature ? 'text-green-500 text-xl' : 'text-gray-300 text-xl'}>
                      {hasFeature ? '✓' : '✗'}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

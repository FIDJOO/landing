import type { Package } from '@revenuecat/purchases-js';
import type { Product } from '@/hooks/useProducts';
import { CREDITS_PER_STORY, getSubscriptionFeatures, calculateDiscountPercent, type SupabaseProduct } from '@/hooks/useSupabaseProducts';
import Button3D from '@/components/ui/Button3D';
import type { ShopComponentProps } from './types';

interface SubscriptionCardProps extends ShopComponentProps {
  product: Product;
  supabaseProduct: SupabaseProduct | undefined;
  onPurchase: (pkg: Package) => void;
  isPurchasing: boolean;
}

export function SubscriptionCard({
  product,
  supabaseProduct,
  onPurchase,
  isPurchasing,
  t,
}: SubscriptionCardProps) {
  const credits = supabaseProduct?.credits || 0;
  const stories = Math.floor(credits / CREDITS_PER_STORY);
  const isRecommended = supabaseProduct?.recommended || false;
  const features = supabaseProduct ? getSubscriptionFeatures(supabaseProduct.metadata) : null;
  const discountPercent = calculateDiscountPercent(product.priceAmountMicros, supabaseProduct?.reference_price);

  return (
    <div className={`relative p-6 bg-card rounded-2xl shadow-md border-2 ${isRecommended ? 'border-primary' : 'border-transparent'}`}>
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
          {t.shop.recommended}
        </div>
      )}
      {discountPercent && (
        <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
          -{discountPercent}% {t.shop.discountVsApp}
        </div>
      )}

      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-foreground">{supabaseProduct?.display_name || product.displayName}</h3>
        {supabaseProduct?.description && (
          <p className="text-sm text-gray-500 mt-1">{supabaseProduct.description}</p>
        )}
      </div>

      {product.price && (
        <div className="text-center mb-4">
          <span className="text-3xl font-bold text-foreground">{product.price}</span>
          <span className="text-gray-500">/{t.shop.perMonth}</span>
        </div>
      )}

      <div className="bg-primary/10 rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <p className="text-2xl font-bold text-primary">{credits}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t.shop.credits}</p>
          </div>
          <div className="text-gray-400">=</div>
          <div className="text-center flex-1">
            <p className="text-2xl font-bold text-tertiary">{stories}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t.shop.stories}</p>
          </div>
        </div>
      </div>

      {features && (
        <ul className="space-y-2 mb-6 text-sm">
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-foreground">{t.shop.features.personalizedStories}</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-foreground">{t.shop.features.fiveProfiles}</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-foreground">{t.shop.features.noAds}</span>
          </li>
          <li className="flex items-center gap-2">
            <span className={features.parentVoice ? 'text-green-500' : 'text-gray-300'}>
              {features.parentVoice ? '✓' : '✗'}
            </span>
            <span className={features.parentVoice ? 'text-foreground' : 'text-gray-400'}>
              {t.shop.features.parentVoice}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className={features.earlyAccess ? 'text-green-500' : 'text-gray-300'}>
              {features.earlyAccess ? '✓' : '✗'}
            </span>
            <span className={features.earlyAccess ? 'text-foreground' : 'text-gray-400'}>
              {t.shop.features.earlyAccess}
            </span>
          </li>
        </ul>
      )}

      <Button3D
        variant={isRecommended ? 'primary' : 'secondary'}
        size="lg"
        className="w-full"
        onClick={() => onPurchase(product.rcPackage)}
        disabled={isPurchasing}
      >
        {isPurchasing ? t.shop.processing : t.shop.subscribe}
      </Button3D>
    </div>
  );
}

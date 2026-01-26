import { Check, X } from 'lucide-react';
import type { Package } from '@revenuecat/purchases-js';
import type { Product } from '@/hooks/useProducts';
import { CREDITS_PER_STORY, getSubscriptionFeatures, type SupabaseProduct } from '@/hooks/useSupabaseProducts';
import Button3D from '@/components/ui/Button3D';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { ShopComponentProps } from './types';

interface SubscriptionPricingProps extends ShopComponentProps {
  products: Product[];
  getSupabaseProduct: (identifier: string) => SupabaseProduct | undefined;
  onPurchase: (pkg: Package) => void;
  isPurchasing: boolean;
}

export function SubscriptionPricing({
  products,
  getSupabaseProduct,
  onPurchase,
  isPurchasing,
  t,
}: SubscriptionPricingProps) {
  if (products.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex flex-col gap-4 mb-8">
        <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
          {t.shop.subscriptions}
        </h2>
        <p className="text-muted-foreground max-w-2xl">
          {t.shop.subscriptionDescription}
        </p>
      </div>

      <div className="flex w-full flex-col items-stretch gap-6 md:flex-row">
        {products.map((product) => {
          const supabaseProduct = getSupabaseProduct(product.identifier);
          const credits = supabaseProduct?.credits || 0;
          const stories = Math.floor(credits / CREDITS_PER_STORY);
          const isRecommended = supabaseProduct?.recommended || false;
          const features = supabaseProduct ? getSubscriptionFeatures(supabaseProduct.metadata) : null;
          const badge = supabaseProduct?.badge;

          return (
            <div
              key={product.id}
              className={`relative flex w-full flex-col rounded-2xl border-2 p-6 text-left transition-shadow hover:shadow-lg ${
                isRecommended ? 'bg-primary/5 border-primary' : 'bg-card border-border'
              }`}
            >
              {isRecommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold whitespace-nowrap">
                  {t.shop.recommended}
                </div>
              )}

              <Badge
                variant={isRecommended ? 'default' : 'secondary'}
                className="mb-6 block w-fit uppercase text-sm"
              >
                {badge || supabaseProduct?.display_name || product.displayName}
              </Badge>

              <div className="mb-1">
                <span className="text-4xl font-bold text-foreground">
                  {product.price}
                </span>
              </div>
              <p className="text-muted-foreground text-base mb-2">
                {t.shop.perMonth}
              </p>

              <div className="bg-primary/10 rounded-xl p-2 mb-2">
                <div className="flex justify-between items-center gap-2">
                  <div className="text-center flex-1">
                    <p className="text-3xl font-bold text-[#49AAFF]">{credits}</p>
                    <p className="text-sm text-muted-foreground">{t.shop.credits}</p>
                  </div>
                  <div className="text-muted-foreground text-xl">=</div>
                  <div className="text-center flex-1">
                    <p className="text-3xl font-bold text-[#ffb71c]">{stories}</p>
                    <p className="text-sm text-muted-foreground">{t.shop.stories}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex h-full flex-col justify-between gap-6">
                {features && (
                  <ul className="space-y-3 text-base">
                    <li className="flex items-center gap-3">
                      <Check className="size-5 text-green-500 shrink-0" />
                      <span className="text-foreground">{t.shop.features.personalizedStories}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="size-5 text-green-500 shrink-0" />
                      <span className="text-foreground">{t.shop.features.fiveProfiles}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="size-5 text-green-500 shrink-0" />
                      <span className="text-foreground">{t.shop.features.noAds}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      {features.parentVoice ? (
                        <Check className="size-5 text-green-500 shrink-0" />
                      ) : (
                        <X className="size-5 text-muted-foreground/50 shrink-0" />
                      )}
                      <span className={features.parentVoice ? 'text-foreground' : 'text-muted-foreground'}>
                        {t.shop.features.parentVoice}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      {features.earlyAccess ? (
                        <Check className="size-5 text-green-500 shrink-0" />
                      ) : (
                        <X className="size-5 text-muted-foreground/50 shrink-0" />
                      )}
                      <span className={features.earlyAccess ? 'text-foreground' : 'text-muted-foreground'}>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

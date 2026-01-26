import type { Package } from '@revenuecat/purchases-js';
import type { Product } from '@/hooks/useProducts';
import { CREDITS_PER_STORY, type SupabaseProduct } from '@/hooks/useSupabaseProducts';
import Button3D from '@/components/ui/Button3D';
import type { ShopComponentProps } from './types';

interface CreditPackCardProps extends ShopComponentProps {
  product: Product;
  supabaseProduct: SupabaseProduct | undefined;
  onPurchase: (pkg: Package) => void;
  isPurchasing: boolean;
}

export function CreditPackCard({
  product,
  supabaseProduct,
  onPurchase,
  isPurchasing,
  t,
}: CreditPackCardProps) {
  const credits = supabaseProduct?.credits || 0;
  const stories = Math.floor(credits / CREDITS_PER_STORY);

  return (
    <div className="relative p-6 bg-card rounded-2xl shadow-md border-2 border-transparent hover:border-primary/30 transition-colors">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-foreground">{supabaseProduct?.display_name || product.displayName}</h3>
        {supabaseProduct?.description && (
          <p className="text-sm text-gray-500 mt-1">{supabaseProduct.description}</p>
        )}
      </div>

      {product.price && (
        <div className="text-center mb-4">
          <span className="text-3xl font-bold text-foreground">{product.price}</span>
        </div>
      )}

      <div className="bg-primary/10 rounded-xl p-2 mb-2">
        <div className="flex justify-between items-center">
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

      <Button3D
        variant="outline"
        size="lg"
        className="w-full"
        onClick={() => onPurchase(product.rcPackage)}
        disabled={isPurchasing}
      >
        {isPurchasing ? t.shop.processing : t.shop.buy}
      </Button3D>
    </div>
  );
}

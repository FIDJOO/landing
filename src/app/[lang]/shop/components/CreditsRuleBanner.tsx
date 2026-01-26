import Image from 'next/image';
import type { ShopComponentProps } from './types';

export function CreditsRuleBanner({ t }: ShopComponentProps) {
  return (
    <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-tertiary/15 via-tertiary/10 to-primary/10 border border-tertiary/30 shadow-sm">
      <div className="relative px-6 py-5">
        {/* Decorative background elements */}
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-tertiary/10 blur-2xl" />
        <div className="absolute -left-4 -bottom-4 h-20 w-20 rounded-full bg-primary/10 blur-2xl" />

        <div className="relative flex items-center gap-4">
          {/* Icon container */}
          <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-white/80 dark:bg-white/10 shadow-sm border border-tertiary/20">
            <Image
              src="/images/storybook-open.svg"
              alt="Storybook"
              width={36}
              height={36}
              className="drop-shadow-sm"
            />
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <p className="text-base sm:text-lg font-bold text-foreground leading-tight">
              {t.shop.creditsRule}
            </p>
            <p className="mt-0.5 text-sm text-foreground/70 leading-snug">
              {t.shop.creditsRuleDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

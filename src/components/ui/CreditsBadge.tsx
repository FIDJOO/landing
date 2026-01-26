'use client';

import { CoinsIcon } from './CoinsIcon';

interface CreditsBadgeProps {
  balance: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeConfig = {
  sm: { icon: 18, text: 'text-sm', padding: 'px-2 py-1', gap: 'gap-1' },
  md: { icon: 22, text: 'text-base', padding: 'px-3 py-1.5', gap: 'gap-1.5' },
  lg: { icon: 26, text: 'text-lg', padding: 'px-4 py-2', gap: 'gap-2' },
};

export function CreditsBadge({ balance, size = 'md', className = '' }: CreditsBadgeProps) {
  const config = sizeConfig[size];

  return (
    <div
      className={`inline-flex items-center ${config.gap} ${config.padding} rounded-full border-2 border-[var(--tertiary)] bg-[var(--tertiary)]/10 ${className}`}
    >
      <CoinsIcon size={config.icon} />
      <span className={`${config.text} font-bold text-[var(--foreground)]`}>
        {balance.toLocaleString()}
      </span>
      <span className={`${config.text} font-semibold text-[var(--tertiary)]`}>
        FIDJ
      </span>
    </div>
  );
}

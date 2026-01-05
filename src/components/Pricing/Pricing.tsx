'use client';

import { useTranslations } from 'next-intl';
import PricingColumn from "./PricingColumn";

import { subscriptions, creditPacks } from "@/data/pricing";

const Pricing: React.FC = () => {
    const t = useTranslations('pricing');

    return (
        <div className="space-y-16">
            {/* Introduction */}
            <div className="text-center max-w-2xl mx-auto">
                <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: t.raw('intro') }} />
            </div>

            {/* Subscription Section */}
            <div>
                <div className="text-center mb-8">
                    <span className="inline-block bg-secondary/10 text-secondary px-4 py-1 rounded-full text-sm font-semibold mb-3">
                        {t('subscription')}
                    </span>
                    <p className="text-2xl font-bold text-gray-900">
                        {t('subscriptionSubtitle')}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {subscriptions.map((sub) => (
                        <PricingColumn key={sub.name} tier={sub} />
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-gray-400 font-medium">{t('or')}</span>
                <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Credit Packs Section */}
            <div>
                <div className="text-center mb-8">
                    <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold mb-3">
                        {t('creditPacks')}
                    </span>
                    <p className="text-2xl font-bold text-gray-900">
                        {t('creditPacksSubtitle')}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {creditPacks.map((pack) => (
                        <PricingColumn key={pack.name} tier={pack} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Pricing

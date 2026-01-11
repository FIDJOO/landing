'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import PricingColumn from "./PricingColumn";

import { subscriptions, creditPacks } from "@/data/pricing";

const Pricing: React.FC = () => {
    const t = useTranslations('pricing');
    const [isMonthly, setIsMonthly] = useState(true);

    const currentPlans = isMonthly ? subscriptions : creditPacks;

    return (
        <div className="space-y-10">
            {/* Introduction */}
            <div className="text-center max-w-2xl mx-auto">
                <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: t.raw('intro') }} />
            </div>

            {/* Toggle Switch */}
            <div className="flex justify-center">
                <div className="inline-flex items-center bg-gray-100 rounded-full p-1.5 gap-1">
                    <button
                        onClick={() => setIsMonthly(true)}
                        className={`
                            relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                            ${isMonthly
                                ? 'bg-white text-gray-900 shadow-md'
                                : 'text-gray-500 hover:text-gray-700'
                            }
                        `}
                    >
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            {t('toggleMonthly')}
                        </span>
                    </button>
                    <button
                        onClick={() => setIsMonthly(false)}
                        className={`
                            relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                            ${!isMonthly
                                ? 'bg-white text-gray-900 shadow-md'
                                : 'text-gray-500 hover:text-gray-700'
                            }
                        `}
                    >
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            {t('togglePacks')}
                        </span>
                    </button>
                </div>
            </div>

            {/* Subtitle */}
            <div className="text-center">
                <p className="text-lg text-gray-600">
                    {isMonthly ? t('subscriptionSubtitle') : t('creditPacksSubtitle')}
                </p>
            </div>

            {/* Pricing Cards */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={isMonthly ? 'subscriptions' : 'packs'}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
                >
                    {currentPlans.map((plan) => (
                        <PricingColumn key={plan.name} tier={plan} />
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default Pricing

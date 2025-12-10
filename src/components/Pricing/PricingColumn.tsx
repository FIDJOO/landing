'use client';

import { useState } from 'react';
import clsx from "clsx";

import { IPricing } from "@/types";
import { useWaitlistDialog } from "../WaitlistDialog";

interface Props {
    tier: IPricing;
}

const PricingColumn: React.FC<Props> = ({ tier }: Props) => {
    const { name, price, type, credits, stories, description, highlight } = tier;
    const isSubscription = type === 'subscription';
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const { openDialog } = useWaitlistDialog();
    const shadowHeight = 6;

    return (
        <div className={clsx(
            "w-full bg-white rounded-2xl border-2 transition-all duration-300",
            highlight ? "border-secondary shadow-xl scale-105" : "border-gray-200 hover:border-gray-300"
        )}>
            {highlight && (
                <div className="bg-secondary text-white text-center py-2 rounded-t-xl text-sm font-semibold">
                    {isSubscription ? "Recommandé" : "Populaire"}
                </div>
            )}
            <div className={clsx("p-6", !highlight && "pt-8")}>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
                {description && (
                    <p className="text-sm text-gray-500 mb-4">{description}</p>
                )}

                <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">€{price.toFixed(2).replace('.', ',')}</span>
                    {isSubscription && <span className="text-gray-500 ml-1">/mois</span>}
                </div>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{credits} crédits</p>
                            <p className="text-sm text-gray-500">{isSubscription ? "par mois" : "inclus"}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                            <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{stories} histoires</p>
                            <p className="text-sm text-gray-500">1 histoire = 3 crédits</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={openDialog}
                    onMouseDown={() => setIsButtonPressed(true)}
                    onMouseUp={() => setIsButtonPressed(false)}
                    onMouseLeave={() => setIsButtonPressed(false)}
                    onTouchStart={() => setIsButtonPressed(true)}
                    onTouchEnd={() => setIsButtonPressed(false)}
                    className={clsx(
                        "w-full py-3 px-4 rounded-2xl font-semibold transition-transform duration-75 select-none border-2",
                        highlight
                            ? "bg-secondary text-white border-secondary-dark"
                            : "bg-primary text-black border-primary-dark"
                    )}
                    style={{
                        boxShadow: isButtonPressed
                            ? 'none'
                            : `0 ${shadowHeight}px 0 0 ${highlight ? 'var(--secondary-dark)' : 'var(--primary-dark)'}`,
                        transform: isButtonPressed ? `translateY(${shadowHeight}px)` : 'translateY(0)',
                    }}
                >
                    {isSubscription ? "S'abonner" : "Acheter"}
                </button>
            </div>
        </div>
    )
}

export default PricingColumn

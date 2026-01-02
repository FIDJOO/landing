import { IPricing } from "@/types";
export const subscriptions: IPricing[] = [
    {
        name: 'Family Starter',
        price: 12.99,
        type: 'subscription',
        credits: 12,
        stories: 4,
        description: '12 credits every month for the whole family',
        highlight: false,
    },
    {
        name: 'Premium Creator',
        price: 24.99,
        type: 'subscription',
        credits: 22,
        stories: 7,
        description: '22 credits per month & parental voice',
        highlight: true,
    },
    {
        name: 'Fidjoo Signature',
        price: 14.99,
        type: 'subscription',
        credits: 12,
        stories: 4,
        description: '12 credits per month & parental voice',
        highlight: false,
    },
];

export const subscription: IPricing = subscriptions[0];

export const creditPacks: IPricing[] = [
    {
        name: 'Pack Découverte',
        price: 2.99,
        type: 'one-time',
        credits: 3,
        stories: 1,
        description: '3 crédits pour découvrir la création d\'histoires',
        highlight: false,
    },
    {
        name: 'Pack Mini',
        price: 7.99,
        type: 'one-time',
        credits: 10,
        stories: 3,
        description: '10 crédits pour créer des histoires magiques',
        highlight: true,
    },
    {
        name: 'Pack Standard',
        price: 19.99,
        type: 'one-time',
        credits: 20,
        stories: 6,
        description: '20 crédits pour encore plus d\'aventures',
        highlight: false,
    }
];

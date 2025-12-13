import { IPricing } from "@/types";

export const subscriptions: IPricing[] = [
    {
        name: 'Family Starter',
        price: 9.99,
        type: 'subscription',
        credits: 12,
        stories: 4,
        description: 'Parfait pour les familles qui veulent créer régulièrement',
        highlight: true,
    },
    {
        name: 'Premium Creator',
        price: 24.99,
        type: 'subscription',
        credits: 22,
        stories: 7,
        description: 'Pour les créateurs passionnés',
        highlight: false,
    },
];

export const subscription: IPricing = subscriptions[0];

export const creditPacks: IPricing[] = [
    {
        name: 'Mini Pack',
        price: 8.99,
        type: 'one-time',
        credits: 10,
        stories: 3,
        description: 'Idéal pour découvrir Fidjoo',
        highlight: true,

    },
    {
        name: 'Standard Pack',
        price: 16.99,
        type: 'one-time',
        credits: 20,
        stories: 6,
        description: 'Le plus populaire',
    }
];

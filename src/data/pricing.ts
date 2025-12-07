import { IPricing } from "@/types";

export const subscription: IPricing = {
    name: 'Family Starter',
    price: 9.99,
    type: 'subscription',
    credits: 12,
    stories: 4,
    description: 'Parfait pour les familles qui veulent créer régulièrement',
    highlight: true,
};

export const creditPacks: IPricing[] = [
    {
        name: 'Mini Pack',
        price: 7.99,
        type: 'one-time',
        credits: 10,
        stories: 3,
        description: 'Idéal pour découvrir Fidjoo',
    },
    {
        name: 'Standard Pack',
        price: 15.99,
        type: 'one-time',
        credits: 20,
        stories: 6,
        description: 'Le plus populaire',
        highlight: true,
    },
    {
        name: 'Large Pack',
        price: 35.99,
        type: 'one-time',
        credits: 35,
        stories: 11,
        description: 'Meilleur rapport qualité-prix',
    },
];

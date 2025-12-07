import { IFAQ } from "@/types";
import { siteDetails } from "./siteDetails";
export const faqs: IFAQ[] = [
    {
        question: `Is ${siteDetails.siteName} safe for children?`,
        answer: `${siteDetails.siteName} is 100% ad-free and built as a closed, kid-friendly environment. All creations stay private and fully supervised by parents.`,
    },
    {
        question: `What is ${siteDetails.siteName}?`,
        answer: `${siteDetails.siteName} is a creative app where children turn simple choices into their own animated storybooks, replacing passive screen time with meaningful, imaginative play.`,
    },
    {
        question: `What ages is ${siteDetails.siteName} designed for?`,
        answer: `${siteDetails.siteName} is ideal for children aged 5 to 12, with stories and experiences adapted to different reading and developmental levels.`,
    },
    {
        question: `Does ${siteDetails.siteName} work offline?`,
        answer: `Yes. Once a story is created, it can be enjoyed offline anytime. A connection is only needed for creating or customizing new stories.`,
    },
    {
        question: `How much does ${siteDetails.siteName} cost?`,
        answer: `You can start for free with one story. Then, flexible subscriptions and credit packs allow families to choose the option that fits them best.`,
    }
];

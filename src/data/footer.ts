import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    socials: ISocials;
} = {
    subheading: "Fidjoo helps children build their own animated storybooks through meaningful, engaging, and positive screen time.",
    quickLinks: [
        {
            text: "Features",
            url: "#features"
        },
        {
            text: "Pricing",
            url: "#pricing"
        },
        {
            text: "Testimonials",
            url: "#testimonials"
        },
        {
            text: "Confidentiality",
            url: "/confidentiality"
        },
        {
            text: "Privacy Policy",
            url: "/privacy"
        },
        {
            text: "Terms of Service",
            url: "/terms"
        },
        {
            text: "delete",
            url: "/delete"
        }
    ],
    email: 'contact@fidjoo.com',
    telephone: '+33 6 21 80 16 15',
    socials: {
        // github: 'https://github.com',
        // x: 'https://twitter.com/x',
        twitter: 'https://twitter.com/Twitter',
        facebook: 'https://facebook.com',
        // youtube: 'https://youtube.com',
        linkedin: 'https://www.linkedin.com',
        // threads: 'https://www.threads.net',
        instagram: 'https://www.instagram.com',
    }
}
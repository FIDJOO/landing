import { ITestimonial } from "@/types";
import { siteDetails } from "./siteDetails";

export const testimonials: ITestimonial[] = [
    {
        name: 'Sarah Mitchell',
        role: 'Parent of two',
        message: `${siteDetails.siteName} turned screen time into something meaningful at home. My kids create their own stories instead of scrolling — it’s the first app I feel good about letting them use.`,
        avatar: '/images/testimonial-1.webp',
    },
    {
        name: 'Lucas Ramirez',
        role: 'Elementary School Teacher',
        message: `${siteDetails.siteName} encourages creativity and storytelling in a way that feels natural for children. It’s become one of my favorite tools to help students express themselves creatively.`,
        avatar: '/images/testimonial-2.webp',
    },
    {
        name: 'Dr. Amanda Lee',
        role: 'Child Psychologist',
        message: `${siteDetails.siteName} offers a healthy digital alternative for families. It promotes imagination, emotional expression, and confidence while keeping children in a safe environment.`,
        avatar: '/images/testimonial-3.webp',
    },
];

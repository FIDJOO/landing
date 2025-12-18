'use client';

import { useTranslations } from 'next-intl';
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing/Pricing";
import FAQ from "@/components/FAQ";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Section from "@/components/Section";
//import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import BlogPreview from "@/components/BlogPreview";

const HomeContent: React.FC = () => {
    const tPricing = useTranslations('pricing');
    const tBlog = useTranslations('blog');

    return (
        <>
            <Hero />
            <Container>
                <Benefits />

                <Section
                    id="pricing"
                    title={tPricing('title')}
                    description={tPricing('description')}
                >
                    <Pricing />
                </Section>

                <Section
                    id="blog"
                    title={tBlog('title')}
                    description={tBlog('description')}
                >
                    <BlogPreview />
                </Section>

                <FAQ />

                {/* <Stats /> */}

                <CTA />
            </Container>
        </>
    );
};

export default HomeContent;

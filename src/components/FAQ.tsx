"use client"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useTranslations } from 'next-intl';

import SectionTitle from "./SectionTitle";

const FAQ: React.FC = () => {
    const t = useTranslations('faq');

    const faqKeys = ['bestBedtimeApp', 'whatIsFidjoo', 'howItWorks', 'isSafe', 'whatAges', 'offlineMode', 'pricing', 'sleepStories'] as const;

    return (
        <section id="faq" className="py-10 lg:py-20">
            <div className="flex flex-col lg:flex-row gap-10">
                <div className="">
                    <p className="hidden lg:block text-secondary font-semibold">{t('subtitle')}</p>
                    <SectionTitle>
                        <h2 className="my-3 !leading-snug lg:max-w-sm text-center lg:text-left">{t('title')}</h2>
                    </SectionTitle>
                    <p className="lg:mt-10 text-foreground-accent text-center lg:text-left">
                        {t('askUs')}
                    </p>
                    <a href="mailto:contact@fidjoo.com" className="mt-3 block text-xl lg:text-4xl text-secondary font-semibold hover:underline text-center lg:text-left">contact@fidjoo.com</a>
                </div>

                <div className="w-full lg:max-w-2xl mx-auto border-b border-secondary">
                    {faqKeys.map((key, index) => (
                        <div key={index} className="mb-7">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <DisclosureButton className="flex items-center justify-between w-full px-4 pt-7 text-lg text-left border-t border-secondary">
                                            <span className="text-2xl font-semibold text-foreground">{t(`questions.${key}.question`)}</span>
                                            {open ? <BiMinus className="w-6 h-6 text-secondary" /> : <BiPlus className="w-6 h-6 text-primary" />}
                                        </DisclosureButton>
                                        <DisclosurePanel className="px-4 pt-4 pb-2 text-foreground-accent">
                                            {t(`questions.${key}.answer`)}
                                        </DisclosurePanel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
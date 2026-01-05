'use client';

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { siteDetails } from '@/data/siteDetails';
import { footerDetails } from '@/data/footer';
import { getPlatformIconByName } from '@/utils';

const Footer: React.FC = () => {
    const t = useTranslations('footer');

    const quickLinks = [
        { key: 'features', url: '#features' },
        { key: 'pricing', url: '#pricing' },
        { key: 'testimonials', url: '#testimonials' },
        { key: 'legal', url: '/legal' },
    ];

    return (
        <footer className="bg-hero-background text-foreground py-10">
            <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <Link href="/" className="flex items-center gap-2">
                        <Image src={siteDetails.siteLogo} alt={siteDetails.siteName} width={50} height={50} />
                        <span className="text-xl font-semibold">
                            {siteDetails.siteName}
                        </span>
                    </Link>
                    <p className="mt-3.5 text-foreground-accent">
                        {t('subheading')}
                    </p>
                </div>
                <div>
                    <p className="text-lg font-semibold mb-4">{t('quickLinks')}</p>
                    <ul className="text-foreground-accent">
                        {quickLinks.map(link => (
                            <li key={link.key} className="mb-2">
                                <Link href={link.url} className="hover:text-foreground">{t(`links.${link.key}`)}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="text-lg font-semibold mb-4">{t('contactUs')}</p>

                    {footerDetails.email && <a href={`mailto:${footerDetails.email}`}  className="block text-foreground-accent hover:text-foreground">{t('email')}: {footerDetails.email}</a>}

                    {footerDetails.telephone && <a href={`tel:${footerDetails.telephone}`} className="block text-foreground-accent hover:text-foreground">{t('phone')}: {footerDetails.telephone}</a>}

                    {footerDetails.socials && (
                        <div className="mt-5 flex items-center gap-5 flex-wrap">
                            {Object.keys(footerDetails.socials).map(platformName => {
                                if (platformName && footerDetails.socials[platformName]) {
                                    return (
                                        <Link
                                            href={footerDetails.socials[platformName] || ''}
                                            key={platformName}
                                            aria-label={platformName}
                                        >
                                            {getPlatformIconByName(platformName)}
                                        </Link>
                                    )
                                }
                            })}
                        </div>
                    )}
                </div>
            </div>

        </footer>
    );
};

export default Footer;

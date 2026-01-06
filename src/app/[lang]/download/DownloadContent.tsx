'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { siteDetails } from '@/data/siteDetails';
import AppStoreButton from '@/components/AppStoreButton';
import PlayStoreButton from '@/components/PlayStoreButton';
import { track } from '@vercel/analytics';
import Image from 'next/image';
import { UAParser } from 'ua-parser-js';
import { QRCodeSVG } from 'qrcode.react';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

type Platform = 'ios' | 'android' | 'desktop' | 'loading';

function detectPlatform(): Platform {
    if (typeof window === 'undefined') return 'loading';

    const parser = new UAParser(navigator.userAgent);
    const os = parser.getOS();
    const device = parser.getDevice();

    const isMobileDevice = device.type === 'mobile' || device.type === 'tablet';

    if (os.name === 'iOS' || os.name === 'Mac OS' && isMobileDevice) {
        return 'ios';
    }

    if (os.name === 'Android') {
        return 'android';
    }

    return 'desktop';
}

function ShareButton() {
    const t = useTranslations('download');
    const localizedPath = useLocalizedPath();
    const [isPressed, setIsPressed] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const shadowHeight = 6;

    const handleShare = async () => {
        const shareData = {
            title: t('shareTitle'),
            text: t('shareText'),
            url: `${siteDetails.siteUrl}${localizedPath('/download').slice(1)}`,
        };

        const canShare = typeof navigator.share === 'function';
        track('Share Button Click', { method: canShare ? 'native' : 'clipboard' });

        if (canShare) {
            try {
                await navigator.share(shareData);
            } catch {
                // User cancelled or error
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareData.url);
                setShowCopied(true);
                setTimeout(() => setShowCopied(false), 2000);
            } catch {
                // Clipboard failed
            }
        }
    };

    return (
        <button
            onClick={handleShare}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => setIsPressed(false)}
            className="flex items-center justify-center min-w-[205px] mt-3 px-6 h-14 rounded-2xl w-full sm:w-fit border-2 transition-transform duration-75 select-none bg-primary text-white border-primary-dark"
            style={{
                boxShadow: isPressed
                    ? 'none'
                    : `0 ${shadowHeight}px 0 0 var(--primary-dark)`,
                transform: isPressed ? `translateY(${shadowHeight}px)` : 'translateY(0)',
            }}
        >
            <div className="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
            </div>
            <div className="font-sans text-lg font-semibold">
                {showCopied ? t('linkCopied') : t('share')}
            </div>
        </button>
    );
}

export default function DownloadContent() {
    const t = useTranslations('download');
    const localizedPath = useLocalizedPath();
    const [platform, setPlatform] = useState<Platform>('loading');

    useEffect(() => {
        const detected = detectPlatform();
        setPlatform(detected);

        if (detected === 'ios') {
            track('Download Page Redirect', { platform: 'ios' });
            window.location.href = siteDetails.appStoreUrl;
        } else if (detected === 'android') {
            track('Download Page Redirect', { platform: 'android' });
            window.location.href = siteDetails.googlePlayUrl;
        } else {
            track('Download Page View', { platform: 'desktop' });
        }
    }, []);

    if (platform === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-pulse text-center">
                    <Image
                        src={siteDetails.siteLogo}
                        alt="Fidjoo"
                        width={80}
                        height={80}
                        className="mx-auto mb-4"
                    />
                    <p className="text-foreground/60">{t('redirecting')}</p>
                </div>
            </div>
        );
    }

    if (platform === 'ios' || platform === 'android') {
        const storeName = platform === 'ios' ? 'App Store' : 'Google Play';
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center px-6">
                    <Image
                        src={siteDetails.siteLogo}
                        alt="Fidjoo"
                        width={80}
                        height={80}
                        className="mx-auto mb-4"
                    />
                    <p className="text-foreground/60 mb-6">
                        {t('redirectingTo', { store: storeName })}
                    </p>
                    <p className="text-sm text-foreground/40">
                        {t('ifNotRedirected')}{' '}
                        <a
                            href={platform === 'ios' ? siteDetails.appStoreUrl : siteDetails.googlePlayUrl}
                            className="text-primary underline"
                        >
                            {t('clickHere')}
                        </a>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center px-6 max-w-md">
                <Image
                    src={siteDetails.siteLogo}
                    alt="Fidjoo"
                    width={120}
                    height={120}
                    className="mx-auto mb-6"
                />

                <h1 className="text-3xl font-bold text-foreground mb-3">
                    {t('title')}
                </h1>

                <p className="text-foreground/70 mb-8">
                    {t('description')}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
                    <AppStoreButton />
                    <PlayStoreButton />
                </div>

                <div className="flex justify-center mb-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm">
                        <QRCodeSVG
                            value={`${siteDetails.siteUrl}${localizedPath('/download').slice(1)}`}
                            size={180}
                            level="M"
                            imageSettings={{
                                src: siteDetails.siteLogo,
                                height: 40,
                                width: 40,
                                excavate: true,
                            }}
                        />
                    </div>
                </div>

                <p className="text-sm text-foreground/50 mb-4">
                    {t('scanQrCode')}
                </p>

                <div className="flex justify-center">
                    <ShareButton />
                </div>
            </div>
        </div>
    );
}

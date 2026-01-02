
'use client';

import { useEffect, useState } from 'react';
import { siteDetails } from '@/data/siteDetails';
import AppStoreButton from '@/components/AppStoreButton';
import PlayStoreButton from '@/components/PlayStoreButton';
import { track } from '@vercel/analytics';
import Image from 'next/image';
import { UAParser } from 'ua-parser-js';

type Platform = 'ios' | 'android' | 'desktop' | 'loading';

function detectPlatform(): Platform {
    if (typeof window === 'undefined') return 'loading';

    const parser = new UAParser(navigator.userAgent);
    const os = parser.getOS();
    const device = parser.getDevice();

    // Check if it's a mobile or tablet device
    const isMobileDevice = device.type === 'mobile' || device.type === 'tablet';

    // Detect iOS (iPhone, iPad, iPod)
    if (os.name === 'iOS' || os.name === 'Mac OS' && isMobileDevice) {
        return 'ios';
    }

    // Detect Android
    if (os.name === 'Android') {
        return 'android';
    }

    return 'desktop';
}

function ShareButton() {
    const [isPressed, setIsPressed] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const shadowHeight = 6;

    const handleShare = async () => {
        const shareData = {
            title: 'Fidjoo - Storytelling App for Kids',
            text: 'Découvre Fidjoo, l\'app qui transforme l\'imagination des enfants en histoires animées !',
            url: `${siteDetails.siteUrl}download`,
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
            // Fallback: copy to clipboard
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
                {showCopied ? 'Lien copié !' : 'Partager'}
            </div>
        </button>
    );
}

export default function DownloadPage() {
    const [platform, setPlatform] = useState<Platform>('loading');

    useEffect(() => {
        const detected = detectPlatform();
        setPlatform(detected);

        // Auto-redirect on mobile
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

    // Loading state
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
                    <p className="text-foreground/60">Redirection en cours...</p>
                </div>
            </div>
        );
    }

    // Mobile redirecting state
    if (platform === 'ios' || platform === 'android') {
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
                        Redirection vers {platform === 'ios' ? 'l\'App Store' : 'Google Play'}...
                    </p>
                    <p className="text-sm text-foreground/40">
                        Si la redirection ne fonctionne pas,{' '}
                        <a
                            href={platform === 'ios' ? siteDetails.appStoreUrl : siteDetails.googlePlayUrl}
                            className="text-primary underline"
                        >
                            cliquez ici
                        </a>
                    </p>
                </div>
            </div>
        );
    }

    // Desktop view
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
                    Télécharger Fidjoo
                </h1>

                <p className="text-foreground/70 mb-8">
                    Transformez l&apos;imagination de vos enfants en histoires animées magiques.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                    <AppStoreButton />
                    <PlayStoreButton />
                </div>

                <div className="flex justify-center">
                    <ShareButton />
                </div>

                <p className="text-sm text-foreground/40 mt-8">
                    Scannez ce lien depuis votre téléphone ou partagez-le !
                </p>
            </div>
        </div>
    );
}

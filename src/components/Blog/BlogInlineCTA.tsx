'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import AppStoreButton from '@/components/AppStoreButton';
import PlayStoreButton from '@/components/PlayStoreButton';

const BlogInlineCTA: React.FC = () => {
    const t = useTranslations('blogInlineCTA');

    return (
        <div className="my-10 bg-gradient-to-r from-primary/10 via-secondary/10 to-tertiary/10 rounded-2xl p-6 md:p-8 border border-primary/20 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
                {/* App Mockup */}
                <div className="relative w-32 h-48 md:w-40 md:h-56 flex-shrink-0">
                    <Image
                        src="/images/mockups/mckp_2.png"
                        alt="Fidjoo App"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                        {t('title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {t('description')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                        <AppStoreButton dark />
                        <PlayStoreButton dark />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogInlineCTA;

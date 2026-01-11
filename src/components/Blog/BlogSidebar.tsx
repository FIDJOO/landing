'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import AppStoreButton from '@/components/AppStoreButton';
import PlayStoreButton from '@/components/PlayStoreButton';
import Link3D from '@/components/ui/Link3D';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const BlogSidebar: React.FC = () => {
    const t = useTranslations('blogSidebar');
    const localizedPath = useLocalizedPath();

    return (
        <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-32 space-y-6">
                {/* Download CTA Card */}
                <div className="bg-card rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                        {t('downloadTitle')}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {t('downloadDescription')}
                    </p>
                    <div className="flex flex-col gap-2">
                        <AppStoreButton dark />
                        <PlayStoreButton dark />
                    </div>
                </div>

                {/* App Mockup Card */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 shadow-lg border border-primary/20">
                    <div className="relative w-full aspect-[3/4] max-w-[200px] mx-auto">
                        <Image
                            src="/images/mockups/mckp_1.png"
                            alt="Fidjoo App"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Try Fidjoo CTA Card */}
                <div className="bg-tertiary/10 rounded-2xl p-6 shadow-lg border border-tertiary/30">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                        {t('tryTitle')}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {t('tryDescription')}
                    </p>
                    <Link3D
                        href={localizedPath('/download')}
                        variant="primary"
                        size="sm"
                        className="w-full"
                    >
                        {t('tryButton')}
                    </Link3D>
                </div>
            </div>
        </aside>
    );
};

export default BlogSidebar;

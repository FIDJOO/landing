'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FiFileText, FiShield, FiLock, FiMic, FiTrash2 } from 'react-icons/fi';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const legalPages = [
  {
    key: 'terms',
    href: '/terms',
    icon: FiFileText,
  },
  {
    key: 'confidentiality',
    href: '/confidentiality',
    icon: FiShield,
  },
  {
    key: 'privacy',
    href: '/privacy',
    icon: FiLock,
  },
  {
    key: 'voice',
    href: '/voice',
    icon: FiMic,
  },
  {
    key: 'delete',
    href: '/delete',
    icon: FiTrash2,
  },
];

function LegalPage() {
  const t = useTranslations('legal');
  const localizedPath = useLocalizedPath();

  return (
    <div className="min-h-screen px-6 sm:px-12 lg:px-24 xl:px-40 py-12 flex justify-center items-center pt-32">
      <div className="max-w-2xl mx-auto w-full">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-[#11181C]">
              {t('title')}
            </CardTitle>
            <p className="text-gray-500 mt-2">
              {t('subtitle')}
            </p>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {legalPages.map((page) => {
                const Icon = page.icon;
                return (
                  <Link
                    key={page.key}
                    href={localizedPath(page.href)}
                    className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#49AAFF]/10 flex items-center justify-center group-hover:bg-[#49AAFF]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[#49AAFF]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#11181C] group-hover:text-[#49AAFF] transition-colors">
                        {t(`pages.${page.key}.title`)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {t(`pages.${page.key}.description`)}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-gray-400 group-hover:text-[#49AAFF] transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LegalPage;

'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function VoicePage() {
  const t = useTranslations('voiceTerms');

  return (
    <div className="min-h-screen px-6 sm:px-12 lg:px-24 xl:px-40 py-12 flex justify-center items-center pt-32">
      <div className="max-w-4xl mx-auto w-full">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-[#11181C]">
              {t('title')}
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {t('lastUpdated')}
            </CardDescription>
          </CardHeader>

          <Separator />

          <CardContent>
            {/* Section 1 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section1.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('section1.p1')}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t.rich('section1.p2', {
                  termsLink: (chunks) => (
                    <Link href="/terms" className="text-[#49AAFF] hover:underline">
                      {chunks}
                    </Link>
                  ),
                  privacyLink: (chunks) => (
                    <Link href="/confidentiality" className="text-[#49AAFF] hover:underline">
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t('section1.p3')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 2 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section2.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('section2.intro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>{t('section2.bullet1')}</li>
                <li>{t('section2.bullet2')}</li>
                <li>{t('section2.bullet3')}</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('section2.howItWorks')}
              </h3>
              <p className="text-gray-700 mb-3">
                {t('section2.stepsIntro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>{t('section2.step1')}</li>
                <li>{t('section2.step2')}</li>
                <li>{t('section2.step3')}</li>
                <li>{t('section2.step4')}</li>
              </ul>
            </section>

            <Separator className="mb-10" />

            {/* Section 3 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section3.title')}
              </h2>
              <p className="text-gray-700 mb-3">
                {t('section3.intro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>{t('section3.bullet1')}</li>
                <li>{t('section3.bullet2')}</li>
                <li>{t('section3.bullet3')}</li>
                <li>{t('section3.bullet4')}</li>
                <li>{t('section3.bullet5')}</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-[#49AAFF] p-6 rounded-lg">
                <p className="text-gray-800 font-semibold">
                  {t('section3.highlight')}
                </p>
              </div>
            </section>

            <Separator className="mb-10" />

            {/* Section 4 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section4.title')}
              </h2>
              <p className="text-gray-700 mb-3">
                {t('section4.intro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>{t('section4.bullet1')}</li>
                <li>{t('section4.bullet2')}</li>
                <li>{t('section4.bullet3')}</li>
                <li>{t('section4.bullet4')}</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-[#49AAFF] p-6 rounded-lg">
                <p className="text-gray-800 font-semibold">
                  {t('section4.highlight')}
                </p>
              </div>
            </section>

            <Separator className="mb-10" />

            {/* Section 5 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section5.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('section5.p1')}
              </p>
              <p className="text-gray-700 mb-3">
                {t('section5.intro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>{t('section5.bullet1')}</li>
                <li>{t('section5.bullet2')}</li>
                <li>{t('section5.bullet3')}</li>
              </ul>

              <p className="text-gray-700 leading-relaxed">
                {t('section5.linkText')}{" "}
                <a
                  href="https://cartesia.ai/legal/terms.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#49AAFF] hover:underline"
                >
                  https://cartesia.ai/legal/terms.html
                </a>
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 6 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section6.title')}
              </h2>
              <div className="bg-blue-50 border-l-4 border-[#49AAFF] p-6 rounded-lg mb-6">
                <p className="text-gray-800 font-semibold mb-3">
                  {t('section6.principle')}
                </p>
                <p className="text-gray-700">
                  {t('section6.principleDesc')}
                </p>
              </div>

              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>{t('section6.bullet1')}</li>
                <li>{t('section6.bullet2')}</li>
              </ul>
            </section>

            <Separator className="mb-10" />

            {/* Section 7 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section7.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('section7.intro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>{t('section7.bullet1')}</li>
                <li>
                  {t('section7.bullet2')}{" "}
                  <a
                    href="https://fidjoo.com/delete"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#49AAFF] hover:underline"
                  >
                    https://fidjoo.com/delete
                  </a>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('section7.deletionTitle')}
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>{t('section7.deletionBullet1')}</li>
                <li>{t('section7.deletionBullet2')}</li>
                <li>{t('section7.deletionBullet3')}</li>
                <li>{t('section7.deletionBullet4')}</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-[#49AAFF] p-6 rounded-lg">
                <p className="text-gray-800 font-semibold">
                  {t('section7.highlight')}
                </p>
              </div>
            </section>

            <Separator className="mb-10" />

            {/* Section 8 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section8.title')}
              </h2>
              <p className="text-gray-700 mb-3">
                {t('section8.intro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>{t('section8.bullet1')}</li>
                <li>{t('section8.bullet2')}</li>
                <li>{t('section8.bullet3')}</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-[#49AAFF] p-6 rounded-lg">
                <p className="text-gray-800 font-semibold">
                  {t('section8.highlight')}
                </p>
              </div>
            </section>

            <Separator className="mb-10" />

            {/* Section 9 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section9.title')}
              </h2>
              <p className="text-gray-700 mb-3">
                {t('section9.intro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>{t('section9.bullet1')}</li>
                <li>{t('section9.bullet2')}</li>
                <li>{t('section9.bullet3')}</li>
                <li>{t('section9.bullet4')}</li>
                <li>{t('section9.bullet5')}</li>
              </ul>

              <p className="text-gray-700 leading-relaxed">
                {t('section9.contact')}{" "}
                <a
                  href="mailto:dpo@fidjoo.com"
                  className="text-[#49AAFF] hover:underline"
                >
                  dpo@fidjoo.com
                </a>
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 10 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section10.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('section10.p1')}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t('section10.p2')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 11 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section11.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('section11.p1')}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t('section11.p2')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section12.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('section12.p1')}
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default VoicePage;

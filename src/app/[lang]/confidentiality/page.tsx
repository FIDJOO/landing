'use client';

import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function ConfidentialityPage() {
  const t = useTranslations('cgu');

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
            {/* Article 1 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article1.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('article1.intro')}
              </p>
              <dl className="space-y-3 ml-4">
                <div>
                  <dt className="font-semibold text-gray-900">{t('article1.client')}</dt>
                  <dd className="text-gray-700">{t('article1.clientDef')}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">{t('article1.compte')}</dt>
                  <dd className="text-gray-700">{t('article1.compteDef')}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">{t('article1.contenu')}</dt>
                  <dd className="text-gray-700">{t('article1.contenuDef')}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">{t('article1.donneesPersonnelles')}</dt>
                  <dd className="text-gray-700">{t('article1.donneesPersonnellesDef')}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">{t('article1.droitPI')}</dt>
                  <dd className="text-gray-700">{t('article1.droitPIDef')}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">{t('article1.produit')}</dt>
                  <dd className="text-gray-700">{t('article1.produitDef')}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">{t('article1.services')}</dt>
                  <dd className="text-gray-700">{t('article1.servicesDef')}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">{t('article1.site')}</dt>
                  <dd className="text-gray-700">
                    {t('article1.siteDef')}{" "}
                    <a href="https://fidjoo.com" className="text-[#49AAFF] hover:underline">
                      https://fidjoo.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">{t('article1.utilisateurs')}</dt>
                  <dd className="text-gray-700">{t('article1.utilisateursDef')}</dd>
                </div>
              </dl>
            </section>

            <Separator className="mb-10" />

            {/* Article 2 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article2.title')}
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <dl className="space-y-3">
                  <div>
                    <dt className="font-semibold text-gray-900">{t('article2.businessName')}</dt>
                    <dd className="text-gray-700">Fidjoo</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">{t('article2.address')}</dt>
                    <dd className="text-gray-700">
                      11 boulevard de la Saussaye, 92200 Neuilly-sur-Seine
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">{t('article2.siren')}</dt>
                    <dd className="text-gray-700">991 451 519</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">{t('article2.siret')}</dt>
                    <dd className="text-gray-700">991 451 519 00011</dd>
                  </div>
                </dl>
              </div>

              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article2.contacts')}
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <dl className="space-y-3">
                  <div>
                    <dt className="font-semibold text-gray-900">{t('article2.dpo')}</dt>
                    <dd className="text-gray-700">
                      <a href="mailto:dpo@fidjoo.com" className="text-[#49AAFF] hover:underline">
                        dpo@fidjoo.com
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">{t('article2.contact')}</dt>
                    <dd className="text-gray-700">
                      <a href="mailto:bonjour@fidjoo.com" className="text-[#49AAFF] hover:underline">
                        bonjour@fidjoo.com
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {t('article2.contactNote')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Article 3 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article3.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('article3.p1')}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('article3.p2')}{" "}
                <a href="https://fidjoo.com" className="text-[#49AAFF] hover:underline">
                  https://fidjoo.com
                </a>{" "}
                {t('article3.p2b')}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t('article3.p3')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Article 4 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article4.title')}
              </h2>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article4.sub1')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article4.sub1p1')}
              </p>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article4.sub2')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article4.sub2p1')}
              </p>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article4.sub3')}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t('article4.sub3p1')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Article 5 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article5.title')}
              </h2>
              <p className="text-gray-700 mb-3">
                {t('article5.intro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>{t('article5.bullet1')}</li>
                <li>{t('article5.bullet2')}</li>
                <li>{t('article5.bullet3')}</li>
                <li>{t('article5.bullet4')}</li>
                <li>{t('article5.bullet5')}</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                {t('article5.p1')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Article 6 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article6.title')}
              </h2>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article6.sub1')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article6.sub1p1')}
              </p>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article6.sub2')}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t('article6.sub2p1')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Article 7 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article7.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('article7.p1')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Article 8 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article8.title')}
              </h2>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article8.sub1')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article8.sub1p1')}
              </p>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article8.sub2')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('article8.sub2p1')}{" "}
                <a href="mailto:bonjour@fidjoo.com" className="text-[#49AAFF] hover:underline">
                  bonjour@fidjoo.com
                </a>
              </p>
              <p className="text-gray-700 mb-3">
                {t('article8.sub2intro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>{t('article8.sub2bullet1')}</li>
                <li>{t('article8.sub2bullet2')}</li>
                <li>{t('article8.sub2bullet3')}</li>
                <li>{t('article8.sub2bullet4')}</li>
                <li>{t('article8.sub2bullet5')}</li>
              </ul>
            </section>

            <Separator className="mb-10" />

            {/* Article 9 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article9.title')}
              </h2>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article9.sub1')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article9.sub1p1')}{" "}
                <a href="https://fidjoo.com/privacy" className="text-[#49AAFF] hover:underline">
                  https://fidjoo.com/privacy
                </a>
                {t('article9.sub1p1b')}
              </p>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article9.sub2')}
              </h3>
              <p className="text-gray-700 mb-3">
                {t('article9.sub2intro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>{t('article9.sub2bullet1')}</li>
                <li>{t('article9.sub2bullet2')}</li>
                <li>{t('article9.sub2bullet3')}</li>
                <li>{t('article9.sub2bullet4')}</li>
                <li>{t('article9.sub2bullet5')}</li>
                <li>{t('article9.sub2bullet6')}</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article9.sub2p1')}{" "}
                <a href="mailto:dpo@fidjoo.com" className="text-[#49AAFF] hover:underline">
                  dpo@fidjoo.com
                </a>
              </p>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article9.sub3')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article9.sub3p1')}
              </p>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article9.sub4')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article9.sub4p1')}
              </p>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article9.sub5')}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t('article9.sub5p1')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Article 10 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article10.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('article10.p1')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Article 11 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article11.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('article11.p1')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Article 12 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article12.title')}
              </h2>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article12.sub1')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article12.sub1p1')}
              </p>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article12.sub2')}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t('article12.sub2p1')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Article 13 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article13.title')}
              </h2>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article13.sub1')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article13.sub1p1')}{" "}
                <a href="mailto:bonjour@fidjoo.com" className="text-[#49AAFF] hover:underline">
                  bonjour@fidjoo.com
                </a>
                {t('article13.sub1p1b')}
              </p>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article13.sub2')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article13.sub2p1')}
              </p>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article13.sub3')}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t('article13.sub3p1')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Article 14 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article14.title')}
              </h2>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article14.sub1')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article14.sub1p1')}
              </p>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article14.sub2')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article14.sub2p1')}
              </p>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article14.sub3')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article14.sub3p1')}
              </p>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article14.sub4')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article14.sub4p1')}
              </p>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article14.sub5')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article14.sub5p1')}
              </p>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article14.sub6')}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t('article14.sub6p1')}{" "}
                <a href="mailto:bonjour@fidjoo.com" className="text-[#49AAFF] hover:underline">
                  bonjour@fidjoo.com
                </a>
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Article 15 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article15.title')}
              </h2>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article15.sub1')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article15.sub1p1')}
              </p>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article15.sub2')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article15.sub2p1')}
              </p>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article15.sub3')}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t('article15.sub3p1')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Article 16 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article16.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('article16.p1')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Article 17 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article17.title')}
              </h2>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article17.sub1')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article17.sub1p1')}
              </p>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article17.sub2')}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t('article17.sub2p1')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Article 18 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article18.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('article18.p1')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Article 19 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article19.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('article19.p1')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Article 20 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article20.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('article20.p1')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Article 21 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article21.title')}
              </h2>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article21.sub1')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('article21.sub1p1')}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article21.sub1p2')}
              </p>

              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article21.sub2')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('article21.sub2p1')}
              </p>
              <p className="text-gray-700 mb-3">
                {t('article21.sub2intro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>{t('article21.sub2bullet1')}</li>
                <li>{t('article21.sub2bullet2')}</li>
                <li>{t('article21.sub2bullet3')}</li>
                <li>{t('article21.sub2bullet4')}</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article21.sub2p2')}
              </p>

              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article21.sub3')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('article21.sub3p1')}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('article21.sub3p2')}
              </p>
              <p className="text-gray-700 mb-3">
                {t('article21.sub3intro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>{t('article21.sub3bullet1')}</li>
                <li>{t('article21.sub3bullet2')}</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article21.sub3p3')}
              </p>

              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article21.sub4')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('article21.sub4p1')}
              </p>
              <div className="bg-blue-50 border-l-4 border-[#49AAFF] p-6 rounded-lg mb-4">
                <p className="text-gray-800 font-semibold mb-3">
                  {t('article21.sub4highlightTitle')}
                </p>
                <p className="text-gray-700 mb-2">
                  {t('article21.sub4highlightP1')}
                </p>
                <p className="text-gray-700">
                  {t('article21.sub4highlightP2')}
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('article21.sub4p2')}
              </p>
              <div className="bg-blue-50 border-l-4 border-[#49AAFF] p-6 rounded-lg mb-6">
                <p className="text-gray-800 font-semibold mb-3">
                  {t('article21.sub4refundTitle')}
                </p>
                <p className="text-gray-700">
                  {t('article21.sub4refundP1')}
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article21.sub5')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('article21.sub5p1')}
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('article21.sub5p2')}
              </p>

              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('article21.sub6')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('article21.sub6p1')}
              </p>
              <p className="text-gray-700 mb-3">
                {t('article21.sub6intro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>{t('article21.sub6bullet1')}</li>
                <li>{t('article21.sub6bullet2')}</li>
                <li>{t('article21.sub6bullet3')}</li>
                <li>{t('article21.sub6bullet4')}</li>
              </ul>
            </section>

            <Separator className="mb-10" />

            {/* Article 22 */}
            <section>
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('article22.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('article22.p1')}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('article22.p2')}{" "}
                <a
                  href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#49AAFF] hover:underline"
                >
                  https://www.apple.com/legal/internet-services/itunes/dev/stdeula/
                </a>
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t('article22.p3')}
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ConfidentialityPage;

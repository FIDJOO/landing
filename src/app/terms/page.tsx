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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Terms() {
  const t = useTranslations('privacy');

  return (
    <div className="min-h-screen px-6 sm:px-12 lg:px-24 xl:px-40 py-12 flex justify-center items-center pt-32">
      <div className="max-w-4xl mx-auto w-full ">
        <Card className="shadow-lg ">
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
              <p className="text-gray-700 leading-relaxed">
                {t('section1.p2')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 2 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section2.title')}
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <dl className="space-y-3">
                  <div>
                    <dt className="font-semibold text-gray-900">{t('section2.businessName')}</dt>
                    <dd className="text-gray-700">Fidjoo</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">{t('section2.address')}</dt>
                    <dd className="text-gray-700">
                      11 boulevard de la Saussaye, 92200 Neuilly-sur-Seine
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">SIREN</dt>
                    <dd className="text-gray-700">991 451 519</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">SIRET</dt>
                    <dd className="text-gray-700">991 451 519 00011</dd>
                  </div>
                </dl>
              </div>

              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('section2.contacts')}
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <dl className="space-y-3">
                  <div>
                    <dt className="font-semibold text-gray-900">
                      {t('section2.dpo')}
                    </dt>
                    <dd className="text-gray-700">
                      <a
                        href="mailto:dpo@fidjoo.com"
                        className="text-[#49AAFF] hover:underline"
                      >
                        dpo@fidjoo.com
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">{t('section2.contact')}</dt>
                    <dd className="text-gray-700">
                      <a
                        href="mailto:bonjour@fidjoo.com"
                        className="text-[#49AAFF] hover:underline"
                      >
                        bonjour@fidjoo.com
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {t('section2.contactNote')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 3 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section3.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('section3.p1')}
              </p>
              <p className="text-gray-700 mb-3">
                {t('section3.intro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>{t('section3.bullet1')}</li>
                <li>{t('section3.bullet2')}</li>
                <li>{t('section3.bullet3')}</li>
              </ul>
            </section>

            <Separator className="mb-10" />

            {/* Section 4 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section4.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('section4.p1')}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('section4.p2')}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t('section4.p3')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 5 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section5.title')}
              </h2>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('section5.userDataTitle')}
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>{t('section5.userDataBullet1')}</li>
                <li>{t('section5.userDataBullet2')}</li>
                <li>{t('section5.userDataBullet3')}</li>
                <li>{t('section5.userDataBullet4')}</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('section5.autoDataTitle')}
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>{t('section5.autoDataBullet1')}</li>
                <li>{t('section5.autoDataBullet2')}</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-[#49AAFF] p-6 rounded-lg">
                <p className="text-gray-800 font-semibold mb-3">
                  {t('section5.highlightTitle')}
                </p>
                <p className="text-gray-700">
                  {t('section5.highlightDesc')}
                </p>
              </div>
            </section>

            <Separator className="mb-10" />

            {/* Section 6 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section6.title')}
              </h2>
              <p className="text-gray-700 mb-3">
                {t('section6.intro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>{t('section6.bullet1')}</li>
                <li>{t('section6.bullet2')}</li>
                <li>{t('section6.bullet3')}</li>
                <li>{t('section6.bullet4')}</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('section6.legalBasisTitle')}
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>{t('section6.legalBasis1')}</li>
                <li>{t('section6.legalBasis2')}</li>
                <li>{t('section6.legalBasis3')}</li>
                <li>{t('section6.legalBasis4')}</li>
              </ul>
            </section>

            <Separator className="mb-10" />

            {/* Section 7 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section7.title')}
              </h2>
              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('section7.partnersTitle')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('section7.partnersP1')}
              </p>
              <p className="text-gray-700 mb-3">
                {t('section7.partnersIntro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>{t('section7.partnersBullet1')}</li>
                <li>{t('section7.partnersBullet2')}</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-[#49AAFF] p-6 rounded-lg mb-6">
                <p className="text-gray-800 font-semibold">
                  {t('section7.partnersHighlight')}
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                {t('section7.legalTitle')}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t('section7.legalP1')}
              </p>
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
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>{t('section8.bullet1')}</li>
                <li>{t('section8.bullet2')}</li>
                <li>{t('section8.bullet3')}</li>
                <li>{t('section8.bullet4')}</li>
              </ul>
            </section>

            <Separator className="mb-10" />

            {/* Section 9 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section9.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('section9.p1')}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t('section9.p2')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 10 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section10.title')}
              </h2>
              <div className="overflow-x-auto mb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">{t('section10.tableHeader1')}</TableHead>
                      <TableHead className="font-semibold">{t('section10.tableHeader2')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>{t('section10.tableRow1Col1')}</TableCell>
                      <TableCell>{t('section10.tableRow1Col2')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{t('section10.tableRow2Col1')}</TableCell>
                      <TableCell>{t('section10.tableRow2Col2')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{t('section10.tableRow3Col1')}</TableCell>
                      <TableCell>{t('section10.tableRow3Col2')}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
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
              <p className="text-gray-700 mb-3">
                {t('section11.intro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>{t('section11.bullet1')}</li>
                <li>{t('section11.bullet2')}</li>
                <li>{t('section11.bullet3')}</li>
                <li>{t('section11.bullet4')}</li>
                <li>{t('section11.bullet5')}</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('section11.p1')}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t('section11.p2')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 12 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section12.title')}
              </h2>
              <p className="text-gray-700 mb-3">
                {t('section12.intro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>{t('section12.bullet1')}</li>
                <li>{t('section12.bullet2')}</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                {t('section12.p1')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 13 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section13.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('section13.p1')}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('section13.p2')}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t('section13.p3')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 14 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section14.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('section14.p1')}{" "}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#49AAFF] hover:underline"
                >
                  (www.cnil.fr)
                </a>
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 15 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section15.title')}
              </h2>
              <p className="text-gray-700 mb-3">
                {t('section15.intro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>{t('section15.bullet1')}</li>
                <li>{t('section15.bullet2')}</li>
              </ul>
            </section>

            <Separator className="mb-10" />

            {/* Section 16 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section16.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('section16.p1')}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('section16.p2')}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t('section16.p3')}
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 17 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section17.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t('section17.p1')}{" "}
                <a
                  href="https://www.apple.com/legal/internet-services/itunes/fr/terms.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#49AAFF] hover:underline"
                >
                  https://www.apple.com/legal/internet-services/itunes/fr/terms.html
                </a>
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 18 */}
            <section>
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                {t('section18.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('section18.p1')}
              </p>
              <p className="text-gray-700 mb-3">
                {t('section18.contactIntro')}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  <a href="mailto:dpo@fidjoo.com" className="text-[#49AAFF] hover:underline">
                    {t('section18.contactDpo')}
                  </a>
                </li>
                <li>
                  <a href="mailto:bonjour@fidjoo.com" className="text-[#49AAFF] hover:underline">
                    {t('section18.contactPresident')}
                  </a>
                </li>
              </ul>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Terms;

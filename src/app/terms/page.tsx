import { Metadata } from "next";
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
import { siteDetails } from "@/data/siteDetails";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteDetails.siteName}`,
  description: "Read Fidjoo's terms of service to understand how our creative storytelling app works for your family.",
  alternates: {
    canonical: '/terms',
  },
};

function Privacy() {
  return (
    <div className="min-h-screen px-6 sm:px-12 lg:px-24 xl:px-40 py-12 flex justify-center items-center pt-32">
      <div className="max-w-4xl mx-auto w-full ">
        <Card className="shadow-lg ">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-[#11181C]">
              Politique de Confidentialité
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Dernière mise à jour : 6 novembre 2025
            </CardDescription>
          </CardHeader>

          <Separator />

          <CardContent>
            {/* Section 1 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Fidjoo <em>(ci-après « nous », « notre » ou « nos »)</em> s&apos;engage
                à protéger la vie privée de ses utilisateurs et à assurer la
                transparence sur la manière dont leurs données sont collectées,
                utilisées et protégées.
              </p>
              <p className="text-gray-700 leading-relaxed">
                La présente politique décrit les conditions d&apos;utilisation de nos
                services et la manière dont nous traitons les données personnelles
                dans le cadre de l&apos;utilisation de notre{" "}
                <strong>application mobile</strong> et de notre{" "}
                <strong>site web</strong> (collectivement, les{" "}
                <strong>« Services »</strong>).
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 2 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                2. Informations légales
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <dl className="space-y-3">
                  <div>
                    <dt className="font-semibold text-gray-900">Nom commercial</dt>
                    <dd className="text-gray-700">Fidjoo</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">Adresse</dt>
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
                Contacts
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <dl className="space-y-3">
                  <div>
                    <dt className="font-semibold text-gray-900">
                      Délégué à la Protection des Données (DPO)
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
                    <dt className="font-semibold text-gray-900">Contact</dt>
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
                Ces deux contacts sont à votre disposition pour toute question
                relative à la présente politique ou à l&apos;utilisation de nos
                services.
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 3 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                3. Utilisation des Services
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nos Services sont destinés à un{" "}
                <strong>usage personnel, non commercial</strong>. Toute
                utilisation à des fins commerciales, sans autorisation expresse de
                Fidjoo, est interdite.
              </p>
              <p className="text-gray-700 mb-3">Les utilisateurs s&apos;engagent à :</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>respecter les lois en vigueur</li>
                <li>ne pas porter atteinte aux droits de tiers</li>
                <li>ne pas perturber le bon fonctionnement des Services</li>
              </ul>
            </section>

            <Separator className="mb-10" />

            {/* Section 4 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                4. Propriété intellectuelle
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Tous les contenus présents sur nos Services (textes, images, sons,
                vidéos, logos, illustrations, compilations, codes sources, etc.)
                sont la propriété exclusive de Fidjoo ou de ses partenaires.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ils sont protégés par les lois françaises et internationales sur le
                droit d&apos;auteur et la propriété intellectuelle.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Toute reproduction, distribution ou exploitation non autorisée est
                strictement interdite.
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 5 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                5. Données personnelles collectées
              </h2>

              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                a. Données fournies par l&apos;utilisateur
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>Email du parent</li>
                <li>Prénom, nom et date de naissance du parent</li>
                <li>Numéro de téléphone du parent</li>
                <li>Prénom et âge des enfants</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                b. Données collectées automatiquement
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>Données techniques et rapports d&apos;erreurs (via Sentry et PostHog)</li>
                <li>Données d&apos;usage anonymisées pour améliorer la performance</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-[#49AAFF] p-6 rounded-lg">
                <p className="text-gray-800 mb-3 font-semibold">
                  Fidjoo n&apos;enregistre jamais d&apos;audio ou de vidéo d&apos;enfants.
                </p>
                <p className="text-gray-700">
                  Les enfants peuvent uniquement visionner leurs histoires, qui
                  contiennent des éléments audio/vidéo générés, mais jamais
                  enregistrés ni stockés par nous.
                </p>
              </div>
            </section>

            <Separator className="mb-10" />

            {/* Section 6 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                6. Utilisation des données
              </h2>
              <p className="text-gray-700 mb-3">
                Les données collectées servent à :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>Fournir et améliorer nos Services</li>
                <li>
                  Personnaliser les histoires en fonction des interactions de
                  l&apos;enfant (avec consentement parental)
                </li>
                <li>Gérer les rapports d&apos;erreurs et la stabilité technique</li>
                <li>
                  Communiquer avec les parents, uniquement si un consentement
                  explicite a été donné
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                Base légale du traitement
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  <strong>Consentement</strong> : pour les données des enfants et
                  les communications marketing
                </li>
                <li>
                  <strong>Exécution du contrat</strong> : pour fournir les Services
                </li>
                <li>
                  <strong>Intérêt légitime</strong> : pour la sécurité, la
                  prévention de la fraude et l&apos;amélioration continue
                </li>
                <li>
                  <strong>Obligation légale</strong> : lorsque la loi l&apos;exige
                </li>
              </ul>
            </section>

            <Separator className="mb-10" />

            {/* Section 7 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                7. Partage et divulgation des données
              </h2>

              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                a. Partenaires de service
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Nous partageons certaines données avec des prestataires techniques
                (hébergement, analyses, sécurité), exclusivement pour le bon
                fonctionnement de Fidjoo.
              </p>
              <p className="text-gray-700 mb-2">Ces prestataires :</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>ne peuvent utiliser les données que dans le cadre de leur mission</li>
                <li>
                  respectent les clauses contractuelles types de la Commission
                  européenne
                </li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-[#49AAFF] p-6 rounded-lg mb-6">
                <p className="text-gray-800 font-semibold">
                  Toutes les données sont hébergées sur des serveurs AWS situés en
                  Europe.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#11181C] mb-3">
                b. Obligations légales
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Nous pouvons divulguer certaines informations si la loi nous y
                oblige ou pour protéger nos droits, la sécurité de nos utilisateurs
                ou d&apos;autres personnes.
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 8 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                8. Sécurité des données
              </h2>
              <p className="text-gray-700 mb-3">
                Nous appliquons des mesures techniques et organisationnelles
                robustes :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>chiffrement des données en transit et au repos</li>
                <li>accès restreint aux données personnelles</li>
                <li>audits réguliers de sécurité</li>
                <li>procédures de sauvegarde et de récupération</li>
              </ul>
            </section>

            <Separator className="mb-10" />

            {/* Section 9 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                9. Transferts internationaux
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Certaines opérations peuvent impliquer des transferts de données en
                dehors de l&apos;UE.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Dans ce cas, nous garantissons un niveau de protection adéquat
                conformément au RGPD, grâce aux{" "}
                <strong>clauses contractuelles types</strong>.
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 10 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                10. Durée de conservation des données
              </h2>
              <div className="rounded-lg border overflow-hidden mb-6">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#49AAFF] hover:bg-[#49AAFF]">
                      <TableHead className="text-white font-semibold">
                        Type de données
                      </TableHead>
                      <TableHead className="text-white font-semibold">
                        Durée de conservation
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Données de compte
                      </TableCell>
                      <TableCell>
                        Jusqu&apos;à 12 mois après la dernière utilisation
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Enregistrements audio (si applicables)
                      </TableCell>
                      <TableCell>30 jours maximum</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Données de facturation
                      </TableCell>
                      <TableCell>10 ans (obligation légale)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <p className="text-gray-700 leading-relaxed mb-3">
                Les utilisateurs peuvent demander la suppression de leurs données à
                tout moment auprès de <strong>Ruben Marciano</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Les demandes sont traitées sous <strong>30 jours maximum</strong>.
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 11 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                11. Vos droits (RGPD)
              </h2>
              <p className="text-gray-700 mb-3">
                Vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6">
                <li>Accès à vos données personnelles</li>
                <li>Rectification ou suppression</li>
                <li>Limitation ou opposition au traitement</li>
                <li>Portabilité des données</li>
                <li>Retrait du consentement à tout moment</li>
              </ul>

              <p className="text-gray-700 leading-relaxed mb-3">
                Pour exercer ces droits, contactez{" "}
                <strong>Ethan Smadja (DPO)</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Une réponse vous sera apportée dans un délai d&apos;un mois.
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 12 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                12. Cookies et technologies similaires
              </h2>
              <p className="text-gray-700 mb-3">Nous utilisons uniquement :</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>
                  des <strong>cookies essentiels</strong> au fonctionnement du site
                </li>
                <li>
                  des <strong>cookies analytiques anonymisés</strong> (via PostHog)
                  pour améliorer l&apos;expérience utilisateur
                </li>
              </ul>

              <p className="text-gray-700 leading-relaxed">
                Les préférences peuvent être gérées dans les paramètres du
                navigateur.
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 13 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                13. Modifications de la politique
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Cette politique peut être modifiée à tout moment.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                En cas de changement significatif, une notification sera envoyée
                par email ou via l&apos;application.
              </p>
              <p className="text-gray-700 leading-relaxed">
                La <strong>date de dernière mise à jour</strong> est toujours
                indiquée en haut du document.
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 14 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                14. Droit de plainte
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez
                déposer une plainte auprès de la <strong>CNIL</strong> (
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#49AAFF] hover:underline"
                >
                  www.cnil.fr
                </a>
                ).
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 15 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                15. Violation de données
              </h2>
              <p className="text-gray-700 mb-3">
                En cas de violation présentant un risque élevé pour vos droits et
                libertés, nous informerons :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>les personnes concernées</li>
                <li>la CNIL, conformément au RGPD</li>
              </ul>
            </section>

            <Separator className="mb-10" />

            {/* Section 16 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                16. Âge minimum et consentement parental
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Fidjoo s&apos;adresse aux <strong>enfants à partir de 5 ans</strong>,
                sous supervision d&apos;un parent ou tuteur légal.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                Aucune donnée d&apos;enfant n&apos;est collectée sans{" "}
                <strong>consentement explicite et vérifiable</strong> du parent,
                recueilli via son adresse email.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Ce consentement peut être retiré à tout moment en contactant{" "}
                <strong>Ruben Marciano</strong>.
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 17 */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                17. Conditions d&apos;utilisation d&apos;Apple
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                L&apos;utilisation de notre application iOS implique l&apos;acceptation des{" "}
                <strong>
                  Conditions d&apos;Utilisation des Services Internet d&apos;Apple
                </strong>
                , disponibles ici :
              </p>
              <p className="text-gray-700">
                <a
                  href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#49AAFF] hover:underline break-all"
                >
                  https://www.apple.com/legal/internet-services/itunes/dev/stdeula/
                </a>
              </p>
            </section>

            <Separator className="mb-10" />

            {/* Section 18 */}
            <section>
              <h2 className="text-2xl font-semibold text-[#11181C] mb-4">
                18. Acceptation
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                En utilisant nos Services, vous reconnaissez avoir lu et compris
                les présentes Conditions Générales d&apos;Utilisation et Politique de
                Confidentialité.
              </p>
              <p className="text-gray-700 mb-3">Pour toute question, contactez :</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  <strong>Ethan Smadja (DPO)</strong> pour les questions relatives
                  aux données
                </li>
                <li>
                  <strong>Ruben Marciano (Président)</strong> pour toute autre
                  demande
                </li>
              </ul>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Privacy;

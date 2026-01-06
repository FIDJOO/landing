import { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import { Locale, isValidLocale, defaultLocale } from "@/i18n/config";

import enMessages from "../../../../messages/en.json";
import frMessages from "../../../../messages/fr.json";

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  fr: frMessages,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const validLang = isValidLocale(lang) ? lang : defaultLocale;
  const t = messages[validLang].pages.legal;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `/${validLang}/legal`,
      languages: {
        en: "/en/legal",
        fr: "/fr/legal",
        "x-default": "/en/legal",
      },
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: `${siteDetails.siteUrl}${validLang}/legal`,
      locale: validLang === "fr" ? "fr_FR" : "en_US",
    },
  };
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

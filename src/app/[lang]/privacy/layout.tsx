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
  const t = messages[validLang].pages.privacy;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `/${validLang}/privacy`,
      languages: {
        en: "/en/privacy",
        fr: "/fr/privacy",
        "x-default": "/en/privacy",
      },
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: `${siteDetails.siteUrl}${validLang}/privacy`,
      locale: validLang === "fr" ? "fr_FR" : "en_US",
    },
  };
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

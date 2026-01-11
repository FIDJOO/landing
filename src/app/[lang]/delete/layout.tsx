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
  const t = messages[validLang].pages.delete;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/${validLang}/delete`,
      languages: {
        en: "/en/delete",
        fr: "/fr/delete",
        "x-default": "/en/delete",
      },
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: `${siteDetails.siteUrl}${validLang}/delete`,
      locale: validLang === "fr" ? "fr_FR" : "en_US",
    },
  };
}

export default function DeleteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

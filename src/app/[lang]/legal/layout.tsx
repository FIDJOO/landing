import { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";

export const metadata: Metadata = {
  title: `Legal Notice | ${siteDetails.siteName}`,
  description: "Legal information about Fidjoo. Company details, publisher information, and hosting provider for our children's storytelling app.",
  alternates: {
    canonical: '/legal',
  },
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

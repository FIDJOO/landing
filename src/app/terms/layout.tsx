import { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteDetails.siteName}`,
  description: "Read Fidjoo's terms of service. Understand the rules and guidelines for using our children's storytelling app.",
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

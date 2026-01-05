import { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";

export const metadata: Metadata = {
  title: `Confidentiality | ${siteDetails.siteName}`,
  description: "Fidjoo's confidentiality policy. Learn how we keep your family's stories and data private and secure.",
  alternates: {
    canonical: '/confidentiality',
  },
};

export default function ConfidentialityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

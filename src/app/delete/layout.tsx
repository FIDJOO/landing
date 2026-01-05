import { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";

export const metadata: Metadata = {
  title: `Delete Account | ${siteDetails.siteName}`,
  description: "Request deletion of your Fidjoo account and associated data. We respect your privacy and right to be forgotten.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/delete',
  },
};

export default function DeleteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";

export const metadata: Metadata = {
  title: `Contact Us | ${siteDetails.siteName}`,
  description: "Have a question about Fidjoo? Get in touch with our team. We'd love to hear from you.",
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteDetails.siteName}`,
  description: "Learn how Fidjoo protects your child's data. Our privacy policy explains what information we collect, how we use it, and your rights under GDPR.",
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

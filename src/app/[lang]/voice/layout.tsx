import { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";

export const metadata: Metadata = {
  title: `Voice Recording | ${siteDetails.siteName}`,
  description: "Record your voice to narrate your child's stories. Learn how Fidjoo's voice recording feature creates personalized bedtime stories with a parent's voice.",
  alternates: {
    canonical: '/voice',
  },
};

export default function VoiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

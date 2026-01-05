import { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";

export const metadata: Metadata = {
  title: `Download Fidjoo | Children's Storytelling App`,
  description: "Download Fidjoo for iOS and Android. Create personalized animated stories with your children. Free to download with creative story packs available.",
  alternates: {
    canonical: '/download',
  },
  openGraph: {
    title: `Download Fidjoo | Children's Storytelling App`,
    description: "Download Fidjoo for iOS and Android. Create personalized animated stories with your children.",
    url: `${siteDetails.siteUrl}download`,
  },
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

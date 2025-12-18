import { OrganizationJsonLd, WebsiteJsonLd, SoftwareApplicationJsonLd, FAQJsonLd } from "@/components/JsonLd";
import HomeContent from "@/components/HomeContent";

const HomePage: React.FC = () => {
  return (
    <>
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <SoftwareApplicationJsonLd />
      <FAQJsonLd />
      <HomeContent />
    </>
  );
};

export default HomePage;

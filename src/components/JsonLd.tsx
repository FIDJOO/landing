import { siteDetails } from '@/data/siteDetails';
import { faqs } from '@/data/faq';

export function OrganizationJsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteDetails.siteName,
    url: siteDetails.siteUrl,
    logo: `${siteDetails.siteUrl}images/mascotte/blue/blue.png`,
    description: siteDetails.metadata.description,
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'bonjour@fidjoo.com',
      contactType: 'customer service',
      availableLanguage: ['English', 'French'],
    },
    sameAs: [
      siteDetails.appStoreUrl,
      siteDetails.googlePlayUrl,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}

export function WebsiteJsonLd() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteDetails.siteName,
    url: siteDetails.siteUrl,
    description: siteDetails.metadata.description,
    inLanguage: ['en', 'fr'],
    publisher: {
      '@type': 'Organization',
      name: siteDetails.siteName,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteDetails.siteUrl}blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
}

export function SoftwareApplicationJsonLd() {
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: siteDetails.siteName,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'iOS 12.0+, Android 8.0+',
    description: siteDetails.metadata.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free to download with in-app purchases',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      ratingCount: '100',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Organization',
      name: siteDetails.siteName,
    },
    downloadUrl: [
      siteDetails.appStoreUrl,
      siteDetails.googlePlayUrl,
    ],
    featureList: [
      'Create personalized animated storybooks',
      'Guided story creation through choices',
      'Safe and kid-friendly environment',
      'Offline story viewing',
      'Family co-creation mode',
      'No ads',
    ],
    screenshot: `${siteDetails.siteUrl}api/og`,
    contentRating: 'Everyone',
    inLanguage: ['en', 'fr'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
    />
  );
}

export function FAQJsonLd() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

interface BlogPostJsonLdProps {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}

export function BlogPostJsonLd({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  authorName,
}: BlogPostJsonLdProps) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    url: url,
    image: imageUrl ? `${siteDetails.siteUrl}${imageUrl.replace(/^\//, '')}` : undefined,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteDetails.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteDetails.siteUrl}images/mascotte/blue/blue.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}

export function AllJsonLd() {
  return (
    <>
      <OrganizationJsonLd />
      <SoftwareApplicationJsonLd />
      <WebsiteJsonLd />
      <FAQJsonLd />
    </>
  );
}

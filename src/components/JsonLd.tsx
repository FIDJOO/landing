import { siteDetails } from '@/data/siteDetails';
import { faqs } from '@/data/faq';
import { footerDetails } from '@/data/footer';
import { subscriptions, creditPacks } from '@/data/pricing';
import { testimonials } from '@/data/testimonials';
import { Locale } from '@/i18n/config';

export function OrganizationJsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteDetails.siteName,
    url: siteDetails.siteUrl,
    logo: `${siteDetails.siteUrl}images/mascotte/blue/blue.png`,
    description: siteDetails.metadata.description,
    foundingDate: '2024',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: footerDetails.email,
        contactType: 'customer service',
        availableLanguage: ['English', 'French'],
      },
      {
        '@type': 'ContactPoint',
        telephone: footerDetails.telephone,
        contactType: 'customer service',
        availableLanguage: ['English', 'French'],
      },
    ],
    sameAs: [
      siteDetails.appStoreUrl,
      siteDetails.googlePlayUrl,
      footerDetails.socials.twitter,
      footerDetails.socials.facebook,
      footerDetails.socials.linkedin,
      footerDetails.socials.instagram,
    ].filter(Boolean),
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
    // TODO: Add aggregateRating back when you have real App Store/Play Store ratings
    // Example:
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: '4.8',
    //   ratingCount: '50',
    //   bestRating: '5',
    //   worstRating: '1',
    // },
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

export function PricingJsonLd() {
  const allOffers = [
    ...subscriptions.map((sub) => ({
      '@type': 'Offer',
      name: sub.name,
      price: sub.price,
      priceCurrency: 'EUR',
      description: sub.description,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      itemOffered: {
        '@type': 'Service',
        name: `${sub.name} - ${sub.credits} credits/month`,
        description: `${sub.stories} stories per month subscription`,
      },
    })),
    ...creditPacks.map((pack) => ({
      '@type': 'Offer',
      name: pack.name,
      price: pack.price,
      priceCurrency: 'EUR',
      description: pack.description,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      itemOffered: {
        '@type': 'Product',
        name: `${pack.name} - ${pack.credits} credits`,
        description: `One-time purchase of ${pack.credits} credits for ${pack.stories} stories`,
      },
    })),
  ];

  const pricingSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${siteDetails.siteName} Story Credits`,
    description: 'Credits for creating personalized animated storybooks for children',
    brand: {
      '@type': 'Brand',
      name: siteDetails.siteName,
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: Math.min(...[...subscriptions, ...creditPacks].map((p) => p.price)),
      highPrice: Math.max(...[...subscriptions, ...creditPacks].map((p) => p.price)),
      priceCurrency: 'EUR',
      offerCount: allOffers.length,
      offers: allOffers,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
    />
  );
}

export function TestimonialsJsonLd() {
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: siteDetails.siteName,
    description: siteDetails.metadata.description,
    brand: {
      '@type': 'Brand',
      name: siteDetails.siteName,
    },
    review: testimonials.map((testimonial) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: testimonial.name,
        jobTitle: testimonial.role,
      },
      reviewBody: testimonial.message,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: 5,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
    />
  );
}

interface BlogListJsonLdProps {
  posts: {
    title: string;
    url: string;
    datePublished: string;
    imageUrl?: string;
  }[];
  locale: Locale;
}

export function BlogListJsonLd({ posts, locale }: BlogListJsonLdProps) {
  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${siteDetails.siteName} Blog`,
    description: locale === 'fr'
      ? 'Conseils et astuces pour une parentalité créative.'
      : 'Tips and insights for creative parenting.',
    url: `${siteDetails.siteUrl}${locale}/blog`,
    inLanguage: locale,
    publisher: {
      '@type': 'Organization',
      name: siteDetails.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteDetails.siteUrl}images/mascotte/blue/blue.png`,
      },
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: post.url,
      datePublished: post.datePublished,
      image: post.imageUrl ? `${siteDetails.siteUrl}${post.imageUrl.replace(/^\//, '')}` : undefined,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
    />
  );
}

interface LocalizedFAQJsonLdProps {
  faqs: { question: string; answer: string }[];
}

export function LocalizedFAQJsonLd({ faqs }: LocalizedFAQJsonLdProps) {
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

interface ContactPageJsonLdProps {
  locale: Locale;
}

export function ContactPageJsonLd({ locale }: ContactPageJsonLdProps) {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: locale === 'fr' ? 'Nous contacter' : 'Contact Us',
    description: locale === 'fr'
      ? 'Contactez l\'équipe Fidjoo pour toute question.'
      : 'Contact the Fidjoo team for any questions.',
    url: `${siteDetails.siteUrl}${locale}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: siteDetails.siteName,
      email: footerDetails.email,
      telephone: footerDetails.telephone,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
    />
  );
}

interface DownloadPageJsonLdProps {
  locale: Locale;
}

export function DownloadPageJsonLd({ locale }: DownloadPageJsonLdProps) {
  const downloadSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: locale === 'fr' ? 'Télécharger Fidjoo' : 'Download Fidjoo',
    description: locale === 'fr'
      ? 'Téléchargez Fidjoo pour iOS et Android.'
      : 'Download Fidjoo for iOS and Android.',
    url: `${siteDetails.siteUrl}${locale}/download`,
    mainEntity: {
      '@type': 'MobileApplication',
      name: siteDetails.siteName,
      operatingSystem: 'iOS, Android',
      applicationCategory: 'EducationalApplication',
      downloadUrl: [siteDetails.appStoreUrl, siteDetails.googlePlayUrl],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(downloadSchema) }}
    />
  );
}

interface WebPageJsonLdProps {
  name: string;
  description: string;
  url: string;
  locale: Locale;
}

export function WebPageJsonLd({ name, description, url, locale }: WebPageJsonLdProps) {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      name: siteDetails.siteName,
      url: siteDetails.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteDetails.siteName,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
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
      <PricingJsonLd />
      <TestimonialsJsonLd />
    </>
  );
}

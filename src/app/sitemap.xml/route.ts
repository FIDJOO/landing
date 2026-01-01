import { blogPosts } from '@/data/blog';
import { siteDetails } from '@/data/siteDetails';

type SitemapPage = {
  url: string;
  lastModified: Date;
  changeFrequency: string;
  priority: number;
  images: string[];
  alternates?: Record<string, string>;
};

export async function GET() {
  const baseUrl = siteDetails.siteUrl.replace(/\/$/, '');
  const ogImage = `${baseUrl}/api/og`;

  // Supported languages for alternates
  const languages = {
    en: `${baseUrl}/en`,
    fr: `${baseUrl}/fr`,
  };

  const staticPages: SitemapPage[] = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: [ogImage],
      alternates: languages,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      images: [ogImage],
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
      images: [ogImage],
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
      images: [ogImage],
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
      images: [ogImage],
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
      images: [ogImage],
    },
    {
      url: `${baseUrl}/confidentiality`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
      images: [ogImage],
    },
    {
      url: `${baseUrl}/voice`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
      images: [ogImage],
    },
  ];

  const blogPages: SitemapPage[] = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
    images: post.coverImage
      ? [`${baseUrl}${post.coverImage}`, ogImage]
      : [ogImage],
  }));

  const allPages: SitemapPage[] = [...staticPages, ...blogPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages
    .map((page) => {
      const alternatesXml = page.alternates
        ? Object.entries(page.alternates)
            .map(
              ([lang, url]) =>
                `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}" />`
            )
            .join('\n')
        : '';

      const imagesXml = page.images
        ? page.images
            .map(
              (imageUrl) => `    <image:image>
      <image:loc>${imageUrl}</image:loc>
    </image:image>`
            )
            .join('\n')
        : '';

      return `  <url>
    <loc>${page.url}</loc>
${alternatesXml}
    <lastmod>${page.lastModified.toISOString()}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
${imagesXml}
  </url>`;
    })
    .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

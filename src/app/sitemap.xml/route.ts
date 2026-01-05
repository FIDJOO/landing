import { blogPosts } from '@/data/blog';
import { siteDetails } from '@/data/siteDetails';
import { locales } from '@/i18n/config';

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

  // Static pages (paths without locale prefix)
  const staticPaths = [
    { path: '', changeFrequency: 'weekly', priority: 1 },
    { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/download', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/legal', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/confidentiality', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/voice', changeFrequency: 'yearly', priority: 0.3 },
  ];

  const allPages: SitemapPage[] = [];

  // Generate localized pages for each static path
  for (const { path, changeFrequency, priority } of staticPaths) {
    for (const lang of locales) {
      const url = `${baseUrl}/${lang}${path}`;
      const ogImage = `${baseUrl}/${lang}/opengraph-image`;

      // Create alternates for all locales
      const alternates: Record<string, string> = {
        'x-default': `${baseUrl}/en${path}`,
      };
      for (const altLang of locales) {
        alternates[altLang] = `${baseUrl}/${altLang}${path}`;
      }

      allPages.push({
        url,
        lastModified: new Date(),
        changeFrequency,
        priority,
        images: [ogImage],
        alternates,
      });
    }
  }

  // Generate localized blog post pages
  for (const post of blogPosts) {
    for (const lang of locales) {
      const url = `${baseUrl}/${lang}/blog/${post.slug}`;
      const ogImage = `${baseUrl}/${lang}/opengraph-image`;

      const alternates: Record<string, string> = {
        'x-default': `${baseUrl}/en/blog/${post.slug}`,
      };
      for (const altLang of locales) {
        alternates[altLang] = `${baseUrl}/${altLang}/blog/${post.slug}`;
      }

      allPages.push({
        url,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
        images: post.coverImage
          ? [`${baseUrl}${post.coverImage}`, ogImage]
          : [ogImage],
        alternates,
      });
    }
  }

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

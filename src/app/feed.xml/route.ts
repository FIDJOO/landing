import { getBlogPosts } from '@/data/blog';
import { siteDetails } from '@/data/siteDetails';

export async function GET() {
  const baseUrl = siteDetails.siteUrl.replace(/\/$/, '');

  // Use English as the default language for the RSS feed
  const posts = getBlogPosts('en');

  const rssItems = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/en/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/en/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${post.author}</author>
      ${post.tags?.map((tag) => `<category>${tag}</category>`).join('\n      ') || ''}
    </item>`
    )
    .join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteDetails.siteName} Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Tips, insights, and stories about creative play, meaningful screen time, and nurturing your child's imagination.</description>
    <language>${siteDetails.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/images/mascotte/blue/blue.png</url>
      <title>${siteDetails.siteName}</title>
      <link>${baseUrl}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

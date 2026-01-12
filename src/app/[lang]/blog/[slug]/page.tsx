import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { blogPosts, getBlogPost } from "@/data/blog";
import { siteDetails } from "@/data/siteDetails";
import { BlogPostJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { Locale, locales } from "@/i18n/config";
import BlogSidebar from "@/components/Blog/BlogSidebar";
import BlogInlineCTA from "@/components/Blog/BlogInlineCTA";

import enMessages from "../../../../../messages/en.json";
import frMessages from "../../../../../messages/fr.json";

const messages = {
  en: enMessages,
  fr: frMessages,
};

type Props = {
  params: Promise<{ slug: string; lang: Locale }>;
};

export function generateStaticParams() {
  const params: { lang: Locale; slug: string }[] = [];

  for (const lang of locales) {
    for (const post of blogPosts) {
      params.push({ lang, slug: post.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params;
  const post = getBlogPost(slug, lang);

  if (!post) {
    return {
      title: `Post Not Found | ${siteDetails.siteName}`,
    };
  }

  const baseUrl = siteDetails.siteUrl.replace(/\/$/, "");

  const ogImageUrl = post.coverImage
    ? `${baseUrl}${post.coverImage}`
    : `${baseUrl}/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.excerpt)}`;

  return {
    title: `${post.title} | ${siteDetails.siteName}`,
    description: post.excerpt,
    alternates: {
      canonical: `/${lang}/blog/${post.slug}`,
      languages: {
        en: `/en/blog/${post.slug}`,
        fr: `/fr/blog/${post.slug}`,
        "x-default": `/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${baseUrl}/${lang}/blog/${post.slug}`,
      siteName: siteDetails.siteName,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
    },
  };
}

function parseMarkdown(content: string): { beforeCTA: string; afterCTA: string } {
  const lines = content.split("\n");
  const parsedLines: string[] = [];

  for (const line of lines) {
    // Headers
    if (line.startsWith("### ")) {
      parsedLines.push(`<h3 class="text-xl font-semibold text-foreground mt-8 mb-4">${line.slice(4)}</h3>`);
    } else if (line.startsWith("## ")) {
      parsedLines.push(`<h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">${line.slice(3)}</h2>`);
    } else {
      // Bold text
      const processed = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      // Unordered list items
      if (processed.startsWith("- ")) {
        parsedLines.push(`<li class="ml-6 text-gray-700">${processed.slice(2)}</li>`);
      }
      // Ordered list items
      else if (/^(\d+)\.\s/.test(processed)) {
        const orderedMatch = processed.match(/^(\d+)\.\s(.*)$/);
        if (orderedMatch) {
          parsedLines.push(`<li class="ml-6 text-gray-700">${orderedMatch[2]}</li>`);
        }
      }
      // Empty lines become paragraph breaks
      else if (processed.trim() === "") {
        parsedLines.push("");
      }
      // Regular paragraphs
      else {
        parsedLines.push(`<p class="text-gray-700 leading-relaxed mb-4">${processed}</p>`);
      }
    }
  }

  // Find all h2 header indices
  const h2Indices: number[] = [];
  for (let i = 0; i < parsedLines.length; i++) {
    if (parsedLines[i]?.includes('<h2')) {
      h2Indices.push(i);
    }
  }

  // Find the best h2 to split before (around 40-60% of content)
  let splitIndex = Math.floor(parsedLines.length * 0.5);

  if (h2Indices.length > 0) {
    // Find an h2 that's roughly in the middle of the article (between 40% and 70%)
    const targetMin = Math.floor(parsedLines.length * 0.4);
    const targetMax = Math.floor(parsedLines.length * 0.7);

    for (const h2Index of h2Indices) {
      if (h2Index >= targetMin && h2Index <= targetMax) {
        // Split right before this h2
        splitIndex = h2Index;
        break;
      }
    }

    // If no h2 found in ideal range, find the closest one after 30%
    if (splitIndex === Math.floor(parsedLines.length * 0.5)) {
      const minPosition = Math.floor(parsedLines.length * 0.3);
      for (const h2Index of h2Indices) {
        if (h2Index >= minPosition) {
          splitIndex = h2Index;
          break;
        }
      }
    }
  }

  return {
    beforeCTA: parsedLines.slice(0, splitIndex).join("\n"),
    afterCTA: parsedLines.slice(splitIndex).join("\n"),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, lang } = await params;
  const post = getBlogPost(slug, lang);
  const t = messages[lang];

  if (!post) {
    notFound();
  }

  const { beforeCTA, afterCTA } = parseMarkdown(post.content);
  const baseUrl = siteDetails.siteUrl.replace(/\/$/, "");

  return (
    <>
      <BlogPostJsonLd
        title={post.title}
        description={post.excerpt}
        url={`${baseUrl}/${lang}/blog/${post.slug}`}
        imageUrl={post.coverImage}
        datePublished={post.date}
        authorName={post.author}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${baseUrl}/${lang}` },
          { name: t.blog.title, url: `${baseUrl}/${lang}/blog` },
          { name: post.title, url: `${baseUrl}/${lang}/blog/${post.slug}` },
        ]}
      />
      <div className="min-h-screen px-6 sm:px-8 lg:px-12 xl:px-20 py-12 pt-32">
        <div className="max-w-7xl mx-auto">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center text-primary hover:underline mb-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            {t.blog.backToBlog}
          </Link>

          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              <Card className="shadow-lg overflow-hidden">
                {post.coverImage && (
                  <div className="relative w-full h-64 sm:h-80 md:h-96">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>{post.date}</span>
                    <span>-</span>
                    <span>{post.readTime}</span>
                    <span>-</span>
                    <span>{t.blog.by} {post.author}</span>
                  </div>
                  <CardTitle className="text-3xl md:text-4xl font-bold text-foreground">
                    {post.title}
                  </CardTitle>
                  {post.tags && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardHeader>

                <Separator />

                <CardContent className="pt-8">
                  <article className="prose prose-lg max-w-none">
                    {/* First part of content */}
                    <div dangerouslySetInnerHTML={{ __html: beforeCTA }} />

                    {/* Inline CTA */}
                    <BlogInlineCTA />

                    {/* Rest of content */}
                    <div dangerouslySetInnerHTML={{ __html: afterCTA }} />
                  </article>
                </CardContent>
              </Card>

              <div className="mt-12 text-center">
                <Link
                  href={`/${lang}/blog`}
                  className="text-primary hover:underline font-medium"
                >
                  {t.blog.readMoreArticles}
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <BlogSidebar />
          </div>
        </div>
      </div>
    </>
  );
}

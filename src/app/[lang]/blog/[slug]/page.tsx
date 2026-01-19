import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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

  // Always use dynamic OG API for optimized images (1200x630, <600KB, with branding)
  const ogImageUrl = `${baseUrl}/api/og?&blog=true&slug=${post.slug}&lang=${lang}`;

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

function parseSection(content: string): string {
  const lines = content.split("\n");
  const parsedLines: string[] = [];

  for (const line of lines) {
    // Headers
    if (line.startsWith("### ")) {
      parsedLines.push(`<h3 class="text-xl font-semibold text-foreground mt-6 mb-3">${line.slice(4)}</h3>`);
    } else if (line.startsWith("## ")) {
      parsedLines.push(`<h2 class="text-2xl font-semibold text-foreground mb-4">${line.slice(3)}</h2>`);
    } else {
      // Bold text and italic text
      let processed = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      processed = processed.replace(/\*(.*?)\*/g, "<em>$1</em>");
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

  return parsedLines.join("\n");
}

function parseMarkdown(content: string): { sections: string[]; ctaInsertIndex: number } {
  // Split content by "---" separator
  const rawSections = content.split(/\n---\n/).map(s => s.trim()).filter(s => s.length > 0);

  // Parse each section
  const sections = rawSections.map(section => parseSection(section));

  // Find best position for CTA (around 40-60% of sections)
  const ctaInsertIndex = Math.max(1, Math.floor(sections.length * 0.5));

  return {
    sections,
    ctaInsertIndex,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, lang } = await params;
  const post = getBlogPost(slug, lang);
  const t = messages[lang];

  if (!post) {
    notFound();
  }

  const { sections, ctaInsertIndex } = parseMarkdown(post.content);
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
              {/* Header Card */}
              <Card className="shadow-lg overflow-hidden mb-6">
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
              </Card>

              {/* Content Sections as Cards */}
              <article className="space-y-6">
                {sections.map((section, index) => (
                  <div key={index}>
                    <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
                      <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: section }}
                      />
                    </div>
                    {/* Insert CTA after the designated section */}
                    {index === ctaInsertIndex - 1 && (
                      <div className="my-6">
                        <BlogInlineCTA />
                      </div>
                    )}
                  </div>
                ))}
              </article>

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

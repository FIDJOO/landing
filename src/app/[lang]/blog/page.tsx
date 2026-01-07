import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getBlogPosts } from "@/data/blog";
import { siteDetails } from "@/data/siteDetails";
import { Locale, locales } from "@/i18n/config";
import { BlogListJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

import enMessages from "../../../../messages/en.json";
import frMessages from "../../../../messages/fr.json";

const messages = {
  en: enMessages,
  fr: frMessages,
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = messages[lang];

  return {
    title: `${t.blog.title} | ${siteDetails.siteName}`,
    description: t.blog.pageDescription,
    alternates: {
      canonical: `/${lang}/blog`,
      languages: {
        en: "/en/blog",
        fr: "/fr/blog",
        "x-default": "/en/blog",
      },
    },
    openGraph: {
      title: `${t.blog.title} | ${siteDetails.siteName}`,
      description: t.blog.pageDescription,
      url: `${siteDetails.siteUrl}${lang}/blog`,
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const t = messages[lang];
  const posts = getBlogPosts(lang);
  const baseUrl = siteDetails.siteUrl.replace(/\/$/, "");

  const blogListPosts = posts.map((post) => ({
    title: post.title,
    url: `${baseUrl}/${lang}/blog/${post.slug}`,
    datePublished: post.date,
    imageUrl: post.coverImage,
  }));

  return (
    <>
      <BlogListJsonLd posts={blogListPosts} locale={lang} />
      <BreadcrumbJsonLd
        items={[
          { name: lang === "fr" ? "Accueil" : "Home", url: `${baseUrl}/${lang}` },
          { name: t.blog.title, url: `${baseUrl}/${lang}/blog` },
        ]}
      />
      <div className="min-h-screen px-6 sm:px-12 lg:px-24 xl:px-40 py-12 pt-32">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.blog.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.blog.pageDescription}
          </p>
        </header>

        <div className="grid gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/${lang}/blog/${post.slug}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                {post.coverImage && (
                  <div className="relative w-full h-48 sm:h-56">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <span>{post.date}</span>
                    <span>-</span>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 mt-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {post.tags && (
                    <div className="flex flex-wrap gap-2">
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
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

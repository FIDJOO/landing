import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { blogPosts, getBlogPost } from "@/data/blog";
import { siteDetails } from "@/data/siteDetails";
import { BlogPostJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: `Post Not Found | ${siteDetails.siteName}`,
    };
  }

  const baseUrl = siteDetails.siteUrl.replace(/\/$/, '');

  return {
    title: `${post.title} | ${siteDetails.siteName}`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${baseUrl}/blog/${post.slug}`,
      siteName: siteDetails.siteName,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.coverImage ? [
        {
          url: `/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.excerpt)}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [`/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.excerpt)}`],
    },
  };
}

function parseMarkdown(content: string): string {
  return content
    .split("\n")
    .map((line) => {
      // Headers
      if (line.startsWith("### ")) {
        return `<h3 class="text-xl font-semibold text-foreground mt-8 mb-4">${line.slice(4)}</h3>`;
      }
      if (line.startsWith("## ")) {
        return `<h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">${line.slice(3)}</h2>`;
      }
      // Bold text
      const processed = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      // Unordered list items
      if (processed.startsWith("- ")) {
        return `<li class="ml-6 text-gray-700">${processed.slice(2)}</li>`;
      }
      // Ordered list items
      const orderedMatch = processed.match(/^(\d+)\.\s(.*)$/);
      if (orderedMatch) {
        return `<li class="ml-6 text-gray-700">${orderedMatch[2]}</li>`;
      }
      // Empty lines become paragraph breaks
      if (processed.trim() === "") {
        return "";
      }
      // Regular paragraphs
      return `<p class="text-gray-700 leading-relaxed mb-4">${processed}</p>`;
    })
    .join("\n");
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = parseMarkdown(post.content);
  const baseUrl = siteDetails.siteUrl.replace(/\/$/, '');

  return (
    <>
      <BlogPostJsonLd
        title={post.title}
        description={post.excerpt}
        url={`${baseUrl}/blog/${post.slug}`}
        imageUrl={post.coverImage}
        datePublished={post.date}
        authorName={post.author}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: baseUrl },
          { name: 'Blog', url: `${baseUrl}/blog` },
          { name: post.title, url: `${baseUrl}/blog/${post.slug}` },
        ]}
      />
      <div className="min-h-screen px-6 sm:px-12 lg:px-24 xl:px-40 py-12 pt-32">
        <div className="max-w-3xl mx-auto">
          <Link
          href="/blog"
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
          Back to Blog
        </Link>

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
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>By {post.author}</span>
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
            <article
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="text-primary hover:underline font-medium"
          >
            Read more articles
          </Link>
        </div>
        </div>
      </div>
    </>
  );
}

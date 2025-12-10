import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { blogPosts } from "@/data/blog";
import { siteDetails } from "@/data/siteDetails";

export const metadata: Metadata = {
  title: `Blog | ${siteDetails.siteName}`,
  description: "Articles about creative storytelling, meaningful screen time, and raising imaginative children.",
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen px-6 sm:px-12 lg:px-24 xl:px-40 py-12 pt-32">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tips, insights, and stories about creative play, meaningful screen time, and nurturing your child&apos;s imagination.
          </p>
        </header>

        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
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
                    <span>•</span>
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
  );
}

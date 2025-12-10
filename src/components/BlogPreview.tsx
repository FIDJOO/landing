import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { blogPosts } from "@/data/blog";

const BlogPreview: React.FC = () => {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {latestPosts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <CardTitle className="text-lg font-bold text-foreground hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 mt-2 line-clamp-3">
                {post.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {post.tags && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
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
  );
};

export default BlogPreview;

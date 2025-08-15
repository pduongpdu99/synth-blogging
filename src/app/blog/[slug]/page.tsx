"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Music,
  Code,
  Heart,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { getPostBySlug, getAllPosts, BlogPost } from "@/lib/posts";
import { type Language, detectLanguage, getTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Get related posts
const getRelatedPosts = async (
  currentSlug: string,
  currentCategory: string
) => {
  const allPosts = await getAllPosts();
  return allPosts
    .filter(
      (post) => post.slug !== currentSlug && post.category === currentCategory
    )
    .slice(0, 2);
};

const getPlaceholderImage = (category: string) => {
  const placeholders = {
    "Computer Science": "/music-code-visualization.png",
    "Music Technology": "/ai-music-network.png",
    "AI & Music": "/ai-music-network.png",
    "Guitar Theory": "/guitar-effects-dsp.png",
    Programming: "/functional-programming-music.png",
    "Audio Engineering": "/guitar-effects-dsp.png",
  };
  return (
    placeholders[category as keyof typeof placeholders] ||
    "/blog-featured-image.png"
  );
};

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const unwrappedParams = React.use(params);
  const [language, setLanguage] = useState<Language>("en");
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    getPostBySlug(unwrappedParams.slug).then((e) => setPost(e));
  }, []);

  useEffect(() => {
    setLanguage(detectLanguage());
  }, []);

  useEffect(() => {
    if (post) {
      getRelatedPosts(post.slug, post.category).then((e) => {
        setRelatedPosts(e);
      });
    }
  }, [post]);

  const t = (key: keyof import("@/lib/i18n").Translations) =>
    getTranslation(language, key);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
          <p className="text-muted-foreground mb-8">{t("postNotFound")}</p>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("backToHome")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Music className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Synth</h1>
                <p className="text-xs text-muted-foreground">{t("tagline")}</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                {t("share")}
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
              <LanguageSwitcher currentLanguage={language} />
            </div>
          </div>
        </div>
      </header>

      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("backToBlog")}
          </Button>
        </Link>
      </div>

      {/* Article */}
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-8">
            <img
              src={post.featuredImage || getPlaceholderImage(post.category)}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <Badge variant="secondary">{post.category}</Badge>
            <Badge variant="outline" className="text-xs">
              {post.language === "vi" ? "🇻🇳 Tiếng Việt" : "🇺🇸 English"}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground space-x-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.date).toLocaleDateString(
                  post.language === "vi" ? "vi-VN" : "en-US"
                )}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime}
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <Separator />
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-16">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-16 mb-8 font-sans leading-tight">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6 font-sans leading-tight">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mt-10 mb-5 font-sans leading-tight">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-6 leading-[1.8] text-foreground">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em className="italic text-foreground/90">{children}</em>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-3 my-6 pl-4">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-3 my-6 pl-4">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="ml-4 mb-2 text-foreground">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-foreground/80 bg-muted/30 py-4 rounded-r-lg">
                  {children}
                </blockquote>
              ),
              code: ({ inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg my-8 text-sm"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className="bg-muted/70 px-2 py-1 rounded text-sm font-mono border"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              img: ({ src, alt }) => (
                <img
                  src={src || "/placeholder.svg"}
                  alt={alt}
                  className="w-full max-w-2xl mx-auto rounded-lg shadow-md my-8 block"
                />
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              hr: () => <hr className="border-border my-12" />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Author Info */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <div className="flex items-center space-x-1">
                  <Music className="w-6 h-6 text-primary-foreground" />
                  <Code className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {post.author}
                </h3>
                <p className="text-muted-foreground">
                  {post.language === "vi"
                    ? "Khám phá giao điểm giữa khoa học máy tính và nghệ thuật guitar. Nơi nhịp điệu gặp gỡ logic."
                    : "Exploring the intersection of computer science and guitar artistry. Where rhythm meets logic."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              {t("relatedPosts")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.slug}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <img
                        src={
                          relatedPost.featuredImage ||
                          getPlaceholderImage(relatedPost.category)
                        }
                        alt={relatedPost.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline">{relatedPost.category}</Badge>
                      <Badge variant="outline" className="text-xs">
                        {relatedPost.language === "vi" ? "🇻🇳" : "🇺🇸"}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <Button
                        variant="ghost"
                        className="p-0 h-auto text-primary"
                      >
                        {relatedPost.language === "vi"
                          ? "Đọc thêm"
                          : "Read more"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4 mt-16">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Music className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Synth</span>
          </div>
          <p className="text-muted-foreground mb-4">{t("footerDescription")}</p>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("backToHome")}
            </Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}

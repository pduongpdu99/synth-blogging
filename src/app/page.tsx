"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music, Code, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlogPost, getPostsByLanguage } from "@/lib/posts";
import { type Language, detectLanguage, getTranslation } from "@/lib/i18n";

export default function RootLayout({}) {
  const [language, setLanguage] = useState<Language>("en");
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setLanguage(detectLanguage());
    getPostsByLanguage(language).then((res) => {
      setPosts(res);
    });
  }, []);

  const allPosts: BlogPost[] = posts;
  const [showAllLanguages, setShowAllLanguages] = useState(true);
  const filteredPosts = showAllLanguages
    ? allPosts.slice(0, 6)
    : posts.slice(0, 6);

  const t = (key: keyof import("@/lib/i18n").Translations) =>
    getTranslation(language, key);

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
      "/blog-post-cover.png"
    );
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
              <Music className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">
                Computer Science × Guitar
              </span>
              <Code className="w-5 h-5 text-primary" />
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {language === "vi" ? (
              <>
                Nơi <span className="text-primary">Nhịp Điệu</span> Gặp Gỡ{" "}
                <span className="text-primary">Logic</span>
              </>
            ) : (
              <>
                Where <span className="text-primary">Rhythm</span> Meets{" "}
                <span className="text-primary">Logic</span>
              </>
            )}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Button size="lg" className="text-lg px-8">
              {t("readLatestPosts")}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button> */}
            <Link href={"/about"}>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-transparent"
              >
                {t("aboutSynth")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-2">
                {t("latestPosts")}
              </h3>
              <p className="text-muted-foreground">
                {t("latestPostsSubtitle")}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
              >
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={
                      post.featuredImage || getPlaceholderImage(post.category)
                    }
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {post.language === "vi" ? "🇻🇳" : "🇺🇸"}
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(post.date).toLocaleDateString(
                        post.language === "vi" ? "vi-VN" : "en-US"
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {post.readTime}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <Button
                      variant="ghost"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      {t("readMore")}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

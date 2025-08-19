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
import { Music, Code, Calendar, ArrowRight, Filter } from "lucide-react";
import Link from "next/link";
import { BlogPost, getPostsByLanguage } from "@/lib/posts";
import { type Language, detectLanguage, getTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("en");
  const [showAllLanguages, setShowAllLanguages] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setLanguage(detectLanguage());
    getPostsByLanguage(language).then((res) => {
      setPosts(res);
    });
  }, []);

  const allPosts: BlogPost[] = posts;
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Music className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Synth</h1>
                  <p className="text-sm text-muted-foreground">
                    {t("tagline")}
                  </p>
                </div>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="#"
                className="text-foreground hover:text-primary transition-colors"
              >
                {t("blog")}
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-primary transition-colors"
              >
                {t("about")}
              </Link>
              <Link
                href="#"
                className="text-foreground hover:text-primary transition-colors"
              >
                {t("projects")}
              </Link>
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <Code className="w-4 h-4 mr-2" />
                  {t("admin")}
                </Button>
              </Link>
              <LanguageSwitcher currentLanguage={language} />
            </nav>
          </div>
        </div>
      </header>

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
                <span className="text-accent">Logic</span>
              </>
            ) : (
              <>
                Where <span className="text-primary">Rhythm</span> Meets{" "}
                <span className="text-accent">Logic</span>
              </>
            )}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              {t("readLatestPosts")}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 bg-transparent"
            >
              {t("aboutSynth")}
            </Button>
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

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Music className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Synth</span>
              </div>
              <p className="text-muted-foreground mb-4">
                {t("footerDescription")}
              </p>
              <p className="text-sm text-muted-foreground">
                © 2025 Synth Blog. Made with ❤️ and code.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                {t("categories")}
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    {t("computerScience")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    {t("musicTech")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    {t("aiMusic")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    {t("guitarTheory")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                {t("connect")}
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    Email
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

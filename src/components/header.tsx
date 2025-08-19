"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Language, detectLanguage, getTranslation } from "@/lib/i18n";
import { useState, useEffect } from "react";

export default function Header() {
  const [language, setLanguage] = useState<Language>("en");
  const t = (key: keyof import("@/lib/i18n").Translations) =>
    getTranslation(language, key);
  useEffect(() => {
    setLanguage(detectLanguage());
  }, []);

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + tagline */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="rounded-lg flex items-center justify-center">
                <img
                  src="/favicon.svg"
                  alt="Synth Logo"
                  className="w-8 h-8 rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Synth</h1>
                <p className="text-sm text-muted-foreground">{t("tagline")}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
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
  );
}

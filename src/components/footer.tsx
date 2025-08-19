// components/Footer.tsx
"use client";

import { detectLanguage, getTranslation, Language } from "@/lib/i18n";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const [language, setLanguage] = useState<Language>("en");
  useEffect(() => {
    setLanguage(detectLanguage());
  }, []);

  const t = (key: keyof import("@/lib/i18n").Translations) =>
    getTranslation(language, key);
  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo + description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="rounded-lg flex items-center justify-center">
                <img
                  src="/favicon.svg"
                  alt="Synth Logo"
                  className="w-8 h-8 rounded-lg"
                />
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

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {t("categories")}
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  {t("computerScience")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  {t("musicTech")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  {t("aiMusic")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  {t("guitarTheory")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {t("connect")}
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Email
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

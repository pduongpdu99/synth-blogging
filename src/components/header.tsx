"use client";

import { BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "./language-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const { t } = useLanguage();
  const router = useRouter();
  const [isShow, setIsShow] = useState(false);

  const navTo = () => {
    router.push("/login");
  };

  useEffect(() => {
    fetch("/api/check-login", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      setIsShow(!(await res.json()).success);
    });
  }, [isShow]);

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-800 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="font-serif font-semibold text-slate-800 text-lg">
              English Classroom
              <br />
              <span className="text-base">Simulator</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              {t("nav.home")}
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              {t("nav.simulation")}
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              {t("nav.resources")}
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              {t("nav.tutorial")}
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              {t("nav.community")}
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              {t("nav.contact")}
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <LanguageToggle />
            {isShow && (
              <Button
                onClick={navTo}
                variant="outline"
                className="hidden sm:inline-flex bg-transparent"
              >
                {t("nav.login")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

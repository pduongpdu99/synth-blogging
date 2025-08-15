"use client"

import { BookOpen, Mail, Facebook, Twitter, Youtube } from "lucide-react"
import { useLanguage } from "./language-provider"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-slate-800" />
              </div>
              <div className="font-serif font-semibold text-lg">
                English Classroom
                <br />
                <span className="text-base">Simulator</span>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed">{t("hero.description")}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block text-slate-300 hover:text-white transition-colors">
                {t("nav.simulation")}
              </a>
              <a href="#" className="block text-slate-300 hover:text-white transition-colors">
                {t("nav.resources")}
              </a>
              <a href="#" className="block text-slate-300 hover:text-white transition-colors">
                {t("nav.tutorial")}
              </a>
              <a href="#" className="block text-slate-300 hover:text-white transition-colors">
                {t("nav.community")}
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Connect With Us</h3>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="h-4 w-4" />
              <span>{t("footer.contact")}</span>
            </div>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 text-slate-300 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-slate-300 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-slate-300 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}

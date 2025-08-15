"use client"

import { useLanguage } from "./language-provider"
import { Button } from "./ui/button"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "vi" : "en")}
      className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{language === "en" ? "EN" : "VI"}</span>
    </Button>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { type Language, detectLanguage, setLanguage, getTranslation } from "@/lib/i18n"

interface LanguageSwitcherProps {
  onLanguageChange?: (language: Language) => void
  currentLanguage?: Language
}

export function LanguageSwitcher({ onLanguageChange, currentLanguage }: LanguageSwitcherProps) {
  const [language, setCurrentLanguage] = useState<Language>("en")

  useEffect(() => {
    const detected = currentLanguage || detectLanguage()
    setCurrentLanguage(detected)
  }, [currentLanguage])

  const handleLanguageChange = (newLanguage: Language) => {
    setCurrentLanguage(newLanguage)
    setLanguage(newLanguage)
    onLanguageChange?.(newLanguage)

    // Reload page to apply language changes
    window.location.reload()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">{language === "vi" ? "VI" : "EN"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange("en")} className={language === "en" ? "bg-accent" : ""}>
          <span className="mr-2">🇺🇸</span>
          {getTranslation("en", "english")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("vi")} className={language === "vi" ? "bg-accent" : ""}>
          <span className="mr-2">🇻🇳</span>
          {getTranslation("vi", "vietnamese")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

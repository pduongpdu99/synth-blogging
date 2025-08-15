"use client"

import { Button } from "./ui/button"
import { Play } from "lucide-react"
import { useLanguage } from "./language-provider"
import Image from "next/image"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="hero-gradient py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="font-serif font-bold text-4xl lg:text-5xl xl:text-6xl text-slate-800 leading-tight">
              {t("hero.title")}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">{t("hero.description")}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 text-lg font-semibold">
                {t("hero.startButton")}
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="text-slate-600 hover:text-slate-800 px-8 py-3 text-lg font-medium flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                {t("hero.watchDemo")}
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/classroom-scene.png"
                alt="3D Classroom Simulation"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

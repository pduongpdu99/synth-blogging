"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, Code, Heart, Play, Pause, Volume2, Quote } from "lucide-react"
import Link from "next/link"
import { type Language, detectLanguage, getTranslation } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function AboutPage() {
  const [language, setLanguage] = useState<Language>("en")
  const [currentTrack, setCurrentTrack] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    setLanguage(detectLanguage())
  }, [])

  const t = (key: keyof import("@/lib/i18n").Translations) => getTranslation(language, key)

  const quotes = [
    {
      text:
        language === "vi"
          ? "Code như nhạc, cần có nhịp điệu và cảm xúc để tạo nên tác phẩm hoàn hảo."
          : "Code is like music - it needs rhythm and emotion to create something beautiful.",
      author: "Synth",
    },
    {
      text:
        language === "vi"
          ? "Mỗi dòng code là một nốt nhạc, mỗi function là một giai điệu."
          : "Every line of code is a musical note, every function is a melody.",
      author: "Personal Philosophy",
    },
    {
      text:
        language === "vi"
          ? "Trong âm nhạc tôi tìm thấy logic, trong lập trình tôi tìm thấy nghệ thuật."
          : "In music I find logic, in programming I find art.",
      author: "Daily Inspiration",
    },
  ]

  const interests = [
    {
      title: language === "vi" ? "Thể Thao" : "Sports",
      description:
        language === "vi"
          ? "Đam mê bóng đá, tennis và chạy bộ. Thể thao giúp tôi duy trì sự cân bằng giữa tư duy logic và thể chất."
          : "Passionate about football, tennis, and running. Sports help me maintain balance between logical thinking and physical wellness.",
      icon: "⚽",
    },
    {
      title: language === "vi" ? "Hoạt Động Tình Nguyện" : "Volunteer Work",
      description:
        language === "vi"
          ? "Tham gia dạy lập trình miễn phí cho trẻ em và hỗ trợ cộng đồng open source."
          : "Teaching free programming classes to children and contributing to open source communities.",
      icon: "🤝",
    },
  ]

  const favoriteFilms = [
    {
      title: "The Social Network",
      description:
        language === "vi"
          ? "Câu chuyện về sự ra đời của Facebook và văn hóa startup Silicon Valley."
          : "The story of Facebook's creation and Silicon Valley startup culture.",
      image: "/social-network-poster.png",
    },
    {
      title: "Whiplash",
      description:
        language === "vi"
          ? "Bộ phim về đam mê âm nhạc và sự hoàn hảo trong nghệ thuật."
          : "A film about musical passion and the pursuit of perfection in art.",
      image: "/whiplash-drums.png",
    },
    {
      title: "Her",
      description:
        language === "vi"
          ? "Khám phá mối quan hệ giữa con người và trí tuệ nhân tạo."
          : "Exploring the relationship between humans and artificial intelligence.",
      image: "/ai-movie-poster.png",
    },
  ]

  const favoriteTracks = [
    {
      title: "Bohemian Rhapsody",
      artist: "Queen",
      duration: "5:55",
      src: "/placeholder-audio.mp3", // Placeholder audio file
    },
    {
      title: "Stairway to Heaven",
      artist: "Led Zeppelin",
      duration: "8:02",
      src: "/placeholder-audio.mp3",
    },
    {
      title: "Hotel California",
      artist: "Eagles",
      duration: "6:30",
      src: "/placeholder-audio.mp3",
    },
  ]

  const playTrack = (index: number) => {
    if (currentTrack === index && isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    } else {
      if (audioRef.current) {
        audioRef.current.src = favoriteTracks[index].src
        audioRef.current.play()
        setCurrentTrack(index)
        setIsPlaying(true)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Music className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Synth</h1>
                  <p className="text-sm text-muted-foreground">{t("tagline")}</p>
                </div>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                {t("blog")}
              </Link>
              <a href="#" className="text-primary font-medium">
                {t("about")}
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                {t("projects")}
              </a>
              <LanguageSwitcher currentLanguage={language} />
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-4 border-primary/20">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <Music className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {language === "vi" ? "Xin chào, tôi là Synth" : "Hello, I'm Synth"}
          </h1>
          <p className="text-xl text-primary font-medium mb-6">
            {language === "vi" ? "Nơi nhịp điệu gặp gỡ logic" : "Where rhythm meets logic"}
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "vi"
              ? "Tôi là một lập trình viên đam mê âm nhạc, đặc biệt là guitar. Tôi tin rằng code và nhạc có nhiều điểm chung - cả hai đều cần sự chính xác, sáng tạo và cảm xúc để tạo nên những tác phẩm tuyệt vời."
              : "I'm a programmer passionate about music, especially guitar. I believe code and music share many similarities - both require precision, creativity, and emotion to create something beautiful."}
          </p>
        </section>

        {/* Quotes Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {language === "vi" ? "Những Câu Nói Tâm Đắc" : "Favorite Quotes"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quotes.map((quote, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <p className="text-foreground italic mb-4">"{quote.text}"</p>
                  <p className="text-sm text-muted-foreground">— {quote.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Interests Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {language === "vi" ? "Sở Thích & Hoạt Động" : "Interests & Activities"}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {interests.map((interest, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{interest.icon}</span>
                    <CardTitle className="text-xl">{interest.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{interest.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Favorite Films Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {language === "vi" ? "Phim Yêu Thích" : "Favorite Films"}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {favoriteFilms.map((film, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={film.image || "/placeholder.svg"}
                    alt={film.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{film.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{film.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Favorite Music Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {language === "vi" ? "Nhạc Yêu Thích" : "Favorite Music"}
          </h2>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Volume2 className="w-5 h-5" />
                <span>{language === "vi" ? "Playlist Cá Nhân" : "Personal Playlist"}</span>
              </CardTitle>
              <CardDescription>
                {language === "vi" ? "Những bài hát truyền cảm hứng cho tôi" : "Songs that inspire me"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {favoriteTracks.map((track, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => playTrack(index)}
                        className="w-10 h-10 rounded-full"
                      >
                        {currentTrack === index && isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      <div>
                        <p className="font-medium text-foreground">{track.title}</p>
                        <p className="text-sm text-muted-foreground">{track.artist}</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{track.duration}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">{language === "vi" ? "Kết Nối Với Tôi" : "Let's Connect"}</CardTitle>
              <CardDescription>
                {language === "vi"
                  ? "Luôn sẵn sàng thảo luận về code, nhạc, hoặc bất cứ điều gì thú vị!"
                  : "Always ready to discuss code, music, or anything interesting!"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline">
                  <Code className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button variant="outline">
                  <Music className="w-4 h-4 mr-2" />
                  SoundCloud
                </Button>
                <Button variant="outline">
                  <Heart className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Hidden audio element for music playback */}
      <audio
        ref={audioRef}
        onEnded={() => {
          setIsPlaying(false)
          setCurrentTrack(null)
        }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
    </div>
  )
}

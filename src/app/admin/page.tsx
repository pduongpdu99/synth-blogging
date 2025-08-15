"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Music, Save, Eye, Plus, X, ArrowLeft, FileText, Settings, Lock, LogOut } from "lucide-react"
import Link from "next/link"
import { type Language, detectLanguage, getTranslation } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"

interface BlogPost {
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  language: "en" | "vi"
  readTime: string
  date: string
  slug: string
  featuredImage?: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [language, setLanguage] = useState<Language>("en")
  const [post, setPost] = useState<BlogPost>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [],
    language: "en",
    readTime: "",
    date: new Date().toISOString().split("T")[0],
    slug: "",
    featuredImage: "",
  })

  const [newTag, setNewTag] = useState("")
  const [previewMode, setPreviewMode] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    setLanguage(detectLanguage())
    // Check if already authenticated
    const authStatus = localStorage.getItem("admin_authenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const t = (key: keyof import("@/lib/i18n").Translations) => getTranslation(language, key)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple authentication - in production, use proper auth
    if (loginForm.email === "admin@gmail.com" && loginForm.password === "Aa123456@") {
      setIsAuthenticated(true)
      localStorage.setItem("admin_authenticated", "true")
    } else {
      alert("Invalid credentials. Use admin/synth2024")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("admin_authenticated")
    setLoginForm({ email: "", password: "" })
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <Music className="w-6 h-6 text-primary-foreground" />
            </div>
            <CardTitle className="flex items-center justify-center">
              <Lock className="w-5 h-5 mr-2" />
              Admin Login
            </CardTitle>
            <CardDescription>Enter your credentials to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <Lock className="w-4 h-4 mr-2" />
                Login to Admin Panel
              </Button>
              <p className="text-xs text-muted-foreground text-center">Demo credentials: admin / synth2024</p>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  const categories = [
    t("computerScience"),
    t("musicTech"),
    t("aiMusic"),
    t("guitarTheory"),
    t("programming"),
    t("audioEngineering"),
  ]

  const handleAddTag = () => {
    if (newTag.trim() && !post.tags.includes(newTag.trim())) {
      setPost((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setPost((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }))
  }

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return post.language === "vi" ? `${minutes} phút đọc` : `${minutes} min read`
  }

  const handleSave = async () => {
    const updatedPost = {
      ...post,
      readTime: estimateReadTime(post.content),
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      })

      if (response.ok) {
        const savedPost = await response.json()
        alert(t("postSaved"))
        console.log("Post saved:", savedPost)
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error("Error saving post:", error)
      alert(t("errorSaving"))
    }
  }

  const handleImageUpload = async (file: File, type: "featured" | "content") => {
    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", type)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const { url } = await response.json()

        if (type === "featured") {
          setPost((prev) => ({ ...prev, featuredImage: url }))
        } else {
          // Insert image markdown at cursor position
          const imageMarkdown = `![${file.name}](${url})`
          setPost((prev) => ({
            ...prev,
            content: prev.content + "\n" + imageMarkdown,
          }))
        }
      } else {
        alert("Error uploading image")
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Error uploading image")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, type: "featured" | "content") => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find((file) => file.type.startsWith("image/"))

    if (imageFile) {
      handleImageUpload(imageFile, type)
    }
  }

  const renderPreview = () => {
    return (
      <div className="prose prose-lg max-w-none">
        <div className="mb-8">
          <div className="mb-6">
            <img
              src={post.featuredImage || "/placeholder.svg?height=400&width=800&query=blog post featured image"}
              alt={post.title || "Blog post featured image"}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            <span className="text-sm text-muted-foreground">{post.date}</span>
            <span className="text-sm text-muted-foreground">{estimateReadTime(post.content)}</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">{post.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          <Separator />
        </div>

        <div
          className="text-foreground leading-relaxed font-serif"
          dangerouslySetInnerHTML={{
            __html: post.content
              .replace(/\n/g, "<br>")
              .replace(
                /!\[([^\]]*)\]$$([^)]+)$$/g,
                '<img src="$2" alt="$1" class="w-full max-w-2xl mx-auto rounded-lg my-6" />',
              )
              .replace(/#{3}\s(.+)/g, '<h3 class="text-2xl font-bold text-foreground mt-8 mb-4">$1</h3>')
              .replace(/#{2}\s(.+)/g, '<h2 class="text-3xl font-bold text-foreground mt-12 mb-6">$1</h2>')
              .replace(/#{1}\s(.+)/g, '<h1 class="text-4xl font-bold text-foreground mt-16 mb-8">$1</h1>')
              .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
              .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
              .replace(
                /```(\w+)?\n([\s\S]*?)```/g,
                '<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-6"><code class="text-sm">$2</code></pre>',
              )
              .replace(/`(.+?)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm">$1</code>'),
          }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Music className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Synth {t("admin")}</h1>
                <p className="text-xs text-muted-foreground">{t("contentManagement")}</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Button
                variant={previewMode ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? t("edit") : t("preview")}
              </Button>
              <Button onClick={handleSave} size="sm">
                <Save className="w-4 h-4 mr-2" />
                {t("savePost")}
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <LanguageSwitcher currentLanguage={language} />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("backToBlog")}
            </Button>
          </Link>
        </div>

        {previewMode ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                {t("previewMode")}
              </CardTitle>
              <CardDescription>{t("previewDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="p-8">{renderPreview()}</CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    {t("writeNewPost")}
                  </CardTitle>
                  <CardDescription>{t("writeNewPostDescription")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Featured Image */}
                  <div className="space-y-2">
                    <Label htmlFor="featured-image">Featured Image</Label>
                    <div
                      className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, "featured")}
                    >
                      <div className="space-y-4">
                        <img
                          src={
                            post.featuredImage ||
                            "/placeholder.svg?height=300&width=600&query=blog featured image placeholder"
                          }
                          alt="Featured"
                          className="w-full h-48 object-cover rounded-lg mx-auto"
                        />
                        <div className="flex justify-center space-x-2">
                          {post.featuredImage && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setPost((prev) => ({ ...prev, featuredImage: "" }))}
                            >
                              Remove
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById("featured-upload")?.click()}
                            disabled={uploadingImage}
                          >
                            {uploadingImage ? "Uploading..." : post.featuredImage ? "Change" : "Upload Image"}
                          </Button>
                        </div>
                        {!post.featuredImage && (
                          <div className="text-muted-foreground">
                            <p>Drag and drop an image here, or click to select</p>
                            <p className="text-sm">Supports JPG, PNG, WebP</p>
                          </div>
                        )}
                      </div>
                      <input
                        id="featured-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleImageUpload(file, "featured")
                        }}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">{t("title")}</Label>
                    <Input
                      id="title"
                      placeholder={`${t("title")}...`}
                      value={post.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="text-lg"
                    />
                    {post.slug && (
                      <p className="text-sm text-muted-foreground">
                        Slug: <code className="bg-muted px-2 py-1 rounded">{post.slug}</code>
                      </p>
                    )}
                  </div>

                  {/* Excerpt */}
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">{t("excerpt")}</Label>
                    <Textarea
                      id="excerpt"
                      placeholder={`${t("excerpt")}...`}
                      value={post.excerpt}
                      onChange={(e) => setPost((prev) => ({ ...prev, excerpt: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="content">{t("content")}</Label>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById("content-image-upload")?.click()}
                          disabled={uploadingImage}
                        >
                          {uploadingImage ? "Uploading..." : "Add Image"}
                        </Button>
                      </div>
                    </div>
                    <div className="relative" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, "content")}>
                      <Textarea
                        id="content"
                        placeholder={`${t("content")}... (Markdown supported)\n\nDrag and drop images here to add them to your content`}
                        value={post.content}
                        onChange={(e) => setPost((prev) => ({ ...prev, content: e.target.value }))}
                        rows={20}
                        className="font-mono text-sm"
                      />
                      <input
                        id="content-image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleImageUpload(file, "content")
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Supports Markdown: **bold**, *italic*, `code`, \`\`\`code blocks\`\`\`, # headers,
                      ![alt](image-url)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Post Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Post Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Language */}
                  <div className="space-y-2">
                    <Label>{t("language")}</Label>
                    <Select
                      value={post.language}
                      onValueChange={(value: "en" | "vi") => setPost((prev) => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">{t("english")}</SelectItem>
                        <SelectItem value="vi">{t("vietnamese")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label>{t("category")}</Label>
                    <Select
                      value={post.category}
                      onValueChange={(value) => setPost((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectCategory")} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <Label htmlFor="date">{t("publishDate")}</Label>
                    <Input
                      id="date"
                      type="date"
                      value={post.date}
                      onChange={(e) => setPost((prev) => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("tags")}</CardTitle>
                  <CardDescription>{t("tagsDescription")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder={t("addTag")}
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                    />
                    <Button onClick={handleAddTag} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-destructive">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Post Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("postStatistics")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t("wordCount")}:</span>
                    <span className="text-sm font-medium">
                      {post.content.split(/\s+/).filter((word) => word.length > 0).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t("estimatedReadTime")}:</span>
                    <span className="text-sm font-medium">{estimateReadTime(post.content)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{t("characters")}:</span>
                    <span className="text-sm font-medium">{post.content.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

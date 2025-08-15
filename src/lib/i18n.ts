export type Language = "en" | "vi"

export interface Translations {
  // Navigation
  blog: string
  about: string
  projects: string
  admin: string

  // Homepage
  tagline: string
  heroTitle: string
  heroSubtitle: string
  readLatestPosts: string
  aboutSynth: string
  latestPosts: string
  latestPostsSubtitle: string
  viewAllPosts: string
  readMore: string

  // Blog Post
  backToBlog: string
  backToHome: string
  share: string
  relatedPosts: string

  // Footer
  footerDescription: string
  categories: string
  connect: string

  // Admin
  contentManagement: string
  writeNewPost: string
  writeNewPostDescription: string
  title: string
  excerpt: string
  content: string
  language: string
  category: string
  publishDate: string
  tags: string
  tagsDescription: string
  addTag: string
  postStatistics: string
  wordCount: string
  estimatedReadTime: string
  characters: string
  previewMode: string
  previewDescription: string
  savePost: string
  edit: string
  preview: string

  // Categories
  computerScience: string
  musicTech: string
  aiMusic: string
  guitarTheory: string
  programming: string
  audioEngineering: string

  // Common
  english: string
  vietnamese: string
  selectCategory: string
  postSaved: string
  errorSaving: string
  postNotFound: string

  // Time
  minRead: string
  minutesRead: string
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    blog: "Blog",
    about: "About",
    projects: "Projects",
    admin: "Admin",

    // Homepage
    tagline: "where rhythm meets logic",
    heroTitle: "Where Rhythm Meets Logic",
    heroSubtitle:
      "Exploring the beautiful intersection of programming and music. From algorithmic composition to digital signal processing, discover how code can create harmony.",
    readLatestPosts: "Read Latest Posts",
    aboutSynth: "About Synth",
    latestPosts: "Latest Posts",
    latestPostsSubtitle: "Thoughts on code, music, and everything in between",
    viewAllPosts: "View All Posts",
    readMore: "Read More",

    // Blog Post
    backToBlog: "Back to Blog",
    backToHome: "Back to Home",
    share: "Share",
    relatedPosts: "Related Posts",

    // Footer
    footerDescription: "Bridging the gap between computer science and music, one post at a time.",
    categories: "Categories",
    connect: "Connect",

    // Admin
    contentManagement: "content management",
    writeNewPost: "Write New Post",
    writeNewPostDescription: "Create engaging content about computer science and music",
    title: "Title",
    excerpt: "Excerpt",
    content: "Content",
    language: "Language",
    category: "Category",
    publishDate: "Publish Date",
    tags: "Tags",
    tagsDescription: "Add relevant tags to help readers find your content",
    addTag: "Add a tag...",
    postStatistics: "Post Statistics",
    wordCount: "Word Count",
    estimatedReadTime: "Estimated Read Time",
    characters: "Characters",
    previewMode: "Preview Mode",
    previewDescription: "This is how your post will appear to readers",
    savePost: "Save Post",
    edit: "Edit",
    preview: "Preview",

    // Categories
    computerScience: "Computer Science",
    musicTech: "Music Tech",
    aiMusic: "AI & Music",
    guitarTheory: "Guitar Theory",
    programming: "Programming",
    audioEngineering: "Audio Engineering",

    // Common
    english: "English",
    vietnamese: "Tiếng Việt",
    selectCategory: "Select category",
    postSaved: "Post saved successfully!",
    errorSaving: "Error saving post!",
    postNotFound: "Blog post not found",

    // Time
    minRead: "min read",
    minutesRead: "minutes read",
  },
  vi: {
    // Navigation
    blog: "Blog",
    about: "Giới thiệu",
    projects: "Dự án",
    admin: "Quản trị",

    // Homepage
    tagline: "nơi nhịp điệu gặp gỡ logic",
    heroTitle: "Nơi Nhịp Điệu Gặp Gỡ Logic",
    heroSubtitle:
      "Khám phá giao điểm tuyệt đẹp giữa lập trình và âm nhạc. Từ sáng tác thuật toán đến xử lý tín hiệu số, khám phá cách code có thể tạo ra sự hài hòa.",
    readLatestPosts: "Đọc Bài Mới Nhất",
    aboutSynth: "Về Synth",
    latestPosts: "Bài Viết Mới Nhất",
    latestPostsSubtitle: "Suy nghĩ về code, âm nhạc và mọi thứ ở giữa",
    viewAllPosts: "Xem Tất Cả Bài Viết",
    readMore: "Đọc Thêm",

    // Blog Post
    backToBlog: "Quay Lại Blog",
    backToHome: "Về Trang Chủ",
    share: "Chia Sẻ",
    relatedPosts: "Bài Viết Liên Quan",

    // Footer
    footerDescription: "Kết nối khoa học máy tính và âm nhạc, từng bài viết một.",
    categories: "Danh Mục",
    connect: "Kết Nối",

    // Admin
    contentManagement: "quản lý nội dung",
    writeNewPost: "Viết Bài Mới",
    writeNewPostDescription: "Tạo nội dung hấp dẫn về khoa học máy tính và âm nhạc",
    title: "Tiêu Đề",
    excerpt: "Tóm Tắt",
    content: "Nội Dung",
    language: "Ngôn Ngữ",
    category: "Danh Mục",
    publishDate: "Ngày Xuất Bản",
    tags: "Thẻ",
    tagsDescription: "Thêm thẻ liên quan để giúp độc giả tìm thấy nội dung của bạn",
    addTag: "Thêm thẻ...",
    postStatistics: "Thống Kê Bài Viết",
    wordCount: "Số Từ",
    estimatedReadTime: "Thời Gian Đọc Ước Tính",
    characters: "Ký Tự",
    previewMode: "Chế Độ Xem Trước",
    previewDescription: "Đây là cách bài viết của bạn sẽ hiển thị cho độc giả",
    savePost: "Lưu Bài Viết",
    edit: "Chỉnh Sửa",
    preview: "Xem Trước",

    // Categories
    computerScience: "Khoa Học Máy Tính",
    musicTech: "Công Nghệ Âm Nhạc",
    aiMusic: "AI & Âm Nhạc",
    guitarTheory: "Lý Thuyết Guitar",
    programming: "Lập Trình",
    audioEngineering: "Kỹ Thuật Âm Thanh",

    // Common
    english: "English",
    vietnamese: "Tiếng Việt",
    selectCategory: "Chọn danh mục",
    postSaved: "Bài viết đã được lưu!",
    errorSaving: "Lỗi khi lưu bài viết!",
    postNotFound: "Không tìm thấy bài viết",

    // Time
    minRead: "phút đọc",
    minutesRead: "phút đọc",
  },
}

export function getTranslation(language: Language, key: keyof Translations): string {
  return translations[language][key] || translations.en[key]
}

export function detectLanguage(): Language {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("synth-blog-language") as Language
    if (stored && (stored === "en" || stored === "vi")) {
      return stored
    }

    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith("vi")) {
      return "vi"
    }
  }
  return "en"
}

export function setLanguage(language: Language) {
  if (typeof window !== "undefined") {
    localStorage.setItem("synth-blog-language", language)
  }
}

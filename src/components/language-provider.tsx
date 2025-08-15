"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "vi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.simulation": "Simulation",
    "nav.resources": "Resources",
    "nav.tutorial": "Tutorial",
    "nav.community": "Community",
    "nav.contact": "Contact",
    "nav.login": "Login",

    // Hero Section
    "hero.title": "English Classroom Simulator",
    "hero.description":
      "English Classroom Simulator is a tool to help English education students practice teaching skills and manage the classroom through a 3D/2D simulation environment.",
    "hero.startButton": "Start Simulation",
    "hero.watchDemo": "Watch Demo",

    // Features
    "feature.teaching.title": "Teaching Simulation",
    "feature.teaching.description": "Practice real classroom scenarios",
    "feature.interact.title": "Interact with Virtual Students",
    "feature.interact.description": "Engage with AI-powered student avatars",
    "feature.practice.title": "Practice handling classroom situations",
    "feature.practice.description": "Learn to manage various classroom challenges",
    "feature.assess.title": "Assess skills in real-time",
    "feature.assess.description": "Get immediate feedback on your teaching performance",

    // Auth Pages
    "auth.login.title": "Login to Your Account",
    "auth.login.subtitle": "Enter your credentials to access the simulator",
    "auth.register.title": "Create Your Account",
    "auth.register.subtitle": "Join thousands of educators improving their teaching skills",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.fullName": "Full Name",
    "auth.loginButton": "Login",
    "auth.registerButton": "Create Account",
    "auth.forgotPassword": "Forgot your password?",
    "auth.noAccount": "Don't have an account?",
    "auth.hasAccount": "Already have an account?",
    "auth.signUp": "Sign up",
    "auth.signIn": "Sign in",
    "auth.orContinueWith": "Or continue with",
    "auth.google": "Google",
    "auth.facebook": "Facebook",
    "auth.terms": "By creating an account, you agree to our Terms of Service and Privacy Policy",

    // Footer
    "footer.copyright": "© 2024 English Classroom Simulator. All rights reserved.",
    "footer.contact": "Contact us: info@englishsimulator.com",
  },
  vi: {
    // Header
    "nav.home": "Trang chủ",
    "nav.simulation": "Mô phỏng",
    "nav.resources": "Tài nguyên",
    "nav.tutorial": "Hướng dẫn",
    "nav.community": "Cộng đồng",
    "nav.contact": "Liên hệ",
    "nav.login": "Đăng nhập",

    // Hero Section
    "hero.title": "Mô phỏng lớp học tiếng Anh",
    "hero.description":
      "Mô phỏng lớp học tiếng Anh là công cụ giúp sinh viên sư phạm tiếng Anh luyện tập kỹ năng giảng dạy và quản lý lớp học thông qua môi trường mô phỏng 3D/2D.",
    "hero.startButton": "Bắt đầu mô phỏng",
    "hero.watchDemo": "Xem demo",

    // Features
    "feature.teaching.title": "Mô phỏng giảng dạy",
    "feature.teaching.description": "Luyện tập các tình huống lớp học thực tế",
    "feature.interact.title": "Tương tác với học sinh ảo",
    "feature.interact.description": "Giao tiếp với các avatar học sinh được hỗ trợ bởi AI",
    "feature.practice.title": "Luyện tập xử lý tình huống lớp học",
    "feature.practice.description": "Học cách quản lý các thử thách khác nhau trong lớp học",
    "feature.assess.title": "Đánh giá kỹ năng theo thời gian thực",
    "feature.assess.description": "Nhận phản hồi ngay lập tức về hiệu suất giảng dạy",

    // Auth Pages
    "auth.login.title": "Đăng nhập tài khoản",
    "auth.login.subtitle": "Nhập thông tin đăng nhập để truy cập mô phỏng",
    "auth.register.title": "Tạo tài khoản mới",
    "auth.register.subtitle": "Tham gia cùng hàng nghìn giáo viên cải thiện kỹ năng giảng dạy",
    "auth.email": "Email",
    "auth.password": "Mật khẩu",
    "auth.confirmPassword": "Xác nhận mật khẩu",
    "auth.fullName": "Họ và tên",
    "auth.loginButton": "Đăng nhập",
    "auth.registerButton": "Tạo tài khoản",
    "auth.forgotPassword": "Quên mật khẩu?",
    "auth.noAccount": "Chưa có tài khoản?",
    "auth.hasAccount": "Đã có tài khoản?",
    "auth.signUp": "Đăng ký",
    "auth.signIn": "Đăng nhập",
    "auth.orContinueWith": "Hoặc tiếp tục với",
    "auth.google": "Google",
    "auth.facebook": "Facebook",
    "auth.terms": "Bằng cách tạo tài khoản, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của chúng tôi",

    // Footer
    "footer.copyright": "© 2024 Mô phỏng lớp học tiếng Anh. Tất cả quyền được bảo lưu.",
    "footer.contact": "Liên hệ: info@englishsimulator.com",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

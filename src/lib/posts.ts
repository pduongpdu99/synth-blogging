"use server"

import fs from "fs"
import path from "path"

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  tags: string[]
  readTime: string
  language: "en" | "vi"
  author: string
  published: boolean
  featuredImage?: string
}

const postsDirectory = path.join(process.cwd(), "data")
const postsFilePath = path.join(postsDirectory, "posts.json")

// Ensure data directory exists
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true })
}

// Initialize posts file if it doesn't exist
if (!fs.existsSync(postsFilePath)) {
  fs.writeFileSync(postsFilePath, JSON.stringify([], null, 2))
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const fileContents = await fs.promises.readFile(postsFilePath, "utf8")
    const posts = JSON.parse(fileContents) as BlogPost[]
    return posts
      .filter((post) => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error reading posts:", error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await getAllPosts()
    return posts.find((post) => post.slug === slug) || null
  } catch (error) {
    console.error("Error getting post by slug:", error)
    return null
  }
}

export async function savePost(post: Omit<BlogPost, "id">): Promise<BlogPost> {
  try {
    const fileContents = await fs.promises.readFile(postsFilePath, "utf8")
    const posts = JSON.parse(fileContents) as BlogPost[]

    const existingPostIndex = posts.findIndex((p) => p.slug === post.slug)

    if (existingPostIndex >= 0) {
      const updatedPost = { ...posts[existingPostIndex], ...post }
      posts[existingPostIndex] = updatedPost
      await fs.promises.writeFile(postsFilePath, JSON.stringify(posts, null, 2))
      return updatedPost
    } else {
      const newPost: BlogPost = {
        ...post,
        id: Math.max(...posts.map((p) => p.id), 0) + 1,
      }
      posts.push(newPost)
      await fs.promises.writeFile(postsFilePath, JSON.stringify(posts, null, 2))
      return newPost
    }
  } catch (error) {
    console.error("Error saving post:", error)
    throw new Error("Failed to save post")
  }
}

export async function deletePost(slug: string): Promise<boolean> {
  try {
    const fileContents = await fs.promises.readFile(postsFilePath, "utf8")
    const posts = JSON.parse(fileContents) as BlogPost[]

    const filteredPosts = posts.filter((post) => post.slug !== slug)

    if (filteredPosts.length === posts.length) {
      return false
    }

    await fs.promises.writeFile(postsFilePath, JSON.stringify(filteredPosts, null, 2))
    return true
  } catch (error) {
    console.error("Error deleting post:", error)
    return false
  }
}

export async function getPostsByLanguage(language: "en" | "vi"): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.language === language)
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.category === category)
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  const lowercaseQuery = query.toLowerCase()

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}

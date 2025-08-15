import { type NextRequest, NextResponse } from "next/server"
import { getAllPosts, savePost } from "@/lib/posts"

export async function GET() {
  try {
    const posts = await getAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const postData = await request.json()

    // Validate required fields
    const requiredFields = ["title", "excerpt", "content", "category", "language", "slug"]
    for (const field of requiredFields) {
      if (!postData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Set default values
    const post = {
      ...postData,
      author: postData.author || "Synth",
      published: postData.published !== undefined ? postData.published : true,
      date: postData.date || new Date().toISOString().split("T")[0],
    }

    const savedPost = savePost(post)
    return NextResponse.json(savedPost, { status: 201 })
  } catch (error) {
    console.error("Error saving post:", error)
    return NextResponse.json({ error: "Failed to save post" }, { status: 500 })
  }
}

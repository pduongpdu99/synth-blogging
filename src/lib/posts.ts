"use server";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  tags: string[];
  readTime: string;
  language: "en" | "vi";
  author: string;
  published: boolean;
  featuredImage?: string;
}

const BASE_URL = process.env.BASE_URL || "";

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${BASE_URL}/data/posts.json`);
    const posts = (await res.json()) as BlogPost[];
    return posts
      .filter((post) => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error reading posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await getAllPosts();
    return posts.find((post) => post.slug === slug) || null;
  } catch (error) {
    console.error("Error getting post by slug:", error);
    return null;
  }
}

export async function getPostsByLanguage(
  language: "en" | "vi"
): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.language === language);
}

export async function getPostsByCategory(
  category: string
): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category === category);
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  const lowercaseQuery = query.toLowerCase();

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
}
export async function savePost(post: BlogPost): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/api/savePost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    return res.ok;
  } catch (error) {
    console.error("Error saving post:", error);
    return false;
  }
}
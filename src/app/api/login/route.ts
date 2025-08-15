// app/api/login/route.ts
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const cookieStore = await cookies();

  // Giả lập xác thực
  const success = email === "admin@gmail.com" && password === "Aa123456@";

  if (!success) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
    });
  }

  // Set cookie HTTP-only
  cookieStore.set({
    name: "login",
    value: "true",
    httpOnly: true,
    path: "/",
    maxAge: 60 * 15, // 15 minutes
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

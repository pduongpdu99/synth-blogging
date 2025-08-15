// app/api/login/route.ts
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();

  return new Response(JSON.stringify({ success: !!cookieStore.get("login") }), {
    status: 200,
  });
}

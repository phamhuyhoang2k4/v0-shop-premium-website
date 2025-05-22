import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get("code")
    const next = searchParams.get("next") ?? "/"

    if (code) {
      try {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
          return NextResponse.redirect(`${origin}${next}`)
        }
        console.error("Error exchanging code for session:", error)
      } catch (error) {
        console.error("Error creating Supabase client or exchanging code:", error)
      }
    }

    // Nếu có lỗi, chuyển hướng về trang lỗi
    return NextResponse.redirect(`${origin}/auth/error`)
  } catch (error) {
    console.error("Unexpected error in callback route:", error)
    return NextResponse.redirect(`${origin}/auth/error`)
  }
}

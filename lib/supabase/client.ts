import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Tạo một biến toàn cục để lưu trữ instance của Supabase client
let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null

export function createClient() {
  // Chỉ tạo client ở phía client, không phải server
  if (typeof window === "undefined") {
    return null as any
  }

  // Nếu đã có instance, trả về instance đó
  if (supabaseInstance) {
    return supabaseInstance
  }

  // Lấy URL và key từ biến môi trường
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Kiểm tra xem URL và key có tồn tại không
  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase URL or key is missing. Please check your environment variables.")
    // Trả về một đối tượng giả để tránh lỗi
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithOAuth: () => Promise.resolve({}),
        signOut: () => Promise.resolve({}),
      },
    } as any
  }

  // Tạo và lưu trữ instance
  supabaseInstance = createSupabaseClient(supabaseUrl, supabaseKey)
  return supabaseInstance
}

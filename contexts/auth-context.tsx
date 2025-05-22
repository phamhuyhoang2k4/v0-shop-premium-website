"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User, Session } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
  signInWithEmailPassword: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  authError: string | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signInWithEmailPassword: async () => {},
  signOut: async () => {},
  authError: null,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const router = useRouter()
  const { t } = useLanguage()

  useEffect(() => {
    // Chỉ chạy ở phía client
    if (typeof window === "undefined") return

    try {
      const supabase = createClient()

      // Lấy phiên hiện tại
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      })

      // Thiết lập listener cho thay đổi trạng thái xác thực
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        // Refresh dữ liệu khi trạng thái xác thực thay đổi
        router.refresh()
      })

      return () => {
        subscription.unsubscribe()
      }
    } catch (error) {
      console.error("Error in auth setup:", error)
      setLoading(false)
    }
  }, [router])

  const signInWithEmailPassword = async (email: string, password: string) => {
    setAuthError(null)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setAuthError(error.message)
        toast({
          title: t("login_error"),
          description: error.message,
          variant: "destructive",
        })
        throw error
      }
    } catch (error) {
      console.error("Error signing in with email/password:", error)
    }
  }

  const signOut = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
      toast({
        title: t("logout_error"),
        description: t("logout_error_description"),
        variant: "destructive",
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signInWithEmailPassword, signOut, authError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

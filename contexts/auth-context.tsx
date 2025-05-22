"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [supabase, setSupabase] = useState<any>(null)

  // Khởi tạo Supabase client chỉ ở phía client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSupabase(createClient())
    }
  }, [])

  // Lấy thông tin phiên và thiết lập listener khi Supabase client đã sẵn sàng
  useEffect(() => {
    if (!supabase) return

    const getUser = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        setUser(data.session?.user || null)
      } catch (error) {
        console.error("Error getting session:", error)
      } finally {
        setLoading(false)
      }

      try {
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user || null)
        })

        return () => {
          if (authListener?.subscription) {
            authListener.subscription.unsubscribe()
          }
        }
      } catch (error) {
        console.error("Error setting up auth listener:", error)
      }
    }

    getUser()
  }, [supabase])

  const signInWithGoogle = async () => {
    if (!supabase) {
      console.error("Supabase client not initialized")
      return
    }

    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
    } catch (error) {
      console.error("Error signing in with Google:", error)
    }
  }

  const signOut = async () => {
    if (!supabase) {
      console.error("Supabase client not initialized")
      return
    }

    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { useLanguage } from "@/contexts/language-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { createClient } from "@/lib/supabase/client"

export default function ResetPasswordPage() {
  const { t } = useLanguage()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const router = useRouter()

  // Kiểm tra xem người dùng có đến từ email đặt lại mật khẩu không
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient()
      const { data } = await supabase.auth.getSession()

      // Nếu không có phiên hoặc không phải là phiên đặt lại mật khẩu
      if (!data.session) {
        toast({
          title: t("error"),
          description: t("invalid_reset_link"),
          variant: "destructive",
        })
        router.push("/auth/login")
      }
    }

    checkSession()
  }, [router, t])

  const validateForm = () => {
    let isValid = true
    setPasswordError("")
    setConfirmPasswordError("")

    if (!password) {
      setPasswordError(t("password_required"))
      isValid = false
    } else if (password.length < 6) {
      setPasswordError(t("password_too_short"))
      isValid = false
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(t("passwords_dont_match"))
      isValid = false
    }

    return isValid
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setIsLoading(true)
      const supabase = createClient()

      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        toast({
          title: t("error"),
          description: error.message,
          variant: "destructive",
        })
        return
      }

      toast({
        title: t("success"),
        description: t("password_reset_success"),
      })

      // Chuyển hướng đến trang đăng nhập sau khi đặt lại mật khẩu thành công
      router.push("/auth/login")
    } catch (error: any) {
      console.error("Error resetting password:", error)
      toast({
        title: t("error"),
        description: error.message || t("unknown_error"),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t("reset_password")}</CardTitle>
            <CardDescription>{t("reset_password_description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">{t("new_password")}</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t("confirm_password")}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPasswordError && <p className="text-sm text-destructive">{confirmPasswordError}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("updating") : t("update_password")}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              {t("remember_password")}{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                {t("login")}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

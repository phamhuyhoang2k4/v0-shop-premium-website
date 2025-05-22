"use client"

import type React from "react"

import { useState } from "react"
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

export default function RegisterPage() {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const router = useRouter()

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
    }
    let isValid = true

    if (!email) {
      newErrors.email = t("email_required")
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t("email_invalid")
      isValid = false
    }

    if (!password) {
      newErrors.password = t("password_required")
      isValid = false
    } else if (password.length < 6) {
      newErrors.password = t("password_too_short")
      isValid = false
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = t("passwords_dont_match")
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setIsLoading(true)
      const supabase = createClient()

      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        toast({
          title: t("registration_error"),
          description: error.message,
          variant: "destructive",
        })
        return
      }

      toast({
        title: t("registration_successful"),
        description: t("verification_email_sent"),
      })

      // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
      router.push("/auth/login")
    } catch (error: any) {
      console.error("Lỗi đăng ký:", error)
      toast({
        title: t("registration_error"),
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
            <CardTitle className="text-2xl">{t("register")}</CardTitle>
            <CardDescription>{t("register_description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t("confirm_password")}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("registering") : t("register")}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <p className="text-sm text-center text-muted-foreground">
              {t("already_have_account")}{" "}
              <Link href="/auth/login" className="text-primary underline">
                {t("login")}
              </Link>
            </p>
            <p className="text-sm text-center text-muted-foreground">
              {t("by_registering")}{" "}
              <Link href="/terms" className="underline">
                {t("terms")}
              </Link>{" "}
              {t("and")}{" "}
              <Link href="/privacy" className="underline">
                {t("privacy_policy")}
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

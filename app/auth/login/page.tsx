"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const { t } = useLanguage()
  const { user, signInWithEmailPassword, authError } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const router = useRouter()

  // Nếu người dùng đã đăng nhập, chuyển hướng về trang chủ
  if (user) {
    router.push("/")
    return null
  }

  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate
    let isValid = true
    setEmailError("")
    setPasswordError("")

    if (!email) {
      setEmailError(t("email_required"))
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(t("email_invalid"))
      isValid = false
    }

    if (!password) {
      setPasswordError(t("password_required"))
      isValid = false
    }

    if (!isValid) return

    try {
      setIsLoading(true)
      await signInWithEmailPassword(email, password)
    } catch (error: any) {
      console.error("Lỗi đăng nhập:", error)
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
            <CardTitle className="text-2xl">{t("login")}</CardTitle>
            <CardDescription>{t("login_description")}</CardDescription>
          </CardHeader>
          <CardContent>
            {authError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{t("login_error")}</AlertTitle>
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleEmailPasswordLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
                {emailError && <p className="text-sm text-destructive">{emailError}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
              </div>
              <div className="text-right">
                <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                  {t("forgot_password")}
                </Link>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("logging_in") : t("login")}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                {t("dont_have_account")}{" "}
                <Link href="/auth/register" className="text-primary hover:underline">
                  {t("register")}
                </Link>
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              {t("by_logging_in")}{" "}
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

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const { t } = useLanguage()
  const { user, signInWithGoogle, signInWithEmailPassword, authError } = useAuth()
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

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      await signInWithGoogle()
    } catch (error: any) {
      console.error("Lỗi đăng nhập:", error)
    } finally {
      setIsLoading(false)
    }
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
            {authError === "missing_oauth_secret" && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{t("configuration_error")}</AlertTitle>
                <AlertDescription>
                  {t("missing_oauth_secret")}
                  <div className="mt-2 text-xs">
                    <Link href="/auth/oauth-setup-guide" className="underline">
                      {t("view_setup_guide")}
                    </Link>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="google" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="google">{t("google")}</TabsTrigger>
                <TabsTrigger value="email">{t("email")}</TabsTrigger>
              </TabsList>
              <TabsContent value="google" className="pt-4">
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2 h-12"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  <FcGoogle className="h-5 w-5" />
                  {isLoading ? t("logging_in") : t("login_with_google")}
                </Button>
              </TabsContent>
              <TabsContent value="email" className="pt-4">
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
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? t("logging_in") : t("login")}
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    {t("dont_have_account")}{" "}
                    <Link href="/auth/register" className="text-primary underline">
                      {t("register")}
                    </Link>
                  </p>
                </div>
              </TabsContent>
            </Tabs>
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

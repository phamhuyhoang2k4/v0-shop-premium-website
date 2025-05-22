"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"

export default function LoginPage() {
  const { t } = useLanguage()
  const { user, signInWithGoogle } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
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
    } catch (error) {
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
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 h-12"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <FcGoogle className="h-5 w-5" />
              {isLoading ? t("logging_in") : t("login_with_google")}
            </Button>
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

"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { useLanguage } from "@/contexts/language-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { createClient } from "@/lib/supabase/client"

export default function ForgotPasswordPage() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: t("error"),
        description: t("email_invalid"),
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      const supabase = createClient()

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        toast({
          title: t("error"),
          description: error.message,
          variant: "destructive",
        })
        return
      }

      setEmailSent(true)
      toast({
        title: t("success"),
        description: t("reset_email_sent"),
      })
    } catch (error: any) {
      console.error("Error sending reset password email:", error)
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
            <Link href="/auth/login" className="flex items-center text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("back_to_login")}
            </Link>
            <CardTitle className="text-2xl">{t("forgot_password")}</CardTitle>
            <CardDescription>{t("forgot_password_description")}</CardDescription>
          </CardHeader>
          <CardContent>
            {emailSent ? (
              <div className="text-center py-4">
                <p className="mb-4">{t("reset_email_sent_description")}</p>
                <p className="text-sm text-muted-foreground">{t("check_spam_folder")}</p>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? t("sending") : t("send_reset_link")}
                </Button>
              </form>
            )}
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

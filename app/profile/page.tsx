"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <p>{t("loading")}...</p>
        </main>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{t("profile")}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("personal_info")}</CardTitle>
              <CardDescription>{t("manage_personal_info")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg">
                    {user.user_metadata?.full_name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()
                      .substring(0, 2) || "U"}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-medium">{user.user_metadata?.full_name}</h3>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t("account_settings")}</CardTitle>
              <CardDescription>{t("manage_account_settings")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">{t("email")}</h3>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">{t("account_id")}</h3>
                  <p className="text-sm text-muted-foreground break-all">{user.id}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">{t("provider")}</h3>
                  <p className="capitalize">{user.app_metadata?.provider || "google"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

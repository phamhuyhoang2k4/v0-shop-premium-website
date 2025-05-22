"use client"

import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { useLanguage } from "@/contexts/language-context"

export default function ProviderNotEnabledPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-amber-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">{t("google_provider_not_enabled")}</h1>
          <div className="bg-muted p-4 rounded-md mb-6 text-left">
            <h2 className="font-semibold mb-2">Hướng dẫn bật Google Provider:</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>
                Đăng nhập vào{" "}
                <a
                  href="https://app.supabase.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Supabase Dashboard
                </a>
              </li>
              <li>Chọn dự án của bạn</li>
              <li>
                Trong menu bên trái, chọn <strong>Authentication</strong>
              </li>
              <li>
                Chọn tab <strong>Providers</strong>
              </li>
              <li>
                Tìm <strong>Google</strong> trong danh sách và bật nó lên (chuyển sang ON)
              </li>
              <li>
                Nhập <strong>Google Client ID</strong> và <strong>Google Client Secret</strong> từ Google Cloud Console
              </li>
              <li>Lưu cài đặt</li>
            </ol>
          </div>
          <Link href="/">
            <Button>{t("back")}</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

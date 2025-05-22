import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-amber-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Lỗi xác thực</h1>
          <p className="text-muted-foreground mb-6">Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau.</p>
          <Link href="/">
            <Button>Quay lại trang chủ</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

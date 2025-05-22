"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Copy, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CountdownTimer } from "@/components/countdown-timer"
import { formatCurrency } from "@/lib/utils"

// Thông tin ngân hàng cố định
const bankInfo = {
  bankName: "TECHCOMBANK",
  accountName: "NGUYEN VAN A",
  accountNumber: "19036217123456",
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [copied, setCopied] = useState<string | null>(null)

  const productName = searchParams.get("productName") || "Sản phẩm"
  const amount = Number(searchParams.get("amount")) || 0
  const orderId = searchParams.get("orderId") || `ORDER${Date.now()}`

  // Nội dung chuyển khoản
  const transferContent = `SHOP ${orderId}`

  useEffect(() => {
    if (amount === 0) {
      router.push("/")
    }
  }, [amount, router])

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleExpire = () => {
    alert("Thời gian thanh toán đã hết. Vui lòng thử lại.")
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="ghost" size="sm" className="gap-1" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-rose-600">SHOP PREMIUM</div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">Thanh toán đơn hàng</h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col items-center mb-6">
              <h2 className="text-lg font-semibold mb-2">Quét mã QR để thanh toán</h2>
              <p className="text-gray-500 mb-4">Đơn hàng sẽ hết hạn sau:</p>
              <div className="bg-rose-50 text-rose-600 px-4 py-2 rounded-md mb-4">
                <CountdownTimer minutes={10} onExpire={handleExpire} />
              </div>
              <div className="border p-4 rounded-lg mb-4">
                <Image
                  src="/placeholder.svg?height=300&width=300&text=QR+Code"
                  alt="QR Code"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </div>
              <div className="text-center">
                <p className="font-medium">{productName}</p>
                <p className="text-xl font-bold text-rose-600">{formatCurrency(amount)}</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Thông tin chuyển khoản</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Ngân hàng</p>
                    <p className="font-medium">{bankInfo.bankName}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(bankInfo.bankName, "bank")}>
                    {copied === "bank" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Chủ tài khoản</p>
                    <p className="font-medium">{bankInfo.accountName}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(bankInfo.accountName, "name")}>
                    {copied === "name" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Số tài khoản</p>
                    <p className="font-medium">{bankInfo.accountNumber}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(bankInfo.accountNumber, "account")}>
                    {copied === "account" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Số tiền</p>
                    <p className="font-medium">{formatCurrency(amount)}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(amount.toString(), "amount")}>
                    {copied === "amount" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Nội dung chuyển khoản</p>
                    <p className="font-medium">{transferContent}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(transferContent, "content")}>
                    {copied === "content" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm">
            <p>Sau khi thanh toán thành công, sản phẩm sẽ được gửi đến email của bạn.</p>
            <p className="mt-2">Nếu cần hỗ trợ, vui lòng liên hệ: support@shoppremium.com</p>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 bg-gray-50">
        <div className="container mx-auto px-4 text-center text-gray-500">
          &copy; {new Date().getFullYear()} SHOP PREMIUM. Tất cả các quyền được bảo lưu.
        </div>
      </footer>
    </div>
  )
}

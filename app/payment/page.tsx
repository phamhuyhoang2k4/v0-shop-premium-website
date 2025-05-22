"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Copy, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CountdownTimer } from "@/components/countdown-timer"
import { formatCurrency } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

// Thông tin ngân hàng cập nhật
const bankInfo = {
  bankName: "VCCB (Bản Việt)",
  accountName: "Phạm Huy Hoàng",
  accountNumber: "9021964441235",
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [copied, setCopied] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [zalo, setZalo] = useState("")
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [errors, setErrors] = useState({ email: "", zalo: "" })

  const productName = searchParams.get("productName") || "Sản phẩm"
  const amount = Number(searchParams.get("amount")) || 0
  const orderId = searchParams.get("orderId") || `ORDER${Date.now()}`

  // Nội dung chuyển khoản sẽ được cập nhật sau khi xác nhận
  const [transferContent, setTransferContent] = useState(`SHOP ${orderId}`)

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

  const validateForm = () => {
    let valid = true
    const newErrors = { email: "", zalo: "" }

    // Kiểm tra email
    if (!email) {
      newErrors.email = "Email không được để trống"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ"
      valid = false
    }

    // Kiểm tra số Zalo
    if (!zalo) {
      newErrors.zalo = "Số Zalo không được để trống"
      valid = false
    } else if (!/^\d{9,11}$/.test(zalo)) {
      newErrors.zalo = "Số Zalo không hợp lệ (9-11 số)"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleConfirm = () => {
    if (validateForm()) {
      // Cập nhật nội dung chuyển khoản với thông tin người dùng
      const shortProductName = productName.replace("Netflix Premium ", "NF").replace(" Tháng", "T").replace(" Năm", "Y")
      setTransferContent(`${shortProductName} ${email} ${zalo}`)
      setIsConfirmed(true)
    }
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

          {!isConfirmed ? (
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">Thông tin nhận tài khoản</h2>
                  <p className="text-gray-500 mb-4">
                    Vui lòng nhập email và số Zalo để nhận thông tin tài khoản sau khi thanh toán
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zalo">Số Zalo</Label>
                    <Input
                      id="zalo"
                      type="tel"
                      placeholder="0912345678"
                      value={zalo}
                      onChange={(e) => setZalo(e.target.value)}
                    />
                    {errors.zalo && <p className="text-sm text-red-500">{errors.zalo}</p>}
                  </div>

                  <div className="pt-4">
                    <Button className="w-full" onClick={handleConfirm}>
                      Xác nhận thông tin
                    </Button>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">Sản phẩm: {productName}</p>
                  <p className="text-lg font-bold text-rose-600">{formatCurrency(amount)}</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col items-center mb-6">
                <h2 className="text-lg font-semibold mb-2">Quét mã QR để thanh toán</h2>
                <p className="text-gray-500 mb-4">Đơn hàng sẽ hết hạn sau:</p>
                <div className="bg-rose-50 text-rose-600 px-4 py-2 rounded-md mb-4">
                  <CountdownTimer minutes={10} onExpire={handleExpire} />
                </div>
                <div className="border p-4 rounded-lg mb-4">
                  <Image
                    src="https://raw.githubusercontent.com/phamhuyhoang2k4/images/refs/heads/main/z6628844786519_5c3a82d5cf3df31a3f3ae9f68d46e65b.jpg"
                    alt="QR Code Thanh Toán"
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

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-700 mb-2">Thông tin đã xác nhận</h4>
                <p className="text-sm">Email: {email}</p>
                <p className="text-sm">Số Zalo: {zalo}</p>
              </div>
            </div>
          )}

          <div className="text-center text-gray-500 text-sm">
            <p>Sau khi thanh toán thành công, sản phẩm sẽ được gửi đến email và Zalo của bạn.</p>
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

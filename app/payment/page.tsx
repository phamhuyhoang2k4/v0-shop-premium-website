"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Copy, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CountdownTimer } from "@/components/countdown-timer"
import { formatCurrency } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { SiteHeader } from "@/components/site-header"

// Thông tin ngân hàng cập nhật
const bankInfo = {
  bankName: "VCCB (Bản Việt)",
  accountName: "Phạm Huy Hoàng",
  accountNumber: "9021964441235",
}

export default function PaymentPage() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [copied, setCopied] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [zalo, setZalo] = useState("")
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [errors, setErrors] = useState({ email: "", zalo: "" })

  const productName = searchParams.get("productName") || t("product")
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
    alert(t("order_expired"))
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
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">{t("payment_order")}</h1>

          {!isConfirmed ? (
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">{t("account_info")}</h2>
                  <p className="text-muted-foreground mb-4">{t("account_info_desc")}</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("email")}</Label>
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
                    <Label htmlFor="zalo">{t("zalo")}</Label>
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
                      {t("confirm_info")}
                    </Button>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {t("product")}: {productName}
                  </p>
                  <p className="text-lg font-bold text-rose-600">{formatCurrency(amount)}</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="bg-background rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col items-center mb-6">
                <h2 className="text-lg font-semibold mb-2">{t("scan_qr")}</h2>
                <p className="text-muted-foreground mb-4">{t("order_expires")}</p>
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
                <h3 className="font-semibold mb-4">{t("payment_info")}</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">{t("bank")}</p>
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
                      <p className="text-sm text-muted-foreground">{t("account_holder")}</p>
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
                      <p className="text-sm text-muted-foreground">{t("account_number")}</p>
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
                      <p className="text-sm text-muted-foreground">{t("amount")}</p>
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
                      <p className="text-sm text-muted-foreground">{t("transfer_content")}</p>
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

              <div className="mt-6 p-4 bg-blue-50 rounded-lg dark:bg-blue-950">
                <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">{t("confirmed_info")}</h4>
                <p className="text-sm">
                  {t("email")}: {email}
                </p>
                <p className="text-sm">
                  {t("zalo")}: {zalo}
                </p>
              </div>
            </div>
          )}

          <div className="text-center text-muted-foreground text-sm">
            <p>{t("after_payment")}</p>
            <p className="mt-2">{t("need_support")}</p>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 bg-muted">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} SHOP PREMIUM. {t("all_rights_reserved")}
        </div>
      </footer>
    </div>
  )
}

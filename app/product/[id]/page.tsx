"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeft, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getProductById } from "@/lib/products"
import { formatCurrency } from "@/lib/utils"

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const product = getProductById(params.id)
  const [isLoading, setIsLoading] = useState(false)

  if (!product) {
    return <div>Sản phẩm không tồn tại</div>
  }

  const handleBuyNow = () => {
    setIsLoading(true)
    const orderId = `${product.id}-${Date.now()}`
    router.push(`/payment?productName=${encodeURIComponent(product.name)}&amount=${product.price}&orderId=${orderId}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href={`/category/${product.categoryId}`}>
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Quay lại
            </Button>
          </Link>

          <div className="text-2xl md:text-3xl font-bold tracking-tight text-rose-600">SHOP PREMIUM</div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden border">
            <Image
              src={product.image || "https://gamikey.com/wp-content/uploads/2022/03/Netflix.jpg"}
              alt={product.name}
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold text-rose-600 mt-4">{formatCurrency(product.price)}</p>

            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Mô tả sản phẩm</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {product.features && product.features.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">Tính năng</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1" onClick={handleBuyNow} disabled={isLoading}>
                {isLoading ? "Đang xử lý..." : "Mua ngay"}
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 bg-gray-50 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500">
          &copy; {new Date().getFullYear()} SHOP PREMIUM. Tất cả các quyền được bảo lưu.
        </div>
      </footer>
    </div>
  )
}

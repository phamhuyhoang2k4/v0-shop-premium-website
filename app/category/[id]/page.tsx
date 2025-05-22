import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { getProductsByCategory } from "@/lib/products"
import { formatCurrency } from "@/lib/utils"

export default function CategoryPage({ params }: { params: { id: string } }) {
  const products = getProductsByCategory(params.id)
  const categoryName = params.id.replace(/-/g, " ")

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Quay lại
            </Button>
          </Link>

          <div className="text-2xl md:text-3xl font-bold tracking-tight text-rose-600">SHOP PREMIUM</div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 capitalize">{categoryName}</h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={600}
                        height={400}
                        className="rounded-md object-cover w-full h-48 mb-4"
                      />
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-rose-600 font-bold mt-2">{formatCurrency(product.price)}</p>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full">Xem chi tiết</Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-lg">Danh sách sản phẩm {categoryName} sẽ được cập nhật sớm</p>
            <p className="text-gray-500 mt-2">Đang phát triển...</p>
          </div>
        )}
      </main>

      <footer className="border-t py-6 bg-gray-50">
        <div className="container mx-auto px-4 text-center text-gray-500">
          &copy; {new Date().getFullYear()} SHOP PREMIUM. Tất cả các quyền được bảo lưu.
        </div>
      </footer>
    </div>
  )
}

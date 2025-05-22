"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Check, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getProductById } from "@/lib/products"
import { formatCurrency } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { SiteHeader } from "@/components/site-header"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function ProductPage({ params }: { params: { id: string } }) {
  const { t } = useLanguage()
  const router = useRouter()
  const { addItem } = useCart()
  const product = getProductById(params.id)
  const [isLoading, setIsLoading] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  if (!product) {
    return <div>Sản phẩm không tồn tại</div>
  }

  const handleBuyNow = () => {
    setIsLoading(true)
    const orderId = `${product.id}-${Date.now()}`
    router.push(`/payment?productName=${encodeURIComponent(product.name)}&amount=${product.price}&orderId=${orderId}`)
  }

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    setTimeout(() => {
      addItem(product, 1)
      setIsAddingToCart(false)
      toast({
        title: t("added_to_cart"),
        description: product.name,
        action: (
          <ToastAction altText={t("view_cart")} onClick={() => router.push("/cart")}>
            {t("view_cart")}
          </ToastAction>
        ),
      })
    }, 500)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden border">
            <Image
              src={product.image || "/placeholder.svg"}
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
              <h3 className="font-semibold text-lg mb-2">{t("product_description")}</h3>
              <p className="text-foreground">{product.description}</p>
            </div>

            {product.features && product.features.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">{t("features")}</h3>
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
                {isLoading ? t("processing") : t("buy_now")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 flex items-center justify-center gap-2"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                <ShoppingCart className="h-5 w-5" />
                {isAddingToCart ? t("adding_to_cart") : t("add_to_cart")}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 bg-muted mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} SHOP PREMIUM. {t("all_rights_reserved")}
        </div>
      </footer>
    </div>
  )
}

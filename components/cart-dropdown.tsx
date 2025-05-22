"use client"

import { useRouter } from "next/navigation"
import { ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { formatCurrency } from "@/lib/utils"

export function CartDropdown() {
  const router = useRouter()
  const { items, removeItem, totalItems, totalPrice } = useCart()
  const { t } = useLanguage()

  const handleCheckout = () => {
    if (items.length === 0) return

    // Tạo tên sản phẩm tổng hợp
    let productName = ""
    if (items.length === 1) {
      productName = items[0].product.name
    } else {
      productName = `${items[0].product.name} ${t("and")} ${items.length - 1} ${t("other_items")}`
    }

    // Tạo ID đơn hàng
    const orderId = `CART-${Date.now()}`

    // Chuyển hướng đến trang thanh toán
    router.push(
      `/payment?productName=${encodeURIComponent(productName)}&amount=${totalPrice}&orderId=${orderId}&isCart=true`,
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
          <span className="sr-only">{t("cart")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-4">
          <h3 className="font-medium">{t("cart")}</h3>
        </div>
        <DropdownMenuSeparator />
        {items.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">{t("cart_empty")}</div>
        ) : (
          <>
            <div className="max-h-80 overflow-y-auto">
              {items.map((item) => (
                <DropdownMenuItem key={item.product.id} className="flex justify-between p-4 cursor-default">
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.product.price)} x {item.quantity}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.product.id)} className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">{t("remove")}</span>
                  </Button>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <div className="p-4">
              <div className="flex justify-between mb-4">
                <span>{t("total")}:</span>
                <span className="font-bold">{formatCurrency(totalPrice)}</span>
              </div>
              <Button className="w-full" onClick={handleCheckout}>
                {t("checkout")}
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

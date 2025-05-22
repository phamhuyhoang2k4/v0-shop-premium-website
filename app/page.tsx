import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ProductCategories from "@/components/product-categories"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="#netflix" className="text-lg font-medium hover:text-rose-600 transition-colors">
                  Netflix
                </Link>
                <Link href="#galaxy-play" className="text-lg font-medium hover:text-rose-600 transition-colors">
                  Galaxy Play
                </Link>
                <Link href="#google" className="text-lg font-medium hover:text-rose-600 transition-colors">
                  Google
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="text-2xl md:text-3xl font-bold tracking-tight text-rose-600">SHOP PREMIUM</div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Danh mục sản phẩm</h1>
        <ProductCategories />
      </main>

      <footer className="border-t py-6 bg-gray-50">
        <div className="container mx-auto px-4 text-center text-gray-500">
          &copy; {new Date().getFullYear()} SHOP PREMIUM. Tất cả các quyền được bảo lưu.
        </div>
      </footer>
    </div>
  )
}

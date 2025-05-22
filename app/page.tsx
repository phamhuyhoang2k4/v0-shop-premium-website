"use client"

import { useLanguage } from "@/contexts/language-context"
import { SiteHeader } from "@/components/site-header"
import ProductCategories from "@/components/product-categories"

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{t("product_categories")}</h1>
        <ProductCategories />
      </main>

      <footer className="border-t py-6 bg-muted">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} SHOP PREMIUM. {t("all_rights_reserved")}
        </div>
      </footer>
    </div>
  )
}

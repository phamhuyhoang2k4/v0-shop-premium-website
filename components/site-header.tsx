"use client"

import Link from "next/link"
import { Menu, Moon, Sun, Globe, HeadphonesIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { CartDropdown } from "@/components/cart-dropdown"

export function SiteHeader() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  return (
    <header className="border-b sticky top-0 bg-background z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">{t("menu")}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col gap-6 mt-8">
              <Link href="#netflix" className="text-lg font-medium hover:text-rose-600 transition-colors">
                Netflix
              </Link>
              <Link href="#galaxy-play" className="text-lg font-medium hover:text-rose-600 transition-colors">
                Galaxy Play
              </Link>
              <Link href="#google" className="text-lg font-medium hover:text-rose-600 transition-colors">
                Google
              </Link>

              <Link
                href="http://zaloapp.com/qr/p/bjm5mxplskn2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium hover:text-rose-600 transition-colors flex items-center gap-2"
              >
                <HeadphonesIcon className="h-5 w-5" />
                {t("support")}
              </Link>

              <div className="border-t pt-6 mt-2">
                <h3 className="font-medium mb-3">{t("theme")}</h3>
                <div className="flex gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("light")}
                    className="flex gap-2 items-center"
                  >
                    <Sun className="h-4 w-4" />
                    {t("light_mode")}
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className="flex gap-2 items-center"
                  >
                    <Moon className="h-4 w-4" />
                    {t("dark_mode")}
                  </Button>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-medium mb-3">{t("language")}</h3>
                <div className="flex gap-2">
                  <Button
                    variant={language === "vi" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("vi")}
                  >
                    {t("vietnamese")}
                  </Button>
                  <Button
                    variant={language === "en" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("en")}
                  >
                    {t("english")}
                  </Button>
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        <Link
          href="/"
          className="text-2xl md:text-3xl font-extrabold tracking-tight text-rose-600 hover:text-rose-700 transition-colors"
        >
          {t("shop_premium")}
        </Link>

        <div className="flex gap-2">
          <CartDropdown />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">{t("language")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("vi")}>{t("vietnamese")}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en")}>{t("english")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

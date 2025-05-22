"use client"

import Link from "next/link"
import { Menu, Moon, Sun, Globe, HeadphonesIcon, User, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { FcGoogle } from "react-icons/fc"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { CartDropdown } from "@/components/cart-dropdown"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SiteHeader() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { user, signOut } = useAuth()

  const getUserInitials = () => {
    if (!user?.user_metadata?.full_name) return "U"
    return user.user_metadata.full_name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

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
              <Link href="/" className="text-lg font-medium hover:text-rose-600 transition-colors">
                {t("home")}
              </Link>
              <Link href="/category/netflix" className="text-lg font-medium hover:text-rose-600 transition-colors">
                Netflix
              </Link>
              <Link href="/category/galaxy-play" className="text-lg font-medium hover:text-rose-600 transition-colors">
                Galaxy Play
              </Link>
              <Link href="/category/google" className="text-lg font-medium hover:text-rose-600 transition-colors">
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

              {user ? (
                <div className="border-t pt-6 flex flex-col gap-2">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar>
                      <AvatarImage src={user.user_metadata?.avatar_url || ""} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.user_metadata?.full_name || user.email}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => signOut()}>
                    <LogOut className="h-4 w-4" />
                    {t("logout")}
                  </Button>
                </div>
              ) : (
                <Link href="/auth/login" className="border-t pt-6">
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <FcGoogle className="h-4 w-4" />
                    {t("login_with_google")}
                  </Button>
                </Link>
              )}

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

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url || ""} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center gap-2 p-2">
                  <div>
                    <p className="font-medium">{user.user_metadata?.full_name || user.email}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">{t("profile")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">{t("orders")}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="text-red-500">
                  <LogOut className="h-4 w-4 mr-2" />
                  {t("logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button variant="outline" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">{t("login")}</span>
              </Button>
            </Link>
          )}

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

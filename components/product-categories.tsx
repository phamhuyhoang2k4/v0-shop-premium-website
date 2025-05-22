"use client"

import Link from "next/link"
import Image from "next/image"
import { Tv, Film, Smartphone, Headphones, Gamepad2, CreditCard } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function ProductCategories() {
  const { t } = useLanguage()

  const categories = [
    {
      id: "netflix",
      name: t("netflix_premium"),
      icon: <Tv className="h-8 w-8 mb-2 text-rose-600" />,
      description: t("netflix_desc"),
      image: "https://gamikey.com/wp-content/uploads/2022/03/Netflix.jpg",
    },
    {
      id: "galaxy-play",
      name: t("galaxy_play"),
      icon: <Film className="h-8 w-8 mb-2 text-rose-600" />,
      description: t("galaxy_desc"),
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "google",
      name: t("google_services"),
      icon: <Smartphone className="h-8 w-8 mb-2 text-rose-600" />,
      description: t("google_desc"),
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "audio",
      name: t("audio"),
      icon: <Headphones className="h-8 w-8 mb-2 text-rose-600" />,
      description: t("audio_desc"),
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "gaming",
      name: t("gaming"),
      icon: <Gamepad2 className="h-8 w-8 mb-2 text-rose-600" />,
      description: t("gaming_desc"),
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "payment",
      name: t("payment"),
      icon: <CreditCard className="h-8 w-8 mb-2 text-rose-600" />,
      description: t("payment_desc"),
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link href={`/category/${category.id}`} key={category.id}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                {category.icon}
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={300}
                  height={200}
                  className="rounded-md object-cover w-full h-40 my-3"
                />
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-center">
              <span className="text-rose-600 text-sm font-medium">{t("view_products")}</span>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

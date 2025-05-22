import Link from "next/link"
import Image from "next/image"
import { Tv, Film, Smartphone, Headphones, Gamepad2, CreditCard } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"

const categories = [
  {
    id: "netflix",
    name: "Netflix Premium",
    icon: <Tv className="h-8 w-8 mb-2 text-rose-600" />,
    description: "Trải nghiệm giải trí không giới hạn với Netflix Premium",
    image: "/https://gamikey.com/wp-content/uploads/2022/03/Netflix.jpg?height=200&width=300",
  },
  {
    id: "galaxy-play",
    name: "Galaxy Play",
    icon: <Film className="h-8 w-8 mb-2 text-rose-600" />,
    description: "Kho phim Việt Nam và quốc tế đặc sắc",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "google",
    name: "Google Services",
    icon: <Smartphone className="h-8 w-8 mb-2 text-rose-600" />,
    description: "Dịch vụ Google chất lượng cao",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "audio",
    name: "Âm Thanh",
    icon: <Headphones className="h-8 w-8 mb-2 text-rose-600" />,
    description: "Tai nghe và loa chất lượng cao",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "gaming",
    name: "Gaming",
    icon: <Gamepad2 className="h-8 w-8 mb-2 text-rose-600" />,
    description: "Phụ kiện và dịch vụ game cao cấp",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "payment",
    name: "Thanh Toán",
    icon: <CreditCard className="h-8 w-8 mb-2 text-rose-600" />,
    description: "Phương thức thanh toán an toàn và tiện lợi",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function ProductCategories() {
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
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-center">
              <span className="text-rose-600 text-sm font-medium">Xem sản phẩm</span>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

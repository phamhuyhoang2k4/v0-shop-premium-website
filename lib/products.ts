export type Product = {
  id: string
  categoryId: string
  name: string
  price: number
  description: string
  image: string
  features?: string[]
}

export const products: Product[] = [
  {
    id: "netflix-1-month",
    categoryId: "netflix",
    name: "Netflix Premium 1 Tháng",
    price: 260000,
    description: "Gói Netflix Premium chất lượng 4K/HDR, xem được trên 4 thiết bị cùng lúc trong vòng 1 tháng.",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Chất lượng 4K/HDR",
      "Xem trên 4 thiết bị cùng lúc",
      "Tải xuống trên 4 thiết bị di động",
      "Âm thanh không gian",
      "Không quảng cáo",
    ],
  },
  {
    id: "netflix-2-month",
    categoryId: "netflix",
    name: "Netflix Premium 2 Tháng",
    price: 500000,
    description: "Gói Netflix Premium chất lượng 4K/HDR, xem được trên 4 thiết bị cùng lúc trong vòng 2 tháng.",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Chất lượng 4K/HDR",
      "Xem trên 4 thiết bị cùng lúc",
      "Tải xuống trên 4 thiết bị di động",
      "Âm thanh không gian",
      "Không quảng cáo",
      "Tiết kiệm 4% so với mua 1 tháng",
    ],
  },
  {
    id: "netflix-3-month",
    categoryId: "netflix",
    name: "Netflix Premium 3 Tháng",
    price: 740000,
    description: "Gói Netflix Premium chất lượng 4K/HDR, xem được trên 4 thiết bị cùng lúc trong vòng 3 tháng.",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Chất lượng 4K/HDR",
      "Xem trên 4 thiết bị cùng lúc",
      "Tải xuống trên 4 thiết bị di động",
      "Âm thanh không gian",
      "Không quảng cáo",
      "Tiết kiệm 5% so với mua 1 tháng",
    ],
  },
  {
    id: "netflix-6-month",
    categoryId: "netflix",
    name: "Netflix Premium 6 Tháng",
    price: 1450000,
    description: "Gói Netflix Premium chất lượng 4K/HDR, xem được trên 4 thiết bị cùng lúc trong vòng 6 tháng.",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Chất lượng 4K/HDR",
      "Xem trên 4 thiết bị cùng lúc",
      "Tải xuống trên 4 thiết bị di động",
      "Âm thanh không gian",
      "Không quảng cáo",
      "Tiết kiệm 7% so với mua 1 tháng",
    ],
  },
  {
    id: "netflix-1-year",
    categoryId: "netflix",
    name: "Netflix Premium 1 Năm",
    price: 2800000,
    description: "Gói Netflix Premium chất lượng 4K/HDR, xem được trên 4 thiết bị cùng lúc trong vòng 1 năm.",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Chất lượng 4K/HDR",
      "Xem trên 4 thiết bị cùng lúc",
      "Tải xuống trên 4 thiết bị di động",
      "Âm thanh không gian",
      "Không quảng cáo",
      "Tiết kiệm 10% so với mua 1 tháng",
    ],
  },
]

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((product) => product.categoryId === categoryId)
}

export function getProductById(productId: string): Product | undefined {
  return products.find((product) => product.id === productId)
}

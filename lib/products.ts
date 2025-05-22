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
    price: 45000,
    description: "Gói Netflix Premium chất lượng 4K/HDR, xem được trên 4 thiết bị cùng lúc trong vòng 1 tháng.",
    image: "https://gamikey.com/wp-content/uploads/2022/03/Netflix.jpg",
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
    price: 80000,
    description: "Gói Netflix Premium chất lượng 4K/HDR, xem được trên 4 thiết bị cùng lúc trong vòng 2 tháng.",
    image: "https://gamikey.com/wp-content/uploads/2022/03/Netflix.jpg",
    features: [
      "Chất lượng 4K/HDR",
      "Xem trên 4 thiết bị cùng lúc",
      "Tải xuống trên 4 thiết bị di động",
      "Âm thanh không gian",
      "Không quảng cáo",
      "Tiết kiệm 11% so với mua 1 tháng",
    ],
  },
  {
    id: "netflix-3-month",
    categoryId: "netflix",
    name: "Netflix Premium 3 Tháng",
    price: 120000,
    description: "Gói Netflix Premium chất lượng 4K/HDR, xem được trên 4 thiết bị cùng lúc trong vòng 3 tháng.",
    image: "https://gamikey.com/wp-content/uploads/2022/03/Netflix.jpg",
    features: [
      "Chất lượng 4K/HDR",
      "Xem trên 4 thiết bị cùng lúc",
      "Tải xuống trên 4 thiết bị di động",
      "Âm thanh không gian",
      "Không quảng cáo",
      "Tiết kiệm 11% so với mua 1 tháng",
    ],
  },
  {
    id: "netflix-6-month",
    categoryId: "netflix",
    name: "Netflix Premium 6 Tháng",
    price: 220000,
    description: "Gói Netflix Premium chất lượng 4K/HDR, xem được trên 4 thiết bị cùng lúc trong vòng 6 tháng.",
    image: "https://gamikey.com/wp-content/uploads/2022/03/Netflix.jpg",
    features: [
      "Chất lượng 4K/HDR",
      "Xem trên 4 thiết bị cùng lúc",
      "Tải xuống trên 4 thiết bị di động",
      "Âm thanh không gian",
      "Không quảng cáo",
      "Tiết kiệm 19% so với mua 1 tháng",
    ],
  },
  {
    id: "netflix-1-year",
    categoryId: "netflix",
    name: "Netflix Premium 1 Năm",
    price: 400000,
    description: "Gói Netflix Premium chất lượng 4K/HDR, xem được trên 4 thiết bị cùng lúc trong vòng 1 năm.",
    image: "https://gamikey.com/wp-content/uploads/2022/03/Netflix.jpg",
    features: [
      "Chất lượng 4K/HDR",
      "Xem trên 4 thiết bị cùng lúc",
      "Tải xuống trên 4 thiết bị di động",
      "Âm thanh không gian",
      "Không quảng cáo",
      "Tiết kiệm 26% so với mua 1 tháng",
    ],
  },
]

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((product) => product.categoryId === categoryId)
}

export function getProductById(productId: string): Product | undefined {
  return products.find((product) => product.id === productId)
}

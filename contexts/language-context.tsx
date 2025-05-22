"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "vi" | "en"

type Translations = {
  [key in Language]: {
    [key: string]: string
  }
}

const translations: Translations = {
  vi: {
    // Header
    menu: "Menu",
    shop_premium: "SHOP PREMIUM",
    support: "Hỗ trợ",

    // Categories
    product_categories: "Danh mục sản phẩm",
    view_products: "Xem sản phẩm",
    netflix_premium: "Netflix Premium",
    netflix_desc: "Trải nghiệm giải trí không giới hạn với Netflix Premium",
    galaxy_play: "Galaxy Play",
    galaxy_desc: "Kho phim Việt Nam và quốc tế đặc sắc",
    google_services: "Google Services",
    google_desc: "Dịch vụ Google chất lượng cao",
    audio: "Âm Thanh",
    audio_desc: "Tai nghe và loa chất lượng cao",
    gaming: "Gaming",
    gaming_desc: "Phụ kiện và dịch vụ game cao cấp",
    payment: "Thanh Toán",
    payment_desc: "Phương thức thanh toán an toàn và tiện lợi",

    // Product page
    back: "Quay lại",
    product_description: "Mô tả sản phẩm",
    features: "Tính năng",
    buy_now: "Mua ngay",
    add_to_cart: "Thêm vào giỏ hàng",
    adding_to_cart: "Đang thêm...",
    added_to_cart: "Đã thêm vào giỏ hàng",
    view_cart: "Xem giỏ hàng",
    processing: "Đang xử lý...",

    // Cart
    cart: "Giỏ hàng",
    cart_empty: "Giỏ hàng trống",
    remove: "Xóa",
    total: "Tổng cộng",
    checkout: "Thanh toán",
    and: "và",
    other_items: "sản phẩm khác",

    // Payment page
    payment_order: "Thanh toán đơn hàng",
    account_info: "Thông tin nhận tài khoản",
    account_info_desc: "Vui lòng nhập email và số Zalo để nhận thông tin tài khoản sau khi thanh toán",
    email: "Email",
    zalo: "Số Zalo",
    confirm_info: "Xác nhận thông tin",
    product: "Sản phẩm",
    scan_qr: "Quét mã QR để thanh toán",
    order_expires: "Đơn hàng sẽ hết hạn sau:",
    order_expired: "Thời gian thanh toán đã hết. Vui lòng thử lại.",
    payment_info: "Thông tin chuyển khoản",
    bank: "Ngân hàng",
    account_holder: "Chủ tài khoản",
    account_number: "Số tài khoản",
    amount: "Số tiền",
    transfer_content: "Nội dung chuyển khoản",
    confirmed_info: "Thông tin đã xác nhận",
    after_payment: "Sau khi thanh toán thành công, sản phẩm sẽ được gửi đến email và Zalo của bạn.",
    need_support: "Nếu cần hỗ trợ, vui lòng liên hệ: support@shoppremium.com",

    // Auth
    login: "Đăng nhập",
    login_description: "Đăng nhập để truy cập tài khoản của bạn",
    login_with_google: "Đăng nhập bằng Google",
    logging_in: "Đang đăng nhập...",
    logout: "Đăng xuất",
    by_logging_in: "Bằng cách đăng nhập, bạn đồng ý với",
    terms: "Điều khoản sử dụng",
    privacy_policy: "Chính sách bảo mật",
    loading: "Đang tải",

    // Profile
    profile: "Hồ sơ",
    orders: "Đơn hàng",
    personal_info: "Thông tin cá nhân",
    manage_personal_info: "Quản lý thông tin cá nhân của bạn",
    account_settings: "Cài đặt tài khoản",
    manage_account_settings: "Quản lý cài đặt tài khoản của bạn",
    account_id: "ID tài khoản",
    provider: "Nhà cung cấp",

    // Footer
    all_rights_reserved: "Tất cả các quyền được bảo lưu.",

    // Theme
    theme: "Giao diện",
    light_mode: "Chế độ sáng",
    dark_mode: "Chế độ tối",

    // Language
    language: "Ngôn ngữ",
    vietnamese: "Tiếng Việt",
    english: "Tiếng Anh",
  },
  en: {
    // Header
    menu: "Menu",
    shop_premium: "SHOP PREMIUM",
    support: "Support",

    // Categories
    product_categories: "Product Categories",
    view_products: "View Products",
    netflix_premium: "Netflix Premium",
    netflix_desc: "Unlimited entertainment experience with Netflix Premium",
    galaxy_play: "Galaxy Play",
    galaxy_desc: "Collection of Vietnamese and international films",
    google_services: "Google Services",
    google_desc: "High-quality Google services",
    audio: "Audio",
    audio_desc: "High-quality headphones and speakers",
    gaming: "Gaming",
    gaming_desc: "Premium gaming accessories and services",
    payment: "Payment",
    payment_desc: "Safe and convenient payment methods",

    // Product page
    back: "Back",
    product_description: "Product Description",
    features: "Features",
    buy_now: "Buy Now",
    add_to_cart: "Add to Cart",
    adding_to_cart: "Adding...",
    added_to_cart: "Added to Cart",
    view_cart: "View Cart",
    processing: "Processing...",

    // Cart
    cart: "Cart",
    cart_empty: "Your cart is empty",
    remove: "Remove",
    total: "Total",
    checkout: "Checkout",
    and: "and",
    other_items: "other items",

    // Payment page
    payment_order: "Order Payment",
    account_info: "Account Information",
    account_info_desc: "Please enter your email and Zalo number to receive account information after payment",
    email: "Email",
    zalo: "Zalo Number",
    confirm_info: "Confirm Information",
    product: "Product",
    scan_qr: "Scan QR code to pay",
    order_expires: "Order expires in:",
    order_expired: "Payment time has expired. Please try again.",
    payment_info: "Payment Information",
    bank: "Bank",
    account_holder: "Account Holder",
    account_number: "Account Number",
    amount: "Amount",
    transfer_content: "Transfer Content",
    confirmed_info: "Confirmed Information",
    after_payment: "After successful payment, the product will be sent to your email and Zalo.",
    need_support: "If you need support, please contact: support@shoppremium.com",

    // Auth
    login: "Login",
    login_description: "Sign in to access your account",
    login_with_google: "Login with Google",
    logging_in: "Logging in...",
    logout: "Logout",
    by_logging_in: "By logging in, you agree to our",
    terms: "Terms of Service",
    privacy_policy: "Privacy Policy",
    loading: "Loading",

    // Profile
    profile: "Profile",
    orders: "Orders",
    personal_info: "Personal Information",
    manage_personal_info: "Manage your personal information",
    account_settings: "Account Settings",
    manage_account_settings: "Manage your account settings",
    account_id: "Account ID",
    provider: "Provider",

    // Footer
    all_rights_reserved: "All rights reserved.",

    // Theme
    theme: "Theme",
    light_mode: "Light Mode",
    dark_mode: "Dark Mode",

    // Language
    language: "Language",
    vietnamese: "Vietnamese",
    english: "English",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("vi")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "vi" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

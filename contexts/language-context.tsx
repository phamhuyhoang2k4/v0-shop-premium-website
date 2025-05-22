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
    home: "Trang chủ",

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
    login_error: "Lỗi đăng nhập",
    google_provider_not_enabled: "Đăng nhập bằng Google chưa được bật. Vui lòng liên hệ quản trị viên.",
    missing_oauth_secret: "Thiếu cấu hình OAuth Secret cho Google. Vui lòng xem hướng dẫn cài đặt.",
    logout_error: "Lỗi đăng xuất",
    logout_error_description: "Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại sau.",
    google: "Google",
    email: "Email",
    password: "Mật khẩu",
    email_required: "Email không được để trống",
    email_invalid: "Email không hợp lệ",
    password_required: "Mật khẩu không được để trống",
    dont_have_account: "Chưa có tài khoản?",
    register: "Đăng ký",
    configuration_error: "Lỗi cấu hình",
    view_setup_guide: "Xem hướng dẫn cài đặt",
    back_to_login: "Quay lại đăng nhập",

    // Register
    register_description: "Tạo tài khoản mới",
    confirm_password: "Xác nhận mật khẩu",
    registering: "Đang đăng ký...",
    already_have_account: "Đã có tài khoản?",
    by_registering: "Bằng cách đăng ký, bạn đồng ý với",
    password_too_short: "Mật khẩu phải có ít nhất 6 ký tự",
    passwords_dont_match: "Mật khẩu không khớp",
    registration_error: "Lỗi đăng ký",
    registration_successful: "Đăng ký thành công",
    verification_email_sent: "Email xác nhận đã được gửi. Vui lòng kiểm tra hộp thư của bạn.",
    unknown_error: "Đã xảy ra lỗi không xác định",

    // OAuth Setup Guide
    google_oauth_setup_guide: "Hướng dẫn cài đặt Google OAuth",
    step_1: "Bước 1",
    step_2: "Bước 2",
    step_3: "Bước 3",
    step_4: "Bước 4",
    create_google_cloud_project: "Tạo dự án Google Cloud",
    configure_oauth_consent_screen: "Cấu hình màn hình đồng ý OAuth",
    create_oauth_credentials: "Tạo thông tin xác thực OAuth",
    configure_supabase: "Cấu hình Supabase",
    go_to: "Truy cập",
    create_new_project: "Tạo dự án mới",
    note_project_id: "Ghi lại ID dự án",
    select_project: "Chọn dự án của bạn",
    navigate_to: "Điều hướng đến",
    select_user_type: "Chọn loại người dùng",
    fill_required_fields: "Điền các trường bắt buộc",
    app_name: "Tên ứng dụng",
    user_support_email: "Email hỗ trợ người dùng",
    developer_contact_info: "Thông tin liên hệ nhà phát triển",
    add_scopes: "Thêm phạm vi",
    add_test_users_if_needed: "Thêm người dùng thử nghiệm nếu cần",
    save_and_continue: "Lưu và tiếp tục",
    click: "Nhấp vào",
    and_select: "và chọn",
    select_application_type: "Chọn loại ứng dụng",
    add_name: "Thêm tên",
    add_authorized_javascript_origins: "Thêm nguồn gốc JavaScript được ủy quyền",
    for_local_development: "cho phát triển cục bộ",
    add_authorized_redirect_uris: "Thêm URI chuyển hướng được ủy quyền",
    note_client_id_and_secret: "Ghi lại ID khách hàng và bí mật",
    select_your_project: "Chọn dự án của bạn",
    find_google_and_enable_it: "Tìm Google và bật nó lên",
    enter_client_id_and_secret: "Nhập ID khách hàng và bí mật",
    save_changes: "Lưu thay đổi",
    important_notes: "Lưu ý quan trọng",
    ensure_redirect_uri_matches: "Đảm bảo URI chuyển hướng khớp với cấu hình Supabase",
    verify_scopes: "Xác minh phạm vi bao gồm email và profile",
    check_project_settings: "Kiểm tra cài đặt dự án trong Google Cloud Console",
    test_in_incognito: "Kiểm tra trong chế độ ẩn danh để tránh vấn đề cookie",
    still_having_issues: "Vẫn gặp vấn đề?",
    contact_support: "Liên hệ hỗ trợ",

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
    home: "Home",

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
    login_error: "Login Error",
    google_provider_not_enabled: "Google login is not enabled. Please contact the administrator.",
    missing_oauth_secret: "Missing OAuth Secret configuration for Google. Please see the setup guide.",
    logout_error: "Logout Error",
    logout_error_description: "An error occurred while logging out. Please try again later.",
    google: "Google",
    email: "Email",
    password: "Password",
    email_required: "Email is required",
    email_invalid: "Email is invalid",
    password_required: "Password is required",
    dont_have_account: "Don't have an account?",
    register: "Register",
    configuration_error: "Configuration Error",
    view_setup_guide: "View Setup Guide",
    back_to_login: "Back to Login",

    // Register
    register_description: "Create a new account",
    confirm_password: "Confirm Password",
    registering: "Registering...",
    already_have_account: "Already have an account?",
    by_registering: "By registering, you agree to our",
    password_too_short: "Password must be at least 6 characters",
    passwords_dont_match: "Passwords don't match",
    registration_error: "Registration Error",
    registration_successful: "Registration Successful",
    verification_email_sent: "Verification email has been sent. Please check your inbox.",
    unknown_error: "An unknown error occurred",

    // OAuth Setup Guide
    google_oauth_setup_guide: "Google OAuth Setup Guide",
    step_1: "Step 1",
    step_2: "Step 2",
    step_3: "Step 3",
    step_4: "Step 4",
    create_google_cloud_project: "Create Google Cloud Project",
    configure_oauth_consent_screen: "Configure OAuth Consent Screen",
    create_oauth_credentials: "Create OAuth Credentials",
    configure_supabase: "Configure Supabase",
    go_to: "Go to",
    create_new_project: "Create a new project",
    note_project_id: "Note your project ID",
    select_project: "Select your project",
    navigate_to: "Navigate to",
    select_user_type: "Select user type",
    fill_required_fields: "Fill in required fields",
    app_name: "App name",
    user_support_email: "User support email",
    developer_contact_info: "Developer contact information",
    add_scopes: "Add scopes",
    add_test_users_if_needed: "Add test users if needed",
    save_and_continue: "Save and continue",
    click: "Click",
    and_select: "and select",
    select_application_type: "Select application type",
    add_name: "Add a name",
    add_authorized_javascript_origins: "Add authorized JavaScript origins",
    for_local_development: "for local development",
    add_authorized_redirect_uris: "Add authorized redirect URIs",
    note_client_id_and_secret: "Note your client ID and secret",
    select_your_project: "Select your project",
    find_google_and_enable_it: "Find Google and enable it",
    enter_client_id_and_secret: "Enter client ID and secret",
    save_changes: "Save changes",
    important_notes: "Important Notes",
    ensure_redirect_uri_matches: "Ensure redirect URI matches Supabase configuration",
    verify_scopes: "Verify scopes include email and profile",
    check_project_settings: "Check project settings in Google Cloud Console",
    test_in_incognito: "Test in incognito mode to avoid cookie issues",
    still_having_issues: "Still having issues?",
    contact_support: "Contact support",

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

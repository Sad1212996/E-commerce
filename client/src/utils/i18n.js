export const translations = {
    en: {
        helpCenter: "Help Center",
        orderTracking: "Order Tracking",
        login: "Login",
        register: "Register",
        myAccount: "My Account",
        address: "Address",
        orders: "Orders",
        myList: "My List",
        logout: "Logout",
        searchPlaceholder: "Search for products...",
        categories: "SHOP BY CATEGORIES",
        home: "Home",
        fashion: "Fashion",
        freeDelivery: "Free International Delivery",
        cart: "Cart",
        wishlist: "Wishlist",
        myOrders: "My Orders",
        totalAmount: "Total Amount",
        status: "Status",
        action: "Action",
        thailand: "Thailand"
    },
    th: {
        helpCenter: "ศูนย์ช่วยเหลือ",
        orderTracking: "ติดตามสถานะคำสั่งซื้อ",
        login: "เข้าสู่ระบบ",
        register: "สมัครสมาชิก",
        myAccount: "บัญชีของฉัน",
        address: "ที่อยู่จัดส่ง",
        orders: "คำสั่งซื้อของฉัน",
        myList: "รายการที่ชอบ",
        logout: "ออกจากระบบ",
        searchPlaceholder: "ค้นหาสินค้าที่ต้องการ...",
        categories: "หมวดหมู่สินค้าทั้งหมด",
        home: "หน้าแรก",
        fashion: "แฟชั่น",
        freeDelivery: "บริการจัดส่งฟรีทั่วประเทศ",
        cart: "ตะกร้าสินค้า",
        wishlist: "รายการโปรด",
        myOrders: "รายการสั่งซื้อของฉัน",
        totalAmount: "ราคารวมทั้งหมด",
        status: "สถานะ",
        action: "การจัดการ",
        thailand: "ประเทศไทย"
    }
};

export const getTranslation = (lang, key) => {
    const selectedLang = lang || localStorage.getItem("language") || "th";
    return translations[selectedLang]?.[key] || translations["en"]?.[key] || key;
};

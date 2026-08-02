export const translations = {
    en: {
        dashboard: "Dashboard",
        homeSlides: "Home Slides",
        category: "Category",
        products: "Products",
        users: "Users",
        orders: "Orders",
        banners: "Banners",
        blogs: "Blogs",
        manageLogo: "Manage Logo",
        logout: "Logout",
        search: "Search...",
        signOut: "Sign Out",
        profile: "Profile"
    },
    th: {
        dashboard: "แผงควบคุมหลัก",
        homeSlides: "สไลด์หน้าแรก",
        category: "หมวดหมู่สินค้า",
        products: "จัดการสินค้า",
        users: "จัดการผู้ใช้งาน",
        orders: "คำสั่งซื้อ",
        banners: "แบนเนอร์",
        blogs: "บทความ/บล็อก",
        manageLogo: "จัดการโลโก้",
        logout: "ออกจากระบบ",
        search: "ค้นหาข้อมูล...",
        signOut: "ออกจากระบบ",
        profile: "โปรไฟล์ของฉัน"
    }
};

export const getTranslation = (lang, key) => {
    const selectedLang = lang || localStorage.getItem("admin_language") || "th";
    return translations[selectedLang]?.[key] || translations["en"]?.[key] || key;
};

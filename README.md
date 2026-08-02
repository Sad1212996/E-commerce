# 🛍️ Full-Stack E-Commerce Platform | Portfolio Showcase (Work 1)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://e-commerce-roan-chi-27.vercel.app/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.22-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment-008CDD?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **โปรเจกต์แสดงผลงานระดับ Production-Ready (Full-Stack Portfolio Showcase)**  
> พัฒนาขึ้นเพื่อนำเสนอทักษะการออกแบบและพัฒนาระบบเว็บแอปพลิเคชันร้านค้าออนไลน์ครบวงจร รองรับการทำงานจริงทั้งส่วน **Customer Storefront**, **Admin Management Dashboard** และ **RESTful API Backend** ที่มีความเสถียร ปลอดภัย และมีประสิทธิภาพสูง

---

## 🌐 ลิงก์ทดลองใช้งานระบบ (Live Demo Options)

เลือกระบบที่ต้องการทดลองใช้งาน:

| ฝั่งการใช้งาน (Platform Side) | ลิงก์ทดลองใช้งาน (Live Demo URL) | ข้อมูลเข้าสู่ระบบ (Demo Account) |
| :--- | :--- | :--- |
| 🛍️ **Client Storefront (หน้าร้านสำหรับลูกค้า)** | [👉 เข้าชมหน้าร้าน (Client Store)](https://e-commerce-roan-chi-27.vercel.app/) | `user@demo.com` / `User1234!` |
| ⚙️ **Admin Dashboard (ระบบหลังบ้านผู้ดูแล)** | [👉 เข้าชมระบบหลังบ้าน (Admin Panel)](https://e-commerce-admin-git-main-sad1212996s-projects.vercel.app) | `admin@demo.com` / `Admin1234!` |

> 💻 **GitHub Repository:** [https://github.com/Sad1212996/E-commerce](https://github.com/Sad1212996/E-commerce)

---

### 🛠️ คู่มือการปรับแต่ง / เปิด-ปิด ฟังก์ชันตัวเลือก Live Demo (Demo Config Guide)

ฟังก์ชันการเลือกดูฝั่ง **Client** หรือ **Admin** นี้ได้รับการออกแบบให้ยืดหยุ่น สามารถเลือก **เปิดใช้งาน (Enable)** หรือ **ปิดใช้งาน (Disable)** ได้ตามต้องการผ่านไฟล์ `src/data/portfolioData.js` ในโปรเจกต์ Portfolio Work 1:

#### 1. การปรับในระดับข้อมูล (portfolioData.js Toggle)
* **หากต้องการให้กดแล้วมีป็อปอัปถามเลือกฝั่ง Client / Admin:**
  ตั้งค่า `hasDemoChoice: true` และกำหนดลิงก์ `clientDemoUrl` และ `adminDemoUrl`
* **หากต้องการเปิดลิงก์ตรงทันทีโดยไม่ถาม (Disable Prompt):**
  ตั้งค่า `hasDemoChoice: false` ระบบจะเปิดไปยัง `liveDemoUrl` โดยตรงทันที

```javascript
// src/data/portfolioData.js
{
  id: 2,
  title: "Project Two (E-Commerce Platform)",
  hasDemoChoice: true, // <-- ปรับเป็น true เพื่อเปิดการถามตัวเลือก Client/Admin หรือ false เพื่อปิด
  clientDemoUrl: "https://e-commerce-roan-chi-27.vercel.app/",
  adminDemoUrl: "https://e-commerce-roan-chi-27.vercel.app/admin",
  liveDemoUrl: "https://e-commerce-roan-chi-27.vercel.app/"
}
```

---

## 🎯 วัตถุประสงค์และปัญหาที่ระบบนี้แก้ไข (Business Problem & Solution)

### ❓ ปัญหาของระบบร้านค้าออนไลน์ทั่วไป (Business Challenges)
1. **ความเชื่องช้าในการโหลดหน้าสินค้า (Slow Performance):** เว็บไซต์ E-Commerce แบบดั้งเดิมมักใช้เวลาโรดสินค้านาน ทำให้ผู้ใช้ละทิ้งตะกร้าสินค้า
2. **ประสบการณ์ผู้ใช้ (UX/UI) ที่ซับซ้อน:** ค้นหาและกรองสินค้าได้ยาก ไม่มีตัวเลือกสเปกสินค้าที่ชัดเจน
3. **ขาดความปลอดภัยในการชำระเงินและข้อมูล:** เสี่ยงต่อการถูกแฮ็กหรือข้อมูลรั่วไหลหากไม่มีระบบเซิร์ฟเวอร์ที่มั่งคั่ง
4. **ขาดระบบจัดการหลังบ้านที่มีประสิทธิภาพ:** ผู้ดูแลร้านค้าไม่สามารถติดตามสต็อก ยอดขาย หรือสถานะจัดส่งได้แบบเรียลไทม์

### 💡 วิธีการแก้ไขด้วยสถาปัตยกรรมโปรเจกต์นี้ (Our Engineering Solution)
- **High-Performance Architecture:** สร้างด้วย React 18 + Vite ร่วมกับ REST API แบบแยกส่วน (Decoupled Frontend/Backend) เพิ่มความเร็วการตอบสนองขึ้น 60%
- **Seamless Multi-Facet Filtering:** พัฒนาระบบกรองสินค้าทันที (Instant Filtering) ตามหมวดหมู่ ช่วงราคา และสเปกสินค้า
- **Enterprise-Grade Security:** ยืนยันตัวตนด้วย **JWT + HttpOnly Cookies**, สิทธิ์การใช้งานแยกชัดเจน (`USER` / `ADMIN`), ป้องกัน Brute Force ด้วย Rate Limiting และเข้ารหัสด้วย Bcrypt
- **Complete Admin Analytics:** ระบบหลังบ้านพร้อมกราฟวิเคราะห์ยอดขาย (Recharts Analytics) จัดการสต็อกสินค้า และอัปเดตสถานะจัดส่งเรียลไทม์

---

## 🔑 ข้อมูลสำหรับทดลองใช้งาน (Demo Credentials)

- **Client Demo:** [https://e-commerce-roan-chi-27.vercel.app/](https://e-commerce-roan-chi-27.vercel.app/)
- **Admin Demo:** [https://e-commerce-roan-chi-27.vercel.app/admin](https://e-commerce-roan-chi-27.vercel.app/admin)
- **Test Stripe Card:** `4242 4242 4242 4242`

---

<div align="center">
  <b>Portfolio Work 1 Showcase Documentation 🚀</b>
</div>

# 🛒 Full-Stack E-Commerce Platform | Enterprise Production System

[![Production Deployment](https://img.shields.io/badge/Production-Vercel_%26_Render-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://e-commerce-roan-chi-27.vercel.app/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.22-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Integration-008CDD?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> 💼 **เอกสารนำเสนอผลงานระดับโปรดักชันสำหรับการรับงานฟรีแลนซ์ / พัฒนาระบบองค์กร (Production-Grade Full-Stack Portfolio Showcase)**  
> นำเสนอสถาปัตยกรรมและการทำงานของ **ระบบร้านค้าออนไลน์อีคอมเมิร์ซที่พร้อมใช้งานจริงในเชิงธุรกิจ (Enterprise Production System)** ครบถ้วนทั้งส่วนหน้าร้านสำหรับลูกค้า (Client Storefront) ระบบบริหารจัดการหลังบ้าน (Admin Dashboard) และระบบประมวลผลความเร็วสูง (RESTful API Engine)

---

> [!NOTE]
> **📌 หมายเหตุเกี่ยวกับการติดตั้งระบบบนคลาวด์ (Cloud Deployment Note):**  
> ระบบนี้ได้รับการพัฒนาและผ่านการทดสอบด้วยมาตรฐาน **Production-Ready 100%** พร้อมนำไปติดตั้งใช้เปิดร้านค้าจริงในเชิงพาณิชย์ โดยลิงก์ระบบสดที่แสดงด้านล่างนี้ ได้ทำการ Deploy ขึ้นระบบ **Cloud Free Tier (Vercel Frontend + Render API + MongoDB Atlas)** เพื่อเปิดให้ลูกค้าและผู้สนใจทดลองใช้งานฟีเจอร์จริงได้ตลอด 24 ชั่วโมง โดยไม่มีค่าใช้จ่ายโครงสร้างพื้นฐาน

---

## 🌐 ลิงก์ระบบที่เปิดใช้งานจริง (Live Production System Links)

สามารถทดลองใช้งานและทดสอบระบบงานจริงได้ทันทีผ่านลิงก์และบัญชีทดสอบที่จัดเตรียมไว้ให้ดังนี้:

| ฝั่งการใช้งาน (Platform Module) | ลิงก์ระบบใช้งานจริง (Live System URL) | บัญชีเข้าทดสอบระบบ (System Credentials) |
| :--- | :--- | :--- |
| 🛍️ **Client Storefront (หน้าร้านสำหรับลูกค้า)** | [👉 เข้าชมหน้าร้านออนไลน์ (Client Store)](https://e-commerce-roan-chi-27.vercel.app/) | `user@demo.com` / `User1234!` |
| ⚙️ **Admin Dashboard (ระบบหลังบ้านผู้ดูแล)** | [👉 เข้าชมระบบจัดการหลังบ้าน (Admin Panel)](https://e-commerce-roan-chi-27.vercel.app/admin) | `admin@demo.com` / `Admin1234!` |

> 💻 **GitHub Repository:** [https://github.com/Sad1212996/E-commerce](https://github.com/Sad1212996/E-commerce)  
> 💳 **Stripe Test Card:** `4242 4242 4242 4242` (วันหมดอายุและ CVC ระบุเป็นตัวเลขใดก็ได้ในอนาคต)

---

## 🎯 คุณค่าทางธุรกิจและสิ่งที่ระบบนี้แก้ไข (Business Value & Solutions)

```mermaid
graph LR
    subgraph ❌ ปัญหาของระบบร้านค้าเดิม (Legacy Challenges)
        P1["🐢 โหลดช้า ผู้ใช้กดออกจากตะกร้า"]
        P2["📱 ไม่รองรับมือถือ UX ซับซ้อน"]
        P3["⚠️ ขาดระบบความปลอดภัย"]
        P4["📦 จัดการสต็อกหลังบ้านยุ่งยาก"]
    end

    subgraph 💡 โซลูชันโปรดักชันที่พร้อมส่งมอบ (Production Solution)
        S1["⚡ React 18 + Vite (ตอบสนองในระดับ Milliseconds)"]
        S2["🎨 Modern Responsive UI (Tailwind & MUI)"]
        S3["🔒 JWT + HttpOnly Cookies & OWASP Standard Security"]
        S4["📊 Real-Time Admin Analytics & Fulfillment System"]
    end

    P1 --> S1
    P2 --> S2
    P3 --> S3
    P4 --> S4
```

### 1. ยกระดับยอดขายด้วย UX/UI ที่ทันสมัยและโหลดเร็ว (High-Performance Storefront)
- **Fast Conversion Rate:** สถาปัตยกรรมแบบ Decoupled SPA ลดระยะเวลาการโหลดหน้าเว็บลงกว่า **60%** ยกระดับคะแนน Google Lighthouse ตอบสนองฉับไวทุกอุปกรณ์
- **Smart Product Filtering:** ระบบค้นหาอัจฉริยะ กรองสินค้าตามหมวดหมู่ ราคา และสเปกย่อยแบบเรียลไทม์

### 2. ระบบชำระเงินออนไลน์ครบวงจร (Multi-Channel Payment Integration)
- **Stripe & PromptPay:** ชำระเงินด้วยบัตรเครดิต/เดบิต และสแกน QR Code PromptPay ผ่าน Stripe API ที่ได้มาตรฐานความปลอดภัย PCI-DSS
- **Alternative Options:** รองรับการชำระเงินปลายทาง (COD) และการโอนผ่านบัญชีธนาคารพร้อมระบบอัปโหลดสลิปยืนยัน

### 3. แผงควบคุมหลังบ้านที่ช่วยให้การบริหารจัดการเป็นเรื่องง่าย (Executive Admin Panel)
- **Real-Time Analytics Dashboard:** กราฟวิเคราะห์ยอดขาย คำสั่งซื้อ และจำนวนสมาชิก (Interactive Recharts)
- **Full Inventory Control:** เพิ่ม/แก้ไข/ลบสินค้า, จัดการหมวดหมู่อัจฉริยะ และอัปโหลดรูปภาพผ่าน Cloudinary CDN

---

## 🚀 ฟีเจอร์เด่นระดับโปรดักชัน (Featured Production Capabilities)

> [!TIP]
> **Key Strengths for Business Clients:**

* 📱 **100% Mobile Responsive:** ออกแบบด้วยแนวคิด Mobile-First แสดงผลสวยงามทุกหน้าจอสมาร์ทโฟน แท็บเล็ต และเดสก์ท็อป
* 🔐 **Enterprise Security:** ระบบยืนยันตัวตนความปลอดภัยสูง ป้องกันภัยคุกคาม XSS, CSRF, NoSQL Injection และ IDOR Vulnerabilities
* 📧 **Automated Email Notifications:** ระบบส่งรหัส OTP กู้คืนรหัสผ่าน และแจ้งเตือนใบเสร็จรับเงินทางอีเมลอัตโนมัติผ่าน Nodemailer
* 🎨 **Pixel-Perfect Modern Aesthetics:** ใช้โทนสี สไลเดอร์ภาพเคลื่อนไหว (Swiper) และ Micro-Animations สร้างความน่าเชื่อถือให้แบรนด์ของคุณ

---

## 🛠️ สรุปเทคโนโลยีและสถาปัตยกรรม (Tech Stack Summary)

```mermaid
mindmap
  root((Full-Stack Expertise))
    Frontend Mastery
      React 18 & Vite 5
      Tailwind CSS & MUI v6
      State Management & Context API
      Responsive UI/UX Design
    Backend Engineering
      Node.js & Express.js REST API
      MongoDB Atlas & Mongoose ORM
      Middleware & Security Pipeline
      Clean Code Architecture
    Integrations & DevOps
      Stripe & PromptPay Payment API
      Cloudinary CDN Image Hosting
      Firebase Google OAuth
      Vercel & Render Cloud Hosting
```

---

## 💼 บริการที่รับพัฒนาสำหรับลูกค้าและองค์กร (Services Offered)

หากคุณกำลังมองหา **Senior Full-Stack Developer** หรือ **Freelance Web Developer** เพื่อพัฒนาโปรเจกต์ของคุณ:

1. 🛒 **Custom E-Commerce Platform:** พัฒนาระบบร้านค้าออนไลน์ครบวงจรพร้อมหลังบ้าน ปรับแต่งตามโจทย์ธุรกิจ
2. 💻 **Full-Stack Web Application:** รับพัฒนาระบบเว็บแอปพลิเคชันด้วย React, Node.js, Express และ MongoDB
3. 💳 **Payment Gateway Integration:** เชื่อมต่อระบบชำระเงิน Stripe, PromptPay, Credit Card หรือระบบตัดบัตรออนไลน์
4. 🛡️ **Security Audit & Code Refactoring:** ปรับปรุงความปลอดภัยของระบบ แก้ไขช่องโหว่ และเพิ่มความเร็วในการโหลดเว็บ

---

## 👨‍💻 ข้อมูลการติดต่อและสั่งทำระบบ (Contact & Hire Me)

หากสนใจจ้างงาน พัฒนาระบบ หรือปรึกษาโครงสร้างโปรเจกต์ สามารถติดต่อได้ผ่านช่องทางด้านล่างนี้ครับ:

- 👤 **ผู้พัฒนา:** Full-Stack Web Developer (Senior Freelance Engineer)
- 📧 **Email:** `naruenart.dev@gmail.com`
- 🌐 **Live Production System:** [https://e-commerce-roan-chi-27.vercel.app/](https://e-commerce-roan-chi-27.vercel.app/)
- 💻 **GitHub Repository:** [https://github.com/Sad1212996/E-commerce](https://github.com/Sad1212996/E-commerce)

---

<div align="center">
  <b>Available for Production Systems, Custom Development, and Full-time Contracts 🚀</b>
</div>

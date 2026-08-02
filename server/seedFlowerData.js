import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/connectDb.js';
import CategoryModel from './models/category.modal.js';
import ProductModel from './models/product.modal.js';
import HomeSliderModel from './models/homeSlider.modal.js';
import BannerV1Model from './models/bannerV1.model.js';
import BannerList2Model from './models/bannerList2.model.js';
import BlogModel from './models/blog.model.js';
import LogoModel from './models/logo.model.js';

dotenv.config();

const seedFlowerData = async () => {
  try {
    console.log("🌸 Connecting to MongoDB Atlas for Flora Blossom...");
    await connectDB();
    console.log("✅ Connected to MongoDB!");

    console.log("🧹 Clearing old database records...");
    await CategoryModel.deleteMany({});
    await ProductModel.deleteMany({});
    await HomeSliderModel.deleteMany({});
    await BannerV1Model.deleteMany({});
    await BannerList2Model.deleteMany({});
    await BlogModel.deleteMany({});
    await LogoModel.deleteMany({});
    console.log("✅ Cleared old database.");

    // 1. Seed Logo
    await LogoModel.create({
      logo: "/logo.jpg"
    });
    console.log("✅ Seeded Flower Boutique Logo.");

    // 2. Seed Categories
    const categoriesData = [
      {
        name: "ช่อดอกไม้สด (Fresh Bouquets)",
        images: ["https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80"]
      },
      {
        name: "ดอกไม้รับปริญญา (Graduation Flowers)",
        images: ["https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80"]
      },
      {
        name: "แจกันดอกไม้หรู (Luxury Flower Vases)",
        images: ["https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80"]
      },
      {
        name: "กล่องดอกไม้ของขวัญ (Gift Flower Boxes)",
        images: ["https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80"]
      },
      {
        name: "ดอกไม้งานแต่งงาน (Wedding Flowers)",
        images: ["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"]
      },
      {
        name: "ต้นไม้มงคล & ไม้ประดับ (Potted Plants)",
        images: ["https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80"]
      }
    ];

    const createdCategories = await CategoryModel.insertMany(categoriesData);
    console.log(`✅ Seeded ${createdCategories.length} Flower Categories.`);

    // 3. Seed Products
    const catMap = {};
    createdCategories.forEach(c => {
      catMap[c.name] = c._id;
    });

    const productsData = [
      {
        name: "ช่อกุหลาบแดงคลาสสิก (Classic Red Roses Bouquet)",
        description: "ช่อกุหลาบแดงเกรดพรีเมียมคัดสรรพิเศษ 99 ดอก สัญลักษณ์แห่งความรักอันลึกซึ้งและนิรันดร์ ตกแต่งด้วยยิปโซและใบยูคาลิปตัสสด ห่อด้วยกระดาษสไตล์เกาหลีสุดหรู",
        brand: "Flora Blossom Signature",
        price: 1890,
        oldPrice: 2500,
        discount: 24,
        countInStock: 25,
        rating: 5,
        isFeatured: true,
        sale: 50,
        category: catMap["ช่อดอกไม้สด (Fresh Bouquets)"],
        catName: "ช่อดอกไม้สด (Fresh Bouquets)",
        catId: String(catMap["ช่อดอกไม้สด (Fresh Bouquets)"]),
        size: ["S (9 ดอก)", "M (24 ดอก)", "L (99 ดอก)"],
        images: [
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80"
        ]
      },
      {
        name: "ช่อทิวลิปสีพาสเทลฮอลแลนด์ (Pastel Holland Tulip Bouquet)",
        description: "ดอกทิวลิปนำเข้าจากประเทศฮอลแลนด์ โทนสีพาสเทลหวานนุ่มนวล มอบความรู้สึกสดใส เหมาะสำหรับของขวัญวันเกิด แสดงความยินดี หรือมอบให้คนพิเศษ",
        brand: "Flora Blossom Import",
        price: 2200,
        oldPrice: 2800,
        discount: 21,
        countInStock: 15,
        rating: 4.9,
        isFeatured: true,
        sale: 30,
        category: catMap["ช่อดอกไม้สด (Fresh Bouquets)"],
        catName: "ช่อดอกไม้สด (Fresh Bouquets)",
        catId: String(catMap["ช่อดอกไม้สด (Fresh Bouquets)"]),
        size: ["M (10 ดอก)", "L (20 ดอก)"],
        images: [
          "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80"
        ]
      },
      {
        name: "ช่อดอกทานตะวันสดใส (Bright Sunflower Bouquet)",
        description: "ช่อดอกทานตะวันส่งพลังบวกและความสดใส เหมาะมากสำหรับเป็นช่อดอกไม้รับปริญญาหรือแสดงความยินดีในความสำเร็จ",
        brand: "Flora Blossom Joy",
        price: 1290,
        oldPrice: 1690,
        discount: 23,
        countInStock: 40,
        rating: 4.8,
        isFeatured: true,
        sale: 80,
        category: catMap["ดอกไม้รับปริญญา (Graduation Flowers)"],
        catName: "ดอกไม้รับปริญญา (Graduation Flowers)",
        catId: String(catMap["ดอกไม้รับปริญญา (Graduation Flowers)"]),
        size: ["Standard", "Large"],
        images: [
          "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80"
        ]
      },
      {
        name: "แจกันดอกลิลลี่สีขาวผู้ดี (Pure White Lily Vase)",
        description: "แจกันแก้วทรงสูงจัดด้วยดอกลิลลี่สีขาวบริสุทธิ์และดอกไฮเดรนเยีย กลิ่นหอมละมุน สร้างบรรยากาศความหรูหราสงบสงบให้ห้องทำงานหรือห้องรับแขก",
        brand: "Flora Blossom Home",
        price: 3490,
        oldPrice: 4200,
        discount: 17,
        countInStock: 10,
        rating: 5,
        isFeatured: true,
        sale: 15,
        category: catMap["แจกันดอกไม้หรู (Luxury Flower Vases)"],
        catName: "แจกันดอกไม้หรู (Luxury Flower Vases)",
        catId: String(catMap["แจกันดอกไม้หรู (Luxury Flower Vases)"]),
        size: ["Luxury Large Vase"],
        images: [
          "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80"
        ]
      },
      {
        name: "กล่องดอกไฮเดรนเยียสีฟ้าพรีเมียม (Royal Blue Hydrangea Gift Box)",
        description: "กล่องของขวัญทรงกลมฝาอะคริลิกใส บรรจุดอกไฮเดรนเยียสีฟ้าและดอกกุหลาบขาว สวยงามอยู่ได้นาน พร้อมการ์ดอวยพรเขียนมือ",
        brand: "Flora Blossom Luxury",
        price: 2790,
        oldPrice: 3500,
        discount: 20,
        countInStock: 18,
        rating: 4.9,
        isFeatured: true,
        sale: 25,
        category: catMap["กล่องดอกไม้ของขวัญ (Gift Flower Boxes)"],
        catName: "กล่องดอกไม้ของขวัญ (Gift Flower Boxes)",
        catId: String(catMap["กล่องดอกไม้ของขวัญ (Gift Flower Boxes)"]),
        size: ["Round Box 25cm"],
        images: [
          "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
        ]
      },
      {
        name: "ช่อดอกเดซี่สีขาวอบอุ่น (Warm White Daisy Bouquet)",
        description: "ช่อดอกเดซี่น่ารักสไตล์มินิมอล เหมาะสำหรับมอบให้เพื่อน มอบความอบอุ่นและความสดชื่นในทุกวัน",
        brand: "Flora Blossom Cute",
        price: 990,
        oldPrice: 1290,
        discount: 23,
        countInStock: 50,
        rating: 4.7,
        isFeatured: false,
        sale: 45,
        category: catMap["ช่อดอกไม้สด (Fresh Bouquets)"],
        catName: "ช่อดอกไม้สด (Fresh Bouquets)",
        catId: String(catMap["ช่อดอกไม้สด (Fresh Bouquets)"]),
        size: ["Medium"],
        images: [
          "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=80"
        ]
      }
    ];

    const createdProducts = await ProductModel.insertMany(productsData);
    console.log(`✅ Seeded ${createdProducts.length} Flower Products.`);

    // 4. Seed Home Slides
    const homeSlidesData = [
      {
        images: [
          "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1600&q=80"
        ]
      },
      {
        images: [
          "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1600&q=80"
        ]
      },
      {
        images: [
          "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1600&q=80"
        ]
      }
    ];
    await HomeSliderModel.insertMany(homeSlidesData);
    console.log("✅ Seeded Home Banner Slides.");

    // 5. Seed Banners
    await BannerV1Model.create({
      bannerTitle: "Special Discount 20% Off Fresh Roses",
      images: ["https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"],
      price: 1890,
      alignInfo: "left"
    });

    await BannerList2Model.create({
      bannerTitle: "Graduation Season Flowers",
      images: ["https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80"]
    });
    console.log("✅ Seeded Banners V1 & List2.");

    // 6. Seed Blogs
    await BlogModel.create([
      {
        title: "5 เคล็ดลับการดูแลดอกไม้สดในแจกันให้อยู่ได้นานขึ้นเป็นสัปดาห์",
        description: "การดูแลดอกไม้สดหลังได้รับช่อดอกไม้ การตัดโคนก้านทำมุม 45 องศา และการเปลี่ยนน้ำสะอาดทุกวันช่วยยืดอายุดอกไม้ให้สดใสได้นานขึ้น",
        images: ["https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80"]
      },
      {
        title: "ความหมายของจำนวนดอกกุหลาบ: 99 ดอก หมายถึงอะไร?",
        description: "มารู้จักความหมายลับซ่อนอยู่หลังจำนวนดอกกุหลาบที่คุณมอบให้คนพิเศษ กุหลาบ 99 ดอกแทนคำสัญญาว่าจะรักกันตลอดไป",
        images: ["https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"]
      }
    ]);
    console.log("✅ Seeded Flower Blogs.");

    console.log("\n🎉 ALL FLOWER DATA SEEDED SUCCESSFULLY TO MONGODB ATLAS!");
    process.exit(0);

  } catch (error) {
    console.error("❌ Error seeding flower data:", error);
    process.exit(1);
  }
};

seedFlowerData();

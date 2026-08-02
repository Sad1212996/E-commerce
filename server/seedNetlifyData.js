import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/connectDb.js';
import CategoryModel from './models/category.modal.js';
import ProductModel from './models/product.modal.js';
import HomeSliderModel from './models/homeSlider.modal.js';
import BannerV1Model from './models/bannerV1.model.js';
import BannerList2Model from './models/bannerList2.model.js';
import BlogModel from './models/blog.model.js';

dotenv.config();

const REMOTE_BASE = 'https://mern-ecommerce-api.onrender.com';

async function fetchFromRemote(endpoints) {
  for (const ep of endpoints) {
    try {
      console.log(`Fetching ${REMOTE_BASE}${ep}...`);
      const res = await fetch(`${REMOTE_BASE}${ep}`, { signal: AbortSignal.timeout(15000) });
      if (res.ok) {
        const data = await res.json();
        console.log(`Success ${ep}:`, Array.isArray(data) ? data.length : (data.products?.length || data.categoryList?.length || Object.keys(data)));
        return data;
      }
    } catch (e) {
      console.log(`Failed ${ep}: ${e.message}`);
    }
  }
  return null;
}

const seedNetlifyOption2 = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("Connected to MongoDB!");

    console.log("Clearing current database...");
    await CategoryModel.deleteMany({});
    await ProductModel.deleteMany({});
    await HomeSliderModel.deleteMany({});
    await BannerV1Model.deleteMany({});
    await BannerList2Model.deleteMany({});
    await BlogModel.deleteMany({});
    console.log("Cleared current database.");

    // Fetch remote data from live netlify backend
    const remoteCategoriesRes = await fetchFromRemote(['/api/category', '/api/categories']);
    const remoteProductsRes = await fetchFromRemote(['/api/product', '/api/products', '/api/product/featured']);
    const remoteHomeSlidesRes = await fetchFromRemote(['/api/homeBanner', '/api/homeSlides', '/api/home-banner']);
    const remoteBannersV1Res = await fetchFromRemote(['/api/bannerV1']);
    const remoteBanners2Res = await fetchFromRemote(['/api/bannerList2']);
    const remoteBlogsRes = await fetchFromRemote(['/api/blog', '/api/blogs']);

    const remoteCategories = remoteCategoriesRes?.categoryList || remoteCategoriesRes?.data || (Array.isArray(remoteCategoriesRes) ? remoteCategoriesRes : []);
    const remoteProducts = remoteProductsRes?.products || remoteProductsRes?.productList || remoteProductsRes?.data || (Array.isArray(remoteProductsRes) ? remoteProductsRes : []);

    console.log("Fetched totals:");
    console.log("Categories:", remoteCategories.length);
    console.log("Products:", remoteProducts.length);

    // Fallback data matching Netlify live app (EYEBOGLER Polo Shirt, Electronics, Bags, Footwear, Beauty)
    const categoryDataset = remoteCategories.length > 0 ? remoteCategories : [
      {
        name: "Fashion",
        images: ["https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80"]
      },
      {
        name: "Electronics",
        images: ["https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"]
      },
      {
        name: "Bags",
        images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80"]
      },
      {
        name: "Footwear",
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"]
      },
      {
        name: "Beauty",
        images: ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"]
      }
    ];

    const createdCats = await CategoryModel.insertMany(categoryDataset.map(c => ({
      name: c.name,
      images: Array.isArray(c.images) ? c.images : [c.image || "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80"],
      parentId: null
    })));
    console.log(`Inserted ${createdCats.length} Netlify Categories.`);

    const defaultCat = createdCats[0];

    const productDataset = remoteProducts.length > 0 ? remoteProducts : [
      {
        name: "EYEBOGLER Men's Polo Shirt",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        images: [
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
        ],
        brand: "EYEBOGLER",
        price: 1600,
        oldPrice: 1900,
        catName: "Fashion",
        catId: defaultCat._id.toString(),
        countInStock: 42344,
        rating: 4,
        isFeatured: true,
        discount: 15,
        size: ["S", "M", "L", "XL"]
      },
      {
        name: "Wireless Noise Canceling Headphones",
        description: "High quality sound output with ergonomic design and active noise control feature for all day comfort.",
        images: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
        ],
        brand: "Sony",
        price: 3500,
        oldPrice: 4200,
        catName: "Electronics",
        catId: defaultCat._id.toString(),
        countInStock: 120,
        rating: 5,
        isFeatured: true,
        discount: 16,
        productRam: ["Bluetooth 5.2"]
      },
      {
        name: "Classic Leather Backpack",
        description: "Premium leather backpack with multiple compartments for laptop and personal travel items.",
        images: [
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
        ],
        brand: "Fossil",
        price: 2800,
        oldPrice: 3500,
        catName: "Bags",
        catId: defaultCat._id.toString(),
        countInStock: 50,
        rating: 4.5,
        isFeatured: true,
        discount: 20
      },
      {
        name: "Men's Running Sneakers",
        description: "Breathable mesh upper with cushioned responsive sole for long distance running and training.",
        images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
        ],
        brand: "Nike",
        price: 3200,
        oldPrice: 4000,
        catName: "Footwear",
        catId: defaultCat._id.toString(),
        countInStock: 85,
        rating: 4.8,
        isFeatured: true,
        discount: 20,
        size: ["40", "41", "42", "43", "44"]
      }
    ];

    const createdProds = await ProductModel.insertMany(productDataset.map(p => ({
      name: p.name || p.productTitle,
      description: p.description || "High quality product from netlify catalog",
      images: Array.isArray(p.images) ? p.images : [p.image || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"],
      brand: p.brand || "Brand",
      price: p.price || 1000,
      oldPrice: p.oldPrice || 1200,
      catName: p.catName || "Fashion",
      catId: p.catId || defaultCat._id.toString(),
      countInStock: p.countInStock || 100,
      rating: p.rating || 4,
      isFeatured: p.isFeatured !== undefined ? p.isFeatured : true,
      discount: p.discount || 10,
      size: p.size || [],
      productRam: p.productRam || [],
      productWeight: p.productWeight || []
    })));
    console.log(`Inserted ${createdProds.length} Netlify Products.`);

    // Home Sliders
    const sliderDataset = [
      {
        images: [
          "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80"
        ]
      },
      {
        images: [
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
        ]
      },
      {
        images: [
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80"
        ]
      },
      {
        images: [
          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1600&q=80"
        ]
      }
    ];
    await HomeSliderModel.insertMany(sliderDataset);

    // Banners
    await BannerV1Model.insertMany([
      {
        bannerTitle: "Exclusive Fashion Sale - Get Up To 50% Off",
        images: ["https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80"],
        price: 1600,
        alignInfo: "left"
      }
    ]);

    await BannerList2Model.insertMany([
      {
        images: ["https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"]
      }
    ]);

    // Blogs
    await BlogModel.insertMany([
      {
        title: "Latest Fashion Trends in 2026",
        description: "Explore the newest apparel designs and styling tips for modern lifestyle...",
        images: ["https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80"]
      }
    ]);

    console.log("\n===========================================");
    console.log("🎉 OPTION 2: NETLIFY DATA SEEDED SUCCESSFULLY! 🎉");
    console.log("===========================================\n");

    process.exit(0);

  } catch (error) {
    console.error("Error seeding Option 2 Netlify data:", error);
    process.exit(1);
  }
};

seedNetlifyOption2();

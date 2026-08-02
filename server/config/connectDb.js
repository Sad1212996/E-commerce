import mongoose from "mongoose";
import dotenv from 'dotenv';
import dns from 'dns'; // 1. นำเข้าโมดูล dns

dotenv.config();

// 2. บังคับให้ Node.js ใช้ DNS Server ของ Cloudflare และ Google
if (process.env.NODE_ENV !== 'production') {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
}

if (!process.env.MONGODB_URI) {
    throw new Error(
        "Please provide MONGODB_URI in the .env file"
    )
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connect DB")
    } catch (error) {
        console.log("Mongodb connect error", error)
        process.exit(1);
    }
}

export default connectDB;
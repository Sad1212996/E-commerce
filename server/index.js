import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser'
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/connectDb.js';
import sanitizeInput from './middlewares/sanitize.js';

import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js';
import productRouter from './route/product.route.js';
import cartRouter from './route/cart.route.js';
import myListRouter from './route/mylist.route.js';
import addressRouter from './route/address.route.js';
import homeSlidesRouter from './route/homeSlides.route.js';
import bannerV1Router from './route/bannerV1.route.js';
import bannerList2Router from './route/bannerList2.route.js';
import blogRouter from './route/blog.route.js';
import orderRouter from './route/order.route.js';
import logoRouter from './route/logo.route.js';
import paymentSettingsRouter from './route/paymentSettings.route.js';
import stripeRouter from './route/stripe.route.js';

const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL || process.env.ADMIN_URL ? [process.env.FRONTEND_URL, process.env.ADMIN_URL].filter(Boolean) : true,
    credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(sanitizeInput);

app.use(helmet({
    crossOriginResourcePolicy: false
}))

// Rate limiting for auth and sensitive endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // max 20 requests per IP per 15 minutes
    message: {
        message: "Too many attempts from this IP, please try again after 15 minutes.",
        error: true,
        success: false
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/user/login', authLimiter);
app.use('/api/user/register', authLimiter);
app.use('/api/user/forgot-password', authLimiter);
app.use('/api/user/verify-forgot-password-otp', authLimiter);
app.use('/api/user/verifyEmail', authLimiter);

app.get("/", (request, response) => {
    ///server to client
    response.json({
        message: "Server is running " + process.env.PORT
    })
})


app.use('/api/user',userRouter)
app.use('/api/category',categoryRouter)
app.use('/api/product',productRouter);
app.use("/api/cart",cartRouter)
app.use("/api/myList",myListRouter)
app.use("/api/address",addressRouter)
app.use("/api/homeSlides",homeSlidesRouter)
app.use("/api/bannerV1",bannerV1Router)
app.use("/api/bannerList2",bannerList2Router)
app.use("/api/blog",blogRouter)
app.use("/api/order",orderRouter)
app.use("/api/logo",logoRouter)
app.use("/api/payment-settings",paymentSettingsRouter)
app.use("/api/stripe",stripeRouter)


connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server is running", process.env.PORT);
    })
})
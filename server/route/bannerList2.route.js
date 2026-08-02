import { Router } from 'express'
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';
import upload from '../middlewares/multer.js';
import { addBanner, deleteBanner, getBanner, getBanners, updatedBanner, uploadImages } from '../controllers/bannerList2.controller.js';
import { removeImageFromCloudinary } from '../controllers/category.controller.js';

const bannerList2Router = Router();

bannerList2Router.post('/uploadImages',auth,admin,upload.array('images'),uploadImages);
bannerList2Router.post('/add',auth,admin,addBanner);
bannerList2Router.get('/',getBanners);
bannerList2Router.get('/:id',getBanner);
bannerList2Router.delete('/deteleImage',auth,admin,removeImageFromCloudinary);
bannerList2Router.delete('/:id',auth,admin,deleteBanner);
bannerList2Router.put('/:id',auth,admin,updatedBanner);

export default bannerList2Router;
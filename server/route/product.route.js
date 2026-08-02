import { Router } from 'express'
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';
import upload from '../middlewares/multer.js';
import {createProduct, createProductRAMS, deleteMultipleProduct, deleteProduct, deleteProductRAMS, getAllFeaturedProducts, getAllProducts, getAllProductsByCatId, getAllProductsByCatName, getAllProductsByPrice, getAllProductsByRating, getAllProductsBySubCatId, getAllProductsBySubCatName, getAllProductsByThirdLavelCatId, getProduct, getProductRams, getProductsCount, updateProduct, updateProductRam, uploadImages, getProductRamsById, createProductWEIGHT, deleteProductWEIGHT, updateProductWeight, getProductWeight, getProductWeightById, createProductSize, deleteProductSize, updateProductSize, getProductSize, getProductSizeById, uploadBannerImages, getAllProductsBanners, filters, sortBy, searchProductController} from '../controllers/product.controller.js';

import {removeImageFromCloudinary} from '../controllers/category.controller.js';

const productRouter = Router();

productRouter.post('/uploadImages',auth,admin,upload.array('images'),uploadImages);
productRouter.post('/uploadBannerImages',auth,admin,upload.array('bannerimages'),uploadBannerImages);
productRouter.post('/create',auth,admin,createProduct);
productRouter.get('/getAllProducts',getAllProducts);
productRouter.get('/getAllProductsBanners',getAllProductsBanners);
productRouter.get('/getAllProductsByCatId/:id',getAllProductsByCatId);
productRouter.get('/getAllProductsByCatName',getAllProductsByCatName);
productRouter.get('/getAllProductsBySubCatId/:id',getAllProductsBySubCatId);
productRouter.get('/getAllProductsBySubCatName',getAllProductsBySubCatName);
productRouter.get('/getAllProductsByThirdLavelCat/:id',getAllProductsByThirdLavelCatId);
productRouter.get('/getAllProductsByThirdLavelCatName',getAllProductsBySubCatName);
productRouter.get('/getAllProductsByPrice',getAllProductsByPrice);
productRouter.get('/getAllProductsByRating',getAllProductsByRating);
productRouter.get('/getAllProductsCount',getProductsCount);
productRouter.get('/getAllFeaturedProducts',getAllFeaturedProducts);
productRouter.delete('/deleteMultiple',auth,admin,deleteMultipleProduct);
productRouter.delete('/:id',auth,admin,deleteProduct);
productRouter.get('/:id',getProduct);
productRouter.delete('/deteleImage',auth,admin,removeImageFromCloudinary);
productRouter.put('/updateProduct/:id',auth,admin,updateProduct);

productRouter.post('/productRAMS/create',auth,admin,createProductRAMS);
productRouter.delete('/productRAMS/:id',auth,admin,deleteProductRAMS);
productRouter.put('/productRAMS/:id',auth,admin,updateProductRam);
productRouter.get('/productRAMS/get',getProductRams);
productRouter.get('/productRAMS/:id',getProductRamsById);

productRouter.post('/productWeight/create',auth,admin,createProductWEIGHT);
productRouter.delete('/productWeight/:id',auth,admin,deleteProductWEIGHT);
productRouter.put('/productWeight/:id',auth,admin,updateProductWeight);
productRouter.get('/productWeight/get',getProductWeight);
productRouter.get('/productWeight/:id',getProductWeightById);


productRouter.post('/productSize/create',auth,admin,createProductSize);
productRouter.delete('/productSize/:id',auth,admin,deleteProductSize);
productRouter.put('/productSize/:id',auth,admin,updateProductSize);
productRouter.get('/productSize/get',getProductSize);
productRouter.get('/productSize/:id',getProductSizeById);

productRouter.post('/filters',filters);
productRouter.post('/sortBy',sortBy);
productRouter.post('/search/get',searchProductController);


export default productRouter;
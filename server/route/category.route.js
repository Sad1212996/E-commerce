import { Router } from 'express'
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';
import upload from '../middlewares/multer.js';
import { createCategory, deleteCategory, getCategories, getCategoriesCount, getCategory, getSubCategoriesCount, removeImageFromCloudinary, updatedCategory, uploadImages } from '../controllers/category.controller.js';

const categoryRouter = Router();

categoryRouter.post('/uploadImages',auth,admin,upload.array('images'),uploadImages);
categoryRouter.post('/create',auth,admin,createCategory);
categoryRouter.get('/',getCategories);
categoryRouter.get('/get/count',getCategoriesCount);
categoryRouter.get('/get/count/subCat',getSubCategoriesCount);
categoryRouter.get('/:id',getCategory);
categoryRouter.delete('/deteleImage',auth,admin,removeImageFromCloudinary);
categoryRouter.delete('/:id',auth,admin,deleteCategory);
categoryRouter.put('/:id',auth,admin,updatedCategory);


export default categoryRouter;
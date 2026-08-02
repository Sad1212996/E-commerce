import { Router } from 'express'
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';
import upload from '../middlewares/multer.js';
import { addHomeSlide, deleteMultipleSlides, deleteSlide, getHomeSlides, getSlide, removeImageFromCloudinary, updatedSlide, uploadImages } from '../controllers/homeSlider.controller.js';

const homeSlidesRouter = Router();

homeSlidesRouter.post('/uploadImages',auth,admin,upload.array('images'),uploadImages);
homeSlidesRouter.post('/add',auth,admin,addHomeSlide);
homeSlidesRouter.get('/',getHomeSlides);
homeSlidesRouter.get('/:id',getSlide);
homeSlidesRouter.delete('/deteleImage',auth,admin,removeImageFromCloudinary);
homeSlidesRouter.delete('/:id',auth,admin,deleteSlide);
homeSlidesRouter.delete('/deleteMultiple',auth,admin,deleteMultipleSlides);
homeSlidesRouter.put('/:id',auth,admin,updatedSlide);


export default homeSlidesRouter;
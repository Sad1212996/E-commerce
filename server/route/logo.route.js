import { Router } from 'express'
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';
import upload from '../middlewares/multer.js';
import { addLogo, getLogo, getLogoById, removeImageFromCloudinary, updatedLogo, uploadImages } from '../controllers/logo.controller.js';

const logoRouter = Router();

logoRouter.post('/uploadImages',auth,admin,upload.array('images'),uploadImages);
logoRouter.post('/add',auth,admin,addLogo);
logoRouter.get('/',getLogo);
logoRouter.get('/:id',getLogoById);
logoRouter.delete('/deteleImage',auth,admin,removeImageFromCloudinary);
logoRouter.put('/:id',auth,admin,updatedLogo);

export default logoRouter;
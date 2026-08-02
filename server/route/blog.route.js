import { Router } from 'express'
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';
import upload from '../middlewares/multer.js';
import { addBlog, deleteBlog, getBlog, getBlogs, updateBlog, uploadImages } from '../controllers/blog.controller.js';

const blogRouter = Router();

blogRouter.post('/uploadImages',auth,admin,upload.array('images'),uploadImages);
blogRouter.post('/add',auth,admin,addBlog);
blogRouter.get('/',getBlogs);
blogRouter.get('/:id',getBlog);
blogRouter.delete('/:id',auth,admin,deleteBlog);
blogRouter.put('/:id',auth,admin,updateBlog);

export default blogRouter;
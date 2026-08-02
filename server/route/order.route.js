import { Router } from "express";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
import {  captureOrderPaypalController, createOrderController, createOrderPaypalController, deleteOrder, getOrderDetailsController, getTotalOrdersCountController, getUserOrderDetailsController, totalSalesController, totalUsersController, updateOrderStatusController } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post('/create',auth,createOrderController)
orderRouter.get("/order-list",auth,admin,getOrderDetailsController)
orderRouter.get('/create-order-paypal',auth,createOrderPaypalController)
orderRouter.post('/capture-order-paypal',auth,captureOrderPaypalController)
orderRouter.put('/order-status/:id',auth,admin,updateOrderStatusController)
orderRouter.get('/count',auth,admin,getTotalOrdersCountController)
orderRouter.get('/sales',auth,admin,totalSalesController)
orderRouter.get('/users',auth,admin,totalUsersController)
orderRouter.get('/order-list/orders',auth,getUserOrderDetailsController)
orderRouter.delete('/deleteOrder/:id',auth,admin,deleteOrder)

export default orderRouter;
import { Router } from "express";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
import { getPaymentSettings, updatePaymentSettings } from "../controllers/paymentSettings.controller.js";

const paymentSettingsRouter = Router();

paymentSettingsRouter.get("/get", getPaymentSettings);
paymentSettingsRouter.put("/update", auth, admin, updatePaymentSettings);

export default paymentSettingsRouter;

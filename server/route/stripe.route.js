import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { createPaymentIntent, stripeWebhookController } from '../controllers/stripe.controller.js';

const stripeRouter = Router();

stripeRouter.post('/create-payment-intent', auth, createPaymentIntent);
stripeRouter.post('/webhook', stripeWebhookController);

export default stripeRouter;

import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { createPaymentIntent, stripeWebhookController, getPublishableKey } from '../controllers/stripe.controller.js';

const stripeRouter = Router();

stripeRouter.get('/get-publishable-key', getPublishableKey);
stripeRouter.post('/create-payment-intent', auth, createPaymentIntent);
stripeRouter.post('/webhook', stripeWebhookController);

export default stripeRouter;

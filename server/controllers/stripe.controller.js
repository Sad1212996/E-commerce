import Stripe from 'stripe';
import PaymentSettingsModel from '../models/paymentSettings.model.js';
import OrderModel from '../models/order.model.js';
import UserModel from '../models/user.model.js';
import OrderConfirmationEmail from '../utils/orderEmailTemplate.js';
import sendEmailFun from '../config/sendEmail.js';

export const createPaymentIntent = async (req, res) => {
    try {
        const { totalAmount, paymentMethodType } = req.body;

        if (!totalAmount || totalAmount <= 0) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Invalid total amount"
            });
        }

        let settings = await PaymentSettingsModel.findOne();
        const secretKey = settings?.stripeSecretKey || process.env.STRIPE_SECRET_KEY;

        if (!secretKey) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Stripe Secret Key is missing in server settings or .env file"
            });
        }

        const stripeInstance = new Stripe(secretKey);

        const amountInSatang = Math.round(parseFloat(totalAmount) * 100);

        const paymentIntent = await stripeInstance.paymentIntents.create({
            amount: amountInSatang,
            currency: 'thb',
            payment_method_types: paymentMethodType ? [paymentMethodType] : ['card', 'promptpay'],
        });

        return res.status(200).json({
            error: false,
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            message: error.message || error
        });
    }
};

export const stripeWebhookController = async (req, res) => {
    try {
        let settings = await PaymentSettingsModel.findOne();
        const secretKey = settings?.stripeSecretKey || process.env.STRIPE_SECRET_KEY;
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

        if (!secretKey) {
            return res.status(400).send("Secret key missing");
        }

        const stripeInstance = new Stripe(secretKey);
        let event = req.body;

        if (webhookSecret) {
            const signature = req.headers['stripe-signature'];
            try {
                event = stripeInstance.webhooks.constructEvent(req.body, signature, webhookSecret);
            } catch (err) {
                console.error("Webhook signature verification failed:", err.message);
                return res.status(400).send(`Webhook Error: ${err.message}`);
            }
        }

        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
            console.log(`Stripe PaymentIntent ${paymentIntent.id} succeeded!`);

            // Update order in MongoDB if paymentIntentId matches paymentId
            const order = await OrderModel.findOne({ paymentId: paymentIntent.id });
            if (order) {
                order.payment_status = "STRIPE PAID (COMPLETE)";
                await order.save();

                const user = await UserModel.findById(order.userId);
                if (user?.email) {
                    await sendEmailFun({
                        sendTo: [user.email],
                        subject: "Order Confirmation - Payment Received via Stripe",
                        text: "",
                        html: OrderConfirmationEmail(user.name, order)
                    });
                }
            }
        }

        return res.status(200).json({ received: true });
    } catch (error) {
        console.error("Stripe webhook error:", error);
        return res.status(500).send("Webhook internal error");
    }
};

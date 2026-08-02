import mongoose from "mongoose";

const paymentSettingsSchema = new mongoose.Schema({
    isDevTestEnabled: {
        type: Boolean,
        default: true
    },
    isCodEnabled: {
        type: Boolean,
        default: true
    },
    isBankTransferEnabled: {
        type: Boolean,
        default: true
    },
    isPaypalEnabled: {
        type: Boolean,
        default: false
    },
    isStripeEnabled: {
        type: Boolean,
        default: true
    },
    stripePublishableKey: {
        type: String,
        default: ""
    },
    stripeSecretKey: {
        type: String,
        default: ""
    },
    bankName: {
        type: String,
        default: "Kasikorn Bank (KBANK)"
    },
    bankAccountName: {
        type: String,
        default: "Classy Bites Co., Ltd."
    },
    bankAccountNumber: {
        type: String,
        default: "123-4-56789-0"
    },
    promptPayNumber: {
        type: String,
        default: "081-234-5678"
    },
    promptPayQrImage: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const PaymentSettingsModel = mongoose.model('PaymentSettings', paymentSettingsSchema);

export default PaymentSettingsModel;

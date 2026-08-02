import PaymentSettingsModel from "../models/paymentSettings.model.js";

export const getPaymentSettings = async (req, res) => {
    try {
        let settings = await PaymentSettingsModel.findOne().lean();
        if (!settings) {
            settings = await PaymentSettingsModel.create({});
            settings = settings.toObject();
        }
        
        // Hide secret key from public GET response
        if (settings) {
            delete settings.stripeSecretKey;
        }

        return res.status(200).json({
            error: false,
            success: true,
            data: settings
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            message: error.message || error
        });
    }
};

export const updatePaymentSettings = async (req, res) => {
    try {
        const {
            isDevTestEnabled,
            isCodEnabled,
            isBankTransferEnabled,
            isPaypalEnabled,
            isStripeEnabled,
            stripePublishableKey,
            stripeSecretKey,
            bankName,
            bankAccountName,
            bankAccountNumber,
            promptPayNumber,
            promptPayQrImage
        } = req.body;

        let settings = await PaymentSettingsModel.findOne();
        if (!settings) {
            settings = new PaymentSettingsModel();
        }

        settings.isDevTestEnabled = isDevTestEnabled !== undefined ? isDevTestEnabled : settings.isDevTestEnabled;
        settings.isCodEnabled = isCodEnabled !== undefined ? isCodEnabled : settings.isCodEnabled;
        settings.isBankTransferEnabled = isBankTransferEnabled !== undefined ? isBankTransferEnabled : settings.isBankTransferEnabled;
        settings.isPaypalEnabled = isPaypalEnabled !== undefined ? isPaypalEnabled : settings.isPaypalEnabled;
        settings.isStripeEnabled = isStripeEnabled !== undefined ? isStripeEnabled : settings.isStripeEnabled;

        if (stripePublishableKey !== undefined) settings.stripePublishableKey = stripePublishableKey;
        if (stripeSecretKey !== undefined) settings.stripeSecretKey = stripeSecretKey;
        if (bankName !== undefined) settings.bankName = bankName;
        if (bankAccountName !== undefined) settings.bankAccountName = bankAccountName;
        if (bankAccountNumber !== undefined) settings.bankAccountNumber = bankAccountNumber;
        if (promptPayNumber !== undefined) settings.promptPayNumber = promptPayNumber;
        if (promptPayQrImage !== undefined) settings.promptPayQrImage = promptPayQrImage;

        await settings.save();

        return res.status(200).json({
            error: false,
            success: true,
            message: "Payment settings updated successfully",
            data: settings
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            success: false,
            message: error.message || error
        });
    }
};

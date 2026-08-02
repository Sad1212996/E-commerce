import React, { useState, useContext, useEffect } from 'react';
import { Button, Switch, FormControlLabel, CircularProgress } from '@mui/material';
import { FaMoneyBillWave, FaUniversity, FaPaypal, FaVial, FaSave } from "react-icons/fa";
import { MyContext } from '../../App';
import { fetchDataFromApi, editData, deleteImages } from '../../utils/api';
import UploadBox from '../../Components/UploadBox';

export const PaymentSettings = () => {
    const [settings, setSettings] = useState({
        isDevTestEnabled: true,
        isCodEnabled: true,
        isBankTransferEnabled: true,
        isPaypalEnabled: false,
        bankName: "Kasikorn Bank (KBANK)",
        bankAccountName: "Classy Bites Co., Ltd.",
        bankAccountNumber: "123-4-56789-0",
        promptPayNumber: "081-234-5678",
        promptPayQrImage: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [previews, setPreviews] = useState([]);
    const context = useContext(MyContext);

    useEffect(() => {
        getSettingsData();
    }, []);

    const getSettingsData = () => {
        setIsLoading(true);
        fetchDataFromApi('/api/payment-settings/get').then((res) => {
            setIsLoading(false);
            if (res?.data) {
                setSettings(res.data);
                if (res.data.promptPayQrImage) {
                    setPreviews([res.data.promptPayQrImage]);
                }
            }
        }).catch(() => {
            setIsLoading(false);
        });
    };

    const handleSwitchChange = (field) => (event) => {
        setSettings(prev => ({
            ...prev,
            [field]: event.target.checked
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const setPreviewsFun = (previewsArr) => {
        if (previewsArr && previewsArr.length > 0) {
            const newQrUrl = previewsArr[0];
            setPreviews([newQrUrl]);
            setSettings(prev => ({ ...prev, promptPayQrImage: newQrUrl }));
        }
    };

    const removeImg = (image) => {
        deleteImages(`/api/homeSlides/deteleImage?img=${image}`).then(() => {
            setPreviews([]);
            setSettings(prev => ({ ...prev, promptPayQrImage: "" }));
        }).catch(() => {
            setPreviews([]);
            setSettings(prev => ({ ...prev, promptPayQrImage: "" }));
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);

        const payload = {
            ...settings,
            promptPayQrImage: previews.length > 0 ? previews[0] : ""
        };

        editData('/api/payment-settings/update', payload).then((res) => {
            setIsSaving(false);
            const resData = res?.data || res;
            if (resData?.error === false || resData?.success === true) {
                context.alertBox("success", "Payment settings updated successfully!");
                getSettingsData();
            } else {
                context.alertBox("error", resData?.message || "Failed to update payment settings");
            }
        }).catch((err) => {
            setIsSaving(false);
            context.alertBox("error", err?.message || "Failed to update payment settings");
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <CircularProgress color="primary" />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Manage Payment Methods</h1>
                        <p className="text-sm text-gray-500">ตั้งค่าเปิด/ปิดช่องทางชำระเงินและข้อมูลโอนเงินสำหรับหน้าร้านค้า</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Method Toggles */}
                    <div className="card bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                            ช่องทางชำระเงินที่เปิดใช้งาน (Enabled Payment Methods)
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Dev Test Mode */}
                            <div className={`p-4 rounded-lg border transition-all ${settings.isDevTestEnabled ? 'bg-amber-50 border-amber-300' : 'bg-gray-50 border-gray-200'}`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-full bg-amber-100 text-amber-700">
                                            <FaVial className="text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">Dev Test Mode (โหมดทดสอบ)</h3>
                                            <p className="text-xs text-gray-500">สำหรับ Developer ทดสอบสร้างออเดอร์โดยไม่ต้องชำระเงิน</p>
                                        </div>
                                    </div>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.isDevTestEnabled}
                                                onChange={handleSwitchChange('isDevTestEnabled')}
                                                color="warning"
                                            />
                                        }
                                        label=""
                                    />
                                </div>
                            </div>

                            {/* Stripe Payment Gateway */}
                            <div className={`p-4 rounded-lg border transition-all ${settings.isStripeEnabled ? 'bg-purple-50 border-purple-300' : 'bg-gray-50 border-gray-200'}`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-full bg-purple-100 text-purple-700">
                                            <FaPaypal className="text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">Stripe Payment Gateway</h3>
                                            <p className="text-xs text-gray-500">ตัดบัตรเครดิต / บัตรเดบิต & สแกนพร้อมเพย์ QR Code</p>
                                        </div>
                                    </div>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.isStripeEnabled}
                                                onChange={handleSwitchChange('isStripeEnabled')}
                                                color="secondary"
                                            />
                                        }
                                        label=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stripe API Keys Configuration */}
                    {settings.isStripeEnabled && (
                        <div className="card bg-white p-6 rounded-xl shadow-sm border border-purple-200 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800 pb-2 border-b flex items-center gap-2">
                                💳 ตั้งค่า Stripe API Keys (Stripe Configuration)
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Stripe Publishable Key (<code className="text-purple-700">pk_test_...</code>)
                                    </label>
                                    <input
                                        type="text"
                                        name="stripePublishableKey"
                                        value={settings.stripePublishableKey || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                        placeholder="pk_test_51..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Stripe Secret Key (<code className="text-purple-700">sk_test_...</code>)
                                    </label>
                                    <input
                                        type="password"
                                        name="stripeSecretKey"
                                        value={settings.stripeSecretKey || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                        placeholder="sk_test_51..."
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={isSaving}
                            className="!bg-blue-600 hover:!bg-blue-700 !text-white !px-8 !py-3 !rounded-lg !font-bold flex items-center gap-2"
                        >
                            {isSaving ? <CircularProgress size={22} color="inherit" /> : <> <FaSave className="text-lg" /> Save Payment Settings </>}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentSettings;

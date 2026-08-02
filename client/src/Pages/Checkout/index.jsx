import React, { useContext, useEffect, useState } from "react";
import { Button, Radio } from "@mui/material";
import { BsFillBagCheckFill } from "react-icons/bs";
import { FaPlus, FaUniversity, FaMoneyBillWave, FaVial, FaCheckCircle, FaCreditCard } from "react-icons/fa";
import { MyContext } from '../../App';
import { deleteData, fetchDataFromApi, postData } from "../../utils/api";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Inner Form component for Stripe PaymentElement
const StripeCheckoutForm = ({ totalAmount, selectedAddress, cartData, userData, alertBox, getCartItems, history }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmitStripe = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/order/success",
      },
      redirect: "if_required"
    });

    if (error) {
      setIsProcessing(false);
      alertBox("error", error.message || "Stripe Payment failed");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      const payLoad = {
        userId: userData?._id,
        products: cartData,
        paymentId: paymentIntent.id,
        paymentMethod: "STRIPE",
        payment_status: "STRIPE PAID (COMPLETE)",
        delivery_address: selectedAddress,
        totalAmt: totalAmount,
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      };

      postData(`/api/order/create`, payLoad).then((res) => {
        setIsProcessing(false);
        if (res?.error === false) {
          alertBox("success", "Stripe payment successful! Order placed.");
          deleteData(`/api/cart/emptyCart/${userData?._id}`).then(() => {
            getCartItems();
          });
          history("/order/success");
        } else {
          alertBox("error", res?.message || "Failed to save order");
        }
      }).catch(() => {
        setIsProcessing(false);
        alertBox("error", "Error creating order after payment");
      });
    } else {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md border border-purple-200 mt-3 space-y-4">
      <PaymentElement />
      <Button
        onClick={handleSubmitStripe}
        disabled={!stripe || isProcessing}
        className="btn-org btn-lg w-full flex gap-2 items-center justify-center !py-3 !font-bold !bg-purple-600 hover:!bg-purple-700 !text-white"
      >
        {isProcessing ? <CircularProgress color="inherit" size={24} /> : `ยืนยันชำระเงิน ฿${totalAmount.toLocaleString()} ผ่าน Stripe`}
      </Button>
    </div>
  );
};

const Checkout = () => {
  const [userData, setUserData] = useState(null);
  const [isChecked, setIsChecked] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  const [isUploadingSlip, setIsUploadingSlip] = useState(false);

  const [paymentSettings, setPaymentSettings] = useState({
    isDevTestEnabled: true,
    isStripeEnabled: true,
    isCodEnabled: true,
    isBankTransferEnabled: true,
    stripePublishableKey: "",
    bankName: "Kasikorn Bank (KBANK)",
    bankAccountName: "Classy Bites Co., Ltd.",
    bankAccountNumber: "123-4-56789-0",
    promptPayNumber: "081-234-5678",
    promptPayQrImage: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("DEV_TEST");
  const [paymentSlip, setPaymentSlip] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise, setStripePromise] = useState(null);

  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setUserData(context?.userData);
    if (context?.userData?.address_details?.length > 0) {
      setSelectedAddress(context?.userData?.address_details[0]?._id);
    }
  }, [context?.userData]);

  useEffect(() => {
    fetchDataFromApi('/api/stripe/get-publishable-key').then((stripeRes) => {
      const pubKey = stripeRes?.publishableKey || VITE_STRIPE_PUBLISHABLE_KEY;
      if (pubKey) {
        setStripePromise(loadStripe(pubKey));
      }
    });

    fetchDataFromApi('/api/payment-settings/get').then((res) => {
      if (res?.data) {
        setPaymentSettings(res.data);

        if (res.data.isDevTestEnabled) setPaymentMethod("DEV_TEST");
        else if (res.data.isStripeEnabled) setPaymentMethod("STRIPE");
        else if (res.data.isCodEnabled) setPaymentMethod("COD");
        else if (res.data.isBankTransferEnabled) setPaymentMethod("BANK_TRANSFER");
      }
    });
  }, []);

  useEffect(() => {
    const total = context.cartData?.length > 0
      ? context.cartData
          .map(item => (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1))
          .reduce((acc, val) => acc + val, 0)
      : 0;

    setTotalAmount(total);

    if (total > 0 && paymentMethod === "STRIPE") {
      postData('/api/stripe/create-payment-intent', { totalAmount: total }).then((res) => {
        if (res?.clientSecret) {
          setClientSecret(res.clientSecret);
        }
      });
    }
  }, [context?.cartData, paymentMethod]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("images", file);

    setIsUploadingSlip(true);
    axios.post(VITE_API_URL + "/api/homeSlides/uploadImages", formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      setIsUploadingSlip(false);
      if (res?.data?.images?.length > 0) {
        setPaymentSlip(res.data.images[0]);
        context.alertBox("success", "Slip uploaded successfully!");
      } else {
        context.alertBox("error", "Failed to upload slip image");
      }
    }).catch((err) => {
      setIsUploadingSlip(false);
      context.alertBox("error", err?.response?.data?.message || "Failed to upload slip image");
    });
  };

  const editAddress = (id) => {
    context?.setOpenAddressPanel(true);
    context?.setAddressMode("edit");
    context?.setAddressId(id);
  };

  const handleChangeAddress = (e, index) => {
    if (e.target.checked) {
      setIsChecked(index);
      setSelectedAddress(e.target.value);
    }
  };

  const handlePlaceOrder = (e) => {
    if (e) e.preventDefault();

    const user = context?.userData;
    if (!user?._id) {
      context.alertBox("error", "Please login first");
      return;
    }

    if (!selectedAddress || userData?.address_details?.length === 0) {
      context.alertBox("error", "Please select or add a delivery address");
      return;
    }

    if (paymentMethod === "BANK_TRANSFER" && !paymentSlip) {
      context.alertBox("error", "กรุณาแนบรูปสลิปการโอนเงิน (Please upload payment slip)");
      return;
    }

    setIsloading(true);

    let statusText = "CASH ON DELIVERY";
    if (paymentMethod === "DEV_TEST") statusText = "DEV TEST MODE";
    if (paymentMethod === "BANK_TRANSFER") statusText = "BANK TRANSFER (SLIP ATTACHED)";

    const payLoad = {
      userId: user?._id,
      products: context?.cartData,
      paymentId: paymentMethod + '-' + Date.now(),
      paymentMethod: paymentMethod,
      paymentSlip: paymentSlip,
      payment_status: statusText,
      delivery_address: selectedAddress,
      totalAmt: totalAmount,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    };

    postData(`/api/order/create`, payLoad).then((res) => {
      setIsloading(false);
      if (res?.error === false) {
        context.alertBox("success", res?.message || "Order placed successfully!");
        deleteData(`/api/cart/emptyCart/${user?._id}`).then(() => {
          context?.getCartItems();
        });
        history("/order/success");
      } else {
        context.alertBox("error", res?.message || "Failed to place order");
      }
    }).catch(() => {
      setIsloading(false);
      context.alertBox("error", "An error occurred while placing your order");
    });
  };

  return (
    <section className="py-3 lg:py-10 px-3">
      <form onSubmit={handlePlaceOrder}>
        <div className="w-full lg:w-[85%] max-w-6xl m-auto flex flex-col md:flex-row gap-5">
          {/* Left Column - Address & Payment Options */}
          <div className="leftCol w-full md:w-[60%] flex flex-col gap-5">
            {/* Delivery Address Card */}
            <div className="card bg-white shadow-md p-5 rounded-md w-full">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">Select Delivery Address</h2>
                {
                  userData?.address_details?.length !== 0 &&
                  <Button variant="outlined"
                    onClick={() => {
                      context?.setOpenAddressPanel(true);
                      context?.setAddressMode("add");
                    }} className="btn">
                    <FaPlus />
                    ADD {context?.windowWidth < 767 ? '' : 'NEW ADDRESS'}
                  </Button>
                }
              </div>

              <br />

              <div className="flex flex-col gap-4">
                {
                  userData?.address_details?.length !== 0 ? userData?.address_details?.map((address, index) => {
                    return (
                      <label className={`flex gap-3 p-4 border border-[rgba(0,0,0,0.1)] rounded-md relative cursor-pointer ${isChecked === index ? 'bg-[#fff2f2] border-red-400' : ''}`} key={index}>
                        <div>
                          <Radio size="small" onChange={(e) => handleChangeAddress(e, index)}
                            checked={isChecked === index} value={address?._id} />
                        </div>
                        <div className="info">
                          <span className="inline-block text-[13px] font-[500] p-1 bg-[#f1f1f1] rounded-md">{address?.addressType}</span>
                          <h3>{userData?.name}</h3>
                          <p className="mt-0 mb-0">
                            {address?.address_line1 + " " + address?.city + " " + address?.country + " " + address?.state + " " + address?.landmark}
                          </p>
                          <p className="mb-0 font-[500]">{userData?.mobile ? '+' + userData?.mobile : '+' + address?.mobile}</p>
                        </div>

                        <Button variant="text" className="!absolute top-[15px] right-[15px]" size="small"
                          onClick={() => editAddress(address?._id)}
                        >EDIT</Button>
                      </label>
                    );
                  })
                  :
                  <div className="flex items-center mt-5 justify-between flex-col p-5">
                    <img src="/map.png" width="100" alt="Map" />
                    <h2 className="text-center">No Addresses found in your account!</h2>
                    <p className="mt-0">Add a delivery address to proceed with checkout.</p>
                    <Button className="btn-org" 
                    onClick={() => {
                      context?.setOpenAddressPanel(true);
                      context?.setAddressMode("add");
                    }}>ADD ADDRESS</Button>
                  </div>
                }
              </div>
            </div>

            {/* Payment Method Selection Card */}
            <div className="card bg-white shadow-md p-5 rounded-md w-full">
              <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">
                เลือกวิธีชำระเงิน (Select Payment Method)
              </h2>

              <div className="flex flex-col gap-3">
                {/* Dev Test Mode Option */}
                {/* {paymentSettings.isDevTestEnabled && (
                  <label className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'DEV_TEST' ? 'bg-amber-50 border-amber-400 font-bold' : 'border-gray-200'}`}>
                    <Radio
                      checked={paymentMethod === 'DEV_TEST'}
                      onChange={() => setPaymentMethod('DEV_TEST')}
                      value="DEV_TEST"
                      color="warning"
                    />
                    <div className="flex items-center gap-2">
                      <FaVial className="text-amber-600 text-lg" />
                      <span className="text-sm">🧪 โหมดทดสอบ (Dev / Test Mode - Bypass Payment)</span>
                    </div>
                  </label>
                )} */}

                {/* Stripe Payment Option */}
                {paymentSettings.isStripeEnabled && (
                  <div className={`p-3.5 rounded-lg border transition-all ${paymentMethod === 'STRIPE' ? 'bg-purple-50 border-purple-400' : 'border-gray-200'}`}>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Radio
                        checked={paymentMethod === 'STRIPE'}
                        onChange={() => setPaymentMethod('STRIPE')}
                        value="STRIPE"
                        color="secondary"
                      />
                      <div className="flex items-center gap-2 font-bold">
                        <FaCreditCard className="text-purple-600 text-lg" />
                        <span className="text-sm">💳 Stripe (ชำระผ่านบัตรเครดิต/เดบิต & สแกนพร้อมเพย์ QR)</span>
                      </div>
                    </label>

                    {/* Stripe Elements Form Container */}
                    {paymentMethod === 'STRIPE' && (
                      <div className="mt-3">
                        {stripePromise && clientSecret ? (
                          <Elements stripe={stripePromise} key={clientSecret} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                            <StripeCheckoutForm
                              totalAmount={totalAmount}
                              selectedAddress={selectedAddress}
                              cartData={context?.cartData}
                              userData={context?.userData}
                              alertBox={context?.alertBox}
                              getCartItems={context?.getCartItems}
                              history={history}
                            />
                          </Elements>
                        ) : (
                          <div className="p-4 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
                            <CircularProgress size={18} color="secondary" />
                            <span>กำลังโหลดระบบชำระเงินปลอดภัย Stripe Payment...</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary & Submit */}
          <div className="rightCol w-full md:w-[40%]">
            <div className="card shadow-md bg-white p-5 rounded-md sticky top-5">
              <h2 className="mb-4 text-lg font-bold">Your Order Summary</h2>

              <div className="flex items-center justify-between py-3 border-t border-b border-[rgba(0,0,0,0.1)]">
                <span className="text-[14px] font-[600]">Product</span>
                <span className="text-[14px] font-[600]">Subtotal</span>
              </div>

              <div className="mb-5 scroll max-h-[250px] overflow-y-scroll overflow-x-hidden pr-2">
                {
                  context?.cartData?.length !== 0 && context?.cartData?.map((item, index) => {
                    const itemSubtotal = (parseFloat(item?.price) || 0) * (parseInt(item?.quantity) || 1);
                    return (
                      <div className="flex items-center justify-between py-2 border-b border-gray-100" key={index}>
                        <div className="part1 flex items-center gap-3">
                          <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer">
                            <img
                              src={item?.image}
                              className="w-full h-full object-cover transition-all group-hover:scale-105"
                              alt={item?.productTitle}
                            />
                          </div>

                          <div className="info">
                            <h4 className="text-[14px]" title={item?.productTitle}>{item?.productTitle?.substr(0, 20) + '...'}</h4>
                            <span className="text-[13px] text-gray-500">Qty: {item?.quantity}</span>
                          </div>
                        </div>

                        <span className="text-[14px] font-[500]">฿{itemSubtotal.toLocaleString()}</span>
                      </div>
                    );
                  })
                }
              </div>

              <div className="flex items-center justify-between py-3 border-t border-b mb-4">
                <span className="text-[16px] font-[600]">Total Amount:</span>
                <span className="text-[18px] font-[700] text-red-600">฿{totalAmount.toLocaleString()}</span>
              </div>

              <div className="flex items-center flex-col gap-3 mb-2">
                {paymentMethod !== "STRIPE" && (
                  <Button 
                    type="submit" 
                    disabled={isLoading || isUploadingSlip}
                    className="btn-org btn-lg w-full flex gap-2 items-center justify-center !py-3 !font-bold"
                  >
                    {
                      isLoading ? <CircularProgress color="inherit" size={24} /> :
                      <>
                        <BsFillBagCheckFill className="text-[20px]" />
                        {paymentMethod === 'DEV_TEST' && "ยืนยันสั่งซื้อ (Dev Test Mode)"}
                        {paymentMethod === 'COD' && "ยืนยันสั่งซื้อ (เก็บเงินปลายทาง - COD)"}
                        {paymentMethod === 'BANK_TRANSFER' && "ยืนยันสั่งซื้อพร้อมสลิป (Place Order)"}
                      </>
                    }
                  </Button>
                )}
              </div>

            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Checkout;

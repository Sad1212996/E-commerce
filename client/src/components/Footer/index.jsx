import React, { useContext } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { LiaGiftSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IoChatboxOutline } from "react-icons/io5";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import Drawer from "@mui/material/Drawer";
import CartPanel from "../CartPanel";
import { MyContext } from "../../App";


import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { ProductZoom } from "../ProductZoom";
import { IoCloseSharp } from "react-icons/io5";
import { ProductDetailsComponent } from "../ProductDetails";
import AddAddress from "../../Pages/MyAccount/addAddress";


const Footer = () => {
  const context = useContext(MyContext);

  return (
    <>
      <footer className="bg-[#fafafa] border-t border-gray-200 text-gray-700 font-sans">
        <div className="container">
          {/* Top Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 py-8 border-b border-gray-200/80">
            <div className="col flex items-center gap-4 group p-3 rounded-lg hover:bg-white transition-all duration-300 shadow-none hover:shadow-sm">
              <LiaShippingFastSolid className="text-[36px] text-gray-700 transition-all duration-300 group-hover:text-primary group-hover:scale-110" />
              <div>
                <h3 className="text-[14px] font-[600] text-gray-900 leading-tight">Free Shipping</h3>
                <p className="text-[12px] text-gray-500 mt-0.5">Orders Over $100</p>
              </div>
            </div>

            <div className="col flex items-center gap-4 group p-3 rounded-lg hover:bg-white transition-all duration-300 shadow-none hover:shadow-sm">
              <PiKeyReturnLight className="text-[36px] text-gray-700 transition-all duration-300 group-hover:text-primary group-hover:scale-110" />
              <div>
                <h3 className="text-[14px] font-[600] text-gray-900 leading-tight">30 Days Returns</h3>
                <p className="text-[12px] text-gray-500 mt-0.5">Hassle-Free Exchange</p>
              </div>
            </div>

            <div className="col flex items-center gap-4 group p-3 rounded-lg hover:bg-white transition-all duration-300 shadow-none hover:shadow-sm">
              <BsWallet2 className="text-[34px] text-gray-700 transition-all duration-300 group-hover:text-primary group-hover:scale-110" />
              <div>
                <h3 className="text-[14px] font-[600] text-gray-900 leading-tight">Secured Payment</h3>
                <p className="text-[12px] text-gray-500 mt-0.5">100% Protected Cards</p>
              </div>
            </div>

            <div className="col flex items-center gap-4 group p-3 rounded-lg hover:bg-white transition-all duration-300 shadow-none hover:shadow-sm">
              <LiaGiftSolid className="text-[36px] text-gray-700 transition-all duration-300 group-hover:text-primary group-hover:scale-110" />
              <div>
                <h3 className="text-[14px] font-[600] text-gray-900 leading-tight">Special Gifts</h3>
                <p className="text-[12px] text-gray-500 mt-0.5">On First Order</p>
              </div>
            </div>

            <div className="col flex items-center gap-4 group p-3 rounded-lg hover:bg-white transition-all duration-300 shadow-none hover:shadow-sm col-span-2 md:col-span-1">
              <BiSupport className="text-[36px] text-gray-700 transition-all duration-300 group-hover:text-primary group-hover:scale-110" />
              <div>
                <h3 className="text-[14px] font-[600] text-gray-900 leading-tight">Support 24/7</h3>
                <p className="text-[12px] text-gray-500 mt-0.5">Contact Us Anytime</p>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-10">
            {/* Column 1: Contact Us */}
            <div className="lg:col-span-4 pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-gray-200/80 pb-6 lg:pb-0">
              <h2 className="text-[16px] font-[700] text-gray-900 uppercase tracking-wider mb-4">
                Contact Us
              </h2>
              <p className="text-[13px] text-gray-600 leading-relaxed mb-3">
                <strong className="text-gray-800">ClassyBites Mega Super Store</strong>
                <br />
                123 Commerce Way, Suite 500, Union Trade Centre
              </p>

              <div className="mb-4">
                <Link
                  to="mailto:support@classybites.com"
                  className="text-[13px] text-gray-600 hover:text-black transition-colors block mb-1"
                >
                  ✉️ support@classybites.com
                </Link>
                <span className="text-[20px] font-[700] text-gray-900 block tracking-tight">
                  📞 +1 (800) 123-4567
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200/80 w-fit shadow-xs">
                <IoChatboxOutline className="text-[32px] text-gray-900" />
                <div>
                  <span className="text-[13px] font-[600] text-gray-900 block leading-tight">
                    Live Chat Support
                  </span>
                  <span className="text-[11px] text-gray-500">Get Instant Expert Help</span>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2 pl-0 lg:pl-4">
              <h2 className="text-[16px] font-[700] text-gray-900 uppercase tracking-wider mb-4">
                Quick Links
              </h2>
              <ul className="space-y-2 text-[13px]">
                <li>
                  <Link to="/products" className="text-gray-600 hover:text-black transition-colors block py-0.5">
                    Shop All Products
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-gray-600 hover:text-black transition-colors block py-0.5">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-gray-600 hover:text-black transition-colors block py-0.5">
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-gray-600 hover:text-black transition-colors block py-0.5">
                    Special Offers
                  </Link>
                </li>
                <li>
                  <Link to="/my-account" className="text-gray-600 hover:text-black transition-colors block py-0.5">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link to="/my-orders" className="text-gray-600 hover:text-black transition-colors block py-0.5">
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Company Info */}
            <div className="lg:col-span-3">
              <h2 className="text-[16px] font-[700] text-gray-900 uppercase tracking-wider mb-4">
                Our Company
              </h2>
              <ul className="space-y-2 text-[13px]">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-black transition-colors block py-0.5">
                    About ClassyBites
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-600 hover:text-black transition-colors block py-0.5">
                    Delivery & Shipping Info
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-600 hover:text-black transition-colors block py-0.5">
                    Terms & Conditions of Use
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-600 hover:text-black transition-colors block py-0.5">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-600 hover:text-black transition-colors block py-0.5">
                    Secure Payment Guarantee
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-600 hover:text-black transition-colors block py-0.5">
                    Help Center & FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Social Media */}
            <div className="lg:col-span-3">
              <h2 className="text-[16px] font-[700] text-gray-900 uppercase tracking-wider mb-4">
                Follow Us
              </h2>
              <p className="text-[13px] text-gray-600 mb-4 leading-relaxed">
                Connect with us on our social media platforms for the latest updates and special offers.
              </p>

              <div className="flex items-center gap-3 mt-2">
                <Link
                  to="#"
                  target="_blank"
                  className="w-[40px] h-[40px] rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-black hover:text-white hover:border-black transition-all shadow-xs"
                  title="Facebook"
                >
                  <FaFacebookF className="text-[16px]" />
                </Link>

                <Link
                  to="#"
                  target="_blank"
                  className="w-[40px] h-[40px] rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-black hover:text-white hover:border-black transition-all shadow-xs"
                  title="YouTube"
                >
                  <AiOutlineYoutube className="text-[20px]" />
                </Link>

                <Link
                  to="#"
                  target="_blank"
                  className="w-[40px] h-[40px] rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-black hover:text-white hover:border-black transition-all shadow-xs"
                  title="Pinterest"
                >
                  <FaPinterestP className="text-[16px]" />
                </Link>

                <Link
                  to="#"
                  target="_blank"
                  className="w-[40px] h-[40px] rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-black hover:text-white hover:border-black transition-all shadow-xs"
                  title="Instagram"
                >
                  <FaInstagram className="text-[16px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Copyright Strip */}
      <div className="bottomStrip border-t border-gray-200 py-4 pb-[100px] lg:pb-4 bg-white">
        <div className="container flex items-center justify-between flex-col md:flex-row gap-4 md:gap-0">
          <p className="text-[12px] text-gray-500 text-center md:text-left mb-0">
            © 2026 ClassyBites Store. All Rights Reserved.
          </p>

          <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
            <img src="/carte_bleue.png" alt="Carte Bleue" className="h-[22px] object-contain" />
            <img src="/visa.png" alt="Visa" className="h-[22px] object-contain" />
            <img src="/master_card.png" alt="MasterCard" className="h-[22px] object-contain" />
            <img src="/american_express.png" alt="American Express" className="h-[22px] object-contain" />
            <img src="/paypal.png" alt="PayPal" className="h-[22px] object-contain" />
          </div>
        </div>
      </div>






      {/* Cart Panel */}
      <Drawer
        open={context.openCartPanel}
        onClose={context.toggleCartPanel(false)}
        anchor={"right"}
        className="cartPanel"
      >
        <div className="flex items-center justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)] overflow-hidden">
          <h4>Shopping Cart ({context?.cartData?.length})</h4>
          <IoCloseSharp className="text-[20px] cursor-pointer" onClick={context.toggleCartPanel(false)} />
        </div>


        {

          context?.cartData?.length !== 0 ? <CartPanel data={context?.cartData} /> :
            <>
              <div className="flex items-center justify-center flex-col pt-[100px] gap-5">
                <img src="/empty-cart.png" className="w-[150px]" />
                <h4>Your Cart is currently empty</h4>
                <Button className="btn-org btn-sm" onClick={context.toggleCartPanel(false)}>Continue Shopping</Button>
              </div>
            </>

        }



      </Drawer>









      {/* Address Panel */}
      <Drawer
        open={context.openAddressPanel}
        onClose={context.toggleAddressPanel(false)}
        anchor={"right"}
        className="addressPanel"
      >
        <div className="flex items-center justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)] overflow-hidden">
          <h4>{context?.addressMode === "add" ? 'Add' : 'Edit'} Delivery Address </h4>
          <IoCloseSharp className="text-[20px] cursor-pointer" onClick={context.toggleAddressPanel(false)} />
        </div>



        <div className="w-full max-h-[100vh] overflow-auto">
          <AddAddress />
        </div>



      </Drawer>





      <Dialog
        open={context?.openProductDetailsModal.open}
        fullWidth={context?.fullWidth}
        maxWidth={context?.maxWidth}
        onClose={context?.handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="productDetailsModal"
      >
        <DialogContent>
          <div className="flex items-center w-full productDetailsModalContainer relative">
            <Button
              className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute top-[15px] right-[15px] !bg-[#f1f1f1]"
              onClick={context?.handleCloseProductDetailsModal}
            >
              <IoCloseSharp className="text-[20px]" />
            </Button>
            {
              context?.openProductDetailsModal?.item?.length !== 0 &&
              <>
                <div className="col1 w-[40%] px-3 py-8">
                  <ProductZoom images={context?.openProductDetailsModal?.item?.images} />
                </div>

                <div className="col2 w-[60%] py-8 px-8 pr-16 productContent ">
                  <ProductDetailsComponent item={context?.openProductDetailsModal?.item} />
                </div>
              </>
            }

          </div>
        </DialogContent>
      </Dialog>



    </>
  );
};

export default Footer;

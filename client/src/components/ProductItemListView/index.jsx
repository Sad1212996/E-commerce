import React,{useContext,useEffect, useState } from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import { MyContext } from "../../App";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { deleteData, editData, postData } from "../../utils/api";
import CircularProgress from '@mui/material/CircularProgress';
import { MdClose } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";

const ProductItem = (props) => {

    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [isAddedInMyList, setIsAddedInMyList] = useState(false);
    const [cartItem, setCartItem] = useState([]);
  
    const [activeTab, setActiveTab] = useState(null);
    const [isShowTabs, setIsShowTabs] = useState(false);
    const [selectedTabName, setSelectedTabName] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
  
    const context = useContext(MyContext);
  
    const addToCart = (product, userId, quantity) => {
  
      const productItem = {
        _id: product?._id,
        name: product?.name,
        image: product?.images[0],
        rating: product?.rating,
        price: product?.price,
        oldPrice: product?.oldPrice,
        discount: product?.discount,
        quantity: quantity,
        subTotal: parseInt(product?.price * quantity),
        productId: product?._id,
        countInStock: product?.countInStock,
        brand: product?.brand,
        size: props?.item?.size?.length !== 0 ? selectedTabName : '',
        weight: props?.item?.productWeight?.length !== 0 ? selectedTabName : '',
        ram: props?.item?.productRam?.length !== 0 ? selectedTabName : ''
  
      }
  
  
      setIsLoading(true);
  
      if (props?.item?.size?.length !== 0 || props?.item?.productRam?.length !== 0 || props?.item?.productWeight
        ?.length !== 0) {
        setIsShowTabs(true)
      } else {
        setIsAdded(true);
  
        setIsShowTabs(false);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        context?.addToCart(productItem, userId, quantity);
  
      }
  
  
  
      if (activeTab !== null) {
        context?.addToCart(productItem, userId, quantity);
        setIsAdded(true);
        setIsShowTabs(false)
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
  
  
    }
  
  
    const handleClickActiveTab = (index, name) => {
      setActiveTab(index)
      setSelectedTabName(name)
    }
  
    useEffect(() => {
      const item = context?.cartData?.filter((cartItem) =>
        cartItem.productId.includes(props?.item?._id)
      )
  
      const myListItem = context?.myListData?.filter((item) =>
        item.productId.includes(props?.item?._id)
      )
  
      if (item?.length !== 0) {
        setCartItem(item)
        setIsAdded(true);
        setQuantity(item[0]?.quantity)
      } else {
        setQuantity(1)
      }
  
  
      if (myListItem?.length !== 0) {
        setIsAddedInMyList(true);
      } else {
        setIsAddedInMyList(false)
      }
  
    }, [context?.cartData]);
  
  
    const minusQty = () => {
      if (quantity !== 1 && quantity > 1) {
        setQuantity(quantity - 1)
      } else {
        setQuantity(1)
      }
  
  
      if (quantity === 1) {
        deleteData(`/api/cart/delete-cart-item/${cartItem[0]?._id}`).then((res) => {
          setIsAdded(false);
          context.alertBox("success", "Item Removed ");
          context?.getCartItems();
          setIsShowTabs(false);
          setActiveTab(null);
        })
      } else {
        const obj = {
          _id: cartItem[0]?._id,
          qty: quantity - 1,
          subTotal: props?.item?.price * (quantity - 1)
        }
  
        editData(`/api/cart/update-qty`, obj).then((res) => {
          context.alertBox("success", res?.data?.message);
          context?.getCartItems();
        })
      }
  
    }
  
  
    const addQty = () => {
  
      setQuantity(quantity + 1);
  
      const obj = {
        _id: cartItem[0]?._id,
        qty: quantity + 1,
        subTotal: props?.item?.price * (quantity + 1)
      }
  
      editData(`/api/cart/update-qty`, obj).then((res) => {
        context.alertBox("success", res?.data?.message);
        context?.getCartItems();
      })
  
  
  
    }
  
  
    const handleAddToMyList = (item) => {
      if (context?.userData === null) {
        context?.alertBox("error", "you are not login please login first");
        return false
      }
  
      else {
        const obj = {
          productId: item?._id,
          userId: context?.userData?._id,
          productTitle: item?.name,
          image: item?.images[0],
          rating: item?.rating,
          price: item?.price,
          oldPrice: item?.oldPrice,
          brand: item?.brand,
          discount: item?.discount
        }
  
  
        postData("/api/myList/add", obj).then((res) => {
          if (res?.error === false) {
            context?.alertBox("success", res?.message);
            setIsAddedInMyList(res?.isAdded !== undefined ? res?.isAdded : true);
            context?.getMyListData();
          } else {
            context?.alertBox("error", res?.message);
          }
        })
  
      }
    }

  return (
    <div className="productItem p-4 bg-white rounded-[24px] shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200/80 flex items-center flex-col lg:flex-row gap-4 group">
      
      {/* Image Box */}
      <div className="group imgWrapper w-full lg:w-[25%] bg-[#f4f4f5] rounded-[18px] p-3 relative flex items-center justify-center h-[190px] overflow-hidden">
        <Link to={`/product/${props?.item?._id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={props?.item?.images[0]}
            alt={props?.item?.name}
            className="max-h-[150px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Option Tabs Modal Overlay */}
        {isShowTabs === true && (
          <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-black/75 z-[60] p-3 gap-2 rounded-[18px]">
            <Button
              className="!absolute top-[10px] right-[10px] !min-w-[28px] !min-h-[28px] !w-[28px] !h-[28px] !rounded-full !bg-white text-black"
              onClick={() => setIsShowTabs(false)}
            >
              <MdClose className="text-black text-[20px]" />
            </Button>

            {props?.item?.size?.length !== 0 && props?.item?.size?.map((item, index) => (
              <span
                key={index}
                className={`flex items-center justify-center p-1 px-2 bg-white/90 text-xs font-semibold rounded-md cursor-pointer hover:bg-white ${
                  activeTab === index && '!bg-black text-white'
                }`}
                onClick={() => handleClickActiveTab(index, typeof item === 'object' ? item?.name : item)}
              >
                {typeof item === 'object' ? item?.name : item}
              </span>
            ))}
          </div>
        )}

        {/* Stock / Badge */}
        <span className="discount flex items-center absolute top-[10px] left-[10px] z-20 bg-gray-900 text-white rounded-full px-2.5 py-0.5 text-[11px] font-[600]">
          {props?.item?.discount > 0 ? `${props?.item?.discount}% OFF` : 'In Stock'}
        </span>

        {/* Quick Action Buttons */}
        <div className="actions absolute top-[10px] right-[10px] z-30 flex items-center gap-1.5 flex-col">
          <Button 
            className="!w-[32px] !h-[32px] !min-w-[32px] !rounded-full !bg-white/90 hover:!bg-white !shadow-xs" 
            onClick={() => context.handleOpenProductDetailsModal(true, props?.item)}
            title="Quick View"
          >
            <MdZoomOutMap className="text-[16px] text-gray-700" />
          </Button>

          <Button 
            className="!w-[32px] !h-[32px] !min-w-[32px] !rounded-full !bg-white/90 hover:!bg-white !shadow-xs"
            onClick={() => handleAddToMyList(props?.item)}
            title="Wishlist"
          >
            {isAddedInMyList === true ? (
              <IoMdHeart className="text-[18px] text-red-500" />
            ) : (
              <FaRegHeart className="text-[16px] text-gray-700 hover:text-red-500 transition-colors" />
            )}
          </Button>
        </div>
      </div>

      {/* Info Section */}
      <div className="info p-1 w-full lg:w-[75%] flex flex-col justify-between">
        <div>
          <span className="text-[12px] font-[600] text-gray-400 uppercase tracking-wider block mb-1">
            {props?.item?.brand}
          </span>

          <h3 className="text-[16px] font-[700] text-gray-900 leading-snug mb-2">
            <Link to={`/product/${props?.item?._id}`} className="hover:text-gray-600 transition-colors">
              {props?.item?.name}
            </Link>
          </h3>

          <p className="text-[13px] text-gray-600 mb-3 line-clamp-2 leading-relaxed">
            {props?.item?.smallDescription || props?.item?.description}
          </p>

          <Rating name="size-small" value={props?.item?.rating} size="small" readOnly />

          <div className="flex items-baseline gap-2 mt-2">
            <span className="price text-[18px] font-[700] text-[#059669]">
              ฿{(parseFloat(props?.item?.price) || 0).toLocaleString()}
            </span>
            {props?.item?.oldPrice > props?.item?.price && (
              <span className="oldPrice line-through text-gray-400 text-[13px]">
                ฿{(parseFloat(props?.item?.oldPrice) || 0).toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-4 w-fit">
          {isAdded === false ? (
            <Button
              className="!bg-[#18181b] hover:!bg-black !text-white !rounded-full !px-5 !py-2.5 !text-[13px] !font-[600] !capitalize !shadow-none flex items-center gap-2 transition-all"
              size="small"
              onClick={() => addToCart(props?.item, context?.userData?._id, quantity)}
            >
              <MdOutlineShoppingCart className="text-[16px]" /> Add to Cart
            </Button>
          ) : (
            <>
              {isLoading === true ? (
                <Button className="!bg-[#18181b] !text-white !rounded-full !px-5 !py-2.5 !min-w-[110px]" size="small">
                  <CircularProgress size={16} className="!text-white" />
                </Button>
              ) : (
                <div className="flex items-center justify-between overflow-hidden rounded-full border border-gray-300 bg-gray-50 h-[36px]">
                  <Button className="!min-w-[32px] !w-[32px] !h-[36px] !rounded-none !bg-gray-200 hover:!bg-gray-300 !text-gray-800" onClick={minusQty}>
                    <FaMinus className="text-[10px]" />
                  </Button>
                  <span className="px-3 text-[13px] font-bold text-gray-900">{quantity}</span>
                  <Button className="!min-w-[32px] !w-[32px] !h-[36px] !rounded-none !bg-[#18181b] hover:!bg-black !text-white" onClick={addQty}>
                    <FaPlus className="text-[10px]" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

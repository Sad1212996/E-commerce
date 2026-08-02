import React, { useContext, useEffect, useState } from "react";
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
    <div className="productItem bg-white rounded-[24px] p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col justify-between h-full group relative">
      
      {/* Top Image Container */}
      <div className="imgWrapper bg-[#eceae6] rounded-[20px] p-4 relative flex items-center justify-center h-[230px] overflow-hidden group/img mb-3">
        {/* Wishlist Heart Icon (Top Right) */}
        <Button 
          className="!absolute top-[10px] right-[10px] !min-w-[32px] !min-h-[32px] !w-[32px] !h-[32px] !rounded-full !bg-white/80 hover:!bg-white !shadow-xs z-30"
          onClick={() => handleAddToMyList(props?.item)}
        >
          {isAddedInMyList === true ? (
            <IoMdHeart className="text-[18px] text-gray-900" />
          ) : (
            <FaRegHeart className="text-[15px] text-gray-700 hover:text-gray-900 transition-colors" />
          )}
        </Button>

        {/* Quick View Button */}
        <Button 
          className="!absolute top-[10px] left-[10px] !min-w-[32px] !min-h-[32px] !w-[32px] !h-[32px] !rounded-full !bg-white/80 hover:!bg-white !shadow-xs z-30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"
          onClick={() => context.handleOpenProductDetailsModal(true, props?.item)}
          title="Quick View"
        >
          <MdZoomOutMap className="text-[15px] text-gray-700" />
        </Button>

        {/* Product Image Link */}
        <Link to={`/product/${props?.item?._id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={props?.item?.images[0]}
            alt={props?.item?.name}
            className="max-h-[190px] w-auto object-contain transition-transform duration-500 group-hover/img:scale-105"
          />
        </Link>
      </div>

      {/* Product Information Section */}
      <div className="info flex-1 flex flex-col justify-between">
        <div>
          {/* Title and Price Row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="text-[17px] font-[700] text-gray-900 leading-tight line-clamp-1 inline-block mr-1">
                <Link to={`/product/${props?.item?._id}`} className="hover:text-gray-600 transition-colors">
                  {props?.item?.name}
                </Link>
              </h3>
              <span className="text-[13px] text-[#f59e0b] font-[500]">
                ({props?.item?.rating || 4.5} ★)
              </span>
            </div>
            
            <div className="text-right">
              <span className="text-[18px] font-[800] text-[#059669] block leading-tight">
                ฿{(parseFloat(props?.item?.price) || 0).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Subtitle / Short Description */}
          <p className="text-[12px] text-gray-400 font-[400] leading-snug mt-1 mb-3 line-clamp-2">
            {props?.item?.smallDescription || props?.item?.description || 'Minimal style, ultimate comfort, perfect for any occasion.'}
          </p>

          {/* Size / Variant Options */}
          {(props?.item?.size?.length > 0 || props?.item?.productRam?.length > 0 || props?.item?.productWeight?.length > 0) && (
            <div className="mb-3">
              <span className="text-[11px] font-[600] text-gray-900 block mb-1.5">What is your option?</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {(props?.item?.size || props?.item?.productRam || props?.item?.productWeight)?.slice(0, 5).map((opt, idx) => {
                  const optName = typeof opt === 'object' ? opt?.name : opt;
                  const isSelected = activeTab === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleClickActiveTab(idx, optName)}
                      className={`text-[11px] font-[600] px-2.5 py-1 rounded-[10px] transition-all border ${
                        isSelected 
                          ? 'bg-[#18181b] text-white border-[#18181b]' 
                          : 'bg-white text-gray-600 border-gray-300 hover:border-gray-900'
                      }`}
                    >
                      {optName}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Full-Width Black Capsule Button */}
        <div className="mt-2">
          {isAdded === false ? (
            <Button
              className="!bg-[#18181b] hover:!bg-black !text-white !w-full !py-3 !rounded-[16px] !text-[14px] !font-[600] !capitalize !shadow-xs flex items-center justify-center gap-2 transition-all"
              onClick={() => addToCart(props?.item, context?.userData?._id, quantity)}
            >
              <MdOutlineShoppingCart className="text-[16px]" /> Add To Cart
            </Button>
          ) : (
            <>
              {isLoading === true ? (
                <Button className="!bg-[#18181b] !text-white !w-full !py-3 !rounded-[16px]" disabled>
                  <CircularProgress size={18} className="!text-white" />
                </Button>
              ) : (
                <div className="flex items-center justify-between overflow-hidden rounded-[16px] border border-[#18181b] bg-[#18181b] h-[44px]">
                  <Button className="!min-w-[40px] !w-[40px] !h-full !rounded-none !bg-white/20 hover:!bg-white/30 !text-white" onClick={minusQty}>
                    <FaMinus className="text-[12px]" />
                  </Button>
                  <span className="px-3 text-[14px] font-bold text-white">{quantity} in cart</span>
                  <Button className="!min-w-[40px] !w-[40px] !h-full !rounded-none !bg-white/20 hover:!bg-white/30 !text-white" onClick={addQty}>
                    <FaPlus className="text-[12px]" />
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

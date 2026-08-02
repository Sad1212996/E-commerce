import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";

const HomeSlider = (props) => {
  const context = useContext(MyContext);

  const rawSlideObjects = Array.isArray(props?.data) && props?.data?.length > 0
    ? props.data.slice().reverse().flatMap((item) => {
        const imgs = item?.images || [];
        return imgs.map((img) => ({
          image: img,
          productId: item?.productId,
          subCatId: item?.subCatId,
          catId: item?.catId,
          customUrl: item?.customUrl
        }));
      })
    : [];

  let slidesList = [...rawSlideObjects];
  if (slidesList.length > 0 && slidesList.length < 4) {
    slidesList = [...slidesList, ...slidesList, ...slidesList];
  }

  return (
    <div className="homeSlider pb-3 pt-3 lg:pb-5 lg:pt-5 relative z-[99] overflow-hidden">
      <div className="w-full">
        <Swiper
          loop={slidesList?.length > 1}
          centeredSlides={true}
          slidesPerView={1.15}
          spaceBetween={15}
          navigation={context?.windowWidth < 992 ? false : true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 1.15,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 1.25,
              spaceBetween: 20,
            },
          }}
          className="sliderHome"
        >
          {
            slidesList?.map((slideObj, index) => {
              const getTargetLink = () => {
                if (slideObj?.productId) {
                  return { url: `/product/${slideObj.productId}`, isExternal: false };
                }
                if (slideObj?.subCatId) {
                  return { url: `/products?subCatId=${slideObj.subCatId}`, isExternal: false };
                }
                if (slideObj?.catId) {
                  return { url: `/products?catId=${slideObj.catId}`, isExternal: false };
                }
                if (slideObj?.customUrl) {
                  const url = slideObj.customUrl.trim();
                  const isExt = url.startsWith('http://') || url.startsWith('https://');
                  return { url, isExternal: isExt };
                }
                return null;
              };

              const targetInfo = getTargetLink();

              const imageElement = (
                <img
                  src={slideObj?.image}
                  alt="Banner slide"
                  className="w-full h-auto object-cover rounded-[10px]"
                />
              );

              return (
                <SwiperSlide key={index}>
                  <div className="item rounded-[10px] overflow-hidden shadow-sm">
                    {targetInfo ? (
                      targetInfo.isExternal ? (
                        <a
                          href={targetInfo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full"
                        >
                          {imageElement}
                        </a>
                      ) : (
                        <Link to={targetInfo.url} className="block w-full">
                          {imageElement}
                        </Link>
                      )
                    ) : (
                      imageElement
                    )}
                  </div>
                </SwiperSlide>
              );
            })
          }

        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;

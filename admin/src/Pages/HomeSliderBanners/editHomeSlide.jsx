import React, { useState, useContext, useEffect } from 'react'
import UploadBox from '../../Components/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from '../../App';
import { deleteImages, editData, fetchDataFromApi, postData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams } from "react-router-dom";
 
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const EditHomeSlide = () => {
    const [formFields, setFormFields] = useState({
        images: [],
        catId: '',
        subCatId: '',
        productId: '',
        customUrl: '',
    });

    const [actionType, setActionType] = useState('NONE');
    const [productList, setProductList] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const context = useContext(MyContext);
    const history = useNavigate();

    useEffect(() => {
        fetchDataFromApi('/api/product/getAllProducts').then((res) => {
            setProductList(res?.products || res?.data || (Array.isArray(res) ? res : []));
        }).catch(() => {});

        const id = context?.isOpenFullScreenPanel?.id;
        if (id) {
            fetchDataFromApi(`/api/homeSlides/${id}`).then((res) => {
                const slide = res?.slide;
                setPreviews(slide?.images || []);
                setFormFields({
                    images: slide?.images || [],
                    catId: slide?.catId || '',
                    subCatId: slide?.subCatId || '',
                    productId: slide?.productId || '',
                    customUrl: slide?.customUrl || '',
                });

                if (slide?.productId) setActionType('PRODUCT');
                else if (slide?.catId || slide?.subCatId) setActionType('CATEGORY');
                else if (slide?.customUrl) setActionType('CUSTOM_URL');
                else setActionType('NONE');
            }).catch(() => {});
        }
    }, []);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const setPreviewsFun = (previewsArr) => {
        const imgArr = [...previews, ...(previewsArr || [])];
        setPreviews(imgArr);
        setFormFields((prev) => ({ ...prev, images: imgArr }));
    };

    const removeImg = (image, index) => {
        deleteImages(`/api/homeSlides/deteleImage?img=${image}`).then(() => {
            const updated = previews.filter((_, i) => i !== index);
            setPreviews(updated);
            setFormFields((prev) => ({ ...prev, images: updated }));
        }).catch(() => {
            const updated = previews.filter((_, i) => i !== index);
            setPreviews(updated);
            setFormFields((prev) => ({ ...prev, images: updated }));
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const activeImages = previews.length > 0 ? previews : formFields.images;
        if (!activeImages || activeImages.length === 0) {
            context.alertBox("error", "Please select category image");
            setIsLoading(false);
            return false;
        }

        const payload = {
            images: activeImages,
            catId: actionType === 'CATEGORY' ? formFields.catId : '',
            subCatId: actionType === 'CATEGORY' ? formFields.subCatId : '',
            productId: actionType === 'PRODUCT' ? formFields.productId : '',
            customUrl: actionType === 'CUSTOM_URL' ? formFields.customUrl : '',
        };

        editData(`/api/homeSlides/${context?.isOpenFullScreenPanel?.id}`, payload).then((res) => {
            setTimeout(() => {
                setIsLoading(false);
                context.setIsOpenFullScreenPanel({ open: false });
                history("/homeSlider/list");
            }, 1000);
        }).catch(() => setIsLoading(false));
    };

    return (
        <section className='p-5 bg-gray-50'>
            <form className='form py-1 p-1 md:p-8 md:py-1'  onSubmit={handleSubmit}>
                <div className='scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-white p-4 rounded-md shadow-sm border border-gray-200'>
                        <div>
                            <h3 className='text-[14px] font-[600] mb-2 text-gray-800'>การทำงานเมื่อกดรูปภาพ (Action on Click)</h3>
                            <Select
                                size="small"
                                className='w-full bg-white'
                                value={actionType}
                                onChange={(e) => setActionType(e.target.value)}
                            >
                                <MenuItem value="NONE">🚫 โชว์รูปอย่างเดียว (ไม่ใส่ลิงก์)</MenuItem>
                                <MenuItem value="PRODUCT">🛍️ ลิงก์ไปหน้าสินค้า (Target Product)</MenuItem>
                                <MenuItem value="CATEGORY">📁 ลิงก์ไปหน้าหมวดหมู่ (Target Category)</MenuItem>
                                <MenuItem value="CUSTOM_URL">🔗 ลิงก์กำหนดเอง (Custom URL)</MenuItem>
                            </Select>
                        </div>

                        {actionType === 'PRODUCT' && (
                            <div>
                                <h3 className='text-[14px] font-[600] mb-2 text-gray-800'>เลือกสินค้าปลายทาง (Target Product)</h3>
                                <Select
                                    size="small"
                                    className='w-full bg-white'
                                    value={formFields.productId}
                                    onChange={(e) => setFormFields((prev) => ({ ...prev, productId: e.target.value }))}
                                >
                                    <MenuItem value="">-- เลือกสินค้า --</MenuItem>
                                    {productList?.map((prod, idx) => (
                                        <MenuItem value={prod?._id} key={idx}>{prod?.name}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                        )}

                        {actionType === 'CATEGORY' && (
                            <div>
                                <h3 className='text-[14px] font-[600] mb-2 text-gray-800'>เลือกหมวดหมู่ปลายทาง (Target Category)</h3>
                                <Select
                                    size="small"
                                    className='w-full bg-white'
                                    value={formFields.catId}
                                    onChange={(e) => setFormFields((prev) => ({ ...prev, catId: e.target.value }))}
                                >
                                    <MenuItem value="">-- เลือกหมวดหมู่ --</MenuItem>
                                    {context?.catData?.map((cat, idx) => (
                                        <MenuItem value={cat?._id} key={idx}>{cat?.name}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                        )}

                        {actionType === 'CUSTOM_URL' && (
                            <div>
                                <h3 className='text-[14px] font-[600] mb-2 text-gray-800'>ระบุ URL ปลายทาง (Custom URL)</h3>
                                <input
                                    type="text"
                                    placeholder="https://... หรือ /products"
                                    className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-blue-500 rounded-sm p-3 text-sm'
                                    name="customUrl"
                                    value={formFields.customUrl}
                                    onChange={onChangeInput}
                                />
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                        {
                            previews?.length !== 0 && previews?.map((image, index) => {
                                return (
                                    <div className="uploadBoxWrapper mr-3 relative" key={index}>

                                        <span className='absolute w-[20px] h-[20px] rounded-full  overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer' onClick={() => removeImg(image, index)}><IoMdClose className='text-white text-[17px]' /></span>


                                        <div className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>

                                            <img src={image} className='w-100' />
                                        </div>
                                    </div>
                                )
                            })
                        }


                        <UploadBox multiple={true} name="images" url="/api/homeSlides/uploadImages" setPreviewsFun={setPreviewsFun} />
                    </div>
                </div>

                <br />

                <br />
                <div className='w-[250px]'>
                    <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
                        {
                            isLoading === true ? <CircularProgress color="inherit" />
                                :
                                <>
                                    <FaCloudUploadAlt className='text-[25px] text-white' />
                                    Publish and View
                                </>
                        }
                    </Button>
                </div>


            </form>
        </section>
    )
}

export default EditHomeSlide;

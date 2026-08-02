import React, { useState, useContext, useEffect } from 'react';
import { Button, Tooltip, CircularProgress } from '@mui/material';
import { FaCloudUploadAlt, FaRegImages } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { MdCheckCircle, MdStorefront } from "react-icons/md";
import { MyContext } from '../../App';
import { fetchDataFromApi, postData, editData, deleteImages } from '../../utils/api';
import UploadBox from '../../Components/UploadBox';

const ManageLogo = () => {
    const [formFields, setFormFields] = useState({
        logo: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [previews, setPreviews] = useState([]);
    const [logoId, setLogoId] = useState("");
    const [editMode, setEditMode] = useState(false);

    const context = useContext(MyContext);

    useEffect(() => {
        setIsLoading(true);
        fetchDataFromApi(`/api/logo`).then((res) => {
            setIsLoading(false);
            const validLogos = (res?.logo || [])
                .map((item) => item?.logo)
                .filter((url) => url && typeof url === 'string' && url.trim() !== '');

            if (validLogos.length > 0) {
                const currentLogo = validLogos[0];
                const activeId = res?.logo.find((item) => item?.logo === currentLogo)?._id || res?.logo[0]?._id;
                
                setEditMode(true);
                setLogoId(activeId);
                setPreviews([currentLogo]);
                setFormFields({ logo: currentLogo });
            } else {
                setEditMode(false);
                setPreviews([]);
                setFormFields({ logo: "" });
            }
        }).catch(() => {
            setIsLoading(false);
        });
    }, []);

    const setPreviewsFun = (previewsArr) => {
        if (previewsArr && previewsArr.length > 0) {
            const newLogoUrl = previewsArr[0];
            setPreviews([newLogoUrl]);
            setFormFields({ logo: newLogoUrl });
        }
    };

    const removeImg = (image) => {
        if (context?.userData?.role === "ADMIN") {
            if (image.includes("cloudinary")) {
                deleteImages(`/api/logo/deteleImage?img=${image}`).then(() => {
                    setPreviews([]);
                    setFormFields({ logo: "" });
                    context.alertBox("success", "Logo image removed");
                }).catch(() => {
                    setPreviews([]);
                    setFormFields({ logo: "" });
                });
            } else {
                setPreviews([]);
                setFormFields({ logo: "" });
            }
        } else {
            context.alertBox("error", "Only admin can delete data");
        }
    };

    const addLogo = (e) => {
        e.preventDefault();

        if (!formFields.logo || previews?.length === 0) {
            context.alertBox("error", "Please upload a logo image first");
            return false;
        }

        setIsLoading(true);

        if (editMode === true && logoId) {
            editData(`/api/logo/${logoId}`, formFields).then((res) => {
                setIsLoading(false);
                const resData = res?.data || res;
                if (resData?.success || resData?.error === false || res?.status === 200) {
                    context.alertBox("success", "Logo updated successfully!");
                    localStorage.setItem('logo', formFields.logo);
                } else {
                    context.alertBox("error", resData?.message || "Failed to update logo");
                }
            }).catch(() => setIsLoading(false));
        } else {
            postData(`/api/logo/add`, formFields).then((res) => {
                setIsLoading(false);
                const resData = res?.data || res;
                if (resData?.logo?._id || resData?.success || resData?.error === false) {
                    if (resData?.logo?._id) setLogoId(resData?.logo?._id);
                    setEditMode(true);
                    context.alertBox("success", "Logo added successfully!");
                    localStorage.setItem('logo', formFields.logo);
                } else {
                    context.alertBox("error", resData?.message || "Failed to save logo");
                }
            }).catch(() => setIsLoading(false));
        }
    };

    const activeLogoUrl = previews[0] || formFields.logo;

    return (
        <div className="p-4 md:p-6 max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <MdStorefront className="text-blue-600 text-2xl" /> Manage Website Logo
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Upload and configure your brand logo displayed across customer storefront and admin panel.
                    </p>
                </div>
            </div>

            <form onSubmit={addLogo} className="max-w-2xl mx-auto">
                {/* Store Logo Image Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                        <h3 className="text-base font-semibold text-gray-700 mb-2">Store Logo Image</h3>
                        <p className="text-xs text-gray-400 mb-4">
                            Recommended: PNG with transparent background, SVG, or WEBP (Landscape aspect ratio, e.g. 200x60 px).
                        </p>

                        {/* Logo Preview or Upload Box */}
                        {activeLogoUrl ? (
                            <div className="relative group w-full h-[220px] bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-4 flex flex-col items-center justify-center transition-all hover:border-blue-300">
                                <div className="absolute top-3 right-3 flex gap-2">
                                    <Tooltip title="Remove Logo">
                                        <button
                                            type="button"
                                            onClick={() => removeImg(activeLogoUrl)}
                                            className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
                                        >
                                            <GoTrash className="text-sm" />
                                        </button>
                                    </Tooltip>
                                </div>

                                <img
                                    src={activeLogoUrl}
                                    alt="Website Logo Preview"
                                    className="max-h-[140px] max-w-[85%] object-contain drop-shadow-sm transition-all group-hover:scale-105"
                                />

                                <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-medium border border-emerald-100">
                                    <MdCheckCircle className="text-sm" /> Logo Active
                                </span>
                            </div>
                        ) : (
                            <div className="w-full">
                                <UploadBox
                                    multiple={false}
                                    name="images"
                                    url="/api/logo/uploadImages"
                                    setPreviewsFun={setPreviewsFun}
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <Button
                            type="submit"
                            disabled={isLoading || !activeLogoUrl}
                            className="!bg-blue-600 hover:!bg-blue-700 !text-white !normal-case !py-3 !px-6 !rounded-lg !w-full !font-medium !shadow-md flex items-center justify-center gap-2 transition-all disabled:!bg-gray-300"
                        >
                            {isLoading ? (
                                <CircularProgress size={22} color="inherit" />
                            ) : (
                                <>
                                    <FaCloudUploadAlt className="text-xl" />
                                    Publish & Update Logo
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ManageLogo;

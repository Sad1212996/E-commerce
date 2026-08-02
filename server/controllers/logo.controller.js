import LogoModel from '../models/logo.model.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
    secure: true,
});

// image upload
export async function uploadImages(request, response) {
    try {
        const uploadedUrls = [];
        const image = request.files;

        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };

        for (let i = 0; i < image?.length; i++) {
            const result = await cloudinary.uploader.upload(image[i].path, options);
            if (result && result.secure_url) {
                uploadedUrls.push(result.secure_url);
            }
            if (fs.existsSync(image[i].path)) {
                fs.unlinkSync(image[i].path);
            }
        }

        return response.status(200).json({
            images: uploadedUrls
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// add logo (removes old logo records to ensure single logo record in DB)
export async function addLogo(request, response) {
    try {
        const logoUrl = request.body?.logo;

        if (!logoUrl) {
            return response.status(400).json({
                message: "Logo URL is required",
                error: true,
                success: false
            });
        }

        // Keep database clean with a single active logo document
        await LogoModel.deleteMany({});

        let logoItem = new LogoModel({
            logo: logoUrl,
        });

        logoItem = await logoItem.save();

        return response.status(200).json({
            message: "Logo added successfully",
            error: false,
            success: true,
            logo: logoItem
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// get logo
export async function getLogo(request, response) {
    try {
        const rawLogos = await LogoModel.find();
        const logo = (rawLogos || []).filter(item => item?.logo && item?.logo.trim() !== '');

        return response.status(200).json({
            error: false,
            success: true,
            logo: logo || []
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function getLogoById(request, response) {
    try {
        const logo = await LogoModel.findById(request.params.id);

        if (!logo) {
            return response.status(404).json({
                message: "The logo with the given ID was not found.",
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            logo: logo
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function updatedLogo(request, response) {
    try {
        const logoUrl = request.body?.logo;
        if (!logoUrl) {
            return response.status(400).json({
                message: "Logo URL is required",
                error: true,
                success: false
            });
        }

        let logo = null;
        if (request.params.id && request.params.id !== 'undefined') {
            logo = await LogoModel.findByIdAndUpdate(
                request.params.id,
                { logo: logoUrl },
                { new: true }
            );
        }

        if (!logo) {
            logo = await LogoModel.findOne();
            if (logo) {
                logo.logo = logoUrl;
                await logo.save();
            } else {
                logo = new LogoModel({ logo: logoUrl });
                await logo.save();
            }
        }

        await LogoModel.deleteMany({ _id: { $ne: logo._id } });

        return response.status(200).json({
            error: false,
            success: true,
            logo: logo,
            message: "Logo updated successfully"
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function removeImageFromCloudinary(request, response) {
    try {
        const imgUrl = request.query.img;

        if (!imgUrl) {
            return response.status(400).json({ message: "Image URL required" });
        }

        const urlArr = imgUrl.split("/");
        const image = urlArr[urlArr.length - 1];
        const imageName = image.split(".")[0];

        if (imageName) {
            const res = await cloudinary.uploader.destroy(imageName);
            return response.status(200).send(res);
        }

        return response.status(400).json({ message: "Invalid image name" });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


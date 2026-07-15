import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import { ApiError } from './ApiError.js';



const uploadOnCloudinary = async (localFilePath) => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        await fs.unlink(localFilePath)
        return response;

    }catch (error) {
        
        if (localFilePath) {
            await fs.unlink(localFilePath).catch(() => {})
        }
        console.error("Cloudinary upload failed:", error.message)
        throw new ApiError(502, "Unable to upload file to Cloudinary")
    }
}

// const uploadResult = await cloudinary.uploader.upload('https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//     public_id: 'shoes',
// }).catch((error) => {
//     console.log(error);
// });

// console.log(uploadResult);

export {uploadOnCloudinary}


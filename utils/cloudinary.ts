'use server'
import cloudinary from 'cloudinary'

export const uploadToCloudinary = async (filepath: string) => {
	cloudinary.v2.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	})

	const uploadResult = await cloudinary.v2.uploader.upload(filepath)

	return uploadResult.secure_url
}

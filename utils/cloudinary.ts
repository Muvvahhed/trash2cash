'use server'
import cloudinary from 'cloudinary'

export const uploadToCloudinary = async (
	fileBuffer: Buffer
): Promise<string> => {
	cloudinary.v2.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	})

	// Return a promise that resolves with the Cloudinary secure URL
	return new Promise((resolve, reject) => {
		const stream = cloudinary.v2.uploader.upload_stream(
			{ folder: 'your_folder_name' }, // Optionally specify a folder
			(error, result) => {
				if (result) {
					resolve(result.secure_url) // Resolve with the secure_url
				} else {
					reject(error) // Reject if there's an error
				}
			}
		)

		// Pipe the buffer into the Cloudinary stream
		stream.end(fileBuffer)
	})
}

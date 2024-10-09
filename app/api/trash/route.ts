import { uploadToCloudinary } from '@/utils/cloudinary'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'
import sharp from 'sharp'

export async function POST(req: Request) {
	try {
		const formData = await req.formData()
		const imageFile = formData.get('image') as File // Get image file from form data
		const description = formData.get('description')?.toString() ?? ''
		const location = formData.get('location')?.toString() ?? ''
		const category = formData.get('category')?.toString() ?? ''
		const walletId = formData.get('walletId')?.toString()
		const price = formData.get('price')?.toString()
		const name = formData.get('name')?.toString()

		if (!walletId || !name) {
			return NextResponse.json(
				{ error: 'Missing required fields: walletId or name' },
				{ status: 400 }
			)
		}

		const owner = await prisma.user.findUnique({
			where: { wallet: walletId },
		})

		if (!owner) {
			return NextResponse.json({ error: 'Owner not found' }, { status: 400 })
		}

		let imageUrl = ''
		// Handle image upload
		if (imageFile) {
			const arrayBuffer = await imageFile.arrayBuffer()
			const buffer = Buffer.from(arrayBuffer)

			// Compress the image using sharp in-memory
			const compressedBuffer = await sharp(buffer)
				.resize(800) // Resize to 800px width (adjust as needed)
				.jpeg({ quality: 80 }) // Compress image to 80% quality
				.toBuffer()

			// Upload compressed image to Cloudinary directly from buffer
			imageUrl = await uploadToCloudinary(compressedBuffer)
		}

		// Create a new trash entry in the database
		const newTrash = await prisma.trash.create({
			data: {
				description,
				imageUrl,
				location,
				ownerId: owner.id,
				category,
				name,
				price: price ? parseFloat(price) : 0,
			},
			include: { owner: true },
		})

		return NextResponse.json({
			status: 201,
			data: { ...newTrash },
		})
	} catch (error) {
		console.error('Error creating trash item:', error)
		return NextResponse.json(
			{ error: 'Failed to create trash' },
			{ status: 500 }
		)
	}
}

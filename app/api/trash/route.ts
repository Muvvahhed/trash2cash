import { uploadToCloudinary } from '@/utils/cloudinary'
import { prisma } from '@/utils/db'
import { mkdirSync, writeFileSync } from 'fs'
import { writeFile } from 'fs/promises'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import path from 'path'

// import { createTrash } from '@/app/serveractions';
// import cloudinary from '@/lib/cloudinary';

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
			return NextResponse.json({ error: 'Invalid Request' }, { status: 400 })
		}

		const owner = await prisma.user.findUnique({
			where: {
				wallet: walletId,
			},
		})

		if (!owner) {
			return NextResponse.json({ error: 'Invalid Request' }, { status: 400 })
		}

		let imageUrl = ''
		// Upload image to Cloudinary
		if (imageFile) {
			const arrayBuffer = await imageFile.arrayBuffer()
			const buffer = new Uint8Array(arrayBuffer)
			const tempImagePath = path.join(
				__dirname,
				'temp',
				`${Date.now()}_compressed.jpg`
			)
			mkdirSync(path.dirname(tempImagePath), { recursive: true })

			writeFileSync(tempImagePath, buffer)
			let compressedFilePath = tempImagePath
			imageUrl = await uploadToCloudinary(compressedFilePath)
		}

		// // Create new trash entry in database
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
			include: {
				owner: true,
			},
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

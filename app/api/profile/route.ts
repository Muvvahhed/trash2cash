import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export const GET = async (
	request: Request,
	{ params }: { params: { entryId: string } }
) => {
	const users = await prisma.user.findMany()
	return NextResponse.json({
		data: users,
	})
}

export const POST = async (
	request: Request,
	{ params }: { params: { entryId: string } }
) => {
	return NextResponse.json({
		data: 'hllo',
	})
}

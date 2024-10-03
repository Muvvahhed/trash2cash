import { NextResponse } from 'next/server'

export const GET = async (
	request: Request,
	{ params }: { params: { entryId: string } }
) => {
	return NextResponse.json({
		data: 'hllo',
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

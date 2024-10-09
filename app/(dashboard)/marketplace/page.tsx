import Marketplace from '@/components/MarketPlace'
import { prisma } from '@/utils/db'
import { Trash, User } from '@prisma/client'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'

// Use getServerSideProps with typed context
export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	// Set Cache-Control headers to prevent caching
	context.res.setHeader(
		'Cache-Control',
		'no-store, no-cache, must-revalidate, proxy-revalidate'
	)
	context.res.setHeader('Pragma', 'no-cache')
	context.res.setHeader('Expires', '0')

	// Fetch the trash entries
	const trashEntries = await prisma.trash.findMany({ include: { owner: true } })

	return {
		props: { trashEntries },
	}
}

function MartketPlacePage({
	trashEntries,
}: {
	trashEntries: ({ owner: User } & Trash)[]
}) {
	return <Marketplace trashEntries={trashEntries} />
}

export default MartketPlacePage

import Marketplace from '@/components/MarketPlace'
import { prisma } from '@/utils/db'
import React from 'react'

export const dynamic = 'force-dynamic'

async function MartketPlacePage() {
	const trashEntries = await prisma.trash.findMany({ include: { owner: true } })
	return <Marketplace trashEntries={trashEntries} />
}

export default MartketPlacePage

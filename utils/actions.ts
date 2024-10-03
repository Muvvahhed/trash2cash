'use server'

import { prisma } from './db'
import { generateRandomUsername } from './helpers'

export async function getOrCreateUser(walletId: string) {
	let user = await prisma.user.findUnique({
		where: {
			wallet: walletId,
		},
	})
	if (!user) {
		const randomUsername = generateRandomUsername(walletId)
		user = await prisma.user.create({
			data: {
				wallet: walletId,
				username: randomUsername,
			},
		})
	}

	return user
}

export async function updateUserProfile(
	walletId: string,
	updatedUser: {
		username?: string
		email?: string
		contactInfo?: string
	}
) {
	return prisma.user.update({
		where: {
			wallet: walletId,
		},
		data: updatedUser,
	})
}

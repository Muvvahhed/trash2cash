// utils/generateUsername.js
export function generateRandomUsername(walletId: string) {
	const randomWords = [
		'Star',
		'Galaxy',
		'Ninja',
		'Explorer',
		'Hero',
		'Shadow',
		'Phoenix',
		'Viking',
	]
	const randomNumber = Math.floor(Math.random() * 1000)
	const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)]
	const username = `${randomWord}_${walletId.slice(0, 6)}_${randomNumber}`
	return username
}

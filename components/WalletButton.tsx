'use client'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useEffect, useState } from 'react'

const WalletButton = ({ dark }: { dark?: boolean }) => {
	const { publicKey, signMessage, connected } = useWallet()
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		if (publicKey) {
			authenticateUser()
		}
	}, [publicKey])

	const authenticateUser = async () => {
		if (signMessage && publicKey) {
			try {
				const message = `Please sign this message to authenticate with Trash to Cash. Timestamp: ${Date.now()}`
				const encodedMessage = new TextEncoder().encode(message)
				const signature = await signMessage(encodedMessage)

				setIsAuthenticated(true)

				// // Send the publicKey and signature to your backend for verification
				// const response = await fetch('/api/authenticate', {
				// 	method: 'POST',
				// 	headers: { 'Content-Type': 'application/json' },
				// 	body: JSON.stringify({
				// 		publicKey: publicKey.toString(),
				// 		signature: Array.from(signature),
				// 	}),
				// })

				// if (response.ok) {
				// 	setIsAuthenticated(true)
				// 	alert('Authenticated successfully!')
				// } else {
				// 	alert('Authentication failed.')
				// }
			} catch (error) {
				console.error('Error signing message:', error)
			}
		}
	}
	return (
		<div className="">
			{connected ? (
				<WalletMultiButton
					style={{
						backgroundColor: 'rgb(34 197 94)',
						padding: '16px',
						margin: 0,
						display: 'flex',
						justifyContent: 'center',
						width: '100%',
					}}
				></WalletMultiButton>
			) : (
				<WalletMultiButton
					style={{
						backgroundColor: dark ? 'rgb(15 23 42)' : 'rgb(34 197 94)',
						padding: '16px',
						margin: 0,
						display: 'flex',
						justifyContent: 'center',
						width: '100%',
					}}
				>
					Connect Wallet
				</WalletMultiButton>
			)}
		</div>
	)
}

export default WalletButton

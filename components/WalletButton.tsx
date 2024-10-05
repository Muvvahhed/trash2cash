'use client'
import { useWallet } from '@solana/wallet-adapter-react'
import {
	WalletMultiButton,
	BaseWalletConnectButton,
	WalletModalButton,
	BaseWalletMultiButton,
	WalletIcon,
	WalletConnectButton,
	WalletIconProps,
	WalletDisconnectButton,
} from '@solana/wallet-adapter-react-ui'
import { useEffect, useState } from 'react'

const WalletButton = ({ dark }: { dark?: boolean }) => {
	const { publicKey, signMessage, connected, wallet } = useWallet()
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
		<div className="flex md:flex-col gap-4">
			{!connected ? (
				<BaseWalletConnectButton
					labels={{
						'has-wallet': 'Connect',
						'no-wallet': 'Connect Wallet',
						connecting: 'Connecting...',
						connected: 'Connected',
					}}
					style={{
						backgroundColor: 'rgb(34 197 94) text-white',
						padding: '16px 12px',
						margin: 0,
						display: 'flex',
						justifyContent: 'center',
						width: '100%',
					}}
				></BaseWalletConnectButton>
			) : (
				<WalletDisconnectButton
					// labels={{
					// 	// 'change-wallet': 'Change Wallet',
					// 	// 'copy-address': 'Copy Address',
					// 	'has-wallet': 'Connected',
					// 	'no-wallet': 'Connect Wallet',
					// 	connecting: 'Connecting...',
					// 	connected: 'Connected',
					// 	// copied: 'Copied',
					// 	// disconnect: 'Disconnect',
					// }}
					// className="bg-red-500 text-white w-full p-4 flex justify-center"
					style={{
						backgroundColor: 'rgb(34 197 94)',
						padding: '16px',
						margin: 0,
						display: 'flex',
						justifyContent: 'center',
						width: '100%',
					}}
				></WalletDisconnectButton>
			)}

			<WalletModalButton
				style={{
					backgroundColor: 'rgb(15 23 42)',
					border: '1px solid white',
					padding: '16px',
					margin: 0,
					display: 'flex',
					justifyContent: 'center',
					width: '100%',
				}}
			>
				{!connected ? 'Select Wallet' : 'Change Wallet'}
			</WalletModalButton>
		</div>
	)
}

export default WalletButton

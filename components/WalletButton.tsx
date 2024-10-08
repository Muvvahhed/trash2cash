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
	BaseWalletDisconnectButton,
} from '@solana/wallet-adapter-react-ui'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

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
			<WalletModalButton
				style={{
					backgroundColor: 'rgb(241 245 249)',
					color: 'rgb(15 23 42)',
					padding: '16px',
					margin: 0,
					display: 'flex',
					justifyContent: 'center',
					width: '100%',
				}}
			>
				{!connected ? 'Select Wallet' : 'Change Wallet'}
			</WalletModalButton>
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
				<BaseWalletDisconnectButton
					labels={{
						'has-wallet': 'Disconnect',
						'no-wallet': 'Disconnect',
						disconnecting: 'Disonnecting...',
					}}
					style={{
						backgroundColor: 'rgb(34 197 94)',
						padding: '16px',
						margin: 0,
						display: 'flex',
						justifyContent: 'center',
						width: '100%',
					}}
				></BaseWalletDisconnectButton>
			)}
		</div>
	)
}

export default WalletButton

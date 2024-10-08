import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import WalletContextProvider from '../components/AppWalletProvider'
import { Toaster } from '@/components/ui/toaster'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'Trash2Ca$h',
	description:
		'Trash2Ca$h is a platform that rewards users for recycling trash.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-900`}
			>
				<WalletContextProvider>{children}</WalletContextProvider>
				<Toaster />
			</body>
		</html>
	)
}

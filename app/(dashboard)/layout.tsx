import SideNav from '@/components/SideNav'
import WalletButton from '@/components/WalletButton'
import { Coins, Search, ShoppingBag, Target, Upload, User } from 'lucide-react'
import Link from 'next/link'

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="h-dvh w-full flex">
			<SideNav />
			<section className="h-full w-full  bg-white">
				<main>{children}</main>
			</section>
		</div>
	)
}

'use client'
import { Coins, ShoppingBag, Target, Upload, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import WalletButton from './WalletButton'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

function SideNav() {
	const pathname = usePathname()
	return (
		<aside className="h-full md:w-[40%] lg:w-[30%] xl:w-[25%] hidden md:flex flex-col gap-4 pt-4 px-4">
			<Link href="/" className="flex items-center ">
				<Logo className="size-10 lg:size-12 mb-2" />
				<h1 className="text-2xl lg:text-3xl text-green-500">Trash2Ca$h</h1>
			</Link>

			<div className="flex flex-col items-center  text-white gap-2 text-lg border-b border-green-500  py-4">
				<Link
					href="/upload-trash"
					className={`pl-4 py-4 hover:bg-green-500/80 w-full flex rounded-md  items-center gap-2 ${
						pathname.startsWith('/upload-trash') && 'bg-green-500/80'
					}`}
				>
					<Upload className="size-5 mb-1" />
					Upload Trash
				</Link>
				<Link
					href="/rewards"
					className={`pl-4 py-4 hover:bg-green-500/80 w-full flex rounded-md  items-center gap-2 ${
						pathname.startsWith('/rewards') && 'bg-green-500/80'
					}`}
				>
					<Coins className="size-5 mb-1" />
					Rewards
				</Link>
				<Link
					href="/marketplace"
					className={`pl-4 py-4 hover:bg-green-500/80 w-full flex rounded-md  items-center gap-2 ${
						pathname.startsWith('/marketplace') && 'bg-green-500/80'
					}`}
				>
					<ShoppingBag className="size-5 mb-1" />
					Marketplace
				</Link>
				<Link
					href="/bounty"
					className={`pl-4 py-4 hover:bg-green-500/80 w-full flex rounded-md  items-center gap-2 ${
						pathname.startsWith('/bounty') && 'bg-green-500/80'
					}`}
				>
					<Target className="size-5 mb-1" />
					Bounty
				</Link>
				<Link
					href="/profile"
					className={`pl-4 py-4 hover:bg-green-500/80 w-full flex rounded-md  items-center gap-2 ${
						pathname.startsWith('/profile') && 'bg-green-500/80'
					}`}
				>
					<User className="size-5 mb-1" />
					Profile
				</Link>
			</div>
			<div className="w-full mt-4 ">
				<WalletButton />
			</div>
		</aside>
	)
}

export default SideNav

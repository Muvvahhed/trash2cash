'use client'
import { Coins, ShoppingBag, Target, Upload, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import WalletButton from './WalletButton'
import { usePathname } from 'next/navigation'

function SideNav() {
	const pathname = usePathname()
	console.log(pathname)
	return (
		<aside className="h-full w-[20%] hidden lg:flex flex-col gap-4 pt-4 px-4">
			<h2 className="self-start text-white text-2xl">Trash2Cash</h2>
			<div className="w-full mt-4 ">
				<WalletButton />
			</div>
			<div className="flex flex-col items-center  text-white gap-2 text-lg border-t border-green-500 mt-4 pt-4">
				<Link
					href="/upload-trash"
					className={`pl-4 py-4 hover:bg-green-500 w-full flex rounded-md  items-center gap-2 ${
						pathname.startsWith('upload-trash') && 'bg-green-500'
					}`}
				>
					<Upload className="size-5 mb-1" />
					Upload Trash
				</Link>
				<Link
					href="/rewards"
					className={`pl-4 py-4 hover:bg-green-500 w-full flex rounded-md  items-center gap-2 ${
						pathname.startsWith('rewards') && 'bg-green-500'
					}`}
				>
					<Coins className="size-5 mb-1" />
					My Rewards
				</Link>
				<Link
					href="/marketplace"
					className={`pl-4 py-4 hover:bg-green-500 w-full flex rounded-md  items-center gap-2 ${
						pathname.startsWith('marketplace') && 'bg-green-500'
					}`}
				>
					<ShoppingBag className="size-5 mb-1" />
					Marketplace
				</Link>
				<Link
					href="#"
					className="pl-4 py-4 hover:bg-green-500 w-full flex rounded-md items-center gap-2"
				>
					<Target className="size-5 mb-1" />
					Bounty
				</Link>
				<Link
					href="#"
					className="pl-4 py-4 hover:bg-green-500 w-full flex rounded-md items-center gap-2"
				>
					<User className="size-5 mb-1" />
					Profile
				</Link>
			</div>
		</aside>
	)
}

export default SideNav

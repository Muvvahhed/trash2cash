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
			<aside className="h-full w-[20%] hidden lg:flex flex-col gap-4 pt-4 px-4">
				<h2 className="self-start text-white text-2xl">Trash2Cash</h2>
				<div className="w-full mt-4">
					<WalletButton />
				</div>
				<div className="flex flex-col items-center mt-4 text-white gap-2 text-lg border-t border-green-500">
					<Link
						href="#"
						className="pl-4 py-4 hover:bg-green-500 w-full flex rounded-md mt-4 items-center gap-2"
					>
						<Upload className="size-5 mb-1" />
						Upload Trash
					</Link>
					<Link
						href="#"
						className="pl-4 py-4 hover:bg-green-500 w-full flex rounded-md items-center gap-2"
					>
						<Coins className="size-5 mb-1" />
						My Rewards
					</Link>
					<Link
						href="#"
						className="pl-4 py-4 hover:bg-green-500 w-full flex rounded-md items-center gap-2"
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
			<section className="h-full w-full  bg-white">
				<main>{children}</main>
			</section>
		</div>
	)
}

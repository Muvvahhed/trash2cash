'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
	Coins,
	MenuIcon,
	ShoppingBag,
	Target,
	Upload,
	User,
} from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet'
import Logo from './Logo'
import WalletButton from './WalletButton'
import Link from 'next/link'

function MobileMenu() {
	const router = useRouter()
	const pathName = usePathname()

	return (
		<nav className="bg-slate-900 py-4 md:hidden px-2  w-full ">
			<div className="flex items-center justify-between">
				<Link href="/" className="flex items-center ">
					<Logo className="size-10 lg:size-12 mb-2" />
					<h1 className="text-2xl lg:text-3xl text-green-500">Trash2Ca$h</h1>
				</Link>

				<Sheet>
					<SheetTrigger className="flex items-center">
						<MenuIcon className="size-10 text-green-600" />
					</SheetTrigger>
					<SheetContent side={'left'} className="bg-slate-900 text-white">
						<SheetClose
							onClick={() => {
								router.push('/upload-trash')
							}}
							className={`flex items-center  gap-x-2 mt-6  w-full py-4 px-3 rounded-md ${
								pathName.startsWith('/upload-trash') && 'bg-green-500/20'
							} `}
						>
							<Upload className="mb-1" />
							<span className="text-lg">Upload Trash</span>
						</SheetClose>
						<SheetClose
							onClick={() => {
								router.push('/rewards')
							}}
							className={`flex items-center mt-4 gap-x-2  w-full py-4 px-3 rounded-md ${
								pathName.startsWith('/rewards') && 'bg-green-500/20'
							} `}
						>
							<Coins className="mb-1" />
							<span className="text-lg">Rewards</span>
						</SheetClose>
						<SheetClose
							onClick={() => {
								router.push('/marketplace')
							}}
							className={`flex items-center mt-4 gap-x-2  w-full py-4 px-3 rounded-md ${
								pathName.startsWith('/marketplace') && 'bg-green-500/20'
							} `}
						>
							<ShoppingBag className="mb-1" />
							<span className="text-lg">Marketplace</span>
						</SheetClose>
						<SheetClose
							onClick={() => {
								router.push('/bounty')
							}}
							className={`flex items-center mt-4 gap-x-2  w-full py-4 px-3 rounded-md ${
								pathName.startsWith('/bounty') && 'bg-green-500/20'
							} `}
						>
							<Target className="mb-1" />
							<span className="text-lg">Bounty</span>
						</SheetClose>
						<SheetClose
							onClick={() => {
								router.push('/profile')
							}}
							className={`flex items-center mt-4 gap-x-2  w-full py-4 px-3 rounded-md ${
								pathName.startsWith('/profile') && 'bg-green-500/20'
							} `}
						>
							<User className="mb-1" />
							<span className="text-lg">Profile</span>
						</SheetClose>
						{/* <div className="bg-green-500 h-[2px] w-full my-4" />
						<div className="mt-6">
							<WalletButton />
						</div> */}
					</SheetContent>
				</Sheet>
			</div>
			<div className="mt-6 w-full ">
				<WalletButton />
			</div>
		</nav>
	)
}

export default MobileMenu

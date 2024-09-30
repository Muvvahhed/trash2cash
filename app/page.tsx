import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	ArrowRight,
	Brain,
	Coins,
	ShoppingBag,
	Target,
	Upload,
} from 'lucide-react'
import Link from 'next/link'
import logo from './trash-logo.svg'
import Logo from '@/components/Logo'

const LandingPage = () => {
	return (
		<div className="size-full">
			<nav className="lg:px-4 py-6 items-center flex fixed top-0 bg-slate-900 w-full">
				<div className="flex items-center">
					<Logo className="size-10 lg:size-12 mb-2" />
					<h1 className="text-2xl lg:text-3xl text-green-500">Trash2Ca$h</h1>
				</div>
				<ul className="lg:flex ml-auto text-lg gap-10 text-green-500 hidden mr-10">
					<li className="hover:text-green-400">
						<Link href="#">Features</Link>
					</li>
					<li className="hover:text-green-400">
						<Link href="#">About</Link>
					</li>
					<li className="hover:text-green-400">
						<Link href="#">Contact</Link>
					</li>
				</ul>
			</nav>
			<section className="h-dvh w-full text-center bg-green-500 flex items-center flex-col justify-center text-slate-900 gap-5 ">
				<h2 className="text-5xl lg:text-6xl font-bold">
					Turn Your Trash into Cash
				</h2>
				<p className="text-2xl lg:w-[60%] px-4">
					Recycle smarter, earn rewards, and make a positive impact on the
					environment with AI-powered suggestions.
				</p>
				<Link
					href={'/profile'}
					className="text-white py-4 px-6 text-lg bg-slate-900 rounded-lg hover:bg-slate-900/80 flex items-center justify-center gap-2 mt-4"
				>
					Get started
					<ArrowRight />
				</Link>
			</section>
			<section className="min-h-dvh w-full xs:py-20 lg:py-0 bg-slate-900 flex flex-col items-center justify-center text-white">
				<div className="text-center space-y-4">
					<h2 className="text-5xl lg:text-6xl font-bold ">How It Works</h2>
					<p className="text-2xl">
						Discover how easy it is to recycle and earn rewards with Trash to
						Cash.
					</p>
				</div>
				<div className="grid max-w-5xl items-center gap-6 lg:grid-cols-3 lg:gap-12 mt-20 text-center px-2">
					<div className="flex flex-col items-center space-y-4">
						<Upload className="h-12 w-12 text-primary" />
						<h3 className="text-xl font-bold">Upload Trash</h3>
						<p className=" text-gray-400 dark:text-gray-400">
							Take a picture or describe your trash item for instant recycling
							suggestions.
						</p>
					</div>
					<div className="flex flex-col items-center space-y-4">
						<Brain className="h-12 w-12 text-primary" />
						<h3 className="text-xl font-bold">Get AI Suggestions</h3>
						<p className=" text-gray-400 dark:text-gray-400">
							Our AI provides accurate recycling locations and methods for your
							items.
						</p>
					</div>
					<div className="flex flex-col items-center space-y-4">
						<Coins className="h-12 w-12 text-primary" />
						<h3 className="text-xl font-bold">Earn Rewards</h3>
						<p className=" text-gray-400 dark:text-gray-400">
							Get Solana tokens for your recycling efforts and track your
							impact.
						</p>
					</div>
				</div>
			</section>
			<section className="min-h-dvh w-full text-center bg-white  flex items-center flex-col justify-center text-slate-900 gap-5 py-10">
				<div className="px-4 md:px-6">
					<h2 className=" font-bold tracking-tighter xs:text-5xl lg:text-6xl text-center mb-12">
						Our Features
					</h2>
					<div className="grid xs:gap-4 gap-6 xs:grid-cols-2 lg:grid-cols-3 w-full">
						<Card>
							<CardHeader className="flex items-center flex-col lg:px-8">
								<Upload className="size-8 lg:size-10 text-green-600 mb-2 lg:self-start" />
								<CardTitle>Upload Trash</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Easily upload images of trash for AI suggestions on proper
									disposal.
								</CardDescription>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex items-center flex-col lg:px-8">
								<Brain className="size-8 lg:size-10 text-blue-600 mb-2 lg:self-start" />
								<CardTitle>AI Trash Finder</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Receive AI-powered recommendations on where to dispose of your
									trash.
								</CardDescription>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex items-center flex-col lg:px-8">
								<Coins className="size-8 lg:size-10 text-yellow-600 mb-2 lg:self-start" />
								<CardTitle>Earn Rewards</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Get rewarded through the Solana ecosystem for your recycling
									efforts.
								</CardDescription>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex items-center flex-col lg:px-8">
								<ShoppingBag className="size-8 lg:size-10 text-purple-600 mb-2 lg:self-start" />
								<CardTitle>Marketplace</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Buy and sell trash items with other users in our community
									marketplace.
								</CardDescription>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex items-center flex-col lg:px-8">
								<Target className="size-8 lg:size-10 text-red-600 mb-2 lg:self-start" />
								<CardTitle>Bounties</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Create or claim bounties for specific types of trash to earn
									extra rewards.
								</CardDescription>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
			<section className="h-dvh w-full text-center bg-slate-900  flex items-center flex-col justify-center text-white gap-5 px-1 ">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none text-center">
					Transforming Waste Into Wealth, One Piece at a Time!
				</h2>
				<p className="mt-4 text-xl text-center max-w-3xl mx-auto">
					Join our community of eco-conscious individuals and start earning
					today. Your trash is your treasure!
				</p>
				<div className="flex justify-center mt-8">
					<Link
						href={'/profile'}
						className="text-slate-900 py-4 px-6 text-lg bg-white rounded-lg hover:bg-white/80 flex items-center justify-center gap-2 "
					>
						Get started
						<ArrowRight />
					</Link>
				</div>
			</section>
			<footer className="flex flex-col lg:flex-row items-center px-4 py-6 text-green-500  gap-4">
				<span className="text-white">
					© 2024 Trash to Cash. All rights reserved.
				</span>
				<ul className="lg:ml-auto gap-4 flex items-center">
					<Link href="#">Terms of Service</Link>
					<Link href="#">Privacy</Link>
					<Link href="#">Twitter</Link>
				</ul>
			</footer>
		</div>
	)
}

export default LandingPage

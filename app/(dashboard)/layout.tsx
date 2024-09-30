import MobileMenu from '@/components/MobileNav'
import SideNav from '@/components/SideNav'

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="h-dvh w-full flex">
			<SideNav />
			<section className="size-full bg-white flex flex-col">
				<MobileMenu />
				<main className="size-full lg:pt-10 md:px-10 overflow-y-auto">
					{children}
				</main>
			</section>
		</div>
	)
}

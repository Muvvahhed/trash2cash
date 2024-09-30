'use client'
import { Fragment, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Info, User, Wallet } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { useWallet } from '@solana/wallet-adapter-react'

export default function UserProfile() {
	const [isEditing, setIsEditing] = useState(false)
	const { publicKey, connected } = useWallet()
	return (
		<Fragment>
			{!connected ? (
				<div className="size-full items-center justify-center flex px-2">
					<div className="bg-slate-900   text-white rounded-lg py-8 px-4 md:p-10 flex items-center justify-center md:gap-2">
						<Info className="size-10 self-start" />
						<h2 className="text-2xl text-center">
							You need to connect a Wallet to continue
						</h2>
					</div>
				</div>
			) : (
				<div className="space-y-8 px-4 pb-6 size-full flex flex-col overflow-y-auto pt-10">
					<h2 className="text-2xl lg:text-3xl font-semibold">User Profile</h2>
					<div className="gap-8 grid grid-cols-1 w-full lg:w-[65%] xl:w-[50%] ">
						<Card>
							<CardHeader>
								<CardTitle>Personal Information</CardTitle>
							</CardHeader>
							<CardContent>
								<form
									className="space-y-4"
									onSubmit={(e) => {
										e.preventDefault()
									}}
								>
									<div className="space-y-2">
										<Label htmlFor="name">User Name</Label>
										<Input
											id="username"
											defaultValue="John Doe"
											readOnly={!isEditing}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											type="email"
											defaultValue="john@example.com"
											readOnly={!isEditing}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="contact">Contact Details</Label>
										<Textarea id="contact" readOnly={!isEditing} />
									</div>
									<div className="flex justify-end space-x-2">
										{isEditing ? (
											<Fragment>
												<Button
													variant="outline"
													onClick={() => setIsEditing(false)}
												>
													Cancel
												</Button>
												<Button>Save Changes</Button>
											</Fragment>
										) : (
											<Button type="button" onClick={() => setIsEditing(true)}>
												Edit Profile
											</Button>
										)}
									</div>
								</form>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Wallet Information</CardTitle>
							</CardHeader>
							<CardContent>
								{connected ? (
									<div className="space-y-2">
										<Label>Connected Wallet</Label>
										<div className="flex items-center space-x-2">
											<Wallet className="h-4 w-4" />
											<span className="text-sm font-medium">
												{publicKey?.toString()}
											</span>
										</div>
									</div>
								) : (
									<p>No wallet connected</p>
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			)}
		</Fragment>
	)
}

'use client'
import {
	FormEvent,
	Fragment,
	use,
	useEffect,
	useState,
	useTransition,
} from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Info, Wallet } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { useWallet } from '@solana/wallet-adapter-react'
import WalletButton from './WalletButton'
import { getOrCreateUser, updateUserProfile } from '@/utils/actions'
import { User } from '@prisma/client'
import { BarLoader } from 'react-spinners'
import { useToast } from '@/hooks/use-toast'

export default function UserProfile() {
	const [isEditing, setIsEditing] = useState(false)
	const { publicKey, connected } = useWallet()
	const wallet = publicKey?.toString()
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [user, setUser] = useState<User>()
	const [contact, setContact] = useState('')
	const [isPending, startTransition] = useTransition()
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()

	useEffect(() => {
		const fetchUser = async () => {
			if (wallet) {
				startTransition(async () => {
					try {
						const fetchedUser = await getOrCreateUser(wallet) // Call the server action
						setUser(fetchedUser)
						setUsername(fetchedUser.username ?? '')
						setEmail(fetchedUser.email ?? '')
						setContact(fetchedUser.contactInfo ?? '')
					} catch (error) {
						console.error('Error fetching/creating user:', error)
					}
				})
			}
		}

		fetchUser()
	}, [wallet])

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!wallet) return
		setIsLoading(true)
		const updatedUser = {
			username,
			email,
			contactInfo: contact,
		}

		const response = await updateUserProfile(wallet, updatedUser)

		if (response) {
			toast({
				title: 'Profile updated successfully!',
			})
		}

		setIsLoading(false)
		setIsEditing(false)
	}

	return (
		<Fragment>
			{!connected ? (
				<WalletNotConnected />
			) : (
				<Fragment>
					{isPending ? (
						<div className="size-full items-center justify-center flex">
							<BarLoader color="rgb(15 23 42)" />
						</div>
					) : (
						<div className="space-y-8  px-4 pb-6 size-full flex flex-col overflow-y-auto pt-10">
							<h2 className="text-2xl lg:text-3xl font-semibold">
								User Profile
							</h2>
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
												e.stopPropagation()
												handleSubmit(e)
											}}
										>
											<div className="space-y-2">
												<Label htmlFor="name">User Name</Label>
												<Input
													id="username"
													defaultValue={user?.username ?? ''}
													value={username}
													onChange={(e) => setUsername(e.target.value)}
													readOnly={!isEditing}
													placeholder="John doe"
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="email">Email</Label>
												<Input
													id="email"
													type="email"
													value={email}
													onChange={(e) => setEmail(e.target.value)}
													defaultValue={user?.email ?? ''}
													placeholder="user@email.com"
													readOnly={!isEditing}
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="contact">Contact Details</Label>
												<Textarea
													id="contact"
													readOnly={!isEditing}
													value={contact}
													onChange={(e) => setContact(e.target.value)}
												/>
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
														<Button disabled={isLoading}>
															{isLoading ? 'Saving....' : 'Save Changes'}
														</Button>
													</Fragment>
												) : (
													<Button
														type="button"
														onClick={(e) => {
															e.preventDefault()
															setIsEditing(true)
														}}
													>
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
												<div className="flex items-center space-x-2 w-full">
													<Wallet className="h-4 w-4" />
													<div className="text-sm font-medium break-words whitespace-normal w-[80%] md:w-full">
														{publicKey?.toString()}
													</div>
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
			)}
		</Fragment>
	)
}

function WalletNotConnected() {
	return (
		<div className="size-full flex">
			<Card className="w-full max-w-md mx-auto my-auto">
				<CardHeader>
					<CardTitle className="text-center">Connect Your Wallet</CardTitle>
					<CardDescription className="text-center">
						You need to connect your Solana wallet to access your profile
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col items-center">
					<Wallet className="w-24 h-24 text-gray-400 mb-4" />
					<p className="text-center mb-6">
						Your profile information and rewards are linked to your Solana
						wallet. Connect your wallet to view and manage your account.
					</p>
					{/* <div className="w-full">
						<WalletButton dark />
					</div> */}
				</CardContent>
			</Card>
		</div>
	)
}

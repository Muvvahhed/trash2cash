'use client'
import { ChangeEvent, FormEvent, use, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from './ui/scroll-area'
import { Trash, User } from '@prisma/client'
import { useWallet } from '@solana/wallet-adapter-react'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import { shimmer, toBase64 } from '@/utils/placeholder'
// import { toast } from '@/components/ui/use-toast'

export default function Marketplace({
	trashEntries,
}: {
	trashEntries: ({ owner: User } & Trash)[]
}) {
	const [searchTerm, setSearchTerm] = useState('')
	const [isUploading, setIsUploading] = useState(false)
	const { toast } = useToast()
	const { publicKey, connected } = useWallet()
	const [category, setCategory] = useState('all')
	const [trashItems, setTrashItems] = useState(trashEntries)
	const closeRef = useRef<HTMLButtonElement>(null)
	const [newItem, setNewItem] = useState<{
		name: string
		price: string
		category: string
		description: string
		image: null | File
	}>({
		name: '',
		price: '',
		category: '',
		description: '',
		image: null,
	})

	const filteredItems = trashItems.filter(
		(item) =>
			item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(category === 'all' ||
				item?.category?.toLowerCase() === category.toLowerCase())
	)

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setNewItem((prev) => ({ ...prev, [name]: value }))
	}

	const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return
		if (e.target.files.length === 0) return
		const file = e.target.files[0]
		setNewItem((prev) => ({ ...prev, image: file }))
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsUploading(true)
		const walletId = publicKey?.toString()
		if (!walletId) {
			setIsUploading(false)
			return
		}
		const formData = new FormData()
		formData.append('name', newItem.name)
		formData.append('price', newItem.price)
		formData.append('category', newItem.category)
		formData.append('description', newItem.description)
		if (newItem.image) {
			formData.append('image', newItem.image) // Append the file
		}
		formData.append('walletId', walletId) // Replace with actual user ID

		const response = await fetch('/api/trash', {
			method: 'POST',
			body: formData, // Send as multipart/form-data
		})

		if (response.ok) {
			// Handle success
			const newEntry = (await response.json()) as { owner: User } & Trash
			setTrashItems((prev) => [...prev, newEntry])
			// Reset form
			setNewItem({
				name: '',
				price: '',
				category: '',
				description: '',
				image: null,
			})
			// Show success message
			toast({
				title: 'Item Listed Successfully',
				description: 'Your item has been added to the marketplace.',
			})
		} else {
			// Handle error
			toast({
				title: 'Error Listing Item',
				variant: 'destructive',
			})
		}
		closeRef?.current?.click()
		setIsUploading(false)
		window.location.reload()
	}

	return (
		<div className="mx-auto pb-10 px-4 pt-8">
			<h1 className="text-2xl md:text-3xl font-bold mb-6">Trash Marketplace</h1>

			<div className="flex flex-col lg:flex-row gap-4 mb-6">
				<div className="flex-1">
					<Label htmlFor="search" className="text-base">
						Search
					</Label>
					<Input
						id="search"
						className="w-full"
						placeholder="Search for trash items..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className="flex gap-2">
					<div className="w-full lg:w-48">
						<Label htmlFor="category-filter" className="text-base">
							Category
						</Label>
						<Select value={category} onValueChange={setCategory}>
							<SelectTrigger id="category-filter">
								<SelectValue placeholder="Select..." />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All</SelectItem>
								<SelectItem value="plastic">Plastic</SelectItem>
								<SelectItem value="metal">Metal</SelectItem>
								<SelectItem value="paper">Paper</SelectItem>
								<SelectItem value="glass">Glass</SelectItem>
								<SelectItem value="other">Other</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="w-full md:w-48 flex items-end">
						<Dialog>
							<DialogTrigger asChild>
								<Button className="w-full" disabled={!connected}>
									List New Item
								</Button>
							</DialogTrigger>
							<DialogClose ref={closeRef} className="hidden" />
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>List a New Item</DialogTitle>
									<DialogDescription>
										Fill out the details to list your recyclable item on the
										marketplace.
									</DialogDescription>
								</DialogHeader>
								<form onSubmit={handleSubmit}>
									<div className="grid gap-4 py-4">
										<div className="grid grid-cols-4 items-center gap-4">
											<Label htmlFor="name" className="text-right">
												Name
											</Label>
											<Input
												id="name"
												name="name"
												value={newItem.name}
												onChange={handleInputChange}
												className="col-span-3"
												required
											/>
										</div>
										<div className="grid grid-cols-4 items-center gap-4">
											<Label htmlFor="price" className="text-right">
												Price (USDT)
											</Label>
											<Input
												id="price"
												name="price"
												type="number"
												step="0.01"
												value={newItem.price}
												onChange={handleInputChange}
												className="col-span-3"
												required
											/>
										</div>
										<div className="grid grid-cols-4 items-center gap-4">
											<Label htmlFor="category" className="text-right">
												Category
											</Label>
											<Select
												name="category"
												value={newItem.category}
												onValueChange={(value) =>
													setNewItem((prev) => ({ ...prev, category: value }))
												}
											>
												<SelectTrigger className="col-span-3">
													<SelectValue placeholder="Select a category" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="Plastic">Plastic</SelectItem>
													<SelectItem value="Metal">Metal</SelectItem>
													<SelectItem value="Paper">Paper</SelectItem>
													<SelectItem value="Glass">Glass</SelectItem>
													<SelectItem value="Other">Other</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="grid grid-cols-4 items-center gap-4">
											<Label htmlFor="description" className="text-right">
												Description
											</Label>
											{/* <p className="line-clamp-3 col-span-3">
												{newItem.description}
											</p> */}
											<Textarea
												id="description"
												name="description"
												value={newItem.description}
												onChange={handleInputChange}
												className="col-span-3"
											/>
										</div>
										<div className="grid grid-cols-4 items-center gap-4">
											<Label htmlFor="image" className="text-right">
												Image
											</Label>
											<Input
												id="image"
												name="image"
												type="file"
												accept="image/*"
												onChange={handleImageUpload}
												className="col-span-3"
											/>
										</div>
									</div>
									<DialogFooter>
										<Button type="submit" disabled={isUploading}>
											{isUploading ? 'Uploading...' : 'List Item'}
										</Button>
									</DialogFooter>
								</form>
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{filteredItems.map((item) => (
					<Card key={item.id} className="flex flex-col">
						<CardHeader>
							<CardTitle className="capitalize">{item.name}</CardTitle>
							<CardDescription>
								Seller: {item.owner.username ?? ''}
							</CardDescription>
						</CardHeader>
						<CardContent className="flex-grow ">
							<Image
								src={item.imageUrl}
								alt={item.name}
								className="w-full h-48 object-scale-down mb-4 rounded-md"
								placeholder={`data:image/svg+xml;base64,${toBase64(
									shimmer(192, 192)
								)}`}
								height={192}
								width={192}
								priority
							/>
							{item.price && (
								<p className="text-2xl font-bold mb-2">
									${item.price.toFixed(2)} USDT
								</p>
							)}
							<p className="text-sm text-gray-500 mb-2">
								Category: {item.category}
							</p>
							<ScrollArea className="h-24 w-full rounded-md border p-2">
								<p className="text-sm">{item.description}</p>
							</ScrollArea>
						</CardContent>
						<CardFooter>
							<Button className="w-full">Buy Now</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	)
}

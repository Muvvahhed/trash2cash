'use client'
import { ChangeEvent, FormEvent, useState } from 'react'
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
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
// import { toast } from '@/components/ui/use-toast'

const initialTrashItems = [
	{
		id: 1,
		name: 'Plastic Bottles',
		price: 0.5,
		seller: 'EcoUser1',
		image: '/placeholder.svg?height=200&width=200',
		category: 'Plastic',
	},
	{
		id: 2,
		name: 'Aluminum Cans',
		price: 0.75,
		seller: 'RecycleKing',
		image: '/placeholder.svg?height=200&width=200',
		category: 'Metal',
	},
	{
		id: 3,
		name: 'Paper Waste',
		price: 0.25,
		seller: 'GreenGuru',
		image: '/placeholder.svg?height=200&width=200',
		category: 'Paper',
	},
	{
		id: 4,
		name: 'Glass Jars',
		price: 1,
		seller: 'EarthSaver',
		image: '/placeholder.svg?height=200&width=200',
		category: 'Glass',
	},
]

export default function Marketplace() {
	const [searchTerm, setSearchTerm] = useState('')
	const [category, setCategory] = useState('all')
	const [trashItems, setTrashItems] = useState(initialTrashItems)
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
			item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(category === 'all' ||
				item.category.toLowerCase() === category.toLowerCase())
	)

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setNewItem((prev) => ({ ...prev, [name]: value }))
	}

	const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return
		if (e.target.files.length === 0) return
		const file = e.target.files[0]
		setNewItem((prev) => ({ ...prev, image: file }))
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const newItemWithId = {
			...newItem,
			id: trashItems.length + 1,
			seller: 'CurrentUser', // This should be replaced with the actual logged-in user's name
			price: parseFloat(newItem.price),
			image: newItem.image
				? URL.createObjectURL(newItem.image)
				: '/placeholder.svg?height=200&width=200',
		}
		setTrashItems((prev) => [...prev, newItemWithId])
		setNewItem({
			name: '',
			price: '',
			category: '',
			description: '',
			image: null,
		})
		// toast({
		// 	title: 'Item Listed Successfully',
		// 	description: 'Your item has been added to the marketplace.',
		// })
	}

	return (
		<div className="mx-auto pb-10 px-4 pt-8">
			<h1 className="text-2xl md:text-3xl font-bold mb-6">Trash Marketplace</h1>

			<div className="flex flex-col md:flex-row gap-4 mb-6">
				<div className="flex-1">
					<Label htmlFor="search" className="text-base">
						Search
					</Label>
					<Input
						id="search"
						placeholder="Search for trash items..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className="w-full md:w-48">
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
						</SelectContent>
					</Select>
				</div>
				<div className="w-full md:w-48 flex items-end">
					<Dialog>
						<DialogTrigger asChild>
							<Button className="w-full">List New Item</Button>
						</DialogTrigger>
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
											</SelectContent>
										</Select>
									</div>
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="description" className="text-right">
											Description
										</Label>
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
									<Button type="submit">List Item</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{filteredItems.map((item) => (
					<Card key={item.id}>
						<CardHeader>
							<CardTitle>{item.name}</CardTitle>
							<CardDescription>Seller: {item.seller}</CardDescription>
						</CardHeader>
						<CardContent>
							<img
								src={item.image}
								alt={item.name}
								className="w-full h-48 object-cover mb-4"
							/>
							<p className="text-2xl font-bold">
								${item.price.toFixed(2)} USDT
							</p>
							<p className="text-sm text-gray-500 mt-2">
								Category: {item.category}
							</p>
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

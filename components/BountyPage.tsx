'use client'
import { ChangeEvent, FormEvent, useState } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function BountyPage() {
	const [newBounty, setNewBounty] = useState({
		trashType: '',
		rewardAmount: '',
		description: '',
	})
	const [bounties, setBounties] = useState([
		{
			id: 1,
			trashType: 'Electronic Waste',
			rewardAmount: 5,
			description: 'Looking for old smartphones and laptops',
		},
		{
			id: 2,
			trashType: 'Car Batteries',
			rewardAmount: 10,
			description: 'Collecting used car batteries for proper recycling',
		},
	])

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => {
		setNewBounty({ ...newBounty, [e.target.name]: e.target.value })
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const bountyWithId = {
			...newBounty,
			id: bounties.length + 1,
			rewardAmount: parseFloat(newBounty.rewardAmount),
		}
		setBounties([...bounties, bountyWithId])
		setNewBounty({ trashType: '', rewardAmount: '', description: '' })
	}

	return (
		<div className="w-full  pb-10 px-4 pt-8">
			<h1 className="text-2xl md:text-3xl font-bold mb-6">Bounty Board</h1>

			<Card className="mb-8 w-full md:w-[80%] xl:w-[60%]">
				<CardHeader>
					<CardTitle>Create a New Bounty</CardTitle>
					<CardDescription>
						Offer rewards for specific types of trash
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<Label htmlFor="trashType">Trash Type</Label>
							<Input
								id="trashType"
								name="trashType"
								value={newBounty.trashType}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div>
							<Label htmlFor="rewardAmount">Reward Amount (SOL)</Label>
							<Input
								id="rewardAmount"
								name="rewardAmount"
								type="number"
								step="0.01"
								value={newBounty.rewardAmount}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div>
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								name="description"
								value={newBounty.description}
								onChange={handleInputChange}
								required
							/>
						</div>
						<Button type="submit">Create Bounty</Button>
					</form>
				</CardContent>
			</Card>

			<h2 className="text-2xl font-semibold mb-4">Active Bounties</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{bounties.map((bounty) => (
					<Card key={bounty.id}>
						<CardHeader>
							<CardTitle>{bounty.trashType}</CardTitle>
							<CardDescription>
								Reward: {bounty.rewardAmount} SOL
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>{bounty.description}</p>
							<Button className="mt-4">Claim Bounty</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}

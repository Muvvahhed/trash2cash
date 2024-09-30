'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Coins, Trash2 } from 'lucide-react'

export default function RewardSection() {
	return (
		<div className="space-y-8 w-full  pb-10 px-4 pt-8">
			<h2 className="text-2xl md:text-3xl font-bold">My Rewards</h2>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Earnings
						</CardTitle>
						<Coins className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">1,234 SOL</div>
						<p className="text-xs text-muted-foreground">
							+20.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Items Recycled
						</CardTitle>
						<Trash2 className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">345</div>
						<p className="text-xs text-muted-foreground">
							+180 from last month
						</p>
					</CardContent>
				</Card>
				{/* Add more cards for other stats */}
			</div>
			<div>
				<h3 className="text-xl font-semibold mb-4">Transaction History</h3>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Date</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>2023-06-01</TableCell>
							<TableCell>Recycling Reward</TableCell>
							<TableCell>5 SOL</TableCell>
							<TableCell>Completed</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>2023-05-28</TableCell>
							<TableCell>Bounty Completion</TableCell>
							<TableCell>10 SOL</TableCell>
							<TableCell>Completed</TableCell>
						</TableRow>
						{/* Add more rows as needed */}
					</TableBody>
				</Table>
			</div>
			<div className="flex justify-end">
				<Button size={'lg'}>Withdraw Rewards</Button>
			</div>
		</div>
	)
}

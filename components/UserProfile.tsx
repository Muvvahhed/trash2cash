import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Wallet } from 'lucide-react'

export default function UserProfile() {
	const [isEditing, setIsEditing] = useState(false)

	return (
		<div className="space-y-8">
			<h2 className="text-2xl font-bold">User Profile</h2>
			<Card>
				<CardHeader>
					<CardTitle>Personal Information</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>
							<Input id="name" defaultValue="John Doe" readOnly={!isEditing} />
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
						<div className="flex justify-end space-x-2">
							{isEditing ? (
								<>
									<Button variant="outline" onClick={() => setIsEditing(false)}>
										Cancel
									</Button>
									<Button type="submit">Save Changes</Button>
								</>
							) : (
								<Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
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
					<div className="space-y-2">
						<Label>Connected Wallet</Label>
						<div className="flex items-center space-x-2">
							<Wallet className="h-4 w-4" />
							<span className="text-sm font-medium">0x1234...5678</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

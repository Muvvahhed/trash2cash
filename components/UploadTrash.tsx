'use client'
import React from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { MapPin, Upload } from 'lucide-react'

function UploadTrash() {
	return (
		<div className="space-y-4 w-full md:w-[80%] lg:w-[60%] pb-10 px-4 pt-8">
			<h2 className="text-2xl md:text-3xl font-bold">Upload Trash</h2>
			<div className="grid gap-4">
				<div className="flex items-center justify-center w-full">
					<label
						htmlFor="dropzone-file"
						className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
					>
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
							<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
								<span className="font-semibold">Click to upload</span> or drag
								and drop
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								PNG, JPG or GIF (MAX. 800x400px)
							</p>
						</div>
						<input id="dropzone-file" type="file" className="hidden" />
					</label>
				</div>
				<Textarea placeholder="Describe the trash item..." />
				<Button>Get AI Suggestions</Button>
			</div>
			<div className="mt-8">
				<h3 className="text-xl font-semibold mb-4">AI Suggestions</h3>
				{/* Placeholder for AI suggestions */}
				<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
					<p>AI-generated suggestions will appear here...</p>
				</div>
			</div>
			<div className="mt-8">
				<h3 className="text-xl font-semibold mb-4">
					Nearby Recycling Locations
				</h3>
				{/* Placeholder for map */}
				<div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center">
					<MapPin className="h-8 w-8 text-gray-400" />
					<span className="ml-2 text-gray-500 dark:text-gray-400">
						Map will be displayed here
					</span>
				</div>
			</div>
		</div>
	)
}

export default UploadTrash

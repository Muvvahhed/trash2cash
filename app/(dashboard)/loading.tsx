import React from 'react'
import { BarLoader } from 'react-spinners'

const loading = () => {
	return (
		<div className="size-full flex items-center justify-center">
			<BarLoader color="rgb(15 23 42)" />
		</div>
	)
}

export default loading

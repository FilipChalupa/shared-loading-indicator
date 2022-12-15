import { FunctionComponent, useEffect } from 'react'
import { useLocalLoading } from './base'

export const Loading: FunctionComponent<{
	isLoading?: boolean
}> = ({ isLoading = true }) => {
	const [_, setIsLoading] = useLocalLoading()

	useEffect(() => {
		setIsLoading(isLoading)
	}, [isLoading, setIsLoading])

	return null
}

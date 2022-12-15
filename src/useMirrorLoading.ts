import { useEffect } from 'react'
import { useLocalLoading } from './base'

export const useMirrorLoading = (isLoading: boolean) => {
	const [_, setIsLoading] = useLocalLoading()

	useEffect(() => {
		setIsLoading(isLoading)
	}, [setIsLoading, isLoading])
}

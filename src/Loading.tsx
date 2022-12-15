import type { FunctionComponent } from 'react'
import { useMirrorLoading } from './useMirrorLoading'

export const Loading: FunctionComponent<{
	isLoading?: boolean
}> = ({ isLoading = true }) => {
	useMirrorLoading(isLoading)
	return null
}

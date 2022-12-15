import type { FunctionComponent } from 'react'
import { useMirrorLoading } from './base'

export const Loading: FunctionComponent<{
	isLoading?: boolean
}> = ({ isLoading = true }) => {
	useMirrorLoading(isLoading)
	return null
}

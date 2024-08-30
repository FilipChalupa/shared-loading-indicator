'use client'

import { useEffect } from 'react'
import { useLocalLoading } from './base'

/**
 * Mirrors first `isLoading` argument to `useLocalMirror` under the hood.
 *
 * ### Example
 *
 * ```jsx
 * import { useMirrorLoading } from 'shared-loading-indicator'
 * import { useQuery } from '@tanstack/react-query'
 *
 * const Mirror = () => {
 * 	const query = useQuery([], getData)
 * 	useMirrorLoading(query.isLoading)
 *
 * 	return <div>{query.data}</div>
 * }
 * ```
 */
export const useMirrorLoading = (isLoading: boolean) => {
	const [_, setIsLoading] = useLocalLoading()

	useEffect(() => {
		setIsLoading(isLoading)
	}, [setIsLoading, isLoading])
}

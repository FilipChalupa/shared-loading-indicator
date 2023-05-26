import React, { FunctionComponent, PropsWithChildren, Suspense } from 'react'
import { Loading } from './Loading'

/**
 * Suspense wrapper for lazy loaded components.
 *
 * ### Example
 *
 * ```jsx
 * import { LoadingSuspense } from 'shared-loading-indicator'
 *
 * const LazyWithSuspense = () => {
 * 	return (
 * 		<LoadingSuspense>
 * 			<LazyComponent />
 * 		</LoadingSuspense>
 * 	)
 * }
 * ```
 */
export const LoadingSuspense: FunctionComponent<PropsWithChildren> = ({
	children,
}) => {
	return <Suspense fallback={<Loading />}>{children}</Suspense>
}

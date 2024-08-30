import { ComponentProps, FunctionComponent, Suspense } from 'react'
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
export const LoadingSuspense: FunctionComponent<
	Pick<ComponentProps<typeof Suspense>, 'children' | 'fallback'>
> = ({ children, fallback }) => {
	return (
		<Suspense
			fallback={
				<>
					<Loading />
					{fallback}
				</>
			}
		>
			{children}
		</Suspense>
	)
}

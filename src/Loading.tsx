import type { FunctionComponent } from 'react'
import { useMirrorLoading } from './useMirrorLoading'

/**
 * Signalizes that something is loading.
 *
 * ### Example
 *
 * ```jsx
 * import { SharedLoadingIndicatorContextProvider, Loading } from 'shared-loading-indicator'
 *
 * export const App => () => {
 * 	const somethingIsLoading = true // Hook this to a state
 *
 * 	return (
 * 		<SharedLoadingIndicatorContextProvider>
 * 			{somethingIsLoading && <Loading/>}
 * 			My app
 * 		</SharedLoadingIndicatorContextProvider>
 * 	)
 * }
 * ```
 */
export const Loading: FunctionComponent<{
	isLoading?: boolean
}> = ({ isLoading = true }) => {
	useMirrorLoading(isLoading)
	return null
}

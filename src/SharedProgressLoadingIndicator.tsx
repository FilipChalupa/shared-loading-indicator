import { FunctionComponent } from 'react'
import { ProgressLoadingIndicator } from './ProgressLoadingIndicator'
import { useSharedLoading } from './base'

/**
 * Place `SharedProgressLoadingIndicator` inside `SharedLoadingIndicatorContextProvider` to use prestyled loading indicator. See [demo](https://shared-loading-indicator.netlify.app) to change color or placement.
 *
 * ### Example
 *
 * ```jsx
 * import { SharedLoadingIndicatorContextProvider, SharedProgressLoadingIndicator } from 'shared-loading-indicator'
 *
 * export const App => () => {
 * 	return (
 * 		<SharedLoadingIndicatorContextProvider>
 * 			<SharedProgressLoadingIndicator/>
 * 			My app
 * 		</SharedLoadingIndicatorContextProvider>
 * 	)
 * }
 * ```
 */
export const SharedProgressLoadingIndicator: FunctionComponent<{
	placement?: 'top' | 'bottom'
	startDelay?: number
	minimalDuration?: number
}> = ({ placement = 'top', startDelay, minimalDuration }) => {
	const isLoading = useSharedLoading({ startDelay, minimalDuration })

	return (
		<>
			<style
				dangerouslySetInnerHTML={{
					__html: `
						.SharedProgressLoadingIndicator {
							position: fixed;
							left: 0;
							top: 0;
							right: 0;
							z-index: 10;
						}
						.SharedProgressLoadingIndicator__in {
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							transform: translateY(-100%);
							transition-property: visibility, transform;
							transition-duration: 0.2s;
							visibility: hidden;
						}
						.SharedProgressLoadingIndicator--placement-bottom,
						.SharedProgressLoadingIndicator--placement-bottom .SharedProgressLoadingIndicator__in {
							top: auto;
							bottom: 0;
						}
						.SharedProgressLoadingIndicator--placement-bottom .SharedProgressLoadingIndicator__in {
							transform: translateY(100%);
						}
						.SharedProgressLoadingIndicator--loading .SharedProgressLoadingIndicator__in {
							transform: none;
							visibility: inherit;
						}
						@media (prefers-reduced-motion) {
							.SharedProgressLoadingIndicator__in {
								transition-duration: 0s;
							}
						}
					`,
				}}
			/>
			<div
				className={`SharedProgressLoadingIndicator SharedProgressLoadingIndicator--placement-${placement}${
					isLoading ? ' SharedProgressLoadingIndicator--loading' : ''
				}`}
			>
				<div className="SharedProgressLoadingIndicator__in">
					<ProgressLoadingIndicator />
				</div>
			</div>
		</>
	)
}

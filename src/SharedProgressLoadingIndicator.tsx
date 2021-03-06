import * as React from 'react'
import { FunctionComponent } from 'react'
import { useSharedLoading } from '.'
import { ProgressLoadingIndicator } from './ProgressLoadingIndicator'

export const SharedProgressLoadingIndicator: FunctionComponent<{
	placement?: 'top' | 'bottom'
}> = ({ placement = 'top' }) => {
	const isLoading = useSharedLoading()

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

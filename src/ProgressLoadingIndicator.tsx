import React, { FunctionComponent } from 'react'

export const ProgressLoadingIndicator: FunctionComponent = () => {
	return (
		<>
			<style
				dangerouslySetInnerHTML={{
					__html: `
						.ProgressLoadingIndicator {
							position: relative;
							height: 0.3125em;
							background-color: var(--ProgressLoadingIndicator-color, #027aff);
							overflow: hidden;
						}
						.ProgressLoadingIndicator::before {
							content: '';
							position: absolute;
							inset: 0;
							background-color: var(--ProgressLoadingIndicator-other-color, rgba(255, 255, 255, 0.4));
							animation: ProgressLoadingIndicator-wipe 1s infinite ease-in-out;
						}
						@keyframes ProgressLoadingIndicator-wipe {
							0% {
								transform: translateX(-100%);
							}
							100% {
								transform: translateX(100%) scaleX(0.3);
							}
						}
						@media (prefers-reduced-motion) {
							.ProgressLoadingIndicator::before {
								animation-duration: 20s;
							}
						}
					`,
				}}
			/>
			<div className="ProgressLoadingIndicator" />
		</>
	)
}

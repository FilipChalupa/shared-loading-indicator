import React, { FunctionComponent, useState } from 'react'
import {
	SharedLoadingIndicatorContextProvider,
	useLocalLoading,
	useSharedLoading,
} from '..'

export interface ExampleProps {}

export const Example: FunctionComponent<ExampleProps> = () => {
	return (
		<SharedLoadingIndicatorContextProvider>
			<h1>Demo</h1>
			<SharedStatus />
			<h2>Basic</h2>
			<Basic />
			<h2>Timer</h2>
			<Timer />
			<h2>Dynamic</h2>
			<Dynamic />
		</SharedLoadingIndicatorContextProvider>
	)
}

const SharedStatus: FunctionComponent = () => {
	const isLoading = useSharedLoading()

	return <div>{isLoading ? 'Something is loading' : 'All idle'}</div>
}

const Basic: FunctionComponent = () => {
	const [isLoading, setIsLoading] = useLocalLoading()

	return (
		<div>
			State: {isLoading ? 'loading…' : 'idle'}
			<br />
			<button
				onClick={() => {
					setIsLoading(!isLoading)
				}}
			>
				Toggle state
			</button>
		</div>
	)
}

const Timer: FunctionComponent = () => {
	const [isLoading, setIsLoading] = useLocalLoading()

	return (
		<div>
			State: {isLoading ? 'loading…' : 'idle'}
			<br />
			<button
				disabled={isLoading}
				onClick={() => {
					setIsLoading(true)
					setTimeout(() => {
						setIsLoading(false)
					}, 5000)
				}}
			>
				Do something for 5 seconds
			</button>
		</div>
	)
}

const Dynamic: FunctionComponent = () => {
	const [count, setCount] = useState(2)

	return (
		<div>
			<p>
				<button
					onClick={() => {
						setCount(count + 1)
					}}
				>
					add
				</button>
				<button
					disabled={count <= 0}
					onClick={() => {
						setCount(count - 1)
					}}
				>
					remove
				</button>
			</p>
			<p>
				{new Array(count).fill(null).map((_, i) => (
					<DynamicItem key={i} />
				))}
			</p>
		</div>
	)
}

const DynamicItem: FunctionComponent = () => {
	const [isLoading, setIsLoading] = useLocalLoading()

	return (
		<button
			onClick={() => {
				setIsLoading(!isLoading)
			}}
		>
			{isLoading ? 'End loading' : 'Start loading'}
		</button>
	)
}

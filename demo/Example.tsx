import React, { FunctionComponent, StrictMode, useState } from 'react'
import { Loading } from '../src/Loading'
import { ProgressLoadingIndicator } from '../src/ProgressLoadingIndicator'
import { SharedProgressLoadingIndicator } from '../src/SharedProgressLoadingIndicator'
import {
	SharedLoadingIndicatorContextProvider,
	useLocalLoading,
	useSharedLoading,
} from '../src/base'
import { useMirrorLoading } from '../src/useMirrorLoading'
import './global.css'

export interface ExampleProps {}

export const Example: FunctionComponent<ExampleProps> = () => {
	const [color, setColor] = useState('#027aff')
	const [placement, setPlacement] = useState<'top' | 'bottom'>('top')

	return (
		<StrictMode>
			<SharedLoadingIndicatorContextProvider>
				<div style={{ ['--ProgressLoadingIndicator-color' as any]: color }}>
					<SharedProgressLoadingIndicator placement={placement} />
					<h1>Shared loading indicator demo</h1>
					<SharedStatus />
					<h2>Basic</h2>
					<Basic />
					<h2>Timer</h2>
					<Timer />
					<h2>Dynamic</h2>
					<Dynamic />
					<h2>Mirror</h2>
					<Mirror />
					<h2>Custom progress loading indicator color</h2>
					<pre>
						<code>
							--ProgressLoadingIndicator-color: {color};<br />
							--ProgressLoadingIndicator-other-color: rgba(255, 255, 255, 0.4);
						</code>
					</pre>
					<input
						type="color"
						value={color}
						onChange={(event) => setColor(event.target.value)}
					/>{' '}
					<div style={{ display: 'inline-block', width: '6em' }}>
						<ProgressLoadingIndicator />
					</div>
					<h2>Placement</h2>
					<select
						value={placement}
						onChange={(event) => {
							setPlacement(event.target.value as typeof placement)
						}}
					>
						<option value="top">Top</option>
						<option value="bottom">Bottom</option>
					</select>
				</div>
			</SharedLoadingIndicatorContextProvider>
		</StrictMode>
	)
}

const SharedStatus: FunctionComponent = () => {
	const isLoading = useSharedLoading({
		minimalDuration: 0,
		startDelay: 0,
	})

	return (
		<div>
			Immediate global/merged state:{' '}
			{isLoading ? (
				<>
					something is <strong>loading</strong>
				</>
			) : (
				<>
					<i>idle</i> - <strong>nothing</strong> is loading right now
				</>
			)}
		</div>
	)
}

const Basic: FunctionComponent = () => {
	const [isLoading, setIsLoading] = useLocalLoading()

	return (
		<div>
			State: {isLoading ? <strong>is loading…</strong> : <i>idle</i>}
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
			State: {isLoading ? <strong>is loading…</strong> : <i>idle</i>}
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
	const [count, setCount] = useState(0)

	return (
		<div>
			<p>
				<button
					onClick={() => {
						setCount(count + 1)
					}}
				>
					➕ add
				</button>{' '}
				<button
					disabled={count <= 0}
					onClick={() => {
						setCount(count - 1)
					}}
				>
					➖ remove
				</button>
			</p>
			<p>
				{new Array(count).fill(null).map((_, i) => (
					<span key={i}>
						<strong>🦃 loading</strong>
						<Loading />{' '}
					</span>
				))}
			</p>
		</div>
	)
}

const Mirror: FunctionComponent = () => {
	const [isLoading, setIsLoading] = useState(false)
	useMirrorLoading(isLoading)

	return (
		<div>
			State: {isLoading ? <strong>is loading…</strong> : <i>idle</i>}
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

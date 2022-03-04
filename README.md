# Shared loading indicator [![npm](https://img.shields.io/npm/v/shared-loading-indicator.svg)](https://www.npmjs.com/package/shared-loading-indicator) ![npm type definitions](https://img.shields.io/npm/types/shared-loading-indicator.svg)

## Installation

```bash
npm install shared-loading-indicator
```

## How to use

Wrap all by one `SharedLoadingIndicatorContextProvider`.

```jsx
import { SharedLoadingIndicatorContextProvider } from 'shared-loading-indicator'

export const App => () => {
	return (
		<SharedLoadingIndicatorContextProvider>
			My app
		</SharedLoadingIndicatorContextProvider>
	)
}
```

### Options

You can optionally configure `startDelay` and `minimalDuration` in milliseconds which will be taken into account in `useSharedLoading` later.

### Hooks

#### useSharedLoading

Hook `useSharedLoading` returns `true` if some component is in loading state. Use this information to show your own loading indicator (spinner, progress bar, …).

```jsx
import { useSharedLoading } from 'shared-loading-indicator'

export const LoadingIndicator => () => {
	const isLoading = useSharedLoading()

	if (!isLoading) {
		return null
	}

	return (
		<div>
			App is loading something
		</div>
	)
}
```

#### useLocalLoading

Hook `useLocalLoading` works similarly to `useState`. It returns array with `boolean` state indicating that component is loading and set function.

```jsx
import { useLocalLoading } from 'shared-loading-indicator'

export const MyComponent => () => {
	const [isLoading, setIsLoading] = useLocalLoading()

	return (
		<div>
			<div>
				Is loading: {isLoading ? 'yes' : 'no'}
			</div>
			<button onClick={() => setIsLoading(!isLoading)}>
		</div>
	)
}
```

```jsx
import { useLocalLoading } from 'shared-loading-indicator'
import { useEffect } from 'react'

export const LazyComponent => () => {
	const [isLoading, setIsLoading] = useLocalLoading()
	const [data, setData] = useState(null)

	useEffect(() => {
		setIsLoading(true)
		fetch('https://example.com')
			.then(response => response.json())
			.then(receivedData => {
				setData(receivedData)
			})
	}, [])

	return (
		<div>
			<div>
				Is loading: {isLoading ? 'yes' : 'no'}
			</div>
			<pre>
				{JSON.stringify(data, null, 2)}
			</pre>
		</div>
	)
}
```

## Tips

### Page navigation in [Next.js](https://nextjs.org/)

Place `PageNavigationLoadingTracker` inside `SharedLoadingIndicatorContextProvider`.

```jsx
import { useLocalLoading } from 'shared-loading-indicator'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const PageNavigationLoadingTracker = ({}) => {
	const router = useRouter()
	const [_, setIsLoading] = useLocalLoading()

	useEffect(() => {
		const handleStart = (url: string) => {
			url !== router.pathname ? setIsLoading(true) : setIsLoading(false)
		}
		const handleComplete = () => setIsLoading(false)

		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleComplete)
		router.events.on('routeChangeError', handleComplete)

		return () => {
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleComplete)
			router.events.off('routeChangeError', handleComplete)
		}
	}, [router, setIsLoading])

	return null
}
```

### Loading indicator by progress bar

Place `SharedLoadingIndicator` inside `SharedLoadingIndicatorContextProvider`.

```jsx
export const SharedLoadingIndicator = () => {
	const isLoading = useSharedLoading()

	return (
		<>
			<style>
				.wrapper {
					position: fixed;
					left: 0;
					top: 0;
					right: 0;
					z-index: 10;
				}

				.in {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					transform: translateY(-100%);
					transition-property: visibility, transform;
					transition-duration: 0.2s;
					visibility: hidden;
				}

				.wrapper.is_loading .in {
					transform: none;
					visibility: inherit;
				}

				.loadingBar {
					position: relative;
					height: 0.3125em;
					background-color: #027aff;
					overflow: hidden;
				}

				@keyframes loadingBar-wipe {
					0% {
						transform: translateX(-100%);
					}
					100% {
						transform: translateX(100%);
					}
				}

				.loadingBar::before {
					content: '';
					position: absolute;
					inset: 0;
					background-color: rgba(255, 255, 255, 0.4);
					animation: loadingBar-wipe 1s infinite;
				}
			</style>
			<div className={'wrapper' + isLoading ? ' is_loading' : ''}>
				<div className="in">
					<div className="loadingBar" />
				</div>
			</div>
		</>
	)
}
```

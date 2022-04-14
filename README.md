# Shared loading indicator [![npm](https://img.shields.io/npm/v/shared-loading-indicator.svg)](https://www.npmjs.com/package/shared-loading-indicator) ![npm type definitions](https://img.shields.io/npm/types/shared-loading-indicator.svg)

Simplifies loading state sharing in React.

![Demo](https://raw.githubusercontent.com/FilipChalupa/shared-loading-indicator/HEAD/screencast.gif)

You can play with it yourself here [shared-loading-indicator.netlify.app](https://shared-loading-indicator.netlify.app).

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

You can optionally configure `startDelay` and `minimalDuration` in milliseconds which will be taken into account in `<SharedProgressLoadingIndicator/>` and `useSharedLoading`.

### Component `<SharedProgressLoadingIndicator/>`

Place `SharedProgressLoadingIndicator` inside `SharedLoadingIndicatorContextProvider` to use prestyled loading indicator. See [demo](https://shared-loading-indicator.netlify.app) to change color or placement.

```jsx
import { SharedLoadingIndicatorContextProvider, SharedProgressLoadingIndicator } from 'shared-loading-indicator'

export const App => () => {
	return (
		<SharedLoadingIndicatorContextProvider>
			<SharedProgressLoadingIndicator/>
			My app
		</SharedLoadingIndicatorContextProvider>
	)
}
```

### Hook `useSharedLoading`

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

### Component `<Loading/>`

Place `Loading` inside `SharedLoadingIndicatorContextProvider` to signalize something is loading.

```jsx
import { SharedLoadingIndicatorContextProvider, Loading } from 'shared-loading-indicator'

export const App => () => {
	const somethingIsLoading = true

	return (
		<SharedLoadingIndicatorContextProvider>
			{somethingIsLoading && <Loading/>}
			My app
		</SharedLoadingIndicatorContextProvider>
	)
}
```

### Hook `useLocalLoading`

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

export const PageNavigationLoadingTracker = () => {
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

## Development

- Install dependencies: `npm ci`
- Build the package: `npm start`
- Run Storybook to check it works: `npm run storybook`

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

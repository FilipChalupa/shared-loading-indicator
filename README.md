# Shared loading indicator [![npm](https://img.shields.io/npm/v/shared-loading-indicator.svg)](https://www.npmjs.com/package/shared-loading-indicator) ![npm type definitions](https://img.shields.io/npm/types/shared-loading-indicator.svg)

Simplifies loading state sharing in React.

![Demo](https://raw.githubusercontent.com/FilipChalupa/shared-loading-indicator/HEAD/screencast.gif)

You can play with it yourself here [filipchalupa.cz/shared-loading-indicator](https://filipchalupa.cz/shared-loading-indicator/).

## Installation

```bash
npm install shared-loading-indicator
```

## How to use

Wrap all by one `<SharedLoadingIndicatorContextProvider>`.

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

You can change the `<SharedProgressLoadingIndicator>` color by setting a CSS custom property on its parent named `--ProgressLoadingIndicator-color`. Or you can build your own indicator using `useSharedLoading` hook.

#### CSS example

```css
:root {
	--ProgressLoadingIndicator-color: #ff00ff;
}
```

![magenta indicator](https://raw.githubusercontent.com/FilipChalupa/shared-loading-indicator/HEAD/magenta-indicator.gif)

### Hook `useSharedLoading()`

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

#### Options

You can optionally configure `startDelay` and `minimalDuration` in milliseconds.

```js
const isLoading = useSharedLoading({
	startDelay: 300, // isLoading won't be true if all local loads get finished under 300 milliseconds
	minimalDuration: 1000, // isLoading will be true for at least 1000 milliseconds
})
```

### Component `<Loading/>`

Place `<Loading>` inside `<SharedLoadingIndicatorContextProvider>` to signalize something is loading.

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

### Hook `useLocalLoading()`

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
			.finally(() => {
				setIsLoading(false)
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

### Hook `useMirrorLoading()`

Mirrors first argument to `useLocalMirror` under the hood.

```jsx
import { useMirrorLoading } from 'shared-loading-indicator'
import { useQuery } from '@tanstack/react-query'

const Mirror: FunctionComponent = () => {
	const query = useQuery([], getData)
	useMirrorLoading(query.isLoading)

	return <div>{query.data}</div>
}
```

## Tips

- [Page navigation in Next.js](tips/nextjs.md)
- [Custom indicator with Material UI](tips/materialui.md)

## Development

- Install dependencies: `npm ci`
- Run: `npm run dev`

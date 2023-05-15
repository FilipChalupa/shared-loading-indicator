# [Next.js](https://nextjs.org/)

## Page navigation

Place `<PageNavigationLoadingTracker>` inside `<SharedLoadingIndicatorContextProvider*`. It will track page navigation and trigger global loading state until page another is loaded.

### `PageNavigationLoadingTracker.jsx`

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

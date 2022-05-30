import * as React from 'react'
import {
	createContext,
	FunctionComponent,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'

export * from './Loading'
export * from './ProgressLoadingIndicator'
export * from './SharedProgressLoadingIndicator'

const defaultStartDelay = 300
const defaultMinimalDuration = 1000

const Context = createContext({
	count: 0,
	increment: () => {},
	decrement: () => {},
	startDelay: defaultStartDelay,
	minimalDuration: defaultMinimalDuration,
})

export const SharedLoadingIndicatorContextProvider: FunctionComponent<{
	startDelay?: number
	minimalDuration?: number
	children?: React.ReactNode
}> = ({
	children,
	startDelay = defaultStartDelay,
	minimalDuration = defaultMinimalDuration,
}) => {
	const [count, setCount] = useState(0)
	const increment = useCallback(() => {
		setCount((count) => count + 1)
	}, [])
	const decrement = useCallback(() => {
		setCount((count) => count - 1)
	}, [])

	return (
		<Context.Provider
			value={{ count, increment, decrement, startDelay, minimalDuration }}
		>
			{children}
		</Context.Provider>
	)
}

export const useLocalLoading = (): [boolean, (isLoading: boolean) => void] => {
	const [isLoading, setIsLoading] = useState(false)
	const { increment, decrement } = useContext(Context)
	const isFirstPass = useRef(true)
	const isLoadingRef = useRef(false)

	useEffect(() => {
		if (isFirstPass.current) {
			isFirstPass.current = false
		} else {
			isLoadingRef.current = isLoading
			if (isLoading) {
				increment()
			} else {
				decrement()
			}
		}
	}, [decrement, increment, isLoading])

	useEffect(() => {
		return () => {
			if (isLoadingRef.current) {
				decrement()
			}
		}
	}, [decrement])

	return [isLoading, setIsLoading]
}

export const useSharedLoading = () => {
	const { count, startDelay, minimalDuration } = useContext(Context)
	const isLoading = count > 0
	const [isThrottledLoading, setIsThrottledLoading] = useState(isLoading)
	const loadingStart = useRef(new Date())

	useEffect(() => {
		if (isLoading) {
			loadingStart.current = new Date()
			const timer = setTimeout(() => {
				setIsThrottledLoading(true)
			}, startDelay)
			return () => {
				clearTimeout(timer)
			}
		} else {
			const now = new Date()
			const durationAlreadyPassed =
				now.getTime() - loadingStart.current.getTime() - startDelay
			const timer = setTimeout(() => {
				setIsThrottledLoading(false)
			}, Math.max(0, minimalDuration - durationAlreadyPassed))
			return () => {
				clearTimeout(timer)
			}
		}
	}, [isLoading, minimalDuration, startDelay])

	return isThrottledLoading
}

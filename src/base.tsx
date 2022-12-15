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

const defaultStartDelay = 300
const defaultMinimalDuration = 1000

const Context = createContext({
	count: 0,
	increment: () => {
		throw new Error('<SharedLoadingIndicatorContextProvider> is missing.')
		return
	},
	decrement: () => {
		throw new Error('<SharedLoadingIndicatorContextProvider> is missing.')
		return
	},
})

export const SharedLoadingIndicatorContextProvider: FunctionComponent<{
	children?: React.ReactNode
}> = ({ children }) => {
	const [count, setCount] = useState(0)
	const increment = useCallback(() => {
		setCount((count) => count + 1)
	}, [])
	const decrement = useCallback(() => {
		setCount((count) => count - 1)
	}, [])

	return (
		<Context.Provider value={{ count, increment, decrement }}>
			{children}
		</Context.Provider>
	)
}

export const useLocalLoading = (): [boolean, (isLoading: boolean) => void] => {
	const [isLoading, setIsLoading] = useState(false)
	const { increment, decrement } = useContext(Context)

	useEffect(() => {
		if (isLoading) {
			increment()
		}
		return () => {
			if (isLoading) {
				decrement()
			}
		}
	}, [isLoading])

	return [isLoading, setIsLoading]
}

export const useMirrorLoading = (isLoading: boolean) => {
	const [_, setIsLoading] = useLocalLoading()

	useEffect(() => {
		setIsLoading(isLoading)
	}, [setIsLoading, isLoading])
}

export const useSharedLoading = (
	options: {
		startDelay?: number
		minimalDuration?: number
	} = {}
) => {
	const {
		startDelay = defaultStartDelay,
		minimalDuration = defaultMinimalDuration,
	} = options
	const { count } = useContext(Context)
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

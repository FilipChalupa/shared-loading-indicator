import React, { FunctionComponent, PropsWithChildren, Suspense } from 'react'
import { Loading } from './Loading'

export const LoadingSuspense: FunctionComponent<PropsWithChildren> = ({
	children,
}) => {
	return <Suspense fallback={<Loading />}>{children}</Suspense>
}

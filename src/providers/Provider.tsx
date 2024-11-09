'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { LazyMotion, domAnimation } from 'framer-motion'
import { PropsWithChildren, useState } from 'react'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: PropsWithChildren) {
	const [client] = useState(() => new QueryClient())

	return (
		<QueryClientProvider client={client}>
			<LazyMotion features={domAnimation}>
				<main>{children}</main>
				<Toaster />
			</LazyMotion>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

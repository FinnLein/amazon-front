import '@/assets/styles/globals.scss'
import { TypeComponentAuthFields } from '@/providers/auth-provider/auth-page.types'
import AuthProvider from '@/providers/auth-provider/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export default function App({
	Component,
	pageProps
}: AppProps & TypeComponentAuthFields) {
	return (
		<QueryClientProvider client={queryClient}>
					<AuthProvider Component={{ isOnlyUser: Component.isOnlyUser }}>
						<Component {...pageProps} />
					</AuthProvider>
		</QueryClientProvider>
	)
}

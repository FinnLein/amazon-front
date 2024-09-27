import { ADMIN_PANEL_URL } from '@/config/configUrl'
import Auth from '@/screens/auth/Auth'
import { getAccessToken } from '@/services/auth/auth.helper'
import { useUserStore } from '@/store/user/userStore'
import { Tokens } from '@/utils/enums/tokens.enums'
import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'
import { FC, PropsWithChildren, useEffect } from 'react'
import Custom404 from '../../app/not-found'
import { protectedRoutes } from './protected-routes.data'

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const { user } = useUserStore()
	const { logout, checkAuth } = useUserStore()
	const pathname = usePathname()

	useEffect(() => {
		const accessToken = getAccessToken()
		if (accessToken) checkAuth()
	}, [])

	useEffect(() => {
		const refreshToken = Cookies.get(Tokens.refreshToken)
		if (!refreshToken && user) logout()
	}, [pathname])

	const router = useRouter()

	const isProtectedRoute = protectedRoutes.some(route =>
		pathname?.startsWith(route)
	)

	const isAdminRoute = pathname?.startsWith(ADMIN_PANEL_URL)

	if (!isProtectedRoute && !isAdminRoute) return <>{children}</>

	if (user?.role === 'ADMIN') return <>{children}</>
	if (user && isProtectedRoute) return <>{children}</>
	if (user && isAdminRoute) return <Custom404 />

	if (pathname !== '/auth') return <Auth />

	return true
}

export default AuthProvider

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { getAccessToken, getRefreshToken } from '@/services/auth/auth.helper'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useEffect } from 'react'
import { TypeComponentAuthFields } from './auth-page.types'

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false })

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	Component: { isOnlyUser },
	children
}) => {
	const { user } = useAuth()
	const { logout, checkAuth } = useActions()
	const { pathname } = useRouter()

	useEffect(() => {
		const accessToken = getAccessToken()
		if (accessToken) checkAuth()
	}, [])

	useEffect(() => {
		const refreshToken = getRefreshToken()
		if (!refreshToken && user) logout()
	}, [pathname])

	return isOnlyUser ? (
		<DynamicCheckRole Component={{ isOnlyUser }}>{children}</DynamicCheckRole>
	) : (
		<>{children}</>
	)
}

export default AuthProvider

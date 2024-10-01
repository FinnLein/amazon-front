import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_PANEL_URL } from './config/configUrl'
import { AuthService } from './services/auth/auth.service'
import { ITokenInside } from './services/auth/auth.types'
import { UserRole } from './types/user.type'
import { Tokens } from './utils/enums/tokens.enums'

export async function middleware(request: NextRequest, response: NextResponse) {
	const refreshToken = request.cookies.get(Tokens.refreshToken)?.value
	let accessToken = request.cookies.get(Tokens.accessToken)?.value
	const isAdminPage = request.url.includes(ADMIN_PANEL_URL)

	if (!refreshToken) {
		request.cookies.delete(Tokens.accessToken)
		return redirectToLogin(isAdminPage, request)
	}

	if (!accessToken) {
		try {
			const data = await AuthService.getNewtokensByRefreshToken(refreshToken)
			accessToken = data.accessToken
		} catch (error) {
			request.cookies.delete(Tokens.accessToken)
			return redirectToLogin(isAdminPage, request)
		}
	}

	try {
		const { payload }: { payload: ITokenInside } = await jwtVerify(
			accessToken,
			new TextEncoder().encode(`${process.env.JWT_SECRET}`)
		)

		if (payload.role === UserRole.Admin) return NextResponse.next()

		if (isAdminPage) return NextResponse.redirect(new URL('/404', request.url))

		return NextResponse.next()
	} catch (error) {
		if (
			error instanceof Error &&
			error.message.includes('exp claim timestamp check failed')
		) {
			console.log('Token expire')
			return redirectToLogin(isAdminPage, request)
		}
		console.log('An error during tokens verification', error)
		return redirectToLogin(isAdminPage, request)
	}
}

export const config = {
	matcher: ['/admin/:path*', '/profile/:path*']
}

const redirectToLogin = (isAdminPage: boolean, request: NextRequest) => {
	return NextResponse.redirect(
		new URL(isAdminPage ? '/404' : '/login', request.url)
	)
}

'use server'

import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

import { ENUM_TOKENS } from '../enums/tokens.enums'
import {
	IUserDataState,
	transformUserToState
} from '../transform-user-to-state'

import { AuthService } from '@/services/auth/auth.service'
import { ITokenInside } from '@/services/auth/auth.types'

export async function getServerAuth(): Promise<IUserDataState | null> {
	const JWT_SECRET = process.env.JWT_SECRET
	let accessToken = cookies().get(ENUM_TOKENS.accessToken)?.value
	const refreshToken = cookies().get(ENUM_TOKENS.refreshToken)?.value

	if (!refreshToken) return null

	if (!accessToken) {
		try {
			const data = await AuthService.getNewTokensByRefreshToken(refreshToken)
			console.log(data)
			accessToken = data.accessToken
		} catch (error) {
			return null
		}
	}

	try {
		const { payload }: { payload: ITokenInside } = await jwtVerify(
			accessToken,
			new TextEncoder().encode(`${JWT_SECRET}`)
		)

		if (!payload) return null
		return transformUserToState(payload)
	} catch (error) {
		return null
	}
}

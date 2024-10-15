import Cookies from 'js-cookie'

import { IAuthResponse } from '@/store/user/user.interface'

import { Tokens } from '@/utils/enums/tokens.enums'

export const getAccessToken = () => {
	const accessToken = Cookies.get(Tokens.accessToken)
	return accessToken || null
}
export const getRefreshToken = () => {
	const refreshToken = Cookies.get(Tokens.refreshToken)
	return refreshToken || null
}

export const getUserFromStorage = () => {
	return JSON.parse(localStorage.getItem('user') || '{}')
}

export const setTokensStorage = (accessToken: string) => {
	Cookies.set(Tokens.accessToken, accessToken, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1
	})
}
export const removeFromStorage = () => {
	Cookies.remove(Tokens.accessToken)
	localStorage.removeItem('user')
}

export const saveToStorage = (data: IAuthResponse) => {
	setTokensStorage(data.accessToken)
	localStorage.setItem('user', JSON.stringify(data.user))
}
